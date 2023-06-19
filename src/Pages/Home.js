import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getPosts, postsArray, postsLoading } from "../Reducers/postsSlice";
import { SingleCard } from "../Components/SingleCard";
import { Container, Row, Col, Nav, NavDropdown } from "react-bootstrap";
import "../styles/home.css";
import Navbar from "react-bootstrap/Navbar";
import ResponsivePagination from "react-responsive-pagination";
import "react-responsive-pagination/themes/classic.css";
import useSession from "../Hooks/useSession";
import "../styles/home.css";
import PostModal from "../Components/Modals/PostModal";
import { newPostsLoading, newPostsArray, addNewPost } from "../Reducers/addNewPostSlice";
import useDecodedSession from "../Hooks/useDecodedSession";

const Home = () => {
    const actualUser = useDecodedSession()
    const dispatch = useDispatch();
    const test = useSession();
    const [currentPage, setCurrentPage] = useState(1);
    const [postsPerPage, setPostsPerPage] = useState(20);
    const postsPerPageOptions = [0, 3, 6, 8, 36];
    const [show, setShow] = useState(false);

    useEffect(() => {
        dispatch(getPosts({ page: currentPage, pageSize: postsPerPage }));
    }, [dispatch, currentPage, postsPerPage]);

    const isLoading = useSelector(postsLoading);
    const allPosts = useSelector(postsArray);
    const newPostIsLoading = useSelector(newPostsLoading);
    const allNewPosts = useSelector(newPostsArray);

    const handleAddNewPost = (postData) => {
        dispatch(addNewPost(postData));
        setShow(false);
        const totalPosts = allPosts.posts.length + 1;
        const newPage = Math.ceil(totalPosts / postsPerPage);
        setCurrentPage(newPage);
    };

    return (
        <>
            <Navbar>
                <Container>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Brand>Epiblog</Navbar.Brand>
                </Container>
                <Container>
                    <Nav.Link href="/users">Link to Users List</Nav.Link>
                </Container>
                <PostModal
                    showModal={show}
                    setShowModal={setShow}
                    handleAddNewPost={handleAddNewPost}
                    newPostIsLoading={newPostIsLoading}
                    postsPerPage={postsPerPage}
                />

                <div>
                    <span>Posts per page</span>
                </div>
                <select
                    value={postsPerPage}
                    onChange={(e) => setPostsPerPage(parseInt(e.target.value))}
                >
                    {postsPerPageOptions.map((option) => (
                        <option key={option} value={option}>
                            {option}
                        </option>
                    ))}
                </select>
                {actualUser && (
                    <NavDropdown align="end" title={
                        <>
                            <img src="https://picsum.photos/55/55" alt="" />
                        </>
                    }
                        id="basic-nav-dropdown" className="ms-auto">
                        {actualUser && <NavDropdown.Item href="#action/3.3">Benvenuto {actualUser.firstname + ' '}</NavDropdown.Item>}
                        <NavDropdown.Item href="#action/3.1">Profilo</NavDropdown.Item>
                        <NavDropdown.Item href="#action/3.2">Impostazioni</NavDropdown.Item>
                    </NavDropdown>
                )}
            </Navbar>
            <hr></hr>
            <Container>
                <Row className="">
                    <Col className="d-flex flex-wrap gap-3 mt-3 mb-5" lg={12}>
                        {allPosts &&
                            allPosts.posts?.map((item) => (
                                <SingleCard
                                    key={item._id}
                                    title={item.title}
                                    img={item.img}
                                    content={item.content}
                                    author={
                                        item.author.email
                                    }
                                    rate={item.rate}
                                />
                            ))}
                    </Col>
                </Row>
            </Container>
            <ResponsivePagination
                current={currentPage}
                total={allPosts && allPosts.totalPage}
                onPageChange={setCurrentPage}
            />
            <footer className="footer">
                <Container>
                    <Row>
                        <Col>
                            <ul>
                                <li>Contattaci</li>
                            </ul>
                        </Col>
                        <Col>
                            <ul>
                                <li>Contattaci</li>
                            </ul>
                        </Col>
                        <Col>
                            <ul>
                                <li>Contattaci</li>
                            </ul>
                        </Col>
                    </Row>
                </Container>
            </footer>
        </>
    );
};


export default Home;
