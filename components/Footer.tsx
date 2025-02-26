import React from 'react';
import {
  FaGithub,
  FaLinkedin,
  FaEnvelope,
  FaInstagram,
  FaXTwitter,
} from 'react-icons/fa6';

const Footer = () => {
  return (
    <footer className="bg-gradient-dark-violet text-pink-300 p-3 w-full ">
      <div className="flex justify-between items-center border-t border-pink-300 pt-4">
        <p className="text-sm text-pink-300 opacity-80">
          © matteobu All rights reserved.
        </p>
        <div className="flex gap-4">
          <a
            href="https://www.instagram.com/ehi.matteo"
            target="_blank"
            rel="noopener noreferrer"
            className="text-pink-300 hover:text-pink-500"
            aria-label="Instagram"
          >
            <FaInstagram size={24} />
          </a>
          <a
            href="https://x.com/dev_m_"
            target="_blank"
            rel="noopener noreferrer"
            className="text-pink-300 hover:text-pink-500"
            aria-label="Twitter"
          >
            <FaXTwitter size={24} />
          </a>
          <a
            href="https://github.com/matteobu"
            target="_blank"
            rel="noopener noreferrer"
            className="text-pink-300 hover:text-pink-500"
            aria-label="GitHub"
          >
            <FaGithub size={24} />
          </a>
          <a
            href="https://www.linkedin.com/in/matteo-bucciol/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-pink-300 hover:text-pink-500"
            aria-label="LinkedIn"
          >
            <FaLinkedin size={24} />
          </a>
          <a
            href="mailto:bucciol.matteo@proton.me"
            className="text-pink-300 hover:text-pink-500"
            aria-label="Email"
          >
            <FaEnvelope size={24} />
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
