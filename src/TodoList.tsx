import React from 'react';
import {TasksType} from "./App";

type TodoListPropsType = {
    title: string
    tasks: Array<TasksType>
}

export const TodoList = (props: TodoListPropsType) => {
    return <div>
        <h3>{props.title}</h3>
        <div>
            <input/>
            <button>+</button>
        </div>
        <ul>
            {props.tasks.map(task => <li key={task.id}><input type="checkbox"
                                                              checked={task.isDone}/><span>{task.title}</span></li>)}
        </ul>
        <div>
            <button>All</button>
            <button>Active</button>
            <button>Completed</button>
        </div>
    </div>
};