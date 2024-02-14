import React, {useState} from 'react';
import './App.css';
import {TasksType, TodoList} from './TodoList';
import {v1} from 'uuid';

export type FilterValuesType = 'all' | 'completed' | 'active'

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
    let tasks2 = [
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
    console.log(tasks2)

    let [data, setData] = useState<Array<TasksType>>([
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
    ]);
    let [filter, setFilter] = useState<FilterValuesType>('all')

    function removeTask(id: string) {
        // let filteredTasks = tasks1.filter(() => true) // Фильтр пропустит все элементы в результирующий массив.
        let filteredTasks = data.filter(task => {
            // tasks1 = tasks1.filter(task => {
            // if (task.id !== id) return true // Если айди таски НЕ равно айди из параметра, то пропустить таску в результирующий массив.
            // else return false // Иначе не пропускать, тем самым отсеяв ненужную таску, то есть удалив её.
            return task.id !== id
        });
        // console.log(filteredTasks)
        console.log(data)

        setData(filteredTasks)
    }

    function addTask(newTitle: string) {
        let newTask = {id: v1(), title: newTitle, isDone: false}
        let newTasks = [newTask, ...data]
        setData(newTasks)
    }

    function changeStatus(taskId: string, isDone: boolean) {
        let foundedTask = data.find(task => task.id === taskId)
        if (foundedTask) {
            foundedTask.isDone = isDone
        }

        // let copy = [...data]
        setData([...data])
    }

    const changeFilter = (filter: FilterValuesType) => setFilter(filter)

    let tasksForTodoList = data

    if (filter === 'completed') {
        tasksForTodoList = data.filter(task => task.isDone)
    }

    if (filter === 'active') {
        tasksForTodoList = data.filter(task => !task.isDone)
    }

    return (
        <div className="App">
            <TodoList
                title="What to learn"
                tasks={tasksForTodoList}
                removeTask={removeTask}
                changeFilter={changeFilter}
                addTask={addTask}
                changeTaskStatus={changeStatus}
                filter={filter}/>
            {/*<TodoList title='What to do' tasks={data} removeTask={removeTask}/>*/}
        </div>
    );
}

export default App;