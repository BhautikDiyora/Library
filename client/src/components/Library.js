import React, { useEffect, useState } from 'react'
import BookItem from './BookItem'

import { Grid, Container, Typography, Box } from '@mui/material'
import Masonry from '@mui/lab/Masonry/Masonry';
const Library = () => {

    const [books, setBooks] = useState([])
    const [show, setShow] = useState()


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


    return (
        <Container >
            {
                show ?
                    <Box sx={{ width: '100%' }} >
                        <Masonry columns={{ xs: 1, md: 2, lg: 3 }} spacing={4} >
                            {books.map((e) => {
                                return (
                                    <Box key={e.name}>
                                        <Grid item   >
                                            <BookItem bid={e._id} title={e.name} desc={e.description} quantity={e.quantity} imgURL={e.img} />
                                        </Grid>
                                    </Box>
                                )
                            })}
                        </Masonry>
                    </Box>
                    : <Typography variant={'h5'} sx={{ marginTop: '5em' }}>No Books Available</Typography>
            }
        </Container >)
}

export default Library