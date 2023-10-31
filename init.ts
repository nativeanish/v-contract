import { get_playlist } from "./action/read/get_playlist";
import { get_video } from "./action/read/get_video";
import { Action, State, _return } from "./action/types";
import { buy } from "./action/write/buy";
import { create_playlist } from "./action/write/create_playlist";
import { upload_video } from "./action/write/upload_video";
import { view } from "./action/write/view";
declare const ContractError: new (arg0: string) => any;

export function handle(state: State, action: Action): _return {
    switch (action.input.function) {
        case "upload_video":
            return upload_video(state, action);
        case "create_playlist":
            return create_playlist(state, action)
        case "buy":
            return buy(state, action)
        case "view":
            return view(state, action)
        case "get_playlist":
            return get_playlist(state, action)
        case "get_video":
            return get_video(state, action)
        default:
            throw new ContractError("Undefined Method Called")
    }
}