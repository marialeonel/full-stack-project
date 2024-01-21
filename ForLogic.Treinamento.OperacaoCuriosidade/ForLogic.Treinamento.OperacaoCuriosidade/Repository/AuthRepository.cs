using ForLogic.Treinamento.OperacaoCuriosidade.Context;
using ForLogic.Treinamento.OperacaoCuriosidade.Contracts;
using ForLogic.Treinamento.OperacaoCuriosidade.Model;
using Dapper;

namespace ForLogic.Treinamento.OperacaoCuriosidade.Repository
{
    public class AuthRepository : IAuthRepository
    {
        private readonly DataContext _context;
        public AuthRepository(DataContext context) => _context = context;
        public async Task<User> ValidateUser(string email, string senha)
        {
            var query = "SELECT * FROM Users WHERE email = @Email AND senha = @Senha";


            using (var connection = _context.CreateConnection())
            {
                var user = await connection.QuerySingleOrDefaultAsync<User>(query, new { Email = email, Senha = senha });
                return user;
            }
        }
    }
}
