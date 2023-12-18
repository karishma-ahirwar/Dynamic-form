import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-dynamic-form',
  templateUrl: './dynamic-form.component.html',
  styleUrls: ['./dynamic-form.component.css']
})
export class DynamicFormComponent implements OnInit{
  studentsForm !: FormGroup;

  studentNames: string[] = ['John', 'Jane', 'Alice', 'Bomy'];
  courseNames: string[] = ['Math', 'English', 'Science', 'History'];

  constructor(private fb: FormBuilder) { }

  ngOnInit() {
    this.initForm();
  }

  initForm() {
    this.studentsForm = this.fb.group({
      entries: this.fb.array([]),
    });
  }

  get entries(): FormArray {
    return this.studentsForm.get('entries') as FormArray;
  }

  addEntry() {
    const entryGroup = this.fb.group({
      student: ['', Validators.required],
      course: ['', Validators.required],
      time: ['', Validators.required],
    });

    this.entries.push(entryGroup);
    console.log("entryGroup",entryGroup);
    
  }

  removeEntry(index: number) {
    this.entries.removeAt(index);
    console.log("removeEntry",index);
    
  }

  saveChanges() {
    const saveData =JSON.stringify(this.studentsForm.value);
    localStorage.setItem('EntriesData', saveData);
    console.log("EntriesData -saveChanges ",saveData);
    

  }

  loadSavedData() {
    const savedData = localStorage.getItem('entriesData');
    if (savedData) {
      const parsedData = JSON.parse(savedData);
      console.log("savedData",savedData);
      
      this.studentsForm.patchValue(parsedData);
      console.log("parsedData",parsedData);
      
    }
  }
}
