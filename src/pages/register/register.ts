import { Component } from "@angular/core";
import {
  NavController,
  Platform,
  LoadingController,
  ToastController,
  ActionSheetController,
  Loading,
  AlertController
} from "ionic-angular";
import { LoginPage } from "../login/login";
import { HomePage } from "../home/home";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";

import { File } from "@ionic-native/file";
import { Transfer, TransferObject } from "@ionic-native/transfer";
import { FilePath } from "@ionic-native/file-path";
import { Camera, CameraOptions } from "@ionic-native/camera";

@Component({
  selector: "page-register",
  templateUrl: "register.html"
})
export class RegisterPage {
  regexPhone = /^[0-9]{11}$/;
  credentialsForm: FormGroup;
  public photos: any;
  public base64Image: string;

  constructor(
    public nav: NavController,
    private formBuilder: FormBuilder,
    private camera: Camera,
    private transfer: Transfer,
    private file: File,
    private filePath: FilePath,
    private alertCtrl: AlertController,
    public actionSheetCtrl: ActionSheetController,
    public toastCtrl: ToastController,
    public platform: Platform,
    public loadingCtrl: LoadingController
  ) {
    this.credentialsForm = this.formBuilder.group({
      telefone: [
        "",
        Validators.compose([
          Validators.pattern(this.regexPhone),
          Validators.required
        ])
      ],
      nome: [
        "",
        Validators.compose([
          // Validators.pattern(this.regexPhone),
          Validators.required
        ])
      ],
      data: [
        "",
        Validators.compose([
          // Validators.pattern(this.regexPhone),
          Validators.required
        ])
      ],
      rg: [
        "",
        Validators.compose([
          // Validators.pattern(this.regexPhone),
          Validators.required
        ])
      ],
      cns: [
        "",
        Validators.compose([
          // Validators.pattern(this.regexPhone),
          //Validators.required
        ])
      ],
      senha: ["", Validators.required]
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

  // Camera
  takePhoto() {
    const options: CameraOptions = {
      quality: 50, // picture quality
      destinationType: this.camera.DestinationType.DATA_URL,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE
    };
    this.camera.getPicture(options).then(
      imageData => {
        this.base64Image = "data:image/jpeg;base64," + imageData;
        this.photos.push(this.base64Image);
        this.photos.reverse();
      },
      err => {
        console.log(err);
      }
    );
  }

  deletePhoto(index) {
    let confirm = this.alertCtrl.create({
      title: "Deseja deletar está foto?",
      message: "",
      buttons: [
        {
          text: "Não",
          handler: () => {
            console.log("Disagree clicked");
          }
        },
        {
          text: "Sim",
          handler: () => {
            console.log("Agree clicked");
            this.photos.splice(index, 1);
          }
        }
      ]
    });
    confirm.present();
  }
}
