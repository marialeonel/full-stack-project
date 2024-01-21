USE [OpCuriosidade]

CREATE TABLE Users (
    Id INT IDENTITY(1,1) PRIMARY KEY,
    Nome VARCHAR(60) NOT NULL,
    Idade INT NOT NULL,
    Email VARCHAR(40) NOT NULL,
    Senha VARCHAR(20) NOT NULL,
    Endereco VARCHAR(60) NOT NULL,
    Outros VARCHAR(100),
    Interesses VARCHAR(150) NOT NULL,
    Sentimentos VARCHAR(150) NOT NULL,
    Valores VARCHAR(150) NOT NULL,
    Ativo BIT,
    CreatedAt DATETIME DEFAULT GETDATE()
);


SET IDENTITY_INSERT [dbo].[Users] ON 

INSERT [dbo].[Users] ([Id], [Nome], [Idade], [Email], [Senha], [Endereco], [Outros], [Interesses], [Sentimentos], [Valores], [Ativo], [CreatedAt]) VALUES (
    1, 'Paul Roach', 17, 'paul@gmail.com', 'Paul123!', 'Rua da Bananeira', '', 'Programação, truco', 'Sensatez', 'Marxismo, fim da propriedade privada. liberdade', 1, GETDATE());

INSERT [dbo].[Users] ([Id], [Nome], [Idade], [Email], [Senha], [Endereco], [Outros], [Interesses], [Sentimentos], [Valores], [Ativo], [CreatedAt]) VALUES (
    2, 'Ameinda Barros', 30, 'ameinda@gmail.com', 'Ameinda123!', 'Avenida Castelo Branco', 'Eu adoro trabalhar', 'Subir de cargo meritocraticamente', 'Gratidão', 'Família, capitalismo, liberdade', 1, GETDATE());

INSERT [dbo].[Users] ([Id], [Nome], [Idade], [Email], [Senha], [Endereco], [Outros], [Interesses], [Sentimentos], [Valores], [Ativo], [CreatedAt]) VALUES (
    3, 'Renan Cacris', 19, 'renan@gmail.com', 'Renan123!', 'Rua Longe', 'Eu já li mais de 60 livros em 1 ano.', 'Livros, séries', 'Ódio, aventura', 'etc', 1, GETDATE());

INSERT [dbo].[Users] ([Id], [Nome], [Idade], [Email], [Senha], [Endereco], [Outros], [Interesses], [Sentimentos], [Valores], [Ativo], [CreatedAt]) VALUES (
    4, 'Giovanna Rica', 20, 'giovanna@gmail.com', 'Giovanna123!', 'Rua do Limoeiro', 'Crochê é meu hobby favorito', 'Culinária, livros, cinema', 'Felicidade', 'dsfdbrhtyj', 1, GETDATE());

INSERT [dbo].[Users] ([Id], [Nome], [Idade], [Email], [Senha], [Endereco], [Outros], [Interesses], [Sentimentos], [Valores], [Ativo], [CreatedAt]) VALUES (
    5, 'Enrique Martins', 20, 'enrique@gmail.com', 'Enrique123!', 'Rua perto da UTFPR', '', 'Animais, filmes, jogos, futebol', 'Amor', 'Compreensão', 1, GETDATE());

INSERT [dbo].[Users] ([Id], [Nome], [Idade], [Email], [Senha], [Endereco], [Outros], [Interesses], [Sentimentos], [Valores], [Ativo], [CreatedAt]) VALUES (
    6, 'Camila da Silva', 70, 'camila@gmail.com', 'Camila123!', 'Avenida Central', 'Já morei em 3 países diferentes', 'Viagens, música', 'Empolgação', 'Libertarianismo', 1, GETDATE());

SET IDENTITY_INSERT [dbo].[Users] OFF


