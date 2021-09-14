import { IUser } from "./users";

export interface IMessage {
    content: string
    createdAt: Date
    user: IUser
}

export interface IMessageForm {
    content: string
    channelId: string
}