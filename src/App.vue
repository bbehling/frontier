<template>
  <div id="app">
    <article class="grid">
      <header class="grid">
        <div class="title-container">
          <h1>Coding Test</h1>
        </div>
      </header>
      <main class="content grid" id="home-content">
        <div class="content-title-container">
          <h2>Accounts</h2>
        </div>
        <section class="grid" id="account-grid">
          <section class="account-column grid" id="active-account-column">
            <div class="account-container-title" id="active-account-container-title">
              <h3>Active</h3>
            </div>
            <div class="account-container active-account">
              <ul
                class="account-data-list"
                v-for="account in activeAccounts"
                v-bind:key="account.id"
              >
                <li>
                  <label>Name:</label>
                  {{ account.LastName }}, {{ account.FirstName }}
                </li>
                <li>
                  <label>Email:</label>
                  {{ account.Email }}
                </li>
                <li>
                  <label>Phone Number:</label>
                  {{ account.PhoneNumber | phone }}
                </li>
                <li>
                  <label>Amount Due:</label>
                  {{ account.AmountDue | currency }}
                </li>
                <li>
                  <label>Due Date:</label>
                  {{ account.PaymentDueDate | moment("MM/DD/YYYY") }}
                </li>
              </ul>
            </div>
          </section>
          <section class="account-column grid" id="overdue-account-column">
            <div class="account-container-title" id="overdue-account-container-title">
              <h3>Overdue</h3>
            </div>
            <div class="account-container overdue-account">
              <ul
                class="account-data-list"
                v-for="account in overdueAccounts"
                v-bind:key="account.id"
              >
                <li>
                  <label>Name:</label>
                  {{ account.LastName }}, {{ account.FirstName }}
                </li>
                <li>
                  <label>Email:</label>
                  {{ account.Email }}
                </li>
                <li>
                  <label>Phone Number:</label>
                  {{ account.PhoneNumber | phone }}
                </li>
                <li>
                  <label>Amount Due:</label>
                  {{ account.AmountDue | currency }}
                </li>
                <li>
                  <label>Due Date:</label>
                  {{ account.PaymentDueDate | moment("MM/DD/YYYY") }}
                </li>
              </ul>
            </div>
          </section>
          <div class="account-column grid" id="inactive-account-column">
            <div class="account-container-title" id="inactive-account-container-title">
              <h3>Inactive</h3>
            </div>
            <div class="account-container inactive-account">
              <ul
                class="account-data-list"
                v-for="account in inactiveAccounts"
                v-bind:key="account.id"
              >
                <li>
                  <label>Name:</label>
                  {{ account.LastName }}, {{ account.FirstName }}
                </li>
                <li>
                  <label>Email:</label>
                  {{ account.Email }}
                </li>
                <li>
                  <label>Phone Number:</label>
                  {{ account.PhoneNumber | phone }}
                </li>
                <li>
                  <label>Amount Due:</label>
                  {{ account.AmountDue | currency }}
                </li>
                <li v-if="account.PaymentDueDate">
                  <label>Due Date:</label>
                  {{ account.PaymentDueDate | moment("MM/DD/YYYY") }}
                </li>
              </ul>
            </div>
          </div>
        </section>
      </main>
      <footer class="grid">
        <p class="copy">
          &copy;
          <!--Can't put script tag in Vue Template-->
          {{ copyrightYear }}
        </p>
      </footer>
    </article>
  </div>
</template>

<script lang="ts">
/*
  Allow parameters without declaring their type in tsconfig
  TypeScript types are not required for this demo
  TODO - fully utilize TypeScript by creating Account Class and Account Interface and implement type checking
  TODO - refactor active, overdue, inactive columns into three components
*/

import { Component, Vue } from "vue-property-decorator";
import axios from "axios";
import store from "@/store";

@Component({})
export default class App extends Vue {
  //set accounts to null to make it reactive
  accounts = null;
  copyrightYear = new Date().getFullYear();
  mounted() {
    this.$store
      .dispatch("fetchAccounts")
      .then(accounts => {
        this.accounts = accounts;
      })
      .catch(error => {
        // you got an error!
        console.log(error);
      });
  }

  // use computed values instead of adding filters to v-for
  // NOTE: linter suggests this is a best practice
  // TODO - determine if computed vars should go into vuex mutators
  // but since data is read only, probably not necessary

  get activeAccounts() {
    return (
      this.accounts &&
      this.accounts.filter(item => {
        return item.AccountStatusId === 0;
      })
    );
  }

  get overdueAccounts() {
    return (
      this.accounts &&
      this.accounts.filter(item => {
        return item.AccountStatusId === 2;
      })
    );
  }

  get inactiveAccounts() {
    return (
      this.accounts &&
      this.accounts.filter(item => {
        return item.AccountStatusId === 1;
      })
    );
  }
}
</script>

<style lang="scss">
html,
body {
  height: 100%;
  width: 100%;
  font-family: Roboto, Helvetica, Arial, sans-serif;
}
article {
  height: 100%;
  grid-template-columns: 1fr;
  grid-template-areas:
    "header"
    "main"
    "footer";
  grid-template-rows: 100px 1fr 150px;
}
header {
  grid-area: header;
  background-color: #006643;
  color: #fff;
  grid-template-columns: 1% 98% 1%;
}
h1 {
  font-size: 3em;
  font-weight: bold;
}
h2 {
  font-size: 2em;
  color: #006643;
}
h3 {
  display: block;
  font-size: 1.5em;
  color: #006643;
}
main {
  grid-area: main;
}
footer {
  grid-area: footer;
  background-color: #006643;
  color: #fff;
  grid-template-columns: 1% 98% 1%;
  grid-template-rows: 5% 90% 5%;
}
.grid {
  display: grid;
}
.title-container {
  grid-column-start: 2;
  align-self: center;
}
#home-content {
  grid-row-gap: 25px;
  grid-template-rows: 10px 100px auto;
}
#account-grid {
  grid-template-columns: 1fr 1fr 1fr;
  grid-row-start: 3;
}
.account-column {
  grid-template-rows: 2em repeat(2, 10em);
  overflow: auto;
  height: 100%;
}
.content-title-container {
  justify-self: center;
  height: 1em;
  grid-row-start: 2;
}
#overdue-account-container-title > h3 {
  color: #b22222;
}
#inactive-account-container-title > h3 {
  color: #808080;
}
.account-container {
  justify-self: center;
  height: 5em;
}
.account-container-title {
  justify-self: center;
}
.account-data-list {
  list-style: none;
}
.account-data-list > li {
  margin: 10px 0;
}
.account-data-list > li > label {
  font-weight: bold;
  margin: 0 5px 0 0;
}
.copy {
  place-self: end;
  grid-row-start: 2;
  grid-column-start: 2;
}
</style>
