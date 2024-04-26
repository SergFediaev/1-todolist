import {Task} from './Task'
import React from 'react'
import {Provider} from 'react-redux'
import {store} from './state/store'
import {action} from '@storybook/addon-actions'
import {TaskPriorities, TaskStatuses} from './api/todolists-api'

export default {
    title: 'Task Component',
    component: Task,
}

const changeTaskStatusCallback = action('Status changed')
const changeTaskTitleCallback = action('Title changed')
const removeTaskCallback = action('Task removed')

export const TaskBaseExample = () => {
    return <Provider store={store}>
        <Task task={{
            id: '1', status: TaskStatuses.Completed, title: 'CSS',
            todoListId: 'todolistId1',
            description: '',
            startDate: '',
            deadline: '',
            addedDate: '',
            order: 0,
            priority: TaskPriorities.Low,
        }}
              todoListId={'todolistId1'}
        />
        <Task task={{
            id: '2', status: TaskStatuses.New, title: 'JS',
            todoListId: 'todolistId1',
            description: '',
            startDate: '',
            deadline: '',
            addedDate: '',
            order: 0,
            priority: TaskPriorities.Low,
        }}
              todoListId={'todolistId2'}
        />
    </Provider>
}