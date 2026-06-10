import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod';
import z from 'zod';
import { HiOutlineMail, HiOutlineLocationMarker } from 'react-icons/hi';
import { FaWhatsapp, FaGlobe, FaInstagram, FaAt, FaTelegramPlane } from 'react-icons/fa';
import Button from '../../../ui/Button';
import { useContact } from '../hooks/useContact';

const contactSchema = z.object({
    userName: z.string().min(2, "Name must be more than 2 characters"),
    email: z.string().email("Email is invalid"),
    message: z.string().min(10, "Message must be 10 letters at least")
});

type ContactFormData = z.infer<typeof contactSchema>;

const ContactSection = () => {
    const { mutate: sendMessage, isPending } = useContact();

    const {
        register,
        handleSubmit,
        reset,
        formState: { errors }
    } = useForm<ContactFormData>({
        resolver: zodResolver(contactSchema)
    });

    const onSubmit = (data: ContactFormData) => {
        sendMessage(
            { name: data.userName, email: data.email, message: data.message },
            { onSuccess: () => reset() }
        );
    };

    return (
        <section className="py-16 px-4 bg-gray-50">
            <div className="max-w-6xl mx-auto bg-white rounded-4xl overflow-hidden shadow-2xl flex flex-col md:flex-row border border-gray-100">

                {/* --- Left Side: Form --- */}
                <div className="flex-2 p-8 md:p-14">
                    <h2 className="text-4xl font-black text-text-primary mb-10">Contact Us</h2>

                    <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
                        <div className="grid md:grid-cols-2 gap-8">
                            {/* Name Input */}
                            <div className="space-y-2">
                                <label className="text-sm font-bold text-text-primary ml-1">Your Name</label>
                                <input
                                    {...register("userName")}
                                    className={`w-full p-4 bg-surface rounded-2xl border outline-none transition-all placeholder:text-gray-400 
                                        ${errors.userName ? "border-danger focus:border-danger" : "border-transparent focus:border-primary focus:bg-white"}`}
                                />

                                {/* Error Container */}
                                <div className="min-h-5">
                                    {errors.userName && (
                                        <p className="pl-2 pt-1 text-xs font-semibold text-danger">
                                            {errors.userName.message}
                                        </p>
                                    )}
                                </div>
                            </div>
                            {/* Email Input */}
                            <div className="space-y-2">
                                <label className="text-sm font-bold text-text-primary ml-1">Email Address</label>
                                <input
                                    {...register("email")}
                                    placeholder="name@example.com"
                                    className={`w-full p-4 bg-surface rounded-2xl border outline-none transition-all placeholder:text-gray-400 
                                        ${errors.email ? "border-danger focus:border-danger" : "border-transparent focus:border-primary focus:bg-white"}`}
                                />
                                {/* Error Container */}
                                <div className="min-h-5">
                                    {errors.email && (
                                        <p className="pl-2 pt-1 text-xs font-semibold text-danger">
                                            {errors.email.message}
                                        </p>
                                    )}
                                </div>
                            </div>
                        </div>

                        {/* Message Input */}
                        <div className="space-y-2">
                            <label className="text-sm font-bold text-text-primary ml-1">Message</label>
                            <textarea
                                {...register("message")}
                                rows={5}
                                placeholder="Tell us how we can help you..."
                                className={`w-full p-4 bg-surface rounded-2xl border outline-none transition-all resize-none placeholder:text-gray-400 
                                    ${errors.message ? "border-danger focus:border-danger" : "border-transparent focus:border-primary focus:bg-white"}`}
                            />
                            {/* Error Container */}
                            <div className="min-h-5">
                                {errors.message && (
                                    <p className="pl-2 pt-1 text-xs font-semibold text-danger">
                                        {errors.message.message}
                                    </p>
                                )}
                            </div>
                        </div>

                        {/* Submit Button */}
                        <Button
                            type="submit"
                            isLoading={isPending}
                            className="w-full py-4 rounded-2xl font-bold text-lg flex items-center gap-3"
                        >
                            {isPending ? 'Sending...' : 'Send Message'}
                            {!isPending && (<FaTelegramPlane className="text-xl" />)}
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