import React from "react";
import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom";
import Register from "./components/Register";
import Login from "./components/Login";
import BookmarkList from "./components/BookmarksList";
import BookmarkForm from "./components/BookmarkForm";
import BookmarkDetail from "./components/BookmarkDetail";
import ProtectedRoute from "./components/ProtectedRoute";
import './style.css'

const App = () => {
    const isAuthenticated = !!localStorage.getItem("access_token"); // Check if user is authenticated

    const handleLogout = () => {
        localStorage.removeItem("access_token");
        localStorage.removeItem("refresh_token");
        window.location.href = "/login"; // Redirect to login after logout
    };

    return (
        <Router>
            <div>
                {!isAuthenticated ? (
                    <a href="/login">Login</a>
                ) : (
                    <>
                        <span>Welcome, User!</span>
                        <button onClick={handleLogout}>Logout</button>
                    </>
                )}
            </div>

            <Routes>
                {/* Public routes */}
                <Route path="/register" element={<Register />} /> {/* Add the register route */}
                <Route path="/login" element={!isAuthenticated ? <Login /> : <Navigate to="/bookmarks" />} />

                {/* Protected routes */}
                <Route
                    path="/bookmarks"
                    element={
                        <ProtectedRoute>
                            <BookmarkList />
                        </ProtectedRoute>
                    }
                />
                <Route
                    path="/new"
                    element={
                        <ProtectedRoute>
                            <BookmarkForm />
                        </ProtectedRoute>
                    }
                />
                <Route
                    path="/edit/:id"
                    element={
                        <ProtectedRoute>
                            <BookmarkForm />
                        </ProtectedRoute>
                    }
                />
                <Route
                    path="/bookmark/:id"
                    element={
                        <ProtectedRoute>
                            <BookmarkDetail />
                        </ProtectedRoute>
                    }
                />

                {/* Default route: redirect to bookmarks */}
                <Route path="/" element={<Navigate to="/bookmarks" />} />
            </Routes>
        </Router>
    );
};

export default App;
