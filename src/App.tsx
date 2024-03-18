import React, {useState} from 'react'
import './App.css'
import {TasksType, TodoList} from './TodoList'
import {v1} from 'uuid'
import {AddItemForm} from './AddItemForm'
import {AppBar, Button, Container, Grid, IconButton, Paper, Toolbar, Typography} from '@mui/material'
import {MenuRounded} from '@mui/icons-material'

export type FilterValuesType = 'all' | 'completed' | 'active'

export type TodoListType = {
    id: string
    title: string
    filter: FilterValuesType
}

type TasksStateType = {
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

        let newTask = {id: v1(), title: newTitle, isDone: false}
        let newTasks = [newTask, ...tasks]

        tasksObject[todoListId] = newTasks

        setTasksObject({...tasksObject})
    }

    function changeStatus(taskId: string, isDone: boolean, todoListId: string) {

        let toDoListTasks = tasksObject[todoListId]

        let tasks = toDoListTasks.find(task => task.id === taskId)

        if (tasks) {
            tasks.isDone = isDone
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

    const changeFilter = (filter: FilterValuesType, todoListId: string) => {
        let todoList = toDoLists.find(todoList => todoList.id === todoListId)
        if (todoList) {
            todoList.filter = filter
            setToDoLists([...toDoLists])
        }
    }

    const todoListId1 = v1()
    const todoListId2 = v1()

    const [tasksObject, setTasksObject] = useState<TasksStateType>({
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

    const [toDoLists, setToDoLists] = useState<TodoListType[]>([
        {id: todoListId1, title: 'What to learn', filter: 'active'},
        {id: todoListId2, title: 'What to buy', filter: 'completed'},
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
        const toDoList: TodoListType = {
            id: v1(),
            filter: 'all',
            title: title,
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

export default App