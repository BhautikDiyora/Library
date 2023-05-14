import React, { useEffect, useState } from 'react'
import { Button, Table, TableBody, TableContainer, TableHead, TableCell, TableRow, Paper, Container, Typography } from '@mui/material'

function MyBooks() {

    const [favBook, setFavBook] = useState([])
    const [issueBook, setIssueBook] = useState()
    const [show, setShow] = useState()

    let auth = JSON.parse(sessionStorage.getItem('user'))

    useEffect(() => {
        getIssueBooks()
    }, [])


    const getIssueBooks = async () => {
        let id = auth._id
        let availBooks = await fetch(`http://127.0.0.1:6969/get-issue/${id}`, {
            method: "GET",
            headers: {
                "Authorization": `bearer ${JSON.parse(sessionStorage.getItem('token'))}`
            }
        })
        let favorite = await availBooks.json()

        if (favorite.issueBook) {
            let data = await fetch('http://127.0.0.1:6969/books', {
                method: "GET",
                headers: {
                    "Authorization": `bearer ${JSON.parse(sessionStorage.getItem('token'))}`
                }
            })
            let result = await data.json()

            const intersection = result.filter(element => favorite.issueBook.bookId.includes(element._id));

            setIssueBook(intersection[0])
            setFavBook(favorite.issueBook)
            setShow(true)

        } else {
            setShow(false)
        }
    }


    const deleteItem = async (quant, pid) => {

        let id = auth._id;
        let quantity = quant + 1
        let quanBook = await fetch(`http://127.0.0.1:6969/book-update/${pid}`, {
            method: 'post',
            body: JSON.stringify({ quantity }),
            headers: {
                "Content-type": "application/json",
                "Authorization": `bearer ${JSON.parse(sessionStorage.getItem('token'))}`
            }
        })


        let data = await fetch(`http://127.0.0.1:6969/update-issue/${id}`, {
            method: 'post',
            body: JSON.stringify({ issueBook: {} }),
            headers: {
                "Content-type": "application/json",
                "Authorization": `bearer ${JSON.parse(sessionStorage.getItem('token'))}`
            }
        })
        let userInfo = await data.json()
        if (userInfo) {
            if (userInfo.modifiedCount) {
                getIssueBooks()
            } else {
                alert('Something wrong')
            }
        } else {
            alert('Something went wrong, Try again later!')
        }


    }


    return (
        <Container>
            {
                show ? <>
                    <Typography sx={{ fontFamily: 'Roboto', fontSize: '3em', fontWeight: 'bold' }}>Issued Book</Typography>
                    <TableContainer component={Paper} sx={{ marginTop: '2em' }}>
                        <Table sx={{ minWidth: 650 }}>
                            <TableHead>
                                <TableRow>
                                    <TableCell sx={{ fontFamily: 'Roboto', fontSize: '1.5em', fontWeight: 'bold' }}>Name</TableCell>
                                    <TableCell sx={{ fontFamily: 'Roboto', fontSize: '1.5em', fontWeight: 'bold' }}>From</TableCell>
                                    <TableCell sx={{ fontFamily: 'Roboto', fontSize: '1.5em', fontWeight: 'bold' }}>To</TableCell>
                                    <TableCell />
                                </TableRow>
                            </TableHead>

                            <TableBody>
                                <TableRow >
                                    <TableCell sx={{ fontFamily: 'Roboto', fontSize: '1em' }}>{issueBook.name}</TableCell>
                                    <TableCell sx={{ fontFamily: 'Roboto', fontSize: '1em' }}>{new Date(favBook.from).toLocaleDateString('en-GB')}</TableCell>
                                    <TableCell sx={{ fontFamily: 'Roboto', fontSize: '1em' }}>{new Date(favBook.to).toLocaleDateString('en-GB')}</TableCell>
                                    <TableCell width={200} ><Button variant={'contained'} color='error' onClick={() => { deleteItem(issueBook.quantity, issueBook._id); }}>Remove Book</Button></TableCell>

                                </TableRow>

                            </TableBody>
                        </Table>

                    </TableContainer>

                </> : <Typography variant={'h5'} sx={{ marginTop: '5em' }}>No issued Books</Typography>

            }
        </Container >


    )
}

export default MyBooks