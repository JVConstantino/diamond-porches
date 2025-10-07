import React, { useState } from 'react';
import { useAppContext } from '../../context/AppContext';
import type { YouTubeVideo } from '../../types';

// Function to extract YouTube video ID from various URL formats
const getYouTubeId = (url: string): string | null => {
    const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/;
    const match = url.match(regExp);
    return (match && match[2].length === 11) ? match[2] : null;
}

const YouTubeManager: React.FC = () => {
    const { youtubeVideos, setYoutubeVideos } = useAppContext();
    const [newVideoUrl, setNewVideoUrl] = useState('');
    const [newVideoTitle, setNewVideoTitle] = useState('');

    const handleAddVideo = (e: React.FormEvent) => {
        e.preventDefault();
        const videoId = getYouTubeId(newVideoUrl);
        if (videoId && newVideoTitle.trim()) {
            const newVideo: YouTubeVideo = {
                id: videoId,
                title: newVideoTitle,
                thumbnail: {
                    url: `https://i.ytimg.com/vi/${videoId}/hqdefault.jpg`
                }
            };
            setYoutubeVideos([newVideo, ...youtubeVideos]);
            setNewVideoUrl('');
            setNewVideoTitle('');
        } else {
            alert('Invalid YouTube URL or missing title.');
        }
    };

    const handleRemoveVideo = (id: string) => {
        if (window.confirm('Are you sure you want to delete this video?')) {
            setYoutubeVideos(youtubeVideos.filter(video => video.id !== id));
        }
    };

    const handleUpdateTitle = (id: string, title: string) => {
        setYoutubeVideos(youtubeVideos.map(video => video.id === id ? { ...video, title } : video));
    };

    return (
        <div className="space-y-8">
            <h1 className="text-3xl font-bold text-gray-800">Manage YouTube Videos</h1>

            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
                <h2 className="text-xl font-semibold mb-4 text-gray-700">Add New Video</h2>
                <form onSubmit={handleAddVideo} className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">YouTube URL</label>
                        <input type="url" value={newVideoUrl} onChange={e => setNewVideoUrl(e.target.value)} required placeholder="https://www.youtube.com/watch?v=..." className="mt-1 w-full p-2 border border-gray-300 rounded-md" />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Video Title</label>
                        <input type="text" value={newVideoTitle} onChange={e => setNewVideoTitle(e.target.value)} required placeholder="A descriptive title" className="mt-1 w-full p-2 border border-gray-300 rounded-md" />
                    </div>
                    <button type="submit" className="px-6 py-2 text-sm font-semibold text-white bg-brand-blue-600 rounded-lg shadow-sm hover:bg-brand-blue-700">
                        Add Video
                    </button>
                </form>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
                <h2 className="text-xl font-semibold mb-4 text-gray-700">Current Videos</h2>
                <div className="space-y-4">
                    {youtubeVideos.map(video => (
                        <div key={video.id} className="bg-white p-4 rounded-lg border border-gray-200 flex items-center gap-4">
                            <img src={video.thumbnail.url} alt={video.title} className="w-32 h-20 object-cover rounded-md flex-shrink-0" />
                            <div className="flex-grow">
                                <label className="text-xs font-medium text-gray-500 mb-1">Title</label>
                                <input type="text" value={video.title} onChange={e => handleUpdateTitle(video.id, e.target.value)} className="w-full p-2 border border-gray-300 rounded-md text-sm" />
                            </div>
                            <button onClick={() => handleRemoveVideo(video.id)} className="px-4 py-2 text-sm font-medium text-red-700 bg-red-100 rounded-md hover:bg-red-200 transition-colors">
                                Remove
                            </button>
                        </div>
                    ))}
                     {youtubeVideos.length === 0 && <p className="text-gray-500 py-4 text-center">No videos have been added yet.</p>}
                </div>
            </div>
        </div>
    );
};

export default YouTubeManager;