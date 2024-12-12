import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SidebarComponent } from './modules/components/sidebar/sidebar.component';
import { DashboardComponent } from './modules/components/dashboard/dashboard.component';
import { HomeComponent } from './modules/components/home/home.component';
import { StudentFormComponent } from './modules/components/student-form/student-form.component';
import { AddBlockComponent } from './modules/components/add-block/add-block.component';
import { AddCoursesComponent } from './modules/components/add-courses/add-courses.component';

const routes: Routes = [
  { path: '', redirectTo: '/dashboard', pathMatch: 'full' },
  {path:'dashboard',component:DashboardComponent,
    children: [
      {path:'',component:HomeComponent},
      {path:'student-info',component:StudentFormComponent},
      {path:'add-block',component:AddBlockComponent},
      {path:'add-courses',component:AddCoursesComponent}
    
      


      
    ]
  }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
