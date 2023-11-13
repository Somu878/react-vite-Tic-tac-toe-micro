import { createSlice } from '@reduxjs/toolkit'

export const pickplayerSlice = createSlice({
    name:'pickplayer',
    initialState:{
        human:null,
        cpu:null
    },
    reducers:{
        Xbtnhandle:(state)=>{
            state.human='X';
            state.cpu='O';
        },
        Obtnhandle:(state)=>{
            state.cpu='X';
            state.human='O';
        }
    }
});


export const {Xbtnhandle,Obtnhandle} =pickplayerSlice.actions;
export default pickplayerSlice.reducer