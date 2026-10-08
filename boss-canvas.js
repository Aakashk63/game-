/**
 * RideQuest - Final Boss System Design Canvas Engine
 * Allows students to construct the full 10-Million-User RideQuest Architecture!
 * Real-time architectural scoring across Performance, Scalability, Reliability, Security, User Experience.
 */

class BossCanvasEngine {
  constructor(containerId) {
    this.container = document.getElementById(containerId);
    this.availableComponents = [
      { id: 'cdn', name: 'CDN (Edge Cache)', icon: '⚡', category: 'edge', perf: 25, scal: 20, rel: 10, sec: 5, desc: 'Caches static map tiles and assets near users' },
      { id: 'gateway', name: 'API Gateway & Rate Limiter', icon: '🚪', category: 'gateway', perf: 15, scal: 25, rel: 15, sec: 35, desc: 'Single entry point, enforces rate limiting and token auth' },
      { id: 'load_balancer', name: 'Load Balancer Cluster', icon: '⚖️', category: 'routing', perf: 20, scal: 35, rel: 30, sec: 5, desc: 'Evenly distributes requests across backend instances' },
      { id: 'ride_service', name: 'Ride Booking Service', icon: '🚗', category: 'service', perf: 10, scal: 20, rel: 15, sec: 10, desc: 'Manages trip lifecycles and ride matching' },
      { id: 'driver_service', name: 'Driver Management Service', icon: '👨‍✈️', category: 'service', perf: 10, scal: 15, rel: 15, sec: 10, desc: 'Driver profiles, vehicle status, and availability' },
      { id: 'location_service', name: 'Real-Time Location Stream (WebSockets)', icon: '🛰️', category: 'service', perf: 25, scal: 25, rel: 20, sec: 5, desc: 'Streams GPS coordinates continuously to riders' },
      { id: 'payment_service', name: 'Payment & Wallet Service', icon: '💳', category: 'service', perf: 10, scal: 15, rel: 35, sec: 40, desc: 'ACID transactional ledger for fares and payouts' },
      { id: 'notification_service', name: 'Notification Service', icon: '🔔', category: 'service', perf: 5, scal: 15, rel: 10, sec: 5, desc: 'Sends push alerts and SMS trip updates' },
      { id: 'cache_redis', name: 'In-Memory Cache (Redis)', icon: '🔥', category: 'data', perf: 40, scal: 30, rel: 10, sec: 0, desc: 'Sub-millisecond retrieval of hot routes and session tokens' },
      { id: 'message_queue', name: 'Message Queue (Kafka)', icon: '📨', category: 'async', perf: 20, scal: 40, rel: 35, sec: 5, desc: 'Buffers rush traffic bursts and decouples microservices' },
      { id: 'primary_db', name: 'Primary Relational Database', icon: '💾', category: 'data', perf: 10, scal: 15, rel: 25, sec: 20, desc: 'Master source of truth for transactions' },
      { id: 'db_replicas', name: 'Database Read Replicas', icon: '👥', category: 'data', perf: 25, scal: 35, rel: 30, sec: 5, desc: 'Offloads 90% of read traffic from the master database' },
      { id: 'db_shards', name: 'Database Sharding Cluster', icon: '📦', category: 'data', perf: 20, scal: 45, rel: 25, sec: 5, desc: 'Partitions 500M+ rides across multi-city machines' },
      { id: 'search_engine', name: 'Full-Text Search (Elasticsearch)', icon: '🔍', category: 'search', perf: 30, scal: 20, rel: 10, sec: 5, desc: 'Inverted index for sub-5ms destination autocomplete' },
      { id: 'recsys', name: 'Intelligent Matching & RecSys', icon: '🧠', category: 'ml', perf: 15, scal: 15, rel: 10, sec: 5, desc: 'Multi-factor driver scoring for lowest cancellations' },
      { id: 'data_warehouse', name: 'Columnar Data Warehouse', icon: '🏛️', category: 'analytics', perf: 10, scal: 20, rel: 15, sec: 5, desc: 'Isolates heavy analytical queries from live production' },
      { id: 'observability', name: 'Observability & Distributed Tracing', icon: '📊', category: 'ops', perf: 5, scal: 10, rel: 40, sec: 20, desc: 'Three pillars: Metrics, Logs, Tracing with APM' },
      { id: 'security_vault', name: 'Security & Auth Server (JWT/RBAC)', icon: '🛡️', category: 'sec', perf: 5, scal: 15, rel: 20, sec: 50, desc: 'Enforces Zero Trust, cryptographic tokens, and RBAC' }
    ];

    this.placedComponents = new Set();
    this.simScenario = null;
  }

  init() {
    this.render();
  }

  render() {
    if (!this.container) return;

    const stats = this.calculateStats();

    this.container.innerHTML = `
      <div class="boss-board-layout">
        <!-- TOP REQUIREMENTS BANNER -->
        <div class="boss-brief">
          <div class="brief-title">👑 Final Boss: Build RideQuest at Scale</div>
          <div class="brief-desc">
            <strong>Target:</strong> 10 Million Users across 50 Cities. Process 500,000 req/sec with high availability, sub-50ms latency, zero data loss, and rock-solid security. Click components to install or remove them.
          </div>
        </div>

        <!-- LIVE SYSTEM TELEMETRY -->
        <div class="boss-telemetry-bar">
          <div class="boss-meter">
            <div class="meter-label">⚡ Latency</div>
            <div class="meter-val">${stats.latency}ms</div>
            <div class="meter-track"><div class="meter-progress glow-cyan" style="width: ${Math.min(100, stats.perf)}%;"></div></div>
          </div>
          <div class="boss-meter">
            <div class="meter-label">📈 Scalability</div>
            <div class="meter-val">${stats.capacity}</div>
            <div class="meter-track"><div class="meter-progress glow-green" style="width: ${stats.scal}%;"></div></div>
          </div>
          <div class="boss-meter">
            <div class="meter-label">🛡️ Reliability</div>
            <div class="meter-val">${stats.uptime}%</div>
            <div class="meter-track"><div class="meter-progress glow-blue" style="width: ${stats.rel}%;"></div></div>
          </div>
          <div class="boss-meter">
            <div class="meter-label">🔐 Security</div>
            <div class="meter-val">${stats.securityScore}%</div>
            <div class="meter-track"><div class="meter-progress glow-purple" style="width: ${stats.sec}%;"></div></div>
          </div>
          <div class="boss-meter">
            <div class="meter-label">😊 Rider Happiness</div>
            <div class="meter-val">${stats.rating} ⭐</div>
            <div class="meter-track"><div class="meter-progress glow-amber" style="width: ${stats.ux}%;"></div></div>
          </div>
        </div>

        <!-- MAIN WORKSPACE -->
        <div class="boss-workspace">
          <!-- PALETTE OF BUILDING BLOCKS -->
          <div class="component-palette">
            <div class="palette-header">
              <span>Architectural Components (${this.placedComponents.size}/${this.availableComponents.length})</span>
            </div>
            <div class="palette-list" id="palette-list">
              ${this.availableComponents.map(comp => {
                const isPlaced = this.placedComponents.has(comp.id);
                return `
                  <div class="palette-card ${isPlaced ? 'placed' : ''}" onclick="window.bossCanvas.toggleComponent('${comp.id}')">
                    <div class="card-icon">${comp.icon}</div>
                    <div class="card-info">
                      <div class="card-title">${comp.name}</div>
                      <div class="card-desc">${comp.desc}</div>
                    </div>
                    <div class="card-status">${isPlaced ? '✓ Active' : '+ Add'}</div>
                  </div>
                `;
              }).join('')}
            </div>
          </div>

          <!-- ACTIVE ARCHITECTURE CANVAS -->
          <div class="canvas-active-zone">
            <div class="zone-header">
              <span>Active RideQuest Infrastructure Blueprint</span>
              <div class="sim-actions">
                <button class="test-btn" onclick="window.bossCanvas.simulateSpike('surge')">⚡ Test 1M Surge</button>
                <button class="test-btn" onclick="window.bossCanvas.simulateSpike('failure')">💥 Test DB Crash</button>
                <button class="test-btn" onclick="window.bossCanvas.simulateSpike('attack')">🛡️ Test Bot Attack</button>
              </div>
            </div>

            <div class="blueprint-board" id="blueprint-board">
              ${this.placedComponents.size === 0 ? `
                <div class="empty-canvas-prompt">
                  <div class="empty-icon">🏗️</div>
                  <div class="empty-title">Your Architectural Canvas is Empty!</div>
                  <p>Click components from the left palette to install them into RideQuest's system architecture.</p>
                </div>
              ` : `
                <div class="installed-grid">
                  ${Array.from(this.placedComponents).map(id => {
                    const comp = this.availableComponents.find(c => c.id === id);
                    return `
                      <div class="installed-card glow-cyan" onclick="window.bossCanvas.toggleComponent('${comp.id}')">
                        <div class="inst-icon">${comp.icon}</div>
                        <div class="inst-title">${comp.name}</div>
                        <div class="inst-remove">✕ Remove</div>
                      </div>
                    `;
                  }).join('')}
                </div>
              `}
            </div>

            <!-- SIMULATION TEST FEEDBACK -->
            ${this.simScenario ? `
              <div class="scenario-feedback ${this.simScenario.success ? 'feedback-ok glow-green' : 'feedback-fail pulse-danger'}">
                <div class="sc-title">${this.simScenario.title}</div>
                <div class="sc-msg">${this.simScenario.message}</div>
              </div>
            ` : ''}

            <!-- COMPLETE ARCHITECTURE SUBMIT BUTTON -->
            <div class="boss-finish-row">
              <button class="btn-certify-architect ${stats.architectReady ? 'ready pulse-glow' : 'disabled'}" onclick="window.bossCanvas.finishGame()">
                🎉 VERIFY & BECOME SYSTEM ARCHITECT
              </button>
            </div>
          </div>
        </div>
      </div>
    `;
  }

  toggleComponent(id) {
    if (this.placedComponents.has(id)) {
      this.placedComponents.delete(id);
      window.soundEngine.click();
    } else {
      this.placedComponents.add(id);
      window.soundEngine.select();
    }
    this.simScenario = null;
    this.render();
  }

  calculateStats() {
    let perf = 10, scal = 10, rel = 10, sec = 10, ux = 10;
    this.placedComponents.forEach(id => {
      const comp = this.availableComponents.find(c => c.id === id);
      if (comp) {
        perf += comp.perf;
        scal += comp.scal;
        rel += comp.rel;
        sec += comp.sec;
      }
    });

    perf = Math.min(100, perf);
    scal = Math.min(100, scal);
    rel = Math.min(100, rel);
    sec = Math.min(100, sec);
    ux = Math.round((perf * 0.25 + scal * 0.25 + rel * 0.25 + sec * 0.25));

    const latency = Math.max(8, Math.round(500 - (perf * 4.9)));
    const capacity = `${Math.round(scal * 10000).toLocaleString()} req/s`;
    const uptime = (90 + (rel * 0.0999)).toFixed(3);
    const rating = (2.0 + (ux * 0.03)).toFixed(1);

    const architectReady = this.placedComponents.size >= 12 && perf >= 65 && scal >= 65 && rel >= 65 && sec >= 50;

    return { perf, scal, rel, sec, ux, latency, capacity, uptime, rating, securityScore: sec, architectReady };
  }

  simulateSpike(type) {
    window.soundEngine.whoosh();
    const stats = this.calculateStats();

    if (type === 'surge') {
      const hasLb = this.placedComponents.has('load_balancer');
      const hasQueue = this.placedComponents.has('message_queue');
      const hasCache = this.placedComponents.has('cache_redis');

      if (hasLb && hasQueue && hasCache) {
        window.soundEngine.success();
        this.simScenario = {
          success: true,
          title: "⚡ Surge Test Passed! (1,000,000 req/sec)",
          message: "Cache absorbed 85% of reads, Load Balancer split traffic evenly, and Kafka buffered the burst smoothly with zero dropped requests!"
        };
      } else {
        window.soundEngine.overload();
        this.simScenario = {
          success: false,
          title: "⚠️ Surge Test Failed: System Choked!",
          message: "Missing Load Balancer, In-Memory Cache, or Message Queue! The sudden 1M req/s spike overwhelmed raw database disks."
        };
      }
    } else if (type === 'failure') {
      const hasReplica = this.placedComponents.has('db_replicas');
      const hasBreaker = this.placedComponents.has('gateway');
      const hasObs = this.placedComponents.has('observability');

      if (hasReplica && hasObs) {
        window.soundEngine.success();
        this.simScenario = {
          success: true,
          title: "🛡️ Outage Test Passed! (Leader Crashed)",
          message: "Primary DB failed! Replica promoted automatically within 800ms. Observability alerted the team immediately. 99.999% uptime maintained!"
        };
      } else {
        window.soundEngine.overload();
        this.simScenario = {
          success: false,
          title: "💥 Outage Test Failed: Total Blackout!",
          message: "Without Database Replicas or Observability, the primary hardware crash caused complete downtime and undetected errors."
        };
      }
    } else if (type === 'attack') {
      const hasSec = this.placedComponents.has('security_vault');
      const hasGw = this.placedComponents.has('gateway');

      if (hasSec && hasGw) {
        window.soundEngine.success();
        this.simScenario = {
          success: true,
          title: "🔐 Bot Defense Passed! (50,000 spam taps)",
          message: "API Gateway rate limiter throttled abusive IPs with HTTP 429, and JWT Auth blocked unauthorized role escalation. System safe!"
        };
      } else {
        window.soundEngine.overload();
        this.simScenario = {
          success: false,
          title: "🚨 Bot Attack Succeeded: Breach!",
          message: "Missing Security Auth Server or API Gateway rate limiter! Malicious bots flooded the server and escalated privileges."
        };
      }
    }
    this.render();
  }

  finishGame() {
    const stats = this.calculateStats();
    if (!stats.architectReady) {
      window.soundEngine.overload();
      alert("Your architecture needs a bit more power! Install at least 12 key components (including Gateway, Load Balancer, Cache, Replicas, Security) to achieve production-grade stability.");
      return;
    }

    window.soundEngine.levelUp();
    if (window.game) {
      window.game.showVictoryScreen();
    }
  }
}

window.BossCanvasEngine = BossCanvasEngine;
