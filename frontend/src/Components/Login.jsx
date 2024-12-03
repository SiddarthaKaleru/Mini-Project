import React, { useState } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import 'react-toastify/dist/ReactToastify.css';
import axios from "axios";
import './Signup.css';
import { Link, useNavigate } from "react-router-dom";
import { toast, ToastContainer } from 'react-toastify';

const Login = () => {
    const [data, setData] = useState({
        email: '',
        password: '',
    });

    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setData({
            ...data,
            [name]: value,
        });
    };

    axios.defaults.withCredentials = true;

    const handleSubmit = (e) => {
        e.preventDefault();
        axios.post("http://localhost:8080/auth/login", { ...data })
            .then((res) => {
                toast.success("Login Successful!");
                window.localStorage.setItem("id", res.data.id);
                setTimeout(() => {
                    navigate("/");
                }, 3000); // Redirect after 3 seconds
            })
            .catch((err) => {
                toast.error("Login Failed. Please try again!");
                console.error(err);
            });
    };

    return (
        <div className='d-flex justify-content-center align-item-center' style={{
            color: 'white', height: "100vh", backgroundSize: "cover", marginTop: '-1rem', backgroundImage: 'url(https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/61fbe1d2-984b-45c7-b49a-9b9717d41abc/d7a56l5-3ee1faa3-6358-40bd-bb5a-9ac27112a73d.jpg/v1/fit/w_828,h_466,q_70,strp/windows_7_black_login_background_by_drayvern_d7a56l5-414w-2x.jpg?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1cm46YXBwOjdlMGQxODg5ODIyNjQzNzNhNWYwZDQxNWVhMGQyNmUwIiwiaXNzIjoidXJuOmFwcDo3ZTBkMTg4OTgyMjY0MzczYTVmMGQ0MTVlYTBkMjZlMCIsIm9iaiI6W1t7ImhlaWdodCI6Ijw9OTAwIiwicGF0aCI6IlwvZlwvNjFmYmUxZDItOTg0Yi00NWM3LWI0OWEtOWI5NzE3ZDQxYWJjXC9kN2E1Nmw1LTNlZTFmYWEzLTYzNTgtNDBiZC1iYjVhLTlhYzI3MTEyYTczZC5qcGciLCJ3aWR0aCI6Ijw9MTYwMCJ9XV0sImF1ZCI6WyJ1cm46c2VydmljZTppbWFnZS5vcGVyYXRpb25zIl19.Y4DWRutNbHXQVW9o-iiSXVaySU6-wfzXCR1rYDlMZmU)'}}
        >
            <div style={{ paddingTop: '12em' }}>
                <h2 style={{ fontSize: '3rem' }}>Login</h2>
                <form onSubmit={handleSubmit}>
                    <div className="item">
                        <label style={{ fontSize: '1.2rem' }}>Enter Email</label>
                        <br />
                        <input className="form-control" type="email" name="email" placeholder="Enter email" value={data.email} onChange={handleChange} />
                    </div>
                    <div className="item">
                        <label style={{ fontSize: '1.2rem' }}>Enter Password</label>
                        <br />
                        <input className="form-control" type="password" name="password" placeholder="Enter password" value={data.password} onChange={handleChange} />
                    </div>
                    <button className='btn btn-dark w-100' type="submit">Login</button>
                    <p>Don't have an account yet?</p>
                    <Link to="/auth/signup"><button className="btn btn-secondary w-100 border">Signup</button></Link>
                </form>
            </div>
            <ToastContainer position="top-right" autoClose={3000} hideProgressBar />
        </div>
    );
};

export default Login;
