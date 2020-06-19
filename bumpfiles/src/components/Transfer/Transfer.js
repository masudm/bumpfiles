import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";

import { get_file, send_file } from "../../redux/actions/transfer";

import "./Transfer.css";
import Uploader from "../Uploader/Uploader";
import File from "../File/File";

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
		if (state.bump.peer == null) {
			history.push("/");
		} else {
			recieve();
		}
	});

	function recieve() {
		let fileDownloaded = 0;
		let fileChunks = [];
		let fileInfo = null;
		let transferringFile = false;
		state.bump.peer.on("data", (data) => {
			let str = data.toString();
			if (str == "Done!") {
				transferringFile = false;
				const file = new Blob(fileChunks);
				const localImg = window.URL.createObjectURL(file);
				dispatch(get_file(Date.now(), fileInfo.name, fileInfo.size, fileInfo.mime, localImg));
				fileChunks = [];
				fileDownloaded = 0;
			}

			if (transferringFile) {
				fileChunks.push(data);
				fileDownloaded += chunkSize;
				console.log("finished: " + Math.min(100, (fileDownloaded / fileInfo.size) * 100) + "%");
			}

			if (str.substring(0, 4) == "info") {
				fileInfo = JSON.parse(str.substring(4));
				console.log(fileInfo);
				transferringFile = true;
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

		console.log("Sending");
		state.bump.peer.send("info" + JSON.stringify(fileInfo));
		dispatch(send_file(Date.now(), fileInfo.name, fileInfo.size, fileInfo.mime, file.preview.url));

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

				console.log(Math.min(100, (bitsSent / fileInfo.size) * 100) + "% sent");
			}

			// End message to signal that all chunks have been sent
			state.bump.peer.send("Done!");
		});
	}

	return (
		<div className="transfer">
			<Uploader onChange={send} />
			<ul>
				{state.transfer.files.map((value, index) => {
					return <File key={index} data={value} />;
				})}
			</ul>
		</div>
	);
}
