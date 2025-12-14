import { Outlet, Link, useNavigate } from "react-router-dom";
import { useAuthStore } from "../store/authStore";

const Layout = () => {
    const { user, isAuthenticated, logout } = useAuthStore();
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate("/login", { replace: true });
    };

    return (
        <div className="min-h-screen bg-gray-50 flex flex-col font-sans">
            {/* Navbar */}
            <nav className="bg-white/80 backdrop-blur-md sticky top-0 z-50 border-b border-gray-100 shadow-sm">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between items-center h-16">
                        {/* Logo */}
                        <div className="flex items-center gap-3">
                            <div className="w-9 h-9 bg-indigo-600 rounded-lg flex items-center justify-center rotate-3 hover:rotate-6 transition-transform duration-300">
                                <span className="text-white font-bold text-lg">S</span>
                            </div>
                            <Link
                                to="/"
                                className="text-2xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent tracking-tight hover:opacity-80 transition"
                            >
                                SweetShop
                            </Link>
                        </div>

                        {/* Auth Actions */}
                        <div className="flex items-center gap-4">
                            {isAuthenticated ? (
                                <>
                                    <Link to="/admin" className="text-sm font-medium text-gray-700 hover:text-indigo-600 transition">
                                        Admin
                                    </Link>
                                    <span className="text-sm text-gray-400 hidden sm:block">|</span>
                                    {user && (
                                        <span className="text-sm text-gray-700 hidden sm:block">
                                            {user.email}
                                        </span>
                                    )}
                                    <button
                                        onClick={handleLogout}
                                        aria-label="Logout"
                                        className="px-4 py-2 rounded-full text-sm font-medium text-indigo-600 bg-indigo-50 border border-indigo-200 hover:bg-indigo-100 transition active:scale-95"
                                    >
                                        Sign Out
                                    </button>
                                </>
                            ) : (
                                <>
                                    <Link
                                        to="/login"
                                        className="text-sm font-medium text-gray-600 hover:text-indigo-600 transition"
                                    >
                                        Sign In
                                    </Link>
                                    <Link
                                        to="/register"
                                        className="px-5 py-2.5 rounded-full text-sm font-semibold text-white bg-indigo-600 hover:bg-indigo-700 shadow-md transition hover:-translate-y-0.5"
                                    >
                                        Get Started
                                    </Link>
                                </>
                            )}
                        </div>
                    </div>
                </div>
            </nav>

            {/* Page Content */}
            <main className="flex-grow max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-8 animate-fade-in">
                <Outlet />
            </main>

            {/* Footer */}
            <footer className="bg-white border-t border-gray-100 py-5">
                <p className="text-center text-sm text-gray-400">
                    © {new Date().getFullYear()} Sweet Shop System. All rights reserved.
                </p>
            </footer>
        </div>
    );
};

export default Layout;
