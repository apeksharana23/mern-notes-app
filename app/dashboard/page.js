"use client";

import { useEffect, useState } from "react";
import { getCookie } from "cookies-next";
import toast from "react-hot-toast";
import { Pencil, Trash2 } from "lucide-react";
import { Dancing_Script } from 'next/font/google';

const dancing = Dancing_Script({
    subsets: ['latin'],
    weight: ['700'],
});





export default function Dashboard() {
    const [notes, setNotes] = useState([]);
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");
    const [token, setToken] = useState("");
    const [editId, setEditId] = useState(null);



    useEffect(() => {
        const tokenFromCookie = getCookie("token");
        setToken(tokenFromCookie);
        if (tokenFromCookie) fetchNotes(tokenFromCookie);
    }, []);

    const fetchNotes = async (token) => {
        const res = await fetch("/api/notes", {
            headers: { Authorization: `Bearer ${token}` },
        });
        const data = await res.json();
        if (data.status) setNotes(data.data);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const endpoint = editId ? `/api/notes/${editId}` : "/api/notes";
        const method = editId ? "PUT" : "POST";

        const res = await fetch(endpoint, {
            method,
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify({ title, content }),
        });

        const data = await res.json();
        if (data.status) {
            fetchNotes(token);
            setTitle("");
            setContent("");
            setEditId(null);
            toast.success(editId ? "Note updated successfully" : "Note added successfully");
        }
    };

    const handleEdit = (note) => {
        setTitle(note.title);
        setContent(note.content);
        setEditId(note._id);
        toast.success("Editing note: " + note.title);

    };

    const handleDelete = async (id) => {
        const confirmed = confirm("Are you sure you want to delete this note?");
        if (!confirmed) return;

        const res = await fetch(`/api/notes/${id}`, {
            method: "DELETE",
            headers: { Authorization: `Bearer ${token}` },
        });
        const data = await res.json();
        if (data.status) {
            setNotes(notes.filter((note) => note._id !== id));
            toast.success("Note deleted successfully");
        } else {
            toast.error("Failed to delete note");
        }


    };

    return (
        <div
            className="min-h-screen bg-cover bg-center bg-no-repeat px-4 py-10"
            style={{ backgroundImage: "url('/img/brown.png')" }}
        >

            <h1 className={`${dancing.className} text-4xl italic text-center mb-6 text-[#5C4033]`}>
                🗒️ Dashboard
            </h1>


            {/* Add/Edit Note Form */}
            <form
                onSubmit={handleSubmit}
                className="max-w-xl mx-auto shadow p-6 rounded-lg mb-10 bg-[url('/img/notes-bg.jpg')] bg-cover bg-center bg-no-repeat relative"
            >
                {/* Overlay for readability */}
                <div className="absolute inset-0 bg-[#D9C2B3]/70 rounded-lg"></div>

                <div className="relative z-10">
                    <input
                        type="text"
                        placeholder="Note Title"
                        className="w-full mb-4 px-4 py-2 border rounded"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        required
                    />
                    <textarea
                        placeholder="Note Content"
                        className="w-full mb-4 px-4 py-2 border rounded"
                        rows="4"
                        value={content}
                        onChange={(e) => setContent(e.target.value)}
                        required
                    />
                    <button className="bg-[#5C4033] text-white px-6 py-2 rounded hover:bg-[#A67B6D]">
                        {editId ? "Update Note" : "Add Note"}
                    </button>
                    {editId && (
                        <button
                            type="button"
                            className="ml-4 text-red-500 underline"
                            onClick={() => {
                                setTitle("");
                                setContent("");
                                setEditId(null);
                            }}
                        >
                            Cancel Edit
                        </button>
                    )}
                </div>
            </form>


            {/* Notes List */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {notes.map((note) => (
                    <div
                        key={note._id}
                        className="relative bg-[#89725c] text-white shadow-md p-4 rounded-lg overflow-hidden"
                    >
                        {/* Optional overlay for readability */}
                        <div className="absolute inset-0 bg-black/30 rounded-lg"></div>

                        {/* Content */}
                        <div className="relative z-10">
                            <h3 className="font-bold text-lg">{note.title}</h3>
                            <p className="mt-2">{note.content}</p>

                            {/* Action Buttons */}
                            <div className="absolute top-2 right-2 flex items-center gap-2">
                                <button
                                    className="text-green-300 hover:text-green-500"
                                    onClick={() => handleEdit(note)}
                                    title="Edit"
                                >
                                    <Pencil size={18} />
                                </button>
                                <button
                                    className="text-red-300 hover:text-red-500"
                                    onClick={() => handleDelete(note._id)}
                                    title="Delete"
                                >
                                    <Trash2 size={18} />
                                </button>
                            </div>

                        </div>
                    </div>
                ))}
            </div>

        </div>
    );
}
