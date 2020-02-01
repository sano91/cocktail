<template>
  <v-container grid-list-md text-xl-center>
    <v-layout row wrap>
      <v-flex>
        <v-img
          id="aboutpicture"
          src="https://i.imgur.com/7f8Hy7i.png"
          max-width="auto"
          max-height="auto"
          aspect-ratio="1.5"
        ></v-img>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
export default {
  name: "about"
};
</script>
<style  scoped>
#aboutpicture {
  background-position-y: top !important;
}
</style>
