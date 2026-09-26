import { AfterViewInit, Component, ElementRef, OnDestroy, OnInit, ViewChild, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import * as L from 'leaflet';

@Component({ standalone: true, imports: [RouterLink], template: `
  <section class="hero-section page-hero"><div class="hero-overlay"></div><div class="container hero-content"><p class="eyebrow light"><span></span> Servicio rápido, seguro y confiable</p><h1>Movemos lo que<br /><em>importa.</em></h1><p class="hero-description">Conectamos personas, ciudades y oportunidades con la fuerza de una flota preparada para llegar más lejos.</p><div class="hero-stats"><div><strong>+15</strong><span>años de experiencia</span></div><div><strong>24/7</strong><span>atención y soporte</span></div><div><strong>100%</strong><span>compromiso peruano</span></div></div></div></section>
  <section class="section-space home-intro"><div class="container split-heading"><div><p class="eyebrow">Una ruta con propósito</p><h2>La confianza también<br /><em>se transporta.</em></h2></div><div><p class="body-copy">Transportes 41 S.A.C. conecta personas, ciudades y oportunidades con responsabilidad, puntualidad y un profundo respeto por quienes confían en nosotros.</p><a class="text-link" routerLink="/nosotros">Conoce nuestra empresa <span>→</span></a></div></div></section>
` })
export class HomePage {}

@Component({ standalone: true, imports: [RouterLink], template: `
  <section class="news-hero"><div class="container news-hero-layout"><div class="news-hero-copy"><p class="eyebrow light"><span></span> ACTUALIDAD / TRANSPORTES 41</p><h1>En ruta,<br /><em>también te contamos.</em></h1><p>Comunicados y novedades sobre nuestros servicios, recorridos y equipo.</p><button class="news-scroll-button" type="button" aria-label="Bajar a las últimas novedades" title="Bajar a las últimas novedades" (click)="scrollToNews()"><span aria-hidden="true">↓</span></button></div></div></section>
  <section #latestNews id="ultimas-noticias" class="news-latest section-space"><div class="container"><div class="section-heading"><div><p class="eyebrow">Boletín 41</p><h2>Últimas<br /><em>novedades.</em></h2></div><p class="heading-support">Información de primera mano sobre la operación y la vida de nuestra empresa.</p></div><article class="news-feature-story"><figure class="news-story-image"><img src="/baje.jpeg" alt="Anuncio de reducción del precio de los pasajes de Transportes 41 S.A.C." /><figcaption><span>COMUNICADO / TARIFAS</span>Transportes 41 S.A.C.</figcaption></figure><div class="news-story-copy"><p class="eyebrow">Novedad de servicio</p><h3>Bajamos el precio de los pasajes</h3><p>En Transportes 41 S.A.C. hemos reducido el precio de los pasajes. Para conocer la tarifa vigente del tramo que necesitas, consulta con nuestro equipo antes de viajar.</p><a class="text-link" routerLink="/atencion">Consultar tarifa <span>↗</span></a></div></article></div></section>
` })
export class NewsPage {
  @ViewChild('latestNews') private latestNewsElement!: ElementRef<HTMLElement>;

  scrollToNews(): void {
    this.latestNewsElement.nativeElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }
}

@Component({ standalone: true, template: `
  <section class="inner-hero about-hero"><div class="container"><p class="eyebrow">01 / Quiénes somos</p><h1>La confianza también<br /><em>se transporta.</em></h1><p>Una empresa peruana que convierte cada recorrido en una experiencia segura y responsable.</p></div></section>
  <section class="about-history section-space"><div class="container about-history-layout"><div class="about-history-copy"><p class="eyebrow">La historia de 41 S.A.C.</p><h2>Quiénes somos</h2><p class="about-history-lead">Más de 15 años conectando personas, comunidades y oportunidades a través del transporte.</p><p>Transportes 41 S.A.C. es una empresa peruana dedicada al transporte de personas y mercancías. Nuestra historia se construye viaje a viaje, con responsabilidad, puntualidad y vocación de servicio.</p><p>Hoy seguimos uniendo Lima. El recorrido entre Pachacútec y Villa El Salvador refleja el trabajo coordinado de nuestros conductores, el equipo administrativo y una flota preparada para cada jornada.</p><div class="about-history-years"><strong>+15</strong><span>años de experiencia</span></div></div><div class="about-history-gallery"><div class="about-history-carousel-stage"><div id="about-history-slide" class="about-history-carousel-viewport" role="group" aria-label="Imágenes de Transportes 41 S.A.C." aria-roledescription="carrusel" aria-live="off">@if (historyImageIndex() === 0) { <figure class="about-history-photo"><img src="/compa%C3%B1eros.jpeg" alt="Personas del equipo de Transportes 41 S.A.C." /><figcaption>El equipo detrás de cada recorrido</figcaption></figure> } @else { <figure class="about-history-photo"><img src="/nuestraflota.jpeg" alt="Una unidad de la flota de Transportes 41 S.A.C." /><figcaption>Una flota lista para avanzar</figcaption></figure> }</div><div class="about-history-controls"><button type="button" aria-label="Imagen anterior" aria-controls="about-history-slide" (click)="previousHistoryImage()"><span aria-hidden="true">←</span></button><button type="button" aria-label="Imagen siguiente" aria-controls="about-history-slide" (click)="nextHistoryImage()"><span aria-hidden="true">→</span></button></div></div><div class="about-history-carousel-footer"><span>{{ historyImageIndex() + 1 }} / 2</span><div class="about-history-dots" role="group" aria-label="Elegir imagen"><button type="button" [class.active]="historyImageIndex() === 0" [attr.aria-pressed]="historyImageIndex() === 0" aria-label="Mostrar foto del equipo" (click)="selectHistoryImage(0)"></button><button type="button" [class.active]="historyImageIndex() === 1" [attr.aria-pressed]="historyImageIndex() === 1" aria-label="Mostrar foto de la flota" (click)="selectHistoryImage(1)"></button></div><button class="about-history-toggle" type="button" [attr.aria-label]="historyRotationPaused() ? 'Reanudar carrusel' : 'Pausar carrusel'" (click)="toggleHistoryRotation()"><span aria-hidden="true">{{ historyRotationPaused() ? '▶' : 'Ⅱ' }}</span></button></div></div></div></section>
  <section class="about-principles section-space"><div class="container"><div class="section-heading"><div><p class="eyebrow">Lo que nos guía</p><h2>Un servicio<br /><em>con propósito.</em></h2></div><p class="heading-support">La forma en que cuidamos a las personas en cada recorrido.</p></div><div class="container about-details"><div class="about-card"><span class="about-index">01</span><h3>Misión</h3><p>Brindar soluciones de transporte confiables, cuidando a cada pasajero, carga y colaborador durante todo el recorrido.</p></div><div class="about-card"><span class="about-index">02</span><h3>Visión</h3><p>Ser una empresa referente en movilidad responsable y eficiente, reconocida por la calidad de nuestro servicio.</p></div><div class="about-card"><span class="about-index">03</span><h3>Principios</h3><p>Seguridad, puntualidad, respeto y mejora continua en cada decisión que tomamos.</p></div></div></div></section>
  <section class="route-section section-space"><div class="container"><div class="section-heading"><div><p class="eyebrow">Nuestra cobertura</p><h2>Una ruta que<br /><em>conecta.</em></h2></div><p class="heading-support">Recorrido Pachacútec – Villa El Salvador, trazado por calles a partir del orden de paraderos compartido.</p></div><div class="route-map-legend" aria-label="Leyenda de los recorridos"><div class="route-legend-card route-legend-outbound"><i aria-hidden="true"></i><div><strong>Ida: Pachacútec → Villa El Salvador</strong><p>La línea roja muestra el recorrido hacia Villa El Salvador.</p></div></div><div class="route-legend-card route-legend-return"><i aria-hidden="true"></i><div><strong>Retorno: Villa El Salvador → Pachacútec</strong><p>La línea azul muestra el recorrido de regreso a Pachacútec.</p></div></div></div><div class="gps-map" #routeMap role="application" aria-label="Mapa interactivo del recorrido de ida y retorno de Transportes 41 S.A.C."></div><p class="route-map-status" aria-live="polite">{{ routeMapLoading() ? 'Cargando recorrido por calles…' : routeMapError() ? 'No se pudo cargar el trazado. Comprueba tu conexión e inténtalo de nuevo.' : 'Ruta vial calculada con OpenStreetMap según los paraderos indicados; puede diferir del GPS operativo del vehículo.' }}</p><a class="map-link" href="https://www.openstreetmap.org/directions?engine=fossgis_osrm_car&amp;route=-11.840027%2C-77.149774%3B-11.866798%2C-77.077838%3B-12.045981%2C-77.042829%3B-12.095046%2C-77.049957%3B-12.153689%2C-76.983694%3B-12.213031%2C-76.937026" target="_blank" rel="noopener">Abrir recorrido en OpenStreetMap <span>↗</span></a></div></section>
` })
export class AboutPage implements AfterViewInit, OnDestroy {
  @ViewChild('routeMap') private routeMapElement!: ElementRef<HTMLDivElement>;
  readonly routeMapLoading = signal(true);
  readonly routeMapError = signal(false);
  readonly historyImageIndex = signal(0);
  readonly historyRotationPaused = signal(false);
  private map?: L.Map;
  private historyRotationTimer: ReturnType<typeof setInterval> | undefined;

  ngAfterViewInit(): void {
    this.map = L.map(this.routeMapElement.nativeElement, { scrollWheelZoom: false }).setView([-12.04, -77.08], 10);
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 19,
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap contributors</a>',
    }).addTo(this.map);
    void this.loadRoute();
    this.historyRotationPaused.set(window.matchMedia('(prefers-reduced-motion: reduce)').matches);
    this.restartHistoryRotation();
  }

  ngOnDestroy(): void {
    this.map?.remove();
    this.stopHistoryRotation();
  }

  previousHistoryImage(): void {
    this.selectHistoryImage((this.historyImageIndex() + 1) % 2 as 0 | 1);
  }

  nextHistoryImage(): void {
    this.selectHistoryImage((this.historyImageIndex() + 1) % 2 as 0 | 1);
  }

  selectHistoryImage(index: 0 | 1): void {
    this.historyImageIndex.set(index);
    this.restartHistoryRotation();
  }

  toggleHistoryRotation(): void {
    this.historyRotationPaused.update((paused) => !paused);
    this.restartHistoryRotation();
  }

  private restartHistoryRotation(): void {
    this.stopHistoryRotation();
    if (this.historyRotationPaused()) return;

    this.historyRotationTimer = setInterval(() => {
      this.historyImageIndex.update((index) => (index + 1) % 2);
    }, 5000);
  }

  private stopHistoryRotation(): void {
    if (this.historyRotationTimer !== undefined) {
      clearInterval(this.historyRotationTimer);
      this.historyRotationTimer = undefined;
    }
  }

  private async loadRoute(): Promise<void> {
    const outbound: [number, number][] = [
      [-11.8400266, -77.1497739],
      [-11.8667978, -77.0778382],
      [-12.0459814, -77.042829],
      [-12.0950463, -77.0499573],
      [-12.1536891, -76.9836944],
      [-12.213031, -76.9370262],
    ];
    const returning: [number, number][] = [
      [-12.213031, -76.9370262],
      [-12.1536891, -76.9836944],
      [-12.0950463, -77.0499573],
      [-12.0565, -77.0436],
      [-12.0459814, -77.042829],
      [-11.9918, -77.0616],
      [-11.8667978, -77.0778382],
      [-11.8400266, -77.1497739],
    ];

    try {
      const lines = await Promise.all([
        this.fetchRoute(outbound, '#d9212e'),
        this.fetchRoute(returning, '#123f91'),
      ]);
      const start = L.circleMarker(outbound[0], { radius: 8, color: '#fff', weight: 3, fillColor: '#d9212e', fillOpacity: 1 }).bindPopup('Inicio: Pachacútec');
      const destination = L.circleMarker(outbound[outbound.length - 1], { radius: 8, color: '#fff', weight: 3, fillColor: '#123f91', fillOpacity: 1 }).bindPopup('Destino: Villa El Salvador');
      const bounds = L.featureGroup([...lines, start, destination]).addTo(this.map!).getBounds();
      this.map!.fitBounds(bounds.pad(0.06));
    } catch {
      this.routeMapError.set(true);
    } finally {
      this.routeMapLoading.set(false);
    }
  }

  private async fetchRoute(points: [number, number][], color: string): Promise<L.Polyline> {
    const coordinates = points.map(([latitude, longitude]) => `${longitude},${latitude}`).join(';');
    const response = await fetch(`https://router.project-osrm.org/route/v1/driving/${coordinates}?overview=full&geometries=geojson`);
    if (!response.ok) throw new Error('Routing request failed');

    const data = await response.json() as { routes?: { geometry: { coordinates: [number, number][] } }[] };
    const routeCoordinates = data.routes?.[0]?.geometry.coordinates;
    if (!routeCoordinates || !this.map) throw new Error('Route geometry unavailable');

    return L.polyline(routeCoordinates.map(([longitude, latitude]) => [latitude, longitude]), {
      color,
      weight: 6,
      opacity: 0.88,
    }).addTo(this.map);
  }
}

@Component({ standalone: true, imports: [RouterLink], template: `
  <section class="inner-hero services-hero"><div class="container"><p class="eyebrow">02 / Servicios</p><h1>Transporte pensado<br /><em>para avanzar.</em></h1><p>Soluciones claras para mover personas, mercancías y operaciones con confianza.</p></div></section>
  <section class="service-intro section-space"><div class="container service-intro-grid"><div><p class="eyebrow">Lo que hacemos</p><h2>Cada recorrido<br /><em>tiene un propósito.</em></h2></div><p class="body-copy">Ponemos nuestra experiencia, equipo y capacidad operativa al servicio de cada cliente. Elige la solución que necesitas y construyamos juntos una ruta más eficiente.</p></div></section>
  <section class="services-section service-catalog section-space">
    <div class="container">
      <div class="service-carousel">
        <div class="service-carousel-stage">
          <div id="service-carousel-viewport" class="service-carousel-viewport" role="group" aria-label="Servicios disponibles" aria-roledescription="carrusel" aria-live="off">
            @switch (activeServiceIndex()) {
              @case (0) {
                <article class="service-card service-slide service-card-dark"><div class="service-slide-media"><img src="/carro41.webp" alt="Vehículo de Transportes 41 S.A.C." /></div><div class="service-slide-copy"><span class="card-number">01 / CIUDAD</span><div class="service-icon" aria-hidden="true">⌖</div><h3>Transporte urbano</h3><p>Movilidad eficiente y cercana para conectar cada punto de la ciudad.</p><a routerLink="/contacto">Solicitar servicio <span>↗</span></a></div></article>
              }
              @case (1) {
                <article class="service-card service-slide service-card-red"><div class="service-slide-media"><img src="/servicios.jpg" alt="Servicio de transporte de Transportes 41 S.A.C." /></div><div class="service-slide-copy"><span class="card-number">02 / CARGA</span><div class="service-icon" aria-hidden="true">▣</div><h3>Transporte de carga</h3><p>Trasladamos tus productos con cuidado, trazabilidad y puntualidad.</p><a routerLink="/contacto">Solicitar servicio <span>↗</span></a></div></article>
              }
              @case (2) {
                <article class="service-card service-slide service-card-light"><div class="service-slide-media"><img src="/compa%C3%B1eros.jpeg" alt="Equipo de Transportes 41 S.A.C." /></div><div class="service-slide-copy"><span class="card-number">03 / OPERACIÓN</span><div class="service-icon" aria-hidden="true">⚙</div><h3>Gestión de flota</h3><p>Operación y mantenimiento para que cada unidad esté lista.</p><a routerLink="/contacto">Solicitar servicio <span>↗</span></a></div></article>
              }
            }
          </div>
          <div class="service-carousel-controls" aria-label="Navegación de servicios">
            <button type="button" aria-label="Servicio anterior" aria-controls="service-carousel-viewport" (click)="previousService()"><span aria-hidden="true">←</span></button>
            <button type="button" aria-label="Servicio siguiente" aria-controls="service-carousel-viewport" (click)="nextService()"><span aria-hidden="true">→</span></button>
          </div>
        </div>
        <div class="service-carousel-footer">
          <span class="service-carousel-count">{{ activeServiceIndex() + 1 }} / 3</span>
          <div class="service-carousel-dots" role="group" aria-label="Seleccionar un servicio">
            <button type="button" [class.active]="activeServiceIndex() === 0" [attr.aria-pressed]="activeServiceIndex() === 0" aria-label="Mostrar transporte urbano" (click)="selectService(0)"></button>
            <button type="button" [class.active]="activeServiceIndex() === 1" [attr.aria-pressed]="activeServiceIndex() === 1" aria-label="Mostrar transporte de carga" (click)="selectService(1)"></button>
            <button type="button" [class.active]="activeServiceIndex() === 2" [attr.aria-pressed]="activeServiceIndex() === 2" aria-label="Mostrar gestión de flota" (click)="selectService(2)"></button>
          </div>
          <button class="service-rotation-toggle" type="button" [attr.aria-label]="isRotationPaused() ? 'Reanudar carrusel' : 'Pausar carrusel'" (click)="toggleRotation()"><span aria-hidden="true">{{ isRotationPaused() ? '▶' : 'Ⅱ' }}</span></button>
        </div>
      </div>
    </div>
  </section>
  <section class="service-process section-space"><div class="container"><div class="section-heading"><div><p class="eyebrow">Así trabajamos</p><h2>Simple para ti.<br /><em>Preciso para nosotros.</em></h2></div><p class="heading-support">Nos ocupamos de la operación para que tú puedas concentrarte en lo que sigue.</p></div><div class="process-grid"><div><span>01</span><h3>Escuchamos</h3><p>Entendemos tu necesidad y el destino de tu operación.</p></div><div><span>02</span><h3>Planificamos</h3><p>Diseñamos la ruta, los recursos y los tiempos adecuados.</p></div><div><span>03</span><h3>Acompañamos</h3><p>Damos seguimiento hasta que todo llega bien.</p></div></div></div></section>
` })
export class ServicesPage implements OnInit, OnDestroy {
  readonly activeServiceIndex = signal(0);
  readonly isRotationPaused = signal(false);
  private rotationTimer: ReturnType<typeof setInterval> | undefined;

  ngOnInit(): void {
    this.isRotationPaused.set(window.matchMedia('(prefers-reduced-motion: reduce)').matches);
    this.restartRotation();
  }

  ngOnDestroy(): void {
    this.stopRotation();
  }

  previousService(): void {
    this.changeService(-1);
  }

  nextService(): void {
    this.changeService(1);
  }

  selectService(index: number): void {
    this.activeServiceIndex.set(index);
    this.restartRotation();
  }

  toggleRotation(): void {
    this.isRotationPaused.update((paused) => !paused);
    this.restartRotation();
  }

  private changeService(direction: -1 | 1): void {
    this.activeServiceIndex.update((index) => (index + direction + 3) % 3);
    this.restartRotation();
  }

  private restartRotation(): void {
    this.stopRotation();
    if (this.isRotationPaused()) return;

    this.rotationTimer = setInterval(() => {
      this.activeServiceIndex.update((index) => (index + 1) % 3);
    }, 5000);
  }

  private stopRotation(): void {
    if (this.rotationTimer !== undefined) {
      clearInterval(this.rotationTimer);
      this.rotationTimer = undefined;
    }
  }
}

@Component({ standalone: true, template: `
  <section class="inner-hero fleet-hero"><div class="container"><p class="eyebrow">03 / Nuestra flota</p><h1>Una flota que<br /><em>responde.</em></h1><p>Unidades preparadas, mantenimiento preventivo y seguimiento permanente.</p></div></section>
  <section class="fleet-section fleet-page"><div class="container fleet-grid"><div class="fleet-visual"><div class="circle-badge"><span>41</span><small>S.A.C.</small></div><div class="fleet-line"></div><p>Listos para<br /><strong>seguir avanzando.</strong></p></div><div class="fleet-copy"><p class="eyebrow light">Nuestra operación</p><h2>Seguridad en<br /><em>cada kilómetro.</em></h2><p>Contamos con unidades modernas, revisadas y preparadas para operar con altos estándares de calidad.</p><div class="fleet-list"><div><strong>01</strong><span>Mantenimiento preventivo</span></div><div><strong>02</strong><span>Conductores capacitados</span></div><div><strong>03</strong><span>Monitoreo permanente</span></div></div></div></div></section>
  <section class="fleet-details section-space"><div class="container"><div class="section-heading"><div><p class="eyebrow">Seguridad y operación</p><h2>Preparados para<br /><em>cada recorrido.</em></h2></div><p class="heading-support">Personas, unidades y seguimiento trabajando juntos para cuidar cada viaje.</p></div><div class="fleet-detail-grid"><article class="fleet-detail-card"><div class="fleet-detail-image"><img src="/compa%C3%B1eros.jpeg" alt="Equipo de Transportes 41 S.A.C." /></div><div class="fleet-detail-copy"><span>01 / CAPACITACIÓN</span><h3>Conductores preparados</h3><p>Conductores capacitados para brindar un servicio responsable y priorizar la seguridad de los pasajeros en cada recorrido.</p></div></article><article class="fleet-detail-card"><div class="fleet-detail-image"><img src="/carro41.webp" alt="Unidad de Transportes 41 S.A.C." /></div><div class="fleet-detail-copy"><span>02 / RESPALDO</span><h3>Unidades aseguradas</h3><p>Los vehículos cuentan con seguro para brindar mayor respaldo y tranquilidad durante el servicio.</p></div></article><article class="fleet-detail-card"><div class="fleet-detail-image"><img src="/nuestraflota.jpeg" alt="Vehículo de la flota de Transportes 41 S.A.C. en operación" /></div><div class="fleet-detail-copy"><span>03 / SEGUIMIENTO</span><h3>Monitoreo administrativo</h3><p>El equipo de administración monitorea los recorridos y coordina la operación para atender cualquier novedad.</p></div></article></div></div></section>
` })
export class FleetPage {}

@Component({ standalone: true, template: `
  <section class="inner-hero safety-hero"><div class="container"><p class="eyebrow">04 / Seguridad</p><h1>Más que llegar,<br /><em>llegar bien.</em></h1><p>La seguridad es una práctica diaria que guía cada recorrido.</p></div></section>
  <section class="safety-values-section section-space"><div class="container"><div class="section-heading"><div><p class="eyebrow">Nuestro compromiso</p><h2>Un servicio<br /><em>con propósito.</em></h2></div><p class="heading-support">Cuidamos a las personas y pensamos en el futuro de cada recorrido.</p></div><div class="values-grid"><article class="safety-value-card"><div class="safety-value-image"><img src="/seguridad.png" alt="Compromiso con la seguridad en cada recorrido" /></div><div class="safety-value-copy"><span>01 / SEGURIDAD</span><h3>Seguridad primero</h3><p>Cuidamos a nuestros pasajeros, colaboradores y comunidades en cada recorrido.</p></div></article><article class="safety-value-card"><div class="safety-value-image"><img src="/compa%C3%B1eros.jpeg" alt="Equipo de Transportes 41 S.A.C." /></div><div class="safety-value-copy"><span>02 / PERSONAS</span><h3>Servicio humano</h3><p>Escuchamos, acompañamos y resolvemos con respeto y cercanía.</p></div></article><article class="safety-value-card"><div class="safety-value-image"><img src="/nuestraflota.jpeg" alt="Unidad de la flota de Transportes 41 S.A.C." /></div><div class="safety-value-copy"><span>03 / FUTURO</span><h3>Mirada al futuro</h3><p>Buscamos una movilidad más ordenada, responsable y sostenible.</p></div></article></div></div></section>
` })
export class SafetyPage {}

@Component({ standalone: true, template: `
  <section class="inner-hero"><div class="container"><p class="eyebrow">05 / Contáctanos</p><h1>Tu próximo destino<br /><em>empieza aquí.</em></h1><p>Cuéntanos qué necesitas y nuestro equipo se pondrá en contacto contigo.</p></div></section>
  <section class="contact-section contact-page"><div class="container contact-grid"><div><p class="eyebrow light">Hablemos</p><h2>Estamos listos<br /><em>para ayudarte.</em></h2><p>Atendemos consultas comerciales, solicitudes de transporte y alianzas.</p></div><form class="contact-form" (submit)="$event.preventDefault()"><label>Nombre completo<input type="text" placeholder="Escribe tu nombre" /></label><label>Correo electrónico<input type="email" placeholder="tu@correo.com" /></label><label>¿Cómo podemos ayudarte?<textarea rows="3" placeholder="Cuéntanos brevemente"></textarea></label><button class="button button-primary" type="submit">Enviar mensaje <span>↗</span></button></form></div></section>
` })
export class ContactPage {}

@Component({ standalone: true, template: `
  <section class="inner-hero care-hero"><div class="container"><p class="eyebrow">Atención al cliente</p><h1>Estamos contigo<br /><em>en cada recorrido.</em></h1><p>Resuelve tus dudas, consulta el estado de tu servicio o cuéntanos cómo podemos ayudarte.</p></div></section>
  <section class="care-section section-space"><div class="container"><div class="section-heading"><div><p class="eyebrow">Centro de ayuda</p><h2>¿En qué podemos<br /><em>ayudarte?</em></h2></div><p class="heading-support">Encuentra una respuesta rápida o déjanos tus datos y nuestro equipo te atenderá.</p></div><div class="help-grid"><article><span>01</span><h3>Consultar un servicio</h3><p>¿Necesitas información sobre un viaje, entrega o atención en curso?</p><a href="#ayuda">Hacer consulta <b>↗</b></a></article><article><span>02</span><h3>Seguimiento</h3><p>Indícanos tu código de servicio para revisar el estado de tu solicitud.</p><a href="#ayuda">Ver seguimiento <b>↗</b></a></article><article><span>03</span><h3>Preguntas frecuentes</h3><p>Conoce respuestas sobre horarios, reservas, carga y canales de atención.</p><a href="#ayuda">Leer respuestas <b>↗</b></a></article></div></div></section>
  <section id="ayuda" class="care-form-section"><div class="container care-form-grid"><div><p class="eyebrow light">Atención 41 S.A.C.</p><h2>Cuéntanos<br /><em>qué necesitas.</em></h2><p>Te responderemos con la información adecuada para tu caso.</p></div><form class="contact-form" (submit)="$event.preventDefault()"><fieldset class="consult-reasons"><legend>Motivo de consulta</legend><div class="consult-reason-options"><label><input type="radio" name="reason" value="servicio" checked /><span>Consulta sobre servicio</span></label><label><input type="radio" name="reason" value="seguimiento" /><span>Seguimiento</span></label><label><input type="radio" name="reason" value="horarios" /><span>Información de horarios</span></label><label><input type="radio" name="reason" value="otro" /><span>Otro</span></label></div></fieldset><label>Nombre completo<input type="text" placeholder="Escribe tu nombre" /></label><label>Correo electrónico<input type="email" placeholder="tu@correo.com" /></label><label>Mensaje<textarea rows="3" placeholder="Escribe tu consulta"></textarea></label><button class="button button-primary" type="submit">Enviar consulta <span>↗</span></button></form></div></section>
` })
export class CustomerCarePage {}

@Component({ standalone: true, template: `
  <section class="inner-hero claims-hero"><div class="container"><p class="eyebrow">Libro de reclamaciones</p><h1>Tu experiencia<br /><em>nos ayuda a mejorar.</em></h1><p>Registra aquí una queja o reclamo relacionado con nuestros servicios.</p></div></section>
  <section class="claims-section section-space"><div class="container claims-layout"><div class="claims-aside"><p class="eyebrow">Antes de empezar</p><h2>Queremos<br /><em>escucharte.</em></h2><p>Completa los datos con claridad. Revisaremos tu solicitud y te responderemos dentro del plazo establecido.</p><div class="claims-note"><strong>Importante</strong><span>Este formulario es una guía visual. Para recibir reclamos oficialmente, debes conectarlo a tu correo o sistema de atención.</span></div></div><form class="claims-form" (submit)="$event.preventDefault()"><div class="form-heading"><span>01</span><h3>Datos del consumidor</h3></div><div class="form-row"><label>Nombre completo<input type="text" placeholder="Escribe tu nombre" /></label><label>DNI / RUC<input type="text" placeholder="Número de documento" /></label></div><div class="form-row"><label>Correo electrónico<input type="email" placeholder="tu@correo.com" /></label><label>Teléfono<input type="tel" placeholder="Número de contacto" /></label></div><div class="form-heading"><span>02</span><h3>Detalle de la solicitud</h3></div><label>Tipo de solicitud<select><option>Selecciona una opción</option><option>Queja</option><option>Reclamo</option><option>Sugerencia</option></select></label><label>Fecha del servicio<input type="date" /></label><label>Cuéntanos qué ocurrió<textarea rows="5" placeholder="Describe los hechos con el mayor detalle posible"></textarea></label><label>¿Qué solución esperas?<textarea rows="3" placeholder="Escribe tu solicitud"></textarea></label><label class="check-label"><input type="checkbox" /> Confirmo que la información brindada es verdadera.</label><button class="button button-primary" type="submit">Enviar solicitud <span>↗</span></button></form></div></section>
` })
export class ClaimsPage {}