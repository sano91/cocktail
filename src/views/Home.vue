<template>
  <v-container>
    <v-autocomplete label="Choose coktail" :items="cocktails" v-model="value" filled rounded></v-autocomplete>
    <v-btn justify-center @click="goTo">Check cocktail</v-btn>
  </v-container>
</template>

<script>
import axios from "axios";

export default {
  name: "home",
  data() {
    return {
      value: "",
};
  },
  components: {},
  methods: {
    goTo() {
      this.$router.push("/cocktail/" + this.value);
    },
    submit: function() {
      this.tempMessage = "";
    }
  },
 created() {
      this.$store.dispatch("getCocktailNames");
  },
  computed: {
    cocktails() {
      return this.$store.state.allCocktailNames;
    },
  }
};
</script>
