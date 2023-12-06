import React, { useState, useEffect } from 'react'
import Search from './Search'
import { Box } from '@mui/material'
// import * as React from 'react';
import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
// import { get_public_information } from '../Redux/actions/actions';
import { useNavigate } from 'react-router-dom';

import { useDispatch, useSelector } from 'react-redux';
import { get_search_item, empty_quarry, show_this_category_package, fetchPosts } from '../../Redux/actions/actions';



function CustomTabPanel(props) {
    const { children, value, index, ...other } = props;

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`simple-tabpanel-${index}`}
            aria-labelledby={`simple-tab-${index}`}
            {...other}
        >
            {value === index && (
                <Box sx={{ p: 3 }}>
                    <Typography>{children}</Typography>
                </Box>
            )}
        </div>
    );
}

CustomTabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.number.isRequired,
    value: PropTypes.number.isRequired,
};

function a11yProps(index) {
    return {
        id: `simple-tab-${index}`,
        'aria-controls': `simple-tabpanel-${index}`,
    };
}

export default function Search_page() {
    const [value, setValue] = React.useState(0);
    const [search_type, setSearch_type] = useState()
    const buttonStyles = useSelector((state) => state.apply_new_theme)
    const posts = useSelector((state) => state.posts);
    const navigate = useNavigate()
    const [loading, setLoading] = useState(true);
    const query = useSelector((state) => state?.search_item);
    const dispatch = useDispatch()

    const handleChange = (event, newValue) => {
        setValue(newValue);
        if (newValue === 0) setSearch_type('all');
        if (newValue === 1) setSearch_type('categories');
        if (newValue === 2) setSearch_type('packages');
    };

    const handle_click = (item) => {
        dispatch(show_this_category_package(item))
        navigate('/package-view')
    }
    useEffect(() => {
        dispatch(fetchPosts())
            .then(() => setLoading(false))
            .catch((error) => {
                console.error("Error fetching data:", error);
                setLoading(false);
            });
    }, [dispatch]);

    return (
        <Box mx={2} my={3}>
            <Search search_type={search_type} />
            <Box sx={{ width: '100%', mt: 2 }}>
                <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                    <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
                        <Tab label="All" {...a11yProps(0)} />
                        <Tab label="Category" {...a11yProps(1)} />
                        <Tab label="Package" {...a11yProps(2)} />
                    </Tabs>
                </Box>
                <CustomTabPanel value={value} index={0}>
                    <Box
                        sx={{
                            overflow: 'scroll', '::-webkit-scrollbar': { display: 'none' },
                            display: 'flex',
                            '& > :not(style)': {
                                mx: 1,
                                my: 1,
                                minWidth: 128,
                                minHeight: 138,
                            },
                            overflow: 'scroll'
                        }}
                    >
                        {query?.category?.map((item) => {
                            return (
                                <Paper sx={{
                                    borderRadius: '10px',
                                    backgroundColor: 'transparent',
                                    backdropFilter: buttonStyles.child_backdropFilter,
                                    background: buttonStyles.child_bg,
                                    color: buttonStyles.child_div_text,
                                }} onClick={() => handle_click(item.id)}>

                                    <span >Category Id, {item.id}</span>
                                </Paper>
                            );
                        })}
                       
                               
                       
                    </Box>
                    {query?.package?.map((item) => {
                                    return (
                                        <Paper sx={{
                                            borderRadius: '10px',
                                            backgroundColor: 'transparent',
                                            backdropFilter: buttonStyles.child_backdropFilter,
                                            background: buttonStyles.child_bg,
                                            color: buttonStyles.child_div_text,
                                        }} onClick={() => handle_click(item.id)}>

                                            <span >package Id, {item.id}</span>
                                        </Paper>
                                    );
                                })}
                </CustomTabPanel>
                <CustomTabPanel value={value} index={1}>
                    <Box
                        sx={{
                            overflow: 'scroll', '::-webkit-scrollbar': { display: 'none' },
                            display: 'flex',
                            '& > :not(style)': {
                                mx: 1,
                                my: 1,
                                minWidth: 128,
                                minHeight: 138,
                            },
                            overflow: 'scroll'
                        }}
                    >
                        {query?.category?.map((item) => {
                            return (
                                <Paper sx={{
                                    borderRadius: '10px',
                                    backgroundColor: 'transparent',
                                    backdropFilter: buttonStyles.child_backdropFilter,
                                    background: buttonStyles.child_bg,
                                    color: buttonStyles.child_div_text,
                                }} onClick={() => handle_click(item.id)}>

                                    <span >Category Id, {item.id}</span>
                                </Paper>
                            );
                        })}
                    </Box>
                </CustomTabPanel>
                <CustomTabPanel value={value} index={2}>
                    <Box
                        sx={{
                            overflow: 'scroll', '::-webkit-scrollbar': { display: 'none' },
                            display: 'flex',
                            '& > :not(style)': {
                                mx: 1,
                                my: 1,
                                minWidth: 128,
                                minHeight: 138,
                            },
                            overflow: 'scroll'
                        }}
                    >
                        {query?.package?.map((item) => {
                                    return (
                                        <Paper sx={{
                                            borderRadius: '10px',
                                            backgroundColor: 'transparent',
                                            backdropFilter: buttonStyles.child_backdropFilter,
                                            background: buttonStyles.child_bg,
                                            color: buttonStyles.child_div_text,
                                        }} onClick={() => handle_click(item.id)}>

                                            <span >package Id, {item.id}</span>
                                        </Paper>
                                    );
                                })}

                    </Box>
                </CustomTabPanel>
            </Box>

        </Box>
    )
}
