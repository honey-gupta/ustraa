import React, { useState, useEffect } from 'react'
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import { makeStyles } from '@material-ui/core/styles';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import '../App.css';
import axios from 'axios'
import TabImage from './TabImage'
import ProductCard from './ProductCard';

const useStyles = makeStyles(() => ({
    root: {
        // flexGrow: 1,
        // width: '100%',
    },
}));
function ScrollableTab() {
    const classes = useStyles();
    const [categories, setCategories] = useState([])
    const [list, setList] = useState([])
    const [cat_id, setCat_Id] = useState(226)
    const [cat_name, setCat_Name] = useState('Essentials')
    const [viewMore, setViewMore] = useState(false)
    const [anchorEl, setAnchorEl] = useState(null);

    let initialRenderList = []
    const handleCallback = (cat_id) => {
        // console.log('CATid', cat_id)
        setCat_Id(cat_id)
        console.log(categories.filter((categories) => {
            if (categories.category_id === cat_id) {
                setCat_Name(categories.category_name)
            }
        }
        ))
        // axios.get(`https://backend.ustraa.com/rest/V1/api/catalog/v1.0.1?category_id=${cat_id}`)
        //     .then((response) => {
        //         console.log(response, 'lol');
        //         if (response.data.products.length > 3) {
        //             initialRenderList = response.data.products.slice(0, 3)

        //             setList(initialRenderList)
        //         } else {
        //             setList(response.data.products);
        //             setViewMore(false)
        //         }
        //     })
    }
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };
    const showAll = () => {
        setViewMore(true)
    }
    const showLess = () => {
        setViewMore(false)
    }

    useEffect(() => {
        axios.get(`https://backend.ustraa.com/rest/V1/api/homemenucategories/v1.0.1?device_type=mob`)
            .then((res) => {
                setCategories(res.data.category_list)
            })

    }, [])
    useEffect(() => {
        // setCat_Id(cat_id)
        axios.get(`https://backend.ustraa.com/rest/V1/api/catalog/v1.0.1?category_id=${cat_id}`)
            .then((response) => {
                // console.log(response, 'lol');
                if (response.data.products.length > 3 && !viewMore) {
                    initialRenderList = response.data.products.slice(0, 3)

                    setList(initialRenderList)
                } else {
                    setList(response.data.products);
                    setViewMore(true)
                }
            })
    }, [cat_id, viewMore])
    return (
        <div className={classes.root}>
            <h2 className='heading'> Our Products </h2>
            <AppBar position="static" color="default">
                <Tabs
                    indicatorColor="primary"
                    textColor='primary'
                    variant="scrollable"
                    scrollButtons="on"
                    aria-label="scrollable auto tabs example"
                >
                    {categories && categories.length ?
                        <TabImage parentCallback={handleCallback} props={categories} />
                        : <Tab label="Loading..." />}
                </Tabs>
            </AppBar>
            {list && list.length ?
                <ProductCard list={list} />
                : <h3 className='no-data'> No products for the category selected</h3>}
            {list && list.length ?
                <div className='footer'>
                    <div className='showing-for'>
                        <span className='text-style'>
                            Showing for
                        <span className='cat-style'> {cat_name} </span>
                        </span>
                        <span className='change-text' onClick={handleClick}>
                            change
                    </span>
                        <Menu
                            id="simple-menu"
                            anchorEl={anchorEl}
                            keepMounted
                            open={Boolean(anchorEl)}
                            onClose={handleClose}
                        >
                            {categories && categories.length && categories.map((categ) => {
                                // console.log(categ, '!QW#$%%%%%%%%%%%%%^&*')
                                <MenuItem onClick={handleClose}>{categ.category_name}</MenuItem>

                            })}
                        </Menu>
                    </div>
                    <div className='view-more'>
                        {!viewMore ? <span onClick={showAll}> [+] View More </span> : <span onClick={showLess}> [-] View Less</span>}
                    </div>
                </div> : ''
            }
        </div >
    )
}

export default ScrollableTab
