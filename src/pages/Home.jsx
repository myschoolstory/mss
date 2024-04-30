import React from 'react';
import { Link } from 'react-router-dom';
import { useQuery, useAction, getExperiences, likeExperience } from 'wasp/client/operations';

const HomePage = () => {
  const { data: experiences, isLoading, error } = useQuery(getExperiences);
  const likeExperienceFn = useAction(likeExperience);

  if (isLoading) return 'Loading...';
  if (error) return 'Error: ' + error;

  return (
    <div className='p-4'>
      {experiences.map((experience) => (
        <div key={experience.id} className='bg-gray-100 p-4 mb-4 rounded-lg'>
          <div>{experience.story}</div>
          <div>
            <Link to={`/experience/${experience.id}`} className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded'>
              View Experience
            </Link>
            <Link to={`/user/${experience.userId}/experiences`} className='bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded ml-2'>
              View User Experiences
            </Link>
            <button
              onClick={() => likeExperienceFn({ experienceId: experience.id })}
              className='bg-yellow-500 hover:bg-yellow-700 text-white font-bold py-2 px-4 rounded ml-2'
            >
              Like
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}

export default HomePage;