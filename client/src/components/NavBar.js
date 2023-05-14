import React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Button from '@mui/material/Button';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import { Typography } from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';
import Divider from '@mui/material/Divider';
import Drawer from '@mui/material/Drawer';



const Navbar = () => {

    const drawerWidth = 300;


    const navItems = [
        {
            text: 'Library',
            path: '/library'
        },
        {
            text: 'Favorites',
            path: '/favorites'
        },
        {
            text: 'My Books',
            path: '/my-books'
        },
        {
            text: 'Profile',
            path: '/profile'
        }
    ]

    let auth = sessionStorage.getItem('user')
    const navigate = useNavigate()

    return (
        <Box sx={{ display: 'flex' }}>
            <AppBar
                position="fixed"
                sx={{ width: `calc(100% - ${drawerWidth}px)`, ml: `${drawerWidth}px`, backgroundColor: '#17151c' }}
            >
                <Toolbar>
                    <Box sx={{ display: 'flex', flexGrow: 1 }} />
                    {auth ?
                        <Box sx={{ textAlign: 'center' }}>
                            <Link to={'/login'} style={{ textDecoration: 'none', color: '#fff', fontSize: '2em' }}>
                                <Button color='inherit' onClick={() => { sessionStorage.clear(); navigate('/login') }} sx={{ height: '4em', px: '2em', margin: '2em' }}><span style={{ fontFamily: "Lilita One", fontSize: '2em' }}>Logout</span></Button>
                            </Link>
                        </Box>
                        :
                        <Box sx={{ textAlign: 'center' }}>
                            <Link to={'/signup'} style={{ textDecoration: 'none', color: '#fff', fontSize: '2em' }}>
                                <Button color='inherit' sx={{ height: '4em', py: '2em', margin: '2em' }} ><span style={{ fontFamily: "Lilita One", fontSize: '2em' }}>Sign Up</span></Button>
                            </Link>
                            <Link to={'/login'} style={{ textDecoration: 'none', color: '#fff', fontSize: '2em' }}>
                                <Button color='inherit' sx={{ height: '4em', py: '2em', margin: '2em' }}><span style={{ fontFamily: "Lilita One", fontSize: '2em' }}>Login</span></Button>
                            </Link>
                        </Box>
                    }
                </Toolbar>
            </AppBar>
            <Drawer
                PaperProps={{
                    sx: {
                        backgroundColor: "#f15445",
                        color: "#fff",
                    }
                }}
                sx={{
                    width: drawerWidth,
                    flexShrink: 0,
                    '& .MuiDrawer-paper': {
                        width: drawerWidth,
                        boxSizing: 'border-box',
                    },

                }}

                variant="permanent"
                anchor="left"
            >

                <Box sx={{ textAlign: 'center' }}>
                    <Typography variant="h6" noWrap component="div" sx={{ py: '6px' }}>
                        <span style={{ fontFamily: "Lilita One", fontSize: '3em' }}>Vibrary</span>
                    </Typography>
                </Box>
                <Divider />
                <Divider />
                <Divider />

                {auth ?
                    <>
                        <Box >
                            <List >
                                {navItems.map((e) => (

                                    <Link to={e.path} key={e.text} style={{
                                        textDecoration: 'none', color: '#fff',
                                    }}>
                                        < ListItem key={e.text} disablePadding>
                                            <ListItemButton size='large' sx={{ paddingLeft: "2em" }}>
                                                <ListItemText primary={<span style={{ fontFamily: "Lilita One", fontSize: '2em' }}>{e.text}</span>} />
                                            </ListItemButton>
                                        </ListItem>
                                    </Link>

                                ))}
                            </List>
                        </Box>

                    </>
                    :
                    null
                }

            </Drawer >
        </Box >
    )
}

export default Navbar;

