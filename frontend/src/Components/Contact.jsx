import React, { useState } from 'react'
import './Contact.css'
import { Link } from 'react-router-dom'

const Contact = () => {
    const [data,setData]=useState({
        name:'',
        email:'',
        mesg:''
    })
    const handleSubmit=(e)=>{
        e.preventDefault();
        console.log(data);
        alert("Your inquiry has sent!")
    }
    const handleChange=(e)=>{
        const {name,value}=e.target;
        setData({
            ...data,
            [name]:value
        })
    }

  return (
    <div>
        <div className='contact' style={{
            marginTop:'-8rem',
            height:'120vh',
            backgroundRepeat: "no-repeat",
            backgroundSize: "cover",
            backgroundImage:'url(https://media.istockphoto.com/id/1091858450/photo/contact-us-sign-on-a-wooden-desk.jpg?s=612x612&w=0&k=20&c=Ff4enIFR2WC0QCa_CSB0RHHaNJI-t64Pa6XBuNdfux4=)'}}>
            <div className='titles'>
                <h1 style={{fontSize:'5 rem'}}>Contact Us</h1>
                
                <div>
                    <p style={{fontWeight:'bold'}}>Need to get in touch with us? Either Fill out the form with your inquiry or</p>
                    <p style={{fontWeight:'bold'}}>Find the department email you'd like to contact below.</p>
                </div>
            </div>
            <div className='forms'>
                <form onSubmit={handleSubmit}>
                    <h3>Any FeedBack/Sugesstions</h3>
                    <div className="item">
                        <label htmlFor="">Enter Username</label>
                        <br />
                        <input className='form-control'  type="text" name="username" placeholder="enter username" value={data.username} onChange={handleChange}/>
                    </div>
                    <div className="item">
                        <label htmlFor="">Enter Email</label>
                        <br />
                        <input className='form-control' type="email" name="email" placeholder="enter email" value={data.email} onChange={handleChange}/>
                    </div>
                    <div>
                        <label htmlFor="">What can we help you with?</label>
                        <br />
                        <textarea className='form-control' name="mesg" placeholder="Enter your query here" rows={5} cols={25}></textarea>
                    </div>
                    <br />
                    <Link to="/"><button className='btn btn-dark'>Submit</button></Link>
                </form>
            </div>            
        </div>
    </div>
  )
}

export default Contact