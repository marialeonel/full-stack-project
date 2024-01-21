namespace ForLogic.Treinamento.OperacaoCuriosidade.Model
{
    public class User
    {
        public int Id { get; set; }
        public string Nome { get; set; }
        public int Idade { get; set; }
        public string Email { get; set; }
        public string Senha { get; set; }
        public string Endereco { get; set; }
        public string? Outros { get; set; }
        public string Interesses { get; set; }
        public string Sentimentos { get; set; }
        public string Valores { get; set; }
        public bool Ativo { get; set; }
        public DateTime CreatedAt { get; set; } = DateTime.Now;

    }
}
