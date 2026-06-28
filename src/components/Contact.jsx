import React, { useState } from "react";
import emailjs from "@emailjs/browser";

const Contact = () => {
  const [form, setForm] = useState({
    name: "",
    email: "",
    message: "",
  });

  const [status, setStatus] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setLoading(true);
    setStatus("");

    try {
      const result = await emailjs.send(
        import.meta.env.VITE_SERVICE_ID,
        import.meta.env.VITE_TEMPLATE_ID,
        {
          name: form.name,
          email: form.email,
          message: form.message,
        },
        import.meta.env.VITE_PUBLIC_KEY
      );

      console.log("SUCCESS", result);

      setStatus("✅ Message sent successfully!");

      setForm({
        name: "",
        email: "",
        message: "",
      });
    } catch (err) {
      console.log("ERROR", err);

      setStatus("❌ Failed to send message. Please try again.");
    } finally {
      setLoading(false);

      setTimeout(() => {
        setStatus("");
      }, 5000);
    }
  };

  return (
    <section className="contact section section__border" id="contact">
      <div className="container">
        <h2 className="section__title">Contact Me</h2>
        <span className="section__subtitle">Get in touch</span>

        <div className="contact-grid">
          <div className="contact-data">
            <h3 className="contact__title">Talk to me</h3>

            <p className="contact__description">
              Write me your project
            </p>

            <div className="contact__info">
              <div>
                <strong>Email:</strong>{" "}
                <a href="mailto:modikishu88@gmail.com">
                  modikishu88@gmail.com
                </a>
              </div>

              <div>
                <strong>Whatsapp:</strong> +91 8103039035
              </div>
            </div>
          </div>

          <form className="contact__form" onSubmit={handleSubmit}>
            <input
              type="text"
              name="name"
              placeholder="Name"
              value={form.name}
              onChange={handleChange}
              required
            />

            <input
              type="email"
              name="email"
              placeholder="Email"
              value={form.email}
              onChange={handleChange}
              required
            />

            <textarea
              name="message"
              placeholder="Your Message"
              value={form.message}
              onChange={handleChange}
              required
            />

            <button
              type="submit"
              className="contact__button"
              disabled={loading}
            >
              {loading ? "Sending..." : "Submit"}
            </button>

            {status && (
              <p className="contact__message">{status}</p>
            )}
          </form>
        </div>
      </div>
    </section>
  );
};

export default Contact;