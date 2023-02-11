import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Student } from '../student'
import { StudentService } from '../student.service'

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css']
})
export class FormComponent /* implements OnInit */ {

  constructor(
    private router: Router,
    private studentService: StudentService
  ) { }

  addStudent(student: Student) {
    this.studentService.createStudent(student)
      .subscribe({
        next: () => {
          this.router.navigate(['/students']);
        },
        error: (error) => {
          alert("Failed to create student");
          console.error(error);
        }
      });
  }
/*   ngOnInit(): void {
  } */

}
