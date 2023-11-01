import { Action, State, _s_return } from "../types";

/**
 *
 *
 * @export
 * @param {State} state
 * @param {Action} action
 * @return {*}  {_s_return}
 */

declare const ContractError: new (arg0: string) => any;
export function view(state: State, action: Action): _s_return {
    if (action.input.id?.length) {
        const video = state.video.find((e) => e.id === action.input.id)
        if (video?.id?.length) {
            video.views += 1
        }
        return { state: state }
    } else {
        throw new ContractError("Basic field video id is missing")
    }
}