import { motion } from "framer-motion";

const CoverImage = ({ src }: { src?: string }) => (
    <div className="absolute inset-0">
        <motion.div
            initial={{ scale: 1.2, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 1.5, ease: "easeOut" }}
            className="h-full w-full bg-cover bg-center transition-transform duration-1000 group-hover:scale-110"
            style={{ backgroundImage: `url(${src})` }}
        />
        {/* Overlay */}
        <div className="absolute inset-0 bg-black/40" />
        <div className="absolute inset-0 bg-linear-to-t from-black/90 via-black/20 to-transparent" />
    </div>
);

export default CoverImage;