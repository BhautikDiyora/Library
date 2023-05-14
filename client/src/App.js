import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { Box, Typography } from '@mui/material';
import Navbar from './components/NavBar';
import Login from './components/Login';
import Profile from './components/Profile';
import Favorites from './components/Favorites';
import SignUp from './components/SignUp';
import PrivateRoute from './components/PrivateRoute';

import MyBooks from './components/MyBooks';
import Library from './components/Library';
import UpdateProfile from './components/UpdateProfile';
import UpdatePassword from './components/UpdatePassword';
import HandleUsers from './components/HandleUsers';
import HandleBooks from './components/HandleBooks';
import AddBook from './components/AddBook';
import UpdateBook from './components/UpdateBook';

function App() {
  return (
    <BrowserRouter>
      <Box sx={{ marginTop: '5em', marginLeft: '300px' }} >
        <Navbar />
      </Box>
      <Box sx={{ marginTop: '5em', marginLeft: '300px' }} >
        <Routes>
          <Route element={<PrivateRoute />}>
            <Route path='/' element={<Library />} />
            <Route path='/library' element={<Library />} />
            <Route path='/favorites' element={<Favorites />} />
            <Route path='/my-books' element={<MyBooks />} />
            <Route path='/profile' element={<Profile />} />
            <Route path='/update-profile' element={<UpdateProfile />} />
            <Route path='/update-password' element={<UpdatePassword />} />
            <Route path='/handle-users' element={<HandleUsers />} />
            <Route path='/handle-books' element={<HandleBooks />} />
            <Route path='/new-book' element={<AddBook />} />
            <Route path='/update-book' element={<UpdateBook />} />
          </Route>
          <Route path='/login' element={<Login />} />
          <Route path='/signup' element={<SignUp />} />
          <Route path="*" element={<Typography sx={{ fontFamily: 'Roboto', fontSize: '3em', fontWeight: 'bold', m: '2em' }}>Page Not Found!</Typography>} />
        </Routes>
      </Box>
    </BrowserRouter >
  );
}

export default App;
