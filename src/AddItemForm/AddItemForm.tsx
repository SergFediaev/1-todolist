import React, {memo} from 'react'
import {IconButton, TextField} from '@mui/material'
import {AddCircleOutlined} from '@mui/icons-material'
import {useAddItemForm} from './hooks/useAddItemForm'

type AddItemFormPropsType = {
    addItem: (title: string) => void
}

export const AddItemForm = memo((props: AddItemFormPropsType) => {
    console.log('AddItemForm rendering')

    const {
        newTaskTitle,
        error,
        onKeyPressHandler,
        onNewTitleChangeHandler,
        addTask,
    } = useAddItemForm(props.addItem)

    return <div>
        <TextField
            variant={'outlined'}
            label={'Type value'}
            value={newTaskTitle}
            onChange={onNewTitleChangeHandler}
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