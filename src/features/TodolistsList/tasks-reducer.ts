import {AddTodolistActionType, RemoveTodoListActionType, SetTodolistsActionType} from './todolists-reducer'
import {TaskType, todolistsAPI, UpdateTaskModelType} from '../../api/todolists-api'
import {Dispatch} from 'redux'
import {AppRootStateType} from '../../app/store'
import {setAppErrorAC, setAppStatusAC, SetErrorActionType, SetStatusActionType} from '../../app/app-reducer'

const initialState: TasksStateType = {}

export const tasksReducer = (state: TasksStateType = initialState, action: ActionTypes): TasksStateType => {
    switch (action.type) {
        case 'REMOVE-TASK':
            return {...state, [action.todolistId]: state[action.todolistId].filter(task => task.id !== action.taskId)}
        case 'ADD-TASK':
            return {...state, [action.task.todoListId]: [action.task, ...state[action.task.todoListId]]}
        case 'UPDATE-TASK':
            return {
                ...state,
                [action.todolistId]: state[action.todolistId].map(task => task.id === action.taskId ? {...task, ...action.model} : task),
            }
        case 'ADD-TODOLIST':
            return {...state, [action.todolist.id]: []}
        case 'REMOVE-TODOLIST': {
            // const {[action.id]: [], ...rest} = state
            // return rest

            const stateCopy = {...state}
            delete stateCopy[action.id]
            return stateCopy
        }
        case 'SET-TODOLISTS': {
            const stateCopy = {...state}

            action.todolists.forEach(todoList => {
                stateCopy[todoList.id] = []
            })

            return stateCopy
        }
        case 'SET_TASKS':
            return {...state, [action.todolistId]: action.tasks}
        default:
            return state
    }
}

// Actions
export const removeTaskAC = (taskId: string, todolistId: string) => ({type: 'REMOVE-TASK', taskId, todolistId} as const)

export const addTaskAC = (task: TaskType) => ({type: 'ADD-TASK', task} as const)

export const updateTaskAC = (taskId: string, model: UpdateDomainTaskModelType, todolistId: string) => ({
    type: 'UPDATE-TASK',
    taskId,
    model,
    todolistId,
} as const)

export const setTasksAC = (tasks: TaskType[], todolistId: string) => ({type: 'SET_TASKS', tasks, todolistId} as const)

// Thunks
export const fetchTasksTC = (todolistId: string) => (dispatch: Dispatch<ActionTypes | SetStatusActionType>) => {
    dispatch(setAppStatusAC('loading'))

    todolistsAPI.getTasks(todolistId).then(response => {
        dispatch(setTasksAC(response.data.items, todolistId))
        dispatch(setAppStatusAC('succeeded'))
    })
}

export const removeTaskTC = (taskId: string, todolistId: string) => (dispatch: Dispatch<ActionTypes>) => {
    todolistsAPI.deleteTask(todolistId, taskId).then(response => {
        dispatch(removeTaskAC(taskId, todolistId))
    })
}

export const addTaskTC = (taskTitle: string, todolistId: string) => (dispatch: Dispatch<ActionTypes | SetErrorActionType | SetStatusActionType>) => {
    dispatch(setAppStatusAC('loading'))

    todolistsAPI.createTask(todolistId, taskTitle).then(response => {
        if (response.data.resultCode === 0) {
            dispatch(addTaskAC(response.data.data.item))
            dispatch(setAppStatusAC('succeeded'))

        } else {
            if (response.data.messages.length) dispatch(setAppErrorAC(response.data.messages[0]))
            else dispatch(setAppErrorAC('Some error occurred'))
        }
        dispatch(setAppStatusAC('failed'))
    })
}

export const updateTaskTC = (taskId: string, domainModel: UpdateDomainTaskModelType, todolistId: string) =>
    (dispatch: Dispatch<ActionTypes>, getState: () => AppRootStateType) => {
        const state = getState()
        const task = state.tasks[todolistId].find(task => task.id === taskId)

        if (!task) {
            // throw new Error('Task not found in the state')
            console.warn('Task not found in the state')
            return
        }

        const apiModel: UpdateTaskModelType = {
            deadline: task.deadline,
            description: task.description,
            priority: task.priority,
            startDate: task.startDate,
            title: task.title,
            status: task.status,
            ...domainModel,
        }

        todolistsAPI.updateTask(todolistId, taskId, apiModel).then(response => {
            dispatch(updateTaskAC(taskId, domainModel, todolistId))
        })
    }

// Types
type ActionTypes = ReturnType<typeof removeTaskAC>
    | ReturnType<typeof addTaskAC>
    | ReturnType<typeof updateTaskAC>
    | ReturnType<typeof setTasksAC>
    | AddTodolistActionType
    | RemoveTodoListActionType
    | SetTodolistsActionType

export type UpdateDomainTaskModelType = {
    title?: string
    description?: string
    status?: number
    priority?: number
    startDate?: string
    deadline?: string
}

export type TasksStateType = {
    [key: string]: Array<TaskType>
}