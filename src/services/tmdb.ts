const baseURL = "https://api.themoviedb.org/3";
// const AuthorizationTMDB = process.env.AUTHORIZATION_TMDB;

type apiRequestConfig = {
 method: string;
 endPoint: string;
 params?: Record<string, string>;
};

const TMDB_response = ({ method, endPoint, params }: apiRequestConfig) => {
 const options = {
  method,
  url: `${baseURL}${endPoint}`,
  params,
  headers: {
   accept: "application/json",
   Authorization:
    "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJlNmEzYTk0M2YzNThhMjA2MDY3YTE2ODcxY2QwYjVhNCIsInN1YiI6IjY2NjA4MDVjZGU5NWQ3MzJlYWU5OTJlMSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.GlLhhtii_ef5XsCFMwxE-i1umNt-AmkF4rgJ9RtJF7U",
  },
 };

 return options;
};

export { TMDB_response };
