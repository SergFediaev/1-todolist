import {todolistsAPI, TodolistType} from '../../api/todolists-api'
import {Dispatch} from 'redux'
import {RequestStatusType, SetAppErrorActionType, setAppStatusAC, SetAppStatusActionType} from '../../app/app-reducer'
import {handleServerNetworkError} from '../../utils/error-utils'

const initialState: TodolistDomainType[] = []

export const todosistsReducer = (state: TodolistDomainType[] = initialState, action: ActionTypes): TodolistDomainType[] => {
    switch (action.type) {
        case 'REMOVE-TODOLIST':
            return state.filter(list => list.id != action.id)
        case 'ADD-TODOLIST':
            return [{...action.todolist, filter: 'all', entityStatus: 'idle'}, ...state]
        case 'CHANGE-TODOLIST-TITLE':
            return state.map(todolist => todolist.id === action.id ? {...todolist, title: action.title} : todolist)
        case 'CHANGE-TODOLIST-FILTER':
            return state.map(todolist => todolist.id === action.id ? {...todolist, filter: action.filter} : todolist)
        case 'SET-TODOLISTS':
            return action.todolists.map(todoList => ({...todoList, filter: 'all', entityStatus: 'idle'}))
        case 'CHANGE-TODOLISTS-ENTITY-STATUS':
            return state.map(todolist => todolist.id === action.id ? {
                ...todolist,
                entityStatus: action.status,
            } : todolist)
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

export const changeTodolistsEntityStatusAC = (id: string, status: RequestStatusType) => ({
    type: 'CHANGE-TODOLISTS-ENTITY-STATUS',
    id,
    status,
} as const)

// Thunks
export const fetchTodolistsTC = () => {
    return (dispatch: ThunkDispatch) => {
        dispatch(setAppStatusAC('loading'))

        todolistsAPI.getTodolists()
            .then(response => {
                dispatch(setTodolistsAC(response.data))
                dispatch(setAppStatusAC('succeeded'))
            }).catch(error => {
            handleServerNetworkError(error, dispatch)
        })
    }
}

export const removeTodolistsTC = (todolistId: string) => {
    return (dispatch: ThunkDispatch) => {
        dispatch(setAppStatusAC('loading'))
        dispatch(changeTodolistsEntityStatusAC(todolistId, 'loading'))

        todolistsAPI.deleteTodolist(todolistId)
            .then(response => {
                dispatch(removeTodolistAC(todolistId))
                dispatch(setAppStatusAC('succeeded'))
            })
    }
}

export const addTodolistTC = (title: string) => {
    return (dispatch: ThunkDispatch) => {
        dispatch(setAppStatusAC('loading'))
        todolistsAPI.createTodolist(title)
            .then(response => {
                dispatch(addTodolistAC(response.data.data.item))
                dispatch(setAppStatusAC('succeeded'))
            })
    }
}

export const changeTodolistTitleTC = (id: string, title: string) => {
    return (dispatch: Dispatch<ActionTypes>) => {
        todolistsAPI.updateTodolist(id, title)
            .then(response => dispatch(changeTodolistTitleAC(id, title)))
    }
}

// Types
export type AddTodolistActionType = ReturnType<typeof addTodolistAC>
export type RemoveTodoListActionType = ReturnType<typeof removeTodolistAC>
export type SetTodolistsActionType = ReturnType<typeof setTodolistsAC>

type ActionTypes = ReturnType<typeof removeTodolistAC>
    | RemoveTodoListActionType
    | AddTodolistActionType
    | ReturnType<typeof changeTodolistFilterAC>
    | ReturnType<typeof changeTodolistTitleAC>
    | SetTodolistsActionType
    | ReturnType<typeof changeTodolistsEntityStatusAC>

export type FilterValuesType = 'all' | 'completed' | 'active'

export  type TodolistDomainType = TodolistType & {
    filter: FilterValuesType
    entityStatus: RequestStatusType
}

type ThunkDispatch = Dispatch<ActionTypes | SetAppStatusActionType | SetAppErrorActionType>