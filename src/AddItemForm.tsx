import React, {ChangeEvent, KeyboardEvent, memo, useState} from 'react'
import {IconButton, TextField} from '@mui/material'
import {AddCircleOutlined} from '@mui/icons-material'

type AddItemFormPropsType = {
    addItem: (title: string) => void
}

export const AddItemForm = memo((props: AddItemFormPropsType) => {
    console.log('AddItemForm rendering')
    const [newTaskTitle, setNewTaskTitle] = useState('')

    const [error, setError] = useState<string | null>(null)

    const onNewTitChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
        setNewTaskTitle(event.currentTarget.value)
    }

    const onKeyPressHandler = (event: KeyboardEvent<HTMLInputElement>) => {
        if (error !== null) setError(null)

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
        <TextField
            variant={'outlined'}
            label={'Type value'}
            value={newTaskTitle}
            onChange={onNewTitChangeHandler}
            onKeyPress={onKeyPressHandler}
            error={!!error}
            helperText={error}
        />
        <IconButton
            onClick={addTask}
            color={'primary'}
        ><AddCircleOutlined/></IconButton>
    </div>
})