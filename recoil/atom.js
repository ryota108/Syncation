import {atom} from "recoil"

export const userState = atom({
  key: 'userState',
  default: [{id:1,userName:"TEST",progress:0}]})

  export const hostState = atom({
    key: 'hostState',
    default: {}})

  export const isRestingState = atom(
    {
      key:"isRestingState",
      default:{isResting:false}
    }
  )