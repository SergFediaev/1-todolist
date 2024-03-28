import React, {ChangeEvent} from 'react'
import {FilterValuesType} from './App'
import {AddItemForm} from './AddItemForm'
import {EditableSpan} from './EditableSpan'
import {Button, Checkbox, IconButton} from '@mui/material'
import {Delete} from '@mui/icons-material'

export type TasksType = {
    id: string
    title: string
    isDone: boolean
}

type TodoListPropsType = {
    id: string
    title: string
    tasks: Array<TasksType>
    removeTask: (id: string, todoListId: string) => void
    changeFilter: (todoListId: string, filter: FilterValuesType) => void
    addTask: (newTitle: string, todoListId: string) => void
    changeTaskStatus: (taskId: string, isDone: boolean, todoListId: string) => void
    changeTaskTitle: (taskId: string, newTitle: string, todoListId: string) => void
    filter: FilterValuesType
    removeTodoList: (todoListId: string) => void
    changeToListTitle: (id: string, newTitle: string) => void
}

export const TodoList = (props: TodoListPropsType) => {

    const onAllClickHandler = () => props.changeFilter(props.id, 'all')

    const onActiveClickHandler = () => props.changeFilter(props.id, 'active')

    const onCompletedClickHandler = () => props.changeFilter(props.id, 'completed')

    const removeTodolist = () => {
        props.removeTodoList(props.id)
    }

    const addTask = (title: string) => {
        props.addTask(title, props.id)
    }

    const changeToDoListTitle = (newTitle: string) => {
        props.changeToListTitle(props.id, newTitle)
    }

    return <div>
        <h3><EditableSpan title={props.title} onChange={changeToDoListTitle}/>
            <IconButton
                aria-label="delete"
                color="primary"
                onClick={removeTodolist}
            ><Delete/></IconButton>
        </h3>

        <AddItemForm addItem={addTask}/>

        <div>
            {props.tasks.map(task => {

                const onRemoveHandler = () => {
                    props.removeTask(task.id, props.id)
                }

                const onChangeStatusHandler = (event: ChangeEvent<HTMLInputElement>) => {
                    props.changeTaskStatus(task.id, event.currentTarget.checked, props.id)
                }

                const onChangeTitleHandler = (newValue: string) => {
                    props.changeTaskTitle(task.id, newValue, props.id)
                }

                return <div
                    key={task.id}
                    className={task.isDone ? 'is-done' : ''}
                ><Checkbox
                    checked={task.isDone}
                    onChange={onChangeStatusHandler}/>
                    <EditableSpan
                        title={task.title}
                        onChange={onChangeTitleHandler}
                    />
                    <IconButton
                        aria-label="delete"
                        color="primary"
                        onClick={onRemoveHandler}
                    ><Delete/></IconButton>
                </div>
            })}
        </div>
        <div>
            <Button
                variant={props.filter === 'all' ? 'contained' : 'text'}
                onClick={onAllClickHandler}
            >All</Button>
            <Button
                color={'primary'}
                variant={props.filter === 'active' ? 'contained' : 'text'}
                onClick={onActiveClickHandler}
            >Active
            </Button>
            <Button
                color={'secondary'}
                variant={props.filter === 'completed' ? 'contained' : 'text'}
                onClick={onCompletedClickHandler}
            >Completed
            </Button>
        </div>
    </div>
}