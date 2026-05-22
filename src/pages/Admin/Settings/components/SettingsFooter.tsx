import Button from "../../../../ui/Button";

interface SettingsFooterProps {
    isSaving: boolean;
    onReset: () => void;
}

export const SettingsFooter = ({ isSaving, onReset }: SettingsFooterProps) => (
    <div className="flex items-center justify-end gap-4 bg-transparent pt-4">
        <Button
            type="button"
            onClick={onReset}
            variant="normal"
            className="bg-white hover:bg-gray-50 px-6 py-3 rounded-full text-sm font-bold shadow-sm"
        >
            Reset to Defaults
        </Button>
        <Button
            type="submit"
            isLoading={isSaving}
            variant="primary"
            className="px-6 py-3 rounded-full text-sm font-bold shadow-sm"
        >
            Save Settings
        </Button>
    </div>
);