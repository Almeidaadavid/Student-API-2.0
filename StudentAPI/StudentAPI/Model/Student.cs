using System.ComponentModel.DataAnnotations;

namespace StudentAPI.Model {
    public class Student {
        public int Id { get; set; }
        [Required]
        [StringLength(80)]
        public string Name { get; set; }
        [Required]
        [StringLength(100)]
        [EmailAddress]
        public string Email { get; set; }
        [Required]
        public int Age { get; set; }
    }
}
