import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { PostListComponent, PostCreateComponent } from './posts';


const routes: Routes = [
    {
        path: '',
        component: PostListComponent,
    },
    {
        path: 'create',
        component: PostCreateComponent,
    }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],      
})

export class AppRoutingModule {
    
}