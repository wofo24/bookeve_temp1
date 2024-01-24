import React, { useEffect, useState } from 'react';
import Search from './Search'
import { Box, Grid } from '@mui/material'
import PropTypes from 'prop-types';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { show_this_category_package, fetchPosts } from '../../Redux/actions/actions';
import { get_search_item, empty_quarry } from '../../Redux/actions/actions';
// import img from '../images/SampleIMage.jpg'
import img from '../../images/imagesSampleIMage.png'
import WestRoundedIcon from '@mui/icons-material/WestRounded';
import Chip from '@mui/material/Chip';
import Stack from '@mui/material/Stack';
import ListItemIcon from '@mui/material/ListItemIcon';
import TrendingUpRoundedIcon from '@mui/icons-material/TrendingUpRounded';
import HistoryRoundedIcon from '@mui/icons-material/HistoryRounded';
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

export default function Search_page() {

    const buttonStyles = useSelector((state) => state.all_theme)
    const navigate = useNavigate()
    const [loading, setLoading] = useState(true);
    const query = useSelector((state) => state?.search_item.data);
    // const searched_quarry = useSelector((state) => state?.searched_quarry);


    const dispatch = useDispatch()
    const posts = useSelector((state) => state?.posts?.data);
    const [queries_Recent, setQueries_Recent] = useState('')

    useEffect(() => {
        dispatch(fetchPosts());
    }, [dispatch]);

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
    const handleClick = (data) => {
        dispatch(get_search_item(data));
        setQueries_Recent(data)
    };
    const recentSearch = [
        'Hair', 'Hair wash', 'Nail', 'Bridal makeup'
    ]


    return (
        <>
            <Box sx={{ background: '#ffff', position: 'sticky', top: 0, width: '100%', zIndex: 99999, }}>

                <Box px={3} py={1}>
                    <Grid container>
                        <Grid item xs={2} onClick={() => navigate('/')}> <WestRoundedIcon sx={{ color: 'gray' }} /></Grid>
                        <Grid item xs={10} sx={{ color: 'gray' }}> <Typography mt={.4} fontSize={'15px'}>Search for best package and categories</Typography></Grid>
                    </Grid>
                </Box>
                <Box px={2.5} py={1} pb={2} sx={{}}>
                    <Box py={.1}>
                        <Search queries_Recent={queries_Recent} />
                    </Box>
                </Box>
            </Box>
            <Box mb={3} mt={2}>
                <Box >
                    {query !== undefined && query?.category?.length !== undefined && query.category.length !== 0 || query?.package?.length !== undefined && query.package.length !== 0 ?
                        <Box sx={{ mt: 1, overflow: 'hidden', bgcolor: buttonStyles.child_bg, pb: 4, pt: 2, px: 2, mx: 1, borderRadius: '15px' }}>
                            {query?.category?.map((item) => {
                                return (
                                    <Grid mt={2} container key={item.id} sx={{
                                        borderRadius: '10px',
                                        backgroundColor: 'transparent',
                                        backdropFilter: buttonStyles.child_backdropFilter,
                                        background: buttonStyles.child_bg,
                                        color: buttonStyles.child_div_text,
                                        boxShadow: `rgba(50, 50, 93, 0.25) 0px 2px 5px -1px, rgba(0, 0, 0, 0.3) 0px 1px 3px -1px;`
                                    }} onClick={() => handle_click(item.id)}>

                                        <Grid item xs={3}>
                                            <Paper elevation={1} sx={{ height: 90, width: 90, borderRadius: '10px', overflow: 'hidden' }} > <img src={img} alt='icon' style={{
                                                width: '100%',
                                                height: '100%',
                                                objectFit: 'cover',
                                                display: 'block',
                                            }} />

                                            </Paper></Grid>
                                        <Grid item xs={9} sx={{ display: 'flex', alignItems: 'center' }}>
                                            <Box mx={1} >
                                                <Typography color={'gray'}>{item.category} </Typography>
                                                <Typography color={'gray'} variant="caption" display="block" gutterBottom>
                                                    in Category
                                                </Typography>
                                            </Box>
                                        </Grid>
                                    </Grid>
                                );
                            })}
                            {query?.package?.map((item) => {
                                const matchingPost = posts.find((post) => post.id === item.id);
                                if (matchingPost) {
                                    let itsCat_name = '';
                                    const matchingItem = posts.find((item_) => item.id === item_.id);
                                    if (matchingItem) {
                                        itsCat_name = matchingItem.category;
                                    }

                                    return (
                                        <Grid
                                            mt={1.5}
                                            container
                                            sx={{
                                                borderRadius: '10px',
                                                backgroundColor: 'transparent',
                                                backdropFilter: buttonStyles.child_backdropFilter,
                                                background: buttonStyles.child_bg,
                                                color: buttonStyles.child_div_text,
                                                boxShadow: `rgba(50, 50, 93, 0.25) 0px 2px 5px -1px, rgba(0, 0, 0, 0.3) 0px 1px 3px -1px;`,
                                            }}
                                            onClick={() => handle_click(item.id)}
                                            key={item.id}
                                        >
                                            <Grid item xs={3}>
                                                <Paper elevation={1} sx={{ height: 90, width: 90, borderRadius: '10px', overflow: 'hidden' }}>
                                                    <img src={img} alt='icon' style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} />
                                                </Paper>
                                            </Grid>
                                            <Grid item xs={9} sx={{ display: 'flex', alignItems: 'center' }}>
                                                <Box mx={1}>
                                                    <Typography color={'gray'}>{item.package_name}</Typography>
                                                    <Typography color={'gray'} variant="caption" display="block" gutterBottom>
                                                        in package &#x2688; {itsCat_name}
                                                    </Typography>
                                                </Box>
                                            </Grid>
                                        </Grid>
                                    );
                                }
                                return null;
                            })}


                        </Box> :
                        <>
                            {/* {query && query.category.length !== 0 && query.package.length !== 0 && <h1>no mathc</h1>} */}
                            <Box sx={{ mt: 1, overflow: 'hidden', bgcolor: buttonStyles.child_bg, pb: 4, pt: 2, px: 2, mx: 2, borderRadius: '15px' }}>
                                <Box textAlign={'left'} color={'gray'} >
                                    <Typography>Recent Search</Typography>
                                    <Box
                                        textAlign={'left'}
                                        color={'gray'}
                                        pb={1}
                                        pt={2}
                                        sx={{

                                            display: 'flex',
                                            flexWrap: 'wrap',
                                            maxWidth: '100%',
                                            height: 'auto',
                                            overflowX: 'hidden',
                                        }}
                                    >
                                        {recentSearch.map((item) => (
                                            <Chip
                                                sx={{ m: 1 }}
                                                key={item}
                                                label={
                                                    <div>
                                                        <ListItemIcon sx={{ mt: 0.6 }}>
                                                            <HistoryRoundedIcon sx={{ mt: 0, mr: 0.4 }} />
                                                            <Typography>{item}</Typography>
                                                        </ListItemIcon>
                                                    </div>
                                                }
                                                variant="outlined"
                                                onClick={() => handleClick(item)}
                                            />
                                        ))}
                                    </Box>

                                </Box>
                            </Box>
                            <Box sx={{ mt: 1, overflow: 'hidden', bgcolor: buttonStyles.child_bg, pb: 4, pt: 2, px: 2, mx: 2, borderRadius: '15px' }}>
                                <Box textAlign={'left'} color={'gray'} >
                                    <Typography>Trending Search</Typography>
                                    <Box
                                        textAlign={'left'}
                                        color={'gray'}
                                        pb={1}
                                        pt={2}
                                        sx={{

                                            display: 'flex',
                                            flexWrap: 'wrap',
                                            maxWidth: '100%',
                                            height: 'auto',
                                            overflowX: 'hidden',
                                        }}
                                    >
                                        {recentSearch.map((item) => (
                                            <Chip
                                                sx={{ m: 1 }}
                                                key={item}
                                                label={
                                                    <div>
                                                        <ListItemIcon sx={{ mt: 0.6 }}>
                                                            <TrendingUpRoundedIcon sx={{ mt: 0, mr: 0.4 }} />
                                                            <Typography>{item}</Typography>
                                                        </ListItemIcon>
                                                    </div>
                                                }
                                                variant="outlined"
                                                onClick={() => handleClick(item)}
                                            />
                                        ))}
                                    </Box>

                                </Box>
                            </Box>

                        </>
                    }
                </Box>

            </Box>
        </>
    )
}
