import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';

import { ShoppingListService } from '../shopping-list.service';
import { Ingredient } from 'src/app/shared/ingredient.model';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.css']
})
export class ShoppingEditComponent implements OnInit, OnDestroy {
  @ViewChild('f') slForm: NgForm;
  subscription: Subscription;
  editMode = false;
  editItemIndex : number;
  editItem : Ingredient;

  constructor(private shoppingListService: ShoppingListService){}
  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  ngOnInit(): void {
    this.subscription = this.shoppingListService.startedEditng.subscribe((index:number) => {
      this.editMode = true;
      this.editItemIndex = index;
      this.editItem = this.shoppingListService.getIngredient(index);
      this.slForm.setValue({
        name: this.editItem.name,
        amount: this.editItem.amount
      })
    });
  }

  onSubmit(form: NgForm) {
    const value = form.value;
    const newIngredient = new Ingredient(value.name, value.amount);
    if(this.editMode){
      this.shoppingListService.updateIngredient(this.editItemIndex, newIngredient);
    } else {
      this.shoppingListService.addIngredient(newIngredient);
    }
    this.onClear();
  }

  onClear() {
    this.editMode = false;
    this.slForm.reset();
  }

  onDelete(){
    this.shoppingListService.deleteIngredient(this.editItemIndex);
    this.onClear();
  }
}

