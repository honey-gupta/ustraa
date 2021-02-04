import React, { useState, useEffect } from 'react'
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
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
    const handleCallback = (cat_id) => {
        console.log('CATid', cat_id)
        axios.get(`https://backend.ustraa.com/rest/V1/api/catalog/v1.0.1?category_id=${cat_id}`)
            .then((response) => {
                console.log(response, 'lol');
                setList(response.data.products);
            })
    }
    useEffect(() => {
        axios.get(`https://backend.ustraa.com/rest/V1/api/homemenucategories/v1.0.1?device_type=mob`)
            .then((res) => {
                setCategories(res.data.category_list)
            })

    }, [])
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
        </div>
    )
}

export default ScrollableTab
