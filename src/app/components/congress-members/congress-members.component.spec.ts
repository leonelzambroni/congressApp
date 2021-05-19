import { HttpClientModule } from '@angular/common/http';
import { DebugElement } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';

import { CongressMembersComponent } from './congress-members.component';

describe('CongressMembersComponent', () => {
  let component: CongressMembersComponent;
  let fixture: ComponentFixture<CongressMembersComponent>;
  let de: DebugElement;
  
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CongressMembersComponent ],
      imports: [HttpClientModule,RouterTestingModule,FormsModule, ReactiveFormsModule]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CongressMembersComponent);
    component = fixture.componentInstance;
    de = fixture.debugElement;
    fixture.detectChanges();
  });
  afterEach(() =>{
    fixture.destroy();
  })

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
