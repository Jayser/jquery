import React, { Component, PropTypes } from 'react';
import { Pagination } from 'react-bootstrap';

export default class extends Component {
  static propTypes = {
    activePage: PropTypes.number.isRequired,
    items: PropTypes.number.isRequired,
    onSelect: PropTypes.func.isRequired,
    onPage: PropTypes.number
  };

  static defaultProps = {
    onPage: 5
  };

  render() {
    const { activePage, items, onPage, onSelect } = this.props;
    const itemsPerPage = Math.ceil(items / onPage);

    return (
      <section className='text-center'>
        <Pagination
          prev
          next
          first
          last
          ellipsis
          boundaryLinks
          items={ itemsPerPage }
          activePage={ activePage }
          onSelect={ (page) => onSelect({ page }) } />
      </section>
    );
  }
}
