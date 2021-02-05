import React from 'react'
import Tab from '@material-ui/core/Tab';
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
function TabImage({ props, parentCallback }) {

    const getProductDetails = (cat_id) => {
        parentCallback(cat_id);
    }
    return (
        <>
            {props.map((cat,) => {
                return (
                    <div className='tab-image'>
                        <Tab label={cat.category_name} component={() => (
                            <Button key={cat.category_id} onClick={() => getProductDetails(cat.category_id)}>
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
