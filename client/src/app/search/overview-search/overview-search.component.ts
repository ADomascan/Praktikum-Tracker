import { Component, Input, OnInit, EventEmitter, Output } from '@angular/core';
import { Number } from 'mongoose';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { BehaviorSubject } from 'rxjs';
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
  @Input()
  initialState: BehaviorSubject<Student> = new BehaviorSubject({} as Student);

  @Output()
  formValuesChanged = new EventEmitter<Student>();

  @Output()
  formSubmitted = new EventEmitter<Student>();
  searchForm: FormGroup =new FormGroup({});

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
  public displayTerm(term: string) {
    if (term = 'winter') {
      term = "Wintersemester"
    }
    else if (term = 'summer') {
      term = "Sommersemester"
    }
    else { term = '' };
    return term;
  }

  public searchStudents(){}
}

