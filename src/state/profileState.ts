export type Profile = {
  firstName: string;
  lastName: string;
  roleLabel: string;
  email: string;
  skills: string[];
  resumeFileName: string;
};

let profile: Profile = {
  firstName: "Han",
  lastName: "So-hee",
  roleLabel: "Graphic Designer",
  email: "hanSoHee@gmail.com",
  skills: ["Communication", "Time-Management", "Teamwork"],
  resumeFileName: "han_so_hee_resume_2026.pdf",
};

export function getProfile(): Profile {
  return profile;
}

export function updateProfile(next: Profile) {
  profile = next;
}

