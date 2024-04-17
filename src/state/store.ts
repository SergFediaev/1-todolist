import {combineReducers, createStore} from 'redux'
import {todosistsReducer} from './todolists-reducer'
import {tasksReducer} from './tasks-reducer'

// type AppRootStateType = {
//     todolists: TodoListType[]
//     tasks: TasksStateType
// }

const rootReducer = combineReducers({
    todolists: todosistsReducer,
    tasks: tasksReducer,
})

export type AppRootStateType = ReturnType<typeof rootReducer>

export const store = createStore(rootReducer)

// @ts-ignore
window.store = store