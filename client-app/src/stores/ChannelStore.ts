import { action, makeObservable, observable, runInAction } from "mobx";
import { channelsAgent } from "../api/agent";
import { IChannel } from "../models/channels";
import { RootStore } from "./rootStore";

export default class ChannelStore {
    @observable channelsMobx: IChannel[] = []
    @observable isModalVisible: boolean = false
    rootStore: RootStore

    constructor(rootStore: RootStore) {
        makeObservable(this)
        this.rootStore = rootStore
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
