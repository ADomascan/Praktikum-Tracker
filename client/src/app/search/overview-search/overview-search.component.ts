import { Component, Input, OnInit } from '@angular/core';
import { Number } from 'mongoose';
import { Observable } from 'rxjs';
import { Student } from '../../student';
import { StudentService } from '../../student.service';
@Component({
  selector: 'app-overview-search',
  templateUrl: './overview-search.component.html',
  styleUrls: ['./overview-search.component.css']
})
/* export class OverviewSearchComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

} */
export class OverviewSearchComponent implements OnInit {
  @Input() LName:String='';
  @Input() FName:String ='';
  @Input() StudId='';
  @Input() Subject:String='';
  @Input() InternshipComplete='false';

  students$: Observable<Student[]> = new Observable();

  constructor(private studentService: StudentService) { }

  ngOnInit(): void {
    this.fetchStudents();
  }

  /* deleteEmployee(id: string): void {
    this.studentsService.deleteEmployee(id).subscribe({
      next: () => this.fetchEmployees()
    });
  } */

  private fetchStudents(): void {
    this.students$ = this.studentService.getStudents();
  }

}
