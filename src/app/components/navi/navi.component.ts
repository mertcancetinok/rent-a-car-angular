import { Component, OnInit } from '@angular/core';
import { faTwitter } from '@fortawesome/free-brands-svg-icons';
import { faFacebook } from '@fortawesome/free-brands-svg-icons';
import { faInstagram } from '@fortawesome/free-brands-svg-icons';
import { faYoutube } from '@fortawesome/free-brands-svg-icons';
import { faLinkedin } from '@fortawesome/free-brands-svg-icons';
import { faPhone } from '@fortawesome/free-solid-svg-icons'
import { faEnvelope } from '@fortawesome/free-solid-svg-icons'
import { ToastrService } from 'ngx-toastr';
import { Brand } from 'src/app/models/brand';
import { User } from 'src/app/models/user';
import { BrandService } from 'src/app/services/brand.service';
import { LocalStorageService } from 'src/app/services/local-storage.service';
import { UserService } from 'src/app/services/user.service';
@Component({
  selector: 'app-navi',
  templateUrl: './navi.component.html',
  styleUrls: ['./navi.component.css']
})
export class NaviComponent implements OnInit {
  brands:Brand[];
  dataLoaded=false;
  faTwitter = faTwitter;
  faFacebook = faFacebook;
  faInstagram = faInstagram;
  faYoutube = faYoutube;
  faLinkedin = faLinkedin;
  faPhone = faPhone;
  faEnvelope = faEnvelope;
  constructor(private brandService:BrandService,private localStorageService:LocalStorageService,private userService:UserService,private toastrService:ToastrService) {
  }

  isLogin:boolean;
  user:User;
  ngOnInit(): void {
    this.isLogin=this.localStorageService.isAuthenticated();
    this.getBrands();
    this.IsLogin();
  }
  getBrands(){
    this.brandService.getBrands().subscribe(response=>{
      this.brands=response.data;
      this.dataLoaded = true;
    })
  }
  IsLogin(){
    if(this.isLogin){
      let email = this.localStorageService.get("email");
      this.userService.getUser(email).subscribe(response=>{
        this.user = response.data;
      })
    }
  }
  logout(){
    this.localStorageService.clear();
    this.toastrService.success("Çıkış yapıldı");
    window.location.href="/cars";

  }
}
