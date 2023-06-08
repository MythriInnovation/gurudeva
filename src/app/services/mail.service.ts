import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class MailService {

  constructor(private http:HttpClient) { }

  sendEmail(to: string, subject: string, message: string) {
    const formData = new FormData();
    formData.append('from', 'hirankailas@gmail.com');
    formData.append('to', 'hirankailas@gmail.com');
    formData.append('subject', 'test');
    formData.append('text', 'First email');
    const apiKey =  '6a8e2bc3eb8cf80a7685ae173383bd45'

  this.http.post(`https://api.mailgun.net/v3/sandbox88b886d0488543d4b3c2ceb2f0ba81d8.mailgun.org/messages`, formData, {
    headers: {
      Authorization: 'Basic ' + btoa(`api:${apiKey}`)
    }
  }).subscribe(x=>{
    console.log('Email sent successfully');
  },
  error=>{
    console.error('Error sending email:', error.message);
  })
  }
}
