import React from 'react'
import { Button } from "@mui/material";
import { Box, Card, CardMedia, CardContent, Typography, CardActions } from "@mui/material";

import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { useNavigate } from 'react-router-dom'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';

import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
function BookItem(props) {

    const navigate = useNavigate()


    const [open, setOpen] = React.useState(false);
    const [issuedDate, setIssuedDate] = React.useState(null);


    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    let auth = JSON.parse(sessionStorage.getItem('user'))

    const addFav = async (bid) => {

        let id = auth._id;
        let data = await fetch(`http://127.0.0.1:6969/add-fav/${id}`, {
            method: 'post',
            body: JSON.stringify({ favorites: [bid] }),
            headers: {
                "Content-type": "application/json",
                "Authorization": `bearer ${JSON.parse(sessionStorage.getItem('token'))}`
            }
        })
        let userInfo = await data.json()
        if (userInfo) {
            if (userInfo.modifiedCount) {
                navigate('/favorites')
            } else {
                alert('Already in Favorites!')
            }
        } else {
            alert('Something went wrong, Try again later!')
        }
    }


    const issueBook = async (bid, days) => {

        let id = auth._id;
        let bookId = props.bid;
        let book = await fetch(`http://127.0.0.1:6969/get-issue/${id}`, {
            method: 'get',
            headers: {
                "Content-type": "application/json",
                "Authorization": `bearer ${JSON.parse(sessionStorage.getItem('token'))}`
            }
        })


        let issued = await book.json()

        if (issued.issueBook) {
            handleClose()
            alert('You already have 1 book issued!')
            setIssuedDate(null)

        } else {

            let quantity = props.quantity - 1
            let quanBook = await fetch(`http://127.0.0.1:6969/book-update/${bookId}`, {
                method: 'post',
                body: JSON.stringify({ quantity }),
                headers: {
                    "Content-type": "application/json",
                    "Authorization": `bearer ${JSON.parse(sessionStorage.getItem('token'))}`
                }
            })

            let issueTime = new Date();
            let to = days.format('L');
            let id = auth._id;


            let data = await fetch(`http://127.0.0.1:6969/issue-book/${id}`, {
                method: 'post',
                body: JSON.stringify({ issueBook: { bookId: props.bid, from: issueTime, to } }),
                headers: {
                    "Content-type": "application/json",
                    "Authorization": `bearer ${JSON.parse(sessionStorage.getItem('token'))}`
                }
            })
            let bookInfo = await data.json()
            if (bookInfo) {
                if (bookInfo.modifiedCount) {
                    navigate('/my-books')
                } else {
                    alert('Error')
                }
            } else {
                alert('Something went wrong, Try again later!')

            }


        }


    }






    return (

        <Card sx={{ minWidth: 250, maxWidth: 350, maxHeight: 550, border: 1, borderColor: '#17151c' }}>

            <CardMedia
                component="img"
                image={!props.imgURL ? 'https://i.imgur.com/yzimtMs.jpeg' : props.imgURL}
                alt="..."
                sx={{
                    mx: 'auto',
                    borderBottom: 1,
                    height: 200,
                    borderColor: '#17151c'
                }}
            />
            <CardContent>
                <Typography gutterBottom variant="h5" sx={{ fontWeight: 'bold' }} >
                    {props.title}
                </Typography>
                <Typography variant="body1" color="text.secondary">
                    {props.desc}



                </Typography>
                <Typography variant="body1" color="text.secondary" sx={{ fontWeight: 'bold' }}>
                    Available Quantity: {props.quantity}



                </Typography>
            </CardContent>
            <Box sx={{ m: '1em' }}>
                <CardActions sx={{ display: 'flex', justifyContent: 'center' }}>
                    <Button target='_blank' onClick={() => addFav(props.bid)} size='small' variant="outlined" color='error' >Read Later</Button>
                </CardActions>
                {props.quantity > 0 ?
                    <CardActions sx={{ display: 'flex', justifyContent: 'center' }}>

                        <Button target='_blank' onClick={handleClickOpen} size='large' variant="contained" color='error' >Issue Book!</Button>

                        <Dialog open={open} onClose={handleClose}>
                            <DialogTitle>Issue the Book!</DialogTitle>
                            <DialogContent>
                                <DialogContentText>
                                    You must return the book before selected days or you will have to pay the penalty!
                                </DialogContentText>

                                <LocalizationProvider dateAdapter={AdapterDayjs}>
                                    <DemoContainer components={['DatePicker']}>
                                        <DatePicker
                                            autoFocus
                                            id="days"
                                            value={issuedDate}
                                            onChange={(newValue) => {

                                                setIssuedDate(newValue)
                                            }}
                                            disablePast

                                        />

                                    </DemoContainer>
                                </LocalizationProvider>




                            </DialogContent>
                            <DialogActions>
                                <Button onClick={handleClose}>Cancel</Button>
                                <Button onClick={() => { if (issuedDate) { props.quantity > 0 ? issueBook(props, issuedDate) : alert("Come back after some time " + props.title + " to get the book"); handleClose(); } else { alert("Please select the days you wanna issue the book?") } }}>Issue</Button>
                            </DialogActions>
                        </Dialog>

                    </CardActions>
                    :
                    <CardActions sx={{ display: 'flex', justifyContent: 'center' }}>
                        <Button target='_blank' disabled size='large' variant="contained" color='error' >Out Of Stock!</Button>
                    </CardActions>
                }
            </Box>
        </Card >
    )
}

export default BookItem