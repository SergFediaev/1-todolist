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

    useEffect(() => {
        const todoListId = 'f834c595-3207-4a5c-ac5f-dbdb742ebb44'

        // здесь мы будем делать запрос и ответ закидывать в стейт.
        // который в виде строки будем отображать в div-ке
        todolistsAPI.getTasks(todoListId)
            .then(res => {
                setState(res.data)
            })
    }, [])

    return <div>{JSON.stringify(state)}</div>
}

export const DeleteTasks = () => {
    const [state, setState] = useState<any>(null)
    const [taskId, setTaskId] = useState<string>('')
    const [todoListId, setTodoListId] = useState<string>('')

    const deleteTask = () => {
        todolistsAPI.deleteTasks(todoListId, taskId)
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