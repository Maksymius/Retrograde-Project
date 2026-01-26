export const SoundIndicator = ({ active }: { active: boolean, type: string }) => {
    if (!active) return null;
    return (
        <div className="fixed top-4 right-4 text-retro-accent text-xs font-mono border border-retro-accent px-2 py-1 animate-pulse">
            [AUDIO_OUT]
        </div>
    )
}