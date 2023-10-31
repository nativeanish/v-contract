export interface Video {
    id: string;
    title: string;
    description: string;
    thumbnails: string;
    tags: Array<string>;
    access_model: "open" | "exclusive" | null;
    playlist: string | null;
    payment_address: string | null;
    price: string | null;
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
    payment_address?: string;
    price?: string;
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
}
type call = "upload_video" | "create_playlist" | "view" | "get_playlist" | "get_video"
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
        price: string;
        teaser: string;
        type: "video" | "playlist"

    }
}
export type _return = { state: State }