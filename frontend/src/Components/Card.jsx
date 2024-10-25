import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import profile from '../assets/download.png'
import { Link } from 'react-router-dom'
import './Card.css'

function card({id,name,batch,dept,imgURL}) {
  return (
    <Link to={`/profile/${id}`} className='text-decoration-none'>
    <Card className='card'>
      <Card.Img className='pic' variant="top" src={imgURL} />
      <Card.Body>
        <Card.Title>Student Name : {name}</Card.Title>
        <Card.Text>
         <span>
          Batch : {batch}
         </span>
          <p>Department : {dept}</p>
        </Card.Text>
      </Card.Body>
    </Card>
    </Link>
  );
}

export default card;