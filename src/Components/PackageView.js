import React, { useEffect, useState } from 'react';
import Chip from '@mui/material/Chip';
import Stack from '@mui/material/Stack';
import { useSelector, useDispatch } from 'react-redux';
import { Typography, Grid } from '@mui/material';
import Category from './Category';
import PropTypes from 'prop-types';
import Box from '@mui/material/Box';
import Media from 'react-media';
import Small_Cart from './Small_Cart';
import { fetchPosts, show_this_category_package } from '../Redux/actions/actions';
import { useNavigate } from 'react-router-dom';
import { useLayoutEffect, useRef } from "react";
import Search from './Search/Search';
import clsx from "clsx";
import "../Components/Scollspy/Style.css";
import WestRoundedIcon from '@mui/icons-material/WestRounded';


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

const capitalize = (text) => text?.charAt(0)?.toUpperCase() + text?.substr(1);
const clamp = (value) => Math.max(0, value);
const isBetween = (value, floor, ceil) => value >= floor && value <= ceil;

export default function PackageView() {
    const posts = useSelector((state) => state.posts.data);
    const category_id_toShow = useSelector((state) => state.category_id_to_show_its_package);
    const style = useSelector((state) => state.apply_new_theme);
    const update_in_fetch = useSelector((state) => state.update_in_post);
    const [choice, setChoice] = useState(category_id_toShow);
    const [filtered_Array, setFiltered_Array] = useState([])
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const [queries_Recent, setQueries_Recent] = useState('')
    const filteredNames = posts.filter(name => name?.id == category_id_toShow);
    const [activeId, setActiveId] = useState('Bridal Makeup');
    const [categories, setCategories] = useState([]);
    const [value, setValue] = useState(false);

    const useScrollspy = (ids, offset = 0) => {
        const mainRef = useRef(null);
        useLayoutEffect(() => {
            const listener = () => {
                const mainElement = mainRef.current;
                if (!mainElement) return;
                const scroll = mainElement.scrollTop;
                const position = ids.map((id) => {
                    const element = document.getElementById(id);
                    if (!element) return { id, top: -1, bottom: -1 };
                    const rect = element.getBoundingClientRect();
                    const top = clamp(rect.top + scroll - offset);
                    const bottom = clamp(rect.bottom + scroll - offset);
                    return { id, top, bottom };
                })
                    .find(({ top, bottom }) => isBetween(scroll, top, bottom));

                const ItemName = filteredNames.map((item) => item.category);
                setActiveId(position?.id || ItemName[0]);
            };
            listener();
            const mainElement = mainRef.current;
            if (mainElement) {
                mainElement.addEventListener("scroll", listener);
            }
            return () => {
                if (mainElement) {
                    mainElement.removeEventListener("scroll", listener);
                }
            };
        }, [ids, offset]);

        return { activeId, mainRef };
    };

    useEffect(() => {
        const ItemName = filteredNames.map((item) => item.category);
        setActiveId(ItemName[0]);
    }, [category_id_toShow])

    

    const Show_allCate = (array) => {
        const searchCategory = filteredNames.length > 0 ? filteredNames[0] : category_id_toShow;
        if (searchCategory) {
            const newArrayWithNoSelectedCategory = array.filter(item => item?.id !== searchCategory.id);
            setFiltered_Array([searchCategory, ...newArrayWithNoSelectedCategory]);
        } else {
            setFiltered_Array(array);
        }
    }



    useEffect(() => {
        dispatch(fetchPosts());
    }, [dispatch, update_in_fetch]);


    const { mainRef } = useScrollspy(categories, 45)
    useEffect(() => {
        const newCategories = filtered_Array?.map((item) => item?.category);
        setCategories(newCategories);
    }, [filtered_Array]);


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
                                <Box sx={{ background: '#ffff', position: 'sticky', top: 0, width: '100%', zIndex: 99999, }}>
                                    <Box px={3} py={1}>
                                        <Grid container>
                                            <Grid item xs={2} onClick={() => navigate('/')}> <WestRoundedIcon sx={{ color: 'gray' }} /></Grid>
                                            <Grid item xs={10} sx={{ color: 'gray' }}> <Typography mt={.4} fontSize={'15px'}>Search for best package and categories</Typography></Grid>
                                        </Grid>
                                    </Box>
                                    <Box px={2.5} py={1} pb={2} sx={{}}>
                                        <Box py={.1} onClick={() => navigate('/search')}>
                                            <Search queries_Recent={queries_Recent} />
                                        </Box>
                                    </Box>
                                </Box>
                                <Box mx={1}>
                                    <Stack direction="row" height={40} spacing={1} mx={1} my={2} sx={{ display: 'flex', overflow: 'scroll', '::-webkit-scrollbar': { display: 'none' } }}>
                                        {posts?.map((item) => (
                                            <React.Fragment key={item?.id}>
                                                {value && (
                                                    <Chip
                                                        sx={{ height: 40, background: 'white', backgroundColor: choice === item.id ? '#e6cc67' : 'white' }}
                                                        label={`${item.category}`}
                                                        onClick={() => {
                                                            setChoice(item.id);
                                                            setValue(true);
                                                        }}
                                                    />
                                                )}
                                            </React.Fragment>
                                        ))}
                                    </Stack>
                                    <Box sx={{ p: 1 }}>
                                        {posts?.map((item, index) => (
                                            <div key={index}>
                                                {item?.id === choice && (
                                                    <>
                                                        <Category data={item} />
                                                        {setValue(true)}
                                                    </>
                                                )}
                                            </div>
                                        ))}
                                        {!value && (
                                            <Box textAlign={'center'} mb={5}>
                                                <Typography>Sorry! This Category has no package.</Typography>
                                            </Box>
                                        )}
                                    </Box>
                                </Box>
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
                    <div>
                        {matches.large && (
                            <Box sx={{
                                borderRadius: '10px',
                                backdropFilter: style.child_backgroundFilter,
                                background: style.child_bg,
                                color: style.color, flexGrow: 1, display: 'flex', height: '100%', my: 5
                            }}>

                                <Grid container

                                >
                                    <Grid item xs={3} px={4} py={2} >
                                        <Box sx={{ margin: 'auto' }}>
                                            {categories?.map((item, index) => {
                                                return (
                                                    <Box key={index} sx={{
                                                        borderRight: item === activeId && '2px solid  #ffc629;', my: 1, px: 2, py: .1, background: item === activeId && '#ffc629', background: item === activeId && 'linear-gradient(to right, white, #ffd45e)',
                                                    }}>
                                                        <a
                                                            href={`#${item}`}
                                                            className={clsx("menu-link", item === activeId && "menu-link-active")}
                                                        >
                                                            <Box sx={{ my: .4, display: 'flex', textTransform: 'capitalize', textAlign: 'left' }}>
                                                                <Typography variant='h6' fontSize={'25px'} fontWeight={500}> {capitalize(item)}</Typography>
                                                            </Box>
                                                        </a>
                                                    </Box>
                                                )
                                            })}
                                        </Box>
                                    </Grid>
                                    <Grid item xs={5} alignItems={'center'} >
                                        <Box sx={{ height: '700px', paddingBottom: '22rem', overflow: 'scroll', '::-webkit-scrollbar': { display: 'none' } }} ref={mainRef}>
                                            {filtered_Array?.map((item, index) => {
                                                return (
                                                    <section key={`section-${item.category}`} style={{ paddingTop: '25px' }} id={item.category} className="section">
                                                        <Category data={item} key={index} />
                                                    </section>
                                                )
                                            })}
                                        </Box>
                                    </Grid>
                                    <Grid item xs={3} pt={2}>
                                        <Box sx={{ color: 'black', borderRadius: '10px', width: 395, }}>
                                            <Small_Cart />
                                        </Box>
                                    </Grid>
                                </Grid>
                            </Box>
                        )
                        }
                    </div>
                )}
            </Media>

        </div>
    );
}
