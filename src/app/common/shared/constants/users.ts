import {User} from 'common/shared/models/user';

export let users: User[] = [
  {
    id: 1,
    email: 'rybaihor@gmail.com',
    password: '123456',
    firstName: 'Ihor',
    surName: 'Rybachok',
    dateOfBirth: new Date(1991, 11, 21),
    gender: 'male',
    isAdmin: true,
    firm: null,
    city: 'Ivano-Frankivsk',
    chats: []
  },
  {
    id: 2,
    email: 'rybaira@gmail.com',
    password: '123456',
    firstName: 'Iryna',
    surName: 'Rybachok',
    dateOfBirth: new Date(1995, 4, 17),
    gender: 'female',
    isAdmin: false,
    firm: null,
    city: 'Ivano-Frankivsk',
    chats: []
  },
  {
    id: 3,
    email: 'rybavlada@gmail.com',
    password: '123456',
    firstName: 'Vlada',
    surName: 'Rybachok',
    dateOfBirth: new Date(1970, 6, 22),
    gender: 'female',
    isAdmin: false,
    firm: null,
    city: 'Ivano-Frankivsk',
    chats: []
  },
  {
    id: 4,
    email: 'rybamarina@gmail.com',
    password: '123456',
    firstName: 'Marina',
    surName: 'Rybachok',
    dateOfBirth: new Date(1991, 11, 24),
    gender: 'female',
    isAdmin: false,
    firm: null,
    city: 'Кам\'янець-подільський',
    chats: []
  }
];
