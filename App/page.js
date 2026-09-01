 "use client";

import { useState } from "react";

const opportunities = [
  {
    route: "Barcelona → Madrid → París",
    code: "BCN → MAD → PAR",
    price: 91,
    normal: 183,
    save: 92,
    percent: 50,
    score: 94,
    tag: "MEJOR OPORTUNIDAD",
    time: "4 h 35 min",
    type: "Escala",
  },
  {
    route: "Barcelona → Lisboa → París",
    code: "BCN → LIS → PAR",
    price: 117,
    normal: 183,
    save: 66,
    percent: 36,
    score: 88,
    tag: "MUY BUENA",
    time: "5 h 10 min",
    type: "Escala",
  },
  {
    route: "Barcelona → Frankfurt → París",
    code: "BCN → FRA → PAR",
    price: 143,
    normal: 183,
    save: 40,
    percent: 22,
    score: 76,
    tag: "INTERESANTE",
    time: "5 h 45 min",
    type: "Escala",
  },
];

export default function Home() {
  const [origin, setOrigin] = useState("Barcelona (BCN)");
  const [destination, setDestination] = useState("París (PAR)");
  const [date, setDate] = useState("2026-09-12");
  const [searched, setSearched] = useState(false);

  async function search() {
  try {
    setSearched(true);

    const originCode = origin.match(/\(([A-Z]{3})\)/)?.[1];
    const destinationCode = destination.match(/\(([A-Z]{3})\)/)?.[1];

    if (!originCode || !destinationCode || !date) {
      alert("Introduce origen, destino y fecha correctamente.");
      return;
    }

    const response = await fetch("/api/flights", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        origin: originCode,
        destination: destinationCode,
        date,
      }),
    });

    const data = await response.json();

    if (!response.ok) {
      console.error(data);
      alert("No se han podido obtener los vuelos.");
      return;
    }

    console.log("Vuelos reales recibidos:", data);

    setTimeout(() => {
      document
        .getElementById("results")
        ?.scrollIntoView({ behavior: "smooth" });
    }, 50);
  } catch (error) {
    console.error(error);
    alert("Ha ocurrido un error al buscar los vuelos.");
  }
}

  return (
    <main>
      <nav className="nav">
        <div className="logo"><span>✈</span> FLYHACK</div>
        <div className="navLinks">
          <a href="#como">Cómo funciona</a>
          <a href="#resultados">Oportunidades</a>
        </div>
        <button className="navButton">Entrar</button>
      </nav>

      <section className="hero">
        <div className="badge">✦ NUEVA FORMA DE BUSCAR VUELOS</div>
        <h1>Encuentra rutas que<br /><em>otros buscadores</em> no detectan.</h1>
        <p className="subtitle">
          Comparamos rutas directas, escalas y combinaciones alternativas
          para encontrar dónde puedes ahorrar de verdad.
        </p>

        <div className="searchCard">
          <div className="field">
            <label>ORIGEN</label>
            <input value={origin} onChange={e => setOrigin(e.target.value)} />
          </div>
          <button className="swap" onClick={() => { const x=origin; setOrigin(destination); setDestination(x); }}>⇄</button>
          <div className="field">
            <label>DESTINO</label>
            <input value={destination} onChange={e => setDestination(e.target.value)} />
          </div>
          <div className="field dateField">
            <label>FECHA</label>
            <input type="date" value={date} onChange={e => setDate(e.target.value)} />
          </div>
          <button className="searchButton" onClick={search}>Buscar vuelos <span>→</span></button>
        </div>
        <div className="hint">✓ Sin coste para empezar &nbsp;&nbsp; ✓ Comparación inteligente &nbsp;&nbsp; ✓ Sin necesidad de reservar con nosotros</div>
      </section>

      <section id="results" className={"results " + (searched ? "visible" : "")}>
        <div className="sectionHead">
          <div>
            <div className="eyebrow">OPORTUNIDADES DETECTADAS</div>
            <h2>{origin.split(" ")[0]} → {destination.split(" ")[0]}</h2>
          </div>
          <div className="resultDate">{date ? new Date(date+"T12:00:00").toLocaleDateString("es-ES", {day:"numeric",month:"short",year:"numeric"}) : ""} · 1 adulto</div>
        </div>

        <div className="normalCard">
          <div>
            <span className="muted">RUTA NORMAL</span>
            <strong>{origin.split(" ")[0]} → {destination.split(" ")[0]}</strong>
            <span className="small">Vuelo directo · Precio de referencia</span>
          </div>
          <div className="normalPrice">183 €</div>
        </div>

        <div className="opps">
          {opportunities.map((o, i) => (
            <article className={"opp " + (i === 0 ? "featured" : "")} key={o.code}>
              <div className="oppTop">
                <span className="tag">{i === 0 ? "🔥 " : ""}{o.tag}</span>
                <span className="score">{o.score}/100</span>
              </div>
              <div className="route">{o.route}</div>
              <div className="code">{o.code}</div>
              <div className="meta"><span>↗ {o.type}</span><span>◷ {o.time}</span></div>
              <div className="priceRow">
                <div><span className="from">Desde</span><span className="price">{o.price} €</span></div>
                <div className="saving"><strong>-{o.percent}%</strong><span>Ahorras {o.save} €</span></div>
              </div>
              <button className="details">Ver oportunidad <span>→</span></button>
            </article>
          ))}
        </div>
      </section>

      <section id="como" className="how">
        <div className="eyebrow">LA IDEA</div>
        <h2>No buscamos solo vuelos.<br />Buscamos <em>oportunidades.</em></h2>
        <p>FlyHack analiza diferentes formas de llegar a tu destino y las ordena por ahorro, duración y conveniencia.</p>
        <div className="steps">
          <div><b>01</b><h3>Indica dónde quieres ir</h3><p>Origen, destino y fechas.</p></div>
          <div><b>02</b><h3>Analizamos las rutas</h3><p>Comparamos itinerarios y alternativas.</p></div>
          <div><b>03</b><h3>Encuentra el ahorro</h3><p>Te mostramos las mejores oportunidades.</p></div>
        </div>
      </section>

      <footer>
        <div className="logo"><span>✈</span> FLYHACK</div>
        <span>Prototipo MVP · 2026</span>
      </footer>
    </main>
  );
}
