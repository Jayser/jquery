import React, { Component, PropTypes } from 'react';
import { Table } from 'react-bootstrap';
import CSSModules from 'react-css-modules';

import ContactsHistoryCallsTheadItems from '../ContactsHistoryCallsTheadItems';
import ContactsHistoryCallsItems from '../ContactsHistoryCallsItems';
import styles from './ContactsHistoryCallsView.scss';

@CSSModules(styles)
export default class extends Component {
  static propTypes = {
    contacts: PropTypes.object,
    actions: PropTypes.object,
    router: PropTypes.object,
  };

  componentWillMount() {
    const contactId = this.props.router.getCurrentLocation().query.contactId;
    this.props.actions.readContact(contactId);
  }

  render() {
    const { contacts: { read: { data } } } = this.props;

    const historyCalls = data[0] && data[0].historyCalls;

    if (!historyCalls) {
      return <div>{ null }</div>;
    }

    return (
      <section styleName='root'>
        <h1>History Calls</h1>
        <div>
          <Table styleName='table' striped bordered condensed hover>
            <thead>
              <ContactsHistoryCallsTheadItems />
            </thead>
            <ContactsHistoryCallsItems calls={ historyCalls } />
          </Table>
        </div>
      </section>
    );
  }
}
