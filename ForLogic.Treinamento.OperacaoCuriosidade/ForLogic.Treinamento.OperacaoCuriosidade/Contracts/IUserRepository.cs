using ForLogic.Treinamento.OperacaoCuriosidade.Model;
using ForLogic.Treinamento.OperacaoCuriosidade.Dto;

namespace ForLogic.Treinamento.OperacaoCuriosidade.Contracts
{
    public interface IUserRepository
    {
        public Task<IEnumerable<User>> GetAllUsers(int page, int quantity);
        public Task<User> GetUser(int id);
        public Task<List<User>> SearchUser(string nome);
        public Task<User> AddUser(UserForCreationDto user);
        public Task<User> UpdateUser(int id, UserForCreationDto user);
        public Task DeleteUser(int id);
        public Task<bool> UserExists(string email);
        
    }
}
