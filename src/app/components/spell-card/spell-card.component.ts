import { DOCUMENT } from '@angular/common';
import { Component, Inject, Input, OnInit, Renderer2 } from '@angular/core';
import { Spell, SpellInfo } from 'src/app/types/spells';

@Component({
  selector: 'spell-card',
  templateUrl: './spell-card.component.html',
  styleUrls: ['./spell-card.component.css']
})
export class SpellCardComponent implements OnInit {
  @Input() spellCard:SpellInfo | undefined;
  displayModal:boolean | undefined = false ;
  constructor() {}

  showShareText:boolean = false

  ngOnInit(): void {
    this.displayModal = this.spellCard?.displayModal
  }

  /**
 * Checked if the click was inside, or outside modal, Closes modal if click is outside.
 * @param value Takes event target.
 */
  modalClick(value:any){
    //Checks if the element clicked on is the outside Modal Div, if it is, it closes it.
    if((value as HTMLInputElement).id == "OutsideModal"){
      this.closeModal();
    }
  }
  /**
 * Sets displayModal to true
 */
  openModal(){
    document.body.classList.add('disable-scroll');
    this.displayModal=true;
  }
  /**
 * Sets displayModal to false
 */
  closeModal(){
    //this._renderer.removeClass(this.document.body,"disable-scroll");
    document.body.classList.remove('disable-scroll')
    this.displayModal=false;
  }

  copyLink(){
    this.showShareText = true;
    var _this = this;
    setTimeout(
      function() {
        _this.showShareText=false;
      }, 2000);
    navigator.clipboard.writeText(window.location.hostname+'/'+this.spellCard?.index)
  }
}
