import React from 'react'
import Button from '@material-ui/core/Button'



function ProductCard({ list }) {
    // console.log(list, 'list')
    return (
        <>
            {list.map((product) => {
                return (
                    <div className='product-container'>
                        <div className='product-image'>
                            <img src={product.image_urls.x120} />
                        </div>
                        <div className='product-details'>
                            <div className='name-rating'>
                                <span className='product-name'>{product.name}</span>
                                <span className='product-rating'>{product.rating ? `${product.rating}★` : ''} </span>
                            </div>
                            <span className='product-weight'>{product.weight ? `(${product.weight} ${product.weight_unit})` : ''}</span>
                            <div className='prices'>
                                <span className='final-price'>
                                    {product.final_price ? `₹ ${product.final_price}` : ''}
                                </span>
                                <span className='actual-price'>
                                    {product.price && (product.price !== product.final_price) ? `₹ ${product.price}` : ''}
                                </span>
                            </div>
                            <span className='cart-button'>
                                {product.is_in_stock ? <Button variant="contained" color="green">Add To Cart </Button> : <Button variant="contained" disabled >Out Of Stock </Button>
                                }
                            </span>
                        </div>
                    </div>
                )
            })}
        </>
    )
}

export default ProductCard
