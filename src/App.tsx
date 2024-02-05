import React from 'react';
import './App.css';
import {TodoList} from "./TodoList";

export type TasksType = {
    id: number
    title: string
    isDone: boolean
}

function App() {
    let tasks1: Array<TasksType> = [
        {
            id: 1,
            title: "HTML & CSS",
            isDone: true,
        },
        {
            id: 2,
            title: "JavaScript",
            isDone: true,
        },
        {
            id: 3,
            title: "ReactJS",
            isDone: false,
        },
    ]

    let tasks2 = [
        {
            id: 1,
            title: "Watch",
            isDone: true,
        },
        {
            id: 2,
            title: "Play",
            isDone: false,
        },
        {
            id: 3,
            title: "Read",
            isDone: true,
        },
    ]

    return (
        <div className="App">
            <TodoList title='What to learn' tasks={tasks1}/>
            <TodoList title='What to do' tasks={tasks2}/>
        </div>
    );
}

export default App;