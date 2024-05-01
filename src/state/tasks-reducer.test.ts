import {addTaskAC, changeTaskStatusAC, changeTaskTitleAC, removeTaskAC, setTasksAC, tasksReducer} from './tasks-reducer'
import {addTodolistAC, removeTodolistAC, setTodolistsAC} from './todolists-reducer'
import {TasksStateType} from '../AppWithRedux'
import {TaskPriorities, TaskStatuses} from '../api/todolists-api'

// let todoListId1: string
// let todoListId2: string
let startState: TasksStateType = {}

beforeEach(() => {
    // todoListId1 = v1()
    // todoListId2 = v1()
    startState = {
        'todoListId1': [
            {
                id: '1',
                title: 'Watch',
                status: TaskStatuses.New,
                todoListId: 'todoListId1',
                description: '',
                startDate: '',
                deadline: '',
                addedDate: '',
                order: 0,
                priority: TaskPriorities.Low,
            },
            {
                id: '2',
                title: 'Play',
                status: TaskStatuses.Completed,
                todoListId: 'todoListId1',
                description: '',
                startDate: '',
                deadline: '',
                addedDate: '',
                order: 0,
                priority: TaskPriorities.Low,
            },
            {
                id: '3',
                title: 'Read',
                status: TaskStatuses.New,
                todoListId: 'todoListId1',
                description: '',
                startDate: '',
                deadline: '',
                addedDate: '',
                order: 0,
                priority: TaskPriorities.Low,
            }],
        'todoListId2': [
            {
                id: '1',
                title: 'HTML & CSS',
                status: TaskStatuses.New,
                todoListId: 'todoListId2',
                description: '',
                startDate: '',
                deadline: '',
                addedDate: '',
                order: 0,
                priority: TaskPriorities.Low,
            },
            {
                id: '2',
                title: 'JavaScript',
                status: TaskStatuses.Completed,
                todoListId: 'todoListId2',
                description: '',
                startDate: '',
                deadline: '',
                addedDate: '',
                order: 0,
                priority: TaskPriorities.Low,
            },
            {
                id: '3',
                title: 'ReactJS',
                status: TaskStatuses.New,
                todoListId: 'todoListId2',
                description: '',
                startDate: '',
                deadline: '',
                addedDate: '',
                order: 0,
                priority: TaskPriorities.Low,
            },
        ],
    }
})

test('correct task should be deleted from correct array', () => {
    const action = removeTaskAC('2', 'todoListId2')
    const endState = tasksReducer(startState, action)

    expect(endState['todoListId1'].length).toBe(3)
    expect(endState['todoListId2'].length).toBe(2)
    expect(endState['todoListId2'].every(task => task.id != '2')).toBeTruthy()
})

test('correct task should be added to correct array', () => {
    const action = addTaskAC('Juce', 'todoListId2')
    const endState = tasksReducer(startState, action)

    expect(endState['todoListId1'].length).toBe(3)
    expect(endState['todoListId2'].length).toBe(4)
    expect(endState['todoListId2'][0].id).toBeDefined()
    expect(endState['todoListId2'][0].title).toBe('Juce')
    expect(endState['todoListId2'][0].status).toBe(TaskStatuses.New)
})

test('status of specified task should be changed', () => {
    const action = changeTaskStatusAC('2', TaskStatuses.New, 'todoListId2')

    const endState = tasksReducer(startState, action)

    expect(endState['todoListId1'][1].status).toBe(TaskStatuses.Completed)
    expect(endState['todoListId2'][1].status).toBe(TaskStatuses.New)
})

test('title of specified task should be changed', () => {
    const action = changeTaskTitleAC('2', 'Milkyway', 'todoListId2')
    const endState = tasksReducer(startState, action)

    expect(endState['todoListId2'][1].title).toBe('Milkyway')
    expect(endState['todoListId1'][1].title).toBe('Play')
})

test('new property with new array should be added when new todolist is added', () => {
    const action = addTodolistAC('Title no matter')
    const endState = tasksReducer(startState, action)

    const keys = Object.keys(endState)
    const newKey = keys.find(key => key != 'todoListId1' && key != 'todoListId2')
    if (!newKey) throw Error('new key should be added')

    expect(keys.length).toBe(3)
    expect(endState[newKey]).toStrictEqual([])
})

test('property with todolistId should be deleted', () => {
    const action = removeTodolistAC('todoListId2')
    const endState = tasksReducer(startState, action)

    const keys = Object.keys(endState)

    expect(keys.length).toBe(1)
    expect(endState['todoListId2']).toBeUndefined()
})

test('empty arrays should be added when we set todolists', () => {
    const action = setTodolistsAC([
        {id: '1', title: 'Title 1', order: 0, addedDate: ''},
        {id: '2', title: 'Title 2', order: 0, addedDate: ''},
    ])

    const endState = tasksReducer({}, action)

    const keys = Object.keys(endState)

    expect(keys.length).toBe(2)
    expect(endState['1']).toStrictEqual([])
    expect(endState['2']).toStrictEqual([])
})

test('tasks should be added for todolist', () => {
    const action = setTasksAC(startState['todoListId1'], 'todoListId1')

    const endState = tasksReducer({
        'todoListId2': [],
        'todoListId1': [],
    }, action)

    expect(endState['todoListId1'].length).toBe(3)
    expect(endState['todoListId2'].length).toBe(0)
})