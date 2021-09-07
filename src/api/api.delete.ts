import axios from 'axios'
import url from './api.url'

export const remove = async (id:string): Promise<any> => {
    console.log(id)
    const response = await axios.delete(`${url}/tasks/${id}`, {
        params: id
    })
    return response.data
}