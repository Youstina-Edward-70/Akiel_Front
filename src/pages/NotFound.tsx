import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { IoSearchOutline } from "react-icons/io5";
import Button from "../ui/Button";

const NotFound = ({code, message, subtitle} : { code: string; message: string; subtitle: string }) => {
    const navigate = useNavigate();

    return (
        <div className="min-h-screen flex items-center justify-center bg-white px-4">
            <div className="max-w-md w-full text-center">
                
                <div className="relative flex justify-center mb-12">
                    <motion.div
                        initial={{ scale: 0.8, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        transition={{ duration: 0.5 }}
                        className="relative w-48 h-48 md:w-56 md:h-56 bg-[#f8f8f8] rounded-full shadow-inner flex items-center justify-center border border-gray-100"
                    >
                        <div className="w-4/5 h-4/5 bg-white rounded-full shadow-2xl flex items-center justify-center border-b-4 border-gray-200">
                            <span className="text-primary text-7xl md:text-8xl font-black drop-shadow-sm">?</span>
                        </div>
                        
                        <motion.div 
                            initial={{ y: 20, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            transition={{ delay: 0.4, type: "spring" }}
                            className="absolute -top-2 -right-2 bg-secondary text-white px-4 py-2 rounded-2xl text-xl font-black shadow-lg transform rotate-12"
                        >
                            {code}
                        </motion.div>
                    </motion.div>
                    
                    <div className="absolute -bottom-4 w-32 h-4 bg-gray-100 rounded-[100%] blur-md" />
                </div>

                {/* 2. Text Content */}
                <motion.div
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.2 }}
                >
                    <h1 className="text-3xl md:text-4xl font-black text-text-primary mb-4 leading-tight">
                        {message}
                    </h1>
                    <p className="text-gray-500 font-medium mb-10 leading-relaxed">
                        {subtitle}
                    </p>
                </motion.div>

                {/* 3. Action Buttons */}
                <motion.div
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.3 }}
                    className="flex flex-col items-center gap-6"
                >
                    <Button 
                        variant="primary" 
                        onClick={() => navigate("/")}
                        className="w-full md:w-auto px-12 py-4 rounded-2xl text-lg shadow-xl shadow-primary/20"
                    >
                        Back to Home
                    </Button>

                    <button 
                        onClick={() => navigate("/search")}
                        className="flex items-center gap-2 text-primary font-bold hover:underline cursor-pointer transition-all group"
                    >
                        <IoSearchOutline className="group-hover:scale-110 transition-transform" />
                        Or search for a restaurant here
                    </button>
                </motion.div>

            </div>
        </div>
    );
};

export default NotFound;