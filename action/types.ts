export interface Video {
    id: string;
    title: string;
    description: string;
    thumbnails: string;
    tags: Array<string>;
    access_model: "open" | "exclusive" | null;
    playlist: string | null;
    payment_address: string | null;
    price_winston: string | null;
    timestamp: string;
    creator: string;
    views: number
}

interface Playlist {
    id: string;
    title: string;
    description: string;
    thumbnails: string;
    tags: Array<string>;
    teaser: string;
    access_model: "open" | "exclusive";
    payment_address: string | null;
    price_winston: string | null;
    video_list: Array<string>;
    timestamp: string;
    creator: string;
}

interface User {
    id: string;
    video: Array<string>;
    playlist: Array<string>;
}

export interface State {
    video: Array<Video>
    playlist: Array<Playlist>
    user: Array<User>
    bought: Array<{ type: "video" | "playlist", id: string, user: string }>
    encrypted_db: Array<{ id: string, content_id: string, writer: string }>
}
type call = "upload_video" | "create_playlist" | "view" | "get_playlist" | "get_video" | "buy" | "write_encryption_key" | "get_encryption_key"
export interface Action {
    input: {
        function: call
        id: string;
        title: string;
        description: string;
        thumbnails: string;
        tags: Array<string>;
        access_model: "open" | "exclusive";
        playlist: string;
        price_winston: string;
        teaser: string;
        type: "video" | "playlist";
        content_id: string;
    }
}
export type _s_return = { state: State }
export type _q_return = { result: { success: boolean; data: Video | Playlist | string } }
export type _return = _s_return | _q_return