import React, {useReducer, useState} from 'react'
import './App.css'
import {TasksType, TodoList} from './TodoList'
import {v1} from 'uuid'
import {AddItemForm} from './AddItemForm'
import {AppBar, Button, Container, Grid, IconButton, Paper, Toolbar, Typography} from '@mui/material'
import {MenuRounded} from '@mui/icons-material'
import {
    addTodolistAC,
    changeTodolistFilterAC,
    changeTodolistTitleAC,
    removeTodolistAC,
    todosistsReducer,
} from './state/todolists-reducer'
import {addTaskAC, changeTaskStatusAC, changeTaskTitleAC, removeTaskAC, tasksReducer} from './state/tasks-reducer'

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

function AppWithReducers() {

    function removeTask(id: string, todoListId: string) {
        dispatchToTasksReducer(removeTaskAC(id, todoListId))
    }

    function addTask(newTitle: string, todoListId: string) {
        dispatchToTasksReducer(addTaskAC(newTitle, todoListId))
    }

    function changeStatus(taskId: string, isDone: boolean, todoListId: string) {
        dispatchToTasksReducer(changeTaskStatusAC(taskId, isDone, todoListId))
    }

    function changeTaskTitle(taskId: string, newTitle: string, toDoListId: string) {
        dispatchToTasksReducer(changeTaskTitleAC(taskId, newTitle, toDoListId))
    }

    const changeFilter = (todoListId: string, filter: FilterValuesType) => {
        dispatchToDoListsReducer(changeTodolistFilterAC(todoListId, filter))
    }

    const todoListId1 = v1()
    const todoListId2 = v1()

    const [tasksObject, dispatchToTasksReducer] = useReducer(tasksReducer, {
        [todoListId1]: [{
            id: v1(),
            title: 'Watch',
            isDone: true,
        },
            {
                id: v1(),
                title: 'Play',
                isDone: false,
            },
            {
                id: v1(),
                title: 'Read',
                isDone: true,
            }],
        [todoListId2]: [
            {
                id: v1(),
                title: 'HTML & CSS',
                isDone: true,
            },
            {
                id: v1(),
                title: 'JavaScript',
                isDone: true,
            },
            {
                id: v1(),
                title: 'ReactJS',
                isDone: false,
            },
            {
                id: v1(),
                title: 'Redux',
                isDone: false,
            },
        ],
    })

    const [toDoLists, dispatchToDoListsReducer] = useReducer(todosistsReducer, [
        {id: todoListId1, title: 'What to learn', filter: 'active'},
        {id: todoListId2, title: 'What to buy', filter: 'completed'},
    ])

    function changeToDoListTitle(id: string, newTitle: string) {
        const action = changeTodolistTitleAC(id, newTitle)
        dispatchToDoListsReducer(action)
    }

    let removeTodoList = (todoLIstId: string) => {
        const action = removeTodolistAC(todoLIstId)
        dispatchToTasksReducer(action)
        dispatchToDoListsReducer(action)
    }

    function addToDoList(title: string) {
        const action = addTodolistAC(title)
        dispatchToTasksReducer(action)
        dispatchToDoListsReducer(action)
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
                        let tasksForTodoList = tasksObject[todoList.id]

                        if (todoList.filter === 'completed') {
                            tasksForTodoList = tasksForTodoList.filter(task => task.isDone)
                        }

                        if (todoList.filter === 'active') {
                            tasksForTodoList = tasksForTodoList.filter(task => !task.isDone)
                        }

                        return <Grid item>
                            <Paper style={{padding: '10px'}}>
                                <TodoList
                                    key={todoList.id}
                                    id={todoList.id}
                                    title={todoList.title}
                                    tasks={tasksForTodoList}
                                    removeTask={removeTask}
                                    changeFilter={changeFilter}
                                    addTask={addTask}
                                    changeTaskStatus={changeStatus}
                                    changeTaskTitle={changeTaskTitle}
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

export default AppWithReducers