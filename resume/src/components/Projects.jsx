import { motion } from 'framer-motion';
import { Folder, ExternalLink } from 'lucide-react';
import { useInView } from '../hooks/useInView';

const ProjectCard = ({ project, index }) => {
  const [ref, isInView] = useInView({ threshold: 0.2 });

  const cardVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
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
      whileHover={{ y: -10 }}
      className="glass-effect rounded-2xl p-6 hover:shadow-2xl transition-all duration-300 group"
    >
      <div className="flex items-start justify-between mb-4">
        <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
          <Folder className="w-6 h-6 text-white" />
        </div>
        {project.link && (
          <a
            href={project.link}
            target="_blank"
            rel="noopener noreferrer"
            className="p-2 rounded-lg hover:bg-blue-100 transition-colors duration-300"
          >
            <ExternalLink className="w-5 h-5 text-gray-600 hover:text-blue-600" />
          </a>
        )}
      </div>

      <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors duration-300">
        {project.name}
      </h3>

      <p className="text-gray-700 dark:text-gray-300 mb-4">{project.description}</p>

      <div className="flex flex-wrap gap-2 mb-4">
        {project.technologies.map((tech, idx) => (
          <span
            key={idx}
            className="px-3 py-1 rounded-full bg-blue-100 text-blue-700 text-sm font-medium"
          >
            {tech}
          </span>
        ))}
      </div>

      <ul className="space-y-2">
        {project.highlights.map((highlight, idx) => (
          <motion.li
            key={idx}
            initial={{ opacity: 0, x: -10 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -10 }}
            transition={{ delay: 0.4 + idx * 0.1 }}
            className="flex items-start gap-2 text-sm text-gray-600 dark:text-gray-300"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-blue-500 mt-1.5 flex-shrink-0"></span>
            <span>{highlight}</span>
          </motion.li>
        ))}
      </ul>
    </motion.div>
  );
};

const Projects = ({ data }) => {
  const [ref, isInView] = useInView({ threshold: 0.1 });

  return (
    <section ref={ref} className="mb-8">
      <motion.h2
        initial={{ opacity: 0, y: 20 }}
        animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
        transition={{ duration: 0.6 }}
        className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-8 flex items-center gap-3"
      >
        <Folder className="w-8 h-8 text-blue-600 dark:text-blue-400" />
        Featured Projects
      </motion.h2>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {data.map((project, index) => (
          <ProjectCard key={project.id} project={project} index={index} />
        ))}
      </div>
    </section>
  );
};

export default Projects;
