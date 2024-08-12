export function setIsLoggedIn(isLoggedIn) {
  window.localStorage.setItem("isLoggedIn", isLoggedIn);
}

export function getIsLoggedIn() {
  return window.localStorage.getItem("isLoggedIn") === "true";
}
