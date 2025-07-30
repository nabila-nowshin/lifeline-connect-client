import React from "react";

const ContactUs = () => {
  return (
    <section className="bg-base-200 py-16 px-4 md:px-10">
      <h2 className="text-3xl md:text-4xl font-bold text-center text-primary mb-10">
        Contact Us
      </h2>

      <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-10">
        {/* Contact Info */}
        <div className="space-y-4">
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
          <p className="text-sm text-gray-500">
            We’ll get back to you within 24 hours!
          </p>
        </div>

        {/* Contact Form */}
        <form className="space-y-4">
          <input
            type="text"
            placeholder="Your Name"
            className="input input-bordered w-full"
            required
          />
          <input
            type="email"
            placeholder="Your Email"
            className="input input-bordered w-full"
            required
          />
          <textarea
            placeholder="Your Message"
            className="textarea textarea-bordered w-full h-32"
            required
          />
          <button type="submit" className="btn btn-primary w-full">
            Send Message
          </button>
        </form>
      </div>
    </section>
  );
};

export default ContactUs;
