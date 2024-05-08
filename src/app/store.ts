import {applyMiddleware, combineReducers, createStore} from 'redux'
import {todosistsReducer} from '../features/TodolistsList/todolists-reducer'
import {tasksReducer} from '../features/TodolistsList/tasks-reducer'
import thunk from 'redux-thunk'
import {appReducer} from './app-reducer'

// type AppRootStateType = {
//     todolists: TodoListType[]
//     tasks: TasksStateType
// }

const rootReducer = combineReducers({
    todolists: todosistsReducer,
    tasks: tasksReducer,
    app: appReducer,
})

export type AppRootStateType = ReturnType<typeof rootReducer>

// export const store = createStore(rootReducer, applyMiddleware(thunk) as any)
export const store = createStore(rootReducer, applyMiddleware(thunk))

// @ts-ignore
window.store = store