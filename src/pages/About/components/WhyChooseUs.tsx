import { FaRegStar, FaRegHeart } from "react-icons/fa";
import { BsImage, BsForkKnife } from "react-icons/bs";

const features = [
    { icon: FaRegStar, color: '#FF6D00', title: 'Real User Reviews', desc: 'Authentic feedback from our community members to guide your choices.' },
    { icon: BsImage, color: '#00A651', title: 'Updated Photos', desc: 'Fresh visuals and digital menus updated regularly by the Akiel team.' },
    { icon: FaRegHeart, color: '#EF4444', title: 'Owner Support', desc: 'Direct communication line with restaurant owners for special requests.' },
    { icon: BsForkKnife, color: '#6867BD', title: '100% Free & Easy', desc: 'Our guide is always free for foodies, with a seamless search experience.' },
];

const WhyChooseUs = () => {
    return (
        <section className="py-20 text-center bg-gray-50">
            <h2 className="text-3xl font-bold mb-4">Why Choose Us</h2>
            <div className="w-16 h-1 bg-primary rounded-full mx-auto mb-12" />
            <div className="max-w-7xl mx-auto px-6 grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {features.map((f, i) => {
                    const Icon = f.icon;
                    return (
                    <div key={i} className="bg-white p-8 rounded-2xl md:text-start shadow-md hover:shadow-md transition-shadow">
                        <div className="text-4xl mb-4 ">
                            <Icon 
                            style={{ '--icon-color': f.color } as React.CSSProperties}
                            className="rounded-lg p-2 bg-(--icon-color)/10 text-(--icon-color)" />
                        </div>
                        <h3 className="font-bold mb-2">{f.title}</h3>
                        <p className="text-sm text-slate-500">{f.desc}</p>
                    </div>
                )})}
            </div>
        </section>
    )
}

export default WhyChooseUs