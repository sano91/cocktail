<template>

<v-container fluid ma-0 pa-0 fill-height>
        <v-layout row>
          <v-flex xs4><v-simple-table dark >
    <template>
      <tbody>
        <tr>
          <td>Name</td>
          <td>{{ cocktail.name }}</td>
        </tr>
        <tr v-if="hasType">
          <td>Cocktail Type</td>
          <td>{{ cocktail.type }}</td>
        </tr>
        <tr>
          <td>Cocktail Category</td>
          <td>{{ cocktail.category }}</td>
        </tr>
        <tr>
          <td>Alcohol Content</td>
          <td>{{ cocktail.alcoholContent }}</td>
        </tr>
        <tr>
          <td>Glass type</td>
          <td>{{ cocktail.glassType }}</td>
        </tr>
        <tr>
          <td>Recipe</td>
          <td>{{ cocktail.recipe }}</td>
        </tr>
        
      </tbody>
      
      <ul id="example-2" >
        
        <li style="white-space: nowrap;" v-for="(k, v) in cocktail.ingredients" v-bind:key="v">
        {{v}} : {{ k }}
        </li>
      </ul>
    </template>
  </v-simple-table></v-flex>
          <v-flex xl4><v-img
        v-bind:src="imageURL"
        aspect-ratio="1"
        class="grey lighten-2"
        max-width="auto"
        max-height="auto"
      ></v-img></v-flex>
          <!-- <v-flex xs4> User Profile</v-flex> -->
        </v-layout>
      </v-container>
  
</template>

<script>
import axios from "axios";

export default {
 
  name: "coctailDetails",
  computed: {
    cocktail() {
      return this.$store.state.cocktail;
    },
    hasType(){
      let result;
      if(this.$store.state.cocktail.type !== "null" ){
        
        result = true;
      }
      else{
        result = false;
      }
      console.log("result: " + result);
      console.log(this.$store.state.cocktail.type);

      return result;
    
  },
    imageURL() {
      return this.$store.state.cocktail.pictureURL;
    }
  },
  method:{}
    
};
</script>
