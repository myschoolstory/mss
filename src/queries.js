import { HttpError } from 'wasp/server'

export const getExperience = async (args, context) => {
  if (!context.user) { throw new HttpError(401) };

  const experience = await context.entities.Experience.findUnique({
    where: { id: args.id },
    include: {
      comments: true,
      likes: true
    }
  });

  if (!experience) { throw new HttpError(404, 'Experience not found') };
  if (experience.userId !== context.user.id) { throw new HttpError(403, 'Experience does not belong to the user') };

  return experience;
}

export const getUserExperiences = async ({ userId }, context) => {
  if (!context.user) { throw new HttpError(401) }
  const user = await context.entities.User.findUnique({ where: { id: userId } })
  if (!user) { throw new HttpError(404, 'User not found') }
  return context.entities.Experience.findMany({ where: { userId }, include: { comments: true, likes: true } })
}