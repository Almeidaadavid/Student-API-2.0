using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using StudentAPI.Services.Interfaces;

namespace StudentAPI.Controllers {
    [Route("api/[controller]")]
    [ApiController]
    public class StudentsController : ControllerBase {
        private readonly IStudentService _StudentService;
        public StudentsController(IStudentService StudentService) {
            _StudentService = StudentService;
        }
    }
}
