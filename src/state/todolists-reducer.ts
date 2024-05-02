import {todolistsAPI, TodolistType} from '../api/todolists-api'
import {Dispatch} from 'redux'

export type RemoveTodoListActionType = {
    type: 'REMOVE-TODOLIST'
    id: string
}

export type AddTotodlistActionType = {
    type: 'ADD-TODOLIST'
    todolist: TodolistType
}

export type ChangeTodolistTitleActionType = {
    type: 'CHANGE-TODOLIST-TITLE'
    title: string
    id: string
}

export type ChangeTodolistFilterActionType = {
    type: 'CHANGE-TODOLIST-FILTER'
    id: string
    filter: FilterValuesType
}

export type SetTodolistsActionType = {
    type: 'SET-TODOLISTS'
    todolists: TodolistType[]
}

type ActionTypes = RemoveTodoListActionType
    | AddTotodlistActionType
    | ChangeTodolistFilterActionType
    | ChangeTodolistTitleActionType
    | SetTodolistsActionType

const initialState: TodolistDomainType[] = []

export type FilterValuesType = 'all' | 'completed' | 'active'

export  type TodolistDomainType = TodolistType & {
    filter: FilterValuesType
}

export const todosistsReducer = (state: TodolistDomainType[] = initialState, action: ActionTypes): TodolistDomainType[] => {
    switch (action.type) {
        case 'REMOVE-TODOLIST': {
            return state.filter(list => list.id != action.id)
        }
        case 'ADD-TODOLIST': {
            const newTodolist: TodolistDomainType = {...action.todolist, filter: 'all'}
            return [newTodolist, ...state]
        }
        case 'CHANGE-TODOLIST-TITLE': {
            const toDoList = state.find(todoList => todoList.id === action.id)

            if (toDoList) {
                toDoList.title = action.title
            }

            return [...state]
        }
        case 'CHANGE-TODOLIST-FILTER': {
            const toDoList = state.find(todoList => todoList.id === action.id)

            if (toDoList) {
                toDoList.filter = action.filter
            }

            return [...state]
        }
        case 'SET-TODOLISTS': {
            return action.todolists.map(todoList => {
                return {
                    ...todoList,
                    filter: 'all',
                }
            })
        }
        default:
            return state
    }
}

export const removeTodolistAC = (todolistId: string): RemoveTodoListActionType => {
    return {type: 'REMOVE-TODOLIST', id: todolistId}
}

export const addTodolistAC = (todolist: TodolistType): AddTotodlistActionType => {
    return {type: 'ADD-TODOLIST', todolist}
}

export const changeTodolistTitleAC = (id: string, title: string): ChangeTodolistTitleActionType => {
    return {type: 'CHANGE-TODOLIST-TITLE', id, title}
}

export const changeTodolistFilterAC = (id: string, filter: FilterValuesType): ChangeTodolistFilterActionType => {
    return {type: 'CHANGE-TODOLIST-FILTER', id, filter}
}

export const setTodolistsAC = (todolists: TodolistType[]): SetTodolistsActionType => {
    return {type: 'SET-TODOLISTS', todolists}
}

export const fetchTodolistsTC = () => {
    return (dispatch: Dispatch) => {
        todolistsAPI.getTodolists()
            .then(response => dispatch(setTodolistsAC(response.data)))
    }
}

export const removeTodolistsTC = (todolistId: string) => {
    return (dispatch: Dispatch) => {
        todolistsAPI.deleteTodolist(todolistId)
            .then(response => dispatch(removeTodolistAC(todolistId)))
    }
}

export const addTodolistTC = (title: string) => {
    return (dispatch: Dispatch) => {
        todolistsAPI.createTodolist(title)
            .then(response => dispatch(addTodolistAC(response.data.data.item)))
    }
}

export const changeTodolistTitleTC = (id: string, title: string) => {
    return (dispatch: Dispatch) => {
        todolistsAPI.updateTodolist(id, title)
            .then(response => dispatch(changeTodolistTitleAC(id, title)))
    }
}