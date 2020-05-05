import axios from 'axios'

export default class Recipe{
    constructor(id){
        this.id = id;
    }
    async getRecipe(){
        try{
            const res = await axios(`https://forkify-api.herokuapp.com/api/get?rId=${this.id}`);
            this.title = res.data.recipe.title;
            this.author = res.data.recipe.publisher;
            this.ingredients = res.data.recipe.ingredients;
            this.url = res.data.recipe.source_url;
            this.image = res.data.recipe.image_url;
        }
        catch(error){
            alert(error);
        }
    }
    getTime(){
        const periods = Math.ceil(this.ingredients.length/3);
        this.time = periods*15;
    }
    getServings(){
        this.servings = 4;
    }

    parseIngredients(){
        const unitsLong = ['tablespoons', 'tablespoon', 'ounces', 'ounce', 'teaspoons', 'teaspoon', 'cups', 'pounds'];
        const unitsShort = ['tbsp', 'tbsp', 'oz', 'oz', 'tsp', 'tsp', 'cup', 'pound'];
        const unit = [...unitsShort,'kg','g'];

        const newIngredients = this.ingredients.map(el => {
            let ingredient = el.toLowerCase();
            unitsLong.forEach((unit,i) =>{
                ingredient = ingredient.replace(unit,unitsShort[i]);
            } )

            ingredient = ingredient.replace(/ *\([^)]*\) */g, ' ');

            let objIng;
            const arrIng = ingredient.split(' ');
            const unitIndex = arrIng.findIndex(el => unit.includes(el) );
            if (unitIndex > -1){
                const countArray = arrIng.slice(0,unitIndex);
                let count;
                if (countArray.length === 1){
                    count = eval(arrIng[0].replace('-','+'));
                }
                else{
                    count = eval(countArray.join('+'))
                }
                objIng={
                    count,
                    unit:arrIng[unitIndex],
                    ingredient:arrIng.slice(unitIndex+1).join(' ')
                }

            }
            else if (parseInt(arrIng[0],10)){
                objIng={
                    count:parseInt(arrIng[0],10),
                    unit:'',
                    ingredient:arrIng.slice(1).join(' ')
                }
            }
            else if (unitIndex === -1){
                objIng={
                    count:1,
                    unit:'',
                    ingredient
                }
            }

        return objIng;
        })
        this.ingredients = newIngredients;

    }

    updateServings(type){
        //Servings
        const newServings = type === 'dec'? this.servings -1: this.servings +1;
        //Ingredients
        
        this.ingredients.forEach(ing => {
            ing.count = ing.count * (newServings/this.servings);
        })

        this.servings = newServings;

    } 
 
}