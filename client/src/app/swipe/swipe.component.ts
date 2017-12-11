import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-swipe',
  templateUrl: './swipe.component.html',
  styles: ['.demo-one {width:200px;height:200px;background-color: slateblue;color: #fff;}',
          '.demo-one:hover {cursor:pointer}'],
})
export class SwipeComponent implements OnInit {
  x: number = 0;
  y: number = 0;
  startX: number = 0;
  startY: number = 0;
  constructor() { }

  ngOnInit() {
    console.log("HEY")
  }

  onPanStart(event: any): void {
    event.preventDefault();
    this.startX = this.x;
    this.startY = this.y;
  }

  onPan(event: any): void {
    event.preventDefault();
    this.x = this.startX + event.deltaX;
    this.y = this.startY + event.deltaY;
  }
}
