import {atom} from "recoil"

export const userState = atom({
  key: 'userState',
  default: [{id:1,userName:"TEST",progress:0}]})

  export const hostState = atom({
    key: 'hostState',
    default: {}})

  export const taskState = atom({
    key:"taskState",
    default:[]
  })

  export const initialState = atom({
    key:"initialState",
    default:{isInitial:true}
  })

  export const isRestingState = atom(
    {
      key:"isRestingState",
      default:{isResting:false}
    }
  )
  export const isVotingState = atom(
    {
      key:"isVotingState",
      default:{isVoting:true , min:1}
    }
  )