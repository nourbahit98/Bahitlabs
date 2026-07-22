import { useEffect, useMemo, useState } from "react";

const contactEmail = "nourbahit98@gmail.com";
const phoneDisplay = "+31 6 35 65 00 67";
const assetBase = import.meta.env.BASE_URL;

const services = [
  {
    id: "website",
    number: "01",
    title: "Premium website",
    short: "Voor ondernemers die online direct professioneel willen overkomen.",
    outcome: "Design, responsive bouw, contactflow en live oplevering.",
    idealFor: "ZZP, lokale bedrijven, dienstverleners",
    image: `${assetBase}images/qorder-product.png`
  },
  {
    id: "webshop",
    number: "02",
    title: "Webshop & salesflow",
    short: "Een strakke verkoopervaring voor producten, diensten of pakketten.",
    outcome: "Productstructuur, checkoutflow, conversieblokken en beheer.",
    idealFor: "Shops, food, servicepakketten",
    image: `${assetBase}images/snapmijnbrief-light.png`
  },
  {
    id: "webapp",
    number: "03",
    title: "Webapp of dashboard",
    short: "Maatwerk software voor klanten, teams of interne processen.",
    outcome: "Login, dashboard, dataflow, beheerpanelen en automatisering.",
    idealFor: "Portals, planning, klantomgevingen",
    image: `${assetBase}images/snapmijnbrief-dark.png`
  },
  {
    id: "automation",
    number: "04",
    title: "Automatisering",
    short: "Minder handmatig werk door koppelingen, formulieren en slimme workflows.",
    outcome: "Procesanalyse, automatisering, notificaties en dashboards.",
    idealFor: "Administratie, sales, intake, support",
    image: `${assetBase}images/qorder-product.png`
  },
  {
    id: "qorder",
    number: "05",
    title: "Q-order setup",
    short: "QR-bestellen voor horeca, snackbars, lunchzaken en foodtrucks.",
    outcome: "Menu, bestelpagina, QR-flow en ondernemer-dashboard.",
    idealFor: "Horeca en takeaway",
    image: `${assetBase}images/qorder-product.png`
  },
  {
    id: "technical",
    number: "06",
    title: "WTB / technisch systeem",
    short: "Digitale tools voor technische bedrijven die overzicht nodig hebben.",
    outcome: "Calculatie, projectoverzicht, rapportage of klantportaal.",
    idealFor: "WTB, HVAC, installatietechniek",
    image: `${assetBase}images/snapmijnbrief-light.png`
  }
];

const projects = [
  {
    label: "Horeca product",
    title: "Q-order",
    text: "QR-bestellen voor snackbars, lunchzaken en foodtrucks. Gasten scannen, bestellen en ondernemers houden overzicht zonder onnodige complexiteit.",
    link: "https://qorder.bahitlabs.nl/",
    cta: "Bekijk Q-order",
    image: `${assetBase}images/qorder-product.png`,
    alt: "Premium visual van Q-order QR-bestellen op een telefoon bij een QR-kaart",
    featured: true
  },
  {
    label: "Slimme tool",
    title: "SnapMijnBrief",
    text: "Een product dat moeilijke brieven begrijpelijk maakt. Uploaden of scannen, simpele uitleg krijgen en weten wat je moet doen.",
    link: "https://snapmijnbrief.nl/",
    cta: "Bekijk SnapMijnBrief",
    image: `${assetBase}images/snapmijnbrief-dark.png`,
    alt: "Telefoonschermen van SnapMijnBrief in donkere modus"
  },
  {
    label: "Maatwerk",
    title: "BahitLabs builds",
    text: "Websites, portals, dashboards en automatisering gebouwd rond het echte probleem van de ondernemer.",
    link: "#boeken",
    cta: "Boek een project",
    image: `${assetBase}images/snapmijnbrief-light.png`,
    alt: "Mobiele productschermen als voorbeeld van maatwerk webapps"
  }
];

const processSteps = [
  ["01", "Kiezen", "Selecteer de dienst die past bij jouw doel."],
  ["02", "Boeken", "Stuur je voorkeurdatum, budget en korte omschrijving."],
  ["03", "Scherpstellen", "We bepalen scope, planning en eerste versie."],
  ["04", "Lanceren", "Ik bouw, test en lever praktisch op."]
];

function App() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [formState, setFormState] = useState({
    name: "",
    company: "",
    email: "",
    phone: "",
    service: "Premium website",
    preferredDate: "",
    preferredTime: "Middag",
    budget: "",
    message: ""
  });
  const [formNote, setFormNote] = useState("Na verzenden opent je e-mailapp met je boekingsaanvraag.");

  const navItems = useMemo(
    () => [
      ["#diensten", "Diensten"],
      ["#werk", "Werk"],
      ["#proces", "Proces"],
      ["#boeken", "Boeken"]
    ],
    []
  );

  useEffect(() => {
    const update = () => setScrolled(window.scrollY > 14);
    update();
    window.addEventListener("scroll", update, { passive: true });
    return () => window.removeEventListener("scroll", update);
  }, []);

  useEffect(() => {
    document.body.classList.toggle("nav-open", menuOpen);
    return () => document.body.classList.remove("nav-open");
  }, [menuOpen]);

  function handleInput(event) {
    const { name, value } = event.target;
    setFormState((current) => ({ ...current, [name]: value }));
  }

  function selectService(service) {
    setFormState((current) => ({
      ...current,
      service: service.title,
      message:
        current.message ||
        `Ik wil graag een kennismaking boeken voor: ${service.title}.\n\nKorte uitleg: `
    }));

    document.querySelector("#boeken")?.scrollIntoView({ behavior: "smooth", block: "start" });
  }

  function handleSubmit(event) {
    event.preventDefault();

    const subject = encodeURIComponent(`Boeking via BahitLabs - ${formState.service}`);
    const body = encodeURIComponent(
      [
        "Nieuwe boekingsaanvraag via de BahitLabs website",
        "",
        `Naam: ${formState.name}`,
        `Bedrijf: ${formState.company || "-"}`,
        `E-mail: ${formState.email}`,
        `Telefoon: ${formState.phone || "-"}`,
        "",
        `Dienst: ${formState.service}`,
        `Voorkeursdatum: ${formState.preferredDate || "-"}`,
        `Voorkeurstijd: ${formState.preferredTime || "-"}`,
        `Budgetindicatie: ${formState.budget || "-"}`,
        "",
        "Bericht:",
        formState.message
      ].join("\n")
    );

    window.location.href = `mailto:${contactEmail}?subject=${subject}&body=${body}`;
    setFormNote("Je e-mailapp is geopend met je boekingsaanvraag.");
  }

  return (
    <>
      <header className={`site-header ${scrolled ? "is-scrolled" : ""}`}>
        <a className="brand" href="#home" onClick={() => setMenuOpen(false)}>
          <span className="brand-mark">B</span>
          <span>BahitLabs</span>
        </a>

        <button
          className="nav-toggle"
          type="button"
          aria-expanded={menuOpen}
          aria-controls="site-nav"
          onClick={() => setMenuOpen((open) => !open)}
        >
          Menu
        </button>

        <nav className="site-nav" id="site-nav" aria-label="Hoofdnavigatie">
          {navItems.map(([href, label]) => (
            <a key={href} href={href} onClick={() => setMenuOpen(false)}>
              {label}
            </a>
          ))}
        </nav>
      </header>

      <main id="home">
        <section className="hero section-dark">
          <div className="hero-copy">
            <p className="eyebrow">BahitLabs Studio</p>
            <h1>Boek digitale slagkracht voor je bedrijf.</h1>
            <p>
              Websites, webshops, webapps en automatisering met een strakke
              productaanpak. Kies je dienst, boek een intake en laat je idee
              professioneel bouwen.
            </p>
            <div className="hero-actions">
              <a className="button button-primary" href="#boeken">
                Boek een dienst
              </a>
              <a className="button button-secondary" href="#diensten">
                Bekijk diensten
              </a>
            </div>
            <div className="hero-metrics" aria-label="BahitLabs kenmerken">
              <span>Design</span>
              <span>Development</span>
              <span>Automatisering</span>
            </div>
          </div>

          <HeroVisual />
        </section>

        <section className="booking-band" aria-label="Snel boeken">
          <p>Direct boeken</p>
          <div>
            {services.slice(0, 4).map((service) => (
              <button key={service.id} type="button" onClick={() => selectService(service)}>
                {service.title}
              </button>
            ))}
          </div>
        </section>

        <section className="visual-strip" aria-label="BahitLabs productbeelden">
          <img
            src={`${assetBase}images/qorder-product.png`}
            alt="Q-order productvisual met telefoon en QR-bestelkaart"
          />
          <img
            src={`${assetBase}images/snapmijnbrief-light.png`}
            alt="SnapMijnBrief telefoonschermen in lichte modus"
          />
          <img
            src={`${assetBase}images/snapmijnbrief-preview.jpg`}
            alt="SnapMijnBrief previewbeeld"
          />
        </section>

        <section className="intro">
          <p className="section-kicker">Wat ik doe</p>
          <h2>Ik maak het idee achter je bedrijf digitaal boekbaar, bruikbaar en schaalbaar.</h2>
          <p>
            Geen losse website zonder richting. BahitLabs combineert design,
            development en praktische automatisering, zodat bezoekers sneller
            begrijpen wat je doet en makkelijker actie nemen.
          </p>
        </section>

        <section className="services" id="diensten" aria-labelledby="diensten-title">
          <SectionHeading
            kicker="Boekbare diensten"
            title="Kies wat je wilt laten bouwen."
            id="diensten-title"
          />
          <div className="service-grid">
            {services.map((service) => (
              <article
                className={`service-card ${formState.service === service.title ? "is-selected" : ""}`}
                key={service.id}
              >
                <div className="service-image">
                  <img src={service.image} alt="" loading="lazy" />
                </div>
                <div className="service-card-copy">
                  <span className="service-number">{service.number}</span>
                  <h3>{service.title}</h3>
                  <p>{service.short}</p>
                  <dl>
                    <div>
                      <dt>Resultaat</dt>
                      <dd>{service.outcome}</dd>
                    </div>
                    <div>
                      <dt>Voor</dt>
                      <dd>{service.idealFor}</dd>
                    </div>
                  </dl>
                </div>
                <button className="service-book" type="button" onClick={() => selectService(service)}>
                  Boek deze dienst
                </button>
              </article>
            ))}
          </div>
        </section>

        <section className="statement section-dark">
          <p className="section-kicker">De richting</p>
          <h2>Minder ruis. Meer resultaat. Sneller naar live.</h2>
          <p>
            De site voelt premium, maar blijft praktisch: duidelijke diensten,
            sterke productbeelden en een directe boekingsaanvraag per dienst.
          </p>
        </section>

        <section className="work" id="werk" aria-labelledby="werk-title">
          <SectionHeading kicker="Producten" title="Werk van BahitLabs." id="werk-title" />
          <div className="product-showcase">
            {projects.map((project) => (
              <article
                className={`product-card ${project.featured ? "product-card-featured" : ""}`}
                key={project.title}
              >
                <div className="product-image">
                  <img src={project.image} alt={project.alt} loading="lazy" />
                </div>
                <div>
                  <p className="product-label">{project.label}</p>
                  <h3>{project.title}</h3>
                  <p>{project.text}</p>
                </div>
                <a
                  href={project.link}
                  target={project.link.startsWith("http") ? "_blank" : undefined}
                  rel={project.link.startsWith("http") ? "noopener noreferrer" : undefined}
                >
                  {project.cta}
                </a>
              </article>
            ))}
          </div>
        </section>

        <section className="split section-light">
          <div>
            <p className="section-kicker">Scherper aanbod</p>
            <h2>Bezoekers hoeven niet te raden wat ze kunnen boeken.</h2>
          </div>
          <p>
            Elke dienst heeft een duidelijke ingang. Dat maakt de website
            commerciëler: iemand ziet wat jij bouwt, kiest de juiste categorie en
            stuurt direct een gerichte aanvraag.
          </p>
        </section>

        <section className="process" id="proces" aria-labelledby="proces-title">
          <SectionHeading kicker="Proces" title="Boeken zonder gedoe." id="proces-title" />
          <div className="process-line">
            {processSteps.map(([number, title, text]) => (
              <article key={number}>
                <span>{number}</span>
                <h3>{title}</h3>
                <p>{text}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="contact section-dark" id="boeken">
          <div className="contact-copy">
            <p className="section-kicker">Boeken</p>
            <h2>Boek je kennismaking.</h2>
            <p>
              Kies een dienst, geef je voorkeur door en ik ontvang direct een
              complete aanvraag in mijn mail.
            </p>
            <div className="contact-direct">
              <a href={`mailto:${contactEmail}`}>{contactEmail}</a>
              <a href="tel:+31635650067">{phoneDisplay}</a>
            </div>
          </div>

          <form className="contact-form booking-form" onSubmit={handleSubmit}>
            <div className="form-grid">
              <label>
                <span>Naam</span>
                <input
                  type="text"
                  name="name"
                  placeholder="Jouw naam"
                  value={formState.name}
                  onChange={handleInput}
                  required
                />
              </label>
              <label>
                <span>Bedrijf</span>
                <input
                  type="text"
                  name="company"
                  placeholder="Bedrijfsnaam"
                  value={formState.company}
                  onChange={handleInput}
                />
              </label>
              <label>
                <span>E-mail</span>
                <input
                  type="email"
                  name="email"
                  placeholder="jij@bedrijf.nl"
                  value={formState.email}
                  onChange={handleInput}
                  required
                />
              </label>
              <label>
                <span>Telefoon</span>
                <input
                  type="tel"
                  name="phone"
                  placeholder="+31 6 ..."
                  value={formState.phone}
                  onChange={handleInput}
                />
              </label>
              <label className="form-wide">
                <span>Dienst</span>
                <select name="service" value={formState.service} onChange={handleInput} required>
                  {services.map((service) => (
                    <option key={service.id}>{service.title}</option>
                  ))}
                </select>
              </label>
              <label>
                <span>Voorkeursdatum</span>
                <input
                  type="date"
                  name="preferredDate"
                  value={formState.preferredDate}
                  onChange={handleInput}
                />
              </label>
              <label>
                <span>Voorkeurstijd</span>
                <select
                  name="preferredTime"
                  value={formState.preferredTime}
                  onChange={handleInput}
                >
                  <option>Ochtend</option>
                  <option>Middag</option>
                  <option>Avond</option>
                  <option>Maakt niet uit</option>
                </select>
              </label>
              <label className="form-wide">
                <span>Budgetindicatie</span>
                <select name="budget" value={formState.budget} onChange={handleInput}>
                  <option value="">Kies optioneel</option>
                  <option>Tot 1.000 euro</option>
                  <option>1.000 - 2.500 euro</option>
                  <option>2.500 - 5.000 euro</option>
                  <option>5.000+ euro</option>
                  <option>Nog niet zeker</option>
                </select>
              </label>
              <label className="form-wide">
                <span>Wat wil je laten bouwen?</span>
                <textarea
                  name="message"
                  rows="5"
                  placeholder="Vertel kort wat je nodig hebt, wat er nu niet goed werkt en wanneer je wilt starten."
                  value={formState.message}
                  onChange={handleInput}
                  required
                />
              </label>
            </div>
            <button className="button button-primary" type="submit">
              Boek deze aanvraag
            </button>
            <p className="form-note">{formNote}</p>
          </form>
        </section>
      </main>

      <footer className="site-footer">
        <p>BahitLabs</p>
        <div>
          <a href={`mailto:${contactEmail}`}>{contactEmail}</a>
          <a href="tel:+31635650067">{phoneDisplay}</a>
        </div>
      </footer>
    </>
  );
}

function SectionHeading({ kicker, title, id }) {
  return (
    <div className="section-heading">
      <p className="section-kicker">{kicker}</p>
      <h2 id={id}>{title}</h2>
    </div>
  );
}

function HeroVisual() {
  return (
    <div className="hero-visual" aria-label="BahitLabs productbeelden">
      <figure className="hero-photo">
        <img
          src={`${assetBase}images/qorder-product.png`}
          alt="Q-order QR-bestellen productbeeld"
        />
      </figure>
      <div className="hero-photo-card hero-photo-card-top">
        <span>Boekbaar</span>
        <strong>Websites, apps en automatisering</strong>
      </div>
      <div className="hero-photo-card hero-photo-card-bottom">
        <img
          src={`${assetBase}images/snapmijnbrief-preview.jpg`}
          alt="SnapMijnBrief mini preview"
        />
        <div>
          <span>Producten</span>
          <strong>Q-order en SnapMijnBrief</strong>
        </div>
      </div>
    </div>
  );
}

export default App;
