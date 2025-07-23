const API_URL = "https://disease.sh/v3/covid-19/countries";
const GLOBAL_URL = "https://disease.sh/v3/covid-19/all";
let globalData = [];
let currentSortKey = null;
let ascending = true;
let currentPage = 1;
const rowsPerPage = 10;
const maxVisiblePages = 4;

window.onload = async function() {
  try {
    document.getElementById("error-message").textContent = "Loading data...";
    const response = await fetch(API_URL);
    const globalRes = await fetch(GLOBAL_URL);
    if (!response.ok || !globalRes.ok) throw new Error("Failed to fetch data");

    const data = await response.json();
    const global = await globalRes.json();
    globalData = data;
    displayGlobalStats(global);
    displayData(globalData);
    document.getElementById("error-message").textContent = "";
  } catch (error) {
    document.getElementById("error-message").textContent = error.message;
  }
};

document.getElementById("search").addEventListener("input", (e) => {
  const value = e.target.value.toLowerCase();
  const filtered = globalData.filter(country => country.country.toLowerCase().includes(value));
  currentPage = 1;
  displayData(filtered);
});

function displayGlobalStats(data) {
  document.getElementById("global-stats").innerHTML = `
    🌍 <strong>Total Cases:</strong> ${data.cases.toLocaleString()} |
    <strong>Deaths:</strong> ${data.deaths.toLocaleString()} |
    <strong>Recovered:</strong> ${data.recovered.toLocaleString()}`;
}

function displayData(data) {
  const tableBody = document.getElementById("table-body");
  tableBody.innerHTML = "";

  const start = (currentPage - 1) * rowsPerPage;
  const paginatedData = data.slice(start, start + rowsPerPage);

  paginatedData.forEach(country => {
    const row = `<tr onclick="showDetails('${country.country}', '${country.cases}', '${country.deaths}', '${country.recovered}')">
      <td><img src="${country.countryInfo.flag}" alt="flag" width="25"> ${country.country}</td>
      <td>${country.cases.toLocaleString()}</td>
      <td>${country.deaths.toLocaleString()}</td>
      <td>${country.recovered.toLocaleString()}</td>
    </tr>`;
    tableBody.innerHTML += row;
  });
  setupPagination(data);
}

function sortData(key) {
  if (key === currentSortKey) ascending = !ascending;
  else ascending = true;
  currentSortKey = key;

  const sorted = [...globalData].sort((a, b) => {
    if (a[key] < b[key]) return ascending ? -1 : 1;
    if (a[key] > b[key]) return ascending ? 1 : -1;
    return 0;
  });
  displayData(sorted);
}

function setupPagination(data) {
  const pageCount = Math.ceil(data.length / rowsPerPage);
  const pagination = document.getElementById("pagination");
  pagination.innerHTML = "";

  let startPage = Math.max(1, currentPage - Math.floor(maxVisiblePages / 2));
  let endPage = Math.min(pageCount, startPage + maxVisiblePages - 1);
  if (endPage - startPage < maxVisiblePages - 1) {
    startPage = Math.max(1, endPage - maxVisiblePages + 1);
  }

  for (let i = startPage; i <= endPage; i++) {
    const btn = document.createElement("button");
    btn.textContent = i;
    if (i === currentPage) btn.classList.add("active");
    btn.addEventListener("click", () => {
      currentPage = i;
      displayData(data);
    });
    pagination.appendChild(btn);
  }

  document.getElementById("prev-btn").onclick = () => {
    if (currentPage > 1) {
      currentPage--;
      displayData(data);
    }
  };

  document.getElementById("next-btn").onclick = () => {
    if (currentPage < pageCount) {
      currentPage++;
      displayData(data);
    }
  };
}

function showDetails(country, cases, deaths, recovered) {
  alert(`${country}\nCases: ${cases}\nDeaths: ${deaths}\nRecovered: ${recovered}`);
}