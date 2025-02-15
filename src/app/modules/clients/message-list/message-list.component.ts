/* eslint-disable max-len */
/* eslint-disable @typescript-eslint/ban-types */
import { Component, Input, OnInit } from '@angular/core';
import { Client } from 'src/app/interfaces/clients.interface';
import { MessagesService } from 'src/app/services/messages.service';
import { Organisation } from 'src/app/stores/org.repository';
import * as DecoupledEditor from '@ckeditor/ckeditor5-build-decoupled-document';
import { UtilityService } from 'src/app/services/utility.service';
import { MeecoMessagesItem, Message } from 'src/app/stores/messages.repository';
import { shadow } from '@ionic/core/dist/types/utils/transition/ios.transition';

@Component({
  selector: 'mlc-message-list',
  templateUrl: './message-list.component.html',
  styleUrls: ['./message-list.component.scss']
})
export class MessageListComponent implements OnInit {
  @Input() organization: Organisation;
  @Input() selectedClient: Client = null;
  public editor = DecoupledEditor;
  public allMessages: MeecoMessagesItem;
  public editorConfig = {
    toolbar: [
      'heading',
      'bold',
      'italic',
      'underLine',
      'numberedList',
      'bulletedList',
      'alignment'
    ],
    heading: {
      options: [
        { model: 'paragraph', title: 'Paragraph', class: 'ck-heading_paragraph' },
        { model: 'heading1', view: 'h1', title: 'Heading 1', class: 'ck-heading_heading1' },
        { model: 'heading2', view: 'h2', title: 'Heading 2', class: 'ck-heading_heading2' },
        { model: 'heading3', view: 'h3', title: 'Heading 3', class: 'ck-heading_heading3' },
        { model: 'heading4', view: 'h4', title: 'Heading 4', class: 'ck-heading_heading4' },
        { model: 'heading5', view: 'h5', title: 'Heading 5', class: 'ck-heading_heading5' },
        { model: 'heading6', view: 'h6', title: 'Heading 6', class: 'ck-heading_heading6' }
      ]
    },
    alignment: {
      options: ['left', 'right']
    }
  };
  public messageText: any = null;
  public messageLoading = false;
  receivedCount: number;
  currentCount: number;
  tempReceivedMessage: Message[] = [];
  infiniteScroll: any;
  constructor(public messageService: MessagesService, private utilityService: UtilityService) {}

  ngOnInit() {
    this.messageService.messageDetails$.subscribe((data) => {
      const tempData: MeecoMessagesItem = data;
      this.showDatesForMessage(tempData.items).then((temp: Message[]) => {
        const sentMessages = temp.filter((message) => message.own === true);
        const receivedMessage = temp.filter((message) => message.own !== true);
        if (receivedMessage.length > 0) {
          this.allMessages = { ...data };
          this.tempReceivedMessage.length = 0;

          receivedMessage.forEach(e => e.values = [{
            'k':'message',
            'v':'Loading...'
          }]);

          this.getReceivedMessage(receivedMessage, sentMessages);
        } else {
          this.allMessages = { ...data };
          this.infiniteScroll?.target.complete();
        }
      });
    });
  }

  getReceivedMessage(receivedMessage: Message[], sentMessages: Message[]) {
    receivedMessage.map((message) => {
      if (!this.tempReceivedMessage.some((data) => data.id === message.id)) {
        this.messageService.getEncryptedMessage(this.selectedClient.id, message.shareId).subscribe({
          next: (data: any) => {
            const obj: any = [];
            data.values.map((d: any) => {
              const o = { [d.name]: d.value };
              obj.push(o);
              message.values = obj;
            });
            this.tempReceivedMessage.push(message);
          },
          complete: () => {
              let mergedMessages = [...sentMessages, ...receivedMessage];
              mergedMessages = mergedMessages.sort(
                (a, b) => new Date(a.modified).valueOf() - new Date(b.modified).valueOf()
              );
              this.allMessages.items = mergedMessages;
              if (this.infiniteScroll) {
                this.infiniteScroll.target.complete();
              }
          }
        });
      }
    });
  }

  showDatesForMessage(mergedMessages: Message[]) {
    return new Promise((resolve, reject) => {
      for (let i = 0; i < mergedMessages.length; i++) {
        if (i === 0) {
          mergedMessages[i].showDate = true;
        } else if (
          mergedMessages[i].created.slice(0, 10) !== mergedMessages[i - 1].created.slice(0, 10)
        ) {
          mergedMessages[i].showDate = true;
        } else {
          mergedMessages[i].showDate = false;
        }
      }
      resolve(mergedMessages);
    });
  }

  onReady(editor) {
    editor.ui
      .getEditableElement()
      .parentElement.insertBefore(editor.ui.view.toolbar.element, editor.ui.getEditableElement());
  }

  async sendMessage() {
    await this.utilityService.showLoader('Sending Message');
    this.messageService.errorData = {
      status: false,
      message: null
    };
    this.messageService.sendMessage(this.selectedClient.id, this.messageText).subscribe({
      next: (resp: any) => {
        console.log('saved message resp', resp);
        // const messageData = this.messageService.messageDetails$.getValue();
        // if (messageData?.items?.length > 0) {
        //   messageData.items.push(resp);
        //   this.messageService.updateMessageClientStoreData({
        //     id: this.selectedClient.id,
        //     meccoItems: messageData
        //   });
        // } else {
        this.messageService.selectedClientId = this.selectedClient.id;
        this.messageService.getClientStore(this.selectedClient.id);
        this.messageService.getClientMessageData(this.selectedClient.id);
        // }
        this.messageText = null;
        // this.utilityService.hideLoader();
        // this.content.scrollToBottom();
      },
      error: (err) => {
        console.log('saved message err', err);
        this.messageService.errorData = {
          status: true,
          message: err?.error?.message
            ? err?.error.message
            : err?.message
            ? err?.message
            : 'An error occurred whilst processing your request, please try again or contact your administrator.'
        };
        this.utilityService.hideLoader();
      },
      complete: () => {
        this.utilityService.hideLoader();
      }
    });
  }

  loadMoreMessages(infiniteScroll) {
    this.infiniteScroll = infiniteScroll;
    const messageData = this.messageService.messageDetails$.getValue();
    if (messageData.next_page_after) {
      this.messageService
        .loadMoreMessages(this.selectedClient.id, messageData.next_page_after)
        .subscribe({
          next: (resp: any) => {
            console.log('loadMoreMessages message resp', resp);
            if (messageData?.items?.length > 0) {
              messageData.next_page_after = resp.next_page_after;
              messageData.items = [...messageData.items, ...resp.items];
              this.messageService.updateMessageClientStoreData({
                id: this.selectedClient.id,
                meccoItems: messageData
              });
            }
            this.messageText = null;
          },
          error: (err) => {
            console.log('saved message err', err);
            if (infiniteScroll) {
              infiniteScroll.target.complete();
            }
          }
        });
    } else {
      if (infiniteScroll) {
        infiniteScroll.target.complete();
      }
    }
  }
}
