let curTheme = "dark-theme"

document.getElementById("dark-or-light-btn").addEventListener("click", () => {
  console.log("clicked!");

  if (curTheme === "dark-theme") {
    curTheme = "light-theme";
  } else if (curTheme === "light-theme") {
    curTheme = "dark-theme";
  }

  document.documentElement.className = curTheme;
});


// set first theme
document.documentElement.className = curTheme;