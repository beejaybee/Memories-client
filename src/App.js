import React from 'react';
import { Container } from '@material-ui/core';
import { BrowserRouter as Router, Routes, Route , Navigate} from 'react-router-dom';

//components
import NavBar from './components/Navbar';
import Home from './components/Home';
import Auth from './components/Auth'
import PostDetails from './components/PostDetails/PostDetails';


const App = () => {
    
    const user = JSON.parse(localStorage.getItem('profile'));

    return (
        <Router>
            <Container maxwidth="xl">
                <NavBar />
                <Routes>
                    <Route path='/' exact element={ <Navigate to='/posts' />} />
                    <Route path='/posts' exact element={<Home />} />
                    <Route path='/posts/search' exact element={<Home />} />
                    <Route path='/posts/:id' element={<PostDetails />} />
                    <Route path='/auth' element={(!user ? <Auth /> : <Navigate to='/posts'  />)} />
                </Routes>
            </Container>
        </Router>
    )
}

export default App;