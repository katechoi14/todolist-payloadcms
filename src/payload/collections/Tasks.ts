import { CollectionConfig } from 'payload/types';

const Tasks: CollectionConfig = {
  slug: 'tasks',
  access: {
    create: ({ req: {user}}) => {
      return true;
    },
    read: ({ req: {user}}) => {
      return true;
    },
    update: ({ req: {user}}) => {
      return true;
    },
    delete: ({ req: {user}}) => {
      return true;
    },
    admin: ({ req: {user}}) => {
      return true;
    },
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
