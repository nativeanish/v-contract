import { Action, State, _q_return } from "../types";

/**
 *
 *
 * @export
 * @param {State} state
 * @param {Action} action
 * @return {*}  {_q_return}
 */
export function get_video(state: State, action: Action): _q_return {
    if (action.input.id?.length) {
        const video = state.video.find((e) => e.id === action.input.id)
        if (video?.id?.length) {
            return { result: { success: true, data: video } }
        } else {
            return { result: { success: false, data: "No Video Found" } }
        }
    } else {
        return { result: { success: false, data: "Video Id is not defined" } }
    }
}
