import { Component, OnInit } from '@angular/core';
import { Recipe } from '../recipe.model';
import { RecipeService } from '../recipe.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.css']
})
export class RecipeListComponent implements OnInit {
  recipes: Recipe[] = [];
  private reChangedSubscription: Subscription;

  constructor(private recipeService: RecipeService, private router: Router, private route: ActivatedRoute){
    this.recipes = recipeService.getRecipes();
  }

  ngOnDestroy(): void {
    this.reChangedSubscription.unsubscribe();
   }

  ngOnInit(): void {
    this.reChangedSubscription = this.recipeService.RecipesChanged.subscribe((recipes: Recipe[]) => {
      this.recipes = recipes;
    });
  }

  onNewRecipe(){
    this.router.navigate(['new'], { relativeTo: this.route });
  }

}
