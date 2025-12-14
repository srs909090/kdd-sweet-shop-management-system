import React, { useEffect, useState } from "react";
import api from "../api/client";
import { useAuthStore } from "../store/authStore";

interface Sweet {
    id: string;
    name: string;
    category: string;
    price: number;
    quantity: number;
    imageUrl?: string;
    description?: string;
}

const Home: React.FC = () => {
    const [sweets, setSweets] = useState<Sweet[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [searchQuery, setSearchQuery] = useState<string>("");
    const [error, setError] = useState<string>("");

    const isAuthenticated = useAuthStore((state) => state.isAuthenticated);

    const fetchSweets = async (query = "") => {
        setLoading(true);
        try {
            const endpoint = query ? `/sweets/search?q=${query}` : "/sweets";
            const res = await api.get<Sweet[]>(endpoint);
            setSweets(res.data);
            setError("");
        } catch {
            setError("Unable to load sweets. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchSweets();
    }, []);

    const [selectedCategory, setSelectedCategory] = useState<string>("All");
    const [toast, setToast] = useState<{ message: string; type: 'success' | 'error' } | null>(null);

    const handleSearch = (e: React.FormEvent) => {
        e.preventDefault();
        // Search is handled via reactive filteredSweets
    };

    // Derived state for categories
    const categories = ["All", ...Array.from(new Set(sweets.map((s) => s.category)))];

    const filteredSweets = sweets.filter(sweet => {
        const matchesSearch = sweet.name.toLowerCase().includes(searchQuery.toLowerCase());
        const matchesCategory = selectedCategory === "All" || sweet.category === selectedCategory;
        return matchesSearch && matchesCategory;
    });

    const showToast = (message: string, type: 'success' | 'error' = 'success') => {
        setToast({ message, type });
        setTimeout(() => setToast(null), 3000);
    };

    const handlePurchase = async (id: string) => {
        if (!isAuthenticated) {
            showToast("Please login to purchase sweets.", "error");
            return;
        }

        try {
            await api.post(`/sweets/${id}/purchase`, { quantity: 1 });

            setSweets((prev) =>
                prev.map((sweet) =>
                    sweet.id === id && sweet.quantity > 0
                        ? { ...sweet, quantity: sweet.quantity - 1 }
                        : sweet
                )
            );
            showToast("Added to cart successfully!");
        } catch (err: unknown) {
            showToast("Purchase failed. Please try again.", "error");
        }
    };

    return (
        <div className="space-y-8 animate-fade-in relative">
            {/* Toast Notification */}
            {toast && (
                <div className={`fixed top-24 right-4 z-50 px-6 py-3 rounded-xl shadow-2xl flex items-center gap-3 transform transition-all duration-500 animate-slide-in ${toast.type === 'success' ? 'bg-green-500 text-white' : 'bg-red-500 text-white'
                    }`}>
                    {toast.type === 'success' ? (
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path></svg>
                    ) : (
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                    )}
                    <span className="font-semibold">{toast.message}</span>
                </div>
            )}

            {/* Hero Section */}
            <div className="relative overflow-hidden rounded-3xl bg-indigo-600 text-white shadow-xl">
                <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-indigo-600 opacity-90" />
                <div className="absolute top-0 right-0 -mt-20 -mr-20 w-80 h-80 bg-white opacity-10 rounded-full blur-3xl"></div>
                <div className="absolute bottom-0 left-0 -mb-20 -ml-20 w-80 h-80 bg-purple-500 opacity-20 rounded-full blur-3xl"></div>

                <div className="relative px-8 py-16 sm:px-16 sm:py-24 flex flex-col items-center text-center">
                    <h1 className="text-4xl sm:text-6xl font-extrabold tracking-tight mb-6 drop-shadow-sm">
                        Taste the Joy
                    </h1>
                    <p className="text-lg sm:text-2xl text-indigo-100 max-w-2xl mx-auto mb-10 leading-relaxed opacity-90">
                        Handcrafted sweets made with love. Explore our premium collection of macarons, chocolates, and artisan treats.
                    </p>
                    <form onSubmit={handleSearch} className="w-full max-w-md relative flex items-center group">
                        <svg className="absolute left-5 w-5 h-5 text-gray-400 pointer-events-none group-focus-within:text-indigo-500 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg>
                        <input
                            type="text"
                            placeholder="Find your craving..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="w-full pl-14 pr-36 py-5 rounded-full text-gray-900 bg-white/95 backdrop-blur-sm placeholder-gray-500 focus:outline-none focus:ring-4 focus:ring-white/30 shadow-2xl border-0 transition-all"
                        />
                        <button
                            type="submit"
                            className="absolute right-2 top-2 bottom-2 px-8 bg-gray-900 text-white rounded-full font-bold hover:bg-gray-800 transition-all shadow-lg hover:shadow-gray-500/30 active:scale-95"
                        >
                            Search
                        </button>
                    </form>
                </div>
            </div>

            {/* Filters & Content Header */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                <div>
                    <h2 className="text-3xl font-bold text-gray-900">New Arrivals</h2>
                    <p className="text-gray-500 mt-1">Found {filteredSweets.length} sweet treats</p>
                </div>

                <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-hide">
                    {categories.map(category => (
                        <button
                            key={category}
                            onClick={() => setSelectedCategory(category)}
                            className={`px-5 py-2.5 rounded-full text-sm font-semibold whitespace-nowrap transition-all duration-200 border ${selectedCategory === category
                                ? "bg-indigo-600 text-white border-indigo-600 shadow-indigo-200 shadow-lg"
                                : "bg-white text-gray-600 border-gray-200 hover:border-indigo-300 hover:text-indigo-600"
                                }`}
                        >
                            {category}
                        </button>
                    ))}
                </div>
            </div>

            {/* Error */}
            {error && (
                <div className="bg-red-50 border border-red-100 text-red-700 p-4 rounded-xl flex items-center gap-2">
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" /></svg>
                    {error}
                </div>
            )}

            {/* Loader */}
            {loading && (
                <div className="flex justify-center py-20">
                    <div className="h-12 w-12 rounded-full border-b-2 border-indigo-600 animate-spin" />
                </div>
            )}

            {/* Cards */}
            {!loading && filteredSweets.length > 0 && (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
                    {filteredSweets.map((sweet) => (
                        <div
                            key={sweet.id}
                            className="group bg-white rounded-3xl border border-gray-100 shadow-sm hover:shadow-xl hover:-translate-y-2 transition-all duration-300 overflow-hidden flex flex-col"
                        >
                            <div className="relative h-64 overflow-hidden bg-gray-100">
                                <img
                                    src={sweet.imageUrl || 'https://images.unsplash.com/photo-1579373903781-fd5c0c30c4cd?auto=format&fit=crop&w=800&q=80'}
                                    alt={sweet.name}
                                    onError={(e) => {
                                        const target = e.target as HTMLImageElement;
                                        target.src = 'https://images.unsplash.com/photo-1579373903781-fd5c0c30c4cd?auto=format&fit=crop&w=800&q=80'; // Fallback
                                    }}
                                    className="h-full w-full object-cover transform group-hover:scale-110 transition-transform duration-700"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-6">
                                    <span className="text-white font-medium text-sm line-clamp-2">{sweet.description}</span>
                                </div>
                                {sweet.quantity === 0 && (
                                    <div className="absolute inset-0 bg-white/60 backdrop-blur-sm flex items-center justify-center">
                                        <span className="px-4 py-2 bg-red-500 text-white font-bold rounded-full shadow-lg transform -rotate-12">SOLD OUT</span>
                                    </div>
                                )}
                            </div>

                            <div className="p-6 flex-grow flex flex-col">
                                <div className="flex justify-between items-start mb-2">
                                    <span className="text-xs font-bold uppercase tracking-wider text-indigo-500 bg-indigo-50 px-2 py-1 rounded-md">
                                        {sweet.category}
                                    </span>
                                    <span className="text-lg font-bold text-gray-900">
                                        ₹{sweet.price.toFixed(2)}
                                    </span>
                                </div>

                                <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-indigo-600 transition-colors">{sweet.name}</h3>

                                <div className="mt-auto pt-6 flex items-center justify-between">
                                    <div className="flex items-center gap-1.5 text-sm font-medium">
                                        <div className={`w-2.5 h-2.5 rounded-full ${sweet.quantity > 0 ? 'bg-green-500' : 'bg-red-500'}`}></div>
                                        <span className={sweet.quantity > 0 ? 'text-green-600' : 'text-red-600'}>
                                            {sweet.quantity > 0 ? `${sweet.quantity} in stock` : 'Out of stock'}
                                        </span>
                                    </div>
                                    <button
                                        onClick={() => handlePurchase(sweet.id)}
                                        disabled={sweet.quantity === 0}
                                        className={`px-6 py-2.5 rounded-xl font-bold text-white shadow-lg transition-all duration-200 transform active:scale-95 ${sweet.quantity > 0
                                            ? "bg-gray-900 hover:bg-indigo-600 hover:shadow-indigo-200"
                                            : "bg-gray-300 cursor-not-allowed shadow-none"
                                            }`}
                                    >
                                        Add +
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}

            {/* Empty State */}
            {!loading && filteredSweets.length === 0 && (
                <div className="text-center py-24 bg-white rounded-3xl border border-dashed border-gray-200">
                    <div className="mx-auto h-16 w-16 bg-gray-50 rounded-full flex items-center justify-center mb-4">
                        <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg>
                    </div>
                    <h3 className="text-lg font-medium text-gray-900">No sweets found</h3>
                    <p className="text-gray-500 mt-1">We couldn't find anything matching your criteria.</p>
                    <button onClick={() => { setSearchQuery(''); setSelectedCategory('All'); fetchSweets(''); }} className="mt-6 text-indigo-600 font-medium hover:text-indigo-700">Clear Filters</button>
                </div>
            )}
        </div>
    );
};

export default Home;
