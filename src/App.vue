<template>
  <v-app id="inspire">
    <v-navigation-drawer v-model="drawer" app clipped>
      <v-list dense>
        <v-img src="../src/assets/realLogo.png" max-height="80" aspect-ratio="1" max-width="auto"></v-img>
        <v-list-item v-for="item in items" :key="item.text">
          <v-btn @click="gotoFilter" absolute color="transparent" depressed>
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

    <v-app-bar app clipped-left color="pink" dense>
      <v-app-bar-nav-icon @click.stop="drawer = !drawer"></v-app-bar-nav-icon>
      <v-icon class="mx-4">fab fa-youtube</v-icon>
      <v-toolbar-title class="mr-12 align-center">
        <span class="title">Welcome {{username}}</span>
      </v-toolbar-title>
      <v-spacer></v-spacer>
      <v-btn @click="signInForm" text large to="/sign-in">Sign up</v-btn>
      <v-btn @click="loginForm" text large to="/login">Login</v-btn>
      <v-btn text large to="/">Home</v-btn>
      <v-btn text large to="/about">About</v-btn>
      <v-btn @click="logout" text large>Log out</v-btn>
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
      { icon: "mdi-fridge-outline", text: "Check Fridge" },
      { icon: "mdi-glass-cocktail", text: "Add Cocktail" }
    ],
    items2: []
  }),
  username: "",
  created() {
    this.$vuetify.theme.dark = true;
    this.username = window.localStorage.getItem("username");
  },
  computed: {
    user() {
      return this.$store.state.user;
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
    gotoFilter() {
      this.$router.push("/fridge");
    },
    logout() {
      window.localStorage.removeItem("token");
      window.localStorage.removeItem("username");
      location.reload();
    }
  }
};
</script>
