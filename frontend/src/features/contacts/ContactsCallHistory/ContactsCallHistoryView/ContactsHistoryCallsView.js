import React, { Component, PropTypes } from 'react';
import { Table } from 'react-bootstrap';
import CSSModules from 'react-css-modules';

import ContactsCallHistoryItems from '../ContactsCallHistoryItems';
import ContactsCallHistoryTh from '../ContactsCallHistoryTh';
import styles from './ContactsHistoryCallsView.scss';

@CSSModules(styles)
export default class extends Component {
  static propTypes = {
    contacts: PropTypes.object,
    actions: PropTypes.object,
    router: PropTypes.object,
  };

  componentWillMount() {
    const { contacts: { history: { contact, contactId } } } = this.props;
    this.historyCalls = this.getHistoryCalls(contact, contactId);
  }

  getHistoryCalls(contact, contactId) {
    if(!contact._id) {
      this.props.actions.readContact({ contactId });
      return [];
    }

    return contact.historyCalls;
  }

  componentWillReceiveProps({ contacts: { history: { contact, loaded } } }) {
    if(loaded) {
      this.historyCalls = this.getHistoryCalls(contact);
    }
  }

  componentWillUnmount() {
    this.props.actions.clearReadOne();
  }

  render() {
    return (
      <section styleName='root'>
        <h1>History Calls</h1>
        <div>
          <Table styleName='table' striped bordered condensed hover>
            <thead>
              <ContactsCallHistoryTh />
            </thead>
            <ContactsCallHistoryItems calls={ this.historyCalls } />
          </Table>
        </div>
      </section>
    );
  }
}
