const tableBody = document.getElementById("table");
const searchInput = document.getElementById("search");
const statusSelect = document.getElementById("status");
const paginationDiv = document.getElementById("pagination");

let currentPage = 1;
const rowsPerPage = 5;

// FILTER + PAGINATION DATA
function filterLeads() {
  const searchText = searchInput.value.toLowerCase();
  const statusValue = statusSelect.value;

  const filtered = leads.filter(lead =>
    lead.name.toLowerCase().includes(searchText) &&
    (statusValue === "all" || lead.status === statusValue)
  );

  renderTable(filtered);
}

// PAGINATION LOGIC
function paginate(data) {
  const start = (currentPage - 1) * rowsPerPage;
  const end = start + rowsPerPage;
  return data.slice(start, end);
}

// RENDER TABLE
function renderTable(data) {
  tableBody.innerHTML = "";

  const pageData = paginate(data);

  pageData.forEach(lead => {
    tableBody.innerHTML += `
      <tr onclick="openDetail(${lead.id })" style="cursor:pointer">
        <td>${lead.name}</td>
        <td>${lead.email}</td>
        <td>${lead.status}</td>
      </tr>
    `;
  });

  renderPaginationButtons(data);
}

// PAGINATION BUTTONS
function renderPaginationButtons(data) {
  const totalPages = Math.ceil(data.length / rowsPerPage);
  paginationDiv.innerHTML = "";

  for (let i = 1; i <= totalPages; i++) {
    paginationDiv.innerHTML += `
      <button onclick="changePage(${i})">${i}</button>
    `;
  }
}

function changePage(page) {
  currentPage = page;
  filterLeads();
}

function openDetail(id) {
  window.location.href = "detail.html?id=" + id;
  
}

// ANALYTICS
document.getElementById("total").innerText = leads.length;
document.getElementById("converted").innerText =
  leads.filter(l => l.status === "Converted").length;

// EVENTS
searchInput.addEventListener("input", () => {
  currentPage = 1;
  filterLeads();
});

statusSelect.addEventListener("change", () => {
  currentPage = 1;
  filterLeads();
});

// 🔥 INITIAL LOAD (MOST IMPORTANT)
filterLeads();