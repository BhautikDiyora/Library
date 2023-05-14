import React, { useState } from 'react'
import { Container, Box, Button, TextField, Typography } from '@mui/material'
import { useNavigate } from 'react-router-dom'

function UpdatePassword() {

    const [oldPassword, setOldPassword] = useState('')
    const [newPassword, setNewPassword] = useState('')
    const [conPassword, setConPassword] = useState('')
    const [oldErr, setOldErr] = useState(false)
    const [newErr, setNewErr] = useState(false)
    const [conErr, setConErr] = useState(false)

    let auth = JSON.parse(sessionStorage.getItem('user'))

    const navigate = useNavigate()

    const handleSubmit = async () => {

        if (oldPassword && newPassword && conPassword) {
            if (newPassword === conPassword) {
                let data = await fetch(`http://127.0.0.1:6969/update-password/${auth._id}`, {
                    method: 'post',
                    body: JSON.stringify({ oldPassword, newPassword }),
                    headers: {
                        "Content-type": "application/json",
                        "Authorization": `bearer ${JSON.parse(sessionStorage.getItem('token'))}`
                    }
                })
                let user = await data.json()
                if (user.modifiedCount) {
                    navigate('/profile')
                    alert('Password Updated!')
                } else {
                    setOldErr(true)
                    alert("You forgot your current password? Wow!")
                }
            } else {
                setConErr(true)
            }

        } else {
            alert('Please fill all fields')
        }
    }







    return (
        <Container>
            <Box>
                <Box sx={{ mx: '2em', marginBottom: '2em' }}>
                    <Typography sx={{ fontFamily: 'Roboto', fontSize: '3em', fontWeight: 'bold' }}>Change Password!</Typography>
                </Box>
                <Box sx={{ m: '2em' }}>
                    <TextField
                        id="current-password"
                        label="Current Password"
                        type="password"
                        error={oldErr}
                        onChange={(e) => { setOldPassword(e.target.value); if (e.target.value === '' || e.target.value === null) { setOldErr(true) } else { setOldErr(false) } }}
                        value={oldPassword}
                        color='error'
                        fullWidth
                        sx={{ my: '2em' }}

                    />
                    <TextField
                        id="new-password"
                        label="New Password"
                        type='password'
                        error={newErr}
                        onChange={(e) => { setNewPassword(e.target.value); if (e.target.value === '' || e.target.value === null) { setNewErr(true) } else { setNewErr(false) } }}
                        value={newPassword}
                        color='error'
                        fullWidth
                        sx={{ my: '2em' }}
                    />
                    <TextField
                        id="confirm-new-password"
                        label="Confirm New Password"
                        type='password'
                        error={conErr}
                        onChange={(e) => { setConPassword(e.target.value); if (e.target.value === '' || e.target.value === null) { setConErr(true) } else { setConErr(false) } }}
                        value={conPassword}
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

export default UpdatePassword