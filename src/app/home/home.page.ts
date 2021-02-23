import { Component } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  password: string;
  username: string;
  ip: string;
  messagge: string;

  constructor(
    private alertCon: AlertController,
    public httpClient: HttpClient
  ) {}

  async onLogin() {
    if (
      this.password == undefined ||
      this.username == undefined ||
      this.ip == undefined
    ) {
      const alertUndefined = await this.alertCon.create({
        header: 'Error',
        message: 'Llene todos los datos',
        buttons: ['Ok'],
      });

      await alertUndefined.present();
    } else {
      let postData = {
        password: this.password,
        userName: this.username,
      };

      const headers = new HttpHeaders()
        .set('Content-Type', 'application/json')
        .set('Cache-Control', 'no-store')
        .set('Pragma', 'no-cache')
        .set('Expires', 'Sat, 01 Jan 2000 00:00:00 GMT');

      this.httpClient
        .post(`http://${this.ip}`, postData, {
          headers: headers,
        })
        .subscribe(
          async (data) => {
            console.log(data);
            const alert = await this.alertCon.create({
              header: 'Error',
              message: 'Login success',
              buttons: ['Ok'],
            });

            await alert.present();
          },
          async (error) => {
            console.log(error);
            const alert = await this.alertCon.create({
              header: 'Error',
              message: 'Unauthorized',
              buttons: ['Ok'],
            });

            await alert.present();
          }
        );
    }
  }
}
