import * as React from 'react';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
// import us
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

export default function CategoryItems() {
    const posts = useSelector((state) => state.posts);
    const navigate = useNavigate()

    const handle_click = (item) => {
        navigate('/package_view', { state: { data: item } })
    }
    return (
        <Box
            sx={{
                display: 'flex',
                '& > :not(style)': {
                    m: 1,
                    minWidth: 128,
                    minHeight: 138,
                },
                overflow: 'scroll'
            }}
        >
            {posts.map((item) => {
                return (
                    <Paper elevation={3} onClick={() => handle_click(item)}>
                       
                        <span>Category Id, {item.categoryId}</span>
                    </Paper>
                );
            })}

        </Box>
    );
}
