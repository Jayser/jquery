import React, { Component, cloneElement, PropTypes } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';

import * as widgetActions from '../widgets';
import { selectorContacts } from '../selectors';

@withRouter
@connect(
  (state) => ({ contacts: selectorContacts(state) }),
  (dispatch) => ({
    actions: bindActionCreators(widgetActions, dispatch)
  })
)
export default class extends Component {
  static propTypes = {
    actions: PropTypes.object.isRequired,
    contacts: PropTypes.object.isRequired,
    children: PropTypes.node.isRequired,
    router: PropTypes.object.isRequired
  };

  render() {
    const { children, contacts, actions, router } = this.props;

    return (<div> { cloneElement(children, { contacts, actions, router }) }</div>);
  }
}
