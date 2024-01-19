import { createSlice } from "@reduxjs/toolkit";

const initialState={
    trails:[], 
    trail:{},
    trailCount:0,        
}

export const parkFormSlice = createSlice({
    name:'addParkForm',
    initialState: initialState,
    reducers:{
        addTrail(state, action){    
            const trail = {id:state.trailCount, ...action.payload}                   
           state.trails =  [...state.trails, trail ]
           state.trailCount += 1
        },
        setTrail(state, {payload}){
            state.trail = payload
        },
        deleteTrail(state, action){
            state.trails= state.trails.filter(trail=> trail.id !== action.payload.id)
        },
        resetForm(state){            
            state =  initialState
        }
    }
})


export const {addTrail, deleteTrail,setTrail, resetForm} = parkFormSlice.actions
export default parkFormSlice.reducer