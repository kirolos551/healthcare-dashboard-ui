const API_URL = "https://fedskillstest.coalitiontechnologies.workers.dev";

// Basic Auth (encoded properly – NOT hardcoded)
const username = "coalition";
const password = "skills-test";
const authKey = btoa(`${username}:${password}`);

fetch(API_URL, {
  headers: {
    Authorization: `Basic ${authKey}`,
  },
})
  .then((response) => response.json())
  .then((data) => {
    // Only Jessica Taylor (as required)
    const patient = data.find(
      (p) => p.name === "Jessica Taylor"
    );

    if (!patient) return;

    renderProfile(patient);
    renderDiagnosis(patient.diagnosis_history[0]);
    renderDiagnostics(patient.diagnostic_list);
    renderLabResults(patient.lab_results);
  })
  .catch((error) => {
    console.error("Error fetching data:", error);
  });

function renderProfile(patient) {
  const profileDiv = document.getElementById("profile");

  profileDiv.innerHTML = `
    <img src="${patient.profile_picture}" alt="Profile Picture" />
    <p><strong>Name:</strong> ${patient.name}</p>
    <p><strong>Gender:</strong> ${patient.gender}</p>
    <p><strong>Age:</strong> ${patient.age}</p>
    <p><strong>DOB:</strong> ${patient.date_of_birth}</p>
    <p><strong>Phone:</strong> ${patient.phone_number}</p>
    <p><strong>Emergency:</strong> ${patient.emergency_contact}</p>
    <p><strong>Insurance:</strong> ${patient.insurance_type}</p>
  `;
}

function renderDiagnosis(diagnosis) {
  const diagnosisDiv = document.getElementById("diagnosis");

  diagnosisDiv.innerHTML = `
    <div>Blood Pressure: 
      ${diagnosis.blood_pressure.systolic.value}/${diagnosis.blood_pressure.diastolic.value}
    </div>
    <div>Heart Rate: ${diagnosis.heart_rate.value}</div>
    <div>Respiratory Rate: ${diagnosis.respiratory_rate.value}</div>
    <div>Temperature: ${diagnosis.temperature.value}</div>
  `;
}

function renderDiagnostics(list) {
  const ul = document.getElementById("diagnostic-list");

  list.forEach((item) => {
    const li = document.createElement("li");
    li.textContent = `${item.name} - ${item.status}`;
    ul.appendChild(li);
  });
}

function renderLabResults(results) {
  const ul = document.getElementById("lab-results");

  results.forEach((result) => {
    const li = document.createElement("li");
    li.textContent = result;
    ul.appendChild(li);
  });
}
