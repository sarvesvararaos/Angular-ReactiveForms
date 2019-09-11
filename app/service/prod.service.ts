import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import{Observable,of, from} from 'rxjs';
import {map,catchError,tap} from 'rxjs/operators';
import { Mod } from '../mod';
@Injectable({
  providedIn: 'root'
})
export class ProdService {
  formData:Mod;
 user:Mod[];
  private _baseUrl : string = "http://localhost:55985/api/products";

  constructor(private _http: HttpClient) { }
  getProduct(){
    return this._http.get(this._baseUrl).
    pipe(map(this.extractData),catchError(this.handleError<any>('Product Get Failed')));
  }

  
AddProduct(user:any):Observable<any>{
  return this._http.post<any>(this._baseUrl,user).
  pipe(tap(user),catchError(this.handleError<any>('Product Add Failed')));
}


DeleteProduct(Product:any):Observable<any>{
  return this._http.delete(this._baseUrl+"/"+Product.ProductId,Product).
  pipe(tap(Product),catchError(this.handleError<any>('Product delete Failed')));
}

// DeleteProduct(ProductId):Observable<any>{
//   return this._http.delete(`${this._baseUrl }/${ProductId}`)
// }

UpdateProduct(Product:any):Observable<any>{
  return this._http.put<any>(this._baseUrl+"/"+Product.ProductId,Product).
  pipe(tap(Product),catchError(this.handleError<any>('Product Edit Failed')));
}









  extractData(res: Response)
{
  let body=res;
  console.log(body);
  return body || {};
}




private handleError<T> (operation = 'operation' , result ?: T){
  return (error:any):Observable<T> =>{
    console.error(error);
    // TODO: better job of transforming error for user consumption
    console.log(`${operation} failed: ${error.message}`);

    // Let the app keep running by returning an empty result.
    return of(result as T);
  }
}
}
