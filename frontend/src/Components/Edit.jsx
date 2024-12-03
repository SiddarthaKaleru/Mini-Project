import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import { Container, Row, Col, Card, Image } from 'react-bootstrap';

const Edit = () => {
  const navigate = useNavigate();
  const { id } = useParams();

  const [formData, setFormData] = useState({
    fullName: '',
    rollNumber: '',
    batchYear: '',
    program: '',
    department: '',
    email: '',
    phone: '',
    gpa: '',
    graduationYear: '',
    projectTitle: '',
    internships: '',
    dateOfBirth: '',
    address: '',
    hobbies: '',
    linkedIn: '',
    clubs: '',
    achievements: '',
    sports: '',
    personalStatement: '',
    favoriteMemory: '',
    futurePlans: '',
    image: null,
  });

  const [errors, setErrors] = useState({});

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await axios.get(`http://localhost:8080/register/${id}`);
        setFormData(response.data);
      } catch (error) {
        console.error('Error fetching profile data:', error);
      }
    };
    fetchProfile();
  }, [id]);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setFormData({
      ...formData,
      [name]: files ? files[0] : value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    const formDataToSend = new FormData();
    for (const key in formData) {
      if (formData[key]) {
        formDataToSend.append(key, formData[key]);
      }
    }
  
    try {
      const response = await axios.patch(`http://localhost:8080/register/${id}`, formDataToSend, {
        headers: {
          'Content-Type': 'multipart/form-data', // Specify content type as multipart
        },
      });
  
      if (response.status === 200) {
        navigate(`/profile/${id}`); // Redirect after successful update
      }
    } catch (error) {
      console.error('Error submitting form data:', error);
    }
  };
  
  

  return (
    <div
      className='pt-4 d-flex justify-content-center align-item-center'
      style={{
        height: '100vh',
        paddingBottom: '5rem',
        marginTop: '-1rem',
        backgroundRepeat: 'no-repeat',
        backgroundSize: 'cover',
        
      }}
    >
      <div className='border-dark border-4' style={{ padding: '3rem' }}>
        <form onSubmit={handleSubmit} encType='multipart/form-data'>
          <div>
            <h3>Basic Information</h3>
            {['fullName', 'rollNumber', 'batchYear', 'program', 'department'].map((field) => (
              <div className='inputitem' key={field}>
                <label>{field.replace(/([A-Z])/g, ' $1')}</label>
                <br />
                <input
                  className='form-control'
                  type='text'
                  name={field}
                  value={formData[field]}
                  onChange={handleChange}
                  placeholder={`Enter ${field.replace(/([A-Z])/g, ' $1').toLowerCase()}`}
                />
                {errors[field] && <p className='error'>{errors[field]}</p>}
              </div>
            ))}
          </div>

          <div>
            <h3>Academic Information</h3>
            {['email', 'phone', 'gpa', 'graduationYear', 'projectTitle', 'internships'].map((field) => (
              <div className='inputitem' key={field}>
                <label>{field.replace(/([A-Z])/g, ' $1')}</label>
                <br />
                <input
                  className='form-control'
                  type={field === 'email' ? 'email' : 'text'}
                  name={field}
                  value={formData[field]}
                  onChange={handleChange}
                  placeholder={`Enter ${field.replace(/([A-Z])/g, ' $1').toLowerCase()}`}
                />
                {errors[field] && <p className='error'>{errors[field]}</p>}
              </div>
            ))}
          </div>

          <div>
            <h3>Personal Information</h3>
            {['dateOfBirth', 'address', 'hobbies', 'linkedIn'].map((field) => (
              <div className='inputitem' key={field}>
                <label>{field.replace(/([A-Z])/g, ' $1')}</label>
                <br />
                <input
                  className='form-control'
                  type={field === 'dateOfBirth' ? 'date' : 'text'}
                  name={field}
                  value={formData[field]}
                  onChange={handleChange}
                  placeholder={`Enter ${field.replace(/([A-Z])/g, ' $1').toLowerCase()}`}
                />
                {errors[field] && <p className='error'>{errors[field]}</p>}
              </div>
            ))}
          </div>

          <div>
            <h3>Extracurricular Information</h3>
            {['clubs', 'achievements', 'sports'].map((field) => (
              <div className='inputitem' key={field}>
                <label>{field.replace(/([A-Z])/g, ' $1')}</label>
                <br />
                <input
                  className='form-control'
                  type='text'
                  name={field}
                  value={formData[field]}
                  onChange={handleChange}
                  placeholder={`Enter ${field.replace(/([A-Z])/g, ' $1').toLowerCase()}`}
                />
                {errors[field] && <p className='error'>{errors[field]}</p>}
              </div>
            ))}
          </div>

          <div>
            <h3>Additional Information</h3>
            {['personalStatement', 'favoriteMemory', 'futurePlans'].map((field) => (
              <div className='inputitem' key={field}>
                <label>{field.replace(/([A-Z])/g, ' $1')}</label>
                <br />
                <textarea
                  className='form-control'
                  name={field}
                  value={formData[field]}
                  onChange={handleChange}
                  placeholder={`Enter ${field.replace(/([A-Z])/g, ' $1').toLowerCase()}`}
                />
                {errors[field] && <p className='error'>{errors[field]}</p>}
              </div>
            ))}

            {/* <div className='inputitem'>
              <label>Image</label>
              <br />
              <input
                className='form-control'
                type='file'
                name='image'
                onChange={(e) => setFormData({ ...formData, image: e.target.files[0] })}
              />
            </div> */}
          </div>

          <button className='btn btn-dark mr-3' type='submit' onClick={handleSubmit}>
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};

export default Edit;
