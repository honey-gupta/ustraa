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

const useStyles = makeStyles(() => ({
    root: {
        flexGrow: 1,
        width: '100%',
    },
}));
function ScrollableTab() {
    const classes = useStyles();
    const [categories, setCategories] = useState([])
    useEffect(() => {
        axios.get(`https://backend.ustraa.com/rest/V1/api/homemenucategories/v1.0.1?device_type=mob`)
            .then((res) => {
                setCategories(res.data.category_list)
            })

    }, [])
    return (
        <div className={classes.root}>
            <AppBar position="static" color="default">
                <Tabs
                    indicatorColor="primary"
                    textColor='primary'
                    variant="scrollable"
                    scrollButtons="auto"
                    aria-label="scrollable auto tabs example"
                >
                    {categories && categories.length ?
                        <TabImage props={categories} />
                        : <Tab label="Loading..." />}
                </Tabs>
            </AppBar>
        </div>
    )
}

export default ScrollableTab
