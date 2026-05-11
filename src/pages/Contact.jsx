import React, { useState } from 'react';
import emailjs from '@emailjs/browser';
import Layout from '../components/Layout';
import MailSVG from '../assets/reach_us.svg';
import MapPinSVG from '../assets/find_us.svg';
import ClockSVG from '../assets/office_hours.svg';


// Floating Label Input Component
const FloatingLabelInput = ({ id, label, type = 'text', value, onChange, error = false }) => {
  const [isFocused, setIsFocused] = useState(false);
  const hasValue = value.trim() !== '';

  return (
    <div className="relative w-full group">
      <input
        id={id}
        name={id}
        type={type}
        value={value}
        onChange={onChange}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        className={`w-full px-4 sm:px-5 py-3 sm:py-4 text-xs sm:text-sm md:text-base bg-white dark:bg-slate-700 border-2 rounded-lg transition-all duration-300 outline-none focus:shadow-lg dark:text-white placeholder-transparent ${
          error
            ? 'border-red-500 focus:border-red-600 dark:border-red-600'
            : isFocused || hasValue
            ? 'border-[#8cc63f] dark:border-green-500 focus:border-[#8cc63f]'
            : 'border-gray-300 dark:border-slate-500 hover:border-gray-400 dark:hover:border-slate-400'
        }`}
        placeholder={label}
      />
            {/* Animated Label */}
      <label
        htmlFor={id}
        className={`absolute left-4 sm:left-5 text-xs sm:text-sm md:text-base font-medium pointer-events-none transition-all duration-300 origin-left transform ${
          isFocused || hasValue
            ? 'top-0 -translate-y-1/2 scale-90 px-1 bg-white dark:bg-slate-700'
            : 'top-0 translate-y-3 sm:translate-y-4 scale-100'
        } ${
          error
            ? 'text-red-600 dark:text-red-400'
            : isFocused || hasValue
            ? 'text-[#8cc63f] dark:text-green-400 font-semibold'
            : 'text-gray-500 dark:text-gray-400'
        }`}
      >
        {label}
      </label>

      {/* Bottom border accent */}
      <div
        className={`absolute bottom-0 left-0 h-[2px] bg-gradient-to-r from-[#8cc63f] to-emb-blue transition-all duration-300 ${
          isFocused && !error ? 'w-full' : 'w-0'
        }`}
      />
    </div>
  );
};

// Floating Label Textarea Component
const FloatingLabelTextarea = ({ id, label, value, onChange, error = false, rows = 4 }) => {
  const [isFocused, setIsFocused] = useState(false);
  const hasValue = value.trim() !== '';

  return (
    <div className="relative w-full group">
      <textarea
        id={id}
        name={id}
        value={value}
        onChange={onChange}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        rows={rows}
        className={`w-full px-4 sm:px-5 py-3 sm:py-4 text-xs sm:text-sm md:text-base bg-white dark:bg-slate-700 border-2 rounded-lg transition-all duration-300 outline-none focus:shadow-lg dark:text-white placeholder-transparent resize-none ${
          error
            ? 'border-red-500 focus:border-red-600 dark:border-red-600'
            : isFocused || hasValue
            ? 'border-[#8cc63f] dark:border-green-500 focus:border-[#8cc63f]'
            : 'border-gray-300 dark:border-slate-500 hover:border-gray-400 dark:hover:border-slate-400'
        }`}
        placeholder={label}
      />
      
      {/* Animated Label */}
      <label
        htmlFor={id}
        className={`absolute left-4 sm:left-5 text-xs sm:text-sm md:text-base font-medium pointer-events-none transition-all duration-300 origin-left transform ${
          isFocused || hasValue
            ? 'top-0 -translate-y-1/2 scale-90 px-1 bg-white dark:bg-slate-700'
            : 'top-0 translate-y-3 sm:translate-y-4 scale-100'
        } ${
          error
            ? 'text-red-600 dark:text-red-400'
            : isFocused || hasValue
            ? 'text-[#8cc63f] dark:text-green-400 font-semibold'
            : 'text-gray-500 dark:text-gray-400'
        }`}
      >
        {label}
      </label>

      {/* Bottom border accent */}
      <div
        className={`absolute bottom-0 left-0 h-[2px] bg-gradient-to-r from-[#8cc63f] to-emb-blue transition-all duration-300 ${
          isFocused && !error ? 'w-full' : 'w-0'
        }`}
      />
    </div>
  );
};

const Contact = () => {
  const [formData, setFormData] = useState({ name: '', email: '', subject: '', message: '' });
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitMessage, setSubmitMessage] = useState('');

  const validateForm = () => {
    const newErrors = {};
    if (!formData.name.trim()) newErrors.name = 'Name is required';
    if (!formData.email.trim()) newErrors.email = 'Email is required';
    else if (!/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = 'Email is invalid';
    if (!formData.subject.trim()) newErrors.subject = 'Subject is required';
    if (!formData.message.trim()) newErrors.message = 'Message is required';
    return newErrors;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) setErrors((prev) => ({ ...prev, [name]: '' }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newErrors = validateForm();
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setIsSubmitting(true);
    setSubmitMessage('');

    try {
      await emailjs.send(
        import.meta.env.VITE_EMAILJS_SERVICE_ID,
        import.meta.env.VITE_EMAILJS_TEMPLATE_ID,
        {
          name: formData.name,        // -> {{name}}  (From Name + body)
          email: formData.email,      // -> {{email}} (Reply To, Cc, Bcc)
          subject: formData.subject,  // -> {{subject}}
          message: formData.message,  // -> {{message}}
        },
        { publicKey: import.meta.env.VITE_EMAILJS_PUBLIC_KEY }
      );

      setSubmitMessage('Message sent successfully! We will get back to you soon.');
      setFormData({ name: '', email: '', subject: '', message: '' });
      setTimeout(() => setSubmitMessage(''), 5000);
    } catch (error) {
      console.error('EmailJS error:', error);
      setSubmitMessage('Failed to send message. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Layout>
      <div className="w-full max-w-7xl mx-auto px-2 sm:px-4 mb-12">
        
        {/* Page Header */}
        <div className="mb-8 md:mb-12">
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-7xl font-raleway font-black text-[#1a5b8c] dark:text-blue-300 mb-2 md:mb-4">
            Get In Touch
          </h1>
          <p className="text-xs sm:text-sm md:text-base text-gray-600 dark:text-gray-400 max-w-2xl">
            Have questions or feedback? We'd love to hear from you. Fill out the form below or use one of our contact methods.
          </p>
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 md:gap-8">
          
          {/* Contact Form - Left Side (spans 2 columns on large screens) */}
          <div className="lg:col-span-2 bg-white dark:bg-slate-800 rounded-lg md:rounded-2xl shadow-lg p-4 sm:p-6 md:p-8 border border-gray-200 dark:border-slate-700 transition-shadow duration-300 hover:shadow-xl">
            
            <h2 className="text-lg sm:text-2xl md:text-3xl font-raleway font-bold text-[#1a5b8c] dark:text-blue-300 mb-6 md:mb-8 flex items-center gap-2">
              <span className="w-1 h-8 bg-gradient-to-b from-[#8cc63f] to-emb-blue rounded-full"></span>
              Send us a Message
            </h2>

            <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-5 md:space-y-6">
              
              {/* Name Input */}
              <FloatingLabelInput
                id="name"
                label="Full Name"
                type="text"
                value={formData.name}
                onChange={handleChange}
                error={!!errors.name}
              />
              {errors.name && <p className="text-xs sm:text-sm text-red-500 dark:text-red-400 mt-1">{errors.name}</p>}

              {/* Email Input */}
              <FloatingLabelInput
                id="email"
                label="Email Address"
                type="email"
                value={formData.email}
                onChange={handleChange}
                error={!!errors.email}
              />
              {errors.email && <p className="text-xs sm:text-sm text-red-500 dark:text-red-400 mt-1">{errors.email}</p>}

              {/* Subject Input */}
              <FloatingLabelInput
                id="subject"
                label="Subject"
                type="text"
                value={formData.subject}
                onChange={handleChange}
                error={!!errors.subject}
              />
              {errors.subject && <p className="text-xs sm:text-sm text-red-500 dark:text-red-400 mt-1">{errors.subject}</p>}

              {/* Message Textarea */}
              <FloatingLabelTextarea
                id="message"
                label="Message"
                value={formData.message}
                onChange={handleChange}
                error={!!errors.message}
                rows={5}
              />
              {errors.message && <p className="text-xs sm:text-sm text-red-500 dark:text-red-400 mt-1">{errors.message}</p>}

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-3 sm:py-4 px-6 bg-gradient-to-r from-[#8cc63f] to-emb-blue hover:from-green-600 hover:to-blue-700 disabled:from-gray-400 disabled:to-gray-500 text-white font-bold rounded-lg md:rounded-xl transition-all duration-300 transform hover:scale-[1.02] active:scale-95 disabled:cursor-not-allowed disabled:hover:scale-100 text-xs sm:text-sm md:text-base shadow-md hover:shadow-lg"
              >
                {isSubmitting ? (
                  <span className="flex items-center justify-center gap-2">
                    <svg className="animate-spin h-4 sm:h-5 w-4 sm:w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Sending...
                  </span>
                ) : (
                  'Send Message'
                )}
              </button>

              {/* Submit Message */}
              {submitMessage && (
                <div className={`p-3 sm:p-4 rounded-lg text-xs sm:text-sm font-medium transition-all duration-300 animate-fade-in ${
                  submitMessage.includes('successfully')
                    ? 'bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200 border border-green-300 dark:border-green-700'
                    : 'bg-red-100 dark:bg-red-900 text-red-800 dark:text-red-200 border border-red-300 dark:border-red-700'
                }`}>
                  {submitMessage}
                </div>
              )}
            </form>
          </div>

          {/* Contact Info Cards - Right Side */}
          <div className="lg:col-span-1 space-y-4 sm:space-y-5 md:space-y-6">
            
            {/* Reach Us Card */}
            <div className="bg-gradient-to-br from-[#8cc63f] to-emb-blue rounded-lg md:rounded-2xl shadow-lg p-4 sm:p-5 md:p-6 text-white transform transition-all duration-300 hover:shadow-xl hover:scale-105">
              <div className="flex items-center gap-3 sm:gap-4 mb-3 sm:mb-4">
                <div className="w-15 sm:w-18 h-15 sm:h-18 flex items-center justify-center">
                  <img src={MailSVG} alt="Mail" className="w-7.5 sm:w-9 h-7.5 sm:h-9" />
                </div>
                <h3 className="text-sm sm:text-lg md:text-xl font-bold font-raleway">Reach Us</h3>
              </div>
              <p className="text-xs sm:text-sm md:text-base opacity-95 mb-2">Email Address</p>
              <a href="mailto:info@swmd.gov.ph" className="text-xs sm:text-sm hover:opacity-80 transition-opacity break-all">
                info@swmd.gov.ph
              </a>
              <p className="text-xs sm:text-sm md:text-base opacity-95 mt-3 mb-2">Phone</p>
              <a href="tel:+639123456789" className="text-xs sm:text-sm hover:opacity-80 transition-opacity">
                +63 (2) 1234-5678
              </a>
            </div>

            {/* Find Us Card */}
            <div className="bg-gradient-to-br from-emb-blue to-[#0d47a1] rounded-lg md:rounded-2xl shadow-lg p-4 sm:p-5 md:p-6 text-white transform transition-all duration-300 hover:shadow-xl hover:scale-105">
              <div className="flex items-center gap-3 sm:gap-4 mb-3 sm:mb-4">
                <div className="w-10 sm:w-12 h-10 sm:h-12 flex items-center justify-center">
                  <img src={MapPinSVG} alt="Map Pin" className="w-5 sm:w-6 h-5 sm:h-6" />
                </div>
                <h3 className="text-sm sm:text-lg md:text-xl font-bold font-raleway">Find Us</h3>
              </div>
              <p className="text-xs sm:text-sm md:text-base opacity-95 mb-2">Main Office</p>
              <address className="text-xs sm:text-sm not-italic opacity-95 leading-relaxed">
                Environmental Resources Management Bureau,<br />
                Quezon Avenue, Bagong Lipunan,<br />
                Quezon City, Philippines
              </address>
            </div>

            {/* Office Hours Card */}
            <div className="bg-gradient-to-br from-amber-500 to-orange-600 rounded-lg md:rounded-2xl shadow-lg p-4 sm:p-5 md:p-6 text-white transform transition-all duration-300 hover:shadow-xl hover:scale-105">
              <div className="flex items-center gap-3 sm:gap-4 mb-3 sm:mb-4">
                <div className="w-10 sm:w-12 h-10 sm:h-12 flex items-center justify-center">
                  <img src={ClockSVG} alt="Clock" className="w-5 sm:w-6 h-5 sm:h-6" />
                </div>
                <h3 className="text-sm sm:text-lg md:text-xl font-bold font-raleway">Office Hours</h3>
              </div>
              <div className="space-y-1 text-xs sm:text-sm md:text-base opacity-95">
                <p><strong>Monday - Friday:</strong><br />8:00 AM - 5:00 PM</p>
                <p><strong>Saturday & Sunday:</strong><br />Closed</p>
                <p className="text-xs sm:text-xs mt-2 opacity-90">Holidays: By appointment</p>
              </div>
            </div>

          </div>

        </div>

        {/* Map Section - Full Width */}
        <div className="mt-8 md:mt-12 rounded-lg md:rounded-2xl shadow-lg overflow-hidden border border-gray-200 dark:border-slate-700">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3859.993299373034!2d121.04214307589754!3d14.656321675708485!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3397b71a8991dbfd%3A0x2c7b48366341b876!2sEMB%20Central%20Office!5e0!3m2!1sen!2sph!4v1750834246003!5m2!1sen!2sph "
            width="100%"
            height="350"
            style={{ border: 0, minHeight: '300px' }}
            allowFullScreen=""
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            title="SWMD Location"
            className="w-full"
          ></iframe>
        </div>

      </div>
    </Layout>
  );
};

export default Contact;