function AddChapter({ series, onClose }) {
    const [chapterData, setChapterData] = React.useState({
        title: '',
        actNumber: '',
        episodeNumber: '',
        images: []
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

        setChapterData(prev => ({
            ...prev,
            images: [...prev.images, ...imageUrls]
        }));
    }

    async function handleSubmit(e) {
        e.preventDefault();
        setIsLoading(true);
        setError('');

        try {
            if (!chapterData.title || !chapterData.actNumber || !chapterData.episodeNumber) {
                throw new Error('Title, Act number, and Episode number are required!');
            }

            if (chapterData.images.length === 0) {
                throw new Error('Please add at least one image!');
            }

            await mangaApi.addChapter(series.objectId, chapterData);
            onClose();
        } catch (error) {
            reportError(error);
            setError('Failed to create chapter: ' + error.message);
        } finally {
            setIsLoading(false);
        }
    }

    return (
        <div data-name="add-chapter-form" className="anime-card p-6 rounded-xl max-w-2xl mx-auto">
            <h2 data-name="form-title" className="text-2xl font-bold mb-6 neon-text text-center">
                Add New Chapter to {series.objectData.title}
            </h2>
            <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-3 gap-4">
                    <input
                        data-name="chapter-title"
                        type="text"
                        placeholder="Chapter Title"
                        value={chapterData.title}
                        onChange={(e) => setChapterData({...chapterData, title: e.target.value})}
                        className="col-span-3 anime-input px-4 py-2 rounded-lg"
                    />
                    <input
                        data-name="act-number"
                        type="number"
                        placeholder="Act #"
                        value={chapterData.actNumber}
                        onChange={(e) => setChapterData({...chapterData, actNumber: e.target.value})}
                        className="anime-input px-4 py-2 rounded-lg"
                    />
                    <input
                        data-name="episode-number"
                        type="number"
                        placeholder="Episode #"
                        value={chapterData.episodeNumber}
                        onChange={(e) => setChapterData({...chapterData, episodeNumber: e.target.value})}
                        className="col-span-2 anime-input px-4 py-2 rounded-lg"
                    />
                </div>

                <div
                    data-name="image-dropzone"
                    className="border-2 border-dashed border-purple-500 rounded-lg p-8 text-center cursor-pointer"
                    onDragOver={handleDragOver}
                    onDrop={handleDrop}
                    onClick={() => fileInputRef.current.click()}
                >
                    <p>Drag & drop images here or click to select</p>
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

                <div data-name="image-preview" className="grid grid-cols-3 gap-4">
                    {chapterData.images.map((image, index) => (
                        <img
                            key={index}
                            src={image}
                            alt={`Preview ${index + 1}`}
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
                        {isLoading ? 'Adding Chapter...' : 'Add Chapter'}
                    </button>
                </div>
            </form>
        </div>
    );
}
