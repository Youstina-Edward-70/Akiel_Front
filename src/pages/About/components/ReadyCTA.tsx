import { useNavigate } from "react-router-dom";
import Button from "../../../ui/Button";

const ReadyCTA = () => {
    const navigate = useNavigate();
    return (
    <section className="py-16 px-6">
        <div className="px-6 max-w-7xl mx-auto relative h-100 rounded-3xl overflow-hidden flex items-center justify-center">
            <img src="/images/footer-bg.jpg" className="absolute inset-0 w-full h-full object-cover" alt="Discover Now" />
            <div className="relative text-center text-white">
                <h2 className="text-3xl font-bold mb-6">Ready to discover the best food in Egypt?</h2>
                <Button 
                onClick={() => navigate('/search')}
                className="bg-primary hover:bg-primary/90 px-10 py-4 rounded-2xl font-bold">
                    Get Started Now
                </Button>
            </div>
        </div>
    </section>
)};

export default ReadyCTA;