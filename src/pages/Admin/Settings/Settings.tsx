import { useSettings } from "./hooks/useSettings";
import { SettingsHeader } from "./components/SettingsHeader";
import { PriceClassifications } from "./components/PriceClassifications";
import { SuspensionPolicy } from "./components/SuspensionPolicy";
import { SettingsFooter } from "./components/SettingsFooter";
import SettingsSkeleton from "./components/SettingsSkeleton";
import { SettingsError } from "./components/SettingsError";

const Settings = () => {
    const { 
        isLoading, 
        isError, 
        refetch, 
        form, 
        isSaving, 
        onSubmit, 
        handleResetToDefaults 
    } = useSettings();

    if (isLoading) {
        return <SettingsSkeleton />;
    }

    if (isError) {
        return (
            <SettingsError onRetry={() => refetch()}/>
        );
    }

    const { register, formState: { errors } } = form;

    return (
        <div className="space-y-8 font-sans">
            {/* Header Block */}
            <SettingsHeader />

            <form onSubmit={onSubmit} className="space-y-6">
                {/* Price Classifications */}
                <PriceClassifications register={register} errors={errors} />

                {/* Account Suspension Policy */}
                <SuspensionPolicy register={register} errors={errors} />

                {/* Action Buttons Footer */}
                <SettingsFooter isSaving={isSaving} onReset={handleResetToDefaults} />
            </form>
        </div>
    );
};

export default Settings;