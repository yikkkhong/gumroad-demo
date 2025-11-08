// Main Application
document.addEventListener('DOMContentLoaded', function() {
    // Initialize the application
    initNavigation();
    initButtons();
    initTabs();
    initModals();
    loadSampleData(); // Load sample data after other initializations
    
    // Show dashboard by default
    const dashboardSection = document.getElementById('dashboard');
    if (dashboardSection) {
        dashboardSection.classList.add('active');
    }
    
    showToast('Welcome to LexPro Law Firm Management System!');
});

// Sample data storage
let appData = {
    clients: [],
    cases: [],
    events: [],
    invoices: [],
    settings: {
        firmName: 'Davidson & Associates Law Firm',
        hourlyRate: 350,
        paymentTerms: 30
    }
};

// Navigation functionality
function initNavigation() {
    const menuItems = document.querySelectorAll('.menu-item');
    
    menuItems.forEach(item => {
        item.addEventListener('click', function(e) {
            e.preventDefault();
            
            // Remove active class from all menu items and content sections
            menuItems.forEach(i => i.classList.remove('active'));
            document.querySelectorAll('.content-section').forEach(section => {
                section.classList.remove('active');
            });
            
            // Add active class to clicked menu item
            this.classList.add('active');
            
            // Show corresponding content section
            const sectionId = this.getAttribute('data-section');
            const targetSection = document.getElementById(sectionId);
            if (targetSection) {
                targetSection.classList.add('active');
                
                // Special handling for calendar section
                if (sectionId === 'calendar-section') {
                    // Re-initialize calendar when navigating to it
                    initCalendar();
                } else {
                    // Refresh other sections
                    refreshSectionData(sectionId);
                }
            }
        });
    });

    // Stat cards navigation
    document.querySelectorAll('.stat-card').forEach(card => {
        card.addEventListener('click', function() {
            const section = this.getAttribute('data-section');
            if (section) {
                // Update menu and show section
                document.querySelectorAll('.menu-item').forEach(i => i.classList.remove('active'));
                document.querySelector(`.menu-item[data-section="${section}"]`).classList.add('active');
                
                document.querySelectorAll('.content-section').forEach(s => s.classList.remove('active'));
                document.getElementById(section).classList.add('active');
                
                refreshSectionData(section);
            }
        });
    });
}

function refreshSectionData(sectionId) {
    switch(sectionId) {
        case 'clients':
            renderClientsTable();
            break;
        case 'cases':
            renderCasesTable();
            break;
        case 'calendar-section':
            renderFullCalendar();
            break;
        case 'billing':
            renderBillingInvoices();
            break;
        case 'reports':
            updateReports();
            break;
        case 'settings':
            loadSettings();
            break;
    }
}

// Button functionality
function initButtons() {
    // Client buttons
    document.getElementById('addClientBtn')?.addEventListener('click', () => showClientModal());
    
    // Case buttons
    document.getElementById('newCaseBtn')?.addEventListener('click', () => showCaseModal());
    document.getElementById('addCaseBtn')?.addEventListener('click', () => showCaseModal());
    
    // Event buttons
    document.getElementById('addEventBtn')?.addEventListener('click', () => showEventModal());
    document.getElementById('addCalendarEventBtn')?.addEventListener('click', () => showEventModal());
    
    // Calendar navigation
    document.getElementById('prevMonthBtn')?.addEventListener('click', () => navigateCalendar(-1));
    document.getElementById('nextMonthBtn')?.addEventListener('click', () => navigateCalendar(1));
    
    // Billing buttons
    document.getElementById('generateReportBtn')?.addEventListener('click', generateReport);
    document.getElementById('createInvoiceBtn')?.addEventListener('click', () => showInvoiceModal());
    document.getElementById('generateFullReportBtn')?.addEventListener('click', generateFullReport);
    
    // Settings button
    document.getElementById('saveSettingsBtn')?.addEventListener('click', saveSettings);
}

// Calendar functionality
let currentCalendarDate = new Date();

function initCalendar() {
    renderFullCalendar();
    
    // Initialize event listeners for calendar navigation
    const prevBtn = document.getElementById('prevMonthBtn');
    const nextBtn = document.getElementById('nextMonthBtn');
    const addEventBtn = document.getElementById('addCalendarEventBtn');
    
    if (prevBtn) prevBtn.addEventListener('click', () => navigateCalendar(-1));
    if (nextBtn) nextBtn.addEventListener('click', () => navigateCalendar(1));
    if (addEventBtn) addEventBtn.addEventListener('click', showEventModal);
    
    // Initialize event form submission
    const eventForm = document.getElementById('event-form');
    if (eventForm) {
        eventForm.addEventListener('submit', handleEventSubmit);
    }
}

function renderFullCalendar() {
    const calendar = document.getElementById('calendar-full');
    const monthDisplay = document.getElementById('full-calendar-month');
    
    if (!calendar || !monthDisplay) return;
    
    const monthNames = ['January', 'February', 'March', 'April', 'May', 'June',
                       'July', 'August', 'September', 'October', 'November', 'December'];
    const currentMonth = currentCalendarDate.getMonth();
    const currentYear = currentCalendarDate.getFullYear();
    
    monthDisplay.textContent = `${monthNames[currentMonth]} ${currentYear}`;
    
    // Clear previous calendar
    calendar.innerHTML = '';
    
    // Add day headers
    const dayNames = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    dayNames.forEach(day => {
        const dayHeader = document.createElement('div');
        dayHeader.className = 'calendar-full-day-header';
        dayHeader.textContent = day;
        calendar.appendChild(dayHeader);
    });
    
    // Get first day of month and number of days
    const firstDay = new Date(currentYear, currentMonth, 1).getDay();
    const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();
    const today = new Date();
    
    // Add days from previous month
    const prevMonthDays = new Date(currentYear, currentMonth, 0).getDate();
    for (let i = firstDay - 1; i >= 0; i--) {
        const dayElement = createDayElement(prevMonthDays - i, true);
        calendar.appendChild(dayElement);
    }
    
    // Add days from current month
    for (let i = 1; i <= daysInMonth; i++) {
        const dayElement = createDayElement(i, false);
        const dayDate = new Date(currentYear, currentMonth, i);
        
        // Check if it's today
        if (dayDate.toDateString() === today.toDateString()) {
            dayElement.classList.add('today');
        }
        
        // Add events for this day
        const dayEvents = getEventsForDay(dayDate);
        if (dayEvents.length > 0) {
            const eventsContainer = document.createElement('div');
            eventsContainer.className = 'day-events';
            
            dayEvents.forEach(event => {
                const eventElement = document.createElement('div');
                eventElement.className = 'calendar-full-event';
                eventElement.textContent = event.title;
                eventElement.title = `${event.title}\n${formatEventTime(event.date)}`;
                eventElement.addEventListener('click', (e) => {
                    e.stopPropagation();
                    showEventDetails(event);
                });
                eventsContainer.appendChild(eventElement);
            });
            
            dayElement.appendChild(eventsContainer);
        }
        
        calendar.appendChild(dayElement);
    }
    
    // Add days from next month to complete the grid
    const totalCells = Math.ceil((firstDay + daysInMonth) / 7) * 7;
    const nextMonthDays = totalCells - (firstDay + daysInMonth);
    
    for (let i = 1; i <= nextMonthDays; i++) {
        const dayElement = createDayElement(i, true);
        calendar.appendChild(dayElement);
    }
}

function createDayElement(day, isOtherMonth) {
    const dayElement = document.createElement('div');
    dayElement.className = `calendar-full-day ${isOtherMonth ? 'other-month' : ''}`;
    
    const dayNumber = document.createElement('div');
    dayNumber.className = 'calendar-full-day-number';
    dayNumber.textContent = day;
    
    dayElement.appendChild(dayNumber);
    
    // Add click handler to create new events
    dayElement.addEventListener('click', () => {
        const date = new Date(currentCalendarDate);
        date.setDate(day);
        showEventModal(date);
    });
    
    return dayElement;
}

function getEventsForDay(date) {
    if (!appData.events) return [];
    
    return appData.events.filter(event => {
        const eventDate = new Date(event.date);
        return eventDate.getDate() === date.getDate() &&
               eventDate.getMonth() === date.getMonth() &&
               eventDate.getFullYear() === date.getFullYear();
    });
}

function formatEventTime(dateString) {
    const date = new Date(dateString);
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
}

function navigateCalendar(direction) {
    currentCalendarDate = new Date(
        currentCalendarDate.getFullYear(),
        currentCalendarDate.getMonth() + direction,
        1
    );
    renderFullCalendar();
}

function generateCalendar(container, month, year, isDashboard = false) {
    container.innerHTML = '';
    
    const monthNames = ['January', 'February', 'March', 'April', 'May', 'June',
                       'July', 'August', 'September', 'October', 'November', 'December'];
    
    // Add calendar header for dashboard
    if (isDashboard) {
        const header = document.createElement('div');
        header.className = 'calendar-header';
        header.textContent = `${monthNames[month]} ${year}`;
        container.appendChild(header);
    } else {
        const header = document.createElement('div');
        header.className = 'calendar-full-header';
        header.textContent = `${monthNames[month]} ${year}`;
        container.appendChild(header);
    }
    
    // Add day headers
    const dayNames = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    dayNames.forEach(day => {
        const dayHeader = document.createElement('div');
        dayHeader.className = isDashboard ? 'calendar-day calendar-day-header' : 'calendar-full-day calendar-full-day-header';
        dayHeader.textContent = day;
        container.appendChild(dayHeader);
    });
    
    // Get first day of month and number of days
    const firstDay = new Date(year, month, 1).getDay();
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    const today = new Date();
    
    // Add days from previous month
    const prevMonthDays = new Date(year, month, 0).getDate();
    for (let i = firstDay - 1; i >= 0; i--) {
        const dayElement = document.createElement('div');
        dayElement.className = isDashboard ? 'calendar-day other-month' : 'calendar-full-day other-month';
        dayElement.textContent = prevMonthDays - i;
        container.appendChild(dayElement);
    }
    
    // Add days from current month
    for (let i = 1; i <= daysInMonth; i++) {
        const dayElement = document.createElement('div');
        dayElement.className = isDashboard ? 'calendar-day' : 'calendar-full-day';
        
        // Check if this is today
        if (i === today.getDate() && month === today.getMonth() && year === today.getFullYear()) {
            dayElement.classList.add('today');
        }
        
        dayElement.textContent = i;
        
        // Add events for this day
        const dayEvents = appData.events.filter(event => {
            const eventDate = new Date(event.date);
            return eventDate.getDate() === i && 
                   eventDate.getMonth() === month && 
                   eventDate.getFullYear() === year;
        });
        
        dayEvents.forEach(event => {
            const eventElement = document.createElement('div');
            eventElement.className = isDashboard ? 'calendar-event' : 'calendar-full-event';
            eventElement.textContent = event.title;
            eventElement.addEventListener('click', (e) => {
                e.stopPropagation();
                showEventDetails(event);
            });
            dayElement.appendChild(eventElement);
        });
        
        container.appendChild(dayElement);
    }
    
    // Add days from next month to complete the grid
    const totalCells = isDashboard ? 42 : 49; // 6 or 7 rows x 7 days
    const daysSoFar = firstDay + daysInMonth;
    const nextMonthDays = totalCells - daysSoFar;
    
    for (let i = 1; i <= nextMonthDays; i++) {
        const dayElement = document.createElement('div');
        dayElement.className = isDashboard ? 'calendar-day other-month' : 'calendar-full-day other-month';
        dayElement.textContent = i;
        container.appendChild(dayElement);
    }
}

// Tab functionality
function initTabs() {
    const tabs = document.querySelectorAll('.tab');
    
    tabs.forEach(tab => {
        tab.addEventListener('click', function() {
            const tabContainer = this.closest('.card-body');
            if (!tabContainer) return;
            
            // Remove active class from all tabs in this container
            tabContainer.querySelectorAll('.tab').forEach(t => t.classList.remove('active'));
            
            // Add active class to clicked tab
            this.classList.add('active');
            
            // Hide all tab contents in this container
            tabContainer.querySelectorAll('.tab-content').forEach(content => {
                content.classList.remove('active');
            });
            
            // Show the corresponding tab content
            const tabId = this.getAttribute('data-tab');
            const targetContent = tabContainer.querySelector(`#${tabId}`);
            if (targetContent) {
                targetContent.classList.add('active');
            }
        });
    });
}

// Modal functionality
function initModals() {
    // General modal
    const modal = document.getElementById('modal');
    const closeBtn = modal.querySelector('.close');
    
    closeBtn.addEventListener('click', () => modal.style.display = 'none');
    window.addEventListener('click', (event) => {
        if (event.target === modal) modal.style.display = 'none';
    });

    // Event modal
    const eventModal = document.getElementById('event-modal');
    const eventCloseBtn = eventModal.querySelector('.close');
    const eventForm = document.getElementById('event-form');
    
    eventCloseBtn.addEventListener('click', () => eventModal.style.display = 'none');
    window.addEventListener('click', (event) => {
        if (event.target === eventModal) eventModal.style.display = 'none';
    });
    
    eventForm.addEventListener('submit', function(e) {
        e.preventDefault();
        const title = document.getElementById('event-title').value;
        const date = document.getElementById('event-date').value;
        const time = document.getElementById('event-time').value;
        const type = document.getElementById('event-type').value;
        const notes = document.getElementById('event-notes').value;
        
        const newEvent = {
            id: Date.now(),
            title,
            date: `${date}T${time}`,
            type,
            notes
        };
        
        appData.events.push(newEvent);
        renderDashboardCalendar();
        renderFullCalendar();
        eventModal.style.display = 'none';
        eventForm.reset();
        showToast('Event added successfully!');
    });
}

function showClientModal() {
    // In a real app, this would show a client form
    showToast('Client management form would open here');
}

function showCaseModal() {
    // In a real app, this would show a case form
    showToast('Case management form would open here');
}

function showEventModal(selectedDate = null) {
    const modal = document.getElementById('event-modal');
    const form = document.getElementById('event-form');
    
    // Reset form
    form.reset();
    
    // Set default values
    const now = selectedDate || new Date();
    const dateStr = now.toISOString().split('T')[0];
    const timeStr = now.toTimeString().substring(0, 5);
    
    document.getElementById('event-date').value = dateStr;
    document.getElementById('event-time').value = timeStr;
    
    // Show the modal
    modal.style.display = 'block';
    
    // Store the selected date for new events
    if (selectedDate) {
        form.dataset.selectedDate = selectedDate.toISOString();
    } else {
        delete form.dataset.selectedDate;
    }
}

function handleEventSubmit(e) {
    e.preventDefault();
    
    const form = e.target;
    const title = form.querySelector('#event-title').value.trim();
    const date = form.querySelector('#event-date').value;
    const time = form.querySelector('#event-time').value;
    const type = form.querySelector('#event-type').value;
    const notes = form.querySelector('#event-notes').value;
    
    if (!title) {
        showToast('Please enter an event title', 'error');
        return;
    }
    
    // Create or update event
    const event = {
        id: Date.now().toString(),
        title,
        date: new Date(`${date}T${time}`).toISOString(),
        type,
        notes
    };
    
    // In a real app, you would save this to a database
    if (!appData.events) appData.events = [];
    appData.events.push(event);
    
    // Update UI
    renderFullCalendar();
    
    // Close modal
    form.reset();
    document.getElementById('event-modal').style.display = 'none';
    
    showToast('Event added successfully!', 'success');
}

function showInvoiceModal() {
    // In a real app, this would show an invoice form
    showToast('Invoice creation form would open here');
}

function showEventDetails(event) {
    showToast(`Event: ${event.title}\nDate: ${new Date(event.date).toLocaleString()}\nType: ${event.type}`);
}

// Data management
// Data management (continued)
function loadSampleData() {
    // Sample clients
    appData.clients = [
        { id: 1, name: 'Robert Johnson', email: 'r.johnson@email.com', phone: '(555) 123-4567', cases: 2, status: 'active' },
        { id: 2, name: 'Sarah Peterson', email: 's.peterson@email.com', phone: '(555) 234-5678', cases: 1, status: 'active' },
        { id: 3, name: 'David Williams', email: 'd.williams@email.com', phone: '(555) 345-6789', cases: 1, status: 'active' },
        { id: 4, name: 'Anderson Enterprises', email: 'legal@anderson.com', phone: '(555) 456-7890', cases: 3, status: 'active' }
    ];

    // Sample cases
    appData.cases = [
        { id: 'C-4821', name: 'Johnson vs. State Corp', client: 'Robert Johnson', type: 'Civil Litigation', status: 'active', date: '2023-09-15' },
        { id: 'C-4815', name: 'Estate of Margaret Williams', client: 'David Williams', type: 'Estate Planning', status: 'pending', date: '2023-10-01' },
        { id: 'C-4798', name: 'Anderson Contract Dispute', client: 'Anderson Enterprises', type: 'Contract Law', status: 'active', date: '2023-08-22' },
        { id: 'C-4773', name: 'Peterson Divorce', client: 'Sarah Peterson', type: 'Family Law', status: 'closed', date: '2023-07-10' }
    ];

    // Sample events
    appData.events = [
        { id: 1, title: 'Court Hearing - Johnson Case', date: '2023-10-12T10:00:00', type: 'hearing', notes: 'State Courthouse - Room 405' },
        { id: 2, title: 'Client Meeting - Anderson', date: '2023-10-16T14:00:00', type: 'meeting', notes: 'Discuss contract terms' },
        { id: 3, title: 'Filing Deadline - Williams Estate', date: '2023-10-25T17:00:00', type: 'deadline', notes: 'Submit probate documents' }
    ];

    // Sample invoices
    appData.invoices = [
        { id: 'INV-2841', client: 'Robert Johnson', date: '2023-10-10', dueDate: '2023-11-09', amount: 5250.00, status: 'paid' },
        { id: 'INV-2837', client: 'Anderson Enterprises', date: '2023-10-05', dueDate: '2023-11-04', amount: 8750.00, status: 'pending' },
        { id: 'INV-2829', client: 'Sarah Peterson', date: '2023-09-28', dueDate: '2023-10-28', amount: 3500.00, status: 'paid' },
        { id: 'INV-2815', client: 'David Williams', date: '2023-09-15', dueDate: '2023-10-15', amount: 2200.00, status: 'overdue' }
    ];

    // Update UI with sample data
    updateDashboardStats();
    renderRecentCases();
    renderClientsTable();
    renderCasesTable();
    renderBillingInvoices();
    renderDashboardInvoices();
}

function updateDashboardStats() {
    document.getElementById('clients-count').textContent = appData.clients.length;
    document.getElementById('cases-count').textContent = appData.cases.filter(c => c.status === 'active').length;
    document.getElementById('revenue-amount').textContent = '$' + appData.invoices
        .filter(i => i.status === 'paid')
        .reduce((sum, inv) => sum + inv.amount, 0)
        .toLocaleString();
    document.getElementById('tasks-count').textContent = appData.events.length;
}

function renderRecentCases() {
    const tbody = document.querySelector('#recent-cases-table tbody');
    if (!tbody) return;

    tbody.innerHTML = '';
    
    const recentCases = appData.cases.slice(0, 4); // Show only 4 recent cases
    
    recentCases.forEach(caseItem => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${caseItem.id}</td>
            <td>${caseItem.name}</td>
            <td>${caseItem.client}</td>
            <td>${caseItem.type}</td>
            <td><span class="status-badge status-${caseItem.status}">${caseItem.status.charAt(0).toUpperCase() + caseItem.status.slice(1)}</span></td>
            <td>${new Date(caseItem.date).toLocaleDateString()}</td>
            <td>
                <div class="action-buttons">
                    <button class="action-btn view-case" data-case="${caseItem.id}"><i class="fas fa-eye"></i></button>
                    <button class="action-btn edit-case" data-case="${caseItem.id}"><i class="fas fa-edit"></i></button>
                </div>
            </td>
        `;
        tbody.appendChild(row);
    });

    // Add event listeners for action buttons
    document.querySelectorAll('.view-case').forEach(btn => {
        btn.addEventListener('click', function() {
            const caseId = this.getAttribute('data-case');
            viewCaseDetails(caseId);
        });
    });

    document.querySelectorAll('.edit-case').forEach(btn => {
        btn.addEventListener('click', function() {
            const caseId = this.getAttribute('data-case');
            editCase(caseId);
        });
    });
}

function renderClientsTable() {
    const tbody = document.querySelector('#clients-table tbody');
    if (!tbody) return;

    tbody.innerHTML = '';
    
    appData.clients.forEach(client => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>#${client.id}</td>
            <td>${client.name}</td>
            <td>${client.email}</td>
            <td>${client.phone}</td>
            <td>${client.cases}</td>
            <td><span class="status-badge status-active">Active</span></td>
            <td>
                <div class="action-buttons">
                    <button class="action-btn view-client" data-client="${client.id}"><i class="fas fa-eye"></i></button>
                    <button class="action-btn edit-client" data-client="${client.id}"><i class="fas fa-edit"></i></button>
                    <button class="action-btn delete-client" data-client="${client.id}"><i class="fas fa-trash"></i></button>
                </div>
            </td>
        `;
        tbody.appendChild(row);
    });

    // Add event listeners for client actions
    document.querySelectorAll('.view-client').forEach(btn => {
        btn.addEventListener('click', function() {
            const clientId = this.getAttribute('data-client');
            viewClientDetails(clientId);
        });
    });

    document.querySelectorAll('.edit-client').forEach(btn => {
        btn.addEventListener('click', function() {
            const clientId = this.getAttribute('data-client');
            editClient(clientId);
        });
    });

    document.querySelectorAll('.delete-client').forEach(btn => {
        btn.addEventListener('click', function() {
            const clientId = this.getAttribute('data-client');
            deleteClient(clientId);
        });
    });
}

function renderCasesTable() {
    const tbody = document.querySelector('#cases-table tbody');
    if (!tbody) return;

    tbody.innerHTML = '';
    
    appData.cases.forEach(caseItem => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${caseItem.id}</td>
            <td>${caseItem.name}</td>
            <td>${caseItem.client}</td>
            <td>${caseItem.type}</td>
            <td><span class="status-badge status-${caseItem.status}">${caseItem.status.charAt(0).toUpperCase() + caseItem.status.slice(1)}</span></td>
            <td>${new Date(caseItem.date).toLocaleDateString()}</td>
            <td>
                <div class="action-buttons">
                    <button class="action-btn view-case" data-case="${caseItem.id}"><i class="fas fa-eye"></i></button>
                    <button class="action-btn edit-case" data-case="${caseItem.id}"><i class="fas fa-edit"></i></button>
                    <button class="action-btn delete-case" data-case="${caseItem.id}"><i class="fas fa-trash"></i></button>
                </div>
            </td>
        `;
        tbody.appendChild(row);
    });

    // Add event listeners for case actions
    document.querySelectorAll('.view-case').forEach(btn => {
        btn.addEventListener('click', function() {
            const caseId = this.getAttribute('data-case');
            viewCaseDetails(caseId);
        });
    });

    document.querySelectorAll('.edit-case').forEach(btn => {
        btn.addEventListener('click', function() {
            const caseId = this.getAttribute('data-case');
            editCase(caseId);
        });
    });

    document.querySelectorAll('.delete-case').forEach(btn => {
        btn.addEventListener('click', function() {
            const caseId = this.getAttribute('data-case');
            deleteCase(caseId);
        });
    });
}

function renderBillingInvoices() {
    const tbody = document.querySelector('#billing-invoices-table tbody');
    if (!tbody) return;

    tbody.innerHTML = '';
    
    appData.invoices.forEach(invoice => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${invoice.id}</td>
            <td>${invoice.client}</td>
            <td>${new Date(invoice.date).toLocaleDateString()}</td>
            <td>${new Date(invoice.dueDate).toLocaleDateString()}</td>
            <td>$${invoice.amount.toLocaleString()}</td>
            <td><span class="status-badge status-${invoice.status}">${invoice.status.charAt(0).toUpperCase() + invoice.status.slice(1)}</span></td>
            <td>
                <div class="action-buttons">
                    <button class="action-btn download-invoice" data-invoice="${invoice.id}"><i class="fas fa-download"></i></button>
                    <button class="action-btn print-invoice" data-invoice="${invoice.id}"><i class="fas fa-print"></i></button>
                    <button class="action-btn edit-invoice" data-invoice="${invoice.id}"><i class="fas fa-edit"></i></button>
                </div>
            </td>
        `;
        tbody.appendChild(row);
    });

    // Add event listeners for invoice actions
    document.querySelectorAll('.download-invoice').forEach(btn => {
        btn.addEventListener('click', function() {
            const invoiceId = this.getAttribute('data-invoice');
            downloadInvoice(invoiceId);
        });
    });

    document.querySelectorAll('.print-invoice').forEach(btn => {
        btn.addEventListener('click', function() {
            const invoiceId = this.getAttribute('data-invoice');
            printInvoice(invoiceId);
        });
    });

    document.querySelectorAll('.edit-invoice').forEach(btn => {
        btn.addEventListener('click', function() {
            const invoiceId = this.getAttribute('data-invoice');
            editInvoice(invoiceId);
        });
    });
}

function renderDashboardInvoices() {
    const tbody = document.querySelector('#invoices-table tbody');
    if (!tbody) return;

    tbody.innerHTML = '';
    
    const recentInvoices = appData.invoices.slice(0, 3); // Show only 3 recent invoices
    
    recentInvoices.forEach(invoice => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${invoice.id}</td>
            <td>${invoice.client}</td>
            <td>${new Date(invoice.date).toLocaleDateString()}</td>
            <td>$${invoice.amount.toLocaleString()}</td>
            <td><span class="status-badge status-${invoice.status}">${invoice.status.charAt(0).toUpperCase() + invoice.status.slice(1)}</span></td>
            <td>
                <div class="action-buttons">
                    <button class="action-btn download-invoice" data-invoice="${invoice.id}"><i class="fas fa-download"></i></button>
                    <button class="action-btn print-invoice" data-invoice="${invoice.id}"><i class="fas fa-print"></i></button>
                </div>
            </td>
        `;
        tbody.appendChild(row);
    });
}

// Action functions
function viewClientDetails(clientId) {
    const client = appData.clients.find(c => c.id == clientId);
    if (client) {
        showToast(`Client Details:\nName: ${client.name}\nEmail: ${client.email}\nPhone: ${client.phone}\nActive Cases: ${client.cases}`);
    }
}

function editClient(clientId) {
    const client = appData.clients.find(c => c.id == clientId);
    if (client) {
        showToast(`Editing client: ${client.name}`, 'warning');
        // In a real app, this would open an edit form
    }
}

function deleteClient(clientId) {
    if (confirm('Are you sure you want to delete this client?')) {
        appData.clients = appData.clients.filter(c => c.id != clientId);
        renderClientsTable();
        updateDashboardStats();
        showToast('Client deleted successfully', 'success');
    }
}

function viewCaseDetails(caseId) {
    const caseItem = appData.cases.find(c => c.id === caseId);
    if (caseItem) {
        showToast(`Case Details:\nID: ${caseItem.id}\nName: ${caseItem.name}\nClient: ${caseItem.client}\nType: ${caseItem.type}\nStatus: ${caseItem.status}`);
    }
}

function editCase(caseId) {
    const caseItem = appData.cases.find(c => c.id === caseId);
    if (caseItem) {
        showToast(`Editing case: ${caseItem.name}`, 'warning');
        // In a real app, this would open an edit form
    }
}

function deleteCase(caseId) {
    if (confirm('Are you sure you want to delete this case?')) {
        appData.cases = appData.cases.filter(c => c.id !== caseId);
        renderCasesTable();
        renderRecentCases();
        updateDashboardStats();
        showToast('Case deleted successfully', 'success');
    }
}

function downloadInvoice(invoiceId) {
    const invoice = appData.invoices.find(i => i.id === invoiceId);
    if (invoice) {
        showToast(`Downloading invoice: ${invoice.id}`, 'success');
        // In a real app, this would generate and download a PDF
    }
}

function printInvoice(invoiceId) {
    const invoice = appData.invoices.find(i => i.id === invoiceId);
    if (invoice) {
        showToast(`Printing invoice: ${invoice.id}`, 'success');
        // In a real app, this would open print dialog
    }
}

function editInvoice(invoiceId) {
    const invoice = appData.invoices.find(i => i.id === invoiceId);
    if (invoice) {
        showToast(`Editing invoice: ${invoice.id}`, 'warning');
        // In a real app, this would open an edit form
    }
}

// Report generation
function generateReport() {
    showToast('Generating dashboard report...', 'warning');
    setTimeout(() => {
        showToast('Dashboard report generated successfully!', 'success');
    }, 2000);
}

function generateFullReport() {
    showToast('Exporting comprehensive report...', 'warning');
    setTimeout(() => {
        showToast('Full report exported as PDF!', 'success');
    }, 3000);
}

// Settings management
function loadSettings() {
    document.getElementById('firm-name').value = appData.settings.firmName;
    document.getElementById('firm-address').value = '123 Legal Street, Suite 400\nNew York, NY 10001';
    document.getElementById('hourly-rate').value = appData.settings.hourlyRate;
    document.getElementById('payment-terms').value = appData.settings.paymentTerms;
}

function saveSettings() {
    appData.settings.firmName = document.getElementById('firm-name').value;
    appData.settings.hourlyRate = parseFloat(document.getElementById('hourly-rate').value);
    appData.settings.paymentTerms = parseInt(document.getElementById('payment-terms').value);
    
    showToast('Settings saved successfully!', 'success');
}

function updateReports() {
    // Update report statistics
    const totalRevenue = appData.invoices
        .filter(i => i.status === 'paid')
        .reduce((sum, inv) => sum + inv.amount, 0);
    
    const activeCases = appData.cases.filter(c => c.status === 'active').length;
    const totalClients = appData.clients.length;
    
    // Update the stats in reports section
    const reportStats = document.querySelectorAll('#reports .stat-info h3');
    if (reportStats.length >= 4) {
        reportStats[0].textContent = '$' + totalRevenue.toLocaleString();
        reportStats[1].textContent = activeCases;
        reportStats[2].textContent = totalClients;
    }
}

// Toast notification functionality
function showToast(message, type = 'success') {
    // Remove existing toasts
    const existingToasts = document.querySelectorAll('.toast');
    existingToasts.forEach(toast => toast.remove());
    
    // Create new toast
    const toast = document.createElement('div');
    toast.className = `toast ${type}`;
    toast.textContent = message;
    
    document.body.appendChild(toast);
    
    // Show toast
    setTimeout(() => {
        toast.classList.add('show');
    }, 100);
    
    // Hide toast after 3 seconds
    setTimeout(() => {
        toast.classList.remove('show');
        setTimeout(() => {
            if (toast.parentNode) {
                toast.parentNode.removeChild(toast);
            }
        }, 300);
    }, 3000);
}

// Utility function to format currency
function formatCurrency(amount) {
    return new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD'
    }).format(amount);
}