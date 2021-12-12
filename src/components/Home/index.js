import React, { useState } from 'react';
import { Container, Grid, Grow, Paper, AppBar, TextField, Button } from '@material-ui/core';
import { useDispatch } from 'react-redux';
import { useNavigate, useLocation } from 'react-router-dom';
import ChipInput from 'material-ui-chip-input';

//action 
import { getPostsBySearch } from '../../actions/post';

//components
import Form from '../Form';
import Posts from '../Posts';
import Pagination from '../Pagination';

//styles
import useStyles from './Home.style';

const useQuery = () => {
    return new URLSearchParams(useLocation().search);
}



const Home = () => {
    
    const [currentId, setCurrentId] = useState(0);
    const [searchTerm, setSearchTerm] = useState('');
    const [tags, setTags] = useState([])

    const classes = useStyles();

    const dispatch = useDispatch();

    const query = useQuery();

    const navigate = useNavigate();

    const page = query.get('page') || 1;

    const searchQuery = query.get('searchQuery')
    


    const searchPost = () => {
        if (searchTerm.trim() || tags) {
            dispatch(getPostsBySearch({ searchTerm, tags: tags.join(',') }));
            navigate(`/posts/search?searchQuery=${searchTerm || 'none'}&tags=${tags.join(',')}`);
        } else {
            navigate('/');
        }
    }

    const handleKeyPress = (e) => {
        if (e.which === 13) {
            searchPost();
        }
    }

    const handleAdd = (tag) => setTags([...tags, tag]);

    const handleDelete = (tagToDelete) => setTags(tags.filter(tag => tag !== tagToDelete));


    return (
        <Grow in>
            <Container maxwidth='xl'>
                <Grid container className={classes.mainContainer} justifyContent='space-between' alignItems='stretch' spacing={3} >
                    <Grid xs={12} sm={12} md={8}>
                            <Posts setCurrentId={setCurrentId} />
                    </Grid>
                    <Grid item xs={12} sm={10} md={4}>
                        <AppBar className={classes.appBarSearch} position='static' color='inherit'>
                            <TextField
                                name='search'
                                variant='outlined'
                                label='search memories'
                                fullWidth
                                onKeyPress={handleKeyPress}
                                value={searchTerm}
                                onChange={e => setSearchTerm(e.target.value)}
                            />

                            <ChipInput 
                                style={{ magin: '10px 0' }}
                                value={tags}
                                onAdd={handleAdd}
                                onDelete={handleDelete}
                                label="Search Tags"
                                variant='outlined'
                                className={classes.searchButton}
                            />
                            <Button onClick={searchPost} className={classes.searchButton} variant='contained' color='primary' >Search</Button>
                        </AppBar>

                        <Form currentId={currentId} setCurrentId={setCurrentId} />
                        {(!searchQuery && !tags.length) && (
                            <Paper className={classes.pagination} elevation={6}>
                                <Pagination page={page} />
                            </Paper>
                        )}
                    </Grid>
                </Grid>
            </Container>
        </Grow>
    )
}

export default Home