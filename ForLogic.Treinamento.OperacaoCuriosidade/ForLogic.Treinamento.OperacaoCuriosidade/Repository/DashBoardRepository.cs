using ForLogic.Treinamento.OperacaoCuriosidade.Context;
using ForLogic.Treinamento.OperacaoCuriosidade.Contracts;
using Microsoft.EntityFrameworkCore;
using Dapper;

namespace ForLogic.Treinamento.OperacaoCuriosidade.Repository
{
    public class DashBoardRepository : IDashBoardRepository
    {
        private readonly DataContext _context;
        public DashBoardRepository(DataContext context) => _context = context;
        public async Task<int> GetTotal()
        {
            var query = "SELECT COUNT(*) FROM Users";

            using (var connection = _context.CreateConnection())
            {
                var total = await connection.QueryFirstOrDefaultAsync<int>(query);
                return total;
            }
        }

        public async Task<int> GetTotalForCurrentMonth()
        {
            var currentMonth = DateTime.Now.Month;
            var currentYear = DateTime.Now.Year;

            var query = $"SELECT COUNT(*) FROM Users WHERE MONTH(CreatedAt) = {currentMonth} AND YEAR(CreatedAt) = {currentYear}";

            using (var connection = _context.CreateConnection())
            {
                var total = await connection.QueryFirstOrDefaultAsync<int>(query);
                return total;
            }
        }
    }
}
