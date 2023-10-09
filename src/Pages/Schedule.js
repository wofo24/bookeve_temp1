import React from 'react'
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import dayjs from 'dayjs';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
// import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
// import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { TimePicker } from '@mui/x-date-pickers/TimePicker';
import { Box, Button } from '@mui/material';
import { useSelector, useDispatch } from 'react-redux';
import { get_schedule } from '../Redux/actions/actions';
import { useNavigate } from 'react-router-dom';
export default function Schedule() {
    const dispatch = useDispatch()
    const On_handleSubmit = () => {
        dispatch(get_schedule())
    }
    const navigate = useNavigate()
    const [value, setValue] = React.useState(null);
    return (
        <div>
            <form >

            </form>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DemoContainer components={['DatePicker']}>
                    <DatePicker value={value} onChange={(newValue) => setValue(newValue)} />
                </DemoContainer>
            </LocalizationProvider>


            <LocalizationProvider dateAdapter={AdapterDayjs}>
                <Stack spacing={2} sx={{ minWidth: 305 }}>
                    <TimePicker
                        value={value}
                        onChange={setValue}
                        referenceDate={dayjs('2022-04-17')}
                        minTime={dayjs().set('hour', 9).set('minute', 0)} // Set minimum time to 9:00 AM
                        maxTime={dayjs().set('hour', 21).set('minute', 0)} // Set maximum time to 9:00 PM (24-hour format)
                    />
                    <Typography>
                        Stored value: {value == null ? 'null' : value.format()}
                    </Typography>
                </Stack>
            </LocalizationProvider>
            <Box sx={{ p: 3 }}>

                <Button variant='contained' fullWidth onClick={()=>navigate('/payment')}>Proceed</Button>
            </Box>
        </div>
    )
}
