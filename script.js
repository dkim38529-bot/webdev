// reading html elements.

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



// STEP 4: VALIDATE FORM FIELDS

function validateForm() {
    let isValid = true;

    // Clear previous error messages.
    errorElements.forEach(function (error) {
        error.textContent = "";
    });

    // Validate name.
    if (nameInput.value.trim().length < 2) {
        nameError.textContent = "Name must contain at least 2 characters.";
        isValid = false;
    }

    // Validate email.
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailPattern.test(emailInput.value.trim())) {
        emailError.textContent = "Please enter a valid email address.";
        isValid = false;
    }

    // Validate password.
    if (passwordInput.value.length < 8) {
        passwordError.textContent = "Password must contain at least 8 characters.";
        isValid = false;
    }

    // Validate password confirmation.
    if (confirmPasswordInput.value !== passwordInput.value) {
        confirmError.textContent = "Passwords do not match.";
        isValid = false;
    }

    // Validate gender.
    if (genderInput.value === "") {
        genderError.textContent = "Please select your gender.";
        isValid = false;
    }

    // Validate date of birth.
    if (dobInput.value === "") {
        dobError.textContent = "Please enter your date of birth.";
        isValid = false;
    } else {
        const today = new Date();
        const birthDate = new Date(dobInput.value + "T00:00:00");

        if (birthDate > today) {
            dobError.textContent = "Date of birth cannot be in the future.";
            isValid = false;
        }
    }

    // Validate country.
    if (countryInput.value.trim() === "") {
        countryError.textContent = "Please enter your country.";
        isValid = false;
    }

    // Validate phone number.
    const phonePattern = /^[+]?[\d\s()-]{7,20}$/;
    const phoneDigits = phoneInput.value.replace(/\D/g, "");

    if (
        !phonePattern.test(phoneInput.value.trim()) ||
        phoneDigits.length < 7 ||
        phoneDigits.length > 15
    ) {
        phoneError.textContent = "Please enter a valid phone number.";
        isValid = false;
    }

    // Validate biography.
    if (bioInput.value.trim().length < 10) {
        bioError.textContent = "Biography must contain at least 10 characters.";
        isValid = false;
    }

    return isValid;
}

// STEP 5: CLEAR ERRORS WHEN FIELDS ARE CORRECTED

function clearError(errorElement) {
    errorElement.textContent = "";
}

nameInput.addEventListener("input", function () {
    if (nameInput.value.trim().length >= 2) {
        clearError(nameError);
    }
});

emailInput.addEventListener("input", function () {
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (emailPattern.test(emailInput.value.trim())) {
        clearError(emailError);
    }
});

passwordInput.addEventListener("input", function () {
    if (passwordInput.value.length >= 8) {
        clearError(passwordError);
    }

    if (confirmPasswordInput.value === passwordInput.value) {
        clearError(confirmError);
    }
});

confirmPasswordInput.addEventListener("input", function () {
    if (confirmPasswordInput.value === passwordInput.value) {
        clearError(confirmError);
    }
});

genderInput.addEventListener("change", function () {
    if (genderInput.value !== "") {
        clearError(genderError);
    }
});

dobInput.addEventListener("change", function () {
    if (dobInput.value !== "") {
        const birthDate = new Date(dobInput.value + "T00:00:00");

        if (birthDate <= new Date()) {
            clearError(dobError);
        }
    }
});

countryInput.addEventListener("input", function () {
    if (countryInput.value.trim() !== "") {
        clearError(countryError);
    }
});

phoneInput.addEventListener("input", function () {
    const phonePattern = /^[+]?[\d\s()-]{7,20}$/;
    const phoneDigits = phoneInput.value.replace(/\D/g, "");

    if (
        phonePattern.test(phoneInput.value.trim()) &&
        phoneDigits.length >= 7 &&
        phoneDigits.length <= 15
    ) {
        clearError(phoneError);
    }
});

bioInput.addEventListener("input", function () {
    if (bioInput.value.trim().length >= 10) {
        clearError(bioError);
    }
});

// STEP 6: REGISTER A MEMBER

function registerMember() {
    // Remove the empty-list message if it exists.
    const emptyNote = document.getElementById("emptyNote");

    if (emptyNote) {
        emptyNote.remove();
    }

    // Create a new list item.
    const memberItem = document.createElement("li");
    memberItem.className = "member-item";

    // Create the member's name.
    const memberName = document.createElement("h3");
    memberName.textContent = nameInput.value.trim();

    // Create the member's details.
    const memberDetails = document.createElement("p");

    memberDetails.textContent =
        "Email: " + emailInput.value.trim() +
        " | Gender: " + genderInput.value +
        " | Country: " + countryInput.value.trim();

    // Create the member's biography.
    const memberBio = document.createElement("p");
    memberBio.textContent = "Bio: " + bioInput.value.trim();

    // Create the Remove button.
    const removeButton = document.createElement("button");
    removeButton.type = "button";
    removeButton.textContent = "Remove";
    removeButton.className = "remove-btn";

    //  REMOVE A MEMBER.
    removeButton.addEventListener("click", function () {
        memberItem.remove();

        updateCount();

        // Display the empty-list message if no members remain.
        if (memberList.querySelectorAll(".member-item").length === 0) {
            const emptyMessage = document.createElement("li");

            emptyMessage.className = "empty";
            emptyMessage.id = "emptyNote";
            emptyMessage.textContent =
                "No members yet. Register someone to begin.";

            memberList.appendChild(emptyMessage);
        }
    });

    // Add the details to the new member item.
    memberItem.appendChild(memberName);
    memberItem.appendChild(memberDetails);
    memberItem.appendChild(memberBio);
    memberItem.appendChild(removeButton);

    // Add the member to the page.
    memberList.appendChild(memberItem);
}
// STEP 7: UPDATE MEMBER COUNTER

function updateCount() {
    const totalMembers =
        memberList.querySelectorAll(".member-item").length;

    count.textContent = totalMembers;
}
// STEP 8: HANDLE FORM SUBMISSION

form.addEventListener("submit", function (event) {
    // Prevent the page from refreshing.
    event.preventDefault();

    // Hide any previous success message.
    successMsg.textContent = "";
    successMsg.classList.add("hidden");

    // Validate all fields.
    const isValid = validateForm();

    // Stop if any field is invalid.
    if (!isValid) {
        return;
    }

    // Register the member.
    registerMember();

    // Update the member counter.
    updateCount();

    // Display the success message.
    successMsg.textContent =
        "Member registered successfully!";

    successMsg.classList.remove("hidden");

    // Reset all form fields.
    form.reset();
});
// STEP 10: TOGGLE DARK MODE

themeButton.addEventListener("click", function () {
    document.body.classList.toggle("dark-mode");

    if (document.body.classList.contains("dark-mode")) {
        themeButton.textContent = "Light Mode";
    } else {
        themeButton.textContent = "Dark Mode";
    }
});