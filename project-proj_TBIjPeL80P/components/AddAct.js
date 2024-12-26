function AddAct({ series, onClose, onActCreated }) {
    const [actData, setActData] = React.useState({
        number: '',
        title: '',
        characterImages: []
    });
    const [isLoading, setIsLoading] = React.useState(false);
    const [error, setError] = React.useState('');
    const fileInputRef = React.useRef();

    function handleDragOver(e) {
        e.preventDefault();
        e.stopPropagation();
    }

    async function handleDrop(e) {
        e.preventDefault();
        e.stopPropagation();
        
        try {
            const files = [...e.dataTransfer.files];
            await handleFiles(files);
        } catch (error) {
            reportError(error);
            setError('Error processing images: ' + error.message);
        }
    }

    async function handleFileSelect(e) {
        try {
            const files = [...e.target.files];
            await handleFiles(files);
        } catch (error) {
            reportError(error);
            setError('Error processing images: ' + error.message);
        }
    }

    async function handleFiles(files) {
        const imageFiles = files.filter(file => file.type.startsWith('image/'));
        const imageUrls = [];

        for (const file of imageFiles) {
            const reader = new FileReader();
            const imageUrl = await new Promise((resolve, reject) => {
                reader.onload = (e) => resolve(e.target.result);
                reader.onerror = (e) => reject(e);
                reader.readAsDataURL(file);
            });
            imageUrls.push(imageUrl);
        }

        setActData(prev => ({
            ...prev,
            characterImages: [...prev.characterImages, ...imageUrls]
        }));
    }

    async function handleSubmit(e) {
        e.preventDefault();
        setIsLoading(true);
        setError('');

        try {
            if (!actData.number || !actData.title) {
                throw new Error('Act number and title are required!');
            }

            const newAct = await mangaApi.createAct(series.objectId, actData);
            onActCreated(newAct);
            onClose();
        } catch (error) {
            reportError(error);
            setError('Failed to create act: ' + error.message);
        } finally {
            setIsLoading(false);
        }
    }

    return (
        <div data-name="add-act-form" className="anime-card p-6 rounded-xl max-w-2xl mx-auto">
            <h2 data-name="form-title" className="text-2xl font-bold mb-6 neon-text text-center">
                Add New Act to {series.objectData.title}
            </h2>
            <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                    <input
                        data-name="act-number"
                        type="number"
                        placeholder="Act Number"
                        value={actData.number}
                        onChange={(e) => setActData({...actData, number: e.target.value})}
                        className="anime-input px-4 py-2 rounded-lg"
                    />
                    <input
                        data-name="act-title"
                        type="text"
                        placeholder="Act Title"
                        value={actData.title}
                        onChange={(e) => setActData({...actData, title: e.target.value})}
                        className="anime-input px-4 py-2 rounded-lg"
                    />
                </div>

                <div
                    data-name="character-dropzone"
                    className="border-2 border-dashed border-purple-500 rounded-lg p-8 text-center cursor-pointer"
                    onDragOver={handleDragOver}
                    onDrop={handleDrop}
                    onClick={() => fileInputRef.current.click()}
                >
                    <p>Drag & drop character images here or click to select (Optional)</p>
                    <input
                        data-name="file-input"
                        type="file"
                        ref={fileInputRef}
                        onChange={handleFileSelect}
                        accept="image/*"
                        multiple
                        className="hidden"
                    />
                </div>

                <div data-name="image-preview" className="grid grid-cols-4 gap-4">
                    {actData.characterImages.map((image, index) => (
                        <img
                            key={index}
                            src={image}
                            alt={`Character ${index + 1}`}
                            className="w-full h-32 object-cover rounded-lg"
                        />
                    ))}
                </div>

                {error && (
                    <p data-name="error-message" className="text-red-400 text-center">{error}</p>
                )}

                <div className="flex space-x-4">
                    <button
                        data-name="cancel-button"
                        type="button"
                        onClick={onClose}
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
                        {isLoading ? 'Creating Act...' : 'Create Act'}
                    </button>
                </div>
            </form>
        </div>
    );
}
