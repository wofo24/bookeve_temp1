import React, { useEffect, useState } from 'react';
import Chip from '@mui/material/Chip';
import Stack from '@mui/material/Stack';
import Package from './Package';
import { useSelector, useDispatch } from 'react-redux';
import { useLocation } from 'react-router-dom';
import { Typography, CircularProgress } from '@mui/material';
import Category from './Category';
// import * as React from 'react';
import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
// import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Media from 'react-media';
import Cart from '../Pages/Cart'
import Small_Cart from './Small_Cart';
import { show_this_category_package } from '../Redux/actions/actions';



function TabPanel(props) {
    const { children, value, index, ...other } = props;

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`vertical-tabpanel-${index}`}
            aria-labelledby={`vertical-tab-${index}`}
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
TabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.number.isRequired,
    value: PropTypes.number.isRequired,
};
function a11yProps(index) {
    return {
        id: `vertical-tab-${index}`,
        'aria-controls': `vertical-tabpanel-${index}`,
    };
}

export default function PackageView() {
    const posts = useSelector((state) => state.posts);
    const category_id_toShow = useSelector((state) => state.category_id_to_show_its_package);
    const style = useSelector((state) => state.apply_new_theme);
    const { state } = useLocation();
    const [choice, setChoice] = useState(category_id_toShow);
    const [value, setValue] = React.useState(0);
    const [filtered_Array, setFiltered_Array] = useState([])
    const dispatch = useDispatch()
    const handleChange = (event, newValue) => {
        setValue(newValue)
    };

    const handleClick = (data) => {
        setChoice(data.categoryId)
        dispatch(show_this_category_package(data))
    }
 
    const filteredNames = posts.filter(name => name?.categoryId == category_id_toShow);

    // console.log(JSON.stringify(filteredNames[0]?.categoryName), 'current test')
    
    const Show_allCate = (array) => {
        const searchCategory = filteredNames[0];
        const newArrayWithNoSelectedCategory = array.filter(item => item?.categoryId !== searchCategory.categoryId);
        setFiltered_Array([searchCategory, ...newArrayWithNoSelectedCategory]);
    }

    useEffect(() => {
        Show_allCate(posts)
    }, [category_id_toShow, posts])



    return (
        <div>
            <Media
                queries={{
                    small: '(max-width: 768px)',
                    medium: '(min-width: 769px) and (max-width: 1024px)',
                    large: '(min-width: 1025px)',
                }}
            >

                {(matches) => (
                    <>
                        {matches.small && (
                            <>
                                <Stack direction="row" spacing={1} mx={1} my={2} sx={{ display: 'flex', overflow: 'scroll' }}>
                                    {posts.map((item) => (
                                        <Chip key={item.categoryId} label={`${item.categoryName}`} onClick={() => setChoice(item.categoryId)} />
                                    ))}
                                </Stack>

                                {filtered_Array?.map((item) => {

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
                            </>
                        )
                        }
                    </>
                )
                }
            </Media>
            <Media
                queries={{
                    small: '(max-width: 768px)',
                    medium: '(min-width: 769px) and (max-width: 1024px)',
                    large: '(min-width: 1025px)',
                }}
            >
                {(matches) => (
                    <>
                        {matches.large && (
                            <>
                                <Box
                                    sx={{  
                                        borderRadius: '10px',
                                    backdropFilter: style.child_backgroundFilter,
                                    background: style.child_bg,
                                    color: style.color, flexGrow: 1,display: 'flex', height: '100%', my: 5, width: 1150}}
                                >

                                    <Tabs
                                        value={value}
                                        orientation="vertical"
                                        variant="scrollable"
                                        onChange={handleChange}
                                        aria-label="Vertical tabs example"
                                        sx={{ borderRight: 1, borderColor: 'divider', width: 250, pl: 2, pt: 4 }}
                                    >
                                        {posts.map((item, index) => (
                                            <Tab sx={{
                                                textTransform: 'none',
                                                fontWeight: '700',
                                                fontSize: '20px',
                                                width: 'auto',
                                                display: 'flex', // Use flex layout
                                                justifyContent: 'start',
                                                flexDirection: 'row-reverse', // Reverses the direction, placing the button label on the left

                                            }} label={<Box onClick={() => handleClick(item?.categoryId)} sx={{ display: 'flex', textTransform: 'capitalize', textAlign: 'left' }}> <Typography variant='h6'>{item.categoryName}</Typography> </Box>}  {...a11yProps(4)} />))}

                                    </Tabs>
                                    <Box sx={{
                                        background: '#fcf6e3', height: 800,
                                        overflow: 'scroll',
                                        scrollbarWidth: 'thin',
                                        '&::-webkit-scrollbar': {
                                            width: '0.2rem',
                                            height: '0.2rem',
                                        },
                                    }}>

                                        <TabPanel>
                                            <Typography color='red'>
                                                {filtered_Array.map((item, index) => (
                                                    <Category data={item} key={index} />
                                                ))}
                                            </Typography>
                                        </TabPanel>

                                    </Box>

                                    <Box sx={{ color: 'black', borderRadius: '10px', py: 3, width: 360, pl: 2.5 }}>
                                        <Small_Cart />
                                    </Box>
                                </Box>

                            </>
                        )
                        }
                    </>
                )}
            </Media>

        </div>
    );
}
