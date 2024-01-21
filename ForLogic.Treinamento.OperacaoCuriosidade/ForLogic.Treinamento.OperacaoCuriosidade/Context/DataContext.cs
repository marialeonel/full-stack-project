using Microsoft.Data.SqlClient;
using System.Data;

namespace ForLogic.Treinamento.OperacaoCuriosidade.Context
{
    public class DataContext
    {
        private readonly IConfiguration _configuration;
        private readonly string _connectionString;

        public DataContext(IConfiguration configuration)
        {
            _configuration = configuration;
            _connectionString = _configuration.GetConnectionString("SqlConnection");
        }

        public IDbConnection CreateConnection() => new SqlConnection(_connectionString);
    }
}
