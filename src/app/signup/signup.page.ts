import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastController } from '@ionic/angular';
import { TaskService } from '../tasks/task.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.page.html',
  styleUrls: ['./signup.page.scss'],
})
export class SignupPage implements OnInit {
  email: any;
  password: any;
  user: any;

  constructor(
    private router: Router,
    private taskService: TaskService,
    public toastController: ToastController
  ) {}

  ngOnInit() {}

  login() {
    let data = {
      user_email: this.email,
      user_password: this.password,
    };

    console.log(data);

    this.taskService.processData('register', data).subscribe(
      (res: any) => {
        if (res.msg == 'Successfully Registered') {
          this.presentToast(res.msg);
        } else {
          this.presentToast(res.msg);
        }
      },
      (error: any) => {
        console.log('ERROR: ', error);
      }
    );
  }

  async presentToast(msg) {
    const toast = await this.toastController.create({
      message: msg,
      duration: 2000,
    });
    toast.present();
  }
}
