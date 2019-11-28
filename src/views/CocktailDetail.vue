<template>
  <v-container fluid ma-0 pa-0 fill-height>
    <v-layout row>
      <v-flex md6>
        <v-simple-table dark height="600">
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
                <td>Ingredients</td>
                <td>
                  <ul id="example-2">
                    <li
                      style="white-space: nowrap;"
                      v-for="(k, v) in cocktail.ingredients"
                      v-bind:key="v"
                    >
                      <span class="ingredient ff">{{v}}</span>
                      <span class="ingredient ff">:</span>
                      <span class="ingredient" v-if="k !== 'null'">{{ k }}</span>
                      <span v-else class="ingredient">As You wish</span>
                    </li>
                  </ul>
                </td>
              </tr>
              <tr>
                <td>Rating:</td>
                <td v-if="this.$store.state.averageRating.sumRating == 0">No Ratings yet!</td>
                <td v-if="this.$store.state.averageRating.sumRating > 0">
                  <span class="display-1">{{averageRating.averageRating}}</span> from
                  <span class="display-1">{{averageRating.sumRating}}</span>vote
                </td>
              </tr>
            </tbody>
          </template>
        </v-simple-table>
      </v-flex>
      <v-flex md6>
        <v-img
          v-bind:src="imageURL"
          aspect-ratio="1"
          class="grey lighten-2"
          max-width="auto"
          max-height="600"
        ></v-img>
      </v-flex>
      <v-flex>
        <v-simple-table dark>
          <tbody>
            <tr>
              <td width="400%">
                <v-form align="center" ref="form" width="400">
                  <v-rating v-model="rating" background-color="#ff66c4" color="#ff66c4" medium></v-rating>
                  <v-btn color="#ff66c4" class="mr-2" @click="sendRating()">Rate</v-btn>
                  <v-text-field v-model="comment" label="Your Comment"></v-text-field>
                </v-form>
              </td>
            </tr>
            <tr>
              <td>Ratings and Comments:</td>
            </tr>
            <tr v-for="rating in ratings" :key="rating.ratingId">
              <td>
                <tbody>
                  <tr>
                    <td>{{rating.userName}}</td>
                    <td>at {{rating.date.year}}/{{rating.date.monthValue}}/{{rating.date.dayOfMonth}}</td>
                    <td>
                      <v-rating
                        :value="rating.rating"
                        background-color="#ff66c4"
                        color="#ff66c4"
                        small
                        readonly
                      ></v-rating>
                    </td>
                    <td>{{rating.comment}}</td>
                  </tr>
                </tbody>
              </td>
            </tr>
          </tbody>
        </v-simple-table>
      </v-flex>
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
    comment: ""
  }),
  mounted() {
    let currentUrl = window.location.pathname;
    let urlArr = currentUrl.split("/");
    let cocktailArr = urlArr[urlArr.length - 1].split("%20");
    let cocktail = "";
    for (let cocktailNamePart of cocktailArr) {
      cocktail += cocktailNamePart + " ";
    }
    cocktail = cocktail.substring(0, cocktail.length - 1);
    console.log(cocktail);
    this.$store.dispatch("getCocktailByName", cocktail);
    this.$store.dispatch("getRatings", cocktail);
    this.$store.dispatch("getAvgRating", cocktail);
    this.userName = window.localStorage.getItem("username");
  },

  computed: {
    cocktail() {
      return this.$store.state.cocktail;
    },
    imageURL() {
      return this.$store.state.cocktail.pictureURL;
    },
    averageRating() {
      return this.$store.state.averageRating;
    },
    ratings() {
      return this.$store.state.ratings;
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
      return result;
    },
    sendRating() {
      this.$store.dispatch("sendRating", {
        comment: this.comment,
        cocktailName: this.cocktail.name,
        rating: this.rating,
        userName: this.userName
      });
      console.log(this.userName, this.rating, this.cocktail.name, this.comment);
      this.$refs.form.reset();
      location.reload();
    }
  }
};
</script>

<style scoped>
span {
  color: #ff66c4;
}
.ingredient {
  color: white;
  padding-left: 1rem;
}
.ff {
  padding-left: 0.2rem !important;
}
</style>