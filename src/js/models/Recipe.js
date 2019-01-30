import axios from 'axios';
import { key, proxy } from '../config';

export default class Recipe {
    constructor( id ) {
        this.id = id;
    }

    async getRecipe() {
        try {
            const res = await axios(`https://www.food2fork.com/api/get?key=${key}&rId=${this.id}`);
            this.title = res.data.recipe.title;
            this.author = res.data.recipe.publisher;
            this.img = res.data.recipe.image_url;
            this.url = res.data.recipe.source_url;
            this.ingredients = res.data.recipe.ingredients;
            // console.log(res);
        } catch (err) {
            console.log(err);
            alert('Something went wrong :(');
        }
    }

    calcTime() {
        const numIng = this.ingredients.length;
        const periods = numIng/3;
        this.time = periods * 15;
    }
    calcServings() {
        this.servings = 4;
    }

    parseIngredients() {
        const unitLong = [ "tablespoons", "tablespoon", "ounces", "ounce", "teaspoons", "teaspoon", "cups", "pounds" ];
        const unitShort = [ "tbsp", "tbsp", "oz", "oz", "tsp", "tsp", "cup", "pound" ];
        const newIngredients = this.ingredients.map(el => {
            // 1) Uniform units
            let ingredient = el.toLowerCase();
            unitLong.forEach((unit, i) => {
                ingredient = ingredient.replace(unit, unitShort[i]);
            });

            // 2) Remove parantheses
            ingredient = ingredient.replace(/ *\([^)]*\) */g, ' ');

            // 3) Parse ingredients into count, unit and ingredient
            const arrIng = ingredient.split(' ');
            const unitIndex = arrIng.findIndex(el2 => unitShort.includes(el2));
            
            if(unitIndex > -1) {
                // There is a unit
                // Ex. 4 1/2 cups, arrCount is [4, 1/2] --> eval("4+1/2") --> 4.5
                // Ex. 4 cups, arrCount is [4]
                const arrCount = arrIng.slice(0, unitIndex);
                let count;
                if(arrCount.length === 1) {
                    count = eval(arrIng[0].replace('-','+'));
                } else {
                    count = eval(arrIng.slice(0, unitIndex).join('+'))
                }

                objIng = {
                    count: parseInt(count, 10),
                    unit: arrIng[unitIndex],
                    ingredient: arrIng.splice(unitIndex + 1).join(' ')
                }

            } else if (parseInt(argIng[0], 10)) {
                // There is NO unit, but 1st element is number
                objIng = {
                    count: parseInt(argIng[0], 10),
                    unit: '',
                    ingredient: arrIng.slice(1).join(' ')
                }
            } else if (unitIndex === -1) {
                // There is NO unit and NO number in 1st position
                objIng = {
                    count: 1,
                    unit: '',
                    ingredient
                }
            }
            
            
            return objIng;

        });

        this.ingredients = newIngredients;
    }
}