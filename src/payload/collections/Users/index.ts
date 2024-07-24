import { CollectionConfig } from 'payload/types';
import { hash } from 'bcryptjs';
import { loginAfterCreate } from './hooks/loginAfterCreate';

const Users: CollectionConfig = {
  slug: 'users',
  auth: true,
  admin: {
    useAsTitle: 'email',
  },
  access: {
    create: () => true,
    read: ({ req: { user }}) => Boolean(user),
    update: ({ req: { user }}) => Boolean(user),
    delete: ({ req: { user }}) => Boolean(user),
  },
  fields: [
    {
      name: 'email',
      type: 'email',
      required: true,
    },
    {
      name: 'password',
      type: 'text',
      required: true,
    },
    {
      name: 'tasks',
      type: 'relationship',
      relationTo: 'tasks',
      hasMany: true,
    },
  ],
  hooks: {
    beforeChange: [
      async ({ data, operation }) => {
        if (operation === 'create' || (operation === 'update' && data.password)) {
          data.password = await hash(data.password, 10);
        }
      },
    ],
    afterChange: [loginAfterCreate], 
  },
};

export default Users;

// import type { CollectionConfig } from 'payload/types'

// import { admins } from '../../access/admins'
// import { anyone } from '../../access/anyone'
// import adminsAndUser from './access/adminsAndUser'
// import { checkRole } from './checkRole'
// import { ensureFirstUserIsAdmin } from './hooks/ensureFirstUserIsAdmin'
// import { loginAfterCreate } from './hooks/loginAfterCreate'

// const Users: CollectionConfig = {
//   slug: 'users',
//   admin: {
//     useAsTitle: 'name',
//     defaultColumns: ['name', 'email'],
//   },
//   access: {
//     read: adminsAndUser,
//     create: anyone,
//     update: adminsAndUser,
//     delete: admins,
//     admin: ({ req: { user } }) => checkRole(['admin'], user),
//   },
//   hooks: {
//     afterChange: [loginAfterCreate],
//   },
//   auth: {
//     useAPIKey: true,
//   },
//   fields: [
//     {
//       name: 'name',
//       type: 'text',
//       required: true,
//     },
//     {
//       name: 'email',
//       type: 'email',
//       required: true,
//     },
//     {
//       name: 'roles',
//       type: 'select',
//       hasMany: true,
//       defaultValue: ['user'],
//       options: [
//         {
//           label: 'admin',
//           value: 'admin',
//         },
//         {
//           label: 'user',
//           value: 'user',
//         },
//       ],
//       hooks: {
//         beforeChange: [ensureFirstUserIsAdmin],
//       },
//       access: {
//         read: admins,
//         create: admins,
//         update: admins,
//       },
//     },
//   ],
//   timestamps: true,
// }

// export default Users
