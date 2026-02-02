/**
 * Profile completion and mapping utilities.
 * Used by MyProfile, EditProfile, and ProfileCompleteBanner.
 */

/** Fields considered for profile completion. Empty string, null, undefined count as unfilled. */
const PROFILE_FIELDS = [
  "firstName",
  "lastName",
  "phone",
  "dateOfBirth",
  "gender",
  "religion",
  "caste",
  "maritalStatus",
  "city",
  "state",
  "country",
  "occupation",
  "education",
  "aboutMe",
  "heightCm",
  "weightKg",
  "income",
  // preferences omitted so 100% is reachable when all main fields are filled
];

/** Height options: form value (feet'inches") -> height in cm (needed for completion check) */
const HEIGHT_KEYS_FOR_COMPLETION = [
  "5.4",
  "5.5",
  "5.6",
  "5.7",
  "5.8",
  "5.9",
  "5.10",
  "5.11",
  "6.0",
  "6.1",
  "6.2",
];

/**
 * @param {Object} p - Profile or form data (camelCase). Form uses dob/height; API uses dateOfBirth/heightCm.
 * @returns {number} 0–100
 */
export function computeProfileCompletionPercentage(p) {
  if (!p || typeof p !== "object") return 0;
  let filled = 0;
  for (const key of PROFILE_FIELDS) {
    let ok = false;
    if (key === "dateOfBirth") {
      ok =
        (p.dateOfBirth != null && String(p.dateOfBirth).trim() !== "") ||
        (p.dob != null && String(p.dob).trim() !== "");
    } else if (key === "heightCm") {
      ok =
        (p.heightCm != null && Number(p.heightCm) > 0) ||
        (p.height != null &&
          String(p.height).trim() !== "" &&
          HEIGHT_KEYS_FOR_COMPLETION.includes(String(p.height).trim()));
    } else {
      const v = p[key];
      ok = v != null && String(v).trim() !== "";
    }
    if (ok) filled++;
  }
  return Math.min(100, Math.round((filled / PROFILE_FIELDS.length) * 100));
}

/** Height options: form value (feet'inches") -> height in cm */
const HEIGHT_TO_CM = {
  5.4: 163,
  5.5: 165,
  5.6: 168,
  5.7: 170,
  5.8: 173,
  5.9: 175,
  "5.10": 178,
  5.11: 180,
  "6.0": 183,
  6.1: 185,
  6.2: 188,
};
/** height cm -> form value for dropdown */
const CM_TO_HEIGHT = Object.fromEntries(
  Object.entries(HEIGHT_TO_CM).map(([k, v]) => [v, k]),
);

/** @param {number} cm - height in cm. @returns {string} e.g. "5'6\"" */
export function heightCmToDisplay(cm) {
  if (cm == null) return "—";
  for (const [k, v] of Object.entries(HEIGHT_TO_CM)) {
    if (v === cm) {
      const [f, i] = k.split(".");
      return `${f}'${i || "0"}"`;
    }
  }
  return `${cm} cm`;
}

/** @param {string} dateOfBirth - YYYY-MM-DD. @returns {number|null} age in years */
export function ageFromDob(dateOfBirth) {
  if (!dateOfBirth) return null;
  const d = new Date(dateOfBirth);
  if (Number.isNaN(d.getTime())) return null;
  const now = new Date();
  let a = now.getFullYear() - d.getFullYear();
  if (
    now.getMonth() < d.getMonth() ||
    (now.getMonth() === d.getMonth() && now.getDate() < d.getDate())
  )
    a--;
  return a >= 0 ? a : null;
}

/**
 * Convert API profile (UserProfileResponse) to EditProfile form state.
 * @param {Object} api
 * @returns {Object} formData for EditProfile
 */
export function apiProfileToFormData(api) {
  if (!api) return getDefaultFormData();
  const dob = api.dateOfBirth
    ? typeof api.dateOfBirth === "string"
      ? api.dateOfBirth
      : api.dateOfBirth.slice(0, 10)
    : "";
  const heightVal =
    api.heightCm != null ? CM_TO_HEIGHT[api.heightCm] || "" : "";
  return {
    firstName: api.firstName ?? "",
    lastName: api.lastName ?? "",
    phone: api.phone ?? "",
    gender: (api.gender || "").toLowerCase(),
    dob,
    height: heightVal,
    weightKg: api.weightKg != null ? String(api.weightKg) : "",
    maritalStatus: maritalStatusToForm(api.maritalStatus),
    religion: (api.religion || "").toLowerCase(),
    caste: api.caste ?? "",
    motherTongue: "",
    manglik: "",
    country: (api.country || "India").toLowerCase(),
    state: api.state ?? "",
    city: api.city ?? "",
    citizenship: api.citizenship ?? "",
    education: (api.education || "").toLowerCase(),
    college: api.college ?? "",
    occupation: (api.occupation || "").toLowerCase(),
    company: api.company ?? "",
    income: incomeToForm(api.income),
    familyType: "",
    familyStatus: "",
    fatherOccupation: "",
    motherOccupation: "",
    brothers: "",
    sisters: "",
    diet: "",
    smoking: "",
    drinking: "",
    aboutMe: api.aboutMe ?? "",
    preferences: api.preferences ?? "",
  };
}

/**
 * Convert EditProfile form to UpdateProfileRequest shape (camelCase for JSON).
 */
export function formDataToUpdateRequest(form) {
  if (!form) return {};
  const dateOfBirth = form.dob
    ? form.dob.includes("/")
      ? (() => {
          const [d, m, y] = form.dob.split("/");
          return `${y}-${m.padStart(2, "0")}-${d.padStart(2, "0")}`;
        })()
      : form.dob
    : null;
  const heightCm = form.height ? (HEIGHT_TO_CM[form.height] ?? null) : null;
  const income = form.income ? parseIncome(form.income) : null;
  const w = form.weightKg ? parseInt(String(form.weightKg).trim(), 10) : null;
  const weightKg = Number.isInteger(w) ? w : null;

  return {
    firstName: form.firstName?.trim() || null,
    lastName: form.lastName?.trim() || null,
    phone: form.phone?.trim() || null,
    dateOfBirth: dateOfBirth || null,
    gender: form.gender ? form.gender.toUpperCase() : null,
    religion: form.religion?.trim() || null,
    caste: form.caste?.trim() || null,
    occupation: form.occupation?.trim() || null,
    education: form.education?.trim() || null,
    income,
    maritalStatus: formMaritalStatusToApi(form.maritalStatus),
    heightCm,
    weightKg,
    city: form.city?.trim() || null,
    state: form.state?.trim() || null,
    country: form.country?.trim() || null,
    citizenship: form.citizenship?.trim() || null,
    college: form.college?.trim() || null,
    company: form.company?.trim() || null,
    aboutMe: form.aboutMe?.trim() || null,
    preferences: form.preferences?.trim() || null,
  };
}

function maritalStatusToForm(ms) {
  if (!ms) return "";
  const m = {
    SINGLE: "never-married",
    DIVORCED: "divorced",
    WIDOWED: "widowed",
  };
  return m[ms] || "";
}

function formMaritalStatusToApi(val) {
  if (!val) return null;
  const m = {
    "never-married": "SINGLE",
    divorced: "DIVORCED",
    widowed: "WIDOWED",
    "awaiting-divorce": "DIVORCED",
  };
  return m[val] || "SINGLE";
}

const INCOME_MAP = {
  "0-3": 150000,
  "3-5": 400000,
  "5-10": 750000,
  "10-20": 1500000,
  "20-50": 3500000,
  "50+": 6000000,
};

function incomeToForm(val) {
  if (val == null) return "";
  const n = typeof val === "number" ? val : parseFloat(val);
  if (Number.isNaN(n)) return "";
  for (const [k, v] of Object.entries(INCOME_MAP)) {
    if (Math.abs(n - v) < 100000) return k;
  }
  if (n < 300000) return "0-3";
  if (n < 500000) return "3-5";
  if (n < 1500000) return "5-10";
  if (n < 2500000) return "10-20";
  if (n < 5000000) return "20-50";
  return "50+";
}

function parseIncome(val) {
  if (typeof val === "number" && !Number.isNaN(val)) return val;
  return INCOME_MAP[val] ?? null;
}

export function getDefaultFormData() {
  return {
    firstName: "",
    lastName: "",
    gender: "",
    dob: "",
    height: "",
    maritalStatus: "",
    religion: "",
    caste: "",
    motherTongue: "",
    manglik: "",
    country: "India",
    state: "",
    city: "",
    citizenship: "",
    education: "",
    college: "",
    occupation: "",
    company: "",
    income: "",
    familyType: "",
    familyStatus: "",
    fatherOccupation: "",
    motherOccupation: "",
    brothers: "",
    sisters: "",
    diet: "",
    smoking: "",
    drinking: "",
    aboutMe: "",
    preferences: "",
    phone: "",
    weightKg: "",
  };
}
