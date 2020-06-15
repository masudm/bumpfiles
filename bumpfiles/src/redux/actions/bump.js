import * as actions from "../actionTypes";

export const bump = (time) => ({ type: actions.BUMP, time });
export const bumped = (peer) => ({ type: actions.BUMPED, peer });
