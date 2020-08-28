import { Component, OnInit } from '@angular/core';
import { CONFIG } from 'src/app/shared/config';

@Component({
  selector: 'app-content',
  templateUrl: './content.component.html',
  styleUrls: ['./content.component.scss']
})
export class ContentComponent implements OnInit {

  user = false;

  constructor(){}

  ngOnInit(): void {
    if(localStorage.getItem(`${CONFIG.localStorageUserId}`)){
      this.user = true;
    }
  }

}