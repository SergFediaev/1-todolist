import React, {useState} from 'react'
import './App.css'
import {TodoList} from './TodoList'
import {v1} from 'uuid'
import {AddItemForm} from './AddItemForm'
import {AppBar, Button, Container, Grid, IconButton, Paper, Toolbar, Typography} from '@mui/material'
import {MenuRounded} from '@mui/icons-material'
import {TaskPriorities, TaskStatuses} from './api/todolists-api'
import {FilterValuesType, TodolistDomainType} from './state/todolists-reducer'
import {TasksStateType} from './AppWithRedux'

function App() {

    function removeTask(id: string, todoListId: string) {

        let tasks = tasksObject[todoListId]

        let filteredTasks = tasks.filter(task => {
            return task.id !== id
        })

        tasksObject[todoListId] = filteredTasks

        setTasksObject({...tasksObject})
    }

    function addTask(newTitle: string, todoListId: string) {
        let tasks = tasksObject[todoListId]

        let newTask = {
            id: v1(), title: newTitle, status: TaskStatuses.New,
            todoListId,
            description: '',
            startDate: '',
            deadline: '',
            addedDate: '',
            order: 0,
            priority: TaskPriorities.Low,
        }
        let newTasks = [newTask, ...tasks]

        tasksObject[todoListId] = newTasks

        setTasksObject({...tasksObject})
    }

    function changeStatus(taskId: string, status: TaskStatuses, todoListId: string) {

        let toDoListTasks = tasksObject[todoListId]

        let tasks = toDoListTasks.find(task => task.id === taskId)

        if (tasks) {
            tasks.status = status
            setTasksObject({...tasksObject})
        }
    }

    function changeTaskTitle(taskId: string, newTitle: string, toDoListId: string) {

        let toDoListTasks = tasksObject[toDoListId]

        let task = toDoListTasks.find(task => task.id === taskId)

        if (task) {
            task.title = newTitle
            setTasksObject({...tasksObject})
        }
    }

    const changeFilter = (todoListId: string, filter: FilterValuesType) => {
        let todoList = toDoLists.find(todoList => todoList.id === todoListId)
        if (todoList) {
            todoList.filter = filter
            setToDoLists([...toDoLists])
        }
    }

    const todoListId1 = v1()
    const todoListId2 = v1()

    const [tasksObject, setTasksObject] = useState<TasksStateType>({
        [todoListId1]: [
            {
                id: v1(),
                title: 'Watch',
                status: TaskStatuses.Completed,
                todoListId: todoListId1,
                description: '',
                startDate: '',
                deadline: '',
                addedDate: '',
                order: 0,
                priority: TaskPriorities.Low,
            },
            {
                id: v1(),
                title: 'Play',
                status: TaskStatuses.New,
                todoListId: todoListId1,
                description: '',
                startDate: '',
                deadline: '',
                addedDate: '',
                order: 0,
                priority: TaskPriorities.Low,
            },
            {
                id: v1(),
                title: 'Read',
                status: TaskStatuses.Completed,
                todoListId: todoListId1,
                description: '',
                startDate: '',
                deadline: '',
                addedDate: '',
                order: 0,
                priority: TaskPriorities.Low,
            }],
        [todoListId2]: [
            {
                id: v1(),
                title: 'HTML & CSS',
                status: TaskStatuses.Completed,
                todoListId: todoListId2,
                description: '',
                startDate: '',
                deadline: '',
                addedDate: '',
                order: 0,
                priority: TaskPriorities.Low,
            },
            {
                id: v1(),
                title: 'JavaScript',
                status: TaskStatuses.Completed,
                todoListId: todoListId2,
                description: '',
                startDate: '',
                deadline: '',
                addedDate: '',
                order: 0,
                priority: TaskPriorities.Low,
            },
            {
                id: v1(),
                title: 'ReactJS',
                status: TaskStatuses.New,
                todoListId: todoListId2,
                description: '',
                startDate: '',
                deadline: '',
                addedDate: '',
                order: 0,
                priority: TaskPriorities.Low,
            },
            {
                id: v1(),
                title: 'Redux',
                status: TaskStatuses.New,
                todoListId: todoListId2,
                description: '',
                startDate: '',
                deadline: '',
                addedDate: '',
                order: 0,
                priority: TaskPriorities.Low,
            },
        ],
    })

    const [toDoLists, setToDoLists] = useState<TodolistDomainType[]>([
        {id: todoListId1, title: 'What to learn', filter: 'active', addedDate: '', order: 0},
        {id: todoListId2, title: 'What to buy', filter: 'completed', addedDate: '', order: 0},
    ])

    function changeToDoListTitle(id: string, newTitle: string) {
        const toDoList = toDoLists.find(todoList => todoList.id === id)

        if (toDoList) {
            toDoList.title = newTitle
            setToDoLists([...toDoLists])
        }
    }

    let removeTodoList = (todoLIstId: string) => {

        const filteredTotoLists = toDoLists.filter(todoList => todoList.id !== todoLIstId)

        setToDoLists(filteredTotoLists)

        delete tasksObject[todoLIstId]
        setTasksObject({...tasksObject})
    }

    function addToDoList(title: string) {
        const toDoList: TodolistDomainType = {
            id: v1(),
            filter: 'all',
            title,
            addedDate: '',
            order: 0,
        }

        setToDoLists([toDoList, ...toDoLists])

        setTasksObject({
            ...tasksObject,
            [toDoList.id]: [],
        })
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