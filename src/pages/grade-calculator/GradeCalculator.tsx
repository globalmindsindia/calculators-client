import { useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { Calculator, ArrowLeft } from 'lucide-react';
import { useScrollToTop } from '../../hooks/useScrollToTop';
import { API_ENDPOINTS, postData } from '../../config/api';
import gradeCalculatorBg from '../../assets/images/Grade_calculator_Background.jpeg';

const GradeCalculator = () => {
  const navigate = useNavigate();
  useScrollToTop(); // Scroll to top when component mounts
  const [formData, setFormData] = useState({
    bestGrade: '',
    minPassingGrade: '',
    yourGrade: ''
  });
  const [result, setResult] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const calculateGermanGrade = async (bestGrade: number, minPassingGrade: number, yourGrade: number) => {
    try {
      const response = await postData(API_ENDPOINTS.GRADE_CALCULATOR.CALCULATE, {
        best_grade: bestGrade,
        min_passing_grade: minPassingGrade,
        your_grade: yourGrade
      });
      
      if (response.error) {
        return response.error;
      }
      
      return response.german_grade;
    } catch (error) {
      console.error('Error calculating German grade:', error);
      return 'Error calculating grade. Please try again.';
    }
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    setResult(null);
  };

  const handleCalculate = async () => {
    const bestGrade = parseFloat(formData.bestGrade);
    const minPassingGrade = parseFloat(formData.minPassingGrade);
    const yourGrade = parseFloat(formData.yourGrade);

    if (isNaN(bestGrade) || isNaN(minPassingGrade) || isNaN(yourGrade)) {
      setResult('Please fill in all grade fields with valid numbers.');
      return;
    }

    const inputs = [bestGrade, minPassingGrade, yourGrade];
    const allCGPA = inputs.every(val => val <= 10);
    const allPercentage = inputs.every(val => val >= 10 && val <= 100);

    if (!(allCGPA || allPercentage)) {
      setResult('Please enter all grades either in percentage (values >= 10 and <= 100) or CGPA scale (values <= 10). Do not mix formats.');
      return;
    }

    setIsLoading(true);
    
    try {
      const germanGrade = await calculateGermanGrade(bestGrade, minPassingGrade, yourGrade);
      
      if (typeof germanGrade === 'string') {
        setResult(germanGrade);
      } else {
        localStorage.setItem('best_grade', bestGrade.toString());
        localStorage.setItem('min_passing_grade', minPassingGrade.toString());
        localStorage.setItem('your_grade', yourGrade.toString());
        localStorage.setItem('german_grade', germanGrade.toString());
        
        navigate(`/grade-calculator/letter-head?best_grade=${bestGrade}&min_passing_grade=${minPassingGrade}&your_grade=${yourGrade}&german_grade=${germanGrade}`);
      }
    } catch (error) {
      setResult('Error calculating grade. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="min-h-screen pt-20"
      style={{
        backgroundImage: `url(${gradeCalculatorBg})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundAttachment: 'fixed'
      }}
    >
      <div className="absolute inset-0 bg-black/20 backdrop-blur-sm" />
      
      <div className="relative z-10 container-app py-16">
        {/* Back Button */}
        <motion.button
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          onClick={() => navigate('/germany-tools')}
          className="flex items-center space-x-2 text-white hover:text-accent transition-colors mb-8"
        >
          <ArrowLeft className="w-5 h-5" />
          <span>Back to Germany Tools</span>
        </motion.button>

        {/* Calculator Card */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="max-w-md mx-auto bg-white/95 backdrop-blur-md rounded-2xl p-8 shadow-2xl"
        >
          <div className="text-center mb-8">
            <div className="w-16 h-16 bg-primary rounded-2xl flex items-center justify-center mx-auto mb-4">
              <Calculator className="w-8 h-8 text-white" />
            </div>
            <h2 className="text-2xl font-heading font-bold text-primary">
              German Grade Calculator
            </h2>
          </div>

          <div className="space-y-6">
            <div>
              <label className="block text-sm font-semibold text-foreground mb-2">
                Max. score that can be attained in your course (GPA/Percentage)*
              </label>
              <input
                type="number"
                step="0.01"
                value={formData.bestGrade}
                onChange={(e) => handleInputChange('bestGrade', e.target.value)}
                placeholder="e.g., 10 or 100%"
                className="w-full px-4 py-3 border-2 border-input rounded-lg focus:border-primary focus:outline-none transition-colors"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-foreground mb-2">
                Min. score that can be attained in your course (GPA/Percentage)*
              </label>
              <input
                type="number"
                step="0.01"
                value={formData.minPassingGrade}
                onChange={(e) => handleInputChange('minPassingGrade', e.target.value)}
                placeholder="e.g., 4 or 35%"
                className="w-full px-4 py-3 border-2 border-input rounded-lg focus:border-primary focus:outline-none transition-colors"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-foreground mb-2">
                Score that you obtained in the course (GPA/Percentage)*
              </label>
              <input
                type="number"
                step="0.01"
                value={formData.yourGrade}
                onChange={(e) => handleInputChange('yourGrade', e.target.value)}
                placeholder="e.g., 8 or 75%"
                className="w-full px-4 py-3 border-2 border-input rounded-lg focus:border-primary focus:outline-none transition-colors"
              />
            </div>

            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={handleCalculate}
              disabled={isLoading}
              className="w-full py-3 bg-primary text-primary-foreground rounded-lg font-semibold hover:bg-primary/90 transition-colors disabled:opacity-50"
            >
              {isLoading ? 'Calculating...' : 'Calculate'}
            </motion.button>

            {result && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className={`text-center p-4 rounded-lg ${
                  typeof result === 'string' && result.includes('error') || result.includes('Invalid') || result.includes('below') || result.includes('above') || result.includes('Please')
                    ? 'bg-destructive/10 text-destructive'
                    : 'bg-primary/10 text-primary'
                }`}
              >
                <p className="font-semibold">{result}</p>
              </motion.div>
            )}
          </div>
        </motion.div>

        {/* Info Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="max-w-2xl mx-auto mt-12 bg-white/90 backdrop-blur-md rounded-xl p-6 text-center"
        >
          <h3 className="text-lg font-heading font-semibold mb-3">How it works</h3>
          <p className="text-muted-foreground text-sm">
            Enter your grading system details and your obtained grade. Our calculator will convert 
            it to the German grading system (1.0 - 4.0 scale) using the official conversion formula.
          </p>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default GradeCalculator;