import { Ingredient } from './../shared/ingredient.model';
import { EventEmitter, Injectable } from "@angular/core";
import { Recipe } from "./recipe.model";
import { ShoppingListService } from '../shopping-list/shopping-list.service';

@Injectable()
export class RecipeService {
  recipeSelected = new EventEmitter<Recipe>();

  private recipes: Recipe[] = [
    new Recipe(
      'A test Recipe',
      'a test',
      'https://www.foodandwine.com/thmb/97PY4E6Wk95IYv1_8pDZvBEi0Uw=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/cream-tomato-rigatoni-FT-RECIPE1020-139fb3fa52574e8bb06f98e7fa3e4f1e.jpg',
      [
        new Ingredient('Meat', 1),
        new Ingredient('French Fries', 20),
      ]
    ),
    new Recipe(
      'A New Recipe',
      'new test',
      'https://www.inspiredtaste.net/wp-content/uploads/2022/11/Fluffy-Pancakes-Recipe-Video.jpg',
      [
        new Ingredient('Buns', 2),
        new Ingredient('Meat', 1),
      ]
    )
  ];

  constructor(private shoppingListService: ShoppingListService){}

  getRecipes(){
    return this.recipes.slice();
  }

  addIngredientsToShoppingList(ingredients: Ingredient[]){
    this.shoppingListService.addIngredients(ingredients);
  }

}
