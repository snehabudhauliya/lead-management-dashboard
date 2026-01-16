// URL se ID nikaalo
const params = new URLSearchParams(window.location.search);
const id = parseInt(params.get("id"));

// Lead find karo
const leads = JSON.parse(localStorage.getItem("leads"));
const lead = leads.find(l => l.id == id);

// Data show karo
if (lead) {
  document.getElementById("name").innerText = lead.name;
  document.getElementById("email").innerText = lead.email;
  document.getElementById("status").innerText = lead.status;
}

function goBack() {
  window.history.back();
}