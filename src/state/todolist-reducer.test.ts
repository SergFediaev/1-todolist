import {v1} from 'uuid'
import {
    addTodolistAC,
    changeTodolistFilterAC,
    changeTodolistTitleAC,
    FilterValuesType,
    removeTodolistAC,
    TodolistDomainType,
    todosistsReducer,
} from './todolists-reducer'

let todoListId1: string
let todoListId2: string
let startState: TodolistDomainType[] = []

beforeEach(() => {
    todoListId1 = v1()
    todoListId2 = v1()
    startState = [
        {id: todoListId1, title: 'What to learn', filter: 'all', addedDate: '', order: 0},
        {id: todoListId2, title: 'What to buy', filter: 'all', addedDate: '', order: 0},
    ]
})

test('correct todolist should be removed', () => {
    const endState = todosistsReducer(startState, removeTodolistAC(todoListId1))

    expect(endState.length).toBe(1)
    expect(endState[0].id).toBe(todoListId2)
})

test('correct todolist should be added', () => {
    const newTodolistTitle = 'New Todolist'

    const endState = todosistsReducer(startState, addTodolistAC(newTodolistTitle))

    expect(endState.length).toBe(3)
    expect(endState[0].title).toBe(newTodolistTitle)
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