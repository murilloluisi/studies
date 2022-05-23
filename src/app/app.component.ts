import { animate, state, style, transition, trigger } from '@angular/animations';
import { Component, Renderer2 } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  animations: [
    trigger('clickedState', [
      state('default', style({
        'background-color': 'orange',
        'width': '100px',
        'height': '100px',
        'margin-left': '20px'
      })),
      state('clicked', style({
        'background-color': 'blue',
        'width': '300px',
        'height': '50px',
        'margin-left': '20px'
      })),
      state('mousedown', style({
        'background-color': 'red',
        'margin-left': '20px',
        'border': '1px solid black',
        'width': '100px',
        'height': '100px', // angular doesn't keep the old styles, so we need to re-declare them
      })),
      transition('default => clicked', animate('200ms 500ms ease-in')),
      transition('clicked => default', animate(300)),
      transition('mousedown <=> clicked', animate(300)),
      // transition('clicked => mousedown', animate(300))
    ]),
    trigger('numberEnteredState', [
      state('unselected', style({
        'border': '1px solid black',
        'padding': '5px',
        // 'background-color': 'black'
      })),
      state('selected', style({
        'border': '1px solid black',
        'padding': '5px',
        'background-color': 'red'
      })),
      transition('unselected => selected', [
        style({ //! what does this code means ? "Instantly change the 
                //! following styles. These styles are then only tempo- 
                //! rary and therefore the black color for the border 
                //! is not capped around. We do get the blue border in 
                //! the end"

                //? This style() let us start animation from it, not directly from 'unselected' state.
                
          border: '2px solid black',
          padding: '4px',
          backgroundColor: 'yellow'
        }),
        animate(6000, 
          style({ //! this style is applied smoothly after 6000ms completes
            border: '2px solid black',
            padding: '4px',
            backgroundColor: 'blue'
           //! It only works with camelcase property, not the string(in this case would be 'background-color')
        }),),
        
        animate(6000)
      ])
    ])
  ]
})
export class AppComponent {
  title = 'Studies';

  divClicked: boolean = false
  doAnimate: boolean = false

  markedBox: number

  clickInfo = 'default'
  paragraphClick = 'default'

  onClickSimple() {
    this.clickInfo = 'clicked'
    setTimeout(() => {
      this.clickInfo = 'default'
    }, 3000)
  }

  numberEntered: number

  onType(event: any) {
    this.numberEntered = event.data
  }

  // courseGoals = [
  //   {title: 'Master Angular Styling', isActiveGoal: true},
  //   {title: 'Understand Angular Animations', isActiveGoal: false},
  //   {title: 'Master Angular Animations', isActiveGoal: false},
  // ]

  // constructor(
  //   private renderer: Renderer2
  // ) {

  // }

  // isFavorite = false

  // onShowBoring(element: HTMLElement){
  //   // element.style.display = 'block' //! WE SHOULDN'T ACCESS ELEMENTS, OR PROPERTIES, DIRECTLY LIKE THIS. THE REASON IS THAT ANGULAR IS ACTUALLY ABLE TO RENDER TEMPLATES NOT JUST IN THE REAL DOM, BUT ALSO "OTHER PLACES".
  //   this.renderer.setStyle(element, 'display', 'block')
  // }
}
