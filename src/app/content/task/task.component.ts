import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm, FormControl, Validators } from '@angular/forms';
import { TaskService } from 'src/app/shared/services/task-service/task.service';
import { ActivatedRoute, Router, ParamMap } from '@angular/router';
import { AuthService } from 'src/app/shared/services/auth.service';
import { CONFIG } from 'src/app/shared/config';

@Component({
  selector: 'app-task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.scss']
})
export class TaskComponent implements OnInit {

  @ViewChild('form', { static: true }) formPost: NgForm;

  task: any;
  taskId: string;
  // showInputAria = false;
  // imageSrc: any;
  // image: any;
  // user: ContactData;
  // userName: string;
  // likeCount: number;
  hide = false;
  isMoved = false;
  isDeleted = false;
  isDeletedOk: any;
  title = new FormControl('', [Validators.required]);
  body = new FormControl('', [Validators.required]);
  date = new FormControl('', [Validators.required]);
  // date = new FormControl(new Date());
  // date = new FormControl(`${this.task.date}`, [Validators.required]);


  constructor(
    private taskService: TaskService,
    private activatedRoute: ActivatedRoute,
    private router: Router, private authService: AuthService) { }

  ngOnInit(): void {
    if (localStorage.getItem(`${CONFIG.localStorageUserId}`)) {
      // this.authService.getSignUser(localStorage.getItem(`${CONFIG.localStorageId}`))
      //   .subscribe(user => this.userName = user.firstName)
      this.activatedRoute.paramMap.subscribe((paramMap: ParamMap) => {
        this.taskId = paramMap.get('id');
        this.task = this.taskService.getTaskId(this.taskId);
      });
    }
  }

  onDeleteTask() {
    const isDelete = confirm("Will you want delete this task?");
    if (isDelete) {
      this.taskService.deleteTask(this.task.id, this.task.state)
        .subscribe()
        this.router.navigate([CONFIG.redirectUrl])
    }
    // this.isDeleted = true;
  }

  onMoveTaskToDone() {
    this.taskService.deleteTask(this.task.id, this.task.state)
      .subscribe()
    const task = {
      title: this.task.title,
      body: this.task.body,
      date: this.task.date,
      state: CONFIG.done,
      name: this.task.name
    }
    this.taskService.addTask(task, CONFIG.done)
      .subscribe()
      // (data => {
      //   if (data) {
      //     this.isMoved = true;
      //   }
      // })
      this.toMainPage()
  }

  onMoveTaskToInProgress() {
    this.taskService.deleteTask(this.task.id, this.task.state)
      .subscribe()
    const task = {
      title: this.task.title,
      body: this.task.body,
      date: this.task.date,
      state: CONFIG.inProgress,
      name: this.task.name
    }
    this.taskService.addTask(task, CONFIG.inProgress)
      .subscribe()
      this.toMainPage()
  }

  onMoveTaskToTodo() {
    this.taskService.deleteTask(this.task.id, this.task.state)
      .subscribe()
    const task = {
      title: this.task.title,
      body: this.task.body,
      date: this.task.date,
      state: CONFIG.todo,
      name: this.task.name
    }
    this.taskService.addTask(task, CONFIG.todo)
      .subscribe()
      this.toMainPage()
  }

  onEditTask() {
    if (this.title.valid && this.body.valid && this.date.valid) {
      this.task = {
        title: this.title.value,
        body: this.body.value,
        date: this.date.value,
        state: this.task.state,
        name: this.task.name

      }

      this.taskService.changeTask(this.task, this.taskId, this.task.state).subscribe(data => {
        if (data) {
          this.hide = false
        }
      })
    }
  }

  toMainPage(){
    this.router.navigate([''])
  }


  // onChangePost(id, form: NgForm) {

  //   this.post = {
  //     postDate: Date.now(),
  //     postDescription: form.value.postDescription,
  //     postFile: this.imageSrc,
  //     likeCount: this.post.likeCount
  //   }
  //   this.myPostService.updatePost(id, this.post).subscribe(data => {
  //     if (data) {
  //       this.showInputAria = false;
  //       return this.post
  //     }

  //   })
  //   this.isHideAria()
  // }

  // onFormPostSubmit(form: NgForm) {

  // }

  // isHideAria() {
  //   this.showInputAria = false;
  //   this.router.navigate(['/'])
  // }

  // fileChange(event) {
  //   if (event.target.files && event.target.files[0]) {
  //     const reader = new FileReader();
  //     reader.onload = ((e) => {
  //       this.imageSrc = null;
  //       this.imageSrc = e.target['result'];
  //       this.image = event.target.files[0];
  //     });
  //     reader.readAsDataURL(event.target.files[0]);
  //   }
  // }

  // onAddLike(post){
  //   this.likeCount = this.likeCount + 1;
  //   const newPost = {
  //     postDate: post.postDate,
  //     postDescription: post.postDescription,
  //     postFile: post.postFile,
  //     likeCount: this.likeCount,
  //   }
  //   this.myPostService.updatePost(post.id, newPost).subscribe()
  //   return this.likeCount
  // }
  // onRemoveImg(){
  //   this.imageSrc = null;
  // }

}
