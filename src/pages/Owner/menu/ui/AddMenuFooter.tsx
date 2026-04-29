import Button from "../../../../ui/Button";

interface AddMenuFooterProps {
    totalItems: number;
    isPending: boolean;
}

const AddMenuFooter = ({ totalItems, isPending }: AddMenuFooterProps) => {
    return (
        <div className="sticky bottom-0 left-0 right-0 w-full border-t border-gray-100 bg-white/80 p-4 backdrop-blur-md z-10 shadow-[0_-10px_30px_rgba(0,0,0,0.05)]">
            <div className="mx-auto flex max-w-6xl items-center justify-between px-4 md:px-8">
                <div className="hidden md:block">
                    <p className="text-sm font-medium text-text-secondary">
                        Total Items: <span className="text-primary font-bold">{totalItems}</span>
                    </p>
                </div>

                <div className="flex w-full md:w-auto gap-4">
                    <Button
                        type="submit"
                        disabled={isPending}
                        className="w-full md:w-auto rounded-full px-12 py-4 text-base font-bold shadow-lg shadow-primary/20"
                    >
                        {isPending ? "Saving Menu..." : `Save Full Menu (${totalItems} Items)`}
                    </Button>
                </div>
            </div>
        </div>
    );
};

export default AddMenuFooter;