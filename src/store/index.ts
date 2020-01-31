import Vue from "vue";
import Vuex from "vuex";
import axios from "axios";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    cocktail: {},
    signResult: false,
    user: " ",
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
      window.localStorage.setItem("token", token);
    },
    setUser(state, user) {
      state.user = user;
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
      axios({
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
      axios({
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
        .finally(() => (window.location.href = "/"));
    },
    getUserName(context, username) {
      window.localStorage.setItem("username", username);
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
    }
  },

  modules: {}
});
