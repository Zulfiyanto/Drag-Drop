import { projectState } from "./../state/project-state";
import { Validatable, validate } from "../util/validation";
import { Component } from "./base-components";
import { autobind } from "../decorators/autobind";

// ProjectInput Class
export class ProjectInput extends Component<HTMLDivElement, HTMLFormElement> {
     titleInputElement: HTMLInputElement;
     descriptionInputElement: HTMLInputElement;
     peopleInputElement: HTMLInputElement;
     constructor() {
          super("project-input", "app", true, "user-input");
          this.titleInputElement = this.element.querySelector("#title") as HTMLInputElement;
          this.descriptionInputElement = this.element.querySelector("#description") as HTMLInputElement;
          this.peopleInputElement = this.element.querySelector("#people") as HTMLInputElement;

          this.configure();
     }
     configure() {
          this.element.addEventListener("submit", this.submitHandler);
     }
     renderContent() {}

     private gatherUserInput(): [string, string, number] | void {
          const enteredTitle = this.titleInputElement.value;
          const enteredDescription = this.descriptionInputElement.value;
          const enterdPeople = this.peopleInputElement.value;

          const titleValidatable: Validatable = {
               value: enteredTitle,
               required: true,
          };
          const descValidatable: Validatable = {
               value: enteredDescription,
               required: true,
               minLength: 5,
          };
          const peopleValidatable: Validatable = {
               value: +enterdPeople,
               required: true,
               min: 2,
               max: 5,
          };

          if (!validate(titleValidatable) || !validate(descValidatable) || !validate(peopleValidatable)) {
               alert("Invalid input, please try again");
               return;
          } else {
               return [enteredTitle, enteredDescription, +enterdPeople];
          }
     }

     private clearInput() {
          this.titleInputElement.value = "";
          this.descriptionInputElement.value = "";
          this.peopleInputElement.value = "";
     }

     @autobind
     private submitHandler(event: Event) {
          event.preventDefault();
          const userInput = this.gatherUserInput();
          if (Array.isArray(userInput)) {
               const [title, desc, people] = userInput;
               projectState.addProject(title, desc, people);
               this.clearInput();
          }
     }
}
