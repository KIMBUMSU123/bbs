import React, { useState } from 'react'
import {Row, Col, Form, InputGroup,Card,Button} from 'react-bootstrap'
import{app} from '../../firebaseInit'
import {getAuth, signInWithEmailAndPassword} from 'firebase/auth'
import { useNavigate } from 'react-router-dom'


const Login = () => {
    const navi = useNavigate();
    const [loding,setLoding] = useState(false);
    const auth = getAuth(app);
    const [form, setForm] = useState({
        email:'blue@test.com',
        pass:'12341234'
    });
    const {email, pass} = form;
    const onChange = (e) =>{
        setForm({
            ...form,
            [e.target.name]:e.target.value
        })
    }

const onSubmit = (e) =>{
    e.preventDefault();
    if(email === "" || pass === ""){
        alert("이메일과 비밀번호를 입력하세요")
    }else{
        //로그인체크
        setLoding(true);
        signInWithEmailAndPassword(auth,email,pass)
        .then(success => {
            alert("로그인 성공");
            setLoding(false);
            sessionStorage.setItem('email',email)
            sessionStorage.setItem('uid',success.user.uid)

            if(sessionStorage.getItem('target')){
                navi(sessionStorage.getItem('target'));
            }else{
                navi('/');
            }
            navi('/books');
        })
        .catch(error => {
            alert("에러: " + error.message);
            setLoding(false);
        
        })
    }
}


if(loding) return <h1 className='my-5'>로딩중입니다.....</h1>
  return (
    <Row className='my-5 justify-content-center'>
        <Col mb={6}>
            <Card>
                <Card.Header>
                    <h3 className='text-center'>로그인</h3>
                </Card.Header>
                <Card.Body>
                    <form onSubmit={onSubmit}>
                        <InputGroup className='mb-2'>
                            <InputGroup.Text style={{width:100}} className='justyfy-center'>이메일</InputGroup.Text>
                            <Form.Control name='email' value={email} onChange={onChange} />
                        </InputGroup>
                        <InputGroup className='mb-2'>
                            <InputGroup.Text style={{width:100}} className='justyfy-center'>비밀번호</InputGroup.Text>
                            <Form.Control name='pass' type='password' value={pass} onChange={onChange}/>
                        </InputGroup>
                        <div>
                            <Button className='w-100' type='submit'> 로그인
                            </Button>
                        </div>
                        <div className='text-end'>
                            <a href="/join">회원가입</a> 
                        </div>
                    </form>
                </Card.Body>
            </Card>
        </Col>
    </Row>
  )     
}

export default Login