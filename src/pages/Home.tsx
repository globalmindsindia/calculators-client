import { motion } from 'framer-motion';
import { Hero } from '../components/Hero';
import { Countries } from '../components/Countries';
import { FAQ } from '../components/FAQ';
import Footer from '../components/Footer';

const Home = () => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="min-h-screen pt-20"
    >
      <Hero />
      <Countries />
      <FAQ />
      <Footer />
    </motion.div>
  );
};

export default Home;