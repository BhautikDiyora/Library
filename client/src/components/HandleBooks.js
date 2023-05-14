import React, { useEffect, useState } from 'react'
import { IconButton, Table, TableBody, TableContainer, TableHead, TableCell, TableRow, Paper, Container, Typography } from '@mui/material'
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import EditIcon from '@mui/icons-material/Edit';
import { useNavigate } from 'react-router-dom'

function HandleBooks() {
    const [books, setBooks] = useState([])
    const [show, setShow] = useState()

    let auth = JSON.parse(sessionStorage.getItem('user'))

    const navigate = useNavigate()

    useEffect(() => {
        getBooks()

    }, [])



    const getBooks = async () => {
        let data = await fetch('http://127.0.0.1:6969/books', {
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
            setBooks(result)
        }
    }


    // const handleAdmin = async (event, id) => {
    //     if (event.target.checked) {
    //         setAdmin(event.target.checked);
    //         let data = await fetch(`http://127.0.0.1:6969/update-user/${id}`, {
    //             method: 'post',
    //             body: JSON.stringify({ role: 1 }),
    //             headers: {
    //                 "Content-type": "application/json",
    //                 "Authorization": `bearer ${JSON.parse(sessionStorage.getItem('token'))}`
    //             }
    //         })
    //         let result = await data.json()
    //         if (result.modifiedCount) {

    //             alert("User have Admin access now!")

    //         }
    //     } else {
    //         setAdmin(event.target.checked);
    //         let data = await fetch(`http://127.0.0.1:6969/update-user/${id}`, {
    //             method: 'post',
    //             body: JSON.stringify({ role: 2 }),
    //             headers: {
    //                 "Content-type": "application/json",
    //                 "Authorization": `bearer ${JSON.parse(sessionStorage.getItem('token'))}`
    //             }
    //         })
    //         let result = await data.json()
    //         if (result.modifiedCount) {

    //             alert("Taken Admin access from the User!")

    //         }
    //     }
    // };


    // const handleBlock = async (event, id) => {
    //     if (event.target.checked) {
    //         setBlock(event.target.checked);
    //         let data = await fetch(`http://127.0.0.1:6969/update-user/${id}`, {
    //             method: 'post',
    //             body: JSON.stringify({ role: 0 }),
    //             headers: {
    //                 "Content-type": "application/json",
    //                 "Authorization": `bearer ${JSON.parse(sessionStorage.getItem('token'))}`
    //             }
    //         })
    //         let result = await data.json()
    //         if (result.modifiedCount) {

    //             alert("User Blocked!")

    //         }
    //     } else {
    //         setBlock(event.target.checked);
    //         let data = await fetch(`http://127.0.0.1:6969/update-user/${id}`, {
    //             method: 'post',
    //             body: JSON.stringify({ role: 2 }),
    //             headers: {
    //                 "Content-type": "application/json",
    //                 "Authorization": `bearer ${JSON.parse(sessionStorage.getItem('token'))}`
    //             }
    //         })
    //         let result = await data.json()
    //         if (result.modifiedCount) {

    //             alert("User Unblocked!")

    //         }
    //     }
    // };

    const editItem = async (book) => {
        sessionStorage.setItem("book", JSON.stringify(book));
        navigate('/update-book')
    }


    const deleteItem = async (pid) => {
        let data = await fetch('http://127.0.0.1:6969/delete-book/' + pid, {
            method: "DELETE",
            headers: {
                "Authorization": `bearer ${JSON.parse(sessionStorage.getItem('token'))}`
            }
        })
        let result = await data.json()
        if (result.deletedCount) {
            getBooks()
            alert('Deleted')
        } else {
            alert('Error deleting')
        }
    }

    return (
        <Container>
            {auth.role === 1 ?
                show ? <>
                    <Typography sx={{ fontFamily: 'Roboto', fontSize: '3em', fontWeight: 'bold' }}>Books Available in the Library!</Typography>
                    <TableContainer component={Paper} sx={{ marginTop: '2em' }}>
                        <Table sx={{ minWidth: 650 }}>
                            <TableHead>
                                <TableRow>
                                    <TableCell sx={{ fontFamily: 'Roboto', fontSize: '1.5em', fontWeight: 'bold' }}>Name</TableCell>
                                    <TableCell sx={{ fontFamily: 'Roboto', fontSize: '1.5em', fontWeight: 'bold' }}>Description</TableCell>
                                    <TableCell sx={{ fontFamily: 'Roboto', fontSize: '1.5em', fontWeight: 'bold' }}>Quantity</TableCell>
                                    <TableCell sx={{ fontFamily: 'Roboto', fontSize: '1.5em', fontWeight: 'bold' }}>Edit</TableCell>
                                    <TableCell sx={{ fontFamily: 'Roboto', fontSize: '1.5em', fontWeight: 'bold' }}>Delete</TableCell>

                                </TableRow>
                            </TableHead>

                            <TableBody>
                                {books.map(e => {
                                    return (
                                        <TableRow key={e._id}>
                                            <TableCell sx={{ fontFamily: 'Roboto', fontSize: '1em' }}>{e.name}</TableCell>
                                            <TableCell sx={{ fontFamily: 'Roboto', fontSize: '1em' }}>{e.description}</TableCell>
                                            <TableCell sx={{ fontFamily: 'Roboto', fontSize: '1em' }}>{e.quantity}</TableCell>
                                            <TableCell width={50} ><IconButton color='error'><EditIcon color='error' size='large' onClick={() => editItem(e)} sx={{ cursor: 'pointer' }} /></IconButton></TableCell>
                                            <TableCell width={50} ><IconButton color='error'><DeleteOutlineIcon color='error' size='large' onClick={() => deleteItem(e._id)} sx={{ cursor: 'pointer' }} /></IconButton></TableCell>
                                        </TableRow>
                                    )
                                })}
                            </TableBody>
                        </Table>

                    </TableContainer>

                </> : <Typography variant={'h5'} sx={{ marginTop: '5em' }}>No Books Available</Typography>
                :
                navigate('/profile')
            }
        </Container >
    )
}

export default HandleBooks