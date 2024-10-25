import React from "react";
import Layout from "../components/layouts/Layout";

const Contact = () => {
  return (
    <Layout title={"Contact Us"}>
      <div className="container py-5">
        <h1 className="text-center mb-4">Contact Us</h1>

        <section className="mb-5">
          <h2 className="text-primary">Get in Touch</h2>
          <p>
            We’re here to help! Whether you have questions about your order,
            feedback on our products, or general inquiries, feel free to reach
            out. Our support team will get back to you as soon as possible.
          </p>
        </section>

        <section className="mb-5">
          <h2 className="text-primary">Contact Information</h2>
          <ul className="list-unstyled">
            <li>
              <strong>Phone:</strong> (123) 456-7890
            </li>
            <li>
              <strong>Email:</strong> support@one1store.com
            </li>
            <li>
              <strong>Address:</strong> 123 E-commerce St, Suite 456, Cityname,
              Country
            </li>
          </ul>
        </section>

        <section className="mb-5">
          <h2 className="text-primary">Send Us a Message</h2>
          <form>
            <div className="mb-3">
              <label htmlFor="name" className="form-label">
                Name
              </label>
              <input
                type="text"
                className="form-control"
                id="name"
                placeholder="Your Name"
                required
              />
            </div>
            <div className="mb-3">
              <label htmlFor="email" className="form-label">
                Email
              </label>
              <input
                type="email"
                className="form-control"
                id="email"
                placeholder="Your Email"
                required
              />
            </div>
            <div className="mb-3">
              <label htmlFor="subject" className="form-label">
                Subject
              </label>
              <input
                type="text"
                className="form-control"
                id="subject"
                placeholder="Subject"
                required
              />
            </div>
            <div className="mb-3">
              <label htmlFor="message" className="form-label">
                Message
              </label>
              <textarea
                className="form-control"
                id="message"
                rows="5"
                placeholder="Type your message here..."
                required
              ></textarea>
            </div>
            <button type="submit" className="btn btn-primary w-100">
              Send Message
            </button>
          </form>
        </section>
      </div>
    </Layout>
  );
};

export default Contact;
