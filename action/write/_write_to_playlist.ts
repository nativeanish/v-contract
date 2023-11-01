import { Action, State } from "../types";
import { _write_to_user } from "./_write_to_user";

/**
 *
 *
 * @export
 * @param {State} state
 * @param {Action} action
 * @return {*}  {State}
 */
export function _write_to_playlist(state: State, action: Action): State {
    //@ts-ignore 
    const user_id: string = SmartWeave.transaction.owner;
    state = _write_to_user(state, "video", action.input.id)
    const playlist = state.playlist.find((e) => e.id === action.input.playlist)
    if (playlist?.id.length) {
        playlist.video_list.push(action.input.id)
    }
    return state
}