import React, { useState, useEffect } from 'react';

import { useOktaAuth } from '@okta/okta-react';
import { withRouter, Route, Redirect, Link } from 'react-router-dom';
import {
    withStyles,
    Typography,
    Fab,
    IconButton,
    Paper,
    List,
    ListItem,
    ListItemText,
    ListItemSecondaryAction
} from '@material-ui/core';
import { Delete as DeleteIcon, Add as AddIcon } from '@material-ui/icons';
import moment from 'moment';
import { find, orderBy } from 'lodash';
import { compose } from 'recompose';

import PostEditor from '../components/PostEditor';
import ErrorSnackbar from '../components/ErrorSnackbar';

const styles = theme => ({
    posts: {
        marginTop: theme.spacing(2),
    },
    fab: {
        position: 'absolute',
        bottom: theme.spacing(3),
        right: theme.spacing(3),
        [theme.breakpoints.down['xs']]: {
            bottom: theme.spacing(2),
            right: theme.spacing(2),
        },
    },
});

const API = process.env.REACT_APP_API || 'htttps://localhost:5000';

const PostManager = ({ history, classes }) => {

    const [loading, setLoading] = useState(true);
    const [posts, setPosts] = useState([]);
    const [error, setError] = useState(null);

    const { authService } = useOktaAuth();


    useEffect(() => {
        getPosts();
    }, [])

    const fetch = async (method, endpoint, body) => {
        try {
            const response = await fetch(`${API}${endpoint}`, {
                method,
                body: body && JSON.stringify(body),
                headers: {
                    'content-type': 'application/json',
                    accept: 'application/json',
                    authorization: `Bearer ${await authService.getAccessToken()}`,
                },
            });
            return await response.json();
        } catch (error) {
            console.error(error);

            setError(error)
        }
    }

    const getPosts = async () => {
        // const loadPosts = await fetch('get', '/posts')
        setLoading(false)
        setPosts(await fetch('get', '/posts') || [])
    }

    const savePost = async (post) => {
        if (post.id) {
            await fetch('put', `/posts/${post.id}`, post);
        } else {
            await fetch('post', '/posts', post);
        }
        history.goBack()
        getPosts()

    }

    const deletePost = async (post) => {
        if (window.confirm(`Are you sure you want to delete "${post.title}"`)) {
            await fetch('delete', `/posts/${post.id}`);
            getPosts();
        }
    }

    const renderPostEditor = ({ match: { params: { id } } }) => {
        if (loading) return null;
        const post = find(posts, { id: Number(id) });

        if (!post && id !== 'new') return <Redirect to='/posts' />;

        return <PostEditor post={post} onSave={savePost} />;
    }

    return (
        <>
            <Typography variant='h4' >Posts Manager</Typography>
            {
                posts.length > 0 ? (
                    <Paper elevation={1} className={classes.posts} >
                        <List>
                            {orderBy(posts, ['updatedAt', 'title'], ['desc', 'asc']).map(post => (
                                <ListItem key={post.id} button component={Link} to={`/posts/${post.id}`} >
                                    <ListItemText
                                        primary={post.title}
                                        secondary={post.updatedAt && `Updated ${moment(post.updatedAt).fromNow()}`}
                                    />
                                    <ListItemSecondaryAction>
                                        <IconButton onClick={() => deletePost(post)} color='inherit' >
                                            <DeleteIcon />
                                        </IconButton>
                                    </ListItemSecondaryAction>
                                </ListItem>
                            ))}
                        </List>
                    </Paper>
                ) : (
                    !loading && <Typography variant='subtitle1'>No posts to display</Typography>
                )}
            <Fab
                color='secondary'
                aria-label='add'
                className={classes.fab}
                component={Link}
                to='/posts/new'
            >
                <AddIcon />
            </Fab>
            <Route exact path='/posts/:id' render={renderPostEditor} />
            { error && (
                <ErrorSnackbar
                    onClose={() => setError(null)}
                    message={error.message}
                />
            )}
        </>
    );
}

export default compose(
    withRouter,
    withStyles(styles),
)(PostManager);