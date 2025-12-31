import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import studentsVideo from '../assets/video/students_loop.mp4';
import avatarYoungMan from '../assets/images/avatar-young-man.jpeg';
import avatarYoungWoman from '../assets/images/avatar-young-woman.jpeg';
import avatarStudent from '../assets/images/avatar-student-backpack.jpeg';

export const Hero = () => {
  const navigate = useNavigate();

  const scrollToCountries = () => {
    document.getElementById('country-list')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="relative min-h-[500px] sm:min-h-[600px] lg:min-h-[700px] bg-gradient-to-br from-[hsl(var(--hero-gradient-start))] to-[hsl(var(--hero-gradient-end))] overflow-hidden">
      <div className="container-app py-8 sm:py-12 lg:py-20">
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
          {/* Left Content */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="space-y-4 sm:space-y-6 relative order-2 lg:order-1"
          >
            {/* Floating Avatars - Responsive Layout */}
            <div className="w-full">
              <div className="flex flex-col sm:flex-row gap-2 sm:gap-3 lg:gap-4 mb-4 sm:mb-6 items-center sm:justify-center lg:justify-start">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.8, duration: 0.6 }}
                  className="inline-flex items-center space-x-1 sm:space-x-2 bg-primary text-primary-foreground px-3 sm:px-4 py-2 rounded-full text-xs sm:text-sm font-medium shadow-lg animate-float flex-shrink-0 w-full sm:w-auto justify-center sm:justify-start"
                >
                  <img src={avatarYoungMan} alt="Student" className="w-5 h-5 sm:w-6 sm:h-6 lg:w-8 lg:h-8 rounded-full flex-shrink-0" />
                  <span className="whitespace-nowrap text-center">Can I study in the UK?</span>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 1.1, duration: 0.6 }}
                  className="inline-flex items-center space-x-1 sm:space-x-2 bg-accent text-accent-foreground px-3 sm:px-4 py-2 rounded-full text-xs sm:text-sm font-medium shadow-lg animate-float flex-shrink-0 w-full sm:w-auto justify-center sm:justify-start"
                >
                  <img src={avatarYoungWoman} alt="Student" className="w-5 h-5 sm:w-6 sm:h-6 lg:w-8 lg:h-8 rounded-full flex-shrink-0" />
                  <span className="whitespace-nowrap text-center">What's the process like?</span>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 1.4, duration: 0.6 }}
                  className="inline-flex items-center space-x-1 sm:space-x-2 bg-secondary text-secondary-foreground px-3 sm:px-4 py-2 rounded-full text-xs sm:text-sm font-medium shadow-lg animate-float flex-shrink-0 w-full sm:w-auto justify-center sm:justify-start"
                >
                  <img src={avatarStudent} alt="Student" className="w-5 h-5 sm:w-6 sm:h-6 lg:w-8 lg:h-8 rounded-full flex-shrink-0" />
                  <span className="whitespace-nowrap text-center">Do I need IELTS?</span>
                </motion.div>
              </div>
            </div>

            <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-heading font-black text-foreground leading-tight text-center lg:text-left">
              Your Dream to Study Abroad Starts Here!
            </h1>

            <p className="text-base sm:text-lg text-muted-foreground leading-relaxed text-center lg:text-left max-w-xl mx-auto lg:mx-0">
              We help aspiring students unlock opportunities at top international universities.
              Let us guide you through every step – from planning to admission.
            </p>

            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 items-center justify-center lg:justify-start">
              <button
                onClick={() => navigate('/cost-calculator/request-callback')}
                className="w-full sm:w-auto px-6 sm:px-8 py-3 bg-primary text-primary-foreground rounded-full font-semibold hover:bg-primary/90 transition-colors text-center"
              >
                Request Callback
              </button>
              <button
                onClick={scrollToCountries}
                className="w-full sm:w-auto px-6 sm:px-8 py-3 border-2 border-primary text-primary rounded-full font-semibold hover:bg-primary hover:text-primary-foreground transition-colors text-center"
              >
                Estimate
              </button>
            </div>
          </motion.div>

          {/* Right Content - Video */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative order-1 lg:order-2"
          >
            <div className="relative rounded-2xl overflow-hidden shadow-2xl max-w-md mx-auto lg:max-w-none">
              <video
                autoPlay
                muted
                loop
                playsInline
                className="w-full h-auto"
              >
                <source src={studentsVideo} type="video/mp4" />
                Your browser does not support the video tag.
              </video>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
