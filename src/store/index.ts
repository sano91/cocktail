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
    signResult: {
      "success":"false",
      "name": "",
  },
  },
  mutations: {
    setCocktail(state, cocktail){
      state.cocktail = cocktail
    },
    setSignResult(state, result){
      state.signResult = result
    },
    setToken(state, token){
      window.localStorage.setItem("token", token);
    }

  },
  actions: {
     getCocktailByName(context, name){
       console.log("getcocktailbyname:");
       console.log(window.localStorage.getItem("token"));
       axios({
         method: "get",
         url: `http://0.0.0.0:8080/cocktail/${name}`,
         headers: {
          "Access-Control-Allow-Origin" : "*",
          "Access-Control-Allow-Methods": "DELETE, POST, GET, OPTIONS",
          "Access-Control-Allow-Headers": "Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With",
          'Access-Control-Allow-Credentials' : 'true',
          "Content-Type" :  "application/json",
            "cache-control": "no-cache",
            "Authorization": "Bearer " + window.localStorage.getItem("token") 
         }
       })
       
      .then(ret => (context.commit("setCocktail",ret.data)));
     },
     sendSignIn(context, signForm){
       console.log(signForm);
       axios({
        method:"post",
        url: "http://0.0.0.0:8080/auth/signin",
        data: signForm,
        headers: {
          "Access-Control-Allow-Origin" : "*",
          "Access-Control-Allow-Methods": "DELETE, POST, GET, OPTIONS",
        "Access-Control-Allow-Headers": "Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With",
        "Content-Type" :  "application/json",
          "cache-control": "no-cache",
          "Authorization": "Bearer " + window.localStorage.getItem("token")
        },
       })
       
       .then(respond => (context.commit("setSignResult", respond.data)));
     },

     sendLogin(context, loginForm){
       axios({
         method: "post",
         url: "http://0.0.0.0:8080/auth/login",
         data: loginForm,
         headers: {
          "Access-Control-Allow-Origin" : "*",
          "Access-Control-Allow-Methods": "DELETE, POST, GET, OPTIONS",
          "Access-Control-Allow-Headers": "Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With",
        "Content-Type" :  "application/json",
          "cache-control": "no-cache",
          "Authorization": "Bearer " + window.localStorage.getItem("token")
        },
       })
       .then(respond => (context.commit("setToken", respond.data.token)));
     }
  },
  modules: {}
});
