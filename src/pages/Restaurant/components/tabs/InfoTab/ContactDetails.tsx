import { IoCallOutline, IoLogoWhatsapp, IoLogoFacebook } from "react-icons/io5";

interface ContactDetailsProps {
    phoneNumber: string;
    whatsappNumber?: string | null | undefined;
    facebookLink?: string;
}

export const ContactDetails = ({ phoneNumber, whatsappNumber, facebookLink }: ContactDetailsProps) => {
    return (
        <section className="space-y-6">
            <h3 className="text-xl font-bold text-text-primary">Contact Details</h3>
            <div className="grid gap-4">
                <div className="flex items-center gap-4 text-text-secondary">
                    <div className="w-10 h-10 rounded-xl bg-gray-50 flex items-center justify-center">
                        <IoCallOutline className="text-xl text-primary" />
                    </div>
                    <span className="font-bold">{phoneNumber}</span>
                </div>
                
                <div className="flex items-center gap-4 text-text-secondary">
                    <div className="w-10 h-10 rounded-xl bg-gray-50 flex items-center justify-center">
                        <IoLogoWhatsapp className="text-xl text-green-500" />
                    </div>
                    <span className="font-bold">{whatsappNumber || 'Not Available'}</span>
                </div>

                <div className="flex items-center gap-4 text-text-secondary">
                    <div className="w-10 h-10 rounded-xl bg-gray-50 flex items-center justify-center">
                        <IoLogoFacebook className="text-xl text-blue-600" />
                    </div>
                    <span className="font-bold">{facebookLink || 'Not Available'}</span>
                </div>
            </div>
        </section>
    );
};