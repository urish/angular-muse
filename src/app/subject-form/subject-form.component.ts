import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { Input, OnChanges } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Subject } from 'app/shared/subject';
import { SubjectService } from 'app/shared/subject.service';

export interface Sex {
  value: string;
  viewValue: string;
}
export interface DominantHands {
  value: string;
  viewValue: string;
}

@Component({
  selector: 'app-subject-form',
  templateUrl: './subject-form.component.html',
  styleUrls: ['./subject-form.component.css']
})
export class SubjectFormComponent implements OnInit, OnChanges {
  @Input() subject: Subject;
  @Output() onSave = new EventEmitter<void>();

  genders: Sex[] = [
    {value: 'M', viewValue: 'Male'},
    {value: 'F', viewValue: 'Female'},
    {value: 'O', viewValue: 'Other'}
  ];
  dominant_hands: DominantHands[] = [
    {value: 'R', viewValue: 'Right'},
    {value: 'L', viewValue: 'Left'},
    {value: 'A', viewValue: 'Ambidextrous'}
  ];

  subjectOptions: FormGroup;

  constructor(fb: FormBuilder, private sService: SubjectService) {
    this.subjectOptions = fb.group({
      id: null,
      first_name: null,
      last_name: null,
      email: null,
      gender: null,
      dob: null,
      dominant_hand: null
    });
  }

  ngOnInit() {
  }
  ngOnChanges() {
    this.subjectOptions.reset();
    if (this.subject.id) {
      this.subjectOptions.setValue(this.subject);
    }
  }

  async save() {
    const id = this.subject.id;
    Object.assign(this.subject, this.subjectOptions.value);
    this.sService.save(this.subject, () => this.onSave.emit());
  }
}
