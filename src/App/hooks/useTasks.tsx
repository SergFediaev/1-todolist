import {useState} from 'react'
import {TasksStateType} from '../../AppWithRedux/AppWithRedux'
import {todoListId1, todoListId2} from '../id-utils'
import {v1} from 'uuid'
import {TaskPriorities, TaskStatuses} from '../../api/todolists-api'

export function useTasks() {
    const [tasksObject, setTasksObject] = useState<TasksStateType>({
        [todoListId1]: [
            {
                id: v1(),
                title: 'Watch',
                status: TaskStatuses.Completed,
                todoListId: todoListId1,
                description: '',
                startDate: '',
                deadline: '',
                addedDate: '',
                order: 0,
                priority: TaskPriorities.Low,
            },
            {
                id: v1(),
                title: 'Play',
                status: TaskStatuses.New,
                todoListId: todoListId1,
                description: '',
                startDate: '',
                deadline: '',
                addedDate: '',
                order: 0,
                priority: TaskPriorities.Low,
            },
            {
                id: v1(),
                title: 'Read',
                status: TaskStatuses.Completed,
                todoListId: todoListId1,
                description: '',
                startDate: '',
                deadline: '',
                addedDate: '',
                order: 0,
                priority: TaskPriorities.Low,
            }],
        [todoListId2]: [
            {
                id: v1(),
                title: 'HTML & CSS',
                status: TaskStatuses.Completed,
                todoListId: todoListId2,
                description: '',
                startDate: '',
                deadline: '',
                addedDate: '',
                order: 0,
                priority: TaskPriorities.Low,
            },
            {
                id: v1(),
                title: 'JavaScript',
                status: TaskStatuses.Completed,
                todoListId: todoListId2,
                description: '',
                startDate: '',
                deadline: '',
                addedDate: '',
                order: 0,
                priority: TaskPriorities.Low,
            },
            {
                id: v1(),
                title: 'ReactJS',
                status: TaskStatuses.New,
                todoListId: todoListId2,
                description: '',
                startDate: '',
                deadline: '',
                addedDate: '',
                order: 0,
                priority: TaskPriorities.Low,
            },
            {
                id: v1(),
                title: 'Redux',
                status: TaskStatuses.New,
                todoListId: todoListId2,
                description: '',
                startDate: '',
                deadline: '',
                addedDate: '',
                order: 0,
                priority: TaskPriorities.Low,
            },
        ],
    })

    function removeTask(id: string, todoListId: string) {
        let tasks = tasksObject[todoListId]
        let filteredTasks = tasks.filter(task => {
            return task.id !== id
        })

        tasksObject[todoListId] = filteredTasks
        setTasksObject({...tasksObject})
    }

    function addTask(newTitle: string, todoListId: string) {
        let tasks = tasksObject[todoListId]
        let newTask = {
            id: v1(), title: newTitle, status: TaskStatuses.New,
            todoListId,
            description: '',
            startDate: '',
            deadline: '',
            addedDate: '',
            order: 0,
            priority: TaskPriorities.Low,
        }

        let newTasks = [newTask, ...tasks]
        tasksObject[todoListId] = newTasks
        setTasksObject({...tasksObject})
    }

    function changeStatus(taskId: string, status: TaskStatuses, todoListId: string) {
        let toDoListTasks = tasksObject[todoListId]
        let tasks = toDoListTasks.find(task => task.id === taskId)

        if (tasks) {
            tasks.status = status
            setTasksObject({...tasksObject})
        }
    }

    function changeTaskTitle(taskId: string, newTitle: string, toDoListId: string) {
        let toDoListTasks = tasksObject[toDoListId]
        let task = toDoListTasks.find(task => task.id === taskId)

        if (task) {
            task.title = newTitle
            setTasksObject({...tasksObject})
        }
    }

    function completelyRemoveTasksForTodolist(todoListId: string) {
        delete tasksObject[todoListId]
        setTasksObject({...tasksObject})
    }

    function addStateFoNewTododlist(newTodoListId: string) {
        setTasksObject({
            ...tasksObject,
            [newTodoListId]: [],
        })
    }

    // return [tasksObject, setTasksObject] as const
    return {
        tasksObject,
        removeTask,
        addTask,
        changeStatus,
        changeTaskTitle,
        completelyRemoveTasksForTodolist,
        addStateFoNewTododlist,
    }
}