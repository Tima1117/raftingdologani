"use client";

import Image from "next/image";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { useEffect, useMemo, useState } from "react";
import Lenis from "lenis";
import { tours, kinds, reviews, type Lang, type Kind } from "./data";
import { ExpandHero } from "./hero-expand";
import { DaySection, type DayCopy } from "./day-section";
import { GallerySlider } from "./gallery-slider";

const phone = "+995591054201";
const phonePretty = "+995 591 05 42 01";
const waBase = "https://wa.me/995591054201";
const placeUrl = "https://www.google.com/maps/place/Rafting+Tour+in+Dologani/@41.5453918,41.7733998,17z/data=!4m6!3m5!1s0x40678d35775ed465:0xa9317ed09b9ad5b!8m2!3d41.5453918!4d41.7759747!16s%2Fg%2F11sjz4scdc";
const directionsUrl = "https://www.google.com/maps/dir/?api=1&destination=41.5453918,41.7759747&destination_place_id=&travelmode=driving";
const mapEmbed = "https://www.openstreetmap.org/export/embed.html?bbox=41.7560%2C41.5354%2C41.7960%2C41.5554&layer=mapnik&marker=41.5454%2C41.7760";

const copy = {
  en: {
    nav: ["Tours", "Your day", "Reviews", "Gallery", "Contacts"],
    cta: "WhatsApp",
    eyebrow: "RAFTING · HORSES · BUGGY · ADJARA MOUNTAINS",
    h1: "Whitewater and waterfalls,\n40 minutes from Batumi.",
    sub: "Rafting on the Acharistskali river from a family base in Dologani: helmets, vests and a captain in every raft, kids from 6, and coffee on the terrace after the river.",
    rating: "4.9 · 114 Google reviews",
    choose: "Choose a tour",
    write: "Write on WhatsApp",
    hint: "Scroll",
    facts: [["8 km of river", "Rapids class II–III, 2–3 hours"], ["Captain in every raft", "Briefing, helmets, vests"], ["Kids from 6", "Family route on calm water"], ["Coffee after the river", "David's family terrace"]],
    toursEyebrow: "TOURS",
    toursTitle: "Pick your adventure",
    toursLede: "Rafting is the heart of it; horses and buggies go up to the waterfalls. Everything starts at the base in Dologani on the Batumi–Akhaltsikhe road.",
    from: "from", pp: "/ person", group: "/ buggy",
    book: "Book", details: "Details", hide: "Hide",
    stopsLabel: "How it goes", includesLabel: "Included",
    priceNote: "Prices are indicative and depend on the season and group size. The final price is confirmed in WhatsApp before you pay anything.",
    day: {
      eyebrow: "HOW IT GOES", title: "Your day on the river",
      lede: "The classic 8 km tour, the way guests describe it in their reviews.",
      stops: [
        { time: "10:00", title: "Arrival at the base", text: "Dologani, 40 minutes from Batumi by car. Park, change, leave your things in the house." },
        { time: "10:20", title: "Briefing and equipment", text: "Helmet, life vest, paddle. The captain explains the commands and what to do if you end up in the water." },
        { time: "10:45", title: "Launch", text: "The rafts go in just below the base. The captain steers from the stern and gives the commands." },
        { time: "12:00", title: "Swim stop", text: "A calm pool where you can jump from the raft. Photos are taken from the boat." },
        { time: "12:45", title: "Finish, 8 km later", text: "The car with the trailer is already waiting. Fifteen minutes back to the base." },
        { time: "13:15", title: "Coffee on the terrace", text: "Turkish coffee, corn, tea and stories about Adjara. Stay as long as you like." },
      ],
      facts: [
        { b: "Safety first", s: "Helmets, vests and a captain in every raft. Briefing before every launch." },
        { b: "English, Russian, Georgian", s: "David and Nico talk to guests in their language." },
        { b: "Only a few hours", s: "Half a day instead of a full-day tour, so you are back on the beach by evening." },
      ],
      cta: "Book the classic tour",
    } as DayCopy,
    revEyebrow: "REVIEWS", revTitle: "What guests say", revLede: "Real reviews from Google Maps, 4.9 out of 5.", revMore: "Show more", revGoogle: "All 114 reviews on Google",
    galEyebrow: "GALLERY", galTitle: "On the water and above it", galLede: "Photos from our rafts, the trail to the waterfalls and the base in Dologani.",
    conEyebrow: "CONTACTS", conTitle: "Book in two minutes",
    addrLabel: "Base", addr: "Dologani, Keda municipality, Adjara",
    phoneLabel: "Phone", hoursLabel: "Hours", hours: "Every day, 10:00–20:00",
    directions: "Directions", call: "Call",
    bookTitle: "Request a tour",
    bookText: "Choose the tour and the date. The request opens in WhatsApp and we confirm the time and the price in the chat.",
    fName: "Your name", fTour: "Tour", fDate: "Date", fPeople: "People", fAny: "Not sure yet, advise me",
    send: "Send via WhatsApp",
    bookNote: "No prepayment. The booking is confirmed by our reply in WhatsApp.",
    waMsg: (tour: string, date: string, people: string, name: string) => `Hello! I'd like to book ${tour} on ${date || "…"} for ${people || "…"} people. My name is ${name || "…"}.`,
    waTour: (tour: string) => `Hello! I'm interested in "${tour}". Which dates are available?`,
    foot: "A concept website for Rafting Tour in Dologani · Adjara",
    photo: "Photo",
  },
  ru: {
    nav: ["Туры", "Ваш день", "Отзывы", "Галерея", "Контакты"],
    cta: "WhatsApp",
    eyebrow: "РАФТИНГ · ЛОШАДИ · БАГГИ · ГОРЫ АДЖАРИИ",
    h1: "Бурная вода и водопады\nв 40 минутах от Батуми.",
    sub: "Рафтинг по Аджарисцкали с семейной базы в Дологани: шлемы, жилеты и капитан в каждом рафте, дети от 6 лет и кофе на террасе после реки.",
    rating: "4.9 · 114 отзывов в Google",
    choose: "Выбрать тур",
    write: "Написать в WhatsApp",
    hint: "Листайте",
    facts: [["8 км реки", "Пороги II–III категории, 2–3 часа"], ["Капитан в каждом рафте", "Инструктаж, шлемы, жилеты"], ["Дети от 6 лет", "Семейный маршрут по спокойной воде"], ["Кофе после реки", "Семейная терраса Давида"]],
    toursEyebrow: "ТУРЫ",
    toursTitle: "Выберите приключение",
    toursLede: "Главное здесь рафтинг; лошади и багги поднимаются к водопадам. Всё начинается на базе в Дологани на дороге Батуми – Ахалцихе.",
    from: "от", pp: "/ чел.", group: "/ багги",
    book: "Забронировать", details: "Подробнее", hide: "Скрыть",
    stopsLabel: "Как проходит", includesLabel: "Включено",
    priceNote: "Цены ориентировочные и зависят от сезона и размера группы. Итоговую стоимость подтверждаем в WhatsApp до любой оплаты.",
    day: {
      eyebrow: "КАК ЭТО ПРОХОДИТ", title: "Ваш день на реке",
      lede: "Классический тур на 8 км — так, как его описывают гости в отзывах.",
      stops: [
        { time: "10:00", title: "Приезд на базу", text: "Дологани, 40 минут от Батуми на машине. Паркуетесь, переодеваетесь, вещи оставляете в доме." },
        { time: "10:20", title: "Инструктаж и снаряжение", text: "Шлем, спасжилет, весло. Капитан объясняет команды и что делать, если оказались в воде." },
        { time: "10:45", title: "Старт", text: "Рафты спускают на воду чуть ниже базы. Капитан рулит с кормы и даёт команды." },
        { time: "12:00", title: "Остановка на купание", text: "Тихая заводь, где можно прыгать с рафта. Фото снимают из лодки." },
        { time: "12:45", title: "Финиш, 8 км позади", text: "Машина с прицепом уже ждёт. Пятнадцать минут до базы." },
        { time: "13:15", title: "Кофе на террасе", text: "Кофе по-турецки, кукуруза, чай и истории об Аджарии. Сидите сколько хотите." },
      ],
      facts: [
        { b: "Безопасность прежде всего", s: "Шлемы, жилеты и капитан в каждом рафте. Инструктаж перед каждым стартом." },
        { b: "Английский, русский, грузинский", s: "Давид и Нико общаются с гостями на их языке." },
        { b: "Всего несколько часов", s: "Полдня вместо тура на целый день — к вечеру вы снова на пляже." },
      ],
      cta: "Забронировать классический тур",
    } as DayCopy,
    revEyebrow: "ОТЗЫВЫ", revTitle: "Что говорят гости", revLede: "Настоящие отзывы с Google Maps, 4.9 из 5.", revMore: "Показать ещё", revGoogle: "Все 114 отзывов в Google",
    galEyebrow: "ГАЛЕРЕЯ", galTitle: "На воде и над ней", galLede: "Фото с наших рафтов, тропы к водопадам и базы в Дологани.",
    conEyebrow: "КОНТАКТЫ", conTitle: "Бронь за две минуты",
    addrLabel: "База", addr: "Дологани, Кедский муниципалитет, Аджария",
    phoneLabel: "Телефон", hoursLabel: "Часы", hours: "Ежедневно, 10:00–20:00",
    directions: "Маршрут", call: "Позвонить",
    bookTitle: "Заявка на тур",
    bookText: "Выберите тур и дату. Заявка откроется в WhatsApp, время и цену подтвердим в чате.",
    fName: "Ваше имя", fTour: "Тур", fDate: "Дата", fPeople: "Человек", fAny: "Пока не знаю — посоветуйте",
    send: "Отправить в WhatsApp",
    bookNote: "Без предоплаты. Бронь подтверждается нашим ответом в WhatsApp.",
    waMsg: (tour: string, date: string, people: string, name: string) => `Здравствуйте! Хочу забронировать ${tour} на ${date || "…"} для ${people || "…"} чел. Меня зовут ${name || "…"}.`,
    waTour: (tour: string) => `Здравствуйте! Интересует «${tour}». Какие даты свободны?`,
    foot: "Концепт сайта для Rafting Tour in Dologani · Аджария",
    photo: "Фото",
  },
  ka: {
    nav: ["ტურები", "თქვენი დღე", "შეფასებები", "გალერეა", "კონტაქტი"],
    cta: "WhatsApp",
    eyebrow: "რაფტინგი · ცხენები · ბაგი · აჭარის მთები",
    h1: "ჩქარი წყალი და ჩანჩქერები\nბათუმიდან 40 წუთში.",
    sub: "რაფტინგი მდინარე აჭარისწყალზე ოჯახური ბაზიდან დოლოგანში: ჩაფხუტები, ჟილეტები და კაპიტანი ყველა რაფტში, ბავშვები 6 წლიდან და ყავა ტერასაზე მდინარის შემდეგ.",
    rating: "4.9 · 114 შეფასება Google-ზე",
    choose: "ტურის არჩევა",
    write: "მოწერა WhatsApp-ზე",
    hint: "ჩამოსქროლეთ",
    facts: [["8 კმ მდინარე", "II–III კატეგორიის ზღურბლები, 2–3 საათი"], ["კაპიტანი ყველა რაფტში", "ინსტრუქტაჟი, ჩაფხუტები, ჟილეტები"], ["ბავშვები 6 წლიდან", "საოჯახო მარშრუტი მშვიდ წყალზე"], ["ყავა მდინარის შემდეგ", "დავითის ოჯახური ტერასა"]],
    toursEyebrow: "ტურები",
    toursTitle: "აირჩიეთ თავგადასავალი",
    toursLede: "მთავარი აქ რაფტინგია; ცხენები და ბაგი ჩანჩქერებამდე ადიან. ყველაფერი იწყება ბაზაზე დოლოგანში, ბათუმი–ახალციხის გზაზე.",
    from: "-დან", pp: "/ ადამიანი", group: "/ ბაგი",
    book: "დაჯავშნა", details: "დეტალები", hide: "დამალვა",
    stopsLabel: "როგორ მიდის", includesLabel: "შედის ფასში",
    priceNote: "ფასები სავარაუდოა და დამოკიდებულია სეზონსა და ჯგუფის ზომაზე. საბოლოო ფასს WhatsApp-ში ვადასტურებთ ნებისმიერ გადახდამდე.",
    day: {
      eyebrow: "როგორ მიდის", title: "თქვენი დღე მდინარეზე",
      lede: "კლასიკური 8 კმ ტური ისე, როგორც სტუმრები აღწერენ შეფასებებში.",
      stops: [
        { time: "10:00", title: "ჩამოსვლა ბაზაზე", text: "დოლოგანი, ბათუმიდან 40 წუთი მანქანით. გააჩერეთ, გამოიცვალეთ, ნივთები სახლში დატოვეთ." },
        { time: "10:20", title: "ინსტრუქტაჟი და აღჭურვილობა", text: "ჩაფხუტი, სამაშველო ჟილეტი, ნიჩაბი. კაპიტანი ხსნის ბრძანებებს და რა უნდა გააკეთოთ, თუ წყალში აღმოჩნდებით." },
        { time: "10:45", title: "სტარტი", text: "რაფტები წყალში ბაზის ქვემოთ შედიან. კაპიტანი კიჩოდან მართავს და ბრძანებებს იძლევა." },
        { time: "12:00", title: "გაჩერება საბანაოდ", text: "მშვიდი გუბე, სადაც რაფტიდან ხტომა შეიძლება. ფოტოებს ნავიდან იღებენ." },
        { time: "12:45", title: "ფინიში 8 კმ-ის შემდეგ", text: "მანქანა მისაბმელით უკვე გელოდებათ. თხუთმეტი წუთი ბაზამდე." },
        { time: "13:15", title: "ყავა ტერასაზე", text: "თურქული ყავა, სიმინდი, ჩაი და ისტორიები აჭარაზე. დარჩით რამდენ ხანსაც გინდათ." },
      ],
      facts: [
        { b: "უსაფრთხოება პირველ რიგში", s: "ჩაფხუტები, ჟილეტები და კაპიტანი ყველა რაფტში. ინსტრუქტაჟი ყოველი სტარტის წინ." },
        { b: "ინგლისური, რუსული, ქართული", s: "დავითი და ნიკო სტუმრებს მათ ენაზე ესაუბრებიან." },
        { b: "მხოლოდ რამდენიმე საათი", s: "ნახევარი დღე მთელი დღის ტურის ნაცვლად — საღამოს ისევ პლაჟზე ხართ." },
      ],
      cta: "კლასიკური ტურის დაჯავშნა",
    } as DayCopy,
    revEyebrow: "შეფასებები", revTitle: "რას ამბობენ სტუმრები", revLede: "ნამდვილი შეფასებები Google Maps-დან, 4.9 5-დან.", revMore: "მეტის ჩვენება", revGoogle: "ყველა 114 შეფასება Google-ზე",
    galEyebrow: "გალერეა", galTitle: "წყალზე და მის ზემოთ", galLede: "ფოტოები ჩვენი რაფტებიდან, ჩანჩქერების ბილიკიდან და ბაზიდან დოლოგანში.",
    conEyebrow: "კონტაქტი", conTitle: "დაჯავშნა ორ წუთში",
    addrLabel: "ბაზა", addr: "დოლოგანი, ქედის მუნიციპალიტეტი, აჭარა",
    phoneLabel: "ტელეფონი", hoursLabel: "საათები", hours: "ყოველდღე, 10:00–20:00",
    directions: "მარშრუტი", call: "დარეკვა",
    bookTitle: "ტურის მოთხოვნა",
    bookText: "აირჩიეთ ტური და თარიღი. მოთხოვნა გაიხსნება WhatsApp-ში, დროსა და ფასს ჩატში დავადასტურებთ.",
    fName: "თქვენი სახელი", fTour: "ტური", fDate: "თარიღი", fPeople: "ადამიანი", fAny: "ჯერ არ ვიცი — მირჩიეთ",
    send: "გაგზავნა WhatsApp-ით",
    bookNote: "წინასწარი გადახდის გარეშე. ჯავშანი დასტურდება ჩვენი პასუხით WhatsApp-ში.",
    waMsg: (tour: string, date: string, people: string, name: string) => `გამარჯობა! მინდა დავჯავშნო ${tour} ${date || "…"}-ს ${people || "…"} ადამიანზე. მე მქვია ${name || "…"}.`,
    waTour: (tour: string) => `გამარჯობა! მაინტერესებს „${tour}“. რომელი თარიღებია თავისუფალი?`,
    foot: "კონცეპტუალური საიტი Rafting Tour in Dologani-სთვის · აჭარა",
    photo: "ფოტო",
  },
};
type Copy = typeof copy["en"];

const wa = (text: string) => `${waBase}?text=${encodeURIComponent(text)}`;
const lines = (s: string) => s.split("\n").map((l, i) => <span key={i} style={{ display: "block" }}>{i === 1 ? <em>{l}</em> : l}</span>);

const Ico = {
  clock: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="9" /><path d="M12 7v5l3 2" /></svg>,
  clockS: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="9" /><path d="M12 7v5l3 2" /></svg>,
  level: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round"><path d="M3 15c2.5 0 2.5 2.5 5 2.5s2.5-2.5 5-2.5 2.5 2.5 5 2.5 2.5-2.5 3-2.5" /><path d="M3 9c2.5 0 2.5 2.5 5 2.5S10.5 9 13 9s2.5 2.5 5 2.5S20.5 9 21 9" /></svg>,
  pin: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22s7-6.5 7-12a7 7 0 1 0-14 0c0 5.5 7 12 7 12z" /><circle cx="12" cy="10" r="2.5" /></svg>,
  phone: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 16.9v3a2 2 0 0 1-2.2 2 19.8 19.8 0 0 1-8.6-3.1 19.5 19.5 0 0 1-6-6A19.8 19.8 0 0 1 2.1 4.2 2 2 0 0 1 4.1 2h3a2 2 0 0 1 2 1.7c.1.9.4 1.9.7 2.8a2 2 0 0 1-.5 2.1L8.1 9.9a16 16 0 0 0 6 6l1.3-1.3a2 2 0 0 1 2.1-.4c.9.3 1.9.6 2.8.7a2 2 0 0 1 1.7 2z" /></svg>,
  wa: <svg viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" /></svg>,
};

const Mark = () => (
  <i aria-hidden>
    <svg viewBox="0 0 64 64"><path d="M10 38c5 0 5 5 10 5s5-5 10-5 5 5 10 5 5-5 10-5 4 5 6 5" fill="none" stroke="currentColor" strokeWidth="5" strokeLinecap="round" /><path d="M10 50c5 0 5 5 10 5s5-5 10-5 5 5 10 5 5-5 10-5 4 5 6 5" fill="none" stroke="currentColor" strokeWidth="5" strokeLinecap="round" opacity=".5" /><path d="M38 12 26 32" stroke="#fff" strokeWidth="5" strokeLinecap="round" /><path d="M41 9.5a4 4 0 0 1 2.6 6.4l-3.2 4-6-4.6 3-4.1a4 4 0 0 1 3.6-1.7z" fill="#fff" /></svg>
  </i>
);

function SmoothScroll() {
  const reduce = useReducedMotion();
  useEffect(() => {
    if (reduce) return;
    const lenis = new Lenis({ autoRaf: true, anchors: true, lerp: 0.09 });
    return () => lenis.destroy();
  }, [reduce]);
  return null;
}

function Tours({ lang, c, onPhoto }: { lang: Lang; c: Copy; onPhoto: (src: string) => void }) {
  const [kind, setKind] = useState<Kind | "all">("all");
  const [openId, setOpenId] = useState<string | null>(null);
  const list = kind === "all" ? tours : tours.filter(x => x.kind === kind);
  const unit = (u: "pp" | "group") => (u === "pp" ? c.pp : c.group);
  return (
    <section className="tours" id="tours">
      <div className="container">
        <div className="section-head">
          <div><p className="eyebrow">{c.toursEyebrow}</p><h2 className="section-title">{c.toursTitle}</h2></div>
          <p className="section-lede">{c.toursLede}</p>
        </div>
        <div className="tabs" role="tablist" style={{ marginBottom: 28 }}>
          {kinds.map(k => <button key={k.id} role="tab" aria-selected={kind === k.id} className={`tab${kind === k.id ? " active" : ""}`} onClick={() => setKind(k.id)}>{k.label[lang]}</button>)}
        </div>
        <motion.div key={kind} className="tour-grid" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3 }}>
          {list.map((x, i) => {
            const open = openId === x.id;
            return (
              <motion.article key={x.id} className="tour-card" initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.35, delay: i * 0.05 }}>
                <button className="tour-media" onClick={() => onPhoto(x.photo)} aria-label={`${c.photo}: ${x.name[lang]}`}>
                  <Image src={x.photo} alt={x.name[lang]} fill sizes="(max-width: 760px) 100vw, (max-width: 1100px) 50vw, 33vw" style={{ objectFit: "cover", objectPosition: x.photoPos || "50% 50%" }} />
                  <span className="tour-n">{String(x.n).padStart(2, "0")}</span>
                  <span className="tour-dur">{Ico.clockS}{x.duration[lang]}</span>
                  {x.tag && <span className="tour-tag">{x.tag[lang]}</span>}
                </button>
                <div className="tour-body">
                  <h3>{x.name[lang]}</h3>
                  <p className="tour-level">{Ico.level}{x.level[lang]}</p>
                  <p className="tour-stops">{x.stops.map(s => s[lang]).join(" · ")}</p>
                  <div className="tour-price">{lang === "ka" ? <><b>${x.price}</b><span>{c.from}</span><span>{unit(x.priceUnit)}</span></> : <><span>{c.from}</span><b>${x.price}</b><span>{unit(x.priceUnit)}</span></>}</div>
                  <div className="tour-actions">
                    <a className="btn btn-wa" href={wa(c.waTour(x.name[lang]))} target="_blank" rel="noopener noreferrer">{Ico.wa}{c.book}</a>
                    <button className="btn btn-outline" onClick={() => setOpenId(open ? null : x.id)} aria-expanded={open}>{open ? c.hide : c.details}</button>
                  </div>
                  <AnimatePresence initial={false}>
                    {open && (
                      <motion.div className="tour-details" initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}>
                        <div>
                          <b>{c.stopsLabel}</b>
                          <ol>{x.stops.map(s => <li key={s.en}>{s[lang]}</li>)}</ol>
                          <b>{c.includesLabel}</b>
                          <p>{x.includes[lang]}</p>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </motion.article>
            );
          })}
        </motion.div>
        <p className="price-note">{c.priceNote}</p>
      </div>
    </section>
  );
}

function Reviews({ lang, c }: { lang: Lang; c: Copy }) {
  const [n, setN] = useState(6);
  return (
    <section className="reviews" id="reviews">
      <div className="container">
        <div className="section-head">
          <div><p className="eyebrow light">{c.revEyebrow}</p><h2 className="section-title light">{c.revTitle}</h2></div>
          <p className="section-lede light">{c.revLede}</p>
        </div>
        <div className="rev-grid">
          {reviews.slice(0, n).map((r, i) => (
            <motion.article key={r.author + i} className="rev" initial={{ opacity: 0, y: 14 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-40px" }} transition={{ duration: 0.4, delay: (i % 6) * 0.05 }}>
              <div className="rev-stars">★★★★★</div>
              <p>{r.text[lang]}</p>
              <div className="rev-meta">
                <span className="rev-ava">{r.author.trim().charAt(0).toUpperCase()}</span>
                <div><b>{r.author}</b>{r.date[lang]} · Google</div>
              </div>
            </motion.article>
          ))}
        </div>
        <div className="rev-more">
          {n < reviews.length && <button className="btn btn-ghost" onClick={() => setN(n + 6)}>{c.revMore}</button>}
          <a className="btn btn-amber" href={placeUrl} target="_blank" rel="noopener noreferrer">{c.revGoogle} ↗</a>
        </div>
      </div>
    </section>
  );
}

function Contacts({ lang, c }: { lang: Lang; c: Copy }) {
  const [name, setName] = useState("");
  const [tour, setTour] = useState("");
  const [date, setDate] = useState("");
  const [people, setPeople] = useState("2");
  const msg = c.waMsg(tour || c.fAny, date, people, name);
  return (
    <section className="contacts" id="contacts">
      <div className="container">
        <div className="contacts-grid">
          <div>
            <p className="eyebrow light">{c.conEyebrow}</p>
            <h2 className="section-title light" style={{ marginBottom: 28 }}>{c.conTitle}</h2>
            <div className="contact-list">
              <div className="contact-row"><span className="strip-ico">{Ico.pin}</span><div><b>{c.addrLabel}</b><a href={placeUrl} target="_blank" rel="noopener noreferrer">{c.addr}</a></div></div>
              <div className="contact-row"><span className="strip-ico">{Ico.phone}</span><div><b>{c.phoneLabel}</b><a href={`tel:${phone}`}>{phonePretty}</a></div></div>
              <div className="contact-row"><span className="strip-ico">{Ico.clock}</span><div><b>{c.hoursLabel}</b><span>{c.hours}</span></div></div>
            </div>
            <div className="contact-actions">
              <a className="btn btn-wa" href={waBase} target="_blank" rel="noopener noreferrer">{Ico.wa}WhatsApp</a>
              <a className="btn btn-ghost" href={`tel:${phone}`}>{c.call}</a>
              <a className="btn btn-ghost" href={directionsUrl} target="_blank" rel="noopener noreferrer">{c.directions} ↗</a>
            </div>
          </div>
          <form className="book" onSubmit={e => { e.preventDefault(); window.open(wa(msg), "_blank", "noopener"); }}>
            <h3>{c.bookTitle}</h3>
            <p>{c.bookText}</p>
            <div className="book-grid">
              <div className="field full"><label htmlFor="f-name">{c.fName}</label><input id="f-name" value={name} onChange={e => setName(e.target.value)} autoComplete="name" /></div>
              <div className="field full"><label htmlFor="f-tour">{c.fTour}</label>
                <select id="f-tour" value={tour} onChange={e => setTour(e.target.value)}>
                  <option value="">{c.fAny}</option>
                  {tours.map(x => <option key={x.id} value={x.name[lang]}>{x.name[lang]}</option>)}
                </select>
              </div>
              <div className="field"><label htmlFor="f-date">{c.fDate}</label><input id="f-date" type="date" value={date} onChange={e => setDate(e.target.value)} /></div>
              <div className="field"><label htmlFor="f-people">{c.fPeople}</label>
                <select id="f-people" value={people} onChange={e => setPeople(e.target.value)}>
                  {["1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "12", "15", "20+"].map(v => <option key={v} value={v}>{v}</option>)}
                </select>
              </div>
            </div>
            <button className="btn btn-wa" type="submit">{Ico.wa}{c.send}</button>
            <p className="book-note">{c.bookNote}</p>
          </form>
        </div>
      </div>
      <div className="map-wrap" data-lenis-prevent>
        <iframe src={mapEmbed} title="Rafting Tour in Dologani on the map" loading="lazy" referrerPolicy="no-referrer-when-downgrade" allowFullScreen />
      </div>
    </section>
  );
}

export default function Home() {
  const [lang, setLang] = useState<Lang>("en");
  const [open, setOpen] = useState(false);
  const [lightbox, setLightbox] = useState<string | null>(null);
  const c = copy[lang];
  const navIds = useMemo(() => ["tours", "day", "reviews", "gallery", "contacts"], []);

  useEffect(() => { document.documentElement.lang = lang; }, [lang]);
  useEffect(() => {
    if (!lightbox) return;
    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") setLightbox(null); };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [lightbox]);

  const facts = c.facts;
  const factPhotos = ["/images/raft-guests.webp", "/images/group.webp", "/images/kids.webp", "/images/host.webp"];
  const factPos = ["50% 50%", "50% 35%", "50% 30%", "50% 20%"];

  return (
    <>
      <SmoothScroll />
      <header className="site-header">
        <div className="header-inner">
          <a className="brand" href="#top"><Mark />Rafting<em>Dologani</em></a>
          <nav className={`nav${open ? " open" : ""}`}>
            {c.nav.map((label, i) => <a key={navIds[i]} href={`#${navIds[i]}`} onClick={() => setOpen(false)}>{label}</a>)}
          </nav>
          <div className="header-actions">
            <div className="languages">
              {(["en", "ru", "ka"] as Lang[]).map(l => <button key={l} className={lang === l ? "active" : ""} onClick={() => { setLang(l); setOpen(false); }} aria-pressed={lang === l}>{l === "ka" ? "GE" : l.toUpperCase()}</button>)}
            </div>
            <a className="header-cta" href={waBase} target="_blank" rel="noopener noreferrer">{Ico.wa}<span>{c.cta}</span></a>
            <button className="mobile-toggle" aria-label="Menu" aria-expanded={open} onClick={() => setOpen(!open)}><span /><span /></button>
          </div>
        </div>
      </header>

      <main id="top">
        <ExpandHero
          words={["RAFTING", "DOLOGANI"]}
          eyebrow={c.eyebrow}
          headline={lines(c.h1)}
          sub={c.sub}
          rating={c.rating}
          primary={{ label: c.choose, href: "#tours" }}
          secondary={{ label: c.write, href: waBase }}
          hint={c.hint}
        />

        <div className="strip">
          <div className="container strip-grid">
            {facts.map(([b, sub], i) => (
              <motion.div key={b} className="fact" initial={{ opacity: 0, y: 18 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-10% 0px" }} transition={{ duration: 0.5, delay: i * 0.08 }}>
                <Image src={factPhotos[i]} alt="" fill sizes="(max-width: 760px) 50vw, 25vw" style={{ objectFit: "cover", objectPosition: factPos[i] }} />
                <div className="fact-shade" />
                <div className="fact-text"><b>{b}</b><span>{sub}</span></div>
              </motion.div>
            ))}
          </div>
        </div>

        <Tours lang={lang} c={c} onPhoto={setLightbox} />
        <DaySection c={c.day} wa={wa(c.waTour(tours[0].name[lang]))} />
        <Reviews lang={lang} c={c} />

        <section className="gallery" id="gallery">
          <div className="container">
            <div className="section-head">
              <div><p className="eyebrow">{c.galEyebrow}</p><h2 className="section-title">{c.galTitle}</h2></div>
              <p className="section-lede">{c.galLede}</p>
            </div>
          </div>
          <GallerySlider lang={lang} onPhoto={setLightbox} />
        </section>

        <Contacts lang={lang} c={c} />
      </main>

      <footer>
        <div className="container footer-inner">
          <a className="brand" href="#top"><Mark />Rafting<em>Dologani</em></a>
          <span>{c.foot}</span>
          <a href={placeUrl} target="_blank" rel="noopener noreferrer">Google Maps ↗</a>
        </div>
      </footer>

      <AnimatePresence>
        {lightbox && (
          <motion.div className="lightbox" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.2 }} onClick={() => setLightbox(null)}>
            <motion.div className="lightbox-img" initial={{ scale: 0.94 }} animate={{ scale: 1 }} exit={{ scale: 0.94 }} transition={{ duration: 0.2 }} onClick={e => e.stopPropagation()}>
              <Image src={lightbox} alt="" fill style={{ objectFit: "contain" }} sizes="100vw" />
              <button className="lightbox-close" onClick={() => setLightbox(null)} aria-label="Close">×</button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
