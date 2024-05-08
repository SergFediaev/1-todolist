import {useDispatch, useSelector} from 'react-redux'
import {AppRootStateType} from '../../app/store'
import {
    addTodolistTC,
    changeTodolistFilterAC,
    changeTodolistTitleTC,
    fetchTodolistsTC,
    FilterValuesType,
    removeTodolistsTC,
    TodolistDomainType,
} from './todolists-reducer'
import React, {useCallback, useEffect} from 'react'
import {Grid, Paper} from '@mui/material'
import {AddItemForm} from '../../components/AddItemForm/AddItemForm'
import {TodoList} from './Todolist/TodoList'

// import {AnyAction} from 'redux'
// import {ThunkDispatch} from 'redux-thunk'

type PropsType = {
    demo?: boolean
}

export const TodolistsList = ({demo = false, ...props}: PropsType) => {
    const dispatch = useDispatch()
    // const dispatch: ThunkDispatch<any, any, AnyAction> = useDispatch()
    const toDoLists = useSelector<AppRootStateType, TodolistDomainType[]>(state => state.todolists)

    useEffect(() => {
        if (demo) return
        dispatch(fetchTodolistsTC())
    }, [])

    const changeFilter = useCallback((todoListId: string, filter: FilterValuesType) => {
        dispatch(changeTodolistFilterAC(todoListId, filter))
    }, [])

    const changeToDoListTitle = useCallback((id: string, newTitle: string) => {
        dispatch(changeTodolistTitleTC(id, newTitle))
    }, [])

    const removeTodoList = useCallback((todoListId: string) => {
        dispatch(removeTodolistsTC(todoListId))
    }, [])

    const addToDoList = useCallback((title: string) => {
        dispatch(addTodolistTC(title))
    }, [])

    return <>
        <Grid container style={{padding: '20px'}}>
            <AddItemForm addItem={addToDoList}/>
        </Grid>
        <Grid container spacing={3}>
            {
                toDoLists.map(todoList => {
                    return <Grid item key={todoList.id}>
                        <Paper style={{padding: '10px'}}>
                            <TodoList
                                todoList={todoList}
                                changeFilter={changeFilter}
                                removeTodoList={removeTodoList}
                                changeToListTitle={changeToDoListTitle}
                                demo={demo}
                            />
                        </Paper>
                    </Grid>
                })
            }
        </Grid>
    </>
}