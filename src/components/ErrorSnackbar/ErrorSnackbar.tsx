import Snackbar from '@mui/material/Snackbar'
import Alert from '@mui/material/Alert'
import React from 'react'
import {useDispatch, useSelector} from 'react-redux'
import {AppRootStateType} from '../../app/store'
import {setAppErrorAC} from '../../app/app-reducer'

export function CustomizedSnackbars() {
    // const [open, setOpen] = React.useState(true)

    const error = useSelector<AppRootStateType, string | null>(state => state.app.error)
    const dispatch = useDispatch()

    const isOpen = error !== null

    const handleClose = (event?: React.SyntheticEvent | Event, reason?: string) => {
        if (reason === 'clickaway') {
            return
        }

        dispatch(setAppErrorAC(null))
        // setOpen(false)
    }

    return (
        <Snackbar open={isOpen} autoHideDuration={3_000} onClose={handleClose}>
            <Alert
                onClose={handleClose}
                severity="error"
                variant="filled"
                sx={{width: '100%'}}>{error}</Alert>
        </Snackbar>
    )
}