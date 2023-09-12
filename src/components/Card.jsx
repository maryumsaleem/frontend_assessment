import React, { useState } from 'react';
import { FcLike, FcLikePlaceholder } from 'react-icons/fc';

const Reply = ({ reply, loggedInUser, handleLikeClick, handleRemoveReply, comment }) => {
  return (
    <div className="mb-4">
      <div className="flex items-start">
        <div className="flex-shrink-0">
          <img src={reply.image} alt="" className="w-10 h-10 rounded-full" />
        </div>
        <div className="ml-2 flex-grow">
          <p className="text-black text-sm">{reply.name}</p>
          <p className="text-gray-600 text-sm">{reply.comment}</p>
        </div>
      </div>
      <div className="flex items-center mt-2">
        {reply.liked ? (
          <FcLike onClick={() => handleLikeClick(reply.id)} style={{ color: 'blue' }} />
        ) : (
          <FcLikePlaceholder onClick={() => handleLikeClick(reply.id)} />
        )}
        <p className="text-gray-500 text-sm font-light ml-1">{reply.like}</p>
        {reply.user === loggedInUser.id && (
          <button
            className="text-red-500 ml-2"
            onClick={() => handleRemoveReply(comment, reply.id)}
          >
            Remove
          </button>
        )}
      </div>
    </div>
  );
};

const ReplyForm = ({ onSubmit }) => {
  const [text, setText] = useState('');

  const handleChange = (e) => {
    setText(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (text.trim() === '') {
      return;
    }
    onSubmit(text);
    setText('');
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="flex mt-2">
        <textarea
          className="flex-grow border rounded-md p-2"
          placeholder="Write a reply"
          value={text}
          onChange={handleChange}
        />
        <button type="submit" className="text-blue-500 text-xs ml-2">
          Submit
        </button>
      </div>
    </form>
  );
};

const Card = ({
  comment,
  loggedInUser,
  handleRemoveComment,
  handleLikeClick,
  handleRemoveReply,
}) => {
  const [replyVisible, setReplyVisible] = useState(false);

  const toggleReply = () => {
    setReplyVisible(!replyVisible);
  };

  const handleReplySubmit = (replyText) => {
    if (replyText.trim() === '') {
      return;
    }

    const newReply = {
      id: comment.replies.length + 1,
      name: loggedInUser.name,
      comment: replyText,
      user: loggedInUser.id,
      liked: false,
      like: 0,
      image: loggedInUser.image,
    };

    comment.replies.push(newReply); 
    setReplyVisible(false);
  };

  return (
    <div className="w-1/2 mx-auto bg-white p-4 rounded-lg shadow-md">
      <div className="mb-4">
        <div className="flex items-start">
          <div className="flex-shrink-0">
            <img src={comment.image} alt="" className="w-10 h-10 rounded-full" />
          </div>
          <div className="ml-2 flex-grow">
            <p className="text-black text-sm">{comment.name}</p>
            <p className="text-gray-600 text-sm">{comment.comment}</p>
          </div>
        </div>
      </div>
      <div className="flex items-center gap-2">
        {comment.liked ? (
          <FcLike onClick={() => handleLikeClick(comment.id)} style={{ color: 'blue' }} />
        ) : (
          <FcLikePlaceholder onClick={() => handleLikeClick(comment.id)} />
        )}
        <p className="text-gray-500 text-sm font-light">{comment.like}</p>
        {comment.user === loggedInUser.id ? (
          <button
            className="text-red-500"
            onClick={() => handleRemoveComment(comment.id)}
          >
            Remove
          </button>
        ) : (
          <button className="text-blue-500 text-xs" onClick={toggleReply}>
            Reply
          </button>
        )}
      </div>
      {replyVisible && (
        <div className="mt-2 ml-2">
          <ReplyForm onSubmit={handleReplySubmit} />
        </div>
      )}
      {comment.replies.map((reply) => (
        <Reply
          key={reply.id}
          reply={reply}
          loggedInUser={loggedInUser}
          handleLikeClick={handleLikeClick}
          handleRemoveReply={handleRemoveReply}
          comment={comment.id}
        />
      ))}
    </div>
  );
};

export default Card;
