import React, { useState } from "react";
import { IoIosSend } from "react-icons/io";
import Card from "./components/Card";

const loggedInUser = { id: 14, name: "John Doe", image: "/user4.png" };

const initialData = [
  {
    id: 1,
    user: 11,
    name: "Anam",
    comment:
      "I was very glad to have you after such a long time. Can you plan a meetup? Maybe this weekend?",
    liked: false, // Add liked property
    like: 1,
    image: "/user1.png",
    replies: [],
  },
  {
    id: 2,
    user: 12,
    name: "Alex Benamin",
    comment:
      "Home sweet home! I’m glad you are back. It’s been two years, and I miss the football matches we had together. A lot has changed since you left. Let’s meet at the ground tomorrow evening?",
    liked: false, // Add liked property
    like: 1,
    image: "/user2.png",
    replies: [],
  },
  {
    id: 3,
    user: 13,
    name: "Tania",
    comment:
      "Hey bud, welcome back home. It’s been so long to see you back again. Would love to hear your travel stories. Your place or mine?",
    liked: false, // Add liked property
    like: 0,
    image: "/user3.png",
    replies: [],
  },
];

const App = () => {
  const [comment, setComment] = useState("");
  const [data, setData] = useState(initialData);

  const handleCommentChange = (e) => {
    setComment(e.target.value);
  };
  const handleRemoveReply = (commentId, replyId) => {
    // Implement logic to remove the reply from the specified comment
    // Find the comment by commentId and remove the reply with replyId
    console.log(commentId, replyId)
    const updatedData = data.map((comment) => {
      if (comment.id === commentId) {
        const updatedReplies = comment.replies.filter((reply) => reply.id !== replyId);
        return { ...comment, replies: updatedReplies };
      }
      return comment;
    });

    setData(updatedData);
  };
  const handleCommentSubmit = (e) => {
    e.preventDefault();
    if (comment.trim() === "") {
      return; // Don't add empty comments
    }

    const newComment = {
      id: data.length + 1,
      name: loggedInUser.name,
      comment: comment,
      user: loggedInUser.id,
      liked: false, // Add liked property
      like: 0,
      image: loggedInUser.image,
      replies: [],
    };

    setData([...data, newComment]);
    setComment("");
  };

  const handleRemoveComment = (commentId) => {
    const updatedData = data.filter((comment) => comment.id !== commentId);
    setData(updatedData);
  };

  const handleLikeClick = (commentId) => {
    const updatedData = data.map((c) => {
      if (c.id === commentId) {
        return {
          ...c,
          liked: !c.liked,
          like: c.liked ? c.like - 1 : c.like + 1,
        };
      }
      return c;
    });

    setData(updatedData);
  };

  return (
    <div className="mx-2 flex justify-center flex-col mt-6">
      {data.map((res, index) => {
        return (
          <div key={res.id} className="mb-4">
            {index === 0 && (
              <h2 className="w-1/2 mx-auto font-bold text-2xl mb-4">
                Comments
              </h2>
            )}
            <Card
              comment={res}
              loggedInUser={loggedInUser}
              handleRemoveComment={handleRemoveComment}
              handleLikeClick={handleLikeClick}
              handleRemoveReply={handleRemoveReply} // Make sure you include this
            />
          </div>
        );
      })}
      <form onSubmit={handleCommentSubmit} className="mb-4">
        <div className="w-1/2 mx-auto bg-white p-2 rounded-lg shadow-md flex">
          <input
            type="text"
            className="flex-grow pl-2 text-lg"
            placeholder="Write a comment"
            value={comment}
            onChange={handleCommentChange}
          />
          <button type="submit" className="text-blue-500 text-2xl p-2">
            <IoIosSend />
          </button>
        </div>
      </form>
    </div>
  );
};

export default App;
