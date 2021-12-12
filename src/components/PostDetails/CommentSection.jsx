import React, { useRef, useState } from 'react';
import { Typography, TextField, Button } from '@material-ui/core';
import { useDispatch } from 'react-redux';

import useStyles from './styles';

import { commentPost } from '../../actions/post';

const CommentSection = ({ post }) => {
    const [comment, setComment] = useState('');
    const [comments, setComments] = useState(post?.comments);
    const user = JSON.parse(localStorage.getItem('profile'));
    const commentsRef = useRef();

    const dispatch = useDispatch();
    
    const classes = useStyles();
    

    const handleClick = async () => { 
        const finalComment = `${user?.result?.name}: ${comment}`;

        const newComments = await dispatch(commentPost(finalComment, post._id));

        setComments(newComments);

        setComment('');

        commentsRef.current.scrollIntoView({ behavior: 'smooth' });
    }
    
    return (
        <div className={classes.commentsOuterContainer}>
            <div className={classes.commentsInnerContainer}>
                <Typography gutterbuttom variant='h6'>Comments</Typography>
                {comments.map((comment, i) => (
                    <Typography key={i} gutterButtom variant='subtitle1'>
                        <strong> {comment.split(': ')[0]} </strong>
                        {comment.split(':')[1]}
                    </Typography>
                ))}
                <div ref={commentsRef} />
            </div>
            {user?.result?.name && (

                <div style={{ width: '70%' }}>
                    <Typography gutterButtom variant='h6'>Write a comment</Typography>
                    <TextField
                        fullWidth
                        rows={4}
                        variant='outlined'
                        label='comment'
                        multiline
                        value={comment}
                        onChange={(e) => setComment(e.target.value)}
                    />
                    <Button style={{marginTop: '10px'}} color='primary' fullWidth disabled={!comment} variant='contained' onClick={handleClick}>
                        Comment
                    </Button>
                </div>
            )}
        </div>
    )
}


export default CommentSection;