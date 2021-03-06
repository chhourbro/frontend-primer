import { SagaIterator } from "redux-saga";
import { call, put } from "redux-saga/effects";
import { Action } from "re-reduce";

import { actions, api, UserProfile } from "@domain/core";

import { LoginPayload } from "../types";

export default function* login(action: Action<LoginPayload>): SagaIterator {
  yield put(actions.user.login.request());

  try {
    const result: UserProfile = yield call(api.fetchFeatures, action.payload);

    yield put(actions.user.login.success(result));
  } catch (exception) {
    yield put(actions.user.login.failure(exception));
  }
}
