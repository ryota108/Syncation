import {atom} from "recoil"

/* 
　理想
　ルーム内のユーザーの情報を管理する状態
　　・userState
    ・hostState
    ・userListState
  ルーム情報を管理する状態
     isResting
     isVoting
  タスクを管理する状態
  
*/

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
  
  export const userListState = atom({
    key: "userListState",
    default: []
  })
  
  export const isVotingState = atom(
    {
      key:"isVotingState",
      default:{isVoting:false , min:1}
    }
  )

  export const voteMinState = atom({
    key: "voteMinState",
    default: 0
  })


  export const roomState = atom({
    key: "roomState",
    default:{turn:1}
  })
