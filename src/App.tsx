import React, {useState} from 'react'
import './App.css'
import {TodoList} from './TodoList'
import {v1} from 'uuid'

export type FilterValuesType = 'all' | 'completed' | 'active'

type TodoListType = {
    id: string
    title: string
    filter: FilterValuesType
}

export function Counter() {
    console.log('Counter rendered')
    let [data, setData] = useState(1)

    return <div
        style={{cursor: 'pointer', fontSize: '100px'}}
        onClick={() => {
            setData(++data)
        }}>{data}</div>
}

function App() {
    /*    let tasks2 = [
            {
                id: v1(),
                title: 'Watch',
                isDone: true,
            },
            {
                id: v1(),
                title: 'Play',
                isDone: false,
            },
            {
                id: v1(),
                title: 'Read',
                isDone: true,
            },
        ]
        console.log(tasks2)*/

    /*    let [data, setData] = useState<Array<TasksType>>([
            {
                id: v1(),
                title: 'HTML & CSS',
                isDone: true,
            },
            {
                id: v1(),
                title: 'JavaScript',
                isDone: true,
            },
            {
                id: v1(),
                title: 'ReactJS',
                isDone: false,
            },
            {
                id: v1(),
                title: 'Redux',
                isDone: false,
            },
        ])*/

    // let [filter, setFilter] = useState<FilterValuesType>('all')

    function removeTask(id: string, todoListId: string) {
        debugger

        let tasks = allTasksObject[todoListId]

        // let filteredTasks = tasks1.filter(() => true) // Фильтр пропустит все элементы в результирующий массив.

        let filteredTasks = tasks.filter(task => {
            // tasks1 = tasks1.filter(task => {
            // if (task.id !== id) return true // Если айди таски НЕ равно айди из параметра, то пропустить таску в результирующий массив.
            // else return false // Иначе не пропускать, тем самым отсеяв ненужную таску, то есть удалив её.
            return task.id !== id
        })
        // console.log(filteredTasks)
        console.log(allTasksObject)

        allTasksObject[todoListId] = filteredTasks

        setAllTasksObject({...allTasksObject})
    }

    function addTask(newTitle: string, todoListId: string) {
        let tasks = allTasksObject[todoListId]

        let newTask = {id: v1(), title: newTitle, isDone: false}
        let newTasks = [newTask, ...tasks]

        allTasksObject[todoListId] = newTasks

        setAllTasksObject({...allTasksObject})
    }

    function changeStatus(taskId: string, isDone: boolean, todoListId: string) {

        let tasks = allTasksObject[todoListId]

        let foundedTask = tasks.find(task => task.id === taskId)
        if (foundedTask) {
            foundedTask.isDone = isDone

            setAllTasksObject({...allTasksObject})
        }

        // let copy = [...data]
    }

    const changeFilter = (filter: FilterValuesType, todoListId: string) => {
        let todoList = todoLists.find(todoList => todoList.id === todoListId)
        if (todoList) {
            todoList.filter = filter
            setTodoLists([...todoLists])
        }
    }

    const todoListId1 = v1()
    const todoListId2 = v1()


    const [allTasksObject, setAllTasksObject] = useState({
        [todoListId1]: [{
            id: v1(),
            title: 'Watch',
            isDone: true,
        },
            {
                id: v1(),
                title: 'Play',
                isDone: false,
            },
            {
                id: v1(),
                title: 'Read',
                isDone: true,
            }],
        [todoListId2]: [
            {
                id: v1(),
                title: 'HTML & CSS',
                isDone: true,
            },
            {
                id: v1(),
                title: 'JavaScript',
                isDone: true,
            },
            {
                id: v1(),
                title: 'ReactJS',
                isDone: false,
            },
            {
                id: v1(),
                title: 'Redux',
                isDone: false,
            },
        ],
    })

    const [todoLists, setTodoLists] = useState<TodoListType[]>([
        {id: todoListId1, title: 'What to learn', filter: 'active'},
        {id: todoListId2, title: 'What to buy', filter: 'completed'},
    ])

    let removeTodoList = (todoLIstId: string) => {
        debugger

        const filteredTotoLists = todoLists.filter(todoList => todoList.id !== todoLIstId)

        setTodoLists(filteredTotoLists)

        delete allTasksObject[todoLIstId]
        setAllTasksObject({...allTasksObject})
    }

    return (
        <div className="App">
            {
                todoLists.map(todoList => {
                    let tasksForTodoList = allTasksObject[todoList.id]

                    if (todoList.filter === 'completed') {
                        tasksForTodoList = tasksForTodoList.filter(task => task.isDone)
                    }

                    if (todoList.filter === 'active') {
                        tasksForTodoList = tasksForTodoList.filter(task => !task.isDone)
                    }

                    return <TodoList
                        key={todoList.id}
                        id={todoList.id}
                        title={todoList.title}
                        tasks={tasksForTodoList}
                        removeTask={removeTask}
                        changeFilter={changeFilter}
                        addTask={addTask}
                        changeTaskStatus={changeStatus}
                        filter={todoList.filter}
                        removeTodoList={removeTodoList}/>
                })
            }

            {/*<TodoList title='What to do' tasks={data} removeTask={removeTask}/>*/}
        </div>
    )
}

export default App