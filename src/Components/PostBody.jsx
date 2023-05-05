import React, { useState, useEffect } from "react";
import axios from "axios";
import DataTable from "react-data-table-component";
import UpdateModal from "./UpdateModal";

const PostBody = ({ posts, setPosts, handleSelectedPost }) => {
  const [editingId, setEditingId] = useState(null);
  const [newTitle, setNewTitle] = useState("");
  const [newBody, setNewBody] = useState("");
  const [tableData, setTableData] = useState(posts);
  const [showModal, setShowModal] = useState(false);
  const [searchInput, setSearchInput] = useState("");
  const [filteredData, setFilteredData] = useState([]);

  useEffect(() => {
    setFilteredData(posts);
  }, []);

  const handleupdate = (id) => {
    setEditingId(id);
    setShowModal(true);

    const post = posts.find((post) => post.id === id);
    setNewBody(post.body);
    setNewTitle(post.title);
  };

  const handleSave = async () => {
    await axios
      .patch(`https://jsonplaceholder.typicode.com/posts/${editingId}`, {
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
        setShowModal(false);
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

  const handleClick = (row) => {
    handleSelectedPost(row.id);
  };

  const handleSearchInput = (e) => {
    setSearchInput(e.target.value);
  };

  // useEffect(() => {
  //   const result = posts.fiter((post) => {
  //     return post.title.toLowerCase().includes(searchInput.toLowerCase());
  //   });

  //   setFilteredData(result);
  // }, [searchInput,posts]);

  const columns = [
    {
      name: "User ID",
      selector: (row) => row.userId,
      width: "5%",
    },
    {
      name: "Title",
      selector: (row) => row.title,
      sortable: true,
      width: "20%",
    },
    {
      name: "Body",
      selector: (row) => row.body,
      width: "40%",
    },
    {
      name: "Actions",
      cell: (row) => (
        <>
          <button
            onClick={() => handleupdate(row.id)}
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-4 rounded-full mr-2 w-28"
          >
            Update
          </button>
          <button
            onClick={() => handleDelete(row.id)}
            className="bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-4 rounded-full btn-class w-28"
          >
            Delete
          </button>
        </>
      ),
    },
  ];

  return (
    <>
      {showModal && (
        <UpdateModal
          title={newTitle}
          setTitle={setNewTitle}
          body={newBody}
          setBody={setNewBody}
          setShowModal={setShowModal}
          handleSave={handleSave}
        />
      )}
      <DataTable
        title="Posts"
        columns={columns}
        data={posts}
        pagination
        fixedHeader
        fixedHeaderScrollHeight="400px"
        selectableRows
        highlightOnHover
        subHeader
        subHeaderComponent={
          <input
            type="text"
            placeholder="Search"
            onChange={handleSearchInput}
          />
        }
        subHeaderAlign="left"
        onRowClicked={handleClick}
      />
    </>
  );
};

export default PostBody;
