import axios from 'axios';

const API_URL_PROJECT = '/api/projects';
const API_URL_LOGIN = '/api/login';
const API_URL_SIGNUP = '/api/signup';

export const fetchProjects = async (sortBy: string, page: number, limit: number) => {
    const response = await axios.get(API_URL_PROJECT, {
        params: {
            sortBy,
            page,
            limit,
        },
    });
    return response.data;
};
export const loginUser = async (username:string, password:string) => {
    const response = await axios.post(API_URL_LOGIN, { username, password });
    return response;  
}
export const signUp = async (username:string, password:string) => {
    const response = await axios.post(API_URL_SIGNUP, { username, password });
    return response;  
}