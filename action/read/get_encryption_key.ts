import { Action, State, _q_return } from "../types";

/**
 *
 *
 * @export
 * @param {State} state
 * @param {Action} action
 * @return {*}  {_q_return}
 */
export function get_encryption_key(state: State, action: Action): _q_return {
    if (action.input.content_id?.length) {
        //@ts-ignore 
        const owner = SmartWeave.transaction.owner
        const encrypted_db = state.encrypted_db.filter((e) => e.writer === String(owner))
        if (encrypted_db?.length) {
            const key = encrypted_db.find((e) => e.content_id === action.input.content_id)
            if (key?.id?.length) {
                return { result: { success: true, data: String(key.id) } }
            } else {
                return { result: { success: false, data: `${action.input.content_id} content id is not registered yet from your wallet` } }
            }

        } else {
            return { result: { success: false, data: "You don't have any entries" } }
        }
    } else {
        return { result: { success: false, data: "Some Fields are missing" } }
    }
}