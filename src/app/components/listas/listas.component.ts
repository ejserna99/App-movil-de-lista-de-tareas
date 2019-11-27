import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { DeseosService } from 'src/app/services/deseos.service';
import { Router } from '@angular/router';
import { AlertController, IonList } from '@ionic/angular';
import { Lista } from 'src/app/models/lista.model';

@Component({
  selector: 'app-listas',
  templateUrl: './listas.component.html',
  styleUrls: ['./listas.component.scss'],
})
export class ListasComponent implements OnInit {

  @ViewChild( 'list' ) listaComp: IonList;
  @Input() terminada = true;

  constructor( public deseosService: DeseosService, private router: Router, public alertController: AlertController ) { }

  ngOnInit() {}

  abrirTarea( id: number ) {
    if ( this.terminada ) {
      this.router.navigateByUrl(`/tabs/tab2/agregar/${id}`);
    } else {
      this.router.navigateByUrl(`/tabs/tab1/agregar/${id}`);

    }
  }

  borrar( id: number ) {
    this.deseosService.borrarLista( id );
  }

  async editar( lista: Lista ) {
    const alert = await this.alertController.create({
      header: `${ lista.titulo }`,
      inputs: [
        {
          name: 'titulo',
          type: 'text',
          placeholder: 'Editar nombre de la lista'
        }
      ],
      buttons: [
        {
          text: 'Cancelar',
          role: 'Cancel',
          handler: () => { console.log('Pulso cancelar'); }
        },
        {
          text: 'Guardar cambios',
          handler: ( data ) => {
            console.log(data);
            this.listaComp.closeSlidingItems();
            if ( data.titulo.length === 0 ) {
              return;
            } else {
              this.deseosService.editarTitulo( lista, data.titulo );
              this.listaComp.closeSlidingItems();
            }
          }
        }
      ]
    });

    await alert.present();
  }

}
