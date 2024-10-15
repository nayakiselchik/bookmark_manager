import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";

const BookmarkDetail = () => {
    const { id } = useParams();
    const [bookmark, setBookmark] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        axios.get(`http://127.0.0.1:8000/api/bookmarks/${id}/`)
            .then((response) => {
                setBookmark(response.data);
            })
            .catch((error) => {
                console.error("There was an error fetching the bookmark!", error);
            });
    }, [id]);

    if (!bookmark) return <div>Loading...</div>;

    return (
        <div>
            <h1>{bookmark.title}</h1>
            <p>URL: <a href={bookmark.url} target="_blank" rel="noopener noreferrer">{bookmark.url}</a></p>
            <p>Category: {bookmark.category || "No Category"}</p>
            <p>Favorite: {bookmark.favorite ? "Yes" : "No"}</p>
            <button onClick={() => navigate(`/edit/${bookmark.id}`)}>Edit</button>
            <button onClick={() => navigate("/")}>Back</button>
        </div>
    );
};

export default BookmarkDetail;
