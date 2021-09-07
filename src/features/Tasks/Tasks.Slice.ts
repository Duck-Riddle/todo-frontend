import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import { TaskProps } from "./Task.interface";
import { RootState } from "../../store";

const initialState: TaskProps[] = []

export const TasksSlice = createSlice({
    name: "tasks",
    initialState,
    reducers: {
        AsyncAddTask: {
            reducer: (state, action: PayloadAction<TaskProps>)=>{},
            prepare: (txt: string) => {
                return {
                   payload: {
                       txt,
                       done: false,
                       timeStamp: Date.now(),

                   }
                }
            }
        },
        SyncPushTask: (state, action: PayloadAction<TaskProps>) => {
            state.push(action.payload)
        },

        AsyncDelTask: (state, action: PayloadAction<string|undefined>)=>{
            try {
                const taskIndex = state.findIndex(task => task.id === action.payload)
                state.splice(taskIndex, 1)
            } catch(err) {
                console.log(err)
            }

        },
        AsyncToggleTaskDone: {
            reducer: (state, action: PayloadAction<{id?:string, done?:boolean}>)=>{
                const taskIndex = state.findIndex(task => task.id === action.payload.id)
                state[taskIndex].done = action.payload.done !== null 
                    ? !action.payload.done
                    : state[taskIndex].done
            },
            prepare: (id?:string, done?:boolean) => {
                return {
                    payload: {
                        id,
                        done
                    }
                }
            }

        },
        SyncTasks: (state, action: PayloadAction<TaskProps[]>) => action.payload,
        Sort: (state, action: PayloadAction<boolean>) => {
            if (!action.payload) {
                state.sort((a, b)=>{
                    if (a.done===b.done) return 0
                    if (a.done) return 1
                    return -1
                })
            } else {
                state.sort((a, b)=>{
                    const timeStampA = a.timeStamp || 0
                    const timeStampB = b.timeStamp || 0
                    return timeStampA - timeStampB
                })
            }
        },
        TestOverflow: () => {}
        
    }
})

export const {
    AsyncAddTask,
    SyncPushTask,
    AsyncDelTask,
    AsyncToggleTaskDone,
    SyncTasks,
    TestOverflow,
    Sort } = TasksSlice.actions

export const SelectTasks = (state: RootState) => state.tasks
export default TasksSlice.reducer

