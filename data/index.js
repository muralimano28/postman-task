// import friendsList from './friends-list';
import groups from './groups';
import msgThreads from './msg-threads';
import contactList from './contact-list';

const data = {
  id: '6876543210',
  name: 'Joey Tribbiani',
  avatar: 'https://upload.wikimedia.org/wikipedia/en/d/da/Matt_LeBlanc_as_Joey_Tribbiani.jpg',
  // ...friendsList,
  ...groups,
  ...msgThreads,
  ...contactList,
  starred: ['9a0b1c2d3e'],
  muted_group: [
    {
      id: '7a8b9c0d1e',
      type: 'YEAR',
    },
  ],
};

export default data;
