import { FaGithub, FaDiscord, FaEnvelope } from 'react-icons/fa';

function ContactSection() {
  return (
    <>
      <div className="flex justify-evenly items-center space-x-6">
        <a
          href="mailto:whichfilm@pm.me"
          className="flex items-center space-x-2 text-white text-lg hover:text-pink-400"
        >
          <FaEnvelope size={30} />
        </a>

        <a
          href="https://github.com/matteobu/whichfilm"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center space-x-2 text-white text-lg hover:text-pink-400"
        >
          <FaGithub size={30} />
        </a>

        <a
          href="https://discord.gg/BEHSKHP8"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center space-x-2 text-white text-lg hover:text-pink-400"
        >
          <FaDiscord size={30} />
        </a>
      </div>
    </>
  );
}

export default ContactSection;
