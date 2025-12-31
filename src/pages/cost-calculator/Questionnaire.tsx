import { useState} from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, ChevronRight, ChevronLeft } from 'lucide-react';
import { useScrollToTop } from '../../hooks/useScrollToTop';

interface QuestionnaireData {
  country: string;
  courseType: string;
  intake: string;
  accommodation: string;
  foodHabits: string;
  transport: string;
  leisure: string;
  mobile: string;
}

const Questionnaire = () => {
  const navigate = useNavigate();
  useScrollToTop(); // Scroll to top when component mounts
  
  const selectedCountry = sessionStorage.getItem('selectedCountry') || 'Germany';
  const [currentStep, setCurrentStep] = useState(0);
  const [answers, setAnswers] = useState<QuestionnaireData>({
    country: selectedCountry,
    courseType: '',
    intake: '',
    accommodation: '',
    foodHabits: '',
    transport: '',
    leisure: '',
    mobile: ''
  });

  const questions = [
    {
      id: 'courseType',
      title: 'What type of course are you planning to pursue?',
      options: [
        { value: 'bachelor', label: 'Bachelor\'s Degree', image: '/src/assets/images/higher_education.png' },
        { value: 'master', label: 'Master\'s Degree', image: '/src/assets/images/higher_education.png' }
      ]
    },
    {
      id: 'intake',
      title: 'Which intake are you targeting?',
      options: [
        { value: 'summer', label: 'Summer Intake', image: '/src/assets/images/summer_intake.jpeg' },
        { value: 'winter', label: 'Winter Intake', image: '/src/assets/images/winter_intake.jpeg' }
      ]
    },
    {
      id: 'accommodation',
      title: 'What type of accommodation do you prefer?',
      options: [
        { value: 'on_campus', label: 'On-Campus Housing', image: '/src/assets/images/on_campus.png' },
        { value: 'off_campus', label: 'Off-Campus Apartment', image: '/src/assets/images/off_campus.png' },
        { value: 'shared', label: 'Shared Accommodation', image: '/src/assets/images/shared.jpeg' },
        { value: 'studio', label: 'Studio Apartment', image: '/src/assets/images/studio.jpeg' },
        { value: 'private_hostel', label: 'Private Hostel', image: '/src/assets/images/private_hostel.png' },
        { value: 'co_living', label: 'Co-living Space', image: '/src/assets/images/co-living.jpeg' }
      ]
    },
    {
      id: 'foodHabits',
      title: 'What are your food preferences?',
      options: [
        { value: 'cook_own', label: 'Cook by Myself', image: '/src/assets/images/cook_by_own.png' },
        { value: 'eat_outside', label: 'Eat Outside', image: '/src/assets/images/eat_outside.png' },
        { value: 'meal_plan', label: 'University Meal Plan', image: '/src/assets/images/meal_plan.png' }
      ]
    },
    {
      id: 'transport',
      title: 'How do you plan to commute?',
      options: [
        { value: 'public_transport', label: 'Public Transport', image: '/src/assets/images/public_transport.png' },
        { value: 'bicycle', label: 'Bicycle', image: '/src/assets/images/bicycle.png' },
        { value: 'taxi', label: 'Taxi/Uber', image: '/src/assets/images/taxi.png' }
      ]
    },
    {
      id: 'leisure',
      title: 'What leisure activities interest you?',
      options: [
        { value: 'gym', label: 'Gym Membership', image: '/src/assets/images/gym.png' },
        { value: 'movies', label: 'Movies & Entertainment', image: '/src/assets/images/movie.png' },
        { value: 'friends', label: 'Social Activities', image: '/src/assets/images/friends.png' }
      ]
    },
    {
      id: 'mobile',
      title: 'What mobile plan do you prefer?',
      options: [
        { value: 'basic_plan', label: 'Basic Plan', image: '/src/assets/images/wifi.png' },
        { value: 'premium_plan', label: 'Premium Plan', image: '/src/assets/images/wifi.png' }
      ]
    }
  ];

  const handleAnswer = (questionId: string, value: string) => {
    setAnswers(prev => ({ ...prev, [questionId]: value }));
    
    // Scroll to top for next question
    window.scrollTo({ top: 0, behavior: 'smooth' });
    
    setTimeout(() => {
      if (currentStep < questions.length - 1) {
        setCurrentStep(prev => prev + 1);
      } else {
        // Store answers and navigate to results
        sessionStorage.setItem('questionnaireAnswers', JSON.stringify(answers));
        navigate('/cost-calculator/expense');
      }
    }, 500);
  };

  const handleNext = () => {
    if (currentStep < questions.length - 1) {
      window.scrollTo({ top: 0, behavior: 'smooth' });
      setCurrentStep(prev => prev + 1);
    }
  };

  const handlePrevious = () => {
    if (currentStep > 0) {
      window.scrollTo({ top: 0, behavior: 'smooth' });
      setCurrentStep(prev => prev - 1);
    }
  };

  const getAnsweredCount = () => {
    const answeredQuestions = questions.slice(0, currentStep + 1).filter(q => 
      answers[q.id as keyof QuestionnaireData] !== ''
    );
    return answeredQuestions.length;
  };

  const currentQuestion = questions[currentStep];
  const progress = ((currentStep + 1) / questions.length) * 100;

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
          className="flex items-center space-x-2 text-foreground hover:text-primary transition-colors mb-8"
        >
          <ArrowLeft className="w-5 h-5" />
          <span>Back to Home</span>
        </motion.button>

        {/* Progress Bar */}
        <div className="max-w-2xl mx-auto mb-8">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center space-x-2">
              <div className="bg-white/20 rounded-full px-3 py-1">
                <span className="text-foreground text-sm font-medium">
                  {getAnsweredCount()}/{questions.length} Answered
                </span>
              </div>
            </div>
            <div className="bg-white/20 rounded-full px-3 py-1">
              <span className="text-foreground text-sm font-medium">
                Question {currentStep + 1} of {questions.length}
              </span>
            </div>
          </div>
          <div className="bg-white/20 rounded-full h-3 overflow-hidden">
            <motion.div
              className="h-full bg-gradient-to-r from-primary to-accent"
              initial={{ width: 0 }}
              animate={{ width: `${progress}%` }}
              transition={{ duration: 0.5 }}
            />
          </div>
        </div>

        {/* Question Card */}
        <AnimatePresence mode="wait">
          <motion.div
            key={currentStep}
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -50 }}
            transition={{ duration: 0.5 }}
            className="max-w-4xl mx-auto"
          >
            <div className="bg-white/95 backdrop-blur-md rounded-2xl p-8 shadow-2xl">
              <h2 className="text-2xl font-heading font-bold text-center mb-8 text-foreground">
                {currentQuestion.title}
              </h2>
              
              <div className={`grid gap-6 ${currentQuestion.options.length === 2 ? 'grid-cols-1 md:grid-cols-2 justify-items-center max-w-2xl mx-auto' : currentQuestion.options.length % 2 === 1 ? 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3 justify-items-center' : 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3'}`}>
                {currentQuestion.options.map((option, index) => (
                  <motion.button
                    key={option.value}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, delay: index * 0.1 }}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => handleAnswer(currentQuestion.id, option.value)}
                    className={`bg-card rounded-xl p-6 border-2 transition-all duration-300 group ${
                      answers[currentQuestion.id as keyof QuestionnaireData] === option.value
                        ? 'border-primary bg-primary/5'
                        : 'border-border hover:border-primary'
                    }`}
                  >
                    <div className="text-center space-y-4">
                      <div className="w-20 h-20 mx-auto rounded-xl overflow-hidden bg-muted">
                        <img
                          src={option.image}
                          alt={option.label}
                          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                        />
                      </div>
                      <h3 className="font-semibold text-card-foreground">
                        {option.label}
                      </h3>
                      <ChevronRight className="w-5 h-5 mx-auto text-muted-foreground group-hover:text-primary transition-colors" />
                    </div>
                  </motion.button>
                ))}
              </div>

              {/* Navigation Buttons */}
              <div className="flex justify-between items-center mt-8">
                <motion.button
                  initial={{ opacity: 0 }}
                  animate={{ opacity: currentStep > 0 ? 1 : 0.5 }}
                  onClick={handlePrevious}
                  disabled={currentStep === 0}
                  className="flex items-center space-x-2 px-6 py-3 bg-primary text-primary-foreground rounded-xl font-semibold hover:bg-primary/90 transition-colors disabled:cursor-not-allowed disabled:opacity-50"
                >
                  <ChevronLeft className="w-5 h-5" />
                  <span>Previous</span>
                </motion.button>

                <motion.button
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  onClick={() => {
                    if (currentStep === questions.length - 1) {
                      sessionStorage.setItem('questionnaireAnswers', JSON.stringify(answers));
                      navigate('/cost-calculator/expense');
                    } else {
                      handleNext();
                    }
                  }}
                  className="flex items-center space-x-2 px-6 py-3 bg-primary text-primary-foreground rounded-xl font-semibold hover:bg-primary/90 transition-colors"
                >
                  <span>{currentStep === questions.length - 1 ? 'Finish' : 'Next'}</span>
                  <ChevronRight className="w-5 h-5" />
                </motion.button>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>

        {/* Country Info */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="max-w-2xl mx-auto mt-8 bg-white/90 backdrop-blur-md rounded-xl p-6 text-center"
        >
          <p className="text-muted-foreground">
            Calculating costs for: <span className="font-semibold text-primary">{selectedCountry}</span>
          </p>
      </motion.div>
      </div>
    </motion.div>
  );
};

export default Questionnaire;