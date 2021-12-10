import "./styles.css";
import { observable, autorun, computed, reaction, action } from "mobx";

// Store in mobx === observable state

class MyStore {
  // ---State---
  @observable
  firstName: string = "ABC";

  @observable
  lastName: string = "XYZ";

  @computed
  get fullName() {
    return `${this.firstName} ${this.lastName}`;
  }

  // ---Actions (Functions that will mutate state)
  @action
  setFirstName = (firstName: string) => {
    this.firstName = firstName;
  };

  @action
  setLastName = (lastName: string) => {
    this.lastName = lastName;
  };
}

const state = new MyStore();

//TODO: Write reactions/autorun
// Effect Function
const autoRunEffect = function () {
  console.log(`Autorun: ${state.firstName} ${new Date().toLocaleTimeString()}`);
  console.log(`Autorun: ${state.lastName} ${new Date().toLocaleTimeString()}`);
};

// Will be executed once initially.
// Later state changes will trigger autorun to execute effect function
autorun(autoRunEffect);

// const dataFn = () => [state.firstName, state.lastName];
// const effectFn = ([firstName, lastName]: [string, string]) => {
//   console.log(
//     `Reaction: ${firstName} ${lastName} ${new Date().toLocaleTimeString()}`
//   );
// };
// reaction(dataFn, effectFn);

reaction(
  () => state.fullName,
  (fullName: string) => {
    document.getElementById("app1").innerHTML = fullName;
    console.log(
      `Reaction: ${state.firstName} ${
        state.lastName
      } ${new Date().toLocaleTimeString()}`
    );
  }
);

setTimeout(() => {
  state.setFirstName("John");
}, 2000);

setTimeout(() => {
  state.setLastName("Doe");
}, 4000);

//TODO: Write setTimeout to change the store values after 2 seconds

// Code to change the html given below
// document.getElementById("app").innerHTML = "Your text";
// document.getElementById("app1").innerHTML = "Your text";
