import Vue from "vue";
import Vuex from "vuex";
import axios from "axios";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    cocktail: {
      "name": "Addison",
      "type": "null",
      "category": "Cocktail",
      "alcoholContent": "ALCOHOLIC",
      "glassType": "Martini Glass",
      "recipe": "Shake together all the ingredients and strain into a cold glass.",
      "pictureURL": "https://www.thecocktaildb.com/images/media/drink/yzva7x1504820300.jpg",
      "ingredients": {
          "Vermouth": "1 1/2 shot ",
          "null": "null",
          "Gin": "1 1/2 shot "
      },
      "id": 13
    },
  },
  mutations: {
    setCocktail(state, cocktail){
      state.cocktail = cocktail
    }
  },
  actions: {
     getCocktailByName(context, name){
       axios
       .get(`http://0.0.0.0:8080/cocktail/${name}`)
      .then(ret => (context.commit("setCocktail",ret.data)));
     }
  },
  modules: {}
});
