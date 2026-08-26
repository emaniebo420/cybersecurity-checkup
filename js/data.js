// ---------------------------------------------------------------------------
// Data: categories, questions, options (each option carries a score 0-3)
// Written in plain, everyday language — no tech jargon required to understand.
// ---------------------------------------------------------------------------
const CATEGORIES = [
  {
    id: "passwords",
    title: "Passwords",
    icon: "lock",
    blurb: "The secret codes you use to log in to your accounts.",
    questions: [
      {
        q: "When you sign up for a new account (Facebook, email, apps), how do you usually pick a password?",
        options: [
          { t: "I use a password I already use somewhere else", s: 0 },
          { t: "I use an old password but change it a little (like adding a number)", s: 1 },
          { t: "I make up a new one each time, and I remember it myself", s: 2 },
          { t: "I let an app create a random one for me and save it there", s: 3 },
        ],
      },
      {
        q: "Where do you keep your passwords so you don't forget them?",
        options: [
          { t: "In my head, or written on paper / in my phone's Notes app", s: 0 },
          { t: "My browser (Chrome/Safari) remembers them for me", s: 1 },
          { t: "I use a password-saving app, but not for every account", s: 2 },
          { t: "I use a password-saving app for all my accounts", s: 3 },
        ],
      },
      {
        q: "Do you use the SAME password for more than one account, especially important ones like your email or GCash?",
        options: [
          { t: "Yes, I use the same password for most of my accounts", s: 0 },
          { t: "Yes, but only for a few similar, less important accounts", s: 1 },
          { t: "Mostly different, except one or two old accounts", s: 2 },
          { t: "No, every account has its own different password", s: 3 },
        ],
      },
    ],
  },
  {
    id: "mfa",
    title: "Two-Step Verification",
    icon: "shield",
    blurb: "The extra code or fingerprint check you do after typing your password.",
    questions: [
      {
        q: "When you log in to your email, does it ever ask for a code sent to your phone, or ask you to confirm on another device, in addition to your password?",
        options: [
          { t: "No, it only ever asks for my password", s: 0 },
          { t: "I'm not sure / I never checked", s: 0 },
          { t: "Yes, it sends a code by text message (SMS)", s: 2 },
          { t: "Yes, I use an authenticator app or my fingerprint/face", s: 3 },
        ],
      },
      {
        q: "When an app (bank, Facebook, work account) offers to turn on this extra login step, what do you usually do?",
        options: [
          { t: "I skip it, it feels like too much extra work", s: 0 },
          { t: "I only turn it on if the app forces me to", s: 1 },
          { t: "I turn it on for my most important accounts", s: 2 },
          { t: "I turn it on for every account that offers it", s: 3 },
        ],
      },
      {
        q: "One day you get a text with a login code, or a 'Was this you?' notification — but you weren't trying to log in anywhere. What do you do?",
        options: [
          { t: "I approve it / share the code anyway, just to make the message stop", s: 0 },
          { t: "I ignore it and don't do anything else", s: 1 },
          { t: "I say no / deny it, and check if anyone tried to get into my account", s: 2 },
          { t: "I deny it, immediately change my password, and check recent logins", s: 3 },
        ],
      },
    ],
  },
  {
    id: "phishing",
    title: "Scam & Fake Message Awareness",
    icon: "mail",
    blurb: "Spotting fake texts, emails, and messages designed to trick you.",
    questions: [
      {
        q: "You get a message saying 'Your account will be closed today, click here now to fix it!' What do you usually do?",
        options: [
          { t: "Click the link right away so I don't lose my account", s: 0 },
          { t: "Click the link, then check if the page looks legit once it loads", s: 1 },
          { t: "Look closely at who sent it and where the link goes before deciding", s: 2 },
          { t: "Ignore the link completely, and check my account directly through the official app", s: 3 },
        ],
      },
      {
        q: "Before clicking a link in a message, how closely do you check who actually sent it?",
        options: [
          { t: "I don't really check — if the name/logo looks familiar, that's enough for me", s: 0 },
          { t: "I glance at it sometimes, but not every time", s: 1 },
          { t: "I usually check the link address before tapping it", s: 2 },
          { t: "I always double-check the sender and the link before clicking, every time", s: 3 },
        ],
      },
      {
        q: "Someone messages you pretending to be a friend or relative, asking you to send money or share a code sent to your phone. What's your usual reaction?",
        options: [
          { t: "I send it if the story sounds urgent enough", s: 0 },
          { t: "I ask a few questions in the same chat first, then decide", s: 1 },
          { t: "I get suspicious, but I don't always double-check", s: 2 },
          { t: "I call or message them another way (like a phone call) to make sure it's really them, before doing anything", s: 3 },
        ],
      },
    ],
  },
  {
    id: "updates",
    title: "Keeping Apps & Phone Updated",
    icon: "refresh",
    blurb: "Installing the update notifications your phone and computer show you.",
    questions: [
      {
        q: "When your phone or computer says 'Update available,' what do you usually do?",
        options: [
          { t: "I delay it for weeks or months", s: 0 },
          { t: "I install it eventually, whenever I remember", s: 1 },
          { t: "I install important-looking updates fairly quickly", s: 2 },
          { t: "Updates install automatically, or I install them right away", s: 3 },
        ],
      },
      {
        q: "Do you have any antivirus or protection app running on your device?",
        options: [
          { t: "No protection that I know of", s: 0 },
          { t: "I'm not sure what's installed on my device", s: 1 },
          { t: "Just the built-in protection that came with the device", s: 2 },
          { t: "Built-in protection, kept updated, and I scan every so often", s: 3 },
        ],
      },
      {
        q: "Where do you usually download apps or software from?",
        options: [
          { t: "Wherever a link takes me — including free/cracked versions of paid apps", s: 0 },
          { t: "Mostly official app stores, but sometimes other websites too", s: 1 },
          { t: "Almost always the official app store or the company's own website", s: 2 },
          { t: "Only official sources, and I check what permissions the app is asking for", s: 3 },
        ],
      },
    ],
  },
  {
    id: "privacy",
    title: "Privacy & Sharing Info Online",
    icon: "eye",
    blurb: "Who can see your posts, personal details, and location.",
    questions: [
      {
        q: "Who can see your posts and personal details (birthday, address, phone number) on Facebook or other social media?",
        options: [
          { t: "Public — I haven't checked my privacy settings", s: 0 },
          { t: "Mostly public, with a few things set to private", s: 1 },
          { t: "Friends-only, or a private account", s: 2 },
          { t: "Friends-only, and I avoid posting sensitive personal details at all", s: 3 },
        ],
      },
      {
        q: "When an app asks for permission to use your location, contacts, or microphone, what do you usually do?",
        options: [
          { t: "I just tap 'Allow' to get it over with", s: 0 },
          { t: "I only think about it if something feels off", s: 1 },
          { t: "I usually check, and say no to things that seem unnecessary", s: 2 },
          { t: "I review every permission request and turn off what the app doesn't really need", s: 3 },
        ],
      },
      {
        q: "Do you use free public Wi-Fi (mall, cafe, airport) to check your bank account or GCash?",
        options: [
          { t: "Yes, whatever I need to do, without thinking twice", s: 0 },
          { t: "Sometimes, if I'm in a hurry", s: 1 },
          { t: "I avoid logging into anything sensitive on public Wi-Fi", s: 2 },
          { t: "I never do sensitive things on public Wi-Fi, or I use a VPN app when I must", s: 3 },
        ],
      },
    ],
  },
  {
    id: "backup",
    title: "Backing Up Your Files",
    icon: "drive",
    blurb: "What happens to your photos and files if your phone breaks or gets stolen.",
    questions: [
      {
        q: "Do you have a copy of your important photos and files saved somewhere else (like Google Drive, another device, or a hard drive)?",
        options: [
          { t: "No — everything is only on one device", s: 0 },
          { t: "I back up sometimes, but not regularly", s: 1 },
          { t: "Some things back up automatically (like photos)", s: 2 },
          { t: "Everything important backs up automatically, and I've tested that it actually works", s: 3 },
        ],
      },
      {
        q: "If your phone or laptop got lost or stolen right now, how ready are you?",
        options: [
          { t: "No lock screen password, and I wouldn't know how to remotely lock or erase it", s: 0 },
          { t: "It has a lock screen, but that's it", s: 1 },
          { t: "It has a lock screen, and I know how to find/lock it remotely", s: 2 },
          { t: "Lock screen, I know how to remotely erase it, and my files are already backed up elsewhere", s: 3 },
        ],
      },
      {
        q: "If you forgot your password, do you know if your 'recovery' email or phone number (used to reset your account) is still correct and working?",
        options: [
          { t: "No idea — I haven't checked in years", s: 0 },
          { t: "Not sure, it's probably outdated", s: 1 },
          { t: "I checked a while ago", s: 2 },
          { t: "I checked recently and made sure it's up to date", s: 3 },
        ],
      },
    ],
  },
  {
    id: "network",
    title: "Home Wi-Fi & Devices",
    icon: "wifi",
    blurb: "Your home internet router and how you keep your devices secure day-to-day.",
    questions: [
      {
        q: "Have you ever changed the admin password of your home Wi-Fi router (the settings page, not the Wi-Fi password guests use)?",
        options: [
          { t: "No, it's still the factory-default password", s: 0 },
          { t: "Not sure — someone else set it up for me", s: 1 },
          { t: "Yes, I changed it once", s: 2 },
          { t: "Yes, and I also keep the router's software updated", s: 3 },
        ],
      },
      {
        q: "Do you know if your home Wi-Fi has a strong, unique password, or is it something simple/shared with everyone?",
        options: [
          { t: "No idea, never checked", s: 0 },
          { t: "It's open (no password) or a very old, weak type of security", s: 0 },
          { t: "It has a password, but it's simple or shared with everyone", s: 2 },
          { t: "It has a strong, unique password that's not easy to guess", s: 3 },
        ],
      },
      {
        q: "Do you lock your phone or laptop screen when you step away, even for a short while?",
        options: [
          { t: "Rarely — I usually leave it unlocked", s: 0 },
          { t: "Sometimes, depends where I am", s: 1 },
          { t: "Usually, yes", s: 2 },
          { t: "Always, and it locks itself automatically after a short time", s: 3 },
        ],
      },
    ],
  },
];

const MAX_PER_Q = 3;
const TOTAL_QUESTIONS = CATEGORIES.reduce((n, c) => n + c.questions.length, 0);
const MAX_SCORE = TOTAL_QUESTIONS * MAX_PER_Q;

const RISK_LEVELS = [
  { max: 40, label: "High Risk", color: "#E2544B", glow: "rgba(226,84,75,0.16)", msg: "Your habits leave several easy openings for common online scams and attacks. Start with the recommendations below — they matter the most." },
  { max: 65, label: "Moderate Risk", color: "#E8A33D", glow: "rgba(232,163,61,0.16)", msg: "You already have some good habits, but there are real gaps left. A few simple changes will make a big difference." },
  { max: 85, label: "Low Risk", color: "#7FBF7F", glow: "rgba(127,191,127,0.14)", msg: "Your overall habits are solid. Just tighten up the few weak spots below to get even safer." },
  { max: 100, label: "Very Low Risk", color: "#3ED9A3", glow: "rgba(62,217,163,0.16)", msg: "Strong, consistent habits across the board. Keep it up, and check in again every so often." },
];

function riskFor(pct) {
  return RISK_LEVELS.find((r) => pct <= r.max) || RISK_LEVELS[RISK_LEVELS.length - 1];
}

const RECS = {
  passwords: [
    "Use a free password-saving app (like Bitwarden or Google Password Manager) to create and remember a different password for every account.",
    "Never reuse the same password across your email, banking, and social media — if one gets leaked, all of them become easy targets.",
    "Start with your email and banking accounts — give those a brand-new password that you don't use anywhere else.",
  ],
  mfa: [
    "Turn on two-step verification for your email first — it's usually the key that can unlock all your other accounts.",
    "If you can choose, prefer an authenticator app or fingerprint/face check over text-message codes, which scammers can sometimes intercept.",
    "If you ever get a login code or approval request you didn't ask for, treat it as a warning sign — say no, and change that password right away.",
  ],
  phishing: [
    "Never click links in messages that create urgency ('act now or lose your account') — open the official app yourself instead of clicking the link.",
    "Before clicking any link, check who actually sent it and where the link goes — every single time, not just when something feels off.",
    "If someone asks for money or a code through chat, always confirm by calling them directly before doing anything.",
  ],
  updates: [
    "Turn on automatic updates for your phone and apps, so important fixes install without you having to remember.",
    "Keep your device's built-in protection (like Google Play Protect or Windows Defender) turned on and updated.",
    "Only download apps from the official app store or the company's real website — avoid free/cracked versions of paid software.",
  ],
  privacy: [
    "Go into your social media privacy settings and limit who can see personal details like your birthday, address, and phone number.",
    "Say no to app permissions that don't make sense for what the app does (a game app doesn't need your contacts list).",
    "Avoid logging into your bank or GCash while on public Wi-Fi — use your mobile data instead, or a VPN app if you must use public Wi-Fi.",
  ],
  backup: [
    "Set up automatic backup for your photos and important files (Google Photos, Google Drive, or an external drive), and check once that restoring a file actually works.",
    "Turn on 'Find My Device' or 'Find My iPhone' so a lost phone isn't a lost life — you can lock or erase it remotely.",
    "Take five minutes today to update the recovery email and phone number on your important accounts.",
  ],
  network: [
    "Log in to your home router's settings and change the admin password if it's still the factory default.",
    "Make sure your home Wi-Fi has a strong, unique password — not something simple like your address or phone number.",
    "Set your phone and laptop to lock automatically after a short time, so stepping away for a moment doesn't leave it wide open.",
  ],
};
