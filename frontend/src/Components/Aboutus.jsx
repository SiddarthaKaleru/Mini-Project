import React from 'react'
import './Aboutus.css'
import college from '../assets/Aboutus/college-memories.jpeg'
const Aboutus = () => {
  return (
    <div>
<div className="about-large-container">
  <div className="hero-section">
    <h1>Welcome to Memory Weave</h1>
    <p>Your gateway to the legacy of our college alumni</p>
  </div>

  <section className="our-story">
    <div className="story-text">
      <h2>Our Story</h2>
      <p>
        Every student that walks through the halls of our esteemed college has a story to tell. 
        From their first day on campus to the moment they don their graduation robes, every experience shapes who they become. 
        At Memory Weave, we believe these stories deserve to be remembered, celebrated, and shared. 
        Our platform was born out of a passion to connect, preserve, and inspire through the journeys of our alumni. 
      </p>
      <p>
        With Memory Weave, we stitch together the collective experiences of our college community, 
        capturing achievements, memories, and future aspirations of students long after they’ve moved on to new horizons. 
        We are not just creating a digital archive; we are weaving the fabric of our alumni legacy.
      </p>
    </div>
    <div className="story-image">
      <img src={college} alt="Campus Memories"/>
    </div>
  </section>

  <section className="mission-vision">
    <div className="vision">
      <h2>Our Vision</h2>
      <p>
        To become the go-to platform where past, present, and future students connect through shared memories and experiences. 
        We aim to foster a community that celebrates the achievements of our alumni while inspiring the next generation of students.
      </p>
      {/* <img src="images/vision.jpg" alt="Vision" /> */}
    </div>
    <div className="mission">
      <h2>Our Mission</h2>
      <p>
        Our mission is simple: to preserve the stories and achievements of every student who has passed through our college. 
        Through profiles rich in detail, we offer a platform that allows former students to showcase their projects, internships, 
        and life experiences, creating a lasting legacy that future generations can look up to.
      </p>
      {/* <img src="images/mission.jpg" alt="Mission" /> */}
    </div>
  </section>

  <section className="features">
    <h2>Why Memory Weave?</h2>
    <div className="feature-grid">
      <div className="feature-item">
        {/* <img src="images/feature1.jpg" alt="Feature 1"/> */}
        <h3>Personal Profiles</h3>
        <p>
          Memory Weave allows each alumni to maintain a detailed personal profile, 
          showcasing their academic, extracurricular, and personal achievements.
        </p>
      </div>
      <div className="feature-item">
        {/* <img src="images/feature2.jpg" alt="Feature 2"/> */}
        <h3>Interactive Timeline</h3>
        <p>
          Relive the college journey with a chronological timeline that displays key milestones in a student's life, 
          from their first day to graduation.
        </p>
      </div>
      <div className="feature-item">
        {/* <img src="images/feature3.jpg" alt="Feature 3"/> */}
        <h3>Achievements Showcase</h3>
        <p>
          Highlight the greatest moments of success—whether it’s an award, a project, or an internship that shaped their future.
        </p>
      </div>
      <div className="feature-item">
        {/* <img src="images/feature4.jpg" alt="Feature 4"/> */}
        <h3>Inspiring Future Students</h3>
        <p>
          Alumni profiles serve as an inspiration for current and prospective students who are looking for guidance 
          and motivation from those who have walked the same path.
        </p>
      </div>
    </div>
  </section>

  <section className="testimonials">
    <h2>What Alumni Are Saying</h2>
    <div className="testimonial-grid">
      <div className="testimonial-item">
        <p>
          "Memory Weave is an incredible platform that not only helps us reconnect with our batchmates but also allows us 
          to showcase our work and achievements. It’s a digital legacy that we’ll cherish forever."
        </p>
        <h4>- Abhi, Batch 2019</h4>
      </div>
      <div className="testimonial-item">
        <p>
          "I love how easy it is to navigate through different profiles and see what everyone has accomplished after college. 
          It’s inspiring to look back and see how far we've all come."
        </p>
        <h4>- Pavan, Batch 2020</h4>
      </div>
      <div className="testimonial-item">
        <p>
          "As someone who always enjoyed staying connected with my peers, Memory Weave has been a fantastic tool. 
          It's more than just an archive—it's a way to celebrate the past and keep memories alive."
        </p>
        <h4>- Yash, Batch 2021</h4>
      </div>
    </div>
  </section>

  <section className="cta-section">
    <h2>Join the Legacy</h2>
    <p>
      Ready to share your story? Sign up today and become a part of Memory Weave, 
      where your journey is celebrated and preserved for future generations to see.
    </p>
    <a href="/auth/signup" className="cta-button">Get Started</a>
  </section>
</div>

    </div>
  )
}

export default Aboutus