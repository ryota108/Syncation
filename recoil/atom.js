import {atom} from "recoil"

export const userState = atom({
  key: 'userState',
  default: []})

  export const hostState = atom({
    key: 'hostState',
    default: {}})