const fs = require('fs');
const content = fs.readFileSync('src/lessonsData.ts', 'utf8');

const newLessons = `
  ,
  {
    id: "consolidation-1",
    title: "Lesson 1: The Meaning and Practice of Prayer",
    category: "Consolidation",
    readingTime: "7 min read",
    scriptureFocus: {
      reference: "Philippians 4:6–7 & Luke 11:1 (NIV)",
      text: "Do not be anxious about anything, but in every situation, by prayer and petition, with thanksgiving, present your requests to God... Lord, teach us to pray."
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
          "When we pray, we are not informing God of things He doesn’t know, but acknowledging our dependence on Him and inviting His presence and power into our lives.",
          "Key Truth: Prayer is not merely asking from God — it is abiding in Him."
        ]
      },
      {
        id: "c-1-1",
        number: 2,
        title: "What Is Prayer?",
        paragraphs: [
          "Prayer is our spiritual communication with God. It is both talking to God and listening to Him.",
          "It is the expression of our relationship — one rooted in love, trust, and obedience.",
          "“This is the confidence we have in approaching God: that if we ask anything according to his will, he hears us.” — 1 John 5:14",
          "Key Truth: The strength of our spiritual life depends on the strength of our prayer life."
        ]
      },
      {
        id: "c-1-2",
        number: 3,
        title: "Why Should We Pray?",
        paragraphs: [
          "1. Because God commands us to pray. — Luke 18:1; 1 Thessalonians 5:17",
          "2. Because prayer draws us closer to God. — James 4:8",
          "3. Because prayer releases God’s power in our life. — Jeremiah 33:3",
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
          "A — Adoration: Worship God for who He is. Acknowledge His greatness, holiness, and love.",
          "C — Confession: Confess your sins honestly to God and receive His forgiveness through Jesus Christ.",
          "T — Thanksgiving: Thank God for His blessings, provision, and answered prayers.",
          "S — Supplication: Bring your requests to God — for yourself and others."
        ]
      },
      {
        id: "c-1-4",
        number: 5,
        title: "What Should We Expect When We Pray?",
        paragraphs: [
          "God hears us — Psalm 34:17",
          "God answers according to His will — 1 John 5:14–15",
          "God gives peace even before the answer comes — Philippians 4:7",
          "God transforms us through intimacy with Him — 2 Corinthians 3:18",
          "Key Truth: Prayer changes everything — especially the one who prays."
        ]
      },
      {
        id: "c-1-5",
        number: 6,
        title: "Conclusion",
        paragraphs: [
          "Prayer is both a privilege and a discipline. It is where our hearts are aligned with God’s will and our lives are empowered by His Spirit.",
          "When we adore, confess, give thanks, and make our requests known to God, we experience His peace and power at work in us.",
          "Let us make prayer not only a daily habit, but a way of life — the heartbeat of our journey with Jesus."
        ]
      }
    ],
    reflectionQuestions: [
      "How do you personally define prayer in your life today?",
      "Which part of the ACTS pattern do you practice most — and which needs more attention?",
      "How does prayer deepen your relationship with God?",
      "What hinders your prayer life, and how can you overcome it?",
      "How can you incorporate prayer more intentionally into your daily schedule?"
    ],
    prayer: "O LORD, teach me to pray. Fill my heart with awe and love for You. Help me to adore You, confess my sins, give thanks for Your grace, and bring every concern before You. Let my prayers be constant, sincere, and powerful — bringing glory to Your Name. Amen.",
    challenge: "LORD, I commit to make prayer a daily habit and lifestyle. Let me grow deeper in my relationship with You through the discipline of prayer, walking in peace and confidence in Your presence. In Jesus Christ my LORD and SAVIOUR, Amen."
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
      "To understand that memorizing and meditating on God’s Word are essential practices for a growing believer.",
      "To learn how personal devotion leads to spiritual wisdom, strength, and success in living according to God’s will."
    ],
    teachingSections: [
      {
        id: "c-2-intro",
        number: 1,
        title: "Introduction",
        paragraphs: [
          "In Joshua 1:8, God gave His servant Joshua a powerful instruction for success and spiritual maturity.",
          "The key to victory in life and ministry is not found in personal strength, but in constant communion with God through His Word.",
          "God calls His people to keep His Word close — in the heart, on the lips, and in daily reflection — so that we may live in obedience and experience His blessings.",
          "Let us learn the importance of personal devotion and Scripture memory as vital parts of walking closely with the Lord."
        ]
      },
      {
        id: "c-2-1",
        number: 2,
        title: "What Is Personal Devotion?",
        paragraphs: [
          "“But you shall meditate on it day and night.” — Joshua 1:8 (NIV)",
          "Personal devotion is the special time we intentionally set apart to meet with God — to pray, meditate on His Word, and listen to His voice.",
          "For the people of Israel, this was a daily discipline of reflecting deeply on God’s law. For us as followers of Christ, devotion means delighting in God’s Word, allowing it to shape our thoughts, emotions, and actions.",
          "When we spend time alone with God, our relationship with Him grows stronger and our hearts become more aligned with His will."
        ]
      },
      {
        id: "c-2-2",
        number: 3,
        title: "The Importance of Memorizing God’s Word",
        paragraphs: [
          "“This Book of the Law shall not depart from your mouth.” — Joshua 1:8 (NIV)",
          "Memorizing Scripture keeps God’s Word constantly within reach — ready to guide, correct, and encourage us at any moment.",
          "When God’s Word is on our lips, it becomes our language of faith. It helps us resist temptation, renew our minds, and speak life to others.",
          "As Psalm 119:11 says, “I have hidden your word in my heart that I might not sin against you.”",
          "Scripture memory is not about mere repetition — it’s about retention and transformation. It shapes the way we think, speak, and respond to life’s challenges."
        ]
      },
      {
        id: "c-2-3",
        number: 4,
        title: "Why It Is Important to Meditate on and Memorize God’s Word",
        paragraphs: [
          "“…so that you may be careful to do everything written in it.” — Joshua 1:8 (NIV)",
          "Meditation and memorization are not ends in themselves — they lead to obedience.",
          "As we reflect on God’s truths and remember His promises, we are equipped to live according to His will.",
          "The result is both spiritual prosperity and fruitful living: “Then you will be prosperous and successful.” — Joshua 1:8 (NIV)",
          "This kind of success is not worldly achievement, but a life that pleases God — a life full of wisdom, integrity, and peace.",
          "When we fill our hearts with God’s Word and live it out, we experience true joy and blessing."
        ]
      },
      {
        id: "c-2-4",
        number: 5,
        title: "Conclusion",
        paragraphs: [
          "God has given us a clear and simple path to spiritual strength and success — by keeping His Word in our hearts, minds, and daily routines.",
          "As we memorize Scripture, meditate on its truths, and apply it faithfully, our lives are transformed, our faith deepens, and our walk with God grows stronger.",
          "Personal devotion and Scripture memory are not burdens — they are blessings that draw us closer to God and make us fruitful disciples of Christ."
        ]
      }
    ],
    reflectionQuestions: [
      "Why is it important to spend personal time with God in His Word each day?",
      "How does memorizing Scripture help you in your daily decisions and struggles?",
      "What is one verse you can begin memorizing this week to strengthen your faith?",
      "How can you develop a consistent personal devotion routine?",
      "What blessings have you experienced from reflecting on and obeying God’s Word?"
    ],
    prayer: "Lord God, thank You for giving me Your Word as my guide and comfort. Help me to treasure it in my heart, to meditate on it daily, and to live by its truth. Teach me to delight in Your presence as I grow in faith and obedience. Amen.",
    challenge: "Lord, I commit myself to a lifetime of memorizing Your Word and spending time with You in daily devotion. Strengthen my desire to know You more deeply and to walk faithfully in Your Word. In Jesus Christ my Lord and Savior, Amen."
  },
  {
    id: "consolidation-3",
    title: "Lesson 3: Jesus Our Model of Devotion to God",
    category: "Consolidation",
    readingTime: "6 min read",
    scriptureFocus: {
      reference: "Mark 1:35–39 (NIV)",
      text: "Very early in the morning, while it was still dark, Jesus got up, left the house and went off to a solitary place, where he prayed..."
    },
    objectives: [
      "To learn from Jesus’ example of personal devotion.",
      "To understand when, where, and how to spend time with God, and how that private communion empowers faithful, purposeful ministry."
    ],
    teachingSections: [
      {
        id: "c-3-intro",
        number: 1,
        title: "Introduction",
        paragraphs: [
          "Jesus Christ is not only our Savior — He is also our supreme example in every area of life, including devotion to God.",
          "Though He was the Son of God, He continually spent time with His Father in prayer. His devotion was not optional, but essential to His mission.",
          "Let us learn from how Jesus made His time with God meaningful, disciplined, and productive — and how we, too, can pattern our spiritual lives after His."
        ]
      },
      {
        id: "c-3-1",
        number: 2,
        title: "When Should We Have Time with God?",
        paragraphs: [
          "“Very early in the morning, while it was still dark, Jesus got up…” — Mark 1:35a (NIV)",
          "Jesus began His day in fellowship with the Father.",
          "Before any task, conversation, or miracle, He sought strength and direction in prayer.",
          "This teaches us the value of meeting God first thing in the morning — when our hearts are quiet and our minds are clear.",
          "Starting the day with God sets the tone for everything that follows."
        ]
      },
      {
        id: "c-3-2",
        number: 3,
        title: "Where Should We Have Time with God?",
        paragraphs: [
          "“…left the house and went off to a solitary place, where he prayed.” — Mark 1:35b (NIV)",
          "Jesus chose a quiet, solitary place — free from distractions — where He could focus entirely on communion with the Father.",
          "We, too, need a “solitary place” — a personal space where we can pray, read Scripture, and listen to God.",
          "Our spiritual lives grow deeper when we intentionally withdraw from the noise of life to be alone with Him."
        ]
      },
      {
        id: "c-3-3",
        number: 4,
        title: "What Should We Do First in Our Time with God?",
        paragraphs: [
          "“…where he prayed.” — Mark 1:35b (NIV)",
          "Jesus began His devotion with prayer.",
          "Prayer aligns our hearts with God’s heart, prepares us to understand His Word, and strengthens our faith.",
          "Through prayer, we lay down our burdens, surrender our will, and open ourselves to God’s direction for the day ahead."
        ]
      },
      {
        id: "c-3-4",
        number: 5,
        title: "What Happens After We Spend Time with God?",
        paragraphs: [
          "“When they found him, they exclaimed, ‘Everyone is looking for you!’” — Mark 1:37 (NIV)",
          "After spending time with the Father, Jesus immediately encountered people’s needs and expectations.",
          "Likewise, after our time with God, we often step into situations where people seek our help, guidance, or encouragement.",
          "Our quiet time equips us to serve others with renewed strength, wisdom, and compassion."
        ]
      },
      {
        id: "c-3-5",
        number: 6,
        title: "How Should We Respond to People’s Expectations?",
        paragraphs: [
          "“Jesus replied, ‘Let us go somewhere else—to the nearby villages—so I can preach there also.’” — Mark 1:38a (NIV)",
          "Jesus did not let popularity or pressure dictate His direction. He remained focused on His divine purpose.",
          "Spending time with God helps us clarify our priorities — to say “yes” to what truly matters and “no” to distractions.",
          "True devotion leads to discernment — knowing God’s will and following it faithfully."
        ]
      },
      {
        id: "c-3-6",
        number: 7,
        title: "What Is the Best Way to Work with Jesus After Time with God?",
        paragraphs: [
          "“So he traveled throughout Galilee, preaching in their synagogues and driving out demons.” — Mark 1:39 (NIV)",
          "After prayer, Jesus moved forward in ministry — preaching the Gospel and demonstrating the power of the Kingdom.",
          "Our personal devotion should always lead to public action.",
          "When we pray and meet with God, we receive power to live out our faith — serving others, sharing the Gospel, and overcoming spiritual challenges."
        ]
      },
      {
        id: "c-3-7",
        number: 8,
        title: "Conclusion",
        paragraphs: [
          "A disciplined devotional life enables us to serve God faithfully and fruitfully.",
          "When we follow Jesus’ example — setting a regular time, finding a quiet place, beginning in prayer, and living with purpose — we grow stronger in faith and more effective in ministry.",
          "Personal devotion is not a duty, but a delight — a daily encounter with the living God who equips us for every good work."
        ]
      }
    ],
    reflectionQuestions: [
      "Why is Jesus the perfect model for personal devotion?",
      "What can you learn from His timing, place, and focus in prayer?",
      "How does personal devotion strengthen you for ministry or service?",
      "What distractions do you need to remove to deepen your time with God?",
      "How can you apply Jesus’ devotional pattern starting this week?"
    ],
    prayer: "O Lord God Almighty, thank You for showing me the perfect example through Your Son, Jesus Christ. Teach me to rise early, find a quiet place, and meet with You daily in prayer and reflection. Strengthen me to live with purpose, serve faithfully, and glorify You in all I do. Amen.",
    challenge: "O my Lord God Almighty, please help me to develop a disciplined personal devotion with You every day. In Jesus Christ my Lord and Savior, Amen."
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
      "To learn and apply the Scripture Union Devotional Method — a simple, structured, and Spirit-guided approach to personal Bible study.",
      "To help believers listen to God’s Word, respond in obedience, and grow in faith."
    ],
    teachingSections: [
      {
        id: "c-4-intro",
        number: 1,
        title: "Introduction",
        paragraphs: [
          "The Scripture Union Devotional Method is a time-tested and Spirit-inspired way to make your personal devotion meaningful and fruitful.",
          "Every time you meet with God, He has already prepared a word, a promise, and a message for you.",
          "Through this method, you can listen carefully, reflect deeply, and respond faithfully. It is a guide — not a formula — to help you grow in your love for God’s Word and apply its truths in daily life."
        ]
      },
      {
        id: "c-4-1",
        number: 2,
        title: "First Steps of Devotion",
        paragraphs: [
          "Before you begin reading, take a few moments to pray — adoring God, giving thanks, and asking for understanding.",
          "Then, open your Bible to the assigned passage for the day. For example, let’s use 1 John 1:1–10 as your devotional passage.",
          "Your goal is not to rush through the text, but to discover what God is teaching you personally."
        ]
      },
      {
        id: "c-4-2",
        number: 3,
        title: "1. Are There Promises to Claim?",
        paragraphs: [
          "Look for what God has promised His people — His faithfulness, grace, and blessings.",
          "Examples from 1 John 1:1–10: There is eternal life with the Father in Heaven (v. 2). The Lord brings us into joyful fellowship with Himself and His people (vv. 3–4). If we walk in the light, the blood of Jesus purifies us from all sin (v. 7). If we confess our sins, God is faithful and just to forgive and cleanse us (v. 9).",
          "Takeaway: God’s promises assure us of forgiveness, cleansing, and joyful fellowship through Christ."
        ]
      },
      {
        id: "c-4-3",
        number: 4,
        title: "2. Are There Commands to Obey?",
        paragraphs: [
          "Identify instructions or directions that God expects His children to follow.",
          "Examples: Follow Jesus and walk in the truth (v. 6). Do not live in darkness (v. 6). Confess sins regularly (v. 9). Live as children of light (v. 7).",
          "Takeaway: Obedience to God’s commands proves our fellowship with Him."
        ]
      },
      {
        id: "c-4-4",
        number: 5,
        title: "3. Are There Examples to Follow?",
        paragraphs: [
          "Observe godly behavior or attitudes demonstrated by others.",
          "Examples: The Apostle John boldly shared his firsthand experience with Jesus (vv. 1–4). John showed faithfulness in proclaiming the message of light (v. 5–7).",
          "Takeaway: Be courageous in sharing your testimony and walking in God’s light."
        ]
      },
      {
        id: "c-4-5",
        number: 6,
        title: "4. Are There Warnings to Heed?",
        paragraphs: [
          "Pay attention to cautions or dangers God reveals in His Word.",
          "Examples: Claiming fellowship with Christ while walking in darkness is deceitful (v. 6). Saying we have no sin makes us liars and rejects God’s truth (vv. 8–10).",
          "Takeaway: Beware of self-deception and spiritual pride; live honestly before God."
        ]
      },
      {
        id: "c-4-6",
        number: 7,
        title: "5. Are There Sins to Avoid or Confess?",
        paragraphs: [
          "Be honest before God about any sin the passage reveals.",
          "Examples: Avoid living in darkness (v. 6). Repent from lying and hypocrisy (v. 6). Confess sins that disrupt your fellowship with God (v. 9).",
          "Takeaway: Sin breaks fellowship, but confession restores it through Christ’s cleansing blood."
        ]
      },
      {
        id: "c-4-7",
        number: 8,
        title: "6. Additional Reflection Questions",
        paragraphs: [
          "Ask questions that help you understand the passage more deeply:",
          "What does this passage teach me about God the Father, Son, and Holy Spirit? (vv. 1–4)",
          "What does it reveal about life and light in Christ? (vv. 6–7)",
          "Takeaway: God calls us to walk in His light and live in fellowship with Him and others."
        ]
      },
      {
        id: "c-4-8",
        number: 9,
        title: "Conclusion",
        paragraphs: [
          "Living as a true disciple means growing in God’s Word daily.",
          "Through this devotional method, you’ll discover God’s promises, learn obedience, avoid sin, and deepen your relationship with Him.",
          "As you meditate, memorize, and apply His Word, your joy will be made complete — and your life will reflect His light."
        ]
      }
    ],
    reflectionQuestions: [
      "Why is personal and careful devotion to God’s Word important?",
      "How does this devotional method help you understand Scripture better?",
      "Which of the five steps (promises, commands, examples, warnings, sins) helps you the most in applying God’s Word?",
      "How will you make daily devotion a consistent part of your life?"
    ],
    prayer: "Our Lord God Almighty, thank You for giving me Your Word as my guide for life. Help me to study it daily, meditate on its truths, and apply them faithfully. Teach me to listen to Your voice through Scripture and to obey it with joy. Amen.",
    challenge: "Lord, I commit myself to study Your Word every day. Please help me to discipline myself in my devotional life, following the steps that lead me closer to You. In Jesus Christ my Lord and Savior, Amen."
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
      "To accept God’s gracious invitation for His people to enjoy fellowship with Him, renewed strength, and the joy of worship."
    ],
    teachingSections: [
      {
        id: "c-5-intro",
        number: 1,
        title: "Introduction",
        paragraphs: [
          "What does it mean to rest? Why is the Day of Rest important?",
          "In our busy and burdened lives, God calls us to a kind of rest that goes beyond physical sleep.",
          "It is a spiritual rest — a resting in His presence, His promises, and His completed work through Jesus Christ.",
          "Let us learn from Scripture what this “Day of Rest” truly means and how we can live in it daily and weekly."
        ]
      },
      {
        id: "c-5-1",
        number: 2,
        title: "God Has Prepared a Second Rest for Us",
        paragraphs: [
          "“There remains, then, a Sabbath-rest for the people of God.” — Hebrews 4:9 (NIV)",
          "Rest Means Dwelling in God’s Presence: “Let us, therefore, make every effort to enter that rest.” — Hebrews 4:11 (NIV). True rest is found only in fellowship with God — when our souls find peace and security in His presence.",
          "God Appointed the First Day of Rest: The first “rest” was modeled by God Himself after creation — teaching us that rest is both holy and essential.",
          "God Promises a Future, Eternal Rest: Beyond the weekly Sabbath lies an eternal rest — the everlasting peace that awaits those who trust and follow Christ.",
          "Key Truth: Rest is both now (spiritual rest in Christ) and not yet (eternal rest with Him in glory)."
        ]
      },
      {
        id: "c-5-2",
        number: 3,
        title: "God’s Word Brings Both a Warning and a Promise of Rest",
        paragraphs: [
          "“For we also have had the good news proclaimed to us, just as they did; but the message they heard was of no value to them, because they did not share the faith of those who obeyed.” — Hebrews 4:2 (NIV)",
          "We Must Persevere in God’s Promise: We must continue to trust His promise of rest, holding fast to faith in His Word.",
          "We Must Guard Ourselves from Unbelief: God warns us not to fall into spiritual laziness or unbelief that robs us of peace.",
          "We Must Believe the Good News We Hear: True rest comes from faith — believing and receiving the Gospel that brings us back to God.",
          "Key Truth: Faith in the Gospel is the doorway to true rest."
        ]
      },
      {
        id: "c-5-3",
        number: 4,
        title: "Jesus Christ Has Paid the Price for Your Rest",
        paragraphs: [
          "“For Christ also suffered once for sins, the righteous for the unrighteous, to bring you to God.” — 1 Peter 3:18a (NIV)",
          "We All Have Sinned and Fallen Short of God’s Glory (Romans 3:23) — Our rest was lost because of sin.",
          "Sin Separated Us from God (Romans 6:23) — The wages of sin is death, separation from God’s rest.",
          "God’s Love and Sacrifice Made the Way for Our Rest (John 3:16).",
          "Jesus Is the Perfect Sacrifice That Secures Our Rest. Jesus bore our sins on the cross so that we may now rest in His grace, forgiven and reconciled to God.",
          "Key Truth: The cross is the bridge to our eternal rest."
        ]
      },
      {
        id: "c-5-4",
        number: 5,
        title: "God Appointed a Day of Rest for All His People",
        paragraphs: [
          "God Rested on the Seventh Day: “By the seventh day God had finished the work he had been doing; so on the seventh day he rested from all his work.” — Genesis 2:2 (NIV)",
          "God Commanded His People to Keep a Day of Rest: “Remember the Sabbath day by keeping it holy.” — Exodus 20:8 (NIV). Rest is not optional — it is God’s loving command for our good.",
          "Jesus Is the Lord of the Sabbath: “For the Son of Man is Lord of the Sabbath.” — Matthew 12:8 (NIV). Jesus fulfilled the Sabbath law — now, we rest not in a day, but in Him. We honor the Lord’s Day (Sunday) as a celebration of His resurrection and our new life in Him.",
          "The Early Church Practiced Worship on the Lord’s Day: “Every Sabbath he reasoned in the synagogue, trying to persuade Jews and Greeks.” — Acts 18:4 (NIV)",
          "Key Truth: Rest is an act of worship — a rhythm of work and renewal centered in Christ."
        ]
      },
      {
        id: "c-5-5",
        number: 6,
        title: "Conclusion",
        paragraphs: [
          "Observing a Day of Rest is rooted in resting in God’s holy presence — the same God who created us in His image and redeemed us through His Son.",
          "To rest in God is to trust in His finished work, worship Him with His people, and prepare our hearts for the eternal rest to come."
        ]
      }
    ],
    reflectionQuestions: [
      "How can you personally know and experience true rest in God’s presence?",
      "How has the Good News of Jesus affected your ability to rest in Him?",
      "Why is it important to set aside a weekly day of rest and worship?",
      "In what ways do you need to trust God more deeply with your time, work, and rest?"
    ],
    prayer: "Almighty God, my Creator and Redeemer, I commit myself to daily worship and weekly rest in You. Help me to find peace in Your presence and renewal in Your Word. Let my rest be an act of love and obedience to You. In Jesus Christ my Lord and Savior, Amen.",
    challenge: "Lord, I dedicate myself to honoring You through daily worship and weekly rest with Your people in the church. Help me to live a life that rests securely in Your grace. In Jesus Christ my Lord and Savior, Amen."
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
      "To learn how believers can actively participate in building one another up in love, faith, and hope as they await the Lord’s return."
    ],
    teachingSections: [
      {
        id: "c-6-intro",
        number: 1,
        title: "Introduction",
        paragraphs: [
          "What is Christian fellowship?",
          "Christian fellowship is the shared life of believers who have been united in Jesus Christ and are indwelt by the Holy Spirit. It is not merely social gathering — it is spiritual communion, a divine partnership in faith, love, and mission.",
          "In fellowship, we strengthen one another, grow in grace, and reflect the unity of the Body of Christ.",
          "Let’s explore what makes Christian fellowship so meaningful and vital in our walk with God."
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
          "We come together not just to receive, but to give — to speak life, share testimonies, and strengthen one another in the Lord.",
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
          "When believers walk together in Christ, they inspire each other to love more deeply and serve more faithfully.",
          "True Christian fellowship reminds us that our faith must be active — showing compassion, serving others, and doing good as Christ did.",
          "Key Truth: Fellowship helps us live out the love of Christ in tangible, everyday ways."
        ]
      },
      {
        id: "c-6-3",
        number: 4,
        title: "We Encourage One Another Through Habitual Fellowship",
        paragraphs: [
          "“…not giving up meeting together, as some are in the habit of doing…” — Hebrews 10:25 (NIV)",
          "Consistency is vital. A Christian who isolates himself weakens his faith. Just as coals lose their heat when separated from the fire, believers grow cold when apart from the fellowship.",
          "God designed us for community, not independence.",
          "Regular gathering in worship, prayer, and study keeps our faith alive and our hearts warm toward God and others.",
          "Key Truth: Fellowship is not an option for a Christian — it is a divine necessity for spiritual endurance."
        ]
      },
      {
        id: "c-6-4",
        number: 5,
        title: "We Encourage One Another as We Await the Lord’s Return",
        paragraphs: [
          "“…but encouraging one another—and all the more as you see the Day approaching.” — Hebrews 10:25 (NIV)",
          "Christian fellowship is not only about the present; it’s about preparing for eternity.",
          "We encourage one another with hope, reminding each other that Christ is coming again.",
          "As the days grow darker in the world, believers need to stand together — praying, worshiping, and pressing on until the Lord returns.",
          "Key Truth: Fellowship points us toward the blessed hope — the return of Jesus Christ."
        ]
      },
      {
        id: "c-6-5",
        number: 6,
        title: "Conclusion",
        paragraphs: [
          "True Christian fellowship is God’s gift for our spiritual growth and strength.",
          "Through it, we encourage one another in love and good deeds, maintain steadfastness in faith, and prepare joyfully for Christ’s coming.",
          "As members of one body, let’s commit to meeting together regularly, supporting one another, and growing together in grace."
        ]
      }
    ],
    reflectionQuestions: [
      "How would you define true Christian fellowship?",
      "Why is it important for believers to meet together regularly?",
      "In what ways can you personally encourage others in love and good works?",
      "What are some barriers that keep people from fellowship, and how can they be overcome?",
      "How does Christian fellowship prepare us for the coming of the Lord?"
    ],
    prayer: "Lord God, thank You for the gift of fellowship in the Body of Christ. Thank You for brothers and sisters who strengthen, encourage, and walk with me in faith. Help me to be faithful in meeting with them, serving with love, and building others up in Your grace. Amen.",
    challenge: "Having understood the meaning and importance of Christian fellowship, I commit to faithfully join my brothers and sisters every Sunday and in my small group each week. Together we will grow in love, good works, and joyful expectation of Your return. In Jesus Christ my Lord and Savior, Amen."
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
      "To see baptism as a public testimony of our union with Christ in His death, burial, and resurrection, and a call to live a new life of holiness and obedience to God."
    ],
    teachingSections: [
      {
        id: "c-7-intro",
        number: 1,
        title: "Introduction",
        paragraphs: [
          "What is water baptism? Why is it important to every true believer in Christ?",
          "Water baptism is an outward expression of an inward transformation. It is a public declaration that we have been united with Christ — that our old life has died, we have been buried with Him, and we now live a new life by His power.",
          "Through baptism, we declare to the world that we belong to Jesus, and that our hearts, wills, and purposes are surrendered to Him."
        ]
      },
      {
        id: "c-7-1",
        number: 2,
        title: "Our Unity with Christ Means Death to Sin",
        paragraphs: [
          "“What shall we say, then? Shall we go on sinning so that grace may increase? By no means! We are those who have died to sin; how can we live in it any longer?” — Romans 6:1–2 (NIV)",
          "When we are united with Christ by faith, we share in His death to sin. This means sin no longer rules our lives — we are free from its power and penalty.",
          "The apostle Paul reminds believers that grace is not a license to sin, but the power to live in victory over sin.",
          "To be “dead to sin” means our old way of life has ended, and we now live to please God.",
          "Key Truth: Water baptism affirms that we have turned from sin and surrendered completely to Christ."
        ]
      },
      {
        id: "c-7-2",
        number: 3,
        title: "Water Baptism Symbolizes Our Union with Christ in His Death",
        paragraphs: [
          "“Don’t you know that all of us who were baptized into Christ Jesus were baptized into his death?” — Romans 6:3 (NIV)",
          "Baptism is more than a ceremony — it is a symbol of spiritual reality.",
          "When we are immersed in water, it represents our participation in Christ’s death on the cross.",
          "Just as Jesus died for sin, we too die to our old self and sinful ways. The act of immersion publicly declares that we have left behind our past and belong to Christ.",
          "Key Truth: In baptism, we testify that our old life has been crucified with Christ."
        ]
      },
      {
        id: "c-7-3",
        number: 4,
        title: "Water Baptism Symbolizes Our Union with Christ in His Burial",
        paragraphs: [
          "“We were therefore buried with him through baptism into death in order that, just as Christ was raised from the dead through the glory of the Father, we too may live a new life.” — Romans 6:4 (NIV)",
          "Being submerged under water represents burial — the closing of our old life.",
          "It shows that we have fully identified with Christ’s death and are now separated from our past life of sin.",
          "Just as Christ was buried and then raised in glory, so we too are buried to sin and raised to walk in newness of life.",
          "Key Truth: Baptism declares that our old sinful self is gone, buried, and no longer defines who we are."
        ]
      },
      {
        id: "c-7-4",
        number: 5,
        title: "Water Baptism Symbolizes Our Union with Christ in His Resurrection",
        paragraphs: [
          "“For if we have been united with him in a death like his, we will certainly also be united with him in a resurrection like his.” — Romans 6:5 (NIV)",
          "When we rise out of the water, we symbolize the resurrection — the new life God has given us in Christ.",
          "This is the life of spiritual renewal and power, where we live not for ourselves but for the glory of God.",
          "Resurrection life means daily walking in obedience, victory, and joy, knowing we have been made alive in Christ.",
          "Key Truth: Baptism reminds us that we have been raised with Christ to live a new life filled with His presence and purpose."
        ]
      },
      {
        id: "c-7-5",
        number: 6,
        title: "Conclusion",
        paragraphs: [
          "Water baptism is a powerful testimony of our salvation and transformation.",
          "It symbolizes our unity with Christ in His death, burial, and resurrection — and declares to the world that we now live for Him.",
          "To be baptized is not only to follow an ordinance of faith, but to live a life that reflects its meaning: dead to sin, alive to God."
        ]
      }
    ],
    reflectionQuestions: [
      "What does it mean to be united with Christ in His death, burial, and resurrection?",
      "How does water baptism symbolize your new life in Christ?",
      "Why do you think God commands believers to publicly declare their faith through baptism?",
      "How can you continue to live as one who has “died to sin and lives to God”?"
    ],
    prayer: "Lord God Almighty, thank You for saving me through the death and resurrection of Jesus Christ. Thank You for the symbol of baptism that reminds me of my new life in You. Help me to live daily in obedience, purity, and gratitude, as one who has died to sin and now lives for Your glory. Amen.",
    challenge: "O my Lord God Almighty, I am committing myself to live in full unity with Christ in His death, burial, and resurrection. Help me to walk in the new life You have given me, dead to sin and alive to Your righteousness. In Jesus Christ my Lord and Savior, Amen."
  },
  {
    id: "consolidation-8",
    title: "Lesson 8: The Meaning and Importance of the Lord’s Supper",
    category: "Consolidation",
    readingTime: "7 min read",
    scriptureFocus: {
      reference: "Luke 22:19–20 & 1 Corinthians 11:27–28 (NIV)",
      text: "And he took bread, gave thanks and broke it, and gave it to them, saying, ‘This is my body given for you; do this in remembrance of me.’... Everyone ought to examine themselves before they eat of the bread and drink from the cup."
    },
    objectives: [
      "To understand the meaning and importance of the Lord’s Supper as a sacred act of remembrance, proclamation, anticipation, and personal renewal.",
      "To learn how to participate reverently and with gratitude for Christ’s redeeming work."
    ],
    teachingSections: [
      {
        id: "c-8-intro",
        number: 1,
        title: "Introduction",
        paragraphs: [
          "What does the Lord’s Supper signify? Why should believers observe it regularly?",
          "The Lord’s Supper (also called Communion) is one of the two ordinances that Jesus Himself instituted for His followers — the other being water baptism.",
          "It is a holy act of remembrance and worship that celebrates Jesus’ sacrifice for our salvation.",
          "Each time we partake of the bread and cup, we remember what He has done, proclaim His death, and look forward to His return."
        ]
      },
      {
        id: "c-8-1",
        number: 2,
        title: "The Bread Is the Symbol of the Lord’s Body",
        paragraphs: [
          "“This is my body given for you; do this in remembrance of me.” — Luke 22:19 (NIV)",
          "The bread represents the body of Jesus, which He gave willingly for us on the cross.",
          "His suffering and death were the price of our redemption — freeing us from sin and reconciling us to God.",
          "As we eat the bread, we remember His sacrifice with deep gratitude, and we commit to live in obedience to the One who gave His life for us.",
          "Key Truth: The broken bread reminds us of Jesus’ body broken for our sins — the proof of His love."
        ]
      },
      {
        id: "c-8-2",
        number: 3,
        title: "The Cup Symbolizes the Lord’s Blood",
        paragraphs: [
          "“This cup is the new covenant in my blood, which is poured out for you.” — Luke 22:20 (NIV)",
          "The cup represents the blood of Jesus Christ, shed for the forgiveness of sins.",
          "In the Old Covenant, animal sacrifices were offered repeatedly, but in the New Covenant, Jesus shed His own blood once for all to cleanse us completely.",
          "When we drink from the cup, we remember that our salvation is secured by His blood — the seal of the new covenant.",
          "Key Truth: The cup reminds us that through Christ’s blood, we are forgiven, cleansed, and made new."
        ]
      },
      {
        id: "c-8-3",
        number: 4,
        title: "The Lord’s Supper Declares His Sacrificial Death",
        paragraphs: [
          "“For whenever you eat this bread and drink this cup, you proclaim the Lord’s death until he comes.” — 1 Corinthians 11:26 (NIV)",
          "Each time believers gather to celebrate the Lord’s Supper, we are making a public declaration: Jesus died for us — and His death still saves.",
          "In taking Communion, we proclaim the central truth of the Gospel before God, before one another, and before the world.",
          "It is not just a private act, but a corporate testimony of our faith in Christ’s redeeming work.",
          "Key Truth: The Lord’s Supper proclaims that Christ’s death is the heart of our faith and hope."
        ]
      },
      {
        id: "c-8-4",
        number: 5,
        title: "The Lord’s Supper Is a Foretaste of God’s Coming Kingdom",
        paragraphs: [
          "“For I tell you, I will not eat it again until it finds fulfillment in the kingdom of God.” — Luke 22:16 (NIV)",
          "When we partake of the Lord’s Supper, we not only look back to the cross — we also look forward to the future.",
          "It is a foretaste of the great wedding banquet in heaven, when Christ will gather His redeemed people for eternal fellowship and joy.",
          "Our communion on earth points to our coming reunion with Him in glory.",
          "Key Truth: Communion looks forward to the day when believers will feast with Christ in His eternal Kingdom."
        ]
      },
      {
        id: "c-8-5",
        number: 6,
        title: "The Lord’s Supper Must Be Observed Reverently",
        paragraphs: [
          "“Everyone ought to examine themselves before they eat of the bread and drink from the cup.” — 1 Corinthians 11:28 (NIV)",
          "The Lord’s Supper is sacred, and should never be taken lightly or carelessly.",
          "Before partaking, we are called to examine our hearts — confessing sin, renewing our faith, and reconciling with others if needed.",
          "To partake “in an unworthy manner” means to take the symbols without sincere faith or self-examination.",
          "True participation comes with humility, reverence, and gratitude.",
          "Key Truth: Communion invites us to examine our hearts and renew our devotion to Christ."
        ]
      },
      {
        id: "c-8-6",
        number: 7,
        title: "Conclusion",
        paragraphs: [
          "Jesus gave us two sacred ordinances to remember and proclaim His saving work: Water Baptism and The Lord’s Supper.",
          "Water baptism testifies to our union with Christ; the Lord’s Supper reminds us of our ongoing fellowship with Him and one another.",
          "Every true believer should take both seriously — not as rituals, but as acts of love and obedience that point us back to the cross and forward to His coming glory."
        ]
      }
    ],
    reflectionQuestions: [
      "What does the Lord’s Supper mean to you personally?",
      "Why must believers approach Communion with reverence and self-examination?",
      "How does remembering Christ’s sacrifice affect your daily life and worship?",
      "In what ways does the Lord’s Supper strengthen your fellowship with other believers?",
      "How does this ordinance prepare you for the coming Kingdom of God?"
    ],
    prayer: "Lord Jesus, thank You for giving Your body and blood for my salvation. Teach me to remember Your sacrifice with reverence, gratitude, and faith. May every Communion remind me of Your love, renew my devotion, and prepare me for Your coming. Amen.",
    challenge: "Lord, I now commit myself to You — to obey You through water baptism and to regularly observe the Lord’s Supper with a grateful and reverent heart. May my life continually proclaim Your death and resurrection until You come again. In Jesus Christ my Lord and Savior, Amen."
  },
  {
    id: "consolidation-9",
    title: "Lesson 9: How to Overcome Temptation",
    category: "Consolidation",
    readingTime: "7 min read",
    scriptureFocus: {
      reference: "1 Corinthians 10:13 (NIV)",
      text: "No temptation has overtaken you except what is common to mankind. And God is faithful; he will not let you be tempted beyond what you can bear..."
    },
    objectives: [
      "To understand the nature and source of temptation.",
      "To learn how to overcome temptation through God’s faithfulness, wisdom, and strength — so we may live victoriously and fruitfully in Christ."
    ],
    teachingSections: [
      {
        id: "c-9-intro",
        number: 1,
        title: "Introduction",
        paragraphs: [
          "Temptation is one of the oldest and most personal battles of every believer.",
          "It is not a sin to be tempted — even Jesus was tempted — but it becomes sin when we yield to it.",
          "Temptation is a daily reality, but victory is possible through the power of the Holy Spirit.",
          "God’s Word gives us clear principles on how to resist and overcome it. Let us learn how to respond with faith, wisdom, and obedience each time temptation comes our way."
        ]
      },
      {
        id: "c-9-1",
        number: 2,
        title: "Know That Temptation Is Common and Can Overtake Anyone",
        paragraphs: [
          "“No temptation has overtaken you except what is common to mankind.” — 1 Corinthians 10:13a",
          "Temptation is not unique to you. Every believer faces it — young or old, new or mature.",
          "Knowing this truth keeps us from self-pity or pride and reminds us to depend on God’s grace.",
          "Key Truth: You are not alone in facing temptation — but you are never without God’s help."
        ]
      },
      {
        id: "c-9-2",
        number: 3,
        title: "Know That Temptation Comes from the Devil",
        paragraphs: [
          "“Then Jesus was led by the Spirit into the wilderness to be tempted by the devil.” — Matthew 4:1",
          "“When tempted, no one should say, ‘God is tempting me.’” — James 1:13",
          "Temptation’s source is not God but the enemy of our souls — Satan. His goal is to deceive, distract, and destroy.",
          "But remember: temptation is not sin; yielding to it is.",
          "Key Truth: The devil tempts us to fall; God tests us to strengthen our faith."
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
        title: "Claim That God Is Faithful to Limit the Power of Temptation",
        paragraphs: [
          "“And God is faithful; he will not let you be tempted beyond what you can bear.” — 1 Corinthians 10:13b",
          "God knows your limits. He never allows temptation beyond your capacity to resist.",
          "Every trial or temptation is under His sovereign control — measured, timed, and meant for your growth.",
          "Key Truth: God’s faithfulness places a boundary around every temptation."
        ]
      },
      {
        id: "c-9-5",
        number: 6,
        title: "Claim That God Provides a Way of Escape",
        paragraphs: [
          "“But when you are tempted, he will also provide a way out so that you can endure it.” — 1 Corinthians 10:13c",
          "Every temptation comes with an exit door designed by God.",
          "Sometimes the escape is prayer, sometimes walking away, sometimes Scripture, sometimes godly counsel — but it’s always there.",
          "Key Truth: The wise believer looks for God’s escape route instead of reasoning with temptation."
        ]
      },
      {
        id: "c-9-6",
        number: 7,
        title: "Claim That God Gives You Strength to Endure",
        paragraphs: [
          "“…so that you can endure it.” — 1 Corinthians 10:13d",
          "Victory over temptation is not just escape, but endurance — the strength to stay faithful.",
          "When temptation feels overwhelming, remember: the same Spirit who empowered Jesus to resist in the wilderness lives in you.",
          "Key Truth: Endurance is God’s power working in you to stand firm until temptation passes."
        ]
      },
      {
        id: "c-9-7",
        number: 8,
        title: "Conclusion",
        paragraphs: [
          "Every believer faces temptation, but no one needs to be defeated by it.",
          "You can overcome by following God’s principles: Recognize temptation for what it is, reject its source, and rely on God’s faithfulness.",
          "Make it a daily habit to walk closely with God, to fill your heart with His Word, and to pray for wisdom.",
          "Through Christ, you are not a victim of temptation — you are a victor."
        ]
      }
    ],
    reflectionQuestions: [
      "Why do you think God allows believers to face temptation?",
      "What makes temptation powerful or appealing to you personally?",
      "How can you identify “the way of escape” when temptation comes?",
      "What role does Scripture memory and prayer play in overcoming temptation?",
      "What changes can you make today to strengthen your resistance to sin?"
    ],
    prayer: "O my Lord God Almighty, thank You that You are faithful and will not let me be tempted beyond what I can bear. When temptation comes, help me see the way of escape and strengthen me to endure. Teach me to guard my heart, depend on Your Spirit, and live victoriously in Christ. Amen.",
    challenge: "LORD, I commit myself to Your wisdom and power. Help me overcome every temptation I face each day, that I may live a pure, joyful, and fruitful life for Your glory. In Jesus Christ my LORD and SAVIOUR, Amen."
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
      "To learn how to respond to trials with joy, faith, and endurance — trusting that God uses every challenge to mature us in Christ."
    ],
    teachingSections: [
      {
        id: "c-10-intro",
        number: 1,
        title: "Introduction",
        paragraphs: [
          "Everything that happens on earth has a divine purpose for our growth and well-being as disciples of Jesus Christ.",
          "Trials are not temptations. Temptations come from the devil to make us fall, but trials come from God to help us grow.",
          "Through trials, our faith is tested, refined, and strengthened. God allows them not to destroy us, but to develop us — to mold us into mature believers who reflect Christ’s endurance and faithfulness.",
          "Let us discover from the Word of God how to face and overcome trials with joy."
        ]
      },
      {
        id: "c-10-1",
        number: 2,
        title: "We Will Encounter Various Trials",
        paragraphs: [
          "“When you face trials of many kinds…” — James 1:2 (NIV)",
          "Trials are part of life — not a sign of God’s absence but of His involvement in shaping our character.",
          "We should not be surprised by them; instead, we must see them as opportunities for growth.",
          "Key Truth: Trials are not punishments but invitations to grow closer to God."
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
          "Every trial strengthens our spiritual muscles — teaching us patience, humility, and reliance on God’s grace.",
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
          "Our hearts are refined; our faith deepens. God completes in us what He began.",
          "Key Truth: God uses trials to finish His good work in us."
        ]
      },
      {
        id: "c-10-5",
        number: 6,
        title: "Perseverance Leads to Divine Approval and Glory",
        paragraphs: [
          "“Blessed is the one who perseveres under trial because... that person will receive the crown of life...” — James 1:12 (NIV)",
          "The reward for perseverance is not only present peace but eternal joy — the “crown of life.”",
          "God honors those who remain faithful through hardships.",
          "Key Truth: Trials refine us now and reward us later."
        ]
      },
      {
        id: "c-10-6",
        number: 7,
        title: "God Grants Wisdom Generously to Those Who Ask",
        paragraphs: [
          "“If any of you lacks wisdom, you should ask God, who gives generously to all without finding fault.” — James 1:5 (NIV)",
          "When you don’t understand your trial, ask for wisdom, not relief.",
          "God gives insight to those who seek His guidance humbly. He will show you how to respond with faith, patience, and grace.",
          "Key Truth: Wisdom is the divine perspective that turns trials into triumphs."
        ]
      },
      {
        id: "c-10-7",
        number: 8,
        title: "Therefore, Count It All Joy!",
        paragraphs: [
          "“Consider it pure joy, my brothers and sisters, whenever you face trials of many kinds.” — James 1:2 (NIV)",
          "Joy in trials is not denial of pain — it is confidence in God’s purpose.",
          "We rejoice not because of trials, but in spite of them, knowing that every struggle brings us closer to the likeness of Christ.",
          "Key Truth: Joy is the believer’s victory song in the midst of battle."
        ]
      },
      {
        id: "c-10-8",
        number: 9,
        title: "Conclusion",
        paragraphs: [
          "It may seem impossible to rejoice in hardship, but through faith, it becomes a miracle of grace.",
          "Every trial we face is a tool in God’s hand — shaping our character, testing our faith, and preparing us for eternal glory.",
          "The best way to overcome trials is to “count it all joy” and thank God for His faithfulness. He never wastes a trial."
        ]
      }
    ],
    reflectionQuestions: [
      "Why does God allow trials in the life of a believer?",
      "How can joy and suffering exist together in the Christian life?",
      "What has a recent trial taught you about faith or endurance?",
      "How can asking for wisdom help you handle challenges better?",
      "What practical steps can you take to “count it all joy” during your next trial?"
    ],
    prayer: "O my Lord God Almighty, thank You for turning my trials into opportunities for growth. Teach me to face every challenge with faith and joy, knowing that You are shaping me to become more like Christ. Fill me with wisdom and strength to endure victoriously. Amen.",
    challenge: "Lord, I commit myself to live in victory over every trial. Help me to count it all joy, to endure with faith, and to trust You completely in all circumstances. In Jesus Christ my Lord and Savior, Amen."
  },
  {
    id: "consolidation-11",
    title: "Lesson 11: The Work of Sanctification",
    category: "Consolidation",
    readingTime: "7 min read",
    scriptureFocus: {
      reference: "1 Corinthians 6:11 & 1 Peter 1:1–2 (NIV)",
      text: "But you were washed, you were sanctified, you were justified in the name of the Lord Jesus Christ and by the Spirit of our God."
    },
    objectives: [
      "To understand what sanctification means, how it works, and why it is essential for every believer.",
      "To recognize the Holy Spirit’s ongoing role in transforming us to be more like Jesus Christ in holiness, character, and conduct."
    ],
    teachingSections: [
      {
        id: "c-11-intro",
        number: 1,
        title: "Introduction",
        paragraphs: [
          "Sometimes we assume that God is growing us without any clear direction.",
          "Yet, the goal of all true spiritual growth is holiness — this is what the Bible calls sanctification (pagpapabanal).",
          "We often say, “God is not finished with me yet.” That’s true!",
          "Because the Christian life is not about perfection overnight, but progressive transformation — a lifelong journey toward Christlikeness through the power of the Holy Spirit."
        ]
      },
      {
        id: "c-11-1",
        number: 2,
        title: "What Is Sanctification?",
        paragraphs: [
          "The Greek word hagiasmos means to make holy, to set apart, to consecrate.",
          "To be sanctified means to be set apart for God’s purpose — devoted entirely to His service, and being purified from all sin and impurity.",
          "Sanctification is both a position (we are already made holy in Christ) and a process (we are being made holy daily by the Spirit).",
          "Key Truth: Sanctification means becoming in practice what God has already declared us to be in Christ."
        ]
      },
      {
        id: "c-11-2",
        number: 3,
        title: "Who Is Responsible for Our Sanctification?",
        paragraphs: [
          "God Himself — Father, Son, and Holy Spirit — works together for our sanctification.",
          "But it is particularly the Holy Spirit who applies this work in our hearts and lives.",
          "“…through the sanctifying work of the Spirit…” — 1 Peter 1:2",
          "We also have a responsibility. We must cooperate with the Spirit by faith, obedience, and surrender. Sanctification is not passive — it’s a partnership between divine grace and human willingness.",
          "Key Truth: The Holy Spirit empowers; the believer cooperates."
        ]
      },
      {
        id: "c-11-3",
        number: 4,
        title: "Why Is Sanctification Necessary?",
        paragraphs: [
          "Sanctification is necessary because it prepares us for God’s glory and life in His presence.",
          "We are being made like Christ — fit for heaven and equipped to glorify God in this world.",
          "“It is God’s will that you should be sanctified.” — 1 Thessalonians 4:3",
          "Key Truth: Only those who are made holy will fully enjoy the presence of a holy God."
        ]
      },
      {
        id: "c-11-4",
        number: 5,
        title: "How Long Does Sanctification Take Place?",
        paragraphs: [
          "Sanctification is both a finished work and a continuing process.",
          "A Finished Work: “But you were washed, you were sanctified, you were justified…” — 1 Corinthians 6:11. Through Christ’s death and resurrection, believers have already been set apart as holy. This is our spiritual position before God.",
          "A Continuing Process: “For by one sacrifice he has made perfect forever those who are being made holy.” — Hebrews 10:14. The Spirit continues to transform us daily, shaping us into Christ’s image from one degree of glory to another (2 Corinthians 3:18).",
          "Key Truth: Sanctification begins at salvation and continues throughout life — until we are made perfect in glory."
        ]
      },
      {
        id: "c-11-5",
        number: 6,
        title: "What Happens in Sanctification?",
        paragraphs: [
          "“And we all, who with unveiled faces contemplate the Lord’s glory, are being transformed into his image with ever-increasing glory, which comes from the Lord, who is the Spirit.” — 2 Corinthians 3:18 (NIV)",
          "Sanctification is the gradual transformation of the believer into the likeness of Christ — in character, thoughts, emotions, and behavior.",
          "The Holy Spirit works within the soul — transforming the heart, renewing the mind, and aligning the will to God’s desires.",
          "Key Truth: Sanctification is the Spirit’s masterpiece in the soul of every believer."
        ]
      },
      {
        id: "c-11-6",
        number: 7,
        title: "How Does Sanctification Work?",
        paragraphs: [
          "Sanctification works through:",
          "• Faith and obedience to God’s Word",
          "• Prayer and spiritual disciplines",
          "• Suffering and testing that refine our faith",
          "• The Spirit’s indwelling presence",
          "• The finished work of Christ — His death, burial, and resurrection",
          "Key Truth: Growth in holiness is lifelong — progress, not perfection, is the Spirit’s path."
        ]
      },
      {
        id: "c-11-7",
        number: 8,
        title: "Conclusion",
        paragraphs: [
          "Sanctification begins with a personal relationship with Jesus Christ.",
          "To be sanctified, you must first be born again — reconciled to God through faith in His Son.",
          "If you have received Christ, you have also received the Holy Spirit, your Sanctifier, who now works within you to make you more like Jesus.",
          "So walk daily in obedience, humility, and cooperation with His work in your life."
        ]
      }
    ],
    reflectionQuestions: [
      "Why must a person first be born again before experiencing sanctification?",
      "How does the Holy Spirit practically work to make us holy?",
      "What spiritual habits help you cooperate with God’s sanctifying work?",
      "How can you tell that you are growing in sanctification?",
      "What area of your life do you still need to surrender to the Spirit’s refining work?"
    ],
    prayer: "LORD, as I have received Jesus Christ as my personal Lord and Savior, please continue the sanctifying work of the Holy Spirit in me. Purify my heart, renew my mind, and transform my character until I reflect Your holiness. Help me to live each day in obedience, humility, and love. Amen.",
    challenge: "LORD, I commit myself to cooperate with the Holy Spirit’s sanctifying work in my life. Make me more like Jesus in heart and in action, that I may bring You glory in all things. In Jesus Christ my Lord and Savior, Amen."
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
      "To be guided by biblical principles that honor God and bless others."
    ],
    teachingSections: [
      {
        id: "c-12-intro",
        number: 1,
        title: "Introduction",
        paragraphs: [
          "Relationships are one of God’s greatest gifts — but also one of the greatest areas where we need His grace.",
          "Our relationship with God affects how we relate to others. That is why Jesus summarized the entire Law in two commands: 'Love the Lord your God… and love your neighbor as yourself.' — Matthew 22:37–39 (NIV)",
          "To build good relationships, we must let God’s love rule our hearts, His wisdom guide our actions, and His Spirit empower our interactions."
        ]
      },
      {
        id: "c-12-1",
        number: 2,
        title: "Good Relationships Are Always Based on Agape Love",
        paragraphs: [
          "Agape love is the highest kind of love — sacrificial, selfless, and unconditional. It is the love that begins with God and flows through us to others.",
          "When love is our foundation, relationships become strong, healthy, and life-giving.",
          "Without love, even the best efforts to maintain peace or respect will eventually fail.",
          "Key Truth: Love is not just a feeling — it is a daily decision to reflect Christ in how we treat others."
        ]
      },
      {
        id: "c-12-2",
        number: 3,
        title: "Boundaries Ensure Healthy and Peaceful Relationships",
        paragraphs: [
          "God’s Word sets boundaries for how we relate to others — to protect our hearts and promote harmony.",
          "• The Golden Rule: “Treat others as you would have them treat you.” — Luke 6:31",
          "• The Rule of Peace: “If it is possible, as far as it depends on you, live at peace with everyone.” — Romans 12:18",
          "• The Rule of Forgiveness: “Be kind and compassionate... forgiving each other, just as in Christ God forgave you.” — Ephesians 4:32",
          "Key Truth: Biblical boundaries protect relationships and keep our hearts aligned with God’s will."
        ]
      },
      {
        id: "c-12-3",
        number: 4,
        title: "Premature Emotional or Sexual Relationships Are Inadvisable",
        paragraphs: [
          "“Do not arouse or awaken love until it so desires.” — Song of Songs 2:7 (NIV)",
          "God created romantic and sexual relationships to be enjoyed within the covenant of marriage.",
          "Premature emotional or physical intimacy outside of marriage leads to heartache and sin.",
          "True love waits — it honors God’s timing, values purity, and respects the dignity of others.",
          "Key Truth: Purity protects love; patience proves love."
        ]
      },
      {
        id: "c-12-4",
        number: 5,
        title: "Love Between Parents and Children Must Be Guided by God’s Word",
        paragraphs: [
          "“Children, obey your parents in the Lord, for this is right... Fathers, do not provoke your children to anger...” — Ephesians 6:1–4 (NIV)",
          "Healthy family relationships are built on mutual respect, obedience, and understanding.",
          "Children are called to obey and honor their parents, while parents are called to nurture with love and patience.",
          "Key Truth: Families grow stronger when both parents and children reflect Christ’s love and humility."
        ]
      },
      {
        id: "c-12-5",
        number: 6,
        title: "Relationships Among Believers Must Be Governed by Purity",
        paragraphs: [
          "“Treat younger men as brothers, older women as mothers, and younger women as sisters, with absolute purity.” — 1 Timothy 5:1–2 (NIV)",
          "In the family of God, we are to relate to one another with holiness, respect, and moral integrity.",
          "The church is a spiritual household — every relationship must be marked by sincerity, humility, and purity.",
          "Key Truth: God’s family is built on honor and holiness."
        ]
      },
      {
        id: "c-12-6",
        number: 7,
        title: "Relationships with Non-Believers Must Reflect Justice, Compassion, and the Gospel",
        paragraphs: [
          "“He has shown you, O mortal, what is good. And what does the Lord require of you? To act justly and to love mercy and to walk humbly with your God.” — Micah 6:8 (NIV)",
          "As followers of Christ, our relationships with non-believers should reflect God’s justice, mercy, and love.",
          "We are called to treat all people with compassion and to be living witnesses of the Gospel through our words and actions.",
          "Key Truth: Our relationships should lead others to see Christ in us."
        ]
      },
      {
        id: "c-12-7",
        number: 8,
        title: "Conclusion",
        paragraphs: [
          "The practice of good relationships begins with loving God and extends to loving others rightly.",
          "When our relationships are grounded in agape love, guided by biblical principles, and empowered by the Holy Spirit, they bring glory to God and peace to our lives.",
          "Let us commit to live by God’s rules of love, peace, forgiveness, and purity — building relationships that honor Christ in every season of life."
        ]
      }
    ],
    reflectionQuestions: [
      "What motivates you most to practice good relationships?",
      "Which biblical rule (love, peace, forgiveness, purity) speaks most to your current relationships?",
      "What relationships in your life need reconciliation or healing?",
      "How can you reflect Christ more clearly in your family, friendships, or work relationships?",
      "What practical boundaries can you set to maintain healthy and godly relationships?"
    ],
    prayer: "O my Lord God Almighty, teach me to love You above all and to love others as You have loved me. Help me to live at peace with everyone, forgive as I have been forgiven, and walk in purity and truth. Strengthen me to reflect Your character in every relationship I have. Amen.",
    challenge: "Lord, I commit to love You and my neighbors with all my heart, soul, and strength. Help me to establish biblical principles and boundaries that honor You in all my relationships. In Jesus Christ my Lord and Savior, Amen."
  },
  {
    id: "consolidation-13",
    title: "Lesson 13: The Importance of Godliness, Justice, and Compassion",
    category: "Consolidation",
    readingTime: "7 min read",
    scriptureFocus: {
      reference: "Micah 6:8 (NIV)",
      text: "He has shown you, O man, what is good; and what does the LORD require of you but to do justice, to love mercy, and to walk humbly with your God."
    },
    objectives: [
      "To understand that true godliness is not only personal holiness but also active righteousness and compassion toward others.",
      "To live out what God requires: to do justice, love mercy, and walk humbly with Him."
    ],
    teachingSections: [
      {
        id: "c-13-intro",
        number: 1,
        title: "Introduction",
        paragraphs: [
          "In the time of the prophet Micah, God’s people — the Israelites — were deeply religious but morally corrupt. They offered sacrifices and observed rituals but neglected justice, kindness, and humility.",
          "Through Micah, God rebuked their hypocrisy and reminded them what true goodness looks like. Yet, in His mercy, He promised deliverance through the coming Messiah.",
          "As God’s redeemed people in Christ today, we are called to restore this kind of life — one that reflects His character through godliness, justice, and compassion."
        ]
      },
      {
        id: "c-13-1",
        number: 2,
        title: "What Has the LORD Told Mankind?",
        paragraphs: [
          "“He has shown you, O man, what is good…” — Micah 6:8a",
          "God has not hidden His will. He has revealed to us clearly what is good — not in complex rituals or sacrifices, but in how we live out His character every day.",
          "Key Truth: God’s will is not mysterious — it is moral, relational, and practical."
        ]
      },
      {
        id: "c-13-2",
        number: 3,
        title: "The Three Requirements of the LORD",
        paragraphs: [
          "“What does the LORD require of you? To do justice, to love mercy, and to walk humbly with your God.” — Micah 6:8b",
          "God’s requirements for His people are clear and simple, yet profoundly demanding.",
          "They touch the heart (mercy), the hands (justice), and the walk (humility).",
          "a) To Do Justice — act rightly and fairly in all relationships.",
          "b) To Love Mercy — show steadfast love and compassion to others.",
          "c) To Walk Humbly with God — live dependently and obediently under His authority.",
          "Key Truth: True religion is not about ritual performance but righteous living."
        ]
      },
      {
        id: "c-13-3",
        number: 4,
        title: "Defining Each Virtue",
        paragraphs: [
          "Justice — Doing what is right and fair before God and man. It means standing up for truth, defending the oppressed, and giving each person their due (Proverbs 21:3; Isaiah 1:17).",
          "Kindness / Mercy — Showing compassion, forgiveness, and steadfast love even when it is undeserved (Hosea 6:6; Matthew 5:7). Mercy is love in action.",
          "Humility — Acknowledging our dependence on God, giving Him the glory, and treating others with gentleness and respect (Philippians 2:3–5; James 4:6).",
          "Key Truth: Justice reflects God’s righteousness; mercy reveals His love; humility mirrors His character."
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
          "Together, they form the moral balance of a believer who walks with God. They express the very heart of Christ — who acted justly, loved deeply, and walked humbly with His Father.",
          "Key Truth: Godliness is not complete without justice and compassion."
        ]
      },
      {
        id: "c-13-5",
        number: 6,
        title: "Applying These Christian Moral Concerns",
        paragraphs: [
          "To Do Justice: Be honest and fair in all dealings. Defend the weak and speak against injustice. Treat everyone with equity, regardless of status or background.",
          "To Love Mercy: Forgive freely as Christ forgave you. Be generous to the poor and kind to the hurting. Let compassion guide your decisions and actions.",
          "To Walk Humbly with God: Pray daily with a teachable heart. Acknowledge your dependence on God’s grace. Serve others without seeking recognition or reward.",
          "Key Truth: The closer you walk with God, the more you will act with justice, mercy, and humility."
        ]
      },
      {
        id: "c-13-6",
        number: 7,
        title: "Conclusion",
        paragraphs: [
          "God requires not religion but righteousness. To be godly is to be like Him — just, merciful, and humble.",
          "When we practice these virtues, we reflect His image to a watching world and fulfill our calling as His people.",
          "Let us live each day doing justice, loving mercy, and walking humbly with our God — for this is what the LORD truly delights in."
        ]
      }
    ],
    reflectionQuestions: [
      "Why are justice, mercy, and humility the core requirements of godly living?",
      "How does Jesus Christ model these three virtues in His ministry?",
      "Which of the three (justice, mercy, humility) do you find most challenging to live out? Why?",
      "How can your church or cell group practice these values together in community?",
      "What change in your daily behavior would best demonstrate your walk with God?"
    ],
    prayer: "O my LORD GOD Almighty, thank You for showing me what is good. Help me to act justly, to love mercy, and to walk humbly with You. Let Your character shine through my actions, that others may see Your righteousness and compassion in me. Amen.",
    challenge: "LORD, I commit myself to live in justice, mercy, and humility — not just in words, but in deeds. Transform me daily to reflect Your goodness in my relationships, decisions, and service. In Jesus Christ my LORD and SAVIOUR, Amen."
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
      "To understand God’s design for faithful tithing and generous giving — not as mere religious duty, but as an act of worship, gratitude, and trust.",
      "To reflect His own generous heart and sustain His work through the Church."
    ],
    teachingSections: [
      {
        id: "c-14-intro",
        number: 1,
        title: "Introduction",
        paragraphs: [
          "What do the LORD, the prophets, and the apostles teach about tithing and giving?",
          "The Lord’s command through Malachi is clear: “Bring the whole tithe into the storehouse… Test Me in this… and see if I will not open the windows of heaven and pour out abundant blessings upon you.” (Malachi 3:10)",
          "God desires to bless His people — but He first calls us to faithfulness. Giving is not merely financial; it’s spiritual. It’s a tangible expression of our love, trust, and obedience to the One who has given us everything."
        ]
      },
      {
        id: "c-14-1",
        number: 2,
        title: "God’s Generous Giving Is at the Heart of Faithful Stewardship",
        paragraphs: [
          "“For God so loved the world that he gave his one and only Son…” — John 3:16 (NIV)",
          "God is our supreme example of generosity. He didn’t just give out of abundance — He gave His best: His only Son.",
          "True giving flows from love. When we give faithfully, we reflect God’s heart — acknowledging that all we have comes from Him and belongs to Him.",
          "Key Truth: Giving is not loss; it is love in action — mirroring the generosity of God."
        ]
      },
      {
        id: "c-14-2",
        number: 3,
        title: "God’s Shepherds Are Called to Lead and Teach Faithful Giving",
        paragraphs: [
          "“Shepherd the flock of God that is under your care… not pursuing dishonest gain, but eager to serve.” — 1 Peter 5:2–3 (NIV)",
          "Pastors and leaders have the responsibility to care for God’s people and teach sound doctrine — including biblical stewardship.",
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
          "Jesus rebuked those who gave their tithes but ignored justice, mercy, and faithfulness.",
          "Our giving must never be mechanical or prideful — it must be rooted in compassion and righteousness.",
          "The Lord calls us to a holistic generosity: to give financially and to live justly. “Whatever you did for one of the least of these brothers and sisters of mine, you did for me.” — Matthew 25:40 (NIV)",
          "Key Truth: Giving without love is religion; giving with love is worship."
        ]
      },
      {
        id: "c-14-4",
        number: 5,
        title: "Tithing Was Never Abolished — It Was Fulfilled Through Grace",
        paragraphs: [
          "“You should have practiced the latter, without neglecting the former.” — Matthew 23:23c (NIV)",
          "Tithing did not end with the Old Testament. Jesus affirmed it, not as a legal requirement, but as a spiritual practice now fulfilled by grace.",
          "The tithe — meaning “a tenth” — symbolizes dedication, obedience, and gratitude.",
          "Under grace, we give not to be blessed, but because we are already blessed.",
          "Key Truth: Tithing remains a timeless expression of our devotion to God."
        ]
      },
      {
        id: "c-14-5",
        number: 6,
        title: "Offerings Are Expressions of Grace and Gratitude",
        paragraphs: [
          "“Each of you should give what you have decided in your heart to give… for God loves a cheerful giver.” — 2 Corinthians 9:7 (NIV)",
          "Tithing is commanded; offering is voluntary — yet both come from the same grateful heart.",
          "Through offerings, we express thanksgiving beyond obligation, moved by the grace of God in our lives.",
          "“Will a man rob God? Yet you rob Me… in tithes and offerings.” — Malachi 3:8 (NIV)",
          "When we withhold what belongs to God, we limit not His ability to bless, but our own opportunity to experience His abundance.",
          "Key Truth: Offerings are not payments to God but love gifts of worship."
        ]
      },
      {
        id: "c-14-6",
        number: 7,
        title: "Generous and Cheerful Giving Is a New Testament Principle",
        paragraphs: [
          "“Whoever sows sparingly will also reap sparingly, and whoever sows generously will also reap generously… God loves a cheerful giver.” — 2 Corinthians 9:6–7 (NIV)",
          "Paul emphasized that giving is a matter of the heart.",
          "Generosity opens our lives to the flow of God’s grace — not necessarily in material wealth, but in spiritual enrichment, contentment, and fruitfulness.",
          "Key Truth: God blesses the giver to become a channel of blessing to others."
        ]
      },
      {
        id: "c-14-7",
        number: 8,
        title: "Generous Givers Experience God’s Overflowing Provision",
        paragraphs: [
          "“And God is able to bless you abundantly, so that in all things at all times, having all that you need, you will abound in every good work.” — 2 Corinthians 9:8 (NIV)",
          "God does not promise luxury, but sufficiency — enough to meet our needs and bless others.",
          "Generosity is not about how much we have, but how much we trust Him.",
          "Key Truth: When we give faithfully, God multiplies grace — not greed."
        ]
      },
      {
        id: "c-14-8",
        number: 9,
        title: "Conclusion",
        paragraphs: [
          "God Himself is our divine example of giving: “He who did not spare his own Son, but gave him up for us all — how will he not also, along with him, graciously give us all things?” — Romans 8:32 (NIV)",
          "Faithful tithing and generous giving are not obligations but privileges.",
          "They are acts of worship that acknowledge God’s ownership, express our gratitude, and advance His kingdom.",
          "When we give cheerfully and consistently, we not only honor God — we participate in His ongoing work of blessing the world."
        ]
      }
    ],
    reflectionQuestions: [
      "What motivates your giving — duty or gratitude?",
      "How do tithes and offerings differ in meaning and purpose?",
      "Why does God emphasize “cheerful giving” instead of reluctant giving?",
      "In what ways can generosity shape your character and witness?",
      "How can you practice faithful stewardship in your finances today?"
    ],
    prayer: "O my Lord God Almighty, You have given me everything I need. Teach me to give faithfully and joyfully — not out of obligation, but out of love and gratitude. Make me a cheerful and generous steward of all You have entrusted to me. Amen.",
    challenge: "Lord, I commit to be faithful in my tithes and generous in my offerings. Help me to give with joy and trust, knowing that You are the source of all my blessings. In Jesus Christ my Lord and Savior, Amen."
  }
`;

const updatedContent = content.replace('  }\n];', '  }' + newLessons + '\n];');
fs.writeFileSync('src/lessonsData.ts', updatedContent);
console.log('Successfully added lessons 1-14 (Consolidation)');
