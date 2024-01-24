import React from 'react'
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
import { Box, Grid } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react'
import Slide from '@mui/material/Slide';
import { close_schedule_dialog, reschedule_booking_date, selected_date_time } from '../../Redux/actions/actions';
import HomeRoundedIcon from '@mui/icons-material/HomeRounded';
import Media from 'react-media';
import ArrowForwardIosRoundedIcon from '@mui/icons-material/ArrowForwardIosRounded';

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

export default function Schedule_dialog() {
    const dispatch = useDispatch()
    const open = useSelector((state) => state.open_schedule)
    const textStyle = useSelector((state) => state.all_theme)
    const buttonStyles = useSelector((state) => state.all_theme)
    const selected = useSelector((state) => state.selected_address)
    const reschedule_data = useSelector((state) => state.reschedule)
    const selectedDate = new Date()
    const [month, setMonth] = useState([])
    const dates = [];
    const [currentMonth, setCurrentMonth] = useState(null);
    const [get_time_name_state, setGet_time_name_state] = useState()
    const [formatted_date, setFormatted_date] = useState()
    const [selectedDiv, setSelectedDiv] = useState(null);
    const [activeNum, setActiveNum] = useState(0)
    const monthNames = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
    const times = ['11:00 AM', '11:30 AM', '12:00 PM', '01:00 PM', '02:00 PM', '03:00 PM', '04:00 PM', '05:00 PM', '06:00 PM', '07:00 PM']
    const currentDate = new Date();
    const year = currentDate.getFullYear();
    const month2 = currentDate.getMonth();
    const lastDateOfJuly2023 = getLastDateOfMonth(year, month2);
    const [selectedMonth, setSelectedMonth] = useState(() => {
        const current = selectedDate.getDate()
        if (lastDateOfJuly2023 === current) {
            return (selectedDate.getMonth() + 1)
        }
        else {
            return (selectedDate.getMonth())
        }
    });
    const endDate = new Date(selectedDate.getFullYear() + 1, selectedMonth, 0);

    for (let i = 0; i < endDate.getDate(); i++) {
        const date = new Date(selectedDate.getFullYear(), selectedMonth, i);
        if (date >= new Date()) {
            dates.push(date);
        }
    }

    useEffect(() => {
        setMonth(monthNames);
        var date = new Date(), y = date.getFullYear(), m = date.getMonth();
        var lastDay = new Date(y, m + 1, 0);
    }, []);

    const get_month_name = (index) => {
        setCurrentMonth(index + 1)
        setSelectedMonth(index)
    }

    useEffect(() => setCurrentMonth(new Date().getMonth() + 1), []);



    const handleDateClick = (date, index) => {
        setSelectedDiv(index);
        const year = date.getFullYear();
        const month = date.getMonth() + 1;
        const day = date.getDate();
        const formattedDate = `${year}-${month < 10 ? '0' : ''}${month}-${day < 10 ? '0' : ''}${day}`;
        setFormatted_date(formattedDate);
        dispatch(selected_date_time(formattedDate));
    };
    const TimeFun = (time, index) => {
        setActiveNum(index)
        setGet_time_name_state(time)
        setGet_time_name_state((currentTime) => currentTime.split(' ')[0]);
    }

    const handleExit = () => {
        dispatch(close_schedule_dialog());
    }

    const handleClose = () => {
        dispatch(selected_date_time(`${formatted_date}T${get_time_name_state || '11:00'}:00`));
        if (formatted_date) {
            dispatch(close_schedule_dialog());
            if (reschedule_data?.name?.reschedule) {
                dispatch(reschedule_booking_date(reschedule_data?.id, `${formatted_date}T${get_time_name_state || '11:00'}:00`))
            }
        }
        else {
            alert('select Properly')
        }

    };

    function formatDate(date) {
        const day = date.getDate().toString().padStart(2, '0');
        const options = { weekday: "short" };
        const formattedDate = ` ${date.toLocaleDateString("en-US", options)}  ${day}`;
        return <Box dangerouslySetInnerHTML={{ __html: formattedDate }} />;
    }


    function getLastDateOfMonth(year, month) {
        return new Date(year, month + 1, 0).getDate();
    }

    const activeMonth = {
        background: '#ffc629',
        color: '#fff'
    }
    const InactiveMonth = {
        border: '1px solid #ffc629',
        color: 'black'
    }



    return (
        <>
            <Media queries={{
                small: '(max-width: 768px)',
                medium: '(min-width: 769px) and (max-width: 1024px)',
                large: '(min-width: 1025px)',
            }}>
                {(item) => item.large && (
                    <>
                        <React.Fragment sx={{ p: 9 }}>
                            <Dialog
                                onClose={handleClose}
                                aria-labelledby="customized-dialog-title"
                                open={open}
                                PaperProps={{ style: { borderRadius: '15px' } }}
                            >
                                <DialogTitle sx={{ m: 0, p: 2 }} id="customized-dialog-title">
                                    <Typography variant='h5' sx={{ fontFamily: textStyle.fontFamily }}><b>Select Date & Time</b></Typography>
                                </DialogTitle>
                                <IconButton
                                    aria-label="close"
                                    onClick={handleExit}
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
                                    <div>
                                        <form>
                                            <Box sx={{ display: 'flex', flex: 'wrap', overflowX: "scroll" }} >
                                                {month?.map((month, index) => {
                                                    const date = new Date(selectedDate.getFullYear(), index, 1);
                                                    const dateInMonth = date.getMonth() + 1
                                                    const newD = new Date()

                                                    if (dateInMonth > newD.getMonth()) {
                                                        return (
                                                            <Box sx={{ cursor: 'pointer', p: 1, px: 2, borderRadius: '10px', m: 1 }} key={index} style={selectedMonth === index ? activeMonth : InactiveMonth}
                                                                onClick={() => get_month_name(index)}
                                                            >
                                                                {month}
                                                            </Box>
                                                        );
                                                    }
                                                    return null;
                                                })}

                                            </Box>
                                            <Box sx={{ display: "flex", overflowX: "scroll" }}>
                                                {dates.filter((date) => date >= new Date()).map((date, index) => (
                                                    <Box onClick={() => handleDateClick(date, index)} >
                                                        <Box sx={{ cursor: 'pointer', textAlign: "center", borderRadius: '10px', px: 2, py: 1.5, m: 1, height: 75, width: 58 }} style={(selectedDiv === index ? activeMonth : InactiveMonth)} onClick={() => handleDateClick(date)} >
                                                            {formatDate(date)}
                                                        </Box>
                                                    </Box>
                                                ))}
                                            </Box>
                                        </form>
                                        <Box mt={3}><Typography variant='h6'>Select Time of service</Typography></Box>
                                        <Box sx={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', alignItems: 'center' }}>
                                            {times?.map((item, index) => {
                                                item?.replace(" AM", "");
                                                return (
                                                    <Box key={index} sx={{ p: 1, m: 1, borderRadius: '10px', width: 90 }} style={activeNum === index ? activeMonth : InactiveMonth} onClick={() => TimeFun(item, index)}>
                                                        <span>{item}</span>
                                                    </Box>
                                                );
                                            })}
                                        </Box>


                                    </div >
                                </DialogContent>
                                <DialogActions sx={{ m: 1 }}>
                                    <Button fullWidth onClick={handleClose} size='large' variant='contained' style={{ background: buttonStyles.buttonColor, color: buttonStyles.buttonText }} >Save</Button>
                                </DialogActions>
                            </Dialog>
                        </React.Fragment>
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
                            PaperProps={{ style: { borderRadius: '15px', zIndex: '999999999', marginTop: '300px' } }}
                            open={open}
                            TransitionComponent={Transition}
                            keepMounted
                            onClose={handleClose}
                            aria-describedby="alert-dialog-slide-description"
                            fullScreen
                        >



                            {!reschedule_data?.name?.reschedule &&
                                <>
                                    <DialogTitle sx={{ m: 0, p: 2 }} id="customized-dialog-title">
                                        {open && <Box sx={{
                                            px: 2,
                                            py: 2, position: 'fixed',
                                            top: 150,
                                            left: 0,
                                            right: 0,
                                            background: '#ffff',
                                            borderRadius: '15px',
                                            color: 'black',
                                            zIndex: '9999'
                                        }}>
                                            <Grid container>
                                                <Grid sx={{ display: 'grid', placeContent: 'center' }} xs={1}> <Typography textAlign={'start'} variant='subtitle2'><b> <HomeRoundedIcon sx={{ color: 'gray' }} /></b>
                                                </Typography></Grid>
                                                <Grid xs={10} px={2} sx={{ display: 'grid', placeContent: 'start' }}><Typography textAlign={'start'} variant='subtitle2'> {selected.split("").slice(0, 45).join('')}...</Typography></Grid>
                                                <Grid xs={1} sx={{ display: 'grid', placeContent: 'center' }} ><Typography textAlign={'start'}> <ArrowForwardIosRoundedIcon sx={{ color: 'gray' }} fontSize='small' /></Typography></Grid>
                                            </Grid>
                                            <hr />
                                        </Box>}
                                    </DialogTitle>
                                </>
                            }


                            <Grid container sx={{ mt: reschedule_data?.name?.reschedule ? 0 : 7, p: 0 }}>
                                <Grid item xs={10}>

                                    <DialogTitle sx={{ m: 0 }} id="customized-dialog-title">
                                        <Typography variant='h5' sx={{ fontFamily: textStyle.fontFamily }}><b>{reschedule_data?.name?.title}</b></Typography>
                                    </DialogTitle>
                                </Grid>
                                <Grid item xs={2} sx={{ display: 'grid', placeContent: 'center' }}>
                                    <IconButton
                                        aria-label="close"
                                        onClick={handleExit}
                                    >
                                        <CloseIcon />
                                    </IconButton>
                                </Grid>

                            </Grid>

                            <Box sx={{
                                height: '50vh',
                                overflow: 'auto',
                                paddingBottom: '50vh',
                                scrollBehavior: 'smooth',

                                '@media (max-width: 767px)': {
                                    height: '60vh',
                                },
                            }}>
                                <DialogContent dividers>

                                    <Box sx={{ display: 'flex', flex: 'wrap', overflowX: "scroll", '::-webkit-scrollbar': { display: 'none' } }} >
                                        {
                                            month.map((month, index) => {
                                                const date = new Date(selectedDate.getFullYear(), index, 1);
                                                const dateInMonth = date.getMonth() + 1
                                                const newD = new Date()

                                                if (dateInMonth > newD.getMonth()) {
                                                    return (
                                                        <Box sx={{ p: 1, px: 2, borderRadius: '10px', m: 1 }} key={index} style={selectedMonth === index ? activeMonth : InactiveMonth}
                                                            onClick={() => get_month_name(index)}
                                                        >
                                                            {month}
                                                        </Box>
                                                    );
                                                }
                                                return null;
                                            })
                                        }
                                    </Box>
                                    <Box sx={{ display: "flex", overflowX: "scroll" }}>
                                        {[...Array(endDate.getDate())].map((_, index) => {
                                            const date = new Date(selectedDate.getFullYear(), selectedMonth, index);
                                            if (date >= new Date()) {
                                                return (
                                                    <Box
                                                        key={index}
                                                        onClick={() => handleDateClick(date, index)}
                                                    >
                                                        <Box
                                                            sx={{
                                                                cursor: 'pointer',
                                                                textAlign: "center",
                                                                borderRadius: '10px',
                                                                px: 2,
                                                                py: 1.5,
                                                                m: 1,
                                                                height: 75,
                                                                width: 58,
                                                                ...(selectedDiv === index ? activeMonth : InactiveMonth),
                                                            }}
                                                        >
                                                            {formatDate(date)}
                                                        </Box>
                                                    </Box>
                                                );
                                            }
                                            return null;
                                        })}
                                    </Box>

                                    <Box mt={3}><Typography variant='h6'>Select Time of service</Typography></Box>
                                    <Box sx={{ display: 'flex', flexWrap: 'wrap', overflow: 'scroll', margin: 'auto', textAlign: 'center', px: 2, py: 1 }} >
                                        {times?.map((item, index) => {
                                            item?.replace(" AM", "");
                                            return (
                                                <Box key={index} sx={{ p: 1, m: 1, borderRadius: '10px', width: 'auto' }} style={activeNum === index ? activeMonth : InactiveMonth} onClick={() => TimeFun(item, index)}> <span>{item}</span> </Box>
                                            )
                                        })}
                                    </Box>
                                    <Box sx={{ m: 'auto', width: '100%' }}>
                                        <DialogActions fullWidth >
                                            <Button fullWidth onClick={handleClose} size='large' variant='contained' style={{ background: buttonStyles.buttonColor, color: buttonStyles.buttonText }} >Save</Button>
                                        </DialogActions>
                                    </Box>
                                </DialogContent>
                            </ Box>


                        </Dialog>

                    </>
                )
                }
            </Media >

        </>
    )
}
