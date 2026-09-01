import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import dotenv from "dotenv";
import { GoogleGenAI, ThinkingLevel } from "@google/genai";

dotenv.config();

let genAIClient: GoogleGenAI | null = null;
function getGenAI(): GoogleGenAI | null {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey || apiKey === "MY_GEMINI_API_KEY" || apiKey.trim() === "") {
    return null;
  }
  if (!genAIClient) {
    genAIClient = new GoogleGenAI({
      apiKey,
      httpOptions: {
        headers: {
          'User-Agent': 'aistudio-build',
        }
      }
    });
  }
  return genAIClient;
}

function getChurchFallbackResponse(message: string, language: 'tl' | 'fil' | 'en'): string {
  const lower = message.toLowerCase();
  const isTagalog = language === 'tl' || language === 'fil';

  if (isTagalog) {
    // 1. Plan My Visit
    if (lower.includes('bisita') || lower.includes('visit') || lower.includes('oras') || lower.includes('time') || lower.includes('schedule') || lower.includes('linggo') || lower.includes('planuhin')) {
      return `**Maligayang pagdating sa SKCCI (SAVIOR-KING Commission Church International)!** 

Ako po si **Hannah**, ang inyong virtual church usher. Narito po ang lahat ng kailangan ninyong malaman para sa inyong pagbisita:

- 🗓️ **Araw ng Pagsamba:** Tuwing Linggo (Every Sunday)
- ⏰ **Oras ng Service:** 9:30 AM ng Umaga
- 📍 **Lokasyon:** 2nd Floor, 158 Mañalac Avenue, Bagong Tanyag, Taguig City
- 👶 **Kids Ministry / Children's Church:** May nakalaang masaya at ligtas na aralin sa Bibliya para sa mga bata habang nagpapatuloy ang service!
- 🚗 **Paradahan at Salubong:** May maayos na parking space at buong pusong sasalubungin kayo ng ating usher team.
- 👕 **Attire:** Casual or Smart Casual—malugod kayong tatanggapin tulad ng isang pamilya!

Nais niyo po ba ng karagdagang tulong sa direksyon o nais ipasabi ang inyong pagbisita?`;
    }

    // 2. Events & RSVP Walkthrough
    if (lower.includes('event') || lower.includes('kaganapan') || lower.includes('aktibidad') || lower.includes('rsvp') || lower.includes('attend') || lower.includes('schedule')) {
      return `**Mga Kaganapan at Gabay sa Pag-RSVP (Events & RSVP Walkthrough):**

Nais niyo po bang dumalo sa ating mga paparating na gawain at pagtitipon? Narito po ang madaling gabay:

📍 **Paano Pumunta sa Events Page:**
1. I-click ang **Events** tab sa navigation bar sa itaas ng website.
2. Makikita ninyo ang listahan ng lahat ng paparating na Sunday Services, fellowships, trainings, at special church gatherings kasama ang petsa, oras, at venue.

✅ **Paano Mag-RSVP (Reserva ng Attendance):**
1. Mag-sign in gamit ang inyong **Google Account** sa kanang itaas ng page.
2. Sa event card na nais ninyong daluhan, i-click lamang ang **"RSVP / Attending"** button.
3. Agad na maitatala ang inyong attendance sa ating listahan ng mga dadalo upang maihanda ng ating ushering team ang inyong upuan at mga materyales!

Inaanyayahan po namin kayong mag-RSVP na para sa ating susunod na fellowship!`;
    }

    // 3. Outline of the Sermon (Grow > Leader Tools)
    if (lower.includes('sermon') || lower.includes('balangkas') || lower.includes('outline') || lower.includes('mensahe') || lower.includes('leader tools') || lower.includes('preaching')) {
      return `**Balangkas ng Sermon (Sermon Outlines) sa Leader Tools:**

Ang mga opisyal na balangkas ng sermon ng SKCCI ay matatagpuan sa **Leader Tools** sa ilalim ng **Grow** menu:

📍 **Paano Pumunta sa Leader Tools:**
1. I-hover o i-click ang **"Grow"** dropdown menu sa navigation bar sa itaas.
2. Piliin at i-click ang **"Leader Tools"**.

📖 **Ano-ano ang Nilalaman ng Leader Tools:**
- **Structured Sermon Series Outlines:** Kumpletong balangkas ng mga mensahe tuwing Linggo na may **Big Idea / Main Theme**, mga talata sa Bibliya (**Scripture References**), mga pangunahing punto (**Roman Numerals I, II, III**), mga tanong para sa talakayan, at praktikal na aplikasyon sa buhay.
- **Worship Sets & Lyrics:** Listahan ng mga awit sa papuri at pagsamba.
- **Cell Leader Teaching Aids:** Gabay para sa mga Cell Leaders sa kanilang weekly small group discussions.

Napakainam po nito para sa mga lider, manggagawa, at sinumang nagnanais mag-aral nang mas malalim sa Salita ng Diyos!`;
    }

    // 4. Consolidation Manuals (Grow > Manuals)
    if (lower.includes('manual') || lower.includes('consolidation') || lower.includes('discipleship') || lower.includes('konsolidasyon') || lower.includes('aralin') || lower.includes('alaga')) {
      return `**Consolidation Manuals (Grow > Manuals):**

Ang **Consolidation Manuals** ay nakalaan para sa pag-aalaga, paggabay, at pagpapatatag sa pananampalataya ng mga bagong mananampalataya kay Kristo:

📍 **Paano Pumunta sa Manuals Page:**
1. I-click ang **"Grow"** dropdown menu sa navigation bar sa itaas.
2. Piliin ang **"Manuals"** (o Manuals Reader).

📚 **Mga Nilalaman ng Manuals:**
- **Consolidation Modules:** Mga sunod-sunod na aralin ukol sa follow-up, pananalangin, pagbabasa ng Bibliya, pakikisama sa iglesya, at pagtatagumpay sa mga pagsubok bilang bagong Kristiyano.
- **Evangelism Modules:** Gabay sa pagbabahagi ng Ebanghelyo at pag-akay ng kaluluwa.
- **Envisioning Modules:** Pagsasanay para sa pamumuno at paglago sa ministeryo.
- **Interactive Progress:** May checklist upang ma-track ang mga natapos ninyong aralin kasama ang inyong Cell Leader!`;
    }

    // 5. Cell Groups
    if (lower.includes('cell') || lower.includes('group') || lower.includes('small group') || lower.includes('ugnayan')) {
      return `**Cell Groups at Small Groups sa SKCCI:** 

Naniniwala po kami sa *"Your Church, Your Family"*. Sa pamamagitan ng Cell Groups, nagkakaroon tayo ng mas malapit na samahan, pag-aaral ng Salita ng Diyos, at suporta sa panalangin:

- 👨 **Men's Fellowship / Cell:** Para sa mga kalalakihan at mga ama.
- 👩 **Women's Ministry / Cell:** Para sa mga kababaihan at mga ina.
- ⚡ **K-Youth (Kabataan):** Para sa mga kabataan, high school, at college students.
- 👨‍👩‍👧‍👦 **Couples & Family Cell:** Para sa mga mag-asawa at pamilya.

Maaari po kayong pumunta sa **Grow > Cell Group** tab ng ating website o sabihin sa akin ang inyong lokasyon upang maikonekta namin kayo sa pinakamalapit na Cell Leader!`;
    }

    // 6. The Gospel & Devotionals
    if (lower.includes('ebanghelyo') || lower.includes('gospel') || lower.includes('debosyon') || lower.includes('devotional') || lower.includes('100 day') || lower.includes('365') || lower.includes('salvation') || lower.includes('ligtas')) {
      return `**Ang Mabuting Balita (Ang Ebanghelyo) at Gabay sa Debosyon:**

✨ **Ang 4 na Espiritwal na Katotohanan:**
1. **Mahal ka ng Diyos:** May magandang layunin ang Diyos sa iyong buhay (Juan 3:16).
2. **Nahiwalay Tayo sa Kasalanan:** Hindi natin kayang iligtas ang ating sarili (Roma 3:23).
3. **Si Hesu-Kristo ang Tulay:** Namatay Siya sa krus at muling nabuhay para tubusin tayo (Roma 5:8).
4. **Tanggapin si Hesus:** Sa pananampalataya at pagtitiwala sa Kanya bilang Panginoon (Juan 1:12).

📖 **Mga Gabay sa Araw-araw na Pagbabasa ng Bibliya sa Website:**
- **"My First 100 Days with JESUS":** May gabay na pagninilay para sa Bagong Tipan.
- **"365-Day Bible Reading Guide":** Buong Bibliya sa loob ng isang taon (makikita sa Grow menu).`;
    }

    // 7. Prayer Requests & Giving
    if (lower.includes('panalangin') || lower.includes('prayer') || lower.includes('hiling') || lower.includes('kaloob') || lower.includes('handog') || lower.includes('tithe') || lower.includes('giving') || lower.includes('donate')) {
      return `**Hiling sa Panalangin at Pagkakaloob (Prayer & Giving):**

🙏 **Prayer Request:**
Ikinagagalak po ng aming pastoral at intercessory team na ipanalangin ang inyong mga pangangailangan, kagalingan, pamilya, o hanapbuhay. Maaari po kayong mag-type rito ng inyong kahilingan o mag-post sa ating **Prayer Hub** tab!

💝 **Tithe at Handog (Giving):**
- 📱 **GCash:** 0966-838-8924 / 0917-800-4740 (SKCCI Ministry)
- 🏦 **Bank Transfer:** BDO at BPI (i-click ang **Giving** tab para sa buong detalye)
- 🏛️ **In-Person:** Sa ating worship sanctuary tuwing Linggo.

Salamat po sa inyong tapat na puso sa pagsuporta sa gawaing pang-Kaharian!`;
    }

    // 8. Location & Streaming
    if (lower.includes('lokasyon') || lower.includes('saan') || lower.includes('address') || lower.includes('map') || lower.includes('stream') || lower.includes('online') || lower.includes('facebook') || lower.includes('direksyon') || lower.includes('watch') || lower.includes('panoorin')) {
      return `**Lokasyon ng Simbahan at Online Streaming:**

📍 **Physical Sanctuary:**
- **Address:** 2nd Floor, 158 Mañalac Avenue, Bagong Tanyag, Taguig City, Philippines
- **Landmark:** Tanyag junction along Mañalac Ave. May interactive Google Map po sa ating **Contact** tab.

🎥 **Online Facebook Service / Livestream:**
Kung nais ninyong mapanood ang ating online service o live Sunday celebration tuwing Linggo @ 9:30 AM, mag-click po rito:
🔗 **Watch Online Service:** https://www.facebook.com/share/g/1BpFgffo67/
*(Official Page: https://www.facebook.com/SaviorKingCC)*

Inaanyayahan po namin kayong makiisa sa pagsamba!`;
    }

    return `**Magandang araw po!** Ako si **Hannah**, ang inyong virtual church usher sa SKCCI.

Nandito po ako upang gabayan kayo sa:
1. ⛪ **Planuhin ang Pagbisita** (Sunday Service @ 9:30 AM)
2. 📅 **Mga Kaganapan at Gabay sa Pag-RSVP** (Events Page & RSVP)
3. 📖 **Balangkas ng Sermon** (Grow > Leader Tools)
4. 📚 **Consolidation Manuals** (Grow > Manuals)
5. 👥 **Cell Groups / Small Groups**
6. ✨ **Ang Ebanghelyo at Debosyon**
7. 🙏 **Hiling sa Panalangin at Pagkakaloob**
8. 📍 **Lokasyon at Online Service**

Ano po ang nais ninyong malaman o kailangan ninyong tulong?`;
  } else {
    // English responses
    // 1. Plan My Visit
    if (lower.includes('visit') || lower.includes('time') || lower.includes('sunday') || lower.includes('service') || lower.includes('schedule') || lower.includes('plan')) {
      return `**Welcome to SKCCI (SAVIOR-KING Commission Church International)!**

I'm **Hannah**, your virtual church usher. Here is everything you need to know to plan your visit:

- 🗓️ **Service Day:** Every Sunday
- ⏰ **Service Time:** 9:30 AM PST
- 📍 **Sanctuary Location:** 2nd Floor, 158 Mañalac Avenue, Bagong Tanyag, Taguig City
- 👶 **Children's Church / Kids Ministry:** Safe, engaging, and Christ-centered lessons for children while parents attend the main service!
- 🚗 **Parking & Greeting:** On-site parking available with our warm ushering team ready to welcome you.
- 👕 **Attire:** Casual or smart casual—come as you are!

Would you like any directions or assistance planning your upcoming Sunday?`;
    }

    // 2. Events & RSVP Walkthrough
    if (lower.includes('event') || lower.includes('rsvp') || lower.includes('attend') || lower.includes('calendar') || lower.includes('activities')) {
      return `**Events Page Walkthrough & RSVP Instructions:**

We would love to have you join our upcoming gatherings and special church celebrations! Here is your step-by-step guide:

📍 **How to Navigate to the Events Page:**
1. Click on the **Events** tab located in the top navigation bar.
2. Browse through the calendar of upcoming Sunday services, discipleship trainings, fellowship nights, and youth gatherings with dates, times, and venue details.

✅ **How to RSVP for an Event:**
1. Ensure you are signed in with your **Google Account** (top-right corner of the page).
2. On any event card you wish to attend, click the **"RSVP / Attending"** button.
3. Your confirmation is recorded in real time, helping our team reserve your seat and prepare hospitality materials!

We look forward to seeing you at our next event!`;
    }

    // 3. Outline of the Sermon (Grow > Leader Tools)
    if (lower.includes('sermon') || lower.includes('outline') || lower.includes('leader tools') || lower.includes('preaching') || lower.includes('teaching')) {
      return `**Sermon Outlines in Leader Tools (under Grow):**

Official SKCCI sermon outlines and ministry resources are housed directly on the **Leader Tools** page under the **Grow** menu:

📍 **How to Access Leader Tools:**
1. In the top navigation bar, click or hover over the **"Grow"** dropdown.
2. Select **"Leader Tools"** from the menu.

📖 **What You Will Find in Leader Tools:**
- **Structured Sermon Outlines:** Complete breakdowns of weekly Sunday messages featuring the **Big Idea / Main Theme**, **Scripture References**, detailed preaching points with Roman numerals (**I, II, III**), discussion questions, and personal life applications.
- **Worship Sets & Lyrics:** Curated praise & worship song playlists, chords, and YouTube resources.
- **Cell Group Discussion Aids:** Practical discussion starters for Cell Leaders.

This is an invaluable resource for leaders, teachers, and anyone desiring deeper study of God's Word!`;
    }

    // 4. Consolidation Manuals (Grow > Manuals)
    if (lower.includes('manual') || lower.includes('consolidation') || lower.includes('discipleship') || lower.includes('lesson') || lower.includes('nurture')) {
      return `**Consolidation Manuals (under Grow > Manuals):**

The **Consolidation Manuals** are discipleship guides designed to nurture, establish, and disciple new believers in their relationship with Christ:

📍 **How to Access the Manuals:**
1. Click on the **"Grow"** dropdown in the top navigation bar.
2. Select **"Manuals"** (Manuals Reader).

📚 **Manuals Curriculum Highlights:**
- **Consolidation Series:** Systematic lessons on follow-up, Christian fellowship, regular prayer, abiding in God's Word, and overcoming challenges as a new believer.
- **Evangelism Modules:** Practical training on sharing the Gospel with confidence.
- **Envisioning Modules:** Equipping believers for kingdom leadership and cell multiplication.
- **Interactive Checklist:** Track your completed lessons and devotional reflections as you grow!`;
    }

    // 5. Cell Groups
    if (lower.includes('cell') || lower.includes('group') || lower.includes('small group') || lower.includes('fellowship') || lower.includes('ministry')) {
      return `**Cell Groups & Ministries at SKCCI:**

At SKCCI, we believe in *"Your Church, Your Family"*. Small groups provide a warm environment to grow in God's Word, build authentic friendships, and pray together:

- 👨 **Men of Honor / Men's Cell:** Discipleship for men and fathers.
- 👩 **Women of Grace / Women's Cell:** Encouragement and Bible study for women and mothers.
- ⚡ **K-Youth Fellowship:** Dynamic ministry for high school, college youth, and young adults.
- 👨‍👩‍👧‍👦 **Couples & Family Life:** Strengthening Christian families.

You can explore the **Grow > Cell Group** tab on our website or let me know your area so we can connect you with a leader!`;
    }

    // 6. The Gospel & Devotionals
    if (lower.includes('gospel') || lower.includes('devotional') || lower.includes('salvation') || lower.includes('jesus') || lower.includes('100 day') || lower.includes('365') || lower.includes('saved')) {
      return `**The Gospel of Grace & Devotional Resources:**

✨ **The 4 Spiritual Truths:**
1. **God Loves You:** He has a wonderful, purpose-filled plan for your life (John 3:16).
2. **Sin Separates Us:** We cannot attain righteousness on our own (Romans 3:23).
3. **Jesus is the Bridge:** Christ died for our sins and rose victoriously (Romans 5:8).
4. **Receive Him by Faith:** By accepting Jesus as your personal Lord and Savior (John 1:12).

📖 **Daily Reading Guides on our Platform:**
- **"My First 100 Days with JESUS":** Guided daily readings in the New Testament.
- **"365-Day Bible Reading Guide":** Read through the entire Scripture in one year (found under Grow).`;
    }

    // 7. Prayer Requests & Giving
    if (lower.includes('prayer') || lower.includes('pray') || lower.includes('request') || lower.includes('give') || lower.includes('tithe') || lower.includes('offering') || lower.includes('donate')) {
      return `**Prayer Requests & Giving:**

🙏 **Submit a Prayer Request:**
Our pastoral team and intercessors regularly intercede for your healing, family, spiritual needs, and breakthrough. Feel free to type your prayer request here or share it on the **Prayer Hub** tab!

💝 **Tithes & Offerings (Giving):**
- 📱 **GCash:** 0966-838-8924 / 0917-800-4740 (SKCCI Ministry)
- 🏦 **Bank Transfers:** BDO & BPI details are listed on our **Giving** page.
- 🏛️ **In-Person:** Offering envelopes during Sunday service.

Thank you for your generous partnership in the gospel!`;
    }

    // 8. Location & Streaming
    if (lower.includes('location') || lower.includes('where') || lower.includes('address') || lower.includes('stream') || lower.includes('online') || lower.includes('facebook') || lower.includes('directions') || lower.includes('map') || lower.includes('watch')) {
      return `**Church Location & Online Streaming:**

📍 **Sanctuary Address:**
- **Physical Location:** 2nd Floor, 158 Mañalac Avenue, Bagong Tanyag, Taguig City, Philippines
- **Landmark:** Along Mañalac Ave near Tanyag. Full Google Maps navigation is available on our **Contact** tab.

🎥 **Live Online Streaming / Service:**
Can't make it in person? Join our live Sunday service broadcast every Sunday morning @ 9:30 AM PST:
🔗 **Watch Online Service:** https://www.facebook.com/share/g/1BpFgffo67/
*(Official Page: https://www.facebook.com/SaviorKingCC)*

We would love to have you join us!`;
    }

    return `**Welcome!** I am **Hannah**, your virtual church usher at SKCCI.

I am here to assist you with:
1. ⛪ **Plan My Visit** (Sunday Service @ 9:30 AM)
2. 📅 **Events Page & RSVP Walkthrough**
3. 📖 **Sermon Outlines** (Grow > Leader Tools)
4. 📚 **Consolidation Manuals** (Grow > Manuals)
5. 👥 **Cell Groups & Ministries**
6. ✨ **The Gospel & Devotionals**
7. 🙏 **Prayer Requests & Giving**
8. 📍 **Church Location & Streaming**

How may I assist you today?`;
  }
}

// Fallback Prayer Guide Generator adhering to strict theological & formatting guidelines
function getFallbackPrayer(topic: string, day: string, isTagalog: boolean): string {
  const lower = topic.toLowerCase();
  
  if (isTagalog) {
    if (lower.includes('leadership') || lower.includes('pastor') || lower.includes('pastoral')) {
      return `Aming AMANG nasa langit, buong puso naming ipinapanalangin ang aming mga pastor at pinuno ng iglesya, na puspusin Mo sila ng Iyong banal na karunungan, kalakasan, at proteksyon sa bawat hakbang. Gabayan Mo ang kanilang mga puso upang patuloy silang manguna nang may katapatan at pag-ibig sa Iyong kawan, sa pangalan ni HESUS, Amen.`;
    }
    if (lower.includes('unity') || lower.includes('doctrine') || lower.includes('integrity')) {
      return `Aming AMANG nasa langit, panatilihin Mo po ang banal na pagkakaisa at katatagan sa aming buong iglesya ayon sa katotohanan ng Iyong Salita. Ilayo Mo kami sa anumang hidwaan at palakasin ang aming pagsunod sa Iyo nang may buong katapatan, sa pangalan ni HESUS, Amen.`;
    }
    if (lower.includes('marriage') || lower.includes('family') || lower.includes('youth')) {
      return `Aming AMANG nasa langit, ibinubuhos namin sa Iyo ang aming mga pamilya, mga mag-asawa, at mga kabataan upang mapuno sila ng Iyong pag-ibig, pagkakasundo, at banal na direksyon. Paghilumin Mo ang bawat tahanan at gabayan ang aming kabataan upang mamuhay nang may takot at sigasig para sa Iyong kaharian, sa pangalan ni HESUS, Amen.`;
    }
    if (lower.includes('healing') || lower.includes('sick') || lower.includes('miracle')) {
      return `Aming AMANG nasa langit, idinadalangin namin ang Iyong mahimalang kagalingan, kapayapaan, at kalakasan sa bawat kapatid na dumaranas ng karamdaman o kahinaan ng katawan. Mahawakan nawa sila ng Iyong kapangyarihan at mapuspos ng Iyong banal na kaginhawahan, sa pangalan ni HESUS, Amen.`;
    }
    if (lower.includes('financial') || lower.includes('job') || lower.includes('provision')) {
      return `Aming AMANG nasa langit, itinataas namin ang bawat pangangailangan sa hanapbuhay, pananalapi, at karunungan sa mabuting pamamahala ng Iyong mga pagpapala. Buksan Mo ang mga bintana ng langit para sa masaganang paglalaan upang kami ay maging pagpapala sa marami, sa pangalan ni HESUS, Amen.`;
    }
    if (lower.includes('outreach') || lower.includes('evangelism') || lower.includes('community')) {
      return `Aming AMANG nasa langit, buksan Mo po ang mga puso ng aming komunidad upang marinig at tanggapin ang dakilang pagliligtas ng Ebanghelyo ni Cristo. Gamitin Mo ang bawat mananampalataya bilang tapat na liwanag at tagapaghatid ng Iyong biyaya sa aming kapwa, sa pangalan ni HESUS, Amen.`;
    }
    if (lower.includes('sunday') || lower.includes('worship') || lower.includes('preaching')) {
      return `Aming AMANG nasa langit, basbasan at pahiran Mo po ang aming pagtitipon sa pagsamba, ang pagpapahayag ng Iyong Salita, at ang bawat pusong lalapit sa Iyo. Mapuspos nawa ang aming santuwaryo ng Iyong presensya at mabago ang aming buhay, sa pangalan ni HESUS, Amen.`;
    }
    return `Aming AMANG nasa langit, buong pagpapakumbaba naming itinataas sa Iyong harapan ang panalanging ito para sa ${topic}. Puspusin Mo kami ng Iyong biyaya, karunungan, at banal na kapayapaan habang nagtitiwala kami sa Iyong dakilang kapangyarihan, sa pangalan ni HESUS, Amen.`;
  } else {
    if (lower.includes('leadership') || lower.includes('pastor') || lower.includes('pastoral')) {
      return `Our FATHER in Heaven, we lift up our church leaders and pastors, asking that You endow them with divine wisdom, spiritual protection, and renewed strength each day. May Your Holy Spirit guide their steps as they shepherd Your flock with steadfast love and godly integrity, in JESUS' Name, Amen.`;
    }
    if (lower.includes('unity') || lower.includes('doctrine') || lower.includes('integrity')) {
      return `Our FATHER in Heaven, knit our hearts together in genuine love, pure doctrine, and unwavering unity across the entire body of Christ. Guard our fellowship against division and anchor us deeply in the truth of Your eternal Word, in JESUS' Name, Amen.`;
    }
    if (lower.includes('marriage') || lower.includes('family') || lower.includes('youth')) {
      return `Our FATHER in Heaven, we place our marriages, homes, and next-generation youth into Your loving hands for restoration, peace, and spiritual growth. Protect our families from worldly traps and raise our young people to walk boldly in Your truth, in JESUS' Name, Amen.`;
    }
    if (lower.includes('healing') || lower.includes('sick') || lower.includes('miracle')) {
      return `Our FATHER in Heaven, we pray for Your supernatural healing touch upon every sick and hurting brother and sister today. Release Your comfort, restore strength to every weakened body, and let Your miraculous peace reign in their hearts, in JESUS' Name, Amen.`;
    }
    if (lower.includes('financial') || lower.includes('job') || lower.includes('provision')) {
      return `Our FATHER in Heaven, You are our faithful Jehovah Jireh who supplies all our needs according to Your riches in glory. Open doors of fruitful employment, break cycles of lack, and grant us wise stewardship to bless Your kingdom abundantly, in JESUS' Name, Amen.`;
    }
    if (lower.includes('outreach') || lower.includes('evangelism') || lower.includes('community')) {
      return `Our FATHER in Heaven, ignite our hearts with compassionate boldness to share the good news of the Gospel with our neighbors and local communities. Prepare receptive hearts to receive Christ and empower our church to be a radiant beacon of hope, in JESUS' Name, Amen.`;
    }
    if (lower.includes('sunday') || lower.includes('worship') || lower.includes('preaching')) {
      return `Our FATHER in Heaven, we ask for a mighty outpouring of Your Holy Spirit upon our Sunday worship services, ministry teams, and the preaching of Your Word. Draw every attendee into heartfelt repentance and life-changing encounter with Your grace, in JESUS' Name, Amen.`;
    }
    return `Our FATHER in Heaven, we humbly bring this prayer before Your throne regarding ${topic}. Pour out Your grace, strengthen our faith, and let Your sovereign will be accomplished in our lives, in JESUS' Name, Amen.`;
  }
}

async function startServer() {
  const app = express();
  const PORT = 3000;

  // Canonical Domain Redirect: www.skcci.org -> skcci.org
  app.use((req, res, next) => {
    if (req.headers.host === "www.skcci.org") {
      return res.redirect(301, `https://skcci.org${req.originalUrl}`);
    }
    next();
  });

  app.use(express.json({ limit: "1mb" }));

  app.post("/api/chat", async (req, res) => {
    const { message = "", history = [], language = "tl" } = req.body || {};
    const safeLang: 'tl' | 'en' = language === 'en' ? 'en' : 'tl';
    
    try {
      const genAI = getGenAI();
      if (!genAI) {
        // Fallback gracefully without throwing 500
        const fallbackReply = getChurchFallbackResponse(message, safeLang);
        return res.json({ reply: fallbackReply });
      }

      const systemInstruction = safeLang === 'tl' 
        ? `Ikaw si Hannah, ang magiliw, maasahan, at bukas-palad na AI church usher/assistant ng SAVIOR-KING Commission Church International (SKCCI), na may motong 'Your Church, Your Family'. Maging magalang, palakaibigan, magiliw, at palaging gumamit ng 'po' at 'opo'. Laging ipakilala ang sarili bilang isang AI assistant sa unang pakikipag-usap. Kung ang user ay humihingi ng malalim na pastoral counseling o nasa gitna ng personal crisis, ipaalala sa kanila nang magalang na ikaw ay isang AI at pinapayuhan silang sumangguni sa ating pastoral staff para sa tamang paggabay.

MAHALAGANG PANUNTUNAN SA PAGSAGOT AT FORMATTING:
1. Maging maikli, masigla, at direktang sumagot (concise and conversational). Hatiin ang iyong tugon sa 2 hanggang 3 maikli at malinaw na pangungusap o mga malilinis na bullet points.
2. LAGING TAPUSIN ANG IYONG MGA PANGUNGUSAP AT KAISIPAN NANG BUO AT KUMPLETO. Huwag kailanman mag-iwan ng putol na salita o bitin na pangungusap.
3. Kapag nagre-refer sa mga resources o seksyon ng website (halimbawa: "maaari niyo pong bisitahin ang..."), LAGING banggitin ang buo at kumpletong pangalan ng pahina o seksyon (hal. "maaari niyo pong bisitahin ang Grow > Cell Group page", "Events page", "Leader Tools", "Manuals", "Prayer Hub", o "Giving page").

Gabay sa impormasyon ng SKCCI:
1) Planuhin ang Pagbisita: Sunday service schedule tuwing Linggo @ 9:30 AM (2nd Floor, 158 Mañalac Ave, Bagong Tanyag, Taguig City), Children's Church / Kids ministry, paradahan, at mainit na salubong.
2) Mga Kaganapan at Pag-RSVP: I-walkthrough ang user sa Events tab sa navigation bar at turuan sila kung paano mag-RSVP sa pamamagitan ng pag-sign in gamit ang Google account at pag-click ng 'RSVP / Attending' button.
3) Balangkas ng Sermon: I-direct ang user sa 'Leader Tools' page sa ilalim ng 'Grow' menu kung saan makikita ang sermon series outlines, Big Idea, scripture references, Roman numeral points, worship songs, at cell discussion aids.
4) Consolidation Manuals: Gabayan ang user sa 'Manuals' page sa ilalim ng 'Grow' menu kung saan naroon ang consolidation discipleship lessons para sa follow-up at pag-aalaga ng bagong mananampalataya, pati Evangelism at Envisioning.
5) Cell Groups / Small Groups: Men's, Women's, K-Youth, Family cells para sa paglago sa pananampalataya (nasa ilalim ng Grow > Cell Group).
6) Ang Ebanghelyo at Debosyon: Ang 4 Spiritual Truths, 'My First 100 Days with JESUS' at '365-Day Bible Reading Guide'.
7) Hiling sa Panalangin at Pagkakaloob: panalangin ng pastoral team sa Prayer Hub at ligtas na pagkakaloob via GCash 0966-838-8924 / 0917-800-4740 o Giving page.
8) Lokasyon at Online Service: 2nd Floor, 158 Mañalac Ave, Bagong Tanyag, Taguig City. Kapag tinanong kung saan o paano mapapanood ang online service / livestream / Sunday service online, laging ibigay ang link na: https://www.facebook.com/share/g/1BpFgffo67/ .`
        : `You are Hannah, the warm, hospitable, and helpful AI virtual church usher for SAVIOR-KING Commission Church International (SKCCI) with the motto 'Your Church, Your Family'. Be kind, welcoming, and conversational. Always politely introduce yourself as an AI assistant on first contact. If a user asks for critical pastoral counseling or personal crisis intervention, gently remind them that you are an AI and advise them to consult with the human pastoral staff for appropriate guidance and care.

CRITICAL RESPONSE & FORMATTING DIRECTIVES:
1. Keep your responses concise, conversational, and split into 2-3 short, clear sentences or neat bullet points before attaching suggested action buttons or quick links.
2. ALWAYS FINISH YOUR THOUGHTS AND SENTENCES COMPLETELY. Never leave a sentence dangling, truncated, or trailing off unfinished.
3. Whenever referring to website resources or pages (e.g., "you may visit the..."), ALWAYS complete the sentence with the full name of the page/menu (e.g., "you may visit the Grow > Cell Group page", "Events page", "Leader Tools", "Manuals Reader", "Prayer Hub", or "Giving page").

SKCCI Knowledge Base:
1) Plan My Visit: Sunday services @ 9:30 AM (2nd Floor, 158 Mañalac Ave, Bagong Tanyag, Taguig City), Children's Church / Kids ministry, parking, warm usher welcome.
2) Events & RSVP: Provide a clear walkthrough to the Events page on the navigation bar, and instruct the user to sign in with their Google account and click the 'RSVP / Attending' button on any event card.
3) Outline of the Sermon: Direct the user to the 'Leader Tools' page found under the 'Grow' navigation dropdown, explaining the structured sermon series outlines, Big Idea, scriptures, Roman numeral breakdowns, and worship sets.
4) Consolidation Manuals: Guide the user to the 'Manuals' page under the 'Grow' dropdown, explaining the consolidation discipleship series for nurturing new believers, plus Evangelism and Envisioning modules.
5) Cell Groups & Ministries: Men's, Women's, K-Youth, Couples/Family small groups under the Grow > Cell Group tab.
6) The Gospel & Devotionals: 4 Spiritual Truths of salvation, 'My First 100 Days with JESUS' reading guide and '365-Day Bible Reading Guide'.
7) Prayer Requests & Giving: Pastoral prayer support via Prayer Hub and safe giving via GCash 0966-838-8924 / 0917-800-4740 or Bank Transfer on the Giving page.
8) Church Location & Streaming: 2nd Flr, 158 Mañalac Ave, Bagong Tanyag, Taguig City. Whenever asked to watch the online service / livestream / Sunday service online, always provide this streaming link: https://www.facebook.com/share/g/1BpFgffo67/ .`;

      const formattedContents = [
        ...(Array.isArray(history) ? history.map((item: any) => ({
          role: item.role === 'model' ? 'model' : 'user',
          parts: Array.isArray(item.parts) ? item.parts : [{ text: item.content || item.text || '' }]
        })) : []),
        { role: 'user', parts: [{ text: message }] }
      ];

      // Try standard valid text models with low thinking level for snappier responses and graceful cascading
      const modelsToTry = ['gemini-3.7-flash', 'gemini-3.1-flash-lite', 'gemini-flash-latest'];
      let lastError = null;

      // Wrap generation in a safety timeout so Hannah never hangs indefinitely
      const generateWithTimeout = async (model: string, timeoutMs: number = 7000) => {
        return Promise.race([
          genAI.models.generateContent({
            model,
            contents: formattedContents,
            config: {
              systemInstruction: systemInstruction,
              temperature: 0.7,
              maxOutputTokens: 2048,
              thinkingConfig: {
                thinkingLevel: ThinkingLevel.LOW,
              },
            }
          }),
          new Promise<never>((_, reject) =>
            setTimeout(() => reject(new Error(`Model ${model} request timed out after ${timeoutMs}ms`)), timeoutMs)
          )
        ]);
      };

      for (const model of modelsToTry) {
        try {
          const response = await generateWithTimeout(model, 6500);

          if (response && response.text) {
            return res.json({ reply: response.text });
          }
        } catch (err: any) {
          lastError = err;
          // Non-blocking fallback to next candidate model
        }
      }

      console.warn("[Hannah AI] Falling back to instant church knowledge base:", lastError?.message || lastError);
      // Seamlessly provide accurate church knowledge fallback response rather than generic error
      const fallbackReply = getChurchFallbackResponse(message, safeLang);
      return res.json({ reply: fallbackReply });

    } catch (error) {
      console.error("AI Chat Handler Error:", error);
      const fallbackReply = getChurchFallbackResponse(message, safeLang);
      return res.json({ reply: fallbackReply });
    }
  });

  // Prayer Guide AI Generator Endpoint
  app.post("/api/generate-prayer", async (req, res) => {
    const { topic, day, language = 'en', variation = 1 } = req.body || {};
    const safeTopic = (topic || 'Church and Community Intercession').trim();
    const safeDay = (day || 'Today').trim();
    const isTagalog = language === 'tl';

    if (!process.env.GEMINI_API_KEY) {
      const fallback = getFallbackPrayer(safeTopic, safeDay, isTagalog);
      return res.json({ prayer: fallback });
    }

    try {
      const genAI = getGenAI();
      if (!genAI) {
        const fallback = getFallbackPrayer(safeTopic, safeDay, isTagalog);
        return res.json({ prayer: fallback });
      }

      const systemInstruction = isTagalog
        ? `Ikaw ay isang mapanalangining pastor at prayer leader sa SAVIOR-KING Commission Church International (SKCCI).
Sumulat ng isang mainit, taos-puso, at espiritwal na gabay sa panalangin (sample prayer) na may 2 hanggang 3 maikli at makapangyarihang pangungusap tungkol sa ibinigay na paksa sa panalangin.

MGA MAHIGPIT NA PANUNTUNAN SA FORMATTING:
1. DAPAT MAGSIMULA NANG EKSAPTO SA: "Aming AMANG nasa langit,"
2. DAPAT MAGTAPOS NANG EKSAPTO SA: "...sa pangalan ni HESUS, Amen." (o "sa pangalan ni HESUS, Amen.")
3. Ang haba ay dapat 2 hanggang 3 pangungusap lamang (kasama ang simula at pagtatapos).
4. Tono: Mapitagan, nakabatay sa Salita ng Diyos, nakapagpapatibay, at diretso sa puso.
5. Huwag maglagay ng markdown formatting tulad ng bold (**), quotation marks sa paligid, bullet points, o paliwanag. Ibigay LAMANG ang mismong panalangin.`
        : `You are a prayerful pastoral leader and prayer director at SAVIOR-KING Commission Church International (SKCCI).
Write a warm, heartfelt, faith-filled sample prayer guide consisting of 2 to 3 concise, powerful sentences on the specified prayer focus topic.

STRICT FORMATTING RULES:
1. MUST STRICTLY BEGIN WITH EXACTLY: "Our FATHER in Heaven,"
2. MUST STRICTLY CONCLUDE WITH EXACTLY: "...in JESUS' Name, Amen." (or "...in JESUS' Name, Amen.")
3. Length: Exactly 2 to 3 sentences total.
4. Tone: Reverent, scripture-aligned, uplifting, faith-affirming, and direct.
5. Do NOT include markdown bold markers (**), quotation marks surrounding the text, bullet points, or commentary. Output ONLY the raw prayer text itself.`;

      const prompt = isTagalog
        ? `Paksa sa Panalangin para sa ${safeDay}: "${safeTopic}". Lumikha ng panibagong gabay sa panalangin (variation #${variation}).`
        : `Prayer Focus Item for ${safeDay}: "${safeTopic}". Generate an uplifting sample prayer guide (variation #${variation}).`;

      const modelsToTry = ['gemini-3.7-flash', 'gemini-3.1-flash-lite', 'gemini-flash-latest'];
      let lastError = null;

      for (const model of modelsToTry) {
        try {
          const response = await Promise.race([
            genAI.models.generateContent({
              model,
              contents: [{ role: 'user', parts: [{ text: prompt }] }],
              config: {
                systemInstruction,
                temperature: 0.85,
                maxOutputTokens: 300,
                thinkingConfig: {
                  thinkingLevel: ThinkingLevel.LOW,
                },
              }
            }),
            new Promise<never>((_, reject) =>
              setTimeout(() => reject(new Error(`Timeout on model ${model}`)), 6000)
            )
          ]);

          if (response && response.text) {
            let prayerText = response.text.trim();
            // Ensure strict prefix/suffix if slightly altered by model
            if (isTagalog) {
              if (!prayerText.startsWith("Aming AMANG nasa langit,")) {
                prayerText = "Aming AMANG nasa langit, " + prayerText.replace(/^(Aming Ama|Panginoon|Dakilang Diyos)[^,]*,?\s*/i, '');
              }
              if (!prayerText.endsWith("sa pangalan ni HESUS, Amen.")) {
                prayerText = prayerText.replace(/[.\s]*in Jesus'? name.*$/i, '').replace(/[.\s]*sa pangalan.*$/i, '');
                prayerText = prayerText.trim().replace(/\.*$/, '') + ", sa pangalan ni HESUS, Amen.";
              }
            } else {
              if (!prayerText.startsWith("Our FATHER in Heaven,")) {
                prayerText = "Our FATHER in Heaven, " + prayerText.replace(/^(Father|Lord God|Dear Heavenly Father|Heavenly Father)[^,]*,?\s*/i, '');
              }
              if (!prayerText.endsWith("in JESUS' Name, Amen.")) {
                prayerText = prayerText.replace(/[.\s]*in Jesus'? name.*$/i, '');
                prayerText = prayerText.trim().replace(/\.*$/, '') + ", in JESUS' Name, Amen.";
              }
            }
            return res.json({ prayer: prayerText });
          }
        } catch (err: any) {
          lastError = err;
        }
      }

      console.warn("[Prayer AI] Using fallback prayer for:", safeTopic, lastError?.message || '');
      const fallback = getFallbackPrayer(safeTopic, safeDay, isTagalog);
      return res.json({ prayer: fallback });
    } catch (err) {
      console.error("Prayer generation error:", err);
      const fallback = getFallbackPrayer(safeTopic, safeDay, isTagalog);
      return res.json({ prayer: fallback });
    }
  });

  // Vite middleware for development
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
