import { Action, State, _s_return } from "../types";

/**
 *
 *
 * @export
 * @param {State} state
 * @param {Action} action
 * @return {*}  {_s_return}
 */
export function view(state: State, action: Action): _s_return {
    const video = state.video.find((e) => e.id === action.input.id)
    if (video?.id?.length) {
        video.views += 1
    }
    return { state: state }
}