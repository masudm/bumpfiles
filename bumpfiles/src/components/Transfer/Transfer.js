import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { useHistory } from "react-router-dom";

import FileInput from "@brainhubeu/react-file-input";

export function Transfer() {
	const history = useHistory();

	const state = useSelector((state) => state.bump.peer);

	useEffect(() => {
		if (state == null) {
			history.push("/");
		} else {
			let fileChunks = [];
			state.on("data", (data) => {
				if (data.toString() === "Done!") {
					// Once, all the chunks are received, combine them to form a Blob
					const file = new Blob(fileChunks, { type: "jpeg" });

					console.log("Received", file);
					// Download the received file using downloadjs
					//download(file, 'test.png');
					let url = URL.createObjectURL(file);
					document.querySelector("#image").src = url;
					fileChunks = []; //clear it
				} else {
					// Keep appending various file chunks
					fileChunks.push(data);
				}
			});
		}
	});

	function send(data) {
		const file = data.value;
		console.log("Sending", file);

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
				state.send(chunk);
			}

			// End message to signal that all chunks have been sent
			state.send("Done!");
		});
	}

	return (
		<div>
			<FileInput label="Awesome Uploader" onChangeCallback={send} />
			<ul>
				<li>bumped at: {JSON.stringify(state)}</li>
				<li>test.jpg</li>
				<li>
					r: <img id="image" />
				</li>
				<button onClick={() => state.send("hello")}>test</button>
			</ul>
		</div>
	);
}
