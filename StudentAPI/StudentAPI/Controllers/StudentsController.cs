using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using StudentAPI.Model;
using StudentAPI.Services;
using StudentAPI.Services.Interfaces;

namespace StudentAPI.Controllers {
    [Route("api/[controller]")]
    [ApiController]
    [Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme)]
    public class StudentsController : ControllerBase {
        private readonly IStudentService _StudentService;
        public StudentsController(IStudentService StudentService) {
            _StudentService = StudentService;
        }

        [HttpGet]
        public async Task<ActionResult<IAsyncEnumerable<Student>>> GetStudents() {
            try {
                IEnumerable<Student> Students = await _StudentService.GetStudents();
                return Ok(Students);
            } catch (Exception ex) {
                return BadRequest("Invalid Request");
            }
        }

        [HttpGet("StudentByName")]
        public async Task<ActionResult<IAsyncEnumerable<Student>>> GetStudentsByName([FromQuery] string Name) {
            try {
                IEnumerable<Student> Students = await _StudentService.GetStudentsByName(Name);

                if (!Students.Any() || Students == null) {
                    return NotFound($"No students found with name {Name}.");
                }

                return Ok(Students);
            } catch (Exception ex) {
                return BadRequest("Invalid Request");
            }
        }

        [HttpGet("{id}", Name = "GetStudentByID")]
        public async Task<ActionResult<Student>> GetStudentByID(int id) {
            try {
                Student Student = await _StudentService.GetStudent(id);
                if (Student == null) {
                    return NotFound($"No student found with ID {id}.");
                }
                return Ok(Student);

            } catch (Exception ex) {
                return BadRequest("Invalid Request");
            }
        }

        [HttpPost]
        public async Task<ActionResult> InsertStudent(Student student) {
            try {
                await _StudentService.CreateStudent(student);
                return CreatedAtRoute(nameof(GetStudentByID), new { id = student.Id }, student);
            } catch (Exception ex) {
                return BadRequest("Invalid Request");
            }
        }

        [HttpPut("{id}")]
        public async Task<ActionResult> UpdateStudent(int id, Student student) {
            try {
                if(student.Id != id) {
                    return BadRequest("Inconsistent data.");
                }

                await _StudentService.UpdateStudent(student);
                return Ok($"Student with id:{id} updated successfully.");
            } catch (Exception ex) {
                return BadRequest("Invalid Request");
            }
        }

        [HttpDelete("{id}")]
        public async Task<ActionResult> DeleteStudent(int id) {
            try {
                Student student = await _StudentService.GetStudent(id);
                if (student == null) {
                    return NotFound($"No student found with ID {id}.");
                }

                await _StudentService.DeleteStudent(student);
                return Ok($"Student with id:{id} deleted successfully.");
            } catch (Exception ex) {
                return BadRequest("Invalid Request");
            }
        }
    }
}
