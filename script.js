// reading

const form = document.getElementById("regform");

const nameInput = document.getElementById("name");
const emailInput = document.getElementById("email");
const passwordInput = document.getElementById("password");
const confirmPasswordInput = document.getElementById("confirm-password");
const genderInput = document.getElementById("gender");
const dobInput = document.getElementById("dob");
const countryInput = document.getElementById("country");
const phoneInput = document.getElementById("phone");
const bioInput = document.getElementById("bio");

const errorElements = document.querySelectorAll(".error");

const nameError = document.getElementById("nameError");
const emailError = document.getElementById("emailError");
const passwordError = document.getElementById("passwordError");
const confirmError = document.getElementById("confirmError");
const genderError = document.getElementById("genderError");
const dobError = document.getElementById("dobError");
const countryError = document.getElementById("countryError");
const phoneError = document.getElementById("phoneError");
const bioError = document.getElementById("bioError");

const successMsg = document.getElementById("successMsg");
const memberList = document.getElementById("memberList");
const count = document.getElementById("count");
const themeButton = document.getElementById("theme");

// Confirm that the elements have been selected.
console.log("Form:", form);
console.log("Inputs:", document.querySelectorAll("input, select, textarea"));
console.log("Error elements:", errorElements);
console.log("Success message:", successMsg);
console.log("Member list:", memberList);
console.log("Member counter:", count);
console.log("Dark Mode button:", themeButton);
