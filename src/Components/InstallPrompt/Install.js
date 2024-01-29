
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
    };

    const handleClose = () => {
        setState({ ...state, open: false });
    };


    const [promptEvent, setPromptEvent] = useState(null);
    const value = localStorage.getItem('trig')

    useEffect(() => {
        if (!value) {
            window.addEventListener('beforeinstallprompt', (e) => {
                e.preventDefault(); // Prevent the default browser prompt
                setPromptEvent(e);
            });
            localStorage.setItem('trig', true)
        } else {
            // console.log('nothing')
        }
    }, []);

    const handleInstallClick = () => {
        if (promptEvent) {
            promptEvent.prompt();
            promptEvent.userChoice.then((choiceResult) => {
                if (choiceResult.outcome === 'accepted') {
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
        if (!value) {
            handleClick({ vertical: 'top', horizontal: 'center' })();
            const timeoutId = setTimeout(() => {
                handleClose();
            }, 6000);

            return () => {
                clearTimeout(timeoutId);
            };
            localStorage.setItem('trig', true)
        } else {
        }

    }, []);

    return (

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

    );
};

export default InstallPrompt;
