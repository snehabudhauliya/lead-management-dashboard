
const leads = [
  { id: 1, name: "Rahul", email: "rahul@gmail.com", status: "New" },
  { id: 2, name: "Aman", email: "aman@gmail.com", status: "Converted" },
  { id: 3, name: "Neha", email: "neha@gmail.com", status: "New" },
  { id: 4, name: "Pooja", email: "pooja@gmail.com", status: "Converted" }
];

for (let i = 1; i <= 30; i++) {
  leads.push({
    id: i,
    name: "Lead " + i,
    email: "lead" + i + "@mail.com",
    status: i % 2 === 0 ? "Converted" : "New"
  });
}

const table = document.getElementById("table");
const total = document.getElementById("total");
const converted = document.getElementById("converted");
const search = document.getElementById("search");
const statusFilter = document.getElementById("status");

function render(data) {
  table.innerHTML = "";

  // SAVE FOR DETAIL PAGE
  localStorage.setItem("leads", JSON.stringify(leads));

  data.forEach(lead => {
    const row = document.createElement("tr");
    row.style.cursor = "pointer";
    row.onclick = () => {
      window.location.href = `detail.html?id=${lead.id}`;
    };

    row.innerHTML = `
      <td>${lead.name}</td>
      <td>${lead.email}</td>
      <td>${lead.status}</td>
    `;

    table.appendChild(row);
  });

  total.innerText = leads.length;
  converted.innerText = leads.filter(l => l.status === "Converted").length;
}

// FILTER LOGIC
function applyFilters() {
  let filtered = leads;

  if (search.value) {
    filtered = filtered.filter(l =>
      l.name.toLowerCase().includes(search.value.toLowerCase())
    );
  }

  if (statusFilter.value !== "all") {
    filtered = filtered.filter(l => l.status === statusFilter.value);
  }

  render(filtered);
}

search.addEventListener("input", applyFilters);
statusFilter.addEventListener("change", applyFilters);

// INITIAL LOAD
render(leads);