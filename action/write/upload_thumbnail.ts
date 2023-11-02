import { Action, State, _s_return } from "../types";
declare const ContractError: new (arg0: string) => any;
const ___video = (state: State, action: Action): _s_return => {
    //@ts-ignore 
    const user: string = SmartWeave.transaction.owner
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
}

const ___playlist = (state: State, action: Action): _s_return => {
    //@ts-ignore 
    const user: string = SmartWeave.transaction.owner
    const playlist = state.playlist.filter((e) => e.id === action.input.id)
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
}
export function upload_thumbnail(state: State, action: Action): _s_return {
    if (action.input.id?.length && action.input.thumbnails?.length && action.input.type?.length) {
        //@ts-ignore 
        const user: string = SmartWeave.transaction.owner
        switch (action.input.type) {
            case "video":
                return ___video(state, action)
            case "playlist":
                return ___playlist(state, action)
            default:
                throw new ContractError("Type should be either Video or playlist")
        }
    } else {
        throw new ContractError("Some basic fields are missing")
    }
}