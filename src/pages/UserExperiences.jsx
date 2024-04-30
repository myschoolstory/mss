import React, { useState } from 'react';
import { useQuery, useAction, getUserExperiences, createExperience } from 'wasp/client/operations';
import { Link } from 'react-router-dom';

const UserExperiencesPage = () => {
  const { data: experiences, isLoading, error } = useQuery(getUserExperiences);
  const createExperienceFn = useAction(createExperience);
  const [newExperienceStory, setNewExperienceStory] = useState('');

  if (isLoading) return 'Loading...';
  if (error) return 'Error: ' + error;

  const handleCreateExperience = () => {
    createExperienceFn({ story: newExperienceStory });
    setNewExperienceStory('');
  };

  return (
    <div className='p-4'>
      <div className='mb-4'>
        <input
          type='text'
          placeholder='Share your experience'
          className='px-4 py-2 border rounded text-lg'
          value={newExperienceStory}
          onChange={(e) => setNewExperienceStory(e.target.value)}
        />
        <button
          onClick={handleCreateExperience}
          className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded ml-2'
        >
          Share
        </button>
      </div>
      {experiences.map((experience) => (
        <div key={experience.id} className='bg-gray-100 p-4 mb-4 rounded-lg'>
          <div>{experience.story}</div>
          <div className='mt-2 text-gray-500'>Comments: {experience.comments.length}</div>
          <div className='flex items-center gap-4 mt-2'>
            <button className='bg-gray-200 text-gray-600 font-bold py-1 px-2 rounded'>Like</button>
            <button className='bg-gray-200 text-gray-600 font-bold py-1 px-2 rounded'>Comment</button>
          </div>
        </div>
      ))}
    </div>
  );
}

export default UserExperiencesPage;