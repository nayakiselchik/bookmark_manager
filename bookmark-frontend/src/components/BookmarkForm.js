import React, { useState, useEffect } from "react";
import axios from '../axios';
import { useNavigate, useParams } from "react-router-dom";

const BookmarkForm = () => {
    const [title, setTitle] = useState("");
    const [url, setUrl] = useState("");
    const [category, setCategory] = useState("");
    const [categories, setCategories] = useState([]);
    const navigate = useNavigate();
    const { id } = useParams();
    const isEdit = Boolean(id);

    useEffect(() => {
        // Fetch existing categories from the backend
        axios.get("http://127.0.0.1:8000/api/categories/")
            .then((response) => {
                setCategories(response.data);
            })
            .catch((error) => {
                console.error("There was an error fetching categories!", error);
            });

        // If editing, fetch the bookmark details
        if (isEdit) {
            axios.get(`http://127.0.0.1:8000/api/bookmarks/${id}/`)
                .then((response) => {
                    setTitle(response.data.title);
                    setUrl(response.data.url);
                    setCategory(response.data.category);
                })
                .catch((error) => {
                    console.error("There was an error fetching the bookmark!", error);
                });
        }
    }, [id, isEdit]);

    const handleSubmit = (e) => {
        e.preventDefault();
        const data = { title, url, category };

        if (isEdit) {
            axios.put(`http://127.0.0.1:8000/api/bookmarks/${id}/`, data)
                .then(() => navigate("/"))
                .catch((error) => console.error("Error updating bookmark", error));
        } else {
            axios.post("http://127.0.0.1:8000/api/bookmarks/", data)
                .then(() => navigate("/"))
                .catch((error) => console.error("Error creating bookmark", error));
        }
    };

    return (
        <div>
            <h1>{isEdit ? "Edit Bookmark" : "New Bookmark"}</h1>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Title: </label>
                    <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} required />
                </div>
                <div>
                    <label>URL: </label>
                    <input type="url" value={url} onChange={(e) => setUrl(e.target.value)} required />
                </div>
                <div>
                    <label>Category: </label>
                    <select value={category} onChange={(e) => setCategory(e.target.value)}>
                        <option value="">No Category</option>
                        {categories.map((cat) => (
                            <option key={cat.value} value={cat.value}>
                                {cat.label}
                            </option>
                        ))}
                    </select>
                </div>
                <button type="submit">{isEdit ? "Update" : "Create"}</button>
                <button type="button" onClick={() => navigate("/")}>Back</button>
            </form>
        </div>
    );
};

export default BookmarkForm;
