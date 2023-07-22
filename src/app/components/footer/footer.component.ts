import { Component } from '@angular/core';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent {
  openDialogflowChatbot() {
    window.open('https://console.dialogflow.com/api-client/demo/embedded/32790a75-e71e-4741-8c21-aaafef101744', 'dialogflow-chatbot', 'width=350,height=430');
  }

  scrollToTop() {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }
}
