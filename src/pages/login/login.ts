import {Component} from "@angular/core";
import {NavController, AlertController, ToastController, MenuController} from "ionic-angular";
import {HomePage} from "../home/home";
import {RegisterPage} from "../register/register";
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'page-login',
  templateUrl: 'login.html'
})
export class LoginPage {
  regexPhone  = /^[0-9]{11}$/;
  credentialsForm: FormGroup;

  constructor(public nav: NavController, public forgotCtrl: AlertController, public menu: MenuController,
    public toastCtrl: ToastController, private formBuilder: FormBuilder,) {
    this.menu.swipeEnable(false);

    this.credentialsForm = this.formBuilder.group({
      telefone: ['', Validators.compose([
        Validators.pattern(this.regexPhone),
        Validators.required
      ])],
      senha: ['', Validators.required]
    });
  }

  // go to register page
  register() {
    this.nav.setRoot(RegisterPage);
  }

  // login and go to home page
  login() {
    console.log(this.credentialsForm);
    this.nav.setRoot(HomePage);
  }

  forgotPass() {
    let forgot = this.forgotCtrl.create({
      title: 'Esqueceu a senha?',
      message: "Informe seu número de telefone",
      inputs: [
        {
          name: 'telefone',
          placeholder: 'Telefone',
          type: 'phone'
        },
      ],
      buttons: [
        {
          text: 'Cancelar',
          handler: data => {
            console.log('Cancel clicked');
          }
        },
        {
          text: 'Solicitar nova senha',
          handler: data => {
            console.log('Send clicked');
            let toast = this.toastCtrl.create({
              message: 'SMS enviado aguarde um momento....',
              duration: 3000,
              position: 'top',
              cssClass: 'dark-trans',
              closeButtonText: 'OK',
              showCloseButton: true
            });
            toast.present();
          }
        }
      ]
    });
    forgot.present();
  }
}
