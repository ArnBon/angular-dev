import { Component, OnInit } from '@angular/core';
import { FileUploadService } from 'src/app/services/file-upload.service';
import { ModalImagenService } from 'src/app/services/modal-imagen.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-modal-imagen',
  templateUrl: './modal-imagen.component.html',
  styleUrls: ['./modal-imagen.component.css']
})
export class ModalImagenComponent implements OnInit {
  public imagenSubir: File;
  public imgTemp: any = null;

  public ocultartModal: boolean = false;

  constructor(public modalImagenService: ModalImagenService,
              public fileUploadService: FileUploadService) { }

  ngOnInit(): void {
  }

  cerrarModal(){
    this.ocultartModal = true;
  }




}
