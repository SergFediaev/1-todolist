import {useDispatch, useSelector} from 'react-redux'
import {AppRootStateType} from '../../state/store'
import {
    addTodolistAC,
    changeTodolistFilterAC,
    changeTodolistTitleAC,
    FilterValuesType,
    removeTodolistAC,
    TodolistDomainType,
} from '../../state/todolists-reducer'
import {useCallback} from 'react'

export const useAppWithRedux = () => {
    const dispatch = useDispatch()
    const toDoLists = useSelector<AppRootStateType, TodolistDomainType[]>(state => state.todolists)

    const changeFilter = useCallback((todoListId: string, filter: FilterValuesType) => {
        dispatch(changeTodolistFilterAC(todoListId, filter))
    }, [])

    const changeToDoListTitle = useCallback((id: string, newTitle: string) => {
        const action = changeTodolistTitleAC(id, newTitle)
        dispatch(action)
    }, [])

    const removeTodoList = useCallback((todoLIstId: string) => {
        const action = removeTodolistAC(todoLIstId)
        dispatch(action)
    }, [])

    const addToDoList = useCallback((title: string) => {
        const action = addTodolistAC(title)
        dispatch(action)
    }, [])

    return {
        toDoLists,
        addToDoList,
        changeFilter,
        removeTodoList,
        changeToDoListTitle,
    }
}