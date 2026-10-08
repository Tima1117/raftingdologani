export type Lang = "en" | "ru" | "ka";
export type Text = Record<Lang, string>;
export const t = (en: string, ru: string, ka: string): Text => ({ en, ru, ka });

export type Kind = "rafting" | "land" | "combo";

export type Tour = {
  id: string;
  n: number;
  kind: Kind;
  name: Text;
  photo: string;
  photoPos?: string;
  duration: Text;
  level: Text;
  stops: Text[];
  includes: Text;
  price: number;
  priceUnit: "pp" | "group";
  tag?: Text;
};

export const kinds: { id: Kind | "all"; label: Text }[] = [
  { id: "all", label: t("All tours", "Все туры", "ყველა ტური") },
  { id: "rafting", label: t("Rafting", "Рафтинг", "რაფტინგი") },
  { id: "land", label: t("Horses & buggy", "Лошади и багги", "ცხენები და ბაგი") },
  { id: "combo", label: t("Combo days", "Комбо-дни", "კომბო დღეები") },
];

export const tours: Tour[] = [
  {
    id: "classic", n: 1, kind: "rafting", photo: "/images/raft-guests.webp", price: 25, priceUnit: "pp",
    name: t("Classic rafting, 8 km", "Классический рафтинг, 8 км", "კლასიკური რაფტინგი, 8 კმ"),
    duration: t("2–3 h", "2–3 ч", "2–3 სთ"),
    level: t("Rapids class II–III", "Пороги II–III категории", "II–III კატეგორიის ზღურბლები"),
    stops: [t("Briefing, helmets and vests at the base", "Инструктаж, шлемы и жилеты на базе", "ინსტრუქტაჟი, ჩაფხუტები და ჟილეტები ბაზაზე"), t("8 km down the Acharistskali", "8 км по Аджарисцкали", "8 კმ აჭარისწყალზე"), t("Swim stop and jumps from the raft", "Остановка на купание и прыжки с рафта", "გაჩერება საბანაოდ და ნახტომები რაფტიდან"), t("Coffee and snacks on the family terrace", "Кофе и закуски на семейной террасе", "ყავა და წასახემსებელი ოჯახურ ტერასაზე")],
    includes: t("Raft, paddle, helmet, life vest, instructor-captain in the boat, transfer back to the base, coffee after the river.", "Рафт, весло, шлем, спасжилет, инструктор-капитан в лодке, трансфер обратно на базу, кофе после реки.", "რაფტი, ნიჩაბი, ჩაფხუტი, სამაშველო ჟილეტი, ინსტრუქტორი-კაპიტანი ნავში, ტრანსფერი ბაზაზე, ყავა მდინარის შემდეგ."),
    tag: t("Most booked", "Самый популярный", "ყველაზე პოპულარული"),
  },
  {
    id: "family", n: 2, kind: "rafting", photo: "/images/kids.webp", photoPos: "50% 30%", price: 18, priceUnit: "pp",
    name: t("Family rafting, 4 km", "Семейный рафтинг, 4 км", "საოჯახო რაფტინგი, 4 კმ"),
    duration: t("1.5 h", "1,5 ч", "1,5 სთ"),
    level: t("Calm water, kids from 6", "Спокойная вода, дети от 6 лет", "მშვიდი წყალი, ბავშვები 6 წლიდან"),
    stops: [t("Short briefing for kids and parents", "Короткий инструктаж для детей и родителей", "მოკლე ინსტრუქტაჟი ბავშვებისა და მშობლებისთვის"), t("4 km of the gentler lower section", "4 км спокойного нижнего участка", "4 კმ მშვიდი ქვედა მონაკვეთი"), t("Splash fights and photos on the water", "Брызги, игры и фото на воде", "წყლის თამაშები და ფოტოები წყალზე"), t("Corn and tea at the base", "Кукуруза и чай на базе", "სიმინდი და ჩაი ბაზაზე")],
    includes: t("Everything from the classic tour, kids' vests and helmets, two captains for larger families.", "Всё как в классическом туре, детские жилеты и шлемы, два капитана для больших семей.", "ყველაფერი კლასიკური ტურიდან, საბავშვო ჟილეტები და ჩაფხუტები, ორი კაპიტანი დიდი ოჯახებისთვის."),
    tag: t("With kids", "С детьми", "ბავშვებთან ერთად"),
  },
  {
    id: "horses", n: 3, kind: "land", photo: "/images/horses.webp", photoPos: "50% 45%", price: 20, priceUnit: "pp",
    name: t("Horse ride to the waterfalls", "Конная прогулка к водопадам", "ცხენით სეირნობა ჩანჩქერებამდე"),
    duration: t("2 h", "2 ч", "2 სთ"),
    level: t("No experience needed", "Опыт не нужен", "გამოცდილება არ არის საჭირო"),
    stops: [t("Meet the horses at the base", "Знакомство с лошадьми на базе", "ცხენების გაცნობა ბაზაზე"), t("Forest trail above the river", "Лесная тропа над рекой", "ტყის ბილიკი მდინარის ზემოთ"), t("Two waterfalls and a river crossing", "Два водопада и переправа через реку", "ორი ჩანჩქერი და მდინარის გადასასვლელი"), t("Walk, trot or canter, guide beside you", "Шаг, рысь или галоп, гид рядом", "ნაბიჯით, ჭენებით ან გალოპით, გიდი გვერდით")],
    includes: t("Horse, saddle, helmet, guide on horseback, photo stops at both waterfalls.", "Лошадь, седло, шлем, конный гид, фото-остановки у обоих водопадов.", "ცხენი, უნაგირი, ჩაფხუტი, გიდი ცხენზე, ფოტო-გაჩერებები ორივე ჩანჩქერთან."),
  },
  {
    id: "buggy", n: 4, kind: "land", photo: "/images/buggy-trail.webp", photoPos: "50% 40%", price: 40, priceUnit: "group",
    name: t("Buggy ride through the mountains", "Багги по горным дорогам", "ბაგით მთის გზებზე"),
    duration: t("1.5 h", "1,5 ч", "1,5 სთ"),
    level: t("Driver's licence not required", "Права не нужны", "მართვის მოწმობა არ არის საჭირო"),
    stops: [t("Village road out of Dologani", "Деревенская дорога из Dologani", "სოფლის გზა დოლოგანიდან"), t("Climb to the viewpoint over the gorge", "Подъём на смотровую над ущельем", "ასვლა ხეობის სათვალთვალო წერტილამდე"), t("Mud, streams and a mountain picnic spot", "Грязь, ручьи и место для пикника в горах", "ტალახი, ნაკადულები და პიკნიკის ადგილი მთაში"), t("Back along the river", "Назад вдоль реки", "უკან მდინარის გასწვრივ")],
    includes: t("Buggy for two, helmets, fuel, guide in the lead vehicle.", "Багги на двоих, шлемы, топливо, гид на ведущей машине.", "ბაგი ორისთვის, ჩაფხუტები, საწვავი, გიდი წამყვან მანქანაში."),
  },
  {
    id: "combo", n: 5, kind: "combo", photo: "/images/jump.webp", price: 55, priceUnit: "pp",
    name: t("Rafting + buggy half-day", "Рафтинг + багги за полдня", "რაფტინგი + ბაგი ნახევარი დღე"),
    duration: t("4–5 h", "4–5 ч", "4–5 სთ"),
    level: t("Back in Batumi by the evening", "Вечером снова в Батуми", "საღამოს ისევ ბათუმში"),
    stops: [t("Classic 8 km rafting", "Классический рафтинг 8 км", "კლასიკური რაფტინგი 8 კმ"), t("Lunch at the family house", "Обед в семейном доме", "სადილი ოჯახურ სახლში"), t("Buggy ride to the viewpoint", "Багги до смотровой", "ბაგით სათვალთვალო წერტილამდე"), t("Horses instead of buggies on request", "Лошади вместо багги по запросу", "ცხენები ბაგის ნაცვლად სურვილისამებრ")],
    includes: t("Both activities, all equipment, lunch and coffee. Transfer from Batumi can be arranged.", "Обе активности, всё снаряжение, обед и кофе. Трансфер из Батуми организуем по запросу.", "ორივე აქტივობა, მთელი აღჭურვილობა, სადილი და ყავა. ტრანსფერი ბათუმიდან შეთანხმებით."),
    tag: t("Best value", "Выгодно", "საუკეთესო ფასი"),
  },
  {
    id: "group", n: 6, kind: "combo", photo: "/images/rafts-shore.webp", price: 20, priceUnit: "pp",
    name: t("Groups and company days", "Группы и корпоративы", "ჯგუფები და კორპორატიული დღეები"),
    duration: t("3–6 h", "3–6 ч", "3–6 სთ"),
    level: t("From 8 people", "От 8 человек", "8 ადამიანიდან"),
    stops: [t("Several rafts launch together", "Несколько рафтов стартуют вместе", "რამდენიმე რაფტი ერთად იწყებს"), t("Raft race on the calm sections", "Гонка рафтов на спокойных участках", "რაფტების რბოლა მშვიდ მონაკვეთებზე"), t("Supra-style table on the terrace", "Стол по-грузински на террасе", "სუფრა ტერასაზე"), t("Horses and buggies for those who want more", "Лошади и багги для тех, кому мало", "ცხენები და ბაგი მათთვის, ვისაც მეტი უნდა")],
    includes: t("One captain per raft, all equipment, table with local food on request, group photos.", "Капитан в каждом рафте, всё снаряжение, стол с местной едой по запросу, групповые фото.", "კაპიტანი თითოეულ რაფტში, მთელი აღჭურვილობა, სუფრა ადგილობრივი კერძებით სურვილისამებრ, ჯგუფური ფოტოები."),
  },
];

export type Review = { author: string; date: Text; text: Text };

export const reviews: Review[] = [
  {
    author: "Matas Vaisnoras", date: t("5 months ago", "5 месяцев назад", "5 თვის წინ"),
    text: t("David made sure we would have the best experience rafting. Made sure we'd be safe and have a great vibe throughout our adventure! Also speaks perfect English, so it's easy for tourists to engage in a conversation or with any questions you have. 10/10", "Давид сделал всё, чтобы рафтинг получился лучшим: следил за безопасностью и держал отличное настроение всю дорогу. Прекрасно говорит по-английски, так что туристам легко общаться и задавать вопросы. 10 из 10.", "დავითმა ყველაფერი გააკეთა, რომ რაფტინგი საუკეთესო ყოფილიყო: უსაფრთხოებასაც უვლიდა და განწყობასაც მთელი გზა. შესანიშნავად ლაპარაკობს ინგლისურად, ასე რომ ტურისტებს ადვილად შეუძლიათ საუბარი და კითხვების დასმა. 10/10."),
  },
  {
    author: "Albert Pol", date: t("4 months ago", "4 месяца назад", "4 თვის წინ"),
    text: t("We had a great time, a great place for rafting. The route wasn't too demanding, so you could relax. Thank you to David and his family for the delicious coffee and snacks. I recommend it to everyone, beautiful views and a great atmosphere.", "Отлично провели время, прекрасное место для рафтинга. Маршрут не слишком сложный, можно расслабиться. Спасибо Давиду и его семье за вкусный кофе и закуски. Рекомендую всем: красивые виды и отличная атмосфера.", "შესანიშნავად გავატარეთ დრო, მშვენიერი ადგილია რაფტინგისთვის. მარშრუტი არც ისე რთულია, შეგიძლია დაისვენო. მადლობა დავითსა და მის ოჯახს გემრიელი ყავისა და წასახემსებლისთვის. ყველას ვურჩევ: ლამაზი ხედები და კარგი ატმოსფერო."),
  },
  {
    author: "Dam Vko", date: t("a year ago", "год назад", "ერთი წლის წინ"),
    text: t("Done 8 km rafting with kids (11, 10, 6 years old) yesterday. We had a blast, fun and adventurous, and after we continued chit-chatting on the terrace for quite some time. David, Nicola, take care and maybe one day our paths cross again.", "Вчера прошли 8 км рафтинга с детьми 11, 10 и 6 лет. Было здорово, весело и по-настоящему приключенчески, а потом ещё долго болтали на террасе. Давид, Никола, берегите себя, может, ещё пересечёмся.", "გუშინ 8 კმ რაფტინგი გავიარეთ ბავშვებთან ერთად (11, 10 და 6 წლის). იყო სახალისო და სათავგადასავლო, შემდეგ კი დიდხანს ვსაუბრობდით ტერასაზე. დავით, ნიკოლა, გაუფრთხილდით თავს, იქნებ კიდევ შევხვდეთ."),
  },
  {
    author: "Moayad Mostafa", date: t("4 months ago", "4 месяца назад", "4 თვის წინ"),
    text: t("The rafting was absolutely fantastic and fun. I advise anyone planning to do this activity to be prepared and wear appropriate clothing because they'll get soaked. David was a very classy and thoughtful person.", "Рафтинг был просто фантастическим и весёлым. Советую всем, кто собирается, подготовиться и одеться правильно: промокнете насквозь. Давид — очень достойный и внимательный человек.", "რაფტინგი იყო ფანტასტიკური და სახალისო. ვურჩევ ყველას, ვინც აპირებს, მოემზადოს და შესაფერისად ჩაიცვას, რადგან სრულად დასველდებით. დავითი ძალიან თავაზიანი და ყურადღებიანი ადამიანია."),
  },
  {
    author: "Akkenzhe Sultan", date: t("2 months ago", "2 месяца назад", "2 თვის წინ"),
    text: t("Amazing rafting and buggies with David. We felt like VIP guests. Only a few hours, not like other tours which take all day. We were completely amazed. Recommend!", "Потрясающий рафтинг и багги с Давидом. Чувствовали себя VIP-гостями. Всего несколько часов, а не целый день, как у других туров. Мы в полном восторге. Рекомендуем!", "საოცარი რაფტინგი და ბაგი დავითთან ერთად. VIP სტუმრებად ვგრძნობდით თავს. მხოლოდ რამდენიმე საათი და არა მთელი დღე, როგორც სხვა ტურებში. აღფრთოვანებული დავრჩით. გირჩევთ!"),
  },
  {
    author: "Benas Mikitavičius", date: t("5 months ago", "5 месяцев назад", "5 თვის წინ"),
    text: t("Amazing rafting, the host was very friendly and hospitable. We were greeted with drinks and food. Highly recommend.", "Потрясающий рафтинг, хозяин очень дружелюбный и гостеприимный. Нас встретили напитками и едой. Очень рекомендую.", "საოცარი რაფტინგი, მასპინძელი ძალიან მეგობრული და სტუმართმოყვარე. სასმელითა და საჭმლით დაგვხვდნენ. ნამდვილად გირჩევთ."),
  },
  {
    author: "Юлия Волкова", date: t("3 years ago", "3 года назад", "3 წლის წინ"),
    text: t("A very nice place and a friendly host! We loved everything and had a great time. At the end they treated us to delicious tea, coffee and corn, and we learned about wonderful places in Georgia. I highly recommend it!", "Очень хорошее место и приветливый хозяин! Нам всё понравилось, прекрасно провели время. В конце угостили вкусным чаем, кофе и кукурузой и рассказали о замечательных местах Грузии. Очень рекомендую!", "ძალიან კარგი ადგილი და მეგობრული მასპინძელი! ყველაფერი მოგვეწონა, შესანიშნავად გავატარეთ დრო. ბოლოს გემრიელი ჩაით, ყავითა და სიმინდით გაგვიმასპინძლდნენ და საქართველოს მშვენიერი ადგილების შესახებ გვიამბეს. ნამდვილად გირჩევთ!"),
  },
  {
    author: "Amjeed Alrefie", date: t("a year ago", "год назад", "ერთი წლის წინ"),
    text: t("Wow, one of the most enjoyable moments! Our companions David and Nico were so respectful and kind. They treated us to a traditional homemade coffee during the trip!", "Вау, один из самых приятных моментов! Наши сопровождающие Давид и Нико были очень уважительными и добрыми. Во время поездки угостили нас традиционным домашним кофе!", "ვაუ, ერთ-ერთი ყველაზე სასიამოვნო მომენტი! ჩვენი თანმხლები დავითი და ნიკო ძალიან პატივისცემით და სიკეთით გვექცეოდნენ. მოგზაურობისას ტრადიციული სახლის ყავით გაგვიმასპინძლდნენ!"),
  },
  {
    author: "Sultan", date: t("3 years ago", "3 года назад", "3 წლის წინ"),
    text: t("One of the best rafting spots in Georgia, I highly recommend it. The staff are respectful and their prices are reasonable.", "Одно из лучших мест для рафтинга в Грузии, очень рекомендую. Персонал уважительный, цены разумные.", "საქართველოში რაფტინგის ერთ-ერთი საუკეთესო ადგილია, ნამდვილად გირჩევთ. პერსონალი თავაზიანია და ფასები გონივრული."),
  },
  {
    author: "Антон Щевченко", date: t("a year ago", "год назад", "ერთი წლის წინ"),
    text: t("An incredibly friendly, fun guide and a hospitable owner. The whole family loved it, we were very satisfied. We highly recommend it to everyone.", "Невероятно дружелюбный, весёлый гид и гостеприимный хозяин. Всей семье очень понравилось, остались очень довольны. От души рекомендуем всем.", "წარმოუდგენლად მეგობრული, მხიარული გიდი და სტუმართმოყვარე მასპინძელი. მთელ ოჯახს მოეწონა, ძალიან კმაყოფილები დავრჩით. ყველას ვურჩევთ."),
  },
  {
    author: "hussein alssaka", date: t("2 years ago", "2 года назад", "2 წლის წინ"),
    text: t("The rafting is beautiful, the boat owner David is excellent and a very respectable man, and the price is reasonable.", "Рафтинг прекрасный, хозяин лодки Давид — отличный и очень достойный человек, цена разумная.", "რაფტინგი მშვენიერია, ნავის მფლობელი დავითი შესანიშნავი და ღირსეული ადამიანია, ფასი კი გონივრული."),
  },
  {
    author: "Розалия Арсланова", date: t("3 years ago", "3 года назад", "3 წლის წინ"),
    text: t("Everything was top-notch, we had a blast and a rush of adrenaline! I recommend whitewater rafting here to everyone.", "Всё было на высшем уровне, оторвались по полной и получили порцию адреналина! Рекомендую рафтинг здесь всем.", "ყველაფერი უმაღლეს დონეზე იყო, გავერთეთ და ადრენალინის დოზაც მივიღეთ! აქ რაფტინგს ყველას ვურჩევ."),
  },
];

export type Photo = { src: string; w: number; h: number; cap: Text };
export const gallery: Photo[] = [
  { src: "/images/raft-guests.webp", w: 1400, h: 788, cap: t("On the Acharistskali", "На Аджарисцкали", "აჭარისწყალზე") },
  { src: "/images/group.webp", w: 1200, h: 1600, cap: t("Before the launch", "Перед стартом", "სტარტის წინ") },
  { src: "/images/jump.webp", w: 1400, h: 788, cap: t("Jump stop", "Прыжки с рафта", "ნახტომები რაფტიდან") },
  { src: "/images/waterfall.webp", w: 1200, h: 1600, cap: t("Waterfall above the village", "Водопад над деревней", "ჩანჩქერი სოფლის ზემოთ") },
  { src: "/images/raft-group.webp", w: 1400, h: 788, cap: t("Group raft", "Групповой рафт", "ჯგუფური რაფტი") },
  { src: "/images/bridge-sky.webp", w: 1200, h: 1600, cap: t("Old bridge over the river", "Старый мост через реку", "ძველი ხიდი მდინარეზე") },
  { src: "/images/kids.webp", w: 960, h: 1280, cap: t("Family rafting", "Семейный рафтинг", "საოჯახო რაფტინგი") },
  { src: "/images/meadow-raft.webp", w: 1400, h: 1050, cap: t("Carrying the raft", "Несём рафт", "რაფტის წაღება") },
  { src: "/images/river-pov.webp", w: 1200, h: 2133, cap: t("View from the raft", "Вид с рафта", "ხედი რაფტიდან") },
  { src: "/images/rafts-shore.webp", w: 900, h: 600, cap: t("Rafts on the shore", "Рафты на берегу", "რაფტები ნაპირზე") },
  { src: "/images/horses.webp", w: 1200, h: 1600, cap: t("Horse ride", "Конная прогулка", "ცხენით სეირნობა") },
  { src: "/images/rapids.webp", w: 1200, h: 1600, cap: t("Spring high water", "Весенняя большая вода", "გაზაფხულის დიდი წყალი") },
  { src: "/images/onboard.webp", w: 1000, h: 1778, cap: t("Captain in the boat", "Капитан в лодке", "კაპიტანი ნავში") },
  { src: "/images/valley.webp", w: 1400, h: 1050, cap: t("Dologani valley", "Долина Dologani", "დოლოგანის ხეობა") },
  { src: "/images/selfie.webp", w: 480, h: 848, cap: t("Helmet selfie", "Селфи в шлеме", "სელფი ჩაფხუტით") },
  { src: "/images/bridge.webp", w: 1200, h: 1600, cap: t("The river in July", "Река в июле", "მდინარე ივლისში") },
  { src: "/images/raft-river.webp", w: 1000, h: 1778, cap: t("Calm section", "Спокойный участок", "მშვიდი მონაკვეთი") },
  { src: "/images/river-wide.webp", w: 1200, h: 1600, cap: t("Gorge below the base", "Ущелье ниже базы", "ხეობა ბაზის ქვემოთ") },
];
