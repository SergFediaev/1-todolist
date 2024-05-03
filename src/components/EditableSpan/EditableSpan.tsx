import React, {ChangeEvent, memo, useState} from 'react'
import {TextField} from '@mui/material'

type EditableSpanPropsType = {
    title: string
    onChange: (value: string) => void
}

export const EditableSpan = memo((props: EditableSpanPropsType) => {
    console.log('EditableSpan rendering')
    const [editMode, setEditMode] = useState<boolean>(false)

    const [title, setTitle] = useState<string>('')

    function activateEditMode() {
        setEditMode(true)
        setTitle(props.title)
    }

    function activateViewMode() {
        setEditMode(false)
        props.onChange(title)
    }

    const onChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
        setTitle(event.currentTarget.value)
    }

    return editMode
        ? <TextField
            value={title}
            onBlur={activateViewMode}
            autoFocus
            onChange={onChangeHandler}
        />
        : <span onDoubleClick={() => activateEditMode()}>{props.title}</span>
})