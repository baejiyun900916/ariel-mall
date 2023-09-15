import React from 'react';
import {Form,Button} from 'react-bootstrap';

const LoginPage = () => {
  return (
    <div className='form-area'>
       <Form>
      <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label>Email address</Form.Label>
        <Form.Control type="email" placeholder="Enter email" />
        
      </Form.Group>

      <Form.Group className="mb-3" controlId="formBasicPassword">
        <Form.Label>Password</Form.Label>
        <Form.Control type="password" placeholder="Password" />
      </Form.Group>
      <Form.Group className="mb-3" controlId="formBasicCheckbox">
        <Form.Check type="checkbox" label="이메일을 기억해주세요" />
      </Form.Group>
      <Button variant="primary" type="submit">
        로그인
      </Button>
    </Form>
    </div>
  );
}

export default LoginPage;
