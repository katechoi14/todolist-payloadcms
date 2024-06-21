import { CollectionConfig } from 'payload/types';

const Todos: CollectionConfig = {
  slug: 'todos',
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

export default Todos;
