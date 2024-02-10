import React, {ChangeEvent, KeyboardEvent, useState} from 'react';
import {FilterValuesType} from "./App";

export type TasksType = {
    id: string
    title: string
    isDone: boolean
}

type TodoListPropsType = {
    title: string
    tasks: Array<TasksType>
    // removeTask: Function
    removeTask: (id: string) => void
    changeFilter: (filter: FilterValuesType) => void
    addTask: (newTitle: string) => void
}

export const TodoList = (props: TodoListPropsType) => {
    // debugger

    const [newTaskTitle, setNewTaskTitle] = useState('')

    const onNewTitChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
        // debugger;
        setNewTaskTitle(event.currentTarget.value)
    }

    const onKeyPressHandler = (event: KeyboardEvent<HTMLInputElement>) => {
        // debugger
        // console.log(event)
        if (event.ctrlKey && event.charCode === 13) {
            props.addTask(newTaskTitle)
            setNewTaskTitle('')
        }
    }

    const addTask = () => {
        props.addTask(newTaskTitle)
        setNewTaskTitle('')
    }

    const onAllClickHandler = () => props.changeFilter('all')
    const onActiveClickHandler = () => props.changeFilter('active')
    const onCompletedClickHandler = () => props.changeFilter('completed')

    return <div>
        <h3>{props.title}</h3>
        <div>
            <input
                value={newTaskTitle}
                onChange={onNewTitChangeHandler}
                onKeyPress={onKeyPressHandler}/>
            <button onClick={addTask}>+
            </button>
        </div>
        <ul>
            {props.tasks.map(task => {

                const onRemoveHandler = () => {
                    props.removeTask(task.id)
                }

                return <li key={task.id}><input type="checkbox"
                                                checked={task.isDone}/><span>{task.title} </span>
                    <button onClick={onRemoveHandler}>X</button>
                </li>
            })}
        </ul>
        <div>
            <button onClick={onAllClickHandler}>All</button>
            <button onClick={onActiveClickHandler}>Active</button>
            <button onClick={onCompletedClickHandler}>Completed</button>
        </div>
    </div>
};