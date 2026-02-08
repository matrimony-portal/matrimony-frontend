// Validation utility functions matching existing HTML logic

export const validateEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

export const validatePhone = (phone) => {
  const phoneRegex = /^[0-9]{10}$/;
  return phoneRegex.test(phone);
};

export const validateName = (name) => {
  const nameRegex = /^[A-Za-z\s]{2,50}$/;
  return nameRegex.test(name);
};

export const validatePassword = (password) => {
  const errors = [];

  if (password.length < 8) {
    errors.push("at least 8 characters");
  }
  if (!/[a-z]/.test(password)) {
    errors.push("one lowercase letter");
  }
  if (!/[A-Z]/.test(password)) {
    errors.push("one uppercase letter");
  }
  if (!/\d/.test(password)) {
    errors.push("one number");
  }
  if (!/[@$!%*?&]/.test(password)) {
    errors.push("one special character (@$!%*?&)");
  }

  return {
    isValid: errors.length === 0,
    message:
      errors.length > 0 ? `Password must contain ${errors.join(", ")}` : "",
  };
};

export const validateAge = (dobValue, minAge = 18) => {
  if (!dobValue) return false;

  // Validate dd/mm/yyyy format
  const dateParts = dobValue.split("/");
  if (dateParts.length !== 3) return false;

  const [day, month, year] = dateParts.map(Number);
  if (isNaN(day) || isNaN(month) || isNaN(year)) return false;

  // Construct a valid date
  const dob = new Date(year, month - 1, day);
  if (
    dob.getDate() !== day ||
    dob.getMonth() + 1 !== month ||
    dob.getFullYear() !== year
  ) {
    return false; // Invalid real-world date
  }

  const now = new Date();
  const minAgeDate = new Date(
    now.getFullYear() - minAge,
    now.getMonth(),
    now.getDate(),
  );
  const maxAgeDate = new Date(1950, 0, 1); // Born after 1950-01-01

  return dob <= minAgeDate && dob >= maxAgeDate;
};

export const validateAgeAgainstGender = (dobValue) => {
  if (!dobValue) return true; // Skip if empty (handled elsewhere)

  let minAge = 18; // Default
  // This function will be called with gender parameter in the component
  return validateAge(dobValue, minAge);
};

export const checkPasswordStrength = (password) => {
  const checks = [
    { id: "lengthCheck", regex: /.{8,}/ },
    { id: "lowerCheck", regex: /[a-z]/ },
    { id: "upperCheck", regex: /[A-Z]/ },
    { id: "numberCheck", regex: /[0-9]/ },
    { id: "specialCheck", regex: /[^a-zA-Z0-9\s]/ },
  ];

  let strength = 0;
  const results = {};

  checks.forEach((check) => {
    if (check.regex.test(password)) {
      strength++;
      results[check.id] = true;
    } else {
      results[check.id] = false;
    }
  });

  let strengthLevel = "weak";
  if (strength <= 2) {
    strengthLevel = "weak";
  } else if (strength <= 4) {
    strengthLevel = "medium";
  } else {
    strengthLevel = "strong";
  }

  return {
    strength,
    strengthLevel,
    results,
    isValid: strength === 5,
  };
};

export const formatDateForDisplay = (date) => {
  if (!date) return "";
  const [day, month, year] = date.split("/");
  return `${day}/${month}/${year}`;
};

export const formatDateForAPI = (date) => {
  if (!date) return "";
  const [day, month, year] = date.split("/");
  return `${year}-${month.padStart(2, "0")}-${day.padStart(2, "0")}`;
};
