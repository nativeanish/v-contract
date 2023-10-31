import { Action, State, _q_return } from "../types";

export function get_video(state: State, action: Action): _q_return {
    const video = state.video.filter((e) => e.id === action.input.id)
    if (video.length) {
        return { result: { success: true, data: video[0] } }
    } else {
        return { result: { success: false, data: "No Video Found" } }
    }
}