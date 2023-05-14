import React, { useState, useEffect } from 'react'
import { Container, Box, Button, TextField, Typography } from '@mui/material'
import { useNavigate } from 'react-router-dom'

function UpdateBook() {

    const [name, setName] = useState('')
    const [description, setDescription] = useState('')
    const [quantity, setQuantity] = useState('')
    const [nameErr, setNameErr] = useState(false)
    const [descriptionErr, setDescriptionErr] = useState(false)
    const [quantityErr, setQuantityErr] = useState(false)

    let book = JSON.parse(sessionStorage.getItem('book'))

    const navigate = useNavigate()

    useEffect(() => {
        setName(book.name)
        setDescription(book.description)
        setQuantity(book.quantity)
    }, [])

    const handleSubmit = async () => {
        name ? setNameErr(false) : setNameErr(true)
        description ? setDescriptionErr(false) : setDescriptionErr(true)
        quantity ? setQuantityErr(false) : setQuantityErr(true)

        let bookId = book._id

        if (name && description && quantity) {
            let data = await fetch(`http://127.0.0.1:6969/book-update/${bookId}`, {
                method: 'post',
                body: JSON.stringify({ name, description, quantity }),
                headers: {
                    "Content-type": "application/json",
                    "Authorization": `bearer ${JSON.parse(sessionStorage.getItem('token'))}`
                }
            })
            let userInfo = await data.json()
            if (userInfo.modifiedCount) {
                // let result = await fetch(`http://127.0.0.1:6969/get-user/${id}`, {
                //     method: 'GET',
                //     headers: {
                //         "Content-type": "application/json",
                //         "Authorization": `bearer ${JSON.parse(sessionStorage.getItem('token'))}`
                //     }
                // })
                // let updatedInfo = await result.json()
                // updatedInfo.map((e) => {
                //     sessionStorage.setItem("user", JSON.stringify(e))
                // })
                sessionStorage.removeItem('book');
                navigate('/profile')
                alert("Book Updated!")
            } else {
                alert('Book Not Updated!')
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
                        id="description-input"
                        label="description"
                        error={descriptionErr}
                        onChange={(e) => { setDescription(e.target.value); if (e.target.value === '' || e.target.value === null) { setDescriptionErr(true) } else { setDescriptionErr(false) } }}
                        value={description}
                        color='error'
                        fullWidth
                        sx={{ my: '2em' }}
                    />
                    <TextField
                        id="quantity-input"
                        label="Quantity"
                        error={quantityErr}
                        onChange={(e) => { setQuantity(e.target.value); if (e.target.value === '' || e.target.value === null) { setQuantityErr(true) } else { setQuantityErr(false) } }}
                        value={quantity}
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

export default UpdateBook