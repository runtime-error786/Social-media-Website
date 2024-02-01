const initialState = []; // Initial state is an empty array
let Reel = (state=initialState,action)=>{
    if(action.type=="Reel")
    {
        return state = action.payload;
    }
    else{
        return state;
    }
}

let Current = (state=0,action)=>{
    if(action.type=="C")
    {
        return state = action.payload;
    }
    else{
        return state;
    }
}

let Total = (state=0,action)=>{
    if(action.type=="T")
    {
        return state = action.payload;
    }
    else{
        return state;
    }
}


let Profile = (state=initialState,action)=>{
    if(action.type=="Pr")
    {
        return state = action.payload;
    }
    else{
        return state;
    }
}

let Profile2 = (state=initialState,action)=>{
    if(action.type=="Pr2")
    {
        return state = action.payload;
    }
    else{
        return state;
    }
}

let All = (state=initialState,action)=>{
    if(action.type=="all")
    {
        return state = action.payload;
    }
    else{
        return state;
    }
}
let Coun = (state=0,action)=>{
    if(action.type=="Coun")
    {
        return state = action.payload;
    }
    else{
        return state;
    }
}

let Cou = (state=0,action)=>{
    if(action.type=="Cou")
    {
        return state = action.payload;
    }
    else{
        return state;
    }
}

let Role = (state="Gue",action)=>{
    if(action.type=="Role")
    {
        return state = action.payload;
    }
    else{
        return state;
    }
}
export {Reel,Current,Total,Profile,Profile2,All,Coun,Cou,Role};