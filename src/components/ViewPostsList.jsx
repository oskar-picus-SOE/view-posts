import {useEffect, useState} from "react";
import {Alert, Box, Card, CardContent, List, ListItem, Snackbar, Typography} from "@mui/material";
import useWebSocket from "react-use-websocket";

const WS_URL = "ws://127.0.0.1:8004";

const uuid = require('uuid').v4;

export const ViewPostsList = () => {
    const [posts, setPosts] = useState([]);
    const [snackbarProps, setSnackbarProps] = useState({
        open: false,
        severity: 'error',
        text: ''
    });

    const {lastJsonMessage} = useWebSocket(WS_URL, {
        share: true,
    });

    useEffect(() => {
        if (lastJsonMessage) {
            console.log(`Received ${lastJsonMessage} from websocket`);
            setPosts([...posts, JSON.parse(lastJsonMessage)]);
        }
    }, [lastJsonMessage]);

    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }

        setSnackbarProps((prev) => ({...prev, open: false}));
    };

    const flexContainer = {
        display: 'flex',
        flexDirection: 'row',
        padding: 0,
    };

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
                    <List style={flexContainer}>
                        {
                            posts.map(post => (
                                <ListItem key={uuid()}>
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