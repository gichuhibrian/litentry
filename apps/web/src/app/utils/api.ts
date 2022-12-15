import axios from 'axios';

const instance = axios.create({
    baseURL: `http://localhost:3333/api/`,
    timeout: 15000,
});

export default instance;

const responseBody = (response: any) => response.data;

export const requests = {
    get: (url: string, headers: object) => instance.get(url, headers).then(responseBody),
    post: (url: string, body: object, headers: object) =>
        instance.post(url, body, headers).then(responseBody),
    put: (url: string, body: object, headers: object) =>
        instance.put(url, body, headers).then(responseBody),
    delete: (url: string, headers: object) => instance.delete(url, headers).then(responseBody),
};
