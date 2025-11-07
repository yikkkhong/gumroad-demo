import { motion } from 'framer-motion';
import { CheckCircle2 } from 'lucide-react';
import { useInView } from '../hooks/useInView';

const About = ({ data }) => {
  const [ref, isInView] = useInView({ threshold: 0.2 });

  const containerVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: {
      opacity: 1,
      x: 0,
      transition: { duration: 0.5 }
    }
  };

  return (
    <motion.section
      ref={ref}
      className="glass-effect rounded-3xl p-8 md:p-10 mb-8"
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      variants={containerVariants}
    >
      <motion.h2
        variants={itemVariants}
        className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-6 flex items-center gap-3"
      >
        <span className="w-2 h-10 bg-gradient-to-b from-blue-500 to-indigo-600 rounded-full"></span>
        About Me
      </motion.h2>

      <motion.p
        variants={itemVariants}
        className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed mb-6"
      >
        {data.summary}
      </motion.p>

      <motion.div
        variants={containerVariants}
        className="grid grid-cols-1 md:grid-cols-2 gap-4"
      >
        {data.highlights.map((highlight, index) => (
          <motion.div
            key={index}
            variants={itemVariants}
            className="flex items-center gap-3 p-4 rounded-xl bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 hover:from-blue-100 hover:to-indigo-100 dark:hover:from-blue-800/30 dark:hover:to-indigo-800/30 transition-all duration-300"
          >
            <CheckCircle2 className="w-6 h-6 text-blue-600 dark:text-blue-400 flex-shrink-0" />
            <span className="text-gray-800 dark:text-gray-200 font-medium">{highlight}</span>
          </motion.div>
        ))}
      </motion.div>
    </motion.section>
  );
};

export default About;
