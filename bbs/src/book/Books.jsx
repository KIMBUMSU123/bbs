import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Row, Col, Card, InputGroup, Form, Button } from 'react-bootstrap'
import { BsCartCheckFill } from "react-icons/bs";
import { useNavigate } from 'react-router-dom';
import { app } from '../firebaseInit'
import { getDatabase, ref, set, get } from 'firebase/database'


const Books = () => {
  const db = getDatabase(app);
  const navi = useNavigate();
  const uid = sessionStorage.getItem('uid');
  const [page, setPage] = useState(1)
  const [query, setQuery] = useState('자바');
  const [loading, setLoading] = useState(false);
  const [books, setBooks] = useState([]);
  const callAPI = async () => {
    setLoading(true);
    const url = `https://dapi.kakao.com/v3/search/book?target=title&query=${query}&size=12&page=${page}`;
    const config = {
      headers: { "Authorization": "KakaoAK 466eb93454f3e630a2c35bbacc6456dc" }

    };
    const res = await axios.get(url, config);
    console.log(res.data);
    setBooks(res.data.documents);
    setLoading(false);
  }

  useEffect(() => {
    callAPI();
  }, [page]);

  const onSubmit = (e) => {
    e.preventDefault();
    setPage(1);
    callAPI();
  }
  const onClickCart = (book) => {
    if (uid) {
      // 장바구니에 도서 넣기 
      if (window.confirm(`${book.title} \n도서를 장바구니에 넣으시겠습니까?`)) {
        // 장바구니체크
        get(ref(db, `cart/${uid}/${book.isbn}`)).then(snapshot => {
          if (snapshot.exists()) {
            alert("이미 장바구니에 존재합니다.")
          } else {
            set(ref(db, `cart/${uid}/${book.isbn}`), { ...book });
            alert("성공!");

          }
        });
      }
    } else {
      sessionStorage.setItem('target', '/books')
      navi('/Login');
    }
  }

  if (loading) {
    return <h1 className='my-5'>로딩중...</h1>
  }

  return (
    <div className='my-5'>
      <h1>도서검색</h1>
      <Row className='mb-2'>
        <Col xs={8} md={6} lg={4}>
          <form onSubmit={onSubmit}>
            <InputGroup>
              <Form.Control onChange={(e) => setQuery(e.target.value)}
                placeholder='인기 검색어' value={query} />
              <Button type='submit'>검색</Button>
            </InputGroup>
          </form>
        </Col>
      </Row>
      <Row className='mx-5'>
        {books.map(book =>
          <Col key={book.isbn} xs={4} md={3} lg={2} className='mb-2'>
            <Card>
              <Card.Body>
                <img src={book.thumbnail || "http://via.placeholder.com/120X170"} />
              </Card.Body>
              <Card.Footer>
                <div className='ellipsis'>{book.title}</div>
                <BsCartCheckFill onClick={() => onClickCart(book)}
                  style={{ cursor: 'pointer', fontSize: '20px', color: "black" }} />
              </Card.Footer>
            </Card>

          </Col>
        )}
      </Row>
      <div className='text-center my-3'>
        <Button onClick={() => setPage(page - 1)} disable={page === 1}>이전</Button>
        <span className='mx-2'>{page}</span>
        <Button onClick={() => setPage(page + 1)}>다음</Button>
      </div>
    </div>
  )
}

export default Books