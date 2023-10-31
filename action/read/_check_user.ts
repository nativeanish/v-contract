import { State } from "../types";

export function _check_user(state: State): boolean {
    //@ts-ignore 
    const user_id: string = SmartWeave.transaction.owner
    const user = state.user.filter((e) => e.id === user_id)
    if (user.length) {
        return true
    } else {
        return false
    }
}