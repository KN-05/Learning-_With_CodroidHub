(() => {
  'use strict';

  /* ---------------------------------------------------------
     State
  --------------------------------------------------------- */
  const STORAGE_KEY = 'ems_employees';
  const PAGE_SIZE = 8;

  let employees = [];
  let filteredEmployees = [];
  let currentPage = 1;
  let editingId = null;
  let deletingId = null;
  let pendingPhotoDataUrl = '';

  let genderChart, deptChart;

  const DEPARTMENTS = ['HR', 'Finance', 'Marketing', 'IT', 'Sales', 'Operations', 'Support', 'Management'];

  /* ---------------------------------------------------------
     Utilities
  --------------------------------------------------------- */
  const $ = (sel) => document.querySelector(sel);
  const $$ = (sel) => Array.from(document.querySelectorAll(sel));

  function uid() {
    // Generates sequential IDs like EMP0001, EMP0002... based on the
    // highest existing numeric EMP id currently in the directory.
    let maxNum = 0;
    employees.forEach(e => {
      const match = /^EMP(\d+)$/.exec((e.id || '').trim());
      if (match) maxNum = Math.max(maxNum, parseInt(match[1], 10));
    });
    return 'EMP' + String(maxNum + 1).padStart(4, '0');
  }

  function formatCurrency(n) {
    const num = Number(n) || 0;
    return '₹' + num.toLocaleString('en-IN');
  }

  function formatDate(str) {
    if (!str) return '—';
    const d = new Date(str);
    if (isNaN(d)) return str;
    return d.toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' });
  }

  // Normalizes a value for safe, case/whitespace-insensitive comparisons
  // (e.g. matching "Male" vs " male " vs "MALE" as the same value)
  function norm(v) {
    return (v == null ? '' : String(v)).trim().toLowerCase();
  }

  function escapeHtml(str) {
    if (str == null) return '';
    return String(str)
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;');
  }

  function initials(name) {
    return encodeURIComponent(name || 'Employee');
  }

  function placeholderPhoto(name) {
    return `https://api.dicebear.com/7.x/initials/svg?seed=${initials(name)}&backgroundColor=6C4DF6,8F75FF,2FD1C5,FF6FA5&textColor=ffffff`;
  }

  /* ---------------------------------------------------------
     Toasts
  --------------------------------------------------------- */
  function toast(message, type = 'info') {
    const container = $('#toastContainer');
    const icons = { success: 'fa-circle-check', error: 'fa-circle-exclamation', info: 'fa-circle-info' };
    const el = document.createElement('div');
    el.className = `toast ${type}`;
    el.innerHTML = `<i class="fa-solid ${icons[type] || icons.info}"></i><span>${escapeHtml(message)}</span>`;
    container.appendChild(el);
    setTimeout(() => {
      el.classList.add('leaving');
      setTimeout(() => el.remove(), 300);
    }, 3200);
  }

  /* ---------------------------------------------------------
     Storage
  --------------------------------------------------------- */
  function saveToStorage() {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(employees));
    } catch (e) {
      toast('Could not save data — storage may be full.', 'error');
    }
  }

  function loadFromStorage() {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      const parsed = raw ? JSON.parse(raw) : [];
      employees = Array.isArray(parsed) ? parsed.filter(Boolean).map(sanitizeEmployee) : [];
    } catch (e) {
      employees = [];
    }
  }

  // Ensures every record has a valid string id and expected fields,
  // so legacy/imported data with mismatched types can't break edit/delete.
  function sanitizeEmployee(e) {
    return {
      id: String(e.id || '').trim() || uid(),
      photo: e.photo || '',
      name: e.name || '',
      email: e.email || '',
      phone: e.phone || '',
      gender: e.gender || 'Other',
      dob: e.dob || '',
      department: e.department || '',
      position: e.position || '',
      salary: Number(e.salary) || 0,
      joining: e.joining || '',
      status: e.status || 'Present',
      address: e.address || ''
    };
  }

  /* ---------------------------------------------------------
     CSV parsing / generation
  --------------------------------------------------------- */
  function parseCSV(text) {
    const lines = text.trim().split(/\r?\n/).filter(l => l.trim().length);
    if (!lines.length) return [];
    const headers = splitCsvLine(lines[0]);
    const rows = [];
    for (let i = 1; i < lines.length; i++) {
      const cells = splitCsvLine(lines[i]);
      const obj = {};
      headers.forEach((h, idx) => { obj[h.trim()] = (cells[idx] || '').trim(); });
      rows.push(obj);
    }
    return rows;
  }

  function splitCsvLine(line) {
    const result = [];
    let current = '';
    let inQuotes = false;
    for (let i = 0; i < line.length; i++) {
      const char = line[i];
      if (char === '"') {
        inQuotes = !inQuotes;
      } else if (char === ',' && !inQuotes) {
        result.push(current);
        current = '';
      } else {
        current += char;
      }
    }
    result.push(current);
    return result;
  }

  function employeesToCSV() {
    const headers = ['EmployeeID', 'Photo', 'Name', 'Email', 'Phone', 'Gender', 'DOB', 'Department', 'Position', 'Salary', 'JoiningDate', 'Status', 'Address'];
    const lines = [headers.join(',')];
    employees.forEach(e => {
      const row = [e.id, '', e.name, e.email, e.phone, e.gender, e.dob, e.department, e.position, e.salary, e.joining, e.status, `"${(e.address || '').replace(/"/g, '""')}"`];
      lines.push(row.join(','));
    });
    return lines.join('\n');
  }

  function downloadFile(filename, content, mime) {
    const blob = new Blob([content], { type: mime });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    a.remove();
    URL.revokeObjectURL(url);
  }

  function handleImportCSV(file) {
    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const rows = parseCSV(e.target.result);
        if (!rows.length) { toast('CSV file appears to be empty.', 'error'); return; }
        const imported = rows.map(row => sanitizeEmployee({
          id: row.EmployeeID,
          photo: row.Photo,
          name: row.Name,
          email: row.Email,
          phone: row.Phone,
          gender: row.Gender,
          dob: row.DOB,
          department: row.Department,
          position: row.Position,
          salary: row.Salary,
          joining: row.JoiningDate,
          status: row.Status,
          address: row.Address
        }));
        employees = mergeById(employees, imported);
        saveToStorage();
        refreshAll();
        toast(`Imported ${imported.length} employees from CSV.`, 'success');
      } catch (err) {
        toast('Failed to parse CSV file.', 'error');
      }
    };
    reader.readAsText(file);
  }

  function mergeById(existing, incoming) {
    const map = new Map(existing.map(e => [e.id, e]));
    incoming.forEach(e => map.set(e.id, { ...map.get(e.id), ...e }));
    return Array.from(map.values());
  }

  /* ---------------------------------------------------------
     Validation
  --------------------------------------------------------- */
  function validateForm() {
    let valid = true;
    const rules = [
      ['empName', v => v.trim().length >= 2, 'Please enter a valid name'],
      ['empEmail', v => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v), 'Enter a valid email address'],
      ['empPhone', v => /^[0-9]{10}$/.test(v.replace(/\D/g, '').slice(-10)), 'Enter a valid 10-digit phone number'],
      ['empGender', v => v !== '', 'Please select a gender'],
      ['empDob', v => v !== '', 'Please select date of birth'],
      ['empDept', v => v !== '', 'Please select a department'],
      ['empPosition', v => v.trim().length >= 2, 'Please enter a position'],
      ['empSalary', v => Number(v) > 0, 'Enter a valid salary amount'],
      ['empJoining', v => v !== '', 'Please select joining date']
    ];

    rules.forEach(([id, test, message]) => {
      const field = $('#' + id);
      const errorEl = field.parentElement.querySelector('.error-text');
      if (!test(field.value)) {
        field.classList.add('invalid');
        if (errorEl) errorEl.textContent = message;
        valid = false;
      } else {
        field.classList.remove('invalid');
        if (errorEl) errorEl.textContent = '';
      }
    });

    return valid;
  }

  /* ---------------------------------------------------------
     Form handling
  --------------------------------------------------------- */
  function resetForm() {
    $('#employeeForm').reset();
    $('#employeeId').value = '';
    editingId = null;
    pendingPhotoDataUrl = '';
    $('#photoPreview').style.display = 'none';
    $('#photoPreview').src = '';
    $('#photoIcon').style.display = '';
    $('#photoLabel').textContent = 'Upload photo';
    $('#submitBtn').innerHTML = '<i class="fa-solid fa-floppy-disk"></i> Save Employee';
    $$('.error-text').forEach(el => el.textContent = '');
    $$('.form-field input, .form-field select').forEach(el => el.classList.remove('invalid'));
  }

  function fillFormForEdit(emp) {
    editingId = emp.id;
    $('#employeeId').value = emp.id;
    $('#empName').value = emp.name;
    $('#empEmail').value = emp.email;
    $('#empPhone').value = emp.phone;
    $('#empGender').value = emp.gender;
    $('#empDob').value = emp.dob || '';
    $('#empDept').value = emp.department;
    $('#empPosition').value = emp.position;
    $('#empSalary').value = emp.salary;
    $('#empJoining').value = emp.joining;
    $('#empStatus').value = emp.status || 'Present';
    $('#empAddress').value = emp.address || '';
    pendingPhotoDataUrl = emp.photo || '';
    if (emp.photo) {
      $('#photoPreview').src = emp.photo;
      $('#photoPreview').style.display = 'block';
      $('#photoIcon').style.display = 'none';
      $('#photoLabel').style.display = 'none';
    }
    $('#submitBtn').innerHTML = '<i class="fa-solid fa-floppy-disk"></i> Update Employee';
    document.getElementById('employees').scrollIntoView({ behavior: 'smooth', block: 'start' });
  }

  function handleFormSubmit(e) {
    e.preventDefault();
    if (!validateForm()) {
      toast('Please fix the highlighted fields.', 'error');
      return;
    }

    const data = {
      id: editingId || uid(),
      photo: pendingPhotoDataUrl || '',
      name: $('#empName').value.trim(),
      email: $('#empEmail').value.trim(),
      phone: $('#empPhone').value.trim(),
      gender: $('#empGender').value,
      dob: $('#empDob').value,
      department: $('#empDept').value,
      position: $('#empPosition').value.trim(),
      salary: Number($('#empSalary').value),
      joining: $('#empJoining').value,
      status: $('#empStatus').value,
      address: $('#empAddress').value.trim()
    };

    if (editingId) {
      const idx = employees.findIndex(e2 => e2.id === editingId);
      if (idx > -1) employees[idx] = data;
      toast(`${data.name} was updated successfully.`, 'success');
    } else {
      employees.unshift(data);
      toast(`${data.name} was added to the directory.`, 'success');
    }

    saveToStorage();
    resetForm();
    refreshAll();
  }

  /* ---------------------------------------------------------
     Photo upload
  --------------------------------------------------------- */
  function initPhotoUpload() {
    const upload = $('#photoUpload');
    const input = $('#photoInput');
    upload.addEventListener('click', () => input.click());
    input.addEventListener('change', () => {
      const file = input.files[0];
      if (!file) return;
      if (!file.type.startsWith('image/')) { toast('Please select an image file.', 'error'); return; }
      const reader = new FileReader();
      reader.onload = (e) => {
        pendingPhotoDataUrl = e.target.result;
        $('#photoPreview').src = pendingPhotoDataUrl;
        $('#photoPreview').style.display = 'block';
        $('#photoIcon').style.display = 'none';
        $('#photoLabel').style.display = 'none';
      };
      reader.readAsDataURL(file);
    });
  }

  /* ---------------------------------------------------------
     Delete flow
  --------------------------------------------------------- */
  function requestDelete(id) {
    deletingId = id;
    openModal('#confirmModalOverlay');
  }

  function confirmDelete() {
    const emp = employees.find(e => e.id === deletingId);
    employees = employees.filter(e => e.id !== deletingId);
    saveToStorage();
    refreshAll();
    closeModal('#confirmModalOverlay');
    toast(emp ? `${emp.name} was removed from the directory.` : 'Employee removed.', 'success');
    deletingId = null;
  }

  /* ---------------------------------------------------------
     View profile
  --------------------------------------------------------- */
  function viewProfile(id) {
    const emp = employees.find(e => e.id === id);
    if (!emp) return;
    $('#modalPhoto').src = emp.photo || placeholderPhoto(emp.name);
    $('#modalName').textContent = emp.name;
    $('#modalStatus').textContent = emp.status;
    $('#modalStatus').className = 'badge ' + statusClass(emp.status);
    $('#modalId').textContent = emp.id;
    $('#modalEmail').textContent = emp.email;
    $('#modalPhone').textContent = emp.phone;
    $('#modalGender').textContent = emp.gender;
    $('#modalDob').textContent = formatDate(emp.dob);
    $('#modalDept').textContent = emp.department;
    $('#modalPosition').textContent = emp.position;
    $('#modalSalary').textContent = formatCurrency(emp.salary);
    $('#modalJoining').textContent = formatDate(emp.joining);
    $('#modalAddress').textContent = emp.address || '—';
    openModal('#profileModalOverlay');
  }

  function statusClass(status) {
    if (norm(status) === 'on leave') return 'leave';
    if (norm(status) === 'remote') return 'remote';
    return 'present';
  }

  /* ---------------------------------------------------------
     Modals
  --------------------------------------------------------- */
  function openModal(sel) {
    $(sel).classList.add('open');
    document.body.style.overflow = 'hidden';
  }
  function closeModal(sel) {
    $(sel).classList.remove('open');
    document.body.style.overflow = '';
  }

  /* ---------------------------------------------------------
     Filtering / Sorting / Pagination
  --------------------------------------------------------- */
  function applyFilters() {
    const search = ($('#tableSearch').value || $('#globalSearch').value || '').toLowerCase().trim();
    const dept = $('#filterDept').value;
    const status = $('#filterStatus').value;
    const salaryRange = $('#filterSalary').value;
    const sortBy = $('#sortBy').value;

    let list = employees.slice();

    if (search) {
      list = list.filter(e =>
        e.name.toLowerCase().includes(search) ||
        e.email.toLowerCase().includes(search) ||
        e.department.toLowerCase().includes(search)
      );
    }
    if (dept) list = list.filter(e => norm(e.department) === norm(dept));
    if (status) list = list.filter(e => norm(e.status) === norm(status));
    if (salaryRange) {
      const [min, max] = salaryRange.split('-').map(Number);
      list = list.filter(e => e.salary >= min && e.salary <= max);
    }

    if (sortBy === 'name-asc') list.sort((a, b) => a.name.localeCompare(b.name));
    else if (sortBy === 'salary-asc') list.sort((a, b) => a.salary - b.salary);
    else if (sortBy === 'salary-desc') list.sort((a, b) => b.salary - a.salary);
    else if (sortBy === 'date-desc') list.sort((a, b) => new Date(b.joining) - new Date(a.joining));
    else if (sortBy === 'date-asc') list.sort((a, b) => new Date(a.joining) - new Date(b.joining));

    filteredEmployees = list;
    currentPage = 1;
    renderTable();
  }

  function renderTable() {
    const tbody = $('#employeeTableBody');
    const emptyState = $('#emptyState');
    const total = filteredEmployees.length;
    $('#resultCount').textContent = `${total} employee${total !== 1 ? 's' : ''} found`;

    if (!total) {
      tbody.innerHTML = '';
      emptyState.style.display = 'flex';
      $('#pagination').innerHTML = '';
      return;
    }
    emptyState.style.display = 'none';

    const totalPages = Math.ceil(total / PAGE_SIZE);
    if (currentPage > totalPages) currentPage = totalPages;
    const start = (currentPage - 1) * PAGE_SIZE;
    const pageItems = filteredEmployees.slice(start, start + PAGE_SIZE);

    tbody.innerHTML = pageItems.map(e => `
      <tr>
        <td><img class="row-photo" src="${e.photo || placeholderPhoto(e.name)}" alt="${escapeHtml(e.name)}" /></td>
        <td><span class="emp-id-tag">${escapeHtml(e.id)}</span></td>
        <td class="emp-name-cell">${escapeHtml(e.name)}</td>
        <td>${escapeHtml(e.email)}</td>
        <td>${escapeHtml(e.phone)}</td>
        <td>${escapeHtml(e.department)}</td>
        <td>${escapeHtml(e.position)}</td>
        <td>${formatCurrency(e.salary)}</td>
        <td>${formatDate(e.joining)}</td>
        <td><span class="badge ${statusClass(e.status)}">${escapeHtml(e.status)}</span></td>
        <td>
          <div class="action-btns">
            <button class="action-btn view" title="View" data-action="view" data-id="${e.id}"><i class="fa-solid fa-eye"></i></button>
            <button class="action-btn edit" title="Edit" data-action="edit" data-id="${e.id}"><i class="fa-solid fa-pen"></i></button>
            <button class="action-btn delete" title="Delete" data-action="delete" data-id="${e.id}"><i class="fa-solid fa-trash"></i></button>
          </div>
        </td>
      </tr>
    `).join('');

    renderPagination(totalPages);
  }

  function renderPagination(totalPages) {
    const el = $('#pagination');
    if (totalPages <= 1) { el.innerHTML = ''; return; }
    let html = `<button class="page-btn" data-page="prev" ${currentPage === 1 ? 'disabled' : ''}><i class="fa-solid fa-chevron-left"></i></button>`;
    for (let i = 1; i <= totalPages; i++) {
      html += `<button class="page-btn ${i === currentPage ? 'active' : ''}" data-page="${i}">${i}</button>`;
    }
    html += `<button class="page-btn" data-page="next" ${currentPage === totalPages ? 'disabled' : ''}><i class="fa-solid fa-chevron-right"></i></button>`;
    el.innerHTML = html;
  }

  /* ---------------------------------------------------------
     Table event delegation
  --------------------------------------------------------- */
  function initTableEvents() {
    $('#employeeTableBody').addEventListener('click', (e) => {
      const btn = e.target.closest('button[data-action]');
      if (!btn) return;
      const id = btn.dataset.id;
      const action = btn.dataset.action;
      if (action === 'view') viewProfile(id);
      else if (action === 'edit') fillFormForEdit(employees.find(x => x.id === id));
      else if (action === 'delete') requestDelete(id);
    });

    $('#pagination').addEventListener('click', (e) => {
      const btn = e.target.closest('.page-btn');
      if (!btn || btn.disabled) return;
      const page = btn.dataset.page;
      const totalPages = Math.ceil(filteredEmployees.length / PAGE_SIZE);
      if (page === 'prev') currentPage = Math.max(1, currentPage - 1);
      else if (page === 'next') currentPage = Math.min(totalPages, currentPage + 1);
      else currentPage = Number(page);
      renderTable();
      document.querySelector('.table-card').scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    });
  }

  /* ---------------------------------------------------------
     Dashboard stats + counter animation
  --------------------------------------------------------- */
  function animateCounter(el, target, isCurrency = false) {
    const duration = 900;
    const start = performance.now();
    const from = 0;
    function tick(now) {
      const progress = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      const value = Math.round(from + (target - from) * eased);
      el.textContent = isCurrency ? value.toLocaleString('en-IN') : value.toLocaleString('en-IN');
      if (progress < 1) requestAnimationFrame(tick);
    }
    requestAnimationFrame(tick);
  }

  function renderStats() {
    const total = employees.length;
    const depts = new Set(employees.map(e => norm(e.department)).filter(Boolean)).size;
    const avgSalary = total ? Math.round(employees.reduce((s, e) => s + (Number(e.salary) || 0), 0) / total) : 0;
    const ninetyDaysAgo = new Date();
    ninetyDaysAgo.setDate(ninetyDaysAgo.getDate() - 90);
    const newEmployees = employees.filter(e => e.joining && new Date(e.joining) >= ninetyDaysAgo).length;
    const male = employees.filter(e => norm(e.gender) === 'male').length;
    const female = employees.filter(e => norm(e.gender) === 'female').length;

    animateCounter($('#statTotalEmployees'), total);
    animateCounter($('#statTotalDepartments'), depts);
    animateCounter($('#statAvgSalary'), avgSalary, true);
    animateCounter($('#statNewEmployees'), newEmployees);
    animateCounter($('#statMale'), male);
    animateCounter($('#statFemale'), female);
  }

  /* ---------------------------------------------------------
     Charts
  --------------------------------------------------------- */
  function chartTextColor() {
    return getComputedStyle(document.body).getPropertyValue('--ink-700').trim() || '#443B63';
  }

  function destroyCharts() {
    [genderChart, deptChart].forEach(c => c && c.destroy());
  }

  function renderCharts() {
    destroyCharts();
    const textColor = chartTextColor();
    Chart.defaults.font.family = "'Poppins', sans-serif";
    Chart.defaults.color = textColor;

    // Gender pie (male/female matched case-insensitively; anything else falls under "Other")
    const male = employees.filter(e => norm(e.gender) === 'male').length;
    const female = employees.filter(e => norm(e.gender) === 'female').length;
    const other = employees.length - male - female;
    genderChart = new Chart($('#genderPieChart'), {
      type: 'doughnut',
      data: {
        labels: ['Male', 'Female', 'Other'],
        datasets: [{ data: [male, female, other], backgroundColor: ['#6C4DF6', '#FF6FA5', '#2FD1C5'], borderWidth: 0 }]
      },
      options: { plugins: { legend: { position: 'bottom', labels: { padding: 16, usePointStyle: true } } }, cutout: '65%' }
    });

    // Department bar
    const deptCounts = DEPARTMENTS.map(d => employees.filter(e => norm(e.department) === norm(d)).length);
    deptChart = new Chart($('#deptBarChart'), {
      type: 'bar',
      data: {
        labels: DEPARTMENTS,
        datasets: [{ data: deptCounts, backgroundColor: '#8F75FF', borderRadius: 8, maxBarThickness: 34 }]
      },
      options: {
        plugins: { legend: { display: false } },
        scales: { y: { beginAtZero: true, grid: { color: 'rgba(108,77,246,0.08)' } }, x: { grid: { display: false } } }
      }
    });

  }

  /* ---------------------------------------------------------
     Navigation
  --------------------------------------------------------- */
  function initNavigation() {
    $$('.nav-link').forEach(link => {
      link.addEventListener('click', (e) => {
        e.preventDefault();
        const section = link.dataset.section;
        $$('.nav-link').forEach(l => l.classList.remove('active'));
        link.classList.add('active');
        $$('.page-section').forEach(s => s.classList.remove('active'));
        $('#' + section).classList.add('active');

        const titles = {
          dashboard: ['Employee Management Dashboard', "Welcome back — here's what's happening today."],
          employees: ['Employees', 'Manage your workforce directory']
        };
        $('#pageTitle').textContent = titles[section][0];
        $('#pageSubtitle').textContent = titles[section][1];

        if (window.innerWidth <= 1024) $('#sidebar').classList.remove('open');
      });
    });
  }

  /* ---------------------------------------------------------
     Ripple effect
  --------------------------------------------------------- */
  function initRipple() {
    document.addEventListener('click', (e) => {
      const btn = e.target.closest('.ripple');
      if (!btn) return;
      const rect = btn.getBoundingClientRect();
      const ripple = document.createElement('span');
      const size = Math.max(rect.width, rect.height);
      ripple.className = 'ripple-effect';
      ripple.style.width = ripple.style.height = size + 'px';
      ripple.style.left = (e.clientX - rect.left - size / 2) + 'px';
      ripple.style.top = (e.clientY - rect.top - size / 2) + 'px';
      btn.appendChild(ripple);
      setTimeout(() => ripple.remove(), 650);
    });
  }

  /* ---------------------------------------------------------
     Wire up all events
  --------------------------------------------------------- */
  function initEvents() {
    $('#employeeForm').addEventListener('submit', handleFormSubmit);
    $('#resetBtn').addEventListener('click', resetForm);

    $('#tableSearch').addEventListener('input', applyFilters);
    $('#globalSearch').addEventListener('input', () => { $('#tableSearch').value = $('#globalSearch').value; applyFilters(); $$('.nav-link').forEach(l=>l.classList.remove('active')); $('[data-section="employees"]').classList.add('active'); $$('.page-section').forEach(s=>s.classList.remove('active')); $('#employees').classList.add('active'); });
    $('#filterDept').addEventListener('change', applyFilters);
    $('#filterStatus').addEventListener('change', applyFilters);
    $('#filterSalary').addEventListener('change', applyFilters);
    $('#sortBy').addEventListener('change', applyFilters);

    $('#importBtn').addEventListener('click', () => $('#importInput').click());
    $('#importInput').addEventListener('change', (e) => {
      if (e.target.files[0]) handleImportCSV(e.target.files[0]);
      e.target.value = '';
    });
    $('#exportBtn').addEventListener('click', () => {
      downloadFile('employees.csv', employeesToCSV(), 'text/csv');
      toast('Employee data exported to CSV.', 'success');
    });

    $('#profileModalClose').addEventListener('click', () => closeModal('#profileModalOverlay'));
    $('#profileModalOverlay').addEventListener('click', (e) => { if (e.target.id === 'profileModalOverlay') closeModal('#profileModalOverlay'); });

    $('#cancelDeleteBtn').addEventListener('click', () => { closeModal('#confirmModalOverlay'); deletingId = null; });
    $('#confirmDeleteBtn').addEventListener('click', confirmDelete);
    $('#confirmModalOverlay').addEventListener('click', (e) => { if (e.target.id === 'confirmModalOverlay') { closeModal('#confirmModalOverlay'); deletingId = null; } });

    $('#hamburgerBtn').addEventListener('click', () => $('#sidebar').classList.toggle('open'));

    $('#clearDataBtn').addEventListener('click', () => {
      if (!employees.length) { toast('There is no data to clear.', 'info'); return; }
      if (confirm('This will permanently delete all employee records stored in this browser. Continue?')) {
        employees = [];
        saveToStorage();
        refreshAll();
        toast('All employee data cleared.', 'success');
      }
    });

    window.addEventListener('resize', () => { if (window.innerWidth > 1024) $('#sidebar').classList.remove('open'); });

    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') {
        closeModal('#profileModalOverlay');
        closeModal('#confirmModalOverlay');
      }
    });
  }

  /* ---------------------------------------------------------
     Refresh everything
  --------------------------------------------------------- */
  function refreshAll() {
    renderStats();
    applyFilters();
    renderCharts();
  }

  /* ---------------------------------------------------------
     Init
  --------------------------------------------------------- */
  function init() {
    loadFromStorage();

    initPhotoUpload();
    initTableEvents();
    initNavigation();
    initRipple();
    initEvents();
    refreshAll();

    setTimeout(() => $('#loadingSpinner').classList.add('hidden'), 500);
  }

  document.addEventListener('DOMContentLoaded', init);
})();
