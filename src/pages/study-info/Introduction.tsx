import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, MapPin, Users, GraduationCap } from 'lucide-react';
import { useScrollToTop } from '../../hooks/useScrollToTop';

const Introduction = () => {
  const navigate = useNavigate();
  useScrollToTop(); // Scroll to top when component mounts

  const highlights = [
    {
      icon: GraduationCap,
      title: 'World-Class Education',
      description: 'Germany is home to some of the world\'s oldest and most prestigious universities, offering cutting-edge research and innovative teaching methods.'
    },
    {
      icon: MapPin,
      title: 'Strategic Location',
      description: 'Located in the heart of Europe, Germany offers easy access to other European countries and diverse cultural experiences.'
    },
    {
      icon: Users,
      title: 'International Community',
      description: 'With over 400,000 international students, Germany provides a welcoming and diverse environment for global learners.'
    }
  ];

  const facts = [
    { label: 'Universities', value: '400+' },
    { label: 'International Students', value: '400,000+' },
    { label: 'English Programs', value: '1,000+' },
    { label: 'Average Tuition', value: '€0-350/semester' }
  ];

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="min-h-screen pt-20 bg-background"
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

        {/* Hero Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-16"
        >
          <div className="flex items-center justify-center mb-6">
            <img 
              src="/src/assets/images/Introduction.jpeg" 
              alt="Germany Introduction" 
              className="w-24 h-24 rounded-full object-cover shadow-lg"
            />
          </div>
          <h1 className="text-4xl lg:text-5xl font-heading font-bold text-foreground mb-6">
            Study in Germany
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            Discover why Germany is one of the world's top destinations for international students. 
            With its rich academic tradition, innovative research opportunities, and vibrant culture, 
            Germany offers an unparalleled educational experience.
          </p>
        </motion.div>

        {/* Quick Facts */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="grid grid-cols-2 lg:grid-cols-4 gap-6 mb-16"
        >
          {facts.map((fact, index) => (
            <motion.div
              key={fact.label}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.1 * index }}
              className="bg-card rounded-xl p-6 text-center border border-border hover:shadow-lg transition-shadow"
            >
              <div className="text-3xl font-bold text-primary mb-2">{fact.value}</div>
              <div className="text-muted-foreground font-medium">{fact.label}</div>
            </motion.div>
          ))}
        </motion.div>

        {/* Main Content */}
        <div className="max-w-4xl mx-auto">
          {/* Why Germany Section */}
          <motion.section
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="mb-16"
          >
            <h2 className="text-3xl font-heading font-bold text-foreground mb-8 text-center">
              Why Choose Germany?
            </h2>
            <div className="grid md:grid-cols-3 gap-8">
              {highlights.map((highlight, index) => {
                const IconComponent = highlight.icon;
                return (
                  <motion.div
                    key={highlight.title}
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 * index }}
                    className="text-center"
                  >
                    <div className="w-16 h-16 bg-primary rounded-2xl flex items-center justify-center mx-auto mb-4">
                      <IconComponent className="w-8 h-8 text-white" />
                    </div>
                    <h3 className="text-xl font-heading font-semibold text-foreground mb-3">
                      {highlight.title}
                    </h3>
                    <p className="text-muted-foreground leading-relaxed">
                      {highlight.description}
                    </p>
                  </motion.div>
                );
              })}
            </div>
          </motion.section>

          {/* Detailed Information */}
          <motion.section
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="bg-card rounded-2xl p-8 border border-border"
          >
            <h2 className="text-2xl font-heading font-bold text-card-foreground mb-6">
              About German Education System
            </h2>
            <div className="space-y-6 text-muted-foreground">
              <p className="leading-relaxed">
                Germany's education system is renowned worldwide for its emphasis on research, innovation, and practical application. 
                The country offers a unique combination of theoretical knowledge and hands-on experience, preparing students for 
                successful careers in their chosen fields.
              </p>
              <p className="leading-relaxed">
                With over 400 universities and institutions of higher education, Germany provides diverse academic opportunities 
                across all disciplines. From engineering and technology to arts and humanities, students can find programs that 
                match their interests and career goals.
              </p>
              <p className="leading-relaxed">
                One of the most attractive aspects of studying in Germany is the affordability. Most public universities charge 
                minimal or no tuition fees, even for international students. This makes quality education accessible to students 
                from all economic backgrounds.
              </p>
            </div>
          </motion.section>

          {/* Call to Action */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8 }}
            className="text-center mt-12"
          >
            <h3 className="text-2xl font-heading font-bold text-foreground mb-4">
              Ready to Start Your Journey?
            </h3>
            <p className="text-muted-foreground mb-6">
              Explore our tools and resources to plan your study abroad experience in Germany.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button
                onClick={() => navigate('/germany-tools')}
                className="px-8 py-3 bg-primary text-primary-foreground rounded-full font-semibold hover:bg-primary/90 transition-colors"
              >
                Explore Tools
              </button>
              <button
                onClick={() => navigate('/cost-calculator/request-callback')}
                className="px-8 py-3 border-2 border-primary text-primary rounded-full font-semibold hover:bg-primary hover:text-primary-foreground transition-colors"
              >
                Get Consultation
              </button>
            </div>
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
};

export default Introduction;