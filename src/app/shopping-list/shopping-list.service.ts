import { EventEmitter } from "@angular/core";
import { Ingredient } from "../shared/ingredient.model";

export class ShoppingListService {
  ingredientsChanged = new EventEmitter<Ingredient[]>()

  ingredientSelected = new EventEmitter<Ingredient>();

  private ingredients: Ingredient[] = [
    new Ingredient('Apples', 5),
    new Ingredient('Tomatoes', 10),
  ];

  getIngredients(){
    return this.ingredients.slice();
  }

  addIngredient(ingredient){
    this.ingredients.push(ingredient);
    this.ingredientsChanged.emit(this.ingredients.slice());
  }

  addIngredients(ingredients: Ingredient[]){
    this.ingredients.push(...ingredients);
    this.ingredientsChanged.emit(this.ingredients.slice());
  }

  // editIngredient(ingredient, index){
  //   this.ingredients[index] = ingredient;
  // }

  // removeIngredient(index){
  //   this.ingredients.slice(index,1);
  // }


}
