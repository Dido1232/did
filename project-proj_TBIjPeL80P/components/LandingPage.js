function LandingPage({ onModeSelect }) {
    return (
        <div data-name="landing-container" className="min-h-screen flex items-center justify-center p-4">
            <div data-name="landing-content" className="text-center space-y-8 anime-card p-8 rounded-xl w-full max-w-md">
                <h1 data-name="landing-title" className="text-5xl font-bold neon-text mb-12">
                    Manga Platform
                </h1>
                <div data-name="landing-buttons" className="space-y-6">
                    <button
                        data-name="writer-button"
                        onClick={() => onModeSelect('writer')}
                        className="w-full anime-button px-8 py-4 rounded-xl text-xl font-semibold"
                    >
                        Writer Mode
                    </button>
                    <button
                        data-name="reader-button"
                        onClick={() => onModeSelect('reader')}
                        className="w-full anime-button px-8 py-4 rounded-xl text-xl font-semibold"
                    >
                        Reader Mode
                    </button>
                </div>
            </div>
        </div>
    );
}
