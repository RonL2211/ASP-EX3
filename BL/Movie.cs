﻿using Matala2_ASP.DAL;
using System;
using System.Collections.Generic;

namespace Matala2_ASP.BL
{
    public class Movie
    {
        public int Id { get; set; } 
        public string Title { get; set; } = string.Empty;
        public double Rating { get; set; }
        public int Income { get; set; }
        public int ReleaseYear { get; set; }
        public int Duration { get; set; }
        public string Language { get; set; } = string.Empty;
        public string Description { get; set; } = string.Empty;
        public string Genre { get; set; } = string.Empty;
        public string PhotoUrl { get; set; } = string.Empty;

        // Integrate with MovieDal
        private static MovieDal movieDal = new MovieDal();

        public static List<Movie> GetAllMovies()
        {
            return movieDal.GetAllMovies();
        }

        public static bool Insert(Movie movie)
        {
            return movieDal.InsertMovie(movie);
        }

        public static bool Update(Movie movie)
        {
            return movieDal.UpdateMovie(movie);
        }

        public static bool Delete(int id)
        {
            return movieDal.DeleteMovie(id);
        }


        public static bool InsertWishlist(int userId ,int movieId)
        {
            MovieDal md = new MovieDal();
            return md.InsertWishlist(userId, movieId);

        }


        public static List<Movie> ShowWishlist(int userId)
        {
            MovieDal md = new MovieDal();
            return md.ShowWishlist(userId);

        }
    }
}
