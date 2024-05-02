import React, {useEffect, useState} from 'react'
import {todolistsAPI} from '../api/todolists-api'

export default {
    title: 'API',
}

export const GetTodolists = () => {
    const [state, setState] = useState<any>(null)

    useEffect(() => {
        // здесь мы будем делать запрос и ответ закидывать в стейт.
        // который в виде строки будем отображать в div-ке
        todolistsAPI.getTodolists()
            .then(res => {
                setState(res.data)
            })
    }, [])

    return <div>{JSON.stringify(state)}</div>
}

export const CreateTodolist = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {
        todolistsAPI.createTodolist('Dymich todo-list').then(res => {
            debugger
            console.log(res.data)
            setState(res.data)
        })
    }, [])

    return <div>{JSON.stringify(state)}</div>
}

export const DeleteTodolist = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {
        const todolistId = 'fa1d3e45-651f-4cd1-a6a5-ba0be0e94df2'
        todolistsAPI.deleteTodolist(todolistId).then(res => {
            debugger
            setState(res.data)
        })
    }, [])

    return <div>{JSON.stringify(state)}</div>
}

export const UpdateTodolistTitle = () => {
    const [state, setState] = useState<any>(null)
    const todolistId = 'fa1d3e45-651f-4cd1-a6a5-ba0be0e94df2'

    useEffect(() => {
        todolistsAPI.updateTodolist(todolistId, 'Dimych hello!').then(res => {
            debugger
            setState(res.data)
        })
    }, [])

    return <div>{JSON.stringify(state)}</div>
}

export const GetTasks = () => {
    const [state, setState] = useState<any>(null)
    const [todoListId, setTodoListId] = useState<string>('')

    const getTasks = () => {
        todolistsAPI.getTasks(todoListId)
            .then(res => {
                setState(res.data)
            })
    }

    return <div>{JSON.stringify(state)}
        <div>
            <input type="text" placeholder="TodoListId" value={todoListId}
                   onChange={event => setTodoListId(event.currentTarget.value)}/>
            <button onClick={getTasks}>Get tasks</button>
        </div>
    </div>
}

export const DeleteTasks = () => {
    const [state, setState] = useState<any>(null)
    const [taskId, setTaskId] = useState<string>('')
    const [todoListId, setTodoListId] = useState<string>('')

    const deleteTask = () => {
        todolistsAPI.deleteTask(todoListId, taskId)
            .then(res => {
                setState(res.data)
            })
    }

    return <div>{JSON.stringify(state)}
        <div>
            <input type="text" placeholder="TodoListId" value={todoListId}
                   onChange={event => setTodoListId(event.currentTarget.value)}/>
            <input type="text" placeholder="TaskId" value={taskId}
                   onChange={event => setTaskId(event.currentTarget.value)}/>
            <button onClick={deleteTask}>Delete task</button>
        </div>
    </div>
}

export const CreateTasks = () => {
    const [state, setState] = useState<any>(null)
    const [taskTitle, setTaskTitle] = useState<string>('')
    const [todoListId, setTodoListId] = useState<string>('')

    const createTask = () => {
        todolistsAPI.createTask(todoListId, taskTitle)
            .then(res => {
                setState(res.data)
            })
    }

    return <div>{JSON.stringify(state)}
        <div>
            <input type="text" placeholder="TodoListId" value={todoListId}
                   onChange={event => setTodoListId(event.currentTarget.value)}/>
            <input type="text" placeholder="Task title" value={taskTitle}
                   onChange={event => setTaskTitle(event.currentTarget.value)}/>
            <button onClick={createTask}>Create task</button>
        </div>
    </div>
}

export const UpdateTasks = () => {
    const [state, setState] = useState<any>(null)
    const [title, setTitle] = useState<string>('Title 1')
    const [description, setDescription] = useState<string>('Description 1')
    const [status, setStatus] = useState<number>(0)
    const [priority, setPriority] = useState<number>(0)
    const [startDate, setStartDate] = useState<string>('')
    const [deadline, setDeadline] = useState<string>('')

    const [todoListId, setTodoListId] = useState<string>('')
    const [taskId, setTaskId] = useState<string>('')

    const updateTask = () => {
        todolistsAPI.updateTask(todoListId, taskId, {
            deadline,
            description,
            priority,
            startDate,
            status,
            title,
        }).then(res => {
            setState(res.data)
        })
    }

    return <div>{JSON.stringify(state)}
        <div>
            <input type="text" placeholder="TaskId" value={taskId}
                   onChange={event => setTaskId(event.currentTarget.value)}/>
            <input type="text" placeholder="TodoListId" value={todoListId}
                   onChange={event => setTodoListId(event.currentTarget.value)}/>
            <input type="text" placeholder="Task title" value={title}
                   onChange={event => setTitle(event.currentTarget.value)}/>
            <input type="text" placeholder="Description" value={description}
                   onChange={event => setDescription(event.currentTarget.value)}/>
            <input type="number" placeholder="Status" value={status}
                   onChange={event => setStatus(+event.currentTarget.value)}/>
            <input type="number" placeholder="Priority" value={priority}
                   onChange={event => setPriority(+event.currentTarget.value)}/>
            <button onClick={updateTask}>Update task</button>
        </div>
    </div>
}