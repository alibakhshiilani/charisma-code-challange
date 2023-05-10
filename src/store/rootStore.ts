import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk, { ThunkMiddleware } from "redux-thunk";
import { createLogger } from "redux-logger";

import { tagReducer } from "./tags/tagReducer";
import { userReducer } from "./users/userReducer";
import { AppActions } from "./models/actions";

const logger = createLogger();

export const rootReducer = combineReducers({ tagReducer, userReducer });

export type AppState = ReturnType<typeof rootReducer>;

export const store = createStore<AppState, AppActions, {}, {}>(
  rootReducer,
  applyMiddleware(thunk as ThunkMiddleware<AppState, AppActions>, logger)
);
