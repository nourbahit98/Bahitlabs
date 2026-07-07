import { useEffect, useMemo, useState } from "react";

const contactEmail = "nourbahit98@gmail.com";
const phoneDisplay = "+31 6 35 65 00 67";
const assetBase = import.meta.env.BASE_URL;

const services = [
  {
    number: "01",
    title: "Websites & webshops",
    text: "Moderne sites die vertrouwen geven, snel laden en bezoekers richting actie brengen."
  },
  {
    number: "02",
    title: "Webapps & dashboards",
    text: "Portals, dashboards en systemen die processen overzichtelijker en sneller maken.",
    dark: true
  },
  {
    number: "03",
    title: "Automatisering & WTB",
    text: "Slimme tools voor technische bedrijven, horeca en ondernemers met veel handmatig werk."
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
    title: "Systemen voor bedrijven",
    text: "Websites, portals, dashboards en automatisering gebouwd rond het echte probleem van de ondernemer.",
    link: "#contact",
    cta: "Bespreek maatwerk",
    image: `${assetBase}images/snapmijnbrief-light.png`,
    alt: "Mobiele productschermen als voorbeeld van maatwerk webapps"
  }
];

const processSteps = [
  ["01", "Luisteren", "We bepalen wat er echt gebouwd moet worden."],
  ["02", "Ontwerpen", "De flow, structuur en uitstraling worden scherp gezet."],
  ["03", "Bouwen", "De website of app wordt praktisch en schaalbaar ontwikkeld."],
  ["04", "Lanceren", "Alles gaat live met aandacht voor snelheid en gebruiksgemak."]
];

function App() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [formState, setFormState] = useState({
    name: "",
    email: "",
    projectType: "",
    message: ""
  });
  const [formNote, setFormNote] = useState("Je e-mailapp opent met jouw aanvraag.");

  const navItems = useMemo(
    () => [
      ["#werk", "Werk"],
      ["#diensten", "Diensten"],
      ["#proces", "Proces"],
      ["#contact", "Contact"]
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

  function handleSubmit(event) {
    event.preventDefault();

    const subject = encodeURIComponent(
      `Nieuwe aanvraag via BahitLabs - ${formState.projectType || "Project"}`
    );
    const body = encodeURIComponent(
      [
        "Nieuwe aanvraag via de BahitLabs website",
        "",
        `Naam: ${formState.name}`,
        `E-mail: ${formState.email}`,
        `Project: ${formState.projectType || "-"}`,
        "",
        "Bericht:",
        formState.message
      ].join("\n")
    );

    window.location.href = `mailto:${contactEmail}?subject=${subject}&body=${body}`;
    setFormNote("Je e-mailapp is geopend met jouw aanvraag.");
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
            <p className="eyebrow">BahitLabs OS</p>
            <h1>Strakke digitale producten. Gebouwd om te verkopen.</h1>
            <p>
              Ik ontwerp en bouw websites, webapps, automatisering en slimme
              tools voor ondernemers die sneller, beter en professioneler willen
              werken.
            </p>
            <div className="hero-actions">
              <a className="button button-primary" href="#contact">
                Start een project
              </a>
              <a className="button button-secondary" href="#werk">
                Bekijk mijn werk
              </a>
            </div>
          </div>

          <HeroVisual />
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
          <h2>Van losse taken naar slimme systemen die voor je werken.</h2>
          <p>
            BahitLabs is voor ondernemers die geen standaard template willen,
            maar een digitale oplossing die echt past bij hun bedrijf. Snel
            schakelen, strak ontwerpen en praktisch opleveren.
          </p>
        </section>

        <section className="services" id="diensten" aria-labelledby="diensten-title">
          <SectionHeading kicker="Diensten" title="Bouwen met focus." id="diensten-title" />
          <div className="service-grid">
            {services.map((service) => (
              <article
                className={`service-card ${service.dark ? "service-card-dark" : ""}`}
                key={service.number}
              >
                <span className="service-number">{service.number}</span>
                <div>
                  <h3>{service.title}</h3>
                  <p>{service.text}</p>
                </div>
              </article>
            ))}
          </div>
        </section>

        <section className="statement section-dark">
          <p className="section-kicker">De richting</p>
          <h2>Minder handmatig werk. Meer overzicht.</h2>
          <p>
            Ik bouw niet alleen websites. Ik bouw digitale producten en systemen
            die tijd besparen, klanten helpen en bedrijven sterker maken.
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
            <p className="section-kicker">Design</p>
            <h2>Ontworpen voor ondernemers. Gebouwd als product.</h2>
          </div>
          <p>
            Alles moet duidelijk voelen: de boodschap, de interface, de actie en
            het resultaat. Daarom combineert BahitLabs strak design met
            praktische techniek en snelle oplevering.
          </p>
        </section>

        <section className="process" id="proces" aria-labelledby="proces-title">
          <SectionHeading kicker="Proces" title="Van idee naar live." id="proces-title" />
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

        <section className="contact section-dark" id="contact">
          <div className="contact-copy">
            <p className="section-kicker">Contact</p>
            <h2>Heb je een idee dat slimmer kan?</h2>
            <p>Laat het bouwen door BahitLabs.</p>
          </div>

          <form className="contact-form" onSubmit={handleSubmit}>
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
              <span>Project</span>
              <select
                name="projectType"
                value={formState.projectType}
                onChange={handleInput}
                required
              >
                <option value="">Kies een richting</option>
                <option>Website of webshop</option>
                <option>Webapp of dashboard</option>
                <option>Automatisering</option>
                <option>WTB / technisch systeem</option>
                <option>Anders</option>
              </select>
            </label>
            <label>
              <span>Bericht</span>
              <textarea
                name="message"
                rows="5"
                placeholder="Vertel kort wat je wilt bouwen."
                value={formState.message}
                onChange={handleInput}
                required
              />
            </label>
            <button className="button button-primary" type="submit">
              Plan een kennismaking
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
        <span>Q-order</span>
        <strong>QR-bestellen voor horeca</strong>
      </div>
      <div className="hero-photo-card hero-photo-card-bottom">
        <img
          src={`${assetBase}images/snapmijnbrief-preview.jpg`}
          alt="SnapMijnBrief mini preview"
        />
        <div>
          <span>SnapMijnBrief</span>
          <strong>Brieven simpel uitgelegd</strong>
        </div>
      </div>
    </div>
  );
}

export default App;
