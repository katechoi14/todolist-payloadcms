import { CollectionConfig } from 'payload/types';

const Tasks: CollectionConfig = {
  slug: 'tasks',
  access: {
    read: ({ req: { user }}) => {
      if (user) {
        return {
          'user.id': { equals: user.id },
        };
      }
      return false;
    },
    create: ({ req: {user }}) => !!user,
    update: ({ req: {user}}) => !!user,
    delete: ({ req: {user}}) => !!user,
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
    },
    {
        name: 'username',
        type: 'text',
        required: false,
    },
    {
      name: 'completed',
      type: 'checkbox',
    },
    {
      name: 'date',
      type: 'date',
    },
  ],
  
};

export default Tasks;
