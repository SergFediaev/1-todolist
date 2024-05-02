import React, {useCallback, useEffect, useState} from 'react'
import './App.css'
import {AddItemForm} from './AddItemForm'
import {AppBar, Button, Container, Grid, IconButton, Paper, Toolbar, Typography} from '@mui/material'
import {MenuRounded} from '@mui/icons-material'
import {
    addTodolistTC,
    changeTodolistFilterAC,
    changeTodolistTitleTC,
    fetchTodolistsTC,
    FilterValuesType,
    removeTodolistsTC,
    TodolistDomainType,
} from './state/todolists-reducer'
import {useDispatch, useSelector} from 'react-redux'
import {AppRootStateType} from './state/store'
import {TodoList} from './TodoList'
import {TaskType} from './api/todolists-api'
// import {AnyAction} from 'redux'
// import {ThunkDispatch} from 'redux-thunk'

export type TasksStateType = {
    [key: string]: Array<TaskType>
}

export function Counter() {
    console.log('Counter rendered')
    let [data, setData] = useState(1)

    return <div
        style={{cursor: 'pointer', fontSize: '100px'}}
        onClick={() => {
            setData(++data)
        }}>{data}</div>
}

function AppWithRedux() {
    console.log('AppWithRedux rendering')
    const dispatch = useDispatch()
    // const dispatch: ThunkDispatch<any, any, AnyAction> = useDispatch()
    const toDoLists = useSelector<AppRootStateType, TodolistDomainType[]>(state => state.todolists)

    useEffect(() => {
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

    return (
        <div className="App">
            <AppBar position="static">
                <Toolbar>
                    <IconButton
                        size="large"
                        edge="start"
                        color="inherit"
                        aria-label="menu"
                        sx={{mr: 2}}
                    >
                        <MenuRounded/>
                    </IconButton>
                    <Typography variant="h6" component="div" sx={{flexGrow: 1}}>
                        News
                    </Typography>
                    <Button color="inherit">Login</Button>
                </Toolbar>
            </AppBar>
            <Container fixed>
                <Grid container style={{padding: '20px'}}>
                    <AddItemForm addItem={addToDoList}/>
                </Grid>
                <Grid container spacing={3}>
                    {toDoLists.map(todoList => {
                        return <Grid item key={todoList.id}>
                            <Paper style={{padding: '10px'}}>
                                <TodoList
                                    id={todoList.id}
                                    title={todoList.title}
                                    changeFilter={changeFilter}
                                    filter={todoList.filter}
                                    removeTodoList={removeTodoList}
                                    changeToListTitle={changeToDoListTitle}
                                />
                            </Paper>
                        </Grid>
                    })}
                </Grid>
            </Container>
        </div>
    )
}

export default AppWithRedux