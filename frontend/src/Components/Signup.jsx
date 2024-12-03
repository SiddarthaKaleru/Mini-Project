import React, { useState } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import 'react-toastify/dist/ReactToastify.css'; // Import Toastify CSS
import axios from "axios";
import './Signup.css';
import { Link, useNavigate } from "react-router-dom";
import { toast, ToastContainer } from 'react-toastify';

const Signup = () => {
    const [data, setData] = useState({
        username: '',
        email: '',
        password: ''
    });
    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setData({
            ...data,
            [name]: value,
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        axios.post("http://localhost:8080/auth/signup", { ...data })
            .then((res) => {
                toast.success("Signup Successful! Redirecting to login...");
                console.log(res);
                setTimeout(() => {
                    navigate("/auth/login");
                }, 3000); // Wait 3 seconds before redirecting
            })
            .catch((err) => {
                toast.error("Signup Failed. Please check your inputs and try again.");
                console.error(err);
            });
    };

    return (
        <div className='pt-4 d-flex justify-content-center align-item-center'
            style={{
                color: 'white', height: "100vh", backgroundSize: "cover", marginTop: '-1rem', backgroundImage: 'url(https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/61fbe1d2-984b-45c7-b49a-9b9717d41abc/d7a56l5-3ee1faa3-6358-40bd-bb5a-9ac27112a73d.jpg/v1/fit/w_828,h_466,q_70,strp/windows_7_black_login_background_by_drayvern_d7a56l5-414w-2x.jpg?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1cm46YXBwOjdlMGQxODg5ODIyNjQzNzNhNWYwZDQxNWVhMGQyNmUwIiwiaXNzIjoidXJuOmFwcDo3ZTBkMTg4OTgyMjY0MzczYTVmMGQ0MTVlYTBkMjZlMCIsIm9iaiI6W1t7ImhlaWdodCI6Ijw9OTAwIiwicGF0aCI6IlwvZlwvNjFmYmUxZDItOTg0Yi00NWM3LWI0OWEtOWI5NzE3ZDQxYWJjXC9kN2E1Nmw1LTNlZTFmYWEzLTYzNTgtNDBiZC1iYjVhLTlhYzI3MTEyYTczZC5qcGciLCJ3aWR0aCI6Ijw9MTYwMCJ9XV0sImF1ZCI6WyJ1cm46c2VydmljZTppbWFnZS5vcGVyYXRpb25zIl19.Y4DWRutNbHXQVW9o-iiSXVaySU6-wfzXCR1rYDlMZmU)'
            }}
        >
            <div className='p-3' style={{ marginTop: '10rem' }}>
                <h2 style={{ fontSize: '2.5rem' }}>Signup</h2>
                <form onSubmit={handleSubmit}>
                    <div className="item">
                        <label htmlFor="">Enter Username</label>
                        <br />
                        <input className="form-control" type="text" name="username" placeholder="Enter username" value={data.username} onChange={handleChange} />
                    </div>
                    <div className="item">
                        <label htmlFor="">Enter Email</label>
                        <br />
                        <input className="form-control" type="email" name="email" placeholder="Enter email" value={data.email} onChange={handleChange} />
                    </div>
                    <div className="item">
                        <label htmlFor="">Enter Password</label>
                        <br />
                        <input className="form-control" type="password" name="password" placeholder="Enter password" value={data.password} onChange={handleChange} />
                    </div>
                    <button className='btn btn-dark w-100' type="submit">Signup</button>
                    <p className="">Already Have an Account</p>
                    <Link to="/auth/login"><button className="btn btn-secondary w-100 border">Login</button></Link>
                </form>
            </div>
            <ToastContainer position="top-right" autoClose={3000} hideProgressBar />
        </div>
    );
};

export default Signup;
