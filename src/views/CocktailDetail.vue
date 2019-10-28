<template>
  <v-simple-table dark>
    <template>
      <tbody>
        <tr>
          <td>name</td>
          <td>{{cocktail.name}}</td>
        </tr>
        <tr>
        <td>Cocktail Type</td>
        <td>{{cocktail.type}}</td>
        </tr>
        <tr>
        <td>Cocktail Category</td>
        <td>{{cocktail.category}}</td>
        </tr>
        <tr>
        <td>Alcohol Content</td>
        <td>{{cocktail.alcoholContent}}</td>
        </tr>
        <tr>
        <td>Glass type</td>
        <td>{{cocktail.glassType}}</td>
        </tr>
         <tr>
        <td>Recipe</td>
        <td>{{cocktail.recipe}}</td>
        </tr>
        <tr>
        <td>ingredients</td>
        <td>{{cocktail.ingredients}}</td>
        </tr>
      </tbody>
    </template>
  </v-simple-table>
  
</template>

<script>
import axios from "axios";
  
  export default {
    name: "coctailDetails",
    computed: {
      cocktail() {
        return this.$store.state.cocktail
      }
    },
    
   
    
  }
</script>
