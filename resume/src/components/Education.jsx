import { motion } from 'framer-motion';
import { GraduationCap, Calendar, MapPin } from 'lucide-react';
import { useInView } from '../hooks/useInView';

const EducationCard = ({ education, index }) => {
  const [ref, isInView] = useInView({ threshold: 0.2 });

  const cardVariants = {
    hidden: { opacity: 0, scale: 0.9 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.5,
        delay: index * 0.2
      }
    }
  };

  return (
    <motion.div
      ref={ref}
      variants={cardVariants}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      className="glass-effect rounded-2xl p-6 hover:shadow-2xl transition-all duration-300 hover:scale-[1.02]"
    >
      <div className="flex items-start gap-4 mb-4">
        <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center flex-shrink-0">
          <GraduationCap className="w-6 h-6 text-white" />
        </div>
        <div className="flex-1">
          <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-1">
            {education.degree}
          </h3>
          <p className="text-lg font-semibold text-blue-600 dark:text-blue-400 mb-2">
            {education.school}
          </p>
          <div className="flex flex-wrap gap-4 text-sm text-gray-600 dark:text-gray-300">
            <div className="flex items-center gap-2">
              <Calendar className="w-4 h-4" />
              <span>{education.startDate} - {education.endDate}</span>
            </div>
            <div className="flex items-center gap-2">
              <MapPin className="w-4 h-4" />
              <span>{education.location}</span>
            </div>
            {education.gpa && (
              <div className="px-3 py-1 rounded-full bg-blue-100 text-blue-700 font-semibold">
                GPA: {education.gpa}
              </div>
            )}
          </div>
        </div>
      </div>

      {education.achievements && (
        <ul className="space-y-2 mt-4">
          {education.achievements.map((achievement, idx) => (
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
      )}
    </motion.div>
  );
};

const Education = ({ data }) => {
  const [ref, isInView] = useInView({ threshold: 0.1 });

  return (
    <section ref={ref} className="mb-8">
      <motion.h2
        initial={{ opacity: 0, y: 20 }}
        animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
        transition={{ duration: 0.6 }}
        className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-8 flex items-center gap-3"
      >
        <GraduationCap className="w-8 h-8 text-blue-600 dark:text-blue-400" />
        Education
      </motion.h2>

      <div className="grid grid-cols-1 gap-6">
        {data.map((education, index) => (
          <EducationCard key={education.id} education={education} index={index} />
        ))}
      </div>
    </section>
  );
};

export default Education;
