import axios, { AxiosResponse } from 'axios';
import { IChannel } from '../models/channels';
import { History } from '../index';
import { toast } from 'react-toastify';

axios.defaults.baseURL = 'http://localhost:5000/api'

axios.interceptors.response.use(undefined, (error) => {
    if (error.message === 'Network Error' && !error.response) {
        toast.error('API unreachable')
        return;
    }

    const { status } = error.response;

    status === 404 && History.push('/notfound')
    status === 500 && toast.error('500 Server error')
})

const responseBody = (response: AxiosResponse) => response.data

const request = {
    get: (url: string) => axios.get(url).then(responseBody),
    post: (url: string, body: {}) => axios.post(url, body).then(responseBody),
    put: (url: string, body: {}) => axios.put(url, body).then(responseBody),
    delete: (url: string) => axios.delete(url).then(responseBody)
}

export const channelsAgent = {
    list: (): Promise<IChannel[]> => request.get('/channels'),
    create: (channel: IChannel) => request.post('/channels', channel)
}
