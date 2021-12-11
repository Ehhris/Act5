import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TaskService } from '../tasks/task.service';
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
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

    this.taskService.processData('login', data).subscribe(
      (res: any) => {
        if (res.data) {
          localStorage.setItem('currentUser', JSON.stringify(res.data));
          this.presentToast('Successfully Logged in');
          this.router.navigate(['/profile']);
        } else {
          console.log(res);
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
