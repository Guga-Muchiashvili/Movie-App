import { createSlice } from '@reduxjs/toolkit'


interface CounterState {
    movieList: object
}

const initialState: CounterState = {
  movieList: {},

}

export const moviesSlice = createSlice({
  name: 'movieList',
  initialState,
  reducers: {
    setMovieData : (state, action) => {
      state.movieList = action.payload
    }
  },
})

export const {setMovieData} = moviesSlice.actions
export default moviesSlice.reducer