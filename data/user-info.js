import friendsList from './friends-list';
import groups from './groups';
import msgThreads from './msg-threads';

const data = {
  id: '0a1b2c3d4e',
  name: 'Joey Tribbiani',
  avatar: '',
  ...friendsList,
  ...groups,
  ...msgThreads,
  starred: ['9a0b1c2d3e'],
  muted_group: [
    {
      id: '7a8b9c0d1e',
      type: 'YEAR',
    },
  ],
};

export default data;
