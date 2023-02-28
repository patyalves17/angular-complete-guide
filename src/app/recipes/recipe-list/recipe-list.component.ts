import { Component, EventEmitter, Output } from '@angular/core';
import { Recipe } from '../recipe.model';

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.css']
})
export class RecipeListComponent {

  @Output() recipeWasSelected = new EventEmitter<Recipe>;

  recipes: Recipe[] = [
    new Recipe('A test Recipe', 'a test', 'https://www.foodandwine.com/thmb/97PY4E6Wk95IYv1_8pDZvBEi0Uw=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/cream-tomato-rigatoni-FT-RECIPE1020-139fb3fa52574e8bb06f98e7fa3e4f1e.jpg'),
    new Recipe('A New Recipe', 'new test', 'https://www.inspiredtaste.net/wp-content/uploads/2022/11/Fluffy-Pancakes-Recipe-Video.jpg')
  ];

  onRecipeSelected(recipe: Recipe){
    this.recipeWasSelected.emit(recipe);
  }

}
