import { Component, OnInit, EventEmitter, Input, Output } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { BehaviorSubject } from 'rxjs';
import { Student } from 'src/app/student';

@Component({
  selector: 'app-detail-form',
  templateUrl: './detail-form.component.html',
  styleUrls: ['./detail-form.component.css']
})
export class DetailFormComponent implements OnInit {
  /*  constructor(
    ) { }
    ngOnInit(): void {
    } */
  @Input()
  initialState: BehaviorSubject<Student> = new BehaviorSubject({} as Student);

  @Output()
  formValuesChanged = new EventEmitter<Student>();

  @Output()
  formSubmitted = new EventEmitter<Student>();

  studentForm: FormGroup = new FormGroup({});

  constructor(private fb: FormBuilder) { }
  // header fields
  get lname() { return this.studentForm.get('lname')!; }
  get fname() { return this.studentForm.get('fname')!; }
  get email() { return this.studentForm.get('email')!; }
  get studId() { return this.studentForm.get('studId')!; }
  get subject() { return this.studentForm.get('subject')!; }
  get other() { return this.studentForm.get('other')!; }
  get date() { return this.studentForm.get('date')!; }
  // home address
  get hastreet() { return this.studentForm.get('hastreet')!; }
  get hazip() { return this.studentForm.get('hazip')!; }
  get hatown() { return this.studentForm.get('hatown')!; }
  get phone() { return this.studentForm.get('phone')!; }
  // intership
  get startDate() { return this.studentForm.get('startDate')!; }
  get endDate() { return this.studentForm.get('endDate')!; }
  get company() { return this.studentForm.get('company')!; }
  get companyAddress() { return this.studentForm.get('companyAddress')!; }
  get compArea() { return this.studentForm.get('compArea')!; }
  get compTopic() { return this.studentForm.get('compTopic')!; }
  get supervisor() { return this.studentForm.get('supervisor')!; }
  // internship extention
  get extensionRequest() { return this.studentForm.get('extensionRequest')!; }
  get extensionReason() { return this.studentForm.get('extensionReason')!; }
  get endDateNew() { return this.studentForm.get('endDateNew')!; }
  // credits
  get credits() { return this.studentForm.get('credits')!; }
  get contractCopy() { return this.studentForm.get('contractCopy')!; }
  get reportPaper() { return this.studentForm.get('reportPaper')!; }
  get reportCard() { return this.studentForm.get('reportCard')!; }
  get startDateFact() { return this.studentForm.get('startDateFact')!; }
  get endDateFact() { return this.studentForm.get('endDateFact')!; }
  get totalWorkDays() { return this.studentForm.get('totalWorkDays')!; }
  // colloquium
  get colloquiumTopic() { return this.studentForm.get('colloquiumTopic')!; }
  get colloquiumGrade() { return this.studentForm.get('colloquiumGrade')!; }
  get colloquiumDate() { return this.studentForm.get('colloquiumDate')!; }
  get term() { return this.studentForm.get('term')!; }
  get year() { return this.studentForm.get('year')!; }
  get internshipComplete() { return this.studentForm.get('internshipComplete')!; }

  ngOnInit() {
    this.initialState.subscribe(student => {
      this.studentForm = this.fb.group({
        lname: [student.lname, [Validators.required]],
        fname: [student.fname, [Validators.required]],
        email: [ student.email, [Validators.required]],
        studId: [student.studId, [Validators.required]],
        subject: [ student.studId, [Validators.required]],
        other: [student.other],
        date: [student.date, [Validators.required]],
        // home address
        hastreet: [ student.hastreet],
        hazip: [student.hazip],
        hatown: [student.hatown],
        phone: [student.phone],
        // intership
        startDate: [student.startDate, [Validators.required]],
        endDate: [student.endDate, [Validators.required]],
        company: [student.company, [Validators.required]],
        companyAddress: [student.companyAddress, [Validators.required]],
        compArea: [student.compArea, [Validators.required]],
        compTopic: [student.compTopic, [Validators.required]],
        supervisor: [student.supervisor, [Validators.required]],
        // internship extention
        extensionRequest: [student.extensionRequest],
        extensionReason: [student.extensionReason],
        endDateNew: [student.endDateNew],
        // credits
        credits: [student.credits],
        contractCopy: [student.contractCopy],
        reportPaper: [student.reportPaper],
        reportCard: [student.reportCard],
        startDateFact: [student.startDateFact],
        endDateFact: [student.endDateFact],
        totalWorkDays: [student.totalWorkDays],
        // colloquium
        colloquiumTopic: [student.colloquiumTopic],
        colloquiumGrade: [student.colloquiumGrade],
        colloquiumDate: [student.colloquiumDate],
        term: [student.term],
        year: [student.year],
        internshipComplete: [student.internshipComplete]
      });
    });

    this.studentForm.valueChanges.subscribe((val) => { this.formValuesChanged.emit(val); });
  }

  submitForm() {
    this.formSubmitted.emit(this.studentForm.value);
  }

}
