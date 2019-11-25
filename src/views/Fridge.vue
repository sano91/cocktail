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
    <div>
      <div
        @click="deleteIngredient(ingredient)"
        v-for="ingredient in choosedIngredients"
        :key="ingredient"
      >{{ingredient}}</div>
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
  methods: {
    addToList() {
      this.choosedIngredients.push(this.value);
    },
    deleteIngredient(ing) {
      alert(ing);
      var index = this.choosedIngredients.indexOf(ing);
      if (index > -1) {
        this.choosedIngredients.splice(index);
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