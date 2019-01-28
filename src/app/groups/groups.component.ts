/*
 * This file is a part of SmallScheduler
 * Copyright (c) 2019 Sébastien Kus
 * Under GNU GPL Licence
 */

import { Component, OnInit } from '@angular/core';
import {GroupService} from '../service/group.service';
import {Group} from '../service/classes/group';

@Component({
  selector: 'app-groups',
  templateUrl: './groups.component.html',
  styleUrls: ['./groups.component.css']
})
export class GroupsComponent implements OnInit {

  public selectedGroup: Group = null;

  constructor(private groupService: GroupService) { }

  public groups: Group[];

  ngOnInit() {
    this.refreshEvent();
  }

  refreshEvent() {
    this.groupService.getGroups()
        .subscribe(data => {
          this.groups = data;
          if (this.selectedGroup !== null) {
            let valid = false;
            for (const group of this.groups) {
              if (group.id === this.selectedGroup.id) {
                this.selectedGroup = group;
                valid = true;
              }
            }
            if (!valid) {
              this.selectedGroup = null;
            }
          } else if (localStorage.getItem("selectedGroupId") !== null) {
            let valid = false;
            for (const group of this.groups) {
              if (group.id.toString() === localStorage.getItem("selectedGroupId")) {
                this.selectedGroup = group;
                valid = true;
              }
            }
            if (!valid) {
              this.selectedGroup = null;
            }
          }
        } );
  }

  openGroup(group: Group) {
    this.selectedGroup = group;
    localStorage.setItem("selectedGroupId", group.id.toString());
  }

  onNew() {
    this.selectedGroup = new Group();
    localStorage.setItem("selectedGroupId", null);
  }

}
