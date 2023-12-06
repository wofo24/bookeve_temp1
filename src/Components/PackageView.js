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
import { useLayoutEffect, useRef } from "react";
import clsx from "clsx";
import "../Components/Scollspy/Style.css";



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

const capitalize = (text) => text.charAt(0).toUpperCase() + text.substr(1);
const clamp = (value) => Math.max(0, value);
const isBetween = (value, floor, ceil) => value >= floor && value <= ceil;

export default function PackageView() {
    const posts = useSelector((state) => state.posts);
    const category_id_toShow = useSelector((state) => state.category_id_to_show_its_package);
    const style = useSelector((state) => state.apply_new_theme);
    const [choice, setChoice] = useState(category_id_toShow);
    const [filtered_Array, setFiltered_Array] = useState([])
    const dispatch = useDispatch()

    const filteredNames = posts.filter(name => name?.id == category_id_toShow);
    const [activeId, setActiveId] = useState('');

    console.log(filteredNames, posts, 'this is console')
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

                setActiveId(position?.id || "");
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

console.log(category_id_toShow, 'this is id')
    const Show_allCate = (array) => {
        const searchCategory = filteredNames.length > 0 ? filteredNames[0] : category_id_toShow;
        if (searchCategory) {
            const newArrayWithNoSelectedCategory = array.filter(item => item?.id !== searchCategory.id);
            setFiltered_Array([searchCategory, ...newArrayWithNoSelectedCategory]);
        } else {
            setFiltered_Array(array);
        }
    }
    const [categories, setCategories] = useState([]);

    useEffect(() => {
        const newCategories = filtered_Array.map((item) => item.category);
        setCategories(newCategories);
    }, [filtered_Array]);


    useEffect(() => {
        Show_allCate(posts)
    }, [category_id_toShow, posts])

    const { mainRef } = useScrollspy(categories, 45);


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
                                <Stack direction="row" height={40} spacing={1} mx={1} my={2} sx={{ display: 'flex', overflow: 'scroll', '::-webkit-scrollbar': { display: 'none' } }}>
                                    {posts.map((item, index) => (
                                        <Chip sx={{ height: 40, background: 'white', backgroundColor: choice === item.id ? '#e6cc67' : 'white' }} key={item.id} label={`${item.category}`} onClick={() => setChoice(item.id)} />
                                    ))}
                                </Stack>
                                <Box sx={{ p: 1 }}>
                                    {posts?.map((item) => {
                                        return (
                                            <div>
                                                {(item.id === choice) && (
                                                    <>
                                                        <Category data={item} />

                                                    </>
                                                )}
                                            </div>
                                        )
                                    })}
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
                    <>
                        {matches.large && (
                            <>
                                <Grid container
                                    sx={{
                                        borderRadius: '10px',
                                        backdropFilter: style.child_backgroundFilter,
                                        background: style.child_bg,
                                        color: style.color, flexGrow: 1, display: 'flex', height: '100%', my: 5, width: 1150
                                    }}
                                >
                                    <Grid item xs={3} px={4} py={2} >
                                        <Box sx={{ margin: 'auto' }}>
                                            {categories.map((item, index) => {
                                                console.log(category_id_toShow, item, 'active items')
                                                return (
                                                    <Box key={index} sx={{
                                                        borderRight: item === activeId && '2px solid  #ffc629;', my: 1, px: 2, py: .1, background: item === activeId && '#ffc629', background: item === activeId && 'linear-gradient(to right, white, #ffd45e)',
                                                    }}>
                                                        <a
                                                            href={`#${item}`}
                                                            className={clsx("menu-link", item === activeId && "menu-link-active")}
                                                        >
                                                            <Box sx={{ my: .4, display: 'flex', textTransform: 'capitalize', textAlign: 'left' }}>
                                                                <Typography variant='h6' fontSize={'25px'} fontWeight={600}> {capitalize(item)}</Typography>
                                                            </Box>
                                                        </a>
                                                    </Box>
                                                )
                                            })}
                                        </Box>
                                    </Grid>
                                    <Grid item xs={5} alignItems={'center'} >
                                        <Box sx={{ height: '700px', paddingBottom: '22rem', overflow: 'scroll', '::-webkit-scrollbar': { display: 'none' } }} ref={mainRef}>
                                            {filtered_Array.map((item, index) => (
                                                <section key={`section-${item.categoryName}`} id={item.categoryName} className="section">
                                                    <Category data={item} key={index} />
                                                </section>
                                            ))}
                                        </Box>
                                    </Grid>
                                    <Grid item xs={3} pt={2}>
                                        <Box sx={{ color: 'black', borderRadius: '10px', width: 395, }}>
                                            <Small_Cart />
                                        </Box>
                                    </Grid>
                                </Grid>
                            </>
                        )
                        }
                    </>
                )}
            </Media>

        </div>
    );
}
