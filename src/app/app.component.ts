import { animate, keyframes, query, stagger, state, style, transition, trigger } from '@angular/animations';
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
          ),
          style({ //! this style is applied smoothly after 6000ms completes
            border: '2px solid black',
            padding: '4px',
            backgroundColor: 'blue'
           //! It only works with camelcase property, not the string(in this case would be 'background-color')
        }),
        
        animate(6000)
      ])
    ]),
    trigger('boxColor', [
      //! COMEÇA VERMELHO, VAI PRO AMARELO INSTANTANEAMENTE, DA 2s VAI PRO VERDE, MAIS 2s VAI PRO AZUL
      //? USAR A NOTAÇÃO JSON PQ STRING PODE DAR BUG
      state('red', style({
        backgroundColor:'red'
      })),
      state('blue', style({
        backgroundColor:'blue'
      })),
      transition('red => blue', [
        style({
          backgroundColor:'yellow'
        }),
        animate(2000,
          style({
            backgroundColor:'green' //=>> this is the next step, I don't want to finish the animation, I want a step before it reaches the end
          }),
        ),
        animate(2000)
      ])
    ]),

    trigger('clicked', [
      state('default', 
        style({
          backgroundColor: 'red',
          transform: 'scale(1)' //!THERE IS A BUG THAT WE NEED TO DECLARE THE SCALE ON THE INITIAL AND FINAL STATES
        })
      ),
      state('reverse',
        style({
          backgroundColor: 'blue',
          transform: 'scale(1)'
        })
      ),
      transition('default <=> reverse', [
        style({
          backgroundColor: 'yellow'
        }),
        animate(5000, 
            style({
              transform: 'scale(2)'
        })
        ),
        animate(5000)
      ])
    ]),  
    trigger('animateState', [
      transition('* => *', [
        animate(400, style({
          width: 0
        })),
        animate(400, style({
          width: '*'
        }))
      ])
    ]),

    trigger('testesOperators', [
      transition(':enter', [
        
        //! caixa vermelha
        query('.box-2', [
          style({
            transform: 'initial',
            backgroundColor: 'initial'
          }),
          animate(2000,
            style({
              transform: 'translate(-100%)',
              backgroundColor: 'red'
          })),
          animate(2000)
        ]),

        //! lista de caixas vermelhas 
        query(':enter', [
          style({
            opacity: 0
          }),
          stagger(2000, 
            style({
              backgroundColor: 'red',
              opacity: 1
            }))
        ])

      ])
    ])
  ]
})

export class AppComponent {
  title = 'Studies';

  color = 'red'

  divClicked: boolean = false
  doAnimate: boolean = false

  markedBox: number

  clickInfo = 'default'
  paragraphClick = 'default'

  clickState = 'default'

  animate: boolean = false

  width: number = 400

  onClickSimple() {
    this.clickInfo = 'clicked'
    setTimeout(() => {
      this.clickInfo = 'default'
    }, 3000)
  }

  onBoxClick() {
    this.color = 'blue'
    setTimeout(() => {
      this.color = 'red'
    }, 10000);
  }

  numberEntered: number

  onType(event: any) {
    this.numberEntered = event.data
  }

  courseGoals = [
    {title: 'Master Angular Styling', isActiveGoal: true},
    {title: 'Understand Angular Animations', isActiveGoal: false},
    {title: 'Master Angular Animations', isActiveGoal: false},
  ]

  constructor(
    private renderer: Renderer2
  ) {

  }

  isFavorite = false

  onShowBoring(element: HTMLElement){
    // element.style.display = 'block' //! WE SHOULDN'T ACCESS ELEMENTS, OR PROPERTIES, DIRECTLY LIKE THIS. THE REASON IS THAT ANGULAR IS ACTUALLY ABLE TO RENDER TEMPLATES NOT JUST IN THE REAL DOM, BUT ALSO "OTHER PLACES".
    this.renderer.setStyle(element, 'display', 'block')
  }
}
