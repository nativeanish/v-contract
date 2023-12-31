import { Action, State, _s_return } from "../types";
declare const ContractError: new (arg0: string) => any;

/**
 *
 *
 * @export
 * @param {State} state
 * @param {Action} action
 * @return {*}  {_s_return}
 */
export function write_encryption_key(state: State, action: Action): _s_return {
    if (action.input.id?.length && action.input.content_id?.length && action.input.iv1?.length && action.input.iv2?.length) {
        //@ts-ignore 
        const owner = SmartWeave.transaction.owner
        state.encrypted_db.push({ id: action.input.id, content_id: action.input.content_id, writer: owner, iv1: action.input.iv1, iv2: action.input.iv2 })
        return { state: state }
    } else {
        throw new ContractError("Some Fields are missing")
    }
}