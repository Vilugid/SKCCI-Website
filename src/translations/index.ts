export type Language = 'en' | 'fil';

export interface Translations {
  nav: {
    home: string;
    welcomeKit: string;
    gospel: string;
    biblePlan100: string;
    grow: string;
    manuals: string;
    biblePlan365: string;
    cellGroup: string;
    leaderTools: string;
    events: string;
    prayerHub: string;
    giving: string;
    contact: string;
    signIn: string;
    signOut: string;
    myProfile: string;
    unlocked: string;
    adminDashboard: string;
    superAdmin: string;
    prayerAdmin: string;
    eventAdmin: string;
    videoAdmin: string;
    quickLinks: string;
    bibleGuide365: string;
  };
  hero: {
    welcomeBadge: string;
    titleLine1: string;
    titleLine2: string;
    description: string;
    sundayService: string;
    planVisit: string;
    connectCell: string;
    visitFacebook: string;
  };
  welcomeKit: {
    title: string;
    subtitle: string;
    gospelTitle: string;
    gospelDesc: string;
    readGospel: string;
    plan100Title: string;
    plan100Desc: string;
    startPlan100: string;
    connectTitle: string;
    sundayTitle: string;
    sundayDesc: string;
    cellTitle: string;
    cellDesc: string;
    eventsTitle: string;
    eventsDesc: string;
    facebookTitle: string;
    facebookDesc: string;
  };
  gospel: {
    title: string;
    verseRef: string;
    verseEnglish: string;
    verseTagalog: string;
    instruction: string;
    cardsTitle: string;
    presentationTitle: string;
    presentationPrompt: string;
    openInNewTab: string;
    salvationPrayerTitle: string;
    salvationPrayerSubtitle: string;
    salvationPrayerText: string;
    salvationPrayerNextSteps: string;
    salvationPrayerButton: string;
  };
  giving: {
    title: string;
    subtitle: string;
    bankTransfer: string;
    scanToPay: string;
    tapToViewQR: string;
    bankName: string;
    bankBranch: string;
    accountName: string;
    accountNumber: string;
    copied: string;
    copyAccount: string;
    givingVerse: string;
    givingVerseRef: string;
    whyWeGiveTitle: string;
    whyWeGiveDesc: string;
  };
  prayerHub: {
    title: string;
    subtitle: string;
    submitRequest: string;
    scheduleTitle: string;
    prayerWallTitle: string;
    fastingGuide: string;
    nameLabel: string;
    namePlaceholder: string;
    emailLabel: string;
    emailPlaceholder: string;
    categoryLabel: string;
    requestLabel: string;
    requestPlaceholder: string;
    confidentialLabel: string;
    confidentialNote: string;
    submitButton: string;
    submitting: string;
    successMessage: string;
    iPrayedButton: string;
    prayedCount: string;
  };
  biblePlan: {
    plan100Title: string;
    plan100Subtitle: string;
    plan365Title: string;
    plan365Subtitle: string;
    progress: string;
    completed: string;
    markComplete: string;
    completedDay: string;
    previousDay: string;
    nextDay: string;
    readToday: string;
    reflectionGuide: string;
    saveToCloud: string;
    savedToCloud: string;
    saving: string;
    saved: string;
    exportCSV: string;
    streakTitle: string;
    streakSubtitle: string;
    loginToSync: string;
    loginButton: string;
  };
  cellGroup: {
    title: string;
    subtitle: string;
    findGroup: string;
    joinGroup: string;
    leader: string;
    schedule: string;
    location: string;
  };
  events: {
    title: string;
    subtitle: string;
    upcoming: string;
    viewDetails: string;
    shareEvent: string;
  };
  footer: {
    churchName: string;
    tagline: string;
    address: string;
    quickLinks: string;
    rightsReserved: string;
  };
  common: {
    close: string;
    back: string;
    save: string;
    loading: string;
    copied: string;
    viewMore: string;
    learnMore: string;
    languageName: string;
    switchLanguage: string;
  };
}

export const translations: Record<Language, Translations> = {
  en: {
    nav: {
      home: 'Home',
      welcomeKit: 'Welcome Kit',
      gospel: 'Gospel',
      biblePlan100: '100 Days Bible Plan',
      grow: 'Grow',
      manuals: 'Manuals',
      biblePlan365: '365-Day Guide',
      cellGroup: 'Cell Group',
      leaderTools: 'Leader Tools',
      events: 'Events',
      prayerHub: 'Prayer Hub',
      giving: 'Giving',
      contact: 'Contact',
      signIn: 'Sign In',
      signOut: 'Sign Out',
      myProfile: 'My Profile',
      unlocked: 'UNLOCKED!',
      adminDashboard: 'Admin Dashboard',
      superAdmin: 'Super Admin',
      prayerAdmin: 'Prayer Admin',
      eventAdmin: 'Event Admin',
      videoAdmin: 'Video Admin',
      quickLinks: 'Quick Links',
      bibleGuide365: '365 Bible Reading Guide'
    },
    hero: {
      welcomeBadge: 'WELCOME HOME',
      titleLine1: 'Your Church',
      titleLine2: 'Your Family',
      description: 'Experience the love, community, and transformative power of God with us. We are SAVIOR-KING Commission Church International.',
      sundayService: 'Sunday Service: Every Sunday @ 9:30 AM',
      planVisit: 'Plan Your Visit',
      connectCell: 'Connect to Cell',
      visitFacebook: 'Visit our Facebook Page'
    },
    welcomeKit: {
      title: 'Welcome Kit',
      subtitle: 'Discover how you can get plugged into our church family and grow in your faith journey.',
      gospelTitle: 'The Gospel',
      gospelDesc: 'Experience the good news of Jesus Christ. Learn about His love, grace, and the salvation freely offered to everyone. This is the foundation of our faith.',
      readGospel: 'Read The Gospel',
      plan100Title: '100 Days Bible Plan',
      plan100Desc: 'Start a daily journey through God\'s Word. This carefully curated 100-day reading plan will help you build a strong foundation and a lasting habit of reading the Bible.',
      startPlan100: 'Start Bible Plan',
      connectTitle: 'Connect With Us',
      sundayTitle: 'Visit Sunday Service',
      sundayDesc: 'Join us every Sunday @ 9:30 AM at 2nd Floor 158 Mañalac Avenue, Bagong Tanyag, Taguig City.',
      cellTitle: 'Join a Cell Group',
      cellDesc: 'Find genuine community, spiritual accountability, and lifelong friendships in a cell group.',
      eventsTitle: 'Events & Gatherings',
      eventsDesc: 'Participate in our upcoming church fellowships, youth ministries, and outreach programs.',
      facebookTitle: 'Follow us on Facebook',
      facebookDesc: 'Stay updated with live stream services, church announcements, and inspiring devotionals.'
    },
    gospel: {
      title: 'The Gospel',
      verseRef: 'Romans 6:23 NIV',
      verseEnglish: 'For the wages of sin is death, but the gift of God is eternal life in Christ Jesus our Lord.',
      verseTagalog: 'Sapagkat ang kabayaran ng kasalanan ay kamatayan, ngunit ang kaloob ng Diyos ay buhay na walang hanggan kay Cristo Jesus na ating Panginoon.',
      instruction: 'Tap each card below to explore its meaning.',
      cardsTitle: 'Interactive Romans 6:23 Study',
      presentationTitle: 'The Gospel Presentation',
      presentationPrompt: 'View our interactive Gospel slides presentation below.',
      openInNewTab: 'Open Presentation in New Tab',
      salvationPrayerTitle: 'Prayer of Salvation',
      salvationPrayerSubtitle: 'If you desire to surrender your life to Jesus Christ today, pray this sincerely from your heart:',
      salvationPrayerText: '"Lord Jesus, I acknowledge that I am a sinner and that I cannot save myself. I believe that You died on the cross for my sins and rose again. Today, I turn away from my sins and receive You as my personal Lord and Savior. Take control of my life and guide me in Your truth. In Jesus\' name, Amen."',
      salvationPrayerNextSteps: 'Did you make this decision today? We would love to walk with you! Connect with our pastoral team or join a cell group.',
      salvationPrayerButton: 'Connect With Us Today'
    },
    giving: {
      title: 'Giving & Stewardship',
      subtitle: 'Your generosity helps us continue our mission, serve our community, and share the love of Christ.',
      bankTransfer: 'Bank Transfer',
      scanToPay: 'Scan to Pay via InstaPay',
      tapToViewQR: 'Tap to view QR Code',
      bankName: 'Bank of the Philippine Islands (BPI)',
      bankBranch: 'Tanyag Branch',
      accountName: 'Savior-King Commission Church Inc.',
      accountNumber: '3819017068',
      copied: 'Copied to Clipboard!',
      copyAccount: 'Copy Account Number',
      givingVerse: '"Each of you should give what you have decided in your heart to give, not reluctantly or under compulsion, for God loves a cheerful giver."',
      givingVerseRef: '2 Corinthians 9:7 NIV',
      whyWeGiveTitle: 'Why We Give',
      whyWeGiveDesc: 'Giving is an act of worship and gratitude to God. Through tithes and offerings, we support gospel advancement, pastoral care, and charitable community outreaches.'
    },
    prayerHub: {
      title: 'Prayer Hub',
      subtitle: 'Cast all your anxiety on Him because He cares for you. Share your prayer requests and let our church family stand with you in faith.',
      submitRequest: 'Submit a Prayer Request',
      scheduleTitle: 'Weekly Intercessory Prayer Focus',
      prayerWallTitle: 'Church Prayer Wall',
      fastingGuide: 'Corporate Prayer & Fasting Guide',
      nameLabel: 'Your Name (Optional)',
      namePlaceholder: 'e.g. Bro. Juan or Sister Maria',
      emailLabel: 'Email Address (Optional)',
      emailPlaceholder: 'juan@example.com',
      categoryLabel: 'Prayer Category',
      requestLabel: 'Your Prayer Request',
      requestPlaceholder: 'Write your prayer intention or thanksgiving...',
      confidentialLabel: 'Keep this request confidential (Pastors and Intercessors only)',
      confidentialNote: 'Confidential requests will not appear on the public prayer wall.',
      submitButton: 'Submit Prayer Request',
      submitting: 'Submitting...',
      successMessage: 'Your prayer request has been received. Our team is praying for you!',
      iPrayedButton: 'I Prayed for This',
      prayedCount: 'prayers lifted up'
    },
    biblePlan: {
      plan100Title: '100 Days Bible Plan',
      plan100Subtitle: 'Build a solid daily spiritual habit with selected key chapters from the New Testament.',
      plan365Title: '365-Day Bible Reading Guide',
      plan365Subtitle: 'Read through the Scriptures chronologically throughout the entire year.',
      progress: 'Overall Progress',
      completed: 'Completed',
      markComplete: 'Mark as Completed',
      completedDay: 'Completed',
      previousDay: 'Previous Day',
      nextDay: 'Next Day',
      readToday: 'Read Passage',
      reflectionGuide: 'Scripture Reflection Guide',
      saveToCloud: 'Save Reflections to Cloud',
      savedToCloud: 'Saved to Cloud',
      saving: 'Saving...',
      saved: 'Saved!',
      exportCSV: 'Export CSV',
      streakTitle: 'Reading Streak',
      streakSubtitle: 'Keep your daily momentum in God\'s Word',
      loginToSync: 'Please sign in to save and sync your scripture reflections to the cloud.',
      loginButton: 'Sign In to Save'
    },
    cellGroup: {
      title: 'Cell Groups',
      subtitle: 'Life is better together. Connect with a spiritual family near you for Bible study, fellowship, and prayer.',
      findGroup: 'Find a Cell Group',
      joinGroup: 'Join This Group',
      leader: 'Cell Leader',
      schedule: 'Meeting Schedule',
      location: 'Location'
    },
    events: {
      title: 'Church Events & Gatherings',
      subtitle: 'Join us for our upcoming fellowships, special services, and community ministries.',
      upcoming: 'Upcoming Gatherings',
      viewDetails: 'View Details',
      shareEvent: 'Share Event'
    },
    footer: {
      churchName: 'SAVIOR-KING Commission Church International',
      tagline: 'Your Church Your Family. We exist to know God and make Him known, building a community transformed by His grace.',
      address: '2nd Floor 158 Mañalac Avenue, Bagong Tanyag, Taguig City',
      quickLinks: 'Quick Links',
      rightsReserved: 'All rights reserved.'
    },
    common: {
      close: 'Close',
      back: 'Back',
      save: 'Save',
      loading: 'Loading...',
      copied: 'Copied!',
      viewMore: 'View More',
      learnMore: 'Learn More',
      languageName: 'US English',
      switchLanguage: 'Switch Language'
    }
  },
  fil: {
    nav: {
      home: 'Home',
      welcomeKit: 'Welcome Kit',
      gospel: 'Gospel',
      biblePlan100: '100 Days Bible Plan',
      grow: 'Grow',
      manuals: 'Manuals',
      biblePlan365: '365-Day Guide',
      cellGroup: 'Cell Group',
      leaderTools: 'Leader Tools',
      events: 'Events',
      prayerHub: 'Prayer Hub',
      giving: 'Giving',
      contact: 'Contact',
      signIn: 'Sign In',
      signOut: 'Sign Out',
      myProfile: 'My Profile',
      unlocked: 'UNLOCKED!',
      adminDashboard: 'Admin Dashboard',
      superAdmin: 'Super Admin',
      prayerAdmin: 'Prayer Admin',
      eventAdmin: 'Event Admin',
      videoAdmin: 'Video Admin',
      quickLinks: 'Quick Links',
      bibleGuide365: '365-Day Guide'
    },
    hero: {
      welcomeBadge: 'MALIGAYANG PAGDATING',
      titleLine1: 'Ang Iyong Simbahan',
      titleLine2: 'Ang Iyong Pamilya',
      description: 'Maranasan ang pag-ibig, komunidad, at kapangyarihan ng Diyos na nagbabago ng buhay. Kami ang SAVIOR-KING Commission Church International.',
      sundayService: 'Sunday Service: Tuwing Linggo @ 9:30 AM',
      planVisit: 'Planuhin ang Pagbisita',
      connectCell: 'Sumali sa Cell Group',
      visitFacebook: 'Bisitahin ang Facebook Page'
    },
    welcomeKit: {
      title: 'Welcome Kit',
      subtitle: 'Tuklasin kung paano ka makakakonekta sa aming pamilya ng pananampalataya at lumago kasama ng Diyos.',
      gospelTitle: 'Ang Ebanghelyo',
      gospelDesc: 'Maranasan ang magandang balita ni Hesukristo. Alamin ang Kanyang pag-ibig, biyaya, at ang kaligtasang malayang iniaalok para sa lahat. Ito ang pundasyon ng ating pananampalataya.',
      readGospel: 'Basahin ang Ebanghelyo',
      plan100Title: '100 Days Bible Plan',
      plan100Desc: 'Simulan ang araw-araw na paglalakbay sa Salita ng Diyos. Ang 100-araw na gabay na ito ay tutulong sa iyo na magkaroon ng matibay na pundasyon at ugali sa pagbabasa ng Bibliya.',
      startPlan100: 'Simulan ang Bible Plan',
      connectTitle: 'Kumonekta sa Amin',
      sundayTitle: 'Dumalo sa Sunday Service',
      sundayDesc: 'Samahan kami tuwing Linggo @ 9:30 AM sa 2nd Floor 158 Mañalac Avenue, Bagong Tanyag, Taguig City.',
      cellTitle: 'Sumali sa Cell Group',
      cellDesc: 'Magkaroon ng tapat na samahan, pagtutulungang espiritwal, at panghabambuhay na kaibigan sa isang cell group.',
      eventsTitle: 'Mga Kaganapan at Pagtitipon',
      eventsDesc: 'Makibahagi sa aming mga fellowship, youth ministry, at mga programang pangkawanggawa sa komunidad.',
      facebookTitle: 'Sundan Kami sa Facebook',
      facebookDesc: 'Manatiling updated sa mga live stream service, patalastas ng simbahan, at nakapagpapatibay na debosyon.'
    },
    gospel: {
      title: 'Ang Ebanghelyo',
      verseRef: 'Mga Taga-Roma 6:23',
      verseEnglish: 'For the wages of sin is death, but the gift of God is eternal life in Christ Jesus our Lord.',
      verseTagalog: 'Sapagkat ang kabayaran ng kasalanan ay kamatayan, ngunit ang kaloob ng Diyos ay buhay na walang hanggan kay Cristo Jesus na ating Panginoon.',
      instruction: 'Pindutin ang bawat card sa ibaba upang galugarin ang kahulugan nito.',
      cardsTitle: 'Pagsusuri sa Roma 6:23',
      presentationTitle: 'Presentasyon ng Ebanghelyo',
      presentationPrompt: 'Tingnan ang aming interactive Gospel slides presentation sa ibaba.',
      openInNewTab: 'Buksan ang Presentasyon sa Bagong Tab',
      salvationPrayerTitle: 'Panalangin ng Pagtanggap kay Jesus',
      salvationPrayerSubtitle: 'Kung nais mong isuko ang iyong buhay kay Hesukristo ngayon, buong puso mong ipanalangin ito:',
      salvationPrayerText: '"Panginoong Hesus, kinikilala ko po na ako ay isang makasalanan at hindi ko kayang iligtas ang aking sarili. Naniniwala ako na Ikaw ay namatay sa krus para sa aking mga kasalanan at muling nabuhay. Ngayong araw, tinatalikuran ko ang aking mga kasalanan at tinatanggap Kita bilang aking pansariling Panginoon at Tagapagligtas. Ikaw po ang mamuno sa aking buhay. Sa pangalan ni Hesus, Amen."',
      salvationPrayerNextSteps: 'Ginawa mo ba ang desisyong ito ngayon? Nais naming samahan ka sa iyong paglago! Makipag-ugnayan sa aming mga pastor o sumali sa cell group.',
      salvationPrayerButton: 'Kumonekta sa Amin Ngayon'
    },
    giving: {
      title: 'Pagbibigay at Pangangasiwa',
      subtitle: 'Ang inyong bukas-palad na kaloob ay tumutulong sa pagsulong ng misyon, paglilingkod sa komunidad, at pagbabahagi ng pag-ibig ni Cristo.',
      bankTransfer: 'Paglilipat sa Bangko',
      scanToPay: 'I-scan upang Magbayad gamit ang InstaPay',
      tapToViewQR: 'Pindutin para makita ang QR Code',
      bankName: 'Bank of the Philippine Islands (BPI)',
      bankBranch: 'Tanyag Branch',
      accountName: 'Savior-King Commission Church Inc.',
      accountNumber: '3819017068',
      copied: 'Nakopya na sa Clipboard!',
      copyAccount: 'Kopyahin ang Numero ng Account',
      givingVerse: '"Magbigay ang bawat isa ayon sa ipinasiya ng kanyang puso, hindi mabigat sa loob o dahil sa kailangan, sapagkat iniibig ng Diyos ang nagbibigay na may kagalakan."',
      givingVerseRef: '2 Mga Taga-Corinto 9:7',
      whyWeGiveTitle: 'Bakit Tayo Nagbibigay',
      whyWeGiveDesc: 'Ang pagbibigay ay isang paraan ng pagsamba at pasasalamat sa Diyos. Sa pamamagitan ng ikapu at mga handog, sinusuportahan natin ang pagpapalaganap ng ebanghelyo, pangangalaga ng mga pastor, at kawanggawa sa kapwa.'
    },
    prayerHub: {
      title: 'Prayer Hub',
      subtitle: 'Ipagkatiwala sa Kanya ang lahat ng inyong alalahanin sapagkat Siya ay nagmamalasakit sa inyo. Ibahagi ang inyong kahilingan at manalangin tayo nang sama-sama.',
      submitRequest: 'Magsumite ng Kahilingan sa Panalangin',
      scheduleTitle: 'Lingguhang Pokus ng Panalangin',
      prayerWallTitle: 'Dingding ng Panalangin',
      fastingGuide: 'Gabay sa Sama-samang Panalangin at Pag-aayuno',
      nameLabel: 'Iyong Pangalan (Opsyonal)',
      namePlaceholder: 'hal. Kapatid na Juan o Maria',
      emailLabel: 'Email Address (Opsyonal)',
      emailPlaceholder: 'juan@example.com',
      categoryLabel: 'Kategorya ng Panalangin',
      requestLabel: 'Iyong Kahilingan sa Panalangin',
      requestPlaceholder: 'Isulat ang iyong intensyon o pasasalamat...',
      confidentialLabel: 'Panatilihing kumpidensiyal (Para lamang sa mga Pastor at Intercessor)',
      confidentialNote: 'Ang mga kumpidensiyal na kahilingan ay hindi ilalagay sa pampublikong prayer wall.',
      submitButton: 'Isumite ang Kahilingan',
      submitting: 'Isinusumite...',
      successMessage: 'Natanggap na ang inyong kahilingan. Ipinapanalangin ka ng buong simbahan!',
      iPrayedButton: 'Nagdasal Ako Dito',
      prayedCount: 'mga panalanging iniangat'
    },
    biblePlan: {
      plan100Title: '100 Days Bible Plan',
      plan100Subtitle: 'Bumuo ng matibay na pang-araw-araw na ugali sa mga piling kabanata mula sa Bagong Tipan.',
      plan365Title: '365-Araw na Gabay sa Pagbabasa ng Bibliya',
      plan365Subtitle: 'Basahin ang Banal na Kasulatan nang sunod-sunod sa buong taon.',
      progress: 'Kabuuang Progreso',
      completed: 'Natapos',
      markComplete: 'Markahan bilang Tapos',
      completedDay: 'Natapos na',
      previousDay: 'Nakaraang Araw',
      nextDay: 'Susunod na Araw',
      readToday: 'Basahin ang Bahagi',
      reflectionGuide: 'Gabay sa Pagbubulay sa Kasulatan',
      saveToCloud: 'I-save sa Cloud ang mga Sagot',
      savedToCloud: 'Nai-save sa Cloud',
      saving: 'Inililigtas...',
      saved: 'Nai-save!',
      exportCSV: 'I-export ang CSV',
      streakTitle: 'Araw-araw na Streak',
      streakSubtitle: 'Panatilihin ang iyong sigla sa Salita ng Diyos',
      loginToSync: 'Mangyaring mag-sign in upang mai-save at mai-sync ang iyong mga tala sa cloud.',
      loginButton: 'Mag-sign In para Mag-save'
    },
    cellGroup: {
      title: 'Mga Cell Group',
      subtitle: 'Mas masaya at mabuti kapag sama-sama. Sumali sa pamilyang espiritwal para sa pag-aaral ng Bibliya, fellowship, at panalangin.',
      findGroup: 'Maghanap ng Cell Group',
      joinGroup: 'Sumali sa Grupong Ito',
      leader: 'Lider ng Cell',
      schedule: 'Oras ng Pagtitipon',
      location: 'Lokasyon'
    },
    events: {
      title: 'Mga Kaganapan at Pagtitipon',
      subtitle: 'Samahan kami sa aming mga darating na fellowship, espesyal na pagtitipon, at gawain sa komunidad.',
      upcoming: 'Mga Paparating na Pagtitipon',
      viewDetails: 'Tingnan ang Detalye',
      shareEvent: 'Ibahagi ang Kaganapan'
    },
    footer: {
      churchName: 'SAVIOR-KING Commission Church International',
      tagline: 'Ang Iyong Simbahan, Ang Iyong Pamilya. Naririto tayo upang makilala ang Diyos at ipakilala Siya, nagtatatag ng komunidad na binago ng Kanyang biyaya.',
      address: '2nd Floor 158 Mañalac Avenue, Bagong Tanyag, Taguig City',
      quickLinks: 'Mabilisang Link',
      rightsReserved: 'Lahat ng karapatan ay nakalaan.'
    },
    common: {
      close: 'Isara',
      back: 'Bumalik',
      save: 'I-save',
      loading: 'Naglo-load...',
      copied: 'Nakopya na!',
      viewMore: 'Tingnan Pa',
      learnMore: 'Alamin Pa',
      languageName: 'PH Tagalog',
      switchLanguage: 'Palitan ang Wika'
    }
  }
};
