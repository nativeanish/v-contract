import { Action, State, _return } from "../types";

export function view(state: State, action: Action): _return {
    state.video.filter((e) => e.id === action.input.id)[0].views += 1
    return { state: state }
}