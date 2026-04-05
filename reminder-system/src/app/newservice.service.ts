import { Injectable } from '@angular/core';

export interface Reminder {
  id: number;
  subject: string;
  content: string;
  dateTime: Date;
}

@Injectable({ providedIn: 'root' })
export class ReminderService {
  private reminders: Reminder[] = [];//encapsulation

  constructor() {
    this.reqper();
  }

  reqper() {
   
      Notification.requestPermission();
   
  }

  addReminder(reminder: Reminder) {
    this.reminders.push(reminder);
    this.scheduleNotification(reminder);
  }

  scheduleNotification(reminder: Reminder) {
    const now = new Date().getTime();
    const scheduledTime = new Date(reminder.dateTime).getTime();
    const delay = scheduledTime - now;

    if (delay > 0) {
      setTimeout(() => {
        this.sendSystemNotification(reminder);
      }, delay);
    }
  }

  sendSystemNotification(reminder: Reminder) {
    if (Notification.permission === 'granted') {
      new Notification(reminder.subject, {
        body: reminder.content,
        requireInteraction: true 
      });
    }
  }

  getReminders() { return this.reminders; }
  
  deleteReminder(id: number) {
    this.reminders = this.reminders.filter(r => r.id !== id);
  }
}