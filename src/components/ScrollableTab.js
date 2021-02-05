import React, { useState, useEffect } from 'react'
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import '../App.css';
import axios from 'axios'
import TabImage from './TabImage'
import ProductCard from './ProductCard';

function ScrollableTab() {
    const [categories, setCategories] = useState([])
    const [list, setList] = useState([])
    const [cat_id, setCat_Id] = useState(226)
    const [cat_name, setCat_Name] = useState('Essentials')
    const [viewMore, setViewMore] = useState(false)
    const [anchorEl, setAnchorEl] = useState(null);

    const handleCallback = (cat_id) => {
        setCat_Id(cat_id)
        console.log(categories.filter((categories) => {
            if (categories.category_id === cat_id) {
                setCat_Name(categories.category_name)
                setViewMore(false)
                setAnchorEl(null);
            }
            return true
        }
        ))
    }
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        console.log('HEREEE')
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
        let initialRenderList = []
        axios.get(`https://backend.ustraa.com/rest/V1/api/catalog/v1.0.1?category_id=${cat_id}`)
            .then((response) => {
                if (response && response.data && response.data.products && response.data.products.length > 3 && !viewMore) {
                    initialRenderList = response.data.products.slice(0, 3)

                    setList(initialRenderList)
                } else {
                    setList(response.data.products);
                    setViewMore(true)
                }
            })
    }, [cat_id, viewMore])
    return (
        <div>
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


                    </div>
                    <div className='view-more'>
                        {!viewMore ? <span onClick={showAll}> [+] View More </span> : <span onClick={showLess}> [-] View Less</span>}
                    </div>
                </div> : ''
            }
            <Menu
                id="simple-menu"
                anchorEl={anchorEl}
                keepMounted
                open={Boolean(anchorEl)}
                onClose={handleClose}
            >
                {categories && categories.length && categories.map((categ) => {
                    return <MenuItem onClick={() => handleCallback(categ.category_id)}>{categ.category_name ? categ.category_name : ''}</MenuItem>
                })}
            </Menu>
        </div >
    )
}

export default ScrollableTab
