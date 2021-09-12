import { action, computed, observable } from "mobx";
import { usersAgent } from "../api/agent";
import { ISignForm, IUser } from "../models/users";

export default class UserStore {
    @observable user: IUser | null = null

    @computed get IsSignedIn() {
        return !!this.user
    }

    @action signin = async (values: ISignForm) => {
        try {
            const user = await usersAgent.signin(values)
            this.user = user
        } catch (error) {
            console.error(error)
        }
    }
}