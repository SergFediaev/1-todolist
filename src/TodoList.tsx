import React, {ChangeEvent, KeyboardEvent, useState} from 'react'
import {FilterValuesType} from './App'

export type TasksType = {
    id: string
    title: string
    isDone: boolean
}

type TodoListPropsType = {
    id: string
    title: string
    tasks: Array<TasksType>
    // removeTask: Function
    removeTask: (id: string, todoListId: string) => void
    changeFilter: (filter: FilterValuesType, todoListId: string) => void
    addTask: (newTitle: string, todoListId: string) => void
    changeTaskStatus: (taskId: string, isDone: boolean, todoListId: string) => void
    filter: FilterValuesType
    removeTodoList: (todoListId: string) => void
}

export const TodoList = (props: TodoListPropsType) => {
    // debugger

    const [newTaskTitle, setNewTaskTitle] = useState('')

    const [error, setError] = useState<string | null>(null)

    const onNewTitChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
        // debugger;
        setNewTaskTitle(event.currentTarget.value)
    }

    const onKeyPressHandler = (event: KeyboardEvent<HTMLInputElement>) => {
        setError(null)

        // debugger
        // console.log(event)
        if (event.ctrlKey && event.charCode === 13) {
            props.addTask(newTaskTitle, props.id)
            setNewTaskTitle('')
        }
    }

    const addTask = () => {
        if (newTaskTitle.trim() !== '' && newTaskTitle !== 'censored') {
            props.addTask(newTaskTitle.trim(), props.id)
            setNewTaskTitle('')
        } else {
            setError('Invalid input')
        }
    }

    const onAllClickHandler = () => props.changeFilter('all', props.id)
    const onActiveClickHandler = () => props.changeFilter('active', props.id)
    const onCompletedClickHandler = () => props.changeFilter('completed', props.id)
    const removeTodolist = () => {
        props.removeTodoList(props.id)
    }

    return <div>
        <h3>{props.title}
            <button onClick={removeTodolist}>Delete to-do list</button>
        </h3>
        <div>
            <input
                value={newTaskTitle}
                onChange={onNewTitChangeHandler}
                onKeyPress={onKeyPressHandler}
                className={error ? 'error' : ''}/>
            <button onClick={addTask}>+
            </button>
            {error && <div className="error-message">{error}</div>}
        </div>
        <ul>
            {props.tasks.map(task => {

                const onRemoveHandler = () => {
                    props.removeTask(task.id, props.id)
                }

                const onChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
                    props.changeTaskStatus(task.id, event.currentTarget.checked, props.id)
                    // console.log(task.id + 'Wanna change value of curTrg: ' + event.currentTarget.checked)
                }

                return <li key={task.id} className={task.isDone ? 'is-done' : ''}><input
                    type="checkbox"
                    checked={task.isDone}
                    onChange={onChangeHandler}/><span>{task.title} </span>
                    <button onClick={onRemoveHandler}>X</button>
                </li>
            })}
        </ul>
        <div>
            <button className={props.filter === 'all' ? 'active-filter' : ''} onClick={onAllClickHandler}>All</button>
            <button className={props.filter === 'active' ? 'active-filter' : ''} onClick={onActiveClickHandler}>Active
            </button>
            <button className={props.filter === 'completed' ? 'active-filter' : ''}
                    onClick={onCompletedClickHandler}>Completed
            </button>
        </div>
    </div>
}