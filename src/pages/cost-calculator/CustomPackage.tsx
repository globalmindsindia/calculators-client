import { useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Check, Download, ChevronDown, ChevronUp } from 'lucide-react';
import { useScrollToTop } from '../../hooks/useScrollToTop';
import { API_ENDPOINTS, postData } from '../../config/api';
import { validateName, validateEmail, validatePhone, formatPhoneNumber } from '../../utils/validation';

interface Package {
  id: string;
  name: string;
  description: string;
  features: string[];
  popular?: boolean;
}

const CustomPackage = () => {
  const navigate = useNavigate();
  useScrollToTop(); // Scroll to top when component mounts

  const [selectedPackages, setSelectedPackages] = useState<string[]>([]);
  const [showSignIn, setShowSignIn] = useState(false);
  const [expandedPackages, setExpandedPackages] = useState<string[]>([]);
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

  const packages: Package[] = [
    {
      id: 'passport',
      name: 'PASSPORT',
      description: 'Complete passport application and processing services',
      features: [
        'Review documents',
        'Generate login & File application',
        'Obtain appointment',
        'Followup police verification',
        'Dispatch status',
        'PASSPORT FEE INCLUDED',
      ],
    },
    {
      id: 'counselling',
      name: 'CAREER COUNSELLING & PRE-APPLICATION ASSISTANCE + UNIVERSITY APPLICATION',
      description: 'Comprehensive guidance for university selection and applications',
      features: [
        'Detailed profile evaluation',
        '1:1 Mentorship & document analysis',
        'Eligibility check',
        'Finalize desired country and course selection',
        'Evaluation and finalization of the budget',
        'Statement of purpose preparation & review',
        'Letter of recommendation preparation & review',
        'Letter of motivation preparation & review',
        'At least 1 university offer guaranteed (public / aided / private)',
        'CV writing & profile building',
        'Prepare IELTS and language preparation (Regarding training required or not)',
        'Doctor certificate - mandatory for sports medicine course',
        'Application for 6 universities',
        'Get information: Research the requirements for your chosen course',
        'Plan: Use checklists and deadlines to plan your application',
        'Prepare documents: certified copies of educational certificates',
        'Apply online: Register, Fill application, Upload documents',
        'Pay fees: Pay all application handling fees',
        'Send documents: certified copies by mail and post',
        'Track: Monitor application status with Uni-Assist and universities',
      ],
      popular: true,
    },
    {
      id: 'aps',
      name: 'APS CERTIFICATION',
      description: 'Academic evaluation and certification for German universities',
      features: [
        'APS Advice & Documentation ADVICE',
        'Application process',
        'Pay APS fee 18000 (included)',
        'Send post to Delhi',
        'For faster processing we depute our staff in New Delhi',
        'Getting APS certificate 4 to 6 weeks',
      ],
    },
    {
      id: 'language',
      name: 'IELTS / TOEFL + LANGUAGE TRAINING (German, French, Spain and more)',
      description: 'Complete language preparation and certification program',
      features: [
        'Mock test - 80 test series to ensure good score',
        'Training - hybrid training for better results - 2 months with all study materials',
        'Every mock test gets evaluated by trainer and exchange of feedback',
        'Experience Faculty with real time training and advice on every test',
        'Including exam fees',
        'Guidance for language Training',
        'Level -A1: Hybrid classes for 100 hrs, 4 days online and 1-day offline class',
        'Textbook and audio components, planner, study materials',
        'Including Exam Fees & Issue of Certificate',
        'Level - A2: Hybrid classes for 100 hrs, 4 days online and 1-day offline class',
        'Experience Faculty with real time training and advice',
      ],
      popular: true,
    },
    {
      id: 'visa',
      name: 'VISA PROCESS',
      description: 'Complete visa processing and financial assistance package',
      features: [
        'Visa Documentation Advice',
        'Visa questions & mock interview preparation',
        'Visa appointment via VFS portal inc global & courier charges',
        'Visa fee included',
      ],
    },
    {
      id: 'study-abroad-essentials',
      name: 'PRE AND POST TRAVEL ESSENTIALS',
      description: 'Additional support services for your study abroad journey',
      features: [
        'Travel kit: All students will be issued a travel essential kit',
        'Forex card: Prepaid forex card will be issued',
        'Scholarship: As per eligibility, if student qualifies',
        'Part time job: we provide assistance to get part-time jobs',
        'Tax registration: In Germany city registration appointment and documentation',
        'Bank Account: Both NRO and NRI A/c will be opened in India, in addition, German bank account will also be provided',
        'SIM card services: We provide Prepaid German SIM card',
        'Airport pickup: Available to drop off at your accommodation',
        'Germany law briefing',
        "Student's life in Germany briefing",
        "Assistance provided for work visa in respective chosen country, for an extra 2 years after completion of Master's",
      ],
    },

    /*
    {
      id: 'Accomodation',
      name: 'ACCOMMODATION & HOTLINE',
      description: 'Comprehensive accomdation support for your study abroad journey',
      price: 500,
      features: [
        'We provide accomodation',
        'Same city as University',
        'Assistance free pass public transport for the university that does not provide',
        'Issue rental agreement and help to get all documentation',
        'Those who take Accomodation with us, we provide 24/7 HOTLINE service to ensure students safty to parents',
      ],
    },
    */
   
    {
      id: 'others',
      name: 'OTHERS',
      description: 'Additional services for your study abroad journey',
      features: [
        'Financial Assistance : Education Loan upto 50 Lakhs (non colatral)',
        'All Govt schemes applicable depending on the criteria',
        'TRAVEL INSURANCE IN GERMANY- FOR 2 YEARS : Travel Insurance valid for 2 years (24 months) - Multiple entry. Mandatory requirement of Travel insurance for Visa Authority',
        'AIRTICKET - ANY DATE - ECONOMY : One way Travel Ticket, Reservation of the Seats (Travel class - Economy) and Includes 60+ Kg of check-in baggage + Hand luggage of 8kg',
        'Those who take Accomodation with us, we provide 24/7 HOTLINE service to ensure students safty to parents',
      ],
    },
  ];

  const handlePackageToggle = (packageId: string) => {
    setSelectedPackages((prev) =>
      prev.includes(packageId)
        ? prev.filter((id) => id !== packageId)
        : [...prev, packageId],
    );
  };

  const toggleExpanded = (packageId: string) => {
    setExpandedPackages((prev) =>
      prev.includes(packageId)
        ? prev.filter((id) => id !== packageId)
        : [...prev, packageId],
    );
  };

  const selectAll = () => {
    if (selectedPackages.length === packages.length) {
      setSelectedPackages([]);
    } else {
      setSelectedPackages(packages.map((p) => p.id));
    }
  };

  const handleProceed = async () => {
    if (selectedPackages.length === 0) {
      alert('Please select at least one package');
      return;
    }

    try {
      // Map frontend package IDs to backend bucket names
      const bucketMapping: { [key: string]: string } = {
        'passport': 'Bucket-1',
        'counselling': 'Bucket-2', 
        'aps': 'Bucket-3',
        'language': 'Bucket-4',
        'visa': 'Bucket-5',
        'study-abroad-essentials': 'Bucket-6',
        'others': 'Bucket-7'
      };

      const selectedBuckets = selectedPackages.map(packageId => bucketMapping[packageId]).filter(Boolean);
      console.log('Selected packages:', selectedPackages);
      console.log('Mapped buckets:', selectedBuckets);
      
      // Debug: Check if mapping is working correctly
      selectedPackages.forEach(packageId => {
        const bucket = bucketMapping[packageId];
        console.log(`Package '${packageId}' maps to '${bucket}'`);
        if (!bucket) {
          console.error(`No bucket mapping found for package: ${packageId}`);
        }
      });

      const response = await fetch(API_ENDPOINTS.COST_CALCULATOR.CALCULATE, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify({
          selected_buckets: selectedBuckets,
        }),
      });

      if (!response.ok) {
        console.error('Server error:', response.status, await response.text());
        alert('Error calculating package cost (server error). Please try again later.');
        return;
      }

      let parsedResult: any;
      try {
        parsedResult = await response.json();
        console.log('API Response:', parsedResult);
      } catch (parseError) {
        console.error('JSON Parse Error:', parseError);
        alert('Error: Invalid response from server');
        return;
      }

      sessionStorage.setItem('selectedPackages', JSON.stringify(selectedPackages));
      sessionStorage.setItem('selectedBuckets', JSON.stringify(selectedBuckets));
      sessionStorage.setItem('totalCost', parsedResult.total_cost?.toString() || '0');
      setShowSignIn(true);
    } catch (error) {
      console.error('Error:', error);
      alert('Error connecting to server');
    }
  };

  const generateCustomPackagePDF = async (formData: any, formattedPhone: string) => {
    try {
      const storedPackages = sessionStorage.getItem('selectedPackages');
      const storedBuckets = sessionStorage.getItem('selectedBuckets');

      console.log('Generating PDF with data:', {
        name: formData.name,
        email: formData.email,
        phone: formattedPhone,
        selectedPackages: storedPackages ? JSON.parse(storedPackages) : selectedPackages,
        selectedBuckets: storedBuckets ? JSON.parse(storedBuckets) : []
      });

      const requestBody = {
        name: formData.name,
        email: formData.email,
        phone: formattedPhone,
        selected_packages: storedPackages ? JSON.parse(storedPackages) : selectedPackages,
        selected_buckets: storedBuckets ? JSON.parse(storedBuckets) : [],
        // Send package details for PDF content
        package_details: (storedPackages ? JSON.parse(storedPackages) : selectedPackages).map((packageId: string) => {
          const pkg = packages.find(p => p.id === packageId);
          return pkg ? {
            id: pkg.id,
            name: pkg.name,
            description: pkg.description,
            features: pkg.features
          } : null;
        }).filter(Boolean)
      };
      
      console.log('PDF Request Body:', JSON.stringify(requestBody, null, 2));

      const response = await fetch(API_ENDPOINTS.COST_CALCULATOR.DOWNLOAD_CUSTOM_PACKAGE_PDF, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify(requestBody),
      });

      if (!response.ok) {
        throw new Error('Failed to generate PDF');
      }

      // Create blob from response
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = `Custom_Package_${formData.name.replace(/\s+/g, '_')}.pdf`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error('Error generating PDF:', error);
      alert('Error generating PDF report');
    }
  };

  const handleSignInSubmit = async (e: React.FormEvent) => {
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

    try {
      const formattedPhone = formatPhoneNumber(formData.phone);

      await postData(API_ENDPOINTS.COST_CALCULATOR.USER_DETAILS, {
        name: formData.name,
        email: formData.email,
        phone: formattedPhone,
        intent: 'viewed_package_details',
      });

      await generateCustomPackagePDF(formData, formattedPhone);
    } catch (error) {
      console.error('Error:', error);
      alert('Error downloading report');
    }

    setShowSignIn(false);
  };

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
            <h2 className="text-2xl font-heading font-bold text-center mb-6">
              Enter Your Details
            </h2>
            <form
              onSubmit={handleSignInSubmit}
              className="space-y-4"
            >
              <div>
                <label className="block text-sm font-semibold mb-2">
                  Full Name*
                </label>
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
                <label className="block text-sm font-semibold mb-2">
                  Email*
                </label>
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
                <label className="block text-sm font-semibold mb-2">
                  Phone Number*
                </label>
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
                  className="relative z-10 flex-1 py-3 bg-primary text-primary-foreground rounded-lg font-semibold hover:bg-primary/90 transition-colors cursor-pointer"
                >
                  Download Full Report
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
          onClick={() => navigate('/cost-calculator/expense')}
          className="flex items-center space-x-2 text-muted-foreground hover:text-foreground transition-colors mb-8"
        >
          <ArrowLeft className="w-5 h-5" />
          <span>Back to Results</span>
        </motion.button>

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-8"
        >
          <h1 className="text-4xl font-heading font-bold text-foreground mb-4">
            Choose Your Study Abroad Package
          </h1>
          <p className="text-muted-foreground max-w-2xl mx-auto mb-6">
            Select the services you need for your study abroad journey. Our
            comprehensive packages are designed to make your process smooth and
            hassle-free.
          </p>

          {/* Select All Button */}
          <div className="flex justify-center">
            <button
              onClick={selectAll}
              className="relative z-10 flex items-center space-x-2 bg-white/10 backdrop-blur-sm text-foreground px-6 py-3 rounded-full font-semibold hover:bg-white/20 transition-colors border border-white/20 cursor-pointer"
            >
              <Check className="w-5 h-5" />
              <span>
                {selectedPackages.length === packages.length
                  ? 'Deselect All'
                  : 'Select All'}
              </span>
            </button>
          </div>
        </motion.div>

        {/* Package Grid */}
        <div className="max-w-6xl mx-auto">
          <div className="space-y-4 mb-8">
            {packages.map((pkg, index) => {
              const isSelected = selectedPackages.includes(pkg.id);
              const isExpanded = expandedPackages.includes(pkg.id);

              return (
                <motion.div
                  key={pkg.id}
                  initial={{ opacity: 0, y: 50 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className={`relative bg-white rounded-2xl shadow-lg border-2 transition-all duration-300 ${
                    isSelected ? 'border-primary shadow-xl' : 'border-border'
                  } ${pkg.popular ? 'ring-2 ring-accent' : ''}`}
                >
                  {pkg.popular && (
                    <div className="absolute -top-3 left-1/2 transform -translate-x-1/2 z-10">
                      <span className="bg-accent text-accent-foreground px-3 py-1 rounded-full text-xs font-bold">
                        POPULAR
                      </span>
                    </div>
                  )}

                  {/* Package Header */}
                  <div
                    className="flex items-center justify-between p-6 cursor-pointer hover:bg-gray-50 transition-colors"
                    onClick={() => toggleExpanded(pkg.id)}
                  >
                    <div className="flex items-center space-x-4 flex-1">
                      <div
                        className={`w-6 h-6 rounded-full border-2 flex items-center justify-center cursor-pointer ${
                          isSelected ? 'bg-primary border-primary' : 'border-border'
                        }`}
                        onClick={(e) => {
                          e.stopPropagation();
                          handlePackageToggle(pkg.id);
                        }}
                      >
                        {isSelected && (
                          <Check className="w-4 h-4 text-white" />
                        )}
                      </div>

                      <div className="flex-1">
                        <h3 className="text-lg font-heading font-bold text-card-foreground uppercase">
                          {pkg.name}
                        </h3>
                        <p className="text-muted-foreground text-sm mt-1">
                          {pkg.description}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center space-x-4">
                      <div className="text-center">
                        <p className="text-sm text-muted-foreground italic">
                          Contact us for pricing details
                        </p>
                      </div>
                      {isExpanded ? (
                        <ChevronUp className="w-5 h-5 text-muted-foreground" />
                      ) : (
                        <ChevronDown className="w-5 h-5 text-muted-foreground" />
                      )}
                    </div>
                  </div>

                  {/* Package Content */}
                  <motion.div
                    initial={false}
                    animate={{
                      height: isExpanded ? 'auto' : 0,
                      opacity: isExpanded ? 1 : 0,
                    }}
                    transition={{ duration: 0.3 }}
                    className="overflow-hidden"
                  >
                    <div className="px-6 pb-6 border-t border-border">
                      <div className="pt-4">
                        <h4 className="font-semibold text-card-foreground mb-3">
                          Included Services:
                        </h4>
                        <div className="grid grid-cols-1 gap-2">
                          {pkg.features.map((feature, idx) => (
                            <div
                              key={idx}
                              className="flex items-start space-x-2 text-sm"
                            >
                              <Check className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                              <span className="text-muted-foreground">
                                {feature}
                              </span>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </motion.div>
                </motion.div>
              );
            })}
          </div>

          {/* Summary & Checkout */}
          {selectedPackages.length > 0 && (
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white rounded-2xl p-8 shadow-2xl"
            >
              <div className="text-center">
                <div className="mb-6">
                  <h3 className="text-xl font-heading font-bold mb-2">
                    Selected Packages ({selectedPackages.length})
                  </h3>
                  <div className="flex flex-wrap gap-2 justify-center mb-4">
                    {selectedPackages.map((packageId) => {
                      const pkg = packages.find((p) => p.id === packageId);
                      return (
                        <span
                          key={packageId}
                          className="bg-primary/10 text-primary px-3 py-1 rounded-full text-sm font-medium"
                        >
                          {pkg?.name}
                        </span>
                      );
                    })}
                  </div>
                  <div className="bg-accent/10 rounded-lg p-4 mb-6">
                    <p className="text-muted-foreground text-sm">
                      To see the total cost of selected services and receive the
                      complete package details, please click on &quot;Get Package
                      Details&quot; below.
                    </p>
                  </div>
                </div>

                <div className="flex justify-center">
                  <button
                    onClick={handleProceed}
                    className="relative z-10 flex items-center space-x-2 bg-primary text-primary-foreground px-8 py-3 rounded-full font-semibold hover:bg-primary/90 transition-colors cursor-pointer"
                  >
                    <Download className="w-5 h-5" />
                    <span>Get Package Details</span>
                  </button>
                </div>
              </div>
            </motion.div>
          )}
        </div>
      </div>
    </motion.div>
  );
};

export default CustomPackage;
