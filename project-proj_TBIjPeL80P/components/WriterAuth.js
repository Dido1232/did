function WriterAuth({ onAuth }) {
    const [password, setPassword] = React.useState('');
    const [attempts, setAttempts] = React.useState(3);
    const [error, setError] = React.useState('');

    function handleSubmit(e) {
        e.preventDefault();
        try {
            if (password.toLowerCase() === 'krischo') {
                onAuth(true);
            } else {
                setAttempts(prev => prev - 1);
                setError(`Incorrect password! Attempts remaining: ${attempts - 1}`);
                if (attempts <= 1) {
                    setTimeout(() => window.location.reload(), 2000);
                }
            }
        } catch (error) {
            reportError(error);
        }
    }

    return (
        <div data-name="writer-auth" className="min-h-screen flex items-center justify-center p-4">
            <form onSubmit={handleSubmit} className="anime-card p-8 rounded-xl w-full max-w-md">
                <h2 data-name="auth-title" className="text-3xl font-bold mb-8 text-center neon-text">
                    Writer Access
                </h2>
                <input
                    data-name="password-input"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full anime-input px-4 py-3 rounded-lg mb-6 text-white"
                    placeholder="Enter password"
                />
                {error && (
                    <p data-name="error-message" className="text-red-400 mb-6 text-center">
                        {error}
                    </p>
                )}
                <button
                    data-name="submit-button"
                    type="submit"
                    className="w-full anime-button px-6 py-3 rounded-lg text-lg font-semibold"
                >
                    Login
                </button>
            </form>
        </div>
    );
}
