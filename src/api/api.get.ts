import axios from 'axios'
import url from './api.url'

export const fetchAll = async (): Promise<any> => {
    const response = await axios.get(`${url}/tasks`)
    return response.data
}

export const fetchOne = async (id:string): Promise<any> => {
    const response = await axios.get(`${url}/tasks`,{
        params:id
    })
    return response.data
}
