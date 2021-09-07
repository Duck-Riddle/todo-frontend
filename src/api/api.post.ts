import axios from 'axios'
import url from './api.url'
import { TaskProps } from '../features/Tasks/Task.interface'

export const newTask = async (task: TaskProps ): Promise<any> => {
    const response = await axios.post(`${url}/tasks`, task)
    return response.data
}