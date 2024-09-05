import React from 'react';

const ContactUs = () => {
  return (
    <div className="container mx-auto my-10 px-4">
      <div className="text-center mb-8">
        <h2 className="text-4xl font-bold mb-4">Contact Us</h2>
        <p className="text-lg text-gray-600">
          We’d love to hear from you. Whether you have a question, feedback, or just want to say hello,
          feel free to reach out to us.
        </p>
      </div>

      <div className="flex flex-col md:flex-row md:space-x-8">
        <div className="md:w-1/2 mb-6 md:mb-0">
          <h4 className="text-2xl font-semibold mb-4">Get in Touch</h4>
          <form>
            <div className="mb-4">
              <input
                type="text"
                placeholder="Name"
                className="w-full border border-gray-300 p-2 rounded"
              />
            </div>
            <div className="mb-4">
              <input
                type="email"
                placeholder="Email"
                className="w-full border border-gray-300 p-2 rounded"
              />
            </div>
            <div className="mb-4">
              <input
                type="text"
                placeholder="Subject"
                className="w-full border border-gray-300 p-2 rounded"
              />
            </div>
            <div className="mb-4">
              <textarea
                placeholder="Message"
                rows="4"
                className="w-full border border-gray-300 p-2 rounded"
              />
            </div>
            <button
              type="submit"
              className="w-full bg-blue-600 text-white py-2 rounded"
            >
              Send Message
            </button>
          </form>
        </div>

        <div className="md:w-1/2">
          <h4 className="text-2xl font-semibold mb-4">Our Office</h4>
          <p className="text-lg text-gray-600 mb-4">
            123 Kumawat Street, Suite 456<br />
            Electronics City, EC 78910<br />
            Phone: (123) 456-7890<br />
            Email: contact@kumawatelectronics.com
          </p>

          <div className="flex space-x-4">
            <a href="https://www.facebook.com" target="_blank" rel="noopener noreferrer">
              <i className="fab fa-facebook-f text-blue-600 text-2xl"></i>
            </a>
            <a href="https://www.twitter.com" target="_blank" rel="noopener noreferrer">
              <i className="fab fa-twitter text-blue-400 text-2xl"></i>
            </a>
            <a href="https://www.instagram.com" target="_blank" rel="noopener noreferrer">
              <i className="fab fa-instagram text-pink-600 text-2xl"></i>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactUs;
