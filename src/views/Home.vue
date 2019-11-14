<template>
  <v-container>
    <v-autocomplete label="Choose coktail" :items="cocktails" v-model="value" filled rounded></v-autocomplete>
    <v-btn @click="goTo">Check cocktail</v-btn>
  </v-container>
</template>

<script>
import axios from "axios";

export default {
  name: "home",
  data() {
    return {
      value: "",
      cocktails: []
    };
  },
  components: {},
  methods: {
    goTo() {
      this.$router.push("/cocktail/" + this.value);
      this.$store.dispatch("getCocktailByName", this.value);
      this.$store.dispatch("getRating", this.value);
    },
    submit: function() {
      this.tempMessage = "";
    }
  },
  created() {
    axios({
      method: "GET",
      url: "http://0.0.0.0:8080",
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "DELETE, POST, GET, OPTIONS",
        "Access-Control-Allow-Headers": "*",
        "Content-Type": "application/json",
        "cache-control": "no-cache",
        Authorization: "Bearer " + window.localStorage.getItem("token"),
        "Access-Control-Allow-Credentials": "true"
      }
    }).then(ret => (this.cocktails = ret.data.map(r => r.name)));
  }
};
</script>
