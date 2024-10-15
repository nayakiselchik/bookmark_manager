import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import BookmarkList from "./components/BookmarksList";
import BookmarkDetail from "./components/BookmarkDetail";
import BookmarkForm from "./components/BookmarkForm";
import './styles.css'

const App = () => {
  return (
      <Router>
        <Routes>
          <Route path="/" element={<BookmarkList />} />
          <Route path="/bookmark/:id" element={<BookmarkDetail />} />
          <Route path="/new" element={<BookmarkForm />} />
          <Route path="/edit/:id" element={<BookmarkForm />} />
        </Routes>
      </Router>
  );
};

export default App;
