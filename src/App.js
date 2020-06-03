import React from 'react';
import { connect } from 'react-redux';

import { fetch_data } from './actions';

const App = ({ payload, fetch_data }) => {
  const onClickHandler = (e) => {
    e.preventDefault();
    fetch_data();
  };
  return (
    <div>
      <button onClick={onClickHandler}>Click me</button>
      <br />
      <ol>
        {payload &&
          payload.map((user, index) => <li key={index}>{user.name}</li>)}
      </ol>
    </div>
  );
};

const mapStateToProps = ({
  fetchReducer: { fetchingData, fetchCompleted, fetchFailed, payload, error },
}) => ({
  fetchingData,
  fetchCompleted,
  fetchFailed,
  error,
  payload,
});

export default connect(mapStateToProps, { fetch_data })(App);
