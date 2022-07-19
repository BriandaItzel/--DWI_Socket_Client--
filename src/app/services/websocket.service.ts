import { Injectable } from '@angular/core';
import { Socket } from 'ngx-socket-io';
import { Usuario } from '../Classes/Usuario';
@Injectable({
  providedIn: 'root'
})
export class WebsocketService {
  public socketStatus = false;
  public usuario!: Usuario;
  constructor(
    private socket: Socket,
    ) {
      this.checkStatus();
    }
    checkStatus(){
      this.socket.on('connect', () => {
        console.log("Conectado al servidor");
        this.socketStatus = true;
      });

      this.socket.on('disconnect', () => {
        console.log("Desconectado del servidor");
        this.socketStatus = true;
      });
    }

    emit(evento: string, payload?:any, callback?:Function){
            
      this.socket.emit( evento, payload, callback );
    }
    listen(evento: string){
      return this.socket.fromEvent( evento );
    }
  
    loginWS( nombre: string)
    {
     
      return new Promise<void>( ( resolve, reject) => {
        this.emit('configurar-usuario', { nombre }, (resp:Response) => 
      {
        this.usuario = new Usuario(nombre);
        this.guardarStorage();
          resolve();
      });
      });
      
    }

    getUsuario(){
      return this.usuario;
    }
guardarStorage(){
  localStorage.setItem('usuaio', JSON.stringify(this.usuario))
}
cargarStorage(){
  if(localStorage.getItem('usuario')){
    this.usuario = JSON.parse(localStorage.getItem('usuario')!)
    this.loginWS(this.usuario.nombre)
  }
}
}
