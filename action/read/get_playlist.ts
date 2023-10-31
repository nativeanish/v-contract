import { Action, State } from "../types";

export function get_playlist(state: State, action: Action) {
    const playlist = state.playlist.filter((e) => e.id === action.input.id)
    if (playlist.length) {
        return { result: { success: true, data: playlist[0] } }
    } else {
        return { result: { success: false, data: "No Playlist Found" } }
    }
}