import React, { useEffect, useState } from 'react';
import ProductCard from '../component/ProductCard';
import { Container, Row, Col} from 'react-bootstrap';
import { useSearchParams } from 'react-router-dom';

const ProductAll = () => {
    const [productList, setProductList] = useState([]);
    const [query, setQuery] = useSearchParams(); // 함수역활을 하기때문에 값을 넣거나 빈 공간 표시 해줘야됨 - 값입력시 초기 변수값으로 적용됨
    const getProducts = async() => {
        //let url = 'http://localhost:5000/products/'
        //getProducts함수를 통해서 API를  호출할 때에 쿼리에 있는 값을 넣어줌
        let searchQuery = query.get('q')||"";
        //console.log(searchQuery)
        //로컬에 설치된 json-server로 데이터를 불러와서 보여주는 주소
        let url = `http://localhost:5000/products?q=${searchQuery}`
        //let url =`https://my-json-server.typicode.com/jiyun900916/ariel-mall/products?q=${searchQuery}`
        let response = await fetch(url);
        let data = await response.json();
        //console.log(data)
        
        setProductList(data)
    }
    //useState 특정요소가 바뀐값만 , useEffect 전체적으로 (랜더링) 뿌려주는 역활 콜백함수
    //마운트 되었다 : 읽었다(ex:cd 내용 읽기) / 언마우트: 읽기 해제됨  (ex:cd 꺼내기) 
    useEffect(() => {
        getProducts()
    }, [query])

  return (
    <Container>
      <Row>
        {
            productList.map((menu, idx) => (
                <Col lg={3} key={idx}>
                    <ProductCard item={menu} /> {/* props 로 내보내기 하기위한 것 */}
                </Col>
            ))
        }
      </Row>
    </Container>
  )
}

export default ProductAll