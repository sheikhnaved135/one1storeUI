import React from "react";
import Layout from "../components/layouts/Layout";

const About = () => {
  return (
    <Layout title={"About Us"}>
      <div className="container py-5">
        <h1 className="text-center mb-4">About Us</h1>

        <section className="mb-5">
          <h2 className="text-primary">Our Story</h2>
          <p>
            Founded in 2023, One1Store started as a small online marketplace
            with a mission to make quality products accessible to everyone.
            Today, we are proud to be a trusted e-commerce platform offering a
            vast range of products, from the latest tech gadgets to everyday
            essentials, all at unbeatable prices.
          </p>
        </section>

        <section className="mb-5">
          <h2 className="text-primary">Our Mission</h2>
          <p>
            At One1Store, we believe in empowering customers by providing a
            seamless shopping experience that prioritizes quality,
            affordability, and convenience. Our mission is to be the go-to
            platform for reliable, high-quality products that meet the diverse
            needs of our customers.
          </p>
        </section>

        <section className="mb-5">
          <h2 className="text-primary">Our Values</h2>
          <ul>
            <li>
              <strong>Customer First:</strong> We put our customers at the heart
              of everything we do.
            </li>
            <li>
              <strong>Integrity:</strong> Honesty and transparency are integral
              to our operations.
            </li>
            <li>
              <strong>Quality:</strong> We commit to offering only the best
              products on our platform.
            </li>
            <li>
              <strong>Innovation:</strong> We continuously evolve to improve the
              shopping experience.
            </li>
          </ul>
        </section>

        <section className="text-center mt-5">
          <h3>Join Our Community</h3>
          <p>
            Explore our wide range of products and become a part of our story as
            we continue to grow and serve you better. Thank you for choosing
            One1Store!
          </p>
        </section>
      </div>
    </Layout>
  );
};

export default About;
