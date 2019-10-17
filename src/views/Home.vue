<template>
  <v-container>
    <v-autocomplete
      label="Test custom filters"
      :items="cocktails"
      v-model="value"
      filled
      rounded
    ></v-autocomplete>
    <v-btn @click="goTo">Mennnye</v-btn>
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
    }
  },
  created() {
    axios
      .get("http://0.0.0.0:8080")
      .then(ret => (this.cocktails = ret.data.map(r => r.name)));
  }
};
</script>
