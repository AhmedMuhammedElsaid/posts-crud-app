export interface IPost {
    id: number;
    title: string;
    body: string;
}
export interface IPostsList {
    posts: IPost[];
}
export interface IProps {
    params: {
        id: string;
    };
}
export interface IPropsEdit {
    id?: string;
}