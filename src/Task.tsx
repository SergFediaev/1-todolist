import {useDispatch} from 'react-redux'
import {changeTaskStatusAC, changeTaskTitleAC, removeTaskAC} from './state/tasks-reducer'
import React, {ChangeEvent, memo, useCallback} from 'react'
import {Checkbox, IconButton} from '@mui/material'
import {EditableSpan} from './EditableSpan'
import {Delete} from '@mui/icons-material'
import {TaskStatuses, TaskType} from './api/todolists-api'

type TaskPropsType = {
    task: TaskType
    todoListId: string
}

export const Task = memo((props: TaskPropsType) => {
    const dispatch = useDispatch()

    const onRemoveHandler = () => {
        dispatch(removeTaskAC(props.task.id, props.todoListId))
    }

    const onChangeStatusHandler = (event: ChangeEvent<HTMLInputElement>) => {
        dispatch(changeTaskStatusAC(props.task.id, event.currentTarget.checked ? TaskStatuses.Completed : TaskStatuses.New, props.todoListId))
    }

    const onChangeTitleHandler = useCallback((newValue: string) => {
        dispatch(changeTaskTitleAC(props.task.id, newValue, props.todoListId))
    }, [props.task.id, props.todoListId])

    return <div key={props.task.id}
                className={props.task.status === TaskStatuses.Completed ? 'is-done' : ''}>
        <Checkbox checked={props.task.status === TaskStatuses.Completed}
                  onChange={onChangeStatusHandler}/>
        <EditableSpan title={props.task.title}
                      onChange={onChangeTitleHandler}/>
        <IconButton aria-label="delete"
                    color="primary"
                    onClick={onRemoveHandler}>
            <Delete/>
        </IconButton>
    </div>
})