using ForLogic.Treinamento.OperacaoCuriosidade.Context;
using ForLogic.Treinamento.OperacaoCuriosidade.Contracts;
using ForLogic.Treinamento.OperacaoCuriosidade.Model;
using Dapper;
using System.Data;
using ForLogic.Treinamento.OperacaoCuriosidade.Dto;
using Microsoft.AspNetCore.Mvc;

namespace ForLogic.Treinamento.OperacaoCuriosidade.Repository
{
    public class UserRepository : IUserRepository
    {
        private readonly DataContext _context; 
        public UserRepository(DataContext context) => _context = context;

        public async Task<IEnumerable<User>> GetAllUsers(int page, int quantity)
        {
            var query = $"SELECT * FROM Users ORDER BY Id OFFSET {page - 1} * {quantity} ROWS FETCH NEXT {quantity} ROWS ONLY";


            using (var connection = _context.CreateConnection())
            {
                var users = await connection.QueryAsync<User>(query);
                return users.ToList();
            }
        }

        public async Task<User> GetUser(int id)
        {
            var query = "SELECT * FROM Users WHERE Id = @Id";

            using (var connection = _context.CreateConnection())
            {
                var user = await connection.QuerySingleOrDefaultAsync<User>(query, new {id});
                return user;
            }
        }

        //public async Task<User> SearchUser(string nome)
        //{
        //    var query = "SELECT * FROM Users WHERE Nome LIKE @Nome";

        //    using (var connection = _context.CreateConnection())
        //    {
        //        var user = await connection.QuerySingleOrDefaultAsync<User>(query, new { nome });
        //        return user;
        //    }
        //}

        public async Task<List<User>> SearchUser(string nome)
        {
            var query = "SELECT * FROM Users WHERE Nome LIKE @Nome + '%'";

            using (var connection = _context.CreateConnection())
            {
                var users = await connection.QueryAsync<User>(query, new { nome });
                return users.ToList();
            }
        }

        public async Task<bool> UserExists(string email)
        {
            var query = "SELECT * FROM Users WHERE Email = @Email";

            using(var connection = _context.CreateConnection())
            {
                var count = await connection.QuerySingleOrDefaultAsync<int>(query, new {email});
                return count > 0;
            }
        }

        public async Task<User> AddUser(UserForCreationDto user)
        {
            var query = "INSERT INTO Users (Nome, Idade, Email, Senha, Endereco, Outros, Interesses, Sentimentos, Valores, Ativo) " +
            "VALUES (@Nome, @Idade, @Email, @Senha, @Endereco, @Outros, @Interesses, @Sentimentos, @Valores, @Ativo)"
            + " SELECT CAST(SCOPE_IDENTITY() AS int)" +
            "";

            var parameters = new DynamicParameters();
            parameters.Add("Nome", user.Nome, DbType.String);
            parameters.Add("Idade", user.Idade, DbType.Int32);
            parameters.Add("Email", user.Email, DbType.String);
            parameters.Add("Senha", user.Senha, DbType.String);
            parameters.Add("Endereco", user.Endereco, DbType.String);
            parameters.Add("Outros", user.Outros, DbType.String);
            parameters.Add("Interesses", user.Interesses, DbType.String);
            parameters.Add("Sentimentos", user.Sentimentos, DbType.String);
            parameters.Add("Valores", user.Valores, DbType.String);
            parameters.Add("Ativo", user.Ativo, DbType.Boolean);

            using (var connection = _context.CreateConnection())
            {
                var id = await connection.QuerySingleAsync<int>(query, parameters);

                var createdUser = new User
                {
                    Id = id,
                    Nome = user.Nome,
                    Idade = user.Idade,
                    Email = user.Email,
                    Senha = user.Senha,
                    Endereco = user.Endereco,
                    Outros = user.Outros,
                    Interesses = user.Interesses,
                    Sentimentos = user.Sentimentos,
                    Valores = user.Valores,
                    Ativo = user.Ativo
                };

                return createdUser;
            }
        }

        public async Task<User> UpdateUser(int id, UserForCreationDto user)
        {
            var query = "UPDATE Users SET Nome = @Nome, Idade = @Idade, Email = @Email, Senha = @Senha, Endereco = @Endereco, Outros = @Outros, Interesses = @Interesses, Sentimentos = @Sentimentos, Valores = @Valores WHERE Id = @Id";

            var parameters = new DynamicParameters();
            parameters.Add("Id", id, DbType.Int32);
            parameters.Add("Nome", user.Nome, DbType.String);
            parameters.Add("Idade", user.Idade, DbType.Int32);
            parameters.Add("Email", user.Email, DbType.String);
            parameters.Add("Senha", user.Senha, DbType.String);
            parameters.Add("Endereco", user.Endereco, DbType.String);
            parameters.Add("Outros", user.Outros, DbType.String);
            parameters.Add("Interesses", user.Interesses, DbType.String);
            parameters.Add("Sentimentos", user.Sentimentos, DbType.String);
            parameters.Add("Valores", user.Valores, DbType.String);
            parameters.Add("Ativo", user.Ativo, DbType.Boolean);

            using (var connection = _context.CreateConnection())
            {
                await connection.ExecuteAsync(query, parameters);
            }

            return await GetUser(id);
        }

        public async Task DeleteUser(int id)
        {
            var query = "DELETE FROM Users WHERE Id = @Id";

            using (var connection = _context.CreateConnection())
            {
                await connection.ExecuteAsync(query, new { id });
            }
        }
    }
}
