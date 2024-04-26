import React from 'react'
import '../App.css'
import {TodoList} from '../TodoList'
import {AddItemForm} from '../AddItemForm/AddItemForm'
import {AppBar, Button, Container, Grid, IconButton, Paper, Toolbar, Typography} from '@mui/material'
import {MenuRounded} from '@mui/icons-material'
import {TaskStatuses} from '../api/todolists-api'
import {useTodolists} from './hooks/useTodolists'
import {useTasks} from './hooks/useTasks'

function App() {
    const {
        tasksObject,
        removeTask,
        addTask,
        changeStatus,
        changeTaskTitle,
        completelyRemoveTasksForTodolist,
        addStateFoNewTododlist,
    } = useTasks()

    const {
        toDoLists,
        changeFilter,
        removeTodoList,
        changeToDoListTitle,
        addToDoList,
    } = useTodolists(completelyRemoveTasksForTodolist, addStateFoNewTododlist)

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
                        let tasksForTodoList = tasksObject[todoList.id]

                        if (todoList.filter === 'completed') {
                            tasksForTodoList = tasksForTodoList.filter(task => task.status === TaskStatuses.Completed)
                        }

                        if (todoList.filter === 'active') {
                            tasksForTodoList = tasksForTodoList.filter(task => task.status === TaskStatuses.New)
                        }

                        return <Grid item>
                            <Paper style={{padding: '10px'}}>
                                <TodoList
                                    key={todoList.id}
                                    id={todoList.id}
                                    title={todoList.title}
                                    changeFilter={changeFilter}
                                    filter={todoList.filter}
                                    removeTodoList={removeTodoList} changeToListTitle={changeToDoListTitle}
                                />
                            </Paper>
                        </Grid>
                    })}
                </Grid>
            </Container>
        </div>
    )
}

export default App