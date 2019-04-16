/**
 * Created by WGP on 2017/4/25.
 */
import { Injectable, Input } from '@angular/core';
import { Headers, Http, Response } from '@angular/http';
import 'rxjs/add/operator/toPromise';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';

 class RequestMethod{
  public static readonly  PUT = "PUT";
  public static readonly GET = "GET";
  public static readonly POST = "POST";
  public static readonly DELETE = "DELETE";
}

@Injectable()
export class BaseService {
    private headers = new Headers({ 'Content-Type': 'application/json' });

    constructor(private http: Http) {}



  //调用远程地址，获取数据 get方法
  public getData(url: string,method:string): Promise<any> {
    if( method == RequestMethod.GET){
      return this.getGetData(url);

    }else{
      return this.getPostData(url);        
    }

  }

    //调用远程地址，获取数据 get方法
  public getGetData(url: string): Promise<any> {
    alert(url);
    return this.http
      .get(url)
      .toPromise()
      .then(response => response.json() as any)
      .catch(this.handleError);

  }


      //调用远程地址，获取数据 post方法
  public getPostData(url: string): Promise<any> {
    return this.http
      .post(url,"1234")
      .toPromise()
      .then(response => response.json() as any)
      .catch(this.handleError);

  }
/**
 * 
 * @param url 
 * @param obj 
 */
  delete(url: string, obj: any) {

    return this.http.post(url, JSON.stringify(obj), { headers: this.headers })
      .toPromise().then(res => res.json() as any)
      .catch(this.handleError);

  }

  update(url: string, obj: any) {

    url = `${url}/${obj.id}`;
    return this.http.post(url, JSON.stringify(obj), { headers: this.headers })
      .toPromise().then(res => res.json() as any)
      .catch(this.handleError);

  }

    updateByPut(url: string, obj: any) {
    return this.http.put(url, JSON.stringify(obj), { headers: this.headers })
      .toPromise().then(res => res.json() as any)
      .catch(this.handleError);

  }
  //获取token信息
  getToken(url:string){
       let headers = new Headers();
    headers.append('Content-Type', 'application/json;charset=UTF-8');
    headers.append('Authorization', "12345");

    const searchParams = new URLSearchParams();

    return this.http.get(url, {search: searchParams, headers: headers})
      .toPromise().then(res => res.json() as any)
      .catch(this.handleError);
  }
  create(url: string, obj: any) {
    return this.http.post(url, JSON.stringify(obj))
      .toPromise().then(res => res.json() as any)
      .catch(this.handleError);
  }

deleteByDelete(url){

    return this.http.delete(url,  { headers: this.headers })
      .toPromise().then(res => res.json() as any)
      .catch(this.handleError);
}


  //错误处理
  private handleError(error: any): Promise<any> {
    console.error('An error occurred', error); // for demo purposes only
    return Promise.reject(error.message || error);
  }


}

