import { Component, OnInit } from '@angular/core';
import { ToastController } from '@ionic/angular';
import { TaskService } from '../tasks/task.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit {
  user_obj: any;
  user_email: string = '';

  constructor(
    private taskService: TaskService,
    public toastController: ToastController
  ) {}

  ngOnInit() {
    // console.log(localStorage.getItem('currentUser'));
    this.user_obj = JSON.parse(localStorage.getItem('currentUser'));
    console.log(this.user_obj[0]);
    this.user_email = this.user_obj[0].user_email;
  }

  update() {
    console.log(this.user_email);

    this.taskService
      .processData('update_email', {
        user_email: this.user_email,
        user_id: this.user_obj[0].user_id,
      })
      .subscribe(
        (res: any) => {
          console.log(res);
          if (res.msg == 'Successfully Updated') {
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
