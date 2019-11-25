<template>
  <v-container @changing="addTolist">
    <v-autocomplete
      @change="$emit('changing', value)"
      label="Add ingredient"
      :items="ingredients"
      v-model="value"
      filled
      rounded
    ></v-autocomplete>
    <div>
      <span v-for="ingredient in choosedIngredients" :key="ingredient">{{ingredient}}</span>
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
    addToList(value) {
      this.choosedIngredients.push(value);
    },
    changing(value) {
      console.log(value);
      addToList(value);
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