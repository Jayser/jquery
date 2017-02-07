import React from 'react';
import { Link } from 'react-router';

export default () => (
  <header>
    <ul>
      <li><Link to='/'>Home</Link></li>
      <li><Link to='/contacts'>Contacts list</Link></li>
      <li><Link to='/contacts/create-contact'>Create contact</Link></li>
    </ul>
  </header>
);
