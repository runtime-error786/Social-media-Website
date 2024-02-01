import {combineReducers} from "redux"; 
import { Reel,Current,Total,Profile,Profile2,All,Coun,Cou,Role } from "./Reducer";  
let Root = combineReducers({
    Reel,Current,Total,Profile,Profile2,All,Coun,Cou,Role
})

export {Root};