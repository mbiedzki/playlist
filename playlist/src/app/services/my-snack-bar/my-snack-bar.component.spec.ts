import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MySnackBarComponent } from './my-snack-bar.component';
import { MAT_SNACK_BAR_DATA, MatSnackBar } from '@angular/material/snack-bar';

describe('MySnackBarComponent', () => {
  let component: MySnackBarComponent;
  let fixture: ComponentFixture<MySnackBarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [MySnackBarComponent],
      providers: [
        {
          provide: MatSnackBar,
          useValue: {},
        },
        {
          provide: MAT_SNACK_BAR_DATA,
          useValue: [],
        },
      ],
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MySnackBarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
