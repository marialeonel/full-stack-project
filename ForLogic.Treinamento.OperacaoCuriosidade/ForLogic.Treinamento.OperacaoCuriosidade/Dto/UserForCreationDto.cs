namespace ForLogic.Treinamento.OperacaoCuriosidade.Dto
{
    public class UserForCreationDto
    {
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
    }
}
