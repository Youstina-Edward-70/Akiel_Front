import { useNavigate } from "react-router-dom";
import Button from "../../../ui/Button";

const AboutHero = () => {
  const navigate = useNavigate();
  return (
  <section className="relative h-150 flex items-center justify-center text-white overflow-hidden">
    <img src="/images/hero-about.jpg" className="absolute inset-0 w-full h-full object-cover brightness-50" alt="About Us" />
    <div className="relative text-center px-4">
      <h1 className="text-5xl font-extrabold mb-4">About Us</h1>
      <p className="max-w-xl mx-auto text-lg text-gray-200 mb-8">
        We love food as much as you do, so we help you find the best restaurants in Egypt with ease and trust.
      </p>
      <Button 
      onClick={() => navigate('/search')}
      className="bg-primary hover:bg-primary/90 px-8 py-3 rounded-2xl">
        Explore Restaurants
      </Button>
    </div>
  </section>
)};

export default AboutHero;