import { Component, OnInit } from '@angular/core';
import {NgbModal, NgbModalRef} from '@ng-bootstrap/ng-bootstrap';
import {CreateUserForm, UserService} from '../service/user.service';
import {User} from '../service/classes/user';
import {Group} from '../service/classes/group';
import {GroupService} from '../service/group.service';

@Component({
  selector: 'app-user-management',
  templateUrl: './user-management.component.html',
  styleUrls: ['./user-management.component.css']
})
export class UserManagementComponent implements OnInit {
  public users: User[] = [];
  public editRoleAdmin: boolean;
  public editRoleNickname: string;
  public createUserForm: CreateUserForm;
  private createUserModal: NgbModalRef;
  public createUserError = '';
  public editUser?: User;
  public groupsRigths?: Group[];
  public groupsRigthsModal: NgbModalRef;

  constructor(private modalService: NgbModal, private userService: UserService, private groupService: GroupService) { }

  ngOnInit() {
    this.userService.listUsers()
      .subscribe(data => this.users = data);
  }

  onRolesList(user: User, rolesContent, updatedNotificationContent) {
    this.editRoleAdmin = false;
    this.editRoleNickname = user.nickname;
    for (const role of user.roles) {
      switch (role) {
        case 'ROLE_ADMIN':
          this.editRoleAdmin = true;
          break;
      }
    }

    this.modalService.open(rolesContent, {ariaLabelledBy: 'Roles list'}).result
      .then((result) => {
        if (this.editRoleAdmin === true) {
          user.addRole('ROLE_ADMIN');
        } else {
          user.removeRole('ROLE_ADMIN');
        }
        this.onUpdate(user, updatedNotificationContent);
      }, reason => {});
  }

  onUpdate(user: User, updatedNotificationContent) {
    this.userService.put(user)
      .subscribe( data => {
        this.modalService.open(updatedNotificationContent, {ariaLabelledBy: 'User updated'}).result
          .then(result => {}, reason => {});
      });
  }

  onCreateUser(createUserContent) {
    // Init user form
    this.createUserForm = new CreateUserForm();

    // Open modal

    this.createUserModal = this.modalService.open(createUserContent, {ariaLabelledBy: 'Create user'});
    this.createUserModal.result
      .then(result => {}, reason => {});
  }

  onPerformCreateUser() {
    this.userService.createUser(this.createUserForm)
      .subscribe( data => {
        this.users.push(data);
        this.createUserError = '';
        this.createUserModal.close();
      },
      error => {
        this.createUserError = error.error.split('\n').join('<br>');
      });
  }

  onGroupsRigths(user: User, groupsRigthsModal) {
    this.editUser = user;
    this.groupService.getGroupRigths(user.id)
      .subscribe(data => {
        this.groupsRigths = data;
        this.groupsRigthsModal = this.modalService.open(groupsRigthsModal, {ariaLabelledBy: 'Groups rigths'});
      });
  }

  onUpdateGroupsRigths(updatedModal) {
    this.groupService.putGroupRigths(this.editUser.id, this.groupsRigths)
      .subscribe(data => {
        this.groupsRigthsModal.close();
        this.modalService.open(updatedModal, {ariaLabelledBy: 'User updated'}).result
          .then(result => {}, reason => {});
      })
  }

}
