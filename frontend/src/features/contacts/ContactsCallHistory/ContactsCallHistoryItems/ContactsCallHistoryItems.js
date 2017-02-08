import React, { Component, PropTypes } from 'react';

export default class extends Component {
  static propTypes = {
    calls: PropTypes.array.isRequired
  };

  render() {
    return (
      <tbody>
        {
          this.props.calls.map((call, key) => (
            <tr key={ call._id }>
              <td>{ call.phone }</td>
            </tr>
          ))
        }
      </tbody>
    );
  }
}
