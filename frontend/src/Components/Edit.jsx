import React, { useEffect, useState} from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import { Container, Row, Col, Card, Image} from 'react-bootstrap';

const Edit = () => {
    const navigate=useNavigate();
    let {id}=useParams();
    const [user, setUser] = useState(null);
    useEffect(() => {
      const fetchProfile = async () => {
        try {
          const response = await axios.get(`http://localhost:8080/register/${id}`);
          console.log(response.data)
          setUser(response.data);
        } catch (error) {
          console.error("Error fetching profile data:", error);
        }
      };
      fetchProfile();
    }, [id]);
    if (!user) {
      return <div>Loading...</div>;
    }


    return (
        <Container className="mt-5">
        <Row className="justify-item-center align-item-center">
            <Col>
            <Card className="ml-150 text-center shadow-lg p-3  bg-white rounded h-100 w-100">
                <Card.Body>
                </Card.Body>
                <span style={{display:'flex', flexDirection:'row', justifyContent:'space-evenly'}}>
                    <button className='btn btn-danger w-25' onClick={handleDelete}>Delete</button>
                    <button className='btn btn-primary w-25'>Edit</button>
                </span>
            </Card>
            </Col>
        </Row>
        </Container>
    )};
export default Edit;