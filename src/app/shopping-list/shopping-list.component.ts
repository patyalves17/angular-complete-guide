import { Component, OnDestroy, OnInit } from '@angular/core';
import { Ingredient } from '../shared/ingredient.model';
import { ShoppingListService } from './shopping-list.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.css']
})
export class ShoppingListComponent  implements OnInit, OnDestroy{
  ingredients: Ingredient[] = [];
  private igChangedSubscription: Subscription;

  constructor(private shoppingListService: ShoppingListService){}

  ngOnDestroy(): void {
   this.igChangedSubscription.unsubscribe();
  }

  ngOnInit(): void {
    this.ingredients = this.shoppingListService.getIngredients();

    this.igChangedSubscription = this.shoppingListService.ingredientsChanged.subscribe((ingredients: Ingredient[]) => {
      this.ingredients = ingredients;
    });
  }

  onEditItem(index: number){
    this.shoppingListService.startedEditng.next(index);
  }
}
