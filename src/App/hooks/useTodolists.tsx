import {useState} from 'react'
import {FilterValuesType, TodolistDomainType} from '../../state/todolists-reducer'
import {todoListId1, todoListId2} from '../id-utils'
import {v1} from 'uuid'

export function useTodolists(onTodolistRemoved: (todoListId: string) => void,
                             onTodolistAdded: (todoListId: string) => void) {
    const [toDoLists, setToDoLists] = useState<TodolistDomainType[]>([
        {id: todoListId1, title: 'What to learn', filter: 'active', addedDate: '', order: 0},
        {id: todoListId2, title: 'What to buy', filter: 'completed', addedDate: '', order: 0},
    ])

    const changeFilter = (todoListId: string, filter: FilterValuesType) => {
        let todoList = toDoLists.find(todoList => todoList.id === todoListId)
        if (todoList) {
            todoList.filter = filter
            setToDoLists([...toDoLists])
        }
    }

    let removeTodoList = (todoLIstId: string) => {
        const filteredTotoLists = toDoLists.filter(todoList => todoList.id !== todoLIstId)
        setToDoLists(filteredTotoLists)
        onTodolistRemoved(todoLIstId)
    }

    function changeToDoListTitle(id: string, newTitle: string) {
        const toDoList = toDoLists.find(todoList => todoList.id === id)

        if (toDoList) {
            toDoList.title = newTitle
            setToDoLists([...toDoLists])
        }
    }

    function addToDoList(title: string) {
        const toDoList: TodolistDomainType = {
            id: v1(),
            filter: 'all',
            title,
            addedDate: '',
            order: 0,
        }

        setToDoLists([toDoList, ...toDoLists])
        onTodolistAdded(toDoList.id)
    }

    // return [toDoLists, setToDoLists] as const
    return {toDoLists, changeFilter, removeTodoList, changeToDoListTitle, addToDoList}
}