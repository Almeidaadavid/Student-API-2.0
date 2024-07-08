using StudentAPI.Model;

namespace StudentAPI.Services.Interfaces {
    public interface IStudentService {
        Task<IEnumerable<Model.Student>> GetStudents();
        Task<Student> GetStudent(int id);
        Task<IEnumerable<Student>> GetStudentsByName(string nome);
        Task CreateStudent(Student student);
        Task UpdateStudent(Student student);
        Task DeleteStudent(Student student);
    }
}
