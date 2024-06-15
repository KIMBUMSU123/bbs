import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { Route, Routes, useNavigate } from 'react-router-dom';
import About from './About';
import Books from '../book/Books';
import Cart from '../book/Cart';
import Login from './User/Login';
import Locals from './locals/Locals';
import Favorite from './locals/Favorite';
import Join from './locals/Join';
import Myapage from './User/Myapage';
import ListPage from './bbs/ListPage'; 
import ReadPage from './bbs/ReadPage';
import InsertPage from './bbs/InsertPage';
import UpdatePage from './bbs/UpdatePage';

const Menu = () => {
    const navi = useNavigate();

    const onLogout = (e) => {
        e.preventDefault();
        if (window.confirm("로그아웃하시겠습니까?")) {
            sessionStorage.clear();
            navi('/');
        }
    }
    return (
        <>
            <Navbar expand="lg" bg="primary" data-bs-theme="dark">
                <Container fluid>
                    <Navbar.Brand href="/">Home</Navbar.Brand>
                    <Navbar.Toggle aria-controls="navbarScroll" />
                    <Navbar.Collapse id="navbarScroll">
                        <Nav
                            className="me-auto my-2 my-lg-0"
                            style={{ maxHeight: '100px' }}
                            navbarScroll>
                            <Nav.Link href="/books">도서검색</Nav.Link>
                            <Nav.Link href="/locals">지역검색</Nav.Link>
                            {sessionStorage.getItem('uid') &&
                                <>
                                    <Nav.Link href="/cart">장바구니</Nav.Link>
                                    <Nav.Link href="/favorite">즐겨찾기</Nav.Link>
                                </>
                            }
                             <Nav.Link href="/bbs/list">게시판</Nav.Link>
                        </Nav>
                        {sessionStorage.getItem('email') ?
                            <Nav>
                                <Nav.Link href="/mypage">{sessionStorage.getItem('email')}</Nav.Link>
                                <Nav.Link href="#" onClick={onLogout}>로그아웃</Nav.Link>
                            </Nav>
                            :
                            <Nav>
                                <Nav.Link href="/Login">로그인</Nav.Link>
                            </Nav>
                        }
                    </Navbar.Collapse>

                </Container>
            </Navbar>
            <Routes>
                <Route path="/" element={<About />} />
                <Route path="/books" element={<Books />} />
                <Route path="/cart" element={<Cart />} />
                <Route path="/Login" element={<Login />} />
                <Route path="/locals" element={<Locals />} />
                <Route path="/favorite" element={<Favorite />} />
                <Route path="/join" element={<Join />} />
                <Route path="/mypage" element={<Myapage />} />
                <Route path="/bbs/list" element={<ListPage/>}/>
                <Route path="/bbs/insert" element={<InsertPage/>}/>
                <Route path="/bbs/read/:id" element={<ReadPage/>}/>
                <Route path="/bbs/update/:id" element={<UpdatePage/>}/>
            </Routes>
        </>

    );
}

export default Menu