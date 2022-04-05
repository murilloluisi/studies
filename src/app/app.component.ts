import { Component, Renderer2 } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Studies';

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
