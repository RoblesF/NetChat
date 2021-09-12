import axios, { AxiosResponse } from 'axios';
import { IChannel } from '../models/channels';
import { History } from '../index';
import { toast } from 'react-toastify';
import { ISignForm, IUser } from '../models/users'

axios.defaults.baseURL = 'http://localhost:5000/api'

axios.interceptors.response.use(undefined, (error) => {
    if (error.message === 'Network Error' && !error.response) {
        toast.error('API unreachable')
        return;
    }

    const { status } = error.response;

    // status === 404 && History.push('/notfound')
    status === 500 && toast.error('500 Server error')

    throw error.response

})

axios.interceptors.request.use((config) => {
    const token = window.localStorage.getItem('jwt')

    if (token)
        config.headers.authorization = `Bearer ${token}`

    return config
}, (error) => Promise.reject(error))

const responseBody = (response: AxiosResponse) => response.data

const request = {
    get: (url: string) => axios.get(url).then(responseBody),
    post: (url: string, body: {}) => axios.post(url, body).then(responseBody),
    put: (url: string, body: {}) => axios.put(url, body).then(responseBody),
    delete: (url: string) => axios.delete(url).then(responseBody)
}

export const channelsAgent = {
    list: (): Promise<IChannel[]> => request.get('/channels/getchannels'),
    create: (channel: IChannel) => request.post('/channels/getchannel', channel)
}

export const usersAgent = {
    signin: (user: ISignForm): Promise<IUser> => request.post('/users/signin', user),
    signup: (user: ISignForm): Promise<IUser> => request.post('/users/signup', user),
    getcurrentuser: (): Promise<IUser> => request.get('/users/getcurrentuser')
}