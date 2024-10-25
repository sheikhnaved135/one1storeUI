import React from "react";
import Layout from "../components/layouts/Layout";

const Policy = () => {
  return (
    <Layout title={"Policy Page"}>
      <div className="container py-5">
        <h1 className="text-center mb-4">Our Policies</h1>

        <section className="mb-5">
          <h2 className="text-primary">Terms of Service</h2>
          <p>
            By accessing or using One1Store, you agree to comply with our Terms
            of Service. We reserve the right to update these terms periodically.
            Please review them regularly to stay informed about any changes.
          </p>
        </section>

        <section className="mb-5">
          <h2 className="text-primary">Privacy Policy</h2>
          <p>
            Your privacy is important to us. We collect personal information to
            improve our services and enhance your experience. Our Privacy Policy
            outlines what information we collect, how it’s used, and the
            measures we take to protect your data.
          </p>
          <p>
            For questions or concerns about your privacy, please contact us at{" "}
            <a
              href="mailto:support@one1store.com"
              className="text-decoration-none text-primary"
            >
              support@one1store.com
            </a>
            .
          </p>
        </section>

        <section className="mb-5">
          <h2 className="text-primary">Return Policy</h2>
          <p>
            We want you to be satisfied with your purchase. If you’re not
            completely happy with a product, you may return it within 30 days of
            the purchase date. Please review our return policy for eligibility
            requirements and instructions on how to initiate a return.
          </p>
          <p>For more details, contact our customer support team.</p>
        </section>
      </div>
    </Layout>
  );
};

export default Policy;
