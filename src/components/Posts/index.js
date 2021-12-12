import React from 'react';
import { useSelector } from 'react-redux'; 
import { Grid, CircularProgress, Paper } from '@material-ui/core';

import Post from './Post';
//styles
import useStyles from './Posts.styles';

const Posts = ({ setCurrentId }) => {
    
    const { posts, isLoading } = useSelector(state => state.posts);
    console.log(posts);
    const classes = useStyles();


    if (!posts && !isLoading) {
        return (
            <Paper>
                <h1>No Posts</h1>
            </Paper>
        )
    }

    return (
        isLoading ? <CircularProgress /> : (
            <Grid
                className={classes.Container}
                container
                alignItems="strecth"
                spacing={3}    
            >
                {
                    posts.map(post => (
                        <Grid key={ post._id} item xs={12} sm={12} md={6} lg={4} >
                            <Post post={ post } setCurrentId={setCurrentId} />
                        </Grid>
                    ))
                }
            </Grid>
        )
    )
}

export default Posts