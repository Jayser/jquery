import React, { Component } from 'react';
import CSSModules from 'react-css-modules';

import styles from './ContactsCallHistoryTh.scss';

@CSSModules(styles)
export default class extends Component {
  render() {
    const ths = ['Phone'];
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
