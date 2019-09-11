import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { ProdService } from './service/prod.service';
import { Mod } from './mod';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  Produc:Mod[];
  //Produc:any[];
  Products=new FormGroup({ProductId:new FormControl(),
    ProductName:new FormControl(),
    Remarks:new FormControl()
  });
  constructor(private dataService:ProdService) { }

  ngOnInit() {
   this.getS();
    this.Produc=this.dataService.user;
  }

  getS(){
    this.dataService.getProduct().subscribe(
      (data:[]) => {
        console.log(data);
        this.Produc=data;
      });
    }

    AddS()
    {
     // let s: any = {  SUPLNO: t1, SUPLNAME: t2, SUPLADDR:t3 };
      //alert(t1);
      this.dataService.AddProduct(this.Products.value).subscribe((result)=>{
        console.log(result);
        this.getS();
      },(err) =>{
          console.log(err);
      });
    }
    DelS()
  {
     //let s: any = {  ProductId: t1, productName: t2, Remarks:t3 };
    //alert(t1);
    this.dataService.DeleteProduct(this.Products.value).subscribe((result)=>{
      console.log(result);
      this.getS();
    },(err) =>{
        console.log(err);
    });

  }
  // DelS(ProductId)
  // {
  //    //let s: any = {  ProductId: t1, productName: t2, Remarks:t3 };
  //   //alert(t1);
  //   this.dataService.DeleteProduct(ProductId).subscribe((result)=>{
  //     console.log(result);
  //     this.getS();
  //   },(err) =>{
  //       console.log(err);
  //   });

  // }
  UpdateS()
  {
    // let s: any = {  ProductId: t1, productName: t2, Remarks:t3 };
    // //alert(t1);
    this.dataService.UpdateProduct(this.Products.value).subscribe((result)=>{
      console.log(result);
      this.getS();
    },(err) =>{
        console.log(err);
    });

  }
  populated(p:Mod)
  {
    this.dataService.formData=p;
  }
}
