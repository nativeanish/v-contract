import { State } from "../types";

/**
 *
 *
 * @export
 * @param {State} state
 * @param {("video" | "playlist")} type
 * @param {string} id
 * @return {*}  {State}
 */
export function _write_to_user(state: State, type: "video" | "playlist", id: string): State {
    //@ts-ignore 
    const user_id: string = SmartWeave.transaction.owner
    const user = state.user.find((e) => e.id === user_id)
    if (user?.id.length) {
        if (type === "video") {
            user.video.push(id)
        }
        if (type === "playlist") {
            user.playlist.push(id)
        }
        return state
    } else {
        state.user.push({
            id: user_id,
            video: type === "video" ? [id] : [],
            playlist: type === "playlist" ? [id] : []
        })
        return state
    }
}