import FormStorage from "..";

const storage = new FormStorage("#types", {
  name: "types",
});
const inputHandler = () => {
  storage.save();
};
document.addEventListener("DOMContentLoaded", () => {
  storage.addEventListener("input", inputHandler);
  storage.apply();
});
