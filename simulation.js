/**
 * RideQuest - Interactive Visual Simulation Engine
 * Renders rich, interactive, animated SVGs and HTML5 canvases for each level.
 * Shows real-time consequences of user decisions!
 */

class SimulationEngine {
  constructor(containerId) {
    this.container = document.getElementById(containerId);
    this.animationTimer = null;
    this.activeSimType = null;
  }

  clear() {
    if (this.animationTimer) {
      clearInterval(this.animationTimer);
      this.animationTimer = null;
    }
    if (this.container) {
      this.container.innerHTML = '';
    }
  }

  render(level, choiceMade = null) {
    this.clear();
    if (!this.container) return;

    this.activeSimType = level.simulationType;
    const simType = level.simulationType;

    switch (simType) {
      case 'servers_traffic':
        this.renderServersTraffic(level, choiceMade);
        break;
      case 'pipeline_bottleneck':
        this.renderPipelineBottleneck(level, choiceMade);
        break;
      case 'load_balancer_sim':
        this.renderLoadBalancerSim(level, choiceMade);
        break;
      case 'cap_network_partition':
        this.renderCapSim(level, choiceMade);
        break;
      case 'acid_transaction_sim':
        this.renderAcidSim(level, choiceMade);
        break;
      case 'cache_sim':
        this.renderCacheSim(level, choiceMade);
        break;
      case 'indexing_lookup':
        this.renderIndexingSim(level, choiceMade);
        break;
      case 'oltp_vs_olap':
        this.renderOltpOlapSim(level, choiceMade);
        break;
      case 'sharding_sim':
        this.renderShardingSim(level, choiceMade);
        break;
      case 'replication_failover':
        this.renderReplicationSim(level, choiceMade);
        break;
      case 'distributed_tx_sim':
        this.renderDistributedTxSim(level, choiceMade);
        break;
      case 'circuit_breaker_sim':
        this.renderCircuitBreakerSim(level, choiceMade);
        break;
      case 'vector_clock_sim':
        this.renderClockSim(level, choiceMade);
        break;
      case 'api_styles_sim':
        this.renderApiSim(level, choiceMade);
        break;
      case 'rate_limiter_sim':
        this.renderRateLimiterSim(level, choiceMade);
        break;
      case 'protocols_sim':
        this.renderProtocolsSim(level, choiceMade);
        break;
      case 'message_queue_sim':
        this.renderMessageQueueSim(level, choiceMade);
        break;
      case 'stream_processing_sim':
        this.renderStreamSim(level, choiceMade);
        break;
      case 'fulltext_search_sim':
        this.renderSearchSim(level, choiceMade);
        break;
      case 'data_warehouse_sim':
        this.renderWarehouseSim(level, choiceMade);
        break;
      case 'cdn_edge_sim':
        this.renderCdnSim(level, choiceMade);
        break;
      case 'recsys_sim':
        this.renderRecSysSim(level, choiceMade);
        break;
      case 'observability_sim':
        this.renderObservabilitySim(level, choiceMade);
        break;
      case 'security_rbac_sim':
        this.renderSecuritySim(level, choiceMade);
        break;
      default:
        this.renderGenericCity(level, choiceMade);
    }
  }

  // --- LEVEL 1: Servers & Traffic ---
  renderServersTraffic(level, choice) {
    const isHorizontal = choice && choice.id === 'B';
    const isVertical = choice && choice.id === 'A';
    const isDrop = choice && choice.id === 'C';

    let serverHtml = '';
    if (!choice) {
      serverHtml = `
        <div class="sim-server overheated pulse-danger" id="server-single">
          <div class="server-icon">🖥️</div>
          <div class="server-title">Single Main Computer</div>
          <div class="server-bar"><div class="server-fill" style="width: 98%;"></div></div>
          <div class="server-status text-danger">⚠️ CPU 99% - CRITICAL OVERLOAD</div>
          <div class="smoke-particle">💨</div>
        </div>
      `;
    } else if (isHorizontal) {
      serverHtml = `
        <div class="sim-servers-grid">
          <div class="sim-server healthy"><div class="server-icon">🖥️</div><div>Server 1</div><div class="server-bar"><div class="server-fill" style="width: 25%;"></div></div><div class="text-success">Load: 25%</div></div>
          <div class="sim-server healthy"><div class="server-icon">🖥️</div><div>Server 2</div><div class="server-bar"><div class="server-fill" style="width: 28%;"></div></div><div class="text-success">Load: 28%</div></div>
          <div class="sim-server healthy"><div class="server-icon">🖥️</div><div>Server 3</div><div class="server-bar"><div class="server-fill" style="width: 24%;"></div></div><div class="text-success">Load: 24%</div></div>
          <div class="sim-server healthy"><div class="server-icon">🖥️</div><div>Server 4</div><div class="server-bar"><div class="server-fill" style="width: 22%;"></div></div><div class="text-success">Load: 22%</div></div>
        </div>
      `;
    } else if (isVertical) {
      serverHtml = `
        <div class="sim-server giant overheated">
          <div class="server-icon">🏢</div>
          <div class="server-title">Titan Super-Server ($$$$)</div>
          <div class="server-bar"><div class="server-fill" style="width: 89%;"></div></div>
          <div class="server-status text-warning">Load: 89% (Extremely Expensive, Still Nearing Limit!)</div>
        </div>
      `;
    } else {
      serverHtml = `
        <div class="sim-server offline">
          <div class="server-icon">❌</div>
          <div class="server-title">Service Closed</div>
          <div class="server-status text-danger">Users Abandoned RideQuest</div>
        </div>
      `;
    }

    this.container.innerHTML = `
      <div class="sim-stage">
        <div class="sim-header">
          <span class="sim-badge">Live Scenario: 6:00 PM City Rush</span>
          <span class="sim-counter">50,000 Active Passengers</span>
        </div>
        <div class="sim-traffic-visual">
          <div class="sim-clients">
            <div class="client-avatar">📱<span class="user-pulse"></span></div>
            <div class="client-avatar">📱<span class="user-pulse"></span></div>
            <div class="client-avatar">📱<span class="user-pulse"></span></div>
            <div class="client-avatar">📱<span class="user-pulse"></span></div>
            <div class="client-label">50,000 Passengers Requesting Cabs</div>
          </div>
          <div class="traffic-pipes ${isHorizontal ? 'pipe-split' : 'pipe-single'}">
            <div class="flow-particle p1"></div>
            <div class="flow-particle p2"></div>
            <div class="flow-particle p3"></div>
          </div>
          <div class="sim-target">
            ${serverHtml}
          </div>
        </div>
        <div class="sim-telemetry">
          <div class="stat-pill"><span>Latency:</span> <strong>${isHorizontal ? '18ms' : (isVertical ? '95ms' : '4,800ms')}</strong></div>
          <div class="stat-pill"><span>App Health:</span> <strong class="${isHorizontal ? 'text-success' : 'text-danger'}">${isHorizontal ? '100% Smooth' : (isVertical ? 'Strained' : 'Crashing')}</strong></div>
          <div class="stat-pill"><span>Cabs Matched:</span> <strong>${isHorizontal ? '50,000 / 50,000' : (isVertical ? '35,000 / 50,000' : '4,100 / 50,000')}</strong></div>
        </div>
      </div>
    `;
  }

  // --- LEVEL 2: Pipeline Bottleneck ---
  renderPipelineBottleneck(level, choice) {
    const isPipelined = choice && choice.id === 'B';
    this.container.innerHTML = `
      <div class="sim-stage">
        <div class="sim-header">
          <span class="sim-badge">Restaurant Workflow vs RideQuest Dispatch</span>
          <span class="sim-counter">${isPipelined ? 'Pipelined Throughput: 4.5x' : 'Single Worker Bottleneck'}</span>
        </div>
        <div class="pipeline-container">
          ${isPipelined ? `
            <div class="pipeline-flow">
              <div class="pipe-station active">
                <div class="st-icon">📞</div>
                <div class="st-name">Worker 1</div>
                <div class="st-task">Takes Order (20s)</div>
              </div>
              <div class="pipe-arrow">➡️</div>
              <div class="pipe-station active">
                <div class="st-icon">🍳</div>
                <div class="st-name">Worker 2</div>
                <div class="st-task">Cooks Meal (20s)</div>
              </div>
              <div class="pipe-arrow">➡️</div>
              <div class="pipe-station active">
                <div class="st-icon">📦</div>
                <div class="st-name">Worker 3</div>
                <div class="st-task">Packs Box (20s)</div>
              </div>
              <div class="pipe-arrow">➡️</div>
              <div class="pipe-station active">
                <div class="st-icon">💳</div>
                <div class="st-name">Worker 4</div>
                <div class="st-task">Collects Cash (20s)</div>
              </div>
            </div>
            <div class="pipeline-summary text-success">
              ✨ Every worker works simultaneously in parallel! A completed order exits every 20 seconds!
            </div>
          ` : `
            <div class="single-worker-box">
              <div class="chef-icon pulse-shake">👨‍🍳 Chef Raj</div>
              <div class="chef-tasks">
                <span class="task-tag done">📞 Take Order</span>
                <span class="task-tag current">🍳 Cooking (Fast!)</span>
                <span class="task-tag pending">📦 Pack Food (Waiting...)</span>
                <span class="task-tag pending">💳 Collect Money (Blocked!)</span>
              </div>
              <div class="bottleneck-warning text-warning">
                ⚠️ Cooking was sped up, but customers are still waiting in line for packaging and payment!
              </div>
            </div>
          `}
        </div>
      </div>
    `;
  }

  // --- LEVEL 3: Load Balancer Simulator ---
  renderLoadBalancerSim(level, choice) {
    let mode = 'round_robin';
    if (choice) {
      if (choice.id === 'B') mode = 'least_conn';
      if (choice.id === 'C') mode = 'hash';
    }

    this.container.innerHTML = `
      <div class="sim-stage">
        <div class="sim-header">
          <span class="sim-badge">RideQuest Traffic Director (Load Balancer)</span>
          <span class="sim-counter">Mode: ${mode.toUpperCase().replace('_', ' ')}</span>
        </div>
        <div class="lb-interactive">
          <div class="lb-controls">
            <button class="lb-btn ${mode === 'round_robin' ? 'active' : ''}" onclick="window.game.testLbStrategy('A')">1. Take Turns (Round Robin)</button>
            <button class="lb-btn ${mode === 'least_conn' ? 'active' : ''}" onclick="window.game.testLbStrategy('B')">2. Least Busy (Least Conn)</button>
            <button class="lb-btn ${mode === 'hash' ? 'active' : ''}" onclick="window.game.testLbStrategy('C')">3. User Fingerprint (Hashing)</button>
          </div>
          <div class="lb-diagram">
            <div class="lb-clients">
              <div class="client-dot c1">User #1</div>
              <div class="client-dot c2">User #2</div>
              <div class="client-dot c3">User #3</div>
              <div class="client-dot c4">User #4</div>
            </div>
            <div class="lb-router-box glow-cyan">
              <div class="router-icon">⚖️</div>
              <div class="router-label">Load Balancer</div>
            </div>
            <div class="lb-backends">
              <div class="server-pod" id="lb-s1">
                <div class="pod-name">Server A</div>
                <div class="pod-bar"><div class="pod-fill" style="width: ${mode === 'least_conn' ? '33%' : (mode === 'round_robin' ? '35%' : '40%')};"></div></div>
                <div class="pod-stat">Active: ${mode === 'least_conn' ? '3,330' : '3,500'}</div>
              </div>
              <div class="server-pod" id="lb-s2">
                <div class="pod-name">Server B</div>
                <div class="pod-bar"><div class="pod-fill" style="width: ${mode === 'least_conn' ? '33%' : (mode === 'round_robin' ? '33%' : '30%')};"></div></div>
                <div class="pod-stat">Active: ${mode === 'least_conn' ? '3,330' : '3,300'}</div>
              </div>
              <div class="server-pod" id="lb-s3">
                <div class="pod-name">Server C</div>
                <div class="pod-bar"><div class="pod-fill" style="width: ${mode === 'least_conn' ? '34%' : (mode === 'round_robin' ? '32%' : '30%')};"></div></div>
                <div class="pod-stat">Active: ${mode === 'least_conn' ? '3,340' : '3,200'}</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    `;
  }

  // --- LEVEL 4: CAP Theorem Network Partition ---
  renderCapSim(level, choice) {
    const isConsistency = choice && choice.id === 'A';
    const isAvailability = choice && choice.id === 'B';

    this.container.innerHTML = `
      <div class="sim-stage">
        <div class="sim-header">
          <span class="sim-badge text-danger">⚠️ Network Cable Severed by Lightning!</span>
          <span class="sim-counter">${isConsistency ? 'CP Priority: Consistency Over Availability' : (isAvailability ? 'AP Priority: Availability Over Consistency' : 'Partition in Progress')}</span>
        </div>
        <div class="cap-visual">
          <div class="datacenter dc-north">
            <div class="dc-title">🏢 North Data Center</div>
            <div class="dc-data">Driver #42: <strong>Available (Near)</strong></div>
            <div class="dc-ping green-dot">Online</div>
          </div>
          <div class="partition-wire">
            <div class="cut-line">⚡ 💥 CABLE SEVERED 💥 ⚡</div>
            <div class="wire-msg">Cannot synchronize with South!</div>
          </div>
          <div class="datacenter dc-south">
            <div class="dc-title">🏢 South Data Center</div>
            <div class="dc-data">Driver #42: <strong>Last Known (5m ago)</strong></div>
            <div class="dc-ping red-dot">Isolated</div>
          </div>
        </div>
        <div class="cap-outcome">
          ${isConsistency ? `
            <div class="cap-result-box bg-cp">
              <strong>Consistency Chosen (CP):</strong> South refuses to guess. Shows: <em>"Ride temporarily holding until link restores."</em> Zero double bookings, 100% correct data!
            </div>
          ` : (isAvailability ? `
            <div class="cap-result-box bg-ap">
              <strong>Availability Chosen (AP):</strong> South answers instantly using last known state. Passenger gets a driver immediately without errors!
            </div>
          ` : `
            <div class="cap-result-box bg-neutral">
              The two data centers cannot communicate. You must decide whether to answer with slightly stale data or hold until verified.
            </div>
          `)}
        </div>
      </div>
    `;
  }

  // --- LEVEL 5: ACID vs BASE Simulator ---
  renderAcidSim(level, choice) {
    const isAtomic = choice && choice.id === 'A';
    this.container.innerHTML = `
      <div class="sim-stage">
        <div class="sim-header">
          <span class="sim-badge">Fare Settlement: ₹250 Ride Payment</span>
          <span class="sim-counter">${isAtomic ? 'Atomic Transaction: All-or-Nothing' : 'Partial Failure State'}</span>
        </div>
        <div class="transaction-steps">
          <div class="tx-step step-ok">
            <div class="tx-num">1</div>
            <div class="tx-info"><strong>Step 1: Bank Account</strong><br>Deduct ₹250 from Priya's Wallet</div>
            <div class="tx-badge success">✓ SUCCESS</div>
          </div>
          <div class="tx-divider">⬇️</div>
          <div class="tx-step step-fail">
            <div class="tx-num">2</div>
            <div class="tx-info"><strong>Step 2: Ride Service</strong><br>Mark Trip #9812 as PAID & Complete</div>
            <div class="tx-badge danger">⚡ NETWORK ERROR</div>
          </div>
          <div class="tx-divider">⬇️</div>
          <div class="tx-step ${isAtomic ? 'step-rollback' : 'step-lost'}">
            <div class="tx-num">3</div>
            <div class="tx-info">
              ${isAtomic ? `
                <strong>Step 3: Atomicity Rollback (ACID)</strong><br>
                Operation aborted! ₹250 instantly restored to Priya's wallet. Zero money lost!
              ` : `
                <strong>No Atomicity Rule:</strong><br>
                Priya lost ₹250, driver is unpaid, customer support phones ring off the hook!
              `}
            </div>
            <div class="tx-badge ${isAtomic ? 'warning' : 'danger'}">${isAtomic ? '🔄 ROLLED BACK SAFELY' : '❌ CORRUPTED STATE'}</div>
          </div>
        </div>
      </div>
    `;
  }

  // --- LEVEL 6: Caching Simulator ---
  renderCacheSim(level, choice) {
    const hasCache = choice && choice.id === 'A';
    this.container.innerHTML = `
      <div class="sim-stage">
        <div class="sim-header">
          <span class="sim-badge">Query: Airport Route Fare ($12.50)</span>
          <span class="sim-counter">${hasCache ? 'In-Memory Cache (RAM) Active' : 'Direct Disk Query'}</span>
        </div>
        <div class="cache-visual-grid">
          <div class="cache-box ${hasCache ? 'cache-hit glow-green' : 'cache-idle'}">
            <div class="box-icon">⚡ RAM Cache (Redis)</div>
            <div class="cache-content">
              ${hasCache ? `
                <div class="kv-item"><span class="key">route:airport</span> -> <span class="val">₹450 [HIT 99.8%]</span></div>
                <div class="kv-item"><span class="key">surge:city_center</span> -> <span class="val">1.2x [HIT]</span></div>
              ` : `
                <div class="text-muted">(Cache Empty / Inactive)</div>
              `}
            </div>
            <div class="speed-tag ${hasCache ? 'text-success' : 'text-muted'}">Lookup: <strong>1 millisecond</strong></div>
          </div>
          <div class="cache-arrow">${hasCache ? '◀️ Answered from RAM' : '⏬ Must Read Hard Drive'}</div>
          <div class="disk-box ${hasCache ? 'disk-cool' : 'disk-heavy pulse-danger'}">
            <div class="box-icon">💾 Relational Database Disk</div>
            <div class="disk-content">
              <div>Tables: rides, trips, tariffs, discounts...</div>
              <div>Mechanical Read Head / SSD Block Scan</div>
            </div>
            <div class="speed-tag text-danger">Disk Query: <strong>40 milliseconds</strong></div>
          </div>
        </div>
      </div>
    `;
  }

  // --- LEVEL 7: Indexing Simulator ---
  renderIndexingSim(level, choice) {
    const hasIndex = choice && choice.id === 'A';
    this.container.innerHTML = `
      <div class="sim-stage">
        <div class="sim-header">
          <span class="sim-badge">Search Driver by Phone: +91 98765 43210</span>
          <span class="sim-counter">${hasIndex ? 'B-Tree Index Lookup: 4 Jumps' : 'Full Table Scan: 10,000,000 Rows'}</span>
        </div>
        <div class="indexing-visual">
          ${hasIndex ? `
            <div class="btree-tree">
              <div class="tree-node root">[Phone Range: 1000 - 9999]</div>
              <div class="tree-branches">
                <div class="tree-node branch">[9000 - 9999] 🎯 Jump 1</div>
              </div>
              <div class="tree-branches">
                <div class="tree-node branch">[9800 - 9899] 🎯 Jump 2</div>
              </div>
              <div class="tree-branches">
                <div class="tree-node leaf highlight">[9876543210 -> Row #492,810] 🎯 MATCH! (2ms)</div>
              </div>
            </div>
          ` : `
            <div class="table-scan-list">
              <div class="scan-row check">Row 1: +91 11223 34455 (No)</div>
              <div class="scan-row check">Row 2: +91 11223 34456 (No)</div>
              <div class="scan-row check">Row 3: +91 11223 34457 (No)</div>
              <div class="scan-row current pulse-shake">Row 4,129,081 ... (Scanning 10 Million Rows sequentially... 8,500ms)</div>
            </div>
          `}
        </div>
      </div>
    `;
  }

  // --- LEVEL 8: OLTP vs OLAP ---
  renderOltpOlapSim(level, choice) {
    const isSplit = choice && choice.id === 'A';
    this.container.innerHTML = `
      <div class="sim-stage">
        <div class="sim-header">
          <span class="sim-badge">Workload Conflict: Live Booking vs 3-Year Analytics</span>
          <span class="sim-counter">${isSplit ? 'Architecture: Separated OLTP & OLAP' : 'Architecture: Shared Monolith'}</span>
        </div>
        <div class="oltp-olap-layout">
          ${isSplit ? `
            <div class="system-split">
              <div class="db-card oltp-card glow-cyan">
                <div class="db-title">🚗 OLTP (Row Store)</div>
                <div>Purpose: Fast Live Bookings</div>
                <div>Latency: <strong>3ms</strong></div>
                <div class="text-success">Zero Locks! Pure Speed</div>
              </div>
              <div class="etl-pipe">🔄 Continuous ETL Stream ➡️</div>
              <div class="db-card olap-card glow-purple">
                <div class="db-title">📊 OLAP (Columnar Warehouse)</div>
                <div>Purpose: 80 Million Row Analysis</div>
                <div>Query: Aggregations & Trends</div>
                <div class="text-success">Heavy reporting without touching live rides!</div>
              </div>
            </div>
          ` : `
            <div class="monolith-blocked">
              <div class="db-card monolith-card pulse-danger">
                <div class="db-title">💥 Single Shared Database</div>
                <div class="text-danger">Query Lock: "SELECT * FROM 3_YEAR_TRIPS"</div>
                <div class="lock-indicator">🔒 ROW LOCK TIMEOUT</div>
                <div class="text-warning">Passenger bookings waiting: 9,410 queued!</div>
              </div>
            </div>
          `}
        </div>
      </div>
    `;
  }

  // --- LEVEL 9: Sharding Simulator ---
  renderShardingSim(level, choice) {
    const isRange = choice && choice.id === 'A';
    const isHash = choice && choice.id === 'B';
    this.container.innerHTML = `
      <div class="sim-stage">
        <div class="sim-header">
          <span class="sim-badge">Database Sharding: 500 Million Records Partitioned</span>
          <span class="sim-counter">${isRange ? 'Range Sharding (By City)' : (isHash ? 'Hash Sharding (hash(ID) % 3)' : 'Single Massive DB')}</span>
        </div>
        <div class="shards-row">
          <div class="shard-box s1">
            <div class="shard-header">📦 Shard 1</div>
            <div class="shard-tag">${isRange ? 'City: Delhi / North' : 'Hash: 0 - 33%'}</div>
            <div class="shard-records">166 Million Records</div>
            <div class="shard-meter"><div class="meter-bar" style="width: 50%;"></div></div>
          </div>
          <div class="shard-box s2">
            <div class="shard-header">📦 Shard 2</div>
            <div class="shard-tag">${isRange ? 'City: Bengaluru / South' : 'Hash: 34 - 66%'}</div>
            <div class="shard-records">166 Million Records</div>
            <div class="shard-meter"><div class="meter-bar" style="width: 50%;"></div></div>
          </div>
          <div class="shard-box s3">
            <div class="shard-header">📦 Shard 3</div>
            <div class="shard-tag">${isRange ? 'City: Mumbai / West' : 'Hash: 67 - 100%'}</div>
            <div class="shard-records">167 Million Records</div>
            <div class="shard-meter"><div class="meter-bar" style="width: 50%;"></div></div>
          </div>
        </div>
      </div>
    `;
  }

  // --- LEVEL 10: Replication Failover ---
  renderReplicationSim(level, choice) {
    const hasReplication = choice && choice.id === 'A';
    this.container.innerHTML = `
      <div class="sim-stage">
        <div class="sim-header">
          <span class="sim-badge text-danger">⚠️ Primary Database Hard Drive DIED!</span>
          <span class="sim-counter">${hasReplication ? 'High Availability: Auto-Failover in 800ms' : 'Unrecoverable Outage'}</span>
        </div>
        <div class="replication-view">
          <div class="db-node master dead">
            <div class="node-icon">💀</div>
            <div class="node-name">Primary Master DB</div>
            <div class="node-state text-danger">FAILED (Hardware Crash)</div>
          </div>
          <div class="failover-arrow">${hasReplication ? '⚡ PROMOTE' : '❌ NO BACKUP'}</div>
          <div class="db-node replica ${hasReplication ? 'promoted glow-green' : 'dead'}">
            <div class="node-icon">${hasReplication ? '👑' : '💤'}</div>
            <div class="node-name">${hasReplication ? 'Replica 1 (NEW PRIMARY)' : 'No Standby Server'}</div>
            <div class="node-state ${hasReplication ? 'text-success' : 'text-danger'}">${hasReplication ? 'Active Leader (0 Data Lost)' : 'Offline'}</div>
          </div>
        </div>
      </div>
    `;
  }

  // --- LEVEL 11: Distributed Transactions (2PC / Saga) ---
  renderDistributedTxSim(level, choice) {
    const is2PC = choice && choice.id === 'A';
    const isSaga = choice && choice.id === 'B';
    this.container.innerHTML = `
      <div class="sim-stage">
        <div class="sim-header">
          <span class="sim-badge">Distributed Transaction: Ride Service + Payment Service</span>
          <span class="sim-counter">${is2PC ? 'Two-Phase Commit (2PC)' : (isSaga ? 'Saga Pattern (Compensating Actions)' : 'Distributed State')}</span>
        </div>
        <div class="tx-diagram">
          <div class="service-box">
            <div class="svc-icon">🚗</div>
            <div class="svc-name">Ride Service</div>
            <div class="svc-state ${choice ? 'text-success' : ''}">${is2PC ? 'Phase 1: Vote YES ➡️ Commit' : (isSaga ? 'Step 1: Driver Booked' : 'Waiting...')}</div>
          </div>
          <div class="coordinator-box ${choice ? 'glow-cyan' : ''}">
            <div class="coord-icon">🤝</div>
            <div class="coord-name">${is2PC ? 'Transaction Coordinator' : 'Saga Orchestrator'}</div>
          </div>
          <div class="service-box">
            <div class="svc-icon">💳</div>
            <div class="svc-name">Payment Service</div>
            <div class="svc-state ${choice ? 'text-success' : ''}">${is2PC ? 'Phase 1: Vote YES ➡️ Commit' : (isSaga ? 'Step 2: Wallet Deducted' : 'Waiting...')}</div>
          </div>
        </div>
      </div>
    `;
  }

  // --- LEVEL 12: Circuit Breaker ---
  renderCircuitBreakerSim(level, choice) {
    const hasBreaker = choice && choice.id === 'A';
    this.container.innerHTML = `
      <div class="sim-stage">
        <div class="sim-header">
          <span class="sim-badge text-warning">External Bank Gateway Taking 45 Seconds</span>
          <span class="sim-counter">${hasBreaker ? 'Circuit Breaker: OPEN (Tripped - Fallback Active)' : 'Direct Calls (Thread Starvation)'}</span>
        </div>
        <div class="cb-visual">
          <div class="cb-service">
            <div class="svc-name">RideQuest Core App</div>
            <div class="text-success">Thread Pool Healthy</div>
          </div>
          <div class="cb-switch ${hasBreaker ? 'switch-open' : 'switch-closed'}">
            <div class="switch-icon">${hasBreaker ? '⚡ ⛔' : '⚡ 🔌'}</div>
            <div class="switch-label">${hasBreaker ? 'CIRCUIT OPEN (Fails Fast)' : 'CIRCUIT CLOSED (Hanging)'}</div>
          </div>
          <div class="cb-partner ${hasBreaker ? 'bypassed' : 'choking pulse-danger'}">
            <div class="svc-name">Slow Third-Party Bank API</div>
            <div class="text-danger">${hasBreaker ? 'Calls Blocked (Fallback to Cash/Wallet)' : 'Hanging on 10,000 requests!'}</div>
          </div>
        </div>
      </div>
    `;
  }

  // --- LEVEL 13: Time & Logical Clocks ---
  renderClockSim(level, choice) {
    const hasLogicalClocks = choice && choice.id === 'A';
    this.container.innerHTML = `
      <div class="sim-stage">
        <div class="sim-header">
          <span class="sim-badge">Server Clock Drift: Disagree by 3 Seconds</span>
          <span class="sim-counter">${hasLogicalClocks ? 'Lamport Sequence Counters (Causal Order)' : 'Raw Quartz Clock Confusion'}</span>
        </div>
        <div class="timeline-visual">
          <div class="timeline-lane">
            <div class="lane-title">Server A (Drifted Fast: 10:01:05)</div>
            <div class="lane-events">
              <span class="event-tag">${hasLogicalClocks ? 'Sequence #2: Driver Accepts' : 'Time: 10:01:05 (Accept)'}</span>
            </div>
          </div>
          <div class="timeline-lane">
            <div class="lane-title">Server B (Drifted Slow: 10:01:02)</div>
            <div class="lane-events">
              <span class="event-tag">${hasLogicalClocks ? 'Sequence #1: Passenger Cancels' : 'Time: 10:01:02 (Cancel)'}</span>
            </div>
          </div>
        </div>
        <div class="order-verdict ${hasLogicalClocks ? 'text-success' : 'text-danger'}">
          ${hasLogicalClocks ? '✅ Logical Order Proves: Cancellation happened BEFORE Driver Acceptance!' : '❌ Confused: Quartz clocks claim Passenger cancelled in the future!'}
        </div>
      </div>
    `;
  }

  // --- LEVEL 14: APIs (REST, GraphQL, gRPC) ---
  renderApiSim(level, choice) {
    const isOptimal = choice && choice.id === 'A';
    this.container.innerHTML = `
      <div class="sim-stage">
        <div class="sim-header">
          <span class="sim-badge">Multi-Tier Communication</span>
          <span class="sim-counter">${isOptimal ? 'GraphQL (Mobile) + gRPC (Internal Backend)' : 'Heavy XML Monolith'}</span>
        </div>
        <div class="api-diagram">
          <div class="api-client">📱 Mobile Phone</div>
          <div class="api-pipe text-cyan">${isOptimal ? 'GraphQL (JSON: 140 bytes)' : 'Heavy XML (4,200 bytes)'}</div>
          <div class="api-gateway glow-cyan">API Gateway</div>
          <div class="api-pipe text-purple">${isOptimal ? 'gRPC Protobuf (Binary: 1.2ms)' : 'Raw XML Parsing (35ms)'}</div>
          <div class="api-backend">⚙️ Microservices</div>
        </div>
      </div>
    `;
  }

  // --- LEVEL 15: Rate Limiting ---
  renderRateLimiterSim(level, choice) {
    const hasLimiter = choice && choice.id === 'A';
    this.container.innerHTML = `
      <div class="sim-stage">
        <div class="sim-header">
          <span class="sim-badge">Surge Spam Defense: 50 Taps / Second</span>
          <span class="sim-counter">${hasLimiter ? 'Token Bucket Active: 5 Tokens Max, 1 refill/sec' : 'No Limit: Server Flooded'}</span>
        </div>
        <div class="rate-limiter-stage">
          <div class="bucket-container">
            <div class="bucket-box ${hasLimiter ? 'glow-green' : 'overflow pulse-danger'}">
              <div class="bucket-title">🪙 Token Bucket</div>
              <div class="tokens-row">
                <span class="token">🪙</span>
                <span class="token">🪙</span>
                <span class="token">🪙</span>
              </div>
              <div class="bucket-status">${hasLimiter ? 'Excess clicks get 429: Rate Limit Exceeded' : 'Server Crashing from 50,000 taps!'}</div>
            </div>
          </div>
        </div>
      </div>
    `;
  }

  // --- LEVEL 16: Networking Protocols (WebSockets) ---
  renderProtocolsSim(level, choice) {
    const isWs = choice && choice.id === 'A';
    this.container.innerHTML = `
      <div class="sim-stage">
        <div class="sim-header">
          <span class="sim-badge">Live Map Car Movement Tracking</span>
          <span class="sim-counter">${isWs ? 'WebSocket: Single Persistent Bi-Directional Pipe' : 'HTTP Short Polling: 60 Handshakes / Minute'}</span>
        </div>
        <div class="protocol-road">
          <div class="car-sprite ${isWs ? 'car-gliding' : 'car-stuttering'}">🚖</div>
          <div class="road-track"></div>
        </div>
        <div class="protocol-meta">
          <div class="stat-pill">Overhead: <strong>${isWs ? '2 bytes per GPS ping' : '850 bytes header per ping'}</strong></div>
          <div class="stat-pill">Smoothness: <strong>${isWs ? '60 FPS Live Stream' : 'Stuttering 1-second jumps'}</strong></div>
        </div>
      </div>
    `;
  }

  // --- LEVEL 17: Message Queues ---
  renderMessageQueueSim(level, choice) {
    const hasQueue = choice && choice.id === 'A';
    this.container.innerHTML = `
      <div class="sim-stage">
        <div class="sim-header">
          <span class="sim-badge">80,000 Requests in 10 Seconds (New Year Surge)</span>
          <span class="sim-counter">${hasQueue ? 'Message Queue (Kafka / RabbitMQ) Buffer' : 'No Buffer: 60,000 Requests Dropped'}</span>
        </div>
        <div class="queue-conveyor">
          <div class="producers">👥 80,000 Passengers</div>
          <div class="conveyor-belt ${hasQueue ? 'glow-purple' : 'broken'}">
            ${hasQueue ? `
              <div class="belt-item">✉️ Ride #1</div>
              <div class="belt-item">✉️ Ride #2</div>
              <div class="belt-item">✉️ Ride #3</div>
              <div class="belt-item">✉️ Ride #4</div>
              <div class="belt-item">✉️ ...80k buffered</div>
            ` : `
              <div class="text-danger">💥 Buffer Overflow! Dropping 75% of rides</div>
            `}
          </div>
          <div class="consumers">⚙️ Match Worker Pool</div>
        </div>
      </div>
    `;
  }

  // --- LEVEL 18: Stream Processing ---
  renderStreamSim(level, choice) {
    const isStream = choice && choice.id === 'A';
    this.container.innerHTML = `
      <div class="sim-stage">
        <div class="sim-header">
          <span class="sim-badge">50,000 Moving Drivers: Real-Time Traffic Telemetry</span>
          <span class="sim-counter">${isStream ? 'Continuous Stream Engine (Flink / Spark Streaming)' : 'Batch Processing (6-Hour Delay)'}</span>
        </div>
        <div class="stream-radar">
          <div class="radar-circle ${isStream ? 'radar-scanning' : ''}">
            <div class="radar-blip b1">📍 Car 412</div>
            <div class="radar-blip b2">📍 Car 981</div>
            <div class="radar-blip b3 text-danger">⚠️ Traffic Jam Detected!</div>
          </div>
          <div class="radar-info text-cyan">${isStream ? 'Sliding Window: Instant Reroute Computed in 1.4s' : 'Batch job scheduled at 10 PM (Too Late!)'}</div>
        </div>
      </div>
    `;
  }

  // --- LEVEL 19: Full-Text Search ---
  renderSearchSim(level, choice) {
    const isEngine = choice && choice.id === 'A';
    this.container.innerHTML = `
      <div class="sim-stage">
        <div class="sim-header">
          <span class="sim-badge">Location Search: "Indira Gandhi Airport"</span>
          <span class="sim-counter">${isEngine ? 'Inverted Index (Elasticsearch): 3ms' : 'Full Text Scan (SQL LIKE): 9,200ms'}</span>
        </div>
        <div class="search-sim-view">
          ${isEngine ? `
            <div class="inverted-index-card">
              <div class="index-row"><span>"indira"</span> ➡️ <span>[Location #42, #98, #104]</span></div>
              <div class="index-row"><span>"airport"</span> ➡️ <span>[Location #42, #55, #89]</span></div>
              <div class="index-row highlight"><span>Intersection:</span> <strong>Location #42: Terminal 2 (Instant Match!)</strong></div>
            </div>
          ` : `
            <div class="sql-like-box pulse-shake">
              <div>SELECT * FROM places WHERE address LIKE '%Indira%';</div>
              <div class="text-danger">Scanning 25,000,000 text records... Phone frozen</div>
            </div>
          `}
        </div>
      </div>
    `;
  }

  // --- LEVEL 20: Data Warehousing ---
  renderWarehouseSim(level, choice) {
    const hasWarehouse = choice && choice.id === 'A';
    this.container.innerHTML = `
      <div class="sim-stage">
        <div class="sim-header">
          <span class="sim-badge">4-Year Business Query across 500M Rides</span>
          <span class="sim-counter">${hasWarehouse ? 'ETL Pipeline ➡️ Columnar Data Warehouse' : 'Direct SQL on Live Production DB'}</span>
        </div>
        <div class="warehouse-layout">
          ${hasWarehouse ? `
            <div class="dw-box glow-purple">
              <div class="dw-title">🏛️ Columnar Data Warehouse (Snowflake)</div>
              <div>Scans only FareAmount column (skips lat/long & notes)</div>
              <div class="text-success">Query finished in 3.2 seconds! Production safe.</div>
            </div>
          ` : `
            <div class="dw-box pulse-danger">
              <div class="dw-title">💥 Live Production DB Crashed</div>
              <div>Disk IO pinned at 100%. Live passengers cannot book cabs!</div>
            </div>
          `}
        </div>
      </div>
    `;
  }

  // --- LEVEL 21: CDN & Edge Caching ---
  renderCdnSim(level, choice) {
    const hasCdn = choice && choice.id === 'A';
    this.container.innerHTML = `
      <div class="sim-stage">
        <div class="sim-header">
          <span class="sim-badge">Passenger in Delhi downloading Map Assets</span>
          <span class="sim-counter">${hasCdn ? 'Local Edge Server in Delhi: 8ms' : 'Origin Server in Chennai: 350ms (2,200 km)'}</span>
        </div>
        <div class="cdn-map">
          <div class="city-node delhi">
            <span>📍 Delhi User</span>
            <div class="edge-cache ${hasCdn ? 'glow-green' : 'offline'}">${hasCdn ? '⚡ CDN Edge (8ms)' : 'Blank'}</div>
          </div>
          <div class="cdn-cable ${hasCdn ? 'local-hop' : 'long-hop pulse-shake'}"></div>
          <div class="city-node chennai">
            <span>🏢 Chennai Origin (2,200 km)</span>
          </div>
        </div>
      </div>
    `;
  }

  // --- LEVEL 22: Recommendation System ---
  renderRecSysSim(level, choice) {
    const isSmart = choice && choice.id === 'A';
    this.container.innerHTML = `
      <div class="sim-stage">
        <div class="sim-header">
          <span class="sim-badge">Driver Dispatch Matching Engine</span>
          <span class="sim-counter">${isSmart ? 'Multi-Factor Ranking Model' : 'Naive Shortest Distance'}</span>
        </div>
        <div class="recsys-card-list">
          <div class="candidate-card ${!isSmart ? 'selected-bad' : ''}">
            <div class="cand-name">Driver A (200m away)</div>
            <div class="cand-rating">⭐ 3.1 | 40% Cancellation Rate</div>
            <div class="cand-verdict text-danger">${!isSmart ? 'Matched naively ➡️ Cancelled by driver!' : 'Rejected'}</div>
          </div>
          <div class="candidate-card ${isSmart ? 'selected-good glow-green' : ''}">
            <div class="cand-name">Driver B (600m away)</div>
            <div class="cand-rating">⭐ 4.9 | 99% Completion | EV Sedan</div>
            <div class="cand-verdict text-success">${isSmart ? '🎯 Top Ranked Match! 5-Star Ride Completed!' : 'Skipped'}</div>
          </div>
        </div>
      </div>
    `;
  }

  // --- LEVEL 23: Observability & Tracing ---
  renderObservabilitySim(level, choice) {
    const hasTracing = choice && choice.id === 'A';
    this.container.innerHTML = `
      <div class="sim-stage">
        <div class="sim-header">
          <span class="sim-badge">Booking Error 500 Investigation</span>
          <span class="sim-counter">${hasTracing ? 'Distributed Trace ID #9a8f2' : 'Searching Raw Text Logs manually'}</span>
        </div>
        <div class="trace-timeline">
          ${hasTracing ? `
            <div class="trace-span ok" style="width: 20%;">Gateway (2ms)</div>
            <div class="trace-span ok" style="width: 25%;">Auth Service (4ms)</div>
            <div class="trace-span ok" style="width: 35%;">Ride Service (12ms)</div>
            <div class="trace-span error pulse-danger" style="width: 20%;">Pricing Service (CRASH: Line 42 NullPointer)</div>
            <div class="trace-diagnosis text-success">
              🎯 Bug pinpointed in 4 seconds! Coupon 'RAIN50' division by zero.
            </div>
          ` : `
            <div class="raw-logs-scroll">
              <div>[10:14:02] info: request received</div>
              <div>[10:14:03] debug: checking user</div>
              <div>[10:14:04] info: 100,000 more lines to read... (Hours spent guessing)</div>
            </div>
          `}
        </div>
      </div>
    `;
  }

  // --- LEVEL 24: Security & RBAC ---
  renderSecuritySim(level, choice) {
    const isSecure = choice && choice.id === 'A';
    this.container.innerHTML = `
      <div class="sim-stage">
        <div class="sim-header">
          <span class="sim-badge">Privilege Escalation Attempt: /api/admin/refund</span>
          <span class="sim-counter">${isSecure ? 'JWT Token + Role-Based Access Control (RBAC)' : 'Security by Obscurity (Failed)'}</span>
        </div>
        <div class="security-gate">
          <div class="sec-user">👤 User: Passenger</div>
          <div class="sec-barrier ${isSecure ? 'glow-cyan' : 'breached pulse-danger'}">
            <div class="gate-icon">${isSecure ? '🛡️ RBAC Gate' : '🔓 Unprotected'}</div>
            <div class="gate-verdict ${isSecure ? 'text-success' : 'text-danger'}">
              ${isSecure ? '⛔ 403 Forbidden: Required Role "Admin" - IP Flagged!' : '🚨 Bypassed: Attacker withdrew ₹5,00,000!'}
            </div>
          </div>
        </div>
      </div>
    `;
  }

  renderGenericCity(level, choice) {
    this.container.innerHTML = `
      <div class="sim-stage">
        <div class="sim-header">
          <span class="sim-badge">RideQuest City Grid</span>
          <span class="sim-counter">${level.usersCount}</span>
        </div>
        <div class="city-interactive-box">
          <div class="city-car c1">🚖</div>
          <div class="city-car c2">🚗</div>
          <div class="city-pass p1">🧍</div>
          <div class="city-pass p2">🧍‍♀️</div>
        </div>
      </div>
    `;
  }
}

window.SimulationEngine = SimulationEngine;
