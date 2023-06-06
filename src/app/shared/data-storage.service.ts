import { RecipeService } from './../recipes/recipe.service';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Recipe } from '../recipes/recipe.model';
import { exhaustMap, map, take, tap } from 'rxjs/operators';
import { AuthService } from '../auth/auth.service';

@Injectable({
  providedIn: 'root'
})
export class DataStorageService {
  url = 'https://ng-recipes-59743-default-rtdb.firebaseio.com/recipes.json';

  constructor(private http: HttpClient,
    private recipeService: RecipeService,
    private authService: AuthService) { }

  fetchRecipes(){
    return this.http.get<Recipe[]>(this.url)
      .pipe(
        map(recipes => {
          return recipes.map(recipe => {
            return { ...recipe, ingredients: recipe.ingredients? recipe.ingredients : [] }
          });
        }),
        tap(recipes => this.recipeService.setRecipes(recipes))
      );
   }

  saveRecipes(){
    const recipes = this.recipeService.getRecipes();
    this.http.put(this.url, recipes).subscribe(recipes => {
      console.log(recipes)
    });
  }


}
