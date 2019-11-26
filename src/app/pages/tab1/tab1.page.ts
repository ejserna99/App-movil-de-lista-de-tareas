import { Component } from '@angular/core';
import { DeseosService } from 'src/app/services/deseos.service';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {

  constructor( public alertController: AlertController, public deseosService: DeseosService, private router: Router ) {

  }

  async presentAlert() {
    const alert = await this.alertController.create({
      header: 'Nueva lista',
      inputs: [
        {
          name: 'titulo',
          type: 'text',
          placeholder: 'Nombre de la lista'
        }
      ],
      buttons: [
        {
          text: 'Cancelar',
          role: 'Cancel',
          handler: () => { console.log('Pulso cancelar'); }
        },
        {
          text: 'Crear',
          handler: ( data ) => {
            console.log(data);
            if ( data.titulo.length === 0 ) {
              return;
            } else {
              const listId = this.deseosService.crearLista( data.titulo );

              this.router.navigateByUrl(`/tabs/tab1/agregar/${listId}`);
            }
          }
        }
      ]
    });

    await alert.present();
  }

  agregarLista() {
    this.presentAlert();
  }

}
