import React, { useState, useEffect } from 'react'
import { Button, Container, Grid, TextField, Typography } from '@mui/material'
import { Link, useNavigate } from 'react-router-dom'

const Login = () => {

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const [emailErr, setEmailErr] = useState(false)
    const [passwordErr, setPasswordErr] = useState(false)

    useEffect(() => {
        let auth = sessionStorage.getItem('user')
        if (auth) {
            navigate('/library')
        }
    }, [])


    const navigate = useNavigate()

    const sty = () => {
        return ({
            margin: '0.5em',
            width: '50%'
        })
    }

    const handleSubmit = async () => {

        email ? setEmailErr(false) : setEmailErr(true)
        password ? setPasswordErr(false) : setPasswordErr(true)

        if (email && password) {
            let data = await fetch('http://127.0.0.1:6969/login', {
                method: 'post',
                body: JSON.stringify({ email, password }),
                headers: {
                    "Content-type": "application/json",
                    "Authorization": `bearer ${JSON.parse(sessionStorage.getItem('token'))}`
                }
            })
            let final = await data.json()
            if (final.auth) {
                if (final.user.role) {
                    sessionStorage.setItem("user", JSON.stringify(final.user))
                    sessionStorage.setItem("token", JSON.stringify(final.auth))
                    navigate('/library')
                } else {
                    alert("You are Blocked by the admins!")
                }
            } else {
                setEmailErr(true)
                setPasswordErr(true)
            }
        }
    }



    return (
        <Container>
            <form sx={{ width: '50%' }}>
                <Typography variant='h3' sx={{ padding: '0.5em' }}>Login</Typography>
                <Grid container direction={'column'} >
                    <Grid item >
                        <TextField variant='outlined' error={emailErr} helperText={emailErr ? 'Enter a valid Email' : null} type={'email'} value={email} onChange={(e) => { setEmail(e.target.value); if (e.target.value === '' || e.target.value === null) { setEmailErr(true) } else { setEmailErr(false) } }} label='Email' sx={sty} required />
                    </Grid>
                    <Grid item >
                        <TextField variant='outlined' error={passwordErr} helperText={passwordErr ? 'Enter a valid Password' : ''} type={'password'} value={password} onChange={(e) => { setPassword(e.target.value); if (e.target.value === '' || e.target.value === null) { setPasswordErr(true) } else { setPasswordErr(false) } }} label='Password' sx={sty} required />
                    </Grid>
                    <Grid item>
                        <Button size='large' variant='contained' onClick={handleSubmit} sx={{ margin: '1em' }}>Login</Button>
                    </Grid>
                    <Grid item>
                        <Typography variant='h6' sx={{ margin: '0.5em' }}>Don't have an Account! <Link to={'/signup'}>Sign Up Here</Link></Typography>
                    </Grid>
                </Grid>
            </form >
        </Container>
    )
}

export default Login