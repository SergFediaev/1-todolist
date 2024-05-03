import {todolistsAPI, TodolistType} from '../../api/todolists-api'
import {Dispatch} from 'redux'

const initialState: TodolistDomainType[] = []

export const todosistsReducer = (state: TodolistDomainType[] = initialState, action: ActionTypes): TodolistDomainType[] => {
    switch (action.type) {
        case 'REMOVE-TODOLIST':
            return state.filter(list => list.id != action.id)
        case 'ADD-TODOLIST':
            return [{...action.todolist, filter: 'all'}, ...state]
        case 'CHANGE-TODOLIST-TITLE':
            return state.map(todolist => todolist.id === action.id ? {...todolist, title: action.title} : todolist)
        case 'CHANGE-TODOLIST-FILTER':
            return state.map(todolist => todolist.id === action.id ? {...todolist, filter: action.filter} : todolist)
        case 'SET-TODOLISTS':
            return action.todolists.map(todoList => ({...todoList, filter: 'all'}))
        default:
            return state
    }
}

// Actions
export const removeTodolistAC = (id: string) => ({type: 'REMOVE-TODOLIST', id} as const)

export const addTodolistAC = (todolist: TodolistType) => ({type: 'ADD-TODOLIST', todolist} as const)

export const changeTodolistTitleAC = (id: string, title: string) => ({
    type: 'CHANGE-TODOLIST-TITLE',
    id,
    title,
} as const)

export const changeTodolistFilterAC = (id: string, filter: FilterValuesType) => ({
    type: 'CHANGE-TODOLIST-FILTER',
    id,
    filter,
} as const)

export const setTodolistsAC = (todolists: TodolistType[]) => ({type: 'SET-TODOLISTS', todolists} as const)

// Thunks
export const fetchTodolistsTC = () => {
    return (dispatch: Dispatch<ActionTypes>) => {
        todolistsAPI.getTodolists()
            .then(response => dispatch(setTodolistsAC(response.data)))
    }
}

export const removeTodolistsTC = (todolistId: string) => {
    return (dispatch: Dispatch<ActionTypes>) => {
        todolistsAPI.deleteTodolist(todolistId)
            .then(response => dispatch(removeTodolistAC(todolistId)))
    }
}

export const addTodolistTC = (title: string) => {
    return (dispatch: Dispatch<ActionTypes>) => {
        todolistsAPI.createTodolist(title)
            .then(response => dispatch(addTodolistAC(response.data.data.item)))
    }
}

export const changeTodolistTitleTC = (id: string, title: string) => {
    return (dispatch: Dispatch<ActionTypes>) => {
        todolistsAPI.updateTodolist(id, title)
            .then(response => dispatch(changeTodolistTitleAC(id, title)))
    }
}

// Types
export type AddTotodlistActionType = ReturnType<typeof addTodolistAC>
export type RemoveTodoListActionType = ReturnType<typeof removeTodolistAC>
export type SetTodolistsActionType = ReturnType<typeof setTodolistsAC>

type ActionTypes = ReturnType<typeof removeTodolistAC>
    | ReturnType<typeof addTodolistAC>
    | ReturnType<typeof changeTodolistFilterAC>
    | ReturnType<typeof changeTodolistTitleAC>
    | ReturnType<typeof setTodolistsAC>

export type FilterValuesType = 'all' | 'completed' | 'active'

export  type TodolistDomainType = TodolistType & {
    filter: FilterValuesType
}