export interface IUser {
    userName: string,
    email: string,
    token: string
    avatar: string | null
}

export interface ISignForm {
    UserName: string,
    Email: string,
    Password: string
}