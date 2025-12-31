import { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, Menu, X, Phone } from 'lucide-react';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);

  const dropdownVariants = {
    hidden: { opacity: 0, y: -10, scale: 0.95 },
    visible: { opacity: 1, y: 0, scale: 1 },
    exit: { opacity: 0, y: -10, scale: 0.95 }
  };

  const menuItems = [
    {
      title: 'Home',
      href: '/',
      type: 'link'
    },
    {
      title: 'Study Basics',
      type: 'dropdown',
      items: [
        { title: 'Introduction', href: '/study-info/introduction' },
        { title: 'Higher Education in Germany', href: '/study-info/higher-education' }
      ]
    },
    {
      title: 'Entry Requirements',
      type: 'dropdown',
      items: [
        { title: 'Admission Requirements', href: '/study-info/admission-requirements' },
        { title: 'Language Requirements', href: '/study-info/language-requirements' }
      ]
    },
    {
      title: 'Visa & Cities',
      type: 'dropdown',
      items: [
        { title: 'Student Visas', href: '/study-info/student-visa' },
        { title: 'Student Cities', href: '/study-info/student-cities' }
      ]
    },
    {
      title: 'Costs & Work',
      type: 'dropdown',
      items: [
        { title: 'Tuition Fees & Living Costs', href: '/study-info/tuition-fees' },
        { title: 'Working in Germany', href: '/study-info/working-in-germany' }
      ]
    }
  ];

  return (
    <motion.header 
      className="fixed top-0 left-0 w-full h-20 bg-white/90 backdrop-blur-md border-b border-border z-50"
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="container-app h-full flex items-center justify-between">
        {/* Logo */}
        <Link to="/" className="flex items-center space-x-3">
          <img 
            src="/src/assets/images/GMI_Logo.jpeg" 
            alt="GMI Logo" 
            className="h-12 w-auto object-contain"
          />
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden lg:flex items-center justify-center flex-1">
          <div className="flex items-center space-x-8">
            {menuItems.map((item, index) => (
              <div key={index} className="relative">
                {item.type === 'link' ? (
                  <Link
                    to={item.href!}
                    className="text-foreground hover:text-primary transition-colors duration-200 font-bold"
                  >
                    {item.title}
                  </Link>
                ) : (
                  <div
                    className="relative"
                    onMouseEnter={() => setActiveDropdown(item.title)}
                    onMouseLeave={() => setActiveDropdown(null)}
                  >
                    <button className="flex items-center space-x-1 text-foreground hover:text-primary transition-colors duration-200 font-bold">
                      <span>{item.title}</span>
                      <ChevronDown className="w-4 h-4" />
                    </button>
                    
                    <AnimatePresence>
                      {activeDropdown === item.title && (
                        <motion.div
                          variants={dropdownVariants}
                          initial="hidden"
                          animate="visible"
                          exit="exit"
                          transition={{ duration: 0.2 }}
                          className="absolute top-full left-0 mt-2 w-64 bg-white rounded-lg shadow-lg border border-border py-2"
                        >
                          {item.items?.map((subItem, subIndex) => (
                            <Link
                              key={subIndex}
                              to={subItem.href}
                              className="block px-4 py-2 text-sm text-foreground hover:text-primary hover:bg-secondary/50 transition-colors duration-200"
                            >
                              {subItem.title}
                            </Link>
                          ))}
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                )}
              </div>
            ))}
          </div>
        </nav>

        {/* Request Callback Button & Mobile Menu */}
        <div className="flex items-center space-x-4">
          {/* Talk to Our Experts Button - Desktop */}
          <a
            href="tel:7353446655"
            className="hidden lg:flex items-center space-x-2 bg-gradient-to-r from-primary to-primary/80 hover:from-primary/90 hover:to-primary/70 text-white px-6 py-2.5 rounded-full font-semibold transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105"
          >
            <Phone className="w-4 h-4" />
            <span>Talk to Our Experts</span>
          </a>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="lg:hidden p-2 text-foreground hover:text-primary transition-colors"
          >
            {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="lg:hidden bg-white border-t border-border"
          >
            <div className="container-app py-4 space-y-4">
              {menuItems.map((item, index) => (
                <div key={index}>
                  {item.type === 'link' ? (
                    <Link
                      to={item.href!}
                      className="block py-2 text-foreground hover:text-primary transition-colors"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      {item.title}
                    </Link>
                  ) : (
                    <div>
                      <button
                        onClick={() => setActiveDropdown(activeDropdown === item.title ? null : item.title)}
                        className="flex items-center justify-between w-full py-2 text-foreground hover:text-primary transition-colors"
                      >
                        <span>{item.title}</span>
                        <ChevronDown className={`w-4 h-4 transition-transform ${activeDropdown === item.title ? 'rotate-180' : ''}`} />
                      </button>
                      <AnimatePresence>
                        {activeDropdown === item.title && (
                          <motion.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: 'auto' }}
                            exit={{ opacity: 0, height: 0 }}
                            className="ml-4 space-y-2"
                          >
                            {item.items?.map((subItem, subIndex) => (
                              <Link
                                key={subIndex}
                                to={subItem.href}
                                className="block py-1 text-sm text-muted-foreground hover:text-primary transition-colors"
                                onClick={() => setIsMenuOpen(false)}
                              >
                                {subItem.title}
                              </Link>
                            ))}
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  )}
                </div>
              ))}
              
              {/* Mobile Talk to Our Experts Button */}
              <a
                href="tel:7353446655"
                className="flex items-center justify-center space-x-2 bg-gradient-to-r from-primary to-primary/80 text-white px-6 py-3 rounded-full font-semibold mt-4 w-full"
                onClick={() => setIsMenuOpen(false)}
              >
                <Phone className="w-4 h-4" />
                <span>Talk to Our Experts</span>
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
};

export default Header;