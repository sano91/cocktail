<template>
<div>
  <v-container>
    <v-autocomplete label="Choose coktail" :items="cocktails" v-model="value" filled rounded></v-autocomplete>
    <v-btn justify-center @click="goTo">Check cocktail</v-btn>
  </v-container>
      <v-card
        @click="goDetails(cocktail.name)"
        class="mx-auto"
        max-width="240"
        v-for="cocktail in namesAndPictures"
        :key="cocktail.name"
      >
        <v-img :src="cocktail.pictureUrl" height="200px"></v-img>
        <v-card-title>{{cocktail.name}}</v-card-title>
        <v-card-actions>
          <v-spacer></v-spacer>
        </v-card-actions>
      </v-card>
    </div>
</template>

<script>
import axios from "axios";

export default {
  name: "home",
  data() {
    return {
      value: ""
    };
  },
  components: {},
  methods: {
    goTo() {
      this.$router.push("/cocktail/" + this.value);
    },
     goDetails(name) {
      this.$router.push(`/cocktail/` + name);
    },
    submit: function() {
      this.tempMessage = "";
    }
  },
  created() {
    this.$store.dispatch("getCocktailNames");
   this.$store.dispatch("getNamesAndPictures");
  },
  computed: {
    cocktails() {
      return this.$store.state.allCocktailNames;
    },
    namesAndPictures(){
      return this.$store.state.namesAndPictures;
    }
  }
};
</script>
<style scoped>
.mx-auto {
  display: inline-block;
  margin: 1rem !important;
}
</style>
