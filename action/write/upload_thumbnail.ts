import { Action, State } from "../types";
declare const ContractError: new (arg0: string) => any;

export function upload_thumbnail(state: State, action: Action) {
    if (action.input.id?.length && action.input.thumbnails?.length && action.input.type?.length) {
        //@ts-ignore 
        const user: string = SmartWeave.transaction.owner
        if (action.input.type === "video") {
            const video = state.video.filter((e) => e.id === action.input.id)
            if (video?.length && video[0]?.id) {
                if (video[0].creator === user) {
                    video[0].thumbnails = action.input.thumbnails
                    return { state: state }
                } else {
                    throw new ContractError("unauthenticated request")
                }
            } else {
                throw new ContractError("Video not found")
            }
        } else if (action.input.type === "playlist") {
            const playlist = state.video.filter((e) => e.id === action.input.id)
            if (playlist?.length && playlist[0]?.id) {
                if (playlist[0].creator === user) {
                    playlist[0].thumbnails = action.input.thumbnails
                    return { state: state }
                } else {
                    throw new ContractError("unauthenticated request")
                }
            } else {
                throw new ContractError("Playlist not found")
            }
        } else {
            throw new ContractError("Type should be either Video or playlist")
        }
    } else {
        throw new ContractError("Some basic fields are missing")
    }
}