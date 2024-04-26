import {v1} from 'uuid'
import {combineReducers, createStore} from 'redux'
import {todosistsReducer} from '../state/todolists-reducer'
import {tasksReducer} from '../state/tasks-reducer'
import {Provider} from 'react-redux'
import {AppRootStateType} from '../state/store'
import {TaskPriorities, TaskStatuses} from '../api/todolists-api'

const rootReducer = combineReducers({
    todolists: todosistsReducer,
    tasks: tasksReducer,
})

const initialGlobalState: AppRootStateType = {
    todolists: [
        {id: 'todolistId1', title: 'What to learn', filter: 'all', addedDate: '', order: 0},
        {id: 'todolistId2', title: 'What to buy', filter: 'all', addedDate: '', order: 0},
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
}

export const storybookStore = createStore(rootReducer, initialGlobalState as any)

export const ReduxStoreProviderDecorator = (storyFn: any) => {
    return <Provider store={storybookStore}>{storyFn()}</Provider>
}