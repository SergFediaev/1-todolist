import {Button, Checkbox, FormControl, FormControlLabel, FormGroup, Grid, TextField} from '@mui/material'
import {useFormik} from 'formik'
import {useDispatch, useSelector} from 'react-redux'
import {loginTC} from './auth-reducer'
import {AppRootStateType} from '../../app/store'
import React from 'react'
import {Navigate} from 'react-router-dom'

export const Login = () => {
    const dispatch = useDispatch()
    const isLoggedIn = useSelector<AppRootStateType, boolean>(state => state.auth.isLoggedIn)

    const formik = useFormik({
        validate: (values) => {
            if (!values.email) {
                return {
                    email: 'Email is required',
                }
            }

            if (!values.password) {
                return {
                    password: 'Password is required',
                }
            }
        },
        initialValues: {
            email: '',
            password: '',
            rememberMe: false,
        },
        onSubmit: (values) => {
            dispatch(loginTC(values))
            // alert(JSON.stringify(values))
        },
    })

    if (isLoggedIn) {
        return <Navigate to={'/'}/>
    }

    return (
        <Grid container justifyContent="center">
            <Grid item xs={4}>
                <form onSubmit={formik.handleSubmit}>
                    <FormControl>

                        <FormGroup>
                            <TextField
                                label="Email"
                                margin="normal"
                                // name="email"
                                // onChange={formik.handleChange}
                                // value={formik.values.email}
                                {...formik.getFieldProps('email')}
                            />
                            {formik.errors.email ? <div>{formik.errors.email}</div> : null}
                            <TextField
                                type="password"
                                label="Password"
                                margin="normal"
                                // name="password"
                                // onChange={formik.handleChange}
                                // value={formik.values.password}
                                {...formik.getFieldProps('password')}
                            />
                            {formik.errors.password ? <div>{formik.errors.password}</div> : null}
                            <FormControlLabel
                                label="Remember me"
                                control={
                                    <Checkbox
                                        // onChange={formik.handleChange}
                                        // checked={formik.values.rememberMe}
                                        // name="rememberMe"
                                        {...formik.getFieldProps('rememberMe')}
                                        checked={formik.values.rememberMe}
                                    />
                                }
                            />
                            <Button type="submit" variant="contained" color="primary">
                                Login
                            </Button>
                        </FormGroup>

                    </FormControl>
                </form>
            </Grid>
        </Grid>
    )
}