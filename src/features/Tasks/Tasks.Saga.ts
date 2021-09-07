import { PayloadAction } from "@reduxjs/toolkit"
import { takeEvery, select, call, put } from "redux-saga/effects"
import { fetchAll, newTask, remove, updateTaskDone } from "../../api"
import { TaskProps } from "./Task.interface"
import { AsyncAddTask, AsyncDelTask, AsyncToggleTaskDone, SelectTasks, SyncPushTask, SyncTasks, TestOverflow } from "./Tasks.Slice"

function* addTaskHandler(action:PayloadAction<TaskProps>) {
    const task: TaskProps = yield call(newTask, action.payload)
    yield put(SyncPushTask(task))
}

function* delTaskHandler(action:PayloadAction<string>) {
    yield call(remove, action.payload)
}

function* toggleTaskDoneHandler(action:PayloadAction<{id:string, done:boolean}>) {
    const state: TaskProps[] = yield select(SelectTasks)
    console.log(...state.filter(({done})=>done))

    try {
        const {id, done} = action.payload
        yield call(updateTaskDone, id, done)
    } catch(err) {
        console.log(err)
    }
}

function* HandleOverflow() {
    const state: TaskProps[] = yield select(SelectTasks)
    const limit = 3000 - state.length
    for (let i=1; i<=limit; i++) {
        yield put(AsyncAddTask(`Test if app can handle overfow of 3000 tasks, id:${i}`))
    }
}

function* onStartup() {
    const resoult:TaskProps[] = yield call(fetchAll)
    yield put(SyncTasks(resoult))

}


export default function* TasksSaga() {
    yield onStartup()
    yield takeEvery( AsyncAddTask, addTaskHandler)
    yield takeEvery( AsyncDelTask, delTaskHandler)
    yield takeEvery( AsyncToggleTaskDone, toggleTaskDoneHandler)
    yield takeEvery( TestOverflow, HandleOverflow)
}