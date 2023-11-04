import { State, Action, _s_return } from "../types";
import { _write_to_user } from "./_write_to_user";
declare const ContractError: new (arg0: string) => any;
/**
 *
 *
 * @export
 * @param {State} state
 * @param {Action} action
 * @return {*}  {_s_return}
 */
export function upload_video(state: State, action: Action): _s_return {
    if (action.input.id?.length && action.input.title?.length && action.input.description?.length && action.input.tags?.length) {
        //@ts-ignore 
        const user_id: string = SmartWeave.transaction.owner
        if (action.input.playlist?.length) {
            return upload_in_playlist(state, action)
        }
        if (action.input.access_model?.length) {
            switch (action.input.access_model) {
                case "exclusive":
                    return upload_exclusive(state, action)
                case "open":
                    return upload_open(state, action)
                default:
                    throw new ContractError("Access Model is wrong")
            }
        } else {
            throw new ContractError("Access Model is not Defined")
        }
    } else {
        throw new ContractError("Some Basics Field is Missing")
    }
}
function upload_in_playlist(state: State, action: Action): _s_return {
    //@ts-ignore 
    const user_id: string = SmartWeave.transaction.owner
    const playlist = state.playlist.filter((e) => e.id === action.input.playlist)
    if (playlist[0]?.id?.length) {
        if (playlist[0].creator === user_id) {
            state.video.push({
                title: action.input.title,
                id: action.input.id,
                description: action.input.description,
                tags: action.input.tags,
                //@ts-ignore 
                timestamp: String(SmartWeave.block.timestamp),
                creator: user_id,
                views: 0,
                thumbnails: action.input.thumbnails?.length ? action.input.thumbnails : "",
                access_model: null,
                payment_address: null,
                price_winston: null,
                playlist: playlist[0].id
            })
            playlist[0].video_list.push(action.input.id)
            return { state: state }
        } else {
            throw new ContractError("Unauthenticated request")
        }
    } else {
        throw new ContractError("Playlist doesn't exits")
    }
}

function upload_open(state: State, action: Action): _s_return {
    //@ts-ignore 
    const user_id: string = SmartWeave.transaction.owner
    state.video.push({
        title: action.input.title,
        id: action.input.id,
        description: action.input.description,
        tags: action.input.tags,
        //@ts-ignore 
        timestamp: String(SmartWeave.block.timestamp),
        creator: user_id,
        views: 0,
        thumbnails: action.input.thumbnails?.length ? action.input.thumbnails : "",
        access_model: "open",
        payment_address: null,
        price_winston: null,
        playlist: null
    })
    state = _write_to_user(state, "video", action.input.id)
    return { state: state }
}

function upload_exclusive(state: State, action: Action): _s_return {
    //@ts-ignore 
    const user_id: string = SmartWeave.transaction.owner
    if (action.input.price_winston?.length) {
        state.video.push({
            title: action.input.title,
            id: action.input.id,
            description: action.input.description,
            tags: action.input.tags,
            //@ts-ignore 
            timestamp: String(SmartWeave.block.timestamp),
            creator: user_id,
            views: 0,
            thumbnails: action.input.thumbnails?.length ? action.input.thumbnails : "",
            access_model: "exclusive",
            payment_address: user_id,
            price_winston: action.input.price_winston,
            playlist: null
        })
        state = _write_to_user(state, "video", action.input.id)
        return { state: state }
    } else {
        throw new ContractError("In Exclusive Model, you need to set a price")
    }
}