import { action, makeObservable, observable, runInAction, toJS } from "mobx";
import { channelsAgent } from "../api/agent";
import { IChannel } from "../models/channels";
import { RootStore } from "./rootStore";

export default class ChannelStore {
    @observable channelsMobx: IChannel[] = []
    @observable isModalVisible: boolean = false
    @observable activeChannel: IChannel | null = null
    @observable isChannelLoaded: boolean = false
    rootStore: RootStore

    constructor(rootStore: RootStore) {
        makeObservable(this)
        this.rootStore = rootStore
    }

    @action loadChannels = async () => {
        try {
            const response = await channelsAgent.list()
            runInAction(() => {
                response.map((channel) => this.channelsMobx.push(channel))
                this.isChannelLoaded = true
            })
        } catch (error) {
            console.error(error)
        }
    }

    @action setModalVisible = (show: boolean) => {
        this.isModalVisible = show
    }

    @action setActiveChannel = (channel: IChannel) => {
        this.activeChannel = channel
    }

    @action getCurrentChannel = () => {
        return toJS(this.activeChannel ?? this.channelsMobx[0])
    }

    @action detail = async (channelId: string): Promise<IChannel> => {
        try {
            return await channelsAgent.detail(channelId)
        } catch (error) {
            throw error
        }
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
