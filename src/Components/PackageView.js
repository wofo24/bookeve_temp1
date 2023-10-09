import React, { useEffect, useState } from 'react';
import Chip from '@mui/material/Chip';
import Stack from '@mui/material/Stack';
import Package from './Package';
import { useSelector, useDispatch } from 'react-redux';
import { useLocation } from 'react-router-dom';
import { Typography, CircularProgress } from '@mui/material';
import Category from './Category';

export default function PackageView() {
    const posts = useSelector((state) => state.posts);
    const { state } = useLocation();
    const [choice, setChoice] = useState(state?.data.categoryId);

    const handleClick = (id) => {
        setChoice(id)
    };


    console.log(posts)

    return (
        <div>
            <Stack direction="row" spacing={1} mx={1} my={2} sx={{ display: 'flex', overflow: 'scroll' }}>
                {posts.map((item) => (
                    <Chip key={item.categoryId} label={`${item.categoryName}`} onClick={() => handleClick(item.categoryId)} />
                ))}
            </Stack>
            {posts?.map((item) => {

                return (
                    <div>
                        {(item.categoryId === choice) && (
                            <>
                                <Category data={item} />

                            </>
                        )}
                    </div>
                )

            })}
        </div>
    );
}
