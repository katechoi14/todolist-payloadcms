import { CollectionConfig } from 'payload/types';

const Todo: CollectionConfig = {
  slug: 'todos',
  admin: {
    useAsTitle: 'title',
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
    },
    {
      name: 'description',
      type: 'textarea',
    },
    {
      name: 'status',
      type: 'select',
      options: ['pending', 'completed'],
    },
    {
      name: 'dueDate',
      type: 'date',
    },
  ],
};

export default Todo;
