interface InfoProps {
    icon: React.ElementType;
    label: string;
    value: string;
}

export const InfoItem = ({ icon: Icon, label, value }: InfoProps) => (
    <div className="flex items-start text-left gap-4">
        <div className="bg-surface p-3.5 rounded-xl text-text-secondary">
            <Icon size={16} />
        </div>
        <div className="min-w-0">
            <p className="text-xs text-text-primary font-bold mb-1">{label}</p>
            <p className="text-sm text-text-secondary truncate">{value}</p>
        </div>
    </div>
);