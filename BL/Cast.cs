﻿using Matala2_ASP.DAL;
using System;
using System.Collections.Generic;

namespace Matala2_ASP.BL
{
    public class Cast
    {
        public string Id { get; set; } = string.Empty;
        public string Name { get; set; } = string.Empty;
        public string Role { get; set; } = string.Empty;
        public DateTime Date { get; set; }
        public string Country { get; set; }  = string.Empty;
        public string PhotoUrl { get; set; }  = string.Empty;

        // Integrate with CastDal
        private static CastDal castDal = new CastDal();

        public static List<Cast> GetAllCasts()
        {
            return castDal.GetAllCasts();
        }

        public static bool Insert(Cast cast)
        {
            return castDal.InsertCast(cast);
        }

        public static bool Update(Cast cast)
        {
            return castDal.UpdateCast(cast);
        }

        public static bool Delete(string id)
        {
            return castDal.DeleteCast(id);
        }
    }
}
