<template>
  <v-simple-table dark>
    <template>
      <tbody>
        <tr>
          <td>name</td>
          <td>Pina Colada</td>
        </tr>
        <tr>
        <td>Cocktail Type</td>
        <td>Long drink</td>
        </tr>
        <tr>
        <td>Cocktail Category</td>
        <td>gay/ladies</td>
        </tr>
        <tr>
        <td>Alcohol Content</td>
        <td>Alcoholic</td>
        </tr>
        <tr>
        <td>Glass type</td>
        <td>Hurricane</td>
        </tr>
        <tr>
        <td>Cocktail Type</td>
        <td>Long drink</td>
        </tr>
        <tr>
        <td>Recipe</td>
        <td>brfbfnrfnq furh rhvih fihfiahfifi ahifhasihafhuasfash hgash uihsh if</td>
        </tr>
        <tr>
        <td>ingredients</td>
        <td>vodka 40ml</td>
        </tr>
      </tbody>
    </template>
  </v-simple-table>
</template>

<script>
  export default {
    data () {
      return {
       cocktail,
      }
    },
    created() {
    axios
      .get(`http://0.0.0.0:8080/cocktail/${cocktailname}`)
      .then(ret => (this.cocktails = ret.data));
  }  }
</script>
