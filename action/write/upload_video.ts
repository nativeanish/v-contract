import { _check_playlist_auth } from "../read/_check_playlist_auth";
import { State, Action, Video, _s_return } from "../types";
import { _write_to_playlist } from "./_write_to_playlist";
import { _write_to_user } from "./_write_to_user";
declare const ContractError: new (arg0: string) => any;
export function upload_video(state: State, action: Action): _s_return {
    if (action.input.id.length && action.input.title && action.input.description && action.input.tags.length && action.input.access_model.length) {
        //@ts-ignore 
        const user_id: string = SmartWeave.transaction.owner
        if (action.input.playlist.length) {
            const check = _check_playlist_auth(state, action.input.playlist)
            if (check) {
                state.video.push({
                    title: action.input.title,
                    id: action.input.id,
                    description: action.input.description,
                    tags: action.input.tags,
                    //@ts-ignore 
                    timestamp: String(SmartWeave.block.timestamp),
                    creator: user_id,
                    views: 0,
                    thumbnails: action.input.thumbnails.length ? action.input.thumbnails : "",
                    access_model: null,
                    payment_address: null,
                    price: null,
                    playlist: null
                })
                state = _write_to_playlist(state, action)
            } else {
                throw new ContractError("Playlist doesn't exits")
            }
        } else {
            if (action.input.access_model === "open") {
                state.video.push({
                    title: action.input.title,
                    id: action.input.id,
                    description: action.input.description,
                    tags: action.input.tags,
                    //@ts-ignore 
                    timestamp: String(SmartWeave.block.timestamp),
                    creator: user_id,
                    views: 0,
                    thumbnails: action.input.thumbnails.length ? action.input.thumbnails : "",
                    access_model: "open",
                    payment_address: null,
                    price: null,
                    playlist: null
                })
                state = _write_to_user(state, "video", action.input.id)
            }
            if (action.input.access_model === "exclusive") {
                state.video.push({
                    title: action.input.title,
                    id: action.input.id,
                    description: action.input.description,
                    tags: action.input.tags,
                    //@ts-ignore 
                    timestamp: String(SmartWeave.block.timestamp),
                    creator: user_id,
                    views: 0,
                    thumbnails: action.input.thumbnails.length ? action.input.thumbnails : "",
                    access_model: "open",
                    payment_address: user_id,
                    price: action.input.price,
                    playlist: null
                })
                state = _write_to_user(state, "video", action.input.id)
            }
        }
        return { state: state }
    } else {
        throw new ContractError("Something Basics Field is Missing")
    }
}