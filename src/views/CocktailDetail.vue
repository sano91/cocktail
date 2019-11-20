<template>

<v-container fluid ma-0 pa-0 fill-height>
        <v-layout row >
          <v-flex md6><v-simple-table dark >
    <template width="400">
      <tbody width="300">
        <tr>
          <td>Name</td>
          <td>{{ cocktail.name }}</td>
        </tr>
        <tr v-if="cocktail.type !== 'null' ">
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
          <td>Rating: <span class=" pink--text display-1" >{{averageRating}}</span>from vote</td>
        </tr>
       </tbody>
    </template>
  </v-simple-table></v-flex>
          <v-flex md6 ><v-img
        v-bind:src="imageURL"
        aspect-ratio="1"
        class="grey lighten-2"
        max-width="auto"
        max-height="600"
      ></v-img>
      </v-flex>
       <v-flex ><v-simple-table dark >
       <tbody>
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
             <tr>
             <td>Ratings and Comments:</td>
             </tr>
             <tr v-for="rating in ratings" :key="rating.ratingId">
               <td>
                    <tbody >
                      <tr >
                        <td> {{rating.userName}}</td>
                         <td>at {{rating.date.year}}/{{rating.date.monthValue}}/{{rating.date.dayOfMonth}}</td>
                        <td>  <v-rating
                        :value="rating.rating"
      background-color="pink lighten-3"
      color="pink"
      small 
      readonly></v-rating>  </td>
     <td>{{rating.comment}}</td>
                      </tr >
                    </tbody>
               </td>
             </tr>
       </tbody>
        </v-simple-table></v-flex>
             </v-layout>
      </v-container>
</template>

<script>
import axios from "axios";

export default {
  name: "coctailDetails",
  data: () => ({
    rating: 1,
    userName: " ",
    averageRating: " ",
  }),
  created() {
    this.userName = window.localStorage.getItem("username");
    this.$store.dispatch('getAvgRatings',cocktail.name);
    this.averageRating = this.$store.state.averageRating;
  },
  computed: {
    cocktail() {
      return this.$store.state.cocktail;
    },
    imageURL() {
      return this.$store.state.cocktail.pictureURL;
    },
    averageRating(){  
      return this.$store.state.averageRating;
    },  
    ratings() {
      return this.$store.state.ratings;
  },
  },
  methods: {
    hasType() {
      let result;
      if (this.$store.state.cocktail.type !== "null") {
        result = true;
      } else {
        result = false;
      }
      return result;
    },
    sendRating(){
      this.$store.dispatch("sendRating" ,{
        comment : this.comment,
        cocktailName: this.cocktail.name,
        rating : this.rating,
        userName : this.userName
      })
      //this.$refs.form.reset()
      //location.reload();
    }
  },
};
</script>

