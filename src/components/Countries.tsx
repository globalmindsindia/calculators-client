import React from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

// Import country images
import germanyImg from '../assets/images/Germany.jpeg';
import ukImg from '../assets/images/UK.jpeg';
import netherlandsImg from '../assets/images/Netherland.jpeg';
import spainImg from '../assets/images/spain.jpeg';
import italyImg from '../assets/images/italy.jpeg';
import irelandImg from '../assets/images/Ireland.jpeg';

// Import flags
import franceFlag from '../assets/images/France.png';
import russiaFlag from '../assets/images/Russia.png';
import switzerlandFlag from '../assets/images/Switzerland.png';
import swedenFlag from '../assets/images/Sweden.png';
import polandFlag from '../assets/images/Poland.png';
import belgiumFlag from '../assets/images/Belgium.png';
import portugalFlag from '../assets/images/Portugal.png';
import austriaFlag from '../assets/images/Austria.png';
import icelandFlag from '../assets/images/Iceland.png';
import croatiaFlag from '../assets/images/Croatia.png';
import romaniaFlag from '../assets/images/Romania.png';
import albaniaFlag from '../assets/images/Albania.png';
import germanyFlag from '../assets/images/germany.png';
import ukFlag from '../assets/images/uk.png';
import netherlandsFlag from '../assets/images/netherland.png';
import spainFlag from '../assets/images/spain.png';
import italyFlag from '../assets/images/italy.png';
import irelandFlag from '../assets/images/ireland.png';

// Flag components for countries without proper flag images
const UkraineFlag = () => (
  <div className="w-8 h-6 rounded overflow-hidden">
    <div className="w-full h-3 bg-blue-500"></div>
    <div className="w-full h-3 bg-yellow-400"></div>
  </div>
);

const NorwayFlag = () => (
  <div className="w-8 h-6 rounded overflow-hidden bg-red-600 relative">
    <div className="absolute inset-0 flex items-center justify-center">
      <div className="w-full h-1 bg-white"></div>
    </div>
    <div className="absolute inset-0 flex justify-center">
      <div className="w-1 h-full bg-white"></div>
    </div>
    <div className="absolute inset-0 flex items-center justify-center">
      <div className="w-full h-0.5 bg-blue-800"></div>
    </div>
    <div className="absolute inset-0 flex justify-center">
      <div className="w-0.5 h-full bg-blue-800"></div>
    </div>
  </div>
);

const FinlandFlag = () => (
  <div className="w-8 h-6 rounded overflow-hidden bg-white relative">
    <div className="absolute inset-0 flex items-center justify-center">
      <div className="w-full h-1.5 bg-blue-600"></div>
    </div>
    <div className="absolute inset-0 flex justify-center">
      <div className="w-1.5 h-full bg-blue-600"></div>
    </div>
  </div>
);

const LatviaFlag = () => (
  <div className="w-8 h-6 rounded overflow-hidden">
    <div className="w-full h-2 bg-red-700"></div>
    <div className="w-full h-2 bg-white"></div>
    <div className="w-full h-2 bg-red-700"></div>
  </div>
);

const DenmarkFlag = () => (
  <div className="w-8 h-6 rounded overflow-hidden bg-red-600 relative">
    <div className="absolute inset-0 flex items-center justify-center">
      <div className="w-full h-1 bg-white"></div>
    </div>
    <div className="absolute inset-0 flex justify-center">
      <div className="w-1 h-full bg-white"></div>
    </div>
  </div>
);

const USAFlag = () => (
  <div className="w-8 h-6 rounded overflow-hidden">
    <div className="w-full h-1 bg-red-600"></div>
    <div className="w-full h-1 bg-white"></div>
    <div className="w-full h-1 bg-red-600"></div>
    <div className="w-full h-1 bg-white"></div>
    <div className="w-full h-1 bg-red-600"></div>
    <div className="w-full h-1 bg-white"></div>
    <div className="absolute top-0 left-0 w-3 h-3 bg-blue-800"></div>
  </div>
);

const CanadaFlag = () => (
  <div className="w-8 h-6 rounded overflow-hidden bg-white relative">
    <div className="absolute left-0 top-0 w-2 h-full bg-red-600"></div>
    <div className="absolute right-0 top-0 w-2 h-full bg-red-600"></div>
    <div className="absolute inset-0 flex items-center justify-center">
      <div className="w-2 h-2 bg-red-600 transform rotate-45"></div>
    </div>
  </div>
);

interface DreamCountry {
  name: string;
  flag: string | (() => React.JSX.Element);
  type: 'image' | 'component';
  removeBackground?: boolean;
}

export const Countries = () => {
  const navigate = useNavigate();
  const [activeCountry, setActiveCountry] = useState('France');

  const countries = [
    {
      name: 'Germany',
      image: germanyImg,
      description:
        "Explore world-class engineering and research opportunities in Germany's top universities.",
    },
    {
      name: 'United Kingdom',
      image: ukImg,
      description: 'Unlock diverse academic programs and vibrant campus life across the UK.',
    },
    {
      name: 'Netherlands',
      image: netherlandsImg,
      description:
        'Benefit from innovative teaching methods and international study environments.',
    },
    {
      name: 'Spain',
      image: spainImg,
      description:
        'Experience rich culture and excellent programs in arts, business, and sciences.',
    },
    {
      name: 'Italy',
      image: italyImg,
      description:
        'Study in historic cities with renowned universities and vibrant student communities.',
    },
    {
      name: 'Ireland',
      image: irelandImg,
      description:
        'Join innovative programs and enjoy a welcoming environment for international students.',
    },
  ];

  const dreamCountries: DreamCountry[] = [
    { name: 'Germany', flag: germanyFlag, type: 'image' },
    { name: 'United Kingdom', flag: ukFlag, type: 'image' },
    { name: 'Netherlands', flag: netherlandsFlag, type: 'image' },
    { name: 'Spain', flag: spainFlag, type: 'image' },
    { name: 'Italy', flag: italyFlag, type: 'image' },
    { name: 'Ireland', flag: irelandFlag, type: 'image' },
    { name: 'France', flag: franceFlag, type: 'image', removeBackground: true },
    { name: 'Norway', flag: NorwayFlag, type: 'component' },
    { name: 'Finland', flag: FinlandFlag, type: 'component' },
    { name: 'Latvia', flag: LatviaFlag, type: 'component' },
    { name: 'Denmark', flag: DenmarkFlag, type: 'component' },
    { name: 'Luxembourg', flag: austriaFlag, type: 'image' },
    { name: 'Russia', flag: russiaFlag, type: 'image' },
    { name: 'Ukraine', flag: UkraineFlag, type: 'component' },
    { name: 'Georgia', flag: croatiaFlag, type: 'image' },
    { name: 'USA', flag: USAFlag, type: 'component' },
    { name: 'Canada', flag: CanadaFlag, type: 'component' },
    { name: 'Australia', flag: albaniaFlag, type: 'image' },
    { name: 'New Zealand', flag: romaniaFlag, type: 'image' },
    { name: 'Singapore', flag: switzerlandFlag, type: 'image' },
    { name: 'South Korea', flag: croatiaFlag, type: 'image' },
    { name: 'Japan', flag: icelandFlag, type: 'image' },
    { name: 'Switzerland', flag: switzerlandFlag, type: 'image' },
    { name: 'Sweden', flag: swedenFlag, type: 'image' },
    { name: 'Poland', flag: polandFlag, type: 'image' },
    { name: 'Belgium', flag: belgiumFlag, type: 'image' },
    { name: 'Portugal', flag: portugalFlag, type: 'image' },
    { name: 'Austria', flag: austriaFlag, type: 'image' },
    { name: 'Iceland', flag: icelandFlag, type: 'image' },
    { name: 'Croatia', flag: croatiaFlag, type: 'image' },
    { name: 'Romania', flag: romaniaFlag, type: 'image' },
    { name: 'Albania', flag: albaniaFlag, type: 'image' },
  ];

  const handleCountryClick = (countryName: string) => {
    if (countryName === 'Germany') {
      navigate('/germany-tools');
    } else {
      sessionStorage.setItem('selectedCountry', countryName);
      navigate('/cost-calculator/questionnaire');
    }
  };

  const handleDreamCountryClick = (countryName: string) => {
    setActiveCountry(countryName);
    if (countryName === 'Germany') {
      navigate('/germany-tools');
    } else {
      sessionStorage.setItem('selectedCountry', countryName);
      navigate('/cost-calculator/questionnaire');
    }
  };

  return (
    <section id="country-list" className="py-16 bg-background">
      <div className="container-app">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl lg:text-4xl font-heading font-bold text-foreground mb-4">
            Choose Your Study Destination
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Explore top study destinations and calculate your costs for studying abroad
          </p>
        </motion.div>

        {/* Main country cards */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {countries.map((country, index) => (
            <motion.div
              key={country.name}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              whileHover={{ scale: 1.03 }}
              className="relative group cursor-pointer rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300"
              onClick={() => handleCountryClick(country.name)}
            >
              <div className="relative h-80">
                <img
                  src={country.image}
                  alt={country.name}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                  <h3 className="text-2xl font-heading font-bold mb-2">
                    {country.name}
                  </h3>
                  <p className="text-sm opacity-90 mb-4">
                    {country.description}
                  </p>
                  <button className="bg-white text-black px-6 py-2 rounded-full font-semibold hover:bg-gray-100 transition-colors">
                    Calculate Now
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Dream Country Selector */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="mt-16 relative"
        >
          {/* Left Arrow */}
          <button
            onClick={() => {
              const container = document.querySelector(
                '.dream-country-scroll'
              );
              container?.scrollBy({ left: -200, behavior: 'smooth' });
            }}
            className="absolute -left-6 top-1/2 transform -translate-y-1/2 p-3 rounded-full bg-white shadow-lg hover:shadow-xl transition-all z-10 border border-gray-200"
          >
            <ChevronLeft className="w-6 h-6 text-gray-600" />
          </button>

          {/* Right Arrow */}
          <button
            onClick={() => {
              const container = document.querySelector(
                '.dream-country-scroll'
              );
              container?.scrollBy({ left: 200, behavior: 'smooth' });
            }}
            className="absolute -right-6 top-1/2 transform -translate-y-1/2 p-3 rounded-full bg-white shadow-lg hover:shadow-xl transition-all z-10 border border-gray-200"
          >
            <ChevronRight className="w-6 h-6 text-gray-600" />
          </button>

          <div className="bg-muted rounded-2xl p-8">
            <h2 className="text-2xl font-heading font-bold text-center mb-6">
              Choose Your Dream Country
            </h2>

            <div
              className="dream-country-scroll flex space-x-4 overflow-x-auto pb-4"
              style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
            >
              {dreamCountries.map((country) => (
                <motion.button
  key={country.name}
  whileHover={{ scale: 1.05 }}
  whileTap={{ scale: 0.95 }}
  onClick={() => handleDreamCountryClick(country.name)}
  className={`flex-shrink-0 flex items-center space-x-3 px-6 py-3 rounded-xl font-semibold transition-colors ${
    activeCountry === country.name
      ? 'bg-white text-foreground'              // no shadow, no ring
      : 'bg-white text-foreground hover:bg-primary/10'
  }`}
>
  {country.type === 'component' ? (
    React.createElement(country.flag as () => React.JSX.Element)
  ) : (
    <img
      src={country.flag as string}
      alt={`${country.name} flag`}
      className={`w-8 h-6 object-cover ${country.removeBackground ? '' : 'rounded'}`}
      style={
        country.removeBackground
          ? {
              backgroundColor: 'transparent',
              border: 'none',
              boxShadow: 'none',
              background: 'none',
              borderRadius: '0',
              mixBlendMode: 'multiply',
            }
          : {}
      }
    />
  )}
  <span>{country.name}</span>
</motion.button>


              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
