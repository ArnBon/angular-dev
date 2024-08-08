import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

const base_url = environment.base_url;


@Injectable({
  providedIn: 'root'
})
export class FileUploadService {

  constructor() { }
  /**vamos a crear una funcion que trabaje en base a promesas
   * clase 192
   */
  async actualizarFoto(
    //estos son los argumentos para actualizar la imagen
    archivo: File,
    tipo: 'usuarios'|'medicos'|'hospitales',
    id: string
  )  {
    try {
      //recibir esos argumentos para actualizar imagen clse 192
      const url = `${ base_url }/upload/${ tipo }/${ id }`;
      const formData = new FormData();
      formData.append('imagen', archivo);

      const resp = await fetch( url, {
        method: 'PUT',
        headers: {
          'x-token': localStorage.getItem('token') || ''
        },
        body: formData
      });

      const data = await resp.json();
      console.log(data);
      return 'nombre de la imagen';

  } catch (error) {
    console.log(error);
    return false;
  }

  }
}
