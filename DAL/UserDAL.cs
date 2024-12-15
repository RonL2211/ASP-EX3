//using Matala2_ASP.BL;
//using System;
//using System.Collections.Generic;
//using System.Linq;
//using System.Web;
//using System.Data.SqlClient;
//using System.Data;
//using System.Text;

//namespace Matala2_ASP.DAL
//{
//    public class UserDal
//    {

//        //--------------------------------------------------------------------------------------------------
//        // This method creates a connection to the database according to the connectionString name in the web.config 
//        //--------------------------------------------------------------------------------------------------
//        public SqlConnection connect(String conString)
//        {

//            // read the connection string from the configuration file
//            IConfigurationRoot configuration = new ConfigurationBuilder()
//            .AddJsonFile("appsettings.json").Build();
//            string cStr = configuration.GetConnectionString("Matal2_ASP");
//            SqlConnection con = new SqlConnection(cStr);
//            //con.Open();
//            return con;
//        }
//        private readonly string connectionString = "Server=194.90.158.75;Database=bgroup1_test2;User Id=bgroup1;Password=bgroup1_14409;";

//        // Add a new user
//        public bool AddUser(User user)
//        {

//            using (SqlConnection con = new SqlConnection(connectionString))
//            {
//                con.Open();
//                SqlCommand cmd = new SqlCommand("SP_InsertUser", con)
//                {
//                    CommandType = CommandType.StoredProcedure
//                };
//                cmd.Parameters.AddWithValue("@UserName", user.UserName);
//                cmd.Parameters.AddWithValue("@Email", user.Email);
//                cmd.Parameters.AddWithValue("@Password", user.Password);

//                try
//                {
//                    int rowsAffected = cmd.ExecuteNonQuery();

//                    return rowsAffected > 0;
//                }
//                catch (Exception e)
//                {

//                    throw (e);
//                    return false;
//                }
//                finally
//                {
//                    con.Close();
//                }
//            }
//        }

//        // Update an existing user
//        public bool UpdateUser(User user)
//        {
//            using (SqlConnection con = new SqlConnection(connectionString))
//            {
//                con.Open();
//                SqlCommand cmd = new SqlCommand("SP_UpdateUser", con)
//                {
//                    CommandType = CommandType.StoredProcedure
//                };
//                cmd.Parameters.AddWithValue("@Id", user.Id);
//                cmd.Parameters.AddWithValue("@UserName", user.UserName);
//                cmd.Parameters.AddWithValue("@Email", user.Email);
//                cmd.Parameters.AddWithValue("@Password", user.Password);

//                try
//                {
//                    int rowsAffected = cmd.ExecuteNonQuery();

//                    return rowsAffected > 0;
//                }
//                catch (Exception e)
//                {

//                    throw (e);
//                    return false;
//                }
//                finally
//                {
//                    con.Close();
//                }
//            }
//        }

//        // Get all users
//        public List<User> GetAllUsers()
//        {
//            List<User> users = new List<User>();
//            using (SqlConnection con = new SqlConnection(connectionString))
//            {
//                con.Open();
//                SqlCommand cmd = new SqlCommand("SP_GetAllUsers", con)
//                {
//                    CommandType = CommandType.StoredProcedure
//                };

//                using (SqlDataReader reader = cmd.ExecuteReader())
//                {
//                    while (reader.Read())
//                    {
//                        users.Add(new User
//                        {
//                            Id = reader["Id"] is DBNull ? 0 : (int)reader["Id"],
//                            UserName = reader["UserName"]?.ToString() ?? "Unknown UserName",
//                            Email = reader["Email"]?.ToString() ?? "Unknown Email",
//                            Password = reader["Password"]?.ToString() ?? string.Empty

//                        });
//                    }
//                }
//                con.Close();
//            }
//            return users;
//        }

//        // Get a user by email and password
//        public User? GetUserByEmailAndPassword(string email, string password)
//        {
//            using (SqlConnection con = new SqlConnection(connectionString))
//            {
//                con.Open();
//                SqlCommand cmd = new SqlCommand("SP_UserLogin", con)
//                {
//                    CommandType = CommandType.StoredProcedure
//                };
//                cmd.Parameters.AddWithValue("@Email", email);
//                cmd.Parameters.AddWithValue("@Password", password);

//                using (SqlDataReader reader = cmd.ExecuteReader())
//                {
//                    if (reader.Read())
//                    {
//                        try
//                        {
//                            return new User
//                            {
//                                Id = reader["Id"] is DBNull ? 0 : (int)reader["Id"],
//                                UserName = reader["UserName"]?.ToString() ?? "Unknown UserName",
//                                Email = reader["Email"]?.ToString() ?? "Unknown Email",
//                                Password = reader["Password"].ToString() ?? string.Empty

//                            };
//                        }

//                        catch (Exception e)
//                        {
//                            Console.WriteLine(e.Message);
//                        }
//                        finally
//                        {
//                            con.Close();

//                        }
//                    }
//                }

//            }
//            return null;
//        }
//    }
//}


    using Matala2_ASP.BL;
    using System;
    using System.Collections.Generic;
    using System.Data;
    using System.Data.SqlClient;

    namespace Matala2_ASP.DAL
    {
        public class UserDal
        {
            private readonly string connectionString = "Server=194.90.158.75;Database=bgroup1_test2;User Id=bgroup1;Password=bgroup1_14409;";

            // Add a new user
            public bool AddUser(User user)
            {
                using (SqlConnection con = new SqlConnection(connectionString))
                {
                    using (SqlCommand cmd = new SqlCommand("SP_InsertUser", con))
                    {
                        cmd.CommandType = CommandType.StoredProcedure;
                        cmd.Parameters.Add(new SqlParameter("@UserName", SqlDbType.NVarChar) { Value = user.UserName });
                        cmd.Parameters.Add(new SqlParameter("@Email", SqlDbType.NVarChar) { Value = user.Email });
                        cmd.Parameters.Add(new SqlParameter("@Password", SqlDbType.NVarChar) { Value = user.Password });

                    try
                    {
                        con.Open();
                        int rowsAffected = cmd.ExecuteNonQuery();
                        return rowsAffected > 0;
                    }
                    catch (Exception ex)
                    {
                        // Log exception
                        Console.WriteLine($"Error in AddUser: {ex.Message}");
                        throw (ex);
                        return false;
                    }

                    finally
                    {
                        con.Close();
                    }
                }
                }
            }

            // Update an existing user
            public bool UpdateUser(User user)
            {
                using (SqlConnection con = new SqlConnection(connectionString))
                {
                    using (SqlCommand cmd = new SqlCommand("SP_UpdateUser", con))
                    {
                        cmd.CommandType = CommandType.StoredProcedure;
                        cmd.Parameters.Add(new SqlParameter("@Id", SqlDbType.Int) { Value = user.Id });
                        cmd.Parameters.Add(new SqlParameter("@UserName", SqlDbType.NVarChar) { Value = user.UserName });
                        cmd.Parameters.Add(new SqlParameter("@Email", SqlDbType.NVarChar) { Value = user.Email });
                        cmd.Parameters.Add(new SqlParameter("@Password", SqlDbType.NVarChar) { Value = user.Password });

                        try
                        {
                            con.Open();
                            int rowsAffected = cmd.ExecuteNonQuery();
                            return rowsAffected > 0;
                        }
                        catch (Exception ex)
                        {
                            // Log exception
                            Console.WriteLine($"Error in UpdateUser: {ex.Message}");
                        throw (ex);
                        return false;
                    }

                    finally
                    {
                        con.Close();
                    }
                }
                }
            }

            // Get all users
            public List<User> GetAllUsers()
            {
                List<User> users = new List<User>();
                using (SqlConnection con = new SqlConnection(connectionString))
                {
                    using (SqlCommand cmd = new SqlCommand("SP_GetAllUsers", con))
                    {
                        cmd.CommandType = CommandType.StoredProcedure;

                        try
                        {
                            con.Open();
                            using (SqlDataReader reader = cmd.ExecuteReader())
                            {
                                while (reader.Read())
                                {
                                    users.Add(new User
                                    {
                                        Id = reader.GetInt32(reader.GetOrdinal("Id")),
                                        UserName = reader.GetString(reader.GetOrdinal("UserName")),
                                        Email = reader.GetString(reader.GetOrdinal("Email")),
                                        Password = reader.GetString(reader.GetOrdinal("Password"))
                                    });
                                }
                            }
                        }
                        catch (Exception ex)
                        {
                            // Log exception
                            Console.WriteLine($"Error in GetAllUsers: {ex.Message}");
                        }
                        finally
                        { 
                                 con.Close();
                        }
                    }
                }
                return users;
            }

            // Get a user by email and password
            public User? GetUserByEmailAndPassword(string email, string password)
            {
                using (SqlConnection con = new SqlConnection(connectionString))
                {
                    using (SqlCommand cmd = new SqlCommand("SP_UserLogin", con))
                    {
                        cmd.CommandType = CommandType.StoredProcedure;
                        cmd.Parameters.Add(new SqlParameter("@Email", SqlDbType.NVarChar) { Value = email });
                        cmd.Parameters.Add(new SqlParameter("@Password", SqlDbType.NVarChar) { Value = password });

                        try
                        {
                            con.Open();
                            using (SqlDataReader reader = cmd.ExecuteReader())
                            {
                                if (reader.Read())
                                {
                                    return new User
                                    {
                                        Id = reader.GetInt32(reader.GetOrdinal("Id")),
                                        UserName = reader.GetString(reader.GetOrdinal("UserName")),
                                        Email = reader.GetString(reader.GetOrdinal("Email")),
                                        Password = reader.GetString(reader.GetOrdinal("Password"))
                                    };
                                }
                            }
                        }
                        catch (Exception ex)
                        {
                            // Log exception
                            Console.WriteLine($"Error in GetUserByEmailAndPassword: {ex.Message}");
                        }
                        finally { con.Close(); }
                    }
                }
                return null;
            }
        }
    }
