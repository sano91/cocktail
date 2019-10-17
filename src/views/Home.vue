<template>
  <v-container>
    <v-autocomplete
      label="Test custom filters"
      :items="states"
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
      states: []
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
      .get("https://jsonplaceholder.typicode.com/albums")
      .then(ret => (this.states = ret.data.map(r => r.title)));
  }
};
</script>
