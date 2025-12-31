import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { Calculator, GraduationCap, ArrowLeft } from 'lucide-react';
import { useScrollToTop } from '../hooks/useScrollToTop';

const GermanyTools = () => {
  const navigate = useNavigate();
  useScrollToTop(); // Scroll to top when component mounts

  const tools = [
    {
      title: 'Cost Calculator',
      description: 'Calculate your monthly living expenses and study costs in Germany',
      icon: Calculator,
      color: 'bg-primary',
      hoverColor: 'hover:bg-primary/90',
      onClick: () => {
        sessionStorage.setItem('selectedCountry', 'Germany');
        navigate('/cost-calculator/questionnaire');
      }
    },
    {
      title: 'German Grade Calculator',
      description: 'Convert your grades to the German grading system',
      icon: GraduationCap,
      color: 'bg-accent',
      hoverColor: 'hover:bg-accent/90',
      onClick: () => navigate('/grade-calculator')
    }
  ];

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

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <div className="flex items-center justify-center mb-6">
            <img 
              src="/src/assets/images/Germany.jpeg" 
              alt="Germany" 
              className="w-20 h-20 rounded-full object-cover shadow-lg"
            />
          </div>
          <h1 className="text-4xl lg:text-5xl font-heading font-black text-foreground mb-4">
            Germany Study Tools
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Choose the tool that best fits your needs for studying in Germany
          </p>
        </motion.div>

        {/* Tool Cards */}
        <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {tools.map((tool, index) => {
            const IconComponent = tool.icon;
            return (
              <motion.div
                key={tool.title}
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={tool.onClick}
                className="bg-card rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 cursor-pointer border border-border group"
              >
                <div className="text-center space-y-6">
                  <div className={`w-20 h-20 ${tool.color} rounded-2xl flex items-center justify-center mx-auto group-hover:scale-110 transition-transform duration-300`}>
                    <IconComponent className="w-10 h-10 text-white" />
                  </div>
                  
                  <div>
                    <h3 className="text-2xl font-heading font-bold text-card-foreground mb-3">
                      {tool.title}
                    </h3>
                    <p className="text-muted-foreground leading-relaxed">
                      {tool.description}
                    </p>
                  </div>

                  <button className={`w-full py-3 ${tool.color} ${tool.hoverColor} text-white rounded-xl font-semibold transition-colors duration-200`}>
                    Get Started
                  </button>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Additional Info */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="text-center mt-16"
        >
          <div className="bg-card rounded-xl p-6 max-w-2xl mx-auto border border-border">
            <h3 className="text-xl font-heading font-semibold mb-3">Why Study in Germany?</h3>
            <p className="text-muted-foreground">
              Germany offers world-class education with low tuition fees, excellent research opportunities, 
              and strong job prospects after graduation. Use our tools to plan your journey effectively.
            </p>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default GermanyTools;