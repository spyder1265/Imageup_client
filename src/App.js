import './App.css';
import RRoutes from "./components/Routes/RRoutes";
import { motion, AnimatePresence } from "framer-motion";
import {useEffect, useState} from "react";



function App() {

  const [isLoaded, setIsLoaded] = useState(false);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { duration: 2 } },
    exit: { opacity: 0, transition: { duration: 0.5 } },
  };

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  return (
      <AnimatePresence>
        <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
        >
          {isLoaded && (
                <RRoutes/>
          )}
        </motion.div>
      </AnimatePresence>
  );
}

export default App;
