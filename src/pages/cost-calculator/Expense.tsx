import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Download, Calculator, Check } from 'lucide-react';
import { useScrollToTop } from '../../hooks/useScrollToTop';
import { API_ENDPOINTS, postData } from '../../config/api';
import { validateName, validateEmail, validatePhone, formatPhoneNumber } from '../../utils/validation';

interface ExpenseBreakdown {
  accommodation: number;
  food: number;
  transport: number;
  leisure: number;
  mobile: number;
  miscellaneous: number;
  total: number;
}

const Expense = () => {
  const navigate = useNavigate();
  useScrollToTop(); // Scroll to top when component mounts

  const [expenses, setExpenses] = useState<ExpenseBreakdown | null>(null);
  const [loading, setLoading] = useState(true);
  const [showSignIn, setShowSignIn] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: ''
  });
  const [errors, setErrors] = useState({
    name: '',
    email: '',
    phone: ''
  });
  const selectedCountry = sessionStorage.getItem('selectedCountry') || 'Germany';
  const answers = JSON.parse(sessionStorage.getItem('questionnaireAnswers') || '{}');

  // Cost calculation logic based on JSON data and API
  const calculateExpenses = async () => {
    try {
      // Fetch cost data from JSON file or API
      const response = await fetch('/cost_data.json');
      const costData = await response.json();
      
      const countryKey = selectedCountry.toLowerCase().replace(' ', '_');
      const countryCosts = costData[countryKey] || costData['germany']; // fallback to Germany
      
      // Helper function to get the lowest cost from structure
      const getLowestCostFromStructure = (costObj: any) => {
        if (typeof costObj === 'object' && !Array.isArray(costObj)) {
          // New structure with question-based costs - find the lowest minimum value
          let lowestMin = Infinity;
          Object.keys(costObj).forEach(key => {
            if (Array.isArray(costObj[key]) && costObj[key].length >= 2) {
              lowestMin = Math.min(lowestMin, costObj[key][0]); // Take the minimum value
            }
          });
          return lowestMin === Infinity ? 0 : lowestMin;
        } else if (Array.isArray(costObj)) {
          // Old structure - simple array, take minimum
          return costObj[0];
        }
        return 0;
      };
      
      // Calculate based on lowest possible costs for the country
      const accommodation = getLowestCostFromStructure(countryCosts.rent);
      const food = getLowestCostFromStructure(countryCosts.food);
      const transport = getLowestCostFromStructure(countryCosts.transport);
      const miscellaneous = getLowestCostFromStructure(countryCosts.misc);
      
      const leisure = 30; // minimum leisure cost
      const mobile = 20; // minimum mobile cost

      const total = accommodation + food + transport + leisure + mobile + miscellaneous;

      return {
        accommodation,
        food,
        transport,
        leisure,
        mobile,
        miscellaneous,
        total
      };
    } catch (error) {
      console.error('Error fetching cost data:', error);
      // Fallback to hardcoded values if API fails
      return {
        accommodation: 400,
        food: 250,
        transport: 80,
        leisure: 50,
        mobile: 25,
        miscellaneous: 100,
        total: 905
      };
    }
  };





  useEffect(() => {
    const fetchExpenses = async () => {
      const calculatedExpenses = await calculateExpenses();
      setExpenses(calculatedExpenses);
      setLoading(false);
    };
    
    setTimeout(fetchExpenses, 2000);
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
    setErrors(prev => ({
      ...prev,
      [e.target.name]: ''
    }));
  };

  const handleInputBlur = (field: string) => {
    let error = '';
    if (field === 'name') error = validateName(formData.name) || '';
    if (field === 'email') error = validateEmail(formData.email) || '';
    if (field === 'phone') error = validatePhone(formData.phone) || '';
    setErrors(prev => ({ ...prev, [field]: error }));
  };

  const saveUserDataToCostCalculatorDB = async (userData: any, formattedPhone: string) => {
    try {
      await postData(API_ENDPOINTS.COST_CALCULATOR.USER_DETAILS, {
        name: userData.name,
        email: userData.email,
        phone: formattedPhone,
        intent: 'cost_calculator_report'
      });
      console.log('Cost calculator user data saved successfully');
    } catch (error) {
      console.error('Error saving cost calculator user data:', error);
      // Continue with PDF generation even if database save fails
    }
  };

  const generateCostReport = async (userData: any) => {
    try {
      const response = await fetch(API_ENDPOINTS.COST_CALCULATOR.DOWNLOAD_PDF, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify({
          name: userData.name,
          email: userData.email,
          phone: userData.phone,
          expenses,
          selectedCountry,
          answers
        })
      });

      if (!response.ok) {
        throw new Error('Failed to generate PDF');
      }

      // Create blob from response and download
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = `Cost_Report_${userData.name.replace(/\s+/g, '_')}.pdf`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error('Error generating PDF:', error);
      alert('Error generating PDF report');
    }
  };


  const expenseCategories = [
    { key: 'accommodation', label: 'Accommodation', icon: '🏠', color: 'bg-blue-500' },
    { key: 'food', label: 'Food & Dining', icon: '🍽️', color: 'bg-green-500' },
    { key: 'transport', label: 'Transportation', icon: '🚌', color: 'bg-yellow-500' },
    { key: 'leisure', label: 'Leisure & Entertainment', icon: '🎬', color: 'bg-purple-500' },
    { key: 'mobile', label: 'Mobile & Internet', icon: '📱', color: 'bg-pink-500' },
    { key: 'miscellaneous', label: 'Miscellaneous', icon: '💼', color: 'bg-gray-500' }
  ];

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

              // Validate all fields
              const nameError = validateName(formData.name);
              const emailError = validateEmail(formData.email);
              const phoneError = validatePhone(formData.phone);

              setErrors({
                name: nameError || '',
                email: emailError || '',
                phone: phoneError || ''
              });

              // If there are validation errors, don't submit
              if (nameError || emailError || phoneError) {
                return;
              }

              const formattedPhone = formatPhoneNumber(formData.phone);

              // Save user data to cost calculator database
              await saveUserDataToCostCalculatorDB(formData, formattedPhone);

              // Store user data locally
              sessionStorage.setItem('userData', JSON.stringify(formData));

              // Generate and download cost calculator report
              generateCostReport({
                ...formData,
                phone: formattedPhone,
                expenses,
                selectedCountry,
                answers
              });

              // Close form
              setShowSignIn(false);
            }} className="space-y-4">
              <div>
                <label className="block text-sm font-semibold mb-2">Full Name*</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  onBlur={() => handleInputBlur('name')}
                  required
                  className={`w-full px-4 py-3 border rounded-lg focus:outline-none ${
                    errors.name ? 'border-red-500 focus:border-red-500' : 'border-input focus:border-primary'
                  }`}
                  placeholder="Enter your full name"
                />
                {errors.name && (
                  <p className="text-red-500 text-xs mt-1">{errors.name}</p>
                )}
              </div>
              <div>
                <label className="block text-sm font-semibold mb-2">Email*</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  onBlur={() => handleInputBlur('email')}
                  required
                  className={`w-full px-4 py-3 border rounded-lg focus:outline-none ${
                    errors.email ? 'border-red-500 focus:border-red-500' : 'border-input focus:border-primary'
                  }`}
                  placeholder="Enter your email"
                />
                {errors.email && (
                  <p className="text-red-500 text-xs mt-1">{errors.email}</p>
                )}
              </div>
              <div>
                <label className="block text-sm font-semibold mb-2">Phone Number*</label>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                  onBlur={() => handleInputBlur('phone')}
                  required
                  className={`w-full px-4 py-3 border rounded-lg focus:outline-none ${
                    errors.phone ? 'border-red-500 focus:border-red-500' : 'border-input focus:border-primary'
                  }`}
                  placeholder="Enter your phone number"
                />
                {errors.phone && (
                  <p className="text-red-500 text-xs mt-1">{errors.phone}</p>
                )}
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

  if (loading) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="min-h-screen pt-20 bg-gradient-to-br from-[hsl(var(--hero-gradient-start))] to-[hsl(var(--hero-gradient-end))] flex items-center justify-center"
      >
        <div className="text-center">
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
            className="w-16 h-16 border-4 border-primary border-t-transparent rounded-full mx-auto mb-4"
          />
          <h2 className="text-2xl font-heading font-bold text-foreground mb-2">Calculating Your Expenses</h2>
          <p className="text-muted-foreground">Please wait while we process your preferences...</p>
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
          onClick={() => navigate('/cost-calculator/questionnaire')}
          className="flex items-center space-x-2 text-muted-foreground hover:text-foreground transition-colors mb-8"
        >
          <ArrowLeft className="w-5 h-5" />
          <span>Back to Questions</span>
        </motion.button>

        {/* Results Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl font-heading font-bold text-foreground mb-4">
            Your Monthly Expenses
          </h1>
          <p className="text-muted-foreground mb-2">
            Estimated costs for studying in <span className="font-semibold text-primary">{selectedCountry}</span>
          </p>
          <div className="inline-flex items-center space-x-2 bg-primary text-primary-foreground px-6 py-3 rounded-full font-bold text-2xl">
            <Calculator className="w-6 h-6" />
            <span>€{expenses?.total.toLocaleString()}/month</span>
          </div>
        </motion.div>

        {/* Expense Breakdown */}
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-white rounded-2xl shadow-2xl p-8 mb-8"
          >
            <h2 className="text-2xl font-heading font-bold mb-6">Expense Breakdown</h2>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {expenseCategories.map((category, index) => {
                const amount = expenses?.[category.key as keyof ExpenseBreakdown] || 0;
                const percentage = expenses ? (amount / expenses.total) * 100 : 0;

                return (
                  <motion.div
                    key={category.key}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.1 * index }}
                    className="bg-card rounded-xl p-6 border border-border hover:shadow-lg transition-shadow"
                  >
                    <div className="flex items-center space-x-3 mb-4">
                      <div className={`w-12 h-12 ${category.color} rounded-xl flex items-center justify-center text-white text-xl`}>
                        {category.icon}
                      </div>
                      <div>
                        <h3 className="font-semibold text-card-foreground">{category.label}</h3>
                        <p className="text-sm text-muted-foreground">{percentage.toFixed(1)}% of total</p>
                      </div>
                    </div>
                    <div className="text-2xl font-bold text-primary">€{amount.toLocaleString()}</div>
                    <div className="w-full bg-muted rounded-full h-2 mt-3">
                      <motion.div
                        className={`h-2 rounded-full ${category.color}`}
                        initial={{ width: 0 }}
                        animate={{ width: `${percentage}%` }}
                        transition={{ delay: 0.5 + (0.1 * index), duration: 0.8 }}
                      />
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </motion.div>

          {/* Action Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="flex flex-col sm:flex-row gap-4 justify-center mb-8"
          >
            <button
              onClick={() => {
                // Show download form
                setShowSignIn(true);
              }}
              className="flex items-center justify-center space-x-2 bg-secondary text-secondary-foreground px-8 py-3 rounded-full font-semibold hover:bg-secondary/90 transition-colors"
            >
              <Download className="w-5 h-5" />
              <span>Download Expense Report</span>
            </button>
          </motion.div>

          {/* Package Cards */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-7xl mx-auto mb-8"
          >
            {/* Starter Package */}
            <div className="bg-white rounded-2xl p-6 shadow-lg border border-border hover:shadow-xl transition-shadow h-full flex flex-col">
              {/* Heading + subtitle */}
              <div className="text-center mb-2">
                <h3 className="text-xl font-heading font-bold text-card-foreground mb-2">
                  Starter
                </h3>
                <p className="text-sm text-muted-foreground">Gets You Going!</p>
              </div>

              {/* Price – only this is moved down */}
              <div className="text-center pt-6 mb-5">
                <div className="text-2xl font-bold text-primary">
                  <span className="text-lg line-through text-muted-foreground">
                    ₹59,999
                  </span>
                  <br />
                  ₹49,999
                </div>
              </div>

              {/* Services Included button – aligned independently */}
              <div className="mb-4">
                <button className="w-full bg-primary text-primary-foreground py-2 px-4 rounded-lg font-semibold hover:bg-primary/90 transition-colors">
                  Services Included
                </button>
              </div>

              {/* Services list */}
              <ul className="text-sm space-y-2 text-muted-foreground flex-1">
                <li className="flex items-start space-x-2">
                  <Check className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                  <span>Career Counselling & Pre-Application Assistance</span>
                </li>
                <li className="flex items-start space-x-2">
                  <Check className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                  <span>Detailed Profile Evaluation</span>
                </li>
                <li className="flex items-start space-x-2">
                  <Check className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                  <span>1:1 Mentorship & Document Analysis</span>
                </li>
                <li className="flex items-start space-x-2">
                  <Check className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                  <span>Application to up to 6 Universities</span>
                </li>
                <li className="flex items-start space-x-2">
                  <Check className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                  <span>University Offer Guarantee</span>
                </li>
              </ul>
            </div>


            {/* Foundation Package */}
            <div className="bg-white rounded-2xl p-6 shadow-lg border border-border hover:shadow-xl transition-shadow h-full flex flex-col">
              <div className="text-center mb">
                <h3 className="text-xl font-heading font-bold text-card-foreground mb-2">FOUNDATION</h3>
                <p className="text-sm text-muted-foreground mb-4">Everything in Starter, and more:</p>
                <div className="text-2xl font-bold text-primary mb-4">
                  <span className="text-lg line-through text-muted-foreground">₹2,99,999</span><br />
                  ₹2,49,999
                </div>
                <div className="mb-4">
                  <button className="w-full bg-primary text-primary-foreground py-2 px-4 rounded-lg font-semibold hover:bg-primary/90 transition-colors">
                    Services Included
                  </button>
                </div>
              </div>
              <ul className="text-sm space-y-2 text-muted-foreground flex-1">
                <li className="flex items-start space-x-2">
                  <Check className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                  <span>APS Certification Support (Fees Included ₹18,000)</span>
                </li>
                <li className="flex items-start space-x-2">
                  <Check className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                  <span>IELTS / TOEFL Demo Class & Hybrid Training</span>
                </li>
                <li className="flex items-start space-x-2">
                  <Check className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                  <span>A1-A2 German Language Training</span>
                </li>
                <li className="flex items-start space-x-2">
                  <Check className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                  <span>Blocked Account Opening</span>
                </li>
                <li className="flex items-start space-x-2">
                  <Check className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                  <span>Travel Insurance (2 years)</span>
                </li>
              </ul>
            </div>

            {/* Campus Ready Package */}
            <div className="relative bg-gradient-to-br from-blue-900 to-blue-700 text-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-shadow h-full flex flex-col">
              {/* BEST VALUE badge centered */}
              <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-accent text-accent-foreground px-3 py-1 rounded-full text-xs font-bold">
                BEST VALUE
              </div>

              <div className="text-center mb-4">
                <h3 className="text-xl font-heading font-bold mb-2">CAMPUS READY</h3>
                <p className="text-sm text-blue-200 mb-4">Starter + Foundation + more</p>
                <div className="text-2xl font-bold mb-4">
                  <span className="text-lg line-through text-blue-300">₹5,49,999</span>
                  <br />
                  ₹4,99,999
                </div>
                <button className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg font-semibold hover:bg-blue-500 transition-colors">
                  Services Included
                </button>
              </div>

              <ul className="text-sm space-y-2 text-blue-100 flex-1">
                <li className="flex items-start space-x-2">
                  <Check className="w-4 h-4 text-green-400 mt-0.5 flex-shrink-0" />
                  <span>Extended Language Training (B1, B2, C1, C2)</span>
                </li>
                <li className="flex items-start space-x-2">
                  <Check className="w-4 h-4 text-green-400 mt-0.5 flex-shrink-0" />
                  <span>Blocked Account Funding (~€11,902)</span>
                </li>
                <li className="flex items-start space-x-2">
                  <Check className="w-4 h-4 text-green-400 mt-0.5 flex-shrink-0" />
                  <span>Accommodation Guarantee</span>
                </li>
                <li className="flex items-start space-x-2">
                  <Check className="w-4 h-4 text-green-400 mt-0.5 flex-shrink-0" />
                  <span>24/7 Hotline Support</span>
                </li>
                <li className="flex items-start space-x-2">
                  <Check className="w-4 h-4 text-green-400 mt-0.5 flex-shrink-0" />
                  <span>Post-Master&apos;s Support (2 Years)</span>
                </li>
              </ul>
            </div>


            {/* All Inclusive Package */}
            <div className="bg-white rounded-2xl p-6 shadow-lg border-2 border-primary hover:shadow-xl transition-shadow h-full flex flex-col">
              {/* Heading + subtitle */}
              <div className="text-center mb-2">
                <h3 className="text-xl font-heading font-bold text-card-foreground mb-2">
                  ALL INCLUSIVE
                </h3>
                <p className="text-sm text-muted-foreground">With Accommodation</p>
              </div>

              {/* Price – moved down with padding */}
              <div className="text-center pt-6 mb-5">
                <div className="text-2xl font-bold text-primary">
                  <span className="text-lg line-through text-muted-foreground">
                    ₹16,99,999
                  </span>
                  <br />
                  ₹14,99,999
                </div>
              </div>

              {/* Services Included button – independent of price */}
              <div className="mb-4">
                <button className="w-full bg-primary text-primary-foreground py-2 px-4 rounded-lg font-semibold hover:bg-primary/90 transition-colors">
                  Services Included
                </button>
              </div>

              {/* Services list */}
              <ul className="text-sm space-y-2 text-muted-foreground flex-1">
                <li className="flex items-start space-x-2">
                  <Check className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                  <span>Guaranteed accommodation in university city</span>
                </li>
                <li className="flex items-start space-x-2">
                  <Check className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                  <span>Free public transport pass assistance</span>
                </li>
                <li className="flex items-start space-x-2">
                  <Check className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                  <span>Rental agreement documentation</span>
                </li>
                <li className="flex items-start space-x-2">
                  <Check className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                  <span>24/7 HOTLINE service</span>
                </li>
              </ul>
            </div>

          </motion.div>

          {/* Customize Package Button */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8 }}
            className="text-center"
          >
            <p className="text-muted-foreground mb-4">
              Choose the best plan to make your study abroad journey smooth and successful.
            </p>
            <button
              onClick={() => navigate('/cost-calculator/custom-package')}
              className="inline-flex items-center space-x-2 bg-gradient-to-r from-primary to-primary/80 text-primary-foreground px-8 py-4 rounded-full font-bold text-lg hover:from-primary/90 hover:to-primary/70 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105"
            >
              <span className="animate-pulse">➔</span>
              <span>Customize Package</span>
            </button>
          </motion.div>

          {/* Additional Info */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8 }}
            className="mt-12 bg-accent/10 rounded-xl p-6 text-center"
          >
            <h3 className="text-lg font-heading font-semibold mb-3">Important Note</h3>
            <p className="text-muted-foreground text-sm">
              These are estimated costs based on your preferences. Actual expenses may vary depending on
              your lifestyle, location within the country, and current market conditions. We recommend
              budgeting an additional 10-15% for unexpected expenses.
            </p>
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
};

export default Expense;
