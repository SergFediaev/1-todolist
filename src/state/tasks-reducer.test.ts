import {v1} from 'uuid'
import {addTaskAC, changeTaskStatusAC, changeTaskTitleAC, removeTaskAC, tasksReducer} from './tasks-reducer'
import {addTodolistAC, removeTodolistAC} from './todolists-reducer'
import {TasksStateType} from '../AppWithRedux'

test('correct task should be deleted from correct array', () => {
    const todoListId1 = v1()
    const todoListId2 = v1()

    const startState: TasksStateType = {
        [todoListId1]: [
            {
                id: '1',
                title: 'Watch',
                isDone: true,
            },
            {
                id: '2',
                title: 'Play',
                isDone: false,
            },
            {
                id: '3',
                title: 'Read',
                isDone: true,
            }],
        [todoListId2]: [
            {
                id: '1',
                title: 'HTML & CSS',
                isDone: true,
            },
            {
                id: '2',
                title: 'JavaScript',
                isDone: true,
            },
            {
                id: '3',
                title: 'ReactJS',
                isDone: false,
            },
        ],
    }

    const action = removeTaskAC('2', todoListId2)
    const endState = tasksReducer(startState, action)

    expect(endState[todoListId1].length).toBe(3)
    expect(endState[todoListId2].length).toBe(2)
    expect(endState[todoListId2].every(task => task.id != '2')).toBeTruthy()
    // expect(endState[todoListId2][0].id).toBe('1')
    // expect(endState[todoListId2][1].id).toBe('3')
})

test('correct task should be added to correct array', () => {
    const todoListId1 = v1()
    const todoListId2 = v1()

    const startState: TasksStateType = {
        [todoListId1]: [
            {
                id: '1',
                title: 'Watch',
                isDone: true,
            },
            {
                id: '2',
                title: 'Play',
                isDone: false,
            },
            {
                id: '3',
                title: 'Read',
                isDone: true,
            }],
        [todoListId2]: [
            {
                id: '1',
                title: 'HTML & CSS',
                isDone: true,
            },
            {
                id: '2',
                title: 'JavaScript',
                isDone: true,
            },
            {
                id: '3',
                title: 'ReactJS',
                isDone: false,
            },
        ],
    }

    const action = addTaskAC('Juce', todoListId2)
    const endState = tasksReducer(startState, action)

    expect(endState[todoListId1].length).toBe(3)
    expect(endState[todoListId2].length).toBe(4)
    expect(endState[todoListId2][0].id).toBeDefined()
    expect(endState[todoListId2][0].title).toBe('Juce')
    expect(endState[todoListId2][0].isDone).toBe(false)
})

test('status of specified task should be changed', () => {
    const todoListId1 = v1()
    const todoListId2 = v1()

    const startState: TasksStateType = {
        [todoListId1]: [
            {
                id: '1',
                title: 'Watch',
                isDone: false,
            },
            {
                id: '2',
                title: 'Play',
                isDone: true,
            },
            {
                id: '3',
                title: 'Read',
                isDone: false,
            }],
        [todoListId2]: [
            {
                id: '1',
                title: 'HTML & CSS',
                isDone: false,
            },
            {
                id: '2',
                title: 'JavaScript',
                isDone: true,
            },
            {
                id: '3',
                title: 'ReactJS',
                isDone: false,
            },
        ],
    }

    const action = changeTaskStatusAC('2', false, todoListId2)

    const endState = tasksReducer(startState, action)

    expect(endState[todoListId2][1].isDone).toBeFalsy()
    expect(endState[todoListId1][1].isDone).toBeTruthy()
})

test('title of specified task should be changed', () => {
    const todoListId1 = v1()
    const todoListId2 = v1()

    const startState: TasksStateType = {
        [todoListId1]: [
            {
                id: '1',
                title: 'Watch',
                isDone: false,
            },
            {
                id: '2',
                title: 'Play',
                isDone: true,
            },
            {
                id: '3',
                title: 'Read',
                isDone: false,
            }],
        [todoListId2]: [
            {
                id: '1',
                title: 'HTML & CSS',
                isDone: false,
            },
            {
                id: '2',
                title: 'JavaScript',
                isDone: true,
            },
            {
                id: '3',
                title: 'ReactJS',
                isDone: false,
            },
        ],
    }

    const action = changeTaskTitleAC('2', 'Milkyway', todoListId2)
    const endState = tasksReducer(startState, action)

    expect(endState[todoListId2][1].title).toBe('Milkyway')
    expect(endState[todoListId1][1].title).toBe('Play')
})

test('new property with new array should be added when new todolist is added', () => {
    const todoListId1 = v1()
    const todoListId2 = v1()

    const startState: TasksStateType = {
        [todoListId1]: [
            {
                id: '1',
                title: 'Watch',
                isDone: false,
            },
            {
                id: '2',
                title: 'Play',
                isDone: true,
            },
            {
                id: '3',
                title: 'Read',
                isDone: false,
            }],
        [todoListId2]: [
            {
                id: '1',
                title: 'HTML & CSS',
                isDone: false,
            },
            {
                id: '2',
                title: 'JavaScript',
                isDone: true,
            },
            {
                id: '3',
                title: 'ReactJS',
                isDone: false,
            },
        ],
    }

    const action = addTodolistAC('Title no matter')
    const endState = tasksReducer(startState, action)

    const keys = Object.keys(endState)
    const newKey = keys.find(key => key != todoListId1 && key != todoListId2)
    if (!newKey) throw Error('new key should be added')

    expect(keys.length).toBe(3)
    expect(endState[newKey]).toStrictEqual([])
})

test('property with todolistId should be deleted', () => {
    const todoListId1 = v1()
    const todoListId2 = v1()

    const startState: TasksStateType = {
        [todoListId1]: [
            {
                id: '1',
                title: 'Watch',
                isDone: false,
            },
            {
                id: '2',
                title: 'Play',
                isDone: true,
            },
            {
                id: '3',
                title: 'Read',
                isDone: false,
            }],
        [todoListId2]: [
            {
                id: '1',
                title: 'HTML & CSS',
                isDone: false,
            },
            {
                id: '2',
                title: 'JavaScript',
                isDone: true,
            },
            {
                id: '3',
                title: 'ReactJS',
                isDone: false,
            },
        ],
    }

    const action = removeTodolistAC(todoListId2)
    const endState = tasksReducer(startState, action)

    const keys = Object.keys(endState)

    expect(keys.length).toBe(1)
    expect(endState[todoListId2]).toBeUndefined()
})