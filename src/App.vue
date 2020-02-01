<template>
  <v-app id="inspire">
    <div v-if="userNameInStorage() === true">
      <v-navigation-drawer v-model="drawer" app clipped>
        <v-list dense>
          <v-img src="../src/assets/realreal.png" max-height="80" aspect-ratio="1" max-width="auto"></v-img>
          <v-list-item v-for="item in items" :key="item.text">
            <v-btn @click="gotoRoute(item.route)" absolute color="transparent" depressed>
              <v-list-item-action>
                <v-icon>{{ item.icon }}</v-icon>
              </v-list-item-action>
              <v-list-item-content>
                <v-list-item-title>{{ item.text }}</v-list-item-title>
              </v-list-item-content>
            </v-btn>
          </v-list-item>
          <v-list>
            <v-list-item v-for="item in items2" :key="item.text">
              <v-list-item-avatar></v-list-item-avatar>
              <v-list-item-title v-text="item.text"></v-list-item-title>
            </v-list-item>
          </v-list>
        </v-list>
      </v-navigation-drawer>
    </div>

    <v-app-bar app clipped-left color="#ff66c4" dense>
      <v-app-bar-nav-icon @click.stop="drawer = !drawer"></v-app-bar-nav-icon>
      <v-icon class="mx-4">fab fa-youtube</v-icon>
      <v-toolbar-title class="mr-12 align-center">
        <div v-if="userNameInStorage() === true">
          <span id="welcome" class="title">Welcome {{ user }}</span>
        </div>
        <div v-if="userNameInStorage() === false">
          <span>You have to Log in to use Cocktail Party</span>
        </div>
      </v-toolbar-title>
      <v-spacer></v-spacer>
      <div v-if="userNameInStorage() === true">
        <v-btn text large to="/">Home</v-btn>
        <v-btn text large to="/about">About</v-btn>
        <v-btn @click="logout" text large>Log out</v-btn>
      </div>
      <div v-if="userNameInStorage() === false">
        <v-btn @click="signInForm" text large to="/sign-in">Sign up</v-btn>
        <v-btn @click="loginForm" text large to="/login">Login</v-btn>
      </div>
    </v-app-bar>
    <v-content>
      <router-view />
    </v-content>
  </v-app>
</template>

<script>
import home from "./views/Home";

export default {
  name: "App",
  components: {},
  props: {
    source: String
  },
  data: () => ({
    drawer: null,
    items: [
      { icon: "mdi-fridge-outline", text: "Check Fridge", route: "fridge" },
      {
        icon: "mdi-glass-cocktail",
        text: "Add Cocktail",
        route: "addCocktail"
      },
      { icon: "mdi-account", text: "Account" },
      { icon: "mdi-flask-outline", text: "Lab" },
      { icon: "mdi-youtube-tv", text: "Videos" },
      { icon: "mdi-charity", text: "Charity" }
    ],
    items2: []
  }),

  created() {
    this.$vuetify.theme.dark = true;
    // this.username = this.$store.state.userName;
  },
  computed: {
    user() {
      return this.$store.state.userName;
    }
  },
  methods: {
    updateMessage(variable) {
      this.childData = variable;
    },
    signInForm() {
      this.$router.push("/sign-in");
    },
    loginForm() {
      this.$router.push("/login");
    },
    gotoRoute(route) {
      this.$router.push("/" + route);
    },
    logout() {
      window.localStorage.removeItem("token");
      // window.localStorage.removeItem("username");
      this.$store.dispatch("logout");
      this.$nextTick();
      this.$router.push("/login");
    },
    userNameInStorage() {
      if (this.$store.state.userName === "") {
        return false;
      } else {
        return true;
      }
    }
  }
};
</script>
<style scoped>
#welcome {
  font-family: "Lucida Sans", "Lucida Sans Regular", "Lucida Grande",
    "Lucida Sans Unicode", Geneva, Verdana, sans-serif !important;
  letter-spacing: 0.3rem !important;
}
</style>
