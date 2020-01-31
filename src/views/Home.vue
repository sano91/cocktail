<template>
  <div>
    <v-container>
      <v-autocomplete
        label="Choose coktail"
        :items="cocktails"
        v-model="value"
        filled
        rounded
      ></v-autocomplete>
      <v-btn justify-center @click="goTo">Check cocktail</v-btn>
    </v-container>
    <div class="cards">
      <v-card
        @click="goDetails(cocktail.name)"
        class="mx-auto"
        style="margin: 0.8rem !important"
        max-width="260"
        v-for="cocktail in namesAndPictures"
        :key="cocktail.name"
      >
        <v-img :src="cocktail.pictureUrl" height="200px"></v-img>
        <v-row justify="center">
          <v-card-title>{{ cocktail.name }}</v-card-title>
        </v-row>
        <v-card-actions>
          <v-spacer></v-spacer>
        </v-card-actions>
      </v-card>
    </div>
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
    namesAndPictures() {
      return this.$store.state.namesAndPictures;
    }
  }
};
</script>
<style scoped>
.cards {
  margin-left: 2%;
}

.mx-auto {
  display: inline-block;
  opacity: 0.8;
  transition: opacity ease-out;
}
.mx-auto:hover {
  opacity: 1;
}
</style>
