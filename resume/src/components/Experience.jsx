import { motion } from 'framer-motion';
import { Briefcase, Calendar, MapPin } from 'lucide-react';
import { useInView } from '../hooks/useInView';

const ExperienceCard = ({ experience, index }) => {
  const [ref, isInView] = useInView({ threshold: 0.2 });

  const cardVariants = {
    hidden: { opacity: 0, x: index % 2 === 0 ? -50 : 50 },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.6,
        delay: index * 0.1
      }
    }
  };

  return (
    <motion.div
      ref={ref}
      variants={cardVariants}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      className="relative pl-8 pb-8 border-l-2 border-blue-200 last:pb-0"
    >
      <div className="absolute -left-3 top-0 w-6 h-6 rounded-full bg-gradient-to-br from-blue-500 to-indigo-600 border-4 border-white shadow-lg"></div>
      
      <div className="glass-effect rounded-2xl p-6 hover:shadow-2xl transition-all duration-300 hover:scale-[1.02]">
        <div className="flex flex-wrap items-start justify-between gap-4 mb-4">
          <div>
            <h3 className="text-xl md:text-2xl font-bold text-gray-900 dark:text-white mb-1">
              {experience.position}
            </h3>
            <p className="text-lg font-semibold text-blue-600 dark:text-blue-400 mb-2">
              {experience.company}
            </p>
          </div>
          <div className="flex flex-col gap-2 text-sm text-gray-600 dark:text-gray-300">
            <div className="flex items-center gap-2">
              <Calendar className="w-4 h-4" />
              <span>{experience.startDate} - {experience.endDate}</span>
            </div>
            <div className="flex items-center gap-2">
              <MapPin className="w-4 h-4" />
              <span>{experience.location}</span>
            </div>
          </div>
        </div>

        <p className="text-gray-700 dark:text-gray-300 mb-4 italic">{experience.description}</p>

        <ul className="space-y-2">
          {experience.achievements.map((achievement, idx) => (
            <motion.li
              key={idx}
              initial={{ opacity: 0, x: -10 }}
              animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -10 }}
              transition={{ delay: 0.3 + idx * 0.1 }}
              className="flex items-start gap-3 text-gray-700 dark:text-gray-300"
            >
              <span className="w-2 h-2 rounded-full bg-blue-500 mt-2 flex-shrink-0"></span>
              <span>{achievement}</span>
            </motion.li>
          ))}
        </ul>
      </div>
    </motion.div>
  );
};

const Experience = ({ data }) => {
  const [ref, isInView] = useInView({ threshold: 0.1 });

  return (
    <section ref={ref} className="mb-8">
      <motion.h2
        initial={{ opacity: 0, y: 20 }}
        animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
        transition={{ duration: 0.6 }}
        className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-8 flex items-center gap-3"
      >
        <Briefcase className="w-8 h-8 text-blue-600 dark:text-blue-400" />
        Work Experience
      </motion.h2>

      <div className="space-y-0">
        {data.map((experience, index) => (
          <ExperienceCard key={experience.id} experience={experience} index={index} />
        ))}
      </div>
    </section>
  );
};

export default Experience;
