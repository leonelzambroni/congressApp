import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CongressMembersComponent } from './congress-members.component';

describe('CongressMembersComponent', () => {
  let component: CongressMembersComponent;
  let fixture: ComponentFixture<CongressMembersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CongressMembersComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CongressMembersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
