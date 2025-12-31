import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import './App.css';

// Pages
import Home from './pages/Home';
import GermanyTools from './pages/GermanyTools';
import Questionnaire from './pages/cost-calculator/Questionnaire';
import Expense from './pages/cost-calculator/Expense';
import CustomPackage from './pages/cost-calculator/CustomPackage';
import RequestCallback from './pages/cost-calculator/RequestCallback';
import GradeCalculator from './pages/grade-calculator/GradeCalculator';
import LetterHead from './pages/grade-calculator/LetterHead';
import Introduction from './pages/study-info/Introduction';
import HigherEducation from './pages/study-info/HigherEducation';
import AdmissionRequirements from './pages/study-info/AdmissionRequirements';
import LanguageRequirements from './pages/study-info/LanguageRequirements';
import StudentVisa from './pages/study-info/StudentVisa';
import StudentCities from './pages/study-info/StudentCities';
import TuitionFees from './pages/study-info/TuitionFees';
import WorkingInGermany from './pages/study-info/WorkingInGermany';

// Components
import Header from './components/Header';
import ScrollToTop from './components/ScrollToTop';

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-background">
        <Header />
        <AnimatePresence mode="wait">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/germany-tools" element={<GermanyTools />} />
            
            {/* Cost Calculator Routes */}
            <Route path="/cost-calculator/questionnaire" element={<Questionnaire />} />
            <Route path="/cost-calculator/expense" element={<Expense />} />
            <Route path="/cost-calculator/custom-package" element={<CustomPackage />} />
            <Route path="/cost-calculator/request-callback" element={<RequestCallback />} />
            
            {/* Grade Calculator Routes */}
            <Route path="/grade-calculator" element={<GradeCalculator />} />
            <Route path="/grade-calculator/letter-head" element={<LetterHead />} />
            
            {/* Study Info Routes */}
            <Route path="/study-info/introduction" element={<Introduction />} />
            <Route path="/study-info/higher-education" element={<HigherEducation />} />
            <Route path="/study-info/admission-requirements" element={<AdmissionRequirements />} />
            <Route path="/study-info/language-requirements" element={<LanguageRequirements />} />
            <Route path="/study-info/student-visa" element={<StudentVisa />} />
            <Route path="/study-info/student-cities" element={<StudentCities />} />
            <Route path="/study-info/tuition-fees" element={<TuitionFees />} />
            <Route path="/study-info/working-in-germany" element={<WorkingInGermany />} />
          </Routes>
        </AnimatePresence>
        <ScrollToTop />
      </div>
    </Router>
  );
}

export default App;