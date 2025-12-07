document.addEventListener('DOMContentLoaded', () => {
    
    // --- Configuration ---
    const CONFIG = {
        chartBars: 40,
        refreshRate: 2000,
        maxLatency: 80
    };

    // --- DOM Elements ---
    const chartContainer = document.getElementById('main-chart');
    const tableBody = document.getElementById('data-table-body');
    const runAnalysisBtn = document.getElementById('run-analysis-btn');
    
    // Theme Elements
    const themeToggleBtn = document.getElementById('theme-toggle');
    const themeIcon = document.getElementById('theme-icon');
    
    // KPI Elements
    const els = {
        latency: document.getElementById('latency-meter'),
        dataPoints: document.getElementById('kpi-1'),
        speed: document.getElementById('kpi-2'),
        anomalies: document.getElementById('kpi-3'),
        accuracy: document.getElementById('kpi-4')
    };

    // --- State ---
    let totalDataPoints = 124050;
    
    // --- Initialization ---
    initTheme(); // Load saved theme
    initChart();
    populateTable();
    startSimulation();

    // --- Theme Logic ---
    function initTheme() {
        const savedTheme = localStorage.getItem('theme');
        if (savedTheme === 'light') {
            document.body.classList.add('light-mode');
            themeIcon.innerText = '☾'; // Show moon icon when in light mode
        } else {
            themeIcon.innerText = '☀';
        }
    }

    themeToggleBtn.addEventListener('click', () => {
        document.body.classList.toggle('light-mode');
        
        // Save preference and update icon
        if (document.body.classList.contains('light-mode')) {
            localStorage.setItem('theme', 'light');
            themeIcon.innerText = '☾';
        } else {
            localStorage.setItem('theme', 'dark');
            themeIcon.innerText = '☀';
        }
    });

    // --- Chart Logic ---
    function initChart() {
        chartContainer.innerHTML = '';
        for(let i = 0; i < CONFIG.chartBars; i++) {
            const bar = document.createElement('div');
            bar.className = 'chart-bar';
            bar.style.height = `${Math.floor(Math.random() * 80) + 10}%`;
            bar.title = `Node ${i}: ${Math.floor(Math.random() * 100)}% load`;
            chartContainer.appendChild(bar);
        }
    }

    function updateChart() {
        const bars = document.querySelectorAll('.chart-bar');
        bars.forEach(bar => {
            const currentHeight = parseInt(bar.style.height);
            const change = Math.floor(Math.random() * 20) - 10; 
            let newHeight = currentHeight + change;
            if(newHeight > 100) newHeight = 100;
            if(newHeight < 5) newHeight = 5;
            bar.style.height = `${newHeight}%`;
        });
    }

    // --- Table Logic ---
    function populateTable() {
        let html = '';
        for(let i = 0; i < 5; i++) {
            html += generateRow();
        }
        tableBody.innerHTML = html;
    }

    function generateRow() {
        const id = 'DT-' + Math.floor(Math.random() * 10000);
        const time = new Date().toISOString().split('T')[1].split('.')[0];
        const nodes = ['Alpha', 'Beta', 'Gamma', 'Delta'];
        const node = nodes[Math.floor(Math.random() * nodes.length)];
        const score = (Math.random() * (1.0 - 0.85) + 0.85).toFixed(4);
        
        const r = Math.random();
        let statusHtml = '';
        if(r > 0.9) statusHtml = '<span class="badge badge-fail">Flagged</span>';
        else if(r > 0.7) statusHtml = '<span class="badge badge-proc">Processing</span>';
        else statusHtml = '<span class="badge badge-ok">Verified</span>';

        return `
            <tr>
                <td>${id}</td>
                <td>${time}</td>
                <td>Node_${node}</td>
                <td>${score}</td>
                <td>${statusHtml}</td>
            </tr>
        `;
    }

    // --- Simulation Logic ---
    function startSimulation() {
        setInterval(() => {
            // Latency
            const latency = Math.floor(Math.random() * CONFIG.maxLatency) + 5;
            els.latency.innerText = `${latency}ms`;
            els.latency.style.color = latency > 50 ? '#ef4444' : '#10b981';

            // Chart & KPIs
            updateChart();
            totalDataPoints += Math.floor(Math.random() * 50);
            els.dataPoints.innerText = totalDataPoints.toLocaleString();
            els.speed.innerText = `${Math.floor(Math.random() * 500) + 4000} ops/s`;

        }, 1000); 
    }

    // --- Button Logic ---
    runAnalysisBtn.addEventListener('click', () => {
        const originalText = runAnalysisBtn.innerHTML;
        runAnalysisBtn.disabled = true;
        runAnalysisBtn.innerHTML = '<span class="icon">⟳</span> Optimization Running...';
        runAnalysisBtn.style.opacity = '0.7';

        setTimeout(() => {
            runAnalysisBtn.disabled = false;
            runAnalysisBtn.innerHTML = originalText;
            runAnalysisBtn.style.opacity = '1';
            
            const newRow = generateRow();
            tableBody.insertAdjacentHTML('afterbegin', newRow);
            if(tableBody.children.length > 5) tableBody.lastElementChild.remove();
            
            els.accuracy.innerText = '98.4%';
            alert('Deep Analysis Complete. Optimization Matrix Updated.');
        }, 1500);
    });
});