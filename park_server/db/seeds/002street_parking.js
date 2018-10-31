exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('street_parking').del()
    .then(function () {
      // Inserts seed entries
      return knex('street_parking').insert([
        {address: "145 Bathurst St, Toronto, ON M5V 2R2, Canada", lat_start: "43.6454090253733", lng_start: "-79.40326035834937", lat_end: "43.646372825164086", lng_end: "-79.40363318540244", hours: '[{"date":"Mon-Fri","startT":"8:00 am","endT":"9:00 pm"},{"date":"Saturday","startT":"8:00 am","endT":"9:00 pm"},{"date":"Sunday","startT":"1:00 pm","endT":"9:00 pm"}]', rate: 2, rating: 1},
        {address: "175 Bathurst St, Toronto, ON M5V 2V3 Canada", lat_start: "43.64656258040415", lng_start: "-79.40367073632865", lat_end: "43.64714484051848", lng_end: "-79.4038960418859", hours: '[{"date":"Mon-Fri","startT":"8:00 am","endT":"9:00 pm"},{"date":"Saturday","startT":"8:00 am","endT":"9:00 pm"},{"date":"Sunday","startT":"1:00 pm","endT":"9:00 pm"}]', rate: 4, rating: 3},
        {address: "613 Queen St W, Toronto, ON M5V 2B7, Canada", lat_start: "43.64718488206055", lng_start: "-79.4038165968077", lat_end: "43.64764680409505", lng_end: "-79.40154208356307", hours: '[{"date":"Mon-Fri","startT":"10:00 am","endT":"6:00 pm"},{"date":"Saturday","startT":"8:00 am","endT":"9:00 pm"},{"date":"Sunday","startT":"1:00 pm","endT":"9:00 pm"}]', rate: 2, rating: 4},
        {address: "160 Portland St, Toronto, ON M5V 3E8, Canada", lat_start: "43.64761186893932", lng_start: "-79.4014401596205", lat_end: "43.64704902196261", lng_end: "-79.40119876080917", hours:'[{"date":"Mon-Fri","startT":"9:00 am","endT":"9:00 am"}]', rate: 2, rating: 3},
        {address: "132 Portland St, Toronto, ON M5V 2N5, Canada", lat_start: "43.64684717210682", lng_start: "-79.40111293012069", lat_end: "43.64583791265353", lng_end: "-79.40068914109634", hours: '[{"date":"Mon-Fri","startT":"8:00 am","endT":"9:00 pm"},{"date":"Saturday","startT":"10:00 am","endT":"11:00 pm"},{"date":"Sunday","startT":"8:00 am","endT":"9:00 pm"}]', rate: 5, rating: 4},
        {address: "96 A Portland St, Toronto, ON M5V 2N2, Canada", lat_start: "43.645620531474876", lng_start: "-79.40062476807998", lat_end: "43.64454914131589", lng_end: "-79.40016879254745", hours: '[{"date":"Mon-Fri","startT":"9:00 pm","endT":"7:00 am"},{"date":"Saturday","startT":"8:00 am","endT":"9:00 pm"},{"date":"Sunday","startT":"1:00 pm","endT":"9:00 pm"}]', rate: 5, rating: 5},
        {address: "662 King St W, Toronto, ON M5V 1M7, Canada", lat_start: "43.64395326931725", lng_start: "-79.40251572543548 ", lat_end: "43.644281290790474", lng_end: "-79.40091981107162", hours: '[{"date":"Mon-Fri","startT":"9:00 am","endT":"9:00 pm"},{"date":"Saturday","startT":"8:00 am","endT":"9:00 pm"},{"date":"Sunday","startT":"1:00 pm","endT":"9:00 pm"}]', rate: 5, rating: 5},
        {address: "Bathurst St At King St West, Toronto, ON M5V, Canada", lat_start: "43.64375009442581", lng_start: "-79.40254386365461", lat_end: "43.64333666696274", lng_end: "-79.40237756669569", hours: '[{"date":"Mon-Fri","startT":"8:00 am","endT":"9:00 pm"},{"date":"Saturday","startT":"8:00 am","endT":"9:00 pm"},{"date":"Sunday","startT":"1:00 pm","endT":"9:00 pm"}]', rate: 4, rating: 3},
        {address: "25 Stewart St, Toronto, ON M5V 2V8, Canada", lat_start: "43.64349932095939", lng_start: "-79.4009297103022", lat_end: "43.64368565431155", lng_end: "-79.40000971261009 ", hours: '[{"date":"Mon-Fri","startT":"9:00 pm","endT":"7:00 am"},{"date":"Saturday","startT":"8:00 am","endT":"9:00 pm"},{"date":"Sunday","startT":"1:00 pm","endT":"9:00 pm"}]', rate: 3, rating: 5},
        {address: "56 Stewart St, Toronto, ON M5V 1H6, Canada", lat_start: "43.643229524769005", lng_start: "-79.40227349701865 ", lat_end: "43.643427504825624", lng_end: "-79.4012918085192", hours: '[{"date":"Mon-Fri","startT":"10:00 am","endT":"6:00 pm"},{"date":"Saturday","startT":"8:00 am","endT":"9:00 pm"},{"date":"Sunday","startT":"1:00 pm","endT":"9:00 pm"}]', rate: 3, rating: 5},
        {address: "55 Bathurst St, Toronto, ON M5V 2P3, Canada", lat_start: "43.643154282760456", lng_start: "-79.40232714880392 ", lat_end: "43.64271173619105", lng_end: "-79.40215682853147", hours: '[{"date":"Saturday","startT":"9:00 am","endT":"7:00 am"},{"date":"Sunday","startT":"9:00 am","endT":"7:00 am"}]', rate: 3, rating: 3},
        {address: "50 Portland Street, Toronto, ON M5V 2M7, Canada", lat_start: "43.643649550384566", lng_start: "-79.39978035906677", lat_end: "43.64324679764023", lng_end: "-79.39961808542137 ", hours: '[{"date":"Mon-Fri","startT":"9:00 pm","endT":"7:00 am"},{"date":"Saturday","startT":"9:00 pm","endT":"7:00 am"},{"date":"Sunday","startT":"9:00 pm","endT":"7:00 am"}]', rate:5, rating:3},
        {address: "49 Bathurst St, Toronto, ON M5V 2P2, Canada", lat_start: "43.642717718539124", lng_start: "-79.40198924574497", lat_end: "43.64289046735138", lng_end: "-79.40114434990528", hours: '[{"date":"Mon-Fri","startT":"8:00 am","endT":"9:00 pm"},{"date":"Saturday","startT":"10:00 am","endT":"11:00 pm"},{"date":"Sunday","startT":"8:00 am","endT":"9:00 pm"}]', rate:5, rating:3},
        {address: "524 Wellington St W, Toronto, ON M5V 2V4, Canada", lat_start: "43.642959959307966", lng_start: "-79.40080370936039", lat_end: "43.643161822225714", lng_end: "-79.39980324539783", hours: '[{"date":"Mon-Fri","startT":"8:00 am","endT":"9:00 pm"},{"date":"Saturday","startT":"8:00 am","endT":"9:00 pm"},{"date":"Sunday","startT":"1:00 pm","endT":"9:00 pm"}]', rate:5, rating:3},
        {address: "2 Stewart St, Toronto, ON M5V 1H6, Canada", lat_start: "43.64376107355607", lng_start: "-79.39983581557681", lat_end: "43.644296778051654", lng_end: "-79.40004502787997", hours: '[{"date":"Mon-Fri","startT":"9:00 pm","endT":"7:00 am"},{"date":"Saturday","startT":"8:00 am","endT":"9:00 pm"},{"date":"Sunday","startT":"1:00 pm","endT":"9:00 pm"}]', rate:5, rating:3},
        {address: "66 Browns Ln, Toronto, ON M5V 2P9, Canada", lat_start: "43.64512826877011", lng_start: "-79.40317043913888", lat_end: "43.64457510322585", lng_end: "-79.40293708695458", hours: '[{"date":"Mon-Fri","startT":"9:00 pm","endT":"7:00 am"},{"date":"Saturday","startT":"8:00 am","endT":"9:00 pm"},{"date":"Sunday","startT":"1:00 pm","endT":"9:00 pm"}]', rate:4, rating:4},
        {address: "66 Browns Ln, Toronto, ON M5V 2P9, Canada", lat_start: "43.64450744196998", lng_start: "-79.40291294707345", lat_end: "43.64397950319313", lng_end: "-79.40269300593422", hours: '[{"date":"Saturday","startT":"8:00 am","endT":"9:00 pm"},{"date":"Sunday","startT":"1:00 pm","endT":"9:00 pm"}]', rate:4, rating:4},
        {address: "537 Adelaide St W, Toronto, ON M5V 2R1, Canada", lat_start: "43.645215369934526", lng_start: "-79.40311448724941", lat_end: "43.645452161705826", lng_end: "-79.40189139993862", hours: '[{"date":"Mon-Fri","startT":"10:00 am","endT":"6:00 pm"},{"date":"Saturday","startT":"8:00 am","endT":"9:00 pm"},{"date":"Sunday","startT":"1:00 pm","endT":"9:00 pm"}]', rate:4, rating:2},
        {address: "499 Adelaide St W, Toronto, ON M5V 1T4, Canada", lat_start: "43.64546962991428", lng_start: "-79.4017438784428", lat_end: "43.64568312982939", lng_end: "-79.40071122797207", hours: '[{"date":"Mon-Fri","startT":"8:00 am","endT":"9:00 pm"},{"date":"Saturday","startT":"10:00 am","endT":"11:00 pm"},{"date":"Sunday","startT":"8:00 am","endT":"9:00 pm"}]', rate:3, rating:2},
        {address: "606 King St W, Toronto, ON M5V 1M6, Canada", lat_start: "43.64432721927916", lng_start: "-79.4007590404346", lat_end: "43.644441735142095", lng_end: "-79.40017968328738", hours: '[{"date":"Mon-Fri","startT":"9:00 am","endT":"9:00 pm"},{"date":"Saturday","startT":"8:00 am","endT":"9:00 pm"},{"date":"Sunday","startT":"1:00 pm","endT":"9:00 pm"}]', rate:3, rating:4},
        {address: "555 Wellington St W, Toronto, ON M5V 1G3, Canada", lat_start: "43.642438381886556", lng_start: "-79.4031253965752", lat_end: "43.642622777525666", lng_end: "-79.40223758539128", hours: '[{"date":"Mon-Fri","startT":"9:00 am","endT":"9:00 pm"},{"date":"Saturday","startT":"8:00 am","endT":"9:00 pm"},{"date":"Sunday","startT":"1:00 pm","endT":"9:00 pm"}]', rate:4, rating:1},
        {address: "600 Wellington St W, Toronto, ON M5V 2X5, Canada", lat_start: "43.64213752462876 ", lng_start: "-79.40468644222187", lat_end: "43.64242285380692", lng_end: "-79.40322195609974", hours: '[{"date":"Mon-Fri","startT":"9:00 pm","endT":"7:00 am"},{"date":"Saturday","startT":"8:00 am","endT":"9:00 pm"},{"date":"Sunday","startT":"1:00 pm","endT":"9:00 pm"}]', rate:5, rating:2},
        {address: "53A Tecumseth St, Toronto, ON M5V 2R8, Canada", lat_start: "43.64217345710833", lng_start: "-79.40475191959837", lat_end: "43.643268181436014", lng_end: "-79.40519180187681", hours: '[{"date":"Mon-Fri","startT":"9:00 pm","endT":"7:00 am"},{"date":"Saturday","startT":"8:00 am","endT":"9:00 pm"},{"date":"Sunday","startT":"1:00 pm","endT":"9:00 pm"}]', rate:2, rating:3},
        {address: "740 King St W, Toronto, ON M5V 1N3, Canada", lat_start: "43.64339240421297", lng_start: "-79.40518107304075", lat_end: "43.64364473093784", lng_end: "-79.40388288387754", hours: '[{"date":"Mon-Fri","startT":"9:00 pm","endT":"7:00 am"},{"date":"Saturday","startT":"9:00 pm","endT":"7:00 am"},{"date":"Sunday","startT":"9:00 pm","endT":"7:00 am"}]', rate:3, rating:4},
        {address: "677 King St W, Toronto, ON M5V 1M9, Canada", lat_start: "43.64369633024648", lng_start: "-79.40377320776378", lat_end: "43.64388945635786", lng_end: "-79.40274189839755", hours: '[{"date":"Mon-Fri","startT":"9:00 am","endT":"9:00 am"}]', rate:4, rating:5},
        {address: "701 King St W, Toronto, ON M5V 2W7, Canada", lat_start: "43.643614168138086", lng_start: "-79.40378350514766", lat_end: "43.64303963776235", lng_end: "-79.40356892842647", hours: '[{"date":"Saturday","startT":"9:00 am","endT":"7:00 am"},{"date":"Sunday","startT":"9:00 am","endT":"7:00 am"}]', rate:5, rating:1},
        {address: "570 Wellington St W, Toronto, ON M5V 2X5, Canada", lat_start: "43.64300664091852", lng_start: "-79.40353405970927", lat_end: "43.64279119049274", lng_end: "-79.40328997868892", hours: '[{"date":"Mon-Fri","startT":"8:00 am","endT":"9:00 pm"},{"date":"Saturday","startT":"8:00 am","endT":"9:00 pm"},{"date":"Sunday","startT":"1:00 pm","endT":"9:00 pm"}]', rate:5, rating:2},
        {address: "574 Wellington St W, Toronto, ON M5V 2X5, Canada", lat_start: "43.6427209263484", lng_start: "-79.40326369307331", lat_end: "43.64246083170799", lng_end: "-79.40317786238484", hours: '[{"date":"Mon-Fri","startT":"10:00 am","endT":"6:00 pm"},{"date":"Saturday","startT":"8:00 am","endT":"9:00 pm"},{"date":"Sunday","startT":"1:00 pm","endT":"9:00 pm"}]', rate:5, rating:2},
        {address: "766 King St W, Toronto, ON M5V 1N6, Canada", lat_start: "43.64400779594844", lng_start: "-79.40549664534308", lat_end: "43.643452679109636", lng_end: "-79.40528206862189", hours: '[{"date":"Mon-Fri","startT":"8:00 am","endT":"9:00 pm"},{"date":"Saturday","startT":"10:00 am","endT":"11:00 pm"},{"date":"Sunday","startT":"8:00 am","endT":"9:00 pm"}]', rate:4, rating:3},
        {address: "99 Tecumseth St, Toronto, ON M6J 3R5, Canada", lat_start: "43.644636663372864", lng_start: "-79.40575145519949", lat_end: "43.644073788518185", lng_end: "-79.40552078522421", hours: '[{"date":"Mon-Fri","startT":"9:00 am","endT":"9:00 pm"},{"date":"Saturday","startT":"8:00 am","endT":"9:00 pm"},{"date":"Sunday","startT":"1:00 pm","endT":"9:00 pm"}]', rate:4, rating:3},
        {address: "645 Adelaide St W, Toronto, ON M6J 1A8, Canada", lat_start: "43.644691397251876", lng_start: "-79.40571390427328", lat_end: "43.644802030554075", lng_end: "-79.40510236061789", hours: '[{"date":"Mon-Fri","startT":"9:00 pm","endT":"7:00 am"},{"date":"Saturday","startT":"8:00 am","endT":"9:00 pm"},{"date":"Sunday","startT":"1:00 pm","endT":"9:00 pm"}]', rate:3, rating:2},
        {address: "645 Adelaide St W, Toronto, ON M6J 1A8, Canada", lat_start: "43.644691397251876", lng_start: "-79.40571390427328", lat_end: "43.644802030554075", lng_end: "-79.40510236061789", hours: '[{"date":"Mon-Fri","startT":"9:00 pm","endT":"7:00 am"},{"date":"Saturday","startT":"8:00 am","endT":"9:00 pm"},{"date":"Sunday","startT":"1:00 pm","endT":"9:00 pm"}]', rate:3, rating:2},
        {address: "603 Adelaide St W, Toronto, ON M6J 1A8, Canada", lat_start: "43.64464675568629", lng_start: "-79.40425478256918", lat_end: "43.64480591242061", lng_end: "-79.40345280207373", hours: '[{"date":"Mon-Fri","startT":"9:00 am","endT":"9:00 pm"},{"date":"Saturday","startT":"8:00 am","endT":"9:00 pm"},{"date":"Sunday","startT":"1:00 pm","endT":"9:00 pm"}]', rate:3, rating:4},
        {address: "628 Adelaide St W, Toronto, ON M6J 1A9, Canada", lat_start: "43.64526154765322", lng_start: "-79.40550648745864", lat_end: "43.64483066220275", lng_end: "-79.40534287270873", hours: '[{"date":"Mon-Fri","startT":"9:00 pm","endT":"7:00 am"},{"date":"Saturday","startT":"8:00 am","endT":"9:00 pm"},{"date":"Sunday","startT":"1:00 pm","endT":"9:00 pm"}]', rate:5, rating:4},
        {address: "11 Portugal Square, Toronto, ON M6J 3P1, Canada", lat_start: "43.64523049294931", lng_start: "-79.40467768487304", lat_end: "43.64547893013094", lng_end: "-79.40344923314422", hours: '[{"date":"Mon-Fri","startT":"9:00 pm","endT":"7:00 am"},{"date":"Saturday","startT":"9:00 pm","endT":"7:00 am"},{"date":"Sunday","startT":"9:00 pm","endT":"7:00 am"}]', rate:2, rating:4},
        {address: "11 Portugal Square, Toronto, ON M6J 3P1, Canada", lat_start: "43.64510045120241", lng_start: "-79.40481715974181", lat_end: "43.6448364849997", lng_end: "-79.40469646033614", hours: '[{"date":"Mon-Fri","startT":"9:00 pm","endT":"7:00 am"},{"date":"Saturday","startT":"9:00 pm","endT":"7:00 am"},{"date":"Sunday","startT":"9:00 pm","endT":"7:00 am"}]', rate:2, rating:4},
        {address: "113 Tecumseth St, Toronto, ON M6J 2H2, Canada", lat_start: "43.64473595366363", lng_start: "-79.40579731662575", lat_end: "43.64553561375625", lng_end: "-79.40611918170754", hours: '[{"date":"Mon-Fri","startT":"10:00 am","endT":"6:00 pm"},{"date":"Saturday","startT":"8:00 am","endT":"9:00 pm"},{"date":"Sunday","startT":"1:00 pm","endT":"9:00 pm"}]', rate:3, rating:5},
        {address: "688 Richmond St W, Toronto, ON M6J 1C5, Canada", lat_start: "43.6459111785969", lng_start: "-79.40627877314392", lat_end: "43.6455967523787", lng_end: "-79.40615270932022", hours: '[{"date":"Mon-Fri","startT":"10:00 am","endT":"6:00 pm"},{"date":"Saturday","startT":"8:00 am","endT":"9:00 pm"},{"date":"Sunday","startT":"1:00 pm","endT":"9:00 pm"}]', rate:3, rating:5},
        {address: "644 Richmond St W, Toronto, ON M6J 1C3, Canada", lat_start: "43.646091681793344", lng_start: "-79.4055907865316", lat_end: "43.646446863918825", lng_end: "-79.4038071175367", hours: '[{"date":"Mon-Fri","startT":"8:00 am","endT":"9:00 pm"},{"date":"Saturday","startT":"8:00 am","endT":"9:00 pm"},{"date":"Sunday","startT":"1:00 pm","endT":"9:00 pm"}]', rate:4, rating:3},
        {address: "677 Richmond St W, Toronto, ON M6J 1C2, Canada", lat_start: "43.645963582806566", lng_start: "-79.40622244675461", lat_end: "43.646072272873525", lng_end: "-79.40565515954796", hours: '[{"date":"Mon-Fri","startT":"8:00 am","endT":"9:00 pm"},{"date":"Saturday","startT":"8:00 am","endT":"9:00 pm"},{"date":"Sunday","startT":"1:00 pm","endT":"9:00 pm"}]', rate:4, rating:3},
        {address: "686 Richmond St W, Toronto, ON M6J 1C3, Canada", lat_start: "43.646228129039535", lng_start: "-79.40641179941986", lat_end: "43.64599716301147", lng_end: "-79.4063125576863", hours: '[{"date":"Mon-Fri","startT":"10:00 am","endT":"6:00 pm"},{"date":"Saturday","startT":"8:00 am","endT":"9:00 pm"},{"date":"Sunday","startT":"1:00 pm","endT":"9:00 pm"}]', rate:3, rating:3},
        {address: "727 Queen St W, Toronto, ON M6J 1G1, Canada", lat_start: "43.64660121623599", lng_start: "-79.40655732724275", lat_end: "43.646354724579076", lng_end: "-79.40645540330019", hours: '[{"date":"Mon-Fri","startT":"10:00 am","endT":"6:00 pm"},{"date":"Saturday","startT":"8:00 am","endT":"9:00 pm"},{"date":"Sunday","startT":"1:00 pm","endT":"9:00 pm"}]', rate:3, rating:2},
        {address: "727 Queen St W, Toronto, ON M6J 1G1, Canada", lat_start: "43.64659895951993", lng_start: "-79.40656113231682", lat_end: "43.64634664520375", lng_end: "-79.40645920837426", hours: '[{"date":"Mon-Fri","startT":"10:00 am","endT":"6:00 pm"},{"date":"Saturday","startT":"8:00 am","endT":"9:00 pm"},{"date":"Sunday","startT":"1:00 pm","endT":"9:00 pm"}]', rate:3, rating:2},
        {address: "691 Queen St W, Toronto, ON M6J 1E6, Canada", lat_start: "43.6466696952497", lng_start: "-79.40652358139062", lat_end: "43.647174320108356", lng_end: "-79.40408277118706", hours: '[{"date":"Mon-Fri","startT":"10:00 am","endT":"6:00 pm"},{"date":"Saturday","startT":"8:00 am","endT":"9:00 pm"},{"date":"Sunday","startT":"1:00 pm","endT":"9:00 pm"}]', rate:2, rating:4},
        {address: "35 E Bathurst St, Toronto, ON M5V 2P2, Canada", lat_start: "43.64259391924715", lng_start: "-79.402123830459", lat_end: "43.64195144326237", lng_end: "-79.40188511385668", hours: '[{"date":"Mon-Fri","startT":"10:00 am","endT":"6:00 pm"},{"date":"Saturday","startT":"8:00 am","endT":"9:00 pm"},{"date":"Sunday","startT":"1:00 pm","endT":"9:00 pm"}]', rate:3, rating:2},
        {address: "20 Niagara St, Toronto, ON M5V 3L8, Canada", lat_start: "43.64194950223692", lng_start: "-79.4016919948076", lat_end: "43.64229500378264", lng_end: "-79.40002097859133", hours: '[{"date":"Mon-Fri","startT":"8:00 am","endT":"9:00 pm"},{"date":"Saturday","startT":"10:00 am","endT":"11:00 pm"},{"date":"Sunday","startT":"8:00 am","endT":"9:00 pm"}]', rate:4, rating:2},
        {address: "9 Niagara St, Toronto, ON M5V 1C2, Canada", lat_start: "43.64232800101735", lng_start: "-79.39984229012413", lat_end: "43.64243087463269", lng_end: "-79.39934876366539", hours: '[{"date":"Mon-Fri","startT":"8:00 am","endT":"9:00 pm"},{"date":"Saturday","startT":"10:00 am","endT":"11:00 pm"},{"date":"Sunday","startT":"8:00 am","endT":"9:00 pm"}]', rate:4, rating:3},
        {address: "97 Niagara St, Toronto, ON M5V 1C2, Canada", lat_start: "43.641429620957766", lng_start: "-79.40426583464966", lat_end: "43.64170524833177", lng_end: "-79.40291400130616", hours: '[{"date":"Mon-Fri","startT":"9:00 am","endT":"9:00 pm"},{"date":"Saturday","startT":"8:00 am","endT":"9:00 pm"},{"date":"Sunday","startT":"1:00 pm","endT":"9:00 pm"}]', rate:5, rating:3},
        {address: "59 Niagara St, Toronto, ON M5V 1C3, Canada", lat_start: "43.64174406898708", lng_start: "-79.40272088225709", lat_end: "43.64188382313849", lng_end: "-79.40203423674927", hours: '[{"date":"Mon-Fri","startT":"9:00 am","endT":"9:00 pm"},{"date":"Saturday","startT":"8:00 am","endT":"9:00 pm"},{"date":"Sunday","startT":"1:00 pm","endT":"9:00 pm"}]', rate:5, rating:2},
        {address: "29 Tecumseth St, Toronto, ON M5V 2R6, Canada", lat_start: "43.64203779862929", lng_start: "-79.40471556897222", lat_end: "43.64146519421928", lng_end: "-79.40446880574285", hours: '[{"date":"Mon-Fri","startT":"9:00 pm","endT":"7:00 am"},{"date":"Saturday","startT":"8:00 am","endT":"9:00 pm"},{"date":"Sunday","startT":"1:00 pm","endT":"9:00 pm"}]', rate:2, rating:5},
        {address: "495 Wellington St W, Toronto, ON M5V 1G1, Canada", lat_start: "43.6431361341404", lng_start: "-79.39956942626384", lat_end: "43.64250336899297", lng_end: "-79.3993092519894", hours: '[{"date":"Mon-Fri","startT":"9:00 am","endT":"9:00 pm"},{"date":"Saturday","startT":"8:00 am","endT":"9:00 pm"},{"date":"Sunday","startT":"1:00 pm","endT":"9:00 pm"}]', rate:4, rating:3},
        {address: "579 Richmond St W, Toronto, ON M5V 1Y6, Canada", lat_start: "43.64651693890129", lng_start: "-79.4033411030507", lat_end: "43.64672558291632", lng_end: "-79.40229906484842", hours: '[{"date":"Mon-Fri","startT":"9:00 am","endT":"9:00 pm"},{"date":"Saturday","startT":"8:00 am","endT":"9:00 pm"},{"date":"Sunday","startT":"1:00 pm","endT":"9:00 pm"}]', rate:4, rating:2},
        {address: "572 Richmond St W, Toronto, ON M5V 1Y9, Canada", lat_start: "43.64678439682823", lng_start: "-79.40206113841026", lat_end: "43.64693578444186", lng_end: "-79.40126184012382", hours: '[{"date":"Mon-Fri","startT":"9:00 am","endT":"9:00 pm"},{"date":"Saturday","startT":"8:00 am","endT":"9:00 pm"},{"date":"Sunday","startT":"1:00 pm","endT":"9:00 pm"}]', rate:4, rating:5},
        {address: "1 Adelaide Pl, Toronto, ON M5V 2N7, Canada", lat_start: "43.64532089556725", lng_start: "-79.40176333965587", lat_end: "43.64469979905275", lng_end: "-79.40148975433635", hours: '[{"date":"Saturday","startT":"9:00 am","endT":"7:00 am"},{"date":"Sunday","startT":"9:00 am","endT":"7:00 am"}]', rate:2, rating:3},
        {address: "624 King St W, Toronto, ON M5V 1M7, Canada", lat_start: "43.644631866231876", lng_start: "-79.40133955063152", lat_end: "43.64473279496658", lng_end: "-79.4008326131277", hours: '[{"date":"Saturday","startT":"9:00 am","endT":"7:00 am"},{"date":"Sunday","startT":"9:00 am","endT":"7:00 am"}]', rate:2, rating:3},
      ]);
    });
};
 
 
 
 
 
 
  
 
 
 
 
 
 
  
 
 
 
 
  
 
 
 
  
 
  
 
 
 
  
 
  
 
 
  
 
 
  
 
 
 
 
 
  
 
 
 
  
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 