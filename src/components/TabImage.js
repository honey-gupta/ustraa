import React from 'react'
import Tab from '@material-ui/core/Tab';
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
function TabImage({ props }) {
    console.log('PROPSS', props)
    return (
        <>
            {props.map((cat) => {
                return (
                    <div className='tab-image'>
                        <Tab label={cat.category_name} key={cat.category_id} component={() => (
                            <Button onClick={() => console.log('CLICKED')}>
                                <span className='label-style'>
                                    {cat.category_name}
                                </span>
                                <Avatar src={cat.category_image} />
                            </Button>
                        )} />
                    </div>
                )
            })}
        </>
    )
}

export default TabImage
