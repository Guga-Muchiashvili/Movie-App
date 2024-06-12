const options = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI3ODcyNGUzYzMzNDg4YTVmZDYyNjkxMGU2ZjJlNjM3NyIsInN1YiI6IjY2NTQzY2Q5ZDAwMTg4NDgwZDA2YjE4NiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.56_0hRdHSjkbdVJkVY5bN3BVFCzHVRtE5-hmiNcIgcI'
    }
  };

export const fetchTrendingElements = async() => {
    try {
        const res = await fetch('https://api.themoviedb.org/3/trending/all/day', options);
        const data = await res.json();
        return data
    } catch (err) {
        console.error(err);
    }
}

export const fetchPopularMovies = async() => {
  try {
    const res = await fetch('https://api.themoviedb.org/3/movie/popular', options)
    const data = await res.json()
    return data
  } catch (error) {
    console.log(error)
  }
}

export const fetchPopularTvSeries = async() => {
  try {
    const res = await fetch('https://api.themoviedb.org/3/tv/popular', options)
    const data = await res.json()
    return data
  } catch (error) {
    console.log(error)
  }
}

export const fetchUpcomingMovies = async () => {
  try {
    const res = await fetch('https://api.themoviedb.org/3/movie/upcoming', options)
    const data = await res.json()
    return data
  } catch (error) {
    console.log(error)
  }
}

export const fetchMovieList = async({type, page, mut } : {type : string | undefined, page : number | undefined, mut : string | undefined }) => {
  try {
    console.log(type)
    const res = await fetch(`https://api.themoviedb.org/3/${mut}/${type}?language=en-US&page=${page}`, options)
    const data = await res.json()
    return data
  } catch (error) {
    console.log(error)
  }
}

export const fetchMovidewithId = async({id, type} : {id : string | undefined, type : string | undefined}) => {
  try {
    const res = await fetch(`https://api.themoviedb.org/3/${type}/${id}?language=en-US`, options)
    const data = await res.json()
    return data
  } catch (error) {
    console.log(error)
  }
}


export const fetchCreditswithMovide = async({id, type} : {id : string | undefined, type : string | undefined}) => {
  try {
    const res = await fetch(`https://api.themoviedb.org/3/${type}/${id}/credits?language=en-US`, options)
    const data = await res.json()
    return data
  } catch (error) {
console.log(error)
  }
}

export const fetchSimilar = async({id, type} : {id : string | undefined, type : string | undefined}) => {
  try {
    const res = await fetch(`https://api.themoviedb.org/3/${type}/${id}/similar?language=en-US&page=1`, options)
    const data = await res.json()
    return data
  } catch (error) {
      console.log(error)
  }
}

export const fetchPersomImages = async({id, } : {id : number}) => {
  try {
    const res = await fetch(`https://api.themoviedb.org/3/person/${id}/images`, options)
    console.log(res)
    const data = await res.json()
    return data
  } catch (error) {
console.log(error)
  }
}

export const fetchGenres = async({type} : {type : string}) => {
  try {
    const res = await fetch(`https://api.themoviedb.org/3/genre/${type}/list?language=en`, options)
    console.log(res)
    const data = await res.json()
    return data
  } catch (error) {
console.log(error)
  }
}
export const fetchWithGenre = async({id, page} : {id : number | undefined, page : number}) => {
  console.log('page', page)
  try {
    const res = await fetch(`https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=false&language=en-US&page=${page}&sort_by=popularity.deschttps://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=false&language=en-US&sort_by=popularity.desc&with_genres=${id}`, options)
    const data = await res.json()
    console.log(data)
    return data
  } catch (error) {
console.log(error)
  }
}
export const fetchPerson = async(id :  string | undefined) => {
  console.log(id)
  try {
    const res = await fetch(`https://api.themoviedb.org/3/person/${id}?language=en-US'`, options)
    const data = await res.json()
    return data
  } catch (error) {
console.log(error)
  }
}
export const fetchPersonsCasts = async(id: string | undefined) => {
  try {
    const res = await fetch(`https://api.themoviedb.org/3/person/${id}/movie_credits?language=en-US`, options)
    const data = await res.json()
    console.log(data)
    return data
  } catch (error) {
console.log(error)
  }
}

