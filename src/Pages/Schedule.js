import React from 'react'
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import dayjs from 'dayjs';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { TimePicker } from '@mui/x-date-pickers/TimePicker';
import { Box, Button, Container, Grid } from '@mui/material';
import { useSelector, useDispatch } from 'react-redux';
import { get_schedule } from '../Redux/actions/actions';
import { useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react'
import UndoIcon from '@mui/icons-material/Undo';


function formatDate(date) {
    const day = date.getDate().toString().padStart(2, '0');
    const options = { weekday: "short" };
    const formattedDate = ` ${date.toLocaleDateString("en-US", options)}<br> ${day}`;
    return <div dangerouslySetInnerHTML={{ __html: formattedDate }} style={{ marginTop: '1px', marginLeft: '3px' }} />;
}
export default function Schedule() {
    const dispatch = useDispatch()
    const On_handleSubmit = () => {
        dispatch(get_schedule())
    }
    const buttonStyles = useSelector((state) => state.apply_new_theme)

    const navigate = useNavigate()
    const [value, setValue] = React.useState(null);
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
        const monthNumber = date.getMonth() + 1;
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
        for (let i = 1; i < monthIndex + 1; i++) {
            oldmonth.push(i)
        }
    }, [])


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
        <Container>

            <Box sx={{
                p: 5,
                borderRadius: '10px',
                backdropFilter: buttonStyles.child_backdropFilter,
                background: buttonStyles.child_bg,
                color: buttonStyles.child_div_text,
                m: 5,
                '@media (max-width: 600px)': {
                    p: 2,
                    m: 2
                },
            }}>
                <form>
                    <Box sx={{ display: 'flex', flex: 'wrap' }}>
                        {month.map((month, index) => {
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
                            else if (dateInMonth < new Date()) {

                            }
                            return null;
                        })}

                    </Box>
                    <Box sx={{ display: "flex", overflowX: "scroll" }}>
                        {dates.filter((date) => date >= new Date()).map((date, index) => (
                            <Box
                                onClick={() => handleDateClick(date, index)}
                            >
                                <Box sx={{ cursor: 'pointer', textAlign: "center", borderRadius: '10px', px: 2, py: 1.5, m: 1, height: 75, width: 58 }} style={(selectedDiv === index ? activeMonth : InactiveMonth)} onClick={() => handleDateClick(date)} >
                                    {formatDate(date)}
                                </Box>
                            </Box>
                        ))}
                    </Box>
                </form>
                <Box mt={3} color={'black'}><Typography variant='h6'>Select Time of service</Typography></Box>
                <Box sx={{ width: '100%', display: 'flex', placeContent: 'center' }}>
                    <Box sx={{ display: 'flex', flexWrap: 'wrap', width: '75%', my: 2 }} >
                        {times?.map((item, index) => {
                            item?.replace(" AM", "");
                            return (
                                <Box sx={{ width:110, my:1 }}>
                                    <Box key={index} sx={{ cursor: 'pointer', p: 1, my: 2, borderRadius: '10px', width: 100, margin: 'auto' }} style={activeNum === index ? activeMonth : InactiveMonth} onClick={() => TimeFun(item, index)}> <span>{item}</span> </Box>
                                </Box>
                            )
                        })}
                    </Box>
                </Box>
                <Box sx={{ p: 3 }}>
                    <Button variant='contained' style={{ background: buttonStyles.buttonColor, color: buttonStyles.buttonText }} fullWidth onClick={() => navigate('/payment')} >Proceed</Button>
                </Box>


            </Box>


        </Container>

    )
}
