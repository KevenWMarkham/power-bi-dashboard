// Main Application Logic for Enterprise AI Adoption Dashboard Prototype

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
    },
    // Cross-filter state for Use Case Analysis view
    useCaseFilters: {
      taskType: null,
      outcome: null,
      businessUnit: null
    },
    // Cross-filter state for Business Unit view
    businessUnitFilters: {
      engagementTier: null,
      month: null,
      taskType: null
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

    // Clear cross-filters when switching views
    this.state.useCaseFilters = { taskType: null, outcome: null, businessUnit: null };
    this.state.businessUnitFilters = { engagementTier: null, month: null, taskType: null };

    // Remove cross-filter indicators
    const ucIndicator = document.getElementById('cross-filter-indicator');
    if (ucIndicator) ucIndicator.style.display = 'none';
    const buIndicator = document.getElementById('bu-cross-filter-indicator');
    if (buIndicator) buIndicator.style.display = 'none';

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
    const toyotaSpecific = this.state.businessUnits.businessUnits.filter(u => u.category === 'industry');

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
    toyotaGroup.label = 'Industry Divisions';
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
    const buFilters = this.state.businessUnitFilters;

    // Filter users and sessions based on cross-filter state
    let filteredUsers = this.state.users;
    let filteredSessions = this.state.sessions;

    if (buFilters.engagementTier) {
      filteredUsers = filteredUsers.filter(u => u.engagementTier === buFilters.engagementTier);
      const userIds = new Set(filteredUsers.map(u => u.userId));
      filteredSessions = filteredSessions.filter(s => userIds.has(s.userId));
    }
    if (buFilters.month) {
      filteredSessions = filteredSessions.filter(s => s.date.startsWith(buFilters.month));
      const activeUserIds = new Set(filteredSessions.map(s => s.userId));
      filteredUsers = filteredUsers.filter(u => activeUserIds.has(u.userId));
    }
    if (buFilters.taskType) {
      filteredSessions = filteredSessions.filter(s => s.taskType === buFilters.taskType);
      // Also filter users to only those with sessions of this task type
      const activeUserIds = new Set(filteredSessions.map(s => s.userId));
      filteredUsers = filteredUsers.filter(u => activeUserIds.has(u.userId));
    }

    // Compute filtered metrics
    const hasFilters = buFilters.engagementTier || buFilters.month || buFilters.taskType;
    const filteredActiveUsers = filteredUsers.filter(u => u.totalSessions > 0).length;
    const filteredTotalUsers = hasFilters ? filteredUsers.length : this.state.users.length;
    const filteredAdoptionRate = filteredTotalUsers > 0 ? filteredActiveUsers / filteredTotalUsers : 0;

    // Update KPIs with filtered data
    this.updateKPICard('kpi-unit-adoption', {
      value: this.formatPercent(hasFilters ? filteredAdoptionRate : metrics.overview.adoptionRate),
      subtext: hasFilters ? 'Filtered adoption rate' : 'Overall adoption rate'
    });

    this.updateKPICard('kpi-unit-users', {
      value: this.formatNumber(hasFilters ? filteredActiveUsers : metrics.overview.totalActiveUsers),
      subtext: `of ${this.formatNumber(hasFilters ? filteredTotalUsers : metrics.overview.totalLicensedUsers)} ${hasFilters ? 'filtered' : 'licensed'}`
    });

    this.updateKPICard('kpi-unit-sessions', {
      value: this.formatNumber(filteredSessions.length),
      subtext: hasFilters ? 'Filtered sessions' : 'Total sessions'
    });

    // Calculate top task type from filtered sessions
    const taskCounts = {};
    filteredSessions.forEach(s => {
      taskCounts[s.taskType] = (taskCounts[s.taskType] || 0) + 1;
    });
    const topTaskEntry = Object.entries(taskCounts).sort((a, b) => b[1] - a[1])[0];
    const topTask = topTaskEntry ? this.state.referenceData.taskTypes.find(t => t.id === topTaskEntry[0]) : null;
    this.updateKPICard('kpi-unit-top-task', {
      value: topTask?.label || '-',
      subtext: topTaskEntry ? `${this.formatNumber(topTaskEntry[1])} sessions` : '-'
    });

    // Render cross-filter indicator for Business Unit view
    this.renderBUCrossFilterIndicator();

    // Render funnel for overall org with click handlers
    const overallFunnel = this.calculateOverallFunnel(filteredUsers);
    Charts.renderFunnel('chart-adoption-funnel', overallFunnel, buFilters, (tier) => this.onBUFilterClick('engagementTier', tier));

    // Render monthly active users trend with click handlers
    const filteredTrends = this.calculateFilteredTrends(filteredSessions, filteredUsers);
    Charts.renderAdoptionTrend('chart-unit-trend', filteredTrends, buFilters, (month) => this.onBUFilterClick('month', month));

    // Render task type heatmap with click handlers
    Charts.renderBUHeatmap(
      'chart-bu-heatmap',
      this.state.referenceData.taskTypes,
      this.state.businessUnits.businessUnits,
      filteredSessions,
      buFilters,
      (filterType, value) => this.onBUFilterClick(filterType, value)
    );

    // Render business unit table with filtered data
    this.renderBusinessUnitTable(filteredSessions, filteredUsers);
  },

  // Render single business unit deep-dive
  renderSingleBusinessUnit(unitId) {
    const unitMetrics = this.state.metrics.byBusinessUnit[unitId];
    if (!unitMetrics) return;

    const buFilters = this.state.businessUnitFilters;

    // Get unit-specific data
    let unitUsers = this.state.users.filter(u => u.businessUnitId === unitId);
    let unitSessions = this.state.sessions.filter(s => s.businessUnitId === unitId);

    // Apply cross-filters
    if (buFilters.engagementTier) {
      unitUsers = unitUsers.filter(u => u.engagementTier === buFilters.engagementTier);
      const userIds = new Set(unitUsers.map(u => u.userId));
      unitSessions = unitSessions.filter(s => userIds.has(s.userId));
    }
    if (buFilters.month) {
      unitSessions = unitSessions.filter(s => s.date.startsWith(buFilters.month));
      const activeUserIds = new Set(unitSessions.map(s => s.userId));
      unitUsers = unitUsers.filter(u => activeUserIds.has(u.userId));
    }
    if (buFilters.taskType) {
      unitSessions = unitSessions.filter(s => s.taskType === buFilters.taskType);
      // Also filter users to only those with sessions of this task type
      const activeUserIds = new Set(unitSessions.map(s => s.userId));
      unitUsers = unitUsers.filter(u => activeUserIds.has(u.userId));
    }

    const hasFilters = buFilters.engagementTier || buFilters.month || buFilters.taskType;
    const filteredActiveUsers = unitUsers.filter(u => u.totalSessions > 0).length;
    const filteredTotalUsers = hasFilters ? unitUsers.length : unitMetrics.totalUsers;
    const filteredAdoptionRate = filteredTotalUsers > 0 ? filteredActiveUsers / filteredTotalUsers : 0;

    // Update unit-specific KPIs
    this.updateKPICard('kpi-unit-adoption', {
      value: this.formatPercent(hasFilters ? filteredAdoptionRate : unitMetrics.adoptionRate),
      subtext: hasFilters ? 'Filtered rate' : `Target: ${this.formatPercent(unitMetrics.adoptionTarget)}`
    });

    this.updateKPICard('kpi-unit-users', {
      value: this.formatNumber(hasFilters ? filteredActiveUsers : unitMetrics.activeUsers),
      subtext: `of ${filteredTotalUsers} ${hasFilters ? 'filtered' : 'licensed'}`
    });

    this.updateKPICard('kpi-unit-sessions', {
      value: this.formatNumber(unitSessions.length),
      subtext: hasFilters ? 'Filtered sessions' : `${unitMetrics.avgSessionsPerUser.toFixed(1)} per user`
    });

    // Calculate top task type for filtered sessions
    const taskCounts = {};
    unitSessions.forEach(s => {
      taskCounts[s.taskType] = (taskCounts[s.taskType] || 0) + 1;
    });
    const topTaskId = Object.entries(taskCounts).sort((a, b) => b[1] - a[1])[0];
    const topTaskType = topTaskId ? this.state.referenceData.taskTypes.find(t => t.id === topTaskId[0]) : null;

    this.updateKPICard('kpi-unit-top-task', {
      value: topTaskType?.label || '-',
      subtext: topTaskId ? `${this.formatNumber(topTaskId[1])} sessions` : '-'
    });

    // Render cross-filter indicator
    this.renderBUCrossFilterIndicator();

    // Render unit-specific funnel with click handlers
    const filteredFunnel = this.calculateUnitFunnel(unitUsers);
    Charts.renderFunnel('chart-adoption-funnel', filteredFunnel, buFilters, (tier) => this.onBUFilterClick('engagementTier', tier));

    // Calculate and render unit-specific monthly trend with click handlers
    const unitTrends = this.calculateUnitTrends(unitId, unitSessions, unitUsers);
    Charts.renderAdoptionTrend('chart-unit-trend', unitTrends, buFilters, (month) => this.onBUFilterClick('month', month));

    // Render task type heatmap for this unit (shows just this unit's data)
    Charts.renderBUHeatmap(
      'chart-bu-heatmap',
      this.state.referenceData.taskTypes,
      [this.state.businessUnits.businessUnits.find(u => u.id === unitId)],
      unitSessions,
      buFilters,
      (filterType, value) => this.onBUFilterClick(filterType, value)
    );

    // Render user table for this unit with filtered data
    this.renderUserTable(unitId, unitUsers, unitSessions);
  },

  // Calculate monthly trends for a specific business unit
  calculateUnitTrends(unitId, sessionsOverride, usersOverride) {
    const unitSessions = sessionsOverride || this.state.sessions.filter(s => s.businessUnitId === unitId);
    const unitUsers = usersOverride || this.state.users.filter(u => u.businessUnitId === unitId);

    // Group by month
    const months = [];
    const startDate = new Date('2025-02-01');
    for (let i = 0; i < 12; i++) {
      const monthDate = new Date(startDate);
      monthDate.setMonth(monthDate.getMonth() + i);
      const monthStr = monthDate.toISOString().slice(0, 7);
      months.push(monthStr);
    }

    return months.map(month => {
      const monthSessions = unitSessions.filter(s => s.date.startsWith(month));
      const activeUserIds = new Set(monthSessions.map(s => s.userId));

      return {
        month,
        activeUsers: activeUserIds.size,
        sessions: monthSessions.length
      };
    });
  },

  // Calculate trends for filtered data (comparison view)
  calculateFilteredTrends(filteredSessions, filteredUsers) {
    const months = [];
    const startDate = new Date('2025-02-01');
    for (let i = 0; i < 12; i++) {
      const monthDate = new Date(startDate);
      monthDate.setMonth(monthDate.getMonth() + i);
      const monthStr = monthDate.toISOString().slice(0, 7);
      months.push(monthStr);
    }

    return months.map(month => {
      const monthSessions = filteredSessions.filter(s => s.date.startsWith(month));
      const activeUserIds = new Set(monthSessions.map(s => s.userId));

      return {
        month,
        activeUsers: activeUserIds.size,
        sessions: monthSessions.length
      };
    });
  },

  // Calculate funnel for filtered users
  calculateUnitFunnel(users) {
    const total = users.length;
    return {
      licensed: total,
      onboarded: users.filter(u => u.onboardedDate).length,
      tried: users.filter(u => u.totalSessions >= 1).length,
      regular: users.filter(u => u.engagementTier === 'regular' || u.engagementTier === 'power-user').length,
      powerUser: users.filter(u => u.engagementTier === 'power-user').length
    };
  },

  // Handle Business Unit cross-filter clicks
  onBUFilterClick(filterType, value) {
    const buFilters = this.state.businessUnitFilters;

    // Toggle: if already selected, clear it; otherwise set it
    if (buFilters[filterType] === value) {
      buFilters[filterType] = null;
    } else {
      buFilters[filterType] = value;
    }

    // Re-render the view
    this.renderBusinessUnitView();
  },

  // Clear all Business Unit cross-filters
  clearBUFilters() {
    this.state.businessUnitFilters = {
      engagementTier: null,
      month: null,
      taskType: null
    };
    this.renderBusinessUnitView();
  },

  // Render cross-filter indicator for Business Unit view
  renderBUCrossFilterIndicator() {
    const buFilters = this.state.businessUnitFilters;
    const hasFilters = buFilters.engagementTier || buFilters.month || buFilters.taskType;

    // Find or create indicator container
    let indicator = document.getElementById('bu-cross-filter-indicator');
    if (!indicator) {
      const buView = document.getElementById('business-unit');
      if (buView) {
        indicator = document.createElement('div');
        indicator.id = 'bu-cross-filter-indicator';
        indicator.style.cssText = 'margin-bottom: 16px; display: flex; align-items: center; gap: 8px; flex-wrap: wrap;';
        const firstChild = buView.querySelector('.kpi-row');
        if (firstChild) {
          buView.insertBefore(indicator, firstChild);
        }
      }
    }

    if (!indicator) return;

    if (!hasFilters) {
      indicator.innerHTML = '';
      indicator.style.display = 'none';
      return;
    }

    indicator.style.display = 'flex';

    const tierLabels = { 'power-user': 'Power User', 'regular': 'Regular', 'tried': 'Tried', 'inactive': 'Inactive' };

    let html = '<span style="font-size: 12px; color: #6B6B6B;">Filtered by:</span>';

    if (buFilters.engagementTier) {
      html += `<span class="filter-chip" data-filter="engagementTier">${tierLabels[buFilters.engagementTier] || buFilters.engagementTier} <span class="chip-remove">&times;</span></span>`;
    }
    if (buFilters.month) {
      const [year, month] = buFilters.month.split('-');
      const monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
      html += `<span class="filter-chip" data-filter="month">${monthNames[parseInt(month) - 1]} ${year} <span class="chip-remove">&times;</span></span>`;
    }
    if (buFilters.taskType) {
      const task = this.state.referenceData.taskTypes.find(t => t.id === buFilters.taskType);
      html += `<span class="filter-chip" data-filter="taskType">${task?.label || buFilters.taskType} <span class="chip-remove">&times;</span></span>`;
    }

    html += '<button id="clear-bu-filters" style="margin-left: 8px; font-size: 11px; padding: 4px 8px; cursor: pointer; background: #f5f5f5; border: 1px solid #ddd; border-radius: 4px;">Clear All</button>';

    indicator.innerHTML = html;

    // Add click handlers
    indicator.querySelectorAll('.filter-chip').forEach(chip => {
      chip.style.cssText = 'display: inline-flex; align-items: center; gap: 4px; padding: 4px 8px; background: #118DFF; color: white; border-radius: 4px; font-size: 12px; cursor: pointer;';
      chip.querySelector('.chip-remove').style.cssText = 'font-weight: bold; margin-left: 4px;';
      chip.addEventListener('click', () => {
        this.onBUFilterClick(chip.dataset.filter, this.state.businessUnitFilters[chip.dataset.filter]);
      });
    });

    document.getElementById('clear-bu-filters')?.addEventListener('click', () => {
      this.clearBUFilters();
    });
  },

  // Calculate fastest growing task type
  calculateFastestGrowing(sessionsOverride) {
    const sessions = sessionsOverride || this.state.sessions;
    const taskTypes = this.state.referenceData.taskTypes;

    // Define time periods (last 3 months vs previous 3 months)
    const recentStart = '2025-11-01';
    const recentEnd = '2026-01-31';
    const previousStart = '2025-08-01';
    const previousEnd = '2025-10-31';

    const growth = taskTypes.map(task => {
      const recentCount = sessions.filter(s =>
        s.taskType === task.id && s.date >= recentStart && s.date <= recentEnd
      ).length;

      const previousCount = sessions.filter(s =>
        s.taskType === task.id && s.date >= previousStart && s.date <= previousEnd
      ).length;

      const growthPercent = previousCount > 0
        ? Math.round(((recentCount - previousCount) / previousCount) * 100)
        : (recentCount > 0 ? 100 : 0);

      return {
        ...task,
        recentCount,
        previousCount,
        growthPercent
      };
    });

    // Return task with highest growth (must have some previous activity)
    return growth
      .filter(t => t.previousCount > 10) // Minimum baseline
      .sort((a, b) => b.growthPercent - a.growthPercent)[0];
  },

  // Render Use Case Analysis view
  renderUseCaseView() {
    const metrics = this.state.metrics;
    const ucFilters = this.state.useCaseFilters;
    const hasFilters = ucFilters.taskType || ucFilters.outcome || ucFilters.businessUnit;

    // Filter sessions based on cross-filter state
    let filteredSessions = this.state.sessions;
    if (ucFilters.taskType) {
      filteredSessions = filteredSessions.filter(s => s.taskType === ucFilters.taskType);
    }
    if (ucFilters.outcome) {
      filteredSessions = filteredSessions.filter(s => s.businessOutcome === ucFilters.outcome);
    }
    if (ucFilters.businessUnit) {
      filteredSessions = filteredSessions.filter(s => s.businessUnitId === ucFilters.businessUnit);
    }

    // Recompute metrics for filtered data
    const filteredMetrics = this.computeFilteredMetrics(filteredSessions);

    // Update KPIs based on filtered data
    const taskTypes = Object.values(filteredMetrics.byTaskType);
    const topTask = [...taskTypes].sort((a, b) => b.sessionCount - a.sessionCount)[0];

    this.updateKPICard('kpi-use-cases', {
      value: taskTypes.filter(t => t.sessionCount > 0).length,
      subtext: hasFilters ? 'Filtered task types' : 'Task types tracked'
    });

    this.updateKPICard('kpi-top-task', {
      value: topTask?.label || '-',
      subtext: `${this.formatNumber(topTask?.sessionCount || 0)} sessions`
    });

    // Calculate fastest growing task type (compare last 3 months vs previous 3 months)
    const fastestGrowing = this.calculateFastestGrowing(filteredSessions);
    this.updateKPICard('kpi-fastest-growing', {
      value: fastestGrowing?.label || '-',
      subtext: fastestGrowing ? `+${fastestGrowing.growthPercent}% growth` : '-'
    });

    // Calculate highest engagement (by avg session duration)
    const highestEngagement = [...taskTypes].sort((a, b) => b.avgDuration - a.avgDuration)[0];
    this.updateKPICard('kpi-highest-engagement', {
      value: highestEngagement?.label || '-',
      subtext: highestEngagement ? `${highestEngagement.avgDuration.toFixed(1)} min avg` : '-'
    });

    // Render cross-filter indicator
    this.renderCrossFilterIndicator();

    // Render heatmap with click handlers - always show all business units for context
    Charts.renderHeatmap('chart-heatmap', filteredMetrics.byTaskType, metrics.byBusinessUnit, filteredSessions, ucFilters, (type, value) => this.onUseCaseFilterClick(type, value));

    // Render task type trend with click handlers - always pass all task types, chart will highlight selected
    Charts.renderTaskTypeTrend('chart-task-trend', filteredSessions, this.state.referenceData.taskTypes, ucFilters, (taskType) => this.onUseCaseFilterClick('taskType', taskType));

    // Render outcome donut with click handlers
    Charts.renderOutcomeDonut('chart-outcome-donut', filteredMetrics.byOutcome, ucFilters, (outcome) => this.onUseCaseFilterClick('outcome', outcome));

    // Render scenarios table with filtered data
    this.renderScenariosTable(filteredSessions);
  },

  // Compute metrics for filtered sessions
  computeFilteredMetrics(sessions) {
    const byTaskType = {};
    const byOutcome = {};

    // Initialize from reference data
    this.state.referenceData.taskTypes.forEach(t => {
      byTaskType[t.id] = { id: t.id, label: t.label, sessionCount: 0, totalDuration: 0, avgDuration: 0, percentage: 0 };
    });
    this.state.referenceData.businessOutcomes.forEach(o => {
      byOutcome[o.id] = { id: o.id, label: o.label, sessionCount: 0, percentage: 0 };
    });

    // Count sessions
    sessions.forEach(s => {
      if (byTaskType[s.taskType]) {
        byTaskType[s.taskType].sessionCount++;
        byTaskType[s.taskType].totalDuration += s.durationMinutes || 0;
      }
      if (byOutcome[s.businessOutcome]) {
        byOutcome[s.businessOutcome].sessionCount++;
      }
    });

    // Calculate percentages and averages
    const totalSessions = sessions.length || 1;
    Object.values(byTaskType).forEach(t => {
      t.percentage = t.sessionCount / totalSessions;
      t.avgDuration = t.sessionCount > 0 ? t.totalDuration / t.sessionCount : 0;
    });
    Object.values(byOutcome).forEach(o => {
      o.percentage = o.sessionCount / totalSessions;
    });

    return { byTaskType, byOutcome };
  },

  // Handle cross-filter clicks in Use Case view
  onUseCaseFilterClick(filterType, value) {
    const ucFilters = this.state.useCaseFilters;

    // Toggle: if already selected, clear it; otherwise set it
    if (ucFilters[filterType] === value) {
      ucFilters[filterType] = null;
    } else {
      ucFilters[filterType] = value;
    }

    // Re-render the view
    this.renderUseCaseView();
  },

  // Clear all cross-filters
  clearUseCaseFilters() {
    this.state.useCaseFilters = {
      taskType: null,
      outcome: null,
      businessUnit: null
    };
    this.renderUseCaseView();
  },

  // Render cross-filter indicator
  renderCrossFilterIndicator() {
    const ucFilters = this.state.useCaseFilters;
    const hasFilters = ucFilters.taskType || ucFilters.outcome || ucFilters.businessUnit;

    // Find or create indicator container
    let indicator = document.getElementById('cross-filter-indicator');
    if (!indicator) {
      const useCaseView = document.getElementById('use-case');
      if (useCaseView) {
        indicator = document.createElement('div');
        indicator.id = 'cross-filter-indicator';
        indicator.style.cssText = 'margin-bottom: 16px; display: flex; align-items: center; gap: 8px; flex-wrap: wrap;';
        const firstChild = useCaseView.querySelector('.kpi-row');
        if (firstChild) {
          useCaseView.insertBefore(indicator, firstChild);
        }
      }
    }

    if (!indicator) return;

    if (!hasFilters) {
      indicator.innerHTML = '';
      indicator.style.display = 'none';
      return;
    }

    indicator.style.display = 'flex';

    let html = '<span style="font-size: 12px; color: #6B6B6B;">Filtered by:</span>';

    if (ucFilters.taskType) {
      const task = this.state.referenceData.taskTypes.find(t => t.id === ucFilters.taskType);
      html += `<span class="filter-chip" data-filter="taskType">${task?.label || ucFilters.taskType} <span class="chip-remove">&times;</span></span>`;
    }
    if (ucFilters.outcome) {
      const outcome = this.state.referenceData.businessOutcomes.find(o => o.id === ucFilters.outcome);
      html += `<span class="filter-chip" data-filter="outcome">${outcome?.label || ucFilters.outcome} <span class="chip-remove">&times;</span></span>`;
    }
    if (ucFilters.businessUnit) {
      const unit = this.state.businessUnits.businessUnits.find(u => u.id === ucFilters.businessUnit);
      html += `<span class="filter-chip" data-filter="businessUnit">${unit?.name || ucFilters.businessUnit} <span class="chip-remove">&times;</span></span>`;
    }

    html += '<button id="clear-all-filters" style="margin-left: 8px; font-size: 11px; padding: 4px 8px; cursor: pointer; background: #f5f5f5; border: 1px solid #ddd; border-radius: 4px;">Clear All</button>';

    indicator.innerHTML = html;

    // Add click handlers
    indicator.querySelectorAll('.filter-chip').forEach(chip => {
      chip.style.cssText = 'display: inline-flex; align-items: center; gap: 4px; padding: 4px 8px; background: #118DFF; color: white; border-radius: 4px; font-size: 12px; cursor: pointer;';
      chip.querySelector('.chip-remove').style.cssText = 'font-weight: bold; margin-left: 4px;';
      chip.addEventListener('click', () => {
        this.onUseCaseFilterClick(chip.dataset.filter, this.state.useCaseFilters[chip.dataset.filter]);
      });
    });

    document.getElementById('clear-all-filters')?.addEventListener('click', () => {
      this.clearUseCaseFilters();
    });
  },

  // Calculate overall org funnel
  calculateOverallFunnel(usersOverride) {
    const users = usersOverride || this.state.users;
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
  renderBusinessUnitTable(filteredSessions, filteredUsers) {
    const container = document.getElementById('bu-table-body');
    if (!container) return;

    const sessions = filteredSessions || this.state.sessions;
    const users = filteredUsers || this.state.users;

    // Calculate metrics per unit from filtered data
    const units = this.state.businessUnits.businessUnits.map(u => {
      const unitUsers = users.filter(usr => usr.businessUnitId === u.id);
      const unitSessions = sessions.filter(s => s.businessUnitId === u.id);
      const activeUsers = unitUsers.filter(usr => usr.totalSessions > 0).length;
      const totalUsers = unitUsers.length;
      const baseMetrics = this.state.metrics.byBusinessUnit[u.id];

      return {
        ...u,
        activeUsers,
        totalUsers,
        adoptionRate: totalUsers > 0 ? activeUsers / totalUsers : 0,
        adoptionTarget: baseMetrics?.adoptionTarget || 0.5,
        targetStatus: baseMetrics?.targetStatus || 'below',
        totalSessions: unitSessions.length
      };
    });

    // Sort by adoption rate descending
    units.sort((a, b) => b.adoptionRate - a.adoptionRate);

    container.innerHTML = units.map(unit => `
      <tr class="clickable" data-unit-id="${unit.id}">
        <td><strong>${unit.name}</strong></td>
        <td>${unit.category === 'corporate' ? 'Corporate' : 'Industry Division'}</td>
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
  renderUserTable(unitId, filteredUsers, filteredSessions) {
    const container = document.getElementById('user-table-body');
    if (!container) return;

    // Use filtered users if provided, otherwise filter from state
    let unitUsers;
    if (filteredUsers) {
      unitUsers = filteredUsers.filter(u => u.totalSessions > 0);
    } else {
      unitUsers = this.state.users.filter(u => u.businessUnitId === unitId && u.totalSessions > 0);
    }

    // If we have filtered sessions, recalculate session counts per user
    if (filteredSessions) {
      const sessionCounts = {};
      filteredSessions.forEach(s => {
        sessionCounts[s.userId] = (sessionCounts[s.userId] || 0) + 1;
      });

      unitUsers = unitUsers.map(u => ({
        ...u,
        filteredSessions: sessionCounts[u.userId] || 0
      })).filter(u => u.filteredSessions > 0);

      unitUsers.sort((a, b) => b.filteredSessions - a.filteredSessions);
    } else {
      unitUsers.sort((a, b) => b.totalSessions - a.totalSessions);
    }

    unitUsers = unitUsers.slice(0, 50); // Show top 50

    const buFilters = this.state.businessUnitFilters;
    const hasFilters = buFilters.engagementTier || buFilters.month || buFilters.taskType;

    container.innerHTML = unitUsers.map(user => `
      <tr>
        <td>${user.userId}</td>
        <td>${user.lastActiveDate || '-'}</td>
        <td>${this.formatNumber(hasFilters && user.filteredSessions !== undefined ? user.filteredSessions : user.totalSessions)}</td>
        <td><span class="tier-pill ${user.engagementTier}">${this.getTierLabel(user.engagementTier)}</span></td>
      </tr>
    `).join('');
  },

  // Render scenarios table
  renderScenariosTable(sessionsOverride) {
    const container = document.getElementById('scenarios-table-body');
    if (!container) return;

    const sessions = sessionsOverride || this.state.sessions;

    // Aggregate scenarios by task type + outcome combination
    const scenarios = {};
    sessions.forEach(s => {
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

    if (valueEl) {
      valueEl.textContent = data.value;
      // Add text-value class for non-numeric values (longer text)
      const isTextValue = typeof data.value === 'string' && isNaN(parseFloat(data.value.replace(/[,%]/g, '')));
      valueEl.classList.toggle('text-value', isTextValue);
    }

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
