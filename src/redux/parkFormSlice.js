import { createSlice } from "@reduxjs/toolkit";

const initialState={
    showForm:false,
    trails:[], 
    trail:{},
    trailCount:0,        
}

export const parkFormSlice = createSlice({
    name:'addParkForm',
    initialState: initialState,
    reducers:{
        setShowForm(state, {payload}){
            state.showForm = payload
        },
        closeForm(state){
            state.showForm = false;
        },
        addTrail(state, action){    
            const trail = {trailId:state.trailCount, ...action.payload}                   
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
           return  {
                trails:[], 
                trail:{},
                trailCount:0,        
            }
        }
    }
})


export const {addTrail, deleteTrail,setTrail, resetForm, setShowForm, closeForm} = parkFormSlice.actions
export default parkFormSlice.reducer