import { IFilterForm } from "../../types/movieData.types";

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

export const fetchGenres = async({type} : {type : string | undefined}) => {
  try {
    const res = await fetch(`https://api.themoviedb.org/3/genre/${type}/list?language=en`, options)
    const data = await res.json()
    return data
  } catch (error) {
console.log(error)
  }
}
export const fetchWithGenre = async({id, page} : {id : string | undefined, page : number}) => {
  console.log('page', page)
  try {
    const res = await fetch(`https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=false&language=en-US&page=${page}&sort_by=popularity.deschttps://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=false&language=en-US&sort_by=popularity.desc&with_genres=${id}`, options)
    const data = await res.json()
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
export const fetchWithKeyword = async(keyword :  string | undefined) => {
  console.log(keyword)
  try {
    const res = await fetch(`https://api.themoviedb.org/3/search/multi?query=${keyword}&api_key=78724e3c33488a5fd626910e6f2e6377`, {
      method: 'GET',
      headers: {
        'Authorization': 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI3ODcyNGUzYzMzNDg4YTVmZDYyNjkxMGU2ZjJlNjM3NyIsInN1YiI6IjY2NTQzY2Q5ZDAwMTg4NDgwZDA2YjE4NiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.56_0hRdHSjkbdVJkVY5bN3BVFCzHVRtE5-hmiNcIgcI',
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      }
    })
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

export const fetchCountryList = async() => {
  try {
    const res = await fetch(`https://api.themoviedb.org/3/configuration/countries?language=en-US`, options)
    const data = await res.json()
    return data
  } catch (error) {
console.log(error)
  }
}


export const fetchWithFilter = async({type, release_datelgre, release_datelte, vote_averagegte, vote_averagelte,with_genres, with_origin_country, page} : IFilterForm) => {
  try {
    const res = await fetch(`https://api.themoviedb.org/3/discover/${type}?include_adult=false&include_video=false&language=en-US&page=${Number(page)}&release_date.gte=${release_datelgre}&release_date.lte=${release_datelte}&sort_by=popularity.desc&vote_average.gte=${vote_averagegte}&vote_average.lte=${vote_averagelte}&with_genres=${with_genres}&with_origin_country=${with_origin_country}`, options)
    const data = await res.json()
    return data
  } catch (error) {
console.log(error)
  }
}