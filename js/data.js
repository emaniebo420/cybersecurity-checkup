// ---------------------------------------------------------------------------
// Data: categories, questions, options (each option carries a score 0-3)
// ---------------------------------------------------------------------------
const CATEGORIES = [
  {
    id: "passwords",
    title: "Passwords",
    icon: "lock",
    blurb: "How you create and manage your passwords.",
    questions: [
      {
        q: "How do you usually create passwords for new accounts?",
        options: [
          { t: "I reuse one or two passwords I already know", s: 0 },
          { t: "I tweak an old password slightly (add a number/symbol)", s: 1 },
          { t: "I make a unique password each time, from memory", s: 2 },
          { t: "I let a password manager generate a unique, random one", s: 3 },
        ],
      },
      {
        q: "Where do you keep track of your passwords?",
        options: [
          { t: "I just remember them, or write them on paper/notes app", s: 0 },
          { t: "Saved in my browser only", s: 1 },
          { t: "A password manager, but I don't use it for everything", s: 2 },
          { t: "A dedicated password manager for all accounts", s: 3 },
        ],
      },
      {
        q: "How often do critical accounts (email, banking) share a password with something else?",
        options: [
          { t: "Same password across most of my accounts", s: 0 },
          { t: "Same password for a few similar accounts", s: 1 },
          { t: "Mostly unique, except one or two old accounts", s: 2 },
          { t: "Every account has its own password", s: 3 },
        ],
      },
    ],
  },
  {
    id: "mfa",
    title: "Multi-Factor Authentication",
    icon: "shield",
    blurb: "Extra verification steps beyond your password.",
    questions: [
      {
        q: "Do you use MFA (OTP, authenticator app, biometrics) on your email account?",
        options: [
          { t: "No, password only", s: 0 },
          { t: "Not sure / never checked", s: 0 },
          { t: "Yes, SMS-based OTP", s: 2 },
          { t: "Yes, an authenticator app or security key", s: 3 },
        ],
      },
      {
        q: "Do you enable MFA on banking, social media, or work accounts when it's offered?",
        options: [
          { t: "Almost never, feels like extra hassle", s: 0 },
          { t: "Only when the account forces me to", s: 1 },
          { t: "On the important ones", s: 2 },
          { t: "On every account that supports it", s: 3 },
        ],
      },
      {
        q: "If you got an unexpected MFA/OTP prompt you didn't request, what would you do?",
        options: [
          { t: "Approve it anyway to make the prompt go away", s: 0 },
          { t: "Ignore it and do nothing else", s: 1 },
          { t: "Deny it and check my account activity", s: 2 },
          { t: "Deny it, change my password, and review recent logins", s: 3 },
        ],
      },
    ],
  },
  {
    id: "phishing",
    title: "Phishing Awareness",
    icon: "mail",
    blurb: "Spotting scams, fake links, and social engineering.",
    questions: [
      {
        q: "You get an urgent email/SMS saying your account will be suspended unless you click a link now. What do you do?",
        options: [
          { t: "Click it right away to avoid losing my account", s: 0 },
          { t: "Click it but check the site once loaded", s: 1 },
          { t: "Check the sender/URL closely, then decide", s: 2 },
          { t: "Ignore the link, log in directly via the official app/site", s: 3 },
        ],
      },
      {
        q: "How closely do you check sender addresses and links before clicking?",
        options: [
          { t: "I don't really check, I trust the message name/logo", s: 0 },
          { t: "I glance at it sometimes", s: 1 },
          { t: "I usually hover/preview the link first", s: 2 },
          { t: "I always verify sender domain and URL before clicking", s: 3 },
        ],
      },
      {
        q: "Someone messages you pretending to be a friend or relative asking for money or an OTP code. What's your habit?",
        options: [
          { t: "Send it if the story sounds urgent enough", s: 0 },
          { t: "Ask a few questions in the same chat, then decide", s: 1 },
          { t: "Usually suspicious, but don't always verify", s: 2 },
          { t: "Call/verify through another channel before doing anything", s: 3 },
        ],
      },
    ],
  },
  {
    id: "updates",
    title: "Software & Updates",
    icon: "refresh",
    blurb: "Keeping your OS, apps, and antivirus current.",
    questions: [
      {
        q: "How do you handle OS/app updates on your phone and computer?",
        options: [
          { t: "I postpone updates for weeks or months", s: 0 },
          { t: "I install them eventually, when I remember", s: 1 },
          { t: "I install important ones fairly quickly", s: 2 },
          { t: "Auto-update is on, or I install promptly", s: 3 },
        ],
      },
      {
        q: "Do you run any antivirus/anti-malware or rely on built-in OS protection?",
        options: [
          { t: "No protection that I know of", s: 0 },
          { t: "Not sure what's installed", s: 1 },
          { t: "Built-in protection (e.g. Windows Defender) only", s: 2 },
          { t: "Built-in protection plus I keep it updated and scan periodically", s: 3 },
        ],
      },
      {
        q: "Where do you get apps/software from?",
        options: [
          { t: "Wherever a download link takes me, including cracked versions", s: 0 },
          { t: "Mostly official stores, sometimes third-party sites", s: 1 },
          { t: "Official app stores / vendor sites almost always", s: 2 },
          { t: "Official sources only, and I check permissions before installing", s: 3 },
        ],
      },
    ],
  },
  {
    id: "privacy",
    title: "Privacy & Data Sharing",
    icon: "eye",
    blurb: "What you share, and who can see it.",
    questions: [
      {
        q: "Who can see your social media posts and personal details (birthday, location, phone number)?",
        options: [
          { t: "Public, I haven't checked my privacy settings", s: 0 },
          { t: "Mostly public, some things restricted", s: 1 },
          { t: "Friends-only or a private account", s: 2 },
          { t: "Friends-only, and I limit what personal info is posted at all", s: 3 },
        ],
      },
      {
        q: "How do you handle app permission requests (location, contacts, microphone)?",
        options: [
          { t: "I accept whatever's asked to get it over with", s: 0 },
          { t: "I only look if something feels off", s: 1 },
          { t: "I check most of the time and deny what seems unnecessary", s: 2 },
          { t: "I review and restrict permissions for every app I install", s: 3 },
        ],
      },
      {
        q: "Do you use public Wi-Fi (malls, cafes, airports) for sensitive things like banking?",
        options: [
          { t: "Yes, whatever I need, without thinking twice", s: 0 },
          { t: "Sometimes, if I'm in a hurry", s: 1 },
          { t: "I avoid sensitive logins on public Wi-Fi", s: 2 },
          { t: "I avoid it entirely, or use a VPN when I must connect", s: 3 },
        ],
      },
    ],
  },
  {
    id: "backup",
    title: "Backup & Recovery",
    icon: "drive",
    blurb: "What happens if a device is lost, stolen, or hit by ransomware.",
    questions: [
      {
        q: "Do you have backups of important files (photos, documents)?",
        options: [
          { t: "No backups, everything's only on one device", s: 0 },
          { t: "Occasional manual backup, not on schedule", s: 1 },
          { t: "Automatic cloud backup for some things", s: 2 },
          { t: "Automatic backup covering all important data, tested occasionally", s: 3 },
        ],
      },
      {
        q: "If your phone or laptop is lost or stolen right now, how prepared are you?",
        options: [
          { t: "No lock screen / no idea how to remote-wipe it", s: 0 },
          { t: "Lock screen only", s: 1 },
          { t: "Lock screen plus I know how to locate/lock it remotely", s: 2 },
          { t: "Lock screen, remote wipe set up, and recent backups exist", s: 3 },
        ],
      },
      {
        q: "Do you know your account recovery options (recovery email/phone) are current?",
        options: [
          { t: "No idea, haven't checked in years", s: 0 },
          { t: "Not sure, probably outdated", s: 1 },
          { t: "Checked a while ago", s: 2 },
          { t: "Verified recently and kept current", s: 3 },
        ],
      },
    ],
  },
  {
    id: "network",
    title: "Network & Devices",
    icon: "wifi",
    blurb: "Router, home Wi-Fi, and connected devices.",
    questions: [
      {
        q: "Have you changed your home Wi-Fi router's default admin password?",
        options: [
          { t: "No, still the factory default", s: 0 },
          { t: "Not sure / someone else set it up", s: 1 },
          { t: "Yes, changed it once", s: 2 },
          { t: "Yes, and I keep router firmware updated too", s: 3 },
        ],
      },
      {
        q: "What encryption/network name setup does your home Wi-Fi use?",
        options: [
          { t: "No idea, never checked", s: 0 },
          { t: "Open network or very old security (WEP)", s: 0 },
          { t: "WPA2 with a shared password", s: 2 },
          { t: "WPA2/WPA3 with a strong unique password", s: 3 },
        ],
      },
      {
        q: "Do you lock your phone/laptop screen when stepping away, even briefly?",
        options: [
          { t: "Rarely, I leave it unlocked", s: 0 },
          { t: "Sometimes, depends where I am", s: 1 },
          { t: "Usually", s: 2 },
          { t: "Always, and auto-lock is set to a short timeout", s: 3 },
        ],
      },
    ],
  },
];

const MAX_PER_Q = 3;
const TOTAL_QUESTIONS = CATEGORIES.reduce((n, c) => n + c.questions.length, 0);
const MAX_SCORE = TOTAL_QUESTIONS * MAX_PER_Q;

const RISK_LEVELS = [
  { max: 40, label: "High Risk", color: "#E2544B", glow: "rgba(226,84,75,0.16)", msg: "Your habits leave several open doors for common attacks. Start with the top recommendations below — they matter most." },
  { max: 65, label: "Moderate Risk", color: "#E8A33D", glow: "rgba(232,163,61,0.16)", msg: "You have some good habits, but real gaps remain. A few targeted changes will meaningfully lower your exposure." },
  { max: 85, label: "Low Risk", color: "#7FBF7F", glow: "rgba(127,191,127,0.14)", msg: "Solid overall posture. Tighten the remaining weak spots to close the gap to best practice." },
  { max: 100, label: "Very Low Risk", color: "#3ED9A3", glow: "rgba(62,217,163,0.16)", msg: "Strong, consistent security habits across the board. Keep it up and revisit periodically." },
];

function riskFor(pct) {
  return RISK_LEVELS.find((r) => pct <= r.max) || RISK_LEVELS[RISK_LEVELS.length - 1];
}

const RECS = {
  passwords: [
    "Use a password manager (Bitwarden, 1Password) to generate and store a unique password per account.",
    "Never reuse a password across email, banking, and social accounts — email is the master key to everything else.",
    "Turn old shared passwords into unique ones, starting with your email and financial accounts.",
  ],
  mfa: [
    "Turn on MFA for your email first — it's the recovery path for most other accounts.",
    "Prefer an authenticator app or security key over SMS OTP, which can be intercepted via SIM-swap.",
    "Treat any MFA prompt you didn't trigger as a signed-in attacker — deny it and change your password immediately.",
  ],
  phishing: [
    "Never click links in unexpected 'urgent' messages — open the official app or type the URL yourself instead.",
    "Check the sender's actual email domain and hover over links before clicking, every time.",
    "Verify money or OTP requests from contacts through a separate channel (call them) before acting.",
  ],
  updates: [
    "Turn on automatic updates for your OS and apps so patches install without you having to remember.",
    "Keep at least the OS's built-in protection (Defender/XProtect) active and updated.",
    "Only install software from official app stores or vendor sites — avoid cracked or third-party download links.",
  ],
  privacy: [
    "Review your social media privacy settings and restrict who can see personal details like birthday and phone number.",
    "Deny app permissions that aren't needed for the app's core purpose (e.g. a flashlight app asking for contacts).",
    "Avoid logging into banking or email on public Wi-Fi; use mobile data or a VPN instead.",
  ],
  backup: [
    "Set up automatic backups (cloud or external drive) for photos and important documents, and test restoring a file.",
    "Enable remote lock/wipe (Find My Device / Find My iPhone) so a lost device isn't a lost life.",
    "Update your recovery email and phone number on your key accounts today — it's a five-minute task.",
  ],
  network: [
    "Log into your router and change the default admin password if you haven't already.",
    "Set your Wi-Fi to WPA2 or WPA3 with a strong, unique passphrase — avoid open or WEP networks.",
    "Set a short auto-lock timeout on your phone and laptop so an unattended device isn't an open device.",
  ],
};
