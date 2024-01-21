using ForLogic.Treinamento.OperacaoCuriosidade.Model;

namespace ForLogic.Treinamento.OperacaoCuriosidade.Contracts
{
    public interface IAuthRepository
    {
        public Task<User> ValidateUser(string email, string senha);
    }
}
