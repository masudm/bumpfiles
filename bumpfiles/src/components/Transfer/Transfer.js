import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";

import { get_file, send_file, sent_file, getting_file } from "../../redux/actions/transfer";

import "./Transfer.css";
import Uploader from "../Uploader/Uploader";
import File from "../File/File";

import "./SafariBlobFix"; //https://gist.github.com/hanayashiki/8dac237671343e7f0b15de617b0051bd
import ConnectedInfo from "../ConnectedInfo/ConnectedInfo";

export function Transfer() {
	const chunkSize = 16 * 1024; //best http://viblast.com/blog/2015/2/5/webrtc-data-channel-message-size/

	const history = useHistory();
	const state = useSelector((state) => state);
	const dispatch = useDispatch();

	const END_STATE = "END";
	const START_STATE = "INFO";

	useEffect(() => {
		if (state.bump.peer == null) {
			history.push("/");
		} else {
			recieve();
		}
	}, []); //only run this ONCE on mount

	function recieve() {
		let fileDownloaded = 0; //how much of the file has been downloaded
		let fileChunks = []; //the chunks of data
		let fileInfo = null; //the metadata
		let fileId = Date.now(); //identifying file id is based on unix date
		let transferringFile = false;

		state.bump.peer.on("data", (data) => {
			let str = data.toString();

			//data is sent in this order: info, DATA, end
			//so when recieving, check this order BACKWARDS - check if done, then for data, then for info

			if (str == END_STATE) {
				transferringFile = false;
				const file = new Blob(fileChunks); //convert all the chunks into a data blob
				const localImg = window.URL.createObjectURL(file); //which can be viewed locally
				dispatch(get_file(fileId, localImg));
			}

			if (transferringFile) {
				//add the chunks
				fileChunks.push(data);
				fileDownloaded += chunkSize;
				//console.log("finished: " + Math.min(100, (fileDownloaded / fileInfo.size) * 100) + "%");
			}

			if (str.substring(0, START_STATE.length) == START_STATE) {
				//reset the data vars
				fileChunks = [];
				fileDownloaded = 0;
				fileId = Date.now();
				transferringFile = true;

				fileInfo = JSON.parse(str.substring(START_STATE.length)); //parse all the JSON (except the start state identifying message)
				dispatch(getting_file(fileId, fileInfo.name, fileInfo.size, fileInfo.mime));
			}
		});
	}

	function send(data) {
		const file = data[0]; //returns an array since it supports multiple files, but we only deal with one

		//create some metadata
		const fileInfo = {
			name: file.name,
			size: file.size,
			mime: file.type,
		};

		let fileId = Date.now();

		//send start state identifying message and the metadata. the start state bit is stripped when parsed on recieving end
		state.bump.peer.send(START_STATE + JSON.stringify(fileInfo));

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
			state.bump.peer.send(END_STATE);
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
