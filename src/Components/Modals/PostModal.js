import React, { useState } from "react";
import { Modal, Button } from "react-bootstrap";
import PostForm from "../Forms/PostForm";
import '../../styles/PostModal.css'

const PostModal = ({ handleAddNewPost, postsPerPage }) => {
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const handleSubmit = (postData) => {
        handleAddNewPost(postData)
    };
    return (
        <>
            <Button variant="primary" onClick={handleShow}>
                Add Post
            </Button>
            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Submit a new post</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <PostForm close={handleClose} handleSubmit={handleSubmit} postsPerPage={postsPerPage} />
                </Modal.Body>
            </Modal>
        </>
    );
};

export default PostModal;
