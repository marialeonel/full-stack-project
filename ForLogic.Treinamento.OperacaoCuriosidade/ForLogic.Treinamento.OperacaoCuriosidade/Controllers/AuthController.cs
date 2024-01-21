using ForLogic.Treinamento.OperacaoCuriosidade.Contracts;
using ForLogic.Treinamento.OperacaoCuriosidade.Dto;
using Microsoft.AspNetCore.Mvc;

namespace ForLogic.Treinamento.OperacaoCuriosidade.Controllers
{
    [ApiController]
    [Route("opCuriosidade")]
    public class AuthController : Controller
    {
        private readonly IAuthRepository _authRepo;
        public AuthController(IAuthRepository authRepo) => _authRepo = authRepo;

        [HttpPost("validate")]
        public async Task<IActionResult> ValidateUser([FromBody] UserForCredentialsDto credentials)
        {
            var user = await _authRepo.ValidateUser(credentials.Email, credentials.Senha);

            if (user is null)
                return NotFound();

            return Ok(user);
        }
    }
}
