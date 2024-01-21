using ForLogic.Treinamento.OperacaoCuriosidade.Contracts;
using Microsoft.AspNetCore.Mvc;

namespace ForLogic.Treinamento.OperacaoCuriosidade.Controllers
{
    [ApiController]
    [Route("opCuriosidade")]
    public class DashBoardController : ControllerBase
    {
        private readonly IDashBoardRepository _infoRepo;
        public DashBoardController(IDashBoardRepository infoRepo) => _infoRepo = infoRepo;

        [HttpGet("registers_total")]
        public async Task<IActionResult> GetTotal()
        {
            var total = await _infoRepo.GetTotal();
            return Ok(total);
        }

        [HttpGet("registers_current_month")]
        public async Task<IActionResult> GetTotalForCurrentMonth()
        {
            var total = await _infoRepo.GetTotalForCurrentMonth();
            return Ok(total);
        }
    }
}
