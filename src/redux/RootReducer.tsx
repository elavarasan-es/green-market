import { combineReducers } from '@reduxjs/toolkit';
import { authSliceReducer } from './reduxSlice/AuthSlice';
import {modalSliceReducer} from './reduxSlice/ModalSlice'

const rootReducer = combineReducers({
  auth: authSliceReducer,
  modals:modalSliceReducer,
});

export default rootReducer;
