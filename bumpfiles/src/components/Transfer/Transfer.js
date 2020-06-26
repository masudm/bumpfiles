import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";

import { get_file, send_file, sent_file, getting_file } from "../../redux/actions/transfer";

import "./Transfer.css";
import Uploader from "../Uploader/Uploader";
import File from "../File/File";

import "./SafariBlobFix";
import ConnectedInfo from "../ConnectedInfo/ConnectedInfo";

export function Transfer() {
	/**
	 * A chunkSize (in Bytes) is set here
	 * I have it set to 16KB
	 */
	const chunkSize = 16 * 1024;

	const history = useHistory();

	const state = useSelector((state) => state);
	const dispatch = useDispatch();

	useEffect(() => {
		console.log("hello");
		if (state.bump.peer == null) {
			history.push("/");
		} else {
			recieve();
		}
	}, []);

	function recieve() {
		let fileDownloaded = 0;
		let fileChunks = [];
		let fileInfo = null;
		let fileId = Date.now();
		let transferringFile = false;
		state.bump.peer.on("data", (data) => {
			let str = data.toString();
			if (str == "Done!") {
				transferringFile = false;
				const file = new Blob(fileChunks);
				const localImg = window.URL.createObjectURL(file);
				dispatch(get_file(fileId, localImg));
			}

			if (transferringFile) {
				fileChunks.push(data);
				fileDownloaded += chunkSize;
				//console.log("finished: " + Math.min(100, (fileDownloaded / fileInfo.size) * 100) + "%");
			}

			if (str.substring(0, 4) == "info") {
				fileChunks = [];
				fileDownloaded = 0;
				fileId = Date.now();
				fileInfo = JSON.parse(str.substring(4));
				transferringFile = true;
				dispatch(getting_file(fileId, fileInfo.name, fileInfo.size, fileInfo.mime));
			}
		});
	}

	function send(data) {
		const file = data[0];
		const fileInfo = {
			name: file.name,
			size: file.size,
			mime: file.type,
		};

		let fileId = Date.now();

		console.log("Sending");
		state.bump.peer.send("info" + JSON.stringify(fileInfo));

		dispatch(send_file(fileId, fileInfo.name, fileInfo.size, fileInfo.mime, file.preview.url));

		let bitsSent = 0;
		// We convert the file from Blob to ArrayBuffer
		file.arrayBuffer().then((buffer) => {
			// Keep chunking, and sending the chunks to the other peer
			while (buffer.byteLength) {
				const chunk = buffer.slice(0, chunkSize);
				buffer = buffer.slice(chunkSize, buffer.byteLength);

				// Off goes the chunk!
				state.bump.peer.send(chunk);
				bitsSent += chunk.byteLength;

				//console.log(Math.min(100, (bitsSent / fileInfo.size) * 100) + "% sent");
			}

			// End message to signal that all chunks have been sent
			state.bump.peer.send("Done!");
			dispatch(sent_file(fileId));
		});
	}

	return (
		<div className="transfer">
			<ConnectedInfo myUsername={state.bump.myUsername} connectedUsername={state.bump.connectedUsername} />
			<Uploader onChange={send} />
			<ul>
				{state.transfer.files.map((value, index) => {
					return <File key={index} data={value} />;
				})}
			</ul>
		</div>
	);
}
