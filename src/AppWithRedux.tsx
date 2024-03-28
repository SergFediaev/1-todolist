import React, {useState} from 'react'
import './App.css'
import {TasksType, TodoList} from './TodoList'
import {AddItemForm} from './AddItemForm'
import {AppBar, Button, Container, Grid, IconButton, Paper, Toolbar, Typography} from '@mui/material'
import {MenuRounded} from '@mui/icons-material'
import {
    addTodolistAC,
    changeTodolistFilterAC,
    changeTodolistTitleAC,
    removeTodolistAC,
} from './state/todolists-reducer'
import {useDispatch, useSelector} from 'react-redux'
import {AppRootState} from './state/store'

export type FilterValuesType = 'all' | 'completed' | 'active'

export type TodoListType = {
    id: string
    title: string
    filter: FilterValuesType
}

export type TasksStateType = {
    [key: string]: Array<TasksType>
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
    const dispatch = useDispatch()
    const toDoLists = useSelector<AppRootState, TodoListType[]>(state => state.todolists)

    const changeFilter = (todoListId: string, filter: FilterValuesType) => {
        dispatch(changeTodolistFilterAC(todoListId, filter))
    }

    function changeToDoListTitle(id: string, newTitle: string) {
        const action = changeTodolistTitleAC(id, newTitle)
        dispatch(action)
    }

    let removeTodoList = (todoLIstId: string) => {
        const action = removeTodolistAC(todoLIstId)
        dispatch(action)
    }

    function addToDoList(title: string) {
        const action = addTodolistAC(title)
        dispatch(action)
    }

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
                        return <Grid item>
                            <Paper style={{padding: '10px'}}>
                                <TodoList
                                    key={todoList.id}
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