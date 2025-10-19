import React from 'react';
import { Heart, Mail, Phone, MapPin, Facebook, Instagram, Twitter } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-gradient-to-br from-neutral-900 to-neutral-800 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid md:grid-cols-4 gap-8">
          {/* Brand Section */}
          <div>
            <div className="flex items-center gap-3 mb-4">
              <div className="text-4xl animate-float">🐝</div>
              <span className="font-display font-bold text-2xl bg-gradient-to-r from-primary-500 to-secondary-500 bg-clip-text text-transparent">
                Bee Bright
              </span>
            </div>
            <p className="text-neutral-400 mb-4">
              Empowering students to learn smarter and shine brighter every day.
            </p>
            <div className="flex gap-3">
              <a 
                href="#" 
                className="w-10 h-10 bg-neutral-700 hover:bg-primary-500 rounded-full flex items-center justify-center transition"
              >
                <Facebook size={20} />
              </a>
              <a 
                href="#" 
                className="w-10 h-10 bg-neutral-700 hover:bg-primary-500 rounded-full flex items-center justify-center transition"
              >
                <Instagram size={20} />
              </a>
              <a 
                href="#" 
                className="w-10 h-10 bg-neutral-700 hover:bg-primary-500 rounded-full flex items-center justify-center transition"
              >
                <Twitter size={20} />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-display font-bold text-lg mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <a href="#" className="text-neutral-400 hover:text-primary-500 transition">
                  Home
                </a>
              </li>
              <li>
                <a href="#features" className="text-neutral-400 hover:text-primary-500 transition">
                  Features
                </a>
              </li>
              <li>
                <a href="#about" className="text-neutral-400 hover:text-primary-500 transition">
                  About Us
                </a>
              </li>
              <li>
                <a href="#contact" className="text-neutral-400 hover:text-primary-500 transition">
                  Contact
                </a>
              </li>
              <li>
                <a href="#" className="text-neutral-400 hover:text-primary-500 transition">
                  FAQs
                </a>
              </li>
            </ul>
          </div>

          {/* For Users */}
          <div>
            <h3 className="font-display font-bold text-lg mb-4">For Users</h3>
            <ul className="space-y-2">
              <li>
                <a href="#" className="text-neutral-400 hover:text-primary-500 transition">
                  Student Portal
                </a>
              </li>
              <li>
                <a href="#" className="text-neutral-400 hover:text-primary-500 transition">
                  Parent Portal
                </a>
              </li>
              <li>
                <a href="#" className="text-neutral-400 hover:text-primary-500 transition">
                  Tutor Portal
                </a>
              </li>
              <li>
                <a href="#" className="text-neutral-400 hover:text-primary-500 transition">
                  Enrollment
                </a>
              </li>
              <li>
                <a href="#" className="text-neutral-400 hover:text-primary-500 transition">
                  Privacy Policy
                </a>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="font-display font-bold text-lg mb-4">Contact Us</h3>
            <ul className="space-y-3">
              <li className="flex items-start gap-3 text-neutral-400">
                <MapPin size={20} className="text-primary-500 flex-shrink-0 mt-1" />
                <span>Bugallon, Ilocos, Philippines</span>
              </li>
              <li className="flex items-center gap-3 text-neutral-400">
                <Phone size={20} className="text-primary-500 flex-shrink-0" />
                <span>+63 123 456 7890</span>
              </li>
              <li className="flex items-center gap-3 text-neutral-400">
                <Mail size={20} className="text-primary-500 flex-shrink-0" />
                <span>hello@beebright.com</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-neutral-700 mt-8 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-neutral-400 text-sm">
              © 2025 Bee Bright Tutorial Center. All rights reserved.
            </p>
            <p className="text-neutral-400 text-sm flex items-center gap-1">
              Made with <Heart size={16} className="text-red-500 fill-red-500" /> by the Bee Bright Team
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;