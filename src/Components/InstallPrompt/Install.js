import React, { useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Snackbar from '@mui/material/Snackbar';

const InstallPrompt = () => {
    const [state, setState] = React.useState({
        open: false,
        vertical: 'top',
        horizontal: 'center',
    });
    const { vertical, horizontal, open } = state;
    const installed = localStorage.getItem('installed')

    const handleClick = (newState) => () => {
        setState({ ...newState, open: true });
        console.log('Button clicked')
    };

    const handleClose = () => {
        setState({ ...state, open: false });
    };

    const buttons = (
        <Box sx={{ display: 'flex', justifyContent: 'center' }}>
            <Button onClick={handleClick({ vertical: 'top', horizontal: 'center' })}>
                Install App
            </Button>
        </Box>
    );

    const [promptEvent, setPromptEvent] = useState(null);

    useEffect(() => {
        window.addEventListener('beforeinstallprompt', (e) => {
            e.preventDefault(); // Prevent the default browser prompt
            setPromptEvent(e);
        });
    }, []);

    const handleInstallClick = () => {
        if (promptEvent) {
            promptEvent.prompt();
            promptEvent.userChoice.then((choiceResult) => {
                if (choiceResult.outcome === 'accepted') {
                    console.log('User accepted the A2HS prompt');

                    localStorage.setItem('installed', true)
                }
                setPromptEvent(null);
            });
        }
    };

    const action = (
        <>
            <Button color="secondary" size="small" onClick={handleClose}>
                Close
            </Button>
            <Button severity="" color="success" size="small" onClick={handleInstallClick}>
                Install
            </Button>
        </>
    );

    useEffect(() => {

        handleClick({ vertical: 'top', horizontal: 'center' })();
        const timeoutId = setTimeout(() => {
            handleClose();
        }, 5000);

        return () => {
            clearTimeout(timeoutId);
        };
    }, []);

    return (
        <>
            <Box sx={{ width: 500, zIndex: 99999 }}>
                {!installed ? (<Snackbar
                    action={action}
                    anchorOrigin={{ vertical, horizontal }}
                    open={open}
                    onClose={handleClose}
                    message="Install app"
                    key={vertical + horizontal}
                />) : null}

            </Box>
        </>
    );
};

export default InstallPrompt;
