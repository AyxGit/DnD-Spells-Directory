import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { SpellsService } from 'src/app/services/spells.service';
import { Spell, SpellInfo } from 'src/app/types/spells';
import { TimesPipe } from 'src/app/directives/times-pipe.pipe';

import MiniSearch from 'minisearch'

import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'spell-list',
  templateUrl: './spell-list.component.html',
  styleUrls: ['./spell-list.component.css'],
})
export class SpellListComponent implements OnInit {

  constructor(private http: HttpClient, private spellService: SpellsService) { }

  // spells$: Observable<Spell[]> | undefined;
  // spellsFull$: Observable<SpellInfo[]> | undefined;

  pageSize:number = 12
  page:number = 1
  collectionSize = 0;

  form = new FormGroup({
    search: new FormControl('', Validators.required),
  });

  spellInfoList: SpellInfo[] = [];
  filteredList: SpellInfo[] = [];
  queryComplete: boolean = false;

  ngOnInit(): void {
    // this.spells$ = this.spellService.getSpellsSimple();

    this.spellService.getSpellFull().subscribe({
      complete: () => {this.queryComplete = true; }, // completeHandler
      error: (e: any) => {console.error(e);}, // errorHandler
      next: (output) => {this.spellInfoList = output; this.filteredList = output;this.collectionSize=this.filteredList.length}, // nextHandler
    });

    this.form.get('search')?.valueChanges.subscribe((value) => {
     //console.log(value)
     this.resetPages()
     this.miniSearchSpells(value)
    });
  }



  /**
   * Sets Current page
   * @param {(number | unknown)} page
   * @memberof SpellListComponent
   */
  setPage(page:number | unknown){
    this.page=Math.ceil(page as number)
  }

  //returns max page
  maxPage(){
    return (Math.ceil(this.collectionSize/this.pageSize))
  }
  /**
   * @param {SpellInfo[]} spellList
   * @param {string} search
   * @memberof SpellListComponent
   */
  searchButton(spellList: SpellInfo[],search:string){
  }

  /**
   *Explicately sets current page to 1
   * @memberof SpellListComponent
   */
  resetPages(){
    this.page = 1
  }



  /**
   *
   * Calls resetPages(), and sets collection size appropriately
   * @param {number} collectionSize
   * @memberof SpellListComponent
   */
  updatePages(collectionSize:number){
    this.resetPages()
    this.collectionSize = collectionSize
  }


  simpleFullTextSearch(spellList: SpellInfo[]): SpellInfo[] {
    spellList.filter(spells=>{spells.name == this.form.get('search')?.value})
    return spellList;
  }



  /**
   * Uses MiniSearch Library to set this.filteredList to filtered search results
   * Filters Search results based on name & description of spells, no other parameters
   * @param {string} search
   * @memberof SpellListComponent
   */
  miniSearchSpells(search:string){
  //if string is empty, show all spells
    if(search?.length == 0 || search == undefined) {
    this.filteredList = this.spellInfoList
    this.updatePages(this.filteredList.length)
    return
  }
    let miniSearch = new MiniSearch({
      fields: ['name', 'desc'], // fields to index for full-text search
      storeFields: ['name', 'index'], // fields to return with search results
      idField: '_id'
    })
    miniSearch.addAll(this.spellInfoList)

    var result = miniSearch.search(search)
    //console.table(result)
    this.filteredList = []

    // filter array for only returned elements
    for (let index = 0; index < result.length; index++) {
      const element = result[index].id;
      this.filteredList.push(this.spellInfoList.filter(spell=>spell._id == element)[0])
    }
    this.updatePages(this.filteredList.length)
    console.log(this.pageSize,this.page,this.collectionSize)
    //console.log(this.filteredList)
  }
}
