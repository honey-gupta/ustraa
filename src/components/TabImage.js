import React, { useState } from 'react'
import Tab from '@material-ui/core/Tab';
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import axios from 'axios'
import ProductCard from './ProductCard';

function TabImage({ props, parentCallback }) {
    console.log('PROPSS', props)
    const [list, setList] = useState([])

    const getProductDetails = (cat_id) => {
        console.log('WOOOOOOWWWWWWWWWWWWWWWWWW', cat_id)
        parentCallback(cat_id)
    }
    return (
        <>
            {props.map((cat) => {
                return (
                    <div className='tab-image'>
                        <Tab label={cat.category_name} key={cat.category_id} component={() => (
                            <Button onClick={() => getProductDetails(cat.category_id)}>
                                <span className='label-style'>
                                    {cat.category_name}
                                </span>
                                <Avatar src={cat.category_image}
                                />
                            </Button>
                        )} />

                    </div>
                )
            })}

        </>
    )
}

export default TabImage
