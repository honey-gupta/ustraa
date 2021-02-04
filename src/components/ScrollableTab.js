import React, { useState, useEffect } from 'react'
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import '../App.css';
import axios from 'axios'
function ScrollableTab() {
    const [categories, setCategories] = useState([])
    useEffect(() => {
        axios.get(`https://backend.ustraa.com/rest/V1/api/homemenucategories/v1.0.1?device_type=mob`)
            .then((res) => {
                setCategories(res.data.category_list)
            })

    }, [])
    return (
        <div className='tab-root'>
            <AppBar position="static" color="default">
                <Tabs
                    indicatorColor="primary"
                    textColor="primary"
                    variant="scrollable"
                    scrollButtons="auto"
                    aria-label="scrollable auto tabs example"
                >
                    {categories && categories.length ? categories.map((cat) =>
                        <Tab label={cat.category_name} />
                    ) : <p>Loading</p>}
                </Tabs>
            </AppBar>
        </div>
    )
}

export default ScrollableTab
