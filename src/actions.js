import { HttpError } from 'wasp/server'

export const createExperience = async (args, context) => {
  if (!context.user) { throw new HttpError(401) };

  return context.entities.Experience.create({
    data: {
      story: args.story,
      userId: context.user.id
    }
  });
}

export const createComment = async (args, context) => {
  if (!context.user) { throw new HttpError(401) };

  return context.entities.Comment.create({
    data: {
      text: args.text,
      userId: context.user.id,
      experienceId: args.experienceId
    }
  });
}

export const likeExperience = async (args, context) => {
  if (!context.user) { throw new HttpError(401) };
  return context.entities.Like.create({
    data: {
      userId: context.user.id,
      experienceId: args.experienceId
    }
  });
}