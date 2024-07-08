using Microsoft.EntityFrameworkCore;
using StudentAPI.Context;
using StudentAPI.Model;
using StudentAPI.Services.Interfaces;

namespace StudentAPI.Services {
    public class StudentsService : IStudentService {
        private readonly AppDbContext _Context;
        public StudentsService(AppDbContext context) {
            _Context = context;
        }

        public async Task<IEnumerable<Student>> GetStudents() {
            try {
                List<Student> Students = await _Context.Students.ToListAsync();
                return Students;
            } catch (Exception ex) {
                throw new Exception("Error while retrieving students.", ex);
            }
        }

        public async Task<Student> GetStudent(int id) {
            Student student = null;
            try {
                student = await _Context.Students.FindAsync(id);
                return student; 
            } catch (Exception ex) {
                throw new Exception("Aluno não encontrado.");
            }
        }

        public async Task<IEnumerable<Student>> GetStudentsByName(string Name) {
            IEnumerable<Student> Students;
            if (!string.IsNullOrEmpty(Name)) {
                Students = await _Context.Students.Where(x => x.Name.Contains(Name)).ToListAsync();
                return Students;
            }
            Students = await GetStudents();
            return Students;
        }

        public async Task CreateStudent(Student student) {
            _Context.Students.Add(student);
           await _Context.SaveChangesAsync();
        }
        public async Task UpdateStudent(Student student) {
            _Context.Entry(student).State = EntityState.Modified;
            await _Context.SaveChangesAsync();
        }

        public async Task DeleteStudent(Student student) {
            _Context.Students.Remove(student);
            await _Context.SaveChangesAsync();
        }
    }
}
