// Data Generator for Enterprise AI Adoption Dashboard Prototype
// Generates realistic mock data for ~5K users and ~150K sessions over 12 months

const DataGenerator = {
  // Seeded random for reproducible data
  seed: 12345,

  random() {
    this.seed = (this.seed * 9301 + 49297) % 233280;
    return this.seed / 233280;
  },

  randomInt(min, max) {
    return Math.floor(this.random() * (max - min + 1)) + min;
  },

  randomChoice(arr) {
    return arr[Math.floor(this.random() * arr.length)];
  },

  weightedChoice(options, weights) {
    const total = weights.reduce((a, b) => a + b, 0);
    let r = this.random() * total;
    for (let i = 0; i < options.length; i++) {
      r -= weights[i];
      if (r <= 0) return options[i];
    }
    return options[options.length - 1];
  },

  // Generate a date within range
  randomDate(start, end) {
    const startTime = new Date(start).getTime();
    const endTime = new Date(end).getTime();
    const randomTime = startTime + this.random() * (endTime - startTime);
    return new Date(randomTime).toISOString().split('T')[0];
  },

  // Adoption curve - more users onboard over time, with acceleration
  getAdoptionProbability(month, targetAdoption) {
    // S-curve adoption pattern
    const x = month / 12;
    const curve = 1 / (1 + Math.exp(-10 * (x - 0.4)));
    return curve * targetAdoption;
  },

  // Generate users for a business unit
  generateUsersForUnit(unit, referenceData) {
    const users = [];
    const startDate = new Date('2025-02-01');

    for (let i = 0; i < unit.licensedUsers; i++) {
      const userId = `usr-${unit.id}-${String(i).padStart(4, '0')}`;

      // Determine if user is onboarded based on adoption curve
      const monthOffset = this.randomInt(0, 11);
      const adoptionProb = this.getAdoptionProbability(monthOffset, unit.adoptionTarget);
      const isOnboarded = this.random() < adoptionProb * 1.3; // Slightly higher than target

      if (!isOnboarded) {
        // User hasn't onboarded yet
        users.push({
          userId,
          businessUnitId: unit.id,
          onboardedDate: null,
          lastActiveDate: null,
          totalSessions: 0,
          engagementTier: 'inactive'
        });
        continue;
      }

      // Calculate onboarded date
      const onboardMonth = startDate.getMonth() + monthOffset;
      const onboardDate = new Date(startDate);
      onboardDate.setMonth(onboardMonth);
      onboardDate.setDate(this.randomInt(1, 28));

      // Determine engagement level
      const engagementRoll = this.random();
      let engagementTier, sessionsPerMonth;

      if (engagementRoll < 0.15) {
        engagementTier = 'power-user';
        sessionsPerMonth = this.randomInt(20, 45);
      } else if (engagementRoll < 0.45) {
        engagementTier = 'regular';
        sessionsPerMonth = this.randomInt(5, 19);
      } else if (engagementRoll < 0.85) {
        engagementTier = 'tried';
        sessionsPerMonth = this.randomInt(1, 4);
      } else {
        engagementTier = 'inactive';
        sessionsPerMonth = 0;
      }

      // Calculate months active
      const now = new Date('2026-01-31');
      const monthsActive = Math.max(1, Math.floor((now - onboardDate) / (30 * 24 * 60 * 60 * 1000)));
      const totalSessions = Math.floor(sessionsPerMonth * monthsActive * (0.7 + this.random() * 0.6));

      // Last active date
      let lastActiveDate = null;
      if (totalSessions > 0) {
        const daysAgo = engagementTier === 'power-user' ? this.randomInt(0, 3) :
                        engagementTier === 'regular' ? this.randomInt(0, 14) :
                        this.randomInt(14, 60);
        const lastActive = new Date('2026-01-22');
        lastActive.setDate(lastActive.getDate() - daysAgo);
        lastActiveDate = lastActive.toISOString().split('T')[0];
      }

      users.push({
        userId,
        businessUnitId: unit.id,
        onboardedDate: onboardDate.toISOString().split('T')[0],
        lastActiveDate,
        totalSessions,
        engagementTier
      });
    }

    return users;
  },

  // Generate sessions for users
  generateSessions(users, businessUnits, referenceData) {
    const sessions = [];
    const taskTypes = referenceData.taskTypes.map(t => t.id);
    const outcomes = referenceData.businessOutcomes.map(o => o.id);
    const features = referenceData.features.map(f => f.id);

    // Create unit lookup for task type weights
    const unitMap = {};
    businessUnits.forEach(u => { unitMap[u.id] = u; });

    let sessionId = 0;

    users.forEach(user => {
      if (user.totalSessions === 0 || !user.onboardedDate) return;

      const unit = unitMap[user.businessUnitId];
      const primaryTasks = unit.primaryTaskTypes || taskTypes.slice(0, 3);

      // Generate sessions distributed over time
      const onboardDate = new Date(user.onboardedDate);
      const endDate = new Date('2026-01-31');

      for (let i = 0; i < user.totalSessions; i++) {
        sessionId++;

        // Distribute sessions with increasing frequency over time
        const sessionDate = this.randomDate(user.onboardedDate, '2026-01-22');

        // Task type - weighted toward unit's primary tasks
        const taskWeights = taskTypes.map(t => primaryTasks.includes(t) ? 3 : 1);
        const taskType = this.weightedChoice(taskTypes, taskWeights);

        // Business outcome based on task type
        const outcomeWeights = this.getOutcomeWeights(taskType);
        const businessOutcome = this.weightedChoice(outcomes, outcomeWeights);

        // Features used
        const featuresUsed = ['chat']; // Always includes chat
        if (taskType === 'code-generation' && this.random() < 0.7) featuresUsed.push('code-mode');
        if (this.random() < 0.3) featuresUsed.push('doc-upload');
        if (this.random() < 0.1) featuresUsed.push('image-analysis');
        if (this.random() < 0.2) featuresUsed.push('data-export');

        sessions.push({
          sessionId: `sess-${String(sessionId).padStart(6, '0')}`,
          userId: user.userId,
          businessUnitId: user.businessUnitId,
          date: sessionDate,
          durationMinutes: this.randomInt(3, 45),
          queryCount: this.randomInt(2, 25),
          taskType,
          businessOutcome,
          featuresUsed,
          userRating: this.random() < 0.4 ? this.randomInt(3, 5) : null // 40% rate sessions
        });
      }
    });

    // Sort by date
    sessions.sort((a, b) => new Date(a.date) - new Date(b.date));

    return sessions;
  },

  getOutcomeWeights(taskType) {
    // Map task types to likely business outcomes
    const weights = {
      'writing': [1, 1, 3, 3, 2],           // customer-content, internal-comms
      'data-analysis': [2, 4, 1, 1, 1],      // decision-support
      'code-generation': [4, 1, 1, 1, 3],    // process-automation, technical-docs
      'research': [1, 3, 2, 2, 2],           // decision-support
      'brainstorming': [2, 2, 2, 2, 1],      // balanced
      'translation': [1, 1, 3, 2, 1]         // customer-content
    };
    return weights[taskType] || [1, 1, 1, 1, 1];
  },

  // Main generation function
  async generate(businessUnits, referenceData) {
    console.log('Generating mock data...');

    // Generate users for each business unit
    let allUsers = [];
    businessUnits.forEach(unit => {
      const users = this.generateUsersForUnit(unit, referenceData);
      allUsers = allUsers.concat(users);
    });

    console.log(`Generated ${allUsers.length} users`);

    // Generate sessions
    const sessions = this.generateSessions(allUsers, businessUnits, referenceData);
    console.log(`Generated ${sessions.length} sessions`);

    return { users: allUsers, sessions };
  },

  // Aggregate data for dashboard views
  computeMetrics(users, sessions, businessUnits, referenceData, dateRange = null) {
    const metrics = {
      overview: {},
      byBusinessUnit: {},
      byTaskType: {},
      byOutcome: {},
      byMonth: {},
      trends: []
    };

    // Filter sessions by date range if provided
    let filteredSessions = sessions;
    if (dateRange) {
      filteredSessions = sessions.filter(s =>
        s.date >= dateRange.start && s.date <= dateRange.end
      );
    }

    // Overview metrics
    const activeUsers = users.filter(u => u.totalSessions > 0);
    const totalLicensed = users.length;

    metrics.overview = {
      totalLicensedUsers: totalLicensed,
      totalActiveUsers: activeUsers.length,
      adoptionRate: activeUsers.length / totalLicensed,
      totalSessions: filteredSessions.length,
      avgSessionsPerUser: filteredSessions.length / Math.max(activeUsers.length, 1),
      avgSessionDuration: filteredSessions.reduce((a, s) => a + s.durationMinutes, 0) / Math.max(filteredSessions.length, 1),
      avgQueriesPerSession: filteredSessions.reduce((a, s) => a + s.queryCount, 0) / Math.max(filteredSessions.length, 1)
    };

    // By business unit
    businessUnits.forEach(unit => {
      const unitUsers = users.filter(u => u.businessUnitId === unit.id);
      const unitActiveUsers = unitUsers.filter(u => u.totalSessions > 0);
      const unitSessions = filteredSessions.filter(s => s.businessUnitId === unit.id);

      metrics.byBusinessUnit[unit.id] = {
        ...unit,
        totalUsers: unitUsers.length,
        activeUsers: unitActiveUsers.length,
        adoptionRate: unitActiveUsers.length / Math.max(unitUsers.length, 1),
        totalSessions: unitSessions.length,
        avgSessionsPerUser: unitSessions.length / Math.max(unitActiveUsers.length, 1),
        targetStatus: this.getTargetStatus(unitActiveUsers.length / Math.max(unitUsers.length, 1), unit.adoptionTarget),
        engagementBreakdown: {
          'power-user': unitUsers.filter(u => u.engagementTier === 'power-user').length,
          'regular': unitUsers.filter(u => u.engagementTier === 'regular').length,
          'tried': unitUsers.filter(u => u.engagementTier === 'tried').length,
          'inactive': unitUsers.filter(u => u.engagementTier === 'inactive').length
        }
      };
    });

    // By task type
    referenceData.taskTypes.forEach(task => {
      const taskSessions = filteredSessions.filter(s => s.taskType === task.id);
      metrics.byTaskType[task.id] = {
        ...task,
        sessionCount: taskSessions.length,
        percentage: taskSessions.length / Math.max(filteredSessions.length, 1),
        avgDuration: taskSessions.reduce((a, s) => a + s.durationMinutes, 0) / Math.max(taskSessions.length, 1),
        uniqueUsers: new Set(taskSessions.map(s => s.userId)).size
      };
    });

    // By business outcome
    referenceData.businessOutcomes.forEach(outcome => {
      const outcomeSessions = filteredSessions.filter(s => s.businessOutcome === outcome.id);
      metrics.byOutcome[outcome.id] = {
        ...outcome,
        sessionCount: outcomeSessions.length,
        percentage: outcomeSessions.length / Math.max(filteredSessions.length, 1)
      };
    });

    // Monthly trends
    const months = this.getMonthsInRange('2025-02-01', '2026-01-31');
    months.forEach(month => {
      const monthSessions = sessions.filter(s => s.date.startsWith(month));
      const monthActiveUserIds = new Set(monthSessions.map(s => s.userId));

      metrics.byMonth[month] = {
        month,
        sessions: monthSessions.length,
        activeUsers: monthActiveUserIds.size,
        newUsers: users.filter(u => u.onboardedDate && u.onboardedDate.startsWith(month)).length
      };

      metrics.trends.push({
        month,
        ...metrics.byMonth[month]
      });
    });

    return metrics;
  },

  getMonthsInRange(start, end) {
    const months = [];
    const current = new Date(start);
    const endDate = new Date(end);

    while (current <= endDate) {
      months.push(current.toISOString().slice(0, 7));
      current.setMonth(current.getMonth() + 1);
    }

    return months;
  },

  getTargetStatus(actual, target) {
    const ratio = actual / target;
    if (ratio >= 1.0) return 'above';
    if (ratio >= 0.9) return 'on-track';
    return 'below';
  }
};

// Export for use in browser
if (typeof window !== 'undefined') {
  window.DataGenerator = DataGenerator;
}
