
const leads = [
  { id: 1, name: "Amit Sharma", email: "amit.sharma@gmail.com", status: "New" },
  { id: 2, name: "Priya Verma", email: "priya.verma@gmail.com", status: "Contacted" },
  { id: 3, name: "Rahul Singh", email: "rahul.singh@gmail.com", status: "Converted" },
  { id: 4, name: "Neha Gupta", email: "neha.gupta@gmail.com", status: "New" },
  { id: 5, name: "Rohit Mehta", email: "rohit.mehta@gmail.com", status: "Contacted" },
  { id: 6, name: "Anjali Jain", email: "anjali.jain@gmail.com", status: "Converted" },
  { id: 7, name: "Vikas Yadav", email: "vikas.yadav@gmail.com", status: "New" },
  { id: 8, name: "Pooja Malhotra", email: "pooja.malhotra@gmail.com", status: "Contacted" },
  { id: 9, name: "Sandeep Kumar", email: "sandeep.kumar@gmail.com", status: "Converted" },
  { id: 10, name: "Kiran Patel", email: "kiran.patel@gmail.com", status: "New" },

  { id: 11, name: "Arjun Reddy", email: "arjun.reddy@gmail.com", status: "New" },
  { id: 12, name: "Sneha Iyer", email: "sneha.iyer@gmail.com", status: "Contacted" },
  { id: 13, name: "Manish Pandey", email: "manish.pandey@gmail.com", status: "Converted" },
  { id: 14, name: "Ritika Saxena", email: "ritika.saxena@gmail.com", status: "New" },
  { id: 15, name: "Nikhil Bansal", email: "nikhil.bansal@gmail.com", status: "Contacted" },
  { id: 16, name: "Simran Kaur", email: "simran.kaur@gmail.com", status: "Converted" },
  { id: 17, name: "Deepak Chauhan", email: "deepak.chauhan@gmail.com", status: "New" },
  { id: 18, name: "Isha Arora", email: "isha.arora@gmail.com", status: "Contacted" },
  { id: 19, name: "Mohit Agarwal", email: "mohit.agarwal@gmail.com", status: "Converted" },
  { id: 20, name: "Riya Kapoor", email: "riya.kapoor@gmail.com", status: "New" },

  { id: 21, name: "Kunal Shah", email: "kunal.shah@gmail.com", status: "Contacted" },
  { id: 22, name: "Mehul Joshi", email: "mehul.joshi@gmail.com", status: "New" },
  { id: 23, name: "Nisha Rawat", email: "nisha.rawat@gmail.com", status: "Converted" },
  { id: 24, name: "Akash Mishra", email: "akash.mishra@gmail.com", status: "Contacted" },
  { id: 25, name: "Payal Khurana", email: "payal.khurana@gmail.com", status: "New" },
  { id: 26, name: "Rakesh Soni", email: "rakesh.soni@gmail.com", status: "Converted" },
  { id: 27, name: "Tanya Bhatt", email: "tanya.bhatt@gmail.com", status: "Contacted" },
  { id: 28, name: "Saurabh Dixit", email: "saurabh.dixit@gmail.com", status: "New" },
  { id: 29, name: "Komal Chawla", email: "komal.chawla@gmail.com", status: "Converted" },
  { id: 30, name: "Harsh Vardhan", email: "harsh.vardhan@gmail.com", status: "New" }
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
