function CreateSeries({ onSeriesCreated, onCancel }) {
    const [seriesData, setSeriesData] = React.useState({
        title: '',
        genre: '',
        coverImage: '',
        description: ''
    });
    const [isLoading, setIsLoading] = React.useState(false);
    const [error, setError] = React.useState('');

    async function handleSubmit(e) {
        e.preventDefault();
        setIsLoading(true);
        setError('');

        try {
            if (!seriesData.title || !seriesData.genre) {
                throw new Error('Title and genre are required!');
            }

            await mangaApi.createSeries(seriesData);
            onSeriesCreated();
        } catch (error) {
            reportError(error);
            setError('Failed to create series: ' + error.message);
        } finally {
            setIsLoading(false);
        }
    }

    return (
        <div data-name="create-series-form" className="anime-card p-6 rounded-xl max-w-2xl mx-auto">
            <h2 data-name="form-title" className="text-2xl font-bold mb-6 neon-text text-center">Create New Series</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                    <input
                        data-name="series-title"
                        type="text"
                        placeholder="Series Title"
                        value={seriesData.title}
                        onChange={(e) => setSeriesData({...seriesData, title: e.target.value})}
                        className="w-full anime-input px-4 py-2 rounded-lg"
                    />
                </div>
                <div>
                    <input
                        data-name="series-genre"
                        type="text"
                        placeholder="Genre"
                        value={seriesData.genre}
                        onChange={(e) => setSeriesData({...seriesData, genre: e.target.value})}
                        className="w-full anime-input px-4 py-2 rounded-lg"
                    />
                </div>
                <div>
                    <input
                        data-name="series-cover"
                        type="url"
                        placeholder="Cover Image URL"
                        value={seriesData.coverImage}
                        onChange={(e) => setSeriesData({...seriesData, coverImage: e.target.value})}
                        className="w-full anime-input px-4 py-2 rounded-lg"
                    />
                </div>
                <div>
                    <textarea
                        data-name="series-description"
                        placeholder="Description"
                        value={seriesData.description}
                        onChange={(e) => setSeriesData({...seriesData, description: e.target.value})}
                        className="w-full anime-input px-4 py-2 rounded-lg h-32"
                    />
                </div>
                {error && (
                    <p data-name="error-message" className="text-red-400 text-center">{error}</p>
                )}
                <div className="flex space-x-4">
                    <button
                        data-name="cancel-button"
                        type="button"
                        onClick={onCancel}
                        className="w-1/2 anime-button px-4 py-2 rounded-lg"
                        disabled={isLoading}
                    >
                        Cancel
                    </button>
                    <button
                        data-name="submit-button"
                        type="submit"
                        className="w-1/2 anime-button px-4 py-2 rounded-lg"
                        disabled={isLoading}
                    >
                        {isLoading ? 'Creating...' : 'Create Series'}
                    </button>
                </div>
            </form>
        </div>
    );
}
