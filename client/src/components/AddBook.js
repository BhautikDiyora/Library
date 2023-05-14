import React, { useEffect, useState } from 'react'
import { Button, Box, Container, Grid, TextField, Typography } from '@mui/material'
import { MuiFileInput } from 'mui-file-input'
import { useNavigate } from 'react-router-dom'

function AddBook() {

    const [name, setName] = useState('')
    const [description, setDescription] = useState('')
    const [quantity, setQuantity] = useState('')
    const [img, setImg] = useState('')
    const [nameErr, setNameErr] = useState(false)
    const [descErr, setDescErr] = useState(false)
    const [quantityErr, setQuantityErr] = useState(false)
    const [imgErr, setImgErr] = useState(false)
    const [file, setFile] = useState()

    const handleChange = (newFile) => {
        setFile(newFile)
    }

    let auth = JSON.parse(sessionStorage.getItem('user'))

    const navigate = useNavigate()

    useEffect(() => {
        if (auth.role === 2) {
            navigate('/profile')
        }
    })

    const sty = () => {
        return ({
            margin: '0.5em',
            width: '50%'
        })
    }

    const handleSubmit = async () => {

        name ? setNameErr(false) : setNameErr(true)
        description ? setDescErr(false) : setDescErr(true)
        quantity ? setQuantityErr(false) : setQuantityErr(true)
img?setImgErr(false):setImgErr(true)
        if (name && description && quantity && img) {

            let data = await fetch('http://127.0.0.1:6969/add-book', {
                method: 'POST',
                body: JSON.stringify({ name, description, quantity,img }),
                headers: {
                    "Content-type": "application/json",
                    "Authorization": `bearer ${JSON.parse(sessionStorage.getItem('token'))}`
                }
            })
            let final = await data.json()
            if (final.name) {
                navigate('/profile')
                alert('New Book added to the Library!')
            } else {
                alert('Error occurred while adding product')
            }
        }
    }
    return (

        <Container>
            <form sx={{ width: '50%' }}>
                <Typography sx={{ fontFamily: 'Roboto', fontSize: '3em', fontWeight: 'bold' }}>Add Book</Typography>
                <Grid container direction={'column'} >
                    <Grid item >
                        <TextField variant='outlined' error={nameErr} type={'text'} value={name} onChange={(e) => { setName(e.target.value); if (e.target.value === '' || e.target.value === null) { setNameErr(true) } else { setNameErr(false) } }} label='Name' sx={sty} required />
                    </Grid>
                    <Grid item >
                        <TextField variant='outlined' error={descErr} type={'text'} value={description} onChange={(e) => { setDescription(e.target.value); if (e.target.value === '' || e.target.value === null) { setDescErr(true) } else { setDescErr(false) } }} label='Description' sx={sty} required />
                    </Grid>
                    <Grid item >
                        <TextField variant='outlined' error={quantityErr} type={'number'} value={quantity} onChange={(e) => { setQuantity(e.target.value); if (e.target.value === '' || e.target.value === null) { setQuantityErr(true) } else { setQuantityErr(false) } }} label='Quantity' sx={sty} required />
                    </Grid>
                    <Grid item >
                        <TextField variant='outlined' error={imgErr} type={'text'} value={img} onChange={(e) => { setImg(e.target.value); if (e.target.value === '' || e.target.value === null) { setImgErr(true) } else { setImgErr(false) } }} label='Image Link' sx={sty} required />
                    </Grid>
                    <Grid item>
                        <Box sx={{ display: 'flex' }}>
                            <Typography sx={{ margin: '1em', fontWeight: 'bold' }}>Upload Image!</Typography>
                            <MuiFileInput sx={{ margin: '0.5em', width: '25%', cursor: 'pointer' }} placeholder="Insert a file" value={file} onChange={handleChange} />

                        </Box>
                    </Grid>
                    <Grid item>
                        <Button size='large' onClick={handleSubmit} variant='contained' sx={{ margin: '1em', marginLeft: '20%' }}>Add Book</Button>
                    </Grid>
                </Grid>
            </form >
        </Container >

    )
}

export default AddBook