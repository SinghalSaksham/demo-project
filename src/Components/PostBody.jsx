import React, { useState, useEffect } from "react";
import axios from "axios";

const PostBody = ({ posts, setPosts, handleSelectedPost }) => {
  const [editingId, setEditingId] = useState(null);
  const [newTitle, setNewTitle] = useState("");
  const [newBody, setNewBody] = useState("");

  const handleupdate = (id) => {
    setEditingId(id);

    const post = posts.find((post) => post.id === id);
    setNewBody(post.body);
    setNewTitle(post.title);
  };

  const handleSave = async (id) => {
    await axios
      .patch(`https://jsonplaceholder.typicode.com/posts/${id}`, {
        title: newTitle,
        body: newBody,
      })
      .then((res) => {
        const updatedPost = res.data;
        setPosts((prevPosts) =>
          prevPosts.map((post) =>
            post.id === updatedPost.id ? updatedPost : post
          )
        );
        setEditingId(null);
        setNewTitle("");
        setNewBody("");
      });
  };

  const handleCancel = () => {
    setEditingId(null);
    setNewBody("");
    setNewTitle("");
  };

  const handleDelete = async (id) => {
    await axios
      .delete(`https://jsonplaceholder.typicode.com/posts/${id}`)
      .then((response) => {
        const newPosts = posts.filter((post) => post.id !== id);
        setPosts(newPosts);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <table className="min-w-full leading-normal">
      <thead className="sticky top-0">
        <tr>
          <th className="text-center px-5 py-3 border-b-2 border-gray-200 bg-gray-100  text-xs font-semibold text-gray-600 uppercase tracking-wider">
            User ID
          </th>
          <th className="text-center px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-xs font-semibold text-gray-600 uppercase tracking-wider">
            Title
          </th>
          <th className="text-center px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-xs font-semibold text-gray-600 uppercase tracking-wider">
            Body
          </th>
          <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-center text-xs font-semibold text-gray-600 uppercase tracking-wider">
            Actions
          </th>
        </tr>
      </thead>

      <tbody>
        {posts.map((post, i) => (
          <tr key={i} className="cursor-default">
            <td
              className="px-5 py-5 border-b border-gray-200 bg-white text-sm cursor-pointer"
              onClick={() => handleSelectedPost(post.id)}
            >
              {post.userId}
            </td>
            <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
              {editingId === post.id ? (
                <input
                  type="text"
                  className="border border-gray-400 p-2 w-full"
                  value={newTitle}
                  onChange={(e) => setNewTitle(e.target.value)}
                />
              ) : (
                // post.title
                <span
                  onClick={() => handleSelectedPost(post.id)}
                  className="cursor-pointer"
                >
                  {post.title}
                </span>
              )}
            </td>
            <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
              {editingId === post.id ? (
                <input
                  type="text"
                  className="border border-gray-400 p-2 w-full"
                  value={newBody}
                  onChange={(e) => setNewBody(e.target.value)}
                />
              ) : (
                <span
                  onClick={() => handleSelectedPost(post.id)}
                  className="cursor-pointer"
                >
                  {post.body}
                </span>
              )}
            </td>
            <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
              {editingId === post.id ? (
                <button
                  onClick={() => handleSave(post.id)}
                  className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-4 rounded-full mr-2 w-28"
                >
                  Save
                </button>
              ) : (
                <button
                  onClick={() => handleupdate(post.id)}
                  className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-4 rounded-full mr-2 w-28"
                >
                  Update
                </button>
              )}
              {editingId === post.id ? (
                <button
                  onClick={() => handleCancel(post.id)}
                  className="bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-4 rounded-full btn-class mt-3 w-28"
                >
                  Cancel
                </button>
              ) : (
                <button
                  onClick={() => handleDelete(post.id)}
                  className="bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-4 rounded-full btn-class mt-3 w-28"
                >
                  Delete
                </button>
              )}
            </td>
          </tr>
        ))}
      </tbody>
      {/* </div> */}
    </table>
  );
};

export default PostBody;
