interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    variant?: 'primary' | 'secondary' | 'outline' | 'danger' | 'normal';
    isLoading?: boolean;
}

const Button = ({
    children,
    variant = 'primary',
    isLoading,
    className,
    ...props
}: ButtonProps) => {

    const baseStyles = "inline-flex items-center justify-center font-semibold transition-all active:scale-95 cursor-pointer disabled:opacity-50 disabled:pointer-events-none";

    const variants = {
        primary: "bg-primary text-white hover:bg-primary/90 shadow-md shadow-primary/20",
        secondary: "bg-text-secondary text-white hover:bg-text-secondary/80 shadow-md shadow-text-secondary/20",
        outline: "bg-gray-100 text-gray-500 text-text-primary hover:bg-gray-200 shadow-sm shadow-gray-300",
        danger: "bg-red-500 text-white hover:bg-red-600 shadow-md shadow-red-300",
        normal: "",
    };

    return (
        <button
            className={`${baseStyles} ${variants[variant]} ${className}`}
            disabled={isLoading}
            {...props}
        >
            {isLoading ? (
                <span className="flex items-center gap-2">
                    <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    Loading...
                </span>
            ) : children}
        </button>
    );
};

export default Button;