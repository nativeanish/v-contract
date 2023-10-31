import { Action, State, _return } from "../types";
import { _write_to_user } from "./_write_to_user";
declare const ContractError: new (arg0: string) => any;
export function create_playlist(state: State, action: Action): _return {
    if (action.input.id.length && action.input.description.length && action.input.tags.length && action.input.access_model.length) {
        //@ts-ignore 
        const user: string = SmartWeave.transaction.owner
        if (action.input.access_model === "open") {
            state.playlist.push({
                id: action.input.id,
                title: action.input.title,
                description: action.input.description,
                tags: action.input.tags,
                access_model: "open",
                thumbnails: action.input.thumbnails.length ? action.input.thumbnails : "",
                video_list: [],
                teaser: action.input.teaser.length ? action.input.teaser : "",
                //@ts-ignore 
                timestamp: String(SmartWeave.block.timestamp),
                creator: String(user)
            })
        } else if (action.input.access_model === "exclusive") {
            if (action.input.price.length) {
                state.playlist.push({
                    id: action.input.id,
                    title: action.input.title,
                    description: action.input.description,
                    tags: action.input.tags,
                    access_model: "open",
                    thumbnails: action.input.thumbnails.length ? action.input.thumbnails : "",
                    video_list: [],
                    teaser: action.input.teaser.length ? action.input.teaser : "",
                    //@ts-ignore 
                    timestamp: String(SmartWeave.block.timestamp),
                    //@ts-ignore
                    payment_address: String(SmartWeave.transaction.owner),
                    price: action.input.price,
                    creator: String(user)
                })
            } else {
                throw new ContractError("In Exclusive Playlist, You must set the price")
            }
        } else {
            throw new ContractError("You must select an access model. Open or Exclusive")
        }
        state = _write_to_user(state, "playlist", action.input.id)
        return { state: state }
    } else {
        throw new ContractError("Some basic fields are missing")
    }
}