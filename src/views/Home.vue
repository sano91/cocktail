<template>
  <v-container>
    <v-autocomplete
      label="Choose coktail"
      :items="cocktails"
      v-model="value"
      filled
      rounded
    ></v-autocomplete>
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
    },
     submit: function() {
      
      this.tempMessage = "";
    }
  },
  created() {
    axios
      ({
        method: "get",
         url: `http://0.0.0.0:8080`,
         headers: {
          "Access-Control-Allow-Origin" : "*",
           "Access-Control-Allow-Methods": "DELETE, POST, GET, OPTIONS",
        "Access-Control-Allow-Headers": "Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With",
          "Content-Type" :  "application/json",
            "cache-control": "no-cache",
            "Authorization": "Bearer " + window.localStorage.getItem("token")
         }
      })
      .then(ret => (this.cocktails = ret.data.map(r => r.name)));
  }
};
</script>
