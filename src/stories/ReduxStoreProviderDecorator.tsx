import {v1} from 'uuid'
import {combineReducers, createStore} from 'redux'
import {todosistsReducer} from '../state/todolists-reducer'
import {tasksReducer} from '../state/tasks-reducer'
import {Provider} from 'react-redux'

const rootReducer = combineReducers({
    todolists: todosistsReducer,
    tasks: tasksReducer,
})

const initialGlobalState = {
    todolists: [
        {id: 'todolistId1', title: 'What to learn', filter: 'all'},
        {id: 'todolistId2', title: 'What to buy', filter: 'all'},
    ],
    tasks: {
        ['todolistId1']: [
            {id: v1(), title: 'HTML & CSS', isDone: true},
            {id: v1(), title: 'JavaScript', isDone: true},
        ],
        ['todolistId2']: [
            {id: v1(), title: 'Milk', isDone: true},
            {id: v1(), title: 'React Book', isDone: true},
        ],
    },
}

export const storybookStore = createStore(rootReducer, initialGlobalState as any)

export const ReduxStoreProviderDecorator = (storyFn: any) => {
    return <Provider store={storybookStore}>{storyFn()}</Provider>
}