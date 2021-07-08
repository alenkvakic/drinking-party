import { 
  Directive, 
  EventEmitter, 
  HostListener, 
  Input, 
  OnDestroy, 
  OnInit, 
  Output 
} from '@angular/core';
import { Subject, Subscription } from 'rxjs';
import { debounceTime } from 'rxjs/operators';

@Directive({
  selector: '[appDebounceClick]'
})
export class DebounceClickDirective implements OnInit, OnDestroy {
  @Input() debounceTime = 500;

  @Output() debounceClick = new EventEmitter();
  
  private clicks = new Subject();
  private sub: Subscription = new Subscription();

  constructor() { }

  ngOnInit() {
    this.sub = this.clicks.pipe(
      debounceTime(this.debounceTime)
    ).subscribe(e => this.debounceClick.emit(e));
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }

  @HostListener('click', ['$event'])
  clickEvent(event: any) {
    event.preventDefault();
    event.stopPropagation();
    this.clicks.next(event);
  }
}