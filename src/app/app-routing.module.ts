import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { LoginComponent, SignupComponent } from "./auth";
import { PostListComponent, PostCreateComponent } from './posts';


const routes: Routes = [
    { path: '', component: PostListComponent },
    { path: 'create', component: PostCreateComponent, },
    { path: 'edit/:postId', component: PostCreateComponent, },
    { path: 'login', component: LoginComponent, },
    { path: 'signup', component: SignupComponent },
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule],
})

export class AppRoutingModule {

}