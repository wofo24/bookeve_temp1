import * as React from 'react';
import Button from '@mui/material/Button';
import { styled } from '@mui/material/styles';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import Typography from '@mui/material/Typography';
import { useDispatch, useSelector } from 'react-redux'
import { close_help } from '../../Redux/actions/actions';
import { Box } from '@mui/material';
import Slide from '@mui/material/Slide';
import Media from 'react-media';

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
    '& .MuiDialogContent-root': {
        padding: theme.spacing(2),
    },
    '& .MuiDialogActions-root': {
        padding: theme.spacing(1),
    },
}));

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

export default function Help() {
    const open = useSelector((state) => state.help_dialog)
    const textStyle = useSelector((state) => state.apply_new_theme)
    const dispatch = useDispatch()
    const buttonStyles = useSelector((state) => state.apply_new_theme)
    const handleClose = () => {
        dispatch(close_help())
    };

    return (
        <React.Fragment>
            <Media queries={{
                small: '(max-width: 768px)',
                medium: '(min-width: 769px) and (max-width: 1024px)',
                large: '(min-width: 1025px)',
            }}>
                {(item) => item.large && (
                    <>
                        <BootstrapDialog
                            onClose={handleClose}
                            aria-labelledby="customized-dialog-title"
                            open={open}
                            PaperProps={{ style: { borderRadius: '15px' } }}
                        >
                            <DialogTitle sx={{ m: 0, p: 2 }} id="customized-dialog-title">
                                <Typography variant='h5' sx={{ fontFamily: textStyle.fontFamily }}><b>Help page</b></Typography>
                            </DialogTitle>
                            <IconButton
                                aria-label="close"
                                onClick={handleClose}
                                sx={{
                                    position: 'absolute',
                                    right: 8,
                                    top: 8,
                                    color: (theme) => theme.palette.grey[500],
                                }}
                            >
                                <CloseIcon />
                            </IconButton>
                            <DialogContent dividers>
                                <Box width={550}>
                                    <Typography gutterBottom>
                                        Cras mattis consectetur purus sit amet fermentum. Cras justo odio,
                                        dapibus ac facilisis in, egestas eget quam. Morbi leo risus, porta ac
                                        consectetur ac, vestibulum at eros.
                                    </Typography>
                                    <Typography gutterBottom>
                                        Praesent commodo cursus magna, vel scelerisque nisl consectetur et.
                                        Vivamus sagittis lacus vel augue laoreet rutrum faucibus dolor auctor.
                                    </Typography>
                                    <Typography gutterBottom>
                                        Aenean lacinia bibendum nulla sed consectetur. Praesent commodo cursus
                                        magna, vel scelerisque nisl consectetur et. Donec sed odio dui. Donec
                                        ullamcorper nulla non metus auctor fringilla.
                                    </Typography>
                                </Box>
                            </DialogContent>
                            <DialogActions sx={{ m: 1 }}>
                                <Button fullWidth size='medium' variant='contained' style={{ background: buttonStyles.buttonColor, color: buttonStyles.buttonText }} >Save</Button>
                            </DialogActions>
                        </BootstrapDialog>

                    </>
                )}

            </Media>
            <Media queries={{
                small: '(max-width: 768px)',
                medium: '(min-width: 769px) and (max-width: 1024px)',
                large: '(min-width: 1025px)',
            }}>
                {(item) => item.small && (
                    <>
                        <Dialog
                            onClose={handleClose}
                            aria-labelledby="customized-dialog-title"
                            open={open}
                            PaperProps={{ style: { borderRadius: '15px', zIndex: '99999', marginTop: '500px' } }}
                            fullScreen
                            TransitionComponent={Transition}
                        >
                            <DialogTitle sx={{ m: 0, p: 2 }} id="customized-dialog-title">
                                <Typography variant='h5' sx={{ fontFamily: textStyle.fontFamily }}><b>Help page</b></Typography>
                            </DialogTitle>
                            <IconButton
                                aria-label="close"
                                onClick={handleClose}
                                sx={{
                                    position: 'absolute',
                                    right: 8,
                                    top: 8,
                                    color: (theme) => theme.palette.grey[500],
                                }}
                            >
                                <CloseIcon />
                            </IconButton>
                            <DialogContent dividers>
                                <Box minHeight={350}>
                                    <Typography gutterBottom>
                                        Cras mattis consectetur purus sit amet fermentum. Cras justo odio,
                                        dapibus ac facilisis in, egestas eget quam. Morbi leo risus, porta ac
                                        consectetur ac, vestibulum at eros.
                                    </Typography>
                                    <Typography gutterBottom>
                                        Praesent commodo cursus magna, vel scelerisque nisl consectetur et.
                                        Vivamus sagittis lacus vel augue laoreet rutrum faucibus dolor auctor.
                                    </Typography>
                                    <Typography gutterBottom>
                                        Aenean lacinia bibendum nulla sed consectetur. Praesent commodo cursus
                                        magna, vel scelerisque nisl consectetur et. Donec sed odio dui. Donec
                                        ullamcorper nulla non metus auctor fringilla.
                                    </Typography>
                                </Box>
                            </DialogContent>
                            <DialogActions>
                                <Button fullWidth size='medium' variant='contained' style={{ background: buttonStyles.buttonColor, color: buttonStyles.buttonText }} >Save</Button>
                            </DialogActions>
                        </Dialog>

                    </>
                )}

            </Media>


        </React.Fragment>
    );
}
