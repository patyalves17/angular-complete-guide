import { EventEmitter } from "@angular/core";
import { Ingredient } from "../shared/ingredient.model";
import { Subject } from "rxjs";

export class ShoppingListService {
  ingredientsChanged = new Subject<Ingredient[]>()

  private ingredients: Ingredient[] = [
    new Ingredient('Apples', 5),
    new Ingredient('Tomatoes', 10),
  ];

  getIngredients(){
    return this.ingredients.slice();
  }

  addIngredient(ingredient){
    this.ingredients.push(ingredient);
    this.ingredientsChanged.next(this.ingredients.slice());

  }

  addIngredients(ingredients: Ingredient[]){
    this.ingredients.push(...ingredients);
    this.ingredientsChanged.next(this.ingredients.slice());

  }

  // editIngredient(ingredient, index){
  //   this.ingredients[index] = ingredient;
  // }

  // removeIngredient(index){
  //   this.ingredients.slice(index,1);
  // }


}
