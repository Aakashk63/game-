/**
 * RideQuest - Levels Data
 * Contains all 24 pedagogical stages + Final Boss challenge.
 * Follows the strict pedagogical philosophy:
 * Situation -> Problem -> Think -> Make Decision -> See Consequence -> Discover Concept -> Simple Analogy -> Deep Dive
 */

const STAGES = [
  { id: 1, name: "Stage 1: Make The App Work", icon: "🚀", levels: [1, 2, 3, 4] },
  { id: 2, name: "Stage 2: Make It Fast", icon: "⚡", levels: [5, 6, 7] },
  { id: 3, name: "Stage 3: Handle More People", icon: "📈", levels: [8, 9, 10] },
  { id: 4, name: "Stage 4: Keep It Reliable", icon: "🛡️", levels: [11, 12, 13] },
  { id: 5, name: "Stage 5: Handle Real-Time Data", icon: "🛰️", levels: [14, 15, 16, 17, 18] },
  { id: 6, name: "Stage 6: Make It Smart", icon: "🧠", levels: [19, 20, 21, 22] },
  { id: 7, name: "Stage 7: Make It Secure", icon: "🔐", levels: [23, 24] },
  { id: 8, name: "Final: Become The System Architect", icon: "👑", levels: [25] }
];

const LEVELS = [
  // LEVEL 1
  {
    id: 1,
    stage: 1,
    title: "Too Many People Arrive",
    time: "6:00 PM Rush Hour",
    usersCount: "50,000 users",
    situation: "It is 6:00 PM in the city. Offices close, torrential rain begins, and suddenly 50,000 people open the RideQuest app at the exact same moment! Your single computer is spinning its fans at max speed and turning red-hot. The ride booking screen freezes with a spinning wheel.",
    problem: "A single computer can only handle so much work before it freezes completely. Your users are getting angry and stranded in the rain.",
    simulationType: "servers_traffic",
    choices: [
      {
        id: "A",
        text: "Replace our computer with the biggest, most expensive super-machine in the world.",
        isOptimal: false,
        consequenceText: "You bought a giant super-server! It runs fast for a short time, but when 100,000 users hit it, it still reaches 100% CPU capacity. It costs a fortune, and if that single machine trips a wire, the ENTIRE city loses RideQuest!",
        resultState: "vertical_overload",
        statImpact: { latency: "+80ms", capacity: "Limited", cost: "Extremely High", risk: "Single point of failure" }
      },
      {
        id: "B",
        text: "Bring in multiple regular computers and split the crowd's work among them.",
        isOptimal: true,
        consequenceText: "Brilliant! You added 4 regular computers. The 50,000 incoming requests are divided evenly. Each machine is cool and comfortable at 30% load, and the app is instantly responsive for every passenger!",
        resultState: "horizontal_success",
        statImpact: { latency: "18ms", capacity: "Easily Expandable", cost: "Cost-Effective", risk: "Safe & Resilient" }
      },
      {
        id: "C",
        text: "Put up a notice asking passengers: 'Please try again in 30 minutes.'",
        isOptimal: false,
        consequenceText: "Your passengers delete RideQuest and switch to walking or rival taxi apps! In tech companies, telling users to 'come back later' causes business bankruptcy.",
        resultState: "user_churn",
        statImpact: { latency: "Inf", capacity: "Zero", cost: "Loss of Revenue", risk: "Catastrophic" }
      }
    ],
    discovery: {
      badge: "Horizontal Scaling",
      tagline: "Many hands make light work",
      analogy: "Instead of hiring one superhero delivery driver who eventually gets exhausted and stuck in traffic, you hire a fleet of 5 normal delivery vans that deliver across the city together.",
      contrast: {
        termA: "Vertical Scaling (Scaling Up)",
        descA: "Making ONE machine bigger, faster, and more expensive. Eventually hits physical hardware limits and remains a single point of failure.",
        termB: "Horizontal Scaling (Scaling Out)",
        descB: "Adding MORE machines side-by-side. You can keep adding more as your company grows, and if one breaks, the others keep running."
      },
      advancedInfo: "Horizontal scaling enables high elasticity (auto-scaling) where cloud instances spin up automatically during peak rush hours (like 6 PM) and shut down at 3 AM to save costs.",
      teacherNotes: {
        concept: "Horizontal vs. Vertical Scaling",
        experience: "Students felt the crushing weight of a traffic spike on a single server and discovered that adding machines side-by-side beats upgrading one mega-box.",
        realWorld: "Uber, Ola, and Netflix run tens of thousands of horizontally scaled micro-instances on AWS/GCP to absorb rush hour traffic.",
        question: "Can we just keep adding infinitely many computers, or will a new problem appear when they need to share information?"
      }
    }
  },

  // LEVEL 2
  {
    id: 2,
    stage: 1,
    title: "One Person Can Only Do So Much",
    time: "The Restaurant Analogy",
    usersCount: "75,000 orders",
    situation: "Imagine a small popular restaurant run by a single worker named Chef Raj. Chef Raj is trying to: 1) Take phone orders, 2) Cook the food, 3) Pack the boxes, and 4) Collect cash payments. Orders are backing up out the door!",
    problem: "If cooking takes 2 minutes, but taking phone orders and collecting cash takes 8 minutes, making Chef Raj cook 10x faster still won't solve the long waiting line!",
    simulationType: "pipeline_bottleneck",
    choices: [
      {
        id: "A",
        text: "Send Chef Raj to culinary boot camp so he cooks in 10 seconds instead of 2 minutes.",
        isOptimal: false,
        consequenceText: "Chef Raj now chops onions in 10 seconds, but 20 customers are still trapped at the cashier counter waiting to pay! Total wait time barely improved.",
        resultState: "bottleneck_remains",
        statImpact: { speedup: "Negligible (1.1x)", satisfaction: "Low", bottleneck: "Cashier still blocked" }
      },
      {
        id: "B",
        text: "Break the job into separate roles: One person takes orders, one cooks, one packs, and one takes payments.",
        isOptimal: true,
        consequenceText: "Outstanding! By identifying the true bottleneck and separating tasks into an organized pipeline, orders move continuously without anyone waiting for the other!",
        resultState: "pipeline_success",
        statImpact: { speedup: "Massive (4.5x)", satisfaction: "Very High", bottleneck: "Eliminated" }
      }
    ],
    discovery: {
      badge: "Amdahl's Law & Bottlenecks",
      tagline: "A chain is only as strong as its weakest link",
      analogy: "Making one lane of a highway 100 mph faster doesn't help if every car still has to squeeze through a single 10-mph toll gate booth.",
      contrast: {
        termA: "Local Optimization",
        descA: "Speeding up a piece of the system that isn't the real bottleneck. It gives almost zero overall speedup.",
        termB: "Amdahl's Law",
        descB: "The maximum speedup of any system is strictly limited by the fraction of the system that cannot be run faster or in parallel."
      },
      advancedInfo: "Amdahl's Law formula: Speedup = 1 / ((1 - p) + (p / s)), where p is the parallelizable fraction and s is the speedup factor. If 50% of your task is sequential (e.g. waiting on a slow database disk), infinite CPU cores will never make it more than 2x faster!",
      teacherNotes: {
        concept: "Amdahl's Law & System Bottleneck Identification",
        experience: "Students learned why simply throwing raw CPU or speeding up one function fails if the sequential or slowest bottleneck is ignored.",
        realWorld: "In ride-hailing, optimizing the frontend UI button animation won't fix ride confirmation if the database write lock takes 500ms.",
        question: "When you have 3 separate servers from Level 1, who decides which incoming passenger goes to which server?"
      }
    }
  },

  // LEVEL 3
  {
    id: 3,
    stage: 1,
    title: "Who Should Handle Your Request?",
    time: "7:15 PM Dinner Rush",
    usersCount: "100,000 requests",
    situation: "Now RideQuest has 3 servers (Server A, Server B, Server C). But passengers connect randomly. Right now, 9,000 people piled onto Server A, while Server B and C are sitting nearly empty! Server A is smoking and dropping rides.",
    problem: "Having multiple servers is useless if all the work dumps onto just one of them. We need a smart 'Traffic Director' standing at the entrance.",
    simulationType: "load_balancer_sim",
    choices: [
      {
        id: "A",
        text: "Strategy: Take Turns (1st user to A, 2nd user to B, 3rd to C, then repeat).",
        isOptimal: true,
        consequenceText: "Round Robin activated! Every server gets an equal share of the incoming stream. Simple, clean, and reliable when all requests take roughly the same time.",
        resultState: "round_robin",
        statImpact: { loadBalance: "Even", complexity: "Low", serverHealth: "Good (60% each)" }
      },
      {
        id: "B",
        text: "Strategy: Always send the new user to whichever server currently has the fewest active connections.",
        isOptimal: true,
        consequenceText: "Least Connections activated! If Server A is busy processing a complicated fare calculation, the director sends the next 5 users to B and C until A finishes.",
        resultState: "least_connections",
        statImpact: { loadBalance: "Adaptive & Smart", complexity: "Medium", serverHealth: "Optimal" }
      },
      {
        id: "C",
        text: "Strategy: Send users to servers based on a mathematical finger-print of their User ID so the same user sticks to the same server.",
        isOptimal: true,
        consequenceText: "Consistent Hashing activated! User #1029 always routes to Server B. This is great for keeping user sessions and local memory warm!",
        resultState: "consistent_hashing",
        statImpact: { loadBalance: "Deterministic", complexity: "Advanced", serverHealth: "Cache-Friendly" }
      }
    ],
    discovery: {
      badge: "Load Balancing",
      tagline: "The traffic cop of the internet",
      analogy: "Like a receptionist at a busy hospital triage counter directing patients evenly to available doctor cabins so no single doctor gets overwhelmed while others sit idle.",
      contrast: {
        termA: "Round Robin & Least Connections",
        descA: "Round Robin takes turns sequentially. Least Connections inspects real-time active load and gives work to the least busy server.",
        termB: "Consistent Hashing",
        descB: "Hashes user keys across a virtual ring so specific users predictably route to specific servers, even when servers are added or removed."
      },
      advancedInfo: "Load Balancers (like Nginx, HAProxy, AWS ALB) also perform continuous health checks: if Server B catches fire, the Load Balancer instantly stops routing requests to B and reroutes to A and C without users noticing.",
      teacherNotes: {
        concept: "Load Balancing Algorithms",
        experience: "Students experimented with traffic dispatching methods (Round Robin, Least Connections, and Consistent Hashing) to prevent hotspot overloads.",
        realWorld: "Ride-hailing gateways use geo-based and least-connection load balancers across availability zones.",
        question: "What happens if two servers lose connection with each other while a ride is being matched?"
      }
    }
  },

  // LEVEL 4
  {
    id: 4,
    stage: 1,
    title: "The Map Is Not Always Correct",
    time: "8:00 PM City Storm",
    usersCount: "120,000 rides",
    situation: "A fierce thunderstorm damages an underground fiber optic cable between two of RideQuest's data centers. Data Center 1 in North City cannot communicate with Data Center 2 in South City. A passenger in South City requests a ride.",
    problem: "Data Center 2 has slightly older driver location data. If it answers right now, the driver might be 15 km away instead of 200m away. If it refuses to answer until the cable is repaired, the app shows an error screen.",
    simulationType: "cap_network_partition",
    choices: [
      {
        id: "A",
        text: "Option CP: Guarantee 100% strict correctness. If the centers can't talk, refuse the request with 'Service Temporarily Offline'.",
        isOptimal: true,
        consequenceText: "You chose CONSISTENCY! No passenger will ever get wrong driver info or double-booked, but users temporarily cannot book until the network heals.",
        resultState: "cap_consistency",
        statImpact: { correctness: "100% Pure", availability: "Temporarily Paused", userFrustration: "Medium" }
      },
      {
        id: "B",
        text: "Option AP: Guarantee the app always responds immediately, even if the driver location might be slightly outdated.",
        isOptimal: true,
        consequenceText: "You chose AVAILABILITY! The app never crashes and passengers get an immediate response, though on rare occasions a driver might be slightly farther away.",
        resultState: "cap_availability",
        statImpact: { correctness: "Slightly Delayed Sync", availability: "100% Available", userFrustration: "Low" }
      }
    ],
    discovery: {
      badge: "CAP Theorem",
      tagline: "Pick any two: Consistency, Availability, Partition Tolerance",
      analogy: "Imagine two bank clerks separated by a broken telephone wire. If a customer deposits money at Clerk 1, Clerk 2 cannot know. When the customer asks Clerk 2 for balance: Clerk 2 can either say 'I must wait until the phone works' (Consistency) OR say 'Here is your last known balance' (Availability). You cannot have both while the wire is broken!",
      contrast: {
        termA: "Consistency (C)",
        descA: "Every client gets the exact latest data or an error. No stale answers permitted.",
        termB: "Availability (A) & Partition Tolerance (P)",
        descB: "The system always returns a response, even when physical network cables between machines fail (Partitions are guaranteed to happen in real life)."
      },
      advancedInfo: "Eric Brewer formulated the CAP Theorem in 2000. In distributed systems, network partitions (P) are unavoidable due to router glitches, cut cables, and packet drops. Therefore, distributed architects must choose between CP (Consistency over Availability) or AP (Availability over Consistency).",
      teacherNotes: {
        concept: "The CAP Theorem Trade-off",
        experience: "Students faced the painful real-world trade-off of a severed network cable and realized you cannot have perfection in distributed physics.",
        realWorld: "Ride searching is often AP (show nearby cars even if 2 seconds stale), while credit card charging is strictly CP (never double charge).",
        question: "When money is deducted for a trip, what happens if the ride status fails to update right after?"
      }
    }
  },

  // LEVEL 5
  {
    id: 5,
    stage: 2,
    title: "Payment Problem",
    time: "9:00 PM Trip End",
    usersCount: "150,000 transactions",
    situation: "Passenger Priya finishes her ride. Fare is ₹250. The bank deducts ₹250 from Priya's account, but right at that split second, her phone battery dies! The ride app server never received the confirmation and still says 'Unpaid - Payment Failed'.",
    problem: "Money was taken from Priya, but the driver thinks he wasn't paid! This is a nightmare that creates riots in customer support.",
    simulationType: "acid_transaction_sim",
    choices: [
      {
        id: "A",
        text: "Wrap the steps in an 'All-or-Nothing' rule: Either BOTH payment and ride update succeed, or neither happens (money instantly refunded).",
        isOptimal: true,
        consequenceText: "Perfection! Atomic transaction enforced. If any single step fails midway, the entire operation cleanly rolls back as if nothing happened. No phantom money loss!",
        resultState: "acid_success",
        statImpact: { trust: "100%", supportTickets: "0", dataIntegrity: "Rock Solid" }
      },
      {
        id: "B",
        text: "Just let the bank deduct the money and let customer support manually fix the complaints tomorrow.",
        isOptimal: false,
        consequenceText: "Disaster! 10,000 angry passengers and drivers storm RideQuest social media. Your support team is overwhelmed and users lose faith.",
        resultState: "acid_failure",
        statImpact: { trust: "Ruined", supportTickets: "10,000+", dataIntegrity: "Corrupted" }
      }
    ],
    discovery: {
      badge: "ACID vs BASE",
      tagline: "Guaranteed Truth vs Eventual Truth",
      analogy: "Buying a plane ticket with a seat reservation: You either get the ticket AND the seat, or if the seat is taken, your credit card isn't charged. You never want to pay and get half an airplane seat!",
      contrast: {
        termA: "ACID (Relational / Financial)",
        descA: "Atomicity (All-or-Nothing), Consistency (Valid rules), Isolation (No cross-talk), Durability (Saved permanently). Used for money, bookings, inventories.",
        termB: "BASE (NoSQL / Eventual)",
        descB: "Basically Available, Soft state, Eventual consistency. Used for social media likes, driver location breadcrumbs, and view counters where temporary delay is fine."
      },
      advancedInfo: "Relational databases like PostgreSQL implement ACID via Write-Ahead Logging (WAL) and two-phase locking. In ride apps, wallets and payments use ACID, while live GPS location pings use BASE.",
      teacherNotes: {
        concept: "ACID Transactions vs BASE Eventual Consistency",
        experience: "Students witnessed money deduction failure and intuitively grasped Atomicity (All-or-Nothing).",
        realWorld: "Ola Money / Uber Cash uses ACID databases for ledger balances, but uses BASE for driver star ratings.",
        question: "Why should RideQuest search the slow hard drive 1,000 times a second for the same airport fare?"
      }
    }
  },

  // LEVEL 6
  {
    id: 6,
    stage: 2,
    title: "The App Is Getting Slow",
    time: "10:15 PM Airport Rush",
    usersCount: "200,000 rides",
    situation: "Flights land at the International Airport. 15,000 passengers open RideQuest asking: 'What is the fare from Airport to Downtown Central?' Every single request triggers a heavy 40-millisecond database disk query that recalculates the exact same price over and over. The database is groaning under the strain!",
    problem: "Why read a slow mechanical disk or recalculate math thousands of times a second for an answer that hasn't changed in the last 10 minutes?",
    simulationType: "cache_sim",
    choices: [
      {
        id: "A",
        text: "Keep the most popular answers in lightning-fast RAM memory right on the counter. Only check disk if it's not in memory.",
        isOptimal: true,
        consequenceText: "Incredible speedup! Airport fare is now answered from high-speed memory in 1 millisecond instead of 40 milliseconds! Database load plummets by 95%!",
        resultState: "cache_hit_streak",
        statImpact: { responseTime: "1ms (40x faster)", dbLoad: "5%", userDelight: "Instant!" }
      },
      {
        id: "B",
        text: "Just keep querying the database disk every time to make sure nothing ever changes.",
        isOptimal: false,
        consequenceText: "The database disk queues up 10,000 read locks. Responses slow down from 40ms to 4,200ms. Passengers see spinning wheels at the airport curb.",
        resultState: "cache_miss_overload",
        statImpact: { responseTime: "4,200ms", dbLoad: "99% (Overheated)", userDelight: "Terrible" }
      }
    ],
    discovery: {
      badge: "Caching",
      tagline: "Remember the answers you use the most",
      analogy: "If your teacher asks you 'What is 7 times 8?', you don't walk to the library, look up a math encyclopedia, and read the multiplication table every single time. You remember 56 in your short-term memory!",
      contrast: {
        termA: "Cache Strategies",
        descA: "LRU (Least Recently Used) throws away old unused answers. LFU (Least Frequently Used) throws away rarely used answers when memory is full.",
        termB: "Cache Invalidation",
        descB: "The hardest problem in computer science: When gas prices change or rain surge starts, you must 'evict' or update the stored cache answer."
      },
      advancedInfo: "Tools like Redis and Memcached store key-value pairs entirely in RAM. A RAM lookup takes ~0.1 microseconds, compared to ~1-10 milliseconds for an SSD/HDD database query—a 10,000x speed difference!",
      teacherNotes: {
        concept: "In-Memory Caching & Eviction Policies (LRU/LFU)",
        experience: "Students saw repetitive queries choke the database and discovered how keeping hot answers in fast memory saves the day.",
        realWorld: "RideQuest caches city map zones, driver profiles, surge multipliers, and route tariffs in Redis clusters.",
        question: "When you have 10 million registered drivers in your database, how do you find one driver without reading every single page?"
      }
    }
  },

  // LEVEL 7
  {
    id: 7,
    stage: 2,
    title: "Finding Driver Information",
    time: "11:30 PM Night Patrol",
    usersCount: "350,000 queries",
    situation: "RideQuest now has 10,000,000 registered drivers across the country. A passenger types driver phone number '+91 98765 43210' to verify their ride. The database starts on row 1, checks row 2, checks row 3... scanning all 10 million rows one by one. The server hangs for 8 seconds!",
    problem: "Reading every single entry in an unorganized 10-million-row table (a full table scan) is unimaginably slow.",
    simulationType: "indexing_lookup",
    choices: [
      {
        id: "A",
        text: "Build an organized sorted index table (like the alphabetical index at the back of a textbook) pointing directly to the exact row location.",
        isOptimal: true,
        consequenceText: "B-Tree Index created! Instead of 10,000,000 comparisons, the database finds the driver in just 4 quick jumps! Query time drops from 8 seconds to 2 milliseconds!",
        resultState: "index_hit_fast",
        statImpact: { lookupTime: "2ms (4000x faster)", diskRead: "4 blocks vs 10M", efficiency: "Exceptional" }
      },
      {
        id: "B",
        text: "Tell the computer to scan the 10 million rows faster with brute force.",
        isOptimal: false,
        consequenceText: "Even with the fastest CPU, checking 10 million disk records sequentially consumes massive I/O. As more drivers join, the app gets slower every month.",
        resultState: "full_table_scan",
        statImpact: { lookupTime: "8,500ms", diskRead: "10,000,000 rows", efficiency: "O(N) Horrible" }
      }
    ],
    discovery: {
      badge: "Database Indexing",
      tagline: "The textbook index for data",
      analogy: "If you want to find 'Photosynthesis' in a 1,000-page biology textbook, you don't read page 1 to 1,000. You turn to the Index at the back, find 'P', and jump directly to page 432.",
      contrast: {
        termA: "Full Table Scan vs B-Tree",
        descA: "Full Table Scan checks every row: O(N) time. B-Tree keeps keys in a balanced tree: O(log N) time—finding 1 in a billion takes ~30 steps!",
        termB: "Hash Index & Bitmap Index",
        descB: "Hash indexes give O(1) instant exact match lookups. Bitmap indexes are lightning-fast for columns with few unique values (like driver gender or vehicle type)."
      },
      advancedInfo: "Trade-off alert: While indexes make reading super-fast, every new driver registration (Write/Insert) takes slightly longer because the database must update both the raw table AND the index tree.",
      teacherNotes: {
        concept: "Database Indexing (B-Trees, Hash Indexes, Full Scan vs Indexed Lookup)",
        experience: "Students compared searching through an unsorted pile vs jumping through a structured index.",
        realWorld: "Ride-hailing databases create spatial indexes (like Uber's H3 or PostGIS R-Tree) to index geographical lat/long coordinates.",
        question: "Can one single database hold both live ride booking transactions AND a 5-year analytics report?"
      }
    }
  },

  // LEVEL 8
  {
    id: 8,
    stage: 3,
    title: "The Database Is Too Big",
    time: "Midnight Strategy Meeting",
    usersCount: "500,000 users",
    situation: "The CEO and data science team run a massive query: 'Analyze all 80 million rides from the past 3 years to calculate peak rain surge trends.' Meanwhile, 10,000 live passengers are trying to book real rides right now. The analytical query locks the entire database, causing live ride bookings to time out!",
    problem: "Live high-speed transactional bookings (OLTP) and heavy historical analytics (OLAP) have completely conflicting needs.",
    simulationType: "oltp_vs_olap",
    choices: [
      {
        id: "A",
        text: "Separate the workloads: Keep a quick row-based database for live bookings, and copy historical trips to a dedicated analytics store for reports.",
        isOptimal: true,
        consequenceText: "Genius! Live passenger rides stay lightning-fast on the transactional database, while the data scientists run their heavy multi-year analytics on the dedicated analytics warehouse without disturbing anyone!",
        resultState: "oltp_olap_split",
        statImpact: { bookingSpeed: "5ms", analyticsPower: "Infinite", locks: "Zero conflicts" }
      },
      {
        id: "B",
        text: "Run both live bookings and 3-year historical queries on the exact same database machine to save money.",
        isOptimal: false,
        consequenceText: "Locks deadlock! The 3-year report holds memory buffers for 20 minutes. Real-time passenger bookings fail with 'Database Lock Timeout'.",
        resultState: "database_locked",
        statImpact: { bookingSpeed: "Timed out", analyticsPower: "Hung", locks: "Deadlock!" }
      }
    ],
    discovery: {
      badge: "Database Design: SQL vs NoSQL, OLTP vs OLAP",
      tagline: "Right tool for the right job",
      analogy: "A Formula 1 sports car (OLTP) is built for instant speed and quick turns (booking rides). A giant freight cargo train (OLAP) carries 10,000 tons of historical cargo (analytics). You don't try to use a cargo train to pick up an urgent pizza!",
      contrast: {
        termA: "OLTP (Online Transaction Processing)",
        descA: "Handles millions of tiny, fast read/write operations (e.g., booking a cab, updating ride status). Uses row-oriented SQL databases.",
        termB: "OLAP (Online Analytical Processing)",
        descB: "Scans billions of historical records across columns for business intelligence, aggregations, and trends (e.g., Snowflake, BigQuery)."
      },
      advancedInfo: "Also consider SQL vs NoSQL: Relational SQL (Postgres, MySQL) is ideal for structured relationships (users, payments, driver KYC), while Document NoSQL (MongoDB, DynamoDB) excels at flexible, high-throughput unstructured event payloads.",
      teacherNotes: {
        concept: "OLTP vs OLAP & SQL vs NoSQL Architecture",
        experience: "Students learned why production transactional databases must be shielded from heavy analytics scans.",
        realWorld: "Uber uses MySQL/Schemaless for live trip booking (OLTP) and pipelines trip events into Apache Hudi / Presto for analytics (OLAP).",
        question: "When your database grows past 500 million rows, what do you do when one computer's hard drive runs out of space?"
      }
    }
  },

  // LEVEL 9
  {
    id: 9,
    stage: 3,
    title: "Split The Huge Database",
    time: "City Expansion",
    usersCount: "1 Million Users",
    situation: "RideQuest launched in 10 major cities (Delhi, Mumbai, Bengaluru, Chennai, Kolkata...). The database table now has 500 million records and fills a 10 Terabyte disk. Even the beefiest database machine is out of memory and hard drive space!",
    problem: "One single computer cannot store infinite data. We must partition our database across multiple separate machines.",
    simulationType: "sharding_sim",
    choices: [
      {
        id: "A",
        text: "Divide by Region: Database 1 holds North City rides, Database 2 holds South City rides, Database 3 holds West City rides.",
        isOptimal: true,
        consequenceText: "Range/Geo Partitioning deployed! North drivers and passengers stay in Database North. Each machine only handles a fraction of the data, running at silky smooth speeds!",
        resultState: "range_sharding",
        statImpact: { storagePerDb: "3.3 TB", querySpeed: "Ultra-Fast", isolation: "High" }
      },
      {
        id: "B",
        text: "Divide by User ID Hash: Run Math.hash(UserID) % 3 to scatter users evenly across 3 database machines.",
        isOptimal: true,
        consequenceText: "Hash Partitioning deployed! Data is evenly balanced across all 3 databases with zero hot-spots. No single machine gets more traffic than the others!",
        resultState: "hash_sharding",
        statImpact: { balance: "Perfect 33% each", hotSpots: "Eliminated", scalability: "Horizontal" }
      }
    ],
    discovery: {
      badge: "Database Sharding",
      tagline: "Divide and conquer your giant data",
      analogy: "Like a busy post office that has different letter sorting counters: Counter 1 handles postal codes 1000–2999, Counter 2 handles 3000–5999, and Counter 3 handles 6000–9999. No single postal clerk has to hold every letter in the nation!",
      contrast: {
        termA: "Range / Geo Sharding",
        descA: "Partition data by value ranges (e.g. City = 'Bengaluru'). Great for localized queries, but popular cities can become hot shards.",
        termB: "Hash-Based Sharding",
        descB: "Applies a hash function on the Shard Key (e.g. User ID) to distribute records uniformly across all database instances."
      },
      advancedInfo: "Sharding enables true horizontal database scalability, but introduces architectural challenges: cross-shard joins (queries that need data from multiple shards) become slow and complex.",
      teacherNotes: {
        concept: "Database Sharding (Horizontal Partitioning)",
        experience: "Students split a giant monolithic database into manageable independent shards.",
        realWorld: "Uber shards trip data using a custom sharding layer called Schemaless built on top of MySQL.",
        question: "Now you have partitioned databases, but what happens if the main database machine catches fire or suffers a power cut?"
      }
    }
  },

  // LEVEL 10
  {
    id: 10,
    stage: 3,
    title: "What If One Database Breaks?",
    time: "2:00 AM Hardware Failure",
    usersCount: "1.5 Million Users",
    situation: "At 2:00 AM, a cooling fan melts and the primary database hard drive permanently dies with a loud snap! The screen turns pitch black. 1.5 million users cannot book rides, drivers cannot see active trips, and panic ensues.",
    problem: "If you only have one copy of your data and that machine dies, your company is dead.",
    simulationType: "replication_failover",
    choices: [
      {
        id: "A",
        text: "Keep live, synchronized shadow copies (Replicas) on different racks. If the Leader dies, instantly promote a Replica to become the new Leader!",
        isOptimal: true,
        consequenceText: "High Availability Master-Replica Failover activated! The Primary died, but within 0.8 seconds, Replica 1 was automatically promoted to Leader. RideQuest didn't drop a single ride!",
        resultState: "replication_success",
        statImpact: { uptime: "99.999%", dataLoss: "0 records", failoverTime: "800ms" }
      },
      {
        id: "B",
        text: "Send a technician to the physical data center with a screwdriver to replace the hard drive tomorrow morning.",
        isOptimal: false,
        consequenceText: "RideQuest is completely down for 7 hours. Competitors capture 90% of the market and RideQuest loses ₹50,00,000 in revenue.",
        resultState: "downtime_disaster",
        statImpact: { uptime: "Down", dataLoss: "Uncertain", recoveryTime: "7 Hours" }
      }
    ],
    discovery: {
      badge: "Database Replication",
      tagline: "Always keep a live spare copy",
      analogy: "Like a commercial airliner that has two independent engines and two co-pilots. If the captain feels sick, the first officer instantly takes the controls without the plane falling out of the sky.",
      contrast: {
        termA: "Primary-Replica (Master-Slave)",
        descA: "All Writes go to the Primary leader. The Primary continuously replicates changes to Read Replicas. If the leader fails, a replica is elected.",
        termB: "Multi-Leader Replication",
        descB: "Multiple data centers accept writes simultaneously, useful for global apps across continents, but requires conflict resolution algorithms."
      },
      advancedInfo: "Read Replicas also give huge performance boosts! Since 90% of ride app queries are Reads (browsing map, checking driver rating), all Reads can be sent to Replicas while only Writes hit the Primary.",
      teacherNotes: {
        concept: "Database Replication & Automatic Failover",
        experience: "Students witnessed the catastrophic crash of a single database and designed hot standby replication.",
        realWorld: "Cloud services like Amazon RDS and Google Cloud SQL manage Multi-AZ automated replication with synchronous write replication.",
        question: "When Ride Service and Payment Service live on separate computers, how do they agree on booking a ride safely?"
      }
    }
  },

  // LEVEL 11
  {
    id: 11,
    stage: 4,
    title: "Two Parts Of The System Must Agree",
    time: "Distributed Microservices",
    usersCount: "2 Million Users",
    situation: "RideQuest has separated into independent microservices: 1) The Ride Booking Service and 2) The Payment Wallet Service. A ride is booked. The Payment Service successfully deducts ₹300, but the Ride Service crashes before assigning a driver! Wallet says 'Paid', but Ride Service says 'No Ride Found'.",
    problem: "When two different servers across the network must perform a joint action, how do you prevent them from getting out of sync?",
    simulationType: "distributed_tx_sim",
    choices: [
      {
        id: "A",
        text: "Use a two-step handshake: First ask both services 'Are you ready? Can you lock the money and driver?' Only if BOTH say YES, send the final COMMIT.",
        isOptimal: true,
        consequenceText: "Two-Phase Commit (2PC) in action! Phase 1 (Prepare): Both systems verify readiness. Phase 2 (Commit): Both execute simultaneously. Perfect safety!",
        resultState: "two_phase_commit",
        statImpact: { consistency: "100% Guaranteed", coordination: "Synchronous Lock", safety: "Maximum" }
      },
      {
        id: "B",
        text: "Use a Saga workflow: Step 1 deducts money. If step 2 (assigning driver) fails, automatically run a compensating action that refunds the money.",
        isOptimal: true,
        consequenceText: "Saga Pattern activated! Asynchronous, highly scalable, and handles failures cleanly with compensating rollback transactions without locking databases!",
        resultState: "saga_pattern",
        statImpact: { consistency: "Eventual Consistency", throughput: "Ultra-High", resilience: "Self-Healing" }
      }
    ],
    discovery: {
      badge: "Distributed Transactions",
      tagline: "Making two separate brains agree across the wire",
      analogy: "Like planning a dinner date with a friend via text: You don't buy two expensive tickets before asking 'Are you free tonight?'. You both confirm availability FIRST, then both click purchase together.",
      contrast: {
        termA: "Two-Phase Commit (2PC)",
        descA: "Strong consistency via a coordinator. Voting phase + Commit phase. Very safe, but can block if a coordinator crashes.",
        termB: "Saga Pattern",
        descB: "A sequence of local transactions where each step publishes an event. If a step fails, compensating transactions undo the previous steps like an undo button."
      },
      advancedInfo: "In modern cloud microservices architectures, the Saga pattern is preferred over 2PC because it avoids holding long database distributed locks across network boundaries.",
      teacherNotes: {
        concept: "Distributed Transactions (2PC vs Saga Pattern)",
        experience: "Students faced the classic distributed consensus dilemma where two independent services must reach agreement.",
        realWorld: "E-commerce and ride-hailing checkout flows rely heavily on orchestrator-based Saga patterns with RabbitMQ/Kafka.",
        question: "What should you do when an external partner's server (like a bank gateway) starts taking 30 seconds to answer?"
      }
    }
  },

  // LEVEL 12
  {
    id: 12,
    stage: 4,
    title: "Servers Start Failing",
    time: "External Partner Meltdown",
    usersCount: "2.5 Million Users",
    situation: "RideQuest connects to an external bank gateway for credit cards. Suddenly, the bank's server slows to a crawl, taking 45 seconds to answer. RideQuest's ride servers keep opening connections to the bank, waiting and waiting, until RideQuest runs out of memory and crashes completely!",
    problem: "A failure or slow response in one third-party service shouldn't drag down the entire RideQuest platform.",
    simulationType: "circuit_breaker_sim",
    choices: [
      {
        id: "A",
        text: "Install a Circuit Breaker: If 5 bank requests fail or hang, immediately trip the switch and stop calling the bank. Instantly fail over to cash/UPI or queue payments.",
        isOptimal: true,
        consequenceText: "Circuit Breaker tripped! Instead of hanging for 45s, RideQuest instantly routes passengers to RideQuest Wallet or Cash. The core ride matching stays 100% fast and healthy!",
        resultState: "circuit_breaker_tripped",
        statImpact: { appHealth: "Protected & Fast", cascadeFailure: "Prevented", recovery: "Automatic" }
      },
      {
        id: "B",
        text: "Keep aggressively retrying every frozen request 100 times in a tight loop.",
        isOptimal: false,
        consequenceText: "Retry Storm! Your 100,000 retries hit the already-dying bank server like a sledgehammer (Thundering Herd) and exhaust RideQuest's thread pool, crashing everything.",
        resultState: "thundering_herd_crash",
        statImpact: { appHealth: "Total Crash", cascadeFailure: "Full Blackout", recovery: "Manual Reboot" }
      }
    ],
    discovery: {
      badge: "Fault Tolerance & Resilience",
      tagline: "Cut the wire before the whole house catches fire",
      analogy: "Like the electrical circuit breaker in your home wall. If a faulty toaster draws too much current, the breaker trips to protect your house wiring from burning down.",
      contrast: {
        termA: "Circuit Breaker Pattern",
        descA: "Three states: Closed (normal), Open (tripped—fails fast without calling), Half-Open (tests a few requests to see if service has healed).",
        termB: "Bulkhead Pattern",
        descB: "Like the watertight bulkheads in a submarine or ship: If water floods one compartment, the door seals so the rest of the ship doesn't sink."
      },
      advancedInfo: "When retrying failed network calls, always use Exponential Backoff with Jitter (random delay) to avoid synchronizing retries into a destructive stampede.",
      teacherNotes: {
        concept: "Resilience Patterns: Circuit Breaker, Bulkhead, and Exponential Backoff",
        experience: "Students saw a slow external dependency kill their entire system and discovered graceful degradation and isolation.",
        realWorld: "Netflix's Hystrix / Resilience4j and Envoy proxy implement automated circuit breakers for hundreds of microservices.",
        question: "When three different servers record timestamps, how do you know which event happened first if their clocks disagree?"
      }
    }
  },

  // LEVEL 13
  {
    id: 13,
    stage: 4,
    title: "Time Confusion",
    time: "Physical Clock Drift",
    usersCount: "3 Million Users",
    situation: "Server A's clock says 10:01:05. Server B's clock drifted by 3 seconds and says 10:01:02. Passenger cancels ride on Server B, but driver accepted ride on Server A. The system looks at timestamps and says 'Driver accepted after passenger cancelled'... or did they?",
    problem: "Physical quartz clocks on different computers can never be 100% perfectly synchronized. Relying on computer clock time causes dangerous bugs in distributed systems.",
    simulationType: "vector_clock_sim",
    choices: [
      {
        id: "A",
        text: "Don't trust wall-clock seconds. Instead, use an incrementing sequence counter (Event 1 -> Event 2 -> Event 3) so causal order is crystal clear.",
        isOptimal: true,
        consequenceText: "Logical Clocks applied! Every message carries a sequence counter. The system definitively proves that the cancellation occurred before the driver acceptance regardless of drift!",
        resultState: "logical_clocks_success",
        statImpact: { causality: "100% Accurate", clockDriftVulnerability: "Zero", disputeResolution: "Flawless" }
      },
      {
        id: "B",
        text: "Just assume all server clocks on the internet are identical to the millisecond.",
        isOptimal: false,
        consequenceText: "Chaos! Clock drift causes phantom event reversals. Customers are charged cancellation penalties for rides they cancelled before matching.",
        resultState: "clock_skew_chaos",
        statImpact: { causality: "Inverted", clockDriftVulnerability: "Critical", disputeResolution: "Disastrous" }
      }
    ],
    discovery: {
      badge: "Time & Clocks",
      tagline: "Order matters more than wall-clock seconds",
      analogy: "Like a courtroom trial with witnesses from different time zones: The judge doesn't ask 'What did your watch say?'. The judge asks 'Did you see the car crash BEFORE or AFTER the red light turned on?'. Relative sequence matters!",
      contrast: {
        termA: "Physical Clocks vs Drift",
        descA: "NTP (Network Time Protocol) tries to sync clocks, but network latency and quartz crystals cause clock skew of several milliseconds.",
        termB: "Logical & Vector Clocks",
        descB: "Lamport Timestamps and Vector Clocks track the 'Happened-Before' relationship (A -> B), guaranteeing correct causal ordering across distributed nodes."
      },
      advancedInfo: "Google solved physical clock uncertainty for Google Spanner using 'TrueTime'—installing GPS receivers and atomic clocks in every data center with bounded uncertainty intervals.",
      teacherNotes: {
        concept: "Distributed Time, Clock Skew, and Lamport Logical Clocks",
        experience: "Students discovered that computer clocks lie, and sequence counters are essential for causal ordering.",
        realWorld: "Distributed databases like CockroachDB, Cassandra, and Spanner manage clock drift using hybrid logical clocks (HLC).",
        question: "How should our mobile apps, driver phones, and internal servers talk to each other cleanly?"
      }
    }
  },

  // LEVEL 14
  {
    id: 14,
    stage: 5,
    title: "Talking To Different Services",
    time: "Microservice Communication",
    usersCount: "3.5 Million Users",
    situation: "The RideQuest Mobile App needs to talk to the backend, and internal servers (Ride, Driver, Payment, Geo) need to talk to each other 50,000 times per second. Using heavy, verbose text formats for internal server-to-server traffic is consuming huge bandwidth and CPU.",
    problem: "Different communication styles have different strengths: Mobile apps on 3G need concise queries, while internal servers need ultra-fast binary streaming.",
    simulationType: "api_styles_sim",
    choices: [
      {
        id: "A",
        text: "Use REST / GraphQL for mobile clients (fetch exact fields needed), and lightning-fast binary gRPC with Protobuf for internal server-to-server calls.",
        isOptimal: true,
        consequenceText: "Architectural perfection! Mobile apps fetch lean JSON/GraphQL without wasting mobile data. Internal microservices communicate in ultra-compact binary gRPC at 7x faster speeds!",
        resultState: "api_polyglot_success",
        statImpact: { mobileBandwidth: "-65%", internalLatency: "1.2ms (7x faster)", typeSafety: "Strong" }
      },
      {
        id: "B",
        text: "Make every single internal microservice send giant, uncompressed XML text documents over slow connections.",
        isOptimal: false,
        consequenceText: "Massive CPU overhead! Servers spend 70% of their CPU power just parsing XML text tags rather than running business logic.",
        resultState: "api_xml_bloat",
        statImpact: { mobileBandwidth: "Huge", internalLatency: "35ms", typeSafety: "Weak" }
      }
    ],
    discovery: {
      badge: "APIs & Communication Styles",
      tagline: "The language of modern software",
      analogy: "Like talking to a waiter at a restaurant: You ask in English for a menu (REST). But inside the high-speed kitchen, the chefs use quick, coded shorthand hand signals (gRPC) to move fast!",
      contrast: {
        termA: "REST & GraphQL",
        descA: "REST uses standard HTTP verbs (GET, POST). GraphQL lets mobile clients request precisely the fields they need, eliminating over-fetching.",
        termB: "gRPC & Protocol Buffers",
        descB: "Google's open-source remote procedure call framework. Uses HTTP/2 and binary serialization for extreme throughput between backend microservices."
      },
      advancedInfo: "API Versioning is critical: When you update your backend, older versions of the RideQuest mobile app on passengers' phones (v1.2) must continue working seamlessly using /api/v1 and /api/v2 endpoints.",
      teacherNotes: {
        concept: "API Protocols: REST vs GraphQL vs gRPC & Versioning",
        experience: "Students matched communication protocols to the right tier (client-facing vs internal backend).",
        realWorld: "Uber rewritten its microservices backbone to gRPC over HTTP/2, reducing p99 latency significantly across thousands of internal services.",
        question: "What happens when a spam bot or an angry user taps the 'Book Ride' button 200 times in 3 seconds?"
      }
    }
  },

  // LEVEL 15
  {
    id: 15,
    stage: 5,
    title: "Too Many Requests",
    time: "Surge Spam Attack",
    usersCount: "4 Million Users",
    situation: "A concert ends at the stadium. 2,000 excited fans frantically tap 'Book Ride', 'Book Ride', 'Book Ride' 10 times per second! Meanwhile, a rogue scraper bot attempts to scrape 50,000 driver locations every second. The booking gateway is drowning.",
    problem: "Unrestricted users can exhaust backend resources, lock database rows, and starve legitimate passengers of service.",
    simulationType: "rate_limiter_sim",
    choices: [
      {
        id: "A",
        text: "Give each user a virtual 'Token Bucket': They get 5 tokens. Each button tap costs 1 token. Tokens refill at 1 per second. If bucket is empty, respond with 'Too Many Requests (429)'.",
        isOptimal: true,
        consequenceText: "Token Bucket Rate Limiting active! Normal users click smoothly with bursts allowed. Malicious scrapers and rapid spam clicks are politely blocked without hurting backend servers!",
        resultState: "token_bucket_success",
        statImpact: { backendProtection: "100%", serverCrashRisk: "0%", userFairness: "Guaranteed" }
      },
      {
        id: "B",
        text: "Accept every single click unconditionally and execute a new database transaction for each tap.",
        isOptimal: false,
        consequenceText: "Database collapses! 200,000 duplicate ride requests flood the database queues. Drivers get assigned multiple duplicate rides and the app crashes.",
        resultState: "spam_flood_crash",
        statImpact: { backendProtection: "None", serverCrashRisk: "100%", userFairness: "Unfair" }
      }
    ],
    discovery: {
      badge: "Rate Limiting",
      tagline: "The bouncer at the club door",
      analogy: "Like a metro turnstile gate: Even if 500 commuters run at the gate at the same second, the gate only lets one person through per second per turnstile, keeping the train platform orderly and safe.",
      contrast: {
        termA: "Token Bucket vs Leaky Bucket",
        descA: "Token Bucket allows short bursts of traffic (good for real users). Leaky Bucket outputs requests at a strictly constant rate (smooths traffic).",
        termB: "Sliding Window Counter",
        descB: "Tracks requests across a sliding 60-second window to prevent edge-of-window bursts (e.g., 100 requests at 11:59 and 100 at 12:00)."
      },
      advancedInfo: "Rate limiters typically store client IP / User ID counters in in-memory Redis clusters with TTL expirations for sub-millisecond evaluation at the API Gateway.",
      teacherNotes: {
        concept: "Rate Limiting Algorithms: Token Bucket, Leaky Bucket, Sliding Window",
        experience: "Students acted as the bouncer protecting their servers against abusive spikes and bot scrapers.",
        realWorld: "Cloudflare and AWS WAF enforce edge rate-limiting to prevent DDoS attacks and credential stuffing.",
        question: "How can the passenger's phone show the driver's car moving smoothly on the map in real time?"
      }
    }
  },

  // LEVEL 16
  {
    id: 16,
    stage: 5,
    title: "How Does The App Talk?",
    time: "Live GPS Tracking",
    usersCount: "4.5 Million Users",
    situation: "A passenger is watching their assigned cab approach on the live map. The app needs the driver's updated GPS coordinates every single second. Right now, the phone makes a new HTTP connection every second: Handshake, TLS encrypt, request, response, close connection... repeat 60 times a minute!",
    problem: "Creating and tearing down 60 HTTP connections per minute per phone generates huge network handshake overhead and drains phone battery life.",
    simulationType: "protocols_sim",
    choices: [
      {
        id: "A",
        text: "Open a single, persistent, bi-directional pipe (WebSocket) that stays open continuously so the server can push GPS pings the instant the car moves.",
        isOptimal: true,
        consequenceText: "WebSocket connection established! Zero connection teardown overhead. The car glides smoothly across the passenger's screen with instantaneous sub-20ms updates!",
        resultState: "websocket_live",
        statImpact: { connectionOverhead: "-92%", latency: "15ms", carMotion: "Butter-Smooth" }
      },
      {
        id: "B",
        text: "Keep doing HTTP Short Polling: Ask 'Where is the car?' 120 times every minute.",
        isOptimal: false,
        consequenceText: "High server load! 90% of the network packets are just repetitive HTTP headers and handshakes. Passenger's phone heats up and battery drains rapidly.",
        resultState: "polling_waste",
        statImpact: { connectionOverhead: "+800%", latency: "1,200ms lag", carMotion: "Jerky / Stuttering" }
      }
    ],
    discovery: {
      badge: "Networking Protocols",
      tagline: "Persistent pipes vs knocking on the door repeatedly",
      analogy: "Short Polling is like asking your friend every 2 seconds: 'Are we there yet? Are we there yet?'. WebSockets is like keeping an active phone call on speaker so your friend tells you 'We arrived' the moment you pull in.",
      contrast: {
        termA: "HTTP/1.1 vs HTTP/2 & HTTP/3",
        descA: "HTTP/2 introduces multiplexing (multiple requests on one TCP connection). HTTP/3 uses QUIC over UDP to eliminate head-of-line blocking on flaky mobile cell towers.",
        termB: "WebSockets vs Server-Sent Events (SSE)",
        descB: "WebSockets provide full-duplex two-way communication (great for driver/rider chat). SSE provides one-way server-to-client streaming (great for stock tickers)."
      },
      advancedInfo: "WebSockets begin with an HTTP Upgrade request, switching the protocol to RFC 6455 framing over the underlying TCP socket.",
      teacherNotes: {
        concept: "Networking Protocols: HTTP, WebSockets, HTTP/2 & HTTP/3",
        experience: "Students compared repetitive HTTP polling overhead with persistent bi-directional WebSockets for real-time map tracking.",
        realWorld: "Ride-hailing apps maintain WebSocket / gRPC bi-directional streaming channels with millions of mobile driver apps.",
        question: "During peak rush hour, what should happen to ride requests when our drivers are all busy right now?"
      }
    }
  },

  // LEVEL 17
  {
    id: 17,
    stage: 5,
    title: "Too Many Requests Waiting",
    time: "Surge Buffer Overload",
    usersCount: "5 Million Users",
    situation: "During Diwali or New Year's Eve countdown, 80,000 ride requests arrive within 10 seconds. The matching engine server can only calculate complex driver-passenger pairings at 2,000 rides per second. Without a buffer, the extra 60,000 requests are dropped and lost forever!",
    problem: "When the rate of incoming work temporarily exceeds the processing capacity, you need a shock absorber.",
    simulationType: "message_queue_sim",
    choices: [
      {
        id: "A",
        text: "Drop incoming requests into a durable, lightning-fast waiting conveyor belt (Message Queue). Worker servers pull from the belt as fast as they can.",
        isOptimal: true,
        consequenceText: "Message Queue (Kafka / RabbitMQ) buffered all 80,000 requests in 2 milliseconds! Not a single ride was lost. Worker pools chewed through the queue smoothly within seconds!",
        resultState: "queue_success",
        statImpact: { droppedRequests: "0%", peakAbsorption: "Instant", systemStability: "Rock Solid" }
      },
      {
        id: "B",
        text: "Immediately discard any request that cannot be paired within 50 milliseconds.",
        isOptimal: false,
        consequenceText: "60,000 passengers get 'Booking Error' and delete RideQuest. Lost revenue and massive public relations backlash.",
        resultState: "queue_drop_disaster",
        statImpact: { droppedRequests: "75%", peakAbsorption: "Zero", systemStability: "Crippled" }
      }
    ],
    discovery: {
      badge: "Message Queues",
      tagline: "The shock absorber of distributed systems",
      analogy: "Like the ticket queue line rope at a popular movie theater or theme park roller coaster. Even if 1,000 people arrive at the same time, the line holds everyone safely until the ticket booth serves them one by one.",
      contrast: {
        termA: "Point-to-Point vs Pub/Sub",
        descA: "Point-to-Point (e.g. RabbitMQ work queue) delivers each message to exactly one consumer. Pub/Sub (Publish/Subscribe) broadcasts messages to multiple subscribers (e.g., Ride Booked event notifies Driver, Payment, and Notification services simultaneously).",
        termB: "Kafka vs RabbitMQ",
        descB: "RabbitMQ is a flexible message broker with complex routing. Apache Kafka is an immutable distributed event log designed for massive throughput and event replaying."
      },
      advancedInfo: "Message queues decouple producers from consumers: The web API doesn't need to wait for driver matching, receipt generation, or analytics logging—it pushes the event and immediately confirms to the user.",
      teacherNotes: {
        concept: "Asynchronous Message Queuing (Kafka, RabbitMQ, Decoupling, Backpressure)",
        experience: "Students used a message buffer queue to absorb spike surges without dropping customer requests.",
        realWorld: "Uber processes trillions of messages per day using Apache Kafka clusters across data centers.",
        question: "How do you continuously process moving GPS locations from 50,000 drivers in real-time?"
      }
    }
  },

  // LEVEL 18
  {
    id: 18,
    stage: 5,
    title: "Real-Time City Data",
    time: "City-Wide Telemetry",
    usersCount: "6 Million Users",
    situation: "50,000 active drivers are driving across roads, sending GPS coordinates, speed, and fuel status every 2 seconds. That is 1,500,000 telemetry events every minute! RideQuest needs to detect traffic jams, update route ETAs, and detect driver speeding immediately.",
    problem: "Waiting for batch processing once every hour is useless for real-time traffic jams and safety alerts. The data must be computed on the fly as it flows.",
    simulationType: "stream_processing_sim",
    choices: [
      {
        id: "A",
        text: "Stream Processing Pipeline: Process and analyze each GPS point continuously as it flows through sliding time windows (e.g. detect deceleration over last 30 seconds).",
        isOptimal: true,
        consequenceText: "Stream Engine (Flink / Spark Streaming) active! Traffic slowdowns on MG Road are detected in 1.4 seconds. RideQuest automatically reroutes following drivers around the jam!",
        resultState: "stream_realtime",
        statImpact: { detectionDelay: "1.4s", trafficRerouting: "Instant", safetyAlerts: "Real-Time" }
      },
      {
        id: "B",
        text: "Save all coordinates to a hard drive and run a batch job once every 6 hours to find traffic jams.",
        isOptimal: false,
        consequenceText: "By the time the batch job finishes at 10:00 PM, the 6:00 PM traffic jam has already ended, but thousands of drivers were stuck in it for 2 hours!",
        resultState: "batch_too_late",
        statImpact: { detectionDelay: "6 Hours", trafficRerouting: "Useless", safetyAlerts: "Missed" }
      }
    ],
    discovery: {
      badge: "Stream Processing & Event Sourcing",
      tagline: "Computing data in motion, not at rest",
      analogy: "Like filtering water directly from a flowing river through a mesh filter as it rushes past, rather than filling a giant swimming pool, waiting a day, and then filtering the stagnant pool.",
      contrast: {
        termA: "Batch vs Stream Processing",
        descA: "Batch (Hadoop/MapReduce) processes huge static datasets on a schedule. Stream (Apache Flink, Spark Streaming) processes infinite live data streams with millisecond latencies.",
        termB: "Event Sourcing",
        descB: "Instead of only storing the current state (Car is at [X, Y]), you store every immutable state change event. You can replay time and reconstruct history perfectly."
      },
      advancedInfo: "Windowing in stream processing allows aggregations over sliding windows (e.g. average vehicle speed over the last 60 seconds) or tumbling windows (every fixed 5-minute block).",
      teacherNotes: {
        concept: "Real-Time Stream Processing vs Batch Processing & Event Sourcing",
        experience: "Students compared waiting for delayed batch jobs vs computing live event streams for dynamic city traffic.",
        realWorld: "Uber uses Apache Flink for real-time surge pricing calculations and fraud detection on streaming driver locations.",
        question: "When a passenger searches for 'Café Coffee Day Indiranagar', how does the search box find it in 5ms among 20 million places?"
      }
    }
  },

  // LEVEL 19
  {
    id: 19,
    stage: 6,
    title: "Searching For A Place Or Driver",
    time: "Location Search Engine",
    usersCount: "7 Million Users",
    situation: "A passenger types in the search box: 'Indira Gandhi Airport Terminal 2'. RideQuest has 25,000,000 location landmarks, restaurant names, and addresses in its database. Searching with SQL 'LIKE %Indira%' scans the full text of every row and takes 9 seconds!",
    problem: "Traditional databases are terrible at keyword searches, typos, fuzzy matching, and prefix searches across millions of text documents.",
    simulationType: "fulltext_search_sim",
    choices: [
      {
        id: "A",
        text: "Build an Inverted Index: Break all addresses into unique words ('Indira', 'Airport', 'Terminal') and map each word to the list of IDs where it appears.",
        isOptimal: true,
        consequenceText: "Search Engine (Elasticsearch) deployed! Lookups for 'Airport' jump straight to the matching location IDs in 3 milliseconds, with fuzzy typo correction (handling 'Airtport')!",
        resultState: "search_engine_fast",
        statImpact: { searchLatency: "3ms", typoTolerance: "Smart Fuzzy", autocomplete: "Instant" }
      },
      {
        id: "B",
        text: "Stick with SQL 'SELECT * WHERE address LIKE %keyword%' and scan all 25 million records.",
        isOptimal: false,
        consequenceText: "The database locks up on disk I/O. As the user types each letter, the phone freezes waiting for 9-second search results.",
        resultState: "search_sql_freeze",
        statImpact: { searchLatency: "9,200ms", typoTolerance: "None", autocomplete: "Broken" }
      }
    ],
    discovery: {
      badge: "Full-Text Search & Inverted Indexes",
      tagline: "The secret behind Google and Elasticsearch",
      analogy: "Like the index at the back of an encyclopedia: You look up the keyword 'Moon' and find [Pages 12, 45, 98]. You don't read every sentence in all 20 volumes of the encyclopedia!",
      contrast: {
        termA: "Inverted Index",
        descA: "Maps tokens (words) to document IDs. Instead of Document -> Words, it inverts the mapping to Word -> List of Documents.",
        termB: "BM25 & Fuzzy Matching",
        descB: "BM25 scores relevance based on term frequency and document length. Levenshtein distance allows finding results even when passengers make spelling mistakes."
      },
      advancedInfo: "Dedicated search engines like Elasticsearch and OpenSearch use Lucene underneath. They run alongside primary databases, receiving updates via Change Data Capture (CDC).",
      teacherNotes: {
        concept: "Full-Text Search Engines & Inverted Index Data Structures",
        experience: "Students discovered why SQL substring matches choke on text and built an inverted word-to-document index.",
        realWorld: "Ride apps use Elasticsearch / Algolia to power instant typeahead destination autocomplete.",
        question: "How does the executive team analyze which city has the highest profit across 500 million historical rides?"
      }
    }
  },

  // LEVEL 20
  {
    id: 20,
    stage: 6,
    title: "Understanding The Business",
    time: "Executive Business Analytics",
    usersCount: "8 Million Users",
    situation: "The Chief Operating Officer asks: 'Show me total driver earnings vs rider discounts, broken down by month, vehicle type (Auto, Bike, Sedan), and city for the last 4 years.' This requires crunching 500 million records across 8 different microservice databases.",
    problem: "Operational databases are designed for one transaction at a time. Business analysis needs historical columnar data merged from across the whole company.",
    simulationType: "data_warehouse_sim",
    choices: [
      {
        id: "A",
        text: "Build an ETL Data Pipeline: Extract data from all services, Clean/Transform it, and Load it into a Columnar Data Warehouse (Snowflake / BigQuery).",
        isOptimal: true,
        consequenceText: "Data Warehouse online! 500 million records aggregated across 4 years in just 3 seconds! The COO gets interactive visual dashboards without touching production databases!",
        resultState: "warehouse_success",
        statImpact: { reportQueryTime: "3s vs 4 hours", crossServiceInsights: "Unified", productionImpact: "Zero" }
      },
      {
        id: "B",
        text: "Write manual SQL join scripts directly against the live production payment and ride databases during the day.",
        isOptimal: false,
        consequenceText: "Production databases crash! Disk IO reaches 100%, real passengers cannot book rides, and the query runs out of memory anyway.",
        resultState: "warehouse_direct_crash",
        statImpact: { reportQueryTime: "Crashed", crossServiceInsights: "Failed", productionImpact: "Devastating" }
      }
    ],
    discovery: {
      badge: "Data Warehousing & Data Lakes",
      tagline: "The memory and wisdom of the enterprise",
      analogy: "Like accounting at a huge supermarket: Cashiers at checkout counters only record the item you are buying right now. At night, all sales logs are shipped to corporate headquarters to analyze which ice cream flavor sold best all summer.",
      contrast: {
        termA: "ETL vs ELT",
        descA: "ETL (Extract, Transform, Load) cleans data before storing. ELT (Extract, Load, Transform) loads raw data directly into scalable cloud warehouses and transforms via SQL.",
        termB: "Columnar Storage (Parquet, ClickHouse)",
        descB: "Stores data by column rather than row. If you only want to average 'FareAmount', it only reads that one column, skipping names, coordinates, and notes!"
      },
      advancedInfo: "Data Lakes (AWS S3 + Apache Iceberg / Delta Lake) store raw unstructured data, while Data Warehouses organize structured data for fast business queries.",
      teacherNotes: {
        concept: "Data Warehouses, Data Lakes, ETL Pipelines, and Columnar Storage",
        experience: "Students separated real-time operational state from centralized historical intelligence.",
        realWorld: "Uber, Lyft, and Grab use multi-petabyte data lakes and warehouses to optimize driver incentives and dynamic pricing algorithms.",
        question: "Why should a passenger in Delhi download app graphics and map tiles from a server located 2,000 km away in Chennai?"
      }
    }
  },

  // LEVEL 21
  {
    id: 21,
    stage: 6,
    title: "Users Are Far Away",
    time: "Nationwide Geography",
    usersCount: "8.5 Million Users",
    situation: "RideQuest's main servers and image storage are located in Chennai (South India). A passenger opening the app in Delhi (North India, 2,200 km away) experiences a 350-millisecond lag just downloading the map tiles, car icons, and promotional banners across long-distance fiber cables.",
    problem: "The speed of light in fiber optic glass is finite (~200,000 km/s). Physics dictates that physical distance creates unavoidable network latency.",
    simulationType: "cdn_edge_sim",
    choices: [
      {
        id: "A",
        text: "Deploy a Content Delivery Network (CDN): Cache static assets (map images, car icons, app code) on Edge Servers located directly in Delhi, Mumbai, Kolkata, and Bengaluru.",
        isOptimal: true,
        consequenceText: "Edge CDN deployed! Passengers in Delhi now download assets from a local Delhi server in 8ms instead of 350ms! Speed of light lag vanquished!",
        resultState: "cdn_edge_fast",
        statImpact: { assetLatency: "8ms (40x faster)", originServerLoad: "-85%", userExperience: "Snappy" }
      },
      {
        id: "B",
        text: "Make every user across the continent pull every static image from the single Chennai server every time.",
        isOptimal: false,
        consequenceText: "Chennai server bandwidth saturates. Users in Delhi and Kolkata see blank grey squares where maps and car icons should be.",
        resultState: "cdn_origin_bottleneck",
        statImpact: { assetLatency: "350ms+", originServerLoad: "100%", userExperience: "Sluggish" }
      }
    ],
    discovery: {
      badge: "Content Delivery Network (CDN)",
      tagline: "Move content closer to where the user lives",
      analogy: "Like having a local milk booth or neighborhood grocery store on your street corner. You don't travel 500 kilometers to a dairy farm in another state every time you want a bottle of milk!",
      contrast: {
        termA: "Edge Caching & PoPs",
        descA: "Points of Presence (PoPs) stationed in dozens of cities worldwide cache static images, videos, and CSS closer to end users.",
        termB: "Anycast Routing",
        descB: "Directs incoming client network requests to the geographically closest edge server automatically using BGP routing."
      },
      advancedInfo: "Modern CDNs (Cloudflare, Fastly, AWS CloudFront) also execute Edge Compute (serverless functions directly at the edge) to handle auth tokens and localize headers before hitting origins.",
      teacherNotes: {
        concept: "CDNs, Edge Caching, and Geographic Latency Reduction",
        experience: "Students felt the physical latency of geographical distance and placed edge caching nodes across cities.",
        realWorld: "RideQuest serves its mobile assets, map vector tiles, and app update bundles through global CDN edge networks.",
        question: "When 5 nearby drivers are available, how does the app know which driver is best to recommend?"
      }
    }
  },

  // LEVEL 22
  {
    id: 22,
    stage: 6,
    title: "Which Driver Should I Recommend?",
    time: "Intelligent Dispatch",
    usersCount: "9 Million Users",
    situation: "A high-tier executive passenger requests a ride. There are 4 drivers nearby: Driver A is 200m away but has a 3.1-star rating and cancels 40% of trips. Driver B is 600m away, has a 4.9-star rating, speaks fluent local language, and drives an immaculate electric sedan. Driver C has never done a ride.",
    problem: "Matching purely by shortest geographic distance often leads to terrible passenger experiences, cancellations, and lost loyalty.",
    simulationType: "recsys_sim",
    choices: [
      {
        id: "A",
        text: "Build an Intelligent Recommendation & Ranking Model: Score candidates using multi-factor signals (ETA, driver rating, acceptance rate, vehicle quality, passenger history).",
        isOptimal: true,
        consequenceText: "Smart Ranking matches with Driver B! ETA is only 1 minute longer, but trip completion rate is 99.8%, passenger gives a 5-star review, and driver tips increase by 30%!",
        resultState: "recsys_smart_match",
        statImpact: { tripCompletion: "99.8%", rating: "4.9 Stars", churn: "-40%" }
      },
      {
        id: "B",
        text: "Just pick the driver with the closest GPS distance unconditionally (Driver A).",
        isOptimal: false,
        consequenceText: "Driver A accepts, then cancels 3 minutes later because the destination is inconvenient. The passenger is stranded and frustrated.",
        resultState: "recsys_naive_fail",
        statImpact: { tripCompletion: "60%", rating: "3.2 Stars", churn: "+25%" }
      }
    ],
    discovery: {
      badge: "Recommendation & Ranking Systems",
      tagline: "Turning raw options into the perfect match",
      analogy: "Like a thoughtful matchmaker or concierge: Instead of introducing you to the nearest person standing next to you, they understand your preferences and introduce you to someone you will actually enjoy talking to!",
      contrast: {
        termA: "Content-Based vs Collaborative Filtering",
        descA: "Content-Based matches based on explicit attributes (vehicle type, rating, language). Collaborative looks at similarities across crowds ('Passengers like you also enjoyed this driver').",
        termB: "Two-Stage Retrieval & Ranking",
        descB: "Stage 1: Fast Candidate Retrieval filters 10,000 drivers down to the top 50 in 5ms. Stage 2: Heavy Machine Learning Model scores and ranks the top 50."
      },
      advancedInfo: "Ride-hailing dispatch uses bipartite matching algorithms (Kuhn-Munkres / Hungarian algorithm) combined with ML pricing and destination likelihood models to maximize global city efficiency.",
      teacherNotes: {
        concept: "Recommendation Systems, Candidate Generation, and Multi-Factor Ranking",
        experience: "Students compared naive nearest-neighbor matching with holistic multi-signal ranking algorithms.",
        realWorld: "Uber's Marketplace Intelligence team runs batch bipartite matching every few seconds rather than instant greedy 1-to-1 dispatch.",
        question: "When 100 microservices run simultaneously and a trip fails, how do engineers find which service caused it?"
      }
    }
  },

  // LEVEL 23
  {
    id: 23,
    stage: 7,
    title: "Understanding What Is Happening",
    time: "The Control Room",
    usersCount: "9.5 Million Users",
    situation: "A user reports: 'I clicked Book Ride and got Error 500!'. RideQuest now has 45 microservices (API Gateway, Auth, Ride, Driver, Payment, Geo, Pricing, Fraud, Promo...). Looking through millions of raw console log lines by hand across 100 servers would take 3 days!",
    problem: "When a complex system breaks, if you cannot see inside, you are flying a plane blind in a thunderstorm.",
    simulationType: "observability_sim",
    choices: [
      {
        id: "A",
        text: "Implement Distributed Tracing & APM: Tag every incoming request with a unique Trace ID that follows it across all 45 services. Visualize the hop timeline with live error alerts.",
        isOptimal: true,
        consequenceText: "Observability activated! Trace ID #9a8f2 highlights the exact path: Gateway (2ms) -> Auth (4ms) -> Ride (12ms) -> Pricing Service [CRASH: NullPointerException on coupon code 'RAIN50' at line 42]! Found in 4 seconds!",
        resultState: "tracing_found_bug",
        statImpact: { mttr: "4 Seconds (vs 3 days)", bugPinpointed: "Exact Line", downtime: "Averted" }
      },
      {
        id: "B",
        text: "Log into individual servers via SSH terminal one by one and manually read text log files.",
        isOptimal: false,
        consequenceText: "By the time engineers log into server #14, another 50,000 passengers have encountered the crash. The issue persists for hours.",
        resultState: "manual_log_slog",
        statImpact: { mttr: "4.5 Hours", bugPinpointed: "Guesswork", downtime: "Ongoing" }
      }
    ],
    discovery: {
      badge: "Observability: The Three Pillars",
      tagline: "Metrics, Logs, and Traces",
      analogy: "Like a modern hospital ICU patient monitor: Instead of guessing why a patient feels sick, doctors have real-time heart rate graphs (Metrics), detailed medical chart notes (Logs), and an X-ray tracer dye tracing blood flow through every organ (Distributed Traces).",
      contrast: {
        termA: "Metrics & Logs",
        descA: "Metrics (Prometheus/Grafana) track numbers over time (CPU %, 500 Error count). Logs track discrete event records with context.",
        termB: "Distributed Tracing (Jaeger / OpenTelemetry)",
        descB: "Propagates a correlation Trace ID through HTTP headers across all microservice hops, showing a Gantt chart of where every millisecond was spent."
      },
      advancedInfo: "The Golden Signals of Observability: Latency, Traffic, Errors, and Saturation. Setting up SLOs (Service Level Objectives) and automated alerting allows engineers to fix issues before users notice.",
      teacherNotes: {
        concept: "Observability: Metrics, Structured Logging, Distributed Tracing, and APM",
        experience: "Students navigated a distributed failure and used trace correlation to pinpoint a bug within seconds.",
        realWorld: "Modern tech giants use OpenTelemetry, Jaeger, Datadog, and Grafana to trace billions of distributed requests.",
        question: "How do we ensure that malicious hackers or rogue drivers cannot steal ride data or withdraw money?"
      }
    }
  },

  // LEVEL 24
  {
    id: 24,
    stage: 7,
    title: "Protecting The App",
    time: "Security & Zero Trust",
    usersCount: "10 Million Users",
    situation: "A rogue user inspects the mobile app network traffic and tries to call the internal URL '/api/admin/refund-wallet' to credit ₹10,000 to their own account. Another user attempts to read private GPS locations of high-profile passengers.",
    problem: "Anyone can send a raw HTTP request. If the backend doesn't strictly verify who you are and what you are allowed to touch, your platform will be hacked.",
    simulationType: "security_rbac_sim",
    choices: [
      {
        id: "A",
        text: "Enforce AuthN & AuthZ: Authenticate identity with signed, tamper-proof tokens (JWT / OAuth 2.0) and enforce strict Role-Based Access Control (RBAC) on every API endpoint.",
        isOptimal: true,
        consequenceText: "Security Gate locked! The attacker's forged request is inspected. Token role is 'Passenger'. The endpoint requires 'Admin' role. The gateway returns '403 Forbidden' and flags the attacker's IP!",
        resultState: "security_block_success",
        statImpact: { breaches: "0", unauthorizedAccess: "Blocked", regulatoryCompliance: "100%" }
      },
      {
        id: "B",
        text: "Rely on 'Security through obscurity': Just make the admin URL long and hard to guess (e.g. /api/secret-admin-9827361).",
        isOptimal: false,
        consequenceText: "Security breach! The URL is leaked on GitHub or discovered by automated scanners. The attacker drains ₹5,00,000 from the company account.",
        resultState: "security_breach_disaster",
        statImpact: { breaches: "Severe", unauthorizedAccess: "Unrestricted", regulatoryCompliance: "Failed" }
      }
    ],
    discovery: {
      badge: "Authentication & Authorization (AuthN / AuthZ)",
      tagline: "Who are you? And what are you allowed to do?",
      analogy: "Like boarding an international flight: Authentication is showing your Passport at immigration ('Yes, you are Priya'). Authorization is showing your First-Class Boarding Pass to enter the VIP lounge ('No, this coach ticket doesn't allow entry to the cockpit').",
      contrast: {
        termA: "Authentication (AuthN)",
        descA: "Verifies IDENTITY (Passwords, 2FA, Biometrics, OAuth 2.0, OpenID Connect). Proves who the user is.",
        termB: "Authorization (AuthZ) & RBAC",
        descB: "Verifies PERMISSIONS (RBAC: Role-Based Access Control). Decides what the authenticated user is permitted to view, edit, or delete."
      },
      advancedInfo: "Always combine with Encryption in Transit (TLS 1.3 HTTPS) and Encryption at Rest (AES-256 for databases), plus API rate limiting and token signature verification.",
      teacherNotes: {
        concept: "Security Architecture: AuthN vs AuthZ, OAuth 2.0, JWT, RBAC, and Principle of Least Privilege",
        experience: "Students defended their platform against privilege escalation attacks using cryptographic tokens and RBAC.",
        realWorld: "Enterprise systems enforce Zero Trust architectures: Never trust, always verify every microservice request.",
        question: "Now you have discovered all 24 fundamental concepts of system design... Are you ready to build the complete RideQuest architecture from scratch?"
      }
    }
  },

  // FINAL BOSS (LEVEL 25)
  {
    id: 25,
    stage: 8,
    title: "FINAL BOSS: BUILD RIDEQUEST",
    time: "10 Million Users Across 50 Cities",
    usersCount: "10,000,000 Users",
    situation: "Congratulations, Architect! You have experienced every real-world problem a ride-hailing company faces. Now comes the ultimate test: RideQuest has 10 million users, 1 million drivers, and processes 500,000 requests per second across 50 cities.",
    problem: "Assemble the complete, robust, scalable, resilient, and secure RideQuest architecture on the System Design Canvas!",
    isBoss: true
  }
];

window.GAME_STAGES = STAGES;
window.GAME_LEVELS = LEVELS;
