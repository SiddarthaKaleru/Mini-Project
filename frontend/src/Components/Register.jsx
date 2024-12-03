import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './Register.css';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify'; 
import 'react-toastify/dist/ReactToastify.css'; 

const MultiStepForm = () => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    fullName: '',
    rollNumber: '',
    batchYear: '',
    program: '',
    department: '',
    password: '',
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
    image:'null',
    id:''
  });
  
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const validateStep = () => {
    const newErrors = {};
    if (step === 1) {
      if (!formData.fullName) newErrors.fullName = 'Full Name is required';
      if (!formData.rollNumber) newErrors.rollNumber = 'Roll Number is required';
      if (!formData.batchYear) newErrors.batchYear = 'Batch Year is required';
      if (!formData.program) newErrors.program = 'Program is required';
      if (!formData.department) newErrors.department = 'Department is required';
    }
    if (step === 2) {
      if (!formData.email) {
        newErrors.email = 'Email is required';
      } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
        newErrors.email = 'Email format is invalid';
      }
      if (!formData.phone) {
        newErrors.phone = 'Phone number is required';
      } else if (!/^\d{10}$/.test(formData.phone)) {
        newErrors.phone = 'Phone number must be 10 digits';
      }
      if (!formData.gpa) {
        newErrors.gpa = 'GPA is required';
      } else if (isNaN(formData.gpa) || formData.gpa < 0 || formData.gpa > 10) {
        newErrors.gpa = 'GPA must be a number between 0 and 10';
      }
      if (!formData.graduationYear) {
        newErrors.graduationYear = 'Graduation year is required';
      } else if (!/^\d{4}$/.test(formData.graduationYear)) {
        newErrors.graduationYear = 'Graduation year must be 4 digits';
      }
    }
    if (step === 3) {
      if (!formData.dateOfBirth) newErrors.dateOfBirth = 'Date of Birth is required';
      if (!formData.address) newErrors.address = 'Address is required';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const prevStep = () => {
    setStep(step - 1);
    toast.success('Moved to Previous step!');
  };


  const nextStep = () => {
    if (validateStep()) {
      setStep(step + 1);
      toast.success('Moved to next step!');
    }
  };
  
  const handleSubmit = async (e) => {
    e.preventDefault();
  
    const formDataToSend = new FormData();
  
    let id = window.localStorage.getItem('id');
    if (id) {
      formData.id = id;
    }
    for (const key in formData) {
      formDataToSend.append(key, formData[key]);
    }
  
    try {
      const response = await axios.post("http://localhost:8080/register", formDataToSend, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      toast.success('Registration successful!');
      navigate('/details');
    } catch (error) {
      console.error(error);
      toast.error('An error occurred. Please try again.');
    }
  };
  

  return (
    <div className='pt-4 d-flex justify-content-center align-item-center' 
      style={{
        height:'100vh',
        paddingBottom:'5rem',
        marginTop:'-1rem',
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
        backgroundImage:'url(data:image/jpeg;base64,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)'}}
    >
      <div className='border-dark border-4' style={{padding:'3rem'}}>
        <form onSubmit={handleSubmit} encType="multipart/form-data" method='post'>
          {/* Step Content */}
          {step === 1 && (
            <div>
              <h3>Basic Information</h3>
              <div className="inputitem">
                <label>Full Name</label>
                <br/>
                <input className='form-control' type="text" name="fullName" value={formData.fullName} onChange={handleChange} placeholder="Enter full name" />
                {errors.fullName && <p className="error">{errors.fullName}</p>}
              </div>

              <div className="inputitem">
                <label>Roll Number</label>
                <br/>
                <input className='form-control' type="text" name="rollNumber" value={formData.rollNumber} onChange={handleChange} placeholder="Enter roll number" />
                {errors.rollNumber && <p className="error">{errors.rollNumber}</p>}
              </div>

              <div className="inputitem">
                <label>Batch/Year</label>
                <br/>
                <input className='form-control' type="text" name="batchYear" value={formData.batchYear} onChange={handleChange} placeholder="Enter batch/year" />
                {errors.batchYear && <p className="error">{errors.batchYear}</p>}
              </div>

              <div className="inputitem">
                <label>Program/Course</label>
                <br/>
                <input className='form-control' type="text" name="program" value={formData.program} onChange={handleChange} placeholder="Enter program/course" />
                {errors.program && <p className="error">{errors.program}</p>}
              </div>

              <div className="inputitem">
                <label>Department</label>
                <br/>
                <input className='form-control' type="text" name="department" value={formData.department} onChange={handleChange} placeholder="Enter department" />
                {errors.department && <p className="error">{errors.department}</p>}
              </div>

              <button className='btn btn-dark mr-3' type="button" onClick={nextStep}>Next</button>
            </div>
          )}
          
          {step === 2 && (
            <div>
              <h3>Academic Information</h3>
              <div className="inputitem">
                <label>Email</label>
                <br/>
                <input className='form-control' type="email" name="email" value={formData.email} onChange={handleChange} placeholder="Enter email" />
                {errors.email && <p className="error">{errors.email}</p>}
              </div>

              <div className="inputitem">
                <label>Phone Number</label>
                <br/>
                <input className='form-control' type="text" name="phone" value={formData.phone} onChange={handleChange} placeholder="Enter phone number" />
                {errors.phone && <p className="error">{errors.phone}</p>}
              </div>

              <div className="inputitem">
                <label>GPA/CGPA</label>
                <br/>
                <input className='form-control' type="text" name="gpa" value={formData.gpa} onChange={handleChange} placeholder="Enter GPA/CGPA" />
                {errors.gpa && <p className="error">{errors.gpa}</p>}
              </div>

              <div className="inputitem">
                <label>Year of Graduation</label>
                <br/>
                <input className='form-control' type="text" name="graduationYear" value={formData.graduationYear} onChange={handleChange} placeholder="Enter graduation year" />
                {errors.graduationYear && <p className="error">{errors.graduationYear}</p>}
              </div>

              <div className="inputitem">
                <label>Projeact/Thesis Title</label>
                <br/>
                <input className='form-control' type="text" name="projectTitle" value={formData.projectTitle} onChange={handleChange} placeholder="Enter project title" />
              </div>

              <div className="inputitem">
                <label>Internships/Training</label>
                <br/>
                <input className='form-control' type="text" name="internships" value={formData.internships} onChange={handleChange} placeholder="Enter internships/training details" />
              </div>

              <button className='btn btn-dark mr-3' type="button" onClick={prevStep}>Previous</button>
              <button className='btn btn-dark mr-3' type="button" onClick={nextStep}>Next</button>
            </div>
          )}

          {step === 3 && (
            <div>
              <h3>Personal Information</h3>
              <div className="inputitem">
                <label>Date of Birth</label>
                <br/>
                <input className='form-control' type="date" name="dateOfBirth" value={formData.dateOfBirth} onChange={handleChange} />
                {errors.dateOfBirth && <p className="error">{errors.dateOfBirth}</p>}
              </div>

              <div className="inputitem">
                <label>Address</label>
                <br/>
                <input className='form-control' type="text" name="address" value={formData.address} onChange={handleChange} placeholder="Enter address" />
                {errors.address && <p className="error">{errors.address}</p>}
              </div>

              <div className="inputitem">
                <label>Hobbies/Interests</label>
                <br/>
                <input className='form-control' type="text" name="hobbies" value={formData.hobbies} onChange={handleChange} placeholder="Enter hobbies" />
              </div>

              <div className="inputitem">
                <label>LinkedIn Profile</label>
                <br/>
                <input className='form-control' type="text" name="linkedIn" value={formData.linkedIn} onChange={handleChange} placeholder="Enter LinkedIn profile" />
              </div>
          <button className='btn btn-dark mr-3' type="button" onClick={prevStep}>Previous</button>
          <button className='btn btn-dark mr-3' type="button" onClick={nextStep}>Next</button>
        </div>
      )}

      {step === 4 && (
        <div>
          <h3>Extracurricular Information</h3>
          <div className="inputitem">
            <label>Clubs/Societies</label>
            <br/>
            <input className='form-control' type="text" name="clubs" value={formData.clubs} onChange={handleChange} placeholder="Enter clubs/societies" />
          </div>

          <div className="inputitem">
            <label>Achievements/Awards</label>
            <br />
            <input className='form-control' type="text" name="achievements" value={formData.achievements} onChange={handleChange} placeholder="Enter achievements/awards" />
          </div>

          <div className="inputitem">
            <label>Sports/Cultural Participation</label>
            <br />
            <input className='form-control' type="text" name="sports" value={formData.sports} onChange={handleChange} placeholder="Enter sports/cultural participation" />
          </div>

          <button className='btn btn-dark mr-3' type="button" onClick={prevStep}>Previous</button>
          <button className='btn btn-dark mr-3' type="button" onClick={nextStep}>Next</button>
        </div>
      )}

      {step === 5 && (
        <div>
          <h3>Additional Information</h3>
          <div className="inputitem">
            <label>Personal Statement</label>
            <br />
            <textarea className='form-control' name="personalStatement" value={formData.personalStatement} onChange={handleChange} placeholder="Enter personal statement" />
          </div>

          <div className="inputitem">
            <label>Favorite Memory in College</label>
            <br />
            <textarea className='form-control' name="favoriteMemory" value={formData.favoriteMemory} onChange={handleChange} placeholder="Enter favorite memory" />
          </div>

          <div className="inputitem">
            <label>Future Plans</label>
            <br />
            <textarea className='form-control' name="futurePlans" value={formData.futurePlans} onChange={handleChange} placeholder="Enter future plans" />
          </div>

          <div className="inputitem">
            <label>image</label>
            <br />
            <input className='form-control' type="file" name="image" onChange={(e) => setFormData({ ...formData, image: e.target.files[0] })} />
          </div>

          <button className='btn btn-dark mr-3' type="button" onClick={prevStep}>Previous</button>
          <button className='btn btn-dark mr-3' type="submit">Submit</button>
        </div>
      )}
    </form>
  </div>
  <ToastContainer position="top-right" autoClose={3000} hideProgressBar />
</div>

  );
};

export default MultiStepForm;
