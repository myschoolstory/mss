import React, { useState } from 'react';
import { useQuery, useAction, getExperience, createComment, likeExperience } from 'wasp/client/operations';
import { Link } from 'react-router-dom';

const ExperiencePage = () => {
  const { data: experience, isLoading, error } = useQuery(getExperience);
  const createCommentFn = useAction(createComment);
  const likeExperienceFn = useAction(likeExperience);
  const [newCommentText, setNewCommentText] = useState('');

  if (isLoading) return 'Loading...';
  if (error) return 'Error: ' + error;

  const handleCreateComment = () => {
    createCommentFn({ text: newCommentText, experienceId: experience.id });
    setNewCommentText('');
  };

  const handleLikeExperience = () => {
    likeExperienceFn({ experienceId: experience.id });
  };

  return (
    <div className='p-4'>
      <h2>{experience.story}</h2>
      <p>Comments:</p>
      {experience.comments.map((comment) => (
        <div key={comment.id} className='bg-gray-100 p-4 mb-4 rounded-lg'>
          <p>{comment.text}</p>
        </div>
      ))}
      <input
        type='text'
        placeholder='New Comment'
        className='px-1 py-2 border rounded text-lg'
        value={newCommentText}
        onChange={(e) => setNewCommentText(e.target.value)}
      />
      <button
        onClick={handleCreateComment}
        className='bg-blue-500 hover:bg-blue-700 px-2 py-2 text-white font-bold rounded'
      >
        Add Comment
      </button>
      <button
        onClick={handleLikeExperience}
        className='bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded mt-4'
      >
        Like
      </button>
      <Link to={`/user/${experience.userId}/experiences`} className='bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded ml-2'>User's Experiences</Link>
    </div>
  );
}

export default ExperiencePage;