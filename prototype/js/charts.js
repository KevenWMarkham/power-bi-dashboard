// Chart rendering functions for Enterprise AI Adoption Dashboard Prototype
// Uses vanilla JS + Canvas/SVG for dependency-free visualizations

const Charts = {
  // Power BI color palette
  colors: {
    primary: '#118DFF',
    primaryDark: '#12239E',
    orange: '#E66C37',
    yellow: '#FFC107',
    success: '#4CAF50',
    warning: '#FFC107',
    danger: '#F44336',
    gray: '#6B6B6B',
    grayLight: '#C8C6C4',
    grayLighter: '#EDEBE9',
    series: ['#118DFF', '#12239E', '#E66C37', '#6B6B6B', '#FFC107', '#4CAF50']
  },

  // Render adoption trend line chart
  renderAdoptionTrend(containerId, trends, buFilters = {}, onFilterClick = null) {
    const container = document.getElementById(containerId);
    if (!container) return;

    const width = container.offsetWidth || 500;
    const height = container.offsetHeight || 280;
    const padding = { top: 20, right: 30, bottom: 40, left: 50 };

    // Clear container
    container.innerHTML = '';

    // Create SVG
    const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    svg.setAttribute('width', width);
    svg.setAttribute('height', height);
    svg.style.fontFamily = 'Segoe UI, sans-serif';

    const chartWidth = width - padding.left - padding.right;
    const chartHeight = height - padding.top - padding.bottom;

    // Calculate scales
    const maxUsers = Math.max(...trends.map(t => t.activeUsers), 1) * 1.1;
    const xStep = trends.length > 1 ? chartWidth / (trends.length - 1) : chartWidth;

    // Draw grid lines
    for (let i = 0; i <= 5; i++) {
      const y = padding.top + (chartHeight / 5) * i;
      const line = document.createElementNS('http://www.w3.org/2000/svg', 'line');
      line.setAttribute('x1', padding.left);
      line.setAttribute('x2', width - padding.right);
      line.setAttribute('y1', y);
      line.setAttribute('y2', y);
      line.setAttribute('stroke', this.colors.grayLighter);
      line.setAttribute('stroke-width', '1');
      svg.appendChild(line);

      // Y-axis labels
      const label = document.createElementNS('http://www.w3.org/2000/svg', 'text');
      label.setAttribute('x', padding.left - 10);
      label.setAttribute('y', y + 4);
      label.setAttribute('text-anchor', 'end');
      label.setAttribute('font-size', '11');
      label.setAttribute('fill', this.colors.gray);
      label.textContent = Math.round(maxUsers * (1 - i / 5));
      svg.appendChild(label);
    }

    // Draw line path
    let pathD = '';
    const points = [];

    trends.forEach((trend, i) => {
      const x = padding.left + i * xStep;
      const y = padding.top + chartHeight - (trend.activeUsers / maxUsers) * chartHeight;
      points.push({ x, y, data: trend });

      if (i === 0) {
        pathD = `M ${x} ${y}`;
      } else {
        pathD += ` L ${x} ${y}`;
      }
    });

    // Area fill
    const area = document.createElementNS('http://www.w3.org/2000/svg', 'path');
    const areaD = pathD + ` L ${points[points.length - 1].x} ${padding.top + chartHeight} L ${padding.left} ${padding.top + chartHeight} Z`;
    area.setAttribute('d', areaD);
    area.setAttribute('fill', this.colors.primary);
    area.setAttribute('fill-opacity', '0.1');
    svg.appendChild(area);

    // Line
    const line = document.createElementNS('http://www.w3.org/2000/svg', 'path');
    line.setAttribute('d', pathD);
    line.setAttribute('fill', 'none');
    line.setAttribute('stroke', this.colors.primary);
    line.setAttribute('stroke-width', '2');
    svg.appendChild(line);

    // Data points (clickable for month filtering)
    points.forEach(point => {
      const isSelected = buFilters.month === point.data.month;

      const circle = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
      circle.setAttribute('cx', point.x);
      circle.setAttribute('cy', point.y);
      circle.setAttribute('r', isSelected ? '8' : '4');
      circle.setAttribute('fill', isSelected ? '#118DFF' : this.colors.primary);
      circle.setAttribute('stroke', isSelected ? '#fff' : 'none');
      circle.setAttribute('stroke-width', isSelected ? '2' : '0');
      circle.style.cursor = 'pointer';
      circle.style.transition = 'r 0.15s ease';

      // Dim non-selected points if a month is selected
      if (buFilters.month && !isSelected) {
        circle.setAttribute('fill-opacity', '0.4');
      }

      // Tooltip on hover
      circle.addEventListener('mouseenter', (e) => {
        if (!isSelected) circle.setAttribute('r', '6');
        this.showTooltip(e, `${this.formatMonth(point.data.month)}<br>Active Users: ${point.data.activeUsers.toLocaleString()}<br>Sessions: ${point.data.sessions.toLocaleString()}<br><em>Click to filter</em>`);
      });
      circle.addEventListener('mouseleave', () => {
        if (!isSelected) circle.setAttribute('r', '4');
        this.hideTooltip();
      });

      // Click to filter by month
      if (onFilterClick) {
        circle.addEventListener('click', () => {
          onFilterClick(point.data.month);
        });
      }

      svg.appendChild(circle);
    });

    // X-axis labels (every 2 months, clickable)
    trends.forEach((trend, i) => {
      if (i % 2 === 0) {
        const x = padding.left + i * xStep;
        const isSelected = buFilters.month === trend.month;

        const label = document.createElementNS('http://www.w3.org/2000/svg', 'text');
        label.setAttribute('x', x);
        label.setAttribute('y', height - 10);
        label.setAttribute('text-anchor', 'middle');
        label.setAttribute('font-size', '11');
        label.setAttribute('fill', isSelected ? '#118DFF' : this.colors.gray);
        label.setAttribute('font-weight', isSelected ? '600' : '400');
        label.style.cursor = 'pointer';
        label.textContent = this.formatMonth(trend.month);

        if (onFilterClick) {
          label.addEventListener('click', () => {
            onFilterClick(trend.month);
          });
        }

        svg.appendChild(label);
      }
    });

    container.appendChild(svg);
  },

  // Render business unit horizontal bar chart
  renderBusinessUnitBars(containerId, byBusinessUnit, businessUnits) {
    const container = document.getElementById(containerId);
    if (!container) return;

    const width = container.offsetWidth || 500;
    const barHeight = 28;
    const padding = { top: 10, right: 80, bottom: 10, left: 150 };

    // Sort by adoption rate
    const units = businessUnits
      .map(u => ({ ...u, ...byBusinessUnit[u.id] }))
      .sort((a, b) => b.adoptionRate - a.adoptionRate);

    const height = units.length * (barHeight + 8) + padding.top + padding.bottom;

    // Clear container
    container.innerHTML = '';

    // Create SVG
    const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    svg.setAttribute('width', width);
    svg.setAttribute('height', height);
    svg.style.fontFamily = 'Segoe UI, sans-serif';

    const chartWidth = width - padding.left - padding.right;

    units.forEach((unit, i) => {
      const y = padding.top + i * (barHeight + 8);
      const barWidth = (unit.adoptionRate / 1) * chartWidth; // Max 100%
      const targetX = padding.left + (unit.adoptionTarget / 1) * chartWidth;

      // Unit name
      const label = document.createElementNS('http://www.w3.org/2000/svg', 'text');
      label.setAttribute('x', padding.left - 8);
      label.setAttribute('y', y + barHeight / 2 + 4);
      label.setAttribute('text-anchor', 'end');
      label.setAttribute('font-size', '12');
      label.setAttribute('fill', this.colors.gray);
      label.textContent = unit.name.length > 20 ? unit.name.substring(0, 18) + '...' : unit.name;
      svg.appendChild(label);

      // Background bar
      const bgBar = document.createElementNS('http://www.w3.org/2000/svg', 'rect');
      bgBar.setAttribute('x', padding.left);
      bgBar.setAttribute('y', y);
      bgBar.setAttribute('width', chartWidth);
      bgBar.setAttribute('height', barHeight);
      bgBar.setAttribute('fill', this.colors.grayLighter);
      bgBar.setAttribute('rx', '4');
      svg.appendChild(bgBar);

      // Value bar
      const color = this.getStatusColor(unit.adoptionRate, unit.adoptionTarget);
      const valueBar = document.createElementNS('http://www.w3.org/2000/svg', 'rect');
      valueBar.setAttribute('x', padding.left);
      valueBar.setAttribute('y', y);
      valueBar.setAttribute('width', Math.max(barWidth, 4));
      valueBar.setAttribute('height', barHeight);
      valueBar.setAttribute('fill', color);
      valueBar.setAttribute('rx', '4');
      valueBar.style.cursor = 'pointer';

      valueBar.addEventListener('click', () => {
        App.drillToBusinessUnit(unit.id);
      });

      valueBar.addEventListener('mouseenter', (e) => {
        this.showTooltip(e, `<strong>${unit.name}</strong><br>Adoption: ${(unit.adoptionRate * 100).toFixed(1)}%<br>Target: ${(unit.adoptionTarget * 100).toFixed(1)}%<br>Active Users: ${unit.activeUsers}`);
      });
      valueBar.addEventListener('mouseleave', () => this.hideTooltip());

      svg.appendChild(valueBar);

      // Target line
      const targetLine = document.createElementNS('http://www.w3.org/2000/svg', 'line');
      targetLine.setAttribute('x1', targetX);
      targetLine.setAttribute('x2', targetX);
      targetLine.setAttribute('y1', y - 2);
      targetLine.setAttribute('y2', y + barHeight + 2);
      targetLine.setAttribute('stroke', this.colors.gray);
      targetLine.setAttribute('stroke-width', '2');
      targetLine.setAttribute('stroke-dasharray', '4,2');
      svg.appendChild(targetLine);

      // Value label
      const valueLabel = document.createElementNS('http://www.w3.org/2000/svg', 'text');
      valueLabel.setAttribute('x', width - padding.right + 10);
      valueLabel.setAttribute('y', y + barHeight / 2 + 4);
      valueLabel.setAttribute('font-size', '12');
      valueLabel.setAttribute('font-weight', '600');
      valueLabel.setAttribute('fill', color);
      valueLabel.textContent = (unit.adoptionRate * 100).toFixed(0) + '%';
      svg.appendChild(valueLabel);
    });

    container.appendChild(svg);
  },

  // Render task type donut chart
  renderTaskTypeDonut(containerId, byTaskType) {
    const container = document.getElementById(containerId);
    if (!container) return;

    const width = container.offsetWidth || 300;
    const height = container.offsetHeight || 250;

    // Clear container
    container.innerHTML = '';

    const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    svg.setAttribute('width', width);
    svg.setAttribute('height', height);
    svg.style.fontFamily = 'Segoe UI, sans-serif';

    const centerX = width / 2 - 60;
    const centerY = height / 2;
    const outerRadius = Math.min(width / 2 - 60, height / 2) - 10;
    const innerRadius = outerRadius * 0.6;

    const taskTypes = Object.values(byTaskType).filter(t => t.sessionCount > 0);
    const total = taskTypes.reduce((sum, t) => sum + t.sessionCount, 0);

    let startAngle = -Math.PI / 2;

    taskTypes.forEach((task, i) => {
      const sliceAngle = (task.sessionCount / total) * Math.PI * 2;
      const endAngle = startAngle + sliceAngle;

      const x1 = centerX + outerRadius * Math.cos(startAngle);
      const y1 = centerY + outerRadius * Math.sin(startAngle);
      const x2 = centerX + outerRadius * Math.cos(endAngle);
      const y2 = centerY + outerRadius * Math.sin(endAngle);
      const x3 = centerX + innerRadius * Math.cos(endAngle);
      const y3 = centerY + innerRadius * Math.sin(endAngle);
      const x4 = centerX + innerRadius * Math.cos(startAngle);
      const y4 = centerY + innerRadius * Math.sin(startAngle);

      const largeArc = sliceAngle > Math.PI ? 1 : 0;

      const pathD = `M ${x1} ${y1} A ${outerRadius} ${outerRadius} 0 ${largeArc} 1 ${x2} ${y2} L ${x3} ${y3} A ${innerRadius} ${innerRadius} 0 ${largeArc} 0 ${x4} ${y4} Z`;

      const path = document.createElementNS('http://www.w3.org/2000/svg', 'path');
      path.setAttribute('d', pathD);
      path.setAttribute('fill', this.colors.series[i % this.colors.series.length]);
      path.style.cursor = 'pointer';

      path.addEventListener('mouseenter', (e) => {
        path.setAttribute('transform', `translate(${Math.cos(startAngle + sliceAngle / 2) * 5}, ${Math.sin(startAngle + sliceAngle / 2) * 5})`);
        this.showTooltip(e, `<strong>${task.label}</strong><br>Sessions: ${task.sessionCount.toLocaleString()}<br>${(task.percentage * 100).toFixed(1)}%`);
      });

      path.addEventListener('mouseleave', () => {
        path.setAttribute('transform', '');
        this.hideTooltip();
      });

      path.addEventListener('click', () => {
        App.drillToTaskType(task.id);
      });

      svg.appendChild(path);
      startAngle = endAngle;
    });

    // Legend
    const legendX = width - 110;
    taskTypes.slice(0, 6).forEach((task, i) => {
      const y = 20 + i * 22;

      const rect = document.createElementNS('http://www.w3.org/2000/svg', 'rect');
      rect.setAttribute('x', legendX);
      rect.setAttribute('y', y);
      rect.setAttribute('width', 12);
      rect.setAttribute('height', 12);
      rect.setAttribute('rx', 2);
      rect.setAttribute('fill', this.colors.series[i % this.colors.series.length]);
      svg.appendChild(rect);

      const label = document.createElementNS('http://www.w3.org/2000/svg', 'text');
      label.setAttribute('x', legendX + 18);
      label.setAttribute('y', y + 10);
      label.setAttribute('font-size', '11');
      label.setAttribute('fill', this.colors.gray);
      label.textContent = task.label.length > 12 ? task.label.substring(0, 10) + '...' : task.label;
      svg.appendChild(label);
    });

    container.appendChild(svg);
  },

  // Render business outcome breakdown
  renderOutcomeBreakdown(containerId, byOutcome) {
    const container = document.getElementById(containerId);
    if (!container) return;

    const width = container.offsetWidth || 400;
    const height = container.offsetHeight || 200;
    const padding = { top: 20, right: 20, bottom: 20, left: 160 };

    container.innerHTML = '';

    const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    svg.setAttribute('width', width);
    svg.setAttribute('height', height);
    svg.style.fontFamily = 'Segoe UI, sans-serif';

    const outcomes = Object.values(byOutcome).filter(o => o.sessionCount > 0);
    const maxCount = Math.max(...outcomes.map(o => o.sessionCount));
    const barHeight = 24;
    const chartWidth = width - padding.left - padding.right;

    outcomes.forEach((outcome, i) => {
      const y = padding.top + i * (barHeight + 12);
      const barWidth = (outcome.sessionCount / maxCount) * chartWidth;

      // Label
      const label = document.createElementNS('http://www.w3.org/2000/svg', 'text');
      label.setAttribute('x', padding.left - 8);
      label.setAttribute('y', y + barHeight / 2 + 4);
      label.setAttribute('text-anchor', 'end');
      label.setAttribute('font-size', '12');
      label.setAttribute('fill', this.colors.gray);
      label.textContent = outcome.label;
      svg.appendChild(label);

      // Bar
      const bar = document.createElementNS('http://www.w3.org/2000/svg', 'rect');
      bar.setAttribute('x', padding.left);
      bar.setAttribute('y', y);
      bar.setAttribute('width', barWidth);
      bar.setAttribute('height', barHeight);
      bar.setAttribute('fill', this.colors.series[i % this.colors.series.length]);
      bar.setAttribute('rx', '4');
      svg.appendChild(bar);

      // Value
      const value = document.createElementNS('http://www.w3.org/2000/svg', 'text');
      value.setAttribute('x', padding.left + barWidth + 8);
      value.setAttribute('y', y + barHeight / 2 + 4);
      value.setAttribute('font-size', '11');
      value.setAttribute('fill', this.colors.gray);
      value.textContent = outcome.sessionCount.toLocaleString();
      svg.appendChild(value);
    });

    container.appendChild(svg);
  },

  // Render adoption funnel
  renderFunnel(containerId, funnelData, buFilters = {}, onFilterClick = null) {
    const container = document.getElementById(containerId);
    if (!container) return;

    container.innerHTML = '';

    // Map funnel stages to engagement tiers
    const stages = [
      { key: 'licensed', tier: null, label: 'Licensed', value: funnelData.licensed || funnelData['inactive'] + funnelData['tried'] + funnelData['regular'] + funnelData['power-user'] || 0 },
      { key: 'onboarded', tier: null, label: 'Onboarded', value: funnelData.onboarded || funnelData['tried'] + funnelData['regular'] + funnelData['power-user'] || 0 },
      { key: 'tried', tier: 'tried', label: 'Tried (1+ session)', value: funnelData.tried || funnelData['tried'] + funnelData['regular'] + funnelData['power-user'] || 0 },
      { key: 'regular', tier: 'regular', label: 'Regular (5+/mo)', value: funnelData.regular || funnelData['regular'] + funnelData['power-user'] || 0 },
      { key: 'powerUser', tier: 'power-user', label: 'Power User (20+/mo)', value: funnelData.powerUser || funnelData['power-user'] || 0 }
    ];

    const maxValue = stages[0].value || 1;

    const funnelDiv = document.createElement('div');
    funnelDiv.className = 'funnel-container';

    stages.forEach((stage, i) => {
      const percentage = maxValue > 0 ? (stage.value / maxValue) * 100 : 0;
      const isSelected = stage.tier && buFilters.engagementTier === stage.tier;
      const isClickable = stage.tier !== null;

      const stepDiv = document.createElement('div');
      stepDiv.className = 'funnel-step';
      if (isClickable) {
        stepDiv.style.cursor = 'pointer';
      }

      const labelDiv = document.createElement('div');
      labelDiv.className = 'funnel-label';
      labelDiv.textContent = stage.label;
      if (isSelected) {
        labelDiv.style.fontWeight = '600';
        labelDiv.style.color = '#118DFF';
      }

      const barDiv = document.createElement('div');
      barDiv.className = 'funnel-bar';
      barDiv.style.width = `${Math.max(percentage, 10)}%`;
      barDiv.style.background = this.colors.series[i % this.colors.series.length];
      barDiv.style.opacity = buFilters.engagementTier && !isSelected ? '0.4' : '1';
      barDiv.textContent = stage.value.toLocaleString();

      if (isSelected) {
        barDiv.style.outline = '3px solid #118DFF';
        barDiv.style.outlineOffset = '2px';
      }

      if (isClickable && onFilterClick) {
        stepDiv.addEventListener('click', () => {
          onFilterClick(stage.tier);
        });

        stepDiv.addEventListener('mouseenter', () => {
          barDiv.style.transform = 'scaleX(1.02)';
          barDiv.style.transition = 'transform 0.15s ease';
        });
        stepDiv.addEventListener('mouseleave', () => {
          barDiv.style.transform = 'scaleX(1)';
        });
      }

      stepDiv.appendChild(labelDiv);
      stepDiv.appendChild(barDiv);
      funnelDiv.appendChild(stepDiv);
    });

    container.appendChild(funnelDiv);
  },

  // Render heatmap
  renderHeatmap(containerId, byTaskType, byBusinessUnit, sessions, ucFilters = {}, onFilterClick = null) {
    const container = document.getElementById(containerId);
    if (!container) return;

    container.innerHTML = '';

    const taskTypes = Object.values(byTaskType);
    const unitIds = Object.keys(byBusinessUnit);

    // Build matrix data
    const matrix = {};
    sessions.forEach(s => {
      const key = `${s.businessUnitId}|${s.taskType}`;
      matrix[key] = (matrix[key] || 0) + 1;
    });

    const maxCount = Math.max(...Object.values(matrix), 1);

    // Create table
    const table = document.createElement('table');
    table.className = 'heatmap-table';

    // Header row
    const thead = document.createElement('thead');
    const headerRow = document.createElement('tr');
    headerRow.innerHTML = '<th>Business Unit</th>';
    taskTypes.forEach(t => {
      const isSelected = ucFilters.taskType === t.id;
      const headerCell = document.createElement('th');
      headerCell.textContent = t.label.split('/')[0];
      headerCell.style.cursor = 'pointer';
      if (isSelected) {
        headerCell.style.background = '#118DFF';
        headerCell.style.color = '#fff';
      }
      headerCell.addEventListener('click', () => {
        if (onFilterClick) onFilterClick('taskType', t.id);
      });
      headerRow.appendChild(headerCell);
    });
    thead.appendChild(headerRow);
    table.appendChild(thead);

    // Body rows
    const tbody = document.createElement('tbody');
    unitIds.forEach(unitId => {
      const unit = byBusinessUnit[unitId];
      const row = document.createElement('tr');
      const isUnitSelected = ucFilters.businessUnit === unitId;
      const hasUnitFilter = !!ucFilters.businessUnit;

      // Dim row if another unit is selected
      if (hasUnitFilter && !isUnitSelected) {
        row.style.opacity = '0.4';
      }

      // Unit name cell
      const unitCell = document.createElement('td');
      unitCell.style.textAlign = 'left';
      unitCell.style.fontWeight = '500';
      unitCell.style.cursor = 'pointer';
      unitCell.textContent = unit.name;
      if (isUnitSelected) {
        unitCell.style.background = '#118DFF';
        unitCell.style.color = '#fff';
      }
      unitCell.addEventListener('click', () => {
        if (onFilterClick) onFilterClick('businessUnit', unitId);
      });
      row.appendChild(unitCell);

      // Data cells
      taskTypes.forEach(task => {
        const count = matrix[`${unitId}|${task.id}`] || 0;
        const intensity = count / maxCount;
        const bgColor = this.getHeatmapColor(intensity);
        const textColor = intensity > 0.5 ? '#fff' : this.colors.gray;

        const cell = document.createElement('td');
        cell.className = 'heatmap-cell';
        cell.style.background = bgColor;
        cell.style.color = textColor;
        cell.style.cursor = 'pointer';
        cell.textContent = count > 0 ? count : '-';

        // Highlight/dim based on current filters
        const isTaskSelected = ucFilters.taskType === task.id;
        const hasTaskFilter = !!ucFilters.taskType;

        if (isTaskSelected || isUnitSelected) {
          cell.style.outline = '2px solid #118DFF';
          cell.style.outlineOffset = '-2px';
        }

        // Dim cells not matching task filter
        if (hasTaskFilter && !isTaskSelected) {
          cell.style.opacity = '0.4';
        }

        cell.addEventListener('click', () => {
          if (onFilterClick) {
            // Click on cell can set both filters
            onFilterClick('taskType', task.id);
          }
        });

        cell.addEventListener('mouseenter', (e) => {
          this.showTooltip(e, `<strong>${unit.name}</strong><br>${task.label}<br>Sessions: ${count}<br><em>Click to filter</em>`);
        });
        cell.addEventListener('mouseleave', () => this.hideTooltip());

        row.appendChild(cell);
      });

      tbody.appendChild(row);
    });
    table.appendChild(tbody);

    container.appendChild(table);
  },

  // Render Business Unit heatmap (for Business Unit view)
  renderBUHeatmap(containerId, taskTypes, businessUnits, sessions, buFilters = {}, onFilterClick = null) {
    const container = document.getElementById(containerId);
    if (!container) return;

    container.innerHTML = '';

    // Build matrix data
    const matrix = {};
    sessions.forEach(s => {
      const key = `${s.businessUnitId}|${s.taskType}`;
      matrix[key] = (matrix[key] || 0) + 1;
    });

    const maxCount = Math.max(...Object.values(matrix), 1);

    // Create table
    const table = document.createElement('table');
    table.className = 'heatmap-table';

    // Header row
    const thead = document.createElement('thead');
    const headerRow = document.createElement('tr');

    // Corner cell
    const cornerCell = document.createElement('th');
    cornerCell.textContent = 'Business Unit';
    headerRow.appendChild(cornerCell);

    // Task type headers (clickable)
    taskTypes.forEach(t => {
      const isSelected = buFilters.taskType === t.id;
      const headerCell = document.createElement('th');
      headerCell.textContent = t.label.split('/')[0];
      headerCell.style.cursor = 'pointer';
      headerCell.title = `Click to filter by ${t.label}`;
      if (isSelected) {
        headerCell.style.background = '#118DFF';
        headerCell.style.color = '#fff';
      }
      headerCell.addEventListener('click', () => {
        if (onFilterClick) onFilterClick('taskType', t.id);
      });
      headerRow.appendChild(headerCell);
    });
    thead.appendChild(headerRow);
    table.appendChild(thead);

    // Body rows
    const tbody = document.createElement('tbody');
    businessUnits.forEach(unit => {
      const row = document.createElement('tr');

      // Unit name cell (not clickable - use main filter for that)
      const unitCell = document.createElement('td');
      unitCell.style.textAlign = 'left';
      unitCell.style.fontWeight = '500';
      unitCell.textContent = unit.name.length > 20 ? unit.name.substring(0, 18) + '...' : unit.name;
      unitCell.title = unit.name;
      row.appendChild(unitCell);

      // Data cells
      taskTypes.forEach(task => {
        const count = matrix[`${unit.id}|${task.id}`] || 0;
        const intensity = count / maxCount;
        const bgColor = this.getHeatmapColor(intensity);
        const textColor = intensity > 0.5 ? '#fff' : this.colors.gray;

        const cell = document.createElement('td');
        cell.className = 'heatmap-cell';
        cell.style.background = bgColor;
        cell.style.color = textColor;
        cell.style.cursor = 'pointer';
        cell.textContent = count > 0 ? count : '-';

        // Highlight selected task type column
        const isTaskSelected = buFilters.taskType === task.id;
        if (isTaskSelected) {
          cell.style.outline = '2px solid #118DFF';
          cell.style.outlineOffset = '-2px';
        }

        // Dim non-selected if filter is active
        if (buFilters.taskType && !isTaskSelected) {
          cell.style.opacity = '0.4';
        }

        cell.addEventListener('click', () => {
          if (onFilterClick) onFilterClick('taskType', task.id);
        });

        cell.addEventListener('mouseenter', (e) => {
          this.showTooltip(e, `<strong>${unit.name}</strong><br>${task.label}<br>Sessions: ${count}<br><em>Click to filter</em>`);
        });
        cell.addEventListener('mouseleave', () => this.hideTooltip());

        row.appendChild(cell);
      });

      tbody.appendChild(row);
    });
    table.appendChild(tbody);

    container.appendChild(table);
  },

  // Render task type trend stacked area
  renderTaskTypeTrend(containerId, sessions, taskTypes, ucFilters = {}, onFilterClick = null) {
    const container = document.getElementById(containerId);
    if (!container) return;

    // Group sessions by month and task type
    const monthlyData = {};
    sessions.forEach(s => {
      const month = s.date.substring(0, 7);
      if (!monthlyData[month]) {
        monthlyData[month] = {};
        taskTypes.forEach(t => { monthlyData[month][t.id] = 0; });
      }
      monthlyData[month][s.taskType]++;
    });

    const months = Object.keys(monthlyData).sort();

    const width = container.offsetWidth || 500;
    const height = container.offsetHeight || 250;
    const padding = { top: 20, right: 120, bottom: 40, left: 50 };

    container.innerHTML = '';

    const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    svg.setAttribute('width', width);
    svg.setAttribute('height', height);
    svg.style.fontFamily = 'Segoe UI, sans-serif';

    const chartWidth = width - padding.left - padding.right;
    const chartHeight = height - padding.top - padding.bottom;

    // Calculate max total
    const maxTotal = Math.max(...months.map(m =>
      Object.values(monthlyData[m]).reduce((a, b) => a + b, 0)
    ), 1) * 1.1;

    const xStep = months.length > 1 ? chartWidth / (months.length - 1) : chartWidth;

    // Draw stacked areas (from bottom to top)
    taskTypes.slice().reverse().forEach((task, reverseIdx) => {
      const idx = taskTypes.length - 1 - reverseIdx;
      const isSelected = ucFilters.taskType === task.id;
      let pathD = '';
      let bottomPathD = '';

      months.forEach((month, i) => {
        const x = padding.left + i * xStep;
        let stackedValue = 0;
        for (let j = 0; j <= idx; j++) {
          stackedValue += monthlyData[month][taskTypes[j].id] || 0;
        }
        const y = padding.top + chartHeight - (stackedValue / maxTotal) * chartHeight;

        let prevStackedValue = 0;
        for (let j = 0; j < idx; j++) {
          prevStackedValue += monthlyData[month][taskTypes[j].id] || 0;
        }
        const prevY = padding.top + chartHeight - (prevStackedValue / maxTotal) * chartHeight;

        if (i === 0) {
          pathD = `M ${x} ${y}`;
          bottomPathD = `M ${x} ${prevY}`;
        } else {
          pathD += ` L ${x} ${y}`;
          bottomPathD += ` L ${x} ${prevY}`;
        }
      });

      // Close the area
      const lastX = padding.left + (months.length - 1) * xStep;
      const firstX = padding.left;

      // Reverse bottom path for area closure
      const bottomPoints = bottomPathD.split(' L ').reverse().join(' L ').replace('M', 'L');
      const areaD = pathD + ` L ${lastX} ${padding.top + chartHeight} L ${firstX} ${padding.top + chartHeight} Z`;

      const area = document.createElementNS('http://www.w3.org/2000/svg', 'path');
      area.setAttribute('d', pathD + bottomPoints.replace(/^L/, ' L') + ' Z');
      area.setAttribute('fill', this.colors.series[idx % this.colors.series.length]);
      area.setAttribute('fill-opacity', isSelected ? '1' : (ucFilters.taskType ? '0.15' : '0.8'));
      area.style.cursor = 'pointer';

      // Add stroke for selected area
      if (isSelected) {
        area.setAttribute('stroke', this.colors.series[idx % this.colors.series.length]);
        area.setAttribute('stroke-width', '2');
      }

      area.addEventListener('click', () => {
        if (onFilterClick) onFilterClick(task.id);
      });

      area.addEventListener('mouseenter', (e) => {
        const totalForTask = months.reduce((sum, m) => sum + (monthlyData[m][task.id] || 0), 0);
        this.showTooltip(e, `<strong>${task.label}</strong><br>Total Sessions: ${totalForTask.toLocaleString()}<br>Click to filter`);
      });
      area.addEventListener('mouseleave', () => this.hideTooltip());

      svg.appendChild(area);
    });

    // X-axis labels
    months.forEach((month, i) => {
      if (i % 2 === 0) {
        const x = padding.left + i * xStep;
        const label = document.createElementNS('http://www.w3.org/2000/svg', 'text');
        label.setAttribute('x', x);
        label.setAttribute('y', height - 10);
        label.setAttribute('text-anchor', 'middle');
        label.setAttribute('font-size', '10');
        label.setAttribute('fill', this.colors.gray);
        label.textContent = this.formatMonth(month);
        svg.appendChild(label);
      }
    });

    // Legend (clickable)
    const legendX = width - 110;
    taskTypes.slice(0, 6).forEach((task, i) => {
      const y = 20 + i * 20;
      const isSelected = ucFilters.taskType === task.id;

      // Legend item group
      const group = document.createElementNS('http://www.w3.org/2000/svg', 'g');
      group.style.cursor = 'pointer';

      // Background highlight for selected
      if (isSelected) {
        const bg = document.createElementNS('http://www.w3.org/2000/svg', 'rect');
        bg.setAttribute('x', legendX - 4);
        bg.setAttribute('y', y - 4);
        bg.setAttribute('width', 100);
        bg.setAttribute('height', 20);
        bg.setAttribute('rx', 3);
        bg.setAttribute('fill', '#e6f2ff');
        group.appendChild(bg);
      }

      const rect = document.createElementNS('http://www.w3.org/2000/svg', 'rect');
      rect.setAttribute('x', legendX);
      rect.setAttribute('y', y);
      rect.setAttribute('width', 12);
      rect.setAttribute('height', 12);
      rect.setAttribute('rx', 2);
      rect.setAttribute('fill', this.colors.series[i % this.colors.series.length]);
      group.appendChild(rect);

      const label = document.createElementNS('http://www.w3.org/2000/svg', 'text');
      label.setAttribute('x', legendX + 18);
      label.setAttribute('y', y + 10);
      label.setAttribute('font-size', '10');
      label.setAttribute('fill', isSelected ? '#118DFF' : this.colors.gray);
      label.setAttribute('font-weight', isSelected ? '600' : '400');
      label.textContent = task.label.split('/')[0];
      group.appendChild(label);

      group.addEventListener('click', () => {
        if (onFilterClick) onFilterClick(task.id);
      });

      svg.appendChild(group);
    });

    container.appendChild(svg);
  },

  // Render outcome donut (similar to task type donut)
  renderOutcomeDonut(containerId, byOutcome, ucFilters = {}, onFilterClick = null) {
    // Reuse donut logic with outcome data
    const container = document.getElementById(containerId);
    if (!container) return;

    const width = container.offsetWidth || 300;
    const height = container.offsetHeight || 250;

    container.innerHTML = '';

    const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    svg.setAttribute('width', width);
    svg.setAttribute('height', height);
    svg.style.fontFamily = 'Segoe UI, sans-serif';

    const centerX = width / 2 - 60;
    const centerY = height / 2;
    const outerRadius = Math.min(width / 2 - 60, height / 2) - 10;
    const innerRadius = outerRadius * 0.6;

    const outcomes = Object.values(byOutcome).filter(o => o.sessionCount > 0);
    const total = outcomes.reduce((sum, o) => sum + o.sessionCount, 0);

    let startAngle = -Math.PI / 2;

    outcomes.forEach((outcome, i) => {
      const sliceAngle = (outcome.sessionCount / total) * Math.PI * 2;
      const endAngle = startAngle + sliceAngle;
      const isSelected = ucFilters.outcome === outcome.id;

      const x1 = centerX + outerRadius * Math.cos(startAngle);
      const y1 = centerY + outerRadius * Math.sin(startAngle);
      const x2 = centerX + outerRadius * Math.cos(endAngle);
      const y2 = centerY + outerRadius * Math.sin(endAngle);
      const x3 = centerX + innerRadius * Math.cos(endAngle);
      const y3 = centerY + innerRadius * Math.sin(endAngle);
      const x4 = centerX + innerRadius * Math.cos(startAngle);
      const y4 = centerY + innerRadius * Math.sin(startAngle);

      const largeArc = sliceAngle > Math.PI ? 1 : 0;

      const pathD = `M ${x1} ${y1} A ${outerRadius} ${outerRadius} 0 ${largeArc} 1 ${x2} ${y2} L ${x3} ${y3} A ${innerRadius} ${innerRadius} 0 ${largeArc} 0 ${x4} ${y4} Z`;

      const path = document.createElementNS('http://www.w3.org/2000/svg', 'path');
      path.setAttribute('d', pathD);
      path.setAttribute('fill', this.colors.series[i % this.colors.series.length]);
      path.setAttribute('fill-opacity', isSelected ? '1' : (ucFilters.outcome ? '0.3' : '1'));
      path.style.cursor = 'pointer';

      // Add stroke for selected slice
      if (isSelected) {
        path.setAttribute('stroke', '#118DFF');
        path.setAttribute('stroke-width', '3');
      }

      path.addEventListener('mouseenter', (e) => {
        path.setAttribute('transform', `translate(${Math.cos(startAngle + sliceAngle / 2) * 5}, ${Math.sin(startAngle + sliceAngle / 2) * 5})`);
        this.showTooltip(e, `<strong>${outcome.label}</strong><br>Sessions: ${outcome.sessionCount.toLocaleString()}<br>${(outcome.percentage * 100).toFixed(1)}%<br>Click to filter`);
      });

      path.addEventListener('mouseleave', () => {
        path.setAttribute('transform', '');
        this.hideTooltip();
      });

      path.addEventListener('click', () => {
        if (onFilterClick) onFilterClick(outcome.id);
      });

      svg.appendChild(path);
      startAngle = endAngle;
    });

    // Legend (clickable)
    const legendX = width - 110;
    outcomes.forEach((outcome, i) => {
      const y = 20 + i * 22;
      const isSelected = ucFilters.outcome === outcome.id;

      // Legend item group
      const group = document.createElementNS('http://www.w3.org/2000/svg', 'g');
      group.style.cursor = 'pointer';

      // Background highlight for selected
      if (isSelected) {
        const bg = document.createElementNS('http://www.w3.org/2000/svg', 'rect');
        bg.setAttribute('x', legendX - 4);
        bg.setAttribute('y', y - 4);
        bg.setAttribute('width', 100);
        bg.setAttribute('height', 20);
        bg.setAttribute('rx', 3);
        bg.setAttribute('fill', '#e6f2ff');
        group.appendChild(bg);
      }

      const rect = document.createElementNS('http://www.w3.org/2000/svg', 'rect');
      rect.setAttribute('x', legendX);
      rect.setAttribute('y', y);
      rect.setAttribute('width', 12);
      rect.setAttribute('height', 12);
      rect.setAttribute('rx', 2);
      rect.setAttribute('fill', this.colors.series[i % this.colors.series.length]);
      group.appendChild(rect);

      const label = document.createElementNS('http://www.w3.org/2000/svg', 'text');
      label.setAttribute('x', legendX + 18);
      label.setAttribute('y', y + 10);
      label.setAttribute('font-size', '10');
      label.setAttribute('fill', isSelected ? '#118DFF' : this.colors.gray);
      label.setAttribute('font-weight', isSelected ? '600' : '400');
      label.textContent = outcome.label.length > 12 ? outcome.label.substring(0, 10) + '...' : outcome.label;
      group.appendChild(label);

      group.addEventListener('click', () => {
        if (onFilterClick) onFilterClick(outcome.id);
      });

      svg.appendChild(group);
    });

    container.appendChild(svg);
  },

  // Utility: Get status color based on actual vs target
  getStatusColor(actual, target) {
    const ratio = actual / target;
    if (ratio >= 1.0) return this.colors.success;
    if (ratio >= 0.9) return this.colors.warning;
    return this.colors.danger;
  },

  // Utility: Get heatmap color
  getHeatmapColor(intensity) {
    if (intensity === 0) return this.colors.grayLighter;
    // Gradient from light blue to dark blue
    const r = Math.round(17 + (237 - 17) * (1 - intensity));
    const g = Math.round(141 + (235 - 141) * (1 - intensity));
    const b = Math.round(255 + (233 - 255) * (1 - intensity));
    return `rgb(${r}, ${g}, ${b})`;
  },

  // Utility: Format month
  formatMonth(monthStr) {
    const [year, month] = monthStr.split('-');
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    return months[parseInt(month) - 1] + ' ' + year.slice(2);
  },

  // Tooltip management
  showTooltip(event, html) {
    let tooltip = document.getElementById('chart-tooltip');
    if (!tooltip) {
      tooltip = document.createElement('div');
      tooltip.id = 'chart-tooltip';
      tooltip.style.cssText = `
        position: fixed;
        background: rgba(37, 36, 35, 0.95);
        color: white;
        padding: 8px 12px;
        border-radius: 4px;
        font-size: 12px;
        pointer-events: none;
        z-index: 10000;
        max-width: 200px;
        box-shadow: 0 2px 8px rgba(0,0,0,0.2);
      `;
      document.body.appendChild(tooltip);
    }

    tooltip.innerHTML = html;
    tooltip.style.display = 'block';
    tooltip.style.left = (event.clientX + 10) + 'px';
    tooltip.style.top = (event.clientY - 10) + 'px';
  },

  hideTooltip() {
    const tooltip = document.getElementById('chart-tooltip');
    if (tooltip) {
      tooltip.style.display = 'none';
    }
  }
};

// Export for global access
window.Charts = Charts;
