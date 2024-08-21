export type CreateUserProps = {
    email: string,
    username: string,
    password: string
}

export type SignInProps = {
    email: string,
    password: string
}

export type PostProps = {
    $id: string,
    title: string,
    prompt?: string;
    thumbnail: string,
    video: string
    creator: UserProps
}

export type UserProps = {
    id: string,
    avatar: string,
    username: string
}