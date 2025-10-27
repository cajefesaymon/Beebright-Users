import React from 'react';
import Navbar from '../components/Navbar';
import logo from '../assets/beebrightlogo.jpg';

const LandingPage = ({ onLogin, onGoToLogin }) => {
  const features = [
    { 
      icon: "📅", 
      title: "Easy Scheduling", 
      desc: "See all your classes at a glance with our colorful calendar!", 
      color: "from-blue-400 to-blue-600" 
    },
    { 
      icon: "📊", 
      title: "Track Progress", 
      desc: "Watch your grades grow with fun charts and achievements!", 
      color: "from-green-400 to-green-600" 
    },
    { 
      icon: "🎯", 
      title: "Set Goals", 
      desc: "Create learning goals and celebrate when you reach them!", 
      color: "from-purple-400 to-purple-600" 
    },
    { 
      icon: "💬", 
      title: "Stay Connected", 
      desc: "Chat with tutors and get help whenever you need it!", 
      color: "from-pink-400 to-pink-600" 
    },
    { 
      icon: "🏆", 
      title: "Earn Rewards", 
      desc: "Collect badges and achievements as you learn and grow!", 
      color: "from-yellow-400 to-yellow-600" 
    },
    { 
      icon: "📚", 
      title: "Learning Resources", 
      desc: "Access study materials, videos, and practice tests anytime!", 
      color: "from-red-400 to-red-600" 
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 via-white to-orange-50">
      {/* UPDATED: Pass onGoToLogin to Navbar */}
      <Navbar onGetStarted={() => onLogin('student')} onLogin={onGoToLogin} />

      {/* Hero Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div>
            <div className="inline-block bg-amber-100 text-amber-700 px-4 py-2 rounded-full text-sm font-semibold mb-6">
              ✨ Welcome to BeeBright!
            </div>
            <h1 className="font-bold text-5xl md:text-6xl text-gray-900 mb-6 leading-tight">
              Learn Smarter,
              <span className="bg-gradient-to-r from-amber-500 to-orange-500 bg-clip-text text-transparent">
                {' '}Shine Brighter!
              </span>
            </h1>
            <p className="text-xl text-gray-600 mb-8">
              Join our buzzing community of learners! Track your progress, connect with amazing tutors, 
              and achieve your academic goals with fun and ease.
            </p>
            
            {/* UPDATED: Better organized buttons */}
            <div className="space-y-4">
              <div className="flex flex-wrap gap-4">
                <button
                  onClick={() => onLogin('student')}
                  className="bg-amber-500 text-white px-8 py-4 rounded-2xl font-bold text-lg hover:bg-amber-600 transform hover:scale-105 transition shadow-lg"
                >
                  I'm a Student 📚
                </button>
                <button
                  onClick={() => onLogin('parent')}
                  className="bg-white text-gray-800 px-8 py-4 rounded-2xl font-bold text-lg hover:bg-gray-50 transform hover:scale-105 transition shadow-lg border-2 border-gray-200"
                >
                  I'm a Parent 👨‍👩‍👧
                </button>
              </div>
              
              {/* ADDED: Already have account section */}
              <div className="flex items-center gap-3 pt-2">
                <div className="h-px bg-gray-300 flex-1"></div>
                <span className="text-sm text-gray-500">or</span>
                <div className="h-px bg-gray-300 flex-1"></div>
              </div>
              
              <button
                onClick={onGoToLogin}
                className="w-full md:w-auto bg-blue-500 text-white px-8 py-3 rounded-2xl font-semibold hover:bg-blue-600 transition shadow-md flex items-center justify-center gap-2"
              >
                🔐 Already have an account? Login
              </button>
              
              <p className="text-sm text-gray-500 mt-2">
                💡 New students: Click "I'm a Student" to enroll. You'll receive login credentials after approval.
              </p>
            </div>
          </div>
          
          <div className="relative">
            <div className="bg-gradient-to-br from-amber-400 to-orange-400 rounded-3xl p-8 shadow-2xl transform rotate-3">
              <div className="bg-white rounded-2xl p-6 transform -rotate-3">
                <div className="text-6xl text-center mb-4 animate-bounce">🎓</div>
                <div className="text-center">
                  <div className="text-4xl font-bold text-amber-600 mb-2">100+</div>
                  <div className="text-gray-600">Happy Students</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works Section - ADDED */}
      <section className="bg-gradient-to-r from-blue-50 to-purple-50 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="font-bold text-4xl text-gray-900 mb-4">
              How to Get Started 🚀
            </h2>
            <p className="text-xl text-gray-600">Simple steps to join BeeBright</p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white rounded-2xl p-8 shadow-lg text-center border-2 border-blue-200">
              <div className="text-5xl mb-4">📝</div>
              <div className="bg-blue-500 text-white w-10 h-10 rounded-full flex items-center justify-center font-bold text-xl mx-auto mb-4">1</div>
              <h3 className="font-bold text-xl text-gray-900 mb-2">Enroll</h3>
              <p className="text-gray-600">
                Click "I'm a Student" and fill out the enrollment form with your information.
              </p>
            </div>
            
            <div className="bg-white rounded-2xl p-8 shadow-lg text-center border-2 border-purple-200">
              <div className="text-5xl mb-4">✅</div>
              <div className="bg-purple-500 text-white w-10 h-10 rounded-full flex items-center justify-center font-bold text-xl mx-auto mb-4">2</div>
              <h3 className="font-bold text-xl text-gray-900 mb-2">Get Approved</h3>
              <p className="text-gray-600">
                Our admin reviews your application and creates your account (1-2 days).
              </p>
            </div>
            
            <div className="bg-white rounded-2xl p-8 shadow-lg text-center border-2 border-green-200">
              <div className="text-5xl mb-4">🎉</div>
              <div className="bg-green-500 text-white w-10 h-10 rounded-full flex items-center justify-center font-bold text-xl mx-auto mb-4">3</div>
              <h3 className="font-bold text-xl text-gray-900 mb-2">Start Learning!</h3>
              <p className="text-gray-600">
                Receive your login credentials via email and access your dashboard!
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="bg-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="font-bold text-4xl text-gray-900 mb-4">
              Why Students Love BeeBright 💛
            </h2>
            <p className="text-xl text-gray-600">Everything you need to succeed, all in one place!</p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {features.map((feature, idx) => (
              <div 
                key={idx} 
                className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transform hover:-translate-y-2 transition border-2 border-gray-100"
              >
                <div className={`text-5xl mb-4 inline-block p-4 bg-gradient-to-r ${feature.color} rounded-2xl`}>
                  {feature.icon}
                </div>
                <h3 className="font-bold text-xl text-gray-900 mb-2">{feature.title}</h3>
                <p className="text-gray-600">{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* About Section - ADDED */}
      <section id="about" className="bg-gradient-to-br from-purple-50 to-pink-50 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="font-bold text-4xl text-gray-900 mb-4">
              About BeeBright
            </h2>
            <p className="text-xl text-gray-600">Your partner in academic excellence</p>
          </div>

          <div className="grid md:grid-cols-2 gap-12 items-center mb-16">
            <div>
              <div className="bg-gradient-to-br from-amber-400 to-orange-400 rounded-3xl p-8 shadow-2xl">
                <div className="bg-white rounded-2xl p-8">
                  <div className="text-6xl text-center mb-6">📖</div>
                  <div className="space-y-4 text-center">
                    <div>
                      <div className="text-3xl font-bold text-amber-600">2+</div>
                      <div className="text-gray-600">Years Experience</div>
                    </div>
                    <div>
                      <div className="text-3xl font-bold text-orange-600">15+</div>
                      <div className="text-gray-600">Expert Tutors</div>
                    </div>
                    <div>
                      <div className="text-3xl font-bold text-purple-600">95%</div>
                      <div className="text-gray-600">Success Rate</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="space-y-6">
              <h3 className="font-bold text-3xl text-gray-900">
                Our Mission
              </h3>
              <p className="text-lg text-gray-700 leading-relaxed">
                At BeeBright Tutorial Center, we believe every student has the potential to shine. 
                Our mission is to provide personalized, engaging, and effective tutoring that helps 
                students not just improve their grades, but develop a genuine love for learning.
              </p>
              <p className="text-lg text-gray-700 leading-relaxed">
                Like busy bees working together in a hive, we create a supportive learning community 
                where students, parents, and tutors collaborate to achieve academic excellence.
              </p>
              
              <div className="grid grid-cols-2 gap-4 pt-4">
                <div className="bg-white rounded-xl p-4 shadow-md border-2 border-blue-200">
                  <div className="text-3xl mb-2">🎯</div>
                  <div className="font-bold text-gray-900">Personalized</div>
                  <div className="text-sm text-gray-600">Tailored to each student</div>
                </div>
                <div className="bg-white rounded-xl p-4 shadow-md border-2 border-green-200">
                  <div className="text-3xl mb-2">💪</div>
                  <div className="font-bold text-gray-900">Results-Driven</div>
                  <div className="text-sm text-gray-600">Proven success methods</div>
                </div>
                <div className="bg-white rounded-xl p-4 shadow-md border-2 border-purple-200">
                  <div className="text-3xl mb-2">❤️</div>
                  <div className="font-bold text-gray-900">Caring</div>
                  <div className="text-sm text-gray-600">Student-focused approach</div>
                </div>
                <div className="bg-white rounded-xl p-4 shadow-md border-2 border-orange-200">
                  <div className="text-3xl mb-2">🌟</div>
                  <div className="font-bold text-gray-900">Excellence</div>
                  <div className="text-sm text-gray-600">High-quality education</div>
                </div>
              </div>
            </div>
          </div>

          {/* What Parents Say */}
          <div className="mt-16">
            <h3 className="font-bold text-3xl text-gray-900 text-center mb-8">
              What Parents Say 💬
            </h3>
            <div className="grid md:grid-cols-3 gap-6">
              <div className="bg-white rounded-2xl p-6 shadow-lg border-2 border-gray-100">
                <div className="flex items-center gap-3 mb-4">
                  <div className="text-3xl">👩</div>
                  <div>
                    <div className="font-bold text-gray-900">Mrs. Santos</div>
                    <div className="text-sm text-gray-500">Parent of Grade 5 Student</div>
                  </div>
                </div>
                <div className="text-yellow-500 mb-2">⭐⭐⭐⭐⭐</div>
                <p className="text-gray-600 italic">
                  "My daughter's grades improved dramatically! The tutors are patient and really care about the students."
                </p>
              </div>

              <div className="bg-white rounded-2xl p-6 shadow-lg border-2 border-gray-100">
                <div className="flex items-center gap-3 mb-4">
                  <div className="text-3xl">👨</div>
                  <div>
                    <div className="font-bold text-gray-900">Mr. Reyes</div>
                    <div className="text-sm text-gray-500">Parent of Grade 8 Student</div>
                  </div>
                </div>
                <div className="text-yellow-500 mb-2">⭐⭐⭐⭐⭐</div>
                <p className="text-gray-600 italic">
                  "The online platform is so easy to use! I can track my son's progress anytime. Highly recommend!"
                </p>
              </div>

              <div className="bg-white rounded-2xl p-6 shadow-lg border-2 border-gray-100">
                <div className="flex items-center gap-3 mb-4">
                  <div className="text-3xl">👩</div>
                  <div>
                    <div className="font-bold text-gray-900">Mrs. Cruz</div>
                    <div className="text-sm text-gray-500">Parent of Grade 3 Student</div>
                  </div>
                </div>
                <div className="text-yellow-500 mb-2">⭐⭐⭐⭐⭐</div>
                <p className="text-gray-600 italic">
                  "Best decision we made! Our daughter now loves studying and her confidence has grown so much."
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section - ADDED */}
      <section id="contact" className="bg-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="font-bold text-4xl text-gray-900 mb-4">
              Get in Touch 📞
            </h2>
            <p className="text-xl text-gray-600">We'd love to hear from you!</p>
          </div>

          <div className="grid md:grid-cols-2 gap-12">
            {/* Contact Info */}
            <div className="space-y-8">
              <div>
                <h3 className="font-bold text-2xl text-gray-900 mb-6">
                  Contact Information
                </h3>
                
                <div className="space-y-6">
                  <div className="flex items-start gap-4 bg-blue-50 rounded-xl p-5 border-2 border-blue-200">
                    <div className="text-3xl">📍</div>
                    <div>
                      <div className="font-bold text-gray-900 mb-1">Address</div>
                      <div className="text-gray-600">
                        Room A, 2nd Floor, Teo-Tinay Building<br />
                        Tapuac, Dagupan City, Philippines
                      </div>
                    </div>
                  </div>

                  <div className="flex items-start gap-4 bg-green-50 rounded-xl p-5 border-2 border-green-200">
                    <div className="text-3xl">📱</div>
                    <div>
                      <div className="font-bold text-gray-900 mb-1">Phone</div>
                      <div className="text-gray-600">
                        (075) 636 8093<br />
                      </div>
                    </div>
                  </div>

                  <div className="flex items-start gap-4 bg-purple-50 rounded-xl p-5 border-2 border-purple-200">
                    <div className="text-3xl">📧</div>
                    <div>
                      <div className="font-bold text-gray-900 mb-1">Email</div>
                      <div className="text-gray-600">
                        beebrightph@gmail.com<br />
                      </div>
                    </div>
                  </div>

                  <div className="flex items-start gap-4 bg-purple-50 rounded-xl p-5 border-2 border-purple-200">
                    <div className="text-3xl">📷</div>
                    <div>
                      <div className="font-bold text-gray-900 mb-1">Instagram</div>
                      <div className="text-gray-600">
                        beebrightph<br />
                      </div>
                    </div>
                  </div>

                  <div className="flex items-start gap-4 bg-orange-50 rounded-xl p-5 border-2 border-orange-200">
                    <div className="text-3xl">🕐</div>
                    <div>
                      <div className="font-bold text-gray-900 mb-1">Office Hours</div>
                      <div className="text-gray-600">
                        Monday - Friday: 8:00 AM - 8:00 PM<br />
                        Saturday: 9:00 AM - 5:00 PM<br />
                        Sunday: Closed
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-gradient-to-r from-amber-500 to-orange-500 rounded-2xl p-6 text-white">
                <div className="text-3xl mb-3">💡</div>
                <h4 className="font-bold text-xl mb-2">Have Questions?</h4>
                <p className="mb-4">Our friendly team is here to help! Feel free to reach out anytime.</p>
                <div className="flex gap-3">
                  <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="bg-white text-amber-600 w-10 h-10 rounded-full flex items-center justify-center hover:scale-110 transition">
                    📘
                  </a>
                  <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="bg-white text-amber-600 w-10 h-10 rounded-full flex items-center justify-center hover:scale-110 transition">
                    📷
                  </a>
                  <a href="mailto:info@beebright.com" className="bg-white text-amber-600 w-10 h-10 rounded-full flex items-center justify-center hover:scale-110 transition">
                    📧
                  </a>
                </div>
              </div>
            </div>

            {/* Contact Form */}
            <div className="bg-gradient-to-br from-blue-50 to-purple-50 rounded-3xl p-8 border-2 border-blue-200">
              <h3 className="font-bold text-2xl text-gray-900 mb-6">
                Send us a Message ✉️
              </h3>
              <form className="space-y-4">
                <div>
                  <label className="block text-gray-700 font-semibold mb-2">Your Name</label>
                  <input
                    type="text"
                    placeholder="Juan Dela Cruz"
                    className="w-full px-4 py-3 rounded-xl border-2 border-gray-300 focus:border-amber-500 focus:outline-none"
                    required
                  />
                </div>

                <div>
                  <label className="block text-gray-700 font-semibold mb-2">Email Address</label>
                  <input
                    type="email"
                    placeholder="your.email@example.com"
                    className="w-full px-4 py-3 rounded-xl border-2 border-gray-300 focus:border-amber-500 focus:outline-none"
                    required
                  />
                </div>

                <div>
                  <label className="block text-gray-700 font-semibold mb-2">Phone Number</label>
                  <input
                    type="tel"
                    placeholder="09XX XXX XXXX"
                    className="w-full px-4 py-3 rounded-xl border-2 border-gray-300 focus:border-amber-500 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-gray-700 font-semibold mb-2">Subject</label>
                  <select className="w-full px-4 py-3 rounded-xl border-2 border-gray-300 focus:border-amber-500 focus:outline-none">
                    <option>General Inquiry</option>
                    <option>Enrollment Question</option>
                    <option>Schedule Information</option>
                    <option>Pricing</option>
                    <option>Other</option>
                  </select>
                </div>

                <div>
                  <label className="block text-gray-700 font-semibold mb-2">Message</label>
                  <textarea
                    rows="4"
                    placeholder="Tell us how we can help you..."
                    className="w-full px-4 py-3 rounded-xl border-2 border-gray-300 focus:border-amber-500 focus:outline-none"
                    required
                  />
                </div>

                <button
                  type="submit"
                  className="w-full bg-gradient-to-r from-amber-500 to-orange-500 text-white py-4 rounded-xl font-bold text-lg hover:shadow-xl transform hover:scale-105 transition"
                >
                  Send Message 🚀
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section - ADDED */}
      <section className="bg-gradient-to-r from-amber-500 to-orange-500 py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="font-bold text-4xl text-white mb-4">
            Ready to Start Your Learning Journey?
          </h2>
          <p className="text-xl text-white opacity-90 mb-8">
            Join hundreds of students already learning with BeeBright!
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <button
              onClick={() => onLogin('student')}
              className="bg-white text-amber-600 px-8 py-4 rounded-2xl font-bold text-lg hover:shadow-2xl transform hover:scale-105 transition"
            >
              Enroll Now 🚀
            </button>
            <button
              onClick={onGoToLogin}
              className="bg-amber-700 text-white px-8 py-4 rounded-2xl font-bold text-lg hover:bg-amber-800 transform hover:scale-105 transition border-2 border-white"
            >
              Login to Dashboard 🔐
            </button>
          </div>
        </div>
      </section>

      {/* Footer - ADDED */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-4 gap-8 mb-8">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <img src={logo} alt="BeeBright" className="w-8 h-8 object-contain" />
                <span className="font-bold text-xl text-amber-400">BeeBright</span>
              </div>
              <p className="text-gray-400 text-sm">
                Empowering students to reach their full potential through personalized tutoring.
              </p>
            </div>

            <div>
              <h4 className="font-bold text-lg mb-4">Quick Links</h4>
              <ul className="space-y-2 text-gray-400 text-sm">
                <li><a href="#features" className="hover:text-amber-400 transition">Features</a></li>
                <li><a href="#about" className="hover:text-amber-400 transition">About Us</a></li>
                <li><a href="#contact" className="hover:text-amber-400 transition">Contact</a></li>
                <li><button onClick={onGoToLogin} className="hover:text-amber-400 transition">Login</button></li>
              </ul>
            </div>

            <div>
              <h4 className="font-bold text-lg mb-4">Services</h4>
              <ul className="space-y-2 text-gray-400 text-sm">
                <li>Elementary Tutoring</li>
                <li>High School Tutoring</li>
                <li>Test Preparation</li>
                <li>Online Learning</li>
              </ul>
            </div>

            <div>
              <h4 className="font-bold text-lg mb-4">Connect With Us</h4>
              <div className="flex gap-3 mb-4">
                <a href="#" className="bg-gray-800 w-10 h-10 rounded-full flex items-center justify-center hover:bg-amber-500 transition">📘</a>
                <a href="#" className="bg-gray-800 w-10 h-10 rounded-full flex items-center justify-center hover:bg-amber-500 transition">📷</a>
                <a href="#" className="bg-gray-800 w-10 h-10 rounded-full flex items-center justify-center hover:bg-amber-500 transition">📧</a>
              </div>
              <p className="text-gray-400 text-sm">
                📧 beebrightph@gmail.com<br />
                📱 (075) 636 8093
              </p>
            </div>
          </div>

          <div className="border-t border-gray-800 pt-8 text-center text-gray-400 text-sm">
            <p>© 2025 BeeBright Tutorial Center. All rights reserved.</p>
            <p className="mt-2">Made with ❤️ for students who want to shine bright!</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;