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

// import Typography from '@mui/material/Typography';
import { TimePicker } from '@mui/x-date-pickers/TimePicker';
import { Box } from '@mui/material';
// import { useSelector, useDispatch } from 'react-redux';
// import { get_schedule } from '../Redux/actions/actions';
import { get_schedule } from '../../Redux/actions/actions';
import { useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react'
import UndoIcon from '@mui/icons-material/Undo';

import { open_schedule_dialog, close_schedule_dialog } from '../../Redux/actions/actions';
const BootstrapDialog = styled(Dialog)(({ theme }) => ({
    '& .MuiDialogContent-root': {
        padding: theme.spacing(2),
    },
    '& .MuiDialogActions-root': {
        padding: theme.spacing(1),
    },
}));

function formatDate(date) {
    const day = date.getDate().toString().padStart(2, '0');
    const options = { weekday: "short" };
    const formattedDate = ` ${date.toLocaleDateString("en-US", options)}  ${day}`;
    return <Box dangerouslySetInnerHTML={{ __html: formattedDate }} />;
}


export default function Schedule_dialog() {
    const dispatch = useDispatch()
    const open = useSelector((state) => state.open_schedule)
    const handleClose = () => {
        dispatch(close_schedule_dialog())
    };
    const navigate = useNavigate()
    const [value, setValue] = React.useState(null);
    // const navigate = useNavigate()
    const selectedDate = new Date()
    const [month, setMonth] = useState([])
    const dates = [];
    const [get_month_name_state, setGet_month_name_state] = useState()
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
    // console.log(endDate.getMonth(), 'enddate')
    for (let i = 0; i < endDate.getDate(); i++) {
        const date = new Date(selectedDate.getFullYear(), selectedMonth, i);

        if (date >= new Date()) {
            dates.push(date);
        }
    }
    useEffect(() => {
        setMonth(monthNames);
        var date = new Date(), y = date.getFullYear(), m = date.getMonth();
        // var lastDay = new Date(date.getFullYear(), date.getMonth() + 1, 0);
        var lastDay = new Date(y, m + 1, 0);

    }, []);


    const get_month_name = (index) => {
        setGet_month_name_state(index + 1)
        setSelectedMonth(index)
    }

    const TimeFun = (time, index) => {
        setActiveNum(index)
        setGet_time_name_state(time)
        setGet_time_name_state((currentTime) => currentTime.split(' ')[0]);
    }

    const handleDateClick = (date, index) => {
        setSelectedDiv(index)
        // console.log(index, 'index ')
        const monthNumber = date.getMonth() + 1;
        // console.log(index)
        // console.log(monthNumber, 'monthnumber')
        const year = date.getFullYear();
        const day = date.getDate() < 10 ? `0${date.getDate()}` : date.getDate();
        setFormatted_date(
            `${year}-${get_month_name_state ? get_month_name_state < 10 ?
                `0${get_month_name_state}` : get_month_name_state : monthNumber < 10
                ? `0${monthNumber}` : monthNumber}-${day}T${get_time_name_state
                    ? get_time_name_state : '04:00'}:00`);
    };


    useEffect(() => {
        const oldmonth = []
        const d = new Date()
        let monthIndex = d.getMonth();
        // console.log(monthIndex + 1)
        for (let i = 1; i < monthIndex + 1; i++) {
            oldmonth.push(i)
        }
        // console.log(oldmonth, 'oldmonth')

    }, [])

    const handleDateChange = (date) => {
        const dateObject = new Date(date);
        const year = dateObject.getFullYear();
        const month = String(dateObject.getMonth() + 1).padStart(2, "0");
        const day = String(dateObject.getDate()).padStart(2, "0");
        const formattedDate = `${year}-${month}-${day}`;
        // setSelectedDatE(formattedDate);
    };
    const [choose, setChoose] = useState(false)
    const [index, setIndex] = useState()

    const handleTime = (times, index) => {
        const timeString = times;
        const formattedTime = timeString.replace(/ PM| AM/g, "");
        // setServiceTime(`${selectedDatE}T${formattedTime}:00`);
        setChoose(true)
        setIndex(index)
    };
    const formatted_date_function = () => {
        if (get_time_name_state) {
            if (formatted_date) {
                // localStorage.setItem('TimeDate', serviceTime, selectedDatE);
                navigate('/payment', { state: formatted_date })
            }
            else {
                alert('please choose a Date')
            }

        }
        else {
            alert('Please choose a time')
        }

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
        <div>
            <React.Fragment sx={{p:9}}>

                <BootstrapDialog
                    onClose={handleClose}
                    aria-labelledby="customized-dialog-title"
                    open={open}
                    
                >
                    <DialogTitle sx={{ m: 0, p: 2 }} id="customized-dialog-title">
                        Select Date & time
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
                        <div>

                            <form>
                                <Box sx={{ display: 'flex', flex: 'wrap' }}>
                                    {month.map((month, index) => {
                                        const date = new Date(selectedDate.getFullYear(), index, 1);
                                        const dateInMonth = date.getMonth() + 1
                                        const newD = new Date()

                                        if (dateInMonth > newD.getMonth()) {
                                            return (
                                                <Box sx={{ p: 1, borderRadius: '10px', m: 1 }} key={index} style={selectedMonth === index ? activeMonth : InactiveMonth}
                                                    onClick={() => get_month_name(index)}
                                                >
                                                    {month}
                                                </Box>
                                            );
                                        }
                                        else if (dateInMonth < new Date()) {

                                        }
                                        return null;
                                    })}

                                </Box>
                                <Box sx={{ display: "flex", overflowX: "scroll" }}>
                                    {dates
                                        .filter((date) => date >= new Date())
                                        .map((date, index) => (
                                            <Box
                                                onClick={() => handleDateClick(date, index)}
                                            >
                                                <Box sx={{ cursor: 'pointer', textAlign: "center", borderRadius: '10px', px: 2, py: 1.5, m: 1, height: 45, width: 38 }} style={(selectedDiv === index ? activeMonth : InactiveMonth)} onClick={() => handleDateClick(date)} >
                                                    {formatDate(date)}
                                                </Box>
                                            </Box>
                                        ))}
                                </Box>
                            </form>
                            <Box mt={3}><Typography variant='h6'>Select Time of service</Typography></Box>
                            <Box sx={{ display: 'flex', flexWrap: 'wrap', width: '75%', m: 'auto' }} >
                                {times?.map((item, index) => {
                                    item?.replace(" AM", "");
                                    return (
                                        <Box key={index} sx={{ p: 1, m: 1, borderRadius: '10px', width: 70 }} style={activeNum === index ? activeMonth : InactiveMonth} onClick={() => TimeFun(item, index)}> <span>{item}</span> </Box>
                                    )
                                })}
                            </Box>

                        </div >
                    </DialogContent>
                    <DialogActions>
                        <Button autoFocus fullWidth onClick={handleClose}>
                            Save changes
                        </Button>
                    </DialogActions>
                </BootstrapDialog>
            </React.Fragment>
        </div>
    )
}
