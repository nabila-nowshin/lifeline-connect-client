import React from "react";

const ContactUs = () => {
  return (
    <section
      className="bg-base-100 py-16 px-4 md:px-10 relative"
      style={{ scrollMarginTop: "80px" }}
      id="contact"
    >
      <div className="max-w-7xl mx-auto px-4">
        <h2
          className="text-3xl md:text-4xl font-bold text-center text-primary mb-10"
          data-aos="fade-up"
        >
          Contact Us
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
          {/* Contact Info */}
          <div
            className="space-y-4 p-6 bg-base-200 rounded-2xl shadow hover:shadow-xl transition-shadow duration-300 text-base-content"
            data-aos="fade-right"
          >
            <p className="text-lg">
              📞 <span className="font-medium">Phone:</span> +880 1234-567890
            </p>
            <p className="text-lg">
              📧 <span className="font-medium">Email:</span>{" "}
              support@bloodconnect.com
            </p>
            <p className="text-lg">
              🏢 <span className="font-medium">Office:</span> 123/4, Dhanmondi,
              Dhaka
            </p>
            <p className="text-sm text-base-content/70">
              We’ll get back to you within 24 hours!
            </p>
          </div>

          {/* Contact Form */}
          <form
            className="space-y-4 p-6 bg-base-200 rounded-2xl shadow hover:shadow-xl transition-shadow duration-300"
            data-aos="fade-left"
          >
            <input
              type="text"
              placeholder="Your Name"
              className="input input-bordered w-full text-base-content placeholder:text-base-content/50"
              required
            />
            <input
              type="email"
              placeholder="Your Email"
              className="input input-bordered w-full text-base-content placeholder:text-base-content/50"
              required
            />
            <textarea
              placeholder="Your Message"
              className="textarea textarea-bordered w-full h-32 text-base-content placeholder:text-base-content/50"
              required
            />
            <button
              type="submit"
              className="btn btn-primary w-full hover:scale-105 transition-transform duration-300"
            >
              Send Message
            </button>
          </form>
        </div>
      </div>
    </section>
  );
};

export default ContactUs;
