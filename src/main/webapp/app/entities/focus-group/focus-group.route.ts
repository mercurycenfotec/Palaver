import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { UserRouteAccessService } from 'app/core';
import { Observable, of } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { FocusGroup } from 'app/shared/model/focus-group.model';
import { FocusGroupService } from './focus-group.service';
import { FocusGroupComponent } from './focus-group.component';
import { FocusGroupDetailComponent } from './focus-group-detail.component';
import { FocusGroupUpdateComponent } from './focus-group-update.component';
import { FocusGroupDeletePopupComponent } from './focus-group-delete-dialog.component';
import { IFocusGroup } from 'app/shared/model/focus-group.model';

@Injectable({ providedIn: 'root' })
export class FocusGroupResolve implements Resolve<IFocusGroup> {
    constructor(private service: FocusGroupService) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<IFocusGroup> {
        const id = route.params['id'] ? route.params['id'] : null;
        if (id) {
            return this.service.find(id).pipe(
                filter((response: HttpResponse<FocusGroup>) => response.ok),
                map((focusGroup: HttpResponse<FocusGroup>) => focusGroup.body)
            );
        }
        return of(new FocusGroup());
    }
}

export const focusGroupRoute: Routes = [
    {
        path: '',
        component: FocusGroupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'FocusGroups'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: ':id/view',
        component: FocusGroupDetailComponent,
        resolve: {
            focusGroup: FocusGroupResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'FocusGroups'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'new',
        component: FocusGroupUpdateComponent,
        resolve: {
            focusGroup: FocusGroupResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'FocusGroups'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: ':id/edit',
        component: FocusGroupUpdateComponent,
        resolve: {
            focusGroup: FocusGroupResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'FocusGroups'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const focusGroupPopupRoute: Routes = [
    {
        path: ':id/delete',
        component: FocusGroupDeletePopupComponent,
        resolve: {
            focusGroup: FocusGroupResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'FocusGroups'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];