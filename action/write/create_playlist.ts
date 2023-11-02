import { Action, State, _s_return } from "../types";
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
export function create_playlist(state: State, action: Action): _s_return {
    if (action.input.title?.length && action.input.id?.length && action.input.description?.length && action.input.tags?.length && action.input.access_model?.length) {
        switch (action.input.access_model) {
            case "open":
                return __open(state, action)
            case "exclusive":
                return __exclusive(state, action)
            default:
                throw new ContractError("You must select an access model. Open or Exclusive")
        }
    } else {
        throw new ContractError("Some basic fields are missing")
    }
}
function __exclusive(state: State, action: Action): _s_return {
    //@ts-ignore 
    const user: string = SmartWeave.transaction.owner
    if (action.input.price_winston?.length) {
        state.playlist.push({
            id: action.input.id,
            title: action.input.title,
            description: action.input.description,
            tags: action.input.tags,
            access_model: "exclusive",
            thumbnails: action.input.thumbnails?.length ? action.input.thumbnails : "",
            video_list: [],
            teaser: action.input.teaser?.length ? action.input.teaser : "",
            //@ts-ignore 
            timestamp: String(SmartWeave.block.timestamp),
            //@ts-ignore
            payment_address: String(SmartWeave.transaction.owner),
            price_winston: action.input.price_winston,
            creator: String(user)
        })
        state = _write_to_user(state, "playlist", action.input.id)
        return { state: state }
    } else {
        throw new ContractError("In Exclusive Playlist, You must set the price")
    }
}

function __open(state: State, action: Action): _s_return {
    //@ts-ignore 
    const user: string = SmartWeave.transaction.owner
    state.playlist.push({
        id: action.input.id,
        title: action.input.title,
        description: action.input.description,
        tags: action.input.tags,
        access_model: "open",
        thumbnails: action.input.thumbnails?.length ? action.input.thumbnails : "",
        video_list: [],
        teaser: action.input.teaser?.length ? action.input.teaser : "",
        //@ts-ignore 
        timestamp: String(SmartWeave.block.timestamp),
        creator: String(user),
        price_winston: null,
        payment_address: null
    })
    state = _write_to_user(state, "playlist", action.input.id)
    return { state: state }
}