function App() {
    const [mode, setMode] = React.useState(null);
    const [isAuthenticated, setIsAuthenticated] = React.useState(false);

    function handleModeSelect(selectedMode) {
        try {
            setMode(selectedMode);
        } catch (error) {
            reportError(error);
        }
    }

    return (
        <div data-name="app-container">
            {!mode && <LandingPage onModeSelect={handleModeSelect} />}
            {mode === 'writer' && !isAuthenticated && (
                <WriterAuth onAuth={setIsAuthenticated} />
            )}
            {mode === 'writer' && isAuthenticated && (
                <WriterDashboard />
            )}
            {mode === 'reader' && <ReaderView />}
        </div>
    );
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);
