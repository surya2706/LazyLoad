import { combineEpics, ofType } from 'redux-observable';
import {
  mergeMap,
  map,
  catchError,
  delay,
  withLatestFrom,
} from 'rxjs/operators';
import { ajax } from 'rxjs/ajax';

import {
  FETCH_DATA,
  FETCH_COMPLETED,
  FETCH_FAILED,
  ALL_FETCHED,
  fetch_completed,
} from './actions';
import { of } from 'rxjs';

const fetchDataEpic = (action$) =>
  action$.pipe(
    ofType(FETCH_DATA),
    mergeMap((action) =>
      ajax.getJSON(`https://jsonplaceholder.typicode.com/users`).pipe(
        map((response) => fetch_completed(response)),
        catchError((err) => of({ type: FETCH_FAILED, err: err.xhr.response }))
      )
    )
  );

const nextDateEpic = (action$, state$) =>
  action$.pipe(
    ofType(FETCH_COMPLETED),
    delay(1000),
    withLatestFrom(state$),
    mergeMap(([action, state]) => {
      if (state.fetchReducer.numFetches < 3) {
        return ajax.getJSON(`https://jsonplaceholder.typicode.com/users`).pipe(
          map((response) => fetch_completed(response)),
          catchError((err) => of({ type: FETCH_FAILED, err: err.xhr.response }))
        );
      }
      return of({ type: ALL_FETCHED });
    })
  );

const rootEpic = combineEpics(fetchDataEpic, nextDateEpic);

export default rootEpic;
