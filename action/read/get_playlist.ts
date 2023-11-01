import { Action, State, _q_return } from "../types";

/**
 *
 *
 * @export
 * @param {State} state
 * @param {Action} action
 * @return {*}  {_q_return}
 */
export function get_playlist(state: State, action: Action): _q_return {
    const playlist = state.playlist.find((e) => e.id === action.input.id)
    if (playlist?.id?.length) {
        return { result: { success: true, data: playlist } }
    } else {
        return { result: { success: false, data: "No Playlist Found" } }
    }
}