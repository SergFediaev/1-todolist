import React, {ChangeEvent, KeyboardEvent, useState} from 'react'

type AddItemFormPropsType = {
    addItem: (title: string) => void
}

export function AddItemForm(props: AddItemFormPropsType) {
    const [newTaskTitle, setNewTaskTitle] = useState('')

    const [error, setError] = useState<string | null>(null)

    const onNewTitChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
        setNewTaskTitle(event.currentTarget.value)
    }

    const onKeyPressHandler = (event: KeyboardEvent<HTMLInputElement>) => {
        setError(null)

        if (event.ctrlKey && event.charCode === 13) {
            props.addItem(newTaskTitle)
            setNewTaskTitle('')
        }
    }

    const addTask = () => {
        if (newTaskTitle.trim() !== '' && newTaskTitle !== 'censored') {
            props.addItem(newTaskTitle.trim())
            setNewTaskTitle('')
        } else {
            setError('Invalid input')
        }
    }

    return <div>
        <input
            value={newTaskTitle}
            onChange={onNewTitChangeHandler}
            onKeyPress={onKeyPressHandler}
            className={error ? 'error' : ''}/>
        <button onClick={addTask}>+
        </button>
        {error && <div className="error-message">{error}</div>}
    </div>
}