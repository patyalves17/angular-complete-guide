import { Ingredient } from './../shared/ingredient.model';
import { Injectable } from "@angular/core";
import { Recipe } from "./recipe.model";
import { ShoppingListService } from '../shopping-list/shopping-list.service';
import { Subject } from 'rxjs';

@Injectable()
export class RecipeService {
  RecipesChanged = new Subject<Recipe[]>();
  private recipes: Recipe[] = [];

  constructor(private shoppingListService: ShoppingListService){}

  getRecipes(){
    return this.recipes.slice();
  }

  setRecipes(recipes: Recipe[]){
    this.recipes = recipes;
    this.RecipesChanged.next(this.recipes.slice());
  }

  addIngredientsToShoppingList(ingredients: Ingredient[]){
    this.shoppingListService.addIngredients(ingredients);
    this.RecipesChanged.next(this.recipes.slice());
  }

  getRecipe(id: number){
    return this.recipes.slice().find(recipe => recipe.id == id);
  }

  addRecipe(recipe:Recipe){
    this.recipes.push(recipe);
    this.RecipesChanged.next(this.recipes.slice());
  }

  updateRecipe(id:number, newRecipe:Recipe){
    const index = this.recipes.findIndex(recipe => recipe.id == id);
    this.recipes[index] = newRecipe;
    this.RecipesChanged.next(this.recipes.slice());
  }

  deleteRecipe(id:number){
    const index = this.recipes.findIndex(recipe => recipe.id == id);
    this.recipes.splice(index,1);
    this.RecipesChanged.next(this.recipes.slice());
  }

}
