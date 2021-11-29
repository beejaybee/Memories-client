import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Container, AppBar, Typography, Grow, Grid } from '@material-ui/core';

//images
import memories from './images/memories.png';

//components

import Posts from './components/Posts';
import Form from './components/Form'

//makeStyles
import useStyles from './App.styles';

//actions
import { getPosts } from './actions/post';

const App = () => {
    const [currentId, setCurrentId] = useState(null);

    const classes = useStyles();

    const dispatch = useDispatch();

    const posts = useSelector(state => state.posts);

    useEffect(() => {

    }, [posts])

    useEffect(() => {
        dispatch(getPosts());
    }, [currentId, dispatch], )

    return (
        <Container maxwidth="lg">
            <AppBar className={ classes.appBar } position='static' color='inherit'>
                <Typography  className={classes.heading} variant='h3' align='center'>
                    Memories
                </Typography>
                <img className={classes.image} src={memories} alt='memories' height='60' />
            </AppBar>
            <Grow in>
                <Container>
                    <Grid container className={classes.mainContainer} justifyContent='space-between' alignItems='stretch' spacing={3}>
                        <Grid xs={12} sm={12} lg={7} md={7}>
                            <Posts setCurrentId={setCurrentId} />
                        </Grid>
                        <Grid item xs={12} sm={8} lg={4} md={4}>
                            <Form currentId={ currentId } setCurrentId={setCurrentId} />
                        </Grid>
                    </Grid>
                </Container>
            </Grow>
        </Container>
    )
}

export default App;