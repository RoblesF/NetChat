import { configure } from 'mobx'
import { createContext } from 'react'
import ChannelStore from './channelStore'
import UserStore from './userStore'

configure({ enforceActions: 'always' })

export class RootStore {
    channelStore: ChannelStore
    userStore: UserStore

    constructor() {
        this.channelStore = new ChannelStore(this)
        this.userStore = new UserStore(this)
    }
}

export const RootStoreContext = createContext(new RootStore())