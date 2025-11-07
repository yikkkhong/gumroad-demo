import { motion } from 'framer-motion';
import { Mail, Phone, MapPin, Globe, Linkedin, Github } from 'lucide-react';

const Header = ({ data }) => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { y: -20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.5 }
    }
  };

  const contactInfo = [
    { icon: Mail, text: data.email, href: `mailto:${data.email}` },
    { icon: Phone, text: data.phone, href: `tel:${data.phone}` },
    { icon: MapPin, text: data.location },
    { icon: Globe, text: data.website, href: `https://${data.website}` },
    { icon: Linkedin, text: 'LinkedIn', href: `https://${data.linkedin}` },
    { icon: Github, text: 'GitHub', href: `https://${data.github}` }
  ];

  return (
    <motion.header
      className="glass-effect rounded-3xl p-8 md:p-12 mb-8"
      initial="hidden"
      animate="visible"
      variants={containerVariants}
    >
      <div className="text-center">
        <motion.div
          variants={itemVariants}
          className="mb-4"
        >
          <div className="w-32 h-32 mx-auto mb-6 rounded-full bg-gradient-to-br from-blue-500 to-indigo-600 p-1 animate-float">
            <div className="w-full h-full rounded-full bg-white dark:bg-gray-800 flex items-center justify-center text-5xl font-bold text-gradient">
              {data.name.split(' ').map(n => n[0]).join('')}
            </div>
          </div>
        </motion.div>

        <motion.h1
          variants={itemVariants}
          className="text-4xl md:text-6xl font-bold text-gray-900 dark:text-white mb-3"
        >
          {data.name}
        </motion.h1>

        <motion.p
          variants={itemVariants}
          className="text-xl md:text-2xl text-gradient font-semibold mb-8"
        >
          {data.title}
        </motion.p>

        <motion.div
          variants={itemVariants}
          className="flex flex-wrap justify-center gap-4 md:gap-6"
        >
          {contactInfo.map((item, index) => {
            const Icon = item.icon;
            const content = (
              <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-white/50 dark:bg-gray-700/50 hover:bg-white/80 dark:hover:bg-gray-600/80 transition-all duration-300 hover:scale-105 cursor-pointer">
                <Icon className="w-4 h-4 text-blue-600 dark:text-blue-400" />
                <span className="text-sm text-gray-700 dark:text-gray-200">{item.text}</span>
              </div>
            );

            return item.href ? (
              <a key={index} href={item.href} target="_blank" rel="noopener noreferrer">
                {content}
              </a>
            ) : (
              <div key={index}>{content}</div>
            );
          })}
        </motion.div>
      </div>
    </motion.header>
  );
};

export default Header;
