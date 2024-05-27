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