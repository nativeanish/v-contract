import { State } from "../types";

export function _write_to_user(state: State, type: "video" | "playlist", id: string): State {
    //@ts-ignore 
    const user_id: string = SmartWeave.transaction.owner
    const user = state.user.filter((e) => e.id === user_id)
    if (user.length) {
        if (type === "video") {
            user[0].video.push(id)
        }
        if (type === "playlist") {
            user[0].playlist.push(id)
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