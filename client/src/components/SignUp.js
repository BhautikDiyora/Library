import { Button, Container, Grid, TextField, Typography } from '@mui/material'

import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'

const SignUp = () => {

    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [nameErr, setNameErr] = useState(false)
    const [emailErr, setEmailErr] = useState(false)
    const [passwordErr, setPasswordErr] = useState(false)

    const navigate = useNavigate()

    const sty = () => {
        return ({
            margin: '0.5em',
            width: '50%'
        })
    }

    useEffect(() => {
        let auth = sessionStorage.getItem('user')
        if (auth) {
            navigate('/library')
        }
    }, [])

    const handleSubmit = async () => {

        name ? setNameErr(false) : setNameErr(true)
        email ? setEmailErr(false) : setEmailErr(true)
        password ? setPasswordErr(false) : setPasswordErr(true)

        if (name && email && password) {
            if (password.length >= 8) {
                let data = await fetch('http://127.0.0.1:6969/register', {
                    method: 'post',
                    body: JSON.stringify({ name, email, password }),
                    headers: {
                        "Content-type": "application/json",
                        "Authorization": `bearer ${JSON.parse(sessionStorage.getItem('token'))}`
                    }
                })
                let final = await data.json()
                if (final.auth) {
                    sessionStorage.setItem("user", JSON.stringify(final.data))
                    sessionStorage.setItem("token", JSON.stringify(final.auth))
                    navigate('/library')
                } else {
                    console.log('Error signing up')
                }

            } else {
                setPasswordErr(true)
            }




        } else {
            console.log('Please fill the fields')
        }
    }


    return (
        <Container>
            <form sx={{ width: '50%' }}>
                <Typography variant='h3' sx={{ padding: '0.5em' }}>Register</Typography>
                <Grid container direction={'column'} >
                    <Grid item >
                        <TextField variant='outlined' error={nameErr} type={'text'} value={name} onChange={(e) => { setName(e.target.value); if (e.target.value === '' || e.target.value === null) { setNameErr(true) } else { setNameErr(false) } }} label='Name' sx={sty} required />
                    </Grid>
                    <Grid item >
                        <TextField variant='outlined' error={emailErr} type={'email'} value={email} onChange={(e) => { setEmail(e.target.value); if (e.target.value === '' || e.target.value === null) { setEmailErr(true) } else { setEmailErr(false) } }} label='Email' sx={sty} required />
                    </Grid>
                    <Grid item >
                        <TextField variant='outlined' helperText={passwordErr ? "Password must be greater than 8 characters" : null} error={passwordErr} type={'password'} value={password} onChange={(e) => { setPassword(e.target.value); if (e.target.value === '' || e.target.value === null) { setPasswordErr(true) } else { setPasswordErr(false) } }} label='Password' sx={sty} required />
                    </Grid>
                    <Grid item>
                        <Button size='large' variant='contained' onClick={handleSubmit} sx={{ margin: '1em' }}>Submit</Button>
                    </Grid>
                    <Grid item>
                        <Typography variant='h6' sx={{ margin: '0.5em' }}>Already have an Account! <Link to={'/login'}>Login here</Link></Typography>
                    </Grid>
                </Grid>
            </form >
        </Container>
    )
}

export default SignUp