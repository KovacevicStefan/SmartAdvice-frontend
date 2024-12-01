import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Email } from 'src/app/model/email.model';
import { EmailService } from 'src/app/service/email.service';

@Component({
  selector: 'app-contact-form',
  templateUrl: './contact-form.component.html',
  styleUrls: ['./contact-form.component.scss']
})
export class ContactFormComponent implements OnInit{

  contactForm: FormGroup;
  
  constructor(private fb: FormBuilder, public service: EmailService, public snackBar: MatSnackBar) {
    this.contactForm = this.fb.group({
      imePrezime: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      naslov: ['', Validators.required],
      poruka: ['', Validators.required],
    });
  }
  
  public send(): void {
    if (this.contactForm.valid) {
      const data = this.contactForm.value;
      this.service.addEmail(data);
      this.snackBar.open('Poruka poslata! Uskoro očekujte odgovor.', 'U redu', {duration: 2000});
      this.contactForm.reset();
    }else {
      this.snackBar.open('Greška! Email nije ispravan.', 'U redu', {duration: 2000});
    } 
  }

  ngOnInit(): void {
  }

  public isLogedId(): boolean {
    if(localStorage.getItem("token")) {
      return false;
    } else {
      return true;
    }
  }

}
