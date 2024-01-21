namespace ForLogic.Treinamento.OperacaoCuriosidade.Contracts
{
    public interface IDashBoardRepository
    {
        public Task<int> GetTotal();
        public Task<int> GetTotalForCurrentMonth();
    }
}
