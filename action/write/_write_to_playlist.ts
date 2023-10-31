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
    state.playlist.filter((e) => e.id === action.input.playlist)[0].video_list.push(action.input.id)
    return state
}