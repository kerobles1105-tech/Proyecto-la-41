import { AfterViewInit, Component, ElementRef, HostListener, inject, OnDestroy, OnInit, ViewChild, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import emailjs from '@emailjs/browser';
import * as L from 'leaflet';
import { LanguageService } from './language.service';

@Component({ standalone: true, imports: [RouterLink], template: `
  <section class="hero-section page-hero"><div class="hero-overlay"></div><div class="container hero-content"><p class="eyebrow light"><span></span> {{ language() === 'es' ? 'Servicio rápido, seguro y confiable' : 'Fast, safe and reliable service' }}</p><h1>{{ language() === 'es' ? 'Movemos lo que' : 'We move what' }}<br /><em>{{ language() === 'es' ? 'importa.' : 'matters.' }}</em></h1><p class="hero-description">{{ language() === 'es' ? 'Conectamos personas, ciudades y oportunidades con la fuerza de una flota preparada para llegar más lejos.' : 'We connect people, cities and opportunities with a fleet ready to go farther and serve better.' }}</p><div class="hero-stats" aria-label="{{ language() === 'es' ? 'Estadísticas de la empresa' : 'Company statistics' }}"><div class="stat-item"><strong class="stat-value"><span class="stat-sign">+</span>15</strong><span class="stat-label">{{ language() === 'es' ? 'años de experiencia' : 'years of experience' }}</span></div><div class="stat-item"><strong class="stat-value">24/7</strong><span class="stat-label">{{ language() === 'es' ? 'atención y soporte' : 'support and assistance' }}</span></div><div class="stat-item"><strong class="stat-value">100%</strong><span class="stat-label">{{ language() === 'es' ? 'compromiso peruano' : 'Peruvian commitment' }}</span></div></div></div></section>
  <section class="section-space home-intro"><div class="container split-heading"><div><p class="eyebrow">{{ language() === 'es' ? 'Una ruta con propósito' : 'A route with purpose' }}</p><h2>{{ language() === 'es' ? 'La confianza también' : 'Trust is also' }}<br /><em>{{ language() === 'es' ? 'se transporta.' : 'transported.' }}</em></h2></div><div><p class="body-copy">{{ language() === 'es' ? 'Transportes 41 S.A. conecta personas, ciudades y oportunidades con responsabilidad, puntualidad y un profundo respeto por quienes confían en nosotros.' : 'Transportes 41 S.A. connects people, cities and opportunities with responsibility, punctuality and deep respect for those who trust us.' }}</p><a class="text-link" routerLink="/nosotros">{{ language() === 'es' ? 'Conoce nuestra empresa' : 'Meet our company' }} <span>→</span></a></div></div></section>
` })
export class HomePage {
  protected readonly language = inject(LanguageService).language;
}

@Component({ standalone: true, imports: [RouterLink], template: `
  <section class="news-hero"><div class="container news-hero-layout"><div class="news-hero-copy"><p class="eyebrow light"><span></span> {{ language() === 'es' ? 'ACTUALIDAD / TRANSPORTES 41' : 'NEWS / TRANSPORTES 41' }}</p><h1>{{ language() === 'es' ? 'En ruta,' : 'On the move,' }}<br /><em>{{ language() === 'es' ? 'también te contamos.' : 'we keep you informed.' }}</em></h1><p>{{ language() === 'es' ? 'Comunicados y novedades sobre nuestros servicios, recorridos y equipo.' : 'Updates and news about our services, routes and team.' }}</p><button class="news-scroll-button" type="button" aria-label="{{ language() === 'es' ? 'Bajar a las últimas novedades' : 'Scroll to the latest news' }}" title="{{ language() === 'es' ? 'Bajar a las últimas novedades' : 'Scroll to the latest news' }}" (click)="scrollToNews()"><span aria-hidden="true">↓</span></button></div></div></section>
  <section #latestNews id="ultimas-noticias" class="news-latest section-space"><div class="container"><div class="section-heading"><div><p class="eyebrow">{{ language() === 'es' ? 'Boletín 41' : '41 bulletin' }}</p><h2>{{ language() === 'es' ? 'Últimas' : 'Latest' }}<br /><em>{{ language() === 'es' ? 'novedades.' : 'updates.' }}</em></h2></div><p class="heading-support">{{ language() === 'es' ? 'Información de primera mano sobre la operación y la vida de nuestra empresa.' : 'First-hand information about our operations and company life.' }}</p></div><article class="news-feature-story"><figure class="news-story-image"><img src="/baje1.png" alt="{{ language() === 'es' ? 'Anuncio de reducción del precio de los pasajes de Transportes 41 S.A.' : 'Announcement of fare reductions by Transportes 41 S.A.' }}" /><figcaption><span>{{ language() === 'es' ? 'COMUNICADO / TARIFAS' : 'ANNOUNCEMENT / FARES' }}</span>Transportes 41 S.A.</figcaption></figure><div class="news-story-copy"><p class="eyebrow">{{ language() === 'es' ? 'Novedad de servicio' : 'Service update' }}</p><h3>{{ language() === 'es' ? 'Bajamos el precio de los pasajes' : 'We lowered the fare' }}</h3><p>{{ language() === 'es' ? 'En Transportes 41 S.A. hemos reducido el precio de los pasajes. Para conocer la tarifa vigente del tramo que necesitas, consulta con nuestro equipo antes de viajar.' : 'At Transportes 41 S.A. we have reduced fares. To learn the current rate for the route you need, please check with our team before traveling.' }}</p><a class="text-link" routerLink="/atencion">{{ language() === 'es' ? 'Consultar tarifa' : 'Check fare' }} <span>↗</span></a></div></article></div></section>
` })
export class NewsPage {
  protected readonly language = inject(LanguageService).language;
  @ViewChild('latestNews') private latestNewsElement!: ElementRef<HTMLElement>;

  scrollToNews(): void {
    this.latestNewsElement.nativeElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }
}

@Component({ standalone: true, template: `
  <section class="inner-hero about-hero"><div class="container"><p class="eyebrow">{{ language() === 'es' ? '01 / Quiénes somos' : '01 / About us' }}</p><h1>{{ language() === 'es' ? 'La confianza también' : 'Trust is also' }}<br /><em>{{ language() === 'es' ? 'se transporta.' : 'transported.' }}</em></h1><p>{{ language() === 'es' ? 'Una empresa peruana que convierte cada recorrido en una experiencia segura y responsable.' : 'A Peruvian company that makes every journey a safe and responsible experience.' }}</p></div></section>
  <section class="about-history section-space"><div class="container about-history-layout"><div class="about-history-copy"><p class="eyebrow">{{ language() === 'es' ? 'La historia de 41 S.A.' : 'The story of 41 S.A.' }}</p><h2>{{ language() === 'es' ? 'Quiénes somos' : 'About us' }}</h2><p class="about-history-lead">{{ language() === 'es' ? 'Más de 15 años conectando personas, comunidades y oportunidades a través del transporte.' : 'Over 15 years connecting people, communities, and opportunities through transportation.' }}</p><p>{{ language() === 'es' ? 'Transportes 41 S.A. es una empresa peruana dedicada al transporte de personas y mercancías. Nuestra historia se construye viaje a viaje, con responsabilidad, puntualidad y vocación de servicio.' : 'Transportes 41 S.A. is a Peruvian company dedicated to transporting people and goods. Our story is built one trip at a time, with responsibility, punctuality, and a commitment to service.' }}</p><p>{{ language() === 'es' ? 'Hoy seguimos uniendo Lima. El recorrido entre Pachacútec y Villa El Salvador refleja el trabajo coordinado de nuestros conductores, el equipo administrativo y una flota preparada para cada jornada.' : 'Today, we continue connecting Lima. The route between Pachacútec and Villa El Salvador reflects the coordinated work of our drivers, administrative team, and fleet, ready for daily operations.' }}</p><div class="about-history-years"><strong>+15</strong><span>{{ language() === 'es' ? 'años de experiencia' : 'years of experience' }}</span></div></div><div class="about-history-gallery"><div class="about-history-carousel-stage"><div id="about-history-slide" class="about-history-carousel-viewport" role="group" aria-label="{{ language() === 'es' ? 'Imágenes de Transportes 41 S.A.' : 'Images of Transportes 41 S.A.' }}" [attr.aria-roledescription]="language() === 'es' ? 'carrusel' : 'carousel'" aria-live="off">@if (historyImageIndex() === 0) { <figure class="about-history-photo"><img src="/compa%C3%B1eros.jpeg" alt="{{ language() === 'es' ? 'Personas del equipo de Transportes 41 S.A.' : 'Transportes 41 S.A. team members' }}" /><figcaption>{{ language() === 'es' ? 'El equipo detrás de cada recorrido' : 'The team behind every journey' }}</figcaption></figure> } @else { <figure class="about-history-photo"><img src="/nuestraflota.jpeg" alt="{{ language() === 'es' ? 'Una unidad de la flota de Transportes 41 S.A.' : 'A vehicle from the Transportes 41 S.A. fleet' }}" /><figcaption>{{ language() === 'es' ? 'Una flota lista para avanzar' : 'A fleet ready to move forward' }}</figcaption></figure> }</div><div class="about-history-controls"><button type="button" aria-label="{{ language() === 'es' ? 'Imagen anterior' : 'Previous image' }}" aria-controls="about-history-slide" (click)="previousHistoryImage()"><span aria-hidden="true">←</span></button><button type="button" aria-label="{{ language() === 'es' ? 'Imagen siguiente' : 'Next image' }}" aria-controls="about-history-slide" (click)="nextHistoryImage()"><span aria-hidden="true">→</span></button></div></div><div class="about-history-carousel-footer"><span>{{ historyImageIndex() + 1 }} / 2</span><div class="about-history-dots" role="group" aria-label="{{ language() === 'es' ? 'Elegir imagen' : 'Choose an image' }}"><button type="button" [class.active]="historyImageIndex() === 0" [attr.aria-pressed]="historyImageIndex() === 0" aria-label="{{ language() === 'es' ? 'Mostrar foto del equipo' : 'Show team photo' }}" (click)="selectHistoryImage(0)"></button><button type="button" [class.active]="historyImageIndex() === 1" [attr.aria-pressed]="historyImageIndex() === 1" aria-label="{{ language() === 'es' ? 'Mostrar foto de la flota' : 'Show fleet photo' }}" (click)="selectHistoryImage(1)"></button></div><button class="about-history-toggle" type="button" [attr.aria-label]="historyRotationPaused() ? (language() === 'es' ? 'Reanudar carrusel' : 'Resume carousel') : (language() === 'es' ? 'Pausar carrusel' : 'Pause carousel')" (click)="toggleHistoryRotation()"><span aria-hidden="true">{{ historyRotationPaused() ? '▶' : 'Ⅱ' }}</span></button></div></div></div></section>
  <section class="about-principles section-space"><div class="container"><div class="section-heading"><div><p class="eyebrow">{{ language() === 'es' ? 'Lo que nos guía' : 'What guides us' }}</p><h2>{{ language() === 'es' ? 'Un servicio' : 'A service' }}<br /><em>{{ language() === 'es' ? 'con propósito.' : 'with purpose.' }}</em></h2></div><p class="heading-support">{{ language() === 'es' ? 'La forma en que cuidamos a las personas en cada recorrido.' : 'How we care for people on every journey.' }}</p></div><div class="container about-details"><div class="about-card about-card-mission"><img class="about-card-image" src="/mision.png" alt="{{ language() === 'es' ? 'Misión de Transportes 41 S.A.' : 'Transportes 41 S.A. mission' }}" /><span class="about-index">01</span><h3>{{ language() === 'es' ? 'Misión' : 'Mission' }}</h3><p>{{ language() === 'es' ? 'Brindar soluciones de transporte confiables, cuidando a cada pasajero, carga y colaborador durante todo el recorrido.' : 'To provide reliable transportation solutions while caring for every passenger, shipment, and team member throughout each journey.' }}</p></div><div class="about-card about-card-vision"><img class="about-card-image" src="/vision.webp" alt="{{ language() === 'es' ? 'Visión de Transportes 41 S.A.' : 'Transportes 41 S.A. vision' }}" /><span class="about-index">02</span><h3>{{ language() === 'es' ? 'Visión' : 'Vision' }}</h3><p>{{ language() === 'es' ? 'Ser una empresa referente en movilidad responsable y eficiente, reconocida por la calidad de nuestro servicio.' : 'To be a leading company in responsible and efficient mobility, recognized for the quality of our service.' }}</p></div><div class="about-card about-card-principles"><img class="about-card-image" src="/principios.png" alt="{{ language() === 'es' ? 'Principios de Transportes 41 S.A.' : 'Transportes 41 S.A. principles' }}" /><span class="about-index">03</span><h3>{{ language() === 'es' ? 'Principios' : 'Principles' }}</h3><p>{{ language() === 'es' ? 'Seguridad, puntualidad, respeto y mejora continua en cada decisión que tomamos.' : 'Safety, punctuality, respect, and continuous improvement in every decision we make.' }}</p></div></div></div></section>
  <section class="route-section section-space"><div class="container"><div class="section-heading"><div><p class="eyebrow">{{ language() === 'es' ? 'Nuestra cobertura' : 'Our coverage' }}</p><h2>{{ language() === 'es' ? 'Una ruta que' : 'A route that' }}<br /><em>{{ language() === 'es' ? 'conecta.' : 'connects.' }}</em></h2></div><p class="heading-support">{{ language() === 'es' ? 'Recorrido Pachacútec – Villa El Salvador, trazado por los principales corredores de la ruta 41.' : 'The Pachacútec–Villa El Salvador route, following the main corridors served by Route 41.' }}</p></div><div class="route-map-legend" aria-label="{{ language() === 'es' ? 'Leyenda del recorrido' : 'Route legend' }}"><div class="route-legend-card route-legend-outbound"><i aria-hidden="true"></i><div><strong>{{ language() === 'es' ? 'Ruta 41: Pachacútec → Villa El Salvador' : 'Route 41: Pachacútec → Villa El Salvador' }}</strong><p>{{ language() === 'es' ? 'Paraderos principales señalados directamente sobre el mapa.' : 'Main stops are marked directly on the map.' }}</p></div></div></div><div class="gps-map" #routeMap role="application" aria-label="{{ language() === 'es' ? 'Mapa interactivo de la ruta 41 con nombres de paraderos' : 'Interactive map of Route 41 with stop names' }}"></div><p class="route-map-status" aria-live="polite">{{ routeMapLoading() ? (language() === 'es' ? 'Cargando recorrido por calles…' : 'Loading street route…') : routeMapError() ? (language() === 'es' ? 'No se pudo cargar el trazado. Comprueba tu conexión e inténtalo de nuevo.' : 'Could not load the route. Check your connection and try again.') : (language() === 'es' ? 'Ruta vial calculada con OpenStreetMap siguiendo los corredores principales indicados para la 41.' : 'Road route calculated with OpenStreetMap, following the main corridors used by Route 41.') }}</p><a class="map-link" href="https://www.openstreetmap.org/directions?engine=fossgis_osrm_car&amp;route=-11.840027%2C-77.149774%3B-11.8298%2C-77.1356%3B-11.866798%2C-77.077838%3B-11.8953%2C-77.0707%3B-11.9427%2C-77.0692%3B-11.9918%2C-77.0616%3B-12.0067%2C-77.0581%3B-12.0215%2C-77.0543%3B-12.0367%2C-77.0439%3B-12.045981%2C-77.042829%3B-12.0572%2C-77.0448%3B-12.0835%2C-77.0521%3B-12.1042%2C-77.0332%3B-12.1267%2C-77.0064%3B-12.1384%2C-76.9972%3B-12.153689%2C-76.983694%3B-12.1817%2C-76.9615%3B-12.213031%2C-76.937026%3B-12.2203%2C-76.9275" target="_blank" rel="noopener">{{ language() === 'es' ? 'Abrir recorrido en OpenStreetMap' : 'Open route in OpenStreetMap' }} <span>↗</span></a></div></section>
` })
export class AboutPage implements AfterViewInit, OnDestroy {
  protected readonly language = inject(LanguageService).language;
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
      [-11.8298, -77.1356],
      [-11.8667978, -77.0778382],
      [-11.8953, -77.0707],
      [-11.9427, -77.0692],
      [-11.9918, -77.0616],
      [-12.0067, -77.0581],
      [-12.0215, -77.0543],
      [-12.0367, -77.0439],
      [-12.0459814, -77.042829],
      [-12.0572, -77.0448],
      [-12.0835, -77.0521],
      [-12.1042, -77.0332],
      [-12.1267, -77.0064],
      [-12.1384, -76.9972],
      [-12.1536891, -76.9836944],
      [-12.1817, -76.9615],
      [-12.213031, -76.9370262],
      [-12.2203, -76.9275],
    ];
    const routeStops: { coordinates: [number, number]; name: string }[] = [
      { coordinates: outbound[0], name: 'Pachacútec / Ventanilla' },
      { coordinates: outbound[1], name: 'Néstor Gambetta' },
      { coordinates: outbound[2], name: 'Alameda del Norte' },
      { coordinates: outbound[6], name: 'Plaza Norte' },
      { coordinates: outbound[9], name: 'Alfonso Ugarte' },
      { coordinates: outbound[12], name: 'República de Panamá' },
      { coordinates: outbound[13], name: 'Tomás Marsano' },
      { coordinates: outbound[15], name: 'Los Héroes / Atocongo' },
      { coordinates: outbound[18], name: 'Av. Revolución / Huáscar' },
    ];

    try {
      const line = await this.fetchRoute(outbound, '#d9212e');
      const start = L.circleMarker(outbound[0], { radius: 8, color: '#fff', weight: 3, fillColor: '#d9212e', fillOpacity: 1 })
        .bindPopup(() => `${this.language() === 'es' ? 'Inicio' : 'Start'}: Pachacútec`);
      const destination = L.circleMarker(outbound[outbound.length - 1], { radius: 8, color: '#fff', weight: 3, fillColor: '#123f91', fillOpacity: 1 })
        .bindPopup(() => `${this.language() === 'es' ? 'Destino' : 'Destination'}: Villa El Salvador`);
      const stopMarkers = routeStops.map(({ coordinates, name }) => L.circleMarker(coordinates, {
        radius: 5,
        color: '#fff',
        weight: 2,
        fillColor: '#d9212e',
        fillOpacity: 1,
      }).bindTooltip(name, {
        permanent: true,
        direction: 'top',
        className: 'route-stop-label',
        offset: [0, -5],
      }).addTo(this.map!));
      const bounds = L.featureGroup([line, start, destination, ...stopMarkers]).addTo(this.map!).getBounds();
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
  <section class="inner-hero services-hero"><div class="container"><p class="eyebrow">{{ language() === 'es' ? '02 / Servicios' : '02 / Services' }}</p><h1>{{ language() === 'es' ? 'Transporte pensado' : 'Transport designed' }}<br /><em>{{ language() === 'es' ? 'para avanzar.' : 'to move forward.' }}</em></h1><p>{{ language() === 'es' ? 'Soluciones claras para mover personas, mercancías y operaciones con confianza.' : 'Clear solutions to move people, cargo and operations with confidence.' }}</p></div></section>
  <section class="service-intro section-space"><div class="container service-intro-grid"><div><p class="eyebrow">{{ language() === 'es' ? 'Lo que hacemos' : 'What we do' }}</p><h2>{{ language() === 'es' ? 'Cada recorrido' : 'Every route' }}<br /><em>{{ language() === 'es' ? 'tiene un propósito.' : 'has a purpose.' }}</em></h2></div><p class="body-copy">{{ language() === 'es' ? 'Ponemos nuestra experiencia, equipo y capacidad operativa al servicio de cada cliente. Elige la solución que necesitas y construyamos juntos una ruta más eficiente.' : 'We put our experience, team and operational capacity at the service of each client. Choose the solution you need and let’s build a more efficient route together.' }}</p></div></section>
  <section class="services-section service-catalog section-space">
    <div class="container">
      <div class="service-carousel">
        <div class="service-carousel-stage">
          <div id="service-carousel-viewport" class="service-carousel-viewport" role="group" aria-label="{{ language() === 'es' ? 'Servicios disponibles' : 'Available services' }}" [attr.aria-roledescription]="language() === 'es' ? 'carrusel' : 'carousel'" aria-live="off">
            @switch (activeServiceIndex()) {
              @case (0) {
                <article class="service-card service-slide service-card-dark"><div class="service-slide-media"><img src="/carro41.webp" alt="{{ language() === 'es' ? 'Vehículo de Transportes 41 S.A.' : 'Transportes 41 S.A. vehicle' }}" /></div><div class="service-slide-copy"><span class="card-number">{{ language() === 'es' ? '01 / CIUDAD' : '01 / CITY' }}</span><div class="service-icon" aria-hidden="true">⌖</div><h3>{{ language() === 'es' ? 'Transporte urbano' : 'Urban transportation' }}</h3><p>{{ language() === 'es' ? 'Movilidad eficiente y cercana para conectar cada punto de la ciudad.' : 'Efficient, accessible transportation connecting every part of the city.' }}</p><a routerLink="/contacto">{{ language() === 'es' ? 'Solicitar servicio' : 'Request service' }} <span>↗</span></a></div></article>
              }
              @case (1) {
                <article class="service-card service-slide service-card-red"><div class="service-slide-media"><img src="/servicios.jpg" alt="{{ language() === 'es' ? 'Servicio de transporte de Transportes 41 S.A.' : 'Transportes 41 S.A. transportation service' }}" /></div><div class="service-slide-copy"><span class="card-number">{{ language() === 'es' ? '02 / PERSONALIZADO' : '02 / CUSTOMIZED' }}</span><div class="service-icon" aria-hidden="true">▣</div><h3>{{ language() === 'es' ? 'Transporte personalizado' : 'Customized transportation' }}</h3><p>{{ language() === 'es' ? 'Trasladamos tus productos con cuidado, trazabilidad y puntualidad.' : 'We transport your goods with care, traceability, and punctuality.' }}</p><a routerLink="/contacto">{{ language() === 'es' ? 'Solicitar servicio' : 'Request service' }} <span>↗</span></a></div></article>
              }
              @case (2) {
                <article class="service-card service-slide service-card-light"><div class="service-slide-media"><img src="/compa%C3%B1eros.jpeg" alt="{{ language() === 'es' ? 'Equipo de Transportes 41 S.A.' : 'Transportes 41 S.A. team' }}" /></div><div class="service-slide-copy"><span class="card-number">{{ language() === 'es' ? '03 / OPERACIÓN' : '03 / OPERATIONS' }}</span><div class="service-icon" aria-hidden="true">⚙</div><h3>{{ language() === 'es' ? 'Gestión de flota' : 'Fleet management' }}</h3><p>{{ language() === 'es' ? 'Operación y mantenimiento para que cada unidad esté lista.' : 'Operations and maintenance to keep every vehicle ready.' }}</p><a routerLink="/contacto">{{ language() === 'es' ? 'Solicitar servicio' : 'Request service' }} <span>↗</span></a></div></article>
              }
            }
          </div>
          <div class="service-carousel-controls" aria-label="{{ language() === 'es' ? 'Navegación de servicios' : 'Service navigation' }}">
            <button type="button" aria-label="{{ language() === 'es' ? 'Servicio anterior' : 'Previous service' }}" aria-controls="service-carousel-viewport" (click)="previousService()"><span aria-hidden="true">←</span></button>
            <button type="button" aria-label="{{ language() === 'es' ? 'Servicio siguiente' : 'Next service' }}" aria-controls="service-carousel-viewport" (click)="nextService()"><span aria-hidden="true">→</span></button>
          </div>
        </div>
        <div class="service-carousel-footer">
          <span class="service-carousel-count">{{ activeServiceIndex() + 1 }} / 3</span>
          <div class="service-carousel-dots" role="group" aria-label="{{ language() === 'es' ? 'Seleccionar un servicio' : 'Select a service' }}">
            <button type="button" [class.active]="activeServiceIndex() === 0" [attr.aria-pressed]="activeServiceIndex() === 0" aria-label="{{ language() === 'es' ? 'Mostrar transporte urbano' : 'Show urban transportation' }}" (click)="selectService(0)"></button>
            <button type="button" [class.active]="activeServiceIndex() === 1" [attr.aria-pressed]="activeServiceIndex() === 1" aria-label="{{ language() === 'es' ? 'Mostrar transporte personalizado' : 'Show customized transportation' }}" (click)="selectService(1)"></button>
            <button type="button" [class.active]="activeServiceIndex() === 2" [attr.aria-pressed]="activeServiceIndex() === 2" aria-label="{{ language() === 'es' ? 'Mostrar gestión de flota' : 'Show fleet management' }}" (click)="selectService(2)"></button>
          </div>
          <button class="service-rotation-toggle" type="button" [attr.aria-label]="isRotationPaused() ? (language() === 'es' ? 'Reanudar carrusel' : 'Resume carousel') : (language() === 'es' ? 'Pausar carrusel' : 'Pause carousel')" (click)="toggleRotation()"><span aria-hidden="true">{{ isRotationPaused() ? '▶' : 'Ⅱ' }}</span></button>
        </div>
      </div>
    </div>
  </section>
  <section class="service-process section-space"><div class="container"><div class="section-heading"><div><p class="eyebrow">{{ language() === 'es' ? 'Así trabajamos' : 'How we work' }}</p><h2>{{ language() === 'es' ? 'Simple para ti.' : 'Simple for you.' }}<br /><em>{{ language() === 'es' ? 'Preciso para nosotros.' : 'Precise for us.' }}</em></h2></div><p class="heading-support">{{ language() === 'es' ? 'Nos ocupamos de la operación para que tú puedas concentrarte en lo que sigue.' : 'We take care of operations so you can focus on what comes next.' }}</p></div><div class="process-grid"><div><span>01</span><h3>{{ language() === 'es' ? 'Escuchamos' : 'We listen' }}</h3><p>{{ language() === 'es' ? 'Entendemos tu necesidad y el destino de tu operación.' : 'We understand your needs and the destination of your operation.' }}</p></div><div><span>02</span><h3>{{ language() === 'es' ? 'Planificamos' : 'We plan' }}</h3><p>{{ language() === 'es' ? 'Diseñamos la ruta, los recursos y los tiempos adecuados.' : 'We design the right route, resources, and timing.' }}</p></div><div><span>03</span><h3>{{ language() === 'es' ? 'Acompañamos' : 'We support you' }}</h3><p>{{ language() === 'es' ? 'Damos seguimiento hasta que todo llega bien.' : 'We follow up to make sure everything arrives safely.' }}</p></div></div></div></section>
` })
export class ServicesPage implements OnInit, OnDestroy {
  protected readonly language = inject(LanguageService).language;
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
  <section class="inner-hero fleet-hero"><div class="container"><p class="eyebrow">{{ language() === 'es' ? '03 / Nuestra flota' : '03 / Our fleet' }}</p><h1>{{ language() === 'es' ? 'Una flota que' : 'A fleet that' }}<br /><em>{{ language() === 'es' ? 'responde.' : 'responds.' }}</em></h1><p>{{ language() === 'es' ? 'Unidades preparadas, mantenimiento preventivo y seguimiento permanente.' : 'Prepared units, preventive maintenance and permanent monitoring.' }}</p></div></section>
  <section class="fleet-section fleet-page"><div class="container fleet-grid"><div class="fleet-visual"><div class="circle-badge"><span>41</span><small>S.A.</small></div><div class="fleet-line"></div><p>{{ language() === 'es' ? 'Listos para' : 'Ready to' }}<br /><strong>{{ language() === 'es' ? 'seguir avanzando.' : 'keep moving forward.' }}</strong></p></div><div class="fleet-copy"><p class="eyebrow light">{{ language() === 'es' ? 'Nuestra operación' : 'Our operation' }}</p><h2>{{ language() === 'es' ? 'Seguridad en' : 'Safety on' }}<br /><em>{{ language() === 'es' ? 'cada kilómetro.' : 'every kilometer.' }}</em></h2><p>{{ language() === 'es' ? 'Contamos con unidades modernas, revisadas y preparadas para operar con altos estándares de calidad.' : 'We have modern, regularly inspected vehicles ready to operate with high standards of quality.' }}</p><div class="fleet-list"><div><strong>01</strong><span>{{ language() === 'es' ? 'Mantenimiento preventivo' : 'Preventive maintenance' }}</span></div><div><strong>02</strong><span>{{ language() === 'es' ? 'Conductores capacitados' : 'Trained drivers' }}</span></div><div><strong>03</strong><span>{{ language() === 'es' ? 'Monitoreo permanente' : 'Permanent monitoring' }}</span></div></div></div></div></section>
  <section class="fleet-details section-space"><div class="container"><div class="section-heading"><div><p class="eyebrow">{{ language() === 'es' ? 'Seguridad y operación' : 'Safety and operations' }}</p><h2>{{ language() === 'es' ? 'Preparados para' : 'Ready for' }}<br /><em>{{ language() === 'es' ? 'cada recorrido.' : 'every journey.' }}</em></h2></div><p class="heading-support">{{ language() === 'es' ? 'Personas, unidades y seguimiento trabajando juntos para cuidar cada viaje.' : 'People, vehicles, and monitoring working together to make every trip safer.' }}</p></div><div class="fleet-detail-grid"><article class="fleet-detail-card"><div class="fleet-detail-image"><img src="/conductores.jpeg" alt="{{ language() === 'es' ? 'Conductores de Transportes 41 S.A.' : 'Transportes 41 S.A. drivers' }}" /></div><div class="fleet-detail-copy"><span>{{ language() === 'es' ? '01 / CAPACITACIÓN' : '01 / TRAINING' }}</span><h3>{{ language() === 'es' ? 'Conductores preparados' : 'Prepared drivers' }}</h3><p>{{ language() === 'es' ? 'Conductores capacitados para brindar un servicio responsable y priorizar la seguridad de los pasajeros en cada recorrido.' : 'Trained drivers provide responsible service and prioritize passenger safety on every journey.' }}</p></div></article><article class="fleet-detail-card"><div class="fleet-detail-image"><img src="/carronuevo.png" alt="{{ language() === 'es' ? 'Unidad de Transportes 41 S.A.' : 'Transportes 41 S.A. vehicle' }}" /></div><div class="fleet-detail-copy"><span>{{ language() === 'es' ? '02 / RESPALDO' : '02 / PROTECTION' }}</span><h3>{{ language() === 'es' ? 'Unidades aseguradas' : 'Insured vehicles' }}</h3><p>{{ language() === 'es' ? 'Los vehículos cuentan con seguro para brindar mayor respaldo y tranquilidad durante el servicio.' : 'All our vehicles are insured, providing greater protection and peace of mind throughout every trip.' }}</p></div></article><article class="fleet-detail-card"><div class="fleet-detail-image"><img src="/nuestraflota.jpeg" alt="{{ language() === 'es' ? 'Vehículo de la flota de Transportes 41 S.A. en operación' : 'Transportes 41 S.A. fleet vehicle in operation' }}" /></div><div class="fleet-detail-copy"><span>{{ language() === 'es' ? '03 / SEGUIMIENTO' : '03 / MONITORING' }}</span><h3>{{ language() === 'es' ? 'Monitoreo en tiempo real' : 'Real-time monitoring' }}</h3><p>{{ language() === 'es' ? 'El equipo monitorea los recorridos en tiempo real y coordina la operación para atender cualquier novedad.' : 'Our team monitors routes in real time and coordinates operations to address any issues.' }}</p></div></article></div></div></section>
` })
export class FleetPage {
  protected readonly language = inject(LanguageService).language;
}

@Component({ standalone: true, template: `
  <section class="inner-hero safety-hero"><div class="container"><p class="eyebrow">{{ language() === 'es' ? '04 / Seguridad' : '04 / Safety' }}</p><h1>{{ language() === 'es' ? 'Más que llegar,' : 'More than arriving,' }}<br /><em>{{ language() === 'es' ? 'llegar bien.' : 'arriving well.' }}</em></h1><p>{{ language() === 'es' ? 'La seguridad es una práctica diaria que guía cada recorrido.' : 'Safety is a daily practice that guides every trip.' }}</p></div></section>
  <section class="safety-values-section section-space"><div class="container"><div class="section-heading"><div><p class="eyebrow">{{ language() === 'es' ? 'Nuestro compromiso' : 'Our commitment' }}</p><h2>{{ language() === 'es' ? 'Un servicio' : 'A service' }}<br /><em>{{ language() === 'es' ? 'con propósito.' : 'with purpose.' }}</em></h2></div><p class="heading-support">{{ language() === 'es' ? 'Cuidamos a las personas y pensamos en el futuro de cada recorrido.' : 'We care for people and think about the future of every route.' }}</p></div><div class="values-grid"><article class="safety-value-card"><div class="safety-value-image"><img src="/seguridad1.png" alt="{{ language() === 'es' ? 'Compromiso con la seguridad en cada recorrido' : 'Commitment to safety on every journey' }}" /></div><div class="safety-value-copy"><span>01 / {{ language() === 'es' ? 'SEGURIDAD' : 'SAFETY' }}</span><h3>{{ language() === 'es' ? 'Seguridad primero' : 'Safety first' }}</h3><p>{{ language() === 'es' ? 'Cuidamos a nuestros pasajeros, colaboradores y comunidades en cada recorrido.' : 'We care for our passengers, team members, and communities on every trip.' }}</p></div></article><article class="safety-value-card"><div class="safety-value-image"><img src="/compa%C3%B1eros.jpeg" alt="{{ language() === 'es' ? 'Equipo de Transportes 41 S.A.' : 'Transportes 41 S.A. team' }}" /></div><div class="safety-value-copy"><span>02 / {{ language() === 'es' ? 'PERSONAS' : 'PEOPLE' }}</span><h3>{{ language() === 'es' ? 'Servicio humano' : 'Human service' }}</h3><p>{{ language() === 'es' ? 'Escuchamos, acompañamos y resolvemos con respeto y cercanía.' : 'We listen, support, and resolve issues with respect and care.' }}</p></div></article><article class="safety-value-card"><div class="safety-value-image"><img src="/nuestraflota.jpeg" alt="{{ language() === 'es' ? 'Unidad de la flota de Transportes 41 S.A.' : 'Transportes 41 S.A. fleet vehicle' }}" /></div><div class="safety-value-copy"><span>03 / {{ language() === 'es' ? 'FUTURO' : 'FUTURE' }}</span><h3>{{ language() === 'es' ? 'Mirada al futuro' : 'Future vision' }}</h3><p>{{ language() === 'es' ? 'Buscamos una movilidad más ordenada, responsable y sostenible.' : 'We seek more orderly, responsible and sustainable mobility.' }}</p></div></article></div></div></section>
` })
export class SafetyPage {
  protected readonly language = inject(LanguageService).language;
}

@Component({ standalone: true, imports: [FormsModule], template: `
  <section class="inner-hero"><div class="container"><p class="eyebrow">{{ language() === 'es' ? '05 / Contáctanos' : '05 / Contact us' }}</p><h1>{{ language() === 'es' ? 'Tu próximo destino' : 'Your next destination' }}<br /><em>{{ language() === 'es' ? 'empieza aquí.' : 'starts here.' }}</em></h1><p>{{ language() === 'es' ? 'Cuéntanos qué necesitas y nuestro equipo se pondrá en contacto contigo.' : 'Tell us what you need, and our team will get in touch.' }}</p></div></section>
  <section class="contact-section contact-page"><div class="container contact-grid"><div><p class="eyebrow light">{{ language() === 'es' ? 'Hablemos' : 'Let us talk' }}</p><h2>{{ language() === 'es' ? 'Estamos listos' : 'We are ready' }}<br /><em>{{ language() === 'es' ? 'para ayudarte.' : 'to help you.' }}</em></h2><p>{{ language() === 'es' ? 'Atendemos consultas comerciales, solicitudes de transporte y alianzas.' : 'We handle business inquiries, transportation requests, and partnerships.' }}</p><div class="whatsapp-card"><div class="whatsapp-card-main"><span class="whatsapp-icon" aria-hidden="true"><svg viewBox="0 0 24 24" role="img"><path d="M20.5 3.5A11.8 11.8 0 0 0 12.1 0C5.6 0 .3 5.3.3 11.8c0 2.1.6 4.2 1.7 6L.2 24l6.4-1.7a11.8 11.8 0 0 0 5.5 1.4h.1c6.5 0 11.8-5.3 11.8-11.8 0-3.2-1.3-6.2-3.5-8.4ZM12.2 21.6h-.1a9.8 9.8 0 0 1-5-1.4l-.4-.2-3.8 1 1-3.7-.2-.4a9.8 9.8 0 0 1-1.5-5.2C2.2 6.4 6.7 2 12.1 2c2.6 0 5.1 1 6.9 2.9a9.8 9.8 0 0 1 2.9 7c0 5.4-4.4 9.7-9.7 9.7Zm5.3-7.3c-.3-.2-1.7-.8-2-1-.3-.1-.5-.2-.7.2-.2.3-.8 1-.9 1.2-.2.2-.3.2-.6.1-1.5-.7-2.5-1.3-3.5-2.9-.3-.5.3-.4.8-1.3.1-.2.1-.4 0-.6l-.9-2.1c-.2-.5-.5-.4-.7-.4h-.6c-.2 0-.6.1-.9.4-.3.3-1.1 1.1-1.1 2.6s1.1 3 1.3 3.2c.2.2 2.1 3.2 5.1 4.5 1.9.8 2.6.9 3.5.8.6-.1 1.7-.7 1.9-1.4.2-.7.2-1.3.1-1.4-.2-.1-.4-.2-.8-.4Z" /></svg></span><div><span class="whatsapp-label">{{ language() === 'es' ? 'Canal directo' : 'Direct line' }}</span><strong>{{ language() === 'es' ? 'Escríbenos por WhatsApp' : 'Message us on WhatsApp' }}</strong><small>+51 995479948</small></div></div><a class="whatsapp-button" [href]="language() === 'es' ? 'https://wa.me/51995479948?text=Hola%2C%20deseo%20informaci%C3%B3n%20sobre%20sus%20servicios%20de%20transporte.' : 'https://wa.me/51995479948?text=Hello%2C%20I%20would%20like%20information%20about%20your%20transportation%20services.'" target="_blank" rel="noopener">{{ language() === 'es' ? 'Abrir WhatsApp' : 'Open WhatsApp' }} <span>↗</span></a></div></div><form class="contact-form" (ngSubmit)="enviarContacto()"><label>{{ language() === 'es' ? 'Nombre completo' : 'Full name' }}<input type="text" name="nombre" [(ngModel)]="nombre" required placeholder="{{ language() === 'es' ? 'Escribe tu nombre' : 'Enter your name' }}" /></label><label>{{ language() === 'es' ? 'Correo electrónico' : 'Email address' }}<input type="email" name="email" [(ngModel)]="email" required placeholder="tu@correo.com" /></label><label>{{ language() === 'es' ? 'Teléfono' : 'Phone' }}<input type="tel" name="telefono" [(ngModel)]="telefono" required placeholder="{{ language() === 'es' ? 'Número de contacto' : 'Phone number' }}" /></label><label>{{ language() === 'es' ? 'Asunto' : 'Subject' }}<input type="text" name="asunto" [(ngModel)]="asunto" required placeholder="{{ language() === 'es' ? 'Motivo de tu mensaje' : 'Reason for your message' }}" /></label><label>{{ language() === 'es' ? '¿Cómo podemos' : 'How can we' }} {{ language() === 'es' ? 'ayudarte?' : 'help you?' }}<textarea name="mensaje" [(ngModel)]="mensaje" rows="3" required placeholder="{{ language() === 'es' ? 'Cuéntanos brevemente' : 'Tell us briefly' }}"></textarea></label><button class="button button-primary" type="submit" [disabled]="isSendingContact">{{ isSendingContact ? (language() === 'es' ? 'Enviando...' : 'Sending...') : (language() === 'es' ? 'Enviar mensaje' : 'Send message') }} <span>↗</span></button></form></div></section>
` })
export class ContactPage {
  protected readonly language = inject(LanguageService).language;
  private readonly emailJsServiceCD = 'service_ge1gxt8';
  private readonly templateContactoID = 'template_yp6vfyl';
  private readonly emailJsPublicKeyCD = 'LstO0DA7TXhuH1Va6';

  nombre = '';
  email = '';
  telefono = '';
  asunto = '';
  mensaje = '';
  isSendingContact = false;

  enviarContacto(): void {
    if (this.isSendingContact) return;

    if (this.templateContactoID.startsWith('PEGA_')) {
      window.alert(this.language() === 'es'
        ? 'Configura el Template ID de contacto de EmailJS antes de enviar.'
        : 'Configure the EmailJS contact template ID before sending.');
      return;
    }

    this.isSendingContact = true;
    const datosContacto = {
      nombre: this.nombre,
      email: this.email,
      telefono: this.telefono,
      asunto: this.asunto,
      mensaje: this.mensaje,
    };

    emailjs.send(this.emailJsServiceCD, this.templateContactoID, datosContacto, this.emailJsPublicKeyCD)
      .then(() => {
        window.alert(this.language() === 'es'
          ? 'Su mensaje ha sido enviado. Nos comunicaremos con usted a la brevedad.'
          : 'Your message has been sent. We will get back to you shortly.');
        this.limpiarFormularioContacto();
      })
      .catch(() => {
        window.alert(this.language() === 'es'
          ? 'Hubo un error al enviar el mensaje.'
          : 'There was an error sending your message.');
      })
      .finally(() => {
        this.isSendingContact = false;
      });
  }

  private limpiarFormularioContacto(): void {
    this.nombre = '';
    this.email = '';
    this.telefono = '';
    this.asunto = '';
    this.mensaje = '';
  }
}

@Component({ standalone: true, template: `
  <section class="inner-hero care-hero"><div class="container"><p class="eyebrow">{{ language() === 'es' ? 'Atención al cliente' : 'Customer service' }}</p><h1>{{ language() === 'es' ? 'Estamos contigo' : 'We are with you' }}<br /><em>{{ language() === 'es' ? 'en cada recorrido.' : 'on every journey.' }}</em></h1><p>{{ language() === 'es' ? 'Resuelve tus dudas, consulta el estado de tu servicio o cuéntanos cómo podemos ayudarte.' : 'Get answers, check your service status, or tell us how we can help.' }}</p></div></section>
  <section class="care-section section-space"><div class="container"><div class="section-heading"><div><p class="eyebrow">{{ language() === 'es' ? 'Centro de ayuda' : 'Help center' }}</p><h2>{{ language() === 'es' ? '¿En qué podemos' : 'How can we' }}<br /><em>{{ language() === 'es' ? 'ayudarte?' : 'help you?' }}</em></h2></div><p class="heading-support">{{ language() === 'es' ? 'Encuentra una respuesta rápida o déjanos tus datos y nuestro equipo te atenderá.' : 'Find a quick answer or leave your details and our team will assist you.' }}</p></div><div class="help-grid"><article><span>01</span><h3>{{ language() === 'es' ? 'Consultar un servicio' : 'Ask about a service' }}</h3><p>{{ language() === 'es' ? '¿Necesitas información sobre un viaje, entrega o atención en curso?' : 'Need information about a trip, delivery, or ongoing service?' }}</p><a href="#ayuda">{{ language() === 'es' ? 'Hacer consulta' : 'Send an inquiry' }} <b>↗</b></a></article><article><span>02</span><h3>{{ language() === 'es' ? 'Seguimiento' : 'Track a request' }}</h3><p>{{ language() === 'es' ? 'Indícanos tu código de servicio para revisar el estado de tu solicitud.' : 'Give us your service code so we can check the status of your request.' }}</p><a href="#ayuda">{{ language() === 'es' ? 'Ver seguimiento' : 'Track request' }} <b>↗</b></a></article><article><span>03</span><h3>{{ language() === 'es' ? 'Preguntas frecuentes' : 'Frequently asked questions' }}</h3><p>{{ language() === 'es' ? 'Conoce respuestas sobre horarios, reservas, carga y canales de atención.' : 'Find answers about schedules, bookings, cargo, and support channels.' }}</p><a href="#ayuda">{{ language() === 'es' ? 'Leer respuestas' : 'Read answers' }} <b>↗</b></a></article></div></div></section>
  <section id="ayuda" class="care-form-section"><div class="container care-form-grid"><div><p class="eyebrow light">{{ language() === 'es' ? 'Atención 41 S.A.' : '41 S.A. support' }}</p><h2>{{ language() === 'es' ? 'Cuéntanos' : 'Tell us' }}<br /><em>{{ language() === 'es' ? 'qué necesitas.' : 'what you need.' }}</em></h2><p>{{ language() === 'es' ? 'Te responderemos con la información adecuada para tu caso.' : 'We will get back to you with information relevant to your case.' }}</p><div class="whatsapp-card"><div class="whatsapp-card-main"><span class="whatsapp-icon" aria-hidden="true"><svg viewBox="0 0 24 24" role="img"><path d="M20.5 3.5A11.8 11.8 0 0 0 12.1 0C5.6 0 .3 5.3.3 11.8c0 2.1.6 4.2 1.7 6L.2 24l6.4-1.7a11.8 11.8 0 0 0 5.5 1.4h.1c6.5 0 11.8-5.3 11.8-11.8 0-3.2-1.3-6.2-3.5-8.4ZM12.2 21.6h-.1a9.8 9.8 0 0 1-5-1.4l-.4-.2-3.8 1 1-3.7-.2-.4a9.8 9.8 0 0 1-1.5-5.2C2.2 6.4 6.7 2 12.1 2c2.6 0 5.1 1 6.9 2.9a9.8 9.8 0 0 1 2.9 7c0 5.4-4.4 9.7-9.7 9.7Zm5.3-7.3c-.3-.2-1.7-.8-2-1-.3-.1-.5-.2-.7.2-.2.3-.8 1-.9 1.2-.2.2-.3.2-.6.1-1.5-.7-2.5-1.3-3.5-2.9-.3-.5.3-.4.8-1.3.1-.2.1-.4 0-.6l-.9-2.1c-.2-.5-.5-.4-.7-.4h-.6c-.2 0-.6.1-.9.4-.3.3-1.1 1.1-1.1 2.6s1.1 3 1.3 3.2c.2.2 2.1 3.2 5.1 4.5 1.9.8 2.6.9 3.5.8.6-.1 1.7-.7 1.9-1.4.2-.7.2-1.3.1-1.4-.2-.1-.4-.2-.8-.4Z" /></svg></span><div><span class="whatsapp-label">{{ language() === 'es' ? 'Canal directo' : 'Direct line' }}</span><strong>{{ language() === 'es' ? 'Escríbenos por WhatsApp' : 'Message us on WhatsApp' }}</strong><small>+51 995479948</small></div></div><a class="whatsapp-button" [href]="language() === 'es' ? 'https://wa.me/51995479948?text=Hola%2C%20deseo%20informaci%C3%B3n%20sobre%20sus%20servicios%20de%20transporte.' : 'https://wa.me/51995479948?text=Hello%2C%20I%20would%20like%20information%20about%20your%20transportation%20services.'" target="_blank" rel="noopener">{{ language() === 'es' ? 'Abrir WhatsApp' : 'Open WhatsApp' }} <span>↗</span></a></div></div><form class="contact-form" (submit)="$event.preventDefault()"><fieldset class="consult-reasons"><legend>{{ language() === 'es' ? 'Motivo de consulta' : 'Reason for inquiry' }}</legend><div class="consult-reason-options"><label><input type="radio" name="reason" value="servicio" checked /><span>{{ language() === 'es' ? 'Consulta sobre servicio' : 'Service inquiry' }}</span></label><label><input type="radio" name="reason" value="seguimiento" /><span>{{ language() === 'es' ? 'Seguimiento' : 'Track a request' }}</span></label><label><input type="radio" name="reason" value="horarios" /><span>{{ language() === 'es' ? 'Información de horarios' : 'Schedule information' }}</span></label><label><input type="radio" name="reason" value="otro" /><span>{{ language() === 'es' ? 'Otro' : 'Other' }}</span></label></div></fieldset><label>{{ language() === 'es' ? 'Nombre completo' : 'Full name' }}<input type="text" placeholder="{{ language() === 'es' ? 'Escribe tu nombre' : 'Enter your name' }}" /></label><label>{{ language() === 'es' ? 'Correo electrónico' : 'Email address' }}<input type="email" placeholder="tu@correo.com" /></label><label>{{ language() === 'es' ? 'Mensaje' : 'Message' }}<textarea rows="3" placeholder="{{ language() === 'es' ? 'Escribe tu consulta' : 'Enter your inquiry' }}"></textarea></label><button class="button button-primary" type="submit">{{ language() === 'es' ? 'Enviar consulta' : 'Send inquiry' }} <span>↗</span></button></form></div></section>
` })
export class CustomerCarePage {
  protected readonly language = inject(LanguageService).language;
  private readonly emailJsServiceId = 'service_ge1gxt8';
  private readonly emailJsTemplateId = 'template_yp6vfyl';
  private readonly emailJsPublicKey = 'LstO0DA7TXhuH1Va6';
  private isSending = false;

  @HostListener('submit', ['$event'])
  enviarAtencion(event: Event): void {
    event.preventDefault();
    if (this.isSending) return;

    const form = event.target as HTMLFormElement;
    const name = form.querySelector<HTMLInputElement>('input[type="text"]')?.value.trim() ?? '';
    const email = form.querySelector<HTMLInputElement>('input[type="email"]')?.value.trim() ?? '';
    const reason = form.querySelector<HTMLInputElement>('input[name="reason"]:checked')?.value ?? '';
    const message = form.querySelector<HTMLTextAreaElement>('textarea')?.value.trim() ?? '';

    if (!name || !email || !message) {
      window.alert(this.language() === 'es'
        ? 'Completa tu nombre, correo y mensaje antes de enviar.'
        : 'Please enter your name, email address, and message before sending.');
      return;
    }

    this.isSending = true;
    emailjs.send(this.emailJsServiceId, this.emailJsTemplateId, {
      nombre: name,
      email,
      telefono: '',
      asunto: reason || (this.language() === 'es' ? 'Atención al cliente' : 'Customer service'),
      mensaje: message,
    }, this.emailJsPublicKey)
      .then(() => {
        window.alert(this.language() === 'es'
          ? 'Su mensaje ha sido enviado. Nos comunicaremos con usted a la brevedad.'
          : 'Your message has been sent. We will get back to you shortly.');
        form.reset();
      })
      .catch(() => {
        window.alert(this.language() === 'es'
          ? 'Hubo un error al enviar el mensaje.'
          : 'There was an error sending your message.');
      })
      .finally(() => {
        this.isSending = false;
      });
  }
}

@Component({ standalone: true, imports: [FormsModule], template: `
  <section class="inner-hero claims-hero"><div class="container"><p class="eyebrow">{{ language() === 'es' ? 'Libro de reclamaciones' : 'Claims book' }}</p><h1>{{ language() === 'es' ? 'Tu experiencia' : 'Your experience' }}<br /><em>{{ language() === 'es' ? 'nos ayuda a mejorar.' : 'helps us improve.' }}</em></h1><p>{{ language() === 'es' ? 'Registra aquí una queja o reclamo relacionado con nuestros servicios.' : 'Submit a complaint or claim related to our services here.' }}</p></div></section>
  <section class="claims-section section-space"><div class="container claims-layout"><div class="claims-aside"><p class="eyebrow">{{ language() === 'es' ? 'Antes de empezar' : 'Before you begin' }}</p><h2>{{ language() === 'es' ? 'Queremos' : 'We want to' }}<br /><em>{{ language() === 'es' ? 'escucharte.' : 'hear from you.' }}</em></h2><p>{{ language() === 'es' ? 'Completa los datos con claridad. Revisaremos tu solicitud y te responderemos dentro del plazo establecido.' : 'Please provide clear information. We will review your request and respond within the established timeframe.' }}</p><div class="claims-note"><strong>{{ language() === 'es' ? 'Importante' : 'Important' }}</strong><span>{{ language() === 'es' ? 'Este formulario se enviará por correo mediante EmailJS.' : 'This form will be sent by email through EmailJS.' }}</span></div></div><form class="claims-form" (ngSubmit)="enviarReclamo()"><div class="form-heading"><span>01</span><h3>{{ language() === 'es' ? 'Datos del consumidor' : 'Consumer information' }}</h3></div><div class="form-row"><label>{{ language() === 'es' ? 'Nombre completo' : 'Full name' }}<input type="text" name="nombre_completo" [(ngModel)]="nombreCompleto" required placeholder="{{ language() === 'es' ? 'Escribe tu nombre' : 'Enter your name' }}" /></label><label>{{ language() === 'es' ? 'DNI / RUC' : 'National ID / Tax ID' }}<input type="text" name="dni_ruc" [(ngModel)]="dniRuc" required placeholder="{{ language() === 'es' ? 'Número de documento' : 'Document number' }}" /></label></div><div class="form-row"><label>{{ language() === 'es' ? 'Correo electrónico' : 'Email address' }}<input type="email" name="correo_electronico" [(ngModel)]="correoElectronico" required placeholder="tu@correo.com" /></label><label>{{ language() === 'es' ? 'Teléfono' : 'Phone' }}<input type="tel" name="telefono" [(ngModel)]="telefono" required placeholder="{{ language() === 'es' ? 'Número de contacto' : 'Phone number' }}" /></label></div><div class="form-heading"><span>02</span><h3>{{ language() === 'es' ? 'Detalle de la solicitud' : 'Request details' }}</h3></div><label>{{ language() === 'es' ? 'Tipo de solicitud' : 'Request type' }}<select name="tipo_solicitud" [(ngModel)]="tipoSolicitud" required><option value="">{{ language() === 'es' ? 'Selecciona una opción' : 'Select an option' }}</option><option value="Queja">{{ language() === 'es' ? 'Queja' : 'Complaint' }}</option><option value="Reclamo">{{ language() === 'es' ? 'Reclamo' : 'Claim' }}</option><option value="Sugerencia">{{ language() === 'es' ? 'Sugerencia' : 'Suggestion' }}</option></select></label><label>{{ language() === 'es' ? 'Fecha del servicio' : 'Service date' }}<input type="date" name="fecha_servicio" [(ngModel)]="fechaServicio" required /></label><label>{{ language() === 'es' ? 'Cuéntanos qué ocurrió' : 'Tell us what happened' }}<textarea name="detalle_solicitud" [(ngModel)]="detalleSolicitud" rows="5" required placeholder="{{ language() === 'es' ? 'Describe los hechos con el mayor detalle posible' : 'Describe what happened in as much detail as possible' }}"></textarea></label><label>{{ language() === 'es' ? '¿Qué solución esperas?' : 'What solution are you seeking?' }}<textarea name="solucion_esperada" [(ngModel)]="solucionEsperada" rows="3" required placeholder="{{ language() === 'es' ? 'Escribe tu solicitud' : 'Enter your request' }}"></textarea></label><label class="check-label"><input type="checkbox" name="confirmacion" [(ngModel)]="confirmacion" required /> {{ language() === 'es' ? 'Confirmo que la información brindada es verdadera.' : 'I confirm that the information provided is true.' }}</label><button class="button button-primary" type="submit" [disabled]="isSending">{{ isSending ? (language() === 'es' ? 'Enviando...' : 'Sending...') : (language() === 'es' ? 'Enviar solicitud' : 'Submit request') }} <span>↗</span></button></form></div></section>
` })
export class ClaimsPage {
  protected readonly language = inject(LanguageService).language;
  private readonly emailJsServiceId = 'service_ge1gxt8';
  private readonly emailJsTemplateId = 'template_4hm8dtj';
  private readonly emailJsPublicKey = 'LstO0DA7TXhuH1Va6';

  nombreCompleto = '';
  dniRuc = '';
  correoElectronico = '';
  telefono = '';
  tipoSolicitud = '';
  fechaServicio = '';
  detalleSolicitud = '';
  solucionEsperada = '';
  confirmacion = false;
  isSending = false;

  enviarReclamo(): void {
    if (this.isSending) return;

    if (this.emailJsTemplateId.startsWith('TU_') || this.emailJsPublicKey.startsWith('TU_')) {
      window.alert(this.language() === 'es'
        ? 'Configura el Template ID y la Public Key de EmailJS antes de enviar.'
        : 'Configure the EmailJS template ID and public key before sending.');
      return;
    }

    this.isSending = true;
    const datosEnvio = {
      nombre_completo: this.nombreCompleto,
      dni_ruc: this.dniRuc,
      correo_electronico: this.correoElectronico,
      telefono: this.telefono,
      tipo_solicitud: this.tipoSolicitud,
      fecha_servicio: this.fechaServicio,
      detalle_solicitud: this.detalleSolicitud,
      solucion_esperada: this.solucionEsperada,
    };

    emailjs.send(this.emailJsServiceId, this.emailJsTemplateId, datosEnvio, this.emailJsPublicKey)
      .then(() => {
        window.alert(this.language() === 'es'
          ? 'Su reclamo ha sido enviado con éxito.'
          : 'Your claim has been submitted successfully.');
        this.limpiarFormulario();
      })
      .catch(() => {
        window.alert(this.language() === 'es'
          ? 'No se pudo enviar el reclamo. Intente nuevamente más tarde.'
          : 'The claim could not be submitted. Please try again later.');
      })
      .finally(() => {
        this.isSending = false;
      });
  }

  private limpiarFormulario(): void {
    this.nombreCompleto = '';
    this.dniRuc = '';
    this.correoElectronico = '';
    this.telefono = '';
    this.tipoSolicitud = '';
    this.fechaServicio = '';
    this.detalleSolicitud = '';
    this.solucionEsperada = '';
    this.confirmacion = false;
  }
}