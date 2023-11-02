import { Action, State, _q_return } from "../types";

export function get_user(state: State, action: Action): _q_return {
    const user = state.user.find((e) => e.id === action.input.id)
    if (user?.id?.length) {
        return { result: { success: true, data: user } }
    } else {
        return { result: { success: false, data: "No Data Found" } }
    }
}