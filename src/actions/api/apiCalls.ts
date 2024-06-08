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

export const fetchMovidewithId = async({id, type} : {id : string | undefined, type : string | undefined}) => {
  try {
    let res = await fetch(`https://api.themoviedb.org/3/${type}/${id}?language=en-US`, options)
    let data = await res.json()
    return data
  } catch (error) {

  }
}


export const fetchCreditswithMovide = async({id, type} : {id : string | undefined, type : string | undefined}) => {
  try {
    let res = await fetch(`https://api.themoviedb.org/3/${type}/${id}/credits?language=en-US`, options)
    let data = await res.json()
    return data
  } catch (error) {

  }
}

export const fetchSimilar = async({id, type} : {id : string | undefined, type : string | undefined}) => {
  try {
    let res = await fetch(`https://api.themoviedb.org/3/${type}/${id}/similar?language=en-US&page=1`, options)
    let data = await res.json()
    return data
  } catch (error) {

  }
}

export const fetchPersomImages = async({id, } : {id : number}) => {
  try {
    let res = await fetch(`https://api.themoviedb.org/3/person/${id}/images`, options)
    console.log(res)
    let data = await res.json()
    return data
  } catch (error) {

  }
}

export const fetchGenres = async({type} : {type : number}) => {
  try {
    let res = await fetch(`https://api.themoviedb.org/3/genre/${type}/list?language=en`, options)
    console.log(res)
    let data = await res.json()
    return data
  } catch (error) {

  }
}
export const fetchWithGenre = async({id} : {id : number}) => {
  try {
    let res = await fetch(`https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=false&language=en-US&page=1&sort_by=popularity.deschttps://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=false&language=en-US&sort_by=popularity.desc&with_genres=${id}`, options)
    console.log(res)
    let data = await res.json()
    return data
  } catch (error) {

  }
}
export const fetchPerson = async(id :  string | undefined) => {
  console.log(id)
  try {
    let res = await fetch(`https://api.themoviedb.org/3/person/${id}?language=en-US'`, options)
    let data = await res.json()
    return data
  } catch (error) {

  }
}
export const fetchPersonsCasts = async(id: string | undefined) => {
  try {
    let res = await fetch(`https://api.themoviedb.org/3/person/${id}/movie_credits?language=en-US`, options)
    let data = await res.json()
    console.log(data)
    return data
  } catch (error) {

  }
}

