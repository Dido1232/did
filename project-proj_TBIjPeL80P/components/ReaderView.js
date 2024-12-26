function ReaderView() {
    const [series, setSeries] = React.useState([]);
    const [selectedSeries, setSelectedSeries] = React.useState(null);
    const [chapters, setChapters] = React.useState([]);
    const [selectedChapter, setSelectedChapter] = React.useState(null);
    const [isLoading, setIsLoading] = React.useState(true);
    const [error, setError] = React.useState('');

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
            setIsLoading(true);
            const response = await mangaApi.getSeriesChapters(seriesId);
            setChapters(response.items);
        } catch (error) {
            reportError(error);
            setError('Failed to load chapters: ' + error.message);
        } finally {
            setIsLoading(false);
        }
    }

    if (isLoading) {
        return <div data-name="loading" className="text-center neon-text">Loading...</div>;
    }

    if (error) {
        return <div data-name="error" className="text-red-400 text-center">{error}</div>;
    }

    if (selectedChapter) {
        return (
            <div data-name="chapter-view" className="container mx-auto px-4 py-8">
                <button
                    data-name="back-to-chapters"
                    onClick={() => setSelectedChapter(null)}
                    className="anime-button px-4 py-2 rounded-lg mb-8"
                >
                    Back to Chapters
                </button>
                <h2 className="text-2xl font-bold mb-6 neon-text">
                    {selectedSeries.objectData.title} - Act {selectedChapter.objectData.actNumber}, 
                    Episode {selectedChapter.objectData.episodeNumber}: {selectedChapter.objectData.title}
                </h2>
                <div data-name="chapter-images" className="space-y-4">
                    {selectedChapter.objectData.images.map((image, index) => (
                        <img
                            key={index}
                            src={image}
                            alt={`Page ${index + 1}`}
                            className="max-w-full mx-auto rounded-lg"
                        />
                    ))}
                </div>
            </div>
        );
    }

    if (selectedSeries) {
        return (
            <div data-name="chapters-view" className="container mx-auto px-4 py-8">
                <button
                    data-name="back-to-series"
                    onClick={() => setSelectedSeries(null)}
                    className="anime-button px-4 py-2 rounded-lg mb-8"
                >
                    Back to Series
                </button>
                <h2 className="text-2xl font-bold mb-6 neon-text">{selectedSeries.objectData.title}</h2>
                <div data-name="chapters-grid" className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {chapters.map((chapter) => (
                        <div
                            data-name="chapter-card"
                            key={chapter.objectId}
                            onClick={() => setSelectedChapter(chapter)}
                            className="anime-card p-4 rounded-xl cursor-pointer"
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
        <div data-name="series-grid" className="container mx-auto px-4 py-8">
            <h1 className="text-3xl font-bold mb-8 neon-text text-center">Available Series</h1>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {series.map((item) => (
                    <div
                        data-name="series-card"
                        key={item.objectId}
                        onClick={() => setSelectedSeries(item)}
                        className="anime-card p-4 rounded-xl cursor-pointer"
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
                            <p className="text-gray-300 text-sm">{item.objectData.description}</p>
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
}
