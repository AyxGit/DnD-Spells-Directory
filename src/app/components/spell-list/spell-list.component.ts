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
  tempSpell={
    "_id": "626eb50cb264cb21bf506f9c",
    "index": "acid-arrow",
    "name": "Acid Arrow",
    "desc": [
      "A shimmering green arrow streaks toward a target within range and bursts in a spray of acid. Make a ranged spell attack against the target. On a hit, the target takes 4d4 acid damage immediately and 2d4 acid damage at the end of its next turn. On a miss, the arrow splashes the target with acid for half as much of the initial damage and no damage at the end of its next turn."
    ],
    "higher_level": [
      "When you cast this spell using a spell slot of 3rd level or higher, the damage (both initial and later) increases by 1d4 for each slot level above 2nd."
    ],
    "range": "90 feet",
    "components": [
      "V",
      "S",
      "M"
    ],
    "material": "Powdered rhubarb leaf and an adder's stomach.",
    "ritual": false,
    "duration": "Instantaneous",
    "concentration": false,
    "casting_time": "1 action",
    "level": 2,
    "attack_type": "ranged",
    "damage": {
      "damage_type": {
        "index": "acid",
        "name": "Acid",
        "url": "/api/damage-types/acid"
      },
      "damage_at_slot_level": {
        "2": "4d4",
        "3": "5d4",
        "4": "6d4",
        "5": "7d4",
        "6": "8d4",
        "7": "9d4",
        "8": "10d4",
        "9": "11d4"
      }
    },
    "school": {
      "index": "evocation",
      "name": "Evocation",
      "url": "/api/magic-schools/evocation"
    },
    "classes": [
      {
        "index": "wizard",
        "name": "Wizard",
        "url": "/api/classes/wizard"
      }
    ],
    "subclasses": [
      {
        "index": "lore",
        "name": "Lore",
        "url": "/api/subclasses/lore"
      },
      {
        "index": "land",
        "name": "Land",
        "url": "/api/subclasses/land"
      }
    ],
    "url": "/api/spells/acid-arrow"
  }
  constructor(private http: HttpClient, private spellService: SpellsService) { }

  spells$: Observable<Spell[]> | undefined;
  spellsFull$: Observable<SpellInfo[]> | undefined;

  pageSize:number = 24
  page:number = 1
  collectionSize = 0;

  form = new FormGroup({
    search: new FormControl('', Validators.required),
  });

  spellInfoList: SpellInfo[] = [];
  filteredList: SpellInfo[] = [];
  queryComplete: boolean = false;

  ngOnInit(): void {
    this.spells$ = this.spellService.getSpellsSimple();

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
