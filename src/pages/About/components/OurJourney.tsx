const OurJourney = () => (
    <section className="max-w-7xl mx-6 my-16 grid md:grid-cols-2 gap-12 rounded-2xl overflow-hidden shadow-2xl">
        <div className="p-10 md:p-16 text-center md:text-start">
            <span className="bg-red-100 text-red-500 px-3 py-1 rounded text-xs font-bold uppercase">Our Journey</span>
            <h2 className="text-3xl font-bold text-slate-900 mt-4 mb-6">Our Journey with Egyptian Food</h2>
            <div className="space-y-4 text-slate-600 leading-relaxed">
                <p>
                    Akiel started with a group of Egyptian youth passionate
                    about their local cuisine. We realized that finding
                    authentic, high-quality dining experiences was often
                    harder than it should be.
                </p>
                <p>
                    We wanted to create a bridge between hungry foodies
                    and the hidden gems of Egypt, making it easier than ever
                    to find authentic flavors with trust. Our platform is built by
                    food lovers, for food lovers, ensuring that every
                    recommendation meets the highest standards of Egyptian
                    hospitality.
                </p>
            </div>
        </div>
        <div className="">
            <img src="/images/team-eating.jpg" alt="Our Team" className="w-full h-full object-cover" />
        </div>
    </section>
);

export default OurJourney;