import {Task} from './Task'
import React from 'react'
import {Provider} from 'react-redux'
import {store} from './state/store'
import {action} from '@storybook/addon-actions'

export default {
    title: 'Task Component',
    component: Task,
}

const changeTaskStatusCallback = action('Status changed')
const changeTaskTitleCallback = action('Title changed')
const removeTaskCallback = action('Task removed')

export const TaskBaseExample = () => {
    return <Provider store={store}>
        <Task task={{id: '1', isDone: true, title: 'CSS'}}
              todoListId={'todolistId1'}
            // changeTaskStatus={changeTaskStatusCallback}
            // changeTaskTitle={changeTaskTitleCallback}
            // removeTask={removeTaskCallback}
        />
        <Task task={{id: '2', isDone: false, title: 'JS'}}
              todoListId={'todolistId2'}
            // changeTaskStatus={changeTaskStatusCallback}
            // changeTaskTitle={changeTaskTitleCallback}
            // removeTask={removeTaskCallback}
        />
    </Provider>
}