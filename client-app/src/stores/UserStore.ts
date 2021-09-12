import { action, computed, makeObservable, observable, runInAction } from "mobx";
import { usersAgent } from "../api/agent";
import { ISignForm, IUser } from "../models/users";
import { RootStore } from "./rootStore";
import { History } from '../index'

export default class UserStore {
    @observable user: IUser | null = null
    rootStore: RootStore

    constructor(rootStore: RootStore) {
        makeObservable(this)
        this.rootStore = rootStore
    }

    @computed get IsSignedIn() {
        return !!this.user
    }

    @action signin = async (values: ISignForm) => {
        try {
            const user = await usersAgent.signin(values)
            runInAction(() => {
                this.user = user
                History.push('/')
                this.rootStore.commonStore.setToken(user.token)
            })
        } catch (error) {
            throw error
        }
    }

    @action signout = () => {
        this.rootStore.commonStore.setToken(null)
        this.user = null
        History.push('/signin')
    }
}