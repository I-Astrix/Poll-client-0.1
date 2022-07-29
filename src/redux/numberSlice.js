import { createSlice } from "@reduxjs/toolkit";



const initialState = {
    value: 0
}

export const numberSlice = createSlice({
    name: 'number',
    initialState,
    reducers: {
        add: (state)=>{
            state.value += 1
        }
    }
})

export const {add} = numberSlice.actions;
export default numberSlice.reducer;