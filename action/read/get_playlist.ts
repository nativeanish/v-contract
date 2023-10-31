import { Action, State, _q_return } from "../types";

export function get_playlist(state: State, action: Action): _q_return {
    const playlist = state.playlist.filter((e) => e.id === action.input.id)
    if (playlist.length) {
        return { result: { success: true, data: playlist[0] } }
    } else {
        return { result: { success: false, data: "No Playlist Found" } }
    }
}