import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, BookOpen, Award, Building, Users } from 'lucide-react';
import { useScrollToTop } from '../../hooks/useScrollToTop';
import higherEducationImg from '../../assets/images/higher_education.png';

export const HigherEducation = () => {
  const navigate = useNavigate();
  useScrollToTop(); // Scroll to top when component mounts

  const universityTypes = [
    {
      icon: Building,
      title: 'Universities (Universitäten)',
      description: 'Research-focused institutions offering theoretical education and doctoral programs.',
      programs: ['Bachelor\'s', 'Master\'s', 'PhD', 'State Examination'],
      focus: 'Research & Theory'
    },
    {
      icon: Award,
      title: 'Universities of Applied Sciences',
      description: 'Practice-oriented institutions with strong industry connections.',
      programs: ['Bachelor\'s', 'Master\'s', 'Professional Programs'],
      focus: 'Applied Sciences & Practice'
    },
    {
      icon: Users,
      title: 'Art & Music Colleges',
      description: 'Specialized institutions for creative and artistic disciplines.',
      programs: ['Bachelor\'s', 'Master\'s', 'Diplomas'],
      focus: 'Arts & Creative Fields'
    }
  ];

  const degreeStructure = [
    {
      level: 'Bachelor\'s Degree',
      duration: '3-4 years',
      credits: '180-240 ECTS',
      description: 'First academic degree providing fundamental knowledge in your chosen field.'
    },
    {
      level: 'Master\'s Degree',
      duration: '1-2 years',
      credits: '60-120 ECTS',
      description: 'Advanced degree for specialization and deeper knowledge in your field.'
    },
    {
      level: 'PhD/Doctorate',
      duration: '3-5 years',
      credits: 'Research-based',
      description: 'Highest academic degree involving original research and dissertation.'
    }
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

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-16"
        >
          <div className="flex items-center justify-center mb-6">
            <img
              src={higherEducationImg}
              alt="Higher Education"
              className="w-24 h-24 rounded-full object-cover shadow-lg"
            />
          </div>
          <h1 className="text-4xl lg:text-5xl font-heading font-bold text-foreground mb-6">
            Higher Education in Germany
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            Explore Germany's diverse higher education landscape, from world-renowned research universities 
            to practice-oriented institutions that prepare you for your career.
          </p>
        </motion.div>

        <div className="max-w-6xl mx-auto">
          {/* University Types */}
          <motion.section
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="mb-16"
          >
            <h2 className="text-3xl font-heading font-bold text-foreground mb-8 text-center">
              Types of Higher Education Institutions
            </h2>
            <div className="grid md:grid-cols-3 gap-8">
              {universityTypes.map((type, index) => {
                const IconComponent = type.icon;
                return (
                  <motion.div
                    key={type.title}
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 * index }}
                    className="bg-card rounded-2xl p-6 border border-border hover:shadow-lg transition-shadow"
                  >
                    <div className="w-16 h-16 bg-primary rounded-2xl flex items-center justify-center mb-4">
                      <IconComponent className="w-8 h-8 text-white" />
                    </div>
                    <h3 className="text-xl font-heading font-semibold text-card-foreground mb-3">
                      {type.title}
                    </h3>
                    <p className="text-muted-foreground mb-4 leading-relaxed">
                      {type.description}
                    </p>
                    <div className="space-y-2">
                      <div className="text-sm font-semibold text-primary">Programs Offered:</div>
                      <div className="flex flex-wrap gap-2">
                        {type.programs.map(program => (
                          <span key={program} className="bg-primary/10 text-primary px-2 py-1 rounded text-xs font-medium">
                            {program}
                          </span>
                        ))}
                      </div>
                      <div className="text-sm text-muted-foreground mt-3">
                        <strong>Focus:</strong> {type.focus}
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </motion.section>

          {/* Degree Structure */}
          <motion.section
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="mb-16"
          >
            <h2 className="text-3xl font-heading font-bold text-foreground mb-8 text-center">
              German Degree Structure
            </h2>
            <div className="space-y-6">
              {degreeStructure.map((degree, index) => (
                <motion.div
                  key={degree.level}
                  initial={{ opacity: 0, x: -30 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.1 * index }}
                  className="bg-card rounded-xl p-6 border border-border"
                >
                  <div className="flex flex-col md:flex-row md:items-center md:justify-between">
                    <div className="flex-1">
                      <h3 className="text-xl font-heading font-semibold text-card-foreground mb-2">
                        {degree.level}
                      </h3>
                      <p className="text-muted-foreground leading-relaxed">
                        {degree.description}
                      </p>
                    </div>
                    <div className="mt-4 md:mt-0 md:ml-6 flex flex-col md:items-end space-y-2">
                      <div className="bg-primary/10 text-primary px-3 py-1 rounded-full text-sm font-medium">
                        {degree.duration}
                      </div>
                      <div className="bg-accent/10 text-accent-foreground px-3 py-1 rounded-full text-sm font-medium">
                        {degree.credits}
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.section>

          {/* Key Features */}
          <motion.section
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="bg-gradient-to-r from-primary/5 to-accent/5 rounded-2xl p-8"
          >
            <h2 className="text-2xl font-heading font-bold text-foreground mb-6 text-center">
              Key Features of German Higher Education
            </h2>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div className="flex items-start space-x-3">
                  <BookOpen className="w-6 h-6 text-primary mt-1" />
                  <div>
                    <h4 className="font-semibold text-foreground">Research Excellence</h4>
                    <p className="text-muted-foreground text-sm">World-class research facilities and opportunities to work with leading academics.</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <Award className="w-6 h-6 text-primary mt-1" />
                  <div>
                    <h4 className="font-semibold text-foreground">International Recognition</h4>
                    <p className="text-muted-foreground text-sm">Degrees recognized worldwide with excellent career prospects.</p>
                  </div>
                </div>
              </div>
              <div className="space-y-4">
                <div className="flex items-start space-x-3">
                  <Users className="w-6 h-6 text-primary mt-1" />
                  <div>
                    <h4 className="font-semibold text-foreground">Diverse Community</h4>
                    <p className="text-muted-foreground text-sm">Multicultural environment with students from over 180 countries.</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <Building className="w-6 h-6 text-primary mt-1" />
                  <div>
                    <h4 className="font-semibold text-foreground">Modern Infrastructure</h4>
                    <p className="text-muted-foreground text-sm">State-of-the-art facilities, libraries, and learning resources.</p>
                  </div>
                </div>
              </div>
            </div>
          </motion.section>
        </div>
      </div>
    </motion.div>
  );
};

export const AdmissionRequirements = () => {
  const navigate = useNavigate();
  useScrollToTop(); // Scroll to top when component mounts

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

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl lg:text-5xl font-heading font-bold text-foreground mb-6">
            Admission Requirements & Applications
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Learn about application deadlines, required documents, and the admission process for German universities.
          </p>
        </motion.div>

        <div className="max-w-4xl mx-auto space-y-8">
          {/* Application Timeline */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-card rounded-xl p-8 border border-border"
          >
            <h2 className="text-2xl font-heading font-bold text-card-foreground mb-6">Application Timeline</h2>
            <div className="space-y-4">
              <p className="text-muted-foreground leading-relaxed">
                At many German universities it's possible to apply for admission twice a year – to commence studies either in the winter or summer semester.
              </p>
              <div className="grid md:grid-cols-2 gap-6 mt-6">
                <div className="bg-primary/5 rounded-lg p-4">
                  <h3 className="font-semibold text-primary mb-2">Summer Semester</h3>
                  <p className="text-sm text-muted-foreground mb-2">March to August (Fachhochschulen)</p>
                  <p className="text-sm text-muted-foreground mb-2">April to September (Universities)</p>
                  <p className="text-sm font-medium text-foreground">Application Deadline: January 15</p>
                </div>
                <div className="bg-accent/5 rounded-lg p-4">
                  <h3 className="font-semibold text-accent-foreground mb-2">Winter Semester</h3>
                  <p className="text-sm text-muted-foreground mb-2">September to February (Fachhochschulen)</p>
                  <p className="text-sm text-muted-foreground mb-2">October to March (Universities)</p>
                  <p className="text-sm font-medium text-foreground">Application Deadline: July 15</p>
                </div>
              </div>
              <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mt-4">
                <p className="text-sm text-yellow-800">
                  <strong>Important:</strong> Submit applications at least 6 weeks before the deadline. Expect responses 1-2 months after the deadline.
                </p>
              </div>
            </div>
          </motion.div>

          {/* Required Documents */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="bg-card rounded-xl p-8 border border-border"
          >
            <h2 className="text-2xl font-heading font-bold text-card-foreground mb-6">Required Documents</h2>
            <div className="grid gap-4">
              {[
                'Certified copy of high school diploma or previous degrees in original language',
                'Translated overview of course modules and grades',
                'Passport photo',
                'Copy of passport (personal information and photo ID page)',
                'Proof of language proficiency (test certificate or online equivalent)'
              ].map((doc, index) => (
                <div key={index} className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0" />
                  <p className="text-muted-foreground">{doc}</p>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Application Types */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="grid md:grid-cols-2 gap-8"
          >
            <div className="bg-card rounded-xl p-6 border border-border">
              <h3 className="text-xl font-heading font-semibold text-card-foreground mb-4">Undergraduate Studies</h3>
              <div className="space-y-3 text-sm text-muted-foreground">
                <p>European qualifications (baccalaureate, A-levels): Apply directly with German language proof.</p>
                <p>Non-European qualifications: May require Feststellungsprüfung entrance exam after Studienkolleg.</p>
                <p>Apply via university international office or <a href="https://www.uni-assist.de/en/" className="text-primary hover:underline" target="_blank" rel="noopener noreferrer">uni-assist.de</a></p>
              </div>
            </div>
            <div className="bg-card rounded-xl p-6 border border-border">
              <h3 className="text-xl font-heading font-semibold text-card-foreground mb-4">Postgraduate Studies</h3>
              <div className="space-y-3 text-sm text-muted-foreground">
                <p>Requires completed (or near completion) undergraduate degree.</p>
                <p>Some programs require minimum credits in specific fields.</p>
                <p>Apply directly to university or via <a href="https://www.uni-assist.de/en/" className="text-primary hover:underline" target="_blank" rel="noopener noreferrer">uni-assist.de</a></p>
                <p>PhD applications: Direct to supervisors or structured program applications.</p>
              </div>
            </div>
          </motion.div>

          {/* Master's Degree Types */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8 }}
            className="bg-gradient-to-r from-primary/5 to-accent/5 rounded-xl p-8"
          >
            <h2 className="text-2xl font-heading font-bold text-foreground mb-6">Master's Degrees in Germany</h2>
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h3 className="font-semibold text-primary mb-2">Consecutive Master's</h3>
                <p className="text-sm text-muted-foreground">Build on academic knowledge from related bachelor's degree. Focus on academic advancement.</p>
              </div>
              <div>
                <h3 className="font-semibold text-accent-foreground mb-2">Non-Consecutive Master's</h3>
                <p className="text-sm text-muted-foreground">Professional development focus. Requires undergraduate degree plus relevant work experience.</p>
              </div>
            </div>
            <p className="text-sm text-muted-foreground mt-4">
              <strong>Duration:</strong> Most master's degrees take 4 semesters (2 years) to complete.
            </p>
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
};

export const LanguageRequirements = () => {
  const navigate = useNavigate();
  useScrollToTop(); // Scroll to top when component mounts

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

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl lg:text-5xl font-heading font-bold text-foreground mb-6">
            Language Requirements
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Learn about German language proficiency requirements and English-taught programs in Germany.
          </p>
        </motion.div>

        <div className="max-w-4xl mx-auto space-y-8">
          {/* German Language Requirements */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-card rounded-xl p-8 border border-border"
          >
            <h2 className="text-2xl font-heading font-bold text-card-foreground mb-6">German Language Proficiency</h2>
            <p className="text-muted-foreground leading-relaxed mb-6">
              Most courses are taught in German, requiring international applicants to submit proof of proficiency in the German language. 
              Two main tests are available for this purpose:
            </p>
            
            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-primary/5 rounded-lg p-6">
                <h3 className="text-lg font-semibold text-primary mb-3">DSH Test</h3>
                <p className="text-sm text-muted-foreground mb-3">
                  Deutsche Sprachprüfung für den Hochschulzugang (German language examination for university entrance)
                </p>
                <div className="space-y-2">
                  <div className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-primary rounded-full" />
                    <span className="text-sm text-muted-foreground">Offered only within Germany</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-primary rounded-full" />
                    <span className="text-sm text-muted-foreground">Available at various universities</span>
                  </div>
                </div>
              </div>
              
              <div className="bg-accent/5 rounded-lg p-6">
                <h3 className="text-lg font-semibold text-accent-foreground mb-3">TestDaF</h3>
                <p className="text-sm text-muted-foreground mb-3">
                  Test Deutsch als Fremdsprache (Test of German as a foreign language)
                </p>
                <div className="space-y-2">
                  <div className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-accent rounded-full" />
                    <span className="text-sm text-muted-foreground">Available in 90+ countries worldwide</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-accent rounded-full" />
                    <span className="text-sm text-muted-foreground">More accessible for international students</span>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mt-6">
              <p className="text-yellow-800 text-sm">
                <strong>Important:</strong> Always check that your chosen test is accepted by the universities you want to apply to.
              </p>
            </div>
          </motion.div>

          {/* Preparatory Courses */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="bg-card rounded-xl p-8 border border-border"
          >
            <h2 className="text-2xl font-heading font-bold text-card-foreground mb-6">Preparatory Courses</h2>
            <p className="text-muted-foreground leading-relaxed mb-6">
              If you need to improve your German proficiency, German universities offer various preparatory courses:
            </p>
            
            <div className="space-y-4">
              <div className="bg-secondary/5 rounded-lg p-4">
                <h3 className="font-semibold text-secondary-foreground mb-2">Studienkolleg</h3>
                <p className="text-sm text-muted-foreground">
                  Comprehensive preparatory courses that help with both linguistic and content-related preparation for your degree.
                </p>
              </div>
              
              <div className="bg-primary/5 rounded-lg p-4">
                <h3 className="font-semibold text-primary mb-2">Pre-study German Course</h3>
                <p className="text-sm text-muted-foreground">
                  Generally lasts one semester and ends with a DSH exam. Focused specifically on language preparation.
                </p>
              </div>
            </div>
          </motion.div>

          {/* English-taught Programs */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="bg-gradient-to-r from-green-50 to-blue-50 border border-green-200 rounded-xl p-8"
          >
            <h2 className="text-2xl font-heading font-bold text-green-800 mb-6">Studying in English</h2>
            <div className="space-y-6">
              <p className="text-green-700 leading-relaxed">
                While German remains the main language of instruction overall, a large and growing selection of English-language 
                programmes is available – particularly at master's level and for students participating in short-term exchange programmes.
              </p>
              
              <div className="grid md:grid-cols-2 gap-6">
                <div className="bg-white rounded-lg p-4">
                  <h3 className="font-semibold text-green-800 mb-3">Available Programs</h3>
                  <ul className="space-y-2 text-sm text-green-700">
                    <li>• Extensive master's level programs</li>
                    <li>• Short-term exchange programs</li>
                    <li>• Limited bachelor's programs</li>
                    <li>• International degree programs</li>
                  </ul>
                </div>
                
                <div className="bg-white rounded-lg p-4">
                  <h3 className="font-semibold text-green-800 mb-3">Search Resources</h3>
                  <div className="space-y-2 text-sm">
                    <p className="text-green-700">
                      <strong>DAAD Database:</strong> <a href="https://www.daad.de/en/" className="text-blue-600 hover:underline" target="_blank" rel="noopener noreferrer">www.daad.de</a>
                    </p>
                    <p className="text-green-700">
                      <strong>Study in Germany:</strong> <a href="https://www.study-in.de/en/plan-your-studies/find-programme-and-university" className="text-blue-600 hover:underline" target="_blank" rel="noopener noreferrer">study-in.de</a>
                    </p>
                  </div>
                </div>
              </div>
              
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                <p className="text-blue-800 text-sm">
                  <strong>Note:</strong> Limited English programs at bachelor's level may require flexibility in program choice or consideration of learning German.
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
};

export const StudentVisa = () => {
  const navigate = useNavigate();
  useScrollToTop(); // Scroll to top when component mounts

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

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl lg:text-5xl font-heading font-bold text-foreground mb-6">
            Student Visa Requirements
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Everything you need to know about visa requirements and the application process for studying in Germany.
          </p>
        </motion.div>

        <div className="max-w-4xl mx-auto space-y-8">
          {/* Visa Exemptions */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-green-50 border border-green-200 rounded-xl p-8"
          >
            <h2 className="text-2xl font-heading font-bold text-green-800 mb-6">No Visa Required</h2>
            <div className="space-y-4">
              <p className="text-green-700 leading-relaxed">
                Students from the following regions do not need a visa and only need to register at the nearest registry office on arrival:
              </p>
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <h3 className="font-semibold text-green-800 mb-2">EU/EEA/Switzerland</h3>
                  <p className="text-sm text-green-700">All European Union, European Economic Area countries, and Switzerland</p>
                </div>
                <div>
                  <h3 className="font-semibold text-green-800 mb-2">Other Countries</h3>
                  <p className="text-sm text-green-700">Australia, Israel, Japan, Canada, New Zealand, South Korea, USA</p>
                </div>
              </div>
              <div className="bg-green-100 rounded-lg p-4 mt-4">
                <p className="text-sm text-green-800">
                  <strong>Special Case:</strong> Students from Andorra, Brazil, El Salvador, Honduras, Monaco, San Marino, or Taiwan can also follow this path if they don't intend to work in Germany.
                </p>
              </div>
            </div>
          </motion.div>

          {/* Visa Application */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="bg-card rounded-xl p-8 border border-border"
          >
            <h2 className="text-2xl font-heading font-bold text-card-foreground mb-6">Visa Application Process</h2>
            <div className="space-y-6">
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                <p className="text-blue-800">
                  <strong>Application Fee:</strong> €75 | <strong>Processing Time:</strong> Several months (apply early!)
                </p>
              </div>
              
              <div>
                <h3 className="text-lg font-semibold text-card-foreground mb-4">Visa Types</h3>
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="bg-primary/5 rounded-lg p-4">
                    <h4 className="font-semibold text-primary mb-2">Student Visa</h4>
                    <p className="text-sm text-muted-foreground">For students already accepted onto a program</p>
                  </div>
                  <div className="bg-accent/5 rounded-lg p-4">
                    <h4 className="font-semibold text-accent-foreground mb-2">Applicant Visa</h4>
                    <p className="text-sm text-muted-foreground">For those awaiting confirmation or sitting entrance exams</p>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-card-foreground mb-4">Required Documents</h3>
                <div className="grid gap-3">
                  {[
                    'Completed application form',
                    'Valid passport',
                    'Two photographs',
                    'Letter showing acceptance by German university',
                    'Transcript of academic record',
                    'Certificate of German language proficiency (if studying in German)',
                    'Proof of sufficient funds to support yourself',
                    'Certificate showing health insurance purchase',
                    'Declaration of authenticity of documents submitted'
                  ].map((doc, index) => (
                    <div key={index} className="flex items-start space-x-3">
                      <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0" />
                      <p className="text-muted-foreground text-sm">{doc}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>

          {/* Residence Permit & Health Insurance */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="grid md:grid-cols-2 gap-8"
          >
            <div className="bg-card rounded-xl p-6 border border-border">
              <h3 className="text-xl font-heading font-semibold text-card-foreground mb-4">Residence Permit</h3>
              <div className="space-y-3">
                <p className="text-muted-foreground text-sm leading-relaxed">
                  Register with local Alien Registration Office (Bürgeramt or Einwohnermeldeamt) within 2 weeks of arrival.
                </p>
                <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-3">
                  <p className="text-yellow-800 text-sm">
                    <strong>Cost:</strong> €60-€110 for initial permit (valid for 2 years)
                  </p>
                </div>
                <p className="text-muted-foreground text-sm">
                  You must find accommodation first to register your address.
                </p>
              </div>
            </div>
            
            <div className="bg-card rounded-xl p-6 border border-border">
              <h3 className="text-xl font-heading font-semibold text-card-foreground mb-4">Health Insurance</h3>
              <div className="space-y-3">
                <p className="text-muted-foreground text-sm leading-relaxed">
                  Health insurance is mandatory before arrival - you cannot enroll without it.
                </p>
                <div className="space-y-2">
                  <div className="bg-green-50 border border-green-200 rounded-lg p-3">
                    <p className="text-green-800 text-sm">
                      <strong>EU Students:</strong> European Health Insurance Card (EHIC) can be approved by German public health insurance.
                    </p>
                  </div>
                  <div className="bg-blue-50 border border-blue-200 rounded-lg p-3">
                    <p className="text-blue-800 text-sm">
                      <strong>Other Countries:</strong> Private domestic and foreign policies may be recognized.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
};

export const StudentCities = () => {
  const navigate = useNavigate();
  useScrollToTop(); // Scroll to top when component mounts

  const cities = [
    {
      name: 'Berlin',
      description: 'Cities don\'t get much trendier than Berlin, which easily competes with the likes of London and New York in terms of the cool factor. This tolerant, multicultural and creative city is known for being a great place for students – and it helps that it\'s also a relatively inexpensive place to live.',
      universities: ['Humboldt-Universität zu Berlin (Ranked 121st)', 'Freie Universität Berlin (130th)', 'Technische Universität Berlin (147th)'],
      highlight: 'Top 10 in QS Best Student Cities index'
    },
    {
      name: 'Munich',
      description: 'Thanks to its world-famous Oktoberfest, Munich will forever be associated with Germany\'s beer-brewing tradition. But there\'s more to this southern German city, which is often voted one of the world\'s most livable cities.',
      universities: ['Technische Universität München (Ranked 61st)', 'Ludwig-Maximilians-Universität München (62nd)'],
      highlight: 'Home to Germany\'s two highest-ranked universities'
    },
    {
      name: 'Heidelberg',
      description: 'Despite being part of one of Germany\'s most densely populated areas, Heidelberg manages to retain a certain quaint rustic charm. It\'s popular with tourists, who come to see its ancient castle and red-roofed town center.',
      universities: ['Ruprecht-Karls-Universität Heidelberg (Ranked 64th)'],
      highlight: 'Germany\'s oldest university with 50+ Nobel Prize connections'
    },
    {
      name: 'Cologne',
      description: 'Cologne is known for its dramatic cathedral, Kölner Dom, its pleasant riverside, and its liberal and tolerant nature. It has a vibrant student community, is peppered with museums and art galleries.',
      universities: ['Universität Köln (Ranked joint 306th)'],
      highlight: 'Direct trains to Paris, Brussels, Amsterdam, and Luxembourg'
    },
    {
      name: 'Frankfurt am Main',
      description: 'The beating heart of Germany\'s financial and business sectors, Frankfurt is also the home of the European Central Bank. Its city center is a mass of gleaming skyscrapers, and its airport is the busiest in continental Europe.',
      universities: ['Universität Frankfurt am Main (Ranked joint 279th)'],
      highlight: 'Financial hub with excellent nightlife and festivals'
    },
    {
      name: 'Stuttgart',
      description: 'Known as the \'cradle of the automobile\', Stuttgart is one of the country\'s strongest industrial regions, making it attractive for engineering and technology students who may wish to stay in Germany and work after studies.',
      universities: ['Universität Stuttgart (Ranked joint 260th)'],
      highlight: 'Industrial powerhouse with rich cultural heritage'
    }
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

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl lg:text-5xl font-heading font-bold text-foreground mb-6">
            Student Cities in Germany
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Discover the best German cities for international students, from trendy Berlin to historic Heidelberg.
          </p>
        </motion.div>

        <div className="max-w-6xl mx-auto">
          {/* Featured Quote */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-gradient-to-r from-primary/10 to-accent/10 rounded-xl p-8 mb-12 text-center"
          >
            <p className="text-2xl font-heading font-semibold text-foreground italic">
              "Cities don't get much trendier than Berlin, which easily competes with the likes of London and New York in terms of the cool factor"
            </p>
          </motion.div>

          {/* Cities Grid */}
          <div className="grid gap-8">
            {cities.map((city, index) => (
              <motion.div
                key={city.name}
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 * index }}
                className="bg-card rounded-xl p-8 border border-border hover:shadow-lg transition-shadow"
              >
                <div className="grid lg:grid-cols-3 gap-6">
                  <div className="lg:col-span-2">
                    <h2 className="text-2xl font-heading font-bold text-card-foreground mb-4">
                      {city.name}
                    </h2>
                    <p className="text-muted-foreground leading-relaxed mb-6">
                      {city.description}
                    </p>
                    
                    <div className="bg-primary/5 rounded-lg p-4">
                      <h3 className="font-semibold text-primary mb-2">Top Universities</h3>
                      <div className="space-y-1">
                        {city.universities.map((uni, uniIndex) => (
                          <p key={uniIndex} className="text-sm text-muted-foreground">
                            • {uni}
                          </p>
                        ))}
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex flex-col justify-center">
                    <div className="bg-accent/10 rounded-lg p-4 text-center">
                      <h4 className="font-semibold text-accent-foreground mb-2">Key Highlight</h4>
                      <p className="text-sm text-muted-foreground">
                        {city.highlight}
                      </p>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Additional Info */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8 }}
            className="mt-12 bg-gradient-to-r from-secondary/10 to-primary/10 rounded-xl p-8"
          >
            <h2 className="text-2xl font-heading font-bold text-foreground mb-6 text-center">
              Why Choose German Cities for Study?
            </h2>
            <div className="grid md:grid-cols-3 gap-6">
              <div className="text-center">
                <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center mx-auto mb-4">
                  <Building className="w-8 h-8 text-white" />
                </div>
                <h3 className="font-semibold text-foreground mb-2">World-Class Universities</h3>
                <p className="text-sm text-muted-foreground">Home to some of the world's top-ranked institutions</p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-accent rounded-full flex items-center justify-center mx-auto mb-4">
                  <Users className="w-8 h-8 text-white" />
                </div>
                <h3 className="font-semibold text-foreground mb-2">Vibrant Student Life</h3>
                <p className="text-sm text-muted-foreground">Rich cultural scenes and active student communities</p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-secondary rounded-full flex items-center justify-center mx-auto mb-4">
                  <Award className="w-8 h-8 text-secondary-foreground" />
                </div>
                <h3 className="font-semibold text-foreground mb-2">Career Opportunities</h3>
                <p className="text-sm text-muted-foreground">Strong industry connections and job prospects</p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
};

export const TuitionFees = () => {
  const navigate = useNavigate();
  useScrollToTop(); // Scroll to top when component mounts

  const monthlyExpenses = [
    { category: 'Rent and utilities', amount: '€323' },
    { category: 'Food and drink', amount: '€168' },
    { category: 'Clothing', amount: '€42' },
    { category: 'Learning materials', amount: '€20' },
    { category: 'Car and/or public transport', amount: '€92' },
    { category: 'Health insurance and medical costs', amount: '€80' },
    { category: 'Phone, internet and television', amount: '€31' },
    { category: 'Recreation, culture and sports', amount: '€61' }
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

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl lg:text-5xl font-heading font-bold text-foreground mb-6">
            Tuition Fees & Living Costs
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Discover the affordable education costs and living expenses for studying in Germany.
          </p>
        </motion.div>

        <div className="max-w-6xl mx-auto space-y-8">
          {/* Key Highlight */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-gradient-to-r from-green-50 to-blue-50 border border-green-200 rounded-xl p-8 text-center"
          >
            <h2 className="text-2xl font-heading font-bold text-green-800 mb-4">
              Why Germany is Affordable
            </h2>
            <p className="text-lg text-green-700 italic font-medium">
              "While affordability is by no means the sole factor attracting international students to Germany, 
              low or non-existent tuition fees undoubtedly add to the overall appeal."
            </p>
          </motion.div>

          {/* Tuition Fees */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="grid md:grid-cols-2 gap-8"
          >
            <div className="bg-card rounded-xl p-6 border border-border">
              <h3 className="text-xl font-heading font-semibold text-card-foreground mb-4">Public Universities</h3>
              <div className="space-y-4">
                <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                  <h4 className="font-semibold text-green-800 mb-2">Most States: FREE</h4>
                  <p className="text-sm text-green-700">No tuition fees for undergraduate and most postgraduate programs</p>
                </div>
                <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                  <h4 className="font-semibold text-yellow-800 mb-2">Baden-Württemberg</h4>
                  <p className="text-sm text-yellow-700">€1,500 per semester for non-EU students (refugees and PhD students exempt)</p>
                </div>
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                  <h4 className="font-semibold text-blue-800 mb-2">Semester Fee</h4>
                  <p className="text-sm text-blue-700">Up to €350 per semester (includes student union, admin, and transport pass)</p>
                </div>
              </div>
            </div>
            
            <div className="bg-card rounded-xl p-6 border border-border">
              <h3 className="text-xl font-heading font-semibold text-card-foreground mb-4">Private Universities</h3>
              <div className="space-y-4">
                <div className="bg-orange-50 border border-orange-200 rounded-lg p-4">
                  <h4 className="font-semibold text-orange-800 mb-2">Tuition Fees Apply</h4>
                  <p className="text-sm text-orange-700">Fees vary by institution and program</p>
                </div>
                <div className="bg-purple-50 border border-purple-200 rounded-lg p-4">
                  <h4 className="font-semibold text-purple-800 mb-2">PhD Studies</h4>
                  <p className="text-sm text-purple-700">Free for at least the first 6 semesters (3 years)</p>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Living Costs */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="bg-card rounded-xl p-8 border border-border"
          >
            <h2 className="text-2xl font-heading font-bold text-card-foreground mb-6">Monthly Living Expenses</h2>
            <div className="grid lg:grid-cols-2 gap-8">
              <div>
                <div className="bg-primary/5 rounded-lg p-4 mb-6">
                  <h3 className="font-semibold text-primary mb-2">Recommended Budget</h3>
                  <p className="text-2xl font-bold text-foreground">€850 per month</p>
                  <p className="text-sm text-muted-foreground">(€10,200 per year)</p>
                </div>
                <div className="bg-accent/5 rounded-lg p-4">
                  <h3 className="font-semibold text-accent-foreground mb-2">Visa Requirement</h3>
                  <p className="text-lg font-semibold text-foreground">€725 per month minimum</p>
                  <p className="text-sm text-muted-foreground">(€8,700 per year)</p>
                </div>
              </div>
              
              <div>
                <h3 className="font-semibold text-card-foreground mb-4">Detailed Monthly Breakdown</h3>
                <div className="space-y-2">
                  {monthlyExpenses.map((expense, index) => (
                    <div key={index} className="flex justify-between items-center py-2 border-b border-border last:border-b-0">
                      <span className="text-sm text-muted-foreground">{expense.category}</span>
                      <span className="font-semibold text-foreground">{expense.amount}</span>
                    </div>
                  ))}
                  <div className="flex justify-between items-center py-2 font-bold text-lg border-t-2 border-primary mt-4">
                    <span className="text-foreground">Total</span>
                    <span className="text-primary">€817</span>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Work Opportunities */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8 }}
            className="bg-gradient-to-r from-secondary/10 to-accent/10 rounded-xl p-8"
          >
            <h2 className="text-2xl font-heading font-bold text-foreground mb-6">Part-time Work Opportunities</h2>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-white rounded-lg p-6">
                <h3 className="font-semibold text-primary mb-3">EU/EEA Students</h3>
                <p className="text-muted-foreground">Can work part-time up to <strong>20 hours per week</strong> without restrictions</p>
              </div>
              <div className="bg-white rounded-lg p-6">
                <h3 className="font-semibold text-accent-foreground mb-3">Non-EU Students</h3>
                <p className="text-muted-foreground">Permitted to work <strong>120 full days</strong> or <strong>240 half days</strong> per year (excluding research assistant work)</p>
              </div>
            </div>
          </motion.div>

          {/* Scholarships */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.0 }}
            className="bg-card rounded-xl p-8 border border-border"
          >
            <h2 className="text-2xl font-heading font-bold text-card-foreground mb-6">Scholarships & Funding</h2>
            <div className="space-y-6">
              <p className="text-muted-foreground leading-relaxed">
                Despite minimal tuition fees, scholarships are available to study in Germany. The DAAD provides many scholarships 
                for international students and maintains an online database sorted by subject and country of origin.
              </p>
              
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <h3 className="font-semibold text-foreground mb-3">For All Students</h3>
                  <ul className="space-y-2 text-sm text-muted-foreground">
                    <li>• DAAD scholarships</li>
                    <li>• University-specific scholarships</li>
                    <li>• Merit-based awards</li>
                    <li>• Need-based assistance</li>
                  </ul>
                </div>
                <div>
                  <h3 className="font-semibold text-foreground mb-3">For PhD Candidates</h3>
                  <ul className="space-y-2 text-sm text-muted-foreground">
                    <li>• German Research Foundation (DFG)</li>
                    <li>• Leibniz Association funding</li>
                    <li>• EU Erasmus Mundus Joint Doctorates</li>
                    <li>• University research positions</li>
                  </ul>
                </div>
              </div>
              
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                <p className="text-blue-800 text-sm">
                  <strong>Resources:</strong> Visit <a href="https://www.research-in-germany.org" className="underline" target="_blank" rel="noopener noreferrer">research-in-germany.org</a> for current funding opportunities.
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
};

export const WorkingInGermany = () => {
  const navigate = useNavigate();
  useScrollToTop(); // Scroll to top when component mounts

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

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl lg:text-5xl font-heading font-bold text-foreground mb-6">
            Working in Germany
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Explore career opportunities and work prospects in Europe's largest economy after graduation.
          </p>
        </motion.div>

        <div className="max-w-4xl mx-auto space-y-8">
          {/* Key Highlight */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-gradient-to-r from-primary/10 to-accent/10 rounded-xl p-8 text-center"
          >
            <p className="text-xl font-heading font-semibold text-foreground italic mb-4">
              "Fluency in German is a definite asset when seeking work. However, some roles are available without this requirement, 
              particularly in international corporations and scientific research institutes."
            </p>
          </motion.div>

          {/* Germany's Economy */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="bg-card rounded-xl p-8 border border-border"
          >
            <h2 className="text-2xl font-heading font-bold text-card-foreground mb-6">Why Work in Germany?</h2>
            <div className="space-y-4">
              <p className="text-muted-foreground leading-relaxed">
                A final 'pull' factor attracting growing numbers of students to Germany is the prospect of staying on to work after graduation. 
                Europe's largest economy and most industrialised nation, Germany rebounded quickly and convincingly from the global financial 
                crisis of 2008-9, and today offers one of the world's most resilient job markets.
              </p>
              
              <div className="grid md:grid-cols-3 gap-6 mt-6">
                <div className="bg-green-50 border border-green-200 rounded-lg p-4 text-center">
                  <div className="w-12 h-12 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-3">
                    <Building className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="font-semibold text-green-800 mb-2">Largest Economy</h3>
                  <p className="text-sm text-green-700">Europe's economic powerhouse</p>
                </div>
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 text-center">
                  <div className="w-12 h-12 bg-blue-500 rounded-full flex items-center justify-center mx-auto mb-3">
                    <Award className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="font-semibold text-blue-800 mb-2">Industrial Leader</h3>
                  <p className="text-sm text-blue-700">Most industrialised nation</p>
                </div>
                <div className="bg-purple-50 border border-purple-200 rounded-lg p-4 text-center">
                  <div className="w-12 h-12 bg-purple-500 rounded-full flex items-center justify-center mx-auto mb-3">
                    <Users className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="font-semibold text-purple-800 mb-2">Resilient Market</h3>
                  <p className="text-sm text-purple-700">Strong job market stability</p>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Work Permits & Residence */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="grid md:grid-cols-2 gap-8"
          >
            <div className="bg-card rounded-xl p-6 border border-border">
              <h3 className="text-xl font-heading font-semibold text-card-foreground mb-4">EU/EEA Graduates</h3>
              <div className="space-y-4">
                <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                  <h4 className="font-semibold text-green-800 mb-2">No Restrictions</h4>
                  <p className="text-sm text-green-700">Can stay and work without any permits or restrictions</p>
                </div>
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                  <h4 className="font-semibold text-blue-800 mb-2">Immediate Access</h4>
                  <p className="text-sm text-blue-700">Full access to the German job market upon graduation</p>
                </div>
              </div>
            </div>
            
            <div className="bg-card rounded-xl p-6 border border-border">
              <h3 className="text-xl font-heading font-semibold text-card-foreground mb-4">Non-EU Graduates</h3>
              <div className="space-y-4">
                <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                  <h4 className="font-semibold text-yellow-800 mb-2">18-Month Extension</h4>
                  <p className="text-sm text-yellow-700">Residence permit can be extended by 18 months to seek work</p>
                </div>
                <div className="bg-purple-50 border border-purple-200 rounded-lg p-4">
                  <h4 className="font-semibold text-purple-800 mb-2">Permanent Residency</h4>
                  <p className="text-sm text-purple-700">After 2 years of employment, can apply for permanent residency status</p>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Language Requirements */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8 }}
            className="bg-card rounded-xl p-8 border border-border"
          >
            <h2 className="text-2xl font-heading font-bold text-card-foreground mb-6">Language & Job Opportunities</h2>
            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <h3 className="font-semibold text-primary mb-4">German Language Advantage</h3>
                <div className="space-y-3">
                  <div className="flex items-start space-x-3">
                    <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0" />
                    <p className="text-sm text-muted-foreground">Significantly expands job opportunities</p>
                  </div>
                  <div className="flex items-start space-x-3">
                    <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0" />
                    <p className="text-sm text-muted-foreground">Access to local companies and SMEs</p>
                  </div>
                  <div className="flex items-start space-x-3">
                    <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0" />
                    <p className="text-sm text-muted-foreground">Better integration into workplace culture</p>
                  </div>
                  <div className="flex items-start space-x-3">
                    <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0" />
                    <p className="text-sm text-muted-foreground">Higher salary potential</p>
                  </div>
                </div>
              </div>
              
              <div>
                <h3 className="font-semibold text-accent-foreground mb-4">English-Speaking Roles</h3>
                <div className="space-y-3">
                  <div className="flex items-start space-x-3">
                    <div className="w-2 h-2 bg-accent rounded-full mt-2 flex-shrink-0" />
                    <p className="text-sm text-muted-foreground">International corporations</p>
                  </div>
                  <div className="flex items-start space-x-3">
                    <div className="w-2 h-2 bg-accent rounded-full mt-2 flex-shrink-0" />
                    <p className="text-sm text-muted-foreground">Scientific research institutes</p>
                  </div>
                  <div className="flex items-start space-x-3">
                    <div className="w-2 h-2 bg-accent rounded-full mt-2 flex-shrink-0" />
                    <p className="text-sm text-muted-foreground">Tech startups and IT companies</p>
                  </div>
                  <div className="flex items-start space-x-3">
                    <div className="w-2 h-2 bg-accent rounded-full mt-2 flex-shrink-0" />
                    <p className="text-sm text-muted-foreground">Engineering and consulting firms</p>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Career Path Timeline */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.0 }}
            className="bg-gradient-to-r from-secondary/10 to-primary/10 rounded-xl p-8"
          >
            <h2 className="text-2xl font-heading font-bold text-foreground mb-6 text-center">Your Career Path in Germany</h2>
            <div className="grid md:grid-cols-3 gap-6">
              <div className="text-center">
                <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-white font-bold text-xl">1</span>
                </div>
                <h3 className="font-semibold text-foreground mb-2">Graduate</h3>
                <p className="text-sm text-muted-foreground">Complete your degree at a German university</p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-accent rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-white font-bold text-xl">2</span>
                </div>
                <h3 className="font-semibold text-foreground mb-2">Job Search</h3>
                <p className="text-sm text-muted-foreground">18-month extension to find employment (non-EU students)</p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-secondary rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-white font-bold text-xl">3</span>
                </div>
                <h3 className="font-semibold text-foreground mb-2">Permanent Residency</h3>
                <p className="text-sm text-muted-foreground">Apply after 2 years of employment</p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
};

export default HigherEducation;