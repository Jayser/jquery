import React, { PropTypes } from 'react';
import Header from '../../shared/Header';

function App({ children }) {
  return (
    <div>
      <Header />
      <main>
        { children }
      </main>
      <footer />
    </div>
  )
}

App.propTypes = {
  children: PropTypes.node
};

export default App;
