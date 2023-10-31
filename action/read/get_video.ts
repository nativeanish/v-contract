import { Action, State } from "../types";

export function get_video(state: State, action: Action) {
    const video = state.video.filter((e) => e.id === action.input.id)
    if (video.length) {
        return { result: { success: true, data: video[0] } }
    } else {
        return { result: { success: false, data: "No Video Found" } }
    }
}