import React, { useEffect, useState} from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import { Container, Row, Col, Card, Image} from 'react-bootstrap';
const Profile = () => {
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
  const currentUserId = window.localStorage.getItem('id');
  if (!user) {
    return <div>Loading...</div>;
  }
  const handleDelete=()=>{
    try{
      const res=axios.delete(`http://localhost:8080/profile/${id}`);
      if(res){
        navigate('/details')
      }
    }catch(e){
      console.log(e);
    }
  }
  // const handleEdit=()=>{
  //   try {
  //     const res=axios.get()
  //   } catch (error) {
  //     console.log(error);
  //   }
  // }

  return (
    <Container className="mt-5">
      <Row className="justify-item-center align-item-center">
        <Col>
          <Card className="ml-150 text-center shadow-lg p-3  bg-white rounded h-100 w-100">
            <Card.Body>
              <div className="text-center mb-4">
                <Image
                  src={user.image}
                  alt={user.fullName}
                  roundedCircle
                  className="img-fluid"
                  style={{ width: '150px', height: '150px', objectFit: 'cover', margin: '0 auto' }}
                />
              </div>
              <Card.Title className="mb-4">
                <h2 className="text-primary">{user.fullName}</h2>
              </Card.Title>
              <Card.Text className="text-left" style={{ lineHeight: '2.0' }}>
                <strong>Roll Number:</strong> {user.rollNumber}<br />
                <strong>Batch Year:</strong> {user.batchYear}<br />
                <strong>Program:</strong> {user.program}<br />
                <strong>Department:</strong> {user.department}<br />
                <strong>Email:</strong> <a href={`mailto:${user.email}`}>{user.email}</a><br />
                <strong>Phone:</strong> {user.phone}<br />
                <strong>GPA:</strong> {user.gpa}<br />
                <strong>Graduation Year:</strong> {user.graduationYear}<br />
                <strong>Project Title:</strong> {user.projectTitle}<br />
                <strong>Internships:</strong> {user.internships}<br />
                <strong>Date of Birth:</strong> {user.dateOfBirth}<br />
                <strong>Address:</strong> {user.address}<br />
                <strong>Hobbies:</strong> {user.hobbies}<br />
                <strong>LinkedIn:</strong> <a href={user.linkedIn} target="_blank" rel="noopener noreferrer">{user.linkedIn}</a><br />
                <strong>Clubs:</strong> {user.clubs}<br />
                <strong>Achievements:</strong> {user.achievements}<br />
                <strong>Sports:</strong> {user.sports}<br />
                <strong>Personal Statement:</strong> {user.personalStatement}<br />
                <strong>Favorite Memory:</strong> {user.favoriteMemory}<br />
                <strong>Future Plans:</strong> {user.futurePlans}<br />
              </Card.Text>
            </Card.Body>
            <span style={{display:'flex', flexDirection:'row', justifyContent:'space-evenly'}}>
               {user.user===currentUserId &&
                <button className='btn btn-danger w-25' onClick={handleDelete}>Delete</button>
               }
               {
                user.user===currentUserId &&
                <Link to={`/profile/${id}/edit`} className="btn btn-primary w-25">
                  <button style={{
                      all: "unset",
                      cursor: "pointer"
                  }}>Edit</button>
                </Link>
               }
            </span>
           
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default Profile;