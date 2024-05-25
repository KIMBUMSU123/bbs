import React, { useEffect, useState } from 'react';
import { Row, Col, Card, Button, InputGroup, Form } from 'react-bootstrap';
import { app } from '../../firebaseInit';
import { getFirestore, doc, setDoc, getDoc } from 'firebase/firestore';
import Modaladdress from './Modaladdress';
import ModalPhotoo from './ModalPhotoo';

const Myapage = () => {
    const [loading, setLoading] = useState(false);
    const db = getFirestore(app);
    const uid = sessionStorage.getItem('uid');
    const [form, setForm] = useState({
        email: sessionStorage.getItem('email'),
        name: '김범수',
        phone: '010-5064-4342',
        address1: '인천 남동구 서창동',
        address2: '802동 1302호'
    });

    const { name, phone, address1, address2 } = form; // 비구조 할당

    const onChangeForm = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const onSubmit = async (e) => {
        e.preventDefault();
        if (name === "") {
            alert("이름을 입력하세요");
            return;
        }

        if (!window.confirm("변경된 내용을 저장하시겠습니까?")) return;
        console.log(form);
        setLoading(true);
        try {
            await setDoc(doc(db, `users`, uid), form);
            alert('변경된 내용을 저장했습니다.');
        } catch (error) {
            console.error('Error writing document: ', error);
            alert('변경된 내용을 저장하지 못했습니다. 다시 시도해 주세요.');
        } finally {
            setLoading(false);
        }
    };

    const callAPI = async () => {
        setLoading(true);
        try {
            const res = await getDoc(doc(db, `users`, uid));
            if (res.exists()) {
                setForm(res.data());
            }
        } catch (error) {
            console.error('Error fetching document: ', error);
            alert('사용자 정보를 불러오는 데 실패했습니다. 다시 시도해 주세요.');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        callAPI();
    }, []);

    if (loading) return <h1 className='text-center my-5'>로딩중... </h1>;

    return (
        <Row className='justify-content-center my-5'>
            <Col xs={12} md={10} lg={8}>
                <Card>
                    <Card.Header>
                        <h3 className='text-center'>마이페이지</h3>
                    </Card.Header>
                    <Card.Body>
                        <div>
                            <ModalPhotoo form={form} setForm={setForm} setLoading={setLoading}></ModalPhotoo>
                        </div>
                        <Form onSubmit={onSubmit}>
                            <InputGroup className='mb-2'>
                                <InputGroup.Text>이름</InputGroup.Text>
                                <Form.Control name="name" value={name} onChange={onChangeForm} />
                            </InputGroup>

                            <InputGroup className='mb-2'>
                                <InputGroup.Text>전화</InputGroup.Text>
                                <Form.Control name="phone" value={phone} onChange={onChangeForm} />
                            </InputGroup>

                            <InputGroup className='mb-1'>
                                <InputGroup.Text>주소</InputGroup.Text>
                                <Form.Control name="address1" value={address1} onChange={onChangeForm} />
                                <Modaladdress form={form} setForm={setForm}/>
                            </InputGroup>
                            <Form.Control name="address2" value={address2} placeholder='상세주소' onChange={onChangeForm} />

                            <div className='text-center my-3'>
                                <Button className='px-5' type='submit'>저장</Button>
                                <Button variant='secondary' className='ms-2 px-5'>취소</Button>
                            </div>
                        </Form>
                    </Card.Body>
                </Card>
            </Col>
        </Row>
    );
};

export default Myapage;
