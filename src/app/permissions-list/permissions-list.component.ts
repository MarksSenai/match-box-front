import { PermissionsService } from './../permissions/permissions.service';
import { Permission } from './../shared/permission.model';
import { Component, OnInit, TemplateRef } from '@angular/core';
import { Router, ActivatedRoute, Params, ParamMap } from '@angular/router';
import { AlertService } from './../alert/alert.service';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';


@Component({
  selector: 'app-permissions-list',
  templateUrl: './permissions-list.component.html',
  styleUrls: ['./permissions-list.component.css']
})
export class PermissionsListComponent implements OnInit {
  permissionList: Permission[];
  permission: Permission;
  userId: number;
  user: string;

  modalRef: BsModalRef;
  message: string;

  constructor(private permissionService: PermissionsService,
    private alertService: AlertService,
    private router: ActivatedRoute,
    private modalService: BsModalService) { }

  ngOnInit() {
    this.permissionService.permissionDeleteEvent
    .subscribe((id: number) =>{
      this.removePermission(id);
    });
    this.permissionService.permissionEventList
    .subscribe((permissions: Permission[]) =>{
        this.permissionList = permissions;
    });
    this.router.params.subscribe((params) => {
      this.userId = params.userid;
      this.user = params.user;
    });
    this.permissionService.getPermissionsByUser(this.userId).subscribe((response => {
    }))
  }

  removePermission(id: number) {
    this.permissionService.deletePermission(id).subscribe((response) => {
      this.permissionService.getPermissionsByUser(this.userId)
        .subscribe((permissions: Permission[]) => {
          this.permissionList = [];
          this.permissionList = permissions;
          this.alertService.success("Permissão do operador  removida com sucesso!");
        });
    });
 }

 openModal(template: TemplateRef<any>) {
  this.modalRef = this.modalService.show(template, {class: 'modal-sm'});
}

confirm(id): void {
  this.removePermission(id);
  this.modalRef.hide();
}

decline(): void {
  this.message = 'Declined!';
  this.modalRef.hide();
}
}