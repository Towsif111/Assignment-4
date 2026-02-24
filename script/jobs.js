var jobs = JOBS_DATA;
var currentTab = "all";

var total = document.getElementById("total");
var interviewCount = document.getElementById("interviewCount");
var rejectedCount = document.getElementById("rejectedCount");
var tabCount = document.getElementById("tabCount");
var container = document.getElementById("allCards");
var main = document.querySelector("main");
var allBtn = document.getElementById("all-filter-btn");
var interviewBtn = document.getElementById("interview-filter-btn");
var rejectedBtn = document.getElementById("rejected-filter-btn");

function updateStats() {
  var interviewList = jobs.filter(function(j) { return j.status === 'interview'; });
  var rejectedList = jobs.filter(function(j) { return j.status === 'rejected'; });

  total.innerText = jobs.length;
  interviewCount.innerText = interviewList.length;
  rejectedCount.innerText = rejectedList.length;
  tabCount.innerText = getFilteredJobs().length;
}

function getFilteredJobs() {
  if (currentTab === "all") {
    return jobs;
  }
  return jobs.filter(function(job) {
    return job.status === currentTab;
  });
}

function setActiveTab(activeId) {
  var btns = [allBtn, interviewBtn, rejectedBtn];
  
  for (var i = 0; i < btns.length; i++) {
    btns[i].classList.remove("btn-primary");
    btns[i].classList.add("btn-outline");
  }
  
  var activeBtn;
  if (activeId === "all") {
    activeBtn = allBtn;
  } else if (activeId === "interview") {
    activeBtn = interviewBtn;
  } else {
    activeBtn = rejectedBtn;
  }
  
  activeBtn.classList.add("btn-primary");
  activeBtn.classList.remove("btn-outline");
}

function createEmptyState() {
  return `<div class="h-[300px] sm:h-[350px] border border-dashed border-[#e6e7e9] rounded-xl bg-white grid place-items-center p-4 sm:p-8">
    <div class="text-center">
      <div class="text-4xl sm:text-5xl mb-3">📄</div>
      <p class="text-base sm:text-lg font-bold text-[#002c5c]">No jobs available</p>
      <p class="mt-1 text-xs sm:text-sm text-[#323b49]">Check back soon for new opportunities</p>
    </div>
  </div>`;
}

function createJobCard(job) {
  var badge = "";
  var badgeClass = "";
  var interviewDisabled = "";
  var rejectedDisabled = "";

  if (job.status === "interview") {
    badge = "INTERVIEW";
    badgeClass = "border-[#86efac] bg-[#dcfce7] text-[#10b981]";
    interviewDisabled = "disabled opacity-50 cursor-not-allowed";
  } else if (job.status === "rejected") {
    badge = "REJECTED";
    badgeClass = "border-[#fca5a5] bg-[#fee2e2] text-[#ef4444]";
    rejectedDisabled = "disabled opacity-50 cursor-not-allowed";
  } else {
    badge = "NOT APPLIED";
    badgeClass = "border-[#e6e7e9] bg-[#f8fafc] text-[#64748b]";
  }

  return `<div class="card bg-white border border-[#f1f2f4] rounded-xl p-3 sm:p-4 shadow-sm transition-all duration-300 hover:shadow-xl hover:scale-[1.02] hover:border-[#86efac] cursor-pointer" data-id="${job.id}">

    <div class="flex items-start justify-between gap-2 sm:gap-3">
      <div>
        <p class="text-sm sm:text-base font-bold text-[#002c5c]">${job.companyName}</p>
        <p class="text-xs sm:text-sm font-medium text-[#64748b]">${job.position}</p>
      </div>

      <button class="delete-btn px-2 sm:px-3 py-1 rounded-lg text-[#64748b] hover:text-[#ef4444] hover:bg-[#fee2e2] transition-all duration-200"><i class="fa-solid fa-trash-can"></i>
      </button>
    </div>

    <div class="mt-2 sm:mt-3 flex flex-wrap gap-x-3 sm:gap-x-4 gap-y-1 text-xs sm:text-sm text-[#323b49]">
      <span><strong>Location:</strong> ${job.location}</span>
      <span><strong>Type:</strong> ${job.type}</span>
      <span><strong>Salary:</strong> ${job.salary}</span>
    </div>

    <div class="mt-2">
      <span class="inline-flex items-center px-3 sm:px-5 py-1 rounded-full text-xs font-bold border ${badgeClass}">${badge}</span>
    </div>

    <p class="mt-2 sm:mt-3 text-xs sm:text-sm text-[#323b49]">${job.description}</p>
    <div class="mt-3 sm:mt-4 flex flex-wrap gap-2">

      <button class="interview-btn px-3 sm:px-4 py-2 rounded text-xs sm:text-sm font-semibold border border-[#86efac] text-[#10b981] hover:bg-[#dcfce7] transition-colors duration-200 ${interviewDisabled}">Interview</button>

      <button class="rejected-btn px-3 sm:px-4 py-2 rounded text-xs sm:text-sm font-semibold border border-[#fca5a5] text-[#ef4444] hover:bg-[#fee2e2] transition-colors duration-200 ${rejectedDisabled}">Rejected</button>
    </div>
  </div>`;
}

function render() {
  var filteredJobs = getFilteredJobs();
  
  if (filteredJobs.length === 0) {
    container.innerHTML = createEmptyState();
  } else {
    var html = "";
    for (var i = 0; i < filteredJobs.length; i++) {
      html += createJobCard(filteredJobs[i]);
    }
    container.innerHTML = html;
  }
  
  updateStats();
}

main.addEventListener("click", function(e) {
  var btn = e.target.closest("button");
  if (!btn) return;

  var card = btn.closest(".card");
  var id = card.dataset.id;
  
  if (btn.classList.contains("delete-btn")) {
    jobs = jobs.filter(function(j) { return j.id !== id; });
  } else if (btn.classList.contains("interview-btn")) {
    var job = jobs.find(function(j) { return j.id === id; });
    if (job) job.status = "interview";
  } else if (btn.classList.contains("rejected-btn")) {
    var job = jobs.find(function(j) { return j.id === id; });
    if (job) job.status = "rejected";
  }

  render();
});

allBtn.addEventListener("click", function() {
  currentTab = "all";
  setActiveTab("all");
  render();
});

interviewBtn.addEventListener("click", function() {
  currentTab = "interview";
  setActiveTab("interview");
  render();
});

rejectedBtn.addEventListener("click", function() {
  currentTab = "rejected";
  setActiveTab("rejected");
  render();
});

setActiveTab("all");
render();