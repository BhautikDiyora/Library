import { Container, Box, Button, TextField, Typography } from '@mui/material'
import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

function UpdateProfile() {

    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [nameErr, setNameErr] = useState(false)
    const [emailErr, setEmailErr] = useState(false)

    let auth = JSON.parse(sessionStorage.getItem('user'))

    const navigate = useNavigate()


    useEffect(() => {
        async function getUser() {
            let data = await fetch(`http://127.0.0.1:6969/get-user/${auth._id}`, {
                method: 'GET',
                headers: {
                    "Content-type": "application/json",
                    "Authorization": `bearer ${JSON.parse(sessionStorage.getItem('token'))}`
                }
            })
            let user = await data.json()
            user.map((e) => {
                setName(e.name)
                setEmail(e.email)
            })
        }
        getUser()
    }, [])

    const handleSubmit = async () => {
        name ? setNameErr(false) : setNameErr(true)
        email ? setEmailErr(false) : setEmailErr(true)
        let id = auth._id
        if (name && email) {
            let data = await fetch(`http://127.0.0.1:6969/update-user/${id}`, {
                method: 'post',
                body: JSON.stringify({ name, email }),
                headers: {
                    "Content-type": "application/json",
                    "Authorization": `bearer ${JSON.parse(sessionStorage.getItem('token'))}`
                }
            })
            let userInfo = await data.json()
            if (userInfo.modifiedCount) {
                let result = await fetch(`http://127.0.0.1:6969/get-user/${id}`, {
                    method: 'GET',
                    headers: {
                        "Content-type": "application/json",
                        "Authorization": `bearer ${JSON.parse(sessionStorage.getItem('token'))}`
                    }
                })
                let updatedInfo = await result.json()
                updatedInfo.map((e) => {
                    sessionStorage.setItem("user", JSON.stringify(e))
                })
                navigate('/profile')
                alert("Profile Updated!")
            } else {
                alert('Profile Not Updated!')
            }
        } else {
            alert('Please fill all fields')
        }
    }


    return (
        <Container>
            <Box>
                <Box sx={{ mx: '2em', marginBottom: '2em' }}>
                    <Typography sx={{ fontFamily: 'Roboto', fontSize: '3em', fontWeight: 'bold' }}>Update your Account Details!</Typography>
                </Box>
                <Box sx={{ m: '2em' }}>
                    <TextField
                        id="name-input"
                        label="Name"
                        error={nameErr}
                        onChange={(e) => { setName(e.target.value); if (e.target.value === '' || e.target.value === null) { setNameErr(true) } else { setNameErr(false) } }}
                        value={name}
                        color='error'
                        fullWidth
                        sx={{ my: '2em' }}

                    />
                    <TextField
                        id="email-input"
                        label="Email"
                        error={emailErr}
                        onChange={(e) => { setEmail(e.target.value); if (e.target.value === '' || e.target.value === null) { setEmailErr(true) } else { setEmailErr(false) } }}
                        value={email}
                        color='error'
                        fullWidth
                        sx={{ my: '2em' }}
                    />
                    <Box sx={{ display: 'flex', justifyContent: 'center' }}>
                        <Button size='large' color='error' variant='contained' onClick={handleSubmit} sx={{ m: '2em' }}>Submit</Button>
                    </Box>
                </Box>
            </Box>
        </Container>
    )
}

export default UpdateProfile