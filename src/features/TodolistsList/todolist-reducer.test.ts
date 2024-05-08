import {v1} from 'uuid'
import {
    addTodolistAC,
    changeTodolistFilterAC,
    changeTodolistsEntityStatusAC,
    changeTodolistTitleAC,
    FilterValuesType,
    removeTodolistAC,
    setTodolistsAC,
    TodolistDomainType,
    todosistsReducer,
} from './todolists-reducer'
import {TodolistType} from '../../api/todolists-api'
import {RequestStatusType} from '../../app/app-reducer'

let todoListId1: string
let todoListId2: string
let startState: TodolistDomainType[] = []

beforeEach(() => {
    todoListId1 = v1()
    todoListId2 = v1()
    startState = [
        {id: todoListId1, title: 'What to learn', filter: 'all', addedDate: '', order: 0, entityStatus: 'idle'},
        {id: todoListId2, title: 'What to buy', filter: 'all', addedDate: '', order: 0, entityStatus: 'idle'},
    ]
})

test('correct todolist should be removed', () => {
    const endState = todosistsReducer(startState, removeTodolistAC(todoListId1))

    expect(endState.length).toBe(1)
    expect(endState[0].id).toBe(todoListId2)
})

test('correct todolist should be added', () => {
    const todolist: TodolistType = {
        title: 'New Todolist',
        id: 'Any id',
        addedDate: '',
        order: 0,
    }

    const endState = todosistsReducer(startState, addTodolistAC(todolist))

    expect(endState.length).toBe(3)
    expect(endState[0].title).toBe(todolist.title)
    expect(endState[0].filter).toBe('all')
    expect(endState[0].id).toBeDefined()
})

test('correct todolist should change its name', () => {
    const newTodolistTitle = 'New Todolist'

    const action = changeTodolistTitleAC(todoListId2, newTodolistTitle)

    const endState = todosistsReducer(startState, action)

    expect(endState[0].title).toBe('What to learn')
    expect(endState[1].title).toBe(newTodolistTitle)
})

test('correct filter of todolist should be changed', () => {
    const newFilter: FilterValuesType = 'completed'

    const action = changeTodolistFilterAC(todoListId2, newFilter)

    const endState = todosistsReducer(startState, action)

    expect(endState[0].filter).toBe('all')
    expect(endState[1].filter).toBe(newFilter)
})

test('todolists should be set to the state', () => {
    const action = setTodolistsAC(startState)

    const endState = todosistsReducer([], action)

    expect(endState.length).toBe(2)
})

test('correct entity status of todolist should be changed', () => {
    const newStatus: RequestStatusType = 'loading'

    const action = changeTodolistsEntityStatusAC(todoListId2, newStatus)

    const endState = todosistsReducer(startState, action)

    expect(endState[0].entityStatus).toBe('idle')
    expect(endState[1].entityStatus).toBe('loading')
})