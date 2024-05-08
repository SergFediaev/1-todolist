import {v1} from 'uuid'
import {applyMiddleware, combineReducers, createStore} from 'redux'
import {todosistsReducer} from '../features/TodolistsList/todolists-reducer'
import {tasksReducer} from '../features/TodolistsList/tasks-reducer'
import {Provider} from 'react-redux'
import {AppRootStateType} from '../app/store'
import {TaskPriorities, TaskStatuses} from '../api/todolists-api'
import {appReducer} from '../app/app-reducer'
import thunk from 'redux-thunk'

const rootReducer = combineReducers({
    todolists: todosistsReducer,
    tasks: tasksReducer,
    app: appReducer,
})

const initialGlobalState: AppRootStateType = {
    todolists: [
        {id: 'todolistId1', title: 'What to learn', filter: 'all', addedDate: '', order: 0, entityStatus: 'idle'},
        {id: 'todolistId2', title: 'What to buy', filter: 'all', addedDate: '', order: 0, entityStatus: 'loading'},
    ],
    tasks: {
        ['todolistId1']: [
            {
                id: v1(), title: 'HTML & CSS', status: TaskStatuses.Completed,
                todoListId: 'todolistId1',
                description: '',
                startDate: '',
                deadline: '',
                addedDate: '',
                order: 0,
                priority: TaskPriorities.Low,
            },
            {
                id: v1(), title: 'JavaScript', status: TaskStatuses.Completed,
                todoListId: 'todolistId1',
                description: '',
                startDate: '',
                deadline: '',
                addedDate: '',
                order: 0,
                priority: TaskPriorities.Low,
            },
        ],
        ['todolistId2']: [
            {
                id: v1(), title: 'Milk', status: TaskStatuses.Completed,
                todoListId: 'todolistId2',
                description: '',
                startDate: '',
                deadline: '',
                addedDate: '',
                order: 0,
                priority: TaskPriorities.Low,
            },
            {
                id: v1(), title: 'React Book', status: TaskStatuses.Completed,
                todoListId: 'todolistId2',
                description: '',
                startDate: '',
                deadline: '',
                addedDate: '',
                order: 0,
                priority: TaskPriorities.Low,
            },
        ],
    },
    app: {
        error: null,
        status: 'idle',
    },
}

export const storybookStore = createStore(rootReducer, initialGlobalState as any, applyMiddleware(thunk))

export const ReduxStoreProviderDecorator = (storyFn: any) => {
    return <Provider store={storybookStore}>{storyFn()}</Provider>
}