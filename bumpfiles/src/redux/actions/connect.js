import * as actions from "../actionTypes";

export const connect = (time) => ({ type: actions.BUMP, payload: { time } });
