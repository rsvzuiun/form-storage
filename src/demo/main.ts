import FormStorage from "..";

const storage = new FormStorage("form", {});
const inputHandler = () => {
  storage.save();
};
document.addEventListener("DOMContentLoaded", () => {
  storage.addEventListener("input", inputHandler);
  storage.apply();
});
