import React from 'react'
import './App.css'
import {AppBar, Button, Container, IconButton, LinearProgress, Toolbar, Typography} from '@mui/material'
import {MenuRounded} from '@mui/icons-material'
import {TodolistsList} from '../features/TodolistsList/TodolistsList'
import {CustomizedSnackbars} from '../components/ErrorSnackbar/ErrorSnackbar'
import {AppRootStateType} from './store'
import {RequestStatusType} from './app-reducer'
import {useSelector} from 'react-redux'

function App() {
    console.log('App rendering')
    const status = useSelector<AppRootStateType, RequestStatusType>(state => state.app.status)

    return (
        <div className="App">
            <CustomizedSnackbars/>
            <AppBar position="static">
                <Toolbar>
                    <IconButton
                        size="large"
                        edge="start"
                        color="inherit"
                        aria-label="menu"
                        sx={{mr: 2}}
                    >
                        <MenuRounded/>
                    </IconButton>
                    <Typography variant="h6" component="div" sx={{flexGrow: 1}}>
                        News
                    </Typography>
                    <Button color="inherit">Login</Button>
                </Toolbar>
                {status === 'loading' && <LinearProgress/>}
            </AppBar>
            <Container fixed>
                <TodolistsList/>
            </Container>
        </div>
    )
}

export default App