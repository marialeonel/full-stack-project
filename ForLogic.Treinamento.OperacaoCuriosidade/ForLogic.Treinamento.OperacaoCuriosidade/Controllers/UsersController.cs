using ForLogic.Treinamento.OperacaoCuriosidade.Contracts;
using ForLogic.Treinamento.OperacaoCuriosidade.Dto;
using ForLogic.Treinamento.OperacaoCuriosidade.Model;
using Microsoft.AspNetCore.Mvc;
using static Microsoft.EntityFrameworkCore.DbLoggerCategory.Database;

namespace ForLogic.Treinamento.OperacaoCuriosidade.Controllers
{
    [ApiController]
    [Route("opCuriosidade")]
    public class UsersController : ControllerBase
    {
        private readonly IUserRepository _userRepo;
        public UsersController(IUserRepository userRepo) => _userRepo = userRepo;

        [HttpGet("getAll")]
        public async Task<IActionResult> GetAllUsers(int page = 1, int quantity = 10)
        {
            var users = await _userRepo.GetAllUsers(page, quantity);
            return Ok(users);
        }

        [HttpGet("getOneUser/{id}", Name = "userById")]
        public async Task<IActionResult> GetUser(int id)
        {
            var user = await _userRepo.GetUser(id);
            if (user is null)
                return NotFound();

            return Ok(user);
        }

        [HttpGet("search_user", Name = "userByName")]
        public async Task<IActionResult> SearchUser([FromQuery] string nome)
        {
            var user = await _userRepo.SearchUser(nome);
            if (user is null)
                return NotFound();

            return Ok(user);
        }

        [HttpPost]
        public async Task<IActionResult> AddUser(UserForCreationDto user)
        {
            if (await _userRepo.UserExists(user.Email))
                return BadRequest("Usuário com o email " + user.Email + " já existe.");

            var createdUser = await _userRepo.AddUser(user);
            return CreatedAtRoute("userById", new { id = createdUser.Id }, createdUser);
        }

        [HttpPut("updateUser/{id}")]
        public async Task<IActionResult> UpateUser(int id, UserForCreationDto user)
        {
            var dbUser = await _userRepo.GetUser(id);
            if (dbUser is null)
                return NotFound();

            var updatedUser = await _userRepo.UpdateUser(id, user);
            return Ok(updatedUser);
        }

        [HttpDelete("deleteUser")]
        public async Task<IActionResult> DeleteUser([FromQuery] int id)
        {
            var dbUser = await _userRepo.GetUser(id);
            if (dbUser is null)
                return NotFound();

            await _userRepo.DeleteUser(id);
            return NoContent();
        }
    }
}
