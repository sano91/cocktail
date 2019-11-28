<template>
  <v-form ref="form" v-model="valid" lazy-validation>
    <v-text-field v-model="name" :counter="20" :rules="nameRules" label="Name" required></v-text-field>

    <v-text-field v-model="email" :rules="emailRules" label="E-mail" required></v-text-field>

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

    <v-checkbox
      v-model="checkbox"
      :rules="[v => !!v || 'You must agree to continue!']"
      label="Accept terms and condition?"
      required
    ></v-checkbox>

    <v-btn @click="signBtnFunc" :disabled="!valid" color="success" class="mr-4">Sign in</v-btn>

    <v-btn color="error" class="mr-4" @click="reset">Reset Form</v-btn>
    <v-dialog v-model="dialog" max-width="290">
      <v-card>
        <v-card-title class="headline" wrap>Registration fail</v-card-title>

        <v-card-text wrap>Name was taken, please try sign-up with different name.</v-card-text>

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
    email: "",
    emailRules: [
      v => !!v || "E-mail is required",
      v => /.+@.+\..+/.test(v) || "E-mail must be valid"
    ],

    checkbox: false,
    lazy: false
  }),
  computed: {
    signResult() {
      return this.$store.state.signResult;
    }
  },
  methods: {
    reset() {
      this.$refs.form.reset();
    },
    signBtnFunc() {
      if (this.$refs.form.validate()) {
        this.snackbar = true;
      }
      //console.log("before push");
      //this.$router.push("/sign/sign-in-result");
      //console.log("after push");

      this.$store.dispatch("sendSignIn", {
        name: this.name,
        mail: this.email,
        password: this.password
      });
      this.$nextTick(function() {
        if (this.signResult) {
          this.$router.push("/login");
        } else {  
          this.dialog = true;
        }
      });
    }
  }
};
</script>
