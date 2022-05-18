import { Component, Input, OnInit } from '@angular/core';
import { Spell, SpellInfo } from 'src/app/types/spells';

@Component({
  selector: 'spell-card',
  templateUrl: './spell-card.component.html',
  styleUrls: ['./spell-card.component.css']
})
export class SpellCardComponent implements OnInit {
  @Input() spellCard:SpellInfo | undefined;

  constructor() {}
  displayModal=false;

  ngOnInit(): void {
  }

  /**
 * Checked if the click was inside, or outside modal, Closes modal if click is outside.
 * @param value Takes event target.
 */
  modalClick(value:any){
    //Checks if the element clicked on is the outside Modal Div, if it is, it closes it.
    if((value as HTMLInputElement).id == "OutsideModal"){
      this.displayModal = false;
    }
  }
  /**
 * Sets displayModal to true
 */
  openModal(){
    this.displayModal=true;
  }
  /**
 * Sets displayModal to false
 */
  closeModal(){
    this.displayModal=false;
  }
}
