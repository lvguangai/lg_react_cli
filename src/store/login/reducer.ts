import { UserInfoParams, ActionParams } from './index.d';
import aType from './actionType';
import {initialState} from './state';
const getUserInfo = (state: UserInfoParams, action: ActionParams) => {
  const {payload} = action;
  return {...state, ...payload};
};

const onOpenMember = (state: UserInfoParams, action: ActionParams) => {
  const {payload} = action;
  return {...state, ...payload};
};

const onOpenSignin = (state: UserInfoParams, action: ActionParams) => {
  const {payload} = action;
  return {...state, ...payload};
};

const onInit = () => {
  return initialState;
};

const defaultReducer = (state: UserInfoParams) => state;

const reducers = {
  [aType.GET_USER_INFO]: getUserInfo,
  [aType.ON_INIT]: onInit,
  [aType.ON_OPEN_MEMBER]: onOpenMember,
  [aType.ON_OPEN_SIGNIN]: onOpenSignin,
};

export const reducer = (state: UserInfoParams, action: ActionParams) => {
  const currentReducer = reducers[action.type] || defaultReducer;
  return currentReducer(state, action);
};