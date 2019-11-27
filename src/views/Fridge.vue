<template >
  <v-container>
    <v-autocomplete
      @change="addToList"
      label="Add ingredient"
      :items="ingredients"
      v-model="value"
      filled
      rounded
    ></v-autocomplete>
    <div
      class="ingredient"
      @click="deleteIngredient(ingredient)"
      v-for="ingredient in choosedIngredients"
      :key="ingredient"
    >{{ingredient}}</div>
    <div>
      <v-card
        @click="goDetailes(cocktail.name)"
        class="mx-auto"
        max-width="240"
        v-for="cocktail in choosedCocktails"
        :key="cocktail.name"
      >
        <v-img :src="cocktail.url" height="200px"></v-img>
        <v-card-title>{{cocktail.name}}</v-card-title>
        <v-card-subtitle>{{cocktail.alcoholContent}}</v-card-subtitle>
        <v-card-actions>
          <v-spacer></v-spacer>
        </v-card-actions>
      </v-card>
    </div>
  </v-container>
</template>
<script>
import axios from "axios";

export default {
  name: "fridge",
  data() {
    return {
      value: "",
      ingredients: [],
      choosedIngredients: []
    };
  },

  components: {},
  computed: {
    choosedCocktails() {
      console.log(this.$store.state.ingredientCocktails);
      return this.$store.state.ingredientCocktails;
    }
  },
  methods: {
    goDetailes(name) {
      this.$router.push(`/cocktail/` + name);
    },
    addToList() {
      this.choosedIngredients.push(this.value);
      this.$store.dispatch("getIngredientsCocktails", {
        ingredients: this.choosedIngredients
      });
    },
    deleteIngredient(ing) {
      var index = this.choosedIngredients.indexOf(ing);
      if (index > -1) {
        this.choosedIngredients.splice(index, 1);
      }
      if (this.choosedIngredients.length > 0) {
        this.$store.dispatch("getIngredientsCocktails", {
          ingredients: this.choosedIngredients
        });
      }
    }
  },

  created() {
    axios({
      method: "GET",
      url: "http://0.0.0.0:8080/all-ingredients",
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "DELETE, POST, GET, OPTIONS",
        "Access-Control-Allow-Headers": "*",
        "Content-Type": "application/json",
        "cache-control": "no-cache",
        Authorization: "Bearer " + window.localStorage.getItem("token"),
        "Access-Control-Allow-Credentials": "true"
      }
    }).then(ret => (this.ingredients = ret.data));
  }
};
</script>
<style scoped>
.ingredient {
  display: inline-block;
  font-weight: 300;
  color: sandybrown;
  margin-right: 1rem;
  margin-left: 1rem;
  cursor: pointer;
  transition: color 0.2s ease-in-out;
}
.ingredient:hover {
  color: red;
}

.mx-auto {
  display: inline-block;
  margin: 1rem !important;
}
</style>