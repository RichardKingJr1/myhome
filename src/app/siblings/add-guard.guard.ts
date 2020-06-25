import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router, ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { GlobalService } from './global.service';

@Injectable({
  providedIn: 'root'
})
export class AddGuardGuard implements CanActivate {

  constructor(private global: GlobalService, private router: Router, private activatedRoute: ActivatedRoute){}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): boolean  {
      if(!this.global.logado){
        this.router.navigate(['/add-imovel-deslogado']);
      };
    return true;
  }
  
}
