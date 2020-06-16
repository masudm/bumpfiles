import { combineReducers } from "redux";
import bump from "./bump";
import transfer from "./transfer";

export default combineReducers({ bump, transfer });
