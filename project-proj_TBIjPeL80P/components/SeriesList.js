function SeriesList({ onSeriesSelect }) {
    const [series, setSeries] = React.useState([]);
    const [selectedSeries, setSelectedSeries] = React.useState(null);
    const [showAddChapter, setShowAddChapter] = React.useState(false);
    const [isLoading, setIsLoading] = React.useState(true);
    const [error, setError] = React.useState('');
    const [chapters, setChapters] = React.useState([]);

    React.useEffect(() => {
        loadSeries();
    }, []);

    React.useEffect(() => {
        if (selectedSeries) {
            loadChapters(selectedSeries.objectId);
        }
    }, [selectedSeries]);

    async function loadSeries() {
        try {
            const response = await mangaApi.listSeries();
            setSeries(response.items);
        } catch (error) {
            reportError(error);
            setError('Failed to load series: ' + error.message);
        } finally {
            setIsLoading(false);
        }
    }

    async function loadChapters(seriesId) {
        try {
            const response = await mangaApi.getSeriesChapters(seriesId);
            setChapters(response.items);
        } catch (error) {
            reportError(error);
            setError('Failed to load chapters: ' + error.message);
        }
    }

    if (isLoading) {
        return <div data-name="loading" className="text-center neon-text">Loading series...</div>;
    }

    if (error) {
        return <div data-name="error" className="text-red-400 text-center">{error}</div>;
    }

    if (showAddChapter) {
        return (
            <AddChapter
                series={selectedSeries}
                onClose={() => {
                    setShowAddChapter(false);
                    loadChapters(selectedSeries.objectId);
                }}
            />
        );
    }

    if (selectedSeries) {
        return (
            <div data-name="series-detail" className="container mx-auto px-4">
                <div className="flex justify-between items-center mb-8">
                    <button
                        data-name="back-button"
                        onClick={() => setSelectedSeries(null)}
                        className="anime-button px-4 py-2 rounded-lg"
                    >
                        Back to Series
                    </button>
                    <button
                        data-name="add-chapter-button"
                        onClick={() => setShowAddChapter(true)}
                        className="anime-button px-4 py-2 rounded-lg"
                    >
                        Add New Chapter
                    </button>
                </div>

                <h2 className="text-2xl font-bold mb-6 neon-text">{selectedSeries.objectData.title} - Chapters</h2>

                <div data-name="chapters-grid" className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {chapters.map((chapter) => (
                        <div
                            data-name="chapter-card"
                            key={chapter.objectId}
                            className="anime-card p-4 rounded-xl"
                        >
                            <h3 className="text-xl font-bold mb-2">
                                Act {chapter.objectData.actNumber}, Episode {chapter.objectData.episodeNumber}
                            </h3>
                            <p className="text-purple-400">{chapter.objectData.title}</p>
                        </div>
                    ))}
                </div>
            </div>
        );
    }

    return (
        <div data-name="series-grid" className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-6">
            {series.map((item) => (
                <div
                    data-name="series-card"
                    key={item.objectId}
                    className="anime-card p-4 rounded-xl cursor-pointer"
                    onClick={() => setSelectedSeries(item)}
                >
                    {item.objectData.coverImage && (
                        <img
                            data-name="series-cover"
                            src={item.objectData.coverImage}
                            alt={item.objectData.title}
                            className="w-full h-48 object-cover rounded-lg mb-4"
                        />
                    )}
                    <h3 className="text-xl font-bold mb-2">{item.objectData.title}</h3>
                    <p className="text-purple-400 mb-2">{item.objectData.genre}</p>
                    {item.objectData.description && (
                        <p className="text-gray-300 text-sm">
                            {item.objectData.description}
                        </p>
                    )}
                </div>
            ))}
        </div>
    );
}
