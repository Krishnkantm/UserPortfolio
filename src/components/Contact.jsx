import React from 'react';
import emailjs from '@emailjs/browser';
import {useState} from 'react';

const Contact = ()=>{
    const[form,setForm] = useState({
        name: "",
        email: "",
        message: ""
    });

    const[status,setStatus] = useState("");

    const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    emailjs
      .send(
        import.meta.env.VITE_SERVICE_ID,     // replace
        import.meta.env.VITE_TEMPLATE_ID,    // replace
        form,
        import.meta.env.VITE_PUBLIC_KEY     // replace
      )
      .then(
        () => {
          setStatus("✅ Message sent successfully");
          setForm({ name: "", email: "", message: "" });
        },
        () => {
          setStatus("❌ Failed to send message");
        }
      );
  };

  return (
    <section className="contact section section__border" id="contact">
      <div className="container">
        <h2 className="section__title">Contact Me</h2>
        <span className="section__subtitle">Get in touch</span>

        <div className="contact-grid">

          <div className="contact-data">
            <h3 className="contact__title">Talk to me</h3>
            <p className="contact__description">Write me your project</p>

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
              placeholder="Names"
              value={form.name}
              onChange={handleChange}
              required
            />
            <input
              type="email"
              name="email"
              placeholder="Mail"
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

            <button type="submit" className="contact__button">
              Submit
            </button>

            <p className="contact__message">{status}</p>
          </form>

        </div>
      </div>
    </section>
  );
}

export default Contact;
