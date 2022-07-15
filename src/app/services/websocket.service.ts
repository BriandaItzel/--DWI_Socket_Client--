import { Injectable } from '@angular/core';
import { resolve } from 'dns';
import { Socket } from 'ngx-socket-io';
import { Usuario } from '../classes/Usuarios';
@Injectable({
  providedIn: 'root'
})
export class WebsocketService {
  public socketStatus = false;
  public usuario?: Usuario;
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
  
    loginWS( nombre: string){
      return new Promise((resolve, reject)=>{
        this.emit('configurar-usuario', {nombre}, resp =>{
          resolve();

      })
      
      });
      
      /*this.socket.emit('configurar-usuario', {nombre}, ( resp: Response )=>
      {
        console.log(resp);
      });*/

    }
}

  