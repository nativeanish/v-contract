import { State } from "../types";
import { _check_user } from "./_check_user";
/**
 *
 *
 * @export
 * @param {State} state
 * @param {string} playlist_id
 * @return {*}  {boolean}
 */
export function _check_playlist_auth(state: State, playlist_id: string): boolean {
    //@ts-ignore 
    const user_id: string = SmartWeave.transaction.owner
    const check = _check_user(state)
    if (check) {
        const user = state.user.filter((e) => e.id === user_id)
        if (user.length && user[0].playlist.filter((e) => e === playlist_id).length) {
            return true
        } else {
            return false
        }
    } else {
        return false
    }
}