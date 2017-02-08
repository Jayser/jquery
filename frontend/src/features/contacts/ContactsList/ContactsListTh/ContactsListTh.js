import React, { Component } from 'react';
import CSSModules from 'react-css-modules';

import styles from './ContactsListTh.scss';

@CSSModules(styles)
export default class extends Component {
  render() {
    const ths = [
      'First name',
      'Last name',
      'Phone number',
      'Actions'
    ];
    return (
      <tr>
        {
          ths.map((th, key) => (
            <th key={ key } styleName='table-header'>{ th }</th>
          ))
        }
      </tr>
    );
  }
}
