import React, { Component } from 'react';
import Aux from '../../hoc/Aux/Aux';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';




const INGREDIENT_PRICES = {
    salad: 0.4,
    bacon: 0.5,
    meat: 0.6,
    cheese: 0.2
};

class BurgerBuilder extends Component{

    state = {
        ingredients:{
            salad : 0,
            bacon: 0,
            cheese: 0,
            meat: 0
        },
        totalPrice: 4,
        purchaseable: false,
        purchasing: false
    }

    purchaseHandler = ()=>{
        this.setState({ purchasing: true });
    }

    purchaseCancelHandler = ()=>{
        this.setState({ purchasing: false});
    }

    purchaseContinueHandler = ()=>{
        alert('You Continue!');
    }

    updatePurchaseState = (ingredients)=>{

        const sum = Object.keys(ingredients)
                    .map(igkey=>{
                        return ingredients[igkey];
                    })
                    .reduce((sum, el)=>{
                        return sum + el;
                    },0);
        this.setState({purchaseable: sum > 0});
    }

    addIngredientHandler = (type) =>{
        const oldCount = this.state.ingredients[type];
        const updatedCounter = oldCount + 1;
        const updateIngredients = {
            ...this.state.ingredients
        };
        updateIngredients[type] = updatedCounter;
        const priceAddition = INGREDIENT_PRICES[type];
        const oldPrice = this.state.totalPrice;
        const newPrice = oldPrice + priceAddition;
        this.setState({totalPrice: newPrice, ingredients: updateIngredients});
        this.updatePurchaseState(updateIngredients);
    }

    removeIngredientHandler = (type) =>{
        const oldCount = this.state.ingredients[type];

        if(oldCount<= 0){
            return;
        }

        const updatedCounter = oldCount - 1;
        const updateIngredients = {
            ...this.state.ingredients
        };
        updateIngredients[type] = updatedCounter;
        const priceDeduction = INGREDIENT_PRICES[type];
        const oldPrice = this.state.totalPrice;
        const newPrice = oldPrice + priceDeduction;
        this.setState({totalPrice: newPrice, ingredients: updateIngredients});
        this.updatePurchaseState(updateIngredients);
        
    }

    render(){

        const disabledInfo = {
            ...this.state.ingredients
        };

        for(let key in disabledInfo){
            disabledInfo[key] = disabledInfo[key] <= 0;
        }

        return(
            <Aux>
                <Modal show={this.state.purchasing} modalClosed={this.purchaseCancelHandler}>
                    <OrderSummary  
                        price={this.state.totalPrice.toFixed(2)}
                        purchaseCancel={this.purchaseCancelHandler}
                        purchaseContinued={this.purchaseContinueHandler}
                        ingredients={this.state.ingredients}/>
                </Modal>
                <Burger ingredients={this.state.ingredients}/>
                <BuildControls 
                    ingredientAdded={this.addIngredientHandler} 
                    ingredientRemove={this.removeIngredientHandler}
                    disabled = {disabledInfo}
                    ordered={this.purchaseHandler}
                    price={this.state.totalPrice}
                    purchaseable={this.state.purchaseable}
                />
            </Aux>
        );
    }
}

export default BurgerBuilder;