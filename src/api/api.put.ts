import axios from 'axios'
import url from './api.url'

export const updateTaskDone = async (id:string, done:boolean): Promise<any> => {
    const response = await axios.put(`${url}/tasks/${id}`, {done}, {
        params: id
    })
    return response.data
}