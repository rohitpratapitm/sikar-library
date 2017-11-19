// import { Action } from '@ngrx/store';
// import { UserContextActions } from './../enum';
// import { UserContextSlice } from './../store.interface';

// export function userContextSlice(state: UserContextSlice, action: Action) {

//     switch (action.type) {
        
//         case UserContextActions[UserContextActions.RESET]: {
//             state.isUserAuthorized = false;
//         }
//         break;

//         case UserContextActions[UserContextActions.AUTHORIZE_USER]: {
//             state.isUserAuthorized = action.payload.isUserAuthorized;
//         }
//         break;

//         default: 
//             console.log('Invalid case type: ' + action.type);
//     }
//     // clone the reference to trigger subscriptions
//     state.isUserAuthorized = Object.assign({}, state.isUserAuthorized);
    
//     return state;
// }
