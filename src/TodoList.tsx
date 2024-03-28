import React, {ChangeEvent} from 'react'
import {AddItemForm} from './AddItemForm'
import {EditableSpan} from './EditableSpan'
import {Button, Checkbox, IconButton} from '@mui/material'
import {Delete} from '@mui/icons-material'
import {useDispatch, useSelector} from 'react-redux'
import {AppRootState} from './state/store'
import {addTaskAC, changeTaskStatusAC, changeTaskTitleAC, removeTaskAC} from './state/tasks-reducer'
import {FilterValuesType} from './AppWithRedux'

export type TasksType = {
    id: string
    title: string
    isDone: boolean
}

type TodoListPropsType = {
    id: string
    title: string
    changeFilter: (todoListId: string, filter: FilterValuesType) => void
    filter: FilterValuesType
    removeTodoList: (todoListId: string) => void
    changeToListTitle: (id: string, newTitle: string) => void
}

export const TodoList = (props: TodoListPropsType) => {
    const dispatch = useDispatch()
    const tasks = useSelector<AppRootState, TasksType[]>(state => state.tasks[props.id])

    const onAllClickHandler = () => props.changeFilter(props.id, 'all')

    const onActiveClickHandler = () => props.changeFilter(props.id, 'active')

    const onCompletedClickHandler = () => props.changeFilter(props.id, 'completed')

    const removeTodolist = () => {
        props.removeTodoList(props.id)
    }

    const changeToDoListTitle = (newTitle: string) => {
        props.changeToListTitle(props.id, newTitle)
    }

    let tasksForTodoList = tasks

    if (props.filter === 'completed') {
        tasksForTodoList = tasksForTodoList.filter(task => task.isDone)
    }

    if (props.filter === 'active') {
        tasksForTodoList = tasksForTodoList.filter(task => !task.isDone)
    }

    return <div>
        <h3><EditableSpan title={props.title} onChange={changeToDoListTitle}/>
            <IconButton
                aria-label="delete"
                color="primary"
                onClick={removeTodolist}
            ><Delete/></IconButton>
        </h3>

        <AddItemForm addItem={(newTitle) => dispatch(addTaskAC(newTitle, props.id))}/>

        <div>
            {tasksForTodoList.map(task => {

                const onRemoveHandler = () => {
                    dispatch(removeTaskAC(task.id, props.id))
                }

                const onChangeStatusHandler = (event: ChangeEvent<HTMLInputElement>) => {
                    dispatch(changeTaskStatusAC(task.id, event.currentTarget.checked, props.id))
                }

                const onChangeTitleHandler = (newValue: string) => {
                    dispatch(changeTaskTitleAC(task.id, newValue, props.id))
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