<template>

<v-container fluid ma-0 pa-0 fill-height>
        <v-layout row>
          <v-flex md6><v-simple-table dark >
    <template width="400">
      <tbody width="300">
        <tr>
          <td>Name</td>
          <td>{{ cocktail.name }}</td>
        </tr>
        <tr v-if="cocktail.type !== null">
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
        <tr>
          <td>Ingredients </td>
      <td>
      <ul id="example-2" >
        <li style="white-space: nowrap;" v-for="(k, v) in cocktail.ingredients" v-bind:key="v">
        {{v}} : {{ k }}
        </li>
      </ul>
      </td>
      </tr>
      <tr>
          <td>Rating: <span class=" pink--text display-1" >{{averageRating}}</span>from{{getRating.ratingCount}} vote</td>
        </tr>
        <tr>
          <td width="400%">
         <v-form align="center" ref="form" width="400">
           <v-rating
      v-model="rating"
      background-color="pink lighten-3"
      color="pink"
      medium 
    ></v-rating>
            <v-btn
            color="pink"
            class="mr-2"
            @click="sendRating()"
          >Rate</v-btn>
              <v-text-field v-model="comment" label="Your Comment" ></v-text-field>
             </v-form>
             </td>
             </tr>
             </tbody>
    </template>
  </v-simple-table></v-flex>
          <v-flex xl4><v-img
        v-bind:src="imageURL"
        aspect-ratio="1"
        class="grey lighten-2"
        max-width="auto"
        max-height="600"
      ></v-img>
          <tbody>
        <tr>
          <td v-for="rating in ratings" :key="rating.id">{{rating.comment}}</td>
        </tr>
      </tbody>
      </v-flex>
     
          <!-- <v-flex xs4> User Profile</v-flex> -->
        </v-layout>
      </v-container>
  
</template>

<script>
import axios from "axios";

export default {
  name: "coctailDetails",
  data: () => ({
    rating: 1,
    cocktailName: " ",
    userName: " ",
  }),
  created() {
    this.userName = window.localStorage.getItem("username");
  },
  computed: {
    cocktail() {
      return this.$store.state.cocktail;
    },
    imageURL() {
      return this.$store.state.cocktail.pictureURL;
    },
    ratings() {
      return this.$store.state.ratings;
    },
    averageRating(){
        return this.$store.state.avgRating;
    }
  },
  methods: {
    hasType() {
      let result;
      if (this.$store.state.cocktail.type !== "null") {
        result = true;
      } else {
        result = false;
      }
      console.log("result: " + result);
      console.log(this.$store.state.cocktail.type);

      return result;
    },
    sendRating(){
      this.$store.dispatch("sendRating" ,{
        comment : this.comment,
        cocktailName: this.cocktail.name,
        rating : this.rating,
        userName : this.userName
      })
    }
  },
  method: {}
};
</script>
