import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { SearchGifsResponse, Gif } from '../interfaces/gifs.interface';

@Injectable({
  providedIn: 'root'
})
export class GifsService {


  private apiKey: string = "FLFBM0PaQiiYZY94wk2hoY14qTfp07Qx";
  private servicioUrl: string = "https://api.giphy.com/v1/gifs";
  private _historial: string[] = [];

  public resultados: Gif[] = [];

  get historial(){
    return [...this._historial];
  }

  constructor( private http: HttpClient ) { 
    // if( localStorage.getItem('historial') ){
    //   this._historial =  JSON.parse( localStorage.getItem('historial')! );
    // }
    this._historial =  JSON.parse( localStorage.getItem( 'historial' )! ) || [];
    this.resultados = JSON.parse( localStorage.getItem( 'resultados' )! ) || [];
  }


  buscarGifs( query: string ){
    query = query.trim().toLocaleLowerCase();

    if( !this._historial.includes( query ) ){
      this._historial.unshift( query );
      this._historial = this._historial.splice(0,10);
      //console.log(this._historial);

      localStorage.setItem( 'historial', JSON.stringify( this._historial ) );
      
    }

    const params = new HttpParams()
    .set('api_key', this.apiKey)
    .set('limit', '10')
    .set('q', query);

    //console.log(params.toString());

    this.http.get<SearchGifsResponse>(` ${ this.servicioUrl }/search`, { params } )
        .subscribe( 
          ( resp ) =>{
            //console.log(resp.data);
            this.resultados = resp.data;
            localStorage.setItem( 'resultados', JSON.stringify( this.resultados ) );
          });

  }

  // async buscarGifs( query: string ){
  //   query = query.trim().toLocaleLowerCase();

  //   if( !this._historial.includes( query ) ){

  //     this._historial.unshift( query );

  //     this._historial = this._historial.splice(0,10);

  //     //console.log(this._historial);
  //   }

  // fetch("https://api.giphy.com/v1/gifs/search?api_key=FLFBM0PaQiiYZY94wk2hoY14qTfp07Qx&q=kim wexler&limit=10")
  //   .then(resp => {
  //     resp.json().then(
  //       data => {
  //         //console.log(data);
  //       }
  //     )
  //   });

  //   const resp = await fetch("https://api.giphy.com/v1/gifs/search?api_key=FLFBM0PaQiiYZY94wk2hoY14qTfp07Qx&q=kim wexler&limit=10");
  //   const data = await resp.json();

  //   //console.log( data );
    
  // }
  
  
  
  
  
}
