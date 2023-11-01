import { State } from "../types";

/**
 *
 *
 * @export
 * @param {State} state
 * @return {*}  {boolean}
 */
export function _check_user(state: State): boolean {
    //@ts-ignore 
    const user_id: string = SmartWeave.transaction.owner
    const user = state.user.find((e) => e.id === user_id)
    if (user?.id?.length) {
        return true
    } else {
        return false
    }
}