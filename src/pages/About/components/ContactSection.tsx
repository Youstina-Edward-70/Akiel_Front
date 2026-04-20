import React, { useState } from 'react';
import { HiOutlineMail, HiOutlineLocationMarker } from 'react-icons/hi';
import { FaWhatsapp, FaGlobe, FaInstagram, FaAt, FaTelegramPlane } from 'react-icons/fa';
import Button from '../../../ui/Button';

const ContactSection = () => {
    // Form State
    const [formData, setFormData] = useState({
        userName: '',
        email: '',
        message: ''
    });

    const [isSubmitting, setIsSubmitting] = useState(false);

    // Handle Input Change
    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    // Handle Submit
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);

        // API or EmailJS
        console.log("Form Submitted:", formData);
    };

    return (
        <section className="py-16 px-4 bg-gray-50">
            <div className="max-w-6xl mx-auto bg-white rounded-4xl overflow-hidden shadow-2xl flex flex-col md:flex-row border border-gray-100">
                
                {/* --- Left Side: Form --- */}
                <div className="flex-2 p-8 md:p-14">
                    <h2 className="text-4xl font-black text-text-primary mb-10">Contact Us</h2>
                    
                    <form onSubmit={handleSubmit} className="space-y-8">
                        <div className="grid md:grid-cols-2 gap-8">
                            {/* Name Input */}
                            <div className="space-y-2">
                                <label className="text-sm font-bold text-text-primary ml-1">Your Name</label>
                                <input
                                    required
                                    type="text"
                                    name="userName"
                                    value={formData.userName}
                                    onChange={handleChange}
                                    placeholder="Enter your name"
                                    className="w-full p-4 bg-surface rounded-2xl border border-transparent focus:border-red-500 focus:bg-white outline-none transition-all placeholder:text-gray-400"
                                />
                            </div>
                            {/* Email Input */}
                            <div className="space-y-2">
                                <label className="text-sm font-bold text-text-primary ml-1">Email Address</label>
                                <input
                                    required
                                    type="email"
                                    name="email"
                                    value={formData.email}
                                    onChange={handleChange}
                                    placeholder="name@example.com"
                                    className="w-full p-4 bg-surface rounded-2xl border border-transparent focus:border-red-500 focus:bg-white outline-none transition-all placeholder:text-gray-400"
                                />
                            </div>
                        </div>

                        {/* Message Input */}
                        <div className="space-y-2">
                            <label className="text-sm font-bold text-text-primary ml-1">Message</label>
                            <textarea
                                required
                                name="message"
                                value={formData.message}
                                onChange={handleChange}
                                rows={5}
                                placeholder="Tell us how we can help you..."
                                className="w-full p-4 bg-surface rounded-2xl border border-transparent focus:border-red-500 focus:bg-white outline-none transition-all resize-none placeholder:text-gray-400"
                            />
                        </div>

                        {/* Submit Button */}
                        <Button 
                            type="submit"
                            disabled={isSubmitting}
                            className="w-full text-white py-4 rounded-2xl font-bold text-lg flex items-center gap-3 shadow-lg"
                        >
                            {isSubmitting ? 'Sending...' : 'Send Message'}
                            {!isSubmitting && (<FaTelegramPlane className="text-xl" />)}
                        </Button>
                    </form>
                </div>

                {/* --- Right Side: Get in Touch --- */}
                <div className="flex-1 bg-primary p-10 md:p-14 text-white flex flex-col justify-between relative overflow-hidden">
                    {/* Background Decoration */}
                    <div className="absolute top-[-10%] right-[-10%] w-64 h-64 bg-white opacity-5 rounded-full" />
                    
                    <div>
                        <h3 className="text-2xl font-bold mb-12 tracking-tight">Get in Touch</h3>
                        
                        <div className="space-y-10">
                            {/* Email */}
                            <div className="flex items-center gap-5 group">
                                <div className="p-3 bg-white/15 rounded-xl group-hover:bg-white/25 transition-colors">
                                    <HiOutlineMail size={26} />
                                </div>
                                <div>
                                    <p className="text-xs text-red-100 font-bold uppercase tracking-wider mb-0.5">Email Us</p>
                                    <p className="font-medium text-lg">hello@akiel.com</p>
                                </div>
                            </div>

                            {/* WhatsApp */}
                            <div className="flex items-center gap-5 group">
                                <div className="p-3 bg-white/15 rounded-xl group-hover:bg-white/25 transition-colors">
                                    <FaWhatsapp size={26} />
                                </div>
                                <div>
                                    <p className="text-xs text-red-100 font-bold uppercase tracking-wider mb-0.5">WhatsApp</p>
                                    <p className="font-medium text-lg">+20 123 456 7890</p>
                                </div>
                            </div>

                            {/* Office */}
                            <div className="flex items-center gap-5 group">
                                <div className="p-3 bg-white/15 rounded-xl group-hover:bg-white/25 transition-colors">
                                    <HiOutlineLocationMarker size={26} />
                                </div>
                                <div>
                                    <p className="text-xs text-red-100 font-bold uppercase tracking-wider mb-0.5">Office</p>
                                    <p className="font-medium text-lg">Maadi, Cairo, Egypt</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Social Icons */}
                    <div className="mt-16">
                        <p className="text-xs font-bold uppercase tracking-widest text-red-100 mb-6">Follow Our Journey</p>
                        <div className="flex gap-4">
                            {[FaGlobe, FaInstagram, FaAt].map((Icon, i) => (
                                <a key={i} href="#" className="p-3 bg-white/10 hover:bg-white hover:text-primary rounded-full transition-all duration-300 shadow-sm">
                                    <Icon size={18} />
                                </a>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default ContactSection;