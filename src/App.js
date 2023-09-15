import './App.css';
import { Container } from 'react-bootstrap';
import { Routes, Route } from 'react-router-dom';
import ProdutAll from './page/ProdutAll';
import LoginPage from './page/LoginPage';
/* import UserPage from './page/UserPage'; */
import Navbar from './component/Navbar';
import { useEffect, useState } from 'react';
import PrivateRoute from './route/PrivateRoute';

/* 
1. 전체상품 페이지/ 로그인페이지/ 상품상세페이지
-총 3개 src 폴더 생성해서 작업할 페이지를 생성 
-App.js에서 Routes로 각 페이지 연결

 1-1. 네비게이션 바- 컴포넌트
- App.js에서 import해서 연결함
1-2. 네비게이션 바에서 
      1)로그인영역
      2)로고영역 -> Link to 로 인덱스로 가도록 연결
      3)네비게이션 영역 -> 부트스트랩에서 Navbar로 연결해 볼 것을 권장
-------->localhost:3000을 기준으로 각각의 페이지가 나오는지 연결 테스트
-------->localhost:3000/login
-------->localhost:3000/user
-------->localhost:3000/product
-------->localhost:3000 뒤에 붙는 경로는 App.js에서 속성의 path에 선언된 경로

2. 전체상품 페이지에서는 기본 상품이 진열 되어 있습니다.
npm install -g json-server
새 터미널 열어서 json-server --watch db.json --port 5000
 포트 번호는 3000번만 아니면 됨.(로컬과 상관 없는 번호로 주는게 좋다)
 서버열결이 되면 리소스 정보를 Ctrl 누르고 클릭해서 data 정보 먼저 확인 
Resources 
http://localhost:5000/products
2-1. 전체상품 페이지에서 진열될 각 상품은 컴포넌트로 productCard.js로 생성
----> 전체상품 페이지에서 불러온 db.json 파일의 필드값을 카드 페이지로 상송되게 함. --->Distructuring(객체 분할)
----> 전체 상품 페이지에 생성한 productCard 엘리먼트를 뿌려줌
3. 로그인 버튼을 클릭하면 로그인 페이지나옴
---> 전체 상품 페이지에서 상품 카드를 클릭하면 
      ->> 로그인 상태가 true -> 상세페이지가 보이고
      ->> 로그인 상태가 false -> login 페이지


3. 로그인 버튼을 클릭하면 로그인 페이지 나옴
3-1. 상품을 클릭했을 때 로그인 상태면 -> 상세페이지가 보이고 로그인 상태가 아니면 -> 로그인 페이지가 보이도록 함.
-- App.js 페이지에서 기본 로그인 상태를 false로 설정 --> useState(false)
--> PrivateRoute.js 페이지를 생성 
    --> 로그인 상태가 true -> 디테일로 가고
    --> 로그인 상태가 false -> 로그인으로 가는 redirect 설정

4. 상품 상세 페이지
--> useParam-> id를 받아서 해당 id에 해당하는 정보를 출력
--> const { id } = useParams();
    const [product, setProduct] = useState(null);
    const getProductsDetail = async() => {
        let url = `http://localhost:5000/products/${id}`
        let response = await fetch(url);
        let data = await response.json();
        //console.log(data)
        setProduct(data)
    }
    useEffect(() => {
      getProductsDetail()
    }, [])

--> 각 속성들은 prouct.키값으로 선언해서 출력


 //상태가 바뀌는 것은 useState

*/
function App() {
  const [authenticate, setAuthenticate] = useState(false);
  /*
  useEffect(() => {})
  - 인자로 함수를 받음 -> 콜백함수
  - Mout --> 화면에 첫 렌더링
  - Update --> 다시 렌더링
  - UnMount --> 화면에서 사라짐
  
  1) useEffect( () => {}, [])
  -> 화면에 처음 렌더링 될때 실행 -> 빈 배열값을 전달하면 화면에 첫 랜더링 할 때만 실행

  2) useEffect( () => {}, [value])
  -> value의 값이 바뀔 때마다 실행
  //useEffect 뒤에는 배열 밖에 가져올수 없다 (객체 X)
   */
  useEffect(()=> {
    console.log(authenticate);
  },[authenticate])
  return (
    <Container>
      <Navbar authenticate={authenticate} setAuthenticate={setAuthenticate}/>{/* authenticate:아이템 {authenticate}:변수명 */}
        <Routes>
          <Route path='/' element={<ProdutAll/>}/>
         {/*  <Route path='/product/:id' element={<ProductDetail/>}/> */}

         {/* privateRoute 설정 (로그인이 됬을때만 보여야되는 것 - 인증 유/무 따라 경로 설정)*/}
          <Route path='/product/:id' element={<PrivateRoute authenticate={authenticate} />} />
          <Route path='/login' element={<LoginPage setAuthenticate={setAuthenticate} />} />
          {/* <Route path='/user' element={<UserPage/>}/> */}
        </Routes>
      
    </Container>
  );
}

export default App;
 //  :id 파라메터 값 