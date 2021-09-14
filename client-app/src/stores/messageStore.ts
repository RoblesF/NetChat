import { action, makeObservable, observable, runInAction } from "mobx";
import { messagesAgent } from "../api/agent";
import { IMessage, IMessageForm } from "../models/messages";
import { RootStore } from "./rootStore";

export default class MessageStore {
    @observable messages: IMessage[] = []
    rootStore: RootStore

    constructor(rootStore: RootStore) {
        makeObservable(this)
        this.rootStore = rootStore
    }

    @action sendMessage = async (message: IMessageForm) => {
        try {
            const result = await messagesAgent.create(message)
            runInAction(() => {
                this.messages.push(result)
            })
        } catch (error) {
            throw error
        }
    }

    @action loadMessages = async (channelId: string) => {
        try {
            const result = await this.rootStore.channelStore.detail(channelId)
            runInAction(() => {
                result.messages?.map((message) => this.messages.push(message))
            })
        } catch (error) {
            throw error
        }
    }
}