import React from "react";
import ReactCodeInput from "react-code-input";

import "./Pin.css";

export function Pin() {
	return (
		<div>
			<ReactCodeInput type="number" fields={4} />
		</div>
	);
}
