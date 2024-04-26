import React, {memo, useCallback} from 'react'
import {AddItemForm} from './AddItemForm/AddItemForm'
import {EditableSpan} from './EditableSpan'
import {Button, IconButton} from '@mui/material'
import {Delete} from '@mui/icons-material'
import {useDispatch, useSelector} from 'react-redux'
import {AppRootStateType} from './state/store'
import {addTaskAC} from './state/tasks-reducer'
import {Task} from './Task'
import {TaskStatuses, TaskType} from './api/todolists-api'
import {FilterValuesType} from './state/todolists-reducer'

type TodoListPropsType = {
    id: string
    title: string
    changeFilter: (todoListId: string, filter: FilterValuesType) => void
    filter: FilterValuesType
    removeTodoList: (todoListId: string) => void
    changeToListTitle: (id: string, newTitle: string) => void
}

export const TodoList = memo(function (props: TodoListPropsType) {
    console.log('TodoList rendering')
    const dispatch = useDispatch()
    const tasks = useSelector<AppRootStateType, TaskType[]>(state => state.tasks[props.id])

    const addTask = useCallback((newTitle: string) => dispatch(addTaskAC(newTitle, props.id)), [])

    const onAllClickHandler = useCallback(() => props.changeFilter(props.id, 'all'), [props.changeFilter, props.id])
    const onActiveClickHandler = useCallback(() => props.changeFilter(props.id, 'active'), [props.changeFilter, props.id])
    const onCompletedClickHandler = useCallback(() => props.changeFilter(props.id, 'completed'), [props.changeFilter, props.id])

    const removeTodolist = () => {
        props.removeTodoList(props.id)
    }

    const changeToDoListTitle = useCallback((newTitle: string) => {
        props.changeToListTitle(props.id, newTitle)
    }, [props.changeToListTitle, props.id])

    let tasksForTodoList = tasks

    if (props.filter === 'completed') {
        tasksForTodoList = tasks.filter(task => task.status === TaskStatuses.Completed)
    }

    if (props.filter === 'active') {
        tasksForTodoList = tasks.filter(task => task.status === TaskStatuses.New)
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
            {tasksForTodoList.map(task => <Task key={task.id} task={task} todoListId={props.id}/>)}
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
})