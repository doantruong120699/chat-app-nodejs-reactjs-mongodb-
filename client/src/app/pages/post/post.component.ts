import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { User } from '@app/_models';
import { ApplicationState } from '@app/store/reducers';
import { Store } from '@ngrx/store';
import { Observable, Subscription } from 'rxjs';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.css']
})
export class PostComponent implements OnInit {

  public user$: Observable<User> = this.store.select(state => state.user.data.user);
  private subscriptions: Subscription[] = [];
  public user?: User;
  public profileForm!: FormGroup;
  public imageSrc: string[] = [];
  @ViewChild('inputFile') inputFile!: ElementRef;

  constructor(
    private store: Store<ApplicationState>,
  ) { }

  ngOnInit(): void {
    this.subscriptions.push(
      this.user$.subscribe(sub => {
        this.user = sub;
      })
    );
  }

  onSelectPhoto(event: any) {
    const reader = new FileReader();

    if(event.target.files && event.target.files.length) {
      const [file] = event.target.files;
      reader.readAsDataURL(file);

      reader.onload = () => {
        this.imageSrc.push(reader.result as string);
      };

    }
  }


}
