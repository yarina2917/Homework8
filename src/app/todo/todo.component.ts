import { Component, OnInit } from '@angular/core';
import { UserService } from '../services/user.service';
import { FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.scss']
})
export class TodoComponent implements OnInit {

  userList;
  editItemValue;
  newTitle;
  newDescription;
  currentId;
  currentIndex;
  filterButton;
  selectedFile: File;
  url;

  todoForm = this.fb.group({
    title: [''],
    description: ['']
  });

  constructor(private auth: UserService, private fb: FormBuilder) { }

  ngOnInit() {
    this.getList();
    this.editItemValue = false;
    this.filterButton = 'need';
  }

  getList() {
    this.auth.get().subscribe((res) => {
      this.userList = res;
    });
  }

  logoutUser() {
    this.auth.logout();
  }

  filterList(value) {
    this.filterButton = value;
  }

  filter(status) {
    if (this.filterButton === 'need' && status === 'need') {
      return true;
    }
    if (this.filterButton === 'done' && status === 'done') {
      return true;
    }
    if (this.filterButton === 'all') {
      return true;
    }
    return false;
  }

  postItem() {
    const body = {
      userId: this.auth.getToken(),
      title: this.todoForm.controls.title.value,
      description: this.todoForm.controls.description.value,
      status: 'need',
      selected: false
    };
    this.auth.post(body).subscribe(() => {
      // use get, because we do not know id in body and can not delete item, which we have just created
      this.getList();
      this.todoForm.reset();
    });
  }

  doneItem(id, index) {
    const body = {status: 'done'};
    this.auth.changeToDo(body, id).subscribe(() => {
      this.userList[index].status = 'done';
    });
  }

  unDone(id, index) {
    const body = {status: 'need'};
    this.auth.changeToDo(body, id).subscribe(() => {
      this.userList[index].status = 'need';
    });
  }

  editItem(item, index) {
    this.editItemValue = true;
    this.currentId = item._id;
    this.currentIndex = index;
    this.newTitle = item.title;
    this.newDescription = item.description;
  }

  saveChanges() {
    this.editItemValue = false;
    const body = {title: this.newTitle, description: this.newDescription};
    this.auth.changeToDo(body, this.currentId).subscribe(() => {
      this.userList[this.currentIndex].title = this.newTitle;
      this.userList[this.currentIndex].description = this.newDescription;
    });
  }

  cancelChanges() {
    this.editItemValue = false;
  }

  deleteItem(id, index) {
    this.auth.delete(id).subscribe(() => {
      this.userList.splice(index, 1);
    });
  }

  onFileChanged(event, id, index) {
    this.selectedFile = event.target.files[0];
    if (this.selectedFile) {
      const reader = new FileReader();
      reader.readAsDataURL(this.selectedFile);
      reader.addEventListener('load', (event: any) => {
        this.url = event.target.result;
        const body = {selected: this.url};
        this.auth.changeToDo(body, id).subscribe(() => {
          this.userList[index].selected = this.url;
        });
      });
    }
  }

  removeImage(id, index) {
    const body = {selected: false};
    this.auth.changeToDo(body, id).subscribe(() => {
      this.userList[index].selected = false;
    });
  }

  public trackById(index, item) {
    return item._id;
  }

}
