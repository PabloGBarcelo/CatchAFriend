import { Component, OnInit } from '@angular/core';


@Component({
  selector: 'app-swipe',
  templateUrl: './swipe.component.html',
  styles: ['.demo-one {width:200px;height:200px;background-color: slateblue;color: #fff;}',
          '.demo-one:hover {cursor:pointer}'],

})
export class SwipeComponent implements OnInit {

  constructor() {}

  ngOnInit() {

  }
}
