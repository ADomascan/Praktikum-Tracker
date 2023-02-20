import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { Student } from 'src/app/student';
import { StudentService } from 'src/app/student.service';

@Component({
  selector: 'app-edit-student',
  templateUrl: './edit-student.component.html',
  styleUrls: ['./edit-student.component.css']
})
export class EditStudentComponent implements OnInit {

  student: BehaviorSubject<Student> = new BehaviorSubject({});

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private studentService: StudentService,
  ) { }

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    if (!id) {
      alert('No id provided');
    }

    this.studentService.getStudent(id !).subscribe((student) => {
      this.student.next(student);
    });
  }

  editStudent(student: Student) {
    this.studentService.updateStudent(this.student.value._id || '', student)
      .subscribe({
        next: () => {
          this.router.navigate(['/search']);
        },
        error: (error) => {
          alert('Failed to update student');
          console.error(error);
        }
      })
  }
}
