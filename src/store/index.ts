import Vue from "vue";
import Vuex from "vuex";
import axios from "axios";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    cocktail: {},
    loginResult: false,
    signResult: false,
    userName: "",
    ratingResult: false,
    ratings: [],
    averageRating: {},
    allCocktailNames: [],
    ingredientCocktails: [],
    namesAndPictures: []
  },
  mutations: {
    setCocktailNames(state, names) {
      state.allCocktailNames = names;
    },
    setCocktail(state, cocktail) {
      state.cocktail = cocktail;
    },
    setSignResult(state, result) {
      state.signResult = result;
    },
    setToken(state, token) {
      if(token.localeCompare("bad login") !== 0){
        window.localStorage.setItem("token", token);
        state.loginResult = true;
      }
      else{
        state.loginResult = false;
      }
      
    },
    setUser(state, user) {
      state.userName = user;
    },
    setRatingResult(state, ratingResult) {
      state.ratingResult = ratingResult;
    },
    setRatings(state, ratings) {
      console.log("Rts: " + ratings);

      state.ratings = ratings;
      console.log("Rts: " + state.ratings);
    },
    setAverageRating(state, rating) {
      state.averageRating = rating;
    },
    setIngredientCocktails(state, cocktails) {
      console.log("This one is filtered ingredients cocktails: " + cocktails);
      state.ingredientCocktails = cocktails;
    },
    setNamesAndPicturs(state, namesAndPics) {
      state.namesAndPictures = namesAndPics;
    },
    setLogout(state){
      state.userName = "";
    }
  },
  actions: {
    getCocktailNames(context) {
      axios({
        method: "get",
        url: "http://0.0.0.0:8080 ",
        headers: {
          Authorization: "Bearer " + window.localStorage.getItem("token"),
          "Access-Control-Allow-Origin": "*",
          "Content-Type": "application/json",
          "cache-control": "no-cache",
          "Access-Control-Allow-Headers": "Origin, Content-Type, X-Auth-Token"
        }
      }).then(ret => context.commit("setCocktailNames", ret.data));
    },
    getNamesAndPictures(context) {
      axios({
        method: "get",
        url: "http://0.0.0.0:8080/names-pictures",
        headers: {
          Authorization: "Bearer " + window.localStorage.getItem("token"),
          "Access-Control-Allow-Origin": "*",
          "Content-Type": "application/json",
          "cache-control": "no-cache",
          "Access-Control-Allow-Headers": "Origin, Content-Type, X-Auth-Token"
        }
      }).then(ret => context.commit("setNamesAndPicturs", ret.data));
    },
    getCocktailByName(context, name) {
      axios({
        method: "get",
        url: `http://0.0.0.0:8080/cocktail/${name}`,
        headers: {
          Authorization: "Bearer " + window.localStorage.getItem("token"),
          "Access-Control-Allow-Origin": "*",
          "Content-Type": "application/json",
          "cache-control": "no-cache",
          "Access-Control-Allow-Headers": "Origin, Content-Type, X-Auth-Token"
        }
      }).then(ret => context.commit("setCocktail", ret.data));
    },
    getRatings(context, name) {
      return axios({
        method: "get",
        url: `http://0.0.0.0:8080/ratings/${name}`,
        headers: {
          Authorization: "Bearer " + window.localStorage.getItem("token"),
          "Access-Control-Allow-Origin": "*",
          "Content-Type": "application/json",
          "cache-control": "no-cache",
          "Access-Control-Allow-Headers": "Origin, Content-Type, X-Auth-Token"
        }
      }).then(ret => context.commit("setRatings", ret.data)).catch(err => {
        console.log(err)
      });
    },
    getAvgRating(context, name) {
      return axios({
        method: "get",
        url: `http://0.0.0.0:8080/avgrating/${name}`,
        headers: {
          Authorization: "Bearer " + window.localStorage.getItem("token"),
          "Access-Control-Allow-Origin": "*",
          "Content-Type": "application/json",
          "cache-control": "no-cache",
          "Access-Control-Allow-Headers": "Origin, Content-Type, X-Auth-Token"
        }
      }).then(ret => context.commit("setAverageRating", ret.data)).catch(err => {
        console.log(err)
      });
    },
    sendSignIn(context, signForm) {
      console.log(signForm);
      return axios({
        method: "post",
        url: "http://0.0.0.0:8080/auth/signin",
        data: signForm,
        headers: {
          "Access-Control-Allow-Origin": "*",
          "Access-Control-Allow-Methods": "DELETE, POST, GET, OPTIONS",
          "Content-Type": "application/json",
          "cache-control": "no-cache",
          "Access-Control-Allow-Headers": "Origin, Content-Type, X-Auth-Token"
        }
      }).then(respond => context.commit("setSignResult", respond.data));
    },
    sendLogin(context, loginForm) {
      return axios({
        method: "post",
        url: "http://0.0.0.0:8080/auth/login",
        data: loginForm,
        headers: {
          "Access-Control-Allow-Origin": "*",
          "Access-Control-Allow-Methods": "DELETE, POST, GET, OPTIONS",
          "Content-Type": "application/json",
          "cache-control": "no-cache",
          Authorization: "Bearer " + window.localStorage.getItem("token"),
          "Access-Control-Allow-Headers": "Origin, Content-Type, X-Auth-Token"
        }
      })
        .then(respond => context.commit("setToken", respond.data.token))
        
    },
    getUserName(context, username) {
      context.commit("setUser", username);
    },
    sendRating(context, rating) {
      return axios({
        method: "post",
        data: rating,
        url: `http://0.0.0.0:8080/newrating/${rating.cocktailName}`,
        headers: {
          "Access-Control-Allow-Origin": "*",
          "Content-Type": "application/json",
          "cache-control": "no-cache",
          Authorization: "Bearer " + window.localStorage.getItem("token"),
          "Access-Control-Allow-Headers": "Origin, Content-Type, X-Auth-Token"
        }
      }).then(respond => context.commit("setRatingResult", respond.data)).catch(err => {
        console.log(err)
      });
    },
    getIngredientsCocktails(context, ingredients) {
      axios({
        method: "post",
        data: ingredients,
        url: "http://0.0.0.0:8080/filter",
        headers: {
          "Access-Control-Allow-Origin": "*",
          "Content-Type": "application/json",
          "cache-control": "no-cache",
          Authorization: "Bearer " + window.localStorage.getItem("token"),
          "Access-Control-Allow-Headers": "Origin, Content-Type, X-Auth-Token"
        }
      }).then(respond =>
        context.commit("setIngredientCocktails", respond.data)
      );
    },
    logout(context){
      context.commit("setLogout");
    }
  },

  modules: {}
});
