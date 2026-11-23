import { ENVISIONING_LESSONS } from "./envisioningLessons";
export interface LessonData {
  id: string;
  title: string;
  category: string;
  readingTime: string;
  scriptureFocus: { reference: string; text: string };
  objectives: string[];
  teachingSections: { id: string; number: number; title: string; paragraphs: string[] }[];
  reflectionQuestions: string[];
  prayer: string;
  challenge: string;
}

export const LESSONS: LessonData[] = [
  {
    id: "lesson-1",
    title: "Lesson 1: The Good News of Salvation According to JESUS",
    category: "Evangelism",
    readingTime: "7 min read",
    scriptureFocus: {
      reference: "John 3:16 (NIV)",
      text: "For GOD so loved the world that he gave his one and only Son, that whoever believes in him shall not perish but have eternal life."
    },
    objectives: [
      "Understand the depth of GOD'S love for humanity.",
      "Recognize the necessity of JESUS CHRIST for salvation.",
      "Learn what it means to believe and receive eternal life."
    ],
    teachingSections: [
      {
        id: "teaching-1",
        number: 1,
        title: "The Reality of Our Separation",
        paragraphs: [
          "Before we can truly appreciate the good news of salvation, we must first understand the reality of our condition. The Bible teaches that every human being has sinned and fallen short of GOD'S glorious standard (Romans 3:23). This sin creates a profound separation between us and a perfectly holy GOD.",
          "Our attempts to bridge this gap through good deeds, morality, or religion will always fall short. We are in need of a rescue plan that we cannot execute ourselves."
        ]
      },
      {
        id: "teaching-2",
        number: 2,
        title: "GOD'S Ultimate Provision",
        paragraphs: [
          "In the face of our inability to save ourselves, GOD acted out of immense love. The giving of His 'one and only Son' demonstrates the supreme value GOD places on us. JESUS stepped into our reality, taking on human flesh, to live the perfect life we couldn't live.",
          "On the cross, JESUS took the penalty of our sin upon Himself. The 'wages of sin is death' (Romans 6:23), and JESUS paid that wage in full."
        ]
      },
      {
        id: "teaching-3",
        number: 3,
        title: "The Requirement of Belief",
        paragraphs: [
          "While the provision for salvation is complete, it is not automatically applied to everyone. The verse clearly states 'whoever believes in him.' Biblical belief is more than just intellectual agreement; it is active trust and surrender.",
          "To believe means to place the full weight of your life on JESUS CHRIST as your SAVIOR and LORD. It is turning away from a life of self-direction and turning toward a life directed by GOD."
        ]
      }
    ],
    reflectionQuestions: [
      "What comes to mind when you hear the word 'salvation'?",
      "How does understanding the problem of sin change your view of JESUS' sacrifice?",
      "What does it mean for you personally to 'believe in Him'?",
      "Are there areas of your life where you are still trying to 'earn' GOD'S love rather than receiving it as a gift?"
    ],
    prayer: "LORD JESUS, thank You for loving me enough to die on the cross for my sins. I acknowledge that I am a sinner in need of a SAVIOR. I realize I cannot earn my way to heaven. I turn away from my old life and put my full faith in You. Please forgive me, cleanse me, and lead me from this day forward as my LORD and SAVIOR. Amen.",
    challenge: "Share the truth of John 3:16 with one person this week, or write down your own salvation testimony."
  },
  {
    id: "lesson-2",
    title: "Lesson 2: The Good News of Salvation According to the Apostle Paul",
    category: "Evangelism",
    readingTime: "8 min read",
    scriptureFocus: {
      reference: "Romans 3:23 & 6:23 (NIV)",
      text: "For all have sinned and fall short of the glory of GOD... For the wages of sin is death, but the gift of GOD is eternal life in CHRIST JESUS our LORD."
    },
    objectives: [
      "To understand the Apostle Paul’s explanation of the Good News.",
      "To understand that though all humanity has sinned and deserves death, GOD offers the free gift of eternal life through repentance and faith in CHRIST JESUS."
    ],
    teachingSections: [
      {
        id: "teaching-2-intro",
        number: 1,
        title: "Introduction",
        paragraphs: [
          "To truly appreciate GOD’S gift of salvation, we must first understand what life looks like apart from Him.",
          "The Apostle Paul presents the reality of our condition and the divine solution that brings us back to GOD.",
          "Though GOD has every right to judge us, He also works powerfully for our salvation and lovingly calls for our proper response of repentance and faith."
        ]
      },
      {
        id: "teaching-2-1",
        number: 2,
        title: "All Have Sinned and Fall Short of GOD’S Glory",
        paragraphs: [
          "“For all have sinned and fall short of the glory of GOD.” — Romans 3:23 (NIV)",
          "No human being — except CHRIST Himself — can claim to be sinless. We have all failed to meet GOD’S perfect standard of holiness. To “fall short” means we miss the mark of His glory and righteousness.",
          "This truth humbles us before GOD and reminds us that salvation cannot be earned by good works, religious effort, or moral performance. We are all equally in need of grace."
        ]
      },
      {
        id: "teaching-2-2",
        number: 3,
        title: "The Wages of Sin Is Death",
        paragraphs: [
          "“For the wages of sin is death…” — Romans 6:23 (NIV)",
          "Because GOD is just, sin demands payment. The cost of sin is death — separation from GOD.",
          "Paul describes three kinds of death resulting from sin: 1. Physical death — the separation of the soul from the body. 2. Spiritual death — separation from GOD in this life because of sin. 3. Eternal death — everlasting separation from GOD for those who die without CHRIST.",
          "Sin always leads to separation, but the Good News is that GOD does not leave us there."
        ]
      },
      {
        id: "teaching-2-3",
        number: 4,
        title: "The Free Gift of GOD Is Eternal Life",
        paragraphs: [
          "“…but the gift of GOD is eternal life in CHRIST JESUS our LORD.” — Romans 6:23 (NIV)",
          "In His love and mercy, GOD decided not to leave us in our guilt. He offers eternal life — a gift, not a reward — to all who trust in His Son.",
          "Eternal life means to live with GOD forever, but it is also a present reality for everyone who believes. JESUS said, “I have come that they may have life, and have it to the full.” (John 10:10 NIV)",
          "This life is abundant, unending, and secured by GOD’S grace alone."
        ]
      },
      {
        id: "teaching-2-4",
        number: 5,
        title: "Receiving Eternal Life Is Through Repentance and Faith",
        paragraphs: [
          "“…in CHRIST JESUS our LORD.” — Romans 6:23 (NIV)",
          "The phrase “in CHRIST JESUS” reveals how this eternal life becomes ours. It comes only through a personal relationship with JESUS, marked by repentance and faith.",
          "Repentance — to repent means to change our mind about sin and turn back to GOD. We acknowledge that we have rebelled against Him, confess our sins, and seek His forgiveness. Repentance is not mere regret; it is surrender — a turning away from sin toward GOD.",
          "Faith — to have faith in CHRIST means to trust Him completely as our LORD and SAVIOR. It is to believe that He died for our sins, rose from the dead, and now reigns as our Redeemer. Faith involves both believing and entrusting our lives to Him, relying fully on His finished work on the cross."
        ]
      },
      {
        id: "teaching-2-5",
        number: 6,
        title: "Conclusion",
        paragraphs: [
          "GOD, in His great love, is doing everything through CHRIST to bring us back to Himself. He desires to restore our relationship with Him and shower us with His eternal life.",
          "This Good News demands a personal response — not to delay, not to ignore, but to believe and receive the gift of life that GOD freely offers."
        ]
      }
    ],
    reflectionQuestions: [
      "What do Romans 3:23 and 6:23 teach us about the seriousness of sin and the grace of GOD?",
      "How does understanding the three types of death help you see the importance of salvation?",
      "In what ways does eternal life begin now, not only after death?",
      "What does true repentance look like in your daily walk with CHRIST?",
      "How can you express your faith more fully in CHRIST this week?"
    ],
    prayer: "LORD GOD, I acknowledge that I have sinned and fallen short of Your glory. Thank You for offering me the gift of eternal life through JESUS CHRIST. I repent of my sins and place my full trust in You. Help me to live each day as one who has been forgiven, redeemed, and made alive in CHRIST. Amen.",
    challenge: "Having understood the reality of sin and the Good News of salvation through JESUS CHRIST, I now place my trust in Him and receive Him as my personal LORD and SAVIOR."
  },
  {
    id: "lesson-3",
    title: "Lesson 3: The Meaning and Importance of Repentance",
    category: "Evangelism",
    readingTime: "8 min read",
    scriptureFocus: {
      reference: "Matthew 4:17 & 1 John 1:9 (NIV)",
      text: "From that time on JESUS began to preach, 'Repent, for the kingdom of heaven has come near.'... If we confess our sins, he is faithful and just and will forgive us our sins and purify us from all unrighteousness."
    },
    objectives: [
      "To understand repentance as a change of mind and heart that turns us away from sin toward GOD.",
      "To learn how repentance restores our relationship with Him and others as we live under His reign."
    ],
    teachingSections: [
      {
        id: "teaching-3-intro",
        number: 1,
        title: "Introduction",
        paragraphs: [
          "Repentance is one of the foundational truths of the Christian faith.",
          "If GOD did not rule and reign over His creation, repentance would have no meaning or importance. But because He is King, repentance becomes the first and necessary response to His grace.",
          "Let us study the meaning and importance of repentance according to the teaching of our LORD JESUS CHRIST."
        ]
      },
      {
        id: "teaching-3-1",
        number: 2,
        title: "Repentance Is a Change of Mind",
        paragraphs: [
          "The Greek word for repentance is metanoia, which means a change of mind.",
          "True repentance begins when a person changes their mind about sin — realizing that it is offensive to GOD, destructive to self, and harmful to others.",
          "When we repent, our thinking and desires shift from self-centeredness to GOD-centeredness. We begin to see sin not as a 'mistake,' but as rebellion against a holy and loving GOD. This change of mind opens the way for transformation."
        ]
      },
      {
        id: "teaching-3-2",
        number: 3,
        title: "Turning from Sin Is the Result of Repentance",
        paragraphs: [
          "A genuine change of mind always results in a change of direction. When a person truly repents, they turn away from sin and begin to live for GOD.",
          "Repentance is not merely feeling sorry — it is turning away from sin and turning toward GOD.",
          "Because the repentant heart now loves GOD, it loses the desire to continue in sin. Instead, it chooses what is right, good, and pleasing to GOD.",
          "As the Apostle Paul wrote, 'Godly sorrow brings repentance that leads to salvation and leaves no regret.' — 2 Corinthians 7:10 (NIV)"
        ]
      },
      {
        id: "teaching-3-3",
        number: 4,
        title: "The Reign of GOD Is the Reason for Repentance",
        paragraphs: [
          "“Repent, for the kingdom of heaven has come near.” — Matthew 4:17 (NIV)",
          "Repentance is necessary because the Kingdom of GOD is near. When JESUS preached repentance, He was announcing that GOD’S reign had already begun through Him.",
          "The word “near” has two meanings: 1. It is coming soon — we will experience it fully when CHRIST returns. 2. It is present now — the reign of GOD has already begun in the hearts of those who submit to Him.",
          "To refuse repentance is to reject GOD’S rule. But those who repent joyfully receive His Kingdom and live under His gracious reign, both now and forever."
        ]
      },
      {
        id: "teaching-3-4",
        number: 5,
        title: "Those Who Confess Their Sins Are Forgiven and Cleansed",
        paragraphs: [
          "“If we confess our sins, he is faithful and just and will forgive us our sins and purify us from all unrighteousness.” — 1 John 1:9 (NIV)",
          "Repentance includes confession — openly acknowledging our sins before GOD and, when necessary, before others. We confess our sins to GOD to seek His forgiveness, and when we have wronged someone, we seek reconciliation by apologizing and asking for their forgiveness as well.",
          "Our faithful and just GOD not only forgives us — He also cleanses us through the blood of JESUS CHRIST. “The blood of JESUS, his Son, purifies us from all sin.” — 1 John 1:7 (NIV)",
          "This cleansing is complete and continual, restoring us to fellowship with GOD and renewing our hearts."
        ]
      },
      {
        id: "teaching-3-5",
        number: 6,
        title: "Conclusion",
        paragraphs: [
          "Repentance is GOD’S gracious way of restoring us — to Himself, to our true selves, and to others.",
          "Through repentance, broken relationships are healed and lives are renewed. That is why repentance is not a burden but a gift of grace.",
          "When we repent, GOD reigns in our hearts, and His kingdom begins to grow within us."
        ]
      }
    ],
    reflectionQuestions: [
      "Why is sin more than just a mistake but an offense against GOD?",
      "What does it mean for repentance to begin as a 'change of mind'?",
      "How does genuine repentance show itself in daily life?",
      "How does GOD’S rule in your heart influence your decisions and relationships?",
      "What area of your life is GOD calling you to turn over to Him today?"
    ],
    prayer: "LORD GOD, thank You for showing me the true meaning of repentance. I confess my sins before You and ask for Your forgiveness and cleansing. Help me to turn away from sin and walk daily in obedience to You. Reign in my heart, LORD, and make me new. Amen.",
    challenge: "Now that I have understood the meaning and importance of repentance, I choose to change my thinking and turn from my sins. I surrender my heart to You, LORD JESUS. Cleanse me with Your blood and make me live for Your glory."
  },
  {
    id: "lesson-4",
    title: "Lesson 4: The Meaning and Importance of Faith and Good Works",
    category: "Evangelism",
    readingTime: "7 min read",
    scriptureFocus: {
      reference: "Hebrews 11:1, Ephesians 2:8-9, James 2:17 (NIV)",
      text: "Now faith is confidence in what we hope for and assurance about what we do not see... For it is by grace you have been saved, through faith... Faith by itself, if it is not accompanied by action, is dead."
    },
    objectives: [
      "To understand the true meaning of faith and its relationship to good works.",
      "To realize that salvation is by grace through faith alone, and that genuine faith naturally results in a life of obedience and good deeds."
    ],
    teachingSections: [
      {
        id: "teaching-4-intro",
        number: 1,
        title: "Introduction",
        paragraphs: [
          "What is faith? And how does it relate to the way we live?",
          "Faith is one of the most essential truths in the Christian life. Without it, no one can please GOD (Hebrews 11:6).",
          "Yet Scripture also reminds us that genuine faith produces fruit — seen through our actions, obedience, and love for others. Let us study the meaning and importance of faith and good works according to GOD’S Word."
        ]
      },
      {
        id: "teaching-4-1",
        number: 2,
        title: "What Does Faith Mean?",
        paragraphs: [
          "“Now faith is confidence in what we hope for and assurance about what we do not see.” — Hebrews 11:1 (NIV)",
          "The Greek word pistis means faith or faithfulness. Faith involves both assurance and conviction — confidence in GOD’S promises and trust in His unseen reality.",
          "Faith is not blind optimism but a firm trust in who GOD is and what He has said.",
          "To believe in JESUS is to rely upon Him completely. As John 3:16 declares, 'Whoever believes in Him shall not perish but have eternal life.' Therefore, faith means trusting JESUS CHRIST alone for salvation, believing that what He has promised is true and certain."
        ]
      },
      {
        id: "teaching-4-2",
        number: 3,
        title: "Why Faith and Not Good Works?",
        paragraphs: [
          "“For it is by grace you have been saved, through faith—and this is not from yourselves, it is the gift of GOD—not by works, so that no one can boast.” — Ephesians 2:8–9 (NIV)",
          "We are saved by grace — not by our own efforts or good works. Salvation is a gift, not a wage. We cannot earn it, buy it, or deserve it.",
          "If salvation depended on our deeds, we would have reason to boast before GOD. But the truth is, someone has already paid the full price — JESUS CHRIST, our SAVIOR.",
          "Faith is the open hand that receives GOD’S free gift of grace. Good works cannot save us, but faith in CHRIST can — because it trusts completely in what He has done on our behalf."
        ]
      },
      {
        id: "teaching-4-3",
        number: 4,
        title: "What Is the Importance of Good Works?",
        paragraphs: [
          "“For we are GOD’S handiwork, created in CHRIST JESUS to do good works, which GOD prepared in advance for us to do.” — Ephesians 2:10 (NIV)",
          "Good works are not the root of salvation, but the fruit of salvation. Those who are saved by grace become GOD’S 'workmanship' — His masterpiece, created anew in CHRIST to live a life that honors Him.",
          "We are not saved by good works, but we are saved for good works.",
          "Genuine faith naturally produces a life of service, love, and obedience to GOD. That’s why the Apostle James declared, 'Faith by itself, if it is not accompanied by action, is dead.' — James 2:17 (NIV)",
          "Faith without works is not real faith. True believers live out their faith daily by doing good, not to earn salvation, but as a response to it."
        ]
      },
      {
        id: "teaching-4-4",
        number: 5,
        title: "Conclusion",
        paragraphs: [
          "Faith and good works are not enemies — they are inseparable companions.",
          "Faith is the root; good works are the fruit.",
          "By faith, we receive GOD’S gift of salvation. Through good works, we demonstrate the reality of that faith in our lives.",
          "Let us therefore live by faith — trusting in CHRIST’S grace — and walk in good works, bringing glory to GOD and blessing to others."
        ]
      }
    ],
    reflectionQuestions: [
      "How would you define faith in your own words based on Hebrews 11:1?",
      "Why can’t good works save us?",
      "How does genuine faith naturally lead to good works?",
      "What are some 'good works' GOD may be calling you to do today?",
      "How can you express your faith in action within your family, church, or community?"
    ],
    prayer: "LORD GOD, thank You that I am saved by grace through faith in JESUS CHRIST. Teach me to trust You completely and to live out my faith in love and obedience. May my life reflect Your goodness through my actions and service. Amen.",
    challenge: "By Your grace, LORD Almighty, I rely on You for salvation. Strengthen my faith and help me to express it through good works that bring You glory. In JESUS CHRIST my LORD and SAVIOR, Amen."
  },
  {
    id: "lesson-5",
    title: "Lesson 5: The Assurance of Salvation",
    category: "Evangelism",
    readingTime: "7 min read",
    scriptureFocus: {
      reference: "1 John 5:11-13 (NIV)",
      text: "And this is the testimony: GOD has given us eternal life, and this life is in his Son. Whoever has the Son has life; whoever does not have the Son of GOD does not have life..."
    },
    objectives: [
      "To help believers understand and rest in the biblical assurance of salvation.",
      "To know that eternal life is GOD’S secure gift, received through faith in JESUS CHRIST and guaranteed by His Word."
    ],
    teachingSections: [
      {
        id: "teaching-5-intro",
        number: 1,
        title: "Introduction",
        paragraphs: [
          "Many sincere believers, even after trusting JESUS CHRIST as their LORD and SAVIOR, sometimes struggle with doubt about their salvation.",
          "But GOD wants His children to live in confidence — not fear. He has clearly revealed in His Word that eternal life is not something we have to earn or guess about; it is something we can know and enjoy today.",
          "This lesson shows us how we can rest in GOD’S promises and live assured of His saving grace."
        ]
      },
      {
        id: "teaching-5-1",
        number: 2,
        title: "GOD Himself Gives the Assurance of Eternal Life",
        paragraphs: [
          "“This is the testimony.” — 1 John 5:11",
          "Our assurance begins with GOD’S own testimony — not human opinion or feeling.",
          "GOD’S testimony is greater than any human claim because it comes from the One who cannot lie.",
          "This testimony declares that eternal life is His sure and trustworthy gift to all who believe.",
          "We can rest secure because assurance comes from GOD’S unchanging Word, not our changing emotions."
        ]
      },
      {
        id: "teaching-5-2",
        number: 3,
        title: "GOD Has Given Us Eternal Life",
        paragraphs: [
          "“GOD has given us eternal life.” — 1 John 5:11",
          "Eternal life is not merely a future hope — it is a present reality for everyone who truly believes in JESUS CHRIST.",
          "GOD has already given this gift to His children. Though its fullness will be experienced in eternity, its presence begins now.",
          "Every genuine believer is already living in the reality of eternal life — a life that will never be taken away."
        ]
      },
      {
        id: "teaching-5-3",
        number: 4,
        title: "Eternal Life Is Received by Receiving CHRIST",
        paragraphs: [
          "“This life is in his Son. Whoever has the Son has life; whoever does not have the Son of GOD does not have life.” — 1 John 5:12 (NIV)",
          "Eternal life is found only in JESUS CHRIST. It is not in religion, good works, or moral effort — but in a personal relationship with the Son of GOD.",
          "When we turn from sin and trust CHRIST by faith, we are united with Him, and His life becomes ours.",
          "To “have the Son” means to receive Him into our hearts as LORD and SAVIOR — to belong to Him personally.",
          "If we have CHRIST, we have life. If we do not have CHRIST, we do not have life. It’s that simple and certain."
        ]
      },
      {
        id: "teaching-5-4",
        number: 5,
        title: "Eternal Life Is Surely Known by Faith in CHRIST",
        paragraphs: [
          "“You who believe in the name of the Son of GOD… may know that you have eternal life.” — 1 John 5:13 (NIV)",
          "Assurance comes through faith — trusting in the finished work of CHRIST on the cross.",
          "Faith rests in His promise that He has redeemed us completely, forgiven our sins, and secured our future.",
          "When we exercise faith in JESUS, we move from uncertainty to confidence.",
          "Our salvation is not based on how we feel or perform, but on what JESUS has already done for us.",
          "Because of His Word and His faithfulness, we can know that we have eternal life — not hope or wish, but know."
        ]
      },
      {
        id: "teaching-5-5",
        number: 6,
        title: "Conclusion",
        paragraphs: [
          "Assurance of salvation is not presumption — it is confidence in GOD’S promise.",
          "When we are united with CHRIST through faith, we can be certain that eternal life is ours, both now and forever.",
          "If GOD is for us, who can be against us? (Romans 8:31)",
          "No one can snatch us from His hand. The believer’s assurance rests securely in the character and power of GOD."
        ]
      }
    ],
    reflectionQuestions: [
      "Why is assurance of salvation essential for a healthy Christian life?",
      "How does knowing that eternal life is a gift from GOD affect your daily walk with Him?",
      "What truths from 1 John 5:11–13 give you the most comfort and confidence?",
      "In what ways does doubt weaken our faith and witness?",
      "How can you encourage others who struggle with doubts about their salvation?"
    ],
    prayer: "Heavenly Father, thank You for giving me eternal life through Your Son, JESUS CHRIST. Thank You for Your unchanging promises that secure my salvation. Help me to live each day in confidence, peace, and gratitude, knowing that I belong to You forever. Amen.",
    challenge: "Having understood the assurance of eternal life in CHRIST, I now commit to live in the joy and confidence of His promise. I will trust in His Word, rest in His love, and share this assurance with others. In JESUS CHRIST my LORD and SAVIOR, Amen."
  },
  {
    id: "lesson-6",
    title: "Lesson 6: The Perseverance of the Saved",
    category: "Evangelism",
    readingTime: "8 min read",
    scriptureFocus: {
      reference: "Philippians 2:12-13 (NIV)",
      text: "Continue to work out your salvation with fear and trembling, for it is GOD who works in you to will and to act in order to fulfill his good purpose."
    },
    objectives: [
      "To understand that assurance of salvation is not a license to be idle, but a call to persevere faithfully in the Christian life.",
      "To trust that GOD, who began the good work in us, will carry it on to completion."
    ],
    teachingSections: [
      {
        id: "teaching-6-intro",
        number: 1,
        title: "Introduction",
        paragraphs: [
          "The doctrine of Assurance of Salvation reminds us that GOD has given us eternal life through JESUS CHRIST.",
          "But assurance does not mean complacency — it calls us to walk in faith, obedience, and reverence while we live on earth.",
          "If GOD truly assures us of salvation, He also calls us to persevere in that assurance — to live faithfully until the end. Let’s see what the Apostle Paul teaches us about this truth."
        ]
      },
      {
        id: "teaching-6-1",
        number: 2,
        title: "Continue in Assured Salvation",
        paragraphs: [
          "“And this is the testimony: GOD has given us eternal life, and this life is in his Son…” — 1 John 5:11–13 (NIV)",
          "“Here I am! I stand at the door and knock. If anyone hears my voice and opens the door, I will come in and eat with that person, and they with me.” — Revelation 3:20 (NIV)",
          "“For it is by grace you have been saved, through faith... not by works...” — Ephesians 2:8–9 (NIV)",
          "We are saved by GOD’S grace alone, through faith in CHRIST. This salvation is assured and complete in Him.",
          "Yet, Paul calls believers to “work out” what GOD has already “worked in.” Our perseverance does not earn salvation — it expresses salvation.",
          "As we continue in faith, prayer, and obedience, we live out the assurance that GOD has already given us."
        ]
      },
      {
        id: "teaching-6-2",
        number: 3,
        title: "We Need to Persevere",
        paragraphs: [
          "Paul urges believers to “work out [their] salvation with fear and trembling.”",
          "This means putting effort into living faithfully as people who belong to GOD. The words “work hard” imply diligence — striving not to earn GOD’S love, but to live in response to it.",
          "The phrase “with fear and trembling” speaks of holy reverence — a deep awe toward the GOD who has saved us.",
          "It is not a fear of punishment, but a humble awareness of His majesty and grace. We tremble not out of terror, but out of wonder — amazed that the Holy GOD has saved sinners like us.",
          "True perseverance flows from worship, not worry. It is the believer’s loving response to GOD’S amazing grace."
        ]
      },
      {
        id: "teaching-6-3",
        number: 4,
        title: "An Illustration of Perseverance",
        paragraphs: [
          "Imagine travelers journeying to a distant land. They already have their ticket and destination guaranteed. Yet, they must continue their voyage — staying alert, caring for one another, and trusting the captain through calm and storm alike.",
          "In the same way, believers are travelers toward eternal life.",
          "Our destination is sure, but we must continue walking faithfully, trusting GOD through the journey.",
          "The grace that saves us is the same grace that strengthens us to endure until the end."
        ]
      },
      {
        id: "teaching-6-4",
        number: 5,
        title: "GOD Works in Us to Persevere",
        paragraphs: [
          "“For it is GOD who works in you to will and to act in order to fulfill his good purpose.” — Philippians 2:13 (NIV)",
          "Our perseverance is not by human strength — it is GOD Himself who works within us. He shapes our desires (“to will”) and empowers our actions (“to act”) so that we fulfill His purpose.",
          "This is the great comfort of the Gospel: the same GOD who saves us also sustains us.",
          "He accompanies us daily, giving us both the desire and the power to do His will.",
          "This truth is what theologians call “the perseverance of the saints.” It means that true believers, kept by GOD’S grace, will endure in faith until the end.",
          "GOD not only assures our salvation — He also ensures our perseverance."
        ]
      },
      {
        id: "teaching-6-5",
        number: 6,
        title: "Conclusion",
        paragraphs: [
          "To persevere in faith is not to strive in fear but to walk with reverent trust.",
          "Our journey of salvation is guided by the One who began it and who promises to complete it.",
          "Every step we take in obedience is proof that His grace is at work in us.",
          "Our “fear and trembling” are not signs of doubt, but of deep gratitude — awe before a holy and loving GOD who saved us and sustains us forever."
        ]
      }
    ],
    reflectionQuestions: [
      "Why must we persevere in faith even though salvation is already assured?",
      "What does it mean to “work out” your salvation without trying to “earn” it?",
      "How can holy fear and reverence deepen your walk with GOD?",
      "What does GOD’S active work in you look like in daily life?",
      "How can you encourage other believers to keep persevering in faith?"
    ],
    prayer: "LORD GOD, thank You that my salvation is secure in JESUS CHRIST. Help me to persevere in faith, obedience, and love, knowing that You are at work within me. Keep my heart humble and my steps steadfast until I reach my eternal home. Amen.",
    challenge: "Having understood that GOD both assures and sustains my salvation, I commit to live each day with holy reverence and faithfulness. I will trust His grace to help me persevere until I see Him face to face."
  },
  {
    id: "lesson-7",
    title: "Lesson 7: Sharing the Good News — When Matters Should Get Conversational",
    category: "Evangelism",
    readingTime: "10 min read",
    scriptureFocus: {
      reference: "John 4:1-7 (NIV)",
      text: "When a Samaritan woman came to draw water, JESUS said to her, 'Will you give me a drink?'"
    },
    objectives: [
      "To learn how to share the Gospel in a warm, conversational, SPIRIT-led way — modeling JESUS’ example with the Samaritan woman.",
      "To see evangelism not as argument but as dialogue that invites others to encounter CHRIST personally."
    ],
    teachingSections: [
      {
        id: "teaching-17-intro",
        number: 1,
        title: "Introduction",
        paragraphs: [
          "In personal evangelism, we are not merely presenting ideas — we are presenting a Person: JESUS CHRIST, the most compelling and life-transforming Person who ever lived.",
          "Our task is not to argue, but to invite; not to debate, but to engage.",
          "Evangelism becomes powerful when it becomes personal and conversational — when we allow the HOLY SPIRIT to work through a genuine exchange of thoughts, feelings, and convictions.",
          "Let’s learn how JESUS Himself engaged the Samaritan woman in John 4 — a masterclass in relational evangelism."
        ]
      },
      {
        id: "teaching-17-1",
        number: 2,
        title: "Start the Conversation with an Interesting Subject",
        paragraphs: [
          "“When a Samaritan woman came to draw water, JESUS said to her, ‘Will you give me a drink?’” — John 4:7 (NIV)",
          "JESUS began with something simple and relatable — water.",
          "Effective evangelism begins with shared ground — a question, a story, or an everyday topic that opens the door for deeper conversation.",
          "Key Truth: Connection often begins before conviction."
        ]
      },
      {
        id: "teaching-17-2",
        number: 3,
        title: "Allow the Person to React or Ask Questions",
        paragraphs: [
          "“The Samaritan woman said to him, ‘You are a Jew and I am a Samaritan woman. How can you ask me for a drink?’” — John 4:9 (NIV)",
          "Be patient and listen. Curiosity is an opportunity. When others question your faith, don’t take it as resistance — take it as engagement.",
          "Key Truth: People are more open to truth when they feel heard."
        ]
      },
      {
        id: "teaching-17-3",
        number: 4,
        title: "Respond Simply and Focus on GOD’S Gift",
        paragraphs: [
          "“JESUS answered her, ‘If you knew the gift of GOD…you would have asked him and he would have given you living water.’” — John 4:10 (NIV)",
          "Keep your responses simple and centered on grace. Don’t demand; offer.",
          "JESUS pointed her attention to the gift of GOD, not religious obligation.",
          "Key Truth: Evangelism is an invitation to grace, not a demand for performance."
        ]
      },
      {
        id: "teaching-17-4",
        number: 5,
        title: "Encourage Curiosity with Gentle Conversation",
        paragraphs: [
          "“‘Sir,’ the woman said, ‘you have nothing to draw with and the well is deep. Where can you get this living water?’” — John 4:11 (NIV)",
          "Interest is growing. Encourage it. Ask reflective questions and affirm their honesty.",
          "Let curiosity lead them closer to CHRIST.",
          "Key Truth: The HOLY SPIRIT uses curiosity to awaken spiritual hunger."
        ]
      },
      {
        id: "teaching-17-5",
        number: 6,
        title: "Show the Advantage of the Gospel Without Arguing",
        paragraphs: [
          "“Everyone who drinks this water will be thirsty again, but whoever drinks the water I give them will never thirst.” — John 4:13–14 (NIV)",
          "Avoid debates. Instead, highlight the beauty and power of the Gospel — its ability to satisfy what nothing else can.",
          "Key Truth: The Gospel’s appeal is not in argument but in transformation."
        ]
      },
      {
        id: "teaching-17-6",
        number: 7,
        title: "Let Them Ask for What You’ve Offered",
        paragraphs: [
          "“The woman said to him, ‘Sir, give me this water so that I won’t get thirsty.’” — John 4:15 (NIV)",
          "When interest becomes desire, the heart is ready.",
          "At this stage, you can begin sharing how to receive CHRIST personally.",
          "Key Truth: Let the seeker move from curiosity to commitment."
        ]
      },
      {
        id: "teaching-17-7",
        number: 8,
        title: "Shift the Conversation to the Personal",
        paragraphs: [
          "“He told her, ‘Go, call your husband and come back.’” — John 4:16 (NIV)",
          "JESUS gently led the woman to face her personal reality.",
          "True evangelism is not just about information; it’s about transformation.",
          "Help people see their need for GOD personally and truthfully.",
          "Key Truth: Grace becomes real when truth becomes personal."
        ]
      },
      {
        id: "teaching-17-8",
        number: 9,
        title: "Allow Honest Expression",
        paragraphs: [
          "“The woman replied, ‘I have no husband.’” — John 4:17 (NIV)",
          "Let people open up. Be compassionate and patient.",
          "Evangelism is not interrogation — it’s conversation.",
          "Every honest confession is a step toward CHRIST.",
          "Key Truth: Vulnerability opens the door for grace."
        ]
      },
      {
        id: "teaching-17-9",
        number: 10,
        title: "Speak the Truth in Love",
        paragraphs: [
          "“JESUS said to her, ‘You are right when you say you have no husband. The fact is, you have had five husbands.’” — John 4:17–18 (NIV)",
          "JESUS spoke truthfully but tenderly.",
          "He neither condemned nor ignored sin — He revealed it with compassion and clarity.",
          "Key Truth: The HOLY SPIRIT convicts through truth wrapped in love."
        ]
      },
      {
        id: "teaching-17-10",
        number: 11,
        title: "Lead the Conversation Toward Knowing GOD",
        paragraphs: [
          "“The woman said, ‘Sir, I can see that you are a prophet…’” — John 4:19 (NIV)",
          "“JESUS declared, ‘Believe me, a time is coming when you will worship the Father neither on this mountain nor in Jerusalem… GOD is spirit, and his worshipers must worship in the SPIRIT and in truth.’” — John 4:21–24 (NIV)",
          "Once the heart is open, introduce the character of GOD — His holiness, love, and truth.",
          "Help them see that true worship is not ritual but relationship.",
          "Key Truth: Evangelism must lead to the worship of the true and living GOD."
        ]
      },
      {
        id: "teaching-17-11",
        number: 12,
        title: "Invite Them to a Personal Relationship with CHRIST",
        paragraphs: [
          "“The woman said, ‘I know that Messiah is coming.’… Then JESUS declared, ‘I, the one speaking to you—I am he.’” — John 4:25–26 (NIV)",
          "Here JESUS revealed Himself. Evangelism finds its fulfillment when the listener meets the Person of CHRIST — not just information about Him.",
          "Key Truth: The goal of evangelism is encounter — that they may know CHRIST personally."
        ]
      },
      {
        id: "teaching-17-12",
        number: 13,
        title: "Conclusion",
        paragraphs: [
          "Conversational evangelism takes time and sensitivity, but it produces fruit that lasts.",
          "It transforms encounters into relationships and conversations into conversions.",
          "Through this SPIRIT-led approach, both the sharer and the seeker experience GOD’S love and truth more deeply — building lasting friendship with CHRIST, with others, and even with oneself."
        ]
      }
    ],
    reflectionQuestions: [
      "How is conversational evangelism different from traditional “three-point” or “one-verse” evangelism?",
      "What can we learn from JESUS’ approach in John 4?",
      "How can you make your Gospel conversations more natural and SPIRIT-led?",
      "What attitudes or fears hinder you from sharing the Good News conversationally?",
      "How can you practice this approach in your relationships this week?"
    ],
    prayer: "O my LORD GOD Almighty, thank You for showing me how to share Your Good News with love and gentleness. Teach me to listen deeply, speak wisely, and let Your SPIRIT guide every conversation. May every word I speak lead others closer to You. Amen.",
    challenge: "LORD, I commit to practicing conversational evangelism — sharing the Gospel with love, respect, and patience. Make me a caring witness, reflecting Your truth through my words and actions. In JESUS CHRIST my LORD and SAVIOR, Amen."
  }
  ,
  {
    id: "consolidation-1",
    title: "Lesson 1: The Meaning and Practice of Prayer",
    category: "Consolidation",
    readingTime: "7 min read",
    scriptureFocus: {
      reference: "Philippians 4:6–7 & Luke 11:1 (NIV)",
      text: "Do not be anxious about anything, but in every situation, by prayer and petition, with thanksgiving, present your requests to GOD... LORD, teach us to pray."
    },
    objectives: [
      "To understand the meaning, importance, and method of prayer in the life of a believer.",
      "To develop a consistent and meaningful personal prayer life patterned after the biblical ACTS framework — Adoration, Confession, Thanksgiving, and Supplication."
    ],
    teachingSections: [
      {
        id: "c-1-intro",
        number: 1,
        title: "Introduction",
        paragraphs: [
          "Prayer is one of the greatest privileges of every believer. It is a sacred conversation with our Heavenly Father — a time of fellowship, worship, and alignment with His will.",
          "Through prayer, we express our love, confess our sins, give thanks for His grace, and bring before Him our needs and the needs of others.",
          "When we pray, we are not informing GOD of things He doesn’t know, but acknowledging our dependence on Him and inviting His presence and power into our lives.",
          "Key Truth: Prayer is not merely asking from GOD — it is abiding in Him."
        ]
      },
      {
        id: "c-1-1",
        number: 2,
        title: "What Is Prayer?",
        paragraphs: [
          "Prayer is our spiritual communication with GOD. It is both talking to GOD and listening to Him.",
          "It is the expression of our relationship — one rooted in love, trust, and obedience.",
          "“This is the confidence we have in approaching GOD: that if we ask anything according to his will, he hears us.” — 1 John 5:14",
          "Key Truth: The strength of our spiritual life depends on the strength of our prayer life."
        ]
      },
      {
        id: "c-1-2",
        number: 3,
        title: "Why Should We Pray?",
        paragraphs: [
          "1. Because GOD commands us to pray. — Luke 18:1; 1 Thessalonians 5:17",
          "2. Because prayer draws us closer to GOD. — James 4:8",
          "3. Because prayer releases GOD’S power in our life. — Jeremiah 33:3",
          "4. Because prayer builds faith, peace, and strength. — Philippians 4:6–7",
          "5. Because prayer changes us more than our circumstances. — Romans 12:2",
          "Key Truth: Prayer is not optional for a believer — it is essential to a victorious Christian life."
        ]
      },
      {
        id: "c-1-3",
        number: 4,
        title: "How Should We Pray? (The ACTS Model)",
        paragraphs: [
          "The ACTS pattern is a simple and powerful way to guide your daily prayers:",
          "A — Adoration: Worship GOD for who He is. Acknowledge His greatness, holiness, and love.",
          "C — Confession: Confess your sins honestly to GOD and receive His forgiveness through JESUS CHRIST.",
          "T — Thanksgiving: Thank GOD for His blessings, provision, and answered prayers.",
          "S — Supplication: Bring your requests to GOD — for yourself and others."
        ]
      },
      {
        id: "c-1-4",
        number: 5,
        title: "What Should We Expect When We Pray?",
        paragraphs: [
          "GOD hears us — Psalm 34:17",
          "GOD answers according to His will — 1 John 5:14–15",
          "GOD gives peace even before the answer comes — Philippians 4:7",
          "GOD transforms us through intimacy with Him — 2 Corinthians 3:18",
          "Key Truth: Prayer changes everything — especially the one who prays."
        ]
      },
      {
        id: "c-1-5",
        number: 6,
        title: "Conclusion",
        paragraphs: [
          "Prayer is both a privilege and a discipline. It is where our hearts are aligned with GOD’S will and our lives are empowered by His SPIRIT.",
          "When we adore, confess, give thanks, and make our requests known to GOD, we experience His peace and power at work in us.",
          "Let us make prayer not only a daily habit, but a way of life — the heartbeat of our journey with JESUS."
        ]
      }
    ],
    reflectionQuestions: [
      "How do you personally define prayer in your life today?",
      "Which part of the ACTS pattern do you practice most — and which needs more attention?",
      "How does prayer deepen your relationship with GOD?",
      "What hinders your prayer life, and how can you overcome it?",
      "How can you incorporate prayer more intentionally into your daily schedule?"
    ],
    prayer: "O LORD, teach me to pray. Fill my heart with awe and love for You. Help me to adore You, confess my sins, give thanks for Your grace, and bring every concern before You. Let my prayers be constant, sincere, and powerful — bringing glory to Your Name. Amen.",
    challenge: "LORD, I commit to make prayer a daily habit and lifestyle. Let me grow deeper in my relationship with You through the discipline of prayer, walking in peace and confidence in Your presence. In JESUS CHRIST my LORD and SAVIOUR, Amen."
  },
  {
    id: "consolidation-2",
    title: "Lesson 2: The Importance of Scripture Memory and Personal Devotion",
    category: "Consolidation",
    readingTime: "7 min read",
    scriptureFocus: {
      reference: "Joshua 1:8 (NIV)",
      text: "Keep this Book of the Law always on your lips; meditate on it day and night, so that you may be careful to do everything written in it. Then you will be prosperous and successful."
    },
    objectives: [
      "To understand that memorizing and meditating on GOD’S Word are essential practices for a growing believer.",
      "To learn how personal devotion leads to spiritual wisdom, strength, and success in living according to GOD’S will."
    ],
    teachingSections: [
      {
        id: "c-2-intro",
        number: 1,
        title: "Introduction",
        paragraphs: [
          "In Joshua 1:8, GOD gave His servant Joshua a powerful instruction for success and spiritual maturity.",
          "The key to victory in life and ministry is not found in personal strength, but in constant communion with GOD through His Word.",
          "GOD calls His people to keep His Word close — in the heart, on the lips, and in daily reflection — so that we may live in obedience and experience His blessings.",
          "Let us learn the importance of personal devotion and Scripture memory as vital parts of walking closely with the LORD."
        ]
      },
      {
        id: "c-2-1",
        number: 2,
        title: "What Is Personal Devotion?",
        paragraphs: [
          "“But you shall meditate on it day and night.” — Joshua 1:8 (NIV)",
          "Personal devotion is the special time we intentionally set apart to meet with GOD — to pray, meditate on His Word, and listen to His voice.",
          "For the people of Israel, this was a daily discipline of reflecting deeply on GOD’S law. For us as followers of CHRIST, devotion means delighting in GOD’S Word, allowing it to shape our thoughts, emotions, and actions.",
          "When we spend time alone with GOD, our relationship with Him grows stronger and our hearts become more aligned with His will."
        ]
      },
      {
        id: "c-2-2",
        number: 3,
        title: "The Importance of Memorizing GOD’S Word",
        paragraphs: [
          "“This Book of the Law shall not depart from your mouth.” — Joshua 1:8 (NIV)",
          "Memorizing Scripture keeps GOD’S Word constantly within reach — ready to guide, correct, and encourage us at any moment.",
          "When GOD’S Word is on our lips, it becomes our language of faith. It helps us resist temptation, renew our minds, and speak life to others.",
          "As Psalm 119:11 says, “I have hidden your word in my heart that I might not sin against you.”",
          "Scripture memory is not about mere repetition — it’s about retention and transformation. It shapes the way we think, speak, and respond to life’s challenges."
        ]
      },
      {
        id: "c-2-3",
        number: 4,
        title: "Why It Is Important to Meditate on and Memorize GOD’S Word",
        paragraphs: [
          "“…so that you may be careful to do everything written in it.” — Joshua 1:8 (NIV)",
          "Meditation and memorization are not ends in themselves — they lead to obedience.",
          "As we reflect on GOD’S truths and remember His promises, we are equipped to live according to His will.",
          "The result is both spiritual prosperity and fruitful living: “Then you will be prosperous and successful.” — Joshua 1:8 (NIV)",
          "This kind of success is not worldly achievement, but a life that pleases GOD — a life full of wisdom, integrity, and peace.",
          "When we fill our hearts with GOD’S Word and live it out, we experience true joy and blessing."
        ]
      },
      {
        id: "c-2-4",
        number: 5,
        title: "Conclusion",
        paragraphs: [
          "GOD has given us a clear and simple path to spiritual strength and success — by keeping His Word in our hearts, minds, and daily routines.",
          "As we memorize Scripture, meditate on its truths, and apply it faithfully, our lives are transformed, our faith deepens, and our walk with GOD grows stronger.",
          "Personal devotion and Scripture memory are not burdens — they are blessings that draw us closer to GOD and make us fruitful disciples of CHRIST."
        ]
      }
    ],
    reflectionQuestions: [
      "Why is it important to spend personal time with GOD in His Word each day?",
      "How does memorizing Scripture help you in your daily decisions and struggles?",
      "What is one verse you can begin memorizing this week to strengthen your faith?",
      "How can you develop a consistent personal devotion routine?",
      "What blessings have you experienced from reflecting on and obeying GOD’S Word?"
    ],
    prayer: "LORD GOD, thank You for giving me Your Word as my guide and comfort. Help me to treasure it in my heart, to meditate on it daily, and to live by its truth. Teach me to delight in Your presence as I grow in faith and obedience. Amen.",
    challenge: "LORD, I commit myself to a lifetime of memorizing Your Word and spending time with You in daily devotion. Strengthen my desire to know You more deeply and to walk faithfully in Your Word. In JESUS CHRIST my LORD and SAVIOR, Amen."
  },
  {
    id: "consolidation-3",
    title: "Lesson 3: JESUS Our Model of Devotion to GOD",
    category: "Consolidation",
    readingTime: "6 min read",
    scriptureFocus: {
      reference: "Mark 1:35–39 (NIV)",
      text: "Very early in the morning, while it was still dark, JESUS got up, left the house and went off to a solitary place, where he prayed..."
    },
    objectives: [
      "To learn from JESUS’ example of personal devotion.",
      "To understand when, where, and how to spend time with GOD, and how that private communion empowers faithful, purposeful ministry."
    ],
    teachingSections: [
      {
        id: "c-3-intro",
        number: 1,
        title: "Introduction",
        paragraphs: [
          "JESUS CHRIST is not only our SAVIOR — He is also our supreme example in every area of life, including devotion to GOD.",
          "Though He was the Son of GOD, He continually spent time with His Father in prayer. His devotion was not optional, but essential to His mission.",
          "Let us learn from how JESUS made His time with GOD meaningful, disciplined, and productive — and how we, too, can pattern our spiritual lives after His."
        ]
      },
      {
        id: "c-3-1",
        number: 2,
        title: "When Should We Have Time with GOD?",
        paragraphs: [
          "“Very early in the morning, while it was still dark, JESUS got up…” — Mark 1:35a (NIV)",
          "JESUS began His day in fellowship with the Father.",
          "Before any task, conversation, or miracle, He sought strength and direction in prayer.",
          "This teaches us the value of meeting GOD first thing in the morning — when our hearts are quiet and our minds are clear.",
          "Starting the day with GOD sets the tone for everything that follows."
        ]
      },
      {
        id: "c-3-2",
        number: 3,
        title: "Where Should We Have Time with GOD?",
        paragraphs: [
          "“…left the house and went off to a solitary place, where he prayed.” — Mark 1:35b (NIV)",
          "JESUS chose a quiet, solitary place — free from distractions — where He could focus entirely on communion with the Father.",
          "We, too, need a “solitary place” — a personal space where we can pray, read Scripture, and listen to GOD.",
          "Our spiritual lives grow deeper when we intentionally withdraw from the noise of life to be alone with Him."
        ]
      },
      {
        id: "c-3-3",
        number: 4,
        title: "What Should We Do First in Our Time with GOD?",
        paragraphs: [
          "“…where he prayed.” — Mark 1:35b (NIV)",
          "JESUS began His devotion with prayer.",
          "Prayer aligns our hearts with GOD’S heart, prepares us to understand His Word, and strengthens our faith.",
          "Through prayer, we lay down our burdens, surrender our will, and open ourselves to GOD’S direction for the day ahead."
        ]
      },
      {
        id: "c-3-4",
        number: 5,
        title: "What Happens After We Spend Time with GOD?",
        paragraphs: [
          "“When they found him, they exclaimed, ‘Everyone is looking for you!’” — Mark 1:37 (NIV)",
          "After spending time with the Father, JESUS immediately encountered people’s needs and expectations.",
          "Likewise, after our time with GOD, we often step into situations where people seek our help, guidance, or encouragement.",
          "Our quiet time equips us to serve others with renewed strength, wisdom, and compassion."
        ]
      },
      {
        id: "c-3-5",
        number: 6,
        title: "How Should We Respond to People’s Expectations?",
        paragraphs: [
          "“JESUS replied, ‘Let us go somewhere else—to the nearby villages—so I can preach there also.’” — Mark 1:38a (NIV)",
          "JESUS did not let popularity or pressure dictate His direction. He remained focused on His divine purpose.",
          "Spending time with GOD helps us clarify our priorities — to say “yes” to what truly matters and “no” to distractions.",
          "True devotion leads to discernment — knowing GOD’S will and following it faithfully."
        ]
      },
      {
        id: "c-3-6",
        number: 7,
        title: "What Is the Best Way to Work with JESUS After Time with GOD?",
        paragraphs: [
          "“So he traveled throughout Galilee, preaching in their synagogues and driving out demons.” — Mark 1:39 (NIV)",
          "After prayer, JESUS moved forward in ministry — preaching the Gospel and demonstrating the power of the Kingdom.",
          "Our personal devotion should always lead to public action.",
          "When we pray and meet with GOD, we receive power to live out our faith — serving others, sharing the Gospel, and overcoming spiritual challenges."
        ]
      },
      {
        id: "c-3-7",
        number: 8,
        title: "Conclusion",
        paragraphs: [
          "A disciplined devotional life enables us to serve GOD faithfully and fruitfully.",
          "When we follow JESUS’ example — setting a regular time, finding a quiet place, beginning in prayer, and living with purpose — we grow stronger in faith and more effective in ministry.",
          "Personal devotion is not a duty, but a delight — a daily encounter with the living GOD who equips us for every good work."
        ]
      }
    ],
    reflectionQuestions: [
      "Why is JESUS the perfect model for personal devotion?",
      "What can you learn from His timing, place, and focus in prayer?",
      "How does personal devotion strengthen you for ministry or service?",
      "What distractions do you need to remove to deepen your time with GOD?",
      "How can you apply JESUS’ devotional pattern starting this week?"
    ],
    prayer: "O LORD GOD Almighty, thank You for showing me the perfect example through Your Son, JESUS CHRIST. Teach me to rise early, find a quiet place, and meet with You daily in prayer and reflection. Strengthen me to live with purpose, serve faithfully, and glorify You in all I do. Amen.",
    challenge: "O my LORD GOD Almighty, please help me to develop a disciplined personal devotion with You every day. In JESUS CHRIST my LORD and SAVIOR, Amen."
  },
  {
    id: "consolidation-4",
    title: "Lesson 4: The Scripture Union Devotional Method",
    category: "Consolidation",
    readingTime: "7 min read",
    scriptureFocus: {
      reference: "1 John 1:1–10 (NIV)",
      text: "That which was from the beginning, which we have heard, which we have seen with our eyes, which we have looked at and our hands have touched—this we proclaim concerning the Word of life..."
    },
    objectives: [
      "To learn and apply the Scripture Union Devotional Method — a simple, structured, and SPIRIT-guided approach to personal Bible study.",
      "To help believers listen to GOD’S Word, respond in obedience, and grow in faith."
    ],
    teachingSections: [
      {
        id: "c-4-intro",
        number: 1,
        title: "Introduction",
        paragraphs: [
          "The Scripture Union Devotional Method is a time-tested and SPIRIT-inspired way to make your personal devotion meaningful and fruitful.",
          "Every time you meet with GOD, He has already prepared a word, a promise, and a message for you.",
          "Through this method, you can listen carefully, reflect deeply, and respond faithfully. It is a guide — not a formula — to help you grow in your love for GOD’S Word and apply its truths in daily life."
        ]
      },
      {
        id: "c-4-1",
        number: 2,
        title: "First Steps of Devotion",
        paragraphs: [
          "Before you begin reading, take a few moments to pray — adoring GOD, giving thanks, and asking for understanding.",
          "Then, open your Bible to the assigned passage for the day. For example, let’s use 1 John 1:1–10 as your devotional passage.",
          "Your goal is not to rush through the text, but to discover what GOD is teaching you personally."
        ]
      },
      {
        id: "c-4-2",
        number: 3,
        title: "1. Are There Promises to Claim?",
        paragraphs: [
          "Look for what GOD has promised His people — His faithfulness, grace, and blessings.",
          "Examples from 1 John 1:1–10: There is eternal life with the Father in Heaven (v. 2). The LORD brings us into joyful fellowship with Himself and His people (vv. 3–4). If we walk in the light, the blood of JESUS purifies us from all sin (v. 7). If we confess our sins, GOD is faithful and just to forgive and cleanse us (v. 9).",
          "Takeaway: GOD’S promises assure us of forgiveness, cleansing, and joyful fellowship through CHRIST."
        ]
      },
      {
        id: "c-4-3",
        number: 4,
        title: "2. Are There Commands to Obey?",
        paragraphs: [
          "Identify instructions or directions that GOD expects His children to follow.",
          "Examples: Follow JESUS and walk in the truth (v. 6). Do not live in darkness (v. 6). Confess sins regularly (v. 9). Live as children of light (v. 7).",
          "Takeaway: Obedience to GOD’S commands proves our fellowship with Him."
        ]
      },
      {
        id: "c-4-4",
        number: 5,
        title: "3. Are There Examples to Follow?",
        paragraphs: [
          "Observe godly behavior or attitudes demonstrated by others.",
          "Examples: The Apostle John boldly shared his firsthand experience with JESUS (vv. 1–4). John showed faithfulness in proclaiming the message of light (v. 5–7).",
          "Takeaway: Be courageous in sharing your testimony and walking in GOD’S light."
        ]
      },
      {
        id: "c-4-5",
        number: 6,
        title: "4. Are There Warnings to Heed?",
        paragraphs: [
          "Pay attention to cautions or dangers GOD reveals in His Word.",
          "Examples: Claiming fellowship with CHRIST while walking in darkness is deceitful (v. 6). Saying we have no sin makes us liars and rejects GOD’S truth (vv. 8–10).",
          "Takeaway: Beware of self-deception and spiritual pride; live honestly before GOD."
        ]
      },
      {
        id: "c-4-6",
        number: 7,
        title: "5. Are There Sins to Avoid or Confess?",
        paragraphs: [
          "Be honest before GOD about any sin the passage reveals.",
          "Examples: Avoid living in darkness (v. 6). Repent from lying and hypocrisy (v. 6). Confess sins that disrupt your fellowship with GOD (v. 9).",
          "Takeaway: Sin breaks fellowship, but confession restores it through CHRIST’S cleansing blood."
        ]
      },
      {
        id: "c-4-7",
        number: 8,
        title: "6. Additional Reflection Questions",
        paragraphs: [
          "Ask questions that help you understand the passage more deeply:",
          "What does this passage teach me about GOD the Father, Son, and HOLY SPIRIT? (vv. 1–4)",
          "What does it reveal about life and light in CHRIST? (vv. 6–7)",
          "Takeaway: GOD calls us to walk in His light and live in fellowship with Him and others."
        ]
      },
      {
        id: "c-4-8",
        number: 9,
        title: "Conclusion",
        paragraphs: [
          "Living as a true disciple means growing in GOD’S Word daily.",
          "Through this devotional method, you’ll discover GOD’S promises, learn obedience, avoid sin, and deepen your relationship with Him.",
          "As you meditate, memorize, and apply His Word, your joy will be made complete — and your life will reflect His light."
        ]
      }
    ],
    reflectionQuestions: [
      "Why is personal and careful devotion to GOD’S Word important?",
      "How does this devotional method help you understand Scripture better?",
      "Which of the five steps (promises, commands, examples, warnings, sins) helps you the most in applying GOD’S Word?",
      "How will you make daily devotion a consistent part of your life?"
    ],
    prayer: "Our LORD GOD Almighty, thank You for giving me Your Word as my guide for life. Help me to study it daily, meditate on its truths, and apply them faithfully. Teach me to listen to Your voice through Scripture and to obey it with joy. Amen.",
    challenge: "LORD, I commit myself to study Your Word every day. Please help me to discipline myself in my devotional life, following the steps that lead me closer to You. In JESUS CHRIST my LORD and SAVIOR, Amen."
  },
  {
    id: "consolidation-5",
    title: "Lesson 5: The Day of Your Rest",
    category: "Consolidation",
    readingTime: "7 min read",
    scriptureFocus: {
      reference: "Hebrews 4:1 (NIV)",
      text: "Therefore, since the promise of entering his rest still stands, let us be careful that none of you be found to have fallen short of it."
    },
    objectives: [
      "To understand the meaning and importance of true rest — both spiritual and physical.",
      "To accept GOD’S gracious invitation for His people to enjoy fellowship with Him, renewed strength, and the joy of worship."
    ],
    teachingSections: [
      {
        id: "c-5-intro",
        number: 1,
        title: "Introduction",
        paragraphs: [
          "What does it mean to rest? Why is the Day of Rest important?",
          "In our busy and burdened lives, GOD calls us to a kind of rest that goes beyond physical sleep.",
          "It is a spiritual rest — a resting in His presence, His promises, and His completed work through JESUS CHRIST.",
          "Let us learn from Scripture what this “Day of Rest” truly means and how we can live in it daily and weekly."
        ]
      },
      {
        id: "c-5-1",
        number: 2,
        title: "GOD Has Prepared a Second Rest for Us",
        paragraphs: [
          "“There remains, then, a Sabbath-rest for the people of GOD.” — Hebrews 4:9 (NIV)",
          "Rest Means Dwelling in GOD’S Presence: “Let us, therefore, make every effort to enter that rest.” — Hebrews 4:11 (NIV). True rest is found only in fellowship with GOD — when our souls find peace and security in His presence.",
          "GOD Appointed the First Day of Rest: The first “rest” was modeled by GOD Himself after creation — teaching us that rest is both holy and essential.",
          "GOD Promises a Future, Eternal Rest: Beyond the weekly Sabbath lies an eternal rest — the everlasting peace that awaits those who trust and follow CHRIST.",
          "Key Truth: Rest is both now (spiritual rest in CHRIST) and not yet (eternal rest with Him in glory)."
        ]
      },
      {
        id: "c-5-2",
        number: 3,
        title: "GOD’S Word Brings Both a Warning and a Promise of Rest",
        paragraphs: [
          "“For we also have had the good news proclaimed to us, just as they did; but the message they heard was of no value to them, because they did not share the faith of those who obeyed.” — Hebrews 4:2 (NIV)",
          "We Must Persevere in GOD’S Promise: We must continue to trust His promise of rest, holding fast to faith in His Word.",
          "We Must Guard Ourselves from Unbelief: GOD warns us not to fall into spiritual laziness or unbelief that robs us of peace.",
          "We Must Believe the Good News We Hear: True rest comes from faith — believing and receiving the Gospel that brings us back to GOD.",
          "Key Truth: Faith in the Gospel is the doorway to true rest."
        ]
      },
      {
        id: "c-5-3",
        number: 4,
        title: "JESUS CHRIST Has Paid the Price for Your Rest",
        paragraphs: [
          "“For CHRIST also suffered once for sins, the righteous for the unrighteous, to bring you to GOD.” — 1 Peter 3:18a (NIV)",
          "We All Have Sinned and Fallen Short of GOD’S Glory (Romans 3:23) — Our rest was lost because of sin.",
          "Sin Separated Us from GOD (Romans 6:23) — The wages of sin is death, separation from GOD’S rest.",
          "GOD’S Love and Sacrifice Made the Way for Our Rest (John 3:16).",
          "JESUS Is the Perfect Sacrifice That Secures Our Rest. JESUS bore our sins on the cross so that we may now rest in His grace, forgiven and reconciled to GOD.",
          "Key Truth: The cross is the bridge to our eternal rest."
        ]
      },
      {
        id: "c-5-4",
        number: 5,
        title: "GOD Appointed a Day of Rest for All His People",
        paragraphs: [
          "GOD Rested on the Seventh Day: “By the seventh day GOD had finished the work he had been doing; so on the seventh day he rested from all his work.” — Genesis 2:2 (NIV)",
          "GOD Commanded His People to Keep a Day of Rest: “Remember the Sabbath day by keeping it holy.” — Exodus 20:8 (NIV). Rest is not optional — it is GOD’S loving command for our good.",
          "JESUS Is the LORD of the Sabbath: “For the Son of Man is LORD of the Sabbath.” — Matthew 12:8 (NIV). JESUS fulfilled the Sabbath law — now, we rest not in a day, but in Him. We honor the LORD’S Day (Sunday) as a celebration of His resurrection and our new life in Him.",
          "The Early Church Practiced Worship on the LORD’S Day: “Every Sabbath he reasoned in the synagogue, trying to persuade Jews and Greeks.” — Acts 18:4 (NIV)",
          "Key Truth: Rest is an act of worship — a rhythm of work and renewal centered in CHRIST."
        ]
      },
      {
        id: "c-5-5",
        number: 6,
        title: "Conclusion",
        paragraphs: [
          "Observing a Day of Rest is rooted in resting in GOD’S holy presence — the same GOD who created us in His image and redeemed us through His Son.",
          "To rest in GOD is to trust in His finished work, worship Him with His people, and prepare our hearts for the eternal rest to come."
        ]
      }
    ],
    reflectionQuestions: [
      "How can you personally know and experience true rest in GOD’S presence?",
      "How has the Good News of JESUS affected your ability to rest in Him?",
      "Why is it important to set aside a weekly day of rest and worship?",
      "In what ways do you need to trust GOD more deeply with your time, work, and rest?"
    ],
    prayer: "Almighty GOD, my Creator and Redeemer, I commit myself to daily worship and weekly rest in You. Help me to find peace in Your presence and renewal in Your Word. Let my rest be an act of love and obedience to You. In JESUS CHRIST my LORD and SAVIOR, Amen.",
    challenge: "LORD, I dedicate myself to honoring You through daily worship and weekly rest with Your people in the church. Help me to live a life that rests securely in Your grace. In JESUS CHRIST my LORD and SAVIOR, Amen."
  },
  {
    id: "consolidation-6",
    title: "Lesson 6: The Meaning and Importance of Christian Fellowship",
    category: "Consolidation",
    readingTime: "7 min read",
    scriptureFocus: {
      reference: "Hebrews 10:24–25 (NIV)",
      text: "And let us consider how we may spur one another on toward love and good deeds, not giving up meeting together, as some are in the habit of doing..."
    },
    objectives: [
      "To understand what true Christian fellowship means and why it is essential for spiritual growth.",
      "To learn how believers can actively participate in building one another up in love, faith, and hope as they await the LORD’S return."
    ],
    teachingSections: [
      {
        id: "c-6-intro",
        number: 1,
        title: "Introduction",
        paragraphs: [
          "What is Christian fellowship?",
          "Christian fellowship is the shared life of believers who have been united in JESUS CHRIST and are indwelt by the HOLY SPIRIT. It is not merely social gathering — it is spiritual communion, a divine partnership in faith, love, and mission.",
          "In fellowship, we strengthen one another, grow in grace, and reflect the unity of the Body of CHRIST.",
          "Let’s explore what makes Christian fellowship so meaningful and vital in our walk with GOD."
        ]
      },
      {
        id: "c-6-1",
        number: 2,
        title: "In Fellowship, We Encourage One Another",
        paragraphs: [
          "“Let us consider how we may spur one another on…” — Hebrews 10:24 (NIV)",
          "The word “spur” means to stir up, to urge forward, or to motivate toward growth.",
          "Fellowship is not about passively attending meetings — it is about actively encouraging one another in faith and good works.",
          "We come together not just to receive, but to give — to speak life, share testimonies, and strengthen one another in the LORD.",
          "Key Truth: Fellowship is where believers build one another up — not tear each other down."
        ]
      },
      {
        id: "c-6-2",
        number: 3,
        title: "We Encourage One Another Toward Love and Good Deeds",
        paragraphs: [
          "“…toward love and good deeds.” — Hebrews 10:24 (NIV)",
          "Love and good deeds are the visible fruit of genuine fellowship.",
          "When believers walk together in CHRIST, they inspire each other to love more deeply and serve more faithfully.",
          "True Christian fellowship reminds us that our faith must be active — showing compassion, serving others, and doing good as CHRIST did.",
          "Key Truth: Fellowship helps us live out the love of CHRIST in tangible, everyday ways."
        ]
      },
      {
        id: "c-6-3",
        number: 4,
        title: "We Encourage One Another Through Habitual Fellowship",
        paragraphs: [
          "“…not giving up meeting together, as some are in the habit of doing…” — Hebrews 10:25 (NIV)",
          "Consistency is vital. A Christian who isolates himself weakens his faith. Just as coals lose their heat when separated from the fire, believers grow cold when apart from the fellowship.",
          "GOD designed us for community, not independence.",
          "Regular gathering in worship, prayer, and study keeps our faith alive and our hearts warm toward GOD and others.",
          "Key Truth: Fellowship is not an option for a Christian — it is a divine necessity for spiritual endurance."
        ]
      },
      {
        id: "c-6-4",
        number: 5,
        title: "We Encourage One Another as We Await the LORD’S Return",
        paragraphs: [
          "“…but encouraging one another—and all the more as you see the Day approaching.” — Hebrews 10:25 (NIV)",
          "Christian fellowship is not only about the present; it’s about preparing for eternity.",
          "We encourage one another with hope, reminding each other that CHRIST is coming again.",
          "As the days grow darker in the world, believers need to stand together — praying, worshiping, and pressing on until the LORD returns.",
          "Key Truth: Fellowship points us toward the blessed hope — the return of JESUS CHRIST."
        ]
      },
      {
        id: "c-6-5",
        number: 6,
        title: "Conclusion",
        paragraphs: [
          "True Christian fellowship is GOD’S gift for our spiritual growth and strength.",
          "Through it, we encourage one another in love and good deeds, maintain steadfastness in faith, and prepare joyfully for CHRIST’S coming.",
          "As members of one body, let’s commit to meeting together regularly, supporting one another, and growing together in grace."
        ]
      }
    ],
    reflectionQuestions: [
      "How would you define true Christian fellowship?",
      "Why is it important for believers to meet together regularly?",
      "In what ways can you personally encourage others in love and good works?",
      "What are some barriers that keep people from fellowship, and how can they be overcome?",
      "How does Christian fellowship prepare us for the coming of the LORD?"
    ],
    prayer: "LORD GOD, thank You for the gift of fellowship in the Body of CHRIST. Thank You for brothers and sisters who strengthen, encourage, and walk with me in faith. Help me to be faithful in meeting with them, serving with love, and building others up in Your grace. Amen.",
    challenge: "Having understood the meaning and importance of Christian fellowship, I commit to faithfully join my brothers and sisters every Sunday and in my small group each week. Together we will grow in love, good works, and joyful expectation of Your return. In JESUS CHRIST my LORD and SAVIOR, Amen."
  },
  {
    id: "consolidation-7",
    title: "Lesson 7: The Deep Significance of Water Baptism",
    category: "Consolidation",
    readingTime: "7 min read",
    scriptureFocus: {
      reference: "Romans 6:1–4 (NIV)",
      text: "What shall we say, then? Shall we go on sinning so that grace may increase? By no means! We are those who have died to sin; how can we live in it any longer?..."
    },
    objectives: [
      "To understand the true meaning and spiritual significance of water baptism.",
      "To see baptism as a public testimony of our union with CHRIST in His death, burial, and resurrection, and a call to live a new life of holiness and obedience to GOD."
    ],
    teachingSections: [
      {
        id: "c-7-intro",
        number: 1,
        title: "Introduction",
        paragraphs: [
          "What is water baptism? Why is it important to every true believer in CHRIST?",
          "Water baptism is an outward expression of an inward transformation. It is a public declaration that we have been united with CHRIST — that our old life has died, we have been buried with Him, and we now live a new life by His power.",
          "Through baptism, we declare to the world that we belong to JESUS, and that our hearts, wills, and purposes are surrendered to Him."
        ]
      },
      {
        id: "c-7-1",
        number: 2,
        title: "Our Unity with CHRIST Means Death to Sin",
        paragraphs: [
          "“What shall we say, then? Shall we go on sinning so that grace may increase? By no means! We are those who have died to sin; how can we live in it any longer?” — Romans 6:1–2 (NIV)",
          "When we are united with CHRIST by faith, we share in His death to sin. This means sin no longer rules our lives — we are free from its power and penalty.",
          "The apostle Paul reminds believers that grace is not a license to sin, but the power to live in victory over sin.",
          "To be “dead to sin” means our old way of life has ended, and we now live to please GOD.",
          "Key Truth: Water baptism affirms that we have turned from sin and surrendered completely to CHRIST."
        ]
      },
      {
        id: "c-7-2",
        number: 3,
        title: "Water Baptism Symbolizes Our Union with CHRIST in His Death",
        paragraphs: [
          "“Don’t you know that all of us who were baptized into CHRIST JESUS were baptized into his death?” — Romans 6:3 (NIV)",
          "Baptism is more than a ceremony — it is a symbol of spiritual reality.",
          "When we are immersed in water, it represents our participation in CHRIST’S death on the cross.",
          "Just as JESUS died for sin, we too die to our old self and sinful ways. The act of immersion publicly declares that we have left behind our past and belong to CHRIST.",
          "Key Truth: In baptism, we testify that our old life has been crucified with CHRIST."
        ]
      },
      {
        id: "c-7-3",
        number: 4,
        title: "Water Baptism Symbolizes Our Union with CHRIST in His Burial",
        paragraphs: [
          "“We were therefore buried with him through baptism into death in order that, just as CHRIST was raised from the dead through the glory of the Father, we too may live a new life.” — Romans 6:4 (NIV)",
          "Being submerged under water represents burial — the closing of our old life.",
          "It shows that we have fully identified with CHRIST’S death and are now separated from our past life of sin.",
          "Just as CHRIST was buried and then raised in glory, so we too are buried to sin and raised to walk in newness of life.",
          "Key Truth: Baptism declares that our old sinful self is gone, buried, and no longer defines who we are."
        ]
      },
      {
        id: "c-7-4",
        number: 5,
        title: "Water Baptism Symbolizes Our Union with CHRIST in His Resurrection",
        paragraphs: [
          "“For if we have been united with him in a death like his, we will certainly also be united with him in a resurrection like his.” — Romans 6:5 (NIV)",
          "When we rise out of the water, we symbolize the resurrection — the new life GOD has given us in CHRIST.",
          "This is the life of spiritual renewal and power, where we live not for ourselves but for the glory of GOD.",
          "Resurrection life means daily walking in obedience, victory, and joy, knowing we have been made alive in CHRIST.",
          "Key Truth: Baptism reminds us that we have been raised with CHRIST to live a new life filled with His presence and purpose."
        ]
      },
      {
        id: "c-7-5",
        number: 6,
        title: "Conclusion",
        paragraphs: [
          "Water baptism is a powerful testimony of our salvation and transformation.",
          "It symbolizes our unity with CHRIST in His death, burial, and resurrection — and declares to the world that we now live for Him.",
          "To be baptized is not only to follow an ordinance of faith, but to live a life that reflects its meaning: dead to sin, alive to GOD."
        ]
      }
    ],
    reflectionQuestions: [
      "What does it mean to be united with CHRIST in His death, burial, and resurrection?",
      "How does water baptism symbolize your new life in CHRIST?",
      "Why do you think GOD commands believers to publicly declare their faith through baptism?",
      "How can you continue to live as one who has “died to sin and lives to GOD”?"
    ],
    prayer: "LORD GOD Almighty, thank You for saving me through the death and resurrection of JESUS CHRIST. Thank You for the symbol of baptism that reminds me of my new life in You. Help me to live daily in obedience, purity, and gratitude, as one who has died to sin and now lives for Your glory. Amen.",
    challenge: "O my LORD GOD Almighty, I am committing myself to live in full unity with CHRIST in His death, burial, and resurrection. Help me to walk in the new life You have given me, dead to sin and alive to Your righteousness. In JESUS CHRIST my LORD and SAVIOR, Amen."
  },
  {
    id: "consolidation-8",
    title: "Lesson 8: The Meaning and Importance of the LORD’S Supper",
    category: "Consolidation",
    readingTime: "7 min read",
    scriptureFocus: {
      reference: "Luke 22:19–20 & 1 Corinthians 11:27–28 (NIV)",
      text: "And he took bread, gave thanks and broke it, and gave it to them, saying, ‘This is my body given for you; do this in remembrance of me.’... Everyone ought to examine themselves before they eat of the bread and drink from the cup."
    },
    objectives: [
      "To understand the meaning and importance of the LORD’S Supper as a sacred act of remembrance, proclamation, anticipation, and personal renewal.",
      "To learn how to participate reverently and with gratitude for CHRIST’S redeeming work."
    ],
    teachingSections: [
      {
        id: "c-8-intro",
        number: 1,
        title: "Introduction",
        paragraphs: [
          "What does the LORD’S Supper signify? Why should believers observe it regularly?",
          "The LORD’S Supper (also called Communion) is one of the two ordinances that JESUS Himself instituted for His followers — the other being water baptism.",
          "It is a holy act of remembrance and worship that celebrates JESUS’ sacrifice for our salvation.",
          "Each time we partake of the bread and cup, we remember what He has done, proclaim His death, and look forward to His return."
        ]
      },
      {
        id: "c-8-1",
        number: 2,
        title: "The Bread Is the Symbol of the LORD’S Body",
        paragraphs: [
          "“This is my body given for you; do this in remembrance of me.” — Luke 22:19 (NIV)",
          "The bread represents the body of JESUS, which He gave willingly for us on the cross.",
          "His suffering and death were the price of our redemption — freeing us from sin and reconciling us to GOD.",
          "As we eat the bread, we remember His sacrifice with deep gratitude, and we commit to live in obedience to the One who gave His life for us.",
          "Key Truth: The broken bread reminds us of JESUS’ body broken for our sins — the proof of His love."
        ]
      },
      {
        id: "c-8-2",
        number: 3,
        title: "The Cup Symbolizes the LORD’S Blood",
        paragraphs: [
          "“This cup is the new covenant in my blood, which is poured out for you.” — Luke 22:20 (NIV)",
          "The cup represents the blood of JESUS CHRIST, shed for the forgiveness of sins.",
          "In the Old Covenant, animal sacrifices were offered repeatedly, but in the New Covenant, JESUS shed His own blood once for all to cleanse us completely.",
          "When we drink from the cup, we remember that our salvation is secured by His blood — the seal of the new covenant.",
          "Key Truth: The cup reminds us that through CHRIST’S blood, we are forgiven, cleansed, and made new."
        ]
      },
      {
        id: "c-8-3",
        number: 4,
        title: "The LORD’S Supper Declares His Sacrificial Death",
        paragraphs: [
          "“For whenever you eat this bread and drink this cup, you proclaim the LORD’S death until he comes.” — 1 Corinthians 11:26 (NIV)",
          "Each time believers gather to celebrate the LORD’S Supper, we are making a public declaration: JESUS died for us — and His death still saves.",
          "In taking Communion, we proclaim the central truth of the Gospel before GOD, before one another, and before the world.",
          "It is not just a private act, but a corporate testimony of our faith in CHRIST’S redeeming work.",
          "Key Truth: The LORD’S Supper proclaims that CHRIST’S death is the heart of our faith and hope."
        ]
      },
      {
        id: "c-8-4",
        number: 5,
        title: "The LORD’S Supper Is a Foretaste of GOD’S Coming Kingdom",
        paragraphs: [
          "“For I tell you, I will not eat it again until it finds fulfillment in the kingdom of GOD.” — Luke 22:16 (NIV)",
          "When we partake of the LORD’S Supper, we not only look back to the cross — we also look forward to the future.",
          "It is a foretaste of the great wedding banquet in heaven, when CHRIST will gather His redeemed people for eternal fellowship and joy.",
          "Our communion on earth points to our coming reunion with Him in glory.",
          "Key Truth: Communion looks forward to the day when believers will feast with CHRIST in His eternal Kingdom."
        ]
      },
      {
        id: "c-8-5",
        number: 6,
        title: "The LORD’S Supper Must Be Observed Reverently",
        paragraphs: [
          "“Everyone ought to examine themselves before they eat of the bread and drink from the cup.” — 1 Corinthians 11:28 (NIV)",
          "The LORD’S Supper is sacred, and should never be taken lightly or carelessly.",
          "Before partaking, we are called to examine our hearts — confessing sin, renewing our faith, and reconciling with others if needed.",
          "To partake “in an unworthy manner” means to take the symbols without sincere faith or self-examination.",
          "True participation comes with humility, reverence, and gratitude.",
          "Key Truth: Communion invites us to examine our hearts and renew our devotion to CHRIST."
        ]
      },
      {
        id: "c-8-6",
        number: 7,
        title: "Conclusion",
        paragraphs: [
          "JESUS gave us two sacred ordinances to remember and proclaim His saving work: Water Baptism and The LORD’S Supper.",
          "Water baptism testifies to our union with CHRIST; the LORD’S Supper reminds us of our ongoing fellowship with Him and one another.",
          "Every true believer should take both seriously — not as rituals, but as acts of love and obedience that point us back to the cross and forward to His coming glory."
        ]
      }
    ],
    reflectionQuestions: [
      "What does the LORD’S Supper mean to you personally?",
      "Why must believers approach Communion with reverence and self-examination?",
      "How does remembering CHRIST’S sacrifice affect your daily life and worship?",
      "In what ways does the LORD’S Supper strengthen your fellowship with other believers?",
      "How does this ordinance prepare you for the coming Kingdom of GOD?"
    ],
    prayer: "LORD JESUS, thank You for giving Your body and blood for my salvation. Teach me to remember Your sacrifice with reverence, gratitude, and faith. May every Communion remind me of Your love, renew my devotion, and prepare me for Your coming. Amen.",
    challenge: "LORD, I now commit myself to You — to obey You through water baptism and to regularly observe the LORD’S Supper with a grateful and reverent heart. May my life continually proclaim Your death and resurrection until You come again. In JESUS CHRIST my LORD and SAVIOR, Amen."
  },
  {
    id: "consolidation-9",
    title: "Lesson 9: How to Overcome Temptation",
    category: "Consolidation",
    readingTime: "7 min read",
    scriptureFocus: {
      reference: "1 Corinthians 10:13 (NIV)",
      text: "No temptation has overtaken you except what is common to mankind. And GOD is faithful; he will not let you be tempted beyond what you can bear..."
    },
    objectives: [
      "To understand the nature and source of temptation.",
      "To learn how to overcome temptation through GOD’S faithfulness, wisdom, and strength — so we may live victoriously and fruitfully in CHRIST."
    ],
    teachingSections: [
      {
        id: "c-9-intro",
        number: 1,
        title: "Introduction",
        paragraphs: [
          "Temptation is one of the oldest and most personal battles of every believer.",
          "It is not a sin to be tempted — even JESUS was tempted — but it becomes sin when we yield to it.",
          "Temptation is a daily reality, but victory is possible through the power of the HOLY SPIRIT.",
          "GOD’S Word gives us clear principles on how to resist and overcome it. Let us learn how to respond with faith, wisdom, and obedience each time temptation comes our way."
        ]
      },
      {
        id: "c-9-1",
        number: 2,
        title: "Know That Temptation Is Common and Can Overtake Anyone",
        paragraphs: [
          "“No temptation has overtaken you except what is common to mankind.” — 1 Corinthians 10:13a",
          "Temptation is not unique to you. Every believer faces it — young or old, new or mature.",
          "Knowing this truth keeps us from self-pity or pride and reminds us to depend on GOD’S grace.",
          "Key Truth: You are not alone in facing temptation — but you are never without GOD’S help."
        ]
      },
      {
        id: "c-9-2",
        number: 3,
        title: "Know That Temptation Comes from the Devil",
        paragraphs: [
          "“Then JESUS was led by the SPIRIT into the wilderness to be tempted by the devil.” — Matthew 4:1",
          "“When tempted, no one should say, ‘GOD is tempting me.’” — James 1:13",
          "Temptation’s source is not GOD but the enemy of our souls — Satan. His goal is to deceive, distract, and destroy.",
          "But remember: temptation is not sin; yielding to it is.",
          "Key Truth: The devil tempts us to fall; GOD tests us to strengthen our faith."
        ]
      },
      {
        id: "c-9-3",
        number: 4,
        title: "Know That Temptation Begins Within — Through Our Own Desires",
        paragraphs: [
          "“Each person is tempted when they are dragged away by their own evil desire and enticed.” — James 1:14",
          "Temptation often starts not from the outside but from the desires within.",
          "It begins with a thought, becomes a desire, and — if unchecked — leads to action and sin.",
          "“Then, after desire has conceived, it gives birth to sin; and sin, when it is full-grown, gives birth to death.” — James 1:15",
          "Key Truth: Guard your thoughts, because temptation wins first in the mind before it wins in action."
        ]
      },
      {
        id: "c-9-4",
        number: 5,
        title: "Claim That GOD Is Faithful to Limit the Power of Temptation",
        paragraphs: [
          "“And GOD is faithful; he will not let you be tempted beyond what you can bear.” — 1 Corinthians 10:13b",
          "GOD knows your limits. He never allows temptation beyond your capacity to resist.",
          "Every trial or temptation is under His sovereign control — measured, timed, and meant for your growth.",
          "Key Truth: GOD’S faithfulness places a boundary around every temptation."
        ]
      },
      {
        id: "c-9-5",
        number: 6,
        title: "Claim That GOD Provides a Way of Escape",
        paragraphs: [
          "“But when you are tempted, he will also provide a way out so that you can endure it.” — 1 Corinthians 10:13c",
          "Every temptation comes with an exit door designed by GOD.",
          "Sometimes the escape is prayer, sometimes walking away, sometimes Scripture, sometimes godly counsel — but it’s always there.",
          "Key Truth: The wise believer looks for GOD’S escape route instead of reasoning with temptation."
        ]
      },
      {
        id: "c-9-6",
        number: 7,
        title: "Claim That GOD Gives You Strength to Endure",
        paragraphs: [
          "“…so that you can endure it.” — 1 Corinthians 10:13d",
          "Victory over temptation is not just escape, but endurance — the strength to stay faithful.",
          "When temptation feels overwhelming, remember: the same SPIRIT who empowered JESUS to resist in the wilderness lives in you.",
          "Key Truth: Endurance is GOD’S power working in you to stand firm until temptation passes."
        ]
      },
      {
        id: "c-9-7",
        number: 8,
        title: "Conclusion",
        paragraphs: [
          "Every believer faces temptation, but no one needs to be defeated by it.",
          "You can overcome by following GOD’S principles: Recognize temptation for what it is, reject its source, and rely on GOD’S faithfulness.",
          "Make it a daily habit to walk closely with GOD, to fill your heart with His Word, and to pray for wisdom.",
          "Through CHRIST, you are not a victim of temptation — you are a victor."
        ]
      }
    ],
    reflectionQuestions: [
      "Why do you think GOD allows believers to face temptation?",
      "What makes temptation powerful or appealing to you personally?",
      "How can you identify “the way of escape” when temptation comes?",
      "What role does Scripture memory and prayer play in overcoming temptation?",
      "What changes can you make today to strengthen your resistance to sin?"
    ],
    prayer: "O my LORD GOD Almighty, thank You that You are faithful and will not let me be tempted beyond what I can bear. When temptation comes, help me see the way of escape and strengthen me to endure. Teach me to guard my heart, depend on Your SPIRIT, and live victoriously in CHRIST. Amen.",
    challenge: "LORD, I commit myself to Your wisdom and power. Help me overcome every temptation I face each day, that I may live a pure, joyful, and fruitful life for Your glory. In JESUS CHRIST my LORD and SAVIOUR, Amen."
  },
  {
    id: "consolidation-10",
    title: "Lesson 10: How to Overcome Trials",
    category: "Consolidation",
    readingTime: "7 min read",
    scriptureFocus: {
      reference: "James 1:2–5 (NIV)",
      text: "Consider it pure joy, my brothers and sisters, whenever you face trials of many kinds, because you know that the testing of your faith produces perseverance..."
    },
    objectives: [
      "To understand the divine purpose behind our trials.",
      "To learn how to respond to trials with joy, faith, and endurance — trusting that GOD uses every challenge to mature us in CHRIST."
    ],
    teachingSections: [
      {
        id: "c-10-intro",
        number: 1,
        title: "Introduction",
        paragraphs: [
          "Everything that happens on earth has a divine purpose for our growth and well-being as disciples of JESUS CHRIST.",
          "Trials are not temptations. Temptations come from the devil to make us fall, but trials come from GOD to help us grow.",
          "Through trials, our faith is tested, refined, and strengthened. GOD allows them not to destroy us, but to develop us — to mold us into mature believers who reflect CHRIST’S endurance and faithfulness.",
          "Let us discover from the Word of GOD how to face and overcome trials with joy."
        ]
      },
      {
        id: "c-10-1",
        number: 2,
        title: "We Will Encounter Various Trials",
        paragraphs: [
          "“When you face trials of many kinds…” — James 1:2 (NIV)",
          "Trials are part of life — not a sign of GOD’S absence but of His involvement in shaping our character.",
          "We should not be surprised by them; instead, we must see them as opportunities for growth.",
          "Key Truth: Trials are not punishments but invitations to grow closer to GOD."
        ]
      },
      {
        id: "c-10-2",
        number: 3,
        title: "Trials Are a Testing of Our Faith",
        paragraphs: [
          "“Because you know that the testing of your faith…” — James 1:3 (NIV)",
          "Trials reveal what is truly in our hearts. They purify our faith like gold tested by fire.",
          "Through testing, faith moves from theory to experience — from mere belief to proven trust.",
          "Key Truth: Faith that is never tested is faith that can never be trusted."
        ]
      },
      {
        id: "c-10-3",
        number: 4,
        title: "The Testing of Our Faith Produces Endurance",
        paragraphs: [
          "“The testing of your faith produces perseverance.” — James 1:3 (NIV)",
          "Endurance is the ability to remain steadfast and faithful under pressure.",
          "Every trial strengthens our spiritual muscles — teaching us patience, humility, and reliance on GOD’S grace.",
          "Key Truth: Endurance is the mark of a true disciple."
        ]
      },
      {
        id: "c-10-4",
        number: 5,
        title: "Endurance Leads to Maturity and Completeness",
        paragraphs: [
          "“Let perseverance finish its work so that you may be mature and complete, not lacking anything.” — James 1:4 (NIV)",
          "When we endure trials with faith, we become spiritually mature and whole.",
          "Our hearts are refined; our faith deepens. GOD completes in us what He began.",
          "Key Truth: GOD uses trials to finish His good work in us."
        ]
      },
      {
        id: "c-10-5",
        number: 6,
        title: "Perseverance Leads to Divine Approval and Glory",
        paragraphs: [
          "“Blessed is the one who perseveres under trial because... that person will receive the crown of life...” — James 1:12 (NIV)",
          "The reward for perseverance is not only present peace but eternal joy — the “crown of life.”",
          "GOD honors those who remain faithful through hardships.",
          "Key Truth: Trials refine us now and reward us later."
        ]
      },
      {
        id: "c-10-6",
        number: 7,
        title: "GOD Grants Wisdom Generously to Those Who Ask",
        paragraphs: [
          "“If any of you lacks wisdom, you should ask GOD, who gives generously to all without finding fault.” — James 1:5 (NIV)",
          "When you don’t understand your trial, ask for wisdom, not relief.",
          "GOD gives insight to those who seek His guidance humbly. He will show you how to respond with faith, patience, and grace.",
          "Key Truth: Wisdom is the divine perspective that turns trials into triumphs."
        ]
      },
      {
        id: "c-10-7",
        number: 8,
        title: "Therefore, Count It All Joy!",
        paragraphs: [
          "“Consider it pure joy, my brothers and sisters, whenever you face trials of many kinds.” — James 1:2 (NIV)",
          "Joy in trials is not denial of pain — it is confidence in GOD’S purpose.",
          "We rejoice not because of trials, but in spite of them, knowing that every struggle brings us closer to the likeness of CHRIST.",
          "Key Truth: Joy is the believer’s victory song in the midst of battle."
        ]
      },
      {
        id: "c-10-8",
        number: 9,
        title: "Conclusion",
        paragraphs: [
          "It may seem impossible to rejoice in hardship, but through faith, it becomes a miracle of grace.",
          "Every trial we face is a tool in GOD’S hand — shaping our character, testing our faith, and preparing us for eternal glory.",
          "The best way to overcome trials is to “count it all joy” and thank GOD for His faithfulness. He never wastes a trial."
        ]
      }
    ],
    reflectionQuestions: [
      "Why does GOD allow trials in the life of a believer?",
      "How can joy and suffering exist together in the Christian life?",
      "What has a recent trial taught you about faith or endurance?",
      "How can asking for wisdom help you handle challenges better?",
      "What practical steps can you take to “count it all joy” during your next trial?"
    ],
    prayer: "O my LORD GOD Almighty, thank You for turning my trials into opportunities for growth. Teach me to face every challenge with faith and joy, knowing that You are shaping me to become more like CHRIST. Fill me with wisdom and strength to endure victoriously. Amen.",
    challenge: "LORD, I commit myself to live in victory over every trial. Help me to count it all joy, to endure with faith, and to trust You completely in all circumstances. In JESUS CHRIST my LORD and SAVIOR, Amen."
  },
  {
    id: "consolidation-11",
    title: "Lesson 11: The Work of Sanctification",
    category: "Consolidation",
    readingTime: "7 min read",
    scriptureFocus: {
      reference: "1 Corinthians 6:11 & 1 Peter 1:1–2 (NIV)",
      text: "But you were washed, you were sanctified, you were justified in the name of the LORD JESUS CHRIST and by the SPIRIT of our GOD."
    },
    objectives: [
      "To understand what sanctification means, how it works, and why it is essential for every believer.",
      "To recognize the HOLY SPIRIT’S ongoing role in transforming us to be more like JESUS CHRIST in holiness, character, and conduct."
    ],
    teachingSections: [
      {
        id: "c-11-intro",
        number: 1,
        title: "Introduction",
        paragraphs: [
          "Sometimes we assume that GOD is growing us without any clear direction.",
          "Yet, the goal of all true spiritual growth is holiness — this is what the Bible calls sanctification (pagpapabanal).",
          "We often say, “GOD is not finished with me yet.” That’s true!",
          "Because the Christian life is not about perfection overnight, but progressive transformation — a lifelong journey toward Christlikeness through the power of the HOLY SPIRIT."
        ]
      },
      {
        id: "c-11-1",
        number: 2,
        title: "What Is Sanctification?",
        paragraphs: [
          "The Greek word hagiasmos means to make holy, to set apart, to consecrate.",
          "To be sanctified means to be set apart for GOD’S purpose — devoted entirely to His service, and being purified from all sin and impurity.",
          "Sanctification is both a position (we are already made holy in CHRIST) and a process (we are being made holy daily by the SPIRIT).",
          "Key Truth: Sanctification means becoming in practice what GOD has already declared us to be in CHRIST."
        ]
      },
      {
        id: "c-11-2",
        number: 3,
        title: "Who Is Responsible for Our Sanctification?",
        paragraphs: [
          "GOD Himself — Father, Son, and HOLY SPIRIT — works together for our sanctification.",
          "But it is particularly the HOLY SPIRIT who applies this work in our hearts and lives.",
          "“…through the sanctifying work of the SPIRIT…” — 1 Peter 1:2",
          "We also have a responsibility. We must cooperate with the SPIRIT by faith, obedience, and surrender. Sanctification is not passive — it’s a partnership between divine grace and human willingness.",
          "Key Truth: The HOLY SPIRIT empowers; the believer cooperates."
        ]
      },
      {
        id: "c-11-3",
        number: 4,
        title: "Why Is Sanctification Necessary?",
        paragraphs: [
          "Sanctification is necessary because it prepares us for GOD’S glory and life in His presence.",
          "We are being made like CHRIST — fit for heaven and equipped to glorify GOD in this world.",
          "“It is GOD’S will that you should be sanctified.” — 1 Thessalonians 4:3",
          "Key Truth: Only those who are made holy will fully enjoy the presence of a holy GOD."
        ]
      },
      {
        id: "c-11-4",
        number: 5,
        title: "How Long Does Sanctification Take Place?",
        paragraphs: [
          "Sanctification is both a finished work and a continuing process.",
          "A Finished Work: “But you were washed, you were sanctified, you were justified…” — 1 Corinthians 6:11. Through CHRIST’S death and resurrection, believers have already been set apart as holy. This is our spiritual position before GOD.",
          "A Continuing Process: “For by one sacrifice he has made perfect forever those who are being made holy.” — Hebrews 10:14. The SPIRIT continues to transform us daily, shaping us into CHRIST’S image from one degree of glory to another (2 Corinthians 3:18).",
          "Key Truth: Sanctification begins at salvation and continues throughout life — until we are made perfect in glory."
        ]
      },
      {
        id: "c-11-5",
        number: 6,
        title: "What Happens in Sanctification?",
        paragraphs: [
          "“And we all, who with unveiled faces contemplate the LORD’S glory, are being transformed into his image with ever-increasing glory, which comes from the LORD, who is the SPIRIT.” — 2 Corinthians 3:18 (NIV)",
          "Sanctification is the gradual transformation of the believer into the likeness of CHRIST — in character, thoughts, emotions, and behavior.",
          "The HOLY SPIRIT works within the soul — transforming the heart, renewing the mind, and aligning the will to GOD’S desires.",
          "Key Truth: Sanctification is the SPIRIT’S masterpiece in the soul of every believer."
        ]
      },
      {
        id: "c-11-6",
        number: 7,
        title: "How Does Sanctification Work?",
        paragraphs: [
          "Sanctification works through:",
          "• Faith and obedience to GOD’S Word",
          "• Prayer and spiritual disciplines",
          "• Suffering and testing that refine our faith",
          "• The SPIRIT’S indwelling presence",
          "• The finished work of CHRIST — His death, burial, and resurrection",
          "Key Truth: Growth in holiness is lifelong — progress, not perfection, is the SPIRIT’S path."
        ]
      },
      {
        id: "c-11-7",
        number: 8,
        title: "Conclusion",
        paragraphs: [
          "Sanctification begins with a personal relationship with JESUS CHRIST.",
          "To be sanctified, you must first be born again — reconciled to GOD through faith in His Son.",
          "If you have received CHRIST, you have also received the HOLY SPIRIT, your Sanctifier, who now works within you to make you more like JESUS.",
          "So walk daily in obedience, humility, and cooperation with His work in your life."
        ]
      }
    ],
    reflectionQuestions: [
      "Why must a person first be born again before experiencing sanctification?",
      "How does the HOLY SPIRIT practically work to make us holy?",
      "What spiritual habits help you cooperate with GOD’S sanctifying work?",
      "How can you tell that you are growing in sanctification?",
      "What area of your life do you still need to surrender to the SPIRIT’S refining work?"
    ],
    prayer: "LORD, as I have received JESUS CHRIST as my personal LORD and SAVIOR, please continue the sanctifying work of the HOLY SPIRIT in me. Purify my heart, renew my mind, and transform my character until I reflect Your holiness. Help me to live each day in obedience, humility, and love. Amen.",
    challenge: "LORD, I commit myself to cooperate with the HOLY SPIRIT’S sanctifying work in my life. Make me more like JESUS in heart and in action, that I may bring You glory in all things. In JESUS CHRIST my LORD and SAVIOR, Amen."
  },
  {
    id: "consolidation-12",
    title: "Lesson 12: The Practice of Good Relationships",
    category: "Consolidation",
    readingTime: "7 min read",
    scriptureFocus: {
      reference: "Luke 6:31 & Romans 12:18 (NIV)",
      text: "Do to others as you would have them do to you... If it is possible, as far as it depends on you, live at peace with everyone."
    },
    objectives: [
      "To learn how to practice healthy, godly relationships rooted in love, peace, and purity.",
      "To be guided by biblical principles that honor GOD and bless others."
    ],
    teachingSections: [
      {
        id: "c-12-intro",
        number: 1,
        title: "Introduction",
        paragraphs: [
          "Relationships are one of GOD’S greatest gifts — but also one of the greatest areas where we need His grace.",
          "Our relationship with GOD affects how we relate to others. That is why JESUS summarized the entire Law in two commands: 'Love the LORD your GOD… and love your neighbor as yourself.' — Matthew 22:37–39 (NIV)",
          "To build good relationships, we must let GOD’S love rule our hearts, His wisdom guide our actions, and His SPIRIT empower our interactions."
        ]
      },
      {
        id: "c-12-1",
        number: 2,
        title: "Good Relationships Are Always Based on Agape Love",
        paragraphs: [
          "Agape love is the highest kind of love — sacrificial, selfless, and unconditional. It is the love that begins with GOD and flows through us to others.",
          "When love is our foundation, relationships become strong, healthy, and life-giving.",
          "Without love, even the best efforts to maintain peace or respect will eventually fail.",
          "Key Truth: Love is not just a feeling — it is a daily decision to reflect CHRIST in how we treat others."
        ]
      },
      {
        id: "c-12-2",
        number: 3,
        title: "Boundaries Ensure Healthy and Peaceful Relationships",
        paragraphs: [
          "GOD’S Word sets boundaries for how we relate to others — to protect our hearts and promote harmony.",
          "• The Golden Rule: “Treat others as you would have them treat you.” — Luke 6:31",
          "• The Rule of Peace: “If it is possible, as far as it depends on you, live at peace with everyone.” — Romans 12:18",
          "• The Rule of Forgiveness: “Be kind and compassionate... forgiving each other, just as in CHRIST GOD forgave you.” — Ephesians 4:32",
          "Key Truth: Biblical boundaries protect relationships and keep our hearts aligned with GOD’S will."
        ]
      },
      {
        id: "c-12-3",
        number: 4,
        title: "Premature Emotional or Sexual Relationships Are Inadvisable",
        paragraphs: [
          "“Do not arouse or awaken love until it so desires.” — Song of Songs 2:7 (NIV)",
          "GOD created romantic and sexual relationships to be enjoyed within the covenant of marriage.",
          "Premature emotional or physical intimacy outside of marriage leads to heartache and sin.",
          "True love waits — it honors GOD’S timing, values purity, and respects the dignity of others.",
          "Key Truth: Purity protects love; patience proves love."
        ]
      },
      {
        id: "c-12-4",
        number: 5,
        title: "Love Between Parents and Children Must Be Guided by GOD’S Word",
        paragraphs: [
          "“Children, obey your parents in the LORD, for this is right... Fathers, do not provoke your children to anger...” — Ephesians 6:1–4 (NIV)",
          "Healthy family relationships are built on mutual respect, obedience, and understanding.",
          "Children are called to obey and honor their parents, while parents are called to nurture with love and patience.",
          "Key Truth: Families grow stronger when both parents and children reflect CHRIST’S love and humility."
        ]
      },
      {
        id: "c-12-5",
        number: 6,
        title: "Relationships Among Believers Must Be Governed by Purity",
        paragraphs: [
          "“Treat younger men as brothers, older women as mothers, and younger women as sisters, with absolute purity.” — 1 Timothy 5:1–2 (NIV)",
          "In the family of GOD, we are to relate to one another with holiness, respect, and moral integrity.",
          "The church is a spiritual household — every relationship must be marked by sincerity, humility, and purity.",
          "Key Truth: GOD’S family is built on honor and holiness."
        ]
      },
      {
        id: "c-12-6",
        number: 7,
        title: "Relationships with Non-Believers Must Reflect Justice, Compassion, and the Gospel",
        paragraphs: [
          "“He has shown you, O mortal, what is good. And what does the LORD require of you? To act justly and to love mercy and to walk humbly with your GOD.” — Micah 6:8 (NIV)",
          "As followers of CHRIST, our relationships with non-believers should reflect GOD’S justice, mercy, and love.",
          "We are called to treat all people with compassion and to be living witnesses of the Gospel through our words and actions.",
          "Key Truth: Our relationships should lead others to see CHRIST in us."
        ]
      },
      {
        id: "c-12-7",
        number: 8,
        title: "Conclusion",
        paragraphs: [
          "The practice of good relationships begins with loving GOD and extends to loving others rightly.",
          "When our relationships are grounded in agape love, guided by biblical principles, and empowered by the HOLY SPIRIT, they bring glory to GOD and peace to our lives.",
          "Let us commit to live by GOD’S rules of love, peace, forgiveness, and purity — building relationships that honor CHRIST in every season of life."
        ]
      }
    ],
    reflectionQuestions: [
      "What motivates you most to practice good relationships?",
      "Which biblical rule (love, peace, forgiveness, purity) speaks most to your current relationships?",
      "What relationships in your life need reconciliation or healing?",
      "How can you reflect CHRIST more clearly in your family, friendships, or work relationships?",
      "What practical boundaries can you set to maintain healthy and godly relationships?"
    ],
    prayer: "O my LORD GOD Almighty, teach me to love You above all and to love others as You have loved me. Help me to live at peace with everyone, forgive as I have been forgiven, and walk in purity and truth. Strengthen me to reflect Your character in every relationship I have. Amen.",
    challenge: "LORD, I commit to love You and my neighbors with all my heart, soul, and strength. Help me to establish biblical principles and boundaries that honor You in all my relationships. In JESUS CHRIST my LORD and SAVIOR, Amen."
  },
  {
    id: "consolidation-13",
    title: "Lesson 13: The Importance of Godliness, Justice, and Compassion",
    category: "Consolidation",
    readingTime: "7 min read",
    scriptureFocus: {
      reference: "Micah 6:8 (NIV)",
      text: "He has shown you, O man, what is good; and what does the LORD require of you but to do justice, to love mercy, and to walk humbly with your GOD."
    },
    objectives: [
      "To understand that true godliness is not only personal holiness but also active righteousness and compassion toward others.",
      "To live out what GOD requires: to do justice, love mercy, and walk humbly with Him."
    ],
    teachingSections: [
      {
        id: "c-13-intro",
        number: 1,
        title: "Introduction",
        paragraphs: [
          "In the time of the prophet Micah, GOD’S people — the Israelites — were deeply religious but morally corrupt. They offered sacrifices and observed rituals but neglected justice, kindness, and humility.",
          "Through Micah, GOD rebuked their hypocrisy and reminded them what true goodness looks like. Yet, in His mercy, He promised deliverance through the coming Messiah.",
          "As GOD’S redeemed people in CHRIST today, we are called to restore this kind of life — one that reflects His character through godliness, justice, and compassion."
        ]
      },
      {
        id: "c-13-1",
        number: 2,
        title: "What Has the LORD Told Mankind?",
        paragraphs: [
          "“He has shown you, O man, what is good…” — Micah 6:8a",
          "GOD has not hidden His will. He has revealed to us clearly what is good — not in complex rituals or sacrifices, but in how we live out His character every day.",
          "Key Truth: GOD’S will is not mysterious — it is moral, relational, and practical."
        ]
      },
      {
        id: "c-13-2",
        number: 3,
        title: "The Three Requirements of the LORD",
        paragraphs: [
          "“What does the LORD require of you? To do justice, to love mercy, and to walk humbly with your GOD.” — Micah 6:8b",
          "GOD’S requirements for His people are clear and simple, yet profoundly demanding.",
          "They touch the heart (mercy), the hands (justice), and the walk (humility).",
          "a) To Do Justice — act rightly and fairly in all relationships.",
          "b) To Love Mercy — show steadfast love and compassion to others.",
          "c) To Walk Humbly with GOD — live dependently and obediently under His authority.",
          "Key Truth: True religion is not about ritual performance but righteous living."
        ]
      },
      {
        id: "c-13-3",
        number: 4,
        title: "Defining Each Virtue",
        paragraphs: [
          "Justice — Doing what is right and fair before GOD and man. It means standing up for truth, defending the oppressed, and giving each person their due (Proverbs 21:3; Isaiah 1:17).",
          "Kindness / Mercy — Showing compassion, forgiveness, and steadfast love even when it is undeserved (Hosea 6:6; Matthew 5:7). Mercy is love in action.",
          "Humility — Acknowledging our dependence on GOD, giving Him the glory, and treating others with gentleness and respect (Philippians 2:3–5; James 4:6).",
          "Key Truth: Justice reflects GOD’S righteousness; mercy reveals His love; humility mirrors His character."
        ]
      },
      {
        id: "c-13-4",
        number: 5,
        title: "Why Are These Three Necessary?",
        paragraphs: [
          "Justice, mercy, and humility are inseparable marks of a godly life. Without them:",
          "• Justice becomes cold legality.",
          "• Mercy becomes mere sentimentality.",
          "• Humility becomes false modesty.",
          "Together, they form the moral balance of a believer who walks with GOD. They express the very heart of CHRIST — who acted justly, loved deeply, and walked humbly with His Father.",
          "Key Truth: Godliness is not complete without justice and compassion."
        ]
      },
      {
        id: "c-13-5",
        number: 6,
        title: "Applying These Christian Moral Concerns",
        paragraphs: [
          "To Do Justice: Be honest and fair in all dealings. Defend the weak and speak against injustice. Treat everyone with equity, regardless of status or background.",
          "To Love Mercy: Forgive freely as CHRIST forgave you. Be generous to the poor and kind to the hurting. Let compassion guide your decisions and actions.",
          "To Walk Humbly with GOD: Pray daily with a teachable heart. Acknowledge your dependence on GOD’S grace. Serve others without seeking recognition or reward.",
          "Key Truth: The closer you walk with GOD, the more you will act with justice, mercy, and humility."
        ]
      },
      {
        id: "c-13-6",
        number: 7,
        title: "Conclusion",
        paragraphs: [
          "GOD requires not religion but righteousness. To be godly is to be like Him — just, merciful, and humble.",
          "When we practice these virtues, we reflect His image to a watching world and fulfill our calling as His people.",
          "Let us live each day doing justice, loving mercy, and walking humbly with our GOD — for this is what the LORD truly delights in."
        ]
      }
    ],
    reflectionQuestions: [
      "Why are justice, mercy, and humility the core requirements of godly living?",
      "How does JESUS CHRIST model these three virtues in His ministry?",
      "Which of the three (justice, mercy, humility) do you find most challenging to live out? Why?",
      "How can your church or cell group practice these values together in community?",
      "What change in your daily behavior would best demonstrate your walk with GOD?"
    ],
    prayer: "O my LORD GOD Almighty, thank You for showing me what is good. Help me to act justly, to love mercy, and to walk humbly with You. Let Your character shine through my actions, that others may see Your righteousness and compassion in me. Amen.",
    challenge: "LORD, I commit myself to live in justice, mercy, and humility — not just in words, but in deeds. Transform me daily to reflect Your goodness in my relationships, decisions, and service. In JESUS CHRIST my LORD and SAVIOUR, Amen."
  },
  {
    id: "consolidation-14",
    title: "Lesson 14: Faithful Tithes and Generous Giving",
    category: "Consolidation",
    readingTime: "7 min read",
    scriptureFocus: {
      reference: "Matthew 23:23 & Malachi 3:8,10 (NIV)",
      text: "Woe to you, teachers of the law and Pharisees, you hypocrites! You give a tenth of your spices—mint, dill and cumin. But you have neglected the more important matters of the law—justice, mercy and faithfulness..."
    },
    objectives: [
      "To understand GOD’S design for faithful tithing and generous giving — not as mere religious duty, but as an act of worship, gratitude, and trust.",
      "To reflect His own generous heart and sustain His work through the Church."
    ],
    teachingSections: [
      {
        id: "c-14-intro",
        number: 1,
        title: "Introduction",
        paragraphs: [
          "What do the LORD, the prophets, and the apostles teach about tithing and giving?",
          "The LORD’S command through Malachi is clear: “Bring the whole tithe into the storehouse… Test Me in this… and see if I will not open the windows of heaven and pour out abundant blessings upon you.” (Malachi 3:10)",
          "GOD desires to bless His people — but He first calls us to faithfulness. Giving is not merely financial; it’s spiritual. It’s a tangible expression of our love, trust, and obedience to the One who has given us everything."
        ]
      },
      {
        id: "c-14-1",
        number: 2,
        title: "GOD’S Generous Giving Is at the Heart of Faithful Stewardship",
        paragraphs: [
          "“For GOD so loved the world that he gave his one and only Son…” — John 3:16 (NIV)",
          "GOD is our supreme example of generosity. He didn’t just give out of abundance — He gave His best: His only Son.",
          "True giving flows from love. When we give faithfully, we reflect GOD’S heart — acknowledging that all we have comes from Him and belongs to Him.",
          "Key Truth: Giving is not loss; it is love in action — mirroring the generosity of GOD."
        ]
      },
      {
        id: "c-14-2",
        number: 3,
        title: "GOD’S Shepherds Are Called to Lead and Teach Faithful Giving",
        paragraphs: [
          "“Shepherd the flock of GOD that is under your care… not pursuing dishonest gain, but eager to serve.” — 1 Peter 5:2–3 (NIV)",
          "Pastors and leaders have the responsibility to care for GOD’S people and teach sound doctrine — including biblical stewardship.",
          "They must guide the flock not for personal gain, but with sincerity, modeling integrity and generosity.",
          "Key Truth: Faithful leadership inspires faithful giving."
        ]
      },
      {
        id: "c-14-3",
        number: 4,
        title: "Giving Justice and Compassion Is More Important Than Ritual Tithing",
        paragraphs: [
          "“You should have practiced the latter, without neglecting the former.” — Matthew 23:23 (NIV)",
          "JESUS rebuked those who gave their tithes but ignored justice, mercy, and faithfulness.",
          "Our giving must never be mechanical or prideful — it must be rooted in compassion and righteousness.",
          "The LORD calls us to a holistic generosity: to give financially and to live justly. “Whatever you did for one of the least of these brothers and sisters of mine, you did for me.” — Matthew 25:40 (NIV)",
          "Key Truth: Giving without love is religion; giving with love is worship."
        ]
      },
      {
        id: "c-14-4",
        number: 5,
        title: "Tithing Was Never Abolished — It Was Fulfilled Through Grace",
        paragraphs: [
          "“You should have practiced the latter, without neglecting the former.” — Matthew 23:23c (NIV)",
          "Tithing did not end with the Old Testament. JESUS affirmed it, not as a legal requirement, but as a spiritual practice now fulfilled by grace.",
          "The tithe — meaning “a tenth” — symbolizes dedication, obedience, and gratitude.",
          "Under grace, we give not to be blessed, but because we are already blessed.",
          "Key Truth: Tithing remains a timeless expression of our devotion to GOD."
        ]
      },
      {
        id: "c-14-5",
        number: 6,
        title: "Offerings Are Expressions of Grace and Gratitude",
        paragraphs: [
          "“Each of you should give what you have decided in your heart to give… for GOD loves a cheerful giver.” — 2 Corinthians 9:7 (NIV)",
          "Tithing is commanded; offering is voluntary — yet both come from the same grateful heart.",
          "Through offerings, we express thanksgiving beyond obligation, moved by the grace of GOD in our lives.",
          "“Will a man rob GOD? Yet you rob Me… in tithes and offerings.” — Malachi 3:8 (NIV)",
          "When we withhold what belongs to GOD, we limit not His ability to bless, but our own opportunity to experience His abundance.",
          "Key Truth: Offerings are not payments to GOD but love gifts of worship."
        ]
      },
      {
        id: "c-14-6",
        number: 7,
        title: "Generous and Cheerful Giving Is a New Testament Principle",
        paragraphs: [
          "“Whoever sows sparingly will also reap sparingly, and whoever sows generously will also reap generously… GOD loves a cheerful giver.” — 2 Corinthians 9:6–7 (NIV)",
          "Paul emphasized that giving is a matter of the heart.",
          "Generosity opens our lives to the flow of GOD’S grace — not necessarily in material wealth, but in spiritual enrichment, contentment, and fruitfulness.",
          "Key Truth: GOD blesses the giver to become a channel of blessing to others."
        ]
      },
      {
        id: "c-14-7",
        number: 8,
        title: "Generous Givers Experience GOD’S Overflowing Provision",
        paragraphs: [
          "“And GOD is able to bless you abundantly, so that in all things at all times, having all that you need, you will abound in every good work.” — 2 Corinthians 9:8 (NIV)",
          "GOD does not promise luxury, but sufficiency — enough to meet our needs and bless others.",
          "Generosity is not about how much we have, but how much we trust Him.",
          "Key Truth: When we give faithfully, GOD multiplies grace — not greed."
        ]
      },
      {
        id: "c-14-8",
        number: 9,
        title: "Conclusion",
        paragraphs: [
          "GOD Himself is our divine example of giving: “He who did not spare his own Son, but gave him up for us all — how will he not also, along with him, graciously give us all things?” — Romans 8:32 (NIV)",
          "Faithful tithing and generous giving are not obligations but privileges.",
          "They are acts of worship that acknowledge GOD’S ownership, express our gratitude, and advance His kingdom.",
          "When we give cheerfully and consistently, we not only honor GOD — we participate in His ongoing work of blessing the world."
        ]
      }
    ],
    reflectionQuestions: [
      "What motivates your giving — duty or gratitude?",
      "How do tithes and offerings differ in meaning and purpose?",
      "Why does GOD emphasize “cheerful giving” instead of reluctant giving?",
      "In what ways can generosity shape your character and witness?",
      "How can you practice faithful stewardship in your finances today?"
    ],
    prayer: "O my LORD GOD Almighty, You have given me everything I need. Teach me to give faithfully and joyfully — not out of obligation, but out of love and gratitude. Make me a cheerful and generous steward of all You have entrusted to me. Amen.",
    challenge: "LORD, I commit to be faithful in my tithes and generous in my offerings. Help me to give with joy and trust, knowing that You are the source of all my blessings. In JESUS CHRIST my LORD and SAVIOR, Amen."
  }

  ,...ENVISIONING_LESSONS
];