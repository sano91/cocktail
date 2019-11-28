<template>
  <v-form ref="form" v-model="valid" lazy-validation>
    <v-text-field v-model="name" :counter="20" :rules="nameRules" label="Name" required></v-text-field>

    <v-text-field
      v-model="password"
      :append-icon="show1 ? items[0].icon1 : items[1].icon2"
      :rules="[rules.required, rules.min]"
      :type="show1 ? 'text' : 'password'"
      name="input-10-1"
      label="Password"
      hint="At least 8 characters"
      counter
      @click:append="show1 = !show1"
      required
    ></v-text-field>

    <v-btn @click="loginBtnFunc" :disabled="!valid" color="success" class="mr-4">Login</v-btn>
    <v-dialog v-model="dialog" max-width="290">
      <v-card>
        <v-card-title class="headline" wrap>Login failed</v-card-title>

        <v-card-text wrap>Name or password incorrect</v-card-text>

        <v-card-actions>
          <v-spacer></v-spacer>

          <v-btn color="green darken-1" text @click="dialog = false">Ok</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-form>
</template>

<script>
import { mdiEyeOffOutline, mdiEyeOutline } from "@mdi/js";

export default {
  name: "sign",
  data: () => ({
    show1: false,
    dialog: false,
    valid: true,
    items: [
      { icon1: "mdi-eye-off-outline", text: "visibility_off" },
      { icon2: "mdi-eye-outline", text: "visibility" }
    ],

    // form: {
    //   name: this. name,
    //   email: this.email,
    //   password: this.password,
    // },

    password: "",
    rules: {
      required: value => !!value || "Required.",
      min: v => v.length >= 8 || "Min 8 characters",
      emailMatch: () => "The email and password you entered don't match"
    },
    name: "",
    nameRules: [
      v => !!v || "Name is required",
      v => (v && v.length <= 20) || "Name must be less than 20 characters"
    ],

    lazy: false
  }),
  methods: {
    loginBtnFunc() {
      this.$store.dispatch("getUserName", this.name);
      this.$store.dispatch("sendLogin", {
        username: this.name,
        password: this.password
      });
      window.localStorage.setItem("token");
    }
  }
};
</script>