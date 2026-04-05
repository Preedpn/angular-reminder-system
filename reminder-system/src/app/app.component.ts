import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ReminderService, Reminder } from './newservice.service';
import { ReactiveFormsModule } from '@angular/forms';
import { DatePipe } from '@angular/common';


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [DatePipe, ReactiveFormsModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  remForm: FormGroup;
  reminders: Reminder[] = [];

  constructor(private fb: FormBuilder, private service: ReminderService) {
    this.remForm = this.fb.group({
      subject: ['', Validators.required],
      content: ['', Validators.required],
      dateTime: ['', Validators.required]
    });
    this.reminders = this.service.getReminders();
  }

  onSubmit() {
    if (this.remForm.valid) {
      const newReminder: Reminder = {
        id: Date.now(),
        ...this.remForm.value
      };
      this.service.addReminder(newReminder);
      this.remForm.reset();
    }
  }

  delete(id: number) {
    this.service.deleteReminder(id);
    this.reminders = this.service.getReminders();
  }
}