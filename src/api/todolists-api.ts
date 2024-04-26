import axios from 'axios'

const settings = {
    withCredentials: true,
    // headers: {'API-KEY': '6fb6732c-0aa4-412a-bae5-0f04f4fc913f'},
}

const instance = axios.create({
    baseURL: 'https://social-network.samuraijs.com/api/1.1/',
    ...settings,
})

export type TodolistType = {
    id: string
    title: string
    addedDate: string
    order: number
}

type ResponseType<Data = {}> = {
    resultCode: number
    messages: string[]
    data: Data
}

export type TaskType = {
    description: string
    title: string
    status: number
    priority: number
    startDate: string
    deadline: string
    id: string
    todoListId: string
    order: number
    addedDate: string
}

type UpdateTaskModelType = {
    title: string
    description: string
    status: number
    priority: number
    startDate: string
    deadline: string
}

type GetTaskResponse = {
    error: string | null
    totalCount: number
    items: TaskType[]
}

export const todolistsAPI = {
    getTodolists: () => {
        return instance.get<TodolistType[]>('todo-lists')
    },
    createTodolist(title: string) {
        return instance.post<ResponseType<{ item: TodolistType }>>('todo-lists', {title})
    },
    deleteTodolist(id: string) {
        return instance.delete<ResponseType>(`todo-lists/${id}`)
    },
    updateTodolist(id: string, title: string) {
        return instance.put<ResponseType>(`todo-lists/${id}`, {title})
    },
    getTasks(todoListId: string) {
        return instance.get<GetTaskResponse>(`todo-lists/${todoListId}/tasks`)
    },
    deleteTasks(todoListId: string, taskId: string) {
        return instance.delete<ResponseType>(`todo-lists/${todoListId}/tasks/${taskId}`)
    },
    updateTask(todolistId: string, taskId: string, model: UpdateTaskModelType) {

    },
}