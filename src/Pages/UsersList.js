import React, { useState, useEffect } from "react";
import ReactPaginate from "react-paginate";
import "../styles/usersList.css";
import Card from 'react-bootstrap/Card';
import Button from "react-bootstrap/Button";
import { Link } from "react-router-dom";

const UsersList = () => {
  const [page, setPage] = useState(1);
  const [data, setData] = useState([]);
  const [pageSize, setPageSize] = useState(3);

  const getUsers = async () => {
    try {
      const response = await fetch(
        `${process.env.REACT_APP_SERVER_BASE_URL}/users?page=${page}&pageSize=${pageSize}`
      );
      const data = await response.json();
      setData(data);
      console.log(data);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getUsers();
  }, [page, pageSize]);

  const handleClick = (e) => {
    setPage(e.selected + 1);
  };
  return (
    <div>
      <div className="row card-row">
        {data &&
          data.users?.map((user) => (
            <div className="col-md-4" key={user._id}>
              <Card className="mb-3">
                <Card.Header><h5>User's details</h5></Card.Header>
                <Card.Body>
                  <Card.Title>Username:</Card.Title>
                  <Card.Text>{user.firstname}</Card.Text>
                  <Card.Title>Email:</Card.Title>
                  <Card.Text>{user.email}</Card.Text>
                </Card.Body>
              </Card>
            </div>
          ))}
      </div>
      <div>
        <ReactPaginate
          breakLabel="..."
          pageCount={data.totalPage}
          nextLabel="Successivo"
          previousLabel="Precedente"
          onClick={handleClick}
          containerClassName="pagination"
          pageLinkClassName="page-link"
          previousLinkClassName="page-link"
          nextLinkClassName="page-link"
          disabledClassName="page-item disabled"
          activeClassName="page-item active"
          pageClassName="page-item"
        />
      </div>
      <Link to="/home">
        <Button variant="primary">Go back to Home Page</Button>
      </Link>
      <style>
        {`.card-row {
          display: flex;
          flex-wrap: wrap;
        }
        .card-row .col-md-4 {
          display: flex;
          flex-direction: column;
          margin-bottom: 15px;
        }
        .card-row .card {
          flex: 1;
        }`}
      </style>
    </div>
  );
};

export default UsersList;