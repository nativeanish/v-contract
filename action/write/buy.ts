import { Action, State, _s_return } from "../types";
declare const ContractError: new (arg0: string) => any;
/**
 *
 *
 * @export
 * @param {State} state
 * @param {Action} action
 * @return {*}  {_s_return}
 */
export function buy(state: State, action: Action): _s_return {
    if (action.input.id?.length && action.input.type?.length) {
        switch (action.input.type) {
            case "video":
                return _____video(state, action)
            case "playlist":
                return ____playlist(state, action)
            default:
                throw new ContractError("Unrecognized type called")
        }
    } else {
        throw new ContractError("Basic Fields like id or type is missing")
    }
}
function _____video(state: State, action: Action): _s_return {
    //@ts-ignore
    const owner = SmartWeave.transaction.target
    //@ts-ignore 
    const qty = SmartWeave.transaction.quantity
    //@ts-ignore
    const user = SmartWeave.transaction.owner;
    const video = state.video.find((e) => e.id === action.input.id)
    if (video?.id?.length) {
        if (video.access_model === "exclusive") {
            if (video.creator === String(owner) && Number(qty) === Number(video.price_winston)) {
                state.bought.push({ type: "video", id: action.input.id, user: String(user) })
                return { state: state }
            } else {
                throw new ContractError("Not enough amount send or sent to wrong wallet")
            }
        } else {
            throw new ContractError("You don't need to buy this content. It is Free/Open Access")
        }
    } else {
        throw new ContractError("Video is not present")
    }
}

function ____playlist(state: State, action: Action): _s_return {
    //@ts-ignore
    const owner = SmartWeave.transaction.target
    //@ts-ignore 
    const qty = SmartWeave.transaction.quantity
    //@ts-ignore
    const user = SmartWeave.transaction.owner;
    const playlist = state.playlist.find((e) => e.id === action.input.id)
    if (playlist?.id?.length) {
        if (playlist.access_model === "exclusive") {
            if (playlist.creator === String(owner) && Number(qty) === Number(playlist.price_winston)) {
                state.bought.push({ type: "playlist", id: action.input.id, user: String(user) })
                return { state: state }
            } else {
                throw new ContractError("Not enough amount send or sent to wrong wallet")
            }
        } else {
            throw new ContractError("You don't need to buy this content. It is Free/Open Access")
        }
    } else {
        throw new ContractError("Playlist is not present")
    }
}