import { Component, Input, OnInit, EventEmitter, Output } from '@angular/core';
import { Number } from 'mongoose';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { BehaviorSubject } from 'rxjs';
import { Student } from '../../student';

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

  searchForm: FormGroup = new FormGroup({});

  constructor(private sf: FormBuilder) { }
  get lname() { return this.searchForm.get('lname'); }
  get term() { return this.searchForm.get('term'); }
  get year() { return this.searchForm.get('year'); }
  get subject() { return this.searchForm.get('subject'); }


  ngOnInit() {
    this.initialState.subscribe(student => {
      this.searchForm = this.sf.group({
        lname: [student.lname],
        term: [student.term],
        year: [student.year],
        subject: [student.subject]
      });
    });
    this.searchForm.valueChanges.subscribe((val) => { this.formValuesChanged.emit(val); });
  }

  searchStudents() {
    // lname: string, term: string, year: Number, subject: string
    console.log(this.searchForm.value);
    this.formSubmitted.emit(this.searchForm.value);

  }
}
