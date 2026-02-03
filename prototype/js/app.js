// Main Application Logic for ToyotaGPT Adoption Dashboard Prototype

const App = {
  // Application state
  state: {
    referenceData: null,
    businessUnits: null,
    users: null,
    sessions: null,
    metrics: null,
    currentView: 'executive-summary',
    filters: {
      dateRange: { start: '2025-02-01', end: '2026-01-31' },
      businessUnit: 'all',
      taskType: 'all',
      outcome: 'all'
    }
  },

  // Initialize application
  async init() {
    this.showLoading(true);

    try {
      // Load reference data and business units
      await this.loadStaticData();

      // Generate mock user and session data
      const generated = await DataGenerator.generate(
        this.state.businessUnits.businessUnits,
        this.state.referenceData
      );

      this.state.users = generated.users;
      this.state.sessions = generated.sessions;

      // Compute metrics
      this.state.metrics = DataGenerator.computeMetrics(
        this.state.users,
        this.state.sessions,
        this.state.businessUnits.businessUnits,
        this.state.referenceData,
        this.state.filters.dateRange
      );

      // Initialize UI components
      this.initNavigation();
      this.initFilters();

      // Render initial view
      this.renderCurrentView();

      console.log('Dashboard initialized successfully');
      console.log('Users:', this.state.users.length);
      console.log('Sessions:', this.state.sessions.length);

    } catch (error) {
      console.error('Failed to initialize dashboard:', error);
      this.showError('Failed to load dashboard data. Please refresh the page.');
    } finally {
      this.showLoading(false);
    }
  },

  // Load static JSON data
  async loadStaticData() {
    const [referenceData, businessUnits] = await Promise.all([
      fetch('data/reference-data.json').then(r => r.json()),
      fetch('data/business-units.json').then(r => r.json())
    ]);

    this.state.referenceData = referenceData;
    this.state.businessUnits = businessUnits;
  },

  // Initialize navigation tabs
  initNavigation() {
    const tabs = document.querySelectorAll('.nav-tab');

    tabs.forEach(tab => {
      tab.addEventListener('click', () => {
        const viewId = tab.dataset.view;
        this.switchView(viewId);
      });
    });
  },

  // Switch between views
  switchView(viewId, filterOverrides = {}) {
    // Update state
    this.state.currentView = viewId;

    // Apply any filter overrides (for drill-through)
    Object.assign(this.state.filters, filterOverrides);

    // Update tab UI
    document.querySelectorAll('.nav-tab').forEach(tab => {
      tab.classList.toggle('active', tab.dataset.view === viewId);
    });

    // Update view visibility
    document.querySelectorAll('.view-container').forEach(view => {
      view.classList.toggle('active', view.id === viewId);
    });

    // Render the view
    this.renderCurrentView();
  },

  // Initialize filter controls
  initFilters() {
    // Date range
    const dateStart = document.getElementById('filter-date-start');
    const dateEnd = document.getElementById('filter-date-end');

    if (dateStart && dateEnd) {
      dateStart.value = this.state.filters.dateRange.start;
      dateEnd.value = this.state.filters.dateRange.end;

      dateStart.addEventListener('change', () => this.onFilterChange());
      dateEnd.addEventListener('change', () => this.onFilterChange());
    }

    // Business unit filter
    const buSelect = document.getElementById('filter-business-unit');
    if (buSelect) {
      this.populateBusinessUnitFilter(buSelect);
      buSelect.addEventListener('change', () => this.onFilterChange());
    }

    // Task type filter
    const taskSelect = document.getElementById('filter-task-type');
    if (taskSelect) {
      this.populateTaskTypeFilter(taskSelect);
      taskSelect.addEventListener('change', () => this.onFilterChange());
    }
  },

  // Populate business unit dropdown
  populateBusinessUnitFilter(select) {
    select.innerHTML = '<option value="all">All Business Units</option>';

    // Group by category
    const corporate = this.state.businessUnits.businessUnits.filter(u => u.category === 'corporate');
    const toyotaSpecific = this.state.businessUnits.businessUnits.filter(u => u.category === 'toyota-specific');

    const corpGroup = document.createElement('optgroup');
    corpGroup.label = 'Corporate Functions';
    corporate.forEach(u => {
      const opt = document.createElement('option');
      opt.value = u.id;
      opt.textContent = u.name;
      corpGroup.appendChild(opt);
    });
    select.appendChild(corpGroup);

    const toyotaGroup = document.createElement('optgroup');
    toyotaGroup.label = 'Toyota Divisions';
    toyotaSpecific.forEach(u => {
      const opt = document.createElement('option');
      opt.value = u.id;
      opt.textContent = u.name;
      toyotaGroup.appendChild(opt);
    });
    select.appendChild(toyotaGroup);
  },

  // Populate task type dropdown
  populateTaskTypeFilter(select) {
    select.innerHTML = '<option value="all">All Task Types</option>';

    this.state.referenceData.taskTypes.forEach(task => {
      const opt = document.createElement('option');
      opt.value = task.id;
      opt.textContent = task.label;
      select.appendChild(opt);
    });
  },

  // Handle filter changes
  onFilterChange() {
    const dateStart = document.getElementById('filter-date-start');
    const dateEnd = document.getElementById('filter-date-end');
    const buSelect = document.getElementById('filter-business-unit');
    const taskSelect = document.getElementById('filter-task-type');

    this.state.filters = {
      dateRange: {
        start: dateStart?.value || '2025-02-01',
        end: dateEnd?.value || '2026-01-31'
      },
      businessUnit: buSelect?.value || 'all',
      taskType: taskSelect?.value || 'all'
    };

    // Recompute metrics
    this.state.metrics = DataGenerator.computeMetrics(
      this.state.users,
      this.state.sessions,
      this.state.businessUnits.businessUnits,
      this.state.referenceData,
      this.state.filters.dateRange
    );

    // Re-render current view
    this.renderCurrentView();
  },

  // Render current view
  renderCurrentView() {
    switch (this.state.currentView) {
      case 'executive-summary':
        this.renderExecutiveSummary();
        break;
      case 'business-unit':
        this.renderBusinessUnitView();
        break;
      case 'use-case':
        this.renderUseCaseView();
        break;
    }
  },

  // Render Executive Summary view
  renderExecutiveSummary() {
    const metrics = this.state.metrics;

    // Update KPI cards
    this.updateKPICard('kpi-active-users', {
      value: this.formatNumber(metrics.overview.totalActiveUsers),
      change: '+12.3%',
      changeType: 'positive'
    });

    this.updateKPICard('kpi-adoption-rate', {
      value: this.formatPercent(metrics.overview.adoptionRate),
      change: '+5.2%',
      changeType: 'positive'
    });

    this.updateKPICard('kpi-total-sessions', {
      value: this.formatNumber(metrics.overview.totalSessions),
      change: '+18.7%',
      changeType: 'positive'
    });

    this.updateKPICard('kpi-avg-sessions', {
      value: metrics.overview.avgSessionsPerUser.toFixed(1),
      change: '+2.1',
      changeType: 'positive'
    });

    // Render charts
    Charts.renderAdoptionTrend('chart-adoption-trend', metrics.trends);
    Charts.renderBusinessUnitBars('chart-bu-adoption', metrics.byBusinessUnit, this.state.businessUnits.businessUnits);
    Charts.renderTaskTypeDonut('chart-task-types', metrics.byTaskType);
    Charts.renderOutcomeBreakdown('chart-outcomes', metrics.byOutcome);
  },

  // Render Business Unit deep-dive view
  renderBusinessUnitView() {
    const selectedUnit = this.state.filters.businessUnit;
    const metrics = this.state.metrics;

    if (selectedUnit === 'all') {
      // Show comparison view
      this.renderBusinessUnitComparison();
    } else {
      // Show single unit deep-dive
      this.renderSingleBusinessUnit(selectedUnit);
    }
  },

  // Render comparison of all business units
  renderBusinessUnitComparison() {
    const metrics = this.state.metrics;

    // Render funnel for overall org
    const overallFunnel = this.calculateOverallFunnel();
    Charts.renderFunnel('chart-adoption-funnel', overallFunnel);

    // Render business unit table
    this.renderBusinessUnitTable();
  },

  // Render single business unit deep-dive
  renderSingleBusinessUnit(unitId) {
    const unitMetrics = this.state.metrics.byBusinessUnit[unitId];
    if (!unitMetrics) return;

    // Update unit-specific KPIs
    this.updateKPICard('kpi-unit-adoption', {
      value: this.formatPercent(unitMetrics.adoptionRate),
      subtext: `Target: ${this.formatPercent(unitMetrics.adoptionTarget)}`
    });

    this.updateKPICard('kpi-unit-users', {
      value: this.formatNumber(unitMetrics.activeUsers),
      subtext: `of ${unitMetrics.totalUsers} licensed`
    });

    // Render unit-specific charts
    Charts.renderFunnel('chart-adoption-funnel', unitMetrics.engagementBreakdown);

    // Render user table for this unit
    this.renderUserTable(unitId);
  },

  // Render Use Case Analysis view
  renderUseCaseView() {
    const metrics = this.state.metrics;

    // Update KPIs
    const taskTypes = Object.values(metrics.byTaskType);
    const topTask = taskTypes.sort((a, b) => b.sessionCount - a.sessionCount)[0];

    this.updateKPICard('kpi-use-cases', {
      value: taskTypes.length,
      subtext: 'Task types tracked'
    });

    this.updateKPICard('kpi-top-task', {
      value: topTask?.label || '-',
      subtext: `${this.formatNumber(topTask?.sessionCount || 0)} sessions`
    });

    // Render heatmap
    Charts.renderHeatmap('chart-heatmap', metrics.byTaskType, metrics.byBusinessUnit, this.state.sessions);

    // Render task type trend
    Charts.renderTaskTypeTrend('chart-task-trend', this.state.sessions, this.state.referenceData.taskTypes);

    // Render outcome donut
    Charts.renderOutcomeDonut('chart-outcome-donut', metrics.byOutcome);

    // Render scenarios table
    this.renderScenariosTable();
  },

  // Calculate overall org funnel
  calculateOverallFunnel() {
    const users = this.state.users;
    const total = users.length;

    return {
      licensed: total,
      onboarded: users.filter(u => u.onboardedDate).length,
      tried: users.filter(u => u.totalSessions >= 1).length,
      regular: users.filter(u => u.engagementTier === 'regular' || u.engagementTier === 'power-user').length,
      powerUser: users.filter(u => u.engagementTier === 'power-user').length
    };
  },

  // Render business unit comparison table
  renderBusinessUnitTable() {
    const container = document.getElementById('bu-table-body');
    if (!container) return;

    const units = this.state.businessUnits.businessUnits.map(u => ({
      ...u,
      ...this.state.metrics.byBusinessUnit[u.id]
    }));

    // Sort by adoption rate descending
    units.sort((a, b) => b.adoptionRate - a.adoptionRate);

    container.innerHTML = units.map(unit => `
      <tr class="clickable" data-unit-id="${unit.id}">
        <td><strong>${unit.name}</strong></td>
        <td>${unit.category === 'corporate' ? 'Corporate' : 'Toyota Division'}</td>
        <td>${this.formatNumber(unit.activeUsers)} / ${this.formatNumber(unit.totalUsers)}</td>
        <td>
          <div style="display: flex; align-items: center; gap: 8px;">
            <div class="progress-bar" style="width: 100px;">
              <div class="progress-bar-fill ${this.getProgressColor(unit.adoptionRate, unit.adoptionTarget)}"
                   style="width: ${unit.adoptionRate * 100}%"></div>
            </div>
            <span>${this.formatPercent(unit.adoptionRate)}</span>
          </div>
        </td>
        <td>${this.formatPercent(unit.adoptionTarget)}</td>
        <td><span class="status-badge ${unit.targetStatus}">${this.getStatusLabel(unit.targetStatus)}</span></td>
        <td>${this.formatNumber(unit.totalSessions)}</td>
      </tr>
    `).join('');

    // Add click handlers
    container.querySelectorAll('tr').forEach(row => {
      row.addEventListener('click', () => {
        const unitId = row.dataset.unitId;
        document.getElementById('filter-business-unit').value = unitId;
        this.onFilterChange();
      });
    });
  },

  // Render user table for a specific business unit
  renderUserTable(unitId) {
    const container = document.getElementById('user-table-body');
    if (!container) return;

    const unitUsers = this.state.users
      .filter(u => u.businessUnitId === unitId && u.totalSessions > 0)
      .sort((a, b) => b.totalSessions - a.totalSessions)
      .slice(0, 50); // Show top 50

    container.innerHTML = unitUsers.map(user => `
      <tr>
        <td>${user.userId}</td>
        <td>${user.lastActiveDate || '-'}</td>
        <td>${this.formatNumber(user.totalSessions)}</td>
        <td><span class="tier-pill ${user.engagementTier}">${this.getTierLabel(user.engagementTier)}</span></td>
      </tr>
    `).join('');
  },

  // Render scenarios table
  renderScenariosTable() {
    const container = document.getElementById('scenarios-table-body');
    if (!container) return;

    // Aggregate scenarios by task type + outcome combination
    const scenarios = {};
    this.state.sessions.forEach(s => {
      const key = `${s.taskType}|${s.businessOutcome}`;
      if (!scenarios[key]) {
        scenarios[key] = { taskType: s.taskType, outcome: s.businessOutcome, count: 0, ratings: [] };
      }
      scenarios[key].count++;
      if (s.userRating) scenarios[key].ratings.push(s.userRating);
    });

    const scenarioList = Object.values(scenarios)
      .sort((a, b) => b.count - a.count)
      .slice(0, 15);

    const taskLabels = {};
    this.state.referenceData.taskTypes.forEach(t => { taskLabels[t.id] = t.label; });

    const outcomeLabels = {};
    this.state.referenceData.businessOutcomes.forEach(o => { outcomeLabels[o.id] = o.label; });

    container.innerHTML = scenarioList.map(s => {
      const avgRating = s.ratings.length > 0
        ? (s.ratings.reduce((a, b) => a + b, 0) / s.ratings.length).toFixed(1)
        : '-';

      return `
        <tr>
          <td>${taskLabels[s.taskType] || s.taskType}</td>
          <td>${outcomeLabels[s.outcome] || s.outcome}</td>
          <td>${this.formatNumber(s.count)}</td>
          <td>${avgRating}</td>
        </tr>
      `;
    }).join('');
  },

  // Update a KPI card
  updateKPICard(cardId, data) {
    const card = document.getElementById(cardId);
    if (!card) return;

    const valueEl = card.querySelector('.kpi-value');
    const changeEl = card.querySelector('.kpi-change');
    const subtextEl = card.querySelector('.kpi-subtext');

    if (valueEl) valueEl.textContent = data.value;

    if (changeEl && data.change) {
      changeEl.textContent = data.change;
      changeEl.className = `kpi-change ${data.changeType || ''}`;
    }

    if (subtextEl && data.subtext) {
      subtextEl.textContent = data.subtext;
    }
  },

  // Utility functions
  formatNumber(num) {
    if (num >= 1000000) return (num / 1000000).toFixed(1) + 'M';
    if (num >= 1000) return (num / 1000).toFixed(1) + 'K';
    return num.toLocaleString();
  },

  formatPercent(value) {
    return (value * 100).toFixed(1) + '%';
  },

  getProgressColor(actual, target) {
    const ratio = actual / target;
    if (ratio >= 1.0) return 'success';
    if (ratio >= 0.9) return 'warning';
    return 'danger';
  },

  getStatusLabel(status) {
    const labels = { above: 'Above Target', 'on-track': 'On Track', below: 'Below Target' };
    return labels[status] || status;
  },

  getTierLabel(tier) {
    const labels = { 'power-user': 'Power User', regular: 'Regular', tried: 'Tried', inactive: 'Inactive' };
    return labels[tier] || tier;
  },

  showLoading(show) {
    const overlay = document.getElementById('loading-overlay');
    if (overlay) {
      overlay.style.display = show ? 'flex' : 'none';
    }
  },

  showError(message) {
    alert(message); // Simple error handling for prototype
  },

  // Drill-through navigation
  drillToBusinessUnit(unitId) {
    document.getElementById('filter-business-unit').value = unitId;
    this.switchView('business-unit', { businessUnit: unitId });
  },

  drillToTaskType(taskType) {
    document.getElementById('filter-task-type').value = taskType;
    this.switchView('use-case', { taskType });
  }
};

// Initialize app when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
  App.init();
});

// Export for global access
window.App = App;
