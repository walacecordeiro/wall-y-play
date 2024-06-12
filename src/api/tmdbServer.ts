const baseURL = 'https://api.themoviedb.org/3/';
const AuthorizationTMDB = process.env.AUTHORIZATION_TMDB;

const GET = {
 method: "GET",
 headers: {
  accept: "application/json",
  Authorization: `Bearer ${AuthorizationTMDB}`,
 },
};

export { baseURL, GET };
