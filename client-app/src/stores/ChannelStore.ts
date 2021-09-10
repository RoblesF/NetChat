import { action, makeObservable, observable, runInAction } from "mobx";
import { createContext } from 'react'
import { channelsAgent } from "../api/agent";
import { IChannel } from "../models/channels";

class ChannelStore {
    @observable channelsMobx: IChannel[] = []
    @observable isModalVisible: boolean = false

    constructor() {
        makeObservable(this)
    }

    @action loadChannels = async () => {
        try {
            const response = await channelsAgent.list()
            runInAction(() => response.map((channel) => this.channelsMobx.push(channel)))
        } catch (error) {
            console.error(error)
        }
    }

    @action setModalVisible = (show: boolean) => {
        this.isModalVisible = show
    }

    @action createChannel = async (channel: IChannel) => {
        try {
            await channelsAgent.create(channel)
            runInAction(() => this.channelsMobx.push(channel))
        } catch (error) {
            console.error(error)
        }
    }
}

export default createContext(new ChannelStore())