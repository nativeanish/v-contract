import { Action, State, _return } from "../types";
declare const ContractError: new (arg0: string) => any;
export function buy(state: State, action: Action): _return {
    //@ts-ignore
    const owner = SmartWeave.transaction.target
    //@ts-ignore 
    const qty = SmartWeave.transaction.quantity
    //@ts-ignore
    const user = SmartWeave.transaction.owner;
    if (action.input.type === "video") {
        const video = state.video.filter((e) => e.id === action.input.id)
        if (video[0].access_model === "exclusive") {
            if (video[0].creator === String(owner) && Number(qty) >= Number(Number(video[0].price) * 1000000000000)) {
                state.bought.push({ type: "video", id: action.input.id, user: String(user) })
                return { state: state }
            } else {
                throw new ContractError("Not enough amount send or sent person was not right")
            }
        } else {
            throw new ContractError("You don't need to buy this content. It is Free/Open Access")
        }
    }
    else if (action.input.type === "playlist") {
        const playlist = state.playlist.filter((e) => e.id === action.input.id)
        if (playlist[0].access_model === "exclusive") {
            if (playlist[0].creator === String(owner) && Number(qty) >= Number(Number(playlist[0].price) * 1000000000000)) {
                state.bought.push({ type: "playlist", id: action.input.id, user: String(user) })
                return { state: state }
            } else {
                throw new ContractError("Not enough amount send or sent person was not right")
            }
        } else {
            throw new ContractError("You don't need to buy this content. It is Free/Open Access")
        }
    } else {
        throw new ContractError("Unrecognized type called")
    }
}