import { Component, OnInit, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'app-author',
  templateUrl: './author.component.html',
  styles: [
    `h1 {
      margin: 0;
      font-size: 12px;
      /* color: #8C8C8C */
    }`
  ],
  // encapsulation: ViewEncapsulation.Emulated //! DEFAULT
  encapsulation: ViewEncapsulation.ShadowDom //! USES NATIVE SHADOW DOM => NOT SUPPORTED BY MANY BROWSERS
  // encapsulation: ViewEncapsulation.None //! STYLES ARE SHARED ACROSS COMPONENTS => MAYBE IT'S GOOD TO USE IT WHEN YOU LAZY LOAD A MODULE AND CHANGE THE WHOLE THEME. HOWEVER, MAYBE THERE ARE BETTER OPTIONS TO DO IT.
})
export class AuthorComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
