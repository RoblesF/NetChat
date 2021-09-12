import { action, computed, makeObservable, observable, runInAction } from "mobx";
import { usersAgent } from "../api/agent";
import { ISignForm, IUser } from "../models/users";
import { RootStore } from "./rootStore";

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
                console.log(user)
            })
        } catch (error) {
            throw error
        }
    }
}