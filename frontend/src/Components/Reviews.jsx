import React, { useState } from 'react';
import { Search, Loader, Plus, Star, X } from 'lucide-react';
import BottomNav from './Home/BottomNav';

function Reviews() {
    const [searchQuery, setSearchQuery] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [showAddReview, setShowAddReview] = useState(false);
    const [newReview, setNewReview] = useState({
        location: '',
        title: '',
        comment: ''
    });

    const handleSearch = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        try {
            await new Promise(resolve => setTimeout(resolve, 1000));
        } finally {
            setIsLoading(false);
        }
    };

    const handleSubmitReview = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        try {
            
            await new Promise(resolve => setTimeout(resolve, 1000));
            setShowAddReview(false);
            setNewReview({ location: '', title: '', comment: '' });
        } finally {
            setIsLoading(false);
        }
    };

    

    return (
        <div className="flex flex-col h-[calc(100vh-76px)] relative">
            {/* Main Content */}
            <div className="flex-1 overflow-y-auto p-4">
                <div className="max-w-7xl mx-auto space-y-6">
                    {/* Header Section */}
                    <div className="flex items-center justify-between">
                        <h1 className="text-2xl md:text-3xl font-bold text-gray-900">
                            Welcome back, <span className="text-red-500">Abdullah</span>
                        </h1>
                        <button
                            onClick={() => setShowAddReview(true)}
                            className="inline-flex items-center px-4 py-2 bg-red-600 text-white rounded-lg
                                     hover:bg-red-700 transition duration-150 ease-in-out gap-2"
                        >
                            <Plus className="h-5 w-5" />
                            <span className="hidden sm:inline">Add Review</span>
                        </button>
                    </div>

                    {/* Search Section */}
                    <form onSubmit={handleSearch} className="relative">
                        <div className="flex gap-3">
                            <div className="flex-1 relative">
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                    <Search className="h-5 w-5 text-gray-400" />
                                </div>
                                <input
                                    type="text"
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                    className="block w-full pl-10 pr-3 py-2.5 border border-gray-300 rounded-lg 
                                             bg-white shadow-sm placeholder-gray-400
                                             focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-red-500
                                             transition duration-150 ease-in-out"
                                    placeholder="Search reviews..."
                                />
                            </div>
                            <button
                                type="submit"
                                className="inline-flex items-center px-6 py-2.5 border border-transparent 
                                         text-sm font-medium rounded-lg shadow-sm text-white
                                         bg-red-600 hover:bg-red-700 
                                         focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500
                                         transition duration-150 ease-in-out
                                         min-w-[100px] justify-center"
                            >
                                Search
                            </button>
                        </div>
                    </form>

                    {/* Content Section */}
                    <div className="bg-white rounded-lg shadow-lg p-6">
                        {isLoading ? (
                            <div className="flex items-center justify-center h-32">
                                <Loader className="h-8 w-8 animate-spin text-red-500" />
                            </div>
                        ) : (
                            <div className="min-h-[400px]">
                                <p className="text-gray-500">No reviews found yet.</p>
                            </div>
                        )}
                    </div>
                </div>
            </div>

            {/* Add Review Modal */}
            {showAddReview && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
                    <div className="bg-white rounded-lg shadow-xl max-w-lg w-full max-h-[90vh] overflow-y-auto">
                        <div className="p-6 space-y-6">
                            <div className="flex items-center justify-between">
                                <h2 className="text-xl font-bold text-gray-900">Add New Review</h2>
                                <button
                                    onClick={() => setShowAddReview(false)}
                                    className="text-gray-400 hover:text-gray-500 transition-colors"
                                >
                                    <X className="h-6 w-6" />
                                </button>
                            </div>

                            <form onSubmit={handleSubmitReview} className="space-y-6">
                                <div className="space-y-2">
                                    <label className="block text-sm font-medium text-gray-700">
                                        Location
                                    </label>
                                    <input
                                        type="text"
                                        value={newReview.location}
                                        onChange={(e) => 
                                            setNewReview(prev => ({ 
                                                ...prev, 
                                                location: e.target.value 
                                            }))
                                        }
                                        className="block w-full px-3 py-2 border border-gray-300 rounded-lg
                                                 focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-red-500"
                                        placeholder="Enter review location"
                                    />
                                </div>

                                <div className="space-y-2">
                                    <label className="block text-sm font-medium text-gray-700">
                                        Title
                                    </label>
                                    <input
                                        type="text"
                                        value={newReview.title}
                                        onChange={(e) => 
                                            setNewReview(prev => ({ 
                                                ...prev, 
                                                title: e.target.value 
                                            }))
                                        }
                                        className="block w-full px-3 py-2 border border-gray-300 rounded-lg
                                                 focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-red-500"
                                        placeholder="Enter review title"
                                    />
                                </div>

                                <div className="space-y-2">
                                    <label className="block text-sm font-medium text-gray-700">
                                        Review
                                    </label>
                                    <textarea
                                        value={newReview.comment}
                                        onChange={(e) => 
                                            setNewReview(prev => ({ 
                                                ...prev, 
                                                comment: e.target.value 
                                            }))
                                        }
                                        rows={4}
                                        className="block w-full px-3 py-2 border border-gray-300 rounded-lg
                                                 focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-red-500"
                                        placeholder="Write your review..."
                                    />
                                </div>

                                <div className="flex justify-end gap-3">
                                    <button
                                        type="button"
                                        onClick={() => setShowAddReview(false)}
                                        className="px-4 py-2 text-sm font-medium text-gray-700 bg-white
                                                 border border-gray-300 rounded-lg hover:bg-gray-50
                                                 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
                                    >
                                        Cancel
                                    </button>
                                    <button
                                        type="submit"
                                        className="px-4 py-2 text-sm font-medium text-white bg-red-600
                                                 rounded-lg hover:bg-red-700 focus:outline-none 
                                                 focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
                                    >
                                        Submit Review
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            )}

            
            <div className="w-full bg-white shadow-top">
                <BottomNav />
            </div>
        </div>
    );
}

export default Reviews;