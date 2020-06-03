export const FETCH_DATA = 'FETCH_DATA';
export const FETCH_COMPLETED = 'FETCH_COMPLETED';
export const FETCH_FAILED = 'FETCH_FAILED';
export const ALL_FETCHED = 'ALL-FETCHED';

export const fetch_data = () => ({
  type: FETCH_DATA,
});

export const fetch_completed = (payload) => ({
  type: FETCH_COMPLETED,
  payload,
});

export const fetch_failed = (err) => ({
  type: FETCH_FAILED,
  err: err.message,
});

export const all_fetched = () => ({
  type: ALL_FETCHED,
});
