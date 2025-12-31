import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { Download, ArrowLeft } from 'lucide-react';
import { useScrollToTop } from '../../hooks/useScrollToTop';
import { API_ENDPOINTS, postData } from '../../config/api';

const LetterHead = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  useScrollToTop(); // Scroll to top when component mounts
  const [showSignIn, setShowSignIn] = useState(false);
  const [gradeData, setGradeData] = useState({
    bestGrade: '',
    minPassingGrade: '',
    yourGrade: '',
    germanGrade: ''
  });

  useEffect(() => {
    const bestGrade = searchParams.get('best_grade') || localStorage.getItem('best_grade') || '';
    const minPassingGrade = searchParams.get('min_passing_grade') || localStorage.getItem('min_passing_grade') || '';
    const yourGrade = searchParams.get('your_grade') || localStorage.getItem('your_grade') || '';
    const germanGrade = searchParams.get('german_grade') || localStorage.getItem('german_grade') || '';

    setGradeData({
      bestGrade,
      minPassingGrade,
      yourGrade,
      germanGrade
    });
  }, [searchParams]);

  const handleDownloadReport = () => {
    setShowSignIn(true);
  };

  const saveUserDataToDatabase = async (userData: any) => {
    try {
      await postData(API_ENDPOINTS.GRADE_CALCULATOR.USER_DETAILS, {
        name: userData.name,
        email: userData.email,
        phone: userData.phone
      });
      console.log('User data saved successfully');
    } catch (error) {
      console.error('Error saving user data:', error);
      // Continue with certificate generation even if database save fails
    }
  };

  const generateGradeCertificate = async (userData: any) => {
    try {
      const response = await fetch(API_ENDPOINTS.GRADE_CALCULATOR.DOWNLOAD_PDF, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify({
          name: userData.name,
          email: userData.email,
          phone: userData.phone,
          best_grade: gradeData.bestGrade,
          min_passing_grade: gradeData.minPassingGrade,
          your_grade: gradeData.yourGrade,
          german_grade: gradeData.germanGrade
        })
      });

      if (!response.ok) {
        throw new Error('Failed to generate certificate');
      }

      // Create blob from response and download
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = `Grade_Certificate_${userData.name.replace(/\s+/g, '_')}.pdf`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error('Error generating certificate:', error);
      alert('Error generating certificate');
    }
  };

  if (showSignIn) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="min-h-screen pt-20 bg-gradient-to-br from-[hsl(var(--hero-gradient-start))] to-[hsl(var(--hero-gradient-end))]"
      >
        <div className="container-app py-16">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-md mx-auto bg-white rounded-2xl p-8 shadow-2xl"
          >
            <h2 className="text-2xl font-heading font-bold text-center mb-6">Enter Your Details</h2>
            <form onSubmit={async (e) => {
              e.preventDefault();
              const formData = new FormData(e.target as HTMLFormElement);
              const data = Object.fromEntries(formData);

              // Save user data to database
              await saveUserDataToDatabase(data);

              // Store user data locally
              sessionStorage.setItem('gradeUserData', JSON.stringify(data));

              // Generate and download grade certificate
              generateGradeCertificate({
                ...data,
                ...gradeData
              });

              // Close form
              setShowSignIn(false);
            }} className="space-y-4">
              <div>
                <label className="block text-sm font-semibold mb-2">Full Name*</label>
                <input
                  type="text"
                  name="name"
                  required
                  className="w-full px-4 py-3 border border-input rounded-lg focus:border-primary focus:outline-none"
                  placeholder="Enter your full name"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold mb-2">Email*</label>
                <input
                  type="email"
                  name="email"
                  required
                  className="w-full px-4 py-3 border border-input rounded-lg focus:border-primary focus:outline-none"
                  placeholder="Enter your email"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold mb-2">Phone Number*</label>
                <input
                  type="tel"
                  name="phone"
                  required
                  className="w-full px-4 py-3 border border-input rounded-lg focus:border-primary focus:outline-none"
                  placeholder="Enter your phone number"
                />
              </div>
              <div className="flex space-x-4">
                <button
                  type="button"
                  onClick={() => setShowSignIn(false)}
                  className="flex-1 py-3 border border-border rounded-lg font-semibold hover:bg-muted transition-colors"
                >
                  Back
                </button>
                <button
                  type="submit"
                  className="flex-1 py-3 bg-primary text-primary-foreground rounded-lg font-semibold hover:bg-primary/90 transition-colors"
                >
                  Download Report
                </button>
              </div>
            </form>
          </motion.div>
        </div>
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
          onClick={() => navigate('/grade-calculator')}
          className="flex items-center space-x-2 text-muted-foreground hover:text-foreground transition-colors mb-8"
        >
          <ArrowLeft className="w-5 h-5" />
          <span>Back to Calculator</span>
        </motion.button>

        {/* Results Card */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="max-w-2xl mx-auto bg-white rounded-2xl shadow-2xl overflow-hidden"
        >
          {/* Header */}
          <div className="bg-primary text-primary-foreground p-8 text-center">
            <div className="flex items-center justify-center mb-4">
              <img 
                src="/src/assets/images/GMI_Logo_without Background.jpeg" 
                alt="GMI Logo" 
                className="h-16 w-auto"
              />
            </div>
            <h1 className="text-2xl font-heading font-bold">Grade Conversion Certificate</h1>
            <p className="text-primary-foreground/80 mt-2">Official German Grade Conversion</p>
          </div>

          {/* Content */}
          <div className="p-8 space-y-6">
            <div className="text-center">
              <h2 className="text-3xl font-heading font-bold text-primary mb-2">
                Your German Grade: {gradeData.germanGrade}
              </h2>
              <p className="text-muted-foreground">
                Based on the German grading system (1.0 - 4.0 scale)
              </p>
            </div>

            {/* Grade Details */}
            <div className="bg-muted/30 rounded-xl p-6 space-y-4">
              <h3 className="font-heading font-semibold text-lg mb-4">Conversion Details</h3>
              
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-white rounded-lg p-4">
                  <p className="text-sm text-muted-foreground">Maximum Grade</p>
                  <p className="text-xl font-semibold">{gradeData.bestGrade}</p>
                </div>
                <div className="bg-white rounded-lg p-4">
                  <p className="text-sm text-muted-foreground">Minimum Passing</p>
                  <p className="text-xl font-semibold">{gradeData.minPassingGrade}</p>
                </div>
                <div className="bg-white rounded-lg p-4">
                  <p className="text-sm text-muted-foreground">Your Grade</p>
                  <p className="text-xl font-semibold">{gradeData.yourGrade}</p>
                </div>
                <div className="bg-primary/10 rounded-lg p-4">
                  <p className="text-sm text-primary">German Equivalent</p>
                  <p className="text-xl font-bold text-primary">{gradeData.germanGrade}</p>
                </div>
              </div>
            </div>

            {/* Grade Scale Reference */}
            <div className="bg-accent/10 rounded-xl p-6">
              <h4 className="font-semibold mb-3">German Grading Scale Reference</h4>
              <div className="grid grid-cols-2 gap-2 text-sm">
                <div className="flex justify-between">
                  <span>1.0 - 1.5</span>
                  <span className="font-medium">Very Good (Sehr gut)</span>
                </div>
                <div className="flex justify-between">
                  <span>1.6 - 2.5</span>
                  <span className="font-medium">Good (Gut)</span>
                </div>
                <div className="flex justify-between">
                  <span>2.6 - 3.5</span>
                  <span className="font-medium">Satisfactory (Befriedigend)</span>
                </div>
                <div className="flex justify-between">
                  <span>3.6 - 4.0</span>
                  <span className="font-medium">Sufficient (Ausreichend)</span>
                </div>
              </div>
            </div>

            {/* Action Button */}
            <div className="flex justify-center">
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={handleDownloadReport}
                className="flex items-center justify-center space-x-2 bg-primary text-primary-foreground py-3 px-8 rounded-lg font-semibold hover:bg-primary/90 transition-colors"
              >
                <Download className="w-5 h-5" />
                <span>Download Report</span>
              </motion.button>
            </div>
          </div>
        </motion.div>

        {/* Additional Info */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="max-w-2xl mx-auto mt-8 bg-white/90 backdrop-blur-md rounded-xl p-6 text-center"
        >
          <h3 className="text-lg font-heading font-semibold mb-3">About This Conversion</h3>
          <p className="text-muted-foreground text-sm">
            This conversion uses the official German grade conversion formula as recognized by German universities. 
            The certificate can be used for university applications and official documentation.
          </p>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default LetterHead;