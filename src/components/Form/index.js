import React, { useState, useEffect } from 'react';
import { TextField, Typography, Button, Paper } from '@material-ui/core';
import FileBase64 from 'react-file-base64';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

//styles
import useStyles from './Form.styles';

//actions
import { createPost, updatePost } from '../../actions/post';

const INITIAL_POSTDATA = {
    title: '',
    message: '',
    tags: '',
    selectedFile: ''
}



const Form = ({ currentId, setCurrentId }) => {
    
    const [postData, setPostData] = useState(INITIAL_POSTDATA)

    const post = useSelector(state => currentId ? state.posts.posts.find(p => p._id === currentId) : null);
    const classes = useStyles();
    const user = JSON.parse(localStorage.getItem('profile'));

    const dispatch = useDispatch();
    const navigate = useNavigate();

    useEffect(() => {
        if (post) setPostData(post);
    }, [post])

    const handleSubmit = (e) => { 
        e.preventDefault();

        if (!FormData) return;

        if (currentId === 0) {
            dispatch(createPost({ ...postData, name: user?.result?.name }, navigate));
            clear();
        } else {
            dispatch(updatePost(currentId, { ...postData, name: user?.result?.name }));
            clear();
        }
    }
    
    const clear = () => {
        setCurrentId(0);
        setPostData(INITIAL_POSTDATA);
    }

    if (!user?.result?.name) {
        return (
        <Paper className={classes.paper}>
            <Typography variant="h6" align="center">
                Please Sign In to create your own memories and like other's memories.
            </Typography>
        </Paper>
        );
    }

    return (
        <Paper className={classes.paper} elevation={6} >
            <form
                autoComplete='off'
                noValidate
                className={`${classes.root} ${classes.form}`}
                onSubmit={handleSubmit}
            >
                <Typography variant='h6'>
                    {currentId ? `Editing ${post.title} ` : 'Creating a memory'}
                </Typography>
                
                <TextField
                    name='title'
                    variant='outlined'
                    label="Title"
                    required
                    fullWidth
                    value={postData.title}
                    onChange={(e) => setPostData({...postData, title: e.target.value})}
                />
                <TextField
                    name='message'
                    variant='outlined'
                    label="Message"
                    fullWidth
                    multiline
                    rows={4}
                    value={postData.message}
                    onChange={(e) => setPostData({...postData, message: e.target.value})}
                />
                <TextField
                    name='tags'
                    variant='outlined'
                    label="Tags (coma separated)"
                    fullWidth
                    value={postData.tags}
                    onChange={(e) => setPostData({...postData, tags: e.target.value.split(',')})}
                />
                <div className={classes.fileInput}>
                    <FileBase64
                        type='file'
                        multiple={false}
                        onDone={(({ base64 }) => setPostData({ ...postData, selectedFile: base64}))}
                    />
                </div>
                <Button
                    className={classes.buttonSubmit}
                    variant="contained"
                    color="primary"
                    size="large"
                    type="submit"
                    fullWidth
                >
                    Post
                </Button>
                <Button
                    variant="contained"
                    color="secondary"
                    size="small"
                    onClick={clear}
                    fullWidth
                >
                    Clear
                </Button>
            </form>
        </Paper>
    )
}

export default Form