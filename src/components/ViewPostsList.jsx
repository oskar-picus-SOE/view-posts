import {useEffect, useState} from "react";
import {getPosts} from "../postsService";
import {Alert, Box, Card, CardContent, List, ListItem, Snackbar, Typography} from "@mui/material";

export const ViewPostsList = () => {
    const [posts, setPosts] = useState([]);
    const [snackbarProps, setSnackbarProps] = useState({
        open: false,
        severity: 'error',
        text: ''
    });

    useEffect(() => {
        getPosts()
            .then(response => setPosts(response.data['posts']))
            .catch(response => setSnackbarProps({open: true, severity: "error", text: response}))
    }, []);

    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }

        setSnackbarProps((prev) => ({...prev, open: false}));
    };

    // todo handle notifications

    return (
        <Box
            sx={{
                marginTop: 8,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
            }}
        >
            <Snackbar open={snackbarProps.open} autoHideDuration={6000} onClose={handleClose}>
                <Alert onClose={handleClose} severity={snackbarProps.severity} sx={{width: '100%'}}>
                    {snackbarProps.text}
                </Alert>
            </Snackbar>
            {
                posts.length === 0 ?
                    <Typography>
                        There are no posts...
                    </Typography>
                    :
                    <List>
                        {
                            posts.map(post => (
                                <ListItem key={post.title}>
                                    <Card variant={"outlined"}>
                                    <CardContent>
                                        <Typography variant="h5" component="div">
                                            {post.title}
                                        </Typography>
                                        <Typography variant="body2">
                                            {post.content}
                                        </Typography>
                                    </CardContent>
                                    </Card>
                                </ListItem>
                            ))
                        }
                    </List>
            }
        </Box>
    )
};