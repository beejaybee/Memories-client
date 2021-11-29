import React from 'react';
import { useSelector } from 'react-redux'; 
import { Grid, CircularProgress } from '@material-ui/core';

import Post from './Post';
//styles
import useStyles from './Posts.styles';

const Posts = ({ setCurrentId }) => {
    const posts = useSelector(state => state.posts);
    console.log(posts);
    const classes = useStyles();

    return (
        !posts.length ? <CircularProgress /> : (
            <Grid
                className={classes.Container}
                container
                alignItems="strecth"
                spacing={3}    
            >
                {
                    posts.map(post => (
                        <Grid key={ post._id} item xs={12} sm={6}>
                            <Post post={ post } setCurrentId={setCurrentId} />
                        </Grid>
                    ))
                }
            </Grid>
        )
    )
}

export default Posts