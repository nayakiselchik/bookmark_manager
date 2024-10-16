import React, { useEffect, useState } from "react";
import axios from '../axios';
import { Link, useNavigate } from "react-router-dom";

const BookmarkList = () => {
    const [bookmarks, setBookmarks] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        axios.get("http://127.0.0.1:8000/api/bookmarks/")
            .then((response) => {
                setBookmarks(response.data);
            })
            .catch((error) => {
                console.error("There was an error fetching the bookmarks!", error);
            });
    }, []);

    const handleDelete = (id) => {
        axios.delete(`http://127.0.0.1:8000/api/bookmarks/${id}/`)
            .then(() => {
                setBookmarks(bookmarks.filter(bookmark => bookmark.id !== id));
            })
            .catch((error) => console.error("Error deleting bookmark", error));
    };

    const handleFavToggle = (id) => {
        axios.post(`http://127.0.0.1:8000/api/bookmarks/${id}/favorite/`)
            .then(() => {
                setBookmarks(
                    bookmarks.map(bookmark =>
                        bookmark.id === id ? { ...bookmark, favorite: !bookmark.favorite } : bookmark
                    )
                );
            })
            .catch((error) => console.error("Error toggling favorite", error));
    };

    return (
        <div>
            <h1>Bookmarks</h1>
            <button onClick={() => navigate("/new")}>New Bookmark</button>
            <ul>
                {bookmarks.map(bookmark => (
                    <li key={bookmark.id}>
                        <a href={bookmark.url} target="_blank" rel="noopener noreferrer">{bookmark.title}</a>
                        <span> [{bookmark.category || "No Category"}]</span>
                        <button onClick={() => navigate(`/edit/${bookmark.id}`)}>Edit</button>
                        <button onClick={() => handleDelete(bookmark.id)}>Delete</button>
                        <button onClick={() => handleFavToggle(bookmark.id)}>
                            {bookmark.favorite ? "Unfav" : "Fav"}
                        </button>
                        <Link to={`/bookmark/${bookmark.id}`}>View</Link>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default BookmarkList;
