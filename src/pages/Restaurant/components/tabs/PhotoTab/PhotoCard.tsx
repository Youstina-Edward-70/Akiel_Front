import { motion } from "framer-motion";
import { IoTrashOutline } from "react-icons/io5";
import Button from "../../../../../ui/Button";
import type { ApiImage } from "../../../../../types/RestaurantSchema";

type RemoteImage = NonNullable<ApiImage>;

interface PhotoCardProps {
    img: RemoteImage;
    index: number;
    isOwner: boolean;
    onDelete: (img: RemoteImage) => void;
}

const PhotoCard = ({ img, index, isOwner, onDelete }: PhotoCardProps) => {
    console.log(img);
    
    return (
        <motion.div
            layout
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.5 }}
            transition={{ duration: 0.4 }}
            className="relative group overflow-hidden rounded-2xl"
        >
            <img
                src={img.url || "/images/default-rest.svg"}
                alt={`Restaurant view ${index}`}
                className="w-full h-auto object-cover transition-transform duration-700 group-hover:scale-110"
                loading="lazy"
            />

            {/* Overlay */}
            {isOwner &&
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-150 flex items-center justify-center">
                    <Button
                        variant="normal"
                        onClick={() => onDelete(img)}
                        className="h-14 w-14 rounded-full bg-white/20 backdrop-blur-md text-white border border-white/30 hover:bg-primary hover:border-primary transition-all transform translate-y-4 group-hover:translate-y-0 shadow-none duration-300"
                    >
                        <IoTrashOutline className="inline-block" size={24} />
                    </Button>
                </div>
            }
        </motion.div>
    )
}

export default PhotoCard