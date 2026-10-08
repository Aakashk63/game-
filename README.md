# 🚖 RideQuest – Become the Architect

> **“You don't need to know System Design. Just solve the problems.”**

**RideQuest** is an interactive, story-driven educational web game designed specifically for **first-year computer science students and absolute beginners** who have little or no knowledge of programming, networking, databases, or cloud infrastructure.

Instead of lecturing on technical jargon up front, **RideQuest** puts students in the shoes of the **Technology Architect** of a fast-growing ride-hailing application (similar to Ola / Uber) as it scales from **100 users to 10 million users across 50 cities**.

---

## 🎯 Core Pedagogical Philosophy

1. **REAL-LIFE SITUATION**: 6:00 PM rush hour, office closings, torrential rain.
2. **THE PROBLEM**: 50,000 people open the app at once; the single server turns red-hot and freezes.
3. **THINK & MAKE A DECISION**: 2–4 intuitive choices in everyday English (no technical jargon).
4. **SEE THE CONSEQUENCE**: Visual animated simulations (overheated servers, traffic flow, queue buffers, circuit breakers).
5. **DISCOVER THE SYSTEM DESIGN CONCEPT**: Celebratory reveal (e.g. *“You just discovered HORIZONTAL SCALING!”*).
6. **SIMPLE REAL-LIFE ANALOGY**: Explained using everyday metaphors (delivery vans, restaurant kitchens, airport ticket queues, textbook indexes).
7. **USE THE CONCEPT IN THE NEXT CHALLENGE**: The infrastructure grows and evolves.

---

## 🗺️ Complete Curriculum (24 Levels + Final Boss)

### Stage 1: Make The App Work
* **Level 1 — Too Many People Arrive**: Single server overload ➔ **Horizontal Scaling vs Vertical Scaling**
* **Level 2 — One Person Can Only Do So Much**: Overloaded restaurant chef ➔ **Amdahl's Law & Bottlenecks**
* **Level 3 — Who Should Handle Your Request?**: 3 servers, uneven loads ➔ **Load Balancing (Round Robin, Least Connections, Consistent Hashing)**
* **Level 4 — The Map Is Not Always Correct**: Severed fiber-optic cable in a storm ➔ **CAP Theorem (Consistency vs Availability vs Partition Tolerance)**

### Stage 2: Make It Fast
* **Level 5 — Payment Problem**: Money deducted, ride status failed ➔ **ACID Transactions vs BASE Eventual Consistency**
* **Level 6 — The App Is Getting Slow**: 15,000 identical airport fare requests ➔ **In-Memory Caching (RAM vs Disk, LRU, LFU, Cache Invalidation)**
* **Level 7 — Finding Driver Information**: Searching through 10,000,000 rows ➔ **Database Indexing (B-Tree, Hash, Bitmap Indexes)**

### Stage 3: Handle More People
* **Level 8 — The Database Is Too Big**: Live bookings vs 3-year analytics reports ➔ **Database Design: SQL vs NoSQL, OLTP vs OLAP**
* **Level 9 — Split The Huge Database**: Disk runs out of space ➔ **Database Sharding (Range, Hash, Directory Partitioning)**
* **Level 10 — What If One Database Breaks?**: Hard drive failure at 2:00 AM ➔ **Database Replication & High-Availability Failover**

### Stage 4: Keep It Reliable
* **Level 11 — Two Parts Of The System Must Agree**: Ride service & Payment service out of sync ➔ **Distributed Transactions (Two-Phase Commit & Saga Pattern)**
* **Level 12 — Servers Start Failing**: External bank gateway takes 45 seconds ➔ **Fault Tolerance & Resilience (Circuit Breaker, Bulkhead, Exponential Backoff)**
* **Level 13 — Time Confusion**: Physical clock drift by 3 seconds ➔ **Distributed Time & Clocks (Lamport Logical Clocks & Happened-Before Relationship)**

### Stage 5: Handle Real-Time Data
* **Level 14 — Talking To Different Services**: Mobile devices vs internal microservices ➔ **APIs (REST, GraphQL, gRPC Protobuf, API Versioning)**
* **Level 15 — Too Many Requests**: Frantic passengers spam-tapping 'Book Ride' ➔ **Rate Limiting (Token Bucket, Leaky Bucket, Sliding Window)**
* **Level 16 — How Does The App Talk?**: Live driver car movement on map ➔ **Networking Protocols (HTTP Polling vs Persistent WebSockets)**
* **Level 17 — Too Many Requests Waiting**: 80,000 requests in 10 seconds (New Year's Eve) ➔ **Message Queues (Apache Kafka, RabbitMQ, Decoupling)**
* **Level 18 — Real-Time City Data**: 50,000 drivers streaming GPS coordinates ➔ **Stream Processing (Apache Flink, Spark Streaming, Event Sourcing)**

### Stage 6: Make It Smart
* **Level 19 — Searching For A Place Or Driver**: Searching landmarks among 25 million places ➔ **Full-Text Search & Inverted Indexes (Elasticsearch, BM25)**
* **Level 20 — Understanding The Business**: Executive analytics across 500 million historical rides ➔ **Data Warehousing, Data Lakes & Columnar Storage (Snowflake, BigQuery)**
* **Level 21 — Users Are Far Away**: Delhi passenger downloading map assets from Chennai ➔ **Content Delivery Network (CDN) & Edge Caching**
* **Level 22 — Which Driver Should I Recommend?**: Multi-signal driver dispatch ➔ **Recommendation & Ranking Systems (Collaborative & Content-Based Filtering)**

### Stage 7: Make It Secure
* **Level 23 — Understanding What Is Happening**: Investigating an Error 500 across 45 microservices ➔ **Observability & Distributed Tracing (Metrics, Logs, Traces, APM)**
* **Level 24 — Protecting The App**: Privilege escalation on admin refund endpoints ➔ **Authentication & Authorization (AuthN vs AuthZ, JWT, OAuth 2.0, RBAC)**

### 👑 FINAL BOSS: Build RideQuest
* Construct the complete system architecture on the interactive **System Design Board**.
* Install 18 production-grade building blocks (API Gateway, Load Balancer, WebSockets, Kafka, Redis Cache, Database Replicas, Shards, Security Vault, etc.).
* Run live simulations against:
  * ⚡ **1,000,000 req/sec Surge Spikes**
  * 💥 **Primary Database Hardware Crashes**
  * 🛡️ **DDoS & Bot Attacks**
* Watch live telemetry meters update in real-time: **Latency (ms), Scalability (req/s), Reliability (%), Security (%), and Rider Happiness (⭐)**.
* Graduate and receive your **Certified System Architect** recognition!

---

## 🎓 Teacher Mode & Classroom Features

Click the **🎓 Teacher Mode** button in the top navigation bar to open the dedicated instructor drawer:
* **Classroom Level Jump**: Instantly jump to any of the 24 levels or the Final Boss for live interactive demonstrations.
* **Pedagogical Telemetry**: Real-time feedback on what the student just experienced, which option they chose, and whether it was optimal or a common misconception.
* **Concept Deep Dive**: Detailed explanation of the underlying computer science concept.
* **Real-World Case Study**: Concrete architecture examples from Uber, Ola, Grab, Netflix, and Amazon.
* **Classroom Discussion Questions**: Curated prompts the instructor can ask students to spark deep discussions.

---

## 🚀 How to Run Locally

### Option 1: Using Node.js (Recommended)
```bash
# Navigate to the project directory
cd "e:\system design"

# Start the local server
npm start
# or: node server.js
```
Open your browser to: **[http://localhost:3000](http://localhost:3000)**

### Option 2: Direct File Open
You can also directly open `index.html` in any modern web browser (Chrome, Edge, Firefox, Safari). Zero build steps or internet connection required!

---

## 🎧 Built-in Procedural Audio
* Powered by the native **Web Audio API**.
* Synthesizes 100% of sound effects procedurally in-browser (success chimes, level-up arpeggios, overload alarms, click ticks).
* Zero external audio files or bandwidth required. Includes a one-click mute button.
