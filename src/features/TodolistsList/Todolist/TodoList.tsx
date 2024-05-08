import React, {memo, useCallback, useEffect} from 'react'
import {AddItemForm} from '../../../components/AddItemForm/AddItemForm'
import {EditableSpan} from '../../../components/EditableSpan/EditableSpan'
import {Button, IconButton} from '@mui/material'
import {Delete} from '@mui/icons-material'
import {useDispatch, useSelector} from 'react-redux'
import {AppRootStateType} from '../../../app/store'
import {addTaskTC, fetchTasksTC} from '../tasks-reducer'
import {Task} from './Task/Task'
import {TaskStatuses, TaskType} from '../../../api/todolists-api'
import {FilterValuesType, TodolistDomainType} from '../todolists-reducer'

type TodoListPropsType = {
    todoList: TodolistDomainType
    changeFilter: (todoListId: string, filter: FilterValuesType) => void
    removeTodoList: (todoListId: string) => void
    changeToListTitle: (id: string, newTitle: string) => void
    demo?: boolean
}

export const TodoList = memo(function ({demo = false, ...props}: TodoListPropsType) {
    console.log('TodoList rendering')
    const dispatch = useDispatch()
    const tasks = useSelector<AppRootStateType, TaskType[]>(state => state.tasks[props.todoList.id])

    useEffect(() => {
        if (demo) return
        dispatch(fetchTasksTC(props.todoList.id))
    }, [])

    const addTask = useCallback((newTitle: string) => dispatch(addTaskTC(newTitle, props.todoList.id)), [])

    const onAllClickHandler = useCallback(() => props.changeFilter(props.todoList.id, 'all'), [props.changeFilter, props.todoList.id])
    const onActiveClickHandler = useCallback(() => props.changeFilter(props.todoList.id, 'active'), [props.changeFilter, props.todoList.id])
    const onCompletedClickHandler = useCallback(() => props.changeFilter(props.todoList.id, 'completed'), [props.changeFilter, props.todoList.id])

    const removeTodolist = () => {
        props.removeTodoList(props.todoList.id)
    }

    const changeToDoListTitle = useCallback((newTitle: string) => {
        props.changeToListTitle(props.todoList.id, newTitle)
    }, [props.changeToListTitle, props.todoList.id])

    let tasksForTodoList = tasks

    if (props.todoList.filter === 'completed') {
        tasksForTodoList = tasks.filter(task => task.status === TaskStatuses.Completed)
    }

    if (props.todoList.filter === 'active') {
        tasksForTodoList = tasks.filter(task => task.status === TaskStatuses.New)
    }

    return <div>
        <h3><EditableSpan title={props.todoList.title} onChange={changeToDoListTitle}/>
            <IconButton
                aria-label="delete"
                color="primary"
                onClick={removeTodolist}
                disabled={props.todoList.entityStatus === 'loading'}
            ><Delete/></IconButton>
        </h3>

        <AddItemForm addItem={addTask} disabled={props.todoList.entityStatus === 'loading'}/>

        <div>
            {tasksForTodoList.map(task => <Task key={task.id} task={task} todoListId={props.todoList.id}/>)}
        </div>
        <div>
            <Button
                variant={props.todoList.filter === 'all' ? 'contained' : 'text'}
                onClick={onAllClickHandler}
            >All</Button>
            <Button
                color={'primary'}
                variant={props.todoList.filter === 'active' ? 'contained' : 'text'}
                onClick={onActiveClickHandler}
            >Active
            </Button>
            <Button
                color={'secondary'}
                variant={props.todoList.filter === 'completed' ? 'contained' : 'text'}
                onClick={onCompletedClickHandler}
            >Completed
            </Button>
        </div>
    </div>
})