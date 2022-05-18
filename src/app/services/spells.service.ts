import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { concat, forkJoin, map, mergeMap, Observable, switchMap } from 'rxjs';
import { Spell } from '../types/spells';
import { SpellResponse } from './../types/spells';
import { SpellInfo } from 'src/app/types/spells';

@Injectable({
  providedIn: 'root'
})
export class SpellsService {
  constructor(private http:HttpClient) { }
  apiUrl="https://www.dnd5eapi.co/api/spells/"

  getSpellsSimple(){
    return this.http.get<any>(this.apiUrl).pipe(map(spells=>{spells = spells.results; return spells})) as Observable<Spell[]>
  }


  getInfo(value:Spell){
    return this.http.get<SpellInfo>(this.apiUrl+value.index)
  }

  getSpellFull() {
    return this.getSpellsSimple().pipe(
     mergeMap((service: any[]) => {
       return forkJoin(service.map(s => {
         return this.getInfo(s)
       })
     )})
    );
  }

}
