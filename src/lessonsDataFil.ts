import type { LessonData } from './lessonsData';

/**
 * Official Tagalog translations for all 29 SKCCI Discipleship Manual lessons
 * (7 Evangelism, 14 Consolidation, 8 Envisioning), mapped directly from the
 * church's uploaded Tagalog manual translation.
 *
 * Served instantaneously on every device (viewing, printing, and PDF export),
 * and automatically synced to Firestore (`manual_translations_fil/{lessonId}`)
 * when an authorized admin accesses the Manuals section.
 */
export const TAGALOG_LESSONS_LIST: LessonData[] = [
  {
    "id": "lesson-1",
    "title": "Aralin 1: Ang Mabuting Balita ng Kaligtasan Ayon kay HESUS",
    "category": "Evangelism",
    "readingTime": "7 minutong pagbasa",
    "scriptureFocus": {
      "reference": "Juan 3:16 (NIV)",
      "text": "Sapagkat gayon na lamang ang pag-ibig ng DIYOS sa sanlibutan kaya't ibinigay niya ang kanyang bugtong na Anak, upang ang sinumang sumampalataya sa kanya ay hindi mapahamak, kundi magkaroon ng buhay na walang hanggan."
    },
    "objectives": [
      "Unawain ang lalim ng pagmamahal ng DIYOS para sa sangkatauhan.",
      "Kilalanin ang pangangailangan ni HESUKRISTO para sa kaligtasan.",
      "Alamin ang ibig sabihin ng maniwala at tumanggap ng buhay na walang hanggan."
    ],
    "teachingSections": [
      {
        "id": "teaching-1",
        "number": 1,
        "title": "Ang Katotohanan ng Ating Paghihiwalay",
        "paragraphs": [
          "Bago natin tunay na mapahalagahan ang mabuting balita ng kaligtasan, kailangan muna nating maunawaan ang katotohanan ng ating kalagayan. Itinuturo ng Bibliya na ang bawat tao ay nagkasala at hindi nakaabot sa maluwalhating pamantayan ng DIYOS (Mga Taga-Roma 3:23). Ang kasalanang ito ay lumilikha ng malalim na paghihiwalay sa pagitan natin at ng isang ganap na banal na DIYOS.",
          "Ang ating mga pagtatangka na tulayin ang kakulangang ito sa pamamagitan ng mabubuting gawa, moralidad, o relihiyon ay palaging mabibigo. Kailangan natin ng isang plano ng pagsagip na hindi natin kayang isagawa nang mag-isa."
        ]
      },
      {
        "id": "teaching-2",
        "number": 2,
        "title": "Ang Pangwakas na Paglalaan ng DIYOS",
        "paragraphs": [
          "Sa harap ng ating kawalan ng kakayahang iligtas ang ating mga sarili, kumilos ang DIYOS dahil sa napakalaking pagmamahal. Ang pagbibigay ng Kanyang 'nag-iisang Anak' ay nagpapakita ng pinakamataas na pagpapahalagang ibinibigay ng DIYOS sa atin. Si HESUS ay pumasok sa ating realidad, nagkatawang-tao, upang mamuhay sa perpektong buhay na hindi natin kayang mabuhay.",
          "Sa krus, inako ni HESUS ang parusa ng ating mga kasalanan. Ang 'kabayaran ng kasalanan ay kamatayan' (Roma 6:23), at binayaran nang buo ni JESUS ang kabayarang iyon."
        ]
      },
      {
        "id": "teaching-3",
        "number": 3,
        "title": "Ang Kahilingan ng Paniniwala",
        "paragraphs": [
          "Bagama't kumpleto na ang paglalaan para sa kaligtasan, hindi ito awtomatikong naaangkop sa lahat. Malinaw na sinasabi sa talata na 'sinumang naniniwala sa kanya.' Ang paniniwala sa Bibliya ay higit pa sa pagsang-ayon lamang sa intelektwal na aspeto; ito ay aktibong pagtitiwala at pagsuko.",
          "Ang ibig sabihin ng paniniwala ay ialay ang buong bigat ng iyong buhay kay HESUKRISTO bilang iyong TAGAPAGLIGTAS at PANGINOON. Ito ay pagtalikod sa isang buhay na may pansariling paggabay at pagbaling tungo sa isang buhay na ginagabayan ng DIYOS."
        ]
      }
    ],
    "reflectionQuestions": [
      "Ano ang naiisip mo kapag naririnig mo ang salitang 'kaligtasan'?",
      "Paano binabago ng pag-unawa sa problema ng kasalanan ang iyong pananaw sa sakripisyo ni HESUS?",
      "Ano ang kahulugan para sa iyo ng 'manampalataya sa Kanya'?",
      "May mga aspeto ba sa iyong buhay kung saan sinusubukan mo pa ring \"makamit\" ang pag-ibig ng DIYOS sa halip na tanggapin ito bilang isang regalo?"
    ],
    "prayer": "PANGINOONG HESUS, salamat po sa pagmamahal Mo sa akin na sapat upang mamatay sa krus para sa aking mga kasalanan. Kinikilala ko na ako ay isang makasalanan na nangangailangan ng isang TAGAPAGLIGTAS. Nauunawaan ko na hindi ko kayang magtrabaho para makarating sa langit. Tinatalikuran ko ang aking lumang buhay at inilalagay ang aking buong pananampalataya sa Iyo. Patawarin Mo po ako, linisin Mo ako, at gabayan Mo ako mula sa araw na ito bilang aking PANGINOON at TAGAPAGLIGTAS. Amen.",
    "challenge": "Ibahagi ang katotohanan ng Juan 3:16 sa isang tao ngayong linggo, o isulat ang sarili mong patotoo tungkol sa kaligtasan."
  },
  {
    "id": "lesson-2",
    "title": "Aralin 2: Ang Mabuting Balita ng Kaligtasan Ayon sa Apostol Pablo",
    "category": "Evangelism",
    "readingTime": "8 minutong pagbasa",
    "scriptureFocus": {
      "reference": "Mga Taga-Roma 3:23 at 6:23 (NIV)",
      "text": "Sapagkat ang lahat ay nagkasala at hindi nakaabot sa kaluwalhatian ng DIYOS... Sapagkat ang kabayaran ng kasalanan ay kamatayan; ngunit ang kaloob ng DIYOS ay buhay na walang hanggan kay CRISTO JESUS na ating PANGINOON."
    },
    "objectives": [
      "Upang maunawaan ang paliwanag ni Apostol Pablo tungkol sa Mabuting Balita.",
      "Upang maunawaan na bagama't ang lahat ng sangkatauhan ay nagkasala at nararapat sa kamatayan, iniaalok ng DIYOS ang libreng kaloob na buhay na walang hanggan sa pamamagitan ng pagsisisi at pananampalataya kay CRISTO JESUS."
    ],
    "teachingSections": [
      {
        "id": "teaching-2-intro",
        "number": 1,
        "title": "Panimula",
        "paragraphs": [
          "Upang tunay na pahalagahan ang kaloob ng DIYOS na kaligtasan, kailangan muna nating maunawaan kung ano ang hitsura ng buhay nang hiwalay sa Kanya.",
          "Inilalahad ni Apostol Pablo ang katotohanan ng ating kalagayan at ang banal na solusyon na nagbabalik sa atin sa DIYOS.",
          "Bagama't may karapatan ang DIYOS na hatulan tayo, makapangyarihang gumagawa rin Siya para sa ating kaligtasan at mapagmahal na nananawagan para sa ating wastong tugon ng pagsisisi at pananampalataya."
        ]
      },
      {
        "id": "teaching-2-1",
        "number": 2,
        "title": "Lahat ay Nagkasala at Hindi Nakaabot sa Kaluwalhatian ng DIYOS",
        "paragraphs": [
          "\"Sapagkat ang lahat ay nagkasala at hindi nakaabot sa kaluwalhatian ng DIYOS.\" - Mga Taga-Roma 3:23 (MBB)",
          "Walang sinumang tao - maliban kay KRISTO mismo - ang makapag-aangkin na siya ay walang kasalanan. Lahat tayo ay nabigong maabot ang perpektong pamantayan ng kabanalan ng DIYOS. Ang \"pagkukulang\" ay nangangahulugan na hindi natin naaabot ang marka ng Kanyang kaluwalhatian at katuwiran.",
          "Ang katotohanang ito ay nagpapakumbaba sa atin sa harap ng DIYOS at nagpapaalala sa atin na ang kaligtasan ay hindi makakamit sa pamamagitan ng mabubuting gawa, pagsisikap sa relihiyon, o moral na pagganap. Tayong lahat ay pantay-pantay na nangangailangan ng biyaya."
        ]
      },
      {
        "id": "teaching-2-2",
        "number": 3,
        "title": "Ang Kabayaran ng Kasalanan ay Kamatayan",
        "paragraphs": [
          "\"Sapagkat ang kabayaran ng kasalanan ay kamatayan...\" - Mga Taga-Roma 6:23 (MBB)",
          "Dahil ang DIYOS ay makatarungan, ang kasalanan ay humihingi ng kabayaran. Ang halaga ng kasalanan ay kamatayan - ang pagkawalay sa DIYOS.",
          "Inilarawan ni Pablo ang tatlong uri ng kamatayan na bunga ng kasalanan: 1. Pisikal na kamatayan - ang paghihiwalay ng kaluluwa mula sa katawan. 2. Espirituwal na kamatayan - ang paghihiwalay mula sa DIYOS sa buhay na ito dahil sa kasalanan. 3. Walang hanggang kamatayan - walang hanggang paghihiwalay mula sa DIYOS para sa mga namatay nang walang KRISTO.",
          "Ang kasalanan ay laging humahantong sa paghihiwalay, ngunit ang Mabuting Balita ay hindi tayo iniiwan ng DIYOS doon."
        ]
      },
      {
        "id": "teaching-2-3",
        "number": 4,
        "title": "Ang Libreng Kaloob ng DIYOS ay Buhay na Walang Hanggan",
        "paragraphs": [
          "\"...ngunit ang kaloob ng DIYOS ay buhay na walang hanggan kay CRISTO JESUS na ating PANGINOON.\" - Mga Taga-Roma 6:23 (MBB)",
          "Sa Kanyang pagmamahal at awa, nagpasya ang DIYOS na huwag tayong iwan sa ating pagkakasala. Nag-aalok Siya ng buhay na walang hanggan - isang regalo, hindi isang gantimpala - sa lahat ng nagtitiwala sa Kanyang Anak.",
          "Ang buhay na walang hanggan ay nangangahulugan ng pamumuhay kasama ang DIYOS magpakailanman, ngunit ito rin ay isang kasalukuyang realidad para sa bawat naniniwala. Sinabi ni HESUS, \"Ako'y naparito upang sila'y magkaroon ng buhay, at magkaroon nito nang lubos.\" (Juan 10:10 NIV)",
          "Ang buhay na ito ay sagana, walang hanggan, at ligtas sa pamamagitan lamang ng biyaya ng DIYOS."
        ]
      },
      {
        "id": "teaching-2-4",
        "number": 5,
        "title": "Ang Pagtanggap ng Buhay na Walang Hanggan ay Sa Pamamagitan ng Pagsisisi at Pananampalataya",
        "paragraphs": [
          "\"...kay CRISTO JESUS na ating PANGINOON.\" - Mga Taga-Roma 6:23 (MBB)",
          "Ang pariralang \"kay CRISTO JESUS\" ay nagpapakita kung paano natin makakamit ang buhay na walang hanggan. Ito ay dumarating lamang sa pamamagitan ng isang personal na relasyon kay JESUS, na minarkahan ng pagsisisi at pananampalataya.",
          "Pagsisisi - ang pagsisisi ay nangangahulugang pagbabago ng ating pag-iisip tungkol sa kasalanan at pagbabalik-loob sa DIYOS. Kinikilala natin na tayo ay nagrebelde laban sa Kanya, inaamin ang ating mga kasalanan, at hinihingi ang Kanyang kapatawaran. Ang pagsisisi ay hindi lamang pagsisisi; ito ay pagsuko - isang pagtalikod sa kasalanan patungo sa DIYOS.",
          "Pananampalataya - ang pagkakaroon ng pananampalataya kay CRISTO ay nangangahulugang lubos na magtiwala sa Kanya bilang ating PANGINOON at TAGAPAGLIGTAS. Ito ay ang maniwala na Siya ay namatay para sa ating mga kasalanan, nabuhay na mag-uli mula sa mga patay, at ngayon ay naghahari bilang ating Manunubos. Ang pananampalataya ay kinabibilangan ng paniniwala at pagtitiwala ng ating buhay sa Kanya, lubos na pag-asa sa Kanyang natapos na gawain sa krus."
        ]
      },
      {
        "id": "teaching-2-5",
        "number": 6,
        "title": "Konklusyon",
        "paragraphs": [
          "Ang DIYOS, sa Kanyang dakilang pag-ibig, ay gumagawa ng lahat ng bagay sa pamamagitan ni CRISTO upang tayo ay maibalik sa Kanya. Nais Niyang ibalik ang ating relasyon sa Kanya at bigyan tayo ng Kanyang buhay na walang hanggan.",
          "Ang Mabuting Balitang ito ay nangangailangan ng personal na tugon - hindi ang pagpapaliban, hindi ang pagbalewala, kundi ang maniwala at tumanggap ng buhay na kaloob na malayang iniaalok ng DIYOS."
        ]
      }
    ],
    "reflectionQuestions": [
      "Ano ang itinuturo sa atin ng Roma 3:23 at 6:23 tungkol sa kabigatan ng kasalanan at ang biyaya ng DIYOS?",
      "Paano nakakatulong sa iyo ang pag-unawa sa tatlong uri ng kamatayan upang makita ang kahalagahan ng kaligtasan?",
      "Sa anong mga paraan nagsisimula ang buhay na walang hanggan ngayon, hindi lamang pagkatapos ng kamatayan?",
      "Ano ang hitsura ng tunay na pagsisisi sa iyong pang-araw-araw na paglalakad kasama ni KRISTO?",
      "Paano mo mas maipapahayag ang iyong pananampalataya kay KRISTO ngayong linggo?"
    ],
    "prayer": "PANGINOONG DIYOS, kinikilala ko na ako'y nagkasala at hindi nakaabot sa Iyong kaluwalhatian. Salamat sa pag-aalok Mo sa akin ng buhay na walang hanggan sa pamamagitan ni HESUKRISTO. Nagsisisi ako sa aking mga kasalanan at inilalaan ko ang aking buong tiwala sa Iyo. Tulungan Mo akong mamuhay araw-araw bilang isang taong pinatawad, tinubos, at binuhay kay CRISTO. Amen.",
    "challenge": "Dahil naunawaan ko na ang katotohanan ng kasalanan at ang Mabuting Balita ng kaligtasan sa pamamagitan ni HESUKRISTO, inilalagak ko na ngayon ang aking tiwala sa Kanya at tinatanggap Siya bilang aking personal na PANGINOON at TAGAPAGLIGTAS."
  },
  {
    "id": "lesson-3",
    "title": "Aralin 3: Ang Kahulugan at Kahalagahan ng Pagsisisi",
    "category": "Evangelism",
    "readingTime": "8 minutong pagbasa",
    "scriptureFocus": {
      "reference": "Mateo 4:17 at 1 Juan 1:9 (NIV)",
      "text": "Mula noon ay nagsimulang mangaral si JESUS, na sinasabi, 'Magsisi kayo, sapagkat malapit na ang kaharian ng langit.'... Kung ipahahayag natin ang ating mga kasalanan, siya'y tapat at matuwid na patatawarin tayo sa ating mga kasalanan at lilinisin tayo sa lahat ng kalikuan."
    },
    "objectives": [
      "Upang maunawaan ang pagsisisi bilang isang pagbabago ng isip at puso na naglalayo sa atin mula sa kasalanan patungo sa DIYOS.",
      "Upang matutunan kung paano ibinabalik ng pagsisisi ang ating relasyon sa Kanya at sa iba habang tayo ay nabubuhay sa ilalim ng Kanyang paghahari."
    ],
    "teachingSections": [
      {
        "id": "teaching-3-intro",
        "number": 1,
        "title": "Panimula",
        "paragraphs": [
          "Ang pagsisisi ay isa sa mga pangunahing katotohanan ng pananampalatayang Kristiyano.",
          "Kung ang DIYOS ay hindi mamamahala at maghahari sa Kanyang nilikha, ang pagsisisi ay walang magiging kahulugan o kahalagahan. Ngunit dahil Siya ay Hari, ang pagsisisi ang nagiging una at kinakailangang tugon sa Kanyang biyaya.",
          "Pag-aralan natin ang kahulugan at kahalagahan ng pagsisisi ayon sa turo ng ating PANGINOONG HESUKRISTO."
        ]
      },
      {
        "id": "teaching-3-1",
        "number": 2,
        "title": "Ang Pagsisisi ay Isang Pagbabago ng Isip",
        "paragraphs": [
          "Ang salitang Griyego para sa pagsisisi ay metanoia, na nangangahulugang pagbabago ng isip.",
          "Ang tunay na pagsisisi ay nagsisimula kapag binago ng isang tao ang kanyang isip tungkol sa kasalanan—napagtanto na ito ay nakakasakit sa DIYOS, nakakasira sa sarili, at nakakapinsala sa iba.",
          "Kapag tayo ay nagsisisi, ang ating pag-iisip at mga hangarin ay lumilipat mula sa pagiging makasarili patungo sa pagiging nakasentro sa DIYOS. Nagsisimula nating makita ang kasalanan hindi bilang isang 'pagkakamali,' kundi bilang paghihimagsik laban sa isang banal at mapagmahal na DIYOS. Ang pagbabagong ito ng isip ay nagbubukas ng daan para sa pagbabago."
        ]
      },
      {
        "id": "teaching-3-2",
        "number": 3,
        "title": "Ang Pagtalikod sa Kasalanan ay Bunga ng Pagsisisi",
        "paragraphs": [
          "Ang tunay na pagbabago ng isip ay laging nagreresulta sa pagbabago ng direksyon. Kapag ang isang tao ay tunay na nagsisisi, tinatalikuran nila ang kasalanan at nagsisimulang mamuhay para sa DIYOS.",
          "Ang pagsisisi ay hindi lamang basta pagkalungkot—ito ay pagtalikod sa kasalanan at pagbaling sa DIYOS.",
          "Dahil ang pusong nagsisisi ay umiibig na ngayon sa DIYOS, nawawalan na ito ng pagnanais na magpatuloy sa kasalanan. Sa halip, pinipili nito kung ano ang tama, mabuti, at kalugud-lugod sa DIYOS.",
          "Gaya ng isinulat ni Apostol Pablo, 'Ang kalungkutang mula sa DIYOS ay nagdudulot ng pagsisisi na hahantong sa kaligtasan at hindi nag-iiwan ng pagsisisi.' - 2 Corinto 7:10 (NIV)"
        ]
      },
      {
        "id": "teaching-3-3",
        "number": 4,
        "title": "Ang Paghahari ng DIYOS ang Dahilan ng Pagsisisi",
        "paragraphs": [
          "\"Magsisi kayo, sapagkat malapit na ang kaharian ng langit.\" - Mateo 4:17 (MBB)",
          "Kinakailangan ang pagsisisi dahil malapit na ang Kaharian ng DIYOS. Nang mangaral si HESUS ng pagsisisi, ipinapahayag Niya na ang paghahari ng DIYOS ay nagsimula na sa pamamagitan Niya.",
          "Ang salitang \"malapit\" ay may dalawang kahulugan: 1. Malapit na itong dumating - mararanasan natin ito nang lubusan kapag bumalik na si KRISTO. 2. Ito ay kasalukuyan na ngayon - ang paghahari ng DIYOS ay nagsimula na sa mga puso ng mga nagpapasakop sa Kanya.",
          "Ang pagtanggi sa pagsisisi ay pagtanggi sa pamamahala ng DIYOS. Ngunit ang mga nagsisisi ay masayang tumatanggap ng Kanyang Kaharian at nabubuhay sa ilalim ng Kanyang mapagbiyayang paghahari, ngayon at magpakailanman."
        ]
      },
      {
        "id": "teaching-3-4",
        "number": 5,
        "title": "Ang mga Nagkukumpisal ng Kanilang mga Kasalanan ay Pinapatawad at Nililinis",
        "paragraphs": [
          "\"Kung ipinahahayag natin ang ating mga kasalanan, siya'y tapat at matuwid na magpapatawad sa atin sa ating mga kasalanan, at lilinisin tayo sa lahat ng kalikuan.\" - 1 Juan 1:9 (MBB)",
          "Kasama sa pagsisisi ang pag-amin - hayagang pagkilala sa ating mga kasalanan sa harap ng DIYOS at, kung kinakailangan, sa harap ng iba. Ipinagtatapat natin ang ating mga kasalanan sa DIYOS upang hingin ang Kanyang kapatawaran, at kapag tayo ay nagkasala sa isang tao, hinahanap natin ang pakikipagkasundo sa pamamagitan ng paghingi ng tawad at paghingi rin ng kanilang kapatawaran.",
          "Hindi lamang tayo pinapatawad ng ating tapat at makatarungang DIYOS - nililinis din Niya tayo sa pamamagitan ng dugo ni HESUKRISTO. \"Ang dugo ni JESUS, na kaniyang Anak, ay naglilinis sa atin sa lahat ng kasalanan.\" - 1 Juan 1:7 (NIV)",
          "Ang paglilinis na ito ay ganap at patuloy, na nagpapanumbalik sa atin sa pakikisama sa DIYOS at nagpapanibago sa ating mga puso."
        ]
      },
      {
        "id": "teaching-3-5",
        "number": 6,
        "title": "Konklusyon",
        "paragraphs": [
          "Ang pagsisisi ay ang mabiyayang paraan ng DIYOS ng pagpapanumbalik sa atin—sa Kanya, sa ating tunay na sarili, at sa iba.",
          "Sa pamamagitan ng pagsisisi, ang mga nasirang relasyon ay gumagaling at ang mga buhay ay nababago. Kaya naman ang pagsisisi ay hindi isang pasanin kundi isang kaloob ng biyaya.",
          "Kapag tayo ay nagsisisi, ang DIYOS ay naghahari sa ating mga puso, at ang Kanyang kaharian ay nagsisimulang lumago sa loob natin."
        ]
      }
    ],
    "reflectionQuestions": [
      "Bakit ang kasalanan ay higit pa sa isang pagkakamali kundi isang pagkakasala laban sa DIYOS?",
      "Ano ang ibig sabihin ng pagsisisi na nagsisimula bilang isang 'pagbabago ng isip'?",
      "Paano nakikita ang tunay na pagsisisi sa pang-araw-araw na buhay?",
      "Paano nakakaimpluwensya ang pamamahala ng DIYOS sa iyong puso sa iyong mga desisyon at pakikipag-ugnayan?",
      "Anong aspeto ng iyong buhay ang tinatawag ka ng DIYOS na ibalik sa Kanya ngayon?"
    ],
    "prayer": "PANGINOONG DIYOS, salamat po sa pagpapakita sa akin ng tunay na kahulugan ng pagsisisi. Inaamin ko ang aking mga kasalanan sa harap Mo at hinihiling ko ang Iyong kapatawaran at paglilinis. Tulungan Mo akong tumalikod sa kasalanan at lumakad araw-araw sa pagsunod sa Iyo. Maghari ka sa aking puso, PANGINOON, at baguhin Mo ako. Amen.",
    "challenge": "Ngayong naunawaan ko na ang kahulugan at kahalagahan ng pagsisisi, pinili kong baguhin ang aking pag-iisip at talikuran ang aking mga kasalanan. Isinusuko ko ang aking puso sa Iyo, PANGINOONG HESUS. Linisin Mo ako ng Iyong dugo at buhayin Mo ako para sa Iyong kaluwalhatian."
  },
  {
    "id": "lesson-4",
    "title": "Aralin 4: Ang Kahulugan at Kahalagahan ng Pananampalataya at Mabubuting Gawa",
    "category": "Evangelism",
    "readingTime": "7 minutong pagbasa",
    "scriptureFocus": {
      "reference": "Hebreo 11:1, Efeso 2:8-9, Santiago 2:17 (NIV)",
      "text": "Ngayon, ang pananampalataya ay siyang pagtitiwala sa mga bagay na ating inaasahan, at katiyakan sa mga bagay na hindi natin nakikita... Sapagkat sa pamamagitan ng biyaya kayo'y naligtas, sa pamamagitan ng pananampalataya... Ang pananampalataya sa ganang sarili, kung hindi ito kalakip ng gawa, ay patay."
    },
    "objectives": [
      "Upang maunawaan ang tunay na kahulugan ng pananampalataya at ang kaugnayan nito sa mabubuting gawa.",
      "Upang mapagtanto na ang kaligtasan ay sa pamamagitan ng biyaya sa pamamagitan lamang ng pananampalataya, at ang tunay na pananampalataya ay natural na nagreresulta sa isang buhay ng pagsunod at mabubuting gawa."
    ],
    "teachingSections": [
      {
        "id": "teaching-4-intro",
        "number": 1,
        "title": "Panimula",
        "paragraphs": [
          "Ano ang pananampalataya? At paano ito nauugnay sa paraan ng ating pamumuhay?",
          "Ang pananampalataya ay isa sa pinakamahalagang katotohanan sa buhay Kristiyano. Kung wala ito, walang sinuman ang makapagpapalugod sa DIYOS (Hebreo 11:6).",
          "Ngunit ipinapaalala rin sa atin ng Banal na Kasulatan na ang tunay na pananampalataya ay nagbubunga - nakikita sa pamamagitan ng ating mga kilos, pagsunod, at pagmamahal sa iba. Pag-aralan natin ang kahulugan at kahalagahan ng pananampalataya at mabubuting gawa ayon sa Salita ng DIYOS."
        ]
      },
      {
        "id": "teaching-4-1",
        "number": 2,
        "title": "Ano ang Kahulugan ng Pananampalataya?",
        "paragraphs": [
          "\"Ngayon, ang pananampalataya ay ang katiyakan sa mga bagay na ating inaasahan, at ang katiyakan sa mga bagay na hindi natin nakikita.\" - Hebreo 11:1 (NIV)",
          "Ang salitang Griyego na pistis ay nangangahulugang pananampalataya o katapatan. Ang pananampalataya ay nagsasangkot ng parehong katiyakan at paniniwala - pagtitiwala sa mga pangako ng DIYOS at pagtitiwala sa Kanyang hindi nakikitang katotohanan.",
          "Ang pananampalataya ay hindi bulag na optimismo kundi isang matibay na pagtitiwala sa kung sino ang DIYOS at sa Kanyang sinabi.",
          "Ang paniniwala kay HESUS ay ang lubos na pagtitiwala sa Kanya. Gaya ng ipinahayag sa Juan 3:16, 'Ang sinumang naniniwala sa Kanya ay hindi mapahamak, kundi magkakaroon ng buhay na walang hanggan.' Samakatuwid, ang pananampalataya ay nangangahulugan ng pagtitiwala Si HESUKRISTO lamang ang tanging dahilan ng kaligtasan, na naniniwalang ang Kanyang ipinangako ay totoo at tiyak."
        ]
      },
      {
        "id": "teaching-4-2",
        "number": 3,
        "title": "Bakit Pananampalataya at Hindi Mabubuting Gawa?",
        "paragraphs": [
          "\"Sapagkat sa pamamagitan ng biyaya kayo'y naligtas sa pamamagitan ng pananampalataya; at ito'y hindi sa inyong sarili, ito'y kaloob ng DIYOS; hindi sa pamamagitan ng mga gawa, upang walang sinuman ang makapagmalaki.\" - Mga Taga-Efeso 2:8-9 (ABTAG)",
          "Tayo ay naligtas sa pamamagitan ng biyaya - hindi sa pamamagitan ng ating sariling pagsisikap o mabubuting gawa. Ang kaligtasan ay isang regalo, hindi isang kabayaran. Hindi natin ito maaaring pagtrabahuhan, bilhin, o maging karapat-dapat dito.",
          "Kung ang kaligtasan ay nakasalalay sa ating mga gawa, magkakaroon tayo ng dahilan upang magmalaki sa harap ng DIYOS. Ngunit ang totoo, may isang taong nagbayad na ng buong halaga - si Jesu-CRISTO, ang ating TAGAPAGLIGTAS.",
          "Ang pananampalataya ay ang bukas na kamay na tumatanggap ng libreng kaloob ng DIYOS na biyaya. Ang mabubuting gawa ay hindi makapagliligtas sa atin, ngunit ang pananampalataya kay CRISTO ay makapagliligtas - dahil ito ay lubos na nagtitiwala sa Kanyang ginawa para sa atin."
        ]
      },
      {
        "id": "teaching-4-3",
        "number": 4,
        "title": "Ano ang Kahalagahan ng Mabubuting Gawa?",
        "paragraphs": [
          "\"Sapagkat tayo'y gawa ng DIYOS, nilikha kay CRISTO JESUS upang gumawa ng mabubuting gawa, na mga inihanda ng DIYOS nang una pa upang gawin natin.\" - Mga Taga-Efeso 2:10 (ABTAG)",
          "Ang mabubuting gawa ay hindi ang ugat ng kaligtasan, kundi ang bunga ng kaligtasan. Ang mga naligtas sa pamamagitan ng biyaya ay nagiging 'gawa' ng DIYOS - ang Kanyang obra maestra, nilikhang muli kay CRISTO upang mamuhay nang may karangalan.",
          "Hindi tayo naliligtas sa pamamagitan ng mabubuting gawa, kundi naliligtas tayo para sa mabubuting gawa.",
          "Ang tunay na pananampalataya ay natural na nagbubunga ng isang buhay ng paglilingkod, pag-ibig, at pagsunod sa DIYOS. Kaya naman ipinahayag ni Apostol Santiago, 'Ang pananampalataya sa kaniyang sarili, kung hindi ito kalakip ng gawa, ay patay.' - Santiago 2:17 (NIV)",
          "Ang pananampalatayang walang mga gawa ay hindi tunay na pananampalataya. Ang mga tunay na mananampalataya ay nabubuhay ang kanilang pananampalataya araw-araw sa pamamagitan ng paggawa ng mabuti, hindi upang makamit ang kaligtasan, kundi bilang tugon dito."
        ]
      },
      {
        "id": "teaching-4-4",
        "number": 5,
        "title": "Konklusyon",
        "paragraphs": [
          "Ang pananampalataya at mabubuting gawa ay hindi magkaaway—sila ay hindi mapaghihiwalay na magkasama.",
          "Pananampalataya ang ugat; mabubuting gawa ang bunga.",
          "Sa pamamagitan ng pananampalataya, natatanggap natin ang kaloob ng DIYOS na kaligtasan. Sa pamamagitan ng mabubuting gawa, ipinapakita natin ang katotohanan ng pananampalatayang iyon sa ating buhay.",
          "Kaya't mamuhay tayo sa pananampalataya—na nagtitiwala sa biyaya ni CRISTO—at lumakad sa mabubuting gawa, na nagdudulot ng kaluwalhatian sa DIYOS at pagpapala sa iba."
        ]
      }
    ],
    "reflectionQuestions": [
      "Paano mo bibigyang-kahulugan ang pananampalataya sa sarili mong mga salita batay sa Hebreo 11:1?",
      "Bakit hindi tayo maililigtas ng mabubuting gawa?",
      "Paano natural na humahantong sa mabubuting gawa ang tunay na pananampalataya?",
      "Ano ang ilang 'mabubuting gawa' na maaaring tinatawag ka ng DIYOS na gawin ngayon?",
      "Paano mo maipapahayag ang iyong pananampalataya sa pamamagitan ng mga gawa sa loob ng iyong pamilya, simbahan, o komunidad?"
    ],
    "prayer": "PANGINOONG DIYOS, salamat po sa Iyo na ako'y naligtas sa pamamagitan ng biyaya sa pamamagitan ng pananampalataya kay HESUKRISTO. Turuan Mo akong magtiwala sa Iyo nang lubos at isabuhay ang aking pananampalataya nang may pagmamahal at pagsunod. Nawa'y maipakita sa aking buhay ang Iyong kabutihan sa pamamagitan ng aking mga kilos at paglilingkod. Amen.",
    "challenge": "Sa Iyong biyaya, PANGINOONG Makapangyarihan, umaasa ako sa Iyo para sa kaligtasan. Palakasin Mo ang aking pananampalataya at tulungan Mo akong maipahayag ito sa pamamagitan ng mabubuting gawa na nagdudulot sa Iyo ng kaluwalhatian. Kay HESUKRISTO na aking PANGINOON at TAGAPAGLIGTAS, Amen."
  },
  {
    "id": "lesson-5",
    "title": "Aralin 5: Ang Katiyakan ng Kaligtasan",
    "category": "Evangelism",
    "readingTime": "7 minutong pagbasa",
    "scriptureFocus": {
      "reference": "1 Juan 5:11-13 (NIV)",
      "text": "At ito ang patotoo: Binigyan tayo ng DIYOS ng buhay na walang hanggan, at ang buhay na ito ay nasa kaniyang Anak. Ang sinumang mayroong Anak ay mayroong buhay; ang sinumang hindi mayroong Anak ng DIYOS ay walang buhay..."
    },
    "objectives": [
      "Upang tulungan ang mga mananampalataya na maunawaan at makapagpahinga sa katiyakan ng kaligtasan na nakasaad sa Bibliya.",
      "Upang malaman na ang buhay na walang hanggan ay ligtas na kaloob ng DIYOS, na natatanggap sa pamamagitan ng pananampalataya kay HESUKRISTO at ginagarantiyahan ng Kanyang Salita."
    ],
    "teachingSections": [
      {
        "id": "teaching-5-intro",
        "number": 1,
        "title": "Panimula",
        "paragraphs": [
          "Maraming taimtim na mananampalataya, kahit na nagtitiwala na kay HESUKRISTO bilang kanilang PANGINOON at TAGAPAGLIGTAS, kung minsan ay nahihirapan pa ring magduda tungkol sa kanilang kaligtasan.",
          "Ngunit nais ng DIYOS na mamuhay nang may kumpiyansa ang Kanyang mga anak - hindi nang may takot. Malinaw Niyang inihayag sa Kanyang Salita na ang buhay na walang hanggan ay hindi isang bagay na kailangan nating pagtrabahuhan o hulaan; ito ay isang bagay na maaari nating malaman at tamasahin ngayon.",
          "Ipinapakita sa atin ng aral na ito kung paano tayo makakaasa sa mga pangako ng DIYOS at mabubuhay nang may katiyakan sa Kanyang pagliligtas biyaya."
        ]
      },
      {
        "id": "teaching-5-1",
        "number": 2,
        "title": "Ang DIYOS mismo ang Nagbibigay ng Katiyakan ng Buhay na Walang Hanggan",
        "paragraphs": [
          "\"Ito ang patotoo.\" - 1 Juan 5:11",
          "Ang ating katiyakan ay nagsisimula sa sariling patotoo ng DIYOS—hindi sa opinyon o damdamin ng tao.",
          "Ang patotoo ng DIYOS ay mas dakila kaysa sa anumang pag-aangkin ng tao dahil ito ay nagmumula sa Isa na hindi maaaring magsinungaling.",
          "Ipinapahayag ng patotoong ito na ang buhay na walang hanggan ay Kanyang tiyak at mapagkakatiwalaang kaloob sa lahat ng naniniwala.",
          "Makakapagpahinga tayo nang panatag dahil ang katiyakan ay nagmumula sa hindi nagbabagong Salita ng DIYOS, hindi sa ating nagbabagong emosyon."
        ]
      },
      {
        "id": "teaching-5-2",
        "number": 3,
        "title": "Binigyan Tayo ng DIYOS ng Buhay na Walang Hanggan",
        "paragraphs": [
          "\"Binigyan tayo ng DIYOS ng buhay na walang hanggan.\" - 1 Juan 5:11",
          "Ang buhay na walang hanggan ay hindi lamang isang pag-asa sa hinaharap—ito ay isang kasalukuyang realidad para sa bawat taong tunay na naniniwala kay HESUKRISTO.",
          "Ibinigay na ng DIYOS ang kaloob na ito sa Kanyang mga anak. Bagama't mararanasan ang kabuuan nito sa walang hanggan, ang presensya nito ay nagsisimula na ngayon.",
          "Ang bawat tunay na mananampalataya ay nabubuhay na sa realidad ng buhay na walang hanggan -- isang buhay na hindi na kailanman aalisin."
        ]
      },
      {
        "id": "teaching-5-3",
        "number": 4,
        "title": "Ang Buhay na Walang Hanggan ay Natatanggap sa Pamamagitan ng Pagtanggap kay KRISTO",
        "paragraphs": [
          "\"Ang buhay na ito ay nasa kaniyang Anak. Ang sinumang mayroong Anak ay mayroong buhay; ang sinumang hindi mayroong Anak ng DIYOS ay hindi mayroong buhay.\" - 1 Juan 5:12 (ABTAG)",
          "Ang buhay na walang hanggan ay matatagpuan lamang kay HESUKRISTO. Hindi ito sa relihiyon, mabubuting gawa, o moral na pagsisikap - kundi sa isang personal na relasyon sa Anak ng DIYOS.",
          "Kapag tinalikuran natin ang kasalanan at nagtitiwala kay KRISTO sa pamamagitan ng pananampalataya, tayo ay kaisa Niya, at ang Kanyang buhay ay magiging atin.",
          "Ang ibig sabihin ng \"pagkakaroon ng Anak\" ay tanggapin Siya sa ating mga puso bilang PANGINOON at TAGAPAGLIGTAS - ang personal na mapabilang sa Kanya.",
          "Kung mayroon tayo ni KRISTO, mayroon tayong buhay. Kung wala tayo ni KRISTO, wala tayong buhay. Ganoon lang kasimple at katiyakan iyon."
        ]
      },
      {
        "id": "teaching-5-4",
        "number": 5,
        "title": "Ang Buhay na Walang Hanggan ay Tiyak na Makikilala sa pamamagitan ng Pananampalataya kay CRISTO",
        "paragraphs": [
          "\"Kayong mga nananampalataya sa pangalan ng Anak ng DIYOS... ay maalaman ninyo na kayo'y may buhay na walang hanggan.\" - 1 Juan 5:13 (NIV)",
          "Ang katiyakan ay dumarating sa pamamagitan ng pananampalataya—ang pagtitiwala sa natapos na gawain ni KRISTO sa krus.",
          "Ang pananampalataya ay nakasalalay sa Kanyang pangako na tinubos Niya tayo nang lubusan, pinatawad ang ating mga kasalanan, at sinigurado ang ating kinabukasan.",
          "Kapag nananampalataya tayo kay HESUS, lumilipat tayo mula sa kawalan ng katiyakan patungo sa kumpiyansa.",
          "Ang ating kaligtasan ay hindi nakabatay sa kung ano ang ating nararamdaman o ginagawa, kundi sa kung ano ang nagawa na ni HESUS para sa atin.",
          "Dahil sa Kanyang Salita at sa Kanyang katapatan, malalaman natin na mayroon tayong buhay na walang hanggan - hindi pag-asa o hangarin, ngunit alamin."
        ]
      },
      {
        "id": "teaching-5-5",
        "number": 6,
        "title": "Konklusyon",
        "paragraphs": [
          "Ang katiyakan ng kaligtasan ay hindi pagpapalagay – ito ay pagtitiwala sa pangako ng DIYOS.",
          "Kapag tayo ay kaisa ni KRISTO sa pamamagitan ng pananampalataya, makatitiyak tayo na ang buhay na walang hanggan ay atin, ngayon at magpakailanman.",
          "Kung ang DIYOS ay kakampi natin, sino ang makakalaban natin? (Roma 8:31)",
          "Walang sinuman ang makakaagaw sa atin mula sa Kanyang kamay. Ang katiyakan ng mananampalataya ay nakasalalay nang matibay sa katangian at kapangyarihan ng DIYOS."
        ]
      }
    ],
    "reflectionQuestions": [
      "Bakit mahalaga ang katiyakan ng kaligtasan para sa isang malusog na buhay Kristiyano?",
      "Paano nakakaapekto ang pagkaalam na ang buhay na walang hanggan ay isang kaloob mula sa DIYOS sa iyong pang-araw-araw na pakikipag-ugnayan sa Kanya?",
      "Anong mga katotohanan mula sa 1 Juan 5:11-13 ang nagbibigay sa iyo ng lubos na kapanatagan at kumpiyansa?",
      "Sa anong mga paraan pinapahina ng pagdududa ang ating pananampalataya at patotoo?",
      "Paano mo mapapatibay ang loob ng iba na nahihirapan sa mga pagdududa tungkol sa kanilang kaligtasan?"
    ],
    "prayer": "Ama sa Langit, salamat sa pagbibigay Mo sa akin ng buhay na walang hanggan sa pamamagitan ng Iyong Anak na si HESUKRISTO. Salamat sa Iyong mga pangakong hindi nagbabago na siyang nagtitiyak ng aking kaligtasan. Tulungan Mo akong mamuhay araw-araw nang may kumpiyansa, kapayapaan, at pasasalamat, dahil alam Mong ako'y pag-aari Mo magpakailanman. Amen.",
    "challenge": "Dahil naunawaan ko na ang katiyakan ng buhay na walang hanggan kay CRISTO, nangangako ako ngayon na mamumuhay nang may kagalakan at kumpiyansa sa Kanyang pangako. Magtitiwala ako sa Kanyang Salita, magpapahinga sa Kanyang pag-ibig, at ibabahagi ang katiyakang ito sa iba. Kay HESUKRISTO na aking PANGINOON at TAGAPAGLIGTAS, Amen."
  },
  {
    "id": "lesson-6",
    "title": "Aralin 6: Ang Pagtitiyaga ng mga Naligtas",
    "category": "Evangelism",
    "readingTime": "8 minutong pagbasa",
    "scriptureFocus": {
      "reference": "Mga Taga-Filipos 2:12-13 (ABTAG1978)",
      "text": "Magpatuloy kayo sa paggawa ng inyong kaligtasan nang may takot at panginginig, sapagkat ang DIYOS ang gumagawa sa inyo upang magnais at gumawa upang matupad ang kaniyang mabuting layunin."
    },
    "objectives": [
      "Upang maunawaan na ang katiyakan ng kaligtasan ay hindi isang lisensya upang maging tamad, kundi isang panawagan upang magtiyaga nang tapat sa buhay Kristiyano.",
      "Magtiwala na ang DIYOS, na nagpasimula ng mabuting gawa sa atin, ay siyang magpapatuloy nito hanggang sa matapos."
    ],
    "teachingSections": [
      {
        "id": "teaching-6-intro",
        "number": 1,
        "title": "Panimula",
        "paragraphs": [
          "Ang doktrina ng Katiyakan ng Kaligtasan ay nagpapaalala sa atin na binigyan tayo ng DIYOS ng buhay na walang hanggan sa pamamagitan ni HESUKRISTO.",
          "Ngunit ang katiyakan ay hindi nangangahulugang pagiging kampante - tinatawag tayo nito na lumakad nang may pananampalataya, pagsunod, at paggalang habang tayo ay nabubuhay sa lupa.",
          "Kung tunay na tinitiyak sa atin ng DIYOS ang kaligtasan, tinatawag din Niya tayo na magtiyaga sa katiyakang iyon - na mamuhay nang tapat hanggang sa wakas. Tingnan natin kung ano ang itinuturo sa atin ni Apostol Pablo tungkol sa katotohanang ito."
        ]
      },
      {
        "id": "teaching-6-1",
        "number": 2,
        "title": "Magpatuloy sa Tiyak na Kaligtasan",
        "paragraphs": [
          "\"At ito ang patotoo: Binigyan tayo ng DIYOS ng buhay na walang hanggan, at ang buhay na ito ay nasa kaniyang Anak...\" - 1 Juan 5:11-13 (ABTAG)",
          "\"Narito ako! Nakatayo ako sa pintuan at tumutuktok. Kung may makarinig ng aking tinig at magbukas ng pinto, papasok ako at kakain kasama niya, at siya'y kasalo ko.\" - Pahayag 3:20 (ABTAG1978)",
          "\"Sapagkat sa pamamagitan ng biyaya kayo'y naligtas, sa pamamagitan ng pananampalataya... hindi sa pamamagitan ng mga gawa...\" - Mga Taga-Efeso 2:8-9 (ABTAG)",
          "Tayo ay naligtas sa pamamagitan lamang ng biyaya ng DIYOS, sa pamamagitan ng pananampalataya kay CRISTO. Ang kaligtasang ito ay tiyak at ganap sa Kanya.",
          "Gayunpaman, tinatawagan ni Pablo ang mga mananampalataya na \"pagsikapan\" ang \"ginawa na\" ng DIYOS. Ang ating pagtitiyaga ay hindi nangangahulugang kaligtasan - ito ay nagpapahayag ng kaligtasan.",
          "Habang nagpapatuloy tayo sa pananampalataya, panalangin, at pagsunod, isinasabuhay natin ang katiyakang ibinigay na sa atin ng DIYOS."
        ]
      },
      {
        "id": "teaching-6-2",
        "number": 3,
        "title": "Kailangan Tayong Magtiyaga",
        "paragraphs": [
          "Hinihimok ni Pablo ang mga mananampalataya na \"gumawa ng kanilang kaligtasan nang may takot at panginginig.\"",
          "Nangangahulugan ito ng pagsisikap na mamuhay nang tapat bilang mga taong pag-aari ng DIYOS. Ang mga salitang \"magsikap\" ay nagpapahiwatig ng kasipagan - ang pagsisikap hindi upang makamit ang pag-ibig ng DIYOS, kundi upang mamuhay bilang tugon dito.",
          "Ang pariralang \"nang may takot at panginginig\" ay nagsasalita ng banal na paggalang - isang matinding pagkamangha sa DIYOS na nagligtas sa atin.",
          "Hindi ito takot sa parusa, kundi isang mapagkumbabang pagkilala sa Kanyang kamahalan at biyaya. Hindi tayo nanginginig dahil sa takot, kundi dahil sa pagkamangha - pagkamangha na iniligtas ng Banal na DIYOS ang mga makasalanan na tulad natin.",
          "Ang tunay na pagtitiyaga ay nagmumula sa pagsamba, hindi sa pag-aalala. Ito ang mapagmahal na tugon ng mananampalataya sa kamangha-manghang biyaya ng DIYOS."
        ]
      },
      {
        "id": "teaching-6-3",
        "number": 4,
        "title": "Isang Paglalarawan ng Pagtitiyaga",
        "paragraphs": [
          "Gunigunihin ang mga manlalakbay na naglalakbay patungo sa isang malayong lupain. Sigurado na ang kanilang tiket at destinasyon. Gayunpaman, kailangan nilang ipagpatuloy ang kanilang paglalakbay - manatiling alerto, nagmamalasakit sa isa't isa, at nagtitiwala sa kapitan sa kabila ng kapayapaan at bagyo.",
          "Sa parehong paraan, ang mga mananampalataya ay mga manlalakbay patungo sa buhay na walang hanggan.",
          "Tiyak ang ating patutunguhan, ngunit dapat tayong magpatuloy nang tapat, nagtitiwala sa DIYOS sa buong paglalakbay.",
          "Ang biyayang nagliligtas sa atin ay siya ring biyayang nagpapalakas sa atin upang magtiis hanggang sa wakas."
        ]
      },
      {
        "id": "teaching-6-4",
        "number": 5,
        "title": "Ang DIYOS ay Gumagawa sa Atin upang Magtiyaga",
        "paragraphs": [
          "\"Sapagkat ang DIYOS ang gumagawa sa inyo upang magnais at gumawa upang matupad ang kaniyang mabuting layunin.\" - Filipos 2:13 (ABTAG1978)",
          "Ang ating pagtitiyaga ay hindi sa pamamagitan ng lakas ng tao - kundi ang DIYOS mismo ang gumagawa sa loob natin. Siya ang humuhubog sa ating mga hangarin (\"upang magnais\") at nagbibigay-kapangyarihan sa ating mga kilos (\"upang kumilos\") upang matupad natin ang Kanyang layunin.",
          "Ito ang dakilang kaaliwan ng Ebanghelyo: ang DIYOS ding nagliligtas sa atin ang siya ring nagpapanatili sa atin.",
          "Sinasamahan Niya tayo araw-araw, binibigyan tayo kapwa ng pagnanais at kapangyarihang gawin ang Kanyang kalooban.",
          "Ang katotohanang ito ang tinatawag ng mga teologo na \"pagtitiyaga ng mga banal.\" Nangangahulugan ito na ang mga tunay na mananampalataya, na iniingatan ng biyaya ng DIYOS, ay magtitiis sa pananampalataya hanggang sa wakas.",
          "Hindi lamang tinitiyak ng DIYOS ang ating kaligtasan—tinitiyak din Niya ang ating pagtitiyaga."
        ]
      },
      {
        "id": "teaching-6-5",
        "number": 6,
        "title": "Konklusyon",
        "paragraphs": [
          "Ang pagtitiyaga sa pananampalataya ay hindi ang pagsisikap nang may takot kundi ang paglakad nang may magalang na tiwala.",
          "Ang ating paglalakbay tungo sa kaligtasan ay ginagabayan ng Isa na nagpasimula nito at nangakong tatapos nito.",
          "Bawat hakbang na ating ginagawa bilang pagsunod ay patunay na ang Kanyang biyaya ay gumagawa sa atin.",
          "Ang ating \"takot at panginginig\" ay hindi mga palatandaan ng pagdududa, kundi ng matinding pasasalamat - pagkamangha sa harap ng isang banal at mapagmahal na DIYOS na nagligtas sa atin at nagpapanatili sa atin magpakailanman."
        ]
      }
    ],
    "reflectionQuestions": [
      "Bakit tayo dapat magtiyaga sa pananampalataya kahit na tiyak na ang kaligtasan?",
      "Ano ang ibig sabihin ng \"pagsikapan\" ang iyong kaligtasan nang hindi sinusubukang \"pagsikapan\" ito?",
      "Paano mapapalalim ng banal na takot at paggalang ang iyong paglakad kasama ng DIYOS?",
      "Ano ang hitsura ng aktibong gawain ng DIYOS sa iyo sa pang-araw-araw na buhay?",
      "Paano mo mapapatibay ang loob ng ibang mananampalataya na patuloy na magtiyaga sa pananampalataya?"
    ],
    "prayer": "PANGINOONG DIYOS, salamat po at ang aking kaligtasan ay ligtas kay HESUKRISTO. Tulungan Mo po akong magtiyaga sa pananampalataya, pagsunod, at pag-ibig, dahil alam Mong Ikaw ang gumagawa sa akin. Panatilihin Mong mapagpakumbaba ang aking puso at matatag ang aking mga hakbang hanggang sa makarating ako sa aking walang hanggang tahanan. Amen.",
    "challenge": "Dahil naunawaan ko na tinitiyak at pinapanatili ng DIYOS ang aking kaligtasan, nangangako akong mamuhay araw-araw nang may banal na paggalang at katapatan. Magtitiwala ako sa Kanyang biyaya na tutulong sa akin na magtiyaga hanggang sa makita ko Siya nang harapan."
  },
  {
    "id": "lesson-7",
    "title": "Aralin 7: Pagbabahagi ng Mabuting Balita - Kapag Mahalaga Dapat Maging Mapag-usap",
    "category": "Evangelism",
    "readingTime": "10 minutong pagbasa",
    "scriptureFocus": {
      "reference": "Juan 4:1-7 (NIV)",
      "text": "Nang dumating ang isang Samaritana upang umigib ng tubig, sinabi ni JESUS sa kaniya, 'Maaari mo ba akong bigyan ng maiinom?'"
    },
    "objectives": [
      "Upang matutunan kung paano ibahagi ang Ebanghelyo sa isang mainit, mapang-usap, at patnubay ng ESPIRITU - tinutularan ang halimbawa ni HESUS sa babaeng Samaritana.",
      "Upang makita ang ebanghelismo hindi bilang argumento kundi bilang diyalogo na nag-aanyaya sa iba na personal na makaharap si KRISTO."
    ],
    "teachingSections": [
      {
        "id": "teaching-17-intro",
        "number": 1,
        "title": "Panimula",
        "paragraphs": [
          "Sa personal na ebanghelismo, hindi lamang tayo basta nagpapakita ng mga ideya—nagpapakita tayo ng isang Persona: si HESUKRISTO, ang pinakamakahikayat at pinakamakapagpabago ng buhay na Persona na nabuhay kailanman.",
          "Ang ating gawain ay hindi ang makipagtalo, kundi ang mag-imbita; hindi ang makipagtalo, kundi ang makisali.",
          "Nagiging makapangyarihan ang ebanghelismo kapag ito ay nagiging personal at pang-usap—kapag hinahayaan natin ang BANAL NA ESPIRITU na gumawa sa pamamagitan ng isang tunay na pagpapalitan ng mga kaisipan, damdamin, at paniniwala.",
          "Alamin natin kung paano nakipag-ugnayan mismo si HESUS sa babaeng Samaritana sa Juan 4 - isang masterclass sa relational evangelism."
        ]
      },
      {
        "id": "teaching-17-1",
        "number": 2,
        "title": "Simulan ang Usapan Gamit ang Isang Kawili-wiling Paksa",
        "paragraphs": [
          "\"Nang dumating ang isang Samaritana upang umigib ng tubig, sinabi ni JESUS sa kanya, 'Maaari mo ba akong bigyan ng maiinom?'\" - Juan 4:7 (NIV)",
          "Nagsimula si HESUS sa isang bagay na simple at madaling maunawaan – ang tubig.",
          "Ang mabisang ebanghelismo ay nagsisimula sa pinagsasaluhang paksa—isang tanong, isang kuwento, o isang pang-araw-araw na paksa na nagbubukas ng pinto para sa mas malalim na pag-uusap.",
          "Susing Katotohanan: Ang koneksyon ay kadalasang nagsisimula bago ang paniniwala."
        ]
      },
      {
        "id": "teaching-17-2",
        "number": 3,
        "title": "Hayaang Mag-react o Magtanong ang Tao",
        "paragraphs": [
          "\"Sinabi sa kanya ng babaeng Samaritana, 'Ikaw ay isang Hudyo at ako ay isang Samaritana. Paano ka humihingi sa akin ng maiinom?'\" - Juan 4:9 (NIV)",
          "Maging matiyaga at makinig. Ang pag-uusisa ay isang pagkakataon. Kapag pinag-uusapan ng iba ang iyong pananampalataya, huwag itong ituring na pagtutol – ituring ito bilang pakikipag-ugnayan.",
          "Susing Katotohanan: Mas bukas ang mga tao sa katotohanan kapag nararamdaman nilang pinakikinggan sila."
        ]
      },
      {
        "id": "teaching-17-3",
        "number": 4,
        "title": "Tumugon Nang Simple at Tumutok sa Kaloob ng DIYOS",
        "paragraphs": [
          "\"Sumagot si JESUS sa kanya, 'Kung alam mo lang ang kaloob ng DIYOS... hihingi ka sana sa kanya at bibigyan ka niya ng tubig na nagbibigay-buhay.'\" - Juan 4:10 (NIV)",
          "Panatilihing simple at nakasentro sa biyaya ang iyong mga tugon. Huwag humingi; mag-alok.",
          "Itinuro ni HESUS ang kanyang pansin sa kaloob ng DIYOS, hindi sa obligasyong pangrelihiyon.",
          "Susing Katotohanan: Ang ebanghelismo ay isang paanyaya sa biyaya, hindi isang kahilingan para sa pagganap."
        ]
      },
      {
        "id": "teaching-17-4",
        "number": 5,
        "title": "Hikayatin ang Pagkausyoso sa pamamagitan ng Magiliw na Pag-uusap",
        "paragraphs": [
          "\"Ginoo,' sabi ng babae, \"wala kang pangsalok at malalim ang balon. Saan ka makakakuha ng tubig na nagbibigay-buhay na ito?\" - Juan 4:11 (ABTAG1978)",
          "Lumalaki ang interes. Hikayatin ito. Magtanong ng mga mapagnilay-nilay na tanong at pagtibayin ang kanilang katapatan.",
          "Hayaang ang kuryusidad ang magpalapit sa kanila kay KRISTO.",
          "Susing Katotohanan: Ginagamit ng BANAL NA ESPIRITU ang kuryusidad upang gisingin ang espirituwal na pagkagutom."
        ]
      },
      {
        "id": "teaching-17-5",
        "number": 6,
        "title": "Ipakita ang Kalamangan ng Ebanghelyo Nang Walang Pakikipagtalo",
        "paragraphs": [
          "\"Ang bawat uminom ng tubig na ito ay muling mauuhaw, ngunit ang sinumang uminom ng tubig na ibibigay ko sa kanya ay hindi na mauuhaw kailanman.\" - Juan 4:13-14 (ABTAG1978)",
          "Iwasan ang mga debate. Sa halip, itampok ang kagandahan at kapangyarihan ng Ebanghelyo - ang kakayahan nitong bigyang-kasiyahan ang hindi kayang gawin ng iba.",
          "Susing Katotohanan: Ang apela ng Ebanghelyo ay wala sa argumento kundi sa pagbabago."
        ]
      },
      {
        "id": "teaching-17-6",
        "number": 7,
        "title": "Hayaan silang humingi ng iyong inialok",
        "paragraphs": [
          "\"Sinabi sa kaniya ng babae, 'Ginoo, bigyan mo ako ng tubig na ito upang hindi na ako mauhaw.'\" - Juan 4:15 (NIV)",
          "Kapag ang interes ay naging pagnanasa, handa na ang puso.",
          "Sa yugtong ito, maaari mo nang simulan ang pagbabahagi kung paano personal na tanggapin si KRISTO.",
          "Susing Katotohanan: Hayaang lumipat ang naghahanap mula sa kuryusidad patungo sa dedikasyon."
        ]
      },
      {
        "id": "teaching-17-7",
        "number": 8,
        "title": "Ilipat ang Usapan sa Personal",
        "paragraphs": [
          "\"Sinabi niya sa kanya, 'Humayo ka, tawagin mo ang iyong asawa at bumalik ka rito.'\" - Juan 4:16 (NIV)",
          "Dahan-dahang inakay ni HESUS ang babae upang harapin ang kanyang personal na realidad.",
          "Ang tunay na ebanghelismo ay hindi lamang tungkol sa impormasyon; ito ay tungkol sa pagbabago.",
          "Tulungan ang mga tao na makita ang kanilang pangangailangan sa DIYOS nang personal at tapat.",
          "Susing Katotohanan: Nagiging totoo ang biyaya kapag ang katotohanan ay nagiging personal."
        ]
      },
      {
        "id": "teaching-17-8",
        "number": 9,
        "title": "Payagan ang Matapat na Pagpapahayag",
        "paragraphs": [
          "\"Sumagot ang babae, 'Wala akong asawa.'\" - Juan 4:17 (NIV)",
          "Hayaang magbukas ang mga tao ng kanilang mga saloobin. Maging mahabagin at matiyaga.",
          "Ang ebanghelismo ay hindi pagtatanong—ito ay pag-uusap.",
          "Ang bawat tapat na pagtatapat ay isang hakbang tungo kay KRISTO.",
          "Susing Katotohanan: Ang kahinaan ay nagbubukas ng pinto para sa biyaya."
        ]
      },
      {
        "id": "teaching-17-9",
        "number": 10,
        "title": "Magsalita ng Katotohanan nang May Pagmamahal",
        "paragraphs": [
          "\"Sinabi sa kanya ni JESUS, 'Tama ka sa sinabi mong wala kang asawa. Ang totoo, lima na ang naging asawa mo.'\" - Juan 4:17-18 (NIV)",
          "Nagsalita si JESUS nang may katotohanan ngunit may malumanay na pag-ibig.",
          "Hindi Niya hinatulan o binalewala ang kasalanan -- ipinahayag Niya ito nang may habag at kalinawan.",
          "Susing Katotohanan: Ang BANAL NA ESPIRITU ay sumasaksi sa pamamagitan ng katotohanang nababalot ng pag-ibig."
        ]
      },
      {
        "id": "teaching-17-10",
        "number": 11,
        "title": "Pangunahan ang Usapan Tungo sa Pagkilala sa DIYOS",
        "paragraphs": [
          "\"Sinabi ng babae, 'Ginoo, napapansin kong isa kang propeta...'\" - Juan 4:19 (NIV)",
          "\"Ipinahayag ni HESUS, 'Maniwala kayo sa akin, darating ang panahon na hindi na ninyo sasambahin ang Ama sa bundok na ito, ni sa Jerusalem... Ang DIYOS ay ESPIRITU, at ang mga sumasamba sa kanya ay dapat sumamba sa ESPIRITU at sa katotohanan.'\" - Juan 4:21-24 (NIV)",
          "Kapag nabuksan na ang puso, ipakilala ang katangian ng DIYOS - ang Kanyang kabanalan, pag-ibig, at katotohanan.",
          "Tulungan silang makita na ang tunay na pagsamba ay hindi ritwal kundi relasyon.",
          "Susing Katotohanan: Ang ebanghelismo ay dapat humantong sa pagsamba sa tunay at buhay na DIYOS."
        ]
      },
      {
        "id": "teaching-17-11",
        "number": 12,
        "title": "Anyayahan Sila sa Isang Personal na Relasyon kay KRISTO",
        "paragraphs": [
          "\"Sinabi ng babae, 'Alam kong darating ang Mesiyas.'... Pagkatapos ay ipinahayag ni JESUS, 'Ako, ang nagsasalita sa iyo, ay siya nga.'\" - Juan 4:25-26 (NIV)",
          "Dito ipinakilala ni HESUS ang Kanyang sarili. Natutupad ang ebanghelismo kapag nakikilala ng tagapakinig ang Persona ni KRISTO - hindi lamang ang impormasyon tungkol sa Kanya.",
          "Susing Katotohanan: Ang layunin ng ebanghelismo ay ang pakikipagtagpo - upang personal nilang makilala si KRISTO."
        ]
      },
      {
        "id": "teaching-17-12",
        "number": 13,
        "title": "Konklusyon",
        "paragraphs": [
          "Ang ebanghelismo sa pamamagitan ng pakikipag-usap ay nangangailangan ng oras at pagiging sensitibo, ngunit nagbubunga ito ng bunga na tumatagal.",
          "Binabago nito ang mga engkwentro tungo sa mga relasyon at ang mga pag-uusap tungo sa mga pagbabagong-loob.",
          "Sa pamamagitan ng pamamaraang ito na ginagabayan ng ESPIRITU, kapwa ang nagbabahagi at ang naghahanap ay mas malalim na nararanasan ang pag-ibig at katotohanan ng DIYOS -- ang pagbuo ng pangmatagalang pakikipagkaibigan kay KRISTO, sa iba, at maging sa sarili."
        ]
      }
    ],
    "reflectionQuestions": [
      "Paano naiiba ang ebanghelismo sa pamamagitan ng pakikipag-usap sa tradisyonal na ebanghelismo na \"three-point\" o \"one-verse\"?",
      "Ano ang matututuhan natin mula sa pamamaraan ni HESUS sa Juan 4?",
      "Paano mo magagawang mas natural at magabayan ng ESPIRITU ang iyong mga pag-uusap tungkol sa Ebanghelyo?",
      "Anong mga saloobin o takot ang humahadlang sa iyo sa pagbabahagi ng Mabuting Balita sa pamamagitan ng pakikipag-usap?",
      "Paano mo maisasagawa ang pamamaraang ito sa iyong mga relasyon ngayong linggo?"
    ],
    "prayer": "O PANGINOON kong DIYOS na Makapangyarihan, salamat sa pagpapakita Mo sa akin kung paano ibahagi ang Iyong Mabuting Balita nang may pagmamahal at kahinahunan. Turuan Mo akong makinig nang malalim, magsalita nang may karunungan, at hayaan Mong gabayan ng Iyong ESPIRITU ang bawat pag-uusap. Nawa'y ang bawat salitang aking sasabihin ay magpalapit sa iba sa Iyo. Amen.",
    "challenge": "PANGINOON, nangangako po ako na isasagawa ang ebanghelismo sa pamamagitan ng pakikipag-usap - pagbabahagi ng Ebanghelyo nang may pagmamahal, paggalang, at pagtitiis. Gawin Mo po akong isang mapagmalasakit na saksi, na sumasalamin sa Iyong katotohanan sa pamamagitan ng aking mga salita at kilos. Kay HESUKRISTO na aking PANGINOON at TAGAPAGLIGTAS, Amen."
  },
  {
    "id": "consolidation-1",
    "title": "Aralin 1: Ang Kahulugan at Pagsasagawa ng Panalangin",
    "category": "Consolidation",
    "readingTime": "7 minutong pagbasa",
    "scriptureFocus": {
      "reference": "Filipos 4:6-7 at Lucas 11:1 (NIV)",
      "text": "Huwag kayong mabalisa tungkol sa anumang bagay; kundi sa bawat pagkakataon, sa pamamagitan ng panalangin at pagsusumamo na may pasasalamat, iharap ninyo ang inyong mga kahilingan sa DIYOS... PANGINOON, turuan mo kaming manalangin."
    },
    "objectives": [
      "Upang maunawaan ang kahulugan, kahalagahan, at pamamaraan ng panalangin sa buhay ng isang mananampalataya.",
      "Upang bumuo ng isang pare-pareho at makabuluhang personal na buhay panalangin na naaayon sa balangkas ng Bibliya ng ACTS - Pagsamba, Pagkukumpisal, Pasasalamat, at Pagsusumamo."
    ],
    "teachingSections": [
      {
        "id": "c-1-intro",
        "number": 1,
        "title": "Panimula",
        "paragraphs": [
          "Ang panalangin ay isa sa mga pinakadakilang pribilehiyo ng bawat mananampalataya. Ito ay isang sagradong pakikipag-usap sa ating Ama sa Langit - isang panahon ng pakikisama, pagsamba, at pag-ayon sa Kanyang kalooban.",
          "Sa pamamagitan ng panalangin, ipinapahayag natin ang ating pagmamahal, ikinukumpisal ang ating mga kasalanan, nagpapasalamat sa Kanyang biyaya, at inihaharap sa Kanya ang ating mga pangangailangan at ang mga pangangailangan ng iba.",
          "Kapag tayo ay nananalangin, hindi natin ipinapaalam sa DIYOS ang mga bagay na hindi Niya nalalaman, kundi kinikilala natin ang ating pagdepende sa Kanya at inaanyayahan ang Kanyang presensya at kapangyarihan sa ating buhay.",
          "Susing Katotohanan: Ang panalangin ay hindi lamang paghingi sa DIYOS—ito ay pananatili sa Kanya."
        ]
      },
      {
        "id": "c-1-1",
        "number": 2,
        "title": "Ano ang Panalangin?",
        "paragraphs": [
          "Ang panalangin ay ang ating espirituwal na komunikasyon sa DIYOS. Ito ay kapwa pakikipag-usap sa DIYOS at pakikinig sa Kanya.",
          "Ito ang pagpapahayag ng ating ugnayan -- isa na nakaugat sa pagmamahal, tiwala, at pagsunod.",
          "\"Ito ang ating pagkakatiwala sa DIYOS: kung tayo'y humingi ng anumang bagay ayon sa kanyang kalooban, tayo'y dinidinig niya.\" - 1 Juan 5:14",
          "Susing Katotohanan: Ang lakas ng ating espirituwal na buhay ay nakasalalay sa lakas ng ating buhay panalangin."
        ]
      },
      {
        "id": "c-1-2",
        "number": 3,
        "title": "Bakit Tayo Dapat Manalangin?",
        "paragraphs": [
          "1. Dahil iniuutos sa atin ng DIYOS na manalangin. - Lucas 18:1; 1 Tesalonica 5:17",
          "2. Dahil ang panalangin ay naglalapit sa atin sa DIYOS. - Santiago 4:8",
          "3. Dahil ang panalangin ay naglalabas ng kapangyarihan ng DIYOS sa ating buhay. - Jeremias 33:3",
          "4. Dahil ang panalangin ay nagpapatibay ng pananampalataya, kapayapaan, at lakas. - Filipos 4:6-7",
          "5. Dahil ang panalangin ay higit na nagpapabago sa atin kaysa sa ating mga kalagayan. - Mga Taga-Roma 12:2",
          "Susing Katotohanan: Ang panalangin ay hindi opsyonal para sa isang mananampalataya - ito ay mahalaga sa isang matagumpay na buhay Kristiyano."
        ]
      },
      {
        "id": "c-1-3",
        "number": 4,
        "title": "Paano Tayo Dapat Manalangin? (Ang Modelo ng mga Gawain)",
        "paragraphs": [
          "Ang huwaran ng ACTS ay isang simple at makapangyarihang paraan upang gabayan ang iyong pang-araw-araw na panalangin:",
          "A - Pagsamba: Sambahin ang DIYOS kung sino Siya. Kilalanin ang Kanyang kadakilaan, kabanalan, at pag-ibig.",
          "C - Pagtatapat: Ipagtapat nang tapat ang iyong mga kasalanan sa DIYOS at tanggapin ang Kanyang kapatawaran sa pamamagitan ni HESUKRISTO.",
          "T - Pasasalamat: Pasalamatan ang DIYOS para sa Kanyang mga pagpapala, paglalaan, at mga panalanging sinagot.",
          "S - Pagsusumamo: Ilapit ang iyong mga kahilingan sa DIYOS - para sa iyong sarili at sa iba."
        ]
      },
      {
        "id": "c-1-4",
        "number": 5,
        "title": "Ano ang Dapat Nating Asahan Kapag Tayo ay Nananalangin?",
        "paragraphs": [
          "Naririnig tayo ng DIYOS - Awit 34:17",
          "Sumasagot ang DIYOS ayon sa Kanyang kalooban - 1 Juan 5:14-15",
          "Nagbibigay ang DIYOS ng kapayapaan bago pa man dumating ang kasagutan - Filipos 4:7",
          "Binabago tayo ng DIYOS sa pamamagitan ng matalik na pakikipag-ugnayan sa Kanya - 2 Corinto 3:18",
          "Susing Katotohanan: Binabago ng panalangin ang lahat - lalo na ang taong nananalangin."
        ]
      },
      {
        "id": "c-1-5",
        "number": 6,
        "title": "Konklusyon",
        "paragraphs": [
          "Ang panalangin ay kapwa isang pribilehiyo at isang disiplina. Dito nakahanay ang ating mga puso sa kalooban ng DIYOS at ang ating mga buhay ay binibigyang kapangyarihan ng Kanyang ESPIRITU.",
          "Kapag tayo ay sumasamba, nangumpisal, nagpapasalamat, at ipinaaalam ang ating mga kahilingan sa DIYOS, nararanasan natin ang Kanyang kapayapaan at kapangyarihan na gumagawa sa atin.",
          "Gawin nating hindi lamang pang-araw-araw na gawain ang panalangin, kundi isang paraan ng pamumuhay - ang tibok ng puso ng ating paglalakbay kasama si HESUS."
        ]
      }
    ],
    "reflectionQuestions": [
      "Paano mo personal na binibigyang-kahulugan ang panalangin sa iyong buhay ngayon?",
      "Aling bahagi ng ACTS pattern ang pinakamadalas mong isinasagawa - at alin ang nangangailangan ng mas maraming atensyon?",
      "Paano pinalalalim ng panalangin ang iyong relasyon sa DIYOS?",
      "Ano ang humahadlang sa iyong buhay panalangin, at paano mo ito malalampasan?",
      "Paano mo mas maisasama nang may layunin ang panalangin sa iyong pang-araw-araw na iskedyul?"
    ],
    "prayer": "O PANGINOON, turuan mo akong manalangin. Punuin mo ang aking puso ng pagkamangha at pagmamahal para sa Iyo. Tulungan mo akong sambahin Ka, aminin ang aking mga kasalanan, magpasalamat sa Iyong biyaya, at dalhin ang lahat ng alalahanin sa harap Mo. Nawa'y maging palagian, taos-puso, at makapangyarihan ang aking mga panalangin - na nagdadala ng kaluwalhatian sa Iyong Pangalan. Amen.",
    "challenge": "PANGINOON, nangangako akong gawing pang-araw-araw na gawain at pamumuhay ang pananalangin. Tulungan Mo akong lumago nang mas malalim sa aking relasyon sa Iyo sa pamamagitan ng disiplina ng panalangin, paglakad nang may kapayapaan at kumpiyansa sa Iyong presensya. Kay HESUKRISTO na aking PANGINOON at TAGAPAGLIGTAS, Amen."
  },
  {
    "id": "consolidation-2",
    "title": "Aralin 2: Ang Kahalagahan ng Pagsasaulo ng Banal na Kasulatan at Personal na Debosyon",
    "category": "Consolidation",
    "readingTime": "7 minutong pagbasa",
    "scriptureFocus": {
      "reference": "Josue 1:8 (NIV)",
      "text": "Itago mo itong Aklat ng Kautusan sa iyong mga labi; pagbulayan mo ito araw at gabi, upang maingatan mong gawin ang lahat ng nakasulat dito. Kung magkagayo'y magiging matagumpay ka at magtatagumpay."
    },
    "objectives": [
      "Upang maunawaan na ang pagsasaulo at pagninilay-nilay sa Salita ng DIYOS ay mahahalagang gawain para sa isang lumalagong mananampalataya.",
      "Upang matutunan kung paano ang personal na debosyon ay humahantong sa espirituwal na karunungan, lakas, at tagumpay sa pamumuhay ayon sa kalooban ng DIYOS."
    ],
    "teachingSections": [
      {
        "id": "c-2-intro",
        "number": 1,
        "title": "Panimula",
        "paragraphs": [
          "Sa Josue 1:8, binigyan ng DIYOS ang Kanyang lingkod na si Josue ng isang makapangyarihang tagubilin para sa tagumpay at espirituwal na kapanahunan.",
          "Ang susi sa tagumpay sa buhay at ministeryo ay hindi matatagpuan sa personal na lakas, kundi sa patuloy na pakikipag-ugnayan sa DIYOS sa pamamagitan ng Kanyang Salita.",
          "Tinatawag ng DIYOS ang Kanyang bayan na panatilihing malapit ang Kanyang Salita - sa puso, sa labi, at sa pang-araw-araw na pagninilay - upang tayo ay mamuhay nang may pagsunod at maranasan ang Kanyang mga pagpapala.",
          "Alamin natin ang kahalagahan ng personal na debosyon at pag-alaala ng Banal na Kasulatan bilang mahahalagang bahagi ng paglapit sa PANGINOON."
        ]
      },
      {
        "id": "c-2-1",
        "number": 2,
        "title": "Ano ang Personal na Debosyon?",
        "paragraphs": [
          "\"Ngunit pagbubulay-bulayin mo iyon araw at gabi.\" - Josue 1:8 (ABTAG1978)",
          "Ang personal na debosyon ay ang espesyal na oras na sadyang inilalaan natin upang makipagkita sa DIYOS - upang manalangin, magnilay-nilay sa Kanyang Salita, at makinig sa Kanyang tinig.",
          "Para sa mga tao ng Israel, ito ay isang pang-araw-araw na disiplina ng malalim na pagninilay-nilay sa batas ng DIYOS. Para sa atin bilang mga tagasunod ni CRISTO, ang debosyon ay nangangahulugan ng pagkalugod sa Salita ng DIYOS, na hinahayaan itong humubog ating mga iniisip, emosyon, at kilos.",
          "Kapag gumugugol tayo ng oras na mag-isa kasama ang DIYOS, ang ating relasyon sa Kanya ay lalong lumalakas at ang ating mga puso ay nagiging mas naaayon sa Kanyang kalooban."
        ]
      },
      {
        "id": "c-2-2",
        "number": 3,
        "title": "Ang Kahalagahan ng Pagsasaulo ng Salita ng DIYOS",
        "paragraphs": [
          "\"Huwag mong hihiwalay sa iyong bibig ang aklat na ito ng kautusan.\" - Josue 1:8 (ABTAG)",
          "Ang pagsasaulo ng Banal na Kasulatan ay nagpapanatili sa Salita ng DIYOS na laging nasa ating abot - handang gumabay, magtama, at magpalakas ng loob anumang oras.",
          "Kapag ang Salita ng DIYOS ay nasa ating mga labi, ito ay nagiging ating wika ng pananampalataya. Tinutulungan tayo nitong labanan ang tukso, baguhin ang ating mga isipan, at magsalita ng buhay sa iba.",
          "Gaya ng sinasabi sa Awit 119:11, \"Itinago ko ang iyong salita sa aking puso upang hindi ako magkasala laban sa iyo.\"",
          "Ang pagmemorya ng Banal na Kasulatan ay hindi lamang tungkol sa pag-uulit—ito ay tungkol sa pag-alala at pagbabago. Hinuhubog nito ang paraan ng ating pag-iisip, pagsasalita, at pagtugon sa mga hamon ng buhay."
        ]
      },
      {
        "id": "c-2-3",
        "number": 4,
        "title": "Bakit Mahalagang Magnilay-nilay at Isaulo ang Salita ng DIYOS",
        "paragraphs": [
          "\"...upang maingat ninyong gawin ang lahat ng nakasulat doon.\" - Josue 1:8 (ABTAG1978)",
          "Ang meditasyon at pagsasaulo ay hindi lamang mga layunin kundi pati na rin ang mga layunin nito—ang mga ito ay humahantong sa pagsunod.",
          "Habang pinagninilayan natin ang mga katotohanan ng DIYOS at inaalala ang Kanyang mga pangako, tayo ay nasasangkapan upang mamuhay ayon sa Kanyang kalooban.",
          "Ang resulta ay kapwa espirituwal na kasaganaan at mabungang pamumuhay: \"Kung magkagayo'y ikaw ay magiging masagana at magtatagumpay.\" - Josue 1:8 (NIV)",
          "Ang ganitong uri ng tagumpay ay hindi makamundong tagumpay, kundi isang buhay na nakalulugod sa DIYOS - isang buhay na puno ng karunungan, integridad, at kapayapaan.",
          "Kapag pinupuno natin ang ating mga puso ng Salita ng DIYOS at isinasabuhay ito, nararanasan natin ang tunay na kagalakan at pagpapala."
        ]
      },
      {
        "id": "c-2-4",
        "number": 5,
        "title": "Konklusyon",
        "paragraphs": [
          "Binigyan tayo ng DIYOS ng malinaw at simpleng landas tungo sa espirituwal na lakas at tagumpay - sa pamamagitan ng pagpapanatili ng Kanyang Salita sa ating mga puso, isipan, at pang-araw-araw na gawain.",
          "Habang isinasaulo natin ang Banal na Kasulatan, binubulay-bulay ang mga katotohanan nito, at isinasabuhay ito nang may katapatan, ang ating buhay ay nababago, ang ating pananampalataya ay lumalalim, at ang ating paglakad kasama ng DIYOS ay lalong lumalakas.",
          "Ang personal na debosyon at pag-alaala ng Banal na Kasulatan ay hindi mga pasanin - ang mga ito ay mga pagpapala na ilapit tayo sa DIYOS at gawin tayong mabungang mga alagad ni KRISTO."
        ]
      }
    ],
    "reflectionQuestions": [
      "Bakit mahalagang gumugol ng personal na oras kasama ang DIYOS sa pamamagitan ng Kanyang Salita araw-araw?",
      "Paano nakakatulong ang pagsasaulo ng Banal na Kasulatan sa iyong pang-araw-araw na mga desisyon at paghihirap?",
      "Ano ang isang talata na maaari mong simulang isaulo ngayong linggo upang mapalakas ang iyong pananampalataya?",
      "Paano ka makakabuo ng isang palagiang personal na gawain sa debosyon?",
      "Anong mga pagpapala ang iyong naranasan mula sa pagninilay-nilay at pagsunod sa Salita ng DIYOS?"
    ],
    "prayer": "PANGINOONG DIYOS, salamat po sa pagbibigay Mo sa akin ng Iyong Salita bilang aking gabay at kaaliwan. Tulungan Mo akong pahalagahan ito sa aking puso, pagnilayan ito araw-araw, at mamuhay ayon sa katotohanan nito. Turuan Mo akong magalak sa Iyong presensya habang ako'y lumalago sa pananampalataya at pagsunod. Amen.",
    "challenge": "PANGINOON, ipinagkakatiwala ko ang aking sarili sa panghabambuhay na pagsasaulo ng Iyong Salita at paglalaan ng oras kasama Ka sa pang-araw-araw na debosyon. Palakasin Mo ang aking pagnanais na makilala Ka nang mas malalim at lumakad nang tapat sa Iyong Salita. Kay HESUKRISTO na aking PANGINOON at TAGAPAGLIGTAS, Amen."
  },
  {
    "id": "consolidation-3",
    "title": "Aralin 3: Si HESUS ang Ating Modelo ng Debosyon sa DIYOS",
    "category": "Consolidation",
    "readingTime": "6 na minutong pagbasa",
    "scriptureFocus": {
      "reference": "Marcos 1:35-39 (NIV)",
      "text": "Maagang-maaga pa, habang madilim pa, bumangon si HESUS, lumabas ng bahay at pumunta sa isang ilang na lugar, kung saan Siya nanalangin..."
    },
    "objectives": [
      "Upang matuto mula sa halimbawa ni HESUS ng personal na debosyon.",
      "Upang maunawaan kung kailan, saan, at paano gumugol ng oras kasama ang DIYOS, at kung paano ang pribadong pakikipag-isa ay nagbibigay-kapangyarihan sa tapat at may layuning ministeryo."
    ],
    "teachingSections": [
      {
        "id": "c-3-intro",
        "number": 1,
        "title": "Panimula",
        "paragraphs": [
          "Si HESUKRISTO ay hindi lamang ating TAGAPAGLIGTAS - Siya rin ang ating pinakadakilang halimbawa sa bawat aspeto ng buhay, kabilang ang debosyon sa DIYOS.",
          "Bagama't Siya ay Anak ng DIYOS, patuloy Siyang gumugol ng oras kasama ang Kanyang Ama sa panalangin. Ang Kanyang debosyon ay hindi opsyonal, kundi mahalaga sa Kanyang misyon.",
          "Matuto tayo mula sa kung paano ginawang makabuluhan, disiplinado, at produktibo ni HESUS ang Kanyang oras kasama ang DIYOS - at kung paano rin natin maihahalintulad ang ating espirituwal na buhay sa Kanya."
        ]
      },
      {
        "id": "c-3-1",
        "number": 2,
        "title": "Kailan Tayo Dapat Magkaroon ng Panahon kasama ang DIYOS?",
        "paragraphs": [
          "\"Maagang-maaga pa, habang madilim pa, ay bumangon si HESUS...\" - Marcos 1:35a (NIV)",
          "Sinimulan ni HESUS ang Kanyang araw sa pakikisama sa Ama.",
          "Bago ang anumang gawain, pag-uusap, o himala, humingi Siya ng lakas at patnubay sa pamamagitan ng panalangin.",
          "Itinuturo nito sa atin ang kahalagahan ng pagharap sa DIYOS sa unang bahagi ng umaga - kapag tahimik ang ating mga puso at malinaw ang ating mga isipan.",
          "Ang pagsisimula ng araw kasama ang DIYOS ang nagtatakda ng tono para sa lahat ng susunod na mangyayari."
        ]
      },
      {
        "id": "c-3-2",
        "number": 3,
        "title": "Saan Tayo Dapat Magkaroon ng Panahon kasama ang DIYOS?",
        "paragraphs": [
          "\"...umalis siya sa bahay at pumunta sa isang ilang na lugar, kung saan siya'y nanalangin.\" - Marcos 1:35b (NIV)",
          "Pinili ni HESUS ang isang tahimik at mapag-isa na lugar — walang mga pang-abala — kung saan maaari Niyang lubos na ituon ang Kanyang pansin sa pakikipag-isa sa Ama.",
          "Tayo rin ay nangangailangan ng isang \"malungkot na lugar\" - isang personal na espasyo kung saan tayo maaaring manalangin, magbasa ng Banal na Kasulatan, at makinig sa DIYOS.",
          "Lumalalim ang ating espirituwal na buhay kapag sinasadya nating lumayo sa ingay ng buhay upang makasama Siya nang mag-isa."
        ]
      },
      {
        "id": "c-3-3",
        "number": 4,
        "title": "Ano ang Dapat Nating Unahin sa Ating Panahon kasama ang DIYOS?",
        "paragraphs": [
          "\"...kung saan siya nanalangin.\" - Marcos 1:35b (NIV)",
          "Sinimulan ni HESUS ang Kanyang debosyon sa pamamagitan ng panalangin.",
          "Inihahambing ng panalangin ang ating mga puso sa puso ng DIYOS, inihahanda tayo upang maunawaan ang Kanyang Salita, at pinapalakas ang ating pananampalataya.",
          "Sa pamamagitan ng panalangin, iniiwan natin ang ating mga pasanin, isinusuko ang ating kalooban, at binubuksan ang ating mga sarili sa patnubay ng DIYOS para sa susunod na araw."
        ]
      },
      {
        "id": "c-3-4",
        "number": 5,
        "title": "Ano ang Mangyayari Pagkatapos Tayong Gumugol ng Oras kasama ang DIYOS?",
        "paragraphs": [
          "\"Nang matagpuan nila siya, sinabi nila, 'Hinahanap ka ng lahat!'\" - Marcos 1:37 (NIV)",
          "Matapos makasama ang Ama, agad na hinarap ni HESUS ang mga pangangailangan at inaasahan ng mga tao.",
          "Gayundin, pagkatapos ng ating oras na kasama ang DIYOS, madalas tayong mapaharap sa mga sitwasyon kung saan ang mga tao ay humihingi ng ating tulong, gabay, o paghihikayat.",
          "Ang ating tahimik na oras ay nagbibigay sa atin ng kakayahan upang maglingkod sa iba nang may panibagong lakas, karunungan, at habag."
        ]
      },
      {
        "id": "c-3-5",
        "number": 6,
        "title": "Paano Tayo Dapat Tumugon sa mga Inaasahan ng mga Tao?",
        "paragraphs": [
          "\"Sumagot si JESUS, 'Pumunta tayo sa ibang lugar, sa mga kalapit na nayon, upang makapangaral din ako roon.'\" - Marcos 1:38a (NIV)",
          "Hindi hinayaan ni HESUS na ang popularidad o presyur ang magdikta sa Kanyang direksyon. Nanatili Siyang nakatuon sa Kanyang banal na layunin.",
          "Ang paggugol ng oras kasama ang DIYOS ay nakakatulong sa atin na linawin ang ating mga prayoridad - ang magsabi ng \"oo\" sa kung ano ang tunay na mahalaga at \"hindi\" sa mga pang-abala.",
          "Ang tunay na debosyon ay humahantong sa pag-unawa – ang pag-alam sa kalooban ng DIYOS at pagsunod dito nang may katapatan."
        ]
      },
      {
        "id": "c-3-6",
        "number": 7,
        "title": "Ano ang Pinakamagandang Paraan para Makipagtulungan kay HESUS Pagkatapos ng Oras na Kasama ang DIYOS?",
        "paragraphs": [
          "\"Kaya't nilibot niya ang buong Galilea, na nangangaral sa kanilang mga sinagoga at nagpapalayas ng mga demonyo.\" - Marcos 1:39 (ABTAG1978)",
          "Pagkatapos ng panalangin, nagpatuloy si HESUS sa ministeryo -- ipinangangaral ang Ebanghelyo at ipinakita ang kapangyarihan ng Kaharian.",
          "Ang ating personal na debosyon ay dapat laging humantong sa pampublikong pagkilos.",
          "Kapag tayo ay nananalangin at nakikipagkita sa DIYOS, nakatatanggap tayo ng kapangyarihan upang isabuhay ang ating pananampalataya —paglilingkod sa iba, pagbabahagi ng Ebanghelyo, at pagdaig sa mga espirituwal na hamon."
        ]
      },
      {
        "id": "c-3-7",
        "number": 8,
        "title": "Konklusyon",
        "paragraphs": [
          "Ang isang disiplinadong buhay debosyonal ay nagbibigay-daan sa atin upang maglingkod sa DIYOS nang tapat at mabunga.",
          "Kapag sinusundan natin ang halimbawa ni HESUS—pagtatakda ng regular na oras, paghahanap ng tahimik na lugar, pagsisimula sa panalangin, at pamumuhay nang may layunin—lumalakas tayo sa pananampalataya at mas epektibo sa ministeryo.",
          "Ang personal na debosyon ay hindi isang tungkulin, kundi isang kaluguran - isang pang-araw-araw na pakikipagtagpo sa buhay na DIYOS na siyang naghahanda sa atin para sa bawat mabuting gawa."
        ]
      }
    ],
    "reflectionQuestions": [
      "Bakit si HESUS ang perpektong huwaran para sa personal na debosyon?",
      "Ano ang matututuhan mo mula sa Kanyang panahon, lugar, at pokus sa panalangin?",
      "Paano ka pinalalakas ng personal na debosyon para sa ministeryo o paglilingkod?",
      "Anong mga pang-abala ang kailangan mong alisin upang mapalalim ang iyong oras sa DIYOS?",
      "Paano mo maisasagawa ang huwaran ng debosyon ni HESUS simula ngayong linggo?"
    ],
    "prayer": "O PANGINOONG DIYOS na Makapangyarihan, salamat sa pagpapakita Mo sa akin ng perpektong halimbawa sa pamamagitan ng Iyong Anak na si HESUKRISTO. Turuan Mo akong gumising nang maaga, maghanap ng tahimik na lugar, at makipagkita sa Iyo araw-araw sa panalangin at pagninilay-nilay. Palakasin Mo ako upang mamuhay nang may layunin, maglingkod nang tapat, at luwalhatiin Ka sa lahat ng aking ginagawa. Amen.",
    "challenge": "O PANGINOON kong DIYOS na Makapangyarihan, tulungan Mo po akong magkaroon ng disiplina at personal na debosyon sa Iyo araw-araw. Kay HESUKRISTO na aking PANGINOON at TAGAPAGLIGTAS, Amen."
  },
  {
    "id": "consolidation-4",
    "title": "Aralin 4: Ang Paraan ng Debosyonal ng Scripture Union",
    "category": "Consolidation",
    "readingTime": "7 minutong pagbasa",
    "scriptureFocus": {
      "reference": "1 Juan 1:1-10 (NIV)",
      "text": "Yaong buhat pa sa pasimula, na aming narinig, na aming nakita ng aming mga mata, na aming tiningnan, at nahawakan ng aming mga kamay - ito ang aming ipahayag ang tungkol sa Salita ng buhay..."
    },
    "objectives": [
      "Upang matutunan at mailapat ang Paraan ng Debosyonal ng Scripture Union - isang simple, nakabalangkas, at ginagabayan ng ESPIRITU na pamamaraan sa personal na pag-aaral ng Bibliya.",
      "Upang tulungan ang mga mananampalataya na makinig sa Salita ng DIYOS, tumugon nang may pagsunod, at lumago sa pananampalataya."
    ],
    "teachingSections": [
      {
        "id": "c-4-intro",
        "number": 1,
        "title": "Panimula",
        "paragraphs": [
          "Ang Paraan ng Debosyon ng Scripture Union ay isang nasubok na ng panahon at inspirasyon ng ESPIRITU upang gawing makabuluhan at mabunga ang iyong personal na debosyon.",
          "Sa bawat pagkakataong nakikipagkita ka sa DIYOS, mayroon na Siyang inihandang salita, pangako, at mensahe para sa iyo.",
          "Sa pamamagitan ng pamamaraang ito, maaari kang makinig nang mabuti, magnilay-nilay nang malalim, at tumugon nang tapat. Ito ay isang gabay - hindi isang pormula - upang tulungan kang lumago ang iyong pagmamahal sa Salita ng DIYOS at maisabuhay ang mga katotohanan nito sa pang-araw-araw na buhay."
        ]
      },
      {
        "id": "c-4-1",
        "number": 2,
        "title": "Mga Unang Hakbang ng Debosyon",
        "paragraphs": [
          "Bago ka magsimulang magbasa, maglaan ng ilang sandali para manalangin—sambahin ang DIYOS, magpasalamat, at humingi ng pang-unawa.",
          "Pagkatapos, buksan ang iyong Bibliya sa nakatalagang sipi para sa araw na ito. Halimbawa, gamitin natin ang 1 Juan 1:1-10 bilang iyong debosyonal na sipi.",
          "Ang iyong layunin ay hindi ang pagmamadali sa pagbasa ng teksto, kundi ang tuklasin kung ano ang personal na itinuturo sa iyo ng DIYOS."
        ]
      },
      {
        "id": "c-4-2",
        "number": 3,
        "title": "1. May mga Pangakong Maaangkin?",
        "paragraphs": [
          "Hanapin ang ipinangako ng DIYOS sa Kanyang bayan - ang Kanyang katapatan, biyaya, at mga pagpapala.",
          "Mga halimbawa mula sa 1 Juan 1:1-10: May buhay na walang hanggan kasama ang Ama sa Langit (talata 2). Dinadala tayo ng PANGINOON sa masayang pakikisama sa Kanyang sarili at sa Kanyang bayan (talata 3-4). Kung tayo ay lalakad sa liwanag, ang dugo ni HESUS ay naglilinis sa atin mula sa lahat ng kasalanan (talata 7). Kung ipinahahayag natin ang ating mga kasalanan, ang DIYOS ay tapat at makatarungan na magpapatawad at lilinisin tayo (talata 9).",
          "Punung-puwang na aral: Tinitiyak sa atin ng mga pangako ng DIYOS ang kapatawaran, paglilinis, at masayang pagsasamahan sa pamamagitan ni CRISTO."
        ]
      },
      {
        "id": "c-4-3",
        "number": 4,
        "title": "2. May mga Utos ba na Dapat Sundin?",
        "paragraphs": [
          "Tukuyin ang mga tagubilin o direksyon na inaasahan ng DIYOS na susundin ng Kanyang mga anak.",
          "Mga Halimbawa: Sundan si HESUS at lumakad sa katotohanan (talata 6). Huwag mamuhay sa kadiliman (talata 6). Ipahayag ang mga kasalanan nang palagian (talata 9). Mamuhay bilang mga anak ng liwanag (talata 7).",
          "Pustahan: Ang pagsunod sa mga utos ng DIYOS ay nagpapatunay ng ating pakikisama sa Kanya."
        ]
      },
      {
        "id": "c-4-4",
        "number": 5,
        "title": "3. May mga Halimbawa ba na Dapat Sundin?",
        "paragraphs": [
          "Obserbahan ang maka-DIYOS na pag-uugali o mga saloobin na ipinakita ng iba.",
          "Mga Halimbawa: Matapang na ibinahagi ni Apostol Juan ang kaniyang mismong karanasan kay HESUS (mga talata 1-4). Nagpakita si Juan ng katapatan sa pagpapahayag ng mensahe ng liwanag (talata 5-7).",
          "Pustahan: Maging matapang sa pagbabahagi ng iyong patotoo at paglakad sa liwanag ng DIYOS."
        ]
      },
      {
        "id": "c-4-5",
        "number": 6,
        "title": "4. May mga Babala ba na Dapat Pakinggan?",
        "paragraphs": [
          "Bigyang-pansin ang mga babala o panganib na ipinapahayag ng DIYOS sa Kanyang Salita.",
          "Mga Halimbawa: Ang pag-angkin na nakikisama kay KRISTO habang lumalakad sa kadiliman ay mapanlinlang (talata 6). Ang pagsasabi na wala tayong kasalanan ay ginagawa tayong mga sinungaling at tinatanggihan ang katotohanan ng DIYOS (mga talata 8-10).",
          "Pustahan: Mag-ingat sa panlilinlang sa sarili at espirituwal na pagmamataas; mamuhay nang tapat sa harap ng DIYOS."
        ]
      },
      {
        "id": "c-4-6",
        "number": 7,
        "title": "5. May mga Kasalanan ba na Dapat Iwasan o Ipagtapat?",
        "paragraphs": [
          "Maging tapat sa harap ng DIYOS tungkol sa anumang kasalanang ipinapakita ng sipi.",
          "Mga Halimbawa: Iwasan ang pamumuhay sa kadiliman (talata 6). Magsisi mula sa pagsisinungaling at pagkukunwari (talata 6). Ipagtapat ang mga kasalanang sumisira sa iyong pakikisama sa DIYOS (talata 9).",
          "Punung-puwang: Sinisira ng kasalanan ang pagsasamahan, ngunit ang pag-amin ay nagpapanumbalik nito sa pamamagitan ng paglilinis ni KRISTO dugo."
        ]
      },
      {
        "id": "c-4-7",
        "number": 8,
        "title": "6. Mga Karagdagang Tanong sa Pagninilay",
        "paragraphs": [
          "Magtanong ng mga tanong na makakatulong sa iyo na mas maunawaan ang sipi:",
          "Ano ang itinuturo sa akin ng siping ito tungkol sa DIYOS Ama, Anak, at BANAL NA ESPIRITU? (mga talata 1-4)",
          "Ano ang ipinakikita nito tungkol sa buhay at liwanag kay CRISTO? (talata 6-7)",
          "Pustahan: Tinatawag tayo ng DIYOS na lumakad sa Kanyang liwanag at mamuhay nang may pakikisama sa Kanya at sa iba."
        ]
      },
      {
        "id": "c-4-8",
        "number": 9,
        "title": "Konklusyon",
        "paragraphs": [
          "Ang pamumuhay bilang isang tunay na alagad ay nangangahulugan ng paglago sa Salita ng DIYOS araw-araw.",
          "Sa pamamagitan ng paraang debosyonal na ito, matutuklasan mo ang mga pangako ng DIYOS, matututo kang sumunod, iiwasan ang kasalanan, at palalalimin ang iyong relasyon sa Kanya.",
          "Habang ikaw ay nagmumuni-muni, nagsasaulo, at nagsasabuhay ng Kanyang Salita, ang iyong kagalakan ay magiging ganap - at ang iyong buhay ay magpapakita ng Kanyang liwanag."
        ]
      }
    ],
    "reflectionQuestions": [
      "Bakit mahalaga ang personal at maingat na debosyon sa Salita ng DIYOS?",
      "Paano nakakatulong ang pamamaraang ito ng debosyonal para mas maunawaan mo ang Banal na Kasulatan?",
      "Alin sa limang hakbang (mga pangako, utos, halimbawa, babala, kasalanan) ang higit na nakatutulong sa iyo sa pagsasabuhay ng Salita ng DIYOS?",
      "Paano mo gagawing palagiang bahagi ng iyong buhay ang pang-araw-araw na debosyon?"
    ],
    "prayer": "PANGINOONG DIYOS naming Makapangyarihan, salamat po sa pagbibigay Mo sa akin ng Iyong Salita bilang gabay sa buhay. Tulungan Mo akong pag-aralan ito araw-araw, pagnilayan ang mga katotohanan nito, at ilapat ang mga ito nang may katapatan. Turuan Mo akong makinig sa Iyong tinig sa pamamagitan ng Banal na Kasulatan at sundin ito nang may kagalakan. Amen.",
    "challenge": "PANGINOON, ipinagkakatiwala ko po ang aking sarili na pag-aralan ang Iyong Salita araw-araw. Tulungan Mo po akong disiplinahin ang aking sarili sa aking buhay debosyonal, na sinusunod ang mga hakbang na naglalapit sa akin sa Iyo. Kay HESUKRISTO na aking PANGINOON at TAGAPAGLIGTAS, Amen."
  },
  {
    "id": "consolidation-5",
    "title": "Aralin 5: Ang Araw ng Iyong Pahinga",
    "category": "Consolidation",
    "readingTime": "7 minutong pagbasa",
    "scriptureFocus": {
      "reference": "Hebreo 4:1 (NIV)",
      "text": "Kaya nga, yamang nananatili ang pangako ng pagpasok sa kaniyang kapahingahan, mag-ingat tayo, baka sinoman sa inyo ay matagpuang hindi nakaabot dito."
    },
    "objectives": [
      "Upang maunawaan ang kahulugan at kahalagahan ng tunay na pahinga - kapwa espirituwal at pisikal.",
      "Upang tanggapin ang mabiyayang paanyaya ng DIYOS para sa Kanyang bayan upang tamasahin ang pakikisama sa Kanya, panibagong lakas, at ang kagalakan ng pagsamba."
    ],
    "teachingSections": [
      {
        "id": "c-5-intro",
        "number": 1,
        "title": "Panimula",
        "paragraphs": [
          "Ano ang ibig sabihin ng pahinga? Bakit mahalaga ang Araw ng Pahinga?",
          "Sa ating abala at mabibigat na buhay, tinatawag tayo ng DIYOS para sa isang uri ng kapahingahan na higit pa sa pisikal na pagtulog.",
          "Ito ay isang espirituwal na kapahingahan - isang pamamahinga sa Kanyang presensya, sa Kanyang mga pangako, at sa Kanyang natapos na gawain sa pamamagitan ni HESUKRISTO.",
          "Alamin natin mula sa Banal na Kasulatan kung ano talaga ang kahulugan ng \"Araw ng Pahinga\" na ito at kung paano natin ito mapapamuhay araw-araw at linggu-linggo."
        ]
      },
      {
        "id": "c-5-1",
        "number": 2,
        "title": "Naghanda ang DIYOS ng Pangalawang Kapahingahan para sa Atin",
        "paragraphs": [
          "\"Kaya nga, may natitira pang isang kapahingahan sa araw ng Sabbath, para sa bayan ng DIYOS.\" - Hebreo 4:9 (ABTAG1978)",
          "Ang Kapahingahan ay Nangangahulugan ng Pananatili sa Presensya ng DIYOS: \"Kaya nga, pagsikapan nating makapasok sa kapahingahang iyon.\" - Hebreo 4:11 (NIV). Ang tunay na kapahingahan ay matatagpuan lamang sa pakikisama sa DIYOS - kapag ang ating mga kaluluwa ay nakakatagpo ng kapayapaan at seguridad sa Kanyang presensya.",
          "Itinalaga ng DIYOS ang Unang Araw ng Pahinga: Ang unang \"pahinga\" ay hinubog ng DIYOS mismo batay sa paglikha - na nagtuturo sa atin na ang pamamahinga ay kapwa banal at mahalaga.",
          "Nangangako ang DIYOS ng Isang Kinabukasan, Walang Hanggang Kapahingahan: Higit pa sa lingguhang Sabbath ay nakasalalay ang isang walang hanggang kapahingahan - ang walang hanggang kapayapaan na naghihintay sa mga nagtitiwala at sumusunod kay CRISTO.",
          "Susing Katotohanan: Ang kapahingahan ay kapwa ngayon (espirituwal na kapahingahan kay CRISTO) at hindi pa (walang hanggang kapahingahan kasama Niya sa kaluwalhatian)."
        ]
      },
      {
        "id": "c-5-2",
        "number": 3,
        "title": "Ang Salita ng DIYOS ay Nagdadala ng Babala at Pangako ng Kapahingahan",
        "paragraphs": [
          "\"Sapagkat ipinangaral din sa atin ang mabuting balita, gaya nila; ngunit ang mensaheng kanilang narinig ay walang pakinabang sa kanila, dahil hindi sila nakibahagi sa pananampalataya ng mga nagsisunod.\" - Hebreo 4:2 (ABTAG1978)",
          "Dapat Tayong Magtiyaga sa Pangako ng DIYOS: Dapat tayong patuloy na magtiwala sa Kanyang pangako ng kapahingahan, na mahigpit na kumakapit sa pananampalataya sa Kanyang Salita.",
          "Dapat Nating Bantayan ang Ating mga Sarili Mula sa Kawalan ng Pananampalataya: Binabalaan tayo ng DIYOS na huwag mahulog sa espirituwal na katamaran o kawalan ng paniniwala na siyang mag-aalis sa atin ng kapayapaan.",
          "Dapat Tayong Maniwala sa Mabuting Balitang Naririnig Natin: Ang tunay na kapahingahan ay nagmumula sa pananampalataya - ang paniniwala at pagtanggap sa Ebanghelyo na nagbabalik sa atin sa DIYOS.",
          "Susing Katotohanan: Ang pananampalataya sa Ebanghelyo ang pintuan tungo sa tunay na kapahingahan."
        ]
      },
      {
        "id": "c-5-3",
        "number": 4,
        "title": "Binayaran na ni HESUKRISTO ang Halaga para sa Iyong Pahinga",
        "paragraphs": [
          "\"Sapagkat si CRISTO man ay nagdusa nang minsanan dahil sa mga kasalanan, ang matuwid dahil sa mga di-matuwid, upang kayo'y madala sa DIYOS.\" - 1 Pedro 3:18a (ABTAG1978)",
          "Tayong Lahat ay Nagkasala at Hindi Nakaabot sa Kaluwalhatian ng DIYOS (Mga Taga-Roma 3:23) - Nawala ang ating kapahingahan dahil sa kasalanan.",
          "Ang Kasalanan ang Naghiwalay sa Atin sa DIYOS (Mga Taga-Roma 6:23) - Ang kabayaran ng kasalanan ay kamatayan, ang pagkahiwalay sa kapahingahan ng DIYOS.",
          "Ang Pag-ibig at Sakripisyo ng DIYOS ang Nagbigay ng Daan para sa Ating Kapahingahan (Juan 3:16).",
          "Si HESUS ang Perpektong Hain na Nagtitiyak ng Ating Kapahingahan. Pinasan ni HESUS ang ating mga kasalanan sa krus upang tayo ngayon ay makapagpahinga sa Kanyang biyaya, pinatawad at nakipagkasundo sa DIYOS.",
          "Susing Katotohanan: Ang krus ang tulay patungo sa ating walang hanggang kapahingahan."
        ]
      },
      {
        "id": "c-5-4",
        "number": 5,
        "title": "Nagtakda ang DIYOS ng Araw ng Pahinga para sa Lahat ng Kanyang Bayan",
        "paragraphs": [
          "Nagpahinga ang DIYOS sa Ikapitong Araw: \"Nang ikapitong araw ay natapos na ng DIYOS ang gawang kanyang ginawa; kaya't sa ikapitong araw ay nagpahinga siya sa lahat ng kanyang gawa.\" - Genesis 2:2 (NIV)",
          "Inutusan ng DIYOS ang Kanyang Bayan na Mangilin ng Araw ng Pahinga: \"Alalahanin mo ang araw ng Sabbath upang ipangilin ito.\" - Exodo 20:8 (NIV). Ang pamamahinga ay hindi opsyonal - ito ay mapagmahal na utos ng DIYOS para sa ating ikabubuti.",
          "Si HESUS ang PANGINOON ng Sabbath: \"Sapagkat ang Anak ng Tao ay PANGINOON ng Sabbath.\" - Mateo 12:8 (NIV). Tinupad ni HESUS ang batas ng Sabbath - ngayon, hindi tayo nagpapahinga sa isang araw, kundi sa Kanya. Iginagalang natin ang Araw ng PANGINOON (Linggo) bilang pagdiriwang ng Kanyang muling pagkabuhay at ng ating bagong buhay sa Kanya.",
          "Ang Sinaunang Simbahan ay Nagsasagawa ng Pagsamba sa Araw ng PANGINOON: \"Tuwing Sabbath ay nangangatuwiran siya sa sinagoga, at sinisikap niyang hikayatin ang mga Judio at mga Griyego.\" - Mga Gawa 18:4 (NIV)",
          "Susing Katotohanan: Ang pahinga ay isang akto ng pagsamba - isang ritmo ng paggawa at pagpapanibago na nakasentro kay KRISTO."
        ]
      },
      {
        "id": "c-5-5",
        "number": 6,
        "title": "Konklusyon",
        "paragraphs": [
          "Ang pagdiriwang ng Araw ng Pahinga ay nakaugat sa pamamahinga sa banal na presensya ng DIYOS - ang DIYOS ding iyon na lumikha sa atin ayon sa Kanyang wangis at tumubos sa atin sa pamamagitan ng Kanyang Anak.",
          "Ang magpahinga sa DIYOS ay ang magtiwala sa Kanyang natapos na gawain, sambahin Siya kasama ng Kanyang mga tao, at ihanda ang ating mga puso para sa darating na walang hanggang kapahingahan."
        ]
      }
    ],
    "reflectionQuestions": [
      "Paano mo personal na malalaman at mararanasan ang tunay na kapahingahan sa piling ng DIYOS?",
      "Paano naapektuhan ng Mabuting Balita ni HESUS ang iyong kakayahang magpahinga sa Kanya?",
      "Bakit mahalagang maglaan ng isang lingguhang araw ng pahinga at pagsamba?",
      "Sa anong mga paraan mo kailangang mas magtiwala sa DIYOS sa iyong oras, trabaho, at pahinga?"
    ],
    "prayer": "Makapangyarihang DIYOS, aking Lumikha at Manunubos, ipinagkakatiwala ko ang aking sarili sa pang-araw-araw na pagsamba at lingguhang pamamahinga sa Iyo. Tulungan mo akong makatagpo ng kapayapaan sa Iyong presensya at pagpapanibago sa Iyong Salita. Nawa'y ang aking pamamahinga ay maging isang gawa ng pagmamahal at pagsunod sa Iyo. Kay HESUKRISTO na aking PANGINOON at TAGAPAGLIGTAS, Amen.",
    "challenge": "PANGINOON, iniaalay ko ang aking sarili sa pagpupugay sa Iyo sa pamamagitan ng pang-araw-araw na pagsamba at lingguhang pamamahinga kasama ang Iyong mga tao sa simbahan. Tulungan Mo akong mamuhay nang may kapanatagan sa Iyong biyaya. Kay HESUKRISTO na aking PANGINOON at TAGAPAGLIGTAS, Amen."
  },
  {
    "id": "consolidation-6",
    "title": "Aralin 6: Ang Kahulugan at Kahalagahan ng Kristiyanong Pagsasama-sama",
    "category": "Consolidation",
    "readingTime": "7 minutong pagbasa",
    "scriptureFocus": {
      "reference": "Hebreo 10:24-25 (NIV)",
      "text": "At isaalang-alang natin kung paano natin maaanyayahan ang isa't isa sa pag-ibig at mabubuting gawa, na huwag nating pabayaan ang ating pagtitipon, gaya ng nakagawian ng ilan..."
    },
    "objectives": [
      "Upang maunawaan ang kahulugan ng tunay na Kristiyanong pakikisama at kung bakit ito mahalaga para sa espirituwal na paglago.",
      "Upang matutunan kung paano aktibong makikibahagi ang mga mananampalataya sa pagpapatibay ng isa't isa sa pag-ibig, pananampalataya, at pag-asa habang hinihintay nila ang pagbabalik ng PANGINOON."
    ],
    "teachingSections": [
      {
        "id": "c-6-intro",
        "number": 1,
        "title": "Panimula",
        "paragraphs": [
          "Ano ang Kristiyanong pakikisama?",
          "Ang Kristiyanong pagsasamahan ay ang ibinahaging buhay ng mga mananampalataya na pinag-isa kay HESUKRISTO at pinananahanan ng BANAL NA ESPIRITU. Hindi lamang ito basta pagtitipon—ito ay espirituwal na pakikipag-isa, isang banal na pakikipagtulungan sa pananampalataya, pag-ibig, at misyon.",
          "Sa pakikisama, pinalalakas natin ang isa't isa, lumalago sa biyaya, at ipinapakita ang pagkakaisa ng Katawan ni KRISTO.",
          "Suriin natin kung bakit napakahalaga at kahalaga ng Kristiyanong pagsasamahan sa ating paglakad kasama ng DIYOS."
        ]
      },
      {
        "id": "c-6-1",
        "number": 2,
        "title": "Sa Pakikisama, Naghihikayat Tayo sa Isa't Isa",
        "paragraphs": [
          "\"Pag-isipan natin kung paano natin mapapasigla ang isa't isa...\" - Hebreo 10:24 (NIV)",
          "Ang salitang \"mag-udyok\" ay nangangahulugang pukawin, himukin pasulong, o mag-udyok tungo sa paglago.",
          "Ang pakikisama ay hindi tungkol sa pasibong pagdalo sa mga pagpupulong - ito ay tungkol sa aktibong pagpapalakas ng loob sa isa't isa sa pananampalataya at mabubuting gawa.",
          "Nagsasama-sama tayo hindi lamang para tumanggap, kundi para magbigay - upang magpahayag ng buhay, magbahagi ng mga patotoo, at palakasin ang isa't isa sa PANGINOON.",
          "Susing Katotohanan: Ang pagsasamahan ay kung saan ang mga mananampalataya ay nagtatatagan ng isa't isa - hindi nagsisiraan."
        ]
      },
      {
        "id": "c-6-2",
        "number": 3,
        "title": "Naghihikayat Tayo sa Isa't Isa Tungkol sa Pag-ibig at Mabubuting Gawa",
        "paragraphs": [
          "\"...sa pag-ibig at sa mabubuting gawa.\" - Hebreo 10:24 (NIV)",
          "Ang pag-ibig at mabubuting gawa ang nakikitang bunga ng tunay na pakikisama.",
          "Kapag ang mga mananampalataya ay sama-samang lumalakad kay CRISTO, binibigyang-inspirasyon nila ang isa't isa na magmahal nang mas malalim at maglingkod nang mas tapat.",
          "Ang tunay na Kristiyanong pakikisama ay nagpapaalala sa atin na ang ating pananampalataya ay dapat maging aktibo - pagpapakita ng habag, paglilingkod sa iba, at paggawa ng mabuti tulad ng ginawa ni KRISTO.",
          "Susing Katotohanan: Ang pakikisama ay tumutulong sa atin na isabuhay ang pag-ibig ni KRISTO sa nasasalat at pang-araw-araw na paraan mga paraan."
        ]
      },
      {
        "id": "c-6-3",
        "number": 4,
        "title": "Naghihikayat Tayo sa Isa't Isa sa Pamamagitan ng Karaniwang Pakikisama",
        "paragraphs": [
          "\"...na huwag nating pabayaan ang ating mga pagtitipon, gaya ng nakagawian ng ilan...\" - Hebreo 10:25 (NIV)",
          "Mahalaga ang pagiging matatag. Ang isang Kristiyanong naghihiwalay sa kanyang sarili ay nagpapahina sa kanyang pananampalataya. Kung paanong ang mga baga ay nawawalan ng init kapag inihihiwalay sa apoy, ang mga mananampalataya ay nanlalamig kapag malayo sa pakikisama.",
          "Dinisenyo tayo ng DIYOS para sa komunidad, hindi para sa kalayaan.",
          "Ang regular na pagtitipon sa pagsamba, panalangin, at pag-aaral ay nagpapanatiling buhay ang ating pananampalataya at nag-iinit ang ating mga puso sa DIYOS at sa iba.",
          "Susing Katotohanan: Ang pakikisama ay hindi isang opsyon para sa isang Kristiyano - ito ay isang banal na pangangailangan para sa espirituwal na pagtitiis."
        ]
      },
      {
        "id": "c-6-4",
        "number": 5,
        "title": "Naghihikayat Tayo sa Isa't Isa Habang Hinihintay Natin ang Pagbabalik ng PANGINOON",
        "paragraphs": [
          "\"...kundi mangagpalakasan ng loob ang isa't isa; at lalo na't nakikita ninyong nalalapit na ang Araw.\" - Hebreo 10:25 (ABTAG1978)",
          "Ang Kristiyanong pakikisama ay hindi lamang tungkol sa kasalukuyan; ito ay tungkol sa paghahanda para sa walang hanggan.",
          "Nagpapatibayan tayo ng loob sa isa't isa nang may pag-asa, ipinapaalala sa isa't isa na si KRISTO ay muling darating.",
          "Habang dumidilim ang mga araw sa mundo, kailangang magkasamang tumayo ang mga mananampalataya - manalangin, sumamba, at magpatuloy hanggang sa pagbabalik ng PANGINOON.",
          "Susing Katotohanan: Ang pakikisama ay nagtuturo sa atin patungo sa pinagpalang pag-asa - ang pagbabalik ni HESUKRISTO."
        ]
      },
      {
        "id": "c-6-5",
        "number": 6,
        "title": "Konklusyon",
        "paragraphs": [
          "Ang tunay na Kristiyanong pakikisama ay kaloob ng DIYOS para sa ating espirituwal na paglago at kalakasan.",
          "Sa pamamagitan nito, pinalalakasan natin ang loob ng isa't isa sa pag-ibig at mabubuting gawa, pinapanatili ang katatagan sa pananampalataya, at masayang naghahanda para sa pagdating ni KRISTO.",
          "Bilang mga miyembro ng iisang katawan, mangako tayo na regular na magtipon, magtulungan, at sama-samang lumago sa biyaya."
        ]
      }
    ],
    "reflectionQuestions": [
      "Paano mo bibigyang-kahulugan ang tunay na Kristiyanong pakikisama?",
      "Bakit mahalaga para sa mga mananampalataya na regular na magtipon?",
      "Sa anong mga paraan mo personal na mapapatibay ang loob ng iba sa pag-ibig at mabubuting gawa?",
      "Ano ang ilang hadlang na pumipigil sa mga tao sa pakikisama, at paano ito malalampasan?",
      "Paano tayo inihahanda ng Kristiyanong pakikisama para sa pagdating ng PANGINOON?"
    ],
    "prayer": "PANGINOONG DIYOS, salamat po sa kaloob ng pakikisama sa Katawan ni KRISTO. Salamat po sa mga kapatid na nagpapalakas, naghihikayat, at lumalakad kasama ko sa pananampalataya. Tulungan Mo akong maging tapat sa pakikipagkita sa kanila, paglilingkod nang may pagmamahal, at pagpapatibay sa iba sa Iyong biyaya. Amen.",
    "challenge": "Dahil naunawaan ko ang kahulugan at kahalagahan ng Kristiyanong pakikisama, nangangako akong tapat na sumama sa aking mga kapatid tuwing Linggo at sa aking maliit na grupo bawat linggo. Sama-sama tayong lalago sa pag-ibig, mabubuting gawa, at masayang pag-asam sa Iyong pagbabalik. Kay HESUKRISTO na aking PANGINOON at TAGAPAGLIGTAS, Amen."
  },
  {
    "id": "consolidation-7",
    "title": "Aralin 7: Ang Malalim na Kahalagahan ng Bautismo sa Tubig",
    "category": "Consolidation",
    "readingTime": "7 minutong pagbasa",
    "scriptureFocus": {
      "reference": "Mga Taga-Roma 6:1-4 (NIV)",
      "text": "Ano nga ang ating sasabihin? Magpapatuloy ba tayo sa pagkakasala upang ang biyaya ay lumago? Hinding-hindi! Tayo'y mga patay na sa kasalanan; paano pa tayo mabubuhay doon?"
    },
    "objectives": [
      "Upang maunawaan ang tunay na kahulugan at espirituwal na kahalagahan ng bautismo sa tubig.",
      "Upang makita ang binyag bilang isang pampublikong patotoo ng ating pakikiisa kay KRISTO sa Kanyang kamatayan, paglilibing, at muling pagkabuhay, at isang tawag upang mamuhay ng isang bagong buhay ng kabanalan at pagsunod sa DIYOS."
    ],
    "teachingSections": [
      {
        "id": "c-7-intro",
        "number": 1,
        "title": "Panimula",
        "paragraphs": [
          "Ano ang bautismo sa tubig? Bakit ito mahalaga sa bawat tunay na mananampalataya kay CRISTO?",
          "Ang bautismo sa tubig ay isang panlabas na pagpapahayag ng panloob na pagbabago. Ito ay isang pampublikong pagpapahayag na tayo ay kaisa ni KRISTO - na ang ating lumang buhay ay namatay na, tayo ay inilibing na kasama Niya, at tayo ngayon ay namumuhay ng isang bagong buhay sa pamamagitan ng Kanyang kapangyarihan.",
          "Sa pamamagitan ng binyag, ipinapahayag natin sa mundo na tayo ay kay HESUS, at ang ating mga puso, kalooban, at layunin ay isinusuko sa Kanya."
        ]
      },
      {
        "id": "c-7-1",
        "number": 2,
        "title": "Ang Ating Pagkakaisa kay KRISTO ay Nangangahulugan ng Kamatayan sa Kasalanan",
        "paragraphs": [
          "\"Ano nga ang ating sasabihin? Magpapatuloy ba tayo sa pagkakasala upang ang biyaya ay lumago? Hinding-hindi! Tayo'y mga patay na sa kasalanan; paano pa tayo mabubuhay doon?\" - Mga Taga-Roma 6:1-2 (ABTAG)",
          "Kapag tayo ay kaisa ni KRISTO sa pamamagitan ng pananampalataya, tayo ay nakikibahagi sa Kanyang kamatayan laban sa kasalanan. Nangangahulugan ito na ang kasalanan ay hindi na naghahari sa ating buhay - tayo ay malaya na mula sa kapangyarihan at parusa nito.",
          "Ipinapaalala ni apostol Pablo sa mga mananampalataya na ang biyaya ay hindi isang lisensya para magkasala, kundi ang kapangyarihang mabuhay nang may tagumpay laban sa kasalanan.",
          "Ang pagiging \"patay na sa kasalanan\" ay nangangahulugan na ang ating lumang pamumuhay ay natapos na, at tayo ngayon ay nabubuhay upang magbigay-lugod sa DIYOS.",
          "Susing Katotohanan: Ang bautismo sa tubig ay nagpapatunay na tayo ay tumalikod na sa kasalanan at lubos na sumuko kay KRISTO."
        ]
      },
      {
        "id": "c-7-2",
        "number": 3,
        "title": "Ang Binyag sa Tubig ay Sumisimbolo sa Ating Pakikipag-isa kay KRISTO sa Kanyang Kamatayan",
        "paragraphs": [
          "\"Hindi ba ninyo nalalaman na tayong lahat na nabautismuhan kay CRISTO JESUS ay nabautismuhan sa kaniyang kamatayan?\" - Mga Taga-Roma 6:3 (MBB)",
          "Ang binyag ay higit pa sa isang seremonya—ito ay simbolo ng espirituwal na katotohanan.",
          "Kapag tayo ay inilulubog sa tubig, ito ay sumisimbolo sa ating pakikilahok sa kamatayan ni KRISTO noong krus.",
          "Kung paanong si HESUS ay namatay para sa kasalanan, tayo rin ay namamatay sa ating lumang sarili at makasalanang mga gawain. Ang akto ng paglulubog sa tubig ay hayagang nagpapahayag na tinalikuran na natin ang ating nakaraan at kabilang na kay KRISTO.",
          "Susing Katotohanan: Sa binyag, pinatototohanan natin na ang ating lumang buhay ay ipinako na kasama ni CRISTO."
        ]
      },
      {
        "id": "c-7-3",
        "number": 4,
        "title": "Ang Binyag sa Tubig ay Sumisimbolo sa Ating Pakikipag-isa kay KRISTO sa Kanyang Paglilibing",
        "paragraphs": [
          "\"Kaya't tayo'y inilibing na kasama niya sa pamamagitan ng bautismo sa kamatayan: upang kung paanong si CRISTO ay muling binuhay mula sa mga patay sa pamamagitan ng kaluwalhatian ng Ama, tayo rin naman ay mamuhay sa isang bagong buhay.\" - Mga Taga-Roma 6:4 (ABTAG)",
          "Ang paglubog sa tubig ay sumisimbolo sa paglilibing -- ang pagtatapos ng ating lumang buhay.",
          "Ipinapakita nito na tayo ay lubos na nakiisa sa kamatayan ni KRISTO at ngayon ay hiwalay na sa ating nakaraang buhay ng kasalanan.",
          "Kung paanong si KRISTO ay inilibing at pagkatapos ay muling binuhay sa kaluwalhatian, gayundin tayo ay inilibing sa kasalanan at muling binuhay upang lumakad sa panibagong buhay.",
          "Susing Katotohanan: Ipinapahayag ng bautismo na ang ating lumang makasalanang pagkatao ay wala na, nalibing na, at hindi na tumutukoy kung sino tayo."
        ]
      },
      {
        "id": "c-7-4",
        "number": 5,
        "title": "Ang Binyag sa Tubig ay Sumisimbolo sa Ating Pakikipag-isa kay KRISTO sa Kanyang Pagkabuhay na Mag-uli",
        "paragraphs": [
          "\"Sapagkat kung tayo'y naging kaisa niya sa isang kamatayang tulad ng sa kanya, tiyak na tayo'y magiging kaisa rin niya sa isang muling pagkabuhay na tulad ng sa kanya.\" - Mga Taga-Roma 6:5 (ABTAG1978)",
          "Kapag umahon tayo sa tubig, sinisimbolo natin ang muling pagkabuhay - ang bagong buhay na ibinigay sa atin ng DIYOS kay CRISTO.",
          "Ito ang buhay ng espirituwal na pagpapanibago at kapangyarihan, kung saan tayo ay nabubuhay hindi para sa ating sarili kundi para sa kaluwalhatian ng DIYOS.",
          "Ang buhay na muling pagkabuhay ay nangangahulugan ng pang-araw-araw na paglalakad nang may pagsunod, tagumpay, at kagalakan, batid na mayroon tayo nito ay binuhay kay CRISTO.",
          "Susing Katotohanan: Ipinapaalala sa atin ng bautismo na tayo ay binuhay na kasama ni KRISTO upang mamuhay ng isang bagong buhay na puno ng Kanyang presensya at layunin."
        ]
      },
      {
        "id": "c-7-5",
        "number": 6,
        "title": "Konklusyon",
        "paragraphs": [
          "Ang bautismo sa tubig ay isang makapangyarihang patotoo ng ating kaligtasan at pagbabago.",
          "Sumisimbolo ito ng ating pagkakaisa kay KRISTO sa Kanyang kamatayan, paglilibing, at muling pagkabuhay - at ipinapahayag sa mundo na tayo ngayon ay nabubuhay para sa Kanya.",
          "Ang pagpapabinyag ay hindi lamang pagsunod sa isang ordenansa ng pananampalataya, kundi ang pamumuhay na sumasalamin sa kahulugan nito: patay sa kasalanan, buhay sa DIYOS."
        ]
      }
    ],
    "reflectionQuestions": [
      "Ano ang ibig sabihin ng maging kaisa ni KRISTO sa Kanyang kamatayan, paglilibing, at pagkabuhay na mag-uli?",
      "Paano sumisimbolo ang bautismo sa tubig sa iyong bagong buhay kay CRISTO?",
      "Sa iyong palagay, bakit iniuutos ng DIYOS sa mga mananampalataya na hayagang ipahayag ang kanilang pananampalataya sa pamamagitan ng binyag?",
      "Paano ka patuloy na mamumuhay bilang isang taong \"namatay na sa kasalanan at nabubuhay para sa DIYOS\"?"
    ],
    "prayer": "PANGINOONG DIYOS na Makapangyarihan, salamat po sa pagliligtas sa akin sa pamamagitan ng kamatayan at muling pagkabuhay ni HESUKRISTO. Salamat po sa simbolo ng binyag na nagpapaalala sa akin ng aking bagong buhay sa Iyo. Tulungan Mo akong mamuhay araw-araw nang may pagsunod, kadalisayan, at pasasalamat, bilang isang taong namatay na sa kasalanan at ngayon ay nabubuhay para sa Iyong kaluwalhatian. Amen.",
    "challenge": "O PANGINOON kong DIYOS na Makapangyarihan, ipinagkakatiwala ko ang aking sarili na mamuhay nang lubos na kaisa ni KRISTO sa Kanyang kamatayan, paglilibing, at muling pagkabuhay. Tulungan Mo akong lumakad sa bagong buhay na ibinigay Mo sa akin, patay na sa kasalanan at buhay na sa Iyong katuwiran. Kay HESUKRISTO na aking PANGINOON at TAGAPAGLIGTAS, Amen."
  },
  {
    "id": "consolidation-8",
    "title": "Aralin 8: Ang Kahulugan at Kahalagahan ng Hapunan ng PANGINOON",
    "category": "Consolidation",
    "readingTime": "7 minutong pagbasa",
    "scriptureFocus": {
      "reference": "Lucas 22:19-20 at 1 Corinto 11:27-28 (NIV)",
      "text": "At dumampot siya ng tinapay, at nang siya'y makapagpasalamat, ay pinagpira-piraso niya ito, at ibinigay sa kanila, na sinasabi, Ito ang aking katawan na ibinigay dahil sa inyo; gawin ninyo ito sa pag-alaala sa akin.'... Dapat suriin ng bawat isa ang kaniyang sarili bago sila kumain ng tinapay at uminom mula sa kopa."
    },
    "objectives": [
      "Upang maunawaan ang kahulugan at kahalagahan ng Hapunan ng PANGINOON bilang isang sagradong gawain ng pag-alaala, pagpapahayag, pag-asam, at personal na pagpapanibago.",
      "Upang matutunan kung paano makilahok nang may paggalang at pasasalamat para sa gawaing tumutubos ni CRISTO."
    ],
    "teachingSections": [
      {
        "id": "c-8-intro",
        "number": 1,
        "title": "Panimula",
        "paragraphs": [
          "Ano ang kahulugan ng Hapunan ng PANGINOON? Bakit dapat itong regular na ipagdiwang ng mga mananampalataya?",
          "Ang Hapunan ng PANGINOON (tinatawag ding Komunyon) ay isa sa dalawang ordenansang itinatag mismo ni HESUS para sa Kanyang mga tagasunod - ang isa pa ay ang binyag sa tubig.",
          "Ito ay isang banal na gawain ng pag-alaala at pagsamba na nagdiriwang ng sakripisyo ni HESUS para sa ating kaligtasan.",
          "Sa bawat pagkakataong nakikibahagi tayo sa tinapay at saro, inaalala natin ang Kanyang ginawa, ipinapahayag ang Kanyang kamatayan, at inaabangan ang Kanyang pagbabalik."
        ]
      },
      {
        "id": "c-8-1",
        "number": 2,
        "title": "Ang Tinapay ay Simbolo ng Katawan ng PANGINOON",
        "paragraphs": [
          "\"Ito ang aking katawan na ibinigay para sa inyo; gawin ninyo ito bilang pag-alaala sa akin.\" - Lucas 22:19 (ABTAG)",
          "Ang tinapay ay sumisimbolo sa katawan ni HESUS, na kusang-loob Niyang ibinigay para sa atin sa krus.",
          "Ang kanyang pagdurusa at kamatayan ang naging halaga ng ating katubusan -- ang pagpapalaya sa atin mula sa kasalanan at pakikipagkasundo sa atin sa DIYOS.",
          "Habang kinakain natin ang tinapay, inaalala natin ang Kanyang sakripisyo nang may lubos na pasasalamat, at nangangako tayong mamuhay nang may pagsunod sa Kanya na nag-alay ng Kanyang buhay para sa atin.",
          "Susing Katotohanan: Ang pinagpira-piraso na tinapay ay nagpapaalala sa atin ng katawan ni HESUS na pinagpira-piraso para sa ating mga kasalanan - ang patunay ng Kanyang pag-ibig."
        ]
      },
      {
        "id": "c-8-2",
        "number": 3,
        "title": "Ang Kopa ay Sumisimbolo sa Dugo ng PANGINOON",
        "paragraphs": [
          "\"Ang kopang ito ang bagong tipan sa aking dugo, na ibinubuhos para sa inyo.\" - Lucas 22:20 (MBB)",
          "Ang kopa ay sumisimbolo sa dugo ni HESUKRISTO, na ibinuhos para sa kapatawaran ng mga kasalanan.",
          "Sa Lumang Tipan, ang mga sakripisyo ng hayop ay paulit-ulit na iniaalay, ngunit sa Bagong Tipan, ibinuhos ni HESUS ang Kanyang sariling dugo nang minsanan at magpakailanman upang tayo ay lubusang linisin.",
          "Kapag umiinom tayo mula sa kopa, naaalala natin na ang ating kaligtasan ay sinisiguro ng Kanyang dugo - ang tatak ng bagong tipan.",
          "Susing Katotohanan: Ipinapaalala sa atin ng saro na sa pamamagitan ng dugo ni KRISTO, tayo ay pinatawad, nililinis, at ginagawang bago."
        ]
      },
      {
        "id": "c-8-3",
        "number": 4,
        "title": "Ipinapahayag ng Hapunan ng PANGINOON ang Kanyang Sakripisyal na Kamatayan",
        "paragraphs": [
          "\"Sapagkat sa tuwing kakainin ninyo ang tinapay na ito at iinuman ang kopang ito, ipinahahayag ninyo ang kamatayan ng PANGINOON hanggang sa siya'y dumating.\" - 1 Corinto 11:26 (MBB)",
          "Sa bawat pagkakataong nagtitipon ang mga mananampalataya upang ipagdiwang ang Hapunan ng PANGINOON, ginagawa natin ang isang hayagang pagpapahayag: Si HESUS ay namatay para sa atin - at ang Kanyang kamatayan ay nagliligtas pa rin.",
          "Sa pagtanggap ng Komunyon, ipinapahayag natin ang pangunahing katotohanan ng Ebanghelyo sa harap ng DIYOS, sa isa't isa, at sa harap ng sanlibutan.",
          "Hindi lamang ito isang pribadong gawain, kundi isang sama-samang patotoo ng ating pananampalataya sa gawaing tumutubos ni KRISTO.",
          "Susing Katotohanan: Ipinapahayag ng Hapunan ng PANGINOON na ang kamatayan ni KRISTO ang puso ng ating pananampalataya at pag-asa."
        ]
      },
      {
        "id": "c-8-4",
        "number": 5,
        "title": "Ang Hapunan ng PANGINOON ay Isang Paunang Lasa ng Darating na Kaharian ng DIYOS",
        "paragraphs": [
          "\"Sapagkat sinasabi ko sa inyo, hindi ko na ito kakainin muli hanggang sa matupad ito sa kaharian ng DIYOS.\" - Lucas 22:16 (MBB)",
          "Kapag nakikibahagi tayo sa Hapunan ng PANGINOON, hindi lamang tayo lumilingon sa krus—inaabangan din natin ang hinaharap.",
          "Ito ay isang patikim ng dakilang piging ng kasalan sa langit, kung kailan titipunin ni KRISTO ang Kanyang tinubos na bayan para sa walang hanggang pagsasamahan at kagalakan.",
          "Ang ating pakikiisa sa lupa ay tumutukoy sa ating nalalapit na muling pagsasama-sama sa Kanya sa kaluwalhatian.",
          "Susing Katotohanan: Inaabangan ng komunyon ang araw na ang mga mananampalataya ay makikipagpista kasama ni KRISTO sa Kanyang walang hanggang Kaharian."
        ]
      },
      {
        "id": "c-8-5",
        "number": 6,
        "title": "Ang Hapunan ng PANGINOON ay Dapat Ipagdiwang Nang May Paggalang",
        "paragraphs": [
          "\"Dapat suriin ng bawat isa ang kanyang sarili bago siya kumain ng tinapay at uminom sa kopa.\" - 1 Corinto 11:28 (MBB)",
          "Ang Hapunan ng PANGINOON ay sagrado, at hindi dapat ipagwalang-bahala o ipagwalang-bahala.",
          "Bago tayo makibahagi, tayo ay tinatawagan upang suriin ang ating mga puso - ikumpisal ang kasalanan, panibagong pananampalataya, at makipagkasundo sa iba kung kinakailangan.",
          "Ang pakikibahagi \"sa paraang hindi karapat-dapat\" ay nangangahulugang pagtanggap sa mga simbolo nang walang taimtim na pananampalataya o pagsusuri sa sarili.",
          "Ang tunay na pakikilahok ay may kaakibat na pagpapakumbaba, paggalang, at pasasalamat.",
          "Susing Katotohanan: Inaanyayahan tayo ng Komunyon na suriin ang ating mga puso at panibaguhin ang ating debosyon kay KRISTO."
        ]
      },
      {
        "id": "c-8-6",
        "number": 7,
        "title": "Konklusyon",
        "paragraphs": [
          "Binigyan tayo ni HESUS ng dalawang sagradong ordenansa upang alalahanin at ipahayag ang Kanyang gawaing nagliligtas: ang Bautismo sa Tubig at ang Hapunan ng PANGINOON.",
          "Ang bautismo sa tubig ay nagpapatotoo sa ating pakikiisa kay KRISTO; ang Hapunan ng PANGINOON ay nagpapaalala sa atin ng ating patuloy na pakikisama sa Kanya at sa isa't isa.",
          "Dapat seryosohin ng bawat tunay na mananampalataya ang dalawa - hindi bilang mga ritwal, kundi bilang mga gawa ng pagmamahal at pagsunod na nagtuturo sa atin pabalik sa krus at pasulong sa Kanyang darating na kaluwalhatian."
        ]
      }
    ],
    "reflectionQuestions": [
      "Ano ang kahulugan ng Hapunan ng PANGINOON para sa iyo nang personal?",
      "Bakit dapat harapin ng mga mananampalataya ang Komunyon nang may paggalang at pagsusuri sa sarili?",
      "Paano nakakaapekto ang pag-alala sa sakripisyo ni KRISTO sa iyong pang-araw-araw na buhay at pagsamba?",
      "Sa anong mga paraan pinapalakas ng Hapunan ng PANGINOON ang iyong pakikisama sa ibang mga mananampalataya?",
      "Paano ka inihahanda ng ordinansang ito para sa darating na Kaharian ng DIYOS?"
    ],
    "prayer": "PANGINOONG HESUS, salamat po sa pagbibigay ng Iyong katawan at dugo para sa aking kaligtasan. Turuan Mo akong alalahanin ang Iyong sakripisyo nang may paggalang, pasasalamat, at pananampalataya. Nawa'y ipaalala sa akin ng bawat Komunyon ang Iyong pagmamahal, panibaguhin ang aking debosyon, at ihanda ako para sa Iyong pagdating. Amen.",
    "challenge": "PANGINOON, ipinagkakatiwala ko na ngayon ang aking sarili sa Iyo - upang sundin Ka sa pamamagitan ng binyag sa tubig at regular na ipagdiwang ang Hapunan ng PANGINOON nang may pasasalamat at paggalang sa puso. Nawa'y patuloy na ipahayag ng aking buhay ang Iyong kamatayan at muling pagkabuhay hanggang sa Iyong muling pagbabalik. Kay HESUKRISTO na aking PANGINOON at TAGAPAGLIGTAS, Amen."
  },
  {
    "id": "consolidation-9",
    "title": "Aralin 9: Paano Daigin ang Tukso",
    "category": "Consolidation",
    "readingTime": "7 minutong pagbasa",
    "scriptureFocus": {
      "reference": "1 Corinto 10:13 (NIV)",
      "text": "Walang tuksong dumating sa inyo na hindi karaniwan sa mga tao. Ngunit tapat ang DIYOS; hindi niya hahayaang kayo'y tuksuhin nang higit sa inyong makakaya..."
    },
    "objectives": [
      "Upang maunawaan ang uri at pinagmumulan ng tukso.",
      "Upang matutunan kung paano mapagtagumpayan ang tukso sa pamamagitan ng katapatan, karunungan, at lakas ng DIYOS - upang tayo ay mamuhay nang matagumpay at mabunga kay CRISTO."
    ],
    "teachingSections": [
      {
        "id": "c-9-intro",
        "number": 1,
        "title": "Panimula",
        "paragraphs": [
          "Ang tukso ay isa sa pinakamatanda at pinakapersonal na labanan ng bawat mananampalataya.",
          "Hindi kasalanan ang matukso - maging si HESUS ay tinukso rin - ngunit nagiging kasalanan ito kapag tayo ay sumuko dito.",
          "Ang tukso ay isang pang-araw-araw na realidad, ngunit ang tagumpay ay posible sa pamamagitan ng kapangyarihan ng BANAL NA ESPIRITU.",
          "Ang Salita ng DIYOS ay nagbibigay sa atin ng malinaw na mga prinsipyo kung paano ito labanan at mapagtagumpayan. Matuto tayong tumugon nang may pananampalataya, karunungan, at pagsunod sa bawat oras na dumarating ang tukso sa atin."
        ]
      },
      {
        "id": "c-9-1",
        "number": 2,
        "title": "Alamin na Karaniwan ang Tukso at Maaaring Dumating ang Sinuman",
        "paragraphs": [
          "\"Walang tuksong dumating sa inyo na hindi karaniwan sa mga tao.\" - 1 Corinto 10:13a",
          "Hindi natatangi sa iyo ang tukso. Bawat mananampalataya ay nahaharap dito - bata man o matanda, bago man o nasa hustong gulang.",
          "Ang pagkaalam sa katotohanang ito ay nagpipigil sa atin mula sa pagkaawa sa sarili o pagmamataas at nagpapaalala sa atin na umasa sa DIYOS biyaya.",
          "Susing Katotohanan: Hindi ka nag-iisa sa pagharap sa tukso - ngunit hindi ka kailanman mawawalan ng tulong ng DIYOS."
        ]
      },
      {
        "id": "c-9-2",
        "number": 3,
        "title": "Alamin na ang Tukso ay Nagmumula sa Diyablo",
        "paragraphs": [
          "\"Pagkatapos, si JESUS ay dinala ng ESPIRITU sa ilang upang tuksuhin ng diyablo.\" - Mateo 4:1",
          "\"Huwag sabihin ninuman na tinutukso siya ng DIYOS.\" - Santiago 1:13",
          "Ang pinagmumulan ng tukso ay hindi ang DIYOS kundi ang kaaway ng ating mga kaluluwa - si Satanas. Ang kanyang layunin ay linlangin, lituhin, at sirain.",
          "Ngunit tandaan: ang tukso ay hindi kasalanan; ang pagsuko rito ay kasalanan.",
          "Susing Katotohanan: Tinutukso tayo ng diyablo na mahulog; sinusubukan tayo ng DIYOS upang palakasin ang ating pananampalataya."
        ]
      },
      {
        "id": "c-9-3",
        "number": 4,
        "title": "Alamin na ang Tukso ay Nagsisimula sa Loob - Sa Pamamagitan ng Ating Sariling mga Pagnanasa",
        "paragraphs": [
          "\"Ang bawat tao'y natutukso kapag siya'y nahihila at naaakit ng sarili niyang masasamang pagnanasa.\" - Santiago 1:14",
          "Ang tukso ay kadalasang nagsisimula hindi sa labas kundi sa mga pagnanasa sa loob.",
          "Nagsisimula ito sa isang kaisipan, nagiging isang pagnanasa, at - kung hindi mapipigilan - ay humahantong sa pagkilos at kasalanan.",
          "\"Kung magkagayo'y, pagkatapos na maipaglihi ang pagnanasa, ay nanganganak ng kasalanan; at ang kasalanan, pagka ito'y ganap na, ay nanganganak ng kamatayan.\" - Santiago 1:15",
          "Susing Katotohanan: Bantayan ang iyong mga iniisip, dahil ang tukso ay unang nananalo sa isip bago ito sa gawa."
        ]
      },
      {
        "id": "c-9-4",
        "number": 5,
        "title": "Ipagpalagay na Tapat ang DIYOS sa Paglilimita sa Kapangyarihan ng Tukso",
        "paragraphs": [
          "\"At ang DIYOS ay tapat; hindi niya hahayaang kayo'y tuksuhin nang higit sa inyong makakaya.\" - 1 Corinto 10:13b",
          "Alam ng DIYOS ang iyong mga limitasyon. Hindi Niya kailanman hinahayaang lumampas ang tukso sa iyong kakayahang labanan.",
          "Bawat pagsubok o tukso ay nasa ilalim ng Kanyang soberanong kontrol - sinusukat, itinakda ang oras, at nilayon para sa iyong paglago.",
          "Susing Katotohanan: Ang katapatan ng DIYOS ay naglalagay ng hangganan sa bawat tukso."
        ]
      },
      {
        "id": "c-9-5",
        "number": 6,
        "title": "Ipagpalagay na ang DIYOS ay Nagbibigay ng Paraan ng Pagtakas",
        "paragraphs": [
          "\"Ngunit kapag kayo'y tinutukso, bibigyan din niya kayo ng paraan upang malagpasan ito.\" - 1 Corinto 10:13c",
          "Bawat tukso ay may kaakibat na pintuan palabas na dinisenyo ng DIYOS.",
          "Minsan ang pagtakas ay panalangin, minsan paglayo, minsan Banal na Kasulatan, minsan maka-DIYOS na payo -- ngunit lagi itong naroon.",
          "Susing Katotohanan: Ang matalinong mananampalataya ay naghahanap ng daan ng pagtakas mula sa DIYOS sa halip na makipagtalo sa tukso."
        ]
      },
      {
        "id": "c-9-6",
        "number": 7,
        "title": "Ipagpalagay na Binibigyan Ka ng DIYOS ng Lakas upang Magtiis",
        "paragraphs": [
          "\"...upang ito'y inyong matiis.\" - 1 Corinto 10:13d",
          "Ang tagumpay laban sa tukso ay hindi lamang pagtakas, kundi pati na rin ang pagtitiis - ang lakas upang manatiling tapat.",
          "Kapag ang tukso ay tila napakalaki, tandaan: ang ESPIRITU ring nagbigay-kapangyarihan kay HESUS upang lumaban sa ilang ay nananahan sa iyo.",
          "Susing Katotohanan: Ang pagtitiis ay ang kapangyarihan ng DIYOS na gumagawa sa iyo upang manatiling matatag hanggang sa lumipas ang tukso."
        ]
      },
      {
        "id": "c-9-7",
        "number": 8,
        "title": "Konklusyon",
        "paragraphs": [
          "Ang bawat mananampalataya ay nahaharap sa tukso, ngunit walang sinuman ang kailangang magpatalo rito.",
          "Maaari kang magtagumpay sa pamamagitan ng pagsunod sa mga prinsipyo ng DIYOS: Kilalanin ang tukso kung ano ito, tanggihan ang pinagmumulan nito, at umasa sa katapatan ng DIYOS.",
          "Gawing pang-araw-araw na ugali ang lumakad nang malapit sa DIYOS, punuin ang iyong puso ng Kanyang Salita, at manalangin para sa karunungan.",
          "Sa pamamagitan ni KRISTO, hindi ka biktima ng tukso - ikaw ay isang matagumpay."
        ]
      }
    ],
    "reflectionQuestions": [
      "Sa iyong palagay, bakit hinahayaan ng DIYOS na maharap ng mga mananampalataya ang tukso?",
      "Ano ang nagpapalakas o nagpapaakit sa iyo ng tukso?",
      "Paano mo matutukoy ang \"daan ng pagtakas\" kapag dumarating ang tukso?",
      "Ano ang papel na ginagampanan ng pag-alaala ng Kasulatan at panalangin sa pagdaig sa tukso?",
      "Anong mga pagbabago ang maaari mong gawin ngayon upang mapalakas ang iyong resistensya sa kasalanan?"
    ],
    "prayer": "O PANGINOON kong DIYOS na Makapangyarihan, salamat sa Iyo na tapat Ka at hindi Mo ako hahayaang matukso nang higit sa aking makakaya. Kapag dumating ang tukso, tulungan Mo akong makita ang daan ng pagtakas at palakasin Mo ako upang makapagtiis. Turuan Mo akong bantayan ang aking puso, umasa sa Iyong ESPIRITU, at mamuhay nang matagumpay kay CRISTO. Amen.",
    "challenge": "PANGINOON, ipinagkakatiwala ko ang aking sarili sa Iyong karunungan at kapangyarihan. Tulungan Mo akong malampasan ang bawat tukso na aking kinakaharap araw-araw, upang ako ay mamuhay nang dalisay, masaya, at mabunga para sa Iyong kaluwalhatian. Kay HESUKRISTO na aking PANGINOON at TAGAPAGLIGTAS, Amen."
  },
  {
    "id": "consolidation-10",
    "title": "Aralin 10: Paano Malalampasan ang mga Pagsubok",
    "category": "Consolidation",
    "readingTime": "7 minutong pagbasa",
    "scriptureFocus": {
      "reference": "Santiago 1:2-5 (NIV)",
      "text": "Mga kapatid, ituring ninyong lubos na kagalakan ang pagdanas ninyo ng iba't ibang pagsubok, dahil alam ninyong ang pagsubok sa inyong pananampalataya ay nagbubunga ng pagtitiis..."
    },
    "objectives": [
      "Upang maunawaan ang banal na layunin sa likod ng ating mga pagsubok.",
      "Upang matutunan kung paano tumugon sa mga pagsubok nang may kagalakan, pananampalataya, at pagtitiis - nagtitiwala na ginagamit ng DIYOS ang bawat hamon upang tayo ay maging ganap kay CRISTO."
    ],
    "teachingSections": [
      {
        "id": "c-10-intro",
        "number": 1,
        "title": "Panimula",
        "paragraphs": [
          "Lahat ng nangyayari sa mundo ay may banal na layunin para sa ating paglago at kapakanan bilang mga disipulo ni JESUCRISTO.",
          "Ang mga pagsubok ay hindi mga tukso. Ang mga tukso ay nagmumula sa diyablo upang tayo ay mahulog, ngunit ang mga pagsubok ay nagmumula sa DIYOS upang tulungan tayong lumago.",
          "Sa pamamagitan ng mga pagsubok, ang ating pananampalataya ay nasusubok, napapaganda, at nalalakas. Hindi hinahayaan ng DIYOS na sirain tayo ng mga ito, kundi upang paunlarin tayo - upang hubugin tayo upang maging mga ganap na mananampalataya na sumasalamin sa pagtitiis at katapatan ni KRISTO.",
          "Tuklasin natin mula sa Salita ng DIYOS kung paano haharapin at malalampasan ang mga pagsubok nang may kagalakan."
        ]
      },
      {
        "id": "c-10-1",
        "number": 2,
        "title": "Makakaharap Tayo ng Iba't Ibang Pagsubok",
        "paragraphs": [
          "\"Kapag kayo'y dumaranas ng iba't ibang pagsubok...\" - Santiago 1:2 (MBB)",
          "Ang mga pagsubok ay bahagi ng buhay - hindi tanda ng kawalan ng DIYOS kundi ng Kanyang pakikisangkot sa paghubog ng ating pagkatao.",
          "Hindi tayo dapat magulat sa kanila; sa halip, dapat natin silang tingnan bilang mga pagkakataon para sa paglago.",
          "Susing Katotohanan: Ang mga pagsubok ay hindi mga parusa kundi mga paanyaya upang mas mapalapit sa DIYOS."
        ]
      },
      {
        "id": "c-10-2",
        "number": 3,
        "title": "Ang mga Pagsubok ay Pagsubok sa Ating Pananampalataya",
        "paragraphs": [
          "\"Sapagkat alam ninyo na ang pagsubok sa inyong pananampalataya...\" - Santiago 1:3 (NIV)",
          "Ang mga pagsubok ay nagpapakita kung ano talaga ang nasa ating mga puso. Dinadalisay nito ang ating pananampalataya tulad ng gintong sinusubok sa apoy.",
          "Sa pamamagitan ng pagsubok, ang pananampalataya ay lumilipat mula sa teorya patungo sa karanasan—mula sa simpleng paniniwala patungo sa napatunayang tiwala.",
          "Susing Katotohanan: Ang pananampalatayang hindi kailanman nasusubok ay pananampalatayang hindi kailanman mapagkakatiwalaan."
        ]
      },
      {
        "id": "c-10-3",
        "number": 4,
        "title": "Ang Pagsubok sa Ating Pananampalataya ay Nagbubunga ng Pagtitiis",
        "paragraphs": [
          "\"Ang pagsubok sa inyong pananampalataya ay nagbubunga ng pagtitiis.\" - Santiago 1:3 (ABTAG1978)",
          "Ang pagtitiis ay ang kakayahang manatiling matatag at tapat sa ilalim ng panggigipit.",
          "Ang bawat pagsubok ay nagpapalakas sa ating mga espirituwal na kalamnan - nagtuturo sa atin ng pasensya, pagpapakumbaba, at pag-asa sa biyaya ng DIYOS.",
          "Susing Katotohanan: Ang pagtitiis ay tanda ng isang tunay na disipulo."
        ]
      },
      {
        "id": "c-10-4",
        "number": 5,
        "title": "Ang Pagtitiis ay Nagdudulot ng Kaangkupan at Kabuuan",
        "paragraphs": [
          "\"Hayaan ninyong matapos ng pagtitiis ang kaniyang gawa upang kayo'y maging ganap at ganap, na walang anumang kakulangan.\" - Santiago 1:4 (ABTAG1978)",
          "Kapag tinitiis natin ang mga pagsubok nang may pananampalataya, tayo ay nagiging ganap at ganap sa espirituwal.",
          "Ang ating mga puso ay dinadalisay; ang ating pananampalataya ay lumalalim. Kinukumpleto ng DIYOS sa atin ang Kanyang sinimulan.",
          "Susing Katotohanan: Ginagamit ng DIYOS ang mga pagsubok upang tapusin ang Kanyang mabuting gawa sa atin."
        ]
      },
      {
        "id": "c-10-5",
        "number": 6,
        "title": "Ang Pagtitiyaga ay Nagdudulot ng Pagsang-ayon at Kaluwalhatian ng DIYOS",
        "paragraphs": [
          "\"Mapalad ang taong nagtitiis sa gitna ng mga pagsubok; sapagkat... ang taong iyon ay tatanggap ng korona ng buhay...\" - Santiago 1:12 (ABTAG1978)",
          "Ang gantimpala para sa pagtitiyaga ay hindi lamang kapayapaan sa kasalukuyan kundi pati na rin ang walang hanggang kagalakan - ang \"korona ng buhay.\"",
          "Pinararangalan ng DIYOS ang mga nananatiling tapat sa kabila ng mga paghihirap.",
          "Susing Katotohanan: Ang mga pagsubok ay nagpapadalisay sa atin ngayon at nagbibigay sa atin ng gantimpala sa kalaunan."
        ]
      },
      {
        "id": "c-10-6",
        "number": 7,
        "title": "Saganang Nagbibigay ang DIYOS ng Karunungan sa mga Humihingi",
        "paragraphs": [
          "\"Kung ang sinuman sa inyo ay nagkukulang ng karunungan, humingi siya sa DIYOS, na nagbibigay nang sagana sa lahat nang hindi nanunumbat.\" - Santiago 1:5 (ABTAG1978)",
          "Kapag hindi mo maintindihan ang iyong pagsubok, humingi ka ng karunungan, hindi ng ginhawa.",
          "Nagbibigay ang DIYOS ng kaalaman sa mga taong mapagkumbabang humihingi ng Kanyang patnubay. Ipapakita Niya sa iyo kung paano tumugon nang may pananampalataya, pagtitiis, at biyaya.",
          "Susing Katotohanan: Ang karunungan ay ang banal na pananaw na ginagawang tagumpay ang mga pagsubok."
        ]
      },
      {
        "id": "c-10-7",
        "number": 8,
        "title": "Kaya nga, Ituring Mo Itong Buong Kagalakan!",
        "paragraphs": [
          "\"Mga kapatid, ituring ninyong lubos na kagalakan ang pagdanas ninyo ng iba't ibang pagsubok.\" - Santiago 1:2 (NIV)",
          "Ang kagalakan sa mga pagsubok ay hindi pagtanggi sa sakit—ito ay pagtitiwala sa layunin ng DIYOS.",
          "Nagagalak tayo hindi dahil sa mga pagsubok, kundi sa kabila ng mga ito, dahil alam nating ang bawat pagsubok ay naglalapit sa atin sa wangis ni KRISTO.",
          "Susing Katotohanan: Ang kagalakan ay awit ng tagumpay ng mananampalataya sa gitna ng labanan."
        ]
      },
      {
        "id": "c-10-8",
        "number": 9,
        "title": "Konklusyon",
        "paragraphs": [
          "Maaaring tila imposibleng magalak sa gitna ng kahirapan, ngunit sa pamamagitan ng pananampalataya, ito ay nagiging isang himala ng biyaya.",
          "Ang bawat pagsubok na ating kinakaharap ay isang kasangkapan sa kamay ng DIYOS - humuhubog sa ating pagkatao, sumusubok sa ating pananampalataya, at naghahanda sa atin para sa walang hanggang kaluwalhatian.",
          "Ang pinakamahusay na paraan upang malampasan ang mga pagsubok ay ang \"ituring itong pawang kagalakan\" at pasalamatan ang DIYOS sa Kanyang katapatan. Hindi niya kailanman sinasayang ang isang pagsubok."
        ]
      }
    ],
    "reflectionQuestions": [
      "Bakit pinahihintulutan ng DIYOS ang mga pagsubok sa buhay ng isang mananampalataya?",
      "Paano maaaring magkasama ang kagalakan at pagdurusa sa buhay Kristiyano?",
      "Ano ang itinuro sa iyo ng isang kamakailang pagsubok tungkol sa pananampalataya o pagtitiis?",
      "Paano makakatulong sa iyo ang paghingi ng karunungan upang mas mahusay mong maharap ang mga hamon?",
      "Anong mga praktikal na hakbang ang maaari mong gawin upang \"mabilang itong pawang kagalakan\" sa iyong susunod na pagsubok?"
    ],
    "prayer": "O PANGINOON kong DIYOS na Makapangyarihan, salamat po sa Iyo sa paggawa ng aking mga pagsubok na maging mga pagkakataon para sa paglago. Turuan Mo akong harapin ang bawat hamon nang may pananampalataya at kagalakan, dahil alam Mong hinuhubog Mo ako upang maging mas katulad ni KRISTO. Punuin Mo ako ng karunungan at lakas upang magtagumpay sa pagtitiis. Amen.",
    "challenge": "PANGINOON, ipinagkakatiwala ko ang aking sarili na mamuhay nang may tagumpay laban sa bawat pagsubok. Tulungan Mo akong ituring itong pawang kagalakan, magtiis nang may pananampalataya, at magtiwala sa Iyo nang lubos sa lahat ng pagkakataon. Kay HESUKRISTO na aking PANGINOON at TAGAPAGLIGTAS, Amen."
  },
  {
    "id": "consolidation-11",
    "title": "Aralin 11: Ang Gawain ng Pagpapabanal",
    "category": "Consolidation",
    "readingTime": "7 minutong pagbasa",
    "scriptureFocus": {
      "reference": "1 Corinto 6:11 at 1 Pedro 1:1-2 (NIV)",
      "text": "Ngunit kayo'y nahugasan na, kayo'y pinabanal, kayo'y inaring-ganap sa pangalan ng PANGINOONG JESUCRISTO, at sa ESPIRITU ng ating DIOS."
    },
    "objectives": [
      "Upang maunawaan ang kahulugan ng pagpapabanal, kung paano ito gumagana, at kung bakit ito mahalaga para sa bawat mananampalataya.",
      "Upang makilala ang patuloy na papel ng BANAL NA ESPIRITU sa pagbabago sa atin upang maging mas katulad ni HESUKRISTO sa kabanalan, pagkatao, at pag-uugali."
    ],
    "teachingSections": [
      {
        "id": "c-11-intro",
        "number": 1,
        "title": "Panimula",
        "paragraphs": [
          "Minsan inaakala natin na pinalalago tayo ng DIYOS nang walang malinaw na direksyon.",
          "Gayunpaman, ang layunin ng lahat ng tunay na espirituwal na paglago ay ang kabanalan - ito ang tinatawag ng Bibliya na pagpapabanal.",
          "Madalas nating sabihin, \"Hindi pa tapos ang DIYOS sa akin.\" Totoo iyan!",
          "Dahil ang buhay Kristiyano ay hindi tungkol sa pagiging perpekto sa isang iglap, kundi sa progresibong pagbabago— isang panghabambuhay na paglalakbay tungo sa pagiging katulad ni KRISTO sa pamamagitan ng kapangyarihan ng BANAL NA ESPIRITU."
        ]
      },
      {
        "id": "c-11-1",
        "number": 2,
        "title": "Ano ang Pagpapabanal?",
        "paragraphs": [
          "Ang salitang Griyego na hagiasmos ay nangangahulugang gawing banal, ihiwalay, italaga.",
          "Ang ibig sabihin ng pagiging banal ay ang pagiging itinalaga para sa layunin ng DIYOS—ang pagiging ganap na nakalaan sa paglilingkod sa Kanya, at pagiging dalisay mula sa lahat ng kasalanan at karumihan.",
          "Ang pagpapabanal ay parehong isang posisyon (tayo ay ginawa nang banal kay CRISTO) at isang proseso (tayo ay ginagawang banal araw-araw ng ESPIRITU).",
          "Susing Katotohanan: Ang pagpapabanal ay nangangahulugang pagiging sa pagsasagawa ng kung ano ang ipinahayag na sa atin ng DIYOS kay CRISTO."
        ]
      },
      {
        "id": "c-11-2",
        "number": 3,
        "title": "Sino ang Mananagot sa Ating Pagpapabanal?",
        "paragraphs": [
          "Ang DIYOS mismo - Ama, Anak, at BANAL NA ESPIRITU - ay magkasamang gumagawa para sa ating pagpapabanal.",
          "Ngunit ang BANAL NA ESPIRITU ang siyang nagsasagawa ng gawaing ito sa ating mga puso at buhay.",
          "\"...sa pamamagitan ng pagpapabanal na gawa ng ESPIRITU...\" - 1 Pedro 1:2",
          "Mayroon din tayong responsibilidad. Dapat tayong makipagtulungan sa ESPIRITU sa pamamagitan ng pananampalataya, pagsunod, at pagsuko. Ang pagpapabanal ay hindi pasibo - ito ay isang pakikipagtulungan sa pagitan ng banal na biyaya at kagustuhan ng tao.",
          "Susing Katotohanan: Ang BANAL NA ESPIRITU ay nagbibigay ng kapangyarihan; ang mananampalataya ay nakikipagtulungan."
        ]
      },
      {
        "id": "c-11-3",
        "number": 4,
        "title": "Bakit Kinakailangan ang Pagpapabanal?",
        "paragraphs": [
          "Ang pagpapabanal ay kinakailangan dahil inihahanda tayo nito para sa kaluwalhatian at buhay ng DIYOS sa Kanyang presensya.",
          "Tayo ay ginawang katulad ni KRISTO—karapat-dapat para sa langit at inihahanda upang luwalhatiin ang DIYOS sa mundong ito.",
          "\"Kalooban ng DIYOS na kayo'y magpakabanal.\" - 1 Tesalonica 4:3",
          "Susing Katotohanan: Tanging ang mga ginawang banal lamang ang lubos na magtatamasa ng presensya ng isang banal na DIYOS."
        ]
      },
      {
        "id": "c-11-4",
        "number": 5,
        "title": "Gaano Katagal Nagaganap ang Pagpapabanal?",
        "paragraphs": [
          "Ang pagpapabanal ay parehong isang natapos na gawain at isang patuloy na proseso.",
          "Isang Natapos na Gawain: \"Ngunit kayo'y nahugasan na, kayo'y pinabanal, kayo'y inaring-ganap...\" - 1 Corinto 6:11. Sa pamamagitan ng kamatayan at muling pagkabuhay ni CRISTO, ang mga mananampalataya ay naihiwalay na bilang banal. Ito ang ating espirituwal na katayuan sa harap ng DIYOS.",
          "Isang Patuloy na Proseso: \"Sapagkat sa pamamagitan ng isang hain ay kaniyang pinasakdal magpakailanman ang mga pinapaging-banal.\" - Hebreo 10:14. Ang ESPIRITU ay patuloy na nagbabago sa atin araw-araw, hinuhubog tayo sa wangis ni CRISTO mula sa isang antas ng kaluwalhatian patungo sa isa pa (2 Corinto 3:18).",
          "Susing Katotohanan: Ang pagpapabanal ay nagsisimula sa kaligtasan at nagpapatuloy sa buong buhay - hanggang sa tayo ay maging perpekto sa kaluwalhatian."
        ]
      },
      {
        "id": "c-11-5",
        "number": 6,
        "title": "Ano ang Nangyayari sa Pagpapabanal?",
        "paragraphs": [
          "\"At tayong lahat, na walang talukbong ang mukha, ay nagninilay sa kaluwalhatian ng PANGINOON, na binabago tayo upang maging katulad ng kaniyang larawan, na may lalong lumalawak na kaluwalhatian, na nagmumula sa PANGINOON, na siyang ESPIRITU.\" - 2 Corinto 3:18 (ABTAG1978)",
          "Ang pagpapabanal ay ang unti-unting pagbabago ng mananampalataya tungo sa wangis ni KRISTO - sa karakter, kaisipan, emosyon, at pag-uugali.",
          "Ang BANAL NA ESPIRITU ay gumagawa sa loob ng kaluluwa—binabago ang puso, binabago ang isipan, at iniaayon ang kalooban sa mga naisin ng DIYOS.",
          "Susing Katotohanan: Ang pagpapabanal ay obra maestra ng ESPIRITU sa kaluluwa ng bawat mananampalataya."
        ]
      },
      {
        "id": "c-11-6",
        "number": 7,
        "title": "Paano Gumagana ang Pagpapabanal?",
        "paragraphs": [
          "Ang pagpapabanal ay gumagana sa pamamagitan ng:",
          "Pananampalataya at pagsunod sa Salita ng DIYOS",
          "Panalangin at mga espirituwal na disiplina",
          "Mga paghihirap at pagsubok na nagpapatibay sa ating pananampalataya",
          "Ang nananahang presensya ng ESPIRITU",
          "Ang natapos na gawain ni KRISTO - Ang Kanyang kamatayan, paglilibing, at muling pagkabuhay",
          "Susing Katotohanan: Ang paglago sa kabanalan ay panghabambuhay - pag-unlad, hindi pagiging perpekto, ang landas ng ESPIRITU."
        ]
      },
      {
        "id": "c-11-7",
        "number": 8,
        "title": "Konklusyon",
        "paragraphs": [
          "Ang pagpapabanal ay nagsisimula sa isang personal na relasyon kay HESUKRISTO.",
          "Upang mapabanal, kailangan mo munang ipanganak na muli—makipagkasundo sa DIYOS sa pamamagitan ng pananampalataya sa Kanyang Anak.",
          "Kung tinanggap mo na si KRISTO, natanggap mo na rin ang BANAL NA ESPIRITU, ang iyong Tagapagbanal, na ngayon ay gumagawa sa iyo upang gawing mas katulad ka ni HESUS.",
          "Kaya't lumakad araw-araw nang may pagsunod, pagpapakumbaba, at pakikipagtulungan sa Kanyang gawain sa iyong buhay."
        ]
      }
    ],
    "reflectionQuestions": [
      "Bakit kailangan munang ipanganak na muli ang isang tao bago maranasan ang pagpapabanal?",
      "Paano praktikal na gumagana ang BANAL NA ESPIRITU upang tayo ay gawing banal?",
      "Anong mga espirituwal na gawi ang tumutulong sa iyo na makipagtulungan sa gawaing nagpapabanal ng DIYOS?",
      "Paano mo masasabi na ikaw ay lumalago sa pagpapabanal?",
      "Saang aspeto ng iyong buhay kailangan mo pa ring isuko sa gawain ng pagpipino ng ESPIRITU?"
    ],
    "prayer": "PANGINOON, dahil tinanggap ko na si HESUKRISTO bilang aking personal na PANGINOON at TAGAPAGLIGTAS, ipagpatuloy po ninyo ang pagpapabanal na gawain ng BANAL NA ESPIRITU sa akin. Linisin Mo po ang aking puso, baguhin Mo po ang aking isipan, at baguhin Mo po ang aking pagkatao hanggang sa maipakita ko ang Iyong kabanalan. Tulungan Mo po akong mamuhay araw-araw nang may pagsunod, pagpapakumbaba, at pagmamahal. Amen.",
    "challenge": "PANGINOON, ipinagkakatiwala ko ang aking sarili na makikipagtulungan sa nagpapabanal na gawain ng BANAL NA ESPIRITU sa aking buhay. Gawin Mo akong mas katulad ni HESUS sa puso at sa gawa, upang madala ko sa Iyo ang kaluwalhatian sa lahat ng bagay. Kay HESUKRISTO na aking PANGINOON at TAGAPAGLIGTAS, Amen."
  },
  {
    "id": "consolidation-12",
    "title": "Aralin 12: Ang Pagsasagawa ng Mabubuting Pakikipag-ugnayan",
    "category": "Consolidation",
    "readingTime": "7 minutong pagbasa",
    "scriptureFocus": {
      "reference": "Lucas 6:31 at Mga Taga-Roma 12:18 (NIV)",
      "text": "Gawin ninyo sa iba ang ibig ninyong gawin nila sa inyo... Kung maaari, ayon sa inyong makakaya, ay mamuhay kayo nang mapayapa sa lahat ng tao."
    },
    "objectives": [
      "Upang matutunan kung paano magsagawa ng malusog at maka-DIYOS na mga relasyon na nakaugat sa pag-ibig, kapayapaan, at kadalisayan.",
      "Ang magabayan ng mga prinsipyo ng Bibliya na nagpaparangal sa DIYOS at nagpapala sa iba."
    ],
    "teachingSections": [
      {
        "id": "c-12-intro",
        "number": 1,
        "title": "Panimula",
        "paragraphs": [
          "Ang mga relasyon ay isa sa mga pinakadakilang kaloob ng DIYOS—ngunit isa rin sa mga pinakadakilang aspeto kung saan kailangan natin ang Kanyang biyaya.",
          "Ang ating relasyon sa DIYOS ay nakakaapekto sa kung paano tayo nakikitungo sa iba. Kaya naman binuod ni HESUS ang buong Kautusan sa dalawang utos: 'Ibigin mo ang PANGINOON mong DIYOS... at iibigin mo ang iyong kapwa gaya ng iyong sarili.' - Mateo 22:37-39 (NIV)",
          "Para makabuo ng mabubuting ugnayan, dapat nating hayaang ang pag-ibig ng DIYOS ang maghari sa ating mga puso, ang Kanyang karunungan ang gumabay sa ating mga kilos, at ang Kanyang ESPIRITU ang magbigay-kapangyarihan sa ating mga pakikipag-ugnayan."
        ]
      },
      {
        "id": "c-12-1",
        "number": 2,
        "title": "Ang Mabubuting Relasyon ay Palaging Nakabatay sa Pag-ibig na Agape",
        "paragraphs": [
          "Ang pag-ibig na Agape ang pinakamataas na uri ng pag-ibig - sakripisyo, walang pag-iimbot, at walang kundisyon. Ito ang pag-ibig na nagsisimula sa DIYOS at dumadaloy sa pamamagitan natin patungo sa iba.",
          "Kapag ang pag-ibig ang ating pundasyon, ang mga relasyon ay nagiging matatag, malusog, at nagbibigay-buhay.",
          "Kung walang pagmamahal, kahit ang pinakamabuting pagsisikap na mapanatili ang kapayapaan o respeto ay mabibigo rin kalaunan.",
          "Susing Katotohanan: Ang pag-ibig ay hindi lamang isang damdamin—ito ay isang pang-araw-araw na desisyon upang maipakita si KRISTO sa kung paano natin tinatrato ang iba."
        ]
      },
      {
        "id": "c-12-2",
        "number": 3,
        "title": "Tinitiyak ng mga Hangganan ang Malusog at Mapayapang mga Relasyon",
        "paragraphs": [
          "Ang Salita ng DIYOS ay nagtatakda ng mga hangganan kung paano tayo nakikitungo sa iba - upang protektahan ang ating mga puso at itaguyod ang pagkakaisa.",
          "Ang Ginintuang Aral: \"Tratuhin ninyo ang iba ayon sa nais ninyong gawin nila sa inyo.\" - Lucas 6:31",
          "Ang Alituntunin ng Kapayapaan: \"Kung maaari, ayon sa inyong makakaya, ay mamuhay kayo nang mapayapa sa lahat ng tao.\" - Mga Taga-Roma 12:18",
          "Ang Alituntunin ng Pagpapatawad: \"Maging mabait at mahabagin... magpatawaran kayo sa isa't isa, tulad ng pagpapatawad sa inyo ng DIYOS kay CRISTO.\" - Mga Taga-Efeso 4:32",
          "Susing Katotohanan: Ang mga hangganan sa Bibliya ay nagpoprotekta sa mga relasyon at nagpapanatili sa ating mga puso na naaayon sa kalooban ng DIYOS."
        ]
      },
      {
        "id": "c-12-3",
        "number": 4,
        "title": "Hindi Maipapayo ang mga Naunang Emosyonal o Sekswal na Relasyon",
        "paragraphs": [
          "\"Huwag mong pukawin o gisingin ang pag-ibig hangga't hindi nito naisin.\" - Awit ng mga Awit 2:7 (ABTAG1978)",
          "Nilikha ng DIYOS ang mga romantikong at sekswal na relasyon upang matamasa sa loob ng tipan ng kasal.",
          "Ang maagang emosyonal o pisikal na intimasiya sa labas ng kasal ay humahantong sa dalamhati at kasalanan.",
          "Ang tunay na pag-ibig ay naghihintay - iginagalang nito ang takdang panahon ng DIYOS, pinahahalagahan ang kadalisayan, at iginagalang ang dignidad ng iba.",
          "Susing Katotohanan: Pinoprotektahan ng kadalisayan ang pag-ibig; pinatutunayan ng pagtitiis ang pag-ibig."
        ]
      },
      {
        "id": "c-12-4",
        "number": 5,
        "title": "Ang Pag-ibig sa Pagitan ng mga Magulang at mga Anak ay Dapat Gabayan ng Salita ng DIYOS",
        "paragraphs": [
          "\"Mga anak, sundin ninyo ang inyong mga magulang sa PANGINOON, sapagkat ito ang nararapat... Mga ama, huwag ninyong pukawin sa galit ang inyong mga anak...\" - Mga Taga-Efeso 6:1-4 (ABTAG)",
          "Ang malulusog na ugnayan sa pamilya ay nakabatay sa paggalang, pagsunod, at pag-unawa sa isa't isa.",
          "Ang mga anak ay tinawag upang sumunod at igalang ang kanilang mga magulang, habang ang mga magulang naman ay tinawag upang mag-aruga nang may pagmamahal at pagtitiis.",
          "Susing Katotohanan: Ang mga pamilya ay lalong lumalakas kapag ang mga magulang at mga anak ay parehong nagpapakita ng pagmamahal at kapakumbabaan ni KRISTO."
        ]
      },
      {
        "id": "c-12-5",
        "number": 6,
        "title": "Ang mga Ugnayan sa mga Mananampalataya ay Dapat Pamahalaan ng Kadalisayan",
        "paragraphs": [
          "\"Ituring mo ang mga nakababatang lalaki na parang mga kapatid, ang mga nakatatandang babae na parang mga ina, at ang mga nakababatang babae na parang mga kapatid, nang may lubos na kalinisan.\" - 1 Timoteo 5:1-2 (ABTAG1978)",
          "Sa pamilya ng DIYOS, dapat tayong makipag-ugnayan sa isa't isa nang may kabanalan, paggalang, at integridad sa moralidad.",
          "Ang simbahan ay isang espirituwal na sambahayan - bawat ugnayan ay dapat na may marka ng katapatan, kapakumbabaan, at kadalisayan.",
          "Susing Katotohanan: Ang pamilya ng DIYOS ay itinayo sa karangalan at kabanalan."
        ]
      },
      {
        "id": "c-12-6",
        "number": 7,
        "title": "Ang mga Pakikipag-ugnayan sa mga Hindi Mananampalataya ay Dapat Magpakita ng Katarungan, Pagkahabag, at Ebanghelyo",
        "paragraphs": [
          "\"Ipinakita na niya sa iyo, O tao, kung ano ang mabuti; at ano ang hinihingi sa iyo ng PANGINOON? Na gumawa nang may katarungan, at ibigin ang kaawaan, at lumakad nang may kababaan na kasama ng iyong DIOS.\" - Mikas 6:8 (ABTAG1978)",
          "Bilang mga tagasunod ni KRISTO, ang ating pakikipag-ugnayan sa mga hindi mananampalataya ay dapat magpakita ng katarungan, awa, at pag-ibig ng DIYOS.",
          "Tinatawag tayo upang pakitunguhan ang lahat ng tao nang may habag at maging mga buhay na saksi ng Ebanghelyo sa pamamagitan ng ating mga salita at kilos.",
          "Susing Katotohanan: Ang ating mga pakikipag-ugnayan ay dapat umakay sa iba na makita si KRISTO sa atin."
        ]
      },
      {
        "id": "c-12-7",
        "number": 8,
        "title": "Konklusyon",
        "paragraphs": [
          "Ang pagsasagawa ng mabubuting relasyon ay nagsisimula sa pagmamahal sa DIYOS at umaabot sa pagmamahal sa kapwa nang tama.",
          "Kapag ang ating mga ugnayan ay nakabatay sa pag-ibig na agape, ginagabayan ng mga prinsipyo ng Bibliya, at binibigyang kapangyarihan ng BANAL NA ESPIRITU, nagdudulot ang mga ito ng kaluwalhatian sa DIYOS at kapayapaan sa ating buhay.",
          "Mangako tayong mamuhay ayon sa mga tuntunin ng DIYOS tungkol sa pag-ibig, kapayapaan, pagpapatawad, at kadalisayan—sa pagbuo ng mga ugnayang magbibigay-pugay kay KRISTO sa bawat panahon ng ating buhay."
        ]
      }
    ],
    "reflectionQuestions": [
      "Ano ang higit na nag-uudyok sa iyo na magkaroon ng mabubuting ugnayan?",
      "Aling tuntunin sa Bibliya (pag-ibig, kapayapaan, pagpapatawad, kadalisayan) ang higit na tumutukoy sa iyong kasalukuyang mga relasyon?",
      "Anong mga relasyon sa iyong buhay ang nangangailangan ng pagkakasundo o paggaling?",
      "Paano mo mas maipapakita si KRISTO nang mas malinaw sa iyong pamilya, mga pagkakaibigan, o mga relasyon sa trabaho?",
      "Anong mga praktikal na hangganan ang maaari mong itakda upang mapanatili ang malusog at maka-DIYOS na mga relasyon?"
    ],
    "prayer": "O PANGINOON kong DIYOS na Makapangyarihan, turuan mo akong mahalin Ka nang higit sa lahat at mahalin ang iba tulad ng pagmamahal Mo sa akin. Tulungan mo akong mamuhay nang may kapayapaan sa lahat, magpatawad tulad ng pagpapatawad sa akin, at lumakad sa kadalisayan at katotohanan. Palakasin mo ako upang maipakita ang Iyong karakter sa bawat relasyon na mayroon ako. Amen.",
    "challenge": "PANGINOON, nangangako po akong mamahalin Ka at ang aking kapwa nang buong puso, kaluluwa, at lakas ko. Tulungan Mo po akong magtatag ng mga prinsipyo at hangganan ng Bibliya na magbibigay-pugay sa Iyo sa lahat ng aking mga pakikipag-ugnayan. Kay HESUKRISTO na aking PANGINOON at TAGAPAGLIGTAS, Amen."
  },
  {
    "id": "consolidation-13",
    "title": "Aralin 13: Ang Kahalagahan ng Kabanalan, Katarungan, at Pagkahabag",
    "category": "Consolidation",
    "readingTime": "7 minutong pagbasa",
    "scriptureFocus": {
      "reference": "Mikas 6:8 (NIV)",
      "text": "Ipinakita na niya sa iyo, Oh tao, kung ano ang mabuti; at ano ang hinihingi sa iyo ng PANGINOON, kundi gumawa ng katarungan, at ibigin ang kaawaan, at lumakad na may kababaan na kasama ng iyong DIOS."
    },
    "objectives": [
      "Upang maunawaan na ang tunay na kabanalan ay hindi lamang personal na kabanalan kundi pati na rin ang aktibong katuwiran at habag sa iba.",
      "Upang isabuhay ang mga hinihingi ng DIYOS: gumawa ng katarungan, mahalin ang awa, at lumakad nang may kababaang-loob na kasama Niya."
    ],
    "teachingSections": [
      {
        "id": "c-13-intro",
        "number": 1,
        "title": "Panimula",
        "paragraphs": [
          "Noong panahon ni propeta Mikas, ang bayan ng DIYOS - ang mga Israelita - ay lubhang relihiyoso ngunit masama ang moralidad. Nag-alay sila ng mga sakripisyo at nagsagawa ng mga ritwal ngunit pinabayaan ang katarungan, kabaitan, at kapakumbabaan.",
          "Sa pamamagitan ni Mikas, sinaway ng DIYOS ang kanilang pagkukunwari at ipinaalala sa kanila kung ano ang tunay na kabutihan. Gayunpaman, sa Kanyang awa, ipinangako Niya ang kaligtasan sa pamamagitan ng darating na Mesiyas.",
          "Bilang mga tinubos ng DIYOS kay CRISTO ngayon, tayo ay tinatawag upang ibalik ang ganitong uri ng buhay -- isa na sumasalamin sa Kanyang katangian sa pamamagitan ng kabanalan, katarungan, at habag."
        ]
      },
      {
        "id": "c-13-1",
        "number": 2,
        "title": "Ano ang Sinabi ng PANGINOON sa Sangkatauhan?",
        "paragraphs": [
          "\"Ipinakita na niya sa iyo, Oh tao, kung ano ang mabuti...\" - Mikas 6:8a",
          "Hindi itinago ng DIYOS ang Kanyang kalooban. Malinaw Niyang ipinahayag sa atin kung ano ang mabuti - hindi sa mga masalimuot na ritwal o sakripisyo, kundi sa kung paano natin isinasabuhay ang Kanyang karakter araw-araw.",
          "Susing Katotohanan: Ang kalooban ng DIYOS ay hindi mahiwaga - ito ay moral, may kaugnayan sa iba, at praktikal."
        ]
      },
      {
        "id": "c-13-2",
        "number": 3,
        "title": "Ang Tatlong Kahilingan ng PANGINOON",
        "paragraphs": [
          "\"Ano ang hinihingi sa iyo ng PANGINOON? Ang gumawa ng katarungan, ang ibigin ang kaawaan, at ang lumakad na may kababaang-loob na kasama ng iyong DIOS.\" - Mikas 6:8b",
          "Ang mga kinakailangan ng DIYOS para sa Kanyang bayan ay malinaw at simple, ngunit lubhang mapanghamon.",
          "Naaantig nila ang puso (awa), ang mga kamay (katarungan), at ang paglakad (kapakumbabaan).",
          "a) Gumawa ng Katarungan - kumilos nang tama at patas sa lahat ng relasyon.",
          "b) Magmahal at Magpakita ng Awa - magpakita ng matatag na pagmamahal at habag sa iba.",
          "c) Lumakad Nang May Kababaang-loob kasama ng DIYOS - mamuhay nang may pagtitiwala at pagsunod sa ilalim ng Kanyang awtoridad.",
          "Susing Katotohanan: Ang tunay na relihiyon ay hindi tungkol sa pagsasagawa ng mga ritwal kundi sa matuwid na pamumuhay."
        ]
      },
      {
        "id": "c-13-3",
        "number": 4,
        "title": "Pagbibigay-kahulugan sa Bawat Birtud",
        "paragraphs": [
          "Katarungan - Paggawa ng tama at patas sa harap ng DIYOS at ng tao. Nangangahulugan ito ng paninindigan para sa katotohanan, pagtatanggol sa mga inaapi, at pagbibigay sa bawat tao ng nararapat (Kawikaan 21:3; Isaias 1:17).",
          "Kabaitan / Awa - Pagpapakita ng habag, pagpapatawad, at matatag na pag-ibig kahit na ito ay hindi nararapat (Oseas 6:6; Mateo 5:7). Ang awa ay pag-ibig na nasa gawa.",
          "Pagpapakumbaba - Pagkilala sa ating pagdepende sa DIYOS, pagbibigay sa Kanya ng kaluwalhatian, at pakikitungo sa iba nang may kahinahunan at paggalang (Filipos 2:3-5; Santiago 4:6).",
          "Susing Katotohanan: Ang katarungan ay sumasalamin sa katuwiran ng DIYOS; ang awa ay nagpapakita ng Kanyang pag-ibig; ang kapakumbabaan ay sumasalamin sa Kanyang pagkatao."
        ]
      },
      {
        "id": "c-13-4",
        "number": 5,
        "title": "Bakit Kinakailangan ang Tatlong Ito?",
        "paragraphs": [
          "Ang katarungan, awa, at kapakumbabaan ay mga hindi mapaghihiwalay na tanda ng isang maka-DIYOS na buhay. Kung wala ang mga ito:",
          "Ang hustisya ay nagiging malamig na legalidad.",
          "Ang awa ay nagiging sentimentalidad lamang.",
          "Ang kapakumbabaan ay nagiging huwad na kahinhinan.",
          "Magkasama, binubuo nila ang moral na balanse ng isang mananampalataya na lumalakad kasama ng DIYOS. Ipinapahayag nila ang mismong puso ni KRISTO - na kumilos nang makatarungan, umibig nang malalim, at lumakad nang may pagpapakumbaba kasama ng Kanyang Ama.",
          "Susing Katotohanan: Ang kabanalan ay hindi kumpleto kung walang katarungan at habag."
        ]
      },
      {
        "id": "c-13-5",
        "number": 6,
        "title": "Paglalapat ng mga Kristiyanong Moral na Pag-aalalang Ito",
        "paragraphs": [
          "Paggawa ng Katarungan: Maging tapat at patas sa lahat ng pakikitungo. Ipagtanggol ang mahihina at magsalita laban sa kawalan ng katarungan. Tratuhin ang lahat nang may pagkakapantay-pantay, anuman ang katayuan o pinagmulan.",
          "Ang Pagmamahal sa Awa: Magpatawad nang lubusan tulad ng pagpapatawad sa iyo ni KRISTO. Maging mapagbigay sa mga mahihirap at mabait sa mga nasasaktan. Hayaang gabayan ng habag ang iyong mga desisyon at kilos.",
          "Upang Lumakad Nang Mapagkumbaba kasama ang DIYOS: Manalangin araw-araw nang may pusong handang turuan. Kilalanin ang iyong pagdepende sa biyaya ng DIYOS. Maglingkod sa iba nang hindi naghahangad ng pagkilala o gantimpala.",
          "Susing Katotohanan: Habang lumalapit ka sa DIYOS, mas kikilos ka nang may katarungan, awa, at kapakumbabaan."
        ]
      },
      {
        "id": "c-13-6",
        "number": 7,
        "title": "Konklusyon",
        "paragraphs": [
          "Hindi relihiyon ang hinihingi ng DIYOS kundi katuwiran. Ang pagiging maka-DIYOS ay ang maging katulad Niya - makatarungan, mahabagin, at mapagpakumbaba.",
          "Kapag isinasabuhay natin ang mga birtud na ito, naipapakita natin ang Kanyang wangis sa mundong nagmamasid at natutupad natin ang ating tungkulin bilang Kanyang bayan.",
          "Mamuhay tayo araw-araw na gumagawa ng katarungan, umibig sa awa, at lumakad nang may kababaang-loob kasama ng ating DIYOS— sapagkat ito ang tunay na kinalulugdan ng PANGINOON."
        ]
      }
    ],
    "reflectionQuestions": [
      "Bakit ang katarungan, awa, at kapakumbabaan ang mga pangunahing kinakailangan sa maka-DIYOS na pamumuhay?",
      "Paano ipinakita ni HESUKRISTO ang tatlong katangiang ito sa Kanyang ministeryo?",
      "Alin sa tatlo (katarungan, awa, pagpapakumbaba) ang pinakamahirap para sa iyo na isabuhay? Bakit?",
      "Paano maisasagawa ng inyong simbahan o grupo ng mga tao ang mga pagpapahalagang ito nang sama-sama sa komunidad?",
      "Anong pagbabago sa iyong pang-araw-araw na pag-uugali ang pinakamahusay na magpapatunay sa iyong paglakad kasama ng DIYOS?"
    ],
    "prayer": "O PANGINOON kong DIYOS na Makapangyarihan sa lahat, salamat sa pagpapakita Mo sa akin ng mabuti. Tulungan Mo akong kumilos nang makatarungan, mahalin ang awa, at lumakad nang may kababaang-loob sa Iyo. Hayaan Mong magningning ang Iyong pagkatao sa pamamagitan ng aking mga kilos, upang makita ng iba ang Iyong katuwiran at habag sa akin. Amen.",
    "challenge": "PANGINOON, ipinagkakatiwala ko ang aking sarili na mamuhay nang may katarungan, awa, at pagpapakumbaba - hindi lamang sa salita, kundi sa gawa. Baguhin Mo po ako araw-araw upang maipakita ang Iyong kabutihan sa aking mga relasyon, desisyon, at paglilingkod. Kay HESUKRISTO na aking PANGINOON at TAGAPAGLIGTAS, Amen."
  },
  {
    "id": "consolidation-14",
    "title": "Aralin 14: Tapat na Pagbibigay ng mga Ikapu at Bukas-palad na Pagbibigay",
    "category": "Consolidation",
    "readingTime": "7 minutong pagbasa",
    "scriptureFocus": {
      "reference": "Mateo 23:23 at Malakias 3:8,10 (NIV)",
      "text": "Sa aba ninyo, mga guro ng batas at mga Pariseo, kayong mga mapagkunwari! Nagbibigay kayo ng ikasampung bahagi ng inyong mga pampalasa—mint, anis, at komino. Ngunit pinababayaan ninyo ang mas mahahalagang bagay ng batas —katarungan, awa, at katapatan..."
    },
    "objectives": [
      "Upang maunawaan ang disenyo ng DIYOS para sa tapat na pagbibigay ng ikapu at mapagbigay na pagbibigay - hindi lamang bilang isang tungkuling pangrelihiyon, kundi bilang isang gawa ng pagsamba, pasasalamat, at pagtitiwala.",
      "Upang maipakita ang Kanyang sariling mapagbigay na puso at mapanatili ang Kanyang gawain sa pamamagitan ng Simbahan."
    ],
    "teachingSections": [
      {
        "id": "c-14-intro",
        "number": 1,
        "title": "Panimula",
        "paragraphs": [
          "Ano ang itinuturo ng PANGINOON, ng mga propeta, at ng mga apostol tungkol sa pagbibigay ng ikapu at pagbibigay?",
          "Malinaw ang utos ng PANGINOON sa pamamagitan ni Malakias: \"Dalhin ninyo ang buong ikapu sa kamalig... Subukin ninyo Ako rito... at tingnan ninyo kung hindi ko bubuksan ang mga dungawan ng langit at ibubuhos ang masaganang pagpapala sa inyo.\" (Malakias 3:10)",
          "Nais ng DIYOS na pagpalain ang Kanyang bayan - ngunit una Niya tayong tinatawag sa katapatan. Ang pagbibigay ay hindi lamang pinansyal; ito ay espirituwal. Ito ay isang nasasalat na pagpapahayag ng ating pagmamahal, tiwala, at pagsunod sa Isa na nagbigay sa atin ng lahat."
        ]
      },
      {
        "id": "c-14-1",
        "number": 2,
        "title": "Ang Masaganang Pagbibigay ng DIYOS ang Nasa Puso ng Tapat na Pangangasiwa",
        "paragraphs": [
          "\"Sapagkat gayon na lamang ang pag-ibig ng DIYOS sa sanlibutan kaya't ibinigay niya ang kaniyang bugtong na Anak...\" - Juan 3:16 (MBB)",
          "Ang DIYOS ang ating pinakadakilang halimbawa ng pagkabukas-palad. Hindi lamang Siya nagbigay dahil sa kasaganaan - ibinigay Niya ang Kanyang pinakamahusay: ang Kanyang bugtong na Anak.",
          "Ang tunay na pagbibigay ay nagmumula sa pagmamahal. Kapag tayo ay nagbibigay nang tapat, ipinapakita natin ang puso ng DIYOS - kinikilala natin na ang lahat ng mayroon tayo ay nagmumula sa Kanya at sa Kanya.",
          "Susing Katotohanan: Ang pagbibigay ay hindi pagkawala; ito ay pagmamahal na nasa gawa -- na sumasalamin sa pagkabukas-palad ng DIYOS."
        ]
      },
      {
        "id": "c-14-2",
        "number": 3,
        "title": "Ang mga Pastol ng DIYOS ay Tinawag upang Mamuno at Magturo ng Tapat na Pagbibigay",
        "paragraphs": [
          "\"Pastulan ninyo ang kawan ng DIYOS na nasa ilalim ng inyong pangangalaga... huwag kayong maghangad ng malaswang pakinabang, kundi maglingkod nang may kahandaan.\" - 1 Pedro 5:2-3 (ABTAG1978)",
          "Ang mga pastor at lider ay may responsibilidad na pangalagaan ang bayan ng DIYOS at magturo ng wastong doktrina - kabilang ang pangangasiwa ayon sa Bibliya.",
          "Dapat nilang gabayan ang kawan hindi para sa pansariling pakinabang, kundi nang may katapatan, pagpapakita ng integridad at pagkabukas-palad.",
          "Susing Katotohanan: Ang tapat na pamumuno ay nagbibigay-inspirasyon sa tapat na pagbibigay."
        ]
      },
      {
        "id": "c-14-3",
        "number": 4,
        "title": "Ang Pagbibigay ng Katarungan at Habag ay Mas Mahalaga Kaysa sa Ritwal na Pagbibigay ng Ikapu",
        "paragraphs": [
          "\"Dapat sana'y ginawa ninyo ang huli, nang hindi pinabayaan ang una.\" - Mateo 23:23 (ABTAG1978)",
          "Sinaway ni JESUS ang mga nagbibigay ng kanilang ikapu ngunit hindi pinapansin ang katarungan, awa, at katapatan.",
          "Ang ating pagbibigay ay hindi dapat maging mekanikal o mayabang - dapat itong nakaugat sa habag at katuwiran.",
          "Tinatawag tayo ng PANGINOON sa isang ganap na pagkabukas-palad: ang magbigay sa pananalapi at mamuhay nang makatarungan. \"Anumang ginawa ninyo para sa isa sa pinakamaliit sa mga kapatid kong ito, ay ginawa ninyo para sa akin.\" - Mateo 25:40 (NIV)",
          "Susing Katotohanan: Ang pagbibigay nang walang pagmamahal ay relihiyon; ang pagbibigay nang may pagmamahal ay pagsamba."
        ]
      },
      {
        "id": "c-14-4",
        "number": 5,
        "title": "Ang Pagbibigay ng Ikapu ay Hindi Kailanman Pinawalang-bisa - Ito ay Natupad sa Pamamagitan ng Biyaya",
        "paragraphs": [
          "\"Dapat sana'y ginawa ninyo ang huli, nang hindi pinabayaan ang una.\" - Mateo 23:23c (NIV)",
          "Ang pagbibigay ng ikapu ay hindi nagtapos sa Lumang Tipan. Pinagtibay ito ni HESUS, hindi bilang isang legal na kinakailangan, kundi bilang isang espirituwal na gawain na ngayon ay natutupad sa pamamagitan ng biyaya.",
          "Ang ikapu - na nangangahulugang \"ikasampung bahagi\" - ay sumisimbolo ng dedikasyon, pagsunod, at pasasalamat.",
          "Sa ilalim ng biyaya, nagbibigay tayo hindi para pagpalain, kundi dahil tayo ay pinagpala na.",
          "Susing Katotohanan: Ang ikapu ay nananatiling isang walang-kupas na pagpapahayag ng ating debosyon sa DIYOS."
        ]
      },
      {
        "id": "c-14-5",
        "number": 6,
        "title": "Ang mga Handog ay Pagpapahayag ng Biyaya at Pasasalamat",
        "paragraphs": [
          "\"Magbigay ang bawat isa ayon sa ipinasiya ng kanyang puso... sapagkat iniibig ng DIYOS ang masayang nagbibigay.\" - 2 Corinto 9:7 (MBB)",
          "Ang pagbibigay ng ikapu ay iniuutos; ang pag-aalay ay kusang-loob - ngunit pareho itong nagmumula sa iisang pusong nagpapasalamat.",
          "Sa pamamagitan ng mga handog, ipinapahayag natin ang pasasalamat nang higit pa sa obligasyon, na naantig ng biyaya ng DIYOS sa ating buhay.",
          "\"Nananakawan ba ng tao ang DIYOS? Gayon ma'y ninanakawan ninyo ako... sa mga ikapu at mga handog.\" - Malakias 3:8 (NIV)",
          "Kapag ipinagkakait natin ang mga bagay na pag-aari ng DIYOS, hindi natin nililimitahan ang Kanyang kakayahang magpala, kundi ang ating sariling pagkakataon na maranasan ang Kanyang kasaganaan.",
          "Susing Katotohanan: Ang mga handog ay hindi mga kabayaran sa DIYOS kundi mga kaloob ng pagsamba na dulot ng pag-ibig."
        ]
      },
      {
        "id": "c-14-6",
        "number": 7,
        "title": "Ang Bukas-palad at Masayang Pagbibigay ay Isang Prinsipyo ng Bagong Tipan",
        "paragraphs": [
          "\"Ang nagtatanim nang kaunti ay aani rin nang kaunti; at ang nagtatanim nang sagana ay aani rin nang sagana... Iniibig ng DIYOS ang masayang nagbibigay.\" - 2 Corinto 9:6-7 (ABTAG)",
          "Binigyang-diin ni Pablo na ang pagbibigay ay isang bagay na nagmumula sa puso.",
          "Ang pagkabukas-palad ay nagbubukas sa ating buhay sa daloy ng biyaya ng DIYOS—hindi kinakailangan sa materyal na kayamanan, kundi sa espirituwal na pagpapayaman, kasiyahan, at pagkamabunga.",
          "Susing Katotohanan: Pinagpapala ng DIYOS ang nagbibigay upang maging daluyan ng pagpapala sa iba."
        ]
      },
      {
        "id": "c-14-7",
        "number": 8,
        "title": "Nararanasan ng mga Bukas-palad na Tagapagbigay ang Umaapaw na Paglalaan ng DIYOS",
        "paragraphs": [
          "\"At ang DIYOS ay makapagpapala sa inyo nang sagana, upang sa lahat ng bagay, na mayroon kayo ng lahat ng kailangan ninyo, ay magtamo kayo ng sagana sa bawat mabuting gawa.\" - 2 Corinto 9:8 (MBB)",
          "Hindi nangangako ang DIYOS ng karangyaan, kundi ng kasapatan—sapat upang matugunan ang ating mga pangangailangan at pagpalain ang iba.",
          "Ang pagiging bukas-palad ay hindi tungkol sa kung gaano karami ang mayroon tayo, kundi kung gaano tayo nagtitiwala sa Kanya.",
          "Susing Katotohanan: Kapag tayo ay nagbibigay nang tapat, pinararami ng DIYOS ang biyaya - hindi ang kasakiman."
        ]
      },
      {
        "id": "c-14-8",
        "number": 9,
        "title": "Konklusyon",
        "paragraphs": [
          "Ang DIYOS mismo ang ating banal na halimbawa ng pagbibigay: \"Siya na hindi ipinagkait ang kaniyang sariling Anak, kundi ibinigay niya siya dahil sa ating lahat, paanong hindi naman niya ibibigay sa atin nang may kagandahang-loob ang lahat ng mga bagay, kasama niya?\" - Mga Taga-Roma 8:32 (ABTAG)",
          "Ang tapat na pagbibigay ng ikapu at bukas-palad na pagbibigay ay hindi mga obligasyon kundi mga pribilehiyo.",
          "Ang mga ito ay mga gawa ng pagsamba na kumikilala sa pagmamay-ari ng DIYOS, nagpapahayag ng ating pasasalamat, at nagsusulong ng Kanyang kaharian.",
          "Kapag tayo ay nagbibigay nang masaya at palagian, hindi lamang natin pinararangalan ang DIYOS—nakikilahok tayo sa Kanyang patuloy na gawain ng pagpapala sa mundo."
        ]
      }
    ],
    "reflectionQuestions": [
      "Ano ang nag-uudyok sa iyong pagbibigay - tungkulin o pasasalamat?",
      "Paano nagkakaiba ang kahulugan at layunin ng mga ikapu at mga handog?",
      "Bakit binibigyang-diin ng DIYOS ang \"masayang pagbibigay\" sa halip na ang pagbibigay nang may pag-aatubili?",
      "Sa anong mga paraan mahuhubog ng pagkabukas-palad ang iyong pagkatao at pagpapatotoo?",
      "Paano mo maisasagawa ang tapat na pangangasiwa sa iyong pananalapi ngayon?"
    ],
    "prayer": "O PANGINOON kong DIYOS na Makapangyarihan, ibinigay Mo sa akin ang lahat ng kailangan ko. Turuan Mo akong magbigay nang may katapatan at kagalakan - hindi dahil sa obligasyon, kundi dahil sa pagmamahal at pasasalamat. Gawin Mo akong isang masayahin at mapagbigay na katiwala ng lahat ng ipinagkatiwala Mo sa akin. Amen.",
    "challenge": "PANGINOON, nangangako po akong maging tapat sa aking mga ikapu at bukas-palad sa aking mga handog. Tulungan Mo po akong magbigay nang may kagalakan at pagtitiwala, dahil alam Mong Ikaw ang pinagmumulan ng lahat ng aking mga pagpapala. Kay HESUKRISTO na aking PANGINOON at TAGAPAGLIGTAS, Amen."
  },
  {
    "id": "envisioning-1",
    "title": "Aralin 1: Pangangaral ng Ebanghelyo ng Kaharian (Bahagi 1)",
    "category": "Envisioning",
    "readingTime": "5 minutong pagbasa",
    "scriptureFocus": {
      "reference": "Mateo 9:36-38; Mateo 4:17 (NIV)",
      "text": "\"Nang makita Niya ang mga karamihan, nahabag Siya sa kanila, sapagkat sila'y nalilito at walang magawa, na parang mga tupang walang pastol. Pagkatapos ay sinabi Niya sa Kanyang mga alagad, 'Marami ang aanihin, ngunit kakaunti ang mga manggagawa. Kaya't idalangin ninyo sa PANGINOON ng aanihin na magpadala ng mga manggagawa sa Kanyang bukid.'\"\n\"Magsisi kayo, sapagkat malapit na ang kaharian ng langit.\""
    },
    "objectives": [
      "Upang maunawaan ang kahulugan at mensahe ng Ebanghelyo ng Kaharian.",
      "Kilalanin si HESUKRISTO bilang Hari na namamahala nang may pagmamahal at habag.",
      "Upang tumugon sa pamamagitan ng pagpapahayag at pamumuhay sa ilalim ng Kanyang paghahari."
    ],
    "teachingSections": [
      {
        "id": "env-1-intro",
        "number": 0,
        "title": "Panimula",
        "paragraphs": [
          "Ang Ebanghelyo ng Kaharian ang pinakadakilang balitang natanggap ng mundo. Bagama't ang sangkatauhan ay nahiwalay sa DIYOS dahil sa kasalanan, ang Kanyang dakilang pag-ibig ay nagbigay-daan para sa katubusan sa pamamagitan ng Kanyang Anak na si JESUCRISTO. Sa pamamagitan ng Kanyang kamatayan at muling pagkabuhay, ang Kaharian ng DIYOS ay nalalapit na. Bilang mga tagasunod ni CRISTO, tayo ay inaanyayahan na pumasok sa Kahariang ito, upang mamuhay sa ilalim ng pamamahala ng DIYOS, at upang ipahayag ito sa iba."
        ]
      },
      {
        "id": "env-1-1",
        "number": 1,
        "title": "Ang Ebanghelyo ay Mabuting Balita ng Kaharian",
        "paragraphs": [
          "Ang salitang ebanghelyo ay nagmula sa Griyegong euangelion, na nangangahulugang \"mabuting balita.\" Ang salitang kaharian (basileia) ay nangangahulugang \"pamamahala\" o \"paghahari.\" Magkasama nilang inilalarawan ang mabuting balita na ang DIYOS ay naghahari na ngayon sa pamamagitan ni HESUKRISTO.",
          "Inihambing ni HESUS ang Kaharian sa \"isang kayamanang nakatago sa bukid\" (Mateo 13:44). Ito ay higit na mahalaga kaysa sa anumang bagay na mayroon tayo. Ang mga tunay na nakakaunawa sa kahalagahan nito ay handang isuko ang lahat para makamit ito.",
          "Susing Katotohanan: Ang Kaharian ng DIYOS ay walang hanggan ang kahalagahan - ang pagyakap dito ay nangangahulugan ng pagbibigay sa DIYOS ng buong awtoridad sa iyong buhay."
        ]
      },
      {
        "id": "env-1-2",
        "number": 2,
        "title": "Malapit Na ang Kaharian",
        "paragraphs": [
          "Nang ipahayag ni HESUS, \"Magsisi kayo, sapagkat malapit na ang Kaharian ng langit,\" ipinahayag Niya na ang pamamahala ng DIYOS ay hindi na malayo o mahirap maabot. Sa pamamagitan Niya, ang Kaharian ay pumasok na sa ating mundo. Nagsisimula ito sa puso ng bawat mananampalataya na tumatalikod sa kasalanan at nagpapasakop sa Kanyang kalooban.",
          "Ang presensya ng Kaharian ay nangangahulugan na hindi na tayo nabubuhay sa ilalim ng paniniil ng kasalanan kundi sa ilalim ng mapagmahal na paghahari ng DIYOS.",
          "Susing Katotohanan: Ang Kaharian ay hindi isang bagay na hinihintay nating matagpuan sa langit balang araw - ito ay nagsisimula sa pusong yumuyuko kay HESUS ngayon."
        ]
      },
      {
        "id": "env-1-3",
        "number": 3,
        "title": "Ang Hari ay si HESUKRISTO",
        "paragraphs": [
          "Si HESUS ay hindi lamang mensahero ng Kaharian; Siya mismo ang Hari. \"Narito, ang iyong Hari ay pumaparito sa iyo, maamo at nakasakay sa isang asno\" (Mateo 21:5). Ang paniniwala sa Ebanghelyo ay ang paniniwala sa Hari na namamahala sa pamamagitan ng kapakumbabaan, katotohanan, at biyaya.",
          "Ang ating tugon ay dapat na pagsuko – ang pagkilala kay HESUS bilang PANGINOON ng bawat bahagi ng ating buhay.",
          "Susing Katotohanan: Ang pagpapahayag ng Ebanghelyo ay ang pagpapahayag ng Pagkahari ni HESUS."
        ]
      },
      {
        "id": "env-1-conc",
        "number": 4,
        "title": "Konklusyon",
        "paragraphs": [
          "Ang Ebanghelyo ng Kaharian ay tumatawag sa atin hindi lamang upang tumanggap ng kaligtasan kundi upang mamuhay sa ilalim ng paghahari ng DIYOS at tulungan ang iba na gawin din ito. Marami ang aanihin, ngunit kakaunti ang mga manggagawa. Manalangin tayo na ipadala tayo ng PANGINOON ng aanihin - at marami pang iba - upang ipahayag ang Kanyang Kaharian nang may habag, lakas ng loob, at kagalakan."
        ]
      }
    ],
    "reflectionQuestions": [
      "Ano ang kahulugan para sa iyo ng \"malapit na ang Kaharian\"?",
      "Bakit mahalaga ang pagsuko sa paghahari ni HESUS sa pagdanas ng Kaharian?",
      "Paano mo maipapakita ang Kaharian ng DIYOS sa iyong pang-araw-araw na buhay at mga pakikipag-ugnayan?"
    ],
    "prayer": "PANGINOONG HESUS, salamat po sa paglapit ng Iyong Kaharian. Maghari kayo sa aking puso at pamunuan ang bawat aspeto ng aking buhay. Turuan ninyo akong ipahayag ang Iyong paghahari nang may habag at katapatan.",
    "challenge": "Ipinapangako ko ang aking sarili na mamuhay sa ilalim ng Kaharian ni HESUS at ibahagi ang Mabuting Balita ng Kanyang Kaharian saanman ako magpunta. Kay HESUKRISTO na aking PANGINOON at TAGAPAGLIGTAS, Amen."
  },
  {
    "id": "envisioning-2",
    "title": "Aralin 2: Pangangaral ng Ebanghelyo ng Kaharian (Bahagi 2)",
    "category": "Envisioning",
    "readingTime": "5 minutong pagbasa",
    "scriptureFocus": {
      "reference": "1 Pedro 1:18-19; Efeso 2:8-9 (NIV)",
      "text": "\"Sapagkat alam ninyo na hindi kayo tinubos ng mga bagay na nasisira tulad ng pilak o ginto...kundi ng mahalagang dugo ni CRISTO, na parang korderong walang kapintasan o dungis.\"\n\"Sapagkat sa pamamagitan ng biyaya kayo'y naligtas sa pamamagitan ng pananampalataya; at ito'y hindi sa inyong sarili, ito'y kaloob ng DIOS; hindi sa pamamagitan ng mga gawa, upang walang sinuman ang makapagmalaki.\""
    },
    "objectives": [
      "Upang maunawaan ang kumpletong mensahe ng kaligtasan na nakapaloob sa Ebanghelyo - pagtubos, pagpapawalang-sala, pagpapabanal, mabubuting gawa, at pagluwalhati.",
      "Upang tapat na ibahagi ang nakapagpapabagong katotohanang ito sa iba."
    ],
    "teachingSections": [
      {
        "id": "env-2-intro",
        "number": 0,
        "title": "Panimula",
        "paragraphs": [
          "Ang Ebanghelyo ng Kaharian ay hindi lamang isang paanyaya na pumasok sa kaharian ng DIYOS kundi isa ring paghahayag kung paano Niya tayo lubos na binabago. Ang kaligtasan kay CRISTO ay ganap at mayaman - ito ay nagpapalaya, naglilinis, at nagpapanibago sa atin, na humuhubog sa atin para sa walang hanggang kaluwalhatian."
        ]
      },
      {
        "id": "env-2-1",
        "number": 1,
        "title": "Ang Kaligtasan ay Nagsisimula sa Pagtubos",
        "paragraphs": [
          "Ang pagtubos ay nangangahulugang \"tubusin muli.\" Sa pamamagitan ng Kanyang sakripisyo sa Krus, binayaran ni HESUS ang buong halaga para sa ating kalayaan. Dati tayong mga alipin ng kasalanan, ngunit tinubos tayo ng dugo ni KRISTO mula sa kapangyarihan nito. Tulad ng isang alipin na pinalaya ng isang mapagmahal na panginoon, tayo ngayon ay pag-aari ng DIYOS at nabubuhay bilang Kanyang mga anak na lalaki at babae.",
          "Susing Katotohanan: Hindi lamang tayo pinatawad ni HESUS - binili Niya ang ating kalayaan gamit ang Kanyang buhay."
        ]
      },
      {
        "id": "env-2-2",
        "number": 2,
        "title": "Ang Kaligtasan ay Nagdudulot ng Katuwiran",
        "paragraphs": [
          "Ang ibig sabihin ng matuwid ay maipahayag na matuwid sa harap ng DIYOS. Nangyayari ito hindi sa pamamagitan ng pagsisikap ng tao kundi sa pamamagitan ng pananampalataya sa natapos na gawain ni CRISTO. \"Samakatuwid, yamang tayo ay matuwid na sa pamamagitan ng pananampalataya, mayroon tayong kapayapaan sa DIYOS sa pamamagitan ng ating PANGINOONG Jesu-CRISTO” (Mga Taga-Roma 5:1). Tayo ay pinatawad, tinanggap, at panatag sa Kanyang pag-ibig."
        ]
      },
      {
        "id": "env-2-3",
        "number": 3,
        "title": "Ang Kaligtasan ay Nagpapatuloy sa Pagpapabanal",
        "paragraphs": [
          "Ang pagpapabanal ay ang patuloy na gawain ng BANAL NA ESPIRITU na nagpapabanal sa atin at nagpapakatotoo kay KRISTO. Ito ay parehong isang natapos na gawain (\"kayo'y pinabanal,\" 1 Cor. 6:11) at isang patuloy na proseso (\"ginawang banal,\" Heb. 10:14). Ang ESPIRITU ang humuhubog sa ating pagkatao, nagpapanibago ng ating mga isipan, at nagbibigay-kapangyarihan sa atin upang mamuhay nang may pagsunod sa DIYOS.",
          "Susing Katotohanan: Ang kaligtasan ay hindi lamang tungkol sa pagpunta sa langit kundi maging katulad ni HESUS habang narito sa lupa."
        ]
      },
      {
        "id": "env-2-4",
        "number": 4,
        "title": "Ang Kaligtasan ay Nagbubunga ng Mabubuting Gawa",
        "paragraphs": [
          "Ang tunay na pananampalataya ay nagbubunga ng gawa. \"Sapagkat tayo'y gawa ng DIYOS, nilalang kay CRISTO JESUS upang gumawa ng mabubuting gawa\" (Efeso 2:10). Ang mabubuting gawa ay bunga, hindi ang ugat, ng kaligtasan. Ipinapakita nila na ang biyaya ng DIYOS ay aktibong nagbabago sa ating mga puso at buhay."
        ]
      },
      {
        "id": "env-2-5",
        "number": 5,
        "title": "Ang Kaligtasan ay Nagtatapos sa Pagluwalhati",
        "paragraphs": [
          "Ang huling yugto ng kaligtasan ay ang pagluwalhati - kapag ang mga mananampalataya ay nagiging perpekto at ginagantimpalaan sa presensya ng DIYOS. Sinabi ni Pablo, \"Kung ang gawa ng sinuman ay mananatili, siya ay tatanggap ng gantimpala\" (1 Cor. 3:14). Bawat gawang ginawa para kay CRISTO ay magkakaroon ng walang hanggang halaga.",
          "Susing Katotohanan: Ang ating paglalakbay tungo sa kaligtasan ay hindi nagtatapos sa kahihiyan kundi sa walang hanggang karangalan sa piling ng ating Hari."
        ]
      },
      {
        "id": "env-2-conc",
        "number": 6,
        "title": "Konklusyon",
        "paragraphs": [
          "Ang kumpletong Ebanghelyo ay ang kuwento ng pagtubos, pagpapawalang-sala, pagpapabanal, mabubuting gawa, at pagluwalhati. Ito ang Ebanghelyo na tayo ay tinawag upang isabuhay at ipahayag - ang mensaheng nagliligtas, nagbabago, at lumuluwalhati sa lahat ng naniniwala kay HESUKRISTO."
        ]
      }
    ],
    "reflectionQuestions": [
      "Aling bahagi ng kaligtasan - pagtubos, pagpapawalang-sala, pagpapabanal, mabubuting gawa, o pagluwalhati - ang pinakamalalim na bumabagabag sa iyo ngayon?",
      "Bakit mahalagang ibahagi ang buong Ebanghelyo sa halip na ang mga bahagi lamang nito?",
      "Paano maipapakita ng iyong buhay sa iba ang nakapagpapabagong kapangyarihan ng kaligtasan kay CRISTO?"
    ],
    "prayer": "O PANGINOONG DIYOS na Makapangyarihan, salamat sa pagtubos Mo sa akin, pagpapatawad sa aking mga kasalanan, at pagpapabanal Mo sa akin sa pamamagitan ng Iyong ESPIRITU. Patuloy Mong hubugin ang aking buhay at ihanda ako para sa Iyong walang hanggang kaluwalhatian.",
    "challenge": "PANGINOONG HESUS, nangangako po ako na ipahayag at ipamuhay ang buong Ebanghelyo ng kaligtasan --ipinapahayag ang Iyong biyaya, lumalakad sa Iyong kabanalan, at naglilingkod bilang tapat na saksi ng Iyong Kaharian. Amen."
  },
  {
    "id": "envisioning-3",
    "title": "Aralin 3: Ang Pagiging Madali ng Pangangaral ng Ebanghelyo ng Kaharian",
    "category": "Envisioning",
    "readingTime": "6 na minutong pagbasa",
    "scriptureFocus": {
      "reference": "Daniel 2:44; Lucas 19:11-27; Juan 9:4 (TAB)",
      "text": "\"Habang araw pa, kailangan nating gawin ang mga gawa niya na nagsugo sa akin. Dumarating ang gabi, na walang makakagawa.\" - Juan 9:4"
    },
    "objectives": [
      "Upang maunawaan kung bakit ang pangangaral ng Ebanghelyo ng Kaharian ay apurahan - sa bibliya, kasaysayan, at praktikal na aspeto.",
      "Upang tumugon nang may sadyang pangangasiwa, matapang na pagpapatotoo, at napapanahong pagkilos upang mas maraming kaluluwa ang madala sa paghahari ni KRISTO bago Siya bumalik."
    ],
    "teachingSections": [
      {
        "id": "env-3-intro",
        "number": 0,
        "title": "Panimula",
        "paragraphs": [
          "Ang pagkaapurahan ay itinatakda ayon sa kahalagahan at limitadong panahon. Tinatawagan ng Bibliya ang bayan ng DIYOS na unahin ang mga bagay na panghabambuhay. Sa mga panahong ito - \"ang mga huling taon\" na nauuna sa pagbabalik ni KRISTO - ang gawain ng pagpapahayag ng Kaharian ay apurahan. Ang mga kaharian ng mundo ay tumataas at bumabagsak; tanging ang Kaharian ng DIYOS ang nananatili (Daniel 2:44). Dahil babalik si HESUS at dahil ang walang hanggang kapalaran ng mga tao ay nakataya, dapat nating ipahayag ang Mabuting Balita ngayon nang may kalinawan, habag, at pagmamadali."
        ]
      },
      {
        "id": "env-3-1",
        "number": 1,
        "title": "Lilipas ang mga imperyo; mananatili ang Kaharian ng DIYOS",
        "paragraphs": [
          "Ipinapakita ng kasaysayan na ang mga dakilang imperyo - Babilonia, Medo-Persia, Gresya, Roma - ay bumangon nang may karangyaan at kapangyarihan at kalaunan ay bumagsak. Ang mga hari at bansa ay lumipas; ang kanilang kaluwalhatian ay pansamantala lamang. Ipinapaalala sa atin ng pangitain ni Daniel na ang DIYOS ay magtatatag ng isang Kaharian na hindi kailanman masisira. Hindi tulad ng mga kapangyarihan sa lupa, ang Kaharian ni CRISTO ay may walang hanggang halaga at layunin. Ang ating pangangaral ay nakikilahok sa walang hanggang gawaing iyon: pagtawag sa mga tao palabas sa mga pansamantalang sistema at tungo sa isang walang hanggang paghahari.",
          "Susing Katotohanan: Ang mga kaharian ng tao ay may takdang panahon; ang Kaharian ng DIYOS ay magpakailanman. Dahil dito, ang ebanghelismo ang siyang pinakamatagal na puhunan."
        ]
      },
      {
        "id": "env-3-2",
        "number": 2,
        "title": "Pangangasiwa at ang panawagan na mamuhunan para sa Hari",
        "paragraphs": [
          "Ang talinghaga ni HESUS tungkol sa mga mina (Lucas 19) ay ginagawang praktikal ang pagkaapurahan. Ipinagkatiwala ng maharlika ang mga mapagkukunan sa kanyang mga alipin at nag-utos, \"Mag-asikaso kayo hanggang sa ako'y dumating.\" Tayo ay mga katiwala ng mga kaluluwa, mga kaloob, impluwensya, at oras. Inaasahan ng DIYOS na ilalaan natin ang mga ito para sa paglago ng Kaharian. Ang tapat na pangangasiwa ay nangangahulugan ng paggamit ng ating mga kasanayan, mga network, at mga oras upang gumawa ng mga disipulo, magsimula ng mga grupo, magturo, at magmalasakit sa mga nawawala - hindi ang pag-iimbak ng ating mga mapagkukunan kundi ang pagpaparami ng ibinigay ng Hari.",
          "Susing Katotohanan: Ang pangangaral at paggawa ng mga alagad ang ating pangunahing puhunan - ang ating \"ginagawa\" hanggang sa pagbabalik ni KRISTO."
        ]
      },
      {
        "id": "env-3-3",
        "number": 3,
        "title": "Ang pagbaba ng moralidad ng panahon ay nagpapataas ng pangangailangan",
        "paragraphs": [
          "Nagbabala ang Kasulatan na sa mga huling araw ay lalaganap ang katiwalian sa moralidad at kawalang-bahala. Sa kabila ng materyal na pag-unlad, ang mga puso ay tumitigas at marami ang espirituwal na naliligaw, mangmang, o nabibitag sa bisyo. Ang lumalalang kalagayan ng mundo ay lalong nagpapabilis sa Ebanghelyo: ang mga tao ay nangangailangan ng liwanag, katotohanan, at isang pagsagip mula sa kasalanan ngayon na, hindi mamaya.",
          "Susing Katotohanan: Habang bumababa ang moralidad ng lipunan, tumitindi ang pangangailangan - at ang pagkaapurahan - ng pagpapahayag ng Ebanghelyo."
        ]
      },
      {
        "id": "env-3-4",
        "number": 4,
        "title": "Magtrabaho habang may pagkakataon - \"habang may araw pa\"",
        "paragraphs": [
          "Ipinapaalala sa atin ng mga salita ni HESUS na limitado ang panahon para magtrabaho. Darating ang gabi kapag nagsasara ang mga pagkakataon. Hindi ito nangangahulugan ng pabaya na pagmamadali, kundi disiplinado at agarang pagsunod. Dapat nating gamitin ang kasalukuyang oras para sa ebanghelismo, pagdidisipulo, pagtatanim ng simbahan, at pagsasanay ng mga manggagawa dahil ang orasan ng DIYOS ay gumagalaw patungo sa pagbabalik at huling paghuhukom ni KRISTO.",
          "Susing Katotohanan: Ang kasalukuyang sandali ay ang pagkakataon sa misyon - huwag ipagpaliban ang dapat gawin ngayon."
        ]
      },
      {
        "id": "env-3-5",
        "number": 5,
        "title": "Kosmikong oposisyon at ang panawagan sa katapangan",
        "paragraphs": [
          "Nagbabala rin ang Kasulatan tungkol sa matinding oposisyon: mga huwad na kaharian, mga huwad na propeta, at isang pangwakas na Antikristo na umuusig sa mga tapat (Pahayag 13). Ang katotohanang ito ay hindi nagpapawalang-bisa sa ating misyon; pinatitibay nito ito. Maaaring dumating ang pag-uusig, ngunit nananatili ang pangako ng DIYOS - ang Kanyang Kaharian ay mananaig at ang Kanyang mga banal ay magmamana nito (Daniel 7; Daniel 12:2-3). Kaya naman dapat tayong mangaral nang may lakas ng loob, sanayin ang mga disipulo na manindigan, at magtanim ng mga komunidad na magtatagal.",
          "Susing Katotohanan: Totoo ang oposisyon, ngunit pinatatalas nito ang pangangailangan at pagkaapurahan ng tapat na pagpapatotoo."
        ]
      },
      {
        "id": "env-3-conc",
        "number": 6,
        "title": "Konklusyon",
        "paragraphs": [
          "Ang pangangaral ng Ebanghelyo ng Kaharian ay apurahan dahil (1) tanging ang Kaharian ng DIYOS ang nananatili, (2) tayo ay pinagkatiwalaan bilang mga katiwala upang mamuhunan para sa Hari, (3) ang kalagayan ng mundo ay nangangailangan ng pagsagip ngayon, (4) ang pagkakataon ay limitado - \"habang araw pa\" - at (5) ang oposisyon sa sansinukob ay nangangahulugan na ang mga desisyon ay malapit nang mapagpatibay. Samakatuwid, dapat unahin ng Simbahan ang ebanghelismo at paggawa ng mga alagad, pakilusin ang mga manggagawa, at mamuhay nang may banal na pagkaapurahan na binabalanse ng karunungan."
        ]
      }
    ],
    "reflectionQuestions": [
      "Sa anong mga paraan mo kasalukuyang pinangangasiwaan ang iyong oras at mga kaloob para sa gawaing Ebanghelyo? Saan mo maaaring dagdagan ang iyong puhunan?",
      "Alin sa tatlong dahilan ng pagkaapurahan (pangangalaga, lumalalang mundo, limitadong pagkakataon) ang higit na nag-uudyok sa iyo - at bakit?",
      "Paano praktikal na \"mananatili ang inyong maliit na grupo o simbahan hanggang sa Siya ay dumating\"? Magbigay ng dalawang konkretong aksyon para sa buwang ito.",
      "Anong mga takot o hadlang ang pumipigil sa iyo sa matapang na gawain ng Ebanghelyo, at paano mo matutugunan ang mga ito ayon sa Bibliya?"
    ],
    "prayer": "PANGINOONG HESUS, gisingin mo sa amin ang banal na pagmamadali para sa Iyong Kaharian. Patawarin mo ang aming mga pagkaantala at mga abala. Punuin mo kami ng habag para sa mga nawawala, karunungan upang mamuhunan nang mabuti, at lakas ng loob na magtrabaho habang araw pa. Magbangon at magpadala ng mga manggagawa - ipadala kami - upang ipahayag ang Iyong kaharian hanggang sa Iyong pagbabalik. Amen.",
    "challenge": "Nangangako akong gagawing prayoridad sa aking buhay ang pagpapahayag ng Ebanghelyo ngayong panahon. Ako ay (pipili ng isa): magsisimula ng lingguhang outreach, mag-aanyaya ng isang tao na makinig sa Ebanghelyo ngayong buwan, magsasanay sa isang maikling paraan ng ebanghelismo, o sasali sa isang pangkat ng paggawa ng mga disipulo. Kay HESUKRISTO na aking PANGINOON at TAGAPAGLIGTAS, Amen."
  },
  {
    "id": "envisioning-4",
    "title": "Aralin 4: Ang Hindi Natapos na Misyon (Unang Bahagi)",
    "category": "Envisioning",
    "readingTime": "5 minutong pagbasa",
    "scriptureFocus": {
      "reference": "Josue 13:1; Lucas 14:28 (NIV)",
      "text": "\"Si Josue nga ay matanda na at puspos ng mga taon; at sinabi ng PANGINOON sa kaniya, Ikaw ay matanda na at puspos ng mga taon, at marami pang lupain ang natitira na kailangang ariin.\"\n\"Kung ang isa sa inyo ay nagnanais magtayo ng tore, hindi ba muna kayo uupo at tatayahin ang halaga upang malaman kung mayroon kayong sapat na halaga upang matapos ito?\""
    },
    "objectives": [
      "Kilalanin na ang misyon ay responsibilidad ng bawat disipulo - anuman ang edad, kasarian, o tungkulin.",
      "Upang panibaguhin ang ating pangako na tapusin ang gawaing ipinagkatiwala sa atin ng DIYOS: ang manalo ng mga kaluluwa, lumikha ng mga alagad, at maging matatag para kay KRISTO hanggang sa Siya ay bumalik."
    ],
    "teachingSections": [
      {
        "id": "env-4-intro",
        "number": 0,
        "title": "Panimula",
        "paragraphs": [
          "Napapansin natin ang mga gusaling hindi pa tapos. Nagtataka tayo kung bakit natigil ang gawain: kakulangan ng pondo, tauhan, o pangitain. Ganito rin ang malungkot na larawan kapag sinimulan ang gawaing misyonero ngunit hindi natapos. Binabalaan at hinihikayat tayo ng Kasulatan na dapat tapusin ang mga iniutos ng DIYOS. Ang kuwento nina Josue, Caleb, at ang mga halimbawa ng maraming tapat na lingkod ay nagpapaalala sa atin: ang misyon ay para sa bawat disipulo sa lahat ng panahon, at ang gawain ay dapat magpatuloy hanggang sa ang lupain (at mga buhay) ay maangkin para sa DIYOS."
        ]
      },
      {
        "id": "env-4-1",
        "number": 1,
        "title": "Ang Misyon ay Para sa Bawat Disipulo - Bata at Matanda, Lalaki at Babae",
        "paragraphs": [
          "Hindi kailanman nililimitahan ng Bibliya ang misyon sa iisang edad o kasarian. Bagama't matanda na si Josue, sinabihan siya na \"may malaking bahagi pa ng lupain na kailangang ariin\" (Josue 13:1). Si Caleb, sa edad na walumpu't lima, ay naniniwala pa rin na maaari niyang angkinin ang maburol na lupain na ipinangako ng DIYOS (Josue 14:11-12). Ang mga kababaihan ay aktibong katuwang sa ministeryo ni HESUS, na nagbibigay ng suporta at ministeryo (Lucas 8:1-3). Ang mga kabataan ay tinatawag na manguna sa pamamagitan ng makadiyos na halimbawa (1 Timoteo 4:12). Ginagamit ng DIYOS ang lahat - ang malakas na sundalo, ang babaeng nananalangin, ang masipag na kabataan - sa pagsusulong ng Kanyang Kaharian.",
          "Paglalapat: Kung si Caleb ay kayang lumaban para sa mana sa edad na walumpu't lima, gaano pa kaya ang dapat ipuhunan ngayon ng mga may lakas at pagkakataon? Dapat itanong ng bawat disipulo: \"Paano ako nakikibahagi sa hindi natapos na misyon ng DIYOS?\""
        ]
      },
      {
        "id": "env-4-2",
        "number": 2,
        "title": "Ang Misyon ay Isang Espirituwal na Pananakop - Hindi Digmaang Pangkatawan",
        "paragraphs": [
          "Tulad ng mga kampanya ng Israel sa ilalim ni Josue, ang ating misyon ay pananakop - ngunit espirituwal. Hindi natin sinasakop ang lupain gamit ang mga espada; binabawi natin ang mga puso sa pamamagitan ng Ebanghelyo. Tayo ay nangangaral, nananalangin, nagdidisipulo, at nagpapastor. Ang ating mga tagumpay ay mga kaluluwang pinalaya, mga pamilyang naibalik, at mga komunidad na binago. Ang Simbahan ay tinawag upang magtanim ng mga simbahan, magpalaki ng mga pinuno, at itaguyod ang espirituwal na teritoryo sa pamamagitan ng pagpapahayag ng Ebanghelyo at mapagmahal na paglilingkod.",
          "Paglalapat: Ituring ang iyong \"kapitbahayan\" bilang isang larangan ng misyon - ang iyong lugar ng trabaho, paaralan, o pamilya. Anong espirituwal na lupa ang hindi pa natataglay doon?"
        ]
      },
      {
        "id": "env-4-3",
        "number": 3,
        "title": "Dapat Ipagpatuloy ang Misyon - Huwag Iwanan ang Trabaho nang Hindi Tapos",
        "paragraphs": [
          "Ipinakita ng komisyon kay Josue na bagama't maraming tagumpay ang napanalunan, marami pa ring dapat asikasuhin. Ang isang hindi natapos na misyon ay nagiging isang permanenteng pananagutan: ang mga taong hindi naaabot ay nananatili sa ilalim ng impluwensya ng kaaway; ang mga pamilyang naiwang walang patotoo sa Ebanghelyo ay maaaring lumaban sa katotohanan. Ang mga lugar na ating pinababayaan ay maaaring maging mga kuta ng kaaway. Samakatuwid, ang tapat na pagkadisipulo at patuloy na ebanghelismo ay hindi opsyonal na mga karagdagang bagay - ang mga ito ang puso ng pangangasiwa sa harap ng DIYOS.",
          "Susing Katotohanan: Ang bawat hindi natapos na ministeryo ay isang nawalang pagkakataon para sa Kaharian; bawat disipulo ay may pananagutang magpatuloy."
        ]
      },
      {
        "id": "env-4-conc",
        "number": 4,
        "title": "Konklusyon",
        "paragraphs": [
          "Dapat matapos ang gawain ng DIYOS. Ang misyon ay hindi lamang para sa pastor; ito ay para sa lahat ng mga disipulo. Dapat nating sakupin ang lupa, ipanalangin ang mga mang-aani, at gumawa nang may katalinuhan - bilangin ang halaga (Lucas 14:28-30) at maglaan ng mga mapagkukunan, oras, at lakas upang tapusin ang sinimulan ng DIYOS."
        ]
      }
    ],
    "reflectionQuestions": [
      "Aling mga ministeryo o gawain sa misyon ang nasimulan mo na ngunit hindi mo pa natatapos? Bakit?",
      "Sa iyong konteksto (pamilya, lugar ng trabaho, kapitbahayan), anong \"lupain\" ang natitira pang dapat ariin para kay KRISTO?",
      "Paano mo masusundan ang halimbawa ng pagtitiyaga ni Caleb sa misyon ngayong taon?"
    ],
    "prayer": "PANGINOONG DIYOS, baguhin Mo po ang aking puso para sa misyon na hindi pa tapos. Bigyan Mo po ako ng lakas, karunungan, at tapang upang tapusin ang Iyong sinimulan sa aking buhay at komunidad. Tulungan Mo po akong maging tapat, bata man o matanda, matapang man o mahinahon, sa panahon at gawa. Amen.",
    "challenge": "Nangangako akong tutukoy ng isang hindi natapos na ministeryo o gawaing misyon na aking ipagpapatuloy ngayong buwan at gagawa ng dalawang konkretong hakbang patungo sa pagkumpleto (hal., mag-imbita ng isang tao sa isang pulong ng Ebanghelyo, magsimula ng isang house group, muling mangako sa patuloy na outreach). Sa pangalan ni HESUS, Amen."
  },
  {
    "id": "envisioning-5",
    "title": "Aralin 5: Ang Hindi Natapos na Misyon (Ikalawang Bahagi)",
    "category": "Envisioning",
    "readingTime": "5 minutong pagbasa",
    "scriptureFocus": {
      "reference": "Josue 13:1; Lucas 14:28-30 (NIV)",
      "text": "\"Kung tungkol kay Josue, malaking bahagi ng lupain ang natitira pang kailangang ariin.\"\n\"Kapag nailagay mo na ang pundasyon at hindi mo matapos... pagtatawanan ka ng mga tao.\""
    },
    "objectives": [
      "Upang maunawaan kung bakit mahalaga ang masusing pag-okupa sa mga larangan ng misyon.",
      "Upang matukoy ang mga panganib ng hindi pagkumpleto ng gawaing misyonero, at upang lumago sa praktikal na katapatan upang tapusin ang gawain ng PANGINOON sa ating mga responsibilidad."
    ],
    "teachingSections": [
      {
        "id": "env-5-intro",
        "number": 0,
        "title": "Panimula",
        "paragraphs": [
          "Ipinapaalala sa atin ng atas ni Josue na ang pagmamay-ari ay kasunod ng pananakop. May mga teritoryong napanalunan ngunit hindi lubusang nasakop, at ang mga puwang na iyon ay nagdulot ng pangmatagalang problema. Dapat na magpatuloy ang Simbahan nang higit pa sa mga unang nahikayat upang matiyak ang pagiging disipulo, pagbuo ng simbahan, at pagpapaunlad ng pamumuno. Ang isang misyong sinimulan at iniwan ay parang isang kuta na naiwang bukas para sa kaaway."
        ]
      },
      {
        "id": "env-5-1",
        "number": 1,
        "title": "Angkinin ang Lugar - Masinsinan at Kumpletong Gawain ng Misyon",
        "paragraphs": [
          "Inutusan si Josue na hatiin at ipamahagi ang natitirang lupain sa mga tribo (Josue 13-21). Ang pag-aari ay nangangahulugan ng pagtatatag ng mga pamilya, lungsod, at buhay sa ilalim ng pamamahala ng DIYOS. Para sa Simbahan ngayon, ang \"pag-aari\" ay nangangahulugan ng pagiging disipulo na humahantong sa mga maygulang na mananampalataya, mga simbahang bahay, mga lider, at mga komunidad na namumuhay sa ilalim ng awtoridad ni CRISTO. Ang bahagyang gawain - ebanghelismo na walang pagsunod - ay nag-iiwan sa mga tao na mahina sa pagbabalik sa mga lumang pamamaraan.",
          "Paglalapat: Ang misyon ay hindi lamang pag-akay sa isang tao na manalangin. Ito ay ang pagsama sa kanila sa binyag, pag-aaral ng Bibliya, komunidad, at paglilingkod hanggang sa sila ay mag-ugat at magparami."
        ]
      },
      {
        "id": "env-5-2",
        "number": 2,
        "title": "Ang Panganib ng Hindi Pag-okupa sa Natitirang Lupain",
        "paragraphs": [
          "Pinangalanan ni Josue ang mga partikular na tao at rehiyon na nanatiling hindi nasakop - at ipinapakita ng kasaysayan kung paano maaaring maging tinik ang mga hindi natambak na lupa (halimbawa, nanatiling isang tinik ang mga Filisteo) (patuloy na problema). Gayundin, kapag pinabayaan natin ang mga miyembro ng pamilya, kapitbahay, o mga kasamahan sa trabaho, maaari silang maging pangmatagalang hadlang sa Ebanghelyo sa ating mga lupon. Ang pagiging disipulo na humihinto nang maaga ay maaaring magdulot ng espirituwal na poot sa halip na ani.",
          "Paglalapat: Isaalang-alang ang mga taong may impluwensya ka ngunit hindi mo sinasadyang maging disipulo. Gumawa ng plano upang maabot at gabayan sila ngayong panahon."
        ]
      },
      {
        "id": "env-5-3",
        "number": 3,
        "title": "Nauuna sa Atin ang DIYOS; Ngunit Kailangan Tayong Sumulong",
        "paragraphs": [
          "Ipinapangako ng Kasulatan ang presensya ng DIYOS sa pananakop: \"Pagdating mo roon, palalayasin ko sila sa harap mo\" (Josue 13:6). Kikilos ang DIYOS; kasunod nito ang ating pagsunod. Nililinis Niya ang daan, pinapagaling ang mga maysakit, at winawasak ang mga kuta - ngunit tinatawag Niya tayo upang humayo, upang ipakita ang Ebanghelyo, at upang magpakita ng pananampalataya. Ang tagumpay sa misyon ay nagsisimula sa isang desisyon na kumilos at isang agarang kahandaang magbahagi at magpastol.",
          "Susing Katotohanan: Pinangungunahan ng PANGINOON ang pagsulong, ngunit gumagamit Siya ng mga taong kusang-loob upang sakupin ang lupain."
        ]
      },
      {
        "id": "env-5-4",
        "number": 4,
        "title": "Magsimula sa Desisyon - Pagkatapos ay Kumilos Nang Mabilis at Matalino",
        "paragraphs": [
          "Inutusan si Josue na hatiin at ipamahagi agad ang lupain. Ang tamang panahon ng DIYOS ay kadalasang nangangailangan ng mabilis na pagsunod. Mahalaga ang pagbibilang ng gastos (Lucas 14), ngunit ang pagpapaliban ay maaaring magpahintulot sa kaaway na magpatibay. Ang panawagan ay magplano nang may panalangin at magsagawa agad - maglaan ng oras, magsanay ng mga lider, magtanim ng mga grupo, at tiyaking magpapatuloy ang gawain.",
          "Paglalapat: Pumili ng isang konkretong hakbang sa misyon ngayon (magsimula ng isang house group, mangakong gagabay sa isang bagong mananampalataya, o mag-organisa ng isang outreach) at simulan sa susunod na linggo."
        ]
      },
      {
        "id": "env-5-conc",
        "number": 5,
        "title": "Konklusyon",
        "paragraphs": [
          "Ang hindi natapos na misyon ay isang tunay na banta sa Kaharian ng DIYOS kapag ang mga disipulo ay nagpapaliban o nagpapabaya sa kanilang tungkulin. Nangangako ang DIYOS ng tagumpay, ngunit ipinagkakatiwala Niya sa atin ang gawain. Maging tapat tayo sa pagkumpleto ng gawain - para sa kaluwalhatian ng DIYOS at sa ikabubuti ng mga kaluluwang ipinagkatiwala sa ating pangangalaga."
        ]
      }
    ],
    "reflectionQuestions": [
      "Sino sa iyong pamilya o grupo ang isang \"natitirang lupain\" na nangangailangan ng iyong patuloy na pagpapatotoo at pagiging disipulo?",
      "Anong partikular na aksyon ang gagawin mo ngayong buwan upang \"okupahan\" ang lupang iyan?",
      "Paano mo isasangkot ang iba (isang lider, isang cell group, isang pastor) upang matiyak na matatapos ang gawain?"
    ],
    "prayer": "Ama sa Langit, salamat po sa pag-una Mo sa amin at pangakong palalayasin ang kaaway. Pagkalooban Mo po kami ng determinasyon na sakupin ang lupang ipinagkatiwala Mo sa amin. Tulungan mo kaming magplano nang matalino, kumilos kaagad, at maging tapat sa pag-aakay. Gamitin mo kami upang tapusin ang gawaing sinimulan Mo. Amen.",
    "challenge": "Nangangako ako ng isang agarang aksyon ngayong linggo para sa hindi natapos na gawaing misyon: (isulat ang iyong aksyon). Iuulat ko ang progreso sa aking pinuno o maliit na grupo sa loob ng dalawang linggo. Sa pangalan ni HESUS, Amen."
  },
  {
    "id": "envisioning-6",
    "title": "Aralin 6: Mga Turo ni HESUS Tungkol sa Walang Hanggang Parusa",
    "category": "Envisioning",
    "readingTime": "6 na minutong pagbasa",
    "scriptureFocus": {
      "reference": "Mateo 10:28; 25:41; 13:41-42 (NIV)",
      "text": "\"Huwag kayong matakot sa mga pumapatay ng katawan ngunit hindi kayang pumatay ng kaluluwa. Sa halip, katakutan ninyo ang DIYOS na makakapuksa sa kaluluwa at katawan sa impiyerno.\"\n\"Kung magkagayo'y sasabihin niya sa mga nasa kaliwa niya, 'Lumayo kayo sa akin, kayong mga isinumpa, patungo sa apoy na walang hanggan na inihanda para sa diyablo at sa kaniyang mga anghel.'\"\n\"Isusugo niya ang mga anghel at titipunin mula sa kaniyang kaharian ang lahat ng mga sanhi ng pagkakasala at ang lahat ng mga gumagawa ng kasamaan, at itatapon sila sa nagliliyab na pugon; kung saan magkakaroon ng iyakan at pagngangalit ng mga ngipin.\""
    },
    "objectives": [
      "Upang maunawaan ang itinuro ni HESUS tungkol sa katotohanan, kabigatan, at kawakasan ng walang hanggang kaparusahan.",
      "Upang tumugon nang may banal na habag para sa mga nawawala, at upang ipahayag ang Ebanghelyo nang may pagmamadali at pagmamahal upang ang iba ay mailigtas mula sa paghuhukom."
    ],
    "teachingSections": [
      {
        "id": "env-6-intro",
        "number": 0,
        "title": "Panimula",
        "paragraphs": [
          "Sinisimulan natin ang araling ito nang may matino at mahinahong puso. Si HESUS - ang ating PANGINOON, Guro, at TAGAPAGLIGTAS - ay mas nagsasalita tungkol sa katotohanan ng huling paghuhukom at ang kapalaran ng mga hindi nagsisisi kaysa sa halos anumang ibang paksa. Ang Kanyang mga salita ay nilalayong gisingin tayo, bigyan tayo ng babala, at himukin tayo sa pagkilos na puno ng awa. Habang pinag-iisipan natin ang Kanyang mga turo tungkol sa walang hanggang parusa, dapat nating balansehin ang katotohanan at lambing: ang katotohanan ng paghuhukom at ang habag na nagtutulak sa atin na abutin ang mga nawawala."
        ]
      },
      {
        "id": "env-6-1",
        "number": 1,
        "title": "Ang Impiyerno ay Isang Tunay na Lugar",
        "paragraphs": [
          "Binabalaan tayo ni HESUS na huwag maging kampante tungkol sa kamatayan o kasalanan. Sa Mateo 10:28, sinabi Niya na dapat tayong matakot sa DIYOS na \"makakawasak ng kaluluwa at katawan sa impiyerno.\" Ipinapahiwatig ng pananalitang ito na itinuro ni HESUS ang isang tunay at kakila-kilabot na kapalaran para sa mga patuloy na tumatanggi sa DIYOS. Ang katotohanan ng impiyerno ay isang panawagan sa pagmamadali sa ebanghelismo at sa mahabaging babala sa mga mahal natin sa buhay.",
          "Paalala pastoral: Ang pagtuturo tungkol sa impiyerno ay hindi kailanman nilayon upang ikatuwa ang takot kundi upang himukin ang mga tao na magsisi at palalimin ang ating habag para sa mga nawawala."
        ]
      },
      {
        "id": "env-6-2",
        "number": 2,
        "title": "Ang Impiyerno ay Isang Lugar ng Huling Paghuhukom",
        "paragraphs": [
          "Paulit-ulit na inilalarawan ni JESUS ang isang pangwakas na pagbubukod-bukod - ang mga tupa at mga kambing, ang trigo at ang mga panirang-damo - kung saan ang mga manggagawa ng kasamaan ay tinitipon at inihahagis sa apoy (Mateo 13; 25). Hindi lamang ito disiplina sa pagtutuwid kundi ang katapusan ng matuwid na paghatol ng DIYOS: ang mga nagpapatuloy sa paghihimagsik ay nahihiwalay sa presensya ng DIYOS at nararanasan ang mga bunga ng paghihiwalay na iyon.",
          "Susing katotohanan: Ang katarungan ng DIYOS ay totoo. Ang huling paghuhukom ay nirerespeto ang kalayaan ng tao at ang kabanalan ng DIYOS; ito ang taimtim na katumbas ng Kanyang mabiyayang alok ng kaligtasan."
        ]
      },
      {
        "id": "env-6-3",
        "number": 3,
        "title": "Ang Impiyerno ay Isang Lugar ng Kakila-kilabot at Iba't Ibang Parusa",
        "paragraphs": [
          "Itinuro ni HESUS at ng mga apostol na ang parusa ay matindi at walang hanggan (Mat. (Mateo 25:46). Ipinapahiwatig din ng Kasulatan ang mga antas ng responsibilidad at kaukulang pananagutan (halimbawa, ang mga salita ni HESUS tungkol sa mas matinding parusa para sa mga may mas malaking liwanag - Mateo 10:15; Lucas 12:47-48). Ang sinumang may higit na kaalaman at tumanggi sa higit ay hahatulan nang mas mahigpit. Ang paglalarawang ginamit ni HESUS - apoy, pagtangis, pagngangalit ng mga ngipin - ay nagpapahiwatig ng tunay na dalamhati at kawalan, hindi mga metaporikal na walang kabuluhang bagay.",
          "Paalala Pastoral: Ang doktrina ng mga antas ng paghatol ay dapat magpakumbaba sa ating mga nakatanggap ng mas malaking pribilehiyo. Hindi ito dapat magdulot ng pagmamataas kundi dapat pumukaw ng habag at pagmamadali sa ebanghelyo."
        ]
      },
      {
        "id": "env-6-4",
        "number": 4,
        "title": "Ang Pananagutan ay Nakaugnay sa Kaalaman, Oportunidad, at Pangangasiwa",
        "paragraphs": [
          "Itinuturo ni HESUS na ang responsibilidad ay nadaragdagan kasabay ng paghahayag at tiwala (Lucas 12:48). Ang mga pinagkatiwalaan ng mas malalaking kaloob, pagtuturo, o impluwensya ay bibigyan ng mas mataas na pamantayan. Ito ay isang malakas na motibasyon para sa tapat na pangangasiwa: magbibigay-sulit tayo kung paano natin ginamit ang mga pagkakataon, talento, at mga ugnayang ibinigay ng DIYOS sa ating pangangalaga. Pinipilit tayo nito na mag-ebanghelyo, magdisipulo, at magbabala nang may kalinawan at pagmamahal.",
          "Susing katotohanan: Habang dumarami ang ating nalalaman at mas pinagkakatiwalaan tayo, mas kailangan nating kumilos nang agaran."
        ]
      },
      {
        "id": "env-6-5",
        "number": 5,
        "title": "Ang Katotohanan ng Pagkawala at Pagsisisi sa Paghatol",
        "paragraphs": [
          "Inilarawan ni HESUS ang tagpo ng mga itinaboy - pagsisisi, panghihinayang, at mapait na panaghoy (Lucas 13:28). Ang impiyerno ay hindi lamang kawalan ng pagpapala; ito ay ang karanasan ng hindi na mababawi na pagkawala - pagkawalay sa DIYOS, kalungkutan para sa kung ano ang maaaring nangyari, at ang buong bunga ng pagtanggi sa TAGAPAGLIGTAS. Ang mga larawang ito ay hindi para sa sensasyonalismo kundi para sa matino at taos-pusong pagmamadali sa misyon."
        ]
      },
      {
        "id": "env-6-6",
        "number": 6,
        "title": "Paano Tayo Tumutugon - Awa na Nagbabala, Saksi na Nagmamahal",
        "paragraphs": [
          "Ang doktrina ng walang hanggang kaparusahan ay hindi dapat kailanman magpatigas ng ating mga puso laban sa mga makasalanan. Bagkus, dapat itong magbunga ng banal na habag. Ang pakiusap ni Spurgeon - na kung ang mga makasalanan ay kailangang mapahamak, hayaan silang dumaan sa ating mapagmahal na mga kamay at panalangin sa halip na dahil sa kapabayaan - ay huwaran ng posturang pastoral na dapat nating gawin. Ang turo ni HESUS ay nagpapadala sa atin ng dalawang sabay na salpok: pagpapahayag ng awa ng DIYOS at babala tungkol sa mga nakataya. Dapat tayong maging apurahan, malinaw, at puno ng pagmamahal.",
          "Praktikal na implikasyon: ipangaral ang buong Ebanghelyo (babala at pangako), manalangin nang madalian para sa mga nawawala, at personal na tumulong sa mga nasa panganib - pamilya, kapitbahay, at kasamahan."
        ]
      },
      {
        "id": "env-6-conc",
        "number": 7,
        "title": "Konklusyon",
        "paragraphs": [
          "Ang mga turo ni HESUS tungkol sa walang hanggang parusa ay matindi dahil ang nakataya ay walang hanggan. Tinatawagan Niya tayo sa matino at tapat na katapatan: magbabala gamit ang mga salita, magtagumpay gamit ang pag-ibig, mamagitan gamit ang pagnanasa. Ang katotohanan ng paghuhukom at ang katotohanan ng pag-asa ay magkaugnay - ang pag-asang iniaalok ni KRISTO, ang paghuhukom na tumatawag sa mga kalalakihan at kababaihan na magsisi. Ang ating tugon ay mangaral, manalangin, at mamuhay sa mga paraang mag-aakay sa mga tao sa TAGAPAGLIGTAS bago pa mahuli ang lahat."
        ]
      }
    ],
    "reflectionQuestions": [
      "Paano nakakaapekto ang turo ni HESUS tungkol sa huling paghuhukom sa pagkaapurahan ng iyong pagpapatotoo sa pamilya at mga kaibigan?",
      "Sa anong mga paraan maipapahayag ang mga babala tungkol sa paghatol nang may habag sa halip na pagkondena? Magbigay ng isang halimbawa.",
      "Sino sa inyong grupo ang nangangailangan ng babala at paanyaya ng Ebanghelyo ngayong linggo - at anong praktikal na hakbang ang gagawin mo upang maabot sila?",
      "Paano hinuhubog ng katotohanan ng sukdulang katarungan ng DIYOS ang iyong buhay panalangin para sa mga nawawala?"
    ],
    "prayer": "PANGINOONG HESUS, nagpapasalamat kami sa Iyong prangkang pagtuturo tungkol sa paghatol at sa Iyong matiyagang awa sa mga makasalanan. Basagin Mo ang aming mga puso para sa mga nawawala; bigyan Mo kami ng lakas ng loob na magbabala at karunungan upang akayin ang iba sa pagsisisi. Protektahan Mo kami mula sa kapalaluan, at punuin Mo kami ng habag para sa mga hindi pa nakakakilala sa Iyo. Gawin Mo kaming tapat na mga katiwala ng bawat pagkakataon upang tawagin ang mga tao sa buhay sa Iyo. Amen.",
    "challenge": "Nangangako akong regular na ipanalangin ang mga nasa panganib ng huling paghuhukom, na magsalita nang may pagmamahal at kalinawan tungkol sa alok ng kaligtasan ni KRISTO, at gumawa ng kahit isang konkretong hakbang ngayong buwan upang ibahagi ang Ebanghelyo sa isang taong hindi pa nakakakilala kay HESUS. Kay HESUKRISTO na aking PANGINOON at TAGAPAGLIGTAS, Amen."
  },
  {
    "id": "envisioning-7",
    "title": "Aralin 7: Ang Panganib ng Pagsuway ng Misyonero",
    "category": "Envisioning",
    "readingTime": "5 minutong pagbasa",
    "scriptureFocus": {
      "reference": "Jonas 1:1-10 (NIV)",
      "text": "\"Ang salita ng PANGINOON ay dumating kay Jonas na anak ni Amittai, na nagsasabi, 'Pumunta ka sa dakilang lungsod ng Nineveh, at mangaral ka laban doon, sapagkat ang kasamaan nito ay umabot sa harap ko.' Ngunit si Jonas ay tumakas mula sa PANGINOON at tumungo sa Tarsis...\""
    },
    "objectives": [
      "Upang matuto mula sa pagkabigo ni Jonas kung paano ang pagsuway sa tawag ng DIYOS bilang misyonero ay nakakaapekto sa lingkod, nakakasama sa iba, at pumupukaw ng soberanong pagtutuwid ng DIYOS.",
      "Upang tumugon nang may panibagong sensitibidad, lakas ng loob, at kahandaan para sa misyong ibinibigay ng DIYOS sa bawat isa sa atin."
    ],
    "teachingSections": [
      {
        "id": "env-7-intro",
        "number": 0,
        "title": "Panimula",
        "paragraphs": [
          "Tinatawag ng DIYOS ang mga tao para sa misyon. Minsan ang mga tawag na iyon ay malinaw at tiyak; minsan ang mga ito ay dumarating bilang isang panloob na pag-uudyok (isang rhema). Ipinapakita ng kuwento ni Jonas kung ano ang nangyayari kapag ang isang lingkod ay lumaban sa pagsusugo ng DIYOS: pagtakas, krisis, panganib sa iba, at isang masakit na proseso ng pagtutuwid. Pinag-aaralan natin si Jonas upang hindi natin maulit ang kanyang mga pagkakamali - at sa gayon ay natututuhan natin kung paano mapagmahal na ibinabalik ng DIYOS ang Kanyang bayan sa tapat na paglilingkod."
        ]
      },
      {
        "id": "env-7-1",
        "number": 1,
        "title": "Malinaw at Seryoso ang Panawagan ng DIYOS",
        "paragraphs": [
          "Nagsalita ang PANGINOON kay Jonas: \"Bumangon ka, pumaroon ka sa Nineveh... at humiyaw ka laban doon, sapagkat ang kanilang kasamaan ay umabot sa harap ko\" (Jonas 1:1-2). Ang DIYOS ay may tiyak na misyon at isang agarang mensahe. Ang tawag ng DIYOS ay may taglay na banal na layunin: ang kaluluwa ng mga tao at ang kapalaran ng isang lungsod ang nakataya. Kapag nagsalita ang DIYOS, ang Kanyang layunin ay dapat seryosohin.",
          "Paglalapat: Maging alerto sa tinig ng DIYOS - maging ito man ay isang partikular na atas o isang tawag upang magpatotoo sa mga partikular na tao sa iyong paligid."
        ]
      },
      {
        "id": "env-7-2",
        "number": 2,
        "title": "Tumakas si Jonas - Ang Pagsuway ay Maaaring Magmukhang Abala o Pagtakas",
        "paragraphs": [
          "Sa halip na sumunod, si Jonas ay \"tumayo upang tumakas patungong Tarsis mula sa harapan ng PANGINOON\" (talata 11). 3). Ang pagtakas mula sa DIYOS ay kadalasang nakasuot ng mga ordinaryong damit: paglalakbay, trabaho, mga proyekto, o \"mabubuting dahilan.\" Ang panlabas na kilos ni Jonas (paghahanap ng barko, pagbabayad ng pamasahe) ay nagtatakip ng panloob na paghihimagsik. Ang pagsuway ay hindi laging dramatiko; maaari itong maging isang huwaran ng paggawa ng sariling mga plano kapalit ng mga plano ng DIYOS.",
          "Paglalapat: Suriin ang iyong mga prayoridad. Mayroon bang mga paraan para \"mapunta ka sa Tarsis\" sa halip na pumunta sa mga taong inilagay ng DIYOS sa harap mo?"
        ]
      },
      {
        "id": "env-7-3",
        "number": 3,
        "title": "Nakialam ang DIYOS - Maaaring Maging Dramatiko ang Pagwawasto",
        "paragraphs": [
          "Nagpasabog ang DIYOS ng malakas na hangin na nagbanta sa barko (talata 4). Sinira ng banal na interbensyon ang paglipad ni Jonas. Ang disiplina ng DIYOS ay hindi parusang paghihiganti kundi isang mapagmahal at soberanong kilos upang gisingin at ibalik ang dati. Minsan, pinahihintulutan ng DIYOS ang mga bagyo upang tayo ay magbalik-loob sa Kanya. Ang Ang disiplina ay naglalayong humantong sa pagsisisi at panibagong pagsunod.",
          "Paalala pastoral: Kung ikaw ay mahaharap sa pagtutuwid, tanggapin mo ito bilang mapagmahal na disiplina ng DIYOS (Hebreo 12:6) at isang panawagan upang muling bumaling sa Kanyang misyon."
        ]
      },
      {
        "id": "env-7-4",
        "number": 4,
        "title": "Ang Ating Pagsuway ay Maaaring Maglagay sa Iba sa Panganib",
        "paragraphs": [
          "Ang mga mandaragat ay dumaing sa kanilang mga diyos at nagtapon ng mga kargamento sa dagat upang mabuhay; si Jonas ay natulog sa ilalim ng kubyerta (talata 5). Ang pagsuway ni Jonas ay lumikha ng panganib para sa mga inosenteng iba. Ang kasalanan ay bihirang makaapekto lamang sa makasalanan; ito ay kumakalat palabas - ang pamilya, mga kasamahan, mga kapitbahay, mga miyembro ng simbahan ay maaaring magdusa ng mga bunga ng ating pagtangging sumunod. Samakatuwid, ang pagsuway ng mga misyonero ay may kaakibat na gastos sa komunidad.",
          "Paglalapat: Isaalang-alang kung sino sa paligid mo ang maaapektuhan kapag ipinagpaliban o iniiwasan mo ang misyong ibinigay sa iyo ng DIYOS. Hayaang ang responsibilidad na iyon ang mag-udyok sa pagsunod."
        ]
      },
      {
        "id": "env-7-5",
        "number": 5,
        "title": "Hinahabol ng DIYOS - Mas Pinahahalagahan Niya ang Nawawala Kaysa sa Ating Kaginhawahan",
        "paragraphs": [
          "Ang natitirang bahagi ng kuwento ni Jonas (ang bagyo, ang isda, ang pagsisisi) ay nagpapakita ng walang humpay na pagmamahal ng DIYOS para sa Kanyang lingkod at sa mga nawawalang tao na dapat sana'y maabot ni Jonas. Ang puso ng DIYOS ay para sa mga makasalanan upang maligtas; Hahanapin Niya kapwa ang manggagawa at ang gawain. Ang pagtutuwid ay hindi lamang humahantong sa pagpapanumbalik ni Jonas kundi pati na rin sa pagsisisi ng Nineveh.",
          "Susing katotohanan: Ang misyon ng DIYOS ang may prayoridad; hindi Niya iiwan ang Kanyang plano dahil sa ating takot o pagtatangi."
        ]
      },
      {
        "id": "env-7-conc",
        "number": 6,
        "title": "Konklusyon",
        "paragraphs": [
          "Ang pagtakas ni Jonas ay nagbabala sa atin: ang pagsuway sa tawag ng DIYOS ay nakakapinsala sa ating sarili at sa iba at nakakasagabal sa maawaing mga layunin ng DIYOS. Gayunpaman, inaaliw din tayo ng kuwento - itinutuwid, ipinapanumbalik, at ginagamit pa rin ng DIYOS ang mga di-perpektong lingkod. Ang tamang tugon sa pagtutuwid ay pagsisisi, panibagong pagsunod, at buong pusong pakikibahagi sa misyon."
        ]
      }
    ],
    "reflectionQuestions": [
      "Tinawag ka na ba ng DIYOS para maabot ang isang tao o lugar na iyong nilalabanan? Ano ang pumigil sa iyo?",
      "Sino sa iyong pamilya, lugar ng trabaho, o kapitbahayan ang maaaring nasa panganib dahil sa iyong hindi pagkilos? Paano mababago ng kamalayang iyon ang iyong mga prayoridad?",
      "Anong praktikal na hakbang ang gagawin mo ngayong linggo upang masunod ang isang partikular na tawag sa misyon (halimbawa, magsimula ng isang espirituwal na pag-uusap, mag-imbita ng isang tao sa simbahan, simulan ang pagdidisipulo sa isang kapitbahay)?",
      "Paano mas mapapatibay at matutulungan ng ating cell group o simbahan ang isa't isa na sumunod sa mga utos ng DIYOS?"
    ],
    "prayer": "PANGINOONG HESUS, patawarin mo ako sa mga pagkakataong tinakasan ko ang Iyong pagsugo. Gisingin Mo sa akin ang isang sensitibong puso sa Iyong tinig, lakas ng loob na sumunod, at habag para sa mga taong nais Mong maabot ko. Kapag dumating ang mga bagyo, ipaalala Mo sa akin na ginagabayan Mo sila tungo sa pagsisisi. Gamitin Mo ang aking buhay, PANGINOON, upang madala ang iba sa Iyong nagliligtas na awa. Amen.",
    "challenge": "Nangangako akong tutugon sa pagsusugo ng DIYOS nang may pagsunod at pagmamahal. Kung ako ay nag-aatubili, hihilingin ko sa mga pinagkakatiwalaang pinuno na ipanalangin ako at panagutin ako para sa isang konkretong hakbang ng paglilingkod ngayong buwan. Kay HESUKRISTO na aking PANGINOON at TAGAPAGLIGTAS, Amen."
  },
  {
    "id": "envisioning-8",
    "title": "Aralin 8: Pagsuway ng Misyonero - Tugon ng DIYOS",
    "category": "Envisioning",
    "readingTime": "5 minutong pagbasa",
    "scriptureFocus": {
      "reference": "Jonas 1:7, 17 (NIV)",
      "text": "\"Kaya't nagpalabunutan sila at ang napunta kay Jonas.\"\n\"At ang PANGINOON ay nagtalaga ng isang malaking isda upang lunukin si Jonas; at si Jonas ay nasa tiyan ng isda ng tatlong araw at tatlong gabi.\""
    },
    "objectives": [
      "Upang makita kung paano hinarap at itinutuwid ng DIYOS ang pagsuway upang maibalik ang misyon.",
      "Upang maunawaan na ang ating pagsisisi ay maaaring magdulot ng kaligtasan hindi lamang para sa ating sarili kundi para rin sa iba.",
      "Upang mahikayat na tumugon nang may pagpapakumbaba at pagsunod kapag tayo ay tinawag ng DIYOS para sa misyon."
    ],
    "teachingSections": [
      {
        "id": "env-8-intro",
        "number": 0,
        "title": "Panimula",
        "paragraphs": [
          "Ang pagtakas ni Jonas mula sa DIYOS ay nagbunga ng isang krisis na kinasangkutan ng mga mandaragat, isang bagyo, at sa huli ay isang dramatikong interbensyon ng DIYOS. Itinuturo sa atin ng kuwento ni Jonas na ang pagsuway sa misyon ng DIYOS ay may mga kahihinatnan sa komunidad - ngunit hinahabol, dinidisiplina, at pinapanumbalik ng DIYOS ang mga tinawag Niya. Sa siping ito, nakikita natin ang soberanong tugon ng DIYOS at ang landas mula sa personal na pagkabigo patungo sa pagsisisi at panibagong pagsunod."
        ]
      },
      {
        "id": "env-8-1",
        "number": 1,
        "title": "Nabunyag ang Kasalanan - Nauunawaan ng Komunidad ang Sanhi",
        "paragraphs": [
          "Nang magpalabunutan ang mga mandaragat upang malaman kung sino ang nagdala ng kapahamakan sa kanila, ang napunta kay Jonas (Jonas 1:7). Madalas na inilalantad ng DIYOS ang mga pangyayari upang mabunyag ang mga nakatagong pagsuway. Ang mga bagay na pribado sa harap ng DIYOS ay maaaring maging hayag sa publiko sa mga bunga nito; ang layunin ng DIYOS sa paglalantad ng ganitong katotohanan ay upang humantong sa pag-amin at pagtutuwid, hindi lamang sa kahihiyan."
        ]
      },
      {
        "id": "env-8-2",
        "number": 2,
        "title": "Pag-amin at Kahandaang Magdala ng mga Bunga",
        "paragraphs": [
          "Kinilala ni Jonas ang kanyang pagkakasala at inialay ang kanyang sarili bilang solusyon: \"Buhatin ninyo ako at ihagis ninyo ako sa dagat... sapagkat alam ko na dahil sa akin dumating ang malakas na bagyong ito sa inyo\" (Jonas 1:12). Ang tunay na pagsisisi ay nagsisimula sa tapat na pag-amin. Ang kay Jonas Ang lakas ng loob na magkaroon ng responsibilidad — bagama't makasalanan pa rin sa harap ng DIYOS — ang unang hakbang tungo sa pagpapanumbalik. Ang pagtatapat ay ginagawang kapakumbabaan ang katigasan ng ulo."
        ]
      },
      {
        "id": "env-8-3",
        "number": 3,
        "title": "Ang Pagsisisi ay Maaaring Humantong sa Paglaya para sa Iba",
        "paragraphs": [
          "Nang sumunod ang mga mandaragat at itinapon si Jonas sa dagat, tumigil ang bagyo (Jonas 1:15). Ang pagsuko ni Jonas ay nagdulot ng agarang ginhawa para sa mga nakapaligid sa kanya. Ipinapakita nito kung paano ang ating pagsisisi at pagsunod ay makapagpapalaya sa iba mula sa bunga ng ating kasalanan. Ang espirituwal na kalusugan ng komunidad ay nakatali sa katapatan ng mga indibidwal."
        ]
      },
      {
        "id": "env-8-4",
        "number": 4,
        "title": "Maawaing Disiplina at Pagpapanumbalik ng DIYOS",
        "paragraphs": [
          "Nagtalaga ang DIYOS ng isang malaking isda upang lunukin si Jonas at ingatan siya sa loob ng tatlong araw (Jonas 1:17). Kahit na ganito ang nangyari, hindi nawala ang kamay ng DIYOS - ang Kanyang disiplina ay naglalayong ibalik ang dating kalagayan, hindi lipulin. Ang \"malaking isda\" ay isang malinaw na larawan: Mapipigilan tayo ng DIYOS kapag tayo ay tumatakbo, at gagawa Siya sa gitna ng paghihirap upang igabay tayo patungo sa Kanyang awa at misyon.",
          "Paglalapat: Ang pagsuway ay maaaring magdulot ng nakikitang mga kahihinatnan; maging handa na harapin ang katotohanan nang tapat. Ang pagtatapat ay hindi lamang para sa personal na kapayapaan kundi para sa paggaling ng mga naapektuhan. Asahan na ang pagtutuwid ng DIYOS - gaano man kahirap - ay nilayon upang ibalik ka sa paglilingkod. Tandaan: Itinutuloy ng DIYOS ang misyon kahit na ang Kanyang mga lingkod ay nabibigo; ginagamit Niya maging ang ating mga pagkabigo para sa Kanyang mga layunin kapag tayo ay bumalik."
        ]
      }
    ],
    "reflectionQuestions": [
      "Naaalala mo ba ang isang pagkakataon na naapektuhan ng iyong pagsuway ang iba? Paano binago ng iyong pagtatapat o pagsisisi ang sitwasyon?",
      "Aling hakbang ang pinakamahirap para sa iyo: ang pag-amin sa pagkakamali, ang pagsuko sa mga kahihinatnan, o ang pagtitiwala sa gawaing pagtutuwid ng DIYOS? Bakit?",
      "Sino sa mga nakapaligid sa iyo ang nangangailangan ng ginhawa na maaaring magmula sa iyong mapagkumbabang pagsunod? Anong partikular na aksyon ang gagawin mo ngayong linggo?",
      "Paano binabago ng pagkaalam na ang DIYOS ay nagdidisiplina upang ibalik (hindi upang sirain) ang paraan ng iyong pagtugon kapag itinuwid?"
    ],
    "prayer": "PANGINOONG HESUS, patawarin Mo po ako sa mga pagkakataong tinakbuhan ko ang Iyong tawag. Bigyan Mo po ako ng isang mapagpakumbabang puso upang agad na mangumpisal, isang matapang na puso upang tanggapin ang responsibilidad, at isang kusang-loob na espiritu upang muling isugo. Gamitin Mo po ang aking pagsisisi upang magdulot ng kagalingan sa iba at ibalik ako sa tapat na paglilingkod. Amen.",
    "challenge": "Nangangako akong mas makikinig sa tinig ng DIYOS, agad na mangumpisal kapag ako ay naliligaw ng landas, at makikipagtulungan sa Kanyang gawaing pagtutuwid upang magamit Niya akong muli sa ministeryo ng Ebanghelyo. Kay HESUKRISTO na aking PANGINOON at TAGAPAGLIGTAS, Amen."
  }
];

export const TAGALOG_LESSONS_MAP: Record<string, LessonData> = Object.fromEntries(
  TAGALOG_LESSONS_LIST.map((lesson) => [lesson.id, lesson])
);

export const TAGALOG_LESSONS_COUNT = TAGALOG_LESSONS_LIST.length;
