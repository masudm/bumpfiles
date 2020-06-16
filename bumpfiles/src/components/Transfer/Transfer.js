import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";

import FileInput from "@brainhubeu/react-file-input";
import { get_file, send_file } from "../../redux/actions/transfer";

export function Transfer() {
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
		let fileChunks = [];
		let fileInfo = null;
		state.bump.peer.on("data", (data) => {
			let str = data.toString();

			let transferringFile = false;

			if (str.substring(0, 4) == "info") {
				fileInfo = JSON.parse(str.substring(4));
				console.log(fileInfo);
				transferringFile = true;
			}

			if (str == "Done!") {
				transferringFile = false;
				dispatch(get_file(Date.now(), fileInfo.name, fileInfo.size, fileInfo.mime, fileChunks));
				fileChunks = [];
			}

			if (transferringFile) {
				fileChunks.push(data);
			}
		});
	}

	function send(data) {
		const file = data.value;
		const fileInfo = {
			name: file.name,
			size: file.size,
			mime: file.mimeType,
		};

		console.log("Sending");
		state.bump.peer.send("info" + JSON.stringify(fileInfo));

		// We convert the file from Blob to ArrayBuffer
		file.arrayBuffer().then((buffer) => {
			/**
			 * A chunkSize (in Bytes) is set here
			 * I have it set to 16KB
			 */
			const chunkSize = 16 * 1024;

			// Keep chunking, and sending the chunks to the other peer
			while (buffer.byteLength) {
				const chunk = buffer.slice(0, chunkSize);
				buffer = buffer.slice(chunkSize, buffer.byteLength);

				// Off goes the chunk!
				state.bump.peer.send(chunk);
			}

			// End message to signal that all chunks have been sent
			state.bump.peer.send("Done!");
			dispatch(send_file(Date.now(), fileInfo.name, fileInfo.size, fileInfo.mime));
		});
	}

	return (
		<div>
			<FileInput label="Awesome Uploader" onChangeCallback={send} />
			<ul>
				{state.transfer.files.map((value, index) => {
					return <li key={index}>{JSON.stringify(value)}</li>;
				})}
			</ul>
		</div>
	);
}
