import {Component} from "@angular/core";
import {NavController} from "ionic-angular";
import {LoginPage} from "../login/login";
import {HomePage} from "../home/home";
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'page-register',
  templateUrl: 'register.html'
})
export class RegisterPage {
  regexPhone  = /^[0-9]{11}$/;
  credentialsForm: FormGroup;

  constructor(public nav: NavController,private formBuilder: FormBuilder) {
    this.credentialsForm = this.formBuilder.group({
      telefone: ['', Validators.compose([
        Validators.pattern(this.regexPhone),
        Validators.required
      ])],
      nome: ['', Validators.compose([
        // Validators.pattern(this.regexPhone),
        Validators.required
      ])],
      data: ['', Validators.compose([
        // Validators.pattern(this.regexPhone),
        Validators.required
      ])],
      rg: ['', Validators.compose([
        // Validators.pattern(this.regexPhone),
        Validators.required
      ])],
      cns: ['', Validators.compose([
        // Validators.pattern(this.regexPhone),
        //Validators.required
      ])],
      senha: ['', Validators.required]
    });
  }

  // register and go to home page
  register() {
    this.nav.setRoot(HomePage);
  }

  // go to login page
  login() {
    this.nav.setRoot(LoginPage);
  }
}
