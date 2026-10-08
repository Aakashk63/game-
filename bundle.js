// RIDEQUEST ALL-IN-ONE BUNDLE
/**
 * RideQuest - Web Audio API Procedural Sound Engine
 * Zero external audio files required! 100% synthesized in-browser.
 */
class SoundEngine {
  constructor() {
    this.ctx = null;
    this.muted = localStorage.getItem('ridequest_muted') === 'true';
  }

  init() {
    if (!this.ctx) {
      const AudioContext = window.AudioContext || window.webkitAudioContext;
      if (AudioContext) {
        this.ctx = new AudioContext();
      }
    }
    if (this.ctx && this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
  }

  toggleMute() {
    this.muted = !this.muted;
    localStorage.setItem('ridequest_muted', this.muted);
    return this.muted;
  }

  playTone(freq, type, duration, gainStart = 0.15, gainEnd = 0.001) {
    if (this.muted) return;
    this.init();
    if (!this.ctx) return;

    try {
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = type;
      osc.frequency.setValueAtTime(freq, this.ctx.currentTime);

      gain.gain.setValueAtTime(gainStart, this.ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(gainEnd, this.ctx.currentTime + duration);

      osc.connect(gain);
      gain.connect(this.ctx.destination);

      osc.start();
      osc.stop(this.ctx.currentTime + duration);
    } catch (e) {
      console.warn('Audio playback error', e);
    }
  }

  click() {
    this.playTone(800, 'sine', 0.06, 0.1, 0.001);
  }

  hover() {
    this.playTone(450, 'triangle', 0.04, 0.03, 0.001);
  }

  select() {
    this.playTone(520, 'sine', 0.09, 0.15, 0.001);
    setTimeout(() => this.playTone(680, 'sine', 0.12, 0.12, 0.001), 60);
  }

  success() {
    if (this.muted) return;
    this.init();
    const notes = [523.25, 659.25, 783.99, 1046.50]; // C5, E5, G5, C6
    notes.forEach((freq, idx) => {
      setTimeout(() => {
        this.playTone(freq, 'sine', 0.28, 0.18, 0.001);
      }, idx * 80);
    });
  }

  levelUp() {
    if (this.muted) return;
    this.init();
    const notes = [440, 554.37, 659.25, 880, 1108.73, 1318.51]; // A major arpeggio
    notes.forEach((freq, idx) => {
      setTimeout(() => {
        this.playTone(freq, 'triangle', 0.35, 0.22, 0.001);
      }, idx * 75);
    });
  }

  overload() {
    if (this.muted) return;
    this.init();
    this.playTone(180, 'sawtooth', 0.3, 0.2, 0.01);
    setTimeout(() => this.playTone(140, 'sawtooth', 0.35, 0.25, 0.01), 100);
  }

  packet() {
    this.playTone(1200 + Math.random() * 400, 'sine', 0.03, 0.03, 0.001);
  }

  whoosh() {
    if (this.muted) return;
    this.init();
    if (!this.ctx) return;
    try {
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(300, this.ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(80, this.ctx.currentTime + 0.2);
      gain.gain.setValueAtTime(0.08, this.ctx.currentTime);
      gain.gain.linearRampToValueAtTime(0.001, this.ctx.currentTime + 0.2);
      osc.connect(gain);
      gain.connect(this.ctx.destination);
      osc.start();
      osc.stop(this.ctx.currentTime + 0.2);
    } catch (e) {}
  }
}

window.soundEngine = new SoundEngine();


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
        statImpact: { latency: "+80ms", capacity: "Limited", cost: "Extremely High", risk: "Single point of failure" },
        whatHappened: {
          helped: "The giant machine handled the initial rush of requests for a few moments.",
          bottleneck: "When the evening traffic doubled, that single computer still hit 100% CPU! It was extremely expensive, and any single hardware failure will crash the entire platform.",
          reflectionQuestion: "Can upgrading one single computer scale forever without becoming a dangerous single point of failure?"
        }
      },
      {
        id: "B",
        text: "Bring in multiple regular computers and split the crowd's work among them.",
        isOptimal: true,
        consequenceText: "Brilliant! You added 4 regular computers. The 50,000 incoming requests are divided evenly. Each machine is cool and comfortable at 30% load, and the app is instantly responsive for every passenger!",
        resultState: "horizontal_success",
        statImpact: { latency: "18ms", capacity: "Easily Expandable", cost: "Cost-Effective", risk: "Safe & Resilient" },
        successSummary: "By bringing in multiple computers and dividing the crowd's requests, each machine runs comfortably at 25% load with zero bottlenecks!"
      },
      {
        id: "C",
        text: "Put up a notice asking passengers: 'Please try again in 30 minutes.'",
        isOptimal: false,
        consequenceText: "Your passengers delete RideQuest and switch to walking or rival taxi apps! In tech companies, telling users to 'come back later' causes business bankruptcy.",
        resultState: "user_churn",
        statImpact: { latency: "Inf", capacity: "Zero", cost: "Loss of Revenue", risk: "Catastrophic" },
        whatHappened: {
          helped: "The servers had zero traffic because no one was allowed inside.",
          bottleneck: "Passengers deleted the app in frustration and switched to rival apps. RideQuest lost 100% of its business!",
          reflectionQuestion: "Is turning paying customers away a sustainable technology strategy?"
        }
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
        text: "Make Chef Raj cook faster (send him to culinary boot camp).",
        isOptimal: false,
        consequenceText: "Chef Raj now chops onions in 10 seconds, but 20 customers are still trapped at the cashier counter waiting to pay! Total wait time barely improved.",
        resultState: "bottleneck_remains",
        statImpact: { speedup: "Negligible (1.1x)", satisfaction: "Low", bottleneck: "Cashier still blocked" },
        whatHappened: {
          helped: "Cooking speed became 10x faster (2 minutes ➔ 20 seconds).",
          bottleneck: "Chef Raj still had to take phone orders, pack boxes, and collect cash alone. Those sequential steps stayed slow, and the customer queue grew longer and longer!",
          reflectionQuestion: "Did speeding up the cooking step alone solve the whole restaurant's waiting line?"
        }
      },
      {
        id: "B",
        text: "Divide the work between multiple people: One takes orders, one cooks, one packs, one takes payments.",
        isOptimal: true,
        consequenceText: "Outstanding! By identifying the true bottleneck and separating tasks into an organized pipeline, orders move continuously without anyone waiting for the other!",
        resultState: "pipeline_success",
        statImpact: { speedup: "Massive (4.5x)", satisfaction: "Very High", bottleneck: "Eliminated" },
        successSummary: "By dividing the work into separate stations (Order, Cook, Pack, Pay), all 4 workers operate in parallel and orders flow without delay!"
      },
      {
        id: "C",
        text: "Ask customers to wait outside in the street until Chef Raj catches up.",
        isOptimal: false,
        consequenceText: "Angry customers wait in the heat, get fed up, and walk to the restaurant across the street! Orders drop to zero.",
        resultState: "customers_leave",
        statImpact: { speedup: "Zero", satisfaction: "Abysmal", bottleneck: "Customers left" },
        whatHappened: {
          helped: "Chef Raj was not rushed in the kitchen.",
          bottleneck: "Customers got tired of waiting outside in the hot sun and walked across the street to a competitor. Revenue plummeted!",
          reflectionQuestion: "Can asking customers to wait indefinitely fix a slow service bottleneck?"
        }
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

const TOPIC_HINTS = {
  1: "Handling Sudden Crowd Surges",
  2: "Finding the System Bottleneck",
  3: "Distributing Incoming Traffic",
  4: "Dealing with Network Partitions",
  5: "Guaranteeing Safe Payments",
  6: "Remembering Frequent Answers",
  7: "Searching Without Scanning Everything",
  8: "Separating Conflicting Workloads",
  9: "Dividing an Enormous Database",
  10: "Surviving Hardware Crashes",
  11: "Coordinating Independent Services",
  12: "Containing System Failures",
  13: "Resolving Conflicting Event Order",
  14: "Connecting Mobile Apps to Backend",
  15: "Shielding from Request Floods",
  16: "Live Two-Way Map Communication",
  17: "Buffering Traffic Spikes Safely",
  18: "Analyzing Live Moving Telemetry",
  19: "Searching Instant Landmark Names",
  20: "Analyzing Long-Term Business Data",
  21: "Serving Distant Geographic Cities",
  22: "Matching the Best Driver Intelligently",
  23: "Investigating Hidden Service Crashes",
  24: "Defending Against Rogue Actions",
  25: "Synthesizing the Complete Architecture"
};

LEVELS.forEach(lvl => {
  if (TOPIC_HINTS[lvl.id]) {
    lvl.topicHint = TOPIC_HINTS[lvl.id];
  }
  if (lvl.choices) {
    lvl.choices.forEach(ch => {
      if (!ch.whatHappened) {
        if (!ch.isOptimal) {
          ch.whatHappened = {
            helped: "You attempted a direct change to this part of the system.",
            bottleneck: ch.consequenceText,
            reflectionQuestion: "Did this approach solve the underlying system bottleneck or make another problem appear?",
            hint: "Look at where requests or people are getting stuck, and consider how to divide, buffer, or isolate the work."
          };
        } else {
          ch.successSummary = ch.consequenceText;
        }
      }
    });
  }
});

window.GAME_STAGES = STAGES;
window.GAME_LEVELS = LEVELS;



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
          <div class="server-rack-top">
            <span class="rack-light red"></span>
            <span class="rack-light yellow blink"></span>
            <span class="rack-label">Single Main Host #01</span>
          </div>
          <div class="server-icon-large">🖥️</div>
          <div class="server-title">Single Machine Architecture</div>
          <div class="server-bar"><div class="server-fill fill-danger" style="width: 98%;"></div></div>
          <div class="server-status text-danger font-mono">⚠️ CPU: 99% • TEMP: 98°C • MEM: 97%</div>
          <div class="smoke-particles-container">
            <span class="smoke-p s1">💨</span>
            <span class="smoke-p s2">💨</span>
          </div>
          <div class="bottleneck-tag text-danger">🛑 Single Point of Failure</div>
        </div>
      `;
    } else if (isHorizontal) {
      serverHtml = `
        <div class="horizontal-cluster-box glow-green">
          <div class="cluster-header">
            <span class="cluster-badge">✓ Distributed Cluster (4 Nodes Active)</span>
            <span class="cluster-load text-success">Total Traffic: 50,000 req/s Distributed</span>
          </div>
          <div class="sim-servers-grid">
            <div class="sim-server healthy">
              <div class="server-rack-top"><span class="rack-light green"></span><span>Node 01</span></div>
              <div class="server-icon">🖥️</div>
              <div class="server-bar"><div class="server-fill fill-success" style="width: 25%;"></div></div>
              <div class="text-success font-mono">CPU: 25% • 36°C</div>
            </div>
            <div class="sim-server healthy">
              <div class="server-rack-top"><span class="rack-light green"></span><span>Node 02</span></div>
              <div class="server-icon">🖥️</div>
              <div class="server-bar"><div class="server-fill fill-success" style="width: 28%;"></div></div>
              <div class="text-success font-mono">CPU: 28% • 37°C</div>
            </div>
            <div class="sim-server healthy">
              <div class="server-rack-top"><span class="rack-light green"></span><span>Node 03</span></div>
              <div class="server-icon">🖥️</div>
              <div class="server-bar"><div class="server-fill fill-success" style="width: 24%;"></div></div>
              <div class="text-success font-mono">CPU: 24% • 36°C</div>
            </div>
            <div class="sim-server healthy">
              <div class="server-rack-top"><span class="rack-light green"></span><span>Node 04</span></div>
              <div class="server-icon">🖥️</div>
              <div class="server-bar"><div class="server-fill fill-success" style="width: 22%;"></div></div>
              <div class="text-success font-mono">CPU: 22% • 35°C</div>
            </div>
          </div>
          <div class="cluster-footer text-success">
            ✨ Workload split smoothly! If any single server trips, 3 servers keep the city running!
          </div>
        </div>
      `;
    } else if (isVertical) {
      serverHtml = `
        <div class="sim-server giant overheated pulse-danger">
          <div class="server-rack-top">
            <span class="rack-light red blink"></span>
            <span class="rack-label">Titan Super-Server ($25,000 / mo)</span>
          </div>
          <div class="server-icon-large">🏢</div>
          <div class="server-title">One Giant Super-Machine</div>
          <div class="server-bar"><div class="server-fill fill-danger" style="width: 95%;"></div></div>
          <div class="server-status text-danger font-mono">⚠️ CPU: 95% • Still Overheated Under 100k Peak</div>
          <div class="smoke-particles-container">
            <span class="smoke-p s1">💨</span>
            <span class="smoke-p s2">🔥</span>
          </div>
          <div class="bottleneck-tag text-warning">
            ⚠️ Physical limit reached! Single power trip drops all rides.
          </div>
        </div>
      `;
    } else {
      serverHtml = `
        <div class="sim-server offline">
          <div class="server-icon-large">🚫</div>
          <div class="server-title">"Please Try Again Later"</div>
          <div class="server-status text-danger">App Shut Down to Users</div>
          <div class="bottleneck-tag text-danger">📉 100% User Churn — Customers Uninstalled App</div>
        </div>
      `;
    }

    this.container.innerHTML = `
      <div class="sim-stage">
        <div class="sim-header">
          <span class="sim-badge">Live Scenario: 6:00 PM City Rush Hour</span>
          <span class="sim-counter">50,000 Active Passengers</span>
        </div>
        <div class="sim-traffic-visual">
          <div class="sim-clients">
            <div class="clients-grid">
              <div class="client-avatar">📱<span class="user-pulse"></span></div>
              <div class="client-avatar">📱<span class="user-pulse"></span></div>
              <div class="client-avatar">📱<span class="user-pulse"></span></div>
              <div class="client-avatar">📱<span class="user-pulse"></span></div>
            </div>
            <div class="client-label">50,000 Ride Requests</div>
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
          <div class="stat-pill"><span>Latency:</span> <strong>${isHorizontal ? '18ms (Instant)' : (isVertical ? '140ms (Lagging)' : 'Inf')}</strong></div>
          <div class="stat-pill"><span>System Health:</span> <strong class="${isHorizontal ? 'text-success' : 'text-danger'}">${isHorizontal ? '100% Healthy' : (isVertical ? 'Near Crash' : 'Offline')}</strong></div>
          <div class="stat-pill"><span>Trips Dispatched:</span> <strong>${isHorizontal ? '50,000 / 50,000' : (isVertical ? '31,000 / 50,000' : '0')}</strong></div>
        </div>
      </div>
    `;
  }

  // --- LEVEL 2: Restaurant Workflow (Amdahl's Law & Bottlenecks) ---
  renderPipelineBottleneck(level, choice) {
    const isPipelined = choice && choice.id === 'B';
    const isCookFast = choice && choice.id === 'A';
    const isWait = choice && choice.id === 'C';

    let queueCountText = '5 customers waiting';
    let queueClass = 'queue-normal';
    let queueAvatars = '🚶‍♂️ 🚶‍♀️ 🚶‍♂️';

    if (isCookFast) {
      queueCountText = '100+ customers waiting in street! (Bottlenecked)';
      queueClass = 'queue-overwhelmed pulse-danger';
      queueAvatars = '🚶‍♂️ 🚶‍♀️ 🚶‍♂️ 🚶‍♀️ 😤 ⏳ 😡 🚶‍♂️ 🚶‍♀️';
    } else if (isPipelined) {
      queueCountText = '0 customers waiting (Continuous Flow!)';
      queueClass = 'queue-cleared text-success';
      queueAvatars = '😋 5★ 👍 🥡 🚗';
    } else if (isWait) {
      queueCountText = '0 customers (Everyone walked away to competitor!)';
      queueClass = 'queue-empty text-danger';
      queueAvatars = '❌ 🚶‍♂️💨 🚶‍♀️💨';
    }

    this.container.innerHTML = `
      <div class="sim-stage">
        <div class="sim-header">
          <span class="sim-badge">Visual Restaurant Simulation: The 4-Step Workflow</span>
          <span class="sim-counter font-mono">${isPipelined ? 'Throughput: 4.5x Speedup' : (isCookFast ? 'Cooking Fast, Rest Blocked' : 'Sequential Bottleneck')}</span>
        </div>

        <div class="restaurant-visual-container">
          <!-- CUSTOMER QUEUE AT ENTRANCE -->
          <div class="restaurant-queue-bar ${queueClass}">
            <div class="queue-label">
              <span class="queue-icon">👥</span>
              <strong>Queue Line:</strong> <span class="queue-status-text">${queueCountText}</span>
            </div>
            <div class="queue-avatars-row">${queueAvatars}</div>
          </div>

          <!-- THE 4 RESTAURANT STATIONS -->
          <div class="restaurant-stations-grid ${isPipelined ? 'stations-pipelined' : 'stations-single-worker'}">
            
            <!-- STATION 1: ORDER -->
            <div class="station-card ${isPipelined ? 'st-active' : (isCookFast ? 'st-waiting' : '')}">
              <div class="station-icon">📞</div>
              <div class="station-title">Step 1: Take Order</div>
              <div class="station-worker">${isPipelined ? '👨‍💼 Dedicated Worker 1' : '👨‍🍳 Chef Raj'}</div>
              <div class="station-badge ${isPipelined ? 'badge-ok' : (isCookFast ? 'badge-wait' : 'badge-idle')}">
                ${isPipelined ? '✓ Active (20s)' : (isCookFast ? '⏳ WAITING (Chef busy)' : 'Sequential')}
              </div>
            </div>

            <div class="station-arrow">${isPipelined ? '⏩' : '➡️'}</div>

            <!-- STATION 2: COOKING -->
            <div class="station-card ${isCookFast ? 'st-fast glow-cyan' : (isPipelined ? 'st-active' : '')}">
              <div class="station-icon">🍳</div>
              <div class="station-title">Step 2: Cooking</div>
              <div class="station-worker">${isPipelined ? '👨‍🍳 Chef Raj (Dedicated)' : '👨‍🍳 Chef Raj'}</div>
              <div class="station-badge ${isCookFast ? 'badge-fast' : (isPipelined ? 'badge-ok' : 'badge-idle')}">
                ${isCookFast ? '⚡ 10s (FAST!)' : (isPipelined ? '✓ Active (20s)' : 'Takes 2 min')}
              </div>
            </div>

            <div class="station-arrow">${isPipelined ? '⏩' : '➡️'}</div>

            <!-- STATION 3: PACKING -->
            <div class="station-card ${isPipelined ? 'st-active' : (isCookFast ? 'st-waiting' : '')}">
              <div class="station-icon">📦</div>
              <div class="station-title">Step 3: Pack Food</div>
              <div class="station-worker">${isPipelined ? '👩‍💼 Dedicated Worker 3' : '👨‍🍳 Chef Raj'}</div>
              <div class="station-badge ${isPipelined ? 'badge-ok' : (isCookFast ? 'badge-wait' : 'badge-idle')}">
                ${isPipelined ? '✓ Active (20s)' : (isCookFast ? '⏳ WAITING (Chef busy)' : 'Sequential')}
              </div>
            </div>

            <div class="station-arrow">${isPipelined ? '⏩' : '➡️'}</div>

            <!-- STATION 4: PAYMENT -->
            <div class="station-card ${isPipelined ? 'st-active' : (isCookFast ? 'st-blocked pulse-danger' : '')}">
              <div class="station-icon">💳</div>
              <div class="station-title">Step 4: Cashier Pay</div>
              <div class="station-worker">${isPipelined ? '🧑‍💼 Dedicated Cashier 4' : '👨‍🍳 Chef Raj'}</div>
              <div class="station-badge ${isPipelined ? 'badge-ok' : (isCookFast ? 'badge-block' : 'badge-idle')}">
                ${isPipelined ? '✓ Active (20s)' : (isCookFast ? '🛑 BLOCKED (Bottleneck!)' : 'Sequential')}
              </div>
            </div>

          </div>

          <!-- DYNAMIC SIMULATION NARRATIVE BANNER -->
          <div class="restaurant-live-narrative">
            ${isCookFast ? `
              <div class="narrative-box warning-narrative pulse-shake">
                <span class="narrative-icon">⚠️</span>
                <div>
                  <strong>Chef Raj is chopping at lightning speed, but orders and cashier lines are frozen!</strong><br>
                  <span class="text-muted">Customers cannot pay and cannot get their food because one person is stuck doing 4 sequential jobs.</span>
                </div>
              </div>
            ` : (isPipelined ? `
              <div class="narrative-box success-narrative glow-green">
                <span class="narrative-icon">✨</span>
                <div>
                  <strong>All 4 stations operate in parallel simultaneously!</strong><br>
                  <span class="text-muted">As Worker 1 takes an order, Chef Raj cooks the next, Worker 3 packs, and Cashier collects payment. A finished order exits every 20 seconds!</span>
                </div>
              </div>
            ` : (isWait ? `
              <div class="narrative-box danger-narrative">
                <span class="narrative-icon">❌</span>
                <div>
                  <strong>Customers left the restaurant!</strong><br>
                  <span class="text-muted">Nobody wants to wait in the heat. Revenue dropped to zero.</span>
                </div>
              </div>
            ` : `
              <div class="narrative-box neutral-narrative">
                <span class="narrative-icon">ℹ️</span>
                <div>
                  <strong>One person doing everything sequentially:</strong><br>
                  <span class="text-muted">Chef Raj takes an order ➔ stops to cook ➔ stops to pack ➔ stops to collect cash. Total time per customer: 10 minutes.</span>
                </div>
              </div>
            `))}
          </div>

        </div>

        <div class="sim-telemetry">
          <div class="stat-pill"><span>Avg Wait Time:</span> <strong>${isPipelined ? '45 seconds' : (isCookFast ? '42 minutes (Long!)' : '10 minutes')}</strong></div>
          <div class="stat-pill"><span>Throughput:</span> <strong class="${isPipelined ? 'text-success' : 'text-warning'}">${isPipelined ? '1 order / 20s (4.5x)' : (isCookFast ? '1 order / 8m (1.1x)' : '1 order / 10m')}</strong></div>
          <div class="stat-pill"><span>Customer Review:</span> <strong>${isPipelined ? '4.9 ⭐ (Delighted)' : (isCookFast ? '1.4 ⭐ (Frustrated)' : '3.0 ⭐')}</strong></div>
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


/**
 * RideQuest - Core Game State & Controller
 * Manages game loop, progression, pedagogical discovery popups, sound cues,
 * Teacher Mode, Codex drawer, and Boss level transitions.
 */

class GameController {
  constructor() {
    this.currentLevelIndex = 0;
    this.xp = 0;
    this.completedLevelIds = new Set();
    this.selectedChoice = null;
    this.simulationEngine = null;
    this.bossCanvas = null;
    this.isTeacherModeOpen = false;
    this.isCodexOpen = false;

    this.init();
  }

  setElementText(id, text) {
    const el = document.getElementById(id);
    if (el) el.innerText = text;
  }

  init() {
    this.loadState();
    this.simulationEngine = new window.SimulationEngine('sim-viewport');
    this.bossCanvas = new window.BossCanvasEngine('boss-canvas-container');
    window.bossCanvas = this.bossCanvas;

    // Pre-render the current level so UI is never blank
    this.loadLevel(this.currentLevelIndex);

    if (this.currentLevelIndex > 0 || this.completedLevelIds.size > 0) {
      const startBtn = document.getElementById('btn-start-journey');
      if (startBtn) startBtn.innerText = "CONTINUE YOUR JOURNEY ➔";
    }
  }

  loadState() {
    try {
      const saved = localStorage.getItem('ridequest_save');
      if (saved) {
        const data = JSON.parse(saved);
        this.currentLevelIndex = data.currentLevelIndex || 0;
        this.xp = data.xp || 0;
        this.completedLevelIds = new Set(data.completedLevelIds || []);
      }
    } catch (e) {
      console.warn('Failed to load state', e);
    }
  }

  saveState() {
    try {
      const data = {
        currentLevelIndex: this.currentLevelIndex,
        xp: this.xp,
        completedLevelIds: Array.from(this.completedLevelIds)
      };
      localStorage.setItem('ridequest_save', JSON.stringify(data));
    } catch (e) {}
  }

  resetProgress() {
    if (confirm("Reset all game progress back to Level 1?")) {
      localStorage.removeItem('ridequest_save');
      this.currentLevelIndex = 0;
      this.xp = 0;
      this.completedLevelIds.clear();
      window.location.reload();
    }
  }

  startGame() {
    try { window.soundEngine?.select?.(); } catch (e) {}
    const landing = document.getElementById('screen-landing');
    const story = document.getElementById('screen-story-intro');
    if (landing) landing.classList.add('hidden');
    if (story) story.classList.remove('hidden');
    try { window.scrollTo({ top: 0, behavior: 'smooth' }); } catch (e) {}
  }

  beginLevel1() {
    try { window.soundEngine?.select?.(); } catch (e) {}
    const story = document.getElementById('screen-story-intro');
    const gameplay = document.getElementById('screen-gameplay');
    if (story) story.classList.add('hidden');
    if (gameplay) gameplay.classList.remove('hidden');
    this.loadLevel(this.currentLevelIndex);
    try { window.scrollTo({ top: 0, behavior: 'smooth' }); } catch (e) {}
  }

  loadLevel(index) {
    if (index >= window.GAME_LEVELS.length) {
      index = window.GAME_LEVELS.length - 1;
    }
    this.currentLevelIndex = index;
    this.selectedChoice = null;
    this.saveState();

    const level = window.GAME_LEVELS[this.currentLevelIndex];

    // Update global UI badges
    this.updateTopBar(level);

    if (level.isBoss) {
      document.getElementById('level-standard-view').classList.add('hidden');
      document.getElementById('level-boss-view').classList.remove('hidden');
      this.bossCanvas.init();
    } else {
      document.getElementById('level-standard-view').classList.remove('hidden');
      document.getElementById('level-boss-view').classList.add('hidden');
      this.renderLevelView(level);
    }

    this.updateTeacherMode();
  }

  updateTopBar(level) {
    const stage = window.GAME_STAGES.find(s => s.id === level.stage);
    this.setElementText('stage-badge-text', stage ? stage.name.toUpperCase() : 'SYSTEM DESIGN');
    this.setElementText('level-indicator-text', level.isBoss ? 'FINAL BOSS' : `Level ${level.id} / 24`);
    this.setElementText('xp-count-val', `${this.xp}`);

    // Stepper dots for the current stage
    const stepperContainer = document.getElementById('stage-stepper-dots');
    if (stepperContainer && stage) {
      stepperContainer.innerHTML = stage.levels.map((lvlId, idx) => {
        const isDone = this.completedLevelIds.has(lvlId);
        const isCurrent = lvlId === level.id;
        const dotClass = isCurrent ? 'dot current' : (isDone ? 'dot done' : 'dot pending');
        const connector = idx < stage.levels.length - 1 ? `<div class="dot-connector ${isDone ? 'active' : ''}"></div>` : '';
        return `<div class="${dotClass}" title="Level ${lvlId}"></div>${connector}`;
      }).join('');
    }

    // Non-jargon challenge topic pill
    this.setElementText('challenge-topic-text', `🎯 Challenge: ${level.topicHint || level.title}`);

    const progressFill = document.getElementById('progress-bar-fill');
    if (progressFill) progressFill.style.width = `${((level.id) / 25) * 100}%`;
  }

  updateCompanionState(state, dialogue) {
    const faceEl = document.getElementById('avatar-face');
    const textEl = document.getElementById('companion-text');
    const compCard = document.getElementById('architect-companion');

    if (compCard) {
      compCard.classList.remove('state-thinking', 'state-observing', 'state-curious', 'state-celebrating');
      compCard.classList.add(`state-${state}`);
    }

    if (faceEl) {
      switch (state) {
        case 'thinking':
          faceEl.innerText = '🧐';
          break;
        case 'observing':
          faceEl.innerText = '👀';
          break;
        case 'curious':
          faceEl.innerText = '🤔';
          break;
        case 'celebrating':
          faceEl.innerText = '🎉';
          break;
        default:
          faceEl.innerText = '🧐';
      }
    }

    if (textEl && dialogue) {
      textEl.innerText = dialogue;
    }
  }

  renderLevelView(level) {
    // Hide all overlays and feedback banners
    const modal = document.getElementById('discovery-modal');
    if (modal) modal.classList.add('hidden');
    const consCard = document.getElementById('consequence-feedback-card');
    if (consCard) consCard.classList.add('hidden');
    const succBanner = document.getElementById('success-feedback-banner');
    if (succBanner) succBanner.classList.add('hidden');
    const whModal = document.getElementById('what-happened-modal');
    if (whModal) whModal.classList.add('hidden');

    this.isEvaluating = false;

    // Fill Situation card
    this.setElementText('lvl-time', level.time);
    this.setElementText('lvl-users', level.usersCount);
    this.setElementText('lvl-title', level.title);
    this.setElementText('lvl-situation', level.situation);
    this.setElementText('lvl-problem', level.problem);

    // Initial character prompt
    this.updateCompanionState('thinking', `“Review the situation carefully. What strategy should we deploy?”`);

    // Render Options
    const optionsContainer = document.getElementById('options-grid');
    if (optionsContainer) {
      optionsContainer.innerHTML = '';

      level.choices.forEach(choice => {
        const btn = document.createElement('div');
        btn.className = 'choice-card';
        btn.id = `choice-opt-${choice.id}`;
        btn.innerHTML = `
          <div class="choice-letter">Option ${choice.id}</div>
          <div class="choice-text">"${choice.text}"</div>
          <div class="choice-action">Test this solution ➔</div>
        `;
        btn.onclick = () => this.makeChoice(choice);
        optionsContainer.appendChild(btn);
      });
    }

    // Initial simulation rendering
    if (this.simulationEngine) {
      this.simulationEngine.render(level, null);
    }
  }

  setChoicesDisabled(disabled) {
    const allCards = document.querySelectorAll('.choice-card');
    allCards.forEach(c => {
      if (disabled) {
        c.classList.add('disabled');
      } else {
        c.classList.remove('disabled');
      }
    });
  }

  makeChoice(choice) {
    if (this.isEvaluating) return;
    this.isEvaluating = true;
    window.soundEngine.click();
    this.selectedChoice = choice;
    const level = window.GAME_LEVELS[this.currentLevelIndex];

    // Lock choices and highlight
    this.setChoicesDisabled(true);

    const allCards = document.querySelectorAll('.choice-card');
    allCards.forEach(c => c.classList.remove('selected', 'optimal', 'suboptimal'));

    const selectedElem = document.getElementById(`choice-opt-${choice.id}`);
    if (selectedElem) {
      selectedElem.classList.add('selected');
      if (choice.isOptimal) {
        selectedElem.classList.add('optimal');
      } else {
        selectedElem.classList.add('suboptimal');
      }
    }

    // Story companion observes
    this.updateCompanionState('observing', `“Testing Option ${choice.id}... Let's observe what happens!”`);

    // Render simulation consequence
    if (this.simulationEngine) {
      this.simulationEngine.render(level, choice);
    }
    this.updateTeacherMode();

    if (!choice.isOptimal) {
      // --- SUBOPTIMAL / WRONG ANSWER FLOW ---
      setTimeout(() => {
        window.soundEngine.overload();
        this.updateCompanionState('curious', `“Hmm... look at what happened! Something else is slowing the system down.”`);
        this.showConsequenceCard(level, choice);
        this.isEvaluating = false;
      }, 1200);
    } else {
      // --- OPTIMAL / CORRECT ANSWER FLOW ---
      setTimeout(() => {
        window.soundEngine.success();
        this.updateCompanionState('celebrating', `“Brilliant! Look what changed! The system is running smoothly!”`);
        this.showSuccessBanner(level, choice);

        setTimeout(() => {
          this.showDiscoveryModal(level, choice);
          this.isEvaluating = false;
        }, 1600);
      }, 1200);
    }
  }

  showConsequenceCard(level, choice) {
    const card = document.getElementById('consequence-feedback-card');
    if (card) {
      card.classList.remove('hidden');
      const wh = choice.whatHappened || {};
      this.setElementText('consequence-title', "Interesting choice! Let's see what happened...");
      this.setElementText('consequence-body', wh.reflectionQuestion || "Did this decision solve the whole system bottleneck?");
    }
  }

  hideConsequenceCard() {
    const card = document.getElementById('consequence-feedback-card');
    if (card) card.classList.add('hidden');
  }

  showSuccessBanner(level, choice) {
    const banner = document.getElementById('success-feedback-banner');
    if (banner) {
      banner.classList.remove('hidden');
      this.setElementText('success-desc-text', choice.successSummary || "The workload is flowing smoothly across the system without bottlenecks!");
    }
  }

  hideSuccessBanner() {
    const banner = document.getElementById('success-feedback-banner');
    if (banner) banner.classList.add('hidden');
  }

  retryLevel() {
    window.soundEngine.click();
    this.hideConsequenceCard();
    this.hideWhatHappenedModal();
    this.setChoicesDisabled(false);

    const allCards = document.querySelectorAll('.choice-card');
    allCards.forEach(c => c.classList.remove('selected', 'optimal', 'suboptimal', 'disabled'));

    this.selectedChoice = null;
    this.isEvaluating = false;

    const level = window.GAME_LEVELS[this.currentLevelIndex];
    this.updateCompanionState('thinking', `“Let's rethink our approach. Which solution should we test next?”`);

    // Reset simulation to clean problem state
    if (this.simulationEngine) {
      this.simulationEngine.render(level, null);
    }
  }

  showWhatHappened() {
    window.soundEngine.click();
    const modal = document.getElementById('what-happened-modal');
    const choice = this.selectedChoice;
    if (modal && choice) {
      modal.classList.remove('hidden');
      this.setElementText('wh-choice-echo', `You tested Option ${choice.id}: "${choice.text}"`);

      const wh = choice.whatHappened || {};
      this.setElementText('wh-helped-text', wh.helped || "This took action on the immediate situation.");
      this.setElementText('wh-bottleneck-text', wh.bottleneck || choice.consequenceText);
      this.setElementText('wh-reflection-prompt', `💡 Architect's Reflection: ${wh.reflectionQuestion || "Did this approach solve the underlying system bottleneck?"}`);
    }
  }

  hideWhatHappenedModal() {
    const modal = document.getElementById('what-happened-modal');
    if (modal) modal.classList.add('hidden');
  }

  showDiscoveryModal(level, choice) {
    const modal = document.getElementById('discovery-modal');
    if (modal) modal.classList.remove('hidden');

    const disc = level.discovery;
    this.setElementText('disc-badge-title', disc.badge);
    this.setElementText('disc-tagline', disc.tagline);
    this.setElementText('disc-analogy', disc.analogy);
    this.setElementText('disc-contrast-a-title', disc.contrast.termA);
    this.setElementText('disc-contrast-a-desc', disc.contrast.descA);
    this.setElementText('disc-contrast-b-title', disc.contrast.termB);
    this.setElementText('disc-contrast-b-desc', disc.contrast.descB);
    this.setElementText('disc-advanced-text', disc.advancedInfo);

    // Reset advanced toggle
    const advPanel = document.getElementById('advanced-panel');
    if (advPanel) advPanel.classList.add('hidden');
    this.setElementText('btn-advanced-toggle', "🔬 Show Advanced Tech Explanation");

    // Award XP if first time
    if (!this.completedLevelIds.has(level.id)) {
      this.completedLevelIds.add(level.id);
      this.xp += 150;
      this.updateTopBar(level);
      this.saveState();
      this.animateXpGain();
    }
  }

  animateXpGain() {
    const xpBadge = document.getElementById('xp-display');
    if (xpBadge) {
      xpBadge.classList.add('pulse-glow');
      setTimeout(() => xpBadge.classList.remove('pulse-glow'), 2000);
    }
  }

  nextLevel() {
    window.soundEngine.select();
    const modal = document.getElementById('discovery-modal');
    if (modal) modal.classList.add('hidden');
    this.hideConsequenceCard();
    this.hideSuccessBanner();
    this.hideWhatHappenedModal();
    this.setChoicesDisabled(false);
    this.selectedChoice = null;
    this.isEvaluating = false;

    this.loadLevel(this.currentLevelIndex + 1);
  }

  testLbStrategy(strategyId) {
    const level = window.GAME_LEVELS[this.currentLevelIndex];
    const choice = level.choices.find(c => c.id === strategyId);
    if (choice) {
      this.simulationEngine.render(level, choice);
    }
  }

  toggleTeacherMode() {
    window.soundEngine.click();
    this.isTeacherModeOpen = !this.isTeacherModeOpen;
    const drawer = document.getElementById('teacher-drawer');
    if (this.isTeacherModeOpen) {
      drawer.classList.remove('hidden');
      this.updateTeacherMode();
    } else {
      drawer.classList.add('hidden');
    }
  }

  updateTeacherMode() {
    if (!this.isTeacherModeOpen) return;
    const level = window.GAME_LEVELS[this.currentLevelIndex];
    if (level.isBoss) {
      document.getElementById('teach-level-title').innerText = "Final Boss: Architectural Blueprint Construction";
      document.getElementById('teach-concept-revealed').innerText = "Complete System Synthesis (All 24 Concepts combined)";
      document.getElementById('teach-experience').innerText = "Students must assemble users, edge caching, load balancing, microservices, caches, and database replication into a working platform.";
      document.getElementById('teach-realworld').innerText = "Production ride-hailing architecture of Ola / Uber / Grab handling 500k req/s.";
      document.getElementById('teach-question').innerText = "What trade-offs did you make between cost and 99.999% reliability?";
      return;
    }

    document.getElementById('teach-level-title').innerText = `Level ${level.id}: ${level.title}`;
    document.getElementById('teach-concept-revealed').innerText = level.discovery.badge;
    document.getElementById('teach-experience').innerText = level.discovery.teacherNotes.experience;
    document.getElementById('teach-realworld').innerText = level.discovery.teacherNotes.realWorld;
    document.getElementById('teach-question').innerText = level.discovery.teacherNotes.question;

    // Student choice telemetry
    const choiceInfo = document.getElementById('teach-student-choice');
    if (this.selectedChoice) {
      choiceInfo.innerHTML = `
        <span class="${this.selectedChoice.isOptimal ? 'text-success' : 'text-warning'}">
          Student chose Option ${this.selectedChoice.id}: "${this.selectedChoice.text}"
          (${this.selectedChoice.isOptimal ? 'Optimal architectural decision' : 'Suboptimal / Common misconception'})
        </span>
      `;
    } else {
      choiceInfo.innerHTML = `<span class="text-muted">Student is currently thinking and reviewing options...</span>`;
    }

    // Populate Level Jump select
    const select = document.getElementById('teach-jump-select');
    if (select && select.children.length === 0) {
      window.GAME_LEVELS.forEach((lvl, idx) => {
        const opt = document.createElement('option');
        opt.value = idx;
        opt.innerText = lvl.isBoss ? "Final Boss: Build RideQuest" : `Level ${lvl.id}: ${lvl.title}`;
        select.appendChild(opt);
      });
      select.value = this.currentLevelIndex;
      select.onchange = (e) => {
        this.loadLevel(parseInt(e.target.value));
      };
    } else if (select) {
      select.value = this.currentLevelIndex;
    }
  }

  toggleCodex() {
    window.soundEngine.click();
    this.isCodexOpen = !this.isCodexOpen;
    const drawer = document.getElementById('codex-drawer');
    if (this.isCodexOpen) {
      drawer.classList.remove('hidden');
      this.renderCodex();
    } else {
      drawer.classList.add('hidden');
    }
  }

  renderCodex() {
    const list = document.getElementById('codex-list');
    list.innerHTML = '';

    window.GAME_LEVELS.slice(0, 24).forEach(lvl => {
      const isUnlocked = this.completedLevelIds.has(lvl.id);
      const card = document.createElement('div');
      card.className = `codex-card ${isUnlocked ? 'unlocked' : 'locked'}`;
      card.innerHTML = `
        <div class="codex-num">Level ${lvl.id}</div>
        <div class="codex-title">${isUnlocked ? lvl.discovery.badge : '🔒 Mystery Concept'}</div>
        <div class="codex-desc">${isUnlocked ? lvl.discovery.tagline : 'Complete this level challenge to unlock and discover this concept.'}</div>
        ${isUnlocked ? `<div class="codex-analogy">💡 <em>"${lvl.discovery.analogy}"</em></div>` : ''}
      `;
      list.appendChild(card);
    });
  }

  showVictoryScreen() {
    document.getElementById('screen-gameplay').classList.add('hidden');
    document.getElementById('screen-victory').classList.remove('hidden');
  }

  toggleSound() {
    const isMuted = window.soundEngine.toggleMute();
    document.getElementById('btn-sound-toggle').innerText = isMuted ? '🔇 Sound Off' : '🔊 Sound On';
  }
}

window.GameController = GameController;

window.startGame = function() {
  if (window.game) {
    window.game.startGame();
  } else {
    document.getElementById('screen-landing')?.classList.add('hidden');
    document.getElementById('screen-story-intro')?.classList.remove('hidden');
    try { window.scrollTo({ top: 0, behavior: 'smooth' }); } catch (e) {}
  }
};

window.beginLevel1 = function() {
  if (window.game) {
    window.game.beginLevel1();
  } else {
    document.getElementById('screen-story-intro')?.classList.add('hidden');
    document.getElementById('screen-gameplay')?.classList.remove('hidden');
    try { window.scrollTo({ top: 0, behavior: 'smooth' }); } catch (e) {}
  }
};

function initRideQuest() {
  if (!window.game) {
    try {
      window.game = new GameController();
      console.log('RideQuest Engine initialized successfully!');
    } catch (e) {
      console.error('Failed to initialize GameController:', e);
    }
  }
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initRideQuest);
} else {
  initRideQuest();
}


