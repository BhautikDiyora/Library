import React, { useState, useEffect } from 'react'
import { Checkbox, Table, TableBody, TableContainer, TableHead, TableCell, TableRow, Paper, Container, Typography } from '@mui/material'
import { red } from '@mui/material/colors';
import { useNavigate } from 'react-router-dom'

function HandleUsers() {

    const [users, setUsers] = useState([])
    const [show, setShow] = useState()
    const [admin, setAdmin] = useState();
    const [block, setBlock] = useState();

    let auth = JSON.parse(sessionStorage.getItem('user'))

    const navigate = useNavigate()

    useEffect(() => {
        getUsers()

    }, [])



    const getUsers = async () => {
        let data = await fetch('http://127.0.0.1:6969/users', {
            method: "GET",
            headers: {
                "Authorization": `bearer ${JSON.parse(sessionStorage.getItem('token'))}`
            }
        })
        let result = await data.json()
        if (result.result) {
            setShow(false)
        } else {
            setShow(true)
            setUsers(result)
        }
    }


    const handleAdmin = async (event, id) => {
        if (event.target.checked) {
            setAdmin(event.target.checked);
            let data = await fetch(`http://127.0.0.1:6969/update-user/${id}`, {
                method: 'post',
                body: JSON.stringify({ role: 1 }),
                headers: {
                    "Content-type": "application/json",
                    "Authorization": `bearer ${JSON.parse(sessionStorage.getItem('token'))}`
                }
            })
            let result = await data.json()
            if (result.modifiedCount) {

                alert("User have Admin access now!")

            }
        } else {
            setAdmin(event.target.checked);
            let data = await fetch(`http://127.0.0.1:6969/update-user/${id}`, {
                method: 'post',
                body: JSON.stringify({ role: 2 }),
                headers: {
                    "Content-type": "application/json",
                    "Authorization": `bearer ${JSON.parse(sessionStorage.getItem('token'))}`
                }
            })
            let result = await data.json()
            if (result.modifiedCount) {

                alert("Taken Admin access from the User!")

            }
        }
    };


    const handleBlock = async (event, id) => {
        if (event.target.checked) {
            setBlock(event.target.checked);
            let data = await fetch(`http://127.0.0.1:6969/update-user/${id}`, {
                method: 'post',
                body: JSON.stringify({ role: 0 }),
                headers: {
                    "Content-type": "application/json",
                    "Authorization": `bearer ${JSON.parse(sessionStorage.getItem('token'))}`
                }
            })
            let result = await data.json()
            if (result.modifiedCount) {

                alert("User Blocked!")

            }
        } else {
            setBlock(event.target.checked);
            let data = await fetch(`http://127.0.0.1:6969/update-user/${id}`, {
                method: 'post',
                body: JSON.stringify({ role: 2 }),
                headers: {
                    "Content-type": "application/json",
                    "Authorization": `bearer ${JSON.parse(sessionStorage.getItem('token'))}`
                }
            })
            let result = await data.json()
            if (result.modifiedCount) {

                alert("User Unblocked!")

            }
        }
    };

    return (
        <Container>
            {auth.role === 1 ?
                show ? <>
                    <Typography sx={{ fontFamily: 'Roboto', fontSize: '3em', fontWeight: 'bold' }}>Users on the Website!</Typography>
                    <TableContainer component={Paper} sx={{ marginTop: '2em' }}>
                        <Table sx={{ minWidth: 650 }}>
                            <TableHead>
                                <TableRow>
                                    <TableCell sx={{ fontFamily: 'Roboto', fontSize: '1.5em', fontWeight: 'bold' }}>Current Users</TableCell>
                                    <TableCell sx={{ fontFamily: 'Roboto', fontSize: '1.5em', fontWeight: 'bold' }}>Admin</TableCell>
                                    <TableCell sx={{ fontFamily: 'Roboto', fontSize: '1.5em', fontWeight: 'bold' }}>Block</TableCell>

                                </TableRow>
                            </TableHead>

                            <TableBody>
                                {users.map(e => {
                                    return (
                                        <TableRow key={e._id}>

                                            <TableCell sx={{ fontFamily: 'Roboto', fontSize: '1em' }}>{e.name}</TableCell>
                                            <TableCell>
                                                <Checkbox
                                                    defaultChecked={e.role === 1 ? true : false}
                                                    checked={admin}
                                                    onChange={(event) => handleAdmin(event, e._id)}
                                                />
                                            </TableCell>
                                            <TableCell>
                                                <Checkbox
                                                    defaultChecked={e.role === 0 ? true : false}
                                                    checked={block}
                                                    onChange={(event) => handleBlock(event, e._id)}
                                                    sx={{
                                                        color: red[800],
                                                        '&.Mui-checked': {
                                                            color: red[600],
                                                        }
                                                    }}
                                                />
                                            </TableCell>

                                        </TableRow>
                                    )
                                })}
                            </TableBody>
                        </Table>

                    </TableContainer>

                </> : <Typography variant={'h5'} sx={{ marginTop: '5em' }}>No Users Available</Typography>
                :
                navigate('/profile')
            }
        </Container >
    )
}

export default HandleUsers