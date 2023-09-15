import React from 'react'
import { useNavigate } from 'react-router-dom'


const ProductCard = ({item}) => {
    //props와 같은 역활 (props 쪼갠 것 )
    const navigate = useNavigate();
    const showDetail = () => {
       navigate(`/product/${item.id}`)//:템플릿 문자열 ``
    }
    

  return (
    <div className='product-list' onClick={showDetail}>
        <div className="product-img"><img src={item?.img} alt="" /></div>
        <div className='choice'>{item?.choice===true?'Conscious Choice':''}</div>
        <div className='title'>{item?.title}</div>
        <div className='price'>{item?.price}</div>
        <div className='new'>{item?.new===true?'[신상품]':''}</div>
    </div>
  )
}

export default ProductCard