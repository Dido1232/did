function WriterDashboard() {
    const [view, setView] = React.useState('list'); // 'list' or 'create'
    const [selectedSeries, setSelectedSeries] = React.useState(null);

    function handleSeriesCreated() {
        try {
            setView('list');
        } catch (error) {
            reportError(error);
        }
    }

    return (
        <div data-name="writer-dashboard" className="container mx-auto px-4 py-8">
            <div data-name="dashboard-header" className="flex justify-between items-center mb-8">
                <h1 className="text-3xl font-bold neon-text">Writer Dashboard</h1>
                {view === 'list' ? (
                    <button
                        data-name="create-button"
                        onClick={() => setView('create')}
                        className="anime-button px-6 py-3 rounded-xl"
                    >
                        Create New Series
                    </button>
                ) : (
                    <button
                        data-name="back-button"
                        onClick={() => setView('list')}
                        className="anime-button px-6 py-3 rounded-xl"
                    >
                        Back to List
                    </button>
                )}
            </div>

            {view === 'list' ? (
                <SeriesList onSeriesSelect={setSelectedSeries} />
            ) : (
                <CreateSeries
                    onSeriesCreated={handleSeriesCreated}
                    onCancel={() => setView('list')}
                />
            )}
        </div>
    );
}
