import { Container, Box, Button, Typography } from '@mui/material'
import { useNavigate } from 'react-router-dom'
import React from 'react'

function Profile() {

    let auth = JSON.parse(sessionStorage.getItem('user'))

    const navigate = useNavigate()




    return (
        <Container>
            {auth.role === 1 ?
                <Box>
                    <Box sx={{ marginBottom: '2em' }}>
                        <Typography sx={{ fontFamily: 'Roboto', fontSize: '3em', fontWeight: 'bold' }}>Welcome, {auth.name}.</Typography>
                        <Typography sx={{ fontFamily: 'Roboto', fontSize: '2em' }}>So, What you wanna do today?</Typography>
                    </Box>
                    <Box >
                        <Button variant='outlined' color='error' size='large' onClick={() => { navigate('/update-profile') }} sx={{ m: '1em', fontSize: '2em', fontFamily: 'Roboto', fontWeight: 'bold' }}>Update Profile</Button>
                        <Button variant='outlined' color='error' size='large' onClick={() => { navigate('/update-password') }} sx={{ m: '1em', fontSize: '2em', fontFamily: 'Roboto', fontWeight: 'bold' }}>Change Password</Button>
                        <Button variant='outlined' color='error' size='large' onClick={() => { navigate('/handle-users') }} sx={{ m: '1em', fontSize: '2em', fontFamily: 'Roboto', fontWeight: 'bold' }}>Handle Users</Button><br />
                        <Button variant='outlined' color='error' size='large' onClick={() => { navigate('/new-book') }} sx={{ m: '1em', fontSize: '2em', fontFamily: 'Roboto', fontWeight: 'bold' }}>Add a new Book</Button>
                        <Button variant='outlined' color='error' size='large' onClick={() => { navigate('/handle-books') }} sx={{ m: '1em', fontSize: '2em', fontFamily: 'Roboto', fontWeight: 'bold' }}>Handle Books</Button>


                    </Box>
                </Box>
                :
                <Box>
                    <Box sx={{ marginBottom: '2em' }}>
                        <Typography sx={{ fontFamily: 'Roboto', fontSize: '3em', fontWeight: 'bold' }}>Welcome, {auth.name}.</Typography>
                        <Typography sx={{ fontFamily: 'Roboto', fontSize: '2em' }}>So, What you wanna do today?</Typography>
                    </Box>
                    <Box >
                        <Button variant='outlined' color='error' size='large' onClick={() => { navigate('/update-profile') }} sx={{ m: '1em', fontSize: '2em', fontFamily: 'Roboto', fontWeight: 'bold' }}>Update Profile</Button>
                        <Button variant='outlined' color='error' size='large' onClick={() => { navigate('/update-password') }} sx={{ m: '1em', fontSize: '2em', fontFamily: 'Roboto', fontWeight: 'bold' }}>Change Password</Button>
                    </Box>
                </Box>
            }
        </Container >
    )
}

export default Profile