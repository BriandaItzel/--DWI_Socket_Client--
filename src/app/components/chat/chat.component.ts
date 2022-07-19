import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { ChatService } from 'src/app/services/chat.service';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent implements OnInit {

  texto='';
  mensajesSubscription: Subscription  = new Subscription;

  mensajes: any[]=[];
  constructor(
    public chatService: ChatService
  ) { }

  ngOnInit(): void {
    this.mensajesSubscription=
    this.chatService.getMessages().subscribe( msg => {
        this.mensajes.push(msg);
        console.log(msg);
      }
    )

  }

  enviar(){
    this.chatService.sendMessage(this.texto);
    this.texto='';
  }

  ngOnDestroy(): void {
    this.mensajesSubscription.unsubscribe();
  }
}
