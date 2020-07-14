import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.scss']
})
export class TodoComponent implements OnInit {

  hide = false;

  title = new FormControl('', [Validators.required]);
  body = new FormControl('', [Validators.required]);
  date = new FormControl('', [Validators.required]);


  constructor() { }

  ngOnInit(): void {
  }
  onCreateTask(){
    console.log('ok', this.title.value)
  }

}
