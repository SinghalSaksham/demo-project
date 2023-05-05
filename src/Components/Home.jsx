import React, { useState, useEffect } from "react";
import axios from "axios";
import PostBody from "./PostBody";
import CommentBody from "./CommentBody";
import { CircularProgress } from "@material-ui/core";
import CreatePostForm from "./CreatePostForm";

const Home = () => {
  const [posts, setPosts] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedPost, setSelectedPost] = useState(null);
  const [comments, setComments] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [size, setSize] = useState(0);

  const fetchPosts = async () => {
    setIsLoading(true);
    const response = await axios.get(
      "https://jsonplaceholder.typicode.com/posts"
    );
    setPosts(response.data);
    setSize(response.data.length + 1);
    setIsLoading(false);
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  const handleSelectedPost = async (id) => {
    setSelectedPost(id);
    setIsLoading(true);
    await axios
      .get(`https://jsonplaceholder.typicode.com/posts/${id}/comments`)
      .then((res) => {
        setIsLoading(false);
        // Set the comments state to the fetched comments
        setComments(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleBack = () => {
    setSelectedPost(null);
    setComments([]);
  };

  const handleCreateNew = () => {
    setShowModal(true);
  };

  return (
    <>
      {isLoading ? (
        <div className="fixed top-0 left-0 bottom-0 right-0 flex items-center justify-center bg-white bg-opacity-30 text-black z-50">
          <CircularProgress
            color="inherit"
            size="7rem"
            className="self-center"
          />
        </div>
      ) : (
        <div className="container mx-auto px-4 py-8">
          <h1 className="text-3xl font-bold mb-4">
            {/* {selectedPost ? `Details for Post id ${selectedPost}` : "Posts"} */}
            {selectedPost && `Details for Post id ${selectedPost}`}
          </h1>
          {selectedPost ? (
            <div className="flex justify-end">
              <button
                onClick={handleBack}
                className="bg-green-500 hover:bg-green-700 text-white font-bold py-1 px-4 rounded-full mr-2 w-28 mb-10"
              >
                <span className="mr-5">{"<"}</span>
                <span>{"Back"}</span>
              </button>
            </div>
          ) : (
            <div className="flex justify-end">
              <button
                onClick={handleCreateNew}
                className="bg-green-500 hover:bg-green-700 text-white font-bold py-4 px-4 rounded-full mr-2 w-48 mb-10"
              >
                <span className="mr-5">{"+"}</span>
                <span>{"Create New Post"}</span>
              </button>
            </div>
          )}
          <div className="-mx-4 w-full">
            <div className="inline-block min-w-full shadow rounded-lg overflow-hidden w-full">
              <CreatePostForm
                showModal={showModal}
                setShowModal={setShowModal}
                posts={posts}
                setPosts={setPosts}
                size={size}
                setSize={setSize}
              />
              {/* <div className="h-96 overflow-y-scroll"> */}
              <div>
                {selectedPost ? (
                  <CommentBody comments={comments} />
                ) : (
                  <PostBody
                    posts={posts}
                    setPosts={setPosts}
                    handleSelectedPost={handleSelectedPost}
                  />
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Home;
