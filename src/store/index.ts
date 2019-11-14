import Vue from "vue";
import Vuex from "vuex";
import axios from "axios";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    cocktail :{},
    signResult: {},
  user: " ",
  ratingResult:"",
  getRating:{},
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
    },
    setUser(state, user){
      state.user = user
    },
    setRatingResult(state,ratingResult){
      state.ratingResult = ratingResult;
    },
    setRating(state, rating){
      state.getRating  = rating;
    },

  },
  actions: {
     getCocktailByName(context, name  ){
       axios({ 
        method:"get",
        url: `http://0.0.0.0:8080/cocktail/${name}`,
        headers:{
       "Authorization": "Bearer " + window.localStorage.getItem("token"),
       "Access-Control-Allow-Origin" : "*",
       "Content-Type" :  "application/json",
        "cache-control": "no-cache",
        "Access-Control-Allow-Headers": "Origin, Content-Type, X-Auth-Token",
      }
      })
    .then(ret => (context.commit("setCocktail",ret.data)));
     },
     getRating(context, name ){
      axios({ 
       method:"get",
       url: `http://0.0.0.0:8080/rating/${name}`,
       headers:{
      "Authorization": "Bearer " + window.localStorage.getItem("token"),
      "Access-Control-Allow-Origin" : "*",
      "Content-Type" :  "application/json",
       "cache-control": "no-cache",
       "Access-Control-Allow-Headers": "Origin, Content-Type, X-Auth-Token",
     }
     })
   .then(ret => (context.commit("setRating",ret.data)));
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
        "Content-Type" :  "application/json",
          "cache-control": "no-cache",
          "Access-Control-Allow-Headers": "Origin, Content-Type, X-Auth-Token",

        },
       })
       .then(respond => (context.commit("setSignResult", respond.data)))
       .then()
     },
     sendLogin(context, loginForm){
       axios({
         method: "post",
         url: "http://0.0.0.0:8080/auth/login",
         data: loginForm,
         headers: {
          "Access-Control-Allow-Origin" : "*",
          "Access-Control-Allow-Methods": "DELETE, POST, GET, OPTIONS",
        "Content-Type" :  "application/json",
          "cache-control": "no-cache",
          "Authorization" : "Bearer " + window.localStorage.getItem("token"),
          "Access-Control-Allow-Headers": "Origin, Content-Type, X-Auth-Token",

        },
       })
       .then(respond => (context.commit("setToken", respond.data.token)));
     },
     getUserName(context, username){
      window.localStorage.setItem("username",username);
     },
     sendRating(context, rating){
      axios({
        method: "post",
        data: rating,
        url: `http://0.0.0.0:8080/cocktail/${rating.cocktailName}/${rating.rating}`,
        headers: {
         "Access-Control-Allow-Origin" : "*",
       "Content-Type" :  "application/json",
         "cache-control": "no-cache",
         "Authorization" : "Bearer " + window.localStorage.getItem("token"),
         "Access-Control-Allow-Headers": "Origin, Content-Type, X-Auth-Token",
       },
      })
      .then(respond => (context.commit("setRatingResult", respond.data)));
    },

  },
  
  modules: {}
});
