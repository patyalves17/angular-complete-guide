import { RecipeService } from './../recipes/recipe.service';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Recipe } from '../recipes/recipe.model';
import { map, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class DataStorageService {
  url = 'https://ng-recipes-51a48-default-rtdb.firebaseio.com/recipes.json';

  constructor(private http: HttpClient, private recipeService: RecipeService) { }

  fetchRecipes(){
    return this.http.get<Recipe[]>(this.url)
    .pipe(
      map(recipes => {
        return recipes.map(recipe => {
          return { ...recipe, ingredients: recipe.ingredients? recipe.ingredients : [] }
        });
      }),
      tap(recipes => {
        return this.recipeService.setRecipes(recipes);
      })
    )
   }

  saveRecipes(){
    const recipes = this.recipeService.getRecipes();
    this.http.put(this.url, recipes).subscribe(recipes => {
      console.log(recipes)
    });
  }


}
