import React from "react";
import { Routes, Route, NavLink, useNavigate, useLocation } from "react-router-dom";
import Home from "./Pages/Home.jsx";
import Dashboard from "./Pages/Dashboard.jsx";
import Login from "./Pages/Login.jsx";

<<<<<<< Updated upstream
export default function App() {
  const location = useLocation();
  const showTopNav = location.pathname === "/"; // only show on home

  return (
    <>
      {showTopNav && <TopNav />}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/dashboard" element={<Dashboard />} />
      </Routes>
=======
import React, { useState, useEffect, useRef } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";
import "./styles.css";
import Login from "./Pages/Login";

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/login" element={<Login />} />
    </Routes>
  );
}

function HomePage() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [slide, setSlide] = useState(0);
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState("home");
  
  const navigate = useNavigate();

  const testimonials = [
    {
      quote:
        "BeeBright helped my son regain confidence in Math. He looks forward to sessions every week!",
      name: "Aira, Parent",
    },
    {
      quote:
        "Schedules are flexible and the tutors are patient. We love the progress reports.",
      name: "Mark, Guardian",
    },
    {
      quote:
        "Our daughter's reading improved in just two months. Highly recommended!",
      name: "Jen, Parent",
    },
  ];

  // Simple autoplay for testimonials
  useEffect(() => {
    const id = setInterval(() => {
      setSlide((prev) => (prev + 1) % testimonials.length);
    }, 4500);
    return () => clearInterval(id);
  }, [testimonials.length]);

  // Scroll detection for navbar
  useEffect(() => {
    const handleScroll = () => {
      const isScrolled = window.scrollY > 50;
      if (isScrolled !== scrolled) {
        setScrolled(isScrolled);
      }
      
      // Update active section based on scroll position
      const sections = ["home", "services", "why", "testimonials", "contact"];
      const currentSection = sections.find(section => {
        const element = document.getElementById(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          return rect.top <= 100 && rect.bottom >= 100;
        }
        return false;
      });
      
      if (currentSection) {
        setActiveSection(currentSection);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [scrolled]);

  const scrollToId = (id) => {
    setMobileOpen(false);
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    setActiveSection(id);
  };

  // Function to handle login/register button click
  const handleAuthClick = () => {
    navigate('/login');
  };

  return (
    <>
      {/* NAVBAR */}
      <header className={`nav ${scrolled ? "nav--scrolled" : ""}`}>
        <div className="container nav__inner">
          <a className="brand" href="#home" onClick={(e)=>{e.preventDefault();scrollToId('home')}}>
            <BeeLogo /> <span>BeeBright</span>
          </a>

          <nav className={`nav__links ${mobileOpen ? "open" : ""}`}>
            <button 
              className={`nav__link ${activeSection === "services" ? "nav__link--active" : ""}`} 
              onClick={() => scrollToId("services")}
            >
              Services
            </button>
            <button 
              className={`nav__link ${activeSection === "why" ? "nav__link--active" : ""}`} 
              onClick={() => scrollToId("why")}
            >
              Why Us
            </button>
            <button 
              className={`nav__link ${activeSection === "testimonials" ? "nav__link--active" : ""}`} 
              onClick={() => scrollToId("testimonials")}
            >
              Testimonials
            </button>
            <button 
              className={`nav__link ${activeSection === "contact" ? "nav__link--active" : ""}`} 
              onClick={() => scrollToId("contact")}
            >
              Contact
            </button>
            <button className="btn btn--primary" onClick={handleAuthClick}>
              Login / Register
            </button>
          </nav>

          <button
            aria-label="Toggle menu"
            className={`nav__hamburger ${mobileOpen ? "nav__hamburger--open" : ""}`}
            onClick={() => setMobileOpen((s) => !s)}
          >
            <span />
            <span />
            <span />
          </button>
        </div>
      </header>

      {/* HERO */}
      <section id="home" className="hero">
        <div className="hero__bg">
          <div className="hero__bg-gradient"></div>
          <div className="hero__bg-pattern"></div>
        </div>
        <div className="container hero__inner">
          <div className="hero__text">
            <div className="hero__badge">
              <span>Dagupan City's Premier Learning Center</span>
            </div>
            <h1>Welcome to our <span className="text-gradient">learning hive</span>!</h1>
            <p className="lead">
              Student-loved, parent-approved. Dagupan City's friendly hub for
              one-on-one tutorials and toddlers' play-learn sessions.
              We're not just a learning hive—we're family. 🐝
            </p>
            
            <ul className="stats">
              <li>
                <div className="stats__number">300+</div>
                <div className="stats__label">Students</div>
              </li>
              <li>
                <div className="stats__number">20+</div>
                <div className="stats__label">Tutors</div>
              </li>
              <li>
                <div className="stats__number">98%</div>
                <div className="stats__label">Parent Approval</div>
              </li>
            </ul>
          </div>

          <div className="hero__art">
            <div className="hero__image">
              <div className="hero__image-bg"></div>
              <div className="hero__image-content">
                <div className="honeycomb-grid">
                  {Array.from({ length: 19 }).map((_, i) => (
                    <div key={i} className="honeycomb-cell">
                      <div className="honeycomb-inner"></div>
                    </div>
                  ))}

                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SERVICES */}
      <section id="services" className="section">
        <div className="container">
          <div className="section__header">
            <h2 className="section__title">Our Services</h2>
            <p className="section__subtitle">
              Personalized sessions that meet kids where they are—then help them soar.
            </p>
          </div>

          <div className="grid grid--6">
            <Card
              icon={<IconBook />}
              title="1-on-1 Tutorials"
              text="Focused support for Math, Reading, English, and Science—tailored to each learner."
              gradient="gradient-1"
            />
            <Card
              icon={<IconBlocks />}
              title="Toddlers Playgroup"
              text="Safe, playful, AC-cooled space that sparks curiosity for ages 3–5."
              gradient="gradient-2"
            />
            <Card
              icon={<IconCalendar />}
              title="Flexible Schedules"
              text="Weekday & weekend options for busy families. Reschedule with ease."
              gradient="gradient-3"
            />
            <Card
              icon={<IconBook />}
              title="1-on-1 Tutorials"
              text="Focused support for Math, Reading, English, and Science—tailored to each learner."
              gradient="gradient-1"
            />
            <Card
              icon={<IconBlocks />}
              title="Toddlers Playgroup"
              text="Safe, playful, AC-cooled space that sparks curiosity for ages 3–5."
              gradient="gradient-2"
            />
            <Card
              icon={<IconCalendar />}
              title="Flexible Schedules"
              text="Weekday & weekend options for busy families. Reschedule with ease."
              gradient="gradient-3"
              
            />
          </div>
        </div>
      </section>

      {/* WHY CHOOSE US */}
      <section id="why" className="section section--alt">
        <div className="container">
          <div className="section__header">
            <h2 className="section__title">Why Choose BeeBright?</h2>
            <p className="section__subtitle">
              We're committed to creating the best learning environment for your child
            </p>
          </div>

          <div className="grid grid--2">
            <div className="why-content">
              <h3>Creating confident learners for a bright future</h3>
              <p>
                At BeeBright, we believe every child has unique potential waiting to be unlocked. 
                Our approach combines personalized attention with engaging activities that make 
                learning enjoyable and effective.
              </p>
              <p>
                With the right support, children grow more confident, independent, and ready to face challenges. 
                Let's create a bright future—together.
              </p>
              <div className="why-actions">
                <a href="#contact" className="btn btn--primary">Book Assessment</a>
                <a href="#testimonials" className="btn btn--light">See Results</a>
              </div>
            </div>
            <div className="why-features">
              <div className="grid grid--2">
                <MiniCard 
                  title="Excellent Tutors" 
                  text="Warm, patient, and certified—bringing out the best in every child." 
                  icon="tutor"
                />
                <MiniCard 
                  title="Personalized Activities" 
                  text="Built for your child's pace, interests, and goals." 
                  icon="personalized"
                />
                <MiniCard 
                  title="Safe Environment" 
                  text="Clean, comfy, and kid-safe facilities with AC." 
                  icon="environment"
                />
                <MiniCard 
                  title="Progress Reports" 
                  text="Clear updates so parents always know how learning is going." 
                  icon="progress"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section id="testimonials" className="section">
        <div className="container">
          <div className="section__header">
            <h2 className="section__title">What Parents Say</h2>
            <p className="section__subtitle">
              Don't just take our word for it - hear from our BeeBright families
            </p>
          </div>

          <div className="carousel">
            <div className="carousel__container">
              {testimonials.map((t, i) => (
                <div
                  key={i}
                  className={`testimonial ${slide === i ? "active" : ""}`}
                  aria-hidden={slide === i ? "false" : "true"}
                >
                  <div className="testimonial__content">
                    <div className="testimonial__quote">
                      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M10 11V16C10 16.5523 9.55228 17 9 17H7C6.44772 17 6 16.5523 6 16V12C6 11.4477 6.44772 11 7 11H8C8.55228 11 9 10.5523 9 10V9C9 8.44772 8.55228 8 8 8H7C5.34315 8 4 9.34315 4 11V16C4 17.6569 5.34315 19 7 19H9C10.6569 19 12 17.6569 12 16V11C12 9.34315 10.6569 8 9 8C10.6569 8 12 6.65685 12 5V4C12 2.34315 10.6569 1 9 1H7C5.34315 1 4 2.34315 4 4V9C4 10.6569 5.34315 12 7 12H8C8.55228 12 9 11.5523 9 11H10Z" fill="currentColor"/>
                        <path d="M20 11V16C20 16.5523 19.5523 17 19 17H17C16.4477 17 16 16.5523 16 16V12C16 11.4477 16.4477 11 17 11H18C18.5523 11 19 10.5523 19 10V9C19 8.44772 18.5523 8 18 8H17C15.3431 8 14 9.34315 14 11V16C14 17.6569 15.3431 19 17 19H19C20.6569 19 22 17.6569 22 16V11C22 9.34315 20.6569 8 19 8C20.6569 8 22 6.65685 22 5V4C22 2.34315 20.6569 1 19 1H17C15.3431 1 14 2.34315 14 4V9C14 10.6569 15.3431 12 17 12H18C18.5523 12 19 11.5523 19 11H20Z" fill="currentColor"/>
                      </svg>
                    </div>
                    <p>"{t.quote}"</p>
                    <footer>
                      <div className="testimonial__author">{t.name}</div>
                      <div className="testimonial__rating">
                        {[1,2,3,4,5].map((star) => (
                          <svg key={star} width="16" height="16" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                            <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z" />
                          </svg>
                        ))}
                      </div>
                    </footer>
                  </div>
                </div>
              ))}
            </div>

            <div className="carousel__controls">
              <div className="carousel__dots">
                {testimonials.map((_, i) => (
                  <button
                    key={i}
                    aria-label={`Go to slide ${i + 1}`}
                    className={`dot ${slide === i ? "dot--active" : ""}`}
                    onClick={() => setSlide(i)}
                  />
                ))}
              </div>
              <div className="carousel__arrows">
                <button 
                  className="carousel__arrow carousel__arrow--prev"
                  onClick={() => setSlide(slide === 0 ? testimonials.length - 1 : slide - 1)}
                  aria-label="Previous testimonial"
                >
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M15 18L9 12L15 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </button>
                <button 
                  className="carousel__arrow carousel__arrow--next"
                  onClick={() => setSlide((slide + 1) % testimonials.length)}
                  aria-label="Next testimonial"
                >
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M9 18L15 12L9 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA BANNER */}
      <section className="cta">
        <div className="container cta__inner">
          <div className="cta__content">
            <h3>Ready to unlock your child's potential?</h3>
            <p>Book a free assessment to map your child's strengths and growth areas in 20 minutes.</p>
          </div>
          <div className="cta__actions">
            <a href="#contact" className="btn btn--dark">Schedule Now</a>
            <a href="tel:0912-345-6789" className="btn btn--light">Call Us</a>
          </div>
        </div>
      </section>

      {/* CONTACT / FOOTER */}
      <footer id="contact" className="footer">
        <div className="container footer__grid">
          <div className="footer__brand">
            <a className="brand brand--footer" href="#home" onClick={(e)=>{e.preventDefault();scrollToId('home')}}>
              <BeeLogo /> <span>BeeBright Tutorial Center</span>
            </a>
            <p>
              tapuac District, Dagupan City, Pangasinan
            </p>
            <p>Mon–Sat • 9:00 AM – 6:00 PM</p>
            <div className="footer__social">
              <a href="#" aria-label="Facebook">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                  <path d="M18 2H15C13.6739 2 12.4021 2.52678 11.4645 3.46447C10.5268 4.40215 10 5.67392 10 7V10H7V14H10V22H14V14H17L18 10H14V7C14 6.73478 14.1054 6.48043 14.2929 6.29289C14.4804 6.10536 14.7348 6 15 6H18V2Z"/>
                </svg>
              </a>
              <a href="#" aria-label="Instagram">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                  <path d="M12 2C13.3132 2 14.6136 2.25866 15.8268 2.7612C17.0401 3.26375 18.1425 4.00035 19.0711 4.92893C19.9997 5.85752 20.7362 6.95991 21.2388 8.17317C21.7413 9.38642 22 10.6868 22 12C22 13.3132 21.7413 14.6136 21.2388 15.8268C20.7362 17.0401 19.9997 18.1425 19.0711 19.0711C18.1425 19.9997 17.0401 20.7362 15.8268 21.2388C14.6136 21.7413 13.3132 22 12 22C10.6868 22 9.38642 21.7413 8.17317 21.2388C6.95991 20.7362 5.85752 19.9997 4.92893 19.0711C4.00035 18.1425 3.26375 17.0401 2.7612 15.8268C2.25866 14.6136 2 13.3132 2 12C2 10.6868 2.25866 9.38642 2.7612 8.17317C3.26375 6.95991 4.00035 5.85752 4.92893 4.92893C5.85752 4.00035 6.95991 3.26375 8.17317 2.7612C9.38642 2.25866 10.6868 2 12 2V2Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M16 11.37C16.1234 12.2022 15.9813 13.0522 15.5938 13.799C15.2063 14.5458 14.5932 15.1514 13.8416 15.5297C13.0901 15.9079 12.2385 16.0396 11.4078 15.9059C10.5771 15.7723 9.80977 15.3801 9.21485 14.7852C8.61993 14.1902 8.22774 13.4229 8.09408 12.5922C7.96042 11.7615 8.09208 10.9099 8.47034 10.1584C8.8486 9.40685 9.4542 8.79374 10.201 8.40624C10.9478 8.01874 11.7978 7.87659 12.63 8C13.4789 8.12588 14.2649 8.52146 14.8717 9.1283C15.4785 9.73515 15.8741 10.5211 16 11.37Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M17.5 6.5H17.51" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </a>
              <a href="#" aria-label="Messenger">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                  <path d="M12 2C6.477 2 2 6.477 2 12C2 14.909 3.423 17.487 5.589 19.154L5.869 19.359L5.918 19.718C6.042 20.625 6.308 21.5 6.707 22.294C8.433 22.689 10.177 22.859 12 22.859C17.523 22.859 22 18.382 22 12.859C22 7.336 17.523 2.859 12 2.859V2ZM11.999 4C16.418 4 20 7.582 20 12C20 16.418 16.418 20 11.999 20C10.152 20 8.429 19.372 7.023 18.303L6.648 18.031L6.111 18.223C5.395 18.482 4.635 18.636 3.849 18.677C4.518 17.688 4.938 16.532 5.057 15.294L5.095 14.718L4.823 14.218C3.612 12.101 3.612 9.899 4.823 7.782C6.034 5.665 8.101 4.283 10.5 4.033C11.05 3.97 11.523 4 11.999 4Z"/>
                </svg>
              </a>
            </div>
          </div>

          <div className="footer__contact">
            <h4>Reach Us</h4>
            <ul className="list">
              <li>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M22 16.92V19.92C22 20.52 21.53 21 20.94 21C10.13 21 2 12.88 2 3.06C2 2.47 2.48 2 3.08 2H6.08C6.68 2 7.16 2.48 7.16 3.08C7.16 4.73 7.56 6.33 8.32 7.77C8.47 8.06 8.42 8.42 8.2 8.65L6.6 10.25C8.06 13.09 10.91 15.94 13.75 17.4L15.35 15.8C15.58 15.58 15.94 15.53 16.23 15.68C17.67 16.44 19.27 16.84 20.92 16.84C21.52 16.84 22 17.32 22 17.92Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
                0912-345-6789
              </li>
              <li>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M4 4H20C21.1 4 22 4.9 22 6V18C22 19.1 21.1 20 20 20H4C2.9 20 2 19.1 2 18V6C2 4.9 2.9 4 4 4Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M22 6L12 13L2 6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
                hello@beebright.ph
              </li>
              <li>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M21 11.5C21 16.75 16.75 21 11.5 21C6.25 21 2 16.75 2 11.5C2 6.25 6.25 2 11.5 2C16.75 2 21 6.25 21 11.5Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M15 11.5C15 13.433 13.433 15 11.5 15C9.567 15 8 13.433 8 11.5C8 9.567 9.567 8 11.5 8C13.433 8 15 9.567 15 11.5Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M11.5 15V19" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M8 8L5 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M15 8L18 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
                Facebook / Messenger
              </li>
            </ul>
          </div>

          <div className="footer__links">
            <h4>Quick Links</h4>
            <ul className="list">
              <li><a href="#services">Services</a></li>
              <li><a href="#why">Why Us</a></li>
              <li><a href="#testimonials">Testimonials</a></li>
              <li><button className="link" onClick={handleAuthClick}>Login / Register</button></li>
            </ul>
          </div>
        </div>

        <div className="container footer__bottom">
          <p>© {new Date().getFullYear()} BeeBright Tutorial Center. All rights reserved.</p>
        </div>
      </footer>
>>>>>>> Stashed changes
    </>
  );
}

<<<<<<< Updated upstream
function TopNav() {
  const navigate = useNavigate();

  return (
    <header className="sticky top-0 z-40 bg-[#F9C80E] border-b-4 border-[#F6AE2D] text-[#1A1A1A] shadow-[0_6px_16px_rgba(0,0,0,.08)]">
      <div className="max-w-[1180px] mx-auto px-6 h-[68px] flex items-center justify-between">
        {/* Brand */}
        <button
          onClick={() => navigate("/")}
          className="flex items-center gap-3 cursor-pointer"
        >
          <img
            src="/logo.jpg"
            alt="BeeBright Logo"
            className="w-10 h-10 rounded-full object-contain aspect-square bg-white shadow-[0_6px_16px_rgba(0,0,0,.07)] overflow-hidden ring-2 ring-[#1A1A1A]"
          />
          <span className="font-extrabold text-lg tracking-wide">BeeBright Tutorial Center</span>
        </button>

        {/* Nav Links */}
        <nav className="hidden md:flex items-center gap-6 font-medium">
          <NavLink to="/" className="opacity-90 hover:opacity-100 hover:text-[#1A1A1A] transition">Services</NavLink>
          <a href="#why" className="opacity-90 hover:opacity-100 hover:text-[#1A1A1A] transition">Why Us</a>
          <a href="#testimonials" className="opacity-90 hover:opacity-100 hover:text-[#1A1A1A] transition">Testimonials</a>
          <a href="#contact" className="opacity-90 hover:opacity-100 hover:text-[#1A1A1A] transition">Contact</a>

          {/* Button */}
          <button
            onClick={() => navigate("/login")}
            className="px-5 py-2 border-2 border-[#1A1A1A] rounded-xl bg-[#FFFDF4] font-semibold shadow-[0_6px_16px_rgba(0,0,0,.07)] hover:bg-[#F6AE2D] hover:text-white transition"
          >
            Login / Register
          </button>
        </nav>

        {/* Mobile login shortcut */}
        <button
          onClick={() => navigate("/login")}
          className="md:hidden px-3 py-2 rounded-lg bg-[#FFFDF4] border border-[#1A1A1A] font-semibold shadow-[0_6px_16px_rgba(0,0,0,.07)]"
          aria-label="Login"
        >
          Login
        </button>
      </div>
    </header>
=======
/* === Reusable Bits === */
function Card({ icon, title, text, gradient }) {
  return (
    <article className={`card card--${gradient}`}>
      <div className="card__icon">{icon}</div>
      <h3 className="card__title">{title}</h3>
      <p className="card__text">{text}</p>
      <div className="card__hover"></div>
    </article>
  );
}

function MiniCard({ title, text, icon }) {
  return (
    <article className="minicard">
      <div className="minicard__icon">
        {icon === "tutor" && (
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M17 21V19C17 17.9391 16.5786 16.9217 15.8284 16.1716C15.0783 15.4214 14.0609 15 13 15H5C3.93913 15 2.92172 15.4214 2.17157 16.1716C1.42143 16.9217 1 17.9391 1 19V21" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M9 11C11.2091 11 13 9.20914 13 7C13 4.79086 11.2091 3 9 3C6.79086 3 5 4.79086 5 7C5 9.20914 6.79086 11 9 11Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M23 21V19C22.9993 18.1137 22.7044 17.2528 22.1614 16.5523C21.6184 15.8519 20.8581 15.3516 20 15.13" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M16 3.13C16.8604 3.35031 17.623 3.85071 18.1676 4.55232C18.7122 5.25392 19.0078 6.11683 19.0078 7.005C19.0078 7.89318 18.7122 8.75608 18.1676 9.45769C17.623 10.1593 16.8604 10.6597 16 10.88" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        )}
        {icon === "personalized" && (
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M9.09 9C9.3251 8.33167 9.78915 7.76811 10.4 7.40913C11.0108 7.05016 11.7289 6.91894 12.4272 7.03871C13.1255 7.15848 13.7588 7.52152 14.2151 8.06353C14.6713 8.60553 14.9211 9.29152 14.92 10C14.92 12 11.92 13 11.92 13" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M12 17H12.01" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        )}
        {icon === "environment" && (
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M2 12H22" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M12 2C14.5013 4.73835 15.9228 8.29203 16 12C15.9228 15.708 14.5013 19.2616 12 22C9.49872 19.2616 8.07725 15.708 8 12C8.07725 8.29203 9.49872 4.73835 12 2V2Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        )}
        {icon === "progress" && (
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M9 19C9 19 9.75 17 12 17C14.25 17 15 19 15 19" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M9 5H15" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M15 5V6C15 7.10457 15.8954 8 17 8C18.1046 8 19 7.10457 19 6V5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M9 5V6C9 7.10457 8.10457 8 7 8C5.89543 8 5 7.10457 5 6V5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            <rect x="4" y="9" width="16" height="11" rx="2" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        )}
      </div>
      <h4>{title}</h4>
      <p>{text}</p>
    </article>
  );
}

/* === Inline SVG Icons (no external deps) === */
function BeeLogo() {
  return (
    <svg
      className="bee"
      viewBox="0 0 64 64"
      width="28"
      height="28"
      aria-hidden="true"
    >
      <circle cx="32" cy="32" r="14" fill="#111" opacity="0.15" />
      <ellipse cx="32" cy="32" rx="18" ry="12" fill="#FFC727" />
      <rect x="18" y="28" width="28" height="8" fill="#111" opacity="0.25" />
      <ellipse cx="20" cy="22" rx="10" ry="6" fill="#B3E5FC" />
      <ellipse cx="44" cy="22" rx="10" ry="6" fill="#B3E5FC" />
      <circle cx="26" cy="34" r="2.5" fill="#111" />
      <circle cx="38" cy="34" r="2.5" fill="#111" />
      <path d="M32 44c-3 0-6-1-8-3 3 1 13 1 16 0-2 2-5 3-8 3z" fill="#111" opacity=".35" />
    </svg>
  );
}

function IconBook() {
  return (
    <svg viewBox="0 0 24 24" width="28" height="28" aria-hidden="true">
      <path d="M4 4h12a2 2 0 0 1 2 2v14H6a2 2 0 0 1-2-2V4z" fill="currentColor" opacity="0.15"/>
      <path d="M4 4h11a3 3 0 0 1 3 3v13H7a3 3 0 0 1-3-3V4z" stroke="currentColor" strokeWidth="1.5" fill="none"/>
      <path d="M8 7h8M8 10h8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
    </svg>
  );
}

function IconBlocks() {
  return (
    <svg viewBox="0 0 24 24" width="28" height="28" aria-hidden="true">
      <rect x="3" y="3" width="8" height="8" rx="2" stroke="currentColor" strokeWidth="1.5" fill="none"/>
      <rect x="13" y="3" width="8" height="8" rx="2" stroke="currentColor" strokeWidth="1.5" fill="none"/>
      <rect x="8" y="13" width="8" height="8" rx="2" stroke="currentColor" strokeWidth="1.5" fill="none"/>
    </svg>
  );
}

function IconCalendar() {
  return (
    <svg viewBox="0 0 24 24" width="28" height="28" aria-hidden="true">
      <rect x="3" y="4" width="18" height="16" rx="3" stroke="currentColor" strokeWidth="1.5" fill="none"/>
      <path d="M8 2v4M16 2v4M3 9h18" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
    </svg>
>>>>>>> Stashed changes
  );
}
