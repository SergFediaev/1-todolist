import {v1} from 'uuid'
import {todolistsAPI, TodolistType} from '../api/todolists-api'
import {Dispatch} from 'redux'

export type RemoveTodoListActionType = {
    type: 'REMOVE-TODOLIST'
    id: string
}

export type AddTotodlistActionType = {
    type: 'ADD-TODOLIST'
    title: string
    todolistId: string
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
            return [{id: action.todolistId, title: action.title, filter: 'all', addedDate: '', order: 0}, ...state]
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

export const addTodolistAC = (title: string): AddTotodlistActionType => {
    return {type: 'ADD-TODOLIST', title, todolistId: v1()}
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