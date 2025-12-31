import { useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Phone, Mail, MessageCircle } from 'lucide-react';
import { useScrollToTop } from '../../hooks/useScrollToTop';
import { API_ENDPOINTS, postData } from '../../config/api';
import { validateName, validateEmail, validatePhone, formatPhoneNumber } from '../../utils/validation';

const RequestCallback = () => {
  const navigate = useNavigate();
  useScrollToTop(); // Scroll to top when component mounts
  
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    country: '',
    message: ''
  });
  const [errors, setErrors] = useState({
    name: '',
    email: '',
    phone: '',
    country: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Validate all fields
    const nameError = validateName(formData.name);
    const emailError = validateEmail(formData.email);
    const phoneError = validatePhone(formData.phone);

    setErrors({
      name: nameError || '',
      email: emailError || '',
      phone: phoneError || '',
      country: '',
      message: ''
    });

    // If there are validation errors, don't submit
    if (nameError || emailError || phoneError) {
      return;
    }

    setIsSubmitting(true);

    try {
      // Format phone number with +91 prefix
      const formattedPhone = formatPhoneNumber(formData.phone);

      // Store user details first
      await postData(API_ENDPOINTS.COST_CALCULATOR.USER_DETAILS, {
        name: formData.name,
        email: formData.email,
        phone: formattedPhone,
        intent: 'requested_callback'
      });

      // Store callback request
      await postData(API_ENDPOINTS.COST_CALCULATOR.REQUEST_CALLBACK, {
        name: formData.name,
        mobileNumber: formattedPhone
      });

      setIsSubmitted(true);

      // Reset form after 3 seconds
      setTimeout(() => {
        setIsSubmitted(false);
        setFormData({ name: '', email: '', phone: '', country: '', message: '' });
        setErrors({ name: '', email: '', phone: '', country: '', message: '' });
      }, 3000);
    } catch (error) {
      console.error('Error:', error);
      alert('Error submitting request. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const countries = [
    'Germany', 'United Kingdom', 'Netherlands', 'Spain', 'Italy', 'Ireland',
    'France', 'Russia', 'Switzerland', 'Sweden', 'Poland', 'Belgium',
    'Portugal', 'Austria', 'Iceland', 'Croatia', 'Romania', 'Albania'
  ];

  if (isSubmitted) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="min-h-screen pt-20 bg-gradient-to-br from-[hsl(var(--hero-gradient-start))] to-[hsl(var(--hero-gradient-end))] flex items-center justify-center"
      >
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="max-w-md mx-auto bg-white rounded-2xl p-8 shadow-2xl text-center"
        >
          <div className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-4">
            <Phone className="w-8 h-8 text-white" />
          </div>
          <h2 className="text-2xl font-heading font-bold text-foreground mb-4">
            Request Submitted Successfully!
          </h2>
          <p className="text-muted-foreground mb-6">
            Thank you for your interest! Our team will contact you within 24 hours to discuss your study abroad plans.
          </p>
          <button
            onClick={() => navigate('/')}
            className="bg-primary text-primary-foreground px-6 py-3 rounded-full font-semibold hover:bg-primary/90 transition-colors"
          >
            Back to Home
          </button>
        </motion.div>
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="min-h-screen pt-20 bg-gradient-to-br from-[hsl(var(--hero-gradient-start))] to-[hsl(var(--hero-gradient-end))]"
    >
      <div className="container-app py-16">
        {/* Back Button */}
        <motion.button
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          onClick={() => navigate('/')}
          className="flex items-center space-x-2 text-muted-foreground hover:text-foreground transition-colors mb-8"
        >
          <ArrowLeft className="w-5 h-5" />
          <span>Back to Home</span>
        </motion.button>

        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-5 gap-8 lg:gap-12 items-start">
            {/* Left Side - Info (3 columns) */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              className="lg:col-span-3 space-y-6 lg:space-y-8 order-2 lg:order-1"
            >
              <div className="text-center lg:text-left">
                <h1 className="text-3xl sm:text-4xl lg:text-5xl font-heading font-bold text-foreground mb-4 lg:mb-6">
                  Request a Callback
                </h1>
                <p className="text-lg sm:text-xl text-muted-foreground leading-relaxed">
                  Get personalized guidance from our study abroad experts. 
                  We'll help you choose the right country, university, and program for your goals.
                </p>
              </div>

              <div className="grid gap-6 lg:gap-8">
                <div className="flex flex-col sm:flex-row items-start space-y-4 sm:space-y-0 sm:space-x-6">
                  <div className="w-16 h-16 bg-primary rounded-2xl flex items-center justify-center flex-shrink-0 mx-auto sm:mx-0">
                    <Phone className="w-8 h-8 text-white" />
                  </div>
                  <div className="text-center sm:text-left">
                    <h3 className="text-lg sm:text-xl font-heading font-semibold text-foreground mb-3">
                      Expert Consultation
                    </h3>
                    <p className="text-muted-foreground leading-relaxed">
                      Speak directly with our experienced counselors who have helped thousands of students 
                      achieve their study abroad dreams. Get insights into admission requirements, 
                      application processes, and scholarship opportunities.
                    </p>
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row items-start space-y-4 sm:space-y-0 sm:space-x-6">
                  <div className="w-16 h-16 bg-accent rounded-2xl flex items-center justify-center flex-shrink-0 mx-auto sm:mx-0">
                    <Mail className="w-8 h-8 text-white" />
                  </div>
                  <div className="text-center sm:text-left">
                    <h3 className="text-lg sm:text-xl font-heading font-semibold text-foreground mb-3">
                      Personalized Guidance
                    </h3>
                    <p className="text-muted-foreground leading-relaxed">
                      Get customized advice based on your academic background, budget, and career goals. 
                      We'll create a tailored roadmap that maximizes your chances of success and 
                      helps you make informed decisions.
                    </p>
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row items-start space-y-4 sm:space-y-0 sm:space-x-6">
                  <div className="w-16 h-16 bg-secondary rounded-2xl flex items-center justify-center flex-shrink-0 mx-auto sm:mx-0">
                    <MessageCircle className="w-8 h-8 text-secondary-foreground" />
                  </div>
                  <div className="text-center sm:text-left">
                    <h3 className="text-lg sm:text-xl font-heading font-semibold text-foreground mb-3">
                      Free Consultation
                    </h3>
                    <p className="text-muted-foreground leading-relaxed">
                      No charges for the initial consultation. We'll discuss your options, 
                      answer your questions, and outline the next steps in your study abroad journey. 
                      Our goal is to provide value from the very first conversation.
                    </p>
                  </div>
                </div>
              </div>

              {/* Trust Indicators */}
              <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-4 sm:p-6 border border-white/20">
                <h3 className="text-base sm:text-lg font-heading font-semibold text-foreground mb-4 text-center">
                  Why Students Trust Us
                </h3>
                <div className="grid grid-cols-3 gap-2 sm:gap-4 text-center">
                  <div>
                    <div className="text-xl sm:text-2xl font-bold text-primary mb-1">500+</div>
                    <div className="text-xs sm:text-sm text-muted-foreground">Students Helped</div>
                  </div>
                  <div>
                    <div className="text-xl sm:text-2xl font-bold text-primary mb-1">98%</div>
                    <div className="text-xs sm:text-sm text-muted-foreground">Success Rate</div>
                  </div>
                  <div>
                    <div className="text-xl sm:text-2xl font-bold text-primary mb-1">24hrs</div>
                    <div className="text-xs sm:text-sm text-muted-foreground">Response Time</div>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Right Side - Form (2 columns) */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="lg:col-span-2 order-1 lg:order-2"
            >
              <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-2xl border border-white/20">
                <div className="text-center mb-6 sm:mb-8">
                  <h2 className="text-xl sm:text-2xl font-heading font-bold text-foreground mb-2">
                    Get Started Today
                  </h2>
                  <p className="text-sm sm:text-base text-muted-foreground">
                    Fill out the form below and we'll contact you within 24 hours
                  </p>
                </div>
                
                <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-6">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-semibold text-foreground mb-2">
                        Full Name *
                      </label>
                      <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                        required
                        className="w-full px-4 py-3 border-2 border-input rounded-xl focus:border-primary focus:outline-none transition-colors bg-background text-sm sm:text-base"
                        placeholder="Enter your full name"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-semibold text-foreground mb-2">
                        Phone Number *
                      </label>
                      <input
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={(e) => {
                          handleInputChange(e);
                          setErrors(prev => ({ ...prev, phone: '' }));
                        }}
                        onBlur={(e) => {
                          const error = validatePhone(e.target.value);
                          setErrors(prev => ({ ...prev, phone: error || '' }));
                        }}
                        required
                        className={`w-full px-4 py-3 border-2 rounded-xl focus:outline-none transition-colors bg-background text-sm sm:text-base ${
                          errors.phone ? 'border-red-500 focus:border-red-500' : 'border-input focus:border-primary'
                        }`}
                        placeholder="Enter your phone number"
                      />
                      {errors.phone && (
                        <p className="text-red-500 text-xs mt-1">{errors.phone}</p>
                      )}
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-foreground mb-2">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3 border-2 border-input rounded-xl focus:border-primary focus:outline-none transition-colors bg-background text-sm sm:text-base"
                      placeholder="Enter your email address"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-foreground mb-2">
                      Preferred Study Destination
                    </label>
                    <select
                      name="country"
                      value={formData.country}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border-2 border-input rounded-xl focus:border-primary focus:outline-none transition-colors bg-background text-sm sm:text-base"
                    >
                      <option value="">Select a country</option>
                      {countries.map(country => (
                        <option key={country} value={country}>{country}</option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-foreground mb-2">
                      Message (Optional)
                    </label>
                    <textarea
                      name="message"
                      value={formData.message}
                      onChange={handleInputChange}
                      rows={4}
                      className="w-full px-4 py-3 border-2 border-input rounded-xl focus:border-primary focus:outline-none transition-colors resize-none bg-background text-sm sm:text-base"
                      placeholder="Tell us about your study plans, preferred courses, or any specific questions..."
                    />
                  </div>

                  <motion.button
                    type="submit"
                    disabled={isSubmitting}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="w-full py-3 sm:py-4 bg-primary text-primary-foreground rounded-xl font-semibold text-base sm:text-lg hover:bg-primary/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed shadow-lg"
                  >
                    {isSubmitting ? (
                      <div className="flex items-center justify-center space-x-2">
                        <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                        <span>Submitting...</span>
                      </div>
                    ) : (
                      'Request Callback'
                    )}
                  </motion.button>
                </form>

                <div className="mt-4 sm:mt-6 text-center">
                  <p className="text-xs text-muted-foreground">
                    By submitting this form, you agree to our terms and conditions. 
                    We respect your privacy and will never share your information.
                  </p>
                  <div className="flex items-center justify-center space-x-2 sm:space-x-4 mt-4">
                    <div className="flex items-center space-x-1">
                      <div className="w-2 h-2 bg-green-500 rounded-full" />
                      <span className="text-xs text-muted-foreground">Secure</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <div className="w-2 h-2 bg-blue-500 rounded-full" />
                      <span className="text-xs text-muted-foreground">Confidential</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <div className="w-2 h-2 bg-purple-500 rounded-full" />
                      <span className="text-xs text-muted-foreground">No Spam</span>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default RequestCallback;