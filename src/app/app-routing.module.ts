import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CongressMembersComponent } from './components/congress-members/congress-members.component';
import { MemberDetailsComponent } from './components/member-details/member-details.component';

const routes: Routes = [
  {path:'', pathMatch:'full', redirectTo:'congressmen'},
  {path:'congressmen', component:CongressMembersComponent},
  {path:'congressman-detail/:id', component: MemberDetailsComponent},
  {path:'**', pathMatch:'full', redirectTo:'congressmen'},

  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

export const routingComponents = [CongressMembersComponent,MemberDetailsComponent];

