import { combineReducers } from "redux";
import bump from "./bump";
import transfer from "./transfer";
import alert from "./alert";

export default combineReducers({ bump, transfer, alert });
