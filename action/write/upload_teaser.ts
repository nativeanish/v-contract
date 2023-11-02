import { Action, State } from "../types";
declare const ContractError: new (arg0: string) => any;

export function upload_teaser(state: State, action: Action) {
    if (action.input.id?.length && action.input.teaser?.length) {
        //@ts-ignore 
        const user: string = SmartWeave.transaction.owner
        const playlist = state.playlist.filter((e) => e.id === action.input.id)
        if (playlist?.length && playlist[0]?.id) {
            if (playlist[0].creator === user) {
                playlist[0].teaser = action.input.teaser
                return { state: state }
            } else {
                throw new ContractError("unauthenticated request")
            }
        } else {
            throw new ContractError("Playlist not found")
        }
    } else {
        throw new ContractError("Basic Fields are Missing")
    }
}