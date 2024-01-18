import { createSlice } from "@reduxjs/toolkit";


export const parkFormSlice = createSlice({
    name:'addParkForm',
    initialState:{
        trails:[], 
        trailCount:0,        
    },
    reducers:{
        addTrail(state, action){    
            const trail = {id:state.trailCount, ...action.payload}                   
           state.trails =  [...state.trails, trail ]
           state.trailCount += 1
        },
        deleteTrail(state, action){
            state.trails= state.trails.filter(trail=> trail.id !== action.payload.id)
        },
        resetTrails(state){            
            state.trails =  []
        }
    }
})


export const {addTrail, deleteTrail, resetTrails} = parkFormSlice.actions
export default parkFormSlice.reducer