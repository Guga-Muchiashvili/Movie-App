const options = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI3ODcyNGUzYzMzNDg4YTVmZDYyNjkxMGU2ZjJlNjM3NyIsInN1YiI6IjY2NTQzY2Q5ZDAwMTg4NDgwZDA2YjE4NiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.56_0hRdHSjkbdVJkVY5bN3BVFCzHVRtE5-hmiNcIgcI'
    }
  };

export const fetchTrendingElements = async() => {
    try {
        let res = await fetch('https://api.themoviedb.org/3/trending/all/day', options);
        let data = await res.json();
        return data
    } catch (err) {
        console.error(err);
    }
}

export const fetchPopularMovies = async() => {
  try {
    let res = await fetch('https://api.themoviedb.org/3/movie/popular', options)
    let data = await res.json()
    return data
  } catch (error) {
    
  }
}

export const fetchPopularTvSeries = async() => {
  try {
    let res = await fetch('https://api.themoviedb.org/3/tv/popular', options)
    let data = await res.json()
    return data
  } catch (error) {
    
  }
}

export const fetchUpcomingMovies = async () => {
  try {
    let res = await fetch('https://api.themoviedb.org/3/movie/upcoming', options)
    let data = await res.json()
    return data
  } catch (error) {
    
  }
}

export const fetchMovieList = async({type, page, mut } : any) => {
  try {
    console.log(type)
    let res = await fetch(`https://api.themoviedb.org/3/${mut}/${type}?language=en-US&page=${page}`, options)
    let data = await res.json()
    return data
  } catch (error) {

  }
}

export const fetchMovidewithId = async({id} : {id : string}) => {
  try {
    let res = await fetch(`https://api.themoviedb.org/3/movie/${id}?language=en-US`, options)
    let data = await res.json()
    return data
  } catch (error) {

  }
}
export const fetchCreditswithMovide = async({id} : {id : string}) => {
  try {
    let res = await fetch(`https://api.themoviedb.org/3/movie/${id}/credits?language=en-US`, options)
    let data = await res.json()
    return data
  } catch (error) {

  }
}