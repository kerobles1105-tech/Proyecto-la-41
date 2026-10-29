import { AfterViewInit, Component, ElementRef, HostListener, inject, OnDestroy, OnInit, signal, computed, ViewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import emailjs from '@emailjs/browser';
import { LanguageService } from './language.service';
import * as L from 'leaflet';
import { OFFICIAL_ROUTE_41_PATH, OFFICIAL_ROUTE_41_IDA, OFFICIAL_ROUTE_41_VUELTA, OFFICIAL_15_KEY_STOPS } from './route-41.data';

@Component({ standalone: true, imports: [RouterLink], template: `
  <section class="hero-section page-hero"><div class="hero-overlay"></div><div class="container hero-content"><p class="eyebrow light"><span></span> {{ language() === 'es' ? 'Servicio rápido, seguro y confiable' : 'Fast, safe and reliable service' }}</p><h1>{{ language() === 'es' ? 'Movemos lo que' : 'We move what' }}<br /><em>{{ language() === 'es' ? 'importa.' : 'matters.' }}</em></h1><p class="hero-description">{{ language() === 'es' ? 'Conectamos personas, ciudades y oportunidades con la fuerza de una flota preparada para llegar más lejos.' : 'We connect people, cities and opportunities with a fleet ready to go farther and serve better.' }}</p><div class="hero-stats" aria-label="{{ language() === 'es' ? 'Estadísticas de la empresa' : 'Company statistics' }}"><div class="stat-item"><strong class="stat-value"><span class="stat-sign">+</span>35</strong><span class="stat-label">{{ language() === 'es' ? 'años de experiencia' : 'years of experience' }}</span></div><div class="stat-item"><strong class="stat-value">24/7</strong><span class="stat-label">{{ language() === 'es' ? 'atención y soporte' : 'support and assistance' }}</span></div><div class="stat-item"><strong class="stat-value">100%</strong><span class="stat-label">{{ language() === 'es' ? 'compromiso peruano' : 'Peruvian commitment' }}</span></div></div></div></section>
  <section class="section-space home-intro"><div class="container split-heading"><div><p class="eyebrow">{{ language() === 'es' ? 'Una ruta con propósito' : 'A route with purpose' }}</p><h2>{{ language() === 'es' ? 'La confianza también' : 'Trust is also' }}<br /><em>{{ language() === 'es' ? 'se transporta.' : 'transported.' }}</em></h2></div><div><p class="body-copy">{{ language() === 'es' ? 'Transportes 41 S.A. conecta personas, ciudades y oportunidades con responsabilidad, puntualidad y un profundo respeto por quienes confían en nosotros.' : 'Transportes 41 S.A. connects people, cities and opportunities with responsibility, punctuality and deep respect for those who trust us.' }}</p><a class="text-link" routerLink="/nosotros">{{ language() === 'es' ? 'Conoce nuestra empresa' : 'Meet our company' }} <span>→</span></a></div></div></section>
` })
export class HomePage {
  protected readonly language = inject(LanguageService).language;
}

@Component({ standalone: true, imports: [], template: `
  <section class="news-hero"><div class="container news-hero-layout"><div class="news-hero-copy"><p class="eyebrow light"><span></span> {{ language() === 'es' ? 'ACTUALIDAD / TRANSPORTES 41' : 'NEWS / TRANSPORTES 41' }}</p><h1>{{ language() === 'es' ? 'En ruta,' : 'On the move,' }}<br /><em>{{ language() === 'es' ? 'también te contamos.' : 'we keep you informed.' }}</em></h1><p>{{ language() === 'es' ? 'Comunicados y novedades sobre nuestros servicios, recorridos y equipo.' : 'Updates and news about our services, routes and team.' }}</p><button class="news-scroll-button" type="button" aria-label="{{ language() === 'es' ? 'Bajar a las últimas novedades' : 'Scroll to the latest news' }}" title="{{ language() === 'es' ? 'Bajar a las últimas novedades' : 'Scroll to the latest news' }}" (click)="scrollToNews()"><span aria-hidden="true">↓</span></button></div></div></section>
  <section #latestNews id="ultimas-noticias" class="news-latest section-space">
    <div class="container">
      <div class="section-heading">
        <div>
          <p class="eyebrow"><span></span> {{ language() === 'es' ? 'Boletín 41' : '41 bulletin' }}</p>
          <h2>{{ language() === 'es' ? 'Últimas' : 'Latest' }}<br /><em>{{ language() === 'es' ? 'novedades.' : 'updates.' }}</em></h2>
        </div>
        <p class="heading-support">{{ language() === 'es' ? 'Información de primera mano sobre la operación y la vida de nuestra empresa.' : 'First-hand information about our operations and company life.' }}</p>
      </div>

      <article class="news-feature-story">
        <!-- Columna Visual: Imagen 100% COMPLETA adornada con su Marquito Ejecutivo -->
        <div class="news-story-frame-wrapper">
          <figure class="news-marquito-frame">
            <div class="news-marquito-inner">
              <img 
                src="/baje1.png" 
                alt="{{ language() === 'es' ? 'Anuncio oficial: ¡Baja de precios en los pasajes! La 41 S.A.' : 'Official announcement: Fare reductions on Transportes 41 S.A.' }}" 
                class="news-image-full"
              />
            </div>
          </figure>
        </div>

        <!-- Columna de Contenido Editorial Mejorada -->
        <div class="news-story-copy">
          <div class="news-meta-row">
            <span class="news-category-tag">📢 {{ language() === 'es' ? 'Novedad de servicio' : 'Service update' }}</span>
            <span class="news-status-pill">✓ {{ language() === 'es' ? 'Vigente' : 'Active' }}</span>
          </div>

          <h3>{{ language() === 'es' ? 'Bajamos el precio de los pasajes' : 'We lowered the fares' }}</h3>

          <p class="news-lead-copy">
            {{ language() === 'es' 
              ? 'En Transportes 41 S.A. pensamos en la economía de nuestros pasajeros. Por ello, hemos reducido las tarifas en diversos tramos para que sigas viajando cómodo, rápido y seguro al mejor precio en todo Lima y Callao.' 
              : 'At Transportes 41 S.A. we think of our passengers. We have reduced segment fares so you can continue traveling comfortably, quickly, and safely at the best price.' }}
          </p>

          <!-- Puntos destacados de valor para el usuario -->
          <div class="news-highlights-grid">
            <div class="news-highlight-item">
              <span class="highlight-check">✓</span>
              <div>
                <strong>{{ language() === 'es' ? 'Tarifas más accesibles' : 'More affordable fares' }}</strong>
                <small>{{ language() === 'es' ? 'Precios rebajados en tramos urbanos autorizados' : 'Reduced rates on authorized city corridors' }}</small>
              </div>
            </div>
            <div class="news-highlight-item">
              <span class="highlight-check">✓</span>
              <div>
                <strong>{{ language() === 'es' ? 'Medio pasaje garantizado' : 'Student discount guaranteed' }}</strong>
                <small>{{ language() === 'es' ? 'Universitario y escolar conforme a Ley' : 'Applicable for students according to law' }}</small>
              </div>
            </div>
            <div class="news-highlight-item">
              <span class="highlight-check">✓</span>
              <div>
                <strong>{{ language() === 'es' ? 'Misma calidad y seguridad' : 'Same safety and quality' }}</strong>
                <small>{{ language() === 'es' ? 'Monitoreo satelital GPS y unidades aseguradas' : 'Satellite GPS tracking and insured fleet' }}</small>
              </div>
            </div>
          </div>

          <!-- Nota de cobertura institucional al pie -->
          <div class="news-coverage-banner">
            <span class="coverage-icon">🚌</span>
            <span>{{ language() === 'es' ? 'Válido en todo el circuito de la Ruta 9801: Pachacútec ⇄ Villa El Salvador' : 'Valid along the entire Route 9801: Pachacútec ⇄ Villa El Salvador' }}</span>
          </div>
        </div>
      </article>
    </div>
  </section>
` })
export class NewsPage {
  protected readonly language = inject(LanguageService).language;
  @ViewChild('latestNews') private latestNewsElement!: ElementRef<HTMLElement>;

  scrollToNews(): void {
    this.latestNewsElement.nativeElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }
}

@Component({ standalone: true, imports: [], template: `
  <section class="inner-hero about-hero"><div class="container"><p class="eyebrow">{{ language() === 'es' ? '01 / Quiénes somos' : '01 / About us' }}</p><h1>{{ language() === 'es' ? 'La confianza también' : 'Trust is also' }}<br /><em>{{ language() === 'es' ? 'se transporta.' : 'transported.' }}</em></h1><p>{{ language() === 'es' ? 'Una empresa peruana que convierte cada recorrido en una experiencia segura y responsable.' : 'A Peruvian company that makes every journey a safe and responsible experience.' }}</p></div></section>
  <section class="about-history section-space"><div class="container about-history-layout"><div class="about-history-copy"><p class="eyebrow"><span></span> {{ language() === 'es' ? 'La historia de 41 S.A.' : 'The story of 41 S.A.' }}</p><h2>{{ language() === 'es' ? 'Quiénes somos' : 'About us' }}</h2><p class="about-history-lead">{{ language() === 'es' ? 'Más de 35 años conectando personas, comunidades y oportunidades a través del transporte.' : 'Over 35 years connecting people, communities, and opportunities through transportation.' }}</p><p>{{ language() === 'es' ? 'Transportes 41 S.A. es una empresa peruana dedicada al transporte de personas y mercancías. Nuestra historia se construye viaje a viaje, con responsabilidad, puntualidad y vocación de servicio.' : 'Transportes 41 S.A. is a Peruvian company dedicated to transporting people and goods. Our story is built one trip at a time, with responsibility, punctuality, and a commitment to service.' }}</p><p>{{ language() === 'es' ? 'Hoy seguimos uniendo Lima. El recorrido entre Pachacútec y Villa El Salvador refleja el trabajo coordinado de nuestros conductores, el equipo administrativo y una flota preparada para cada jornada.' : 'Today, we continue connecting Lima. The route between Pachacútec and Villa El Salvador reflects the coordinated work of our drivers, administrative team, and fleet, ready for daily operations.' }}</p><div class="about-history-years"><strong>+35</strong><span>{{ language() === 'es' ? 'años de experiencia' : 'years of experience' }}</span></div></div><div class="about-history-gallery"><div class="about-history-carousel-stage"><div id="about-history-slide" class="about-history-carousel-viewport" role="group" aria-label="{{ language() === 'es' ? 'Imágenes de Transportes 41 S.A.' : 'Images of Transportes 41 S.A.' }}" [attr.aria-roledescription]="language() === 'es' ? 'carrusel' : 'carousel'" aria-live="off">@switch (historyImageIndex()) { @case (0) { <figure class="about-history-photo"><img src="/atencia.jpg" alt="{{ language() === 'es' ? 'Equipo de atención de Transportes 41 S.A.' : 'Transportes 41 S.A. customer service team' }}" /><figcaption>{{ language() === 'es' ? 'Nuestro equipo de atención' : 'Our customer service team' }}</figcaption></figure> } @case (1) { <figure class="about-history-photo"><img src="/grupocapacitacion.png" alt="{{ language() === 'es' ? 'Equipo de Transportes 41 S.A. en capacitación' : 'Transportes 41 S.A. team in training' }}" /><figcaption>{{ language() === 'es' ? 'Capacitación de nuestro equipo' : 'Training our team' }}</figcaption></figure> } @case (2) { <figure class="about-history-photo"><img src="/imagen41.jpeg" alt="{{ language() === 'es' ? 'Imagen de Transportes 41 S.A.' : 'Transportes 41 S.A. image' }}" /><figcaption>Transportes 41 S.A.</figcaption></figure> } }</div><div class="about-history-controls"><button type="button" aria-label="{{ language() === 'es' ? 'Imagen anterior' : 'Previous image' }}" aria-controls="about-history-slide" (click)="previousHistoryImage()"><span aria-hidden="true">←</span></button><button type="button" aria-label="{{ language() === 'es' ? 'Imagen siguiente' : 'Next image' }}" aria-controls="about-history-slide" (click)="nextHistoryImage()"><span aria-hidden="true">→</span></button></div></div><div class="about-history-carousel-footer"><span>{{ historyImageIndex() + 1 }} / 3</span><div class="about-history-dots" role="group" aria-label="{{ language() === 'es' ? 'Elegir imagen' : 'Choose an image' }}"><button type="button" [class.active]="historyImageIndex() === 0" [attr.aria-pressed]="historyImageIndex() === 0" aria-label="{{ language() === 'es' ? 'Mostrar equipo de atención' : 'Show customer service team' }}" (click)="selectHistoryImage(0)"></button><button type="button" [class.active]="historyImageIndex() === 1" [attr.aria-pressed]="historyImageIndex() === 1" aria-label="{{ language() === 'es' ? 'Mostrar foto de capacitación' : 'Show training photo' }}" (click)="selectHistoryImage(1)"></button><button type="button" [class.active]="historyImageIndex() === 2" [attr.aria-pressed]="historyImageIndex() === 2" aria-label="{{ language() === 'es' ? 'Mostrar imagen de Transportes 41' : 'Show Transportes 41 image' }}" (click)="selectHistoryImage(2)"></button></div><button class="about-history-toggle" type="button" [attr.aria-label]="historyRotationPaused() ? (language() === 'es' ? 'Reanudar carrusel' : 'Resume carousel') : (language() === 'es' ? 'Pausar carrusel' : 'Pause carousel')" (click)="toggleHistoryRotation()"><span aria-hidden="true">{{ historyRotationPaused() ? '▶' : 'Ⅱ' }}</span></button></div></div></div></section>
  <section class="about-principles section-space"><div class="container"><div class="section-heading"><div><p class="eyebrow">{{ language() === 'es' ? 'Lo que nos guía' : 'What guides us' }}</p><h2>{{ language() === 'es' ? 'Un servicio' : 'A service' }}<br /><em>{{ language() === 'es' ? 'con propósito.' : 'with purpose.' }}</em></h2></div><p class="heading-support">{{ language() === 'es' ? 'La forma en que cuidamos a las personas en cada recorrido.' : 'How we care for people on every journey.' }}</p></div><div class="container about-details"><div class="about-card about-card-mission"><div class="about-card-media mission-media"><img src="/mision-rumbo.jpg" alt="{{ language() === 'es' ? 'Símbolo de Misión y Rumbo: brújula de precisión orientando el trazado de la ruta sobre el mapa' : 'Symbol of Mission and Route: precision compass guiding the plotted route on the map' }}" class="about-card-photo photo-mission" /><div class="about-card-photo-overlay" aria-hidden="true"></div></div><span class="about-index">01</span><h3>{{ language() === 'es' ? 'Misión' : 'Mission' }}</h3><p>{{ language() === 'es' ? 'Brindar soluciones de transporte confiables, cuidando a cada pasajero, carga y colaborador durante todo el recorrido.' : 'To provide reliable transportation solutions while caring for every passenger, shipment, and team member throughout each journey.' }}</p></div><div class="about-card about-card-vision"><div class="about-card-media vision-media"><img src="/vision-horizonte.jpg" alt="{{ language() === 'es' ? 'Símbolo de Visión y Horizonte: telescopio clásico enfocado hacia el amanecer en el horizonte' : 'Symbol of Vision and Horizon: classic telescope focused on the dawn horizon' }}" class="about-card-photo photo-vision" /><div class="about-card-photo-overlay" aria-hidden="true"></div></div><span class="about-index">02</span><h3>{{ language() === 'es' ? 'Visión' : 'Vision' }}</h3><p>{{ language() === 'es' ? 'Ser una empresa referente en movilidad responsable y eficiente, reconocida por la calidad de nuestro servicio.' : 'To be a leading company in responsible and efficient mobility, recognized for the quality of our service.' }}</p></div><div class="about-card about-card-principles"><div class="about-card-media principles-media"><img src="/principios-valores.jpg" alt="{{ language() === 'es' ? 'Símbolo de Principios y Valores: balanza clásica en equilibrio representando ética, integridad y rectitud' : 'Symbol of Principles and Values: classic balance scale in equilibrium representing ethics, integrity, and fairness' }}" class="about-card-photo photo-principles" /><div class="about-card-photo-overlay" aria-hidden="true"></div></div><span class="about-index">03</span><h3>{{ language() === 'es' ? 'Principios' : 'Principles' }}</h3><p>{{ language() === 'es' ? 'Seguridad, puntualidad, respeto y mejora continua en cada decisión que tomamos.' : 'Safety, punctuality, respect, and continuous improvement in every decision we make.' }}</p></div></div></div></section>
  <section id="mapa" class="route-section section-space">
    <div class="container">
      <div class="section-heading route-section-heading">
        <div class="heading-copy-center">
          <p class="eyebrow">{{ language() === 'es' ? 'Recorrido oficial • Cobertura' : 'Official Route • Coverage' }}</p>
          <h2>{{ language() === 'es' ? 'Mapa' : 'Map' }}</h2>
        </div>
        <p class="heading-support">{{ language() === 'es' ? 'Trazado GPS oficial del recorrido de la Ruta 9801 de Transportes 41 S.A., conectando 17 distritos entre Pachacútec y Villa El Salvador.' : 'Official GPS route map of Transportes 41 S.A., connecting 17 districts between Pachacútec and Villa El Salvador.' }}</p>
      </div>

      <div class="official-map-wrapper">
        <div class="official-map-grid">
          <!-- Visor del Mapa Oficial (Interactivo con Coordenadas GPS Reales) -->
          <div class="official-map-viewer-card">
            <!-- Barra superior del visor -->
            <div class="viewer-header-bar">
              <div class="viewer-title">
                <span class="viewer-tag">RUTA 9801</span>
                <div>
                  <strong>{{ language() === 'es' ? 'Mapa' : 'Map' }}</strong>
                  <span class="viewer-subtitle">{{ language() === 'es' ? 'Trazado Pachacútec ⇄ Villa El Salvador' : 'Route Pachacútec ⇄ Villa El Salvador' }}</span>
                </div>
              </div>

              <div class="route-official-pill">
                <span class="route-status-beacon"></span>
                <span class="route-pill-title">{{ language() === 'es' ? 'Ruta Oficial SIT Express • 41 S.A.' : 'Official SIT Express Line • 41 S.A.' }}</span>
                <span class="route-pill-meta">{{ activeDirection() === 'ida' ? '55.7 km • Pachacútec ➔ VES' : '56.3 km • VES ➔ Pachacútec' }}</span>
              </div>
            </div>

            <!-- Toolbar de Controles del Mapa Interactivo -->
            <div class="interactive-controls-bar">
              <div class="direction-switch-group">
                <button 
                  type="button" 
                  class="map-tool-btn direction-btn" 
                  [class.active]="activeDirection() === 'ida'"
                  (click)="setDirection('ida')"
                  title="{{ language() === 'es' ? 'Ver recorrido de Ida: Pachacútec a Villa El Salvador' : 'Outbound: Pachacútec to VES' }}">
                  🟢 {{ language() === 'es' ? 'Ida (55.7 km)' : 'Outbound' }}
                </button>
                <button 
                  type="button" 
                  class="map-tool-btn direction-btn" 
                  [class.active]="activeDirection() === 'vuelta'"
                  (click)="setDirection('vuelta')"
                  title="{{ language() === 'es' ? 'Ver recorrido de Vuelta: Villa El Salvador a Pachacútec' : 'Inbound: VES to Pachacútec' }}">
                  🔄 {{ language() === 'es' ? 'Vuelta (56.3 km)' : 'Inbound' }}
                </button>
              </div>

              <div class="map-actions-group">
                <button 
                  type="button" 
                  class="map-tool-btn" 
                  [class.active]="showStops()"
                  (click)="toggleStops()"
                  title="{{ language() === 'es' ? 'Mostrar u ocultar los 15 paraderos clave oficiales' : 'Toggle 15 key official stops' }}">
                  <span>🚏</span> {{ showStops() ? (language() === 'es' ? '15 Paraderos' : '15 Key Stops') : (language() === 'es' ? 'Ver Paraderos' : 'Show Stops') }}
                </button>
                <button 
                  type="button" 
                  class="map-tool-btn" 
                  (click)="resetMapBounds()"
                  title="{{ language() === 'es' ? 'Ajustar zoom al recorrido completo' : 'Fit to full route' }}">
                  <span>🎯</span> {{ language() === 'es' ? 'Centrar' : 'Fit' }}
                </button>
              </div>
            </div>

            <!-- Canvas del Mapa Interactivo Leaflet -->
            <div class="interactive-map-stage">
              <div id="interactive-route-map" class="interactive-map-canvas"></div>

              <!-- Badge Flotante Informativo en el mapa -->
              <div class="map-floating-legend">
                <div class="legend-badge-item">
                  <span class="legend-swatch swatch-green"></span>
                  <span>{{ language() === 'es' ? 'Línea Oficial: Pachacútec ⇄ Villa El Salvador' : 'Official Route Line: Pachacútec ⇄ Villa El Salvador' }}</span>
                </div>
                <div class="legend-badge-item">
                  <span class="legend-badge-circle">1-15</span>
                  <span>{{ language() === 'es' ? '15 Paraderos y Avenidas Principales' : '15 Key Avenues & Stops' }}</span>
                </div>
                <div class="legend-badge-item legend-hint">
                  <span>🖱️ {{ language() === 'es' ? 'Arrastra o haz zoom libremente • Clic en paraderos para detalles' : 'Drag or zoom freely • Click stops for details' }}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
` })
export class AboutPage implements AfterViewInit, OnDestroy {
  protected readonly language = inject(LanguageService).language;

  // Estado del Mapa Interactivo Leaflet
  readonly showStops = signal<boolean>(true);
  readonly activeDirection = signal<'ida' | 'vuelta'>('ida');

  private map: L.Map | undefined;
  private casingLayer: L.Polyline | undefined;
  private routeLineLayer: L.Polyline | undefined;
  private stopsLayerGroup: L.LayerGroup | undefined;

  // Carrusel histórico institucional
  readonly historyImageIndex = signal(0);
  readonly historyRotationPaused = signal(false);
  private historyRotationTimer: ReturnType<typeof setInterval> | undefined;

  ngAfterViewInit(): void {
    this.historyRotationPaused.set(window.matchMedia('(prefers-reduced-motion: reduce)').matches);
    this.restartHistoryRotation();
    this.initLeafletMap();
  }

  ngOnDestroy(): void {
    this.stopHistoryRotation();
    if (this.map) {
      this.map.remove();
      this.map = undefined;
    }
  }

  toggleStops(): void {
    this.showStops.update(v => !v);
    if (!this.map || !this.stopsLayerGroup) return;
    if (this.showStops()) {
      if (!this.map.hasLayer(this.stopsLayerGroup)) {
        this.stopsLayerGroup.addTo(this.map);
      }
    } else {
      if (this.map.hasLayer(this.stopsLayerGroup)) {
        this.map.removeLayer(this.stopsLayerGroup);
      }
    }
  }

  resetMapBounds(): void {
    if (!this.map || !this.routeLineLayer) return;
    this.map.fitBounds(this.routeLineLayer.getBounds(), { padding: [35, 35] });
  }

  setDirection(dir: 'ida' | 'vuelta'): void {
    this.activeDirection.set(dir);
    if (!this.map || !this.routeLineLayer || !this.casingLayer) return;
    const path = dir === 'ida' ? OFFICIAL_ROUTE_41_IDA : OFFICIAL_ROUTE_41_VUELTA;
    this.routeLineLayer.setLatLngs(path as L.LatLngExpression[]);
    this.casingLayer.setLatLngs(path as L.LatLngExpression[]);
    this.map.fitBounds(this.routeLineLayer.getBounds(), { padding: [35, 35] });
  }

  private initLeafletMap(): void {
    if (typeof window === 'undefined') return;
    const container = document.getElementById('interactive-route-map');
    if (!container || this.map) return;

    // Inicializar mapa centrado en el eje troncal de Lima
    this.map = L.map('interactive-route-map', {
      center: [-12.046374, -77.042793],
      zoom: 11,
      zoomControl: true,
      scrollWheelZoom: true
    });

    // Tiles oficiales de OpenStreetMap
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 19,
      attribution: '&copy; OpenStreetMap | Empresa de Transportes 41 S.A.'
    }).addTo(this.map);

    // 1. Halo blanco de contraste para que la línea resalte limpia y legible sobre cualquier mapa
    this.casingLayer = L.polyline(OFFICIAL_ROUTE_41_PATH as L.LatLngExpression[], {
      color: '#ffffff',
      weight: 8,
      opacity: 0.95,
      lineJoin: 'round',
      lineCap: 'round'
    }).addTo(this.map);

    // 2. Línea Verde Esmeralda Oficial de la Ruta 41 (Sola, continua y exacta)
    this.routeLineLayer = L.polyline(OFFICIAL_ROUTE_41_PATH as L.LatLngExpression[], {
      color: '#059669',
      weight: 5,
      opacity: 1,
      lineJoin: 'round',
      lineCap: 'round'
    }).addTo(this.map);

    // 3. Capa de los 15 Paraderos y Avenidas Clave del Mapa Oficial
    this.stopsLayerGroup = L.layerGroup().addTo(this.map);
    this.renderStopMarkers();

    // Centrar mapa con margen para abarcar desde Pachacútec hasta Villa El Salvador
    if (this.routeLineLayer) {
      this.map.fitBounds(this.routeLineLayer.getBounds(), { padding: [35, 35] });
    }

    setTimeout(() => {
      this.map?.invalidateSize();
    }, 300);
  }

  private renderStopMarkers(): void {
    if (!this.stopsLayerGroup) return;
    this.stopsLayerGroup.clearLayers();

    const isEs = this.language() === 'es';

    OFFICIAL_15_KEY_STOPS.forEach(s => {
      const isTerminal = s.num === 1 || s.num === 15;
      const markerHtml = `
        <div class="key-stop-badge ${isTerminal ? 'terminal-badge' : ''}" title="${s.num}. ${s.name}">
          <span class="badge-num">${s.num}</span>
          <span class="badge-label">${s.name}</span>
        </div>
      `;

      const customIcon = L.divIcon({
        className: 'route-41-div-icon',
        html: markerHtml,
        iconSize: [160, 32],
        iconAnchor: [16, 16]
      });

      const marker = L.marker(s.coordinates, { icon: customIcon });

      const popupContent = `
        <div class="interactive-map-popup">
          <div class="popup-header" style="border-left: 4px solid #059669;">
            <span class="popup-type">${isTerminal ? (isEs ? 'Terminal Oficial' : 'Official Terminal') : (isEs ? 'Paradero Clave N° ' + s.num : 'Key Stop N° ' + s.num)}</span>
            <h4 class="popup-title">${s.num}. ${s.name}</h4>
          </div>
          <div class="popup-body">
            <p class="popup-street"><strong>${isEs ? 'Avenida / Referencia:' : 'Avenue / Landmark:'}</strong> ${s.sub}</p>
            <p class="popup-district"><strong>${isEs ? 'Corredor:' : 'Corridor:'}</strong> Empresa de Transportes 41 S.A. (Ruta 9801)</p>
          </div>
        </div>
      `;

      marker.bindPopup(popupContent, {
        className: 'custom-leaflet-popup',
        maxWidth: 320
      });

      this.stopsLayerGroup?.addLayer(marker);
    });
  }

  previousHistoryImage(): void {
    this.selectHistoryImage((this.historyImageIndex() + 2) % 3 as 0 | 1 | 2);
  }

  nextHistoryImage(): void {
    this.selectHistoryImage((this.historyImageIndex() + 1) % 3 as 0 | 1 | 2);
  }

  selectHistoryImage(index: 0 | 1 | 2): void {
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
      this.historyImageIndex.update((index) => (index + 1) % 3);
    }, 5000);
  }

  private stopHistoryRotation(): void {
    if (this.historyRotationTimer !== undefined) {
      clearInterval(this.historyRotationTimer);
      this.historyRotationTimer = undefined;
    }
  }
}

@Component({ standalone: true, template: `
  <section class="inner-hero services-hero"><div class="container"><p class="eyebrow">{{ language() === 'es' ? '02 / Servicios' : '02 / Services' }}</p><h1>{{ language() === 'es' ? 'Transporte pensado' : 'Transport designed' }}<br /><em>{{ language() === 'es' ? 'para avanzar.' : 'to move forward.' }}</em></h1><p>{{ language() === 'es' ? 'Soluciones integrales de movilidad urbana, ingeniería de flota y gestión técnica del transporte.' : 'Comprehensive urban mobility solutions, fleet engineering, and professional transit management.' }}</p></div></section>
  <section class="service-intro section-space"><div class="container service-intro-grid"><div><p class="eyebrow">{{ language() === 'es' ? 'Lo que hacemos' : 'What we do' }}</p><h2>{{ language() === 'es' ? 'Cada recorrido' : 'Every route' }}<br /><em>{{ language() === 'es' ? 'tiene un propósito.' : 'has a purpose.' }}</em></h2></div><p class="body-copy">{{ language() === 'es' ? 'Ponemos nuestra experiencia, equipo y capacidad operativa al servicio de cada usuario e institución. Conectamos Lima con altos estándares de regularidad, seguridad vial y mantenimiento preventivo.' : 'We provide our experience, equipment, and operational capacity at the service of every passenger and institution. Connecting Lima with rigorous safety, punctuality, and fleet engineering standards.' }}</p></div></section>
  <section class="services-section service-catalog section-space">
    <div class="container">
      <div class="service-carousel">
        <div class="service-carousel-stage" (mouseenter)="onMouseEnter()" (mouseleave)="onMouseLeave()">
          <div id="service-carousel-viewport" class="service-carousel-viewport" role="group" aria-label="{{ language() === 'es' ? 'Servicios disponibles' : 'Available services' }}" [attr.aria-roledescription]="language() === 'es' ? 'carrusel' : 'carousel'" aria-live="off">
            @switch (activeServiceIndex()) {
              @case (0) {
                <article class="service-card service-slide service-card-dark">
                  <div class="service-slide-media">
                    <img src="/carronuevo.png" alt="{{ language() === 'es' ? 'Vehículo de Transportes 41 S.A.' : 'Transportes 41 S.A. vehicle' }}" />
                  </div>
                  <div class="service-slide-copy">
                    <h3>{{ language() === 'es' ? 'Transporte público urbano masivo' : 'Urban mass transit operations' }}</h3>
                    <p>{{ language() === 'es' ? 'Operación troncal de transporte masivo en la Ruta Autorizada 9801 (Pachacútec ⇄ Villa El Salvador), cubriendo 134.58 km a lo largo de 17 distritos metropolitanos. Despacho dinámico con intervalos de paso de 8 a 12 minutos, monitoreo telemático satelital GPS en tiempo real y estricto control de itinerarios para garantizar regularidad, puntualidad y seguridad en la movilidad urbana.' : 'Mainline mass transit operations along authorized Route 9801 (Pachacútec ⇄ Villa El Salvador), covering 134.58 km across 17 metropolitan districts. Features headways of 8 to 12 minutes, real-time GPS fleet telematics, and rigorous itinerary adherence to ensure passenger reliability, punctuality, and transit safety.' }}</p>
                  </div>
                </article>
              }
              @case (1) {
                <article class="service-card service-slide service-card-red">
                  <div class="service-slide-media">
                    <img src="/servicios.jpg" alt="{{ language() === 'es' ? 'Servicio de transporte de Transportes 41 S.A.' : 'Transportes 41 S.A. transportation service' }}" />
                  </div>
                  <div class="service-slide-copy">
                    <h3>{{ language() === 'es' ? 'Transporte de personal e institucional' : 'Corporate & institutional transit' }}</h3>
                    <p>{{ language() === 'es' ? 'Soluciones logísticas de movilidad terrestre para empresas, industrias y entidades educativas. Configuración de rutas corporativas origen-destino con optimización de tiempos de traslado, cobertura integral de pólizas SOAT, unidades con altos estándares de confort y conductores profesionales evaluados bajo protocolos de manejo defensivo.' : 'Dedicated mobility logistics designed for enterprises, industrial centers, and educational entities. Customized point-to-point routing with optimized transit windows, full commercial insurance coverage, comfortable vehicles, and vetted drivers trained in defensive driving.' }}</p>
                  </div>
                </article>
              }
              @case (2) {
                <article class="service-card service-slide service-card-light">
                  <div class="service-slide-media">
                    <img src="/compa%C3%B1eros.jpeg" alt="{{ language() === 'es' ? 'Equipo de Transportes 41 S.A.' : 'Transportes 41 S.A. team' }}" />
                  </div>
                  <div class="service-slide-copy">
                    <h3>{{ language() === 'es' ? 'Ingeniería y mantenimiento de flota' : 'Fleet engineering & maintenance' }}</h3>
                    <p>{{ language() === 'es' ? 'Programa sistemático de mantenimiento preventivo y predictivo ejecutado en talleres mecánicos propios. Inspección periódica de sistemas de frenado neumático, dirección asistida, suspensión, neumáticos y control de emisiones, asegurando la máxima fiabilidad operativa, disponibilidad técnica y bioseguridad en cada jornada de ruta.' : 'Systematic preventive and predictive maintenance program executed in specialized in-house workshops. Periodic diagnostics of pneumatic braking systems, power steering, suspension, tires, and emission controls to ensure maximum operational uptime, mechanical reliability, and passenger safety.' }}</p>
                  </div>
                </article>
              }
              @case (3) {
                <article class="service-card service-slide service-card-red">
                  <div class="service-slide-media">
                    <img src="/Equipo.jpeg" alt="{{ language() === 'es' ? 'Equipo unido de Transportes 41 S.A.' : 'United Transportes 41 S.A. team' }}" />
                  </div>
                  <div class="service-slide-copy">
                    <h3>{{ language() === 'es' ? 'Gestión operativa y talento humano' : 'Operational team & route control' }}</h3>
                    <p>{{ language() === 'es' ? 'Cuerpo operativo integrado por conductores profesionales, despachadores de patio y supervisores de control en vía debidamente certificados. Programa continuo de capacitación en ergonomía, primeros auxilios, normatividad de tránsito y atención al usuario, respaldado por monitoreo de fatiga y protocolos de contingencia vial.' : 'Operational team comprised of certified professional drivers, yard dispatchers, and route controllers. Ongoing training curriculum in ergonomics, first aid, road traffic regulations, and passenger service, backed by driver fatigue monitoring and real-time contingency protocols.' }}</p>
                  </div>
                </article>
              }
            }
          </div>
          <div class="service-carousel-controls" aria-label="{{ language() === 'es' ? 'Navegación de servicios' : 'Service navigation' }}">
            <button type="button" aria-label="{{ language() === 'es' ? 'Servicio anterior' : 'Previous service' }}" aria-controls="service-carousel-viewport" (click)="previousService()"><span aria-hidden="true">←</span></button>
            <button type="button" aria-label="{{ language() === 'es' ? 'Servicio siguiente' : 'Next service' }}" aria-controls="service-carousel-viewport" (click)="nextService()"><span aria-hidden="true">→</span></button>
          </div>
        </div>
      </div>
    </div>
  </section>
  <section class="service-process section-space"><div class="container"><div class="section-heading"><div><p class="eyebrow">{{ language() === 'es' ? 'Así trabajamos' : 'How we work' }}</p><h2>{{ language() === 'es' ? 'Simple para ti.' : 'Simple for you.' }}<br /><em>{{ language() === 'es' ? 'Preciso para nosotros.' : 'Precise for us.' }}</em></h2></div><p class="heading-support">{{ language() === 'es' ? 'Nos ocupamos de la operación para que tú puedas concentrarte en lo que sigue.' : 'We take care of operations so you can focus on what comes next.' }}</p></div><div class="process-grid"><div><span>01</span><h3>{{ language() === 'es' ? 'Escuchamos' : 'We listen' }}</h3><p>{{ language() === 'es' ? 'Entendemos tu necesidad y el destino de tu operación.' : 'We understand your needs and the destination of your operation.' }}</p></div><div><span>02</span><h3>{{ language() === 'es' ? 'Planificamos' : 'We plan' }}</h3><p>{{ language() === 'es' ? 'Diseñamos la ruta, los recursos y los tiempos adecuados.' : 'We design the right route, resources, and timing.' }}</p></div><div><span>03</span><h3>{{ language() === 'es' ? 'Acompañamos' : 'We support you' }}</h3><p>{{ language() === 'es' ? 'Damos seguimiento hasta que todo llega bien.' : 'We follow up to make sure everything arrives safely.' }}</p></div></div></div></section>
` })
export class ServicesPage implements OnInit, OnDestroy {
  protected readonly language = inject(LanguageService).language;
  readonly activeServiceIndex = signal(0);
  readonly serviceCount = 4;
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
    this.activeServiceIndex.update((index) => (index + direction + this.serviceCount) % this.serviceCount);
    this.restartRotation();
  }

  onMouseEnter(): void {
    this.stopRotation();
  }

  onMouseLeave(): void {
    this.restartRotation();
  }

  private restartRotation(): void {
    this.stopRotation();
    if (this.isRotationPaused()) return;

    this.rotationTimer = setInterval(() => {
      this.activeServiceIndex.update((index) => (index + 1) % this.serviceCount);
    }, 12000);
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
  <section class="fleet-details section-space">
    <div class="container">
      <div class="section-heading">
        <div>
          <p class="eyebrow"><span></span> {{ language() === 'es' ? 'Seguridad y operación' : 'Safety and operations' }}</p>
          <h2>{{ language() === 'es' ? 'Preparados para' : 'Ready for' }}<br /><em>{{ language() === 'es' ? 'cada recorrido.' : 'every journey.' }}</em></h2>
        </div>
        <p class="heading-support">{{ language() === 'es' ? 'Personas, unidades y seguimiento trabajando juntos para cuidar cada viaje.' : 'People, vehicles, and monitoring working together to make every trip safer.' }}</p>
      </div>

      <div class="fleet-detail-grid">
        <!-- Tarjeta 01: Capacitación (Amarillo / Oro corporativo) -->
        <article class="fleet-detail-card card-capacitacion">
          <div class="fleet-card-accent-strip"></div>
          <div class="fleet-detail-image">
            <span class="fleet-detail-badge badge-yellow">👨‍✈️ {{ language() === 'es' ? 'CAPACITACIÓN CONTINUA' : 'CONTINUOUS TRAINING' }}</span>
            <img src="/conductores.jpeg" alt="{{ language() === 'es' ? 'Conductores de Transportes 41 S.A.' : 'Transportes 41 S.A. drivers' }}" />
            <div class="fleet-image-overlay"></div>
          </div>
          <div class="fleet-detail-copy">
            <span class="value-tag tag-yellow">01 / {{ language() === 'es' ? 'CAPACITACIÓN' : 'TRAINING' }}</span>
            <h3>{{ language() === 'es' ? 'Conductores preparados' : 'Prepared drivers' }}</h3>
            <p>{{ language() === 'es' ? 'Conductores capacitados para brindar un servicio responsable y priorizar la seguridad de los pasajeros en cada recorrido.' : 'Trained drivers provide responsible service and prioritize passenger safety on every journey.' }}</p>
            <div class="fleet-card-guarantee">
              <span class="guarantee-icon">✓</span>
              <span>{{ language() === 'es' ? 'Conductores certificados y trato respetuoso' : 'Certified drivers and respectful service' }}</span>
            </div>
          </div>
        </article>

        <!-- Tarjeta 02: Respaldo (Rojo corporativo) -->
        <article class="fleet-detail-card card-respaldo">
          <div class="fleet-card-accent-strip"></div>
          <div class="fleet-detail-image">
            <span class="fleet-detail-badge badge-red">🛡️ {{ language() === 'es' ? 'UNIDADES ASEGURADAS' : 'INSURED VEHICLES' }}</span>
            <img src="/carronuevo.png" alt="{{ language() === 'es' ? 'Unidad de Transportes 41 S.A.' : 'Transportes 41 S.A. vehicle' }}" />
            <div class="fleet-image-overlay"></div>
          </div>
          <div class="fleet-detail-copy">
            <span class="value-tag tag-red">02 / {{ language() === 'es' ? 'RESPALDO' : 'PROTECTION' }}</span>
            <h3>{{ language() === 'es' ? 'Unidades aseguradas' : 'Insured vehicles' }}</h3>
            <p>{{ language() === 'es' ? 'Los vehículos cuentan con seguro para brindar mayor respaldo y tranquilidad durante el servicio.' : 'All our vehicles are insured, providing greater protection and peace of mind throughout every trip.' }}</p>
            <div class="fleet-card-guarantee">
              <span class="guarantee-icon">✓</span>
              <span>{{ language() === 'es' ? 'Pólizas vigentes y respaldo ante imprevistos' : 'Active insurance and passenger peace of mind' }}</span>
            </div>
          </div>
        </article>

        <!-- Tarjeta 03: Seguimiento (Azul corporativo) -->
        <article class="fleet-detail-card card-seguimiento">
          <div class="fleet-card-accent-strip"></div>
          <div class="fleet-detail-image">
            <span class="fleet-detail-badge badge-blue">📡 {{ language() === 'es' ? 'MONITOREO GPS 24/7' : '24/7 GPS MONITORING' }}</span>
            <img src="/VANDAL.jfif" alt="{{ language() === 'es' ? 'Vehículo de la flota de Transportes 41 S.A. en operación' : 'Transportes 41 S.A. fleet vehicle in operation' }}" />
            <div class="fleet-image-overlay"></div>
          </div>
          <div class="fleet-detail-copy">
            <span class="value-tag tag-blue">03 / {{ language() === 'es' ? 'SEGUIMIENTO' : 'MONITORING' }}</span>
            <h3>{{ language() === 'es' ? 'Monitoreo en tiempo real' : 'Real-time monitoring' }}</h3>
            <p>{{ language() === 'es' ? 'El equipo monitorea los recorridos en tiempo real y coordina la operación para atender cualquier novedad.' : 'Our team monitors routes in real time and coordinates operations to address any issues.' }}</p>
            <div class="fleet-card-guarantee">
              <span class="guarantee-icon">✓</span>
              <span>{{ language() === 'es' ? 'Seguimiento satelital de velocidad y ruta' : 'Satellite speed and route monitoring' }}</span>
            </div>
          </div>
        </article>
      </div>
    </div>
  </section>
` })
export class FleetPage {
  protected readonly language = inject(LanguageService).language;
}

@Component({ standalone: true, template: `
  <section class="inner-hero safety-hero"><div class="container"><p class="eyebrow">{{ language() === 'es' ? '04 / Seguridad' : '04 / Safety' }}</p><h1>{{ language() === 'es' ? 'Más que llegar,' : 'More than arriving,' }}<br /><em>{{ language() === 'es' ? 'llegar bien.' : 'arriving well.' }}</em></h1><p>{{ language() === 'es' ? 'La seguridad es una práctica diaria que guía cada recorrido.' : 'Safety is a daily practice that guides every trip.' }}</p></div></section>
  <section class="safety-values-section section-space">
    <div class="container">
      <div class="section-heading">
        <div>
          <p class="eyebrow"><span></span> {{ language() === 'es' ? 'Nuestro compromiso' : 'Our commitment' }}</p>
          <h2>{{ language() === 'es' ? 'Un servicio' : 'A service' }}<br /><em>{{ language() === 'es' ? 'con propósito.' : 'with purpose.' }}</em></h2>
        </div>
        <p class="heading-support">{{ language() === 'es' ? 'Cuidamos a las personas y pensamos en el futuro de cada recorrido.' : 'We care for people and think about the future of every route.' }}</p>
      </div>

      <div class="values-grid">
        <!-- Tarjeta 01: Seguridad Primero (Amarillo / Oro corporativo) -->
        <article class="safety-value-card card-seguridad">
          <div class="safety-card-accent-strip"></div>
          <div class="safety-value-image image-soat">
            <span class="safety-card-badge badge-yellow">🛡️ {{ language() === 'es' ? 'SOAT ACTIVO' : 'ACTIVE SOAT' }}</span>
            <img src="/soat.webp" alt="{{ language() === 'es' ? 'Compromiso con la seguridad en cada recorrido - SOAT vigente' : 'Commitment to safety on every journey - Valid SOAT' }}" />
          </div>
          <div class="safety-value-copy">
            <span class="value-tag tag-yellow">01 / {{ language() === 'es' ? 'SEGURIDAD' : 'SAFETY' }}</span>
            <h3>{{ language() === 'es' ? 'Seguridad primero' : 'Safety first' }}</h3>
            <p>{{ language() === 'es' ? 'Cuidamos a nuestros pasajeros, colaboradores y comunidades en cada recorrido.' : 'We care for our passengers, team members, and communities on every trip.' }}</p>
            <div class="safety-card-guarantee">
              <span class="guarantee-icon">✓</span>
              <span>{{ language() === 'es' ? 'Póliza vigente y cobertura al 100%' : '100% active insurance coverage' }}</span>
            </div>
          </div>
        </article>

        <!-- Tarjeta 02: Servicio Humano (Rojo corporativo) -->
        <article class="safety-value-card card-personas">
          <div class="safety-card-accent-strip"></div>
          <div class="safety-value-image">
            <span class="safety-card-badge badge-red">👥 {{ language() === 'es' ? 'ATENCIÓN HUMANA' : 'HUMAN SERVICE' }}</span>
            <img src="/juntos.jpeg" alt="{{ language() === 'es' ? 'Equipo de Transportes 41 S.A.' : 'Transportes 41 S.A. team' }}" />
            <div class="safety-image-overlay"></div>
          </div>
          <div class="safety-value-copy">
            <span class="value-tag tag-red">02 / {{ language() === 'es' ? 'PERSONAS' : 'PEOPLE' }}</span>
            <h3>{{ language() === 'es' ? 'Servicio humano' : 'Human service' }}</h3>
            <p>{{ language() === 'es' ? 'Escuchamos, acompañamos y resolvemos con respeto y cercanía.' : 'We listen, support, and resolve issues with respect and care.' }}</p>
            <div class="safety-card-guarantee">
              <span class="guarantee-icon">✓</span>
              <span>{{ language() === 'es' ? 'Conductores con vocación de servicio' : 'Dedicated professional drivers' }}</span>
            </div>
          </div>
        </article>

        <!-- Tarjeta 03: Mirada al Futuro (Azul corporativo) -->
        <article class="safety-value-card card-futuro">
          <div class="safety-card-accent-strip"></div>
          <div class="safety-value-image">
            <span class="safety-card-badge badge-blue">🚀 {{ language() === 'es' ? 'MOVILIDAD SOSTENIBLE' : 'SUSTAINABLE MOBILITY' }}</span>
            <img src="/futuro.webp" alt="{{ language() === 'es' ? 'Unidad de la flota de Transportes 41 S.A.' : 'Transportes 41 S.A. fleet vehicle' }}" />
            <div class="safety-image-overlay"></div>
          </div>
          <div class="safety-value-copy">
            <span class="value-tag tag-blue">03 / {{ language() === 'es' ? 'FUTURO' : 'FUTURE' }}</span>
            <h3>{{ language() === 'es' ? 'Mirada al futuro' : 'Future vision' }}</h3>
            <p>{{ language() === 'es' ? 'Buscamos una movilidad más ordenada, responsable y sostenible.' : 'We seek more orderly, responsible and sustainable mobility.' }}</p>
            <div class="safety-card-guarantee">
              <span class="guarantee-icon">✓</span>
              <span>{{ language() === 'es' ? 'Flota moderna y tecnología satelital' : 'Modern fleet with GPS tracking' }}</span>
            </div>
          </div>
        </article>
      </div>
    </div>
  </section>
` })
export class SafetyPage {
  protected readonly language = inject(LanguageService).language;
}

@Component({ standalone: true, imports: [FormsModule], template: `
  <section class="inner-hero contact-hero">
    <div class="container">
      <p class="eyebrow">{{ language() === 'es' ? '05 / Atención y Contacto' : '05 / Passenger Service & Contact' }}</p>
      <h1>{{ language() === 'es' ? 'Estamos a tu servicio,' : 'At your service,' }}<br /><em>{{ language() === 'es' ? 'en cada recorrido.' : 'on every journey.' }}</em></h1>
      <p>{{ language() === 'es' ? 'Canal oficial de Transportes 41 S.A. para consultas de ruta, tarifas, reporte de objetos olvidados, contratación corporativa y atención directa.' : 'Official Transportes 41 S.A. channel for route inquiries, fares, lost items, corporate rentals, and direct passenger support.' }}</p>
    </div>
  </section>

  <!-- Centro de Ayuda al Pasajero -->
  <section class="care-section section-space">
    <div class="container">
      <div class="section-heading">
        <div>
          <p class="eyebrow">{{ language() === 'es' ? 'Centro de ayuda' : 'Help center' }}</p>
          <h2>{{ language() === 'es' ? '¿En qué podemos' : 'How can we' }}<br /><em>{{ language() === 'es' ? 'ayudarte hoy?' : 'help you today?' }}</em></h2>
        </div>
        <p class="heading-support">{{ language() === 'es' ? 'Elige una opción rápida o completa el formulario inferior para que nuestro equipo atienda tu consulta con prioridad.' : 'Choose a quick action below or fill out the form so our team can assist you with priority.' }}</p>
      </div>

      <div class="help-grid">
        <article class="help-card" (click)="seleccionarMotivo('Consulta sobre Servicio y Horarios')" role="button" tabindex="0">
          <span class="help-card-tag">{{ language() === 'es' ? '01 / RUTA 9801' : '01 / ROUTE 9801' }}</span>
          <h3>{{ language() === 'es' ? 'Horarios y Frecuencias' : 'Schedules & Frequency' }}</h3>
          <p>{{ language() === 'es' ? 'Salida continua de buses de 4:30 a.m. a 11:30 p.m. Intervalos de 8 a 12 minutos entre Pachacútec y Villa El Salvador.' : 'Continuous departures from 4:30 AM to 11:30 PM. 8 to 12 minute headway between Pachacútec and Villa El Salvador.' }}</p>
          <span class="help-card-action">{{ language() === 'es' ? 'Consultar horarios' : 'Check schedules' }} <b>↓</b></span>
        </article>

        <article class="help-card" (click)="seleccionarMotivo('Reporte de Objetos Perdidos')" role="button" tabindex="0">
          <span class="help-card-tag">{{ language() === 'es' ? '02 / OBJETOS PERDIDOS' : '02 / LOST PROPERTY' }}</span>
          <h3>{{ language() === 'es' ? 'Objetos en Unidades' : 'Lost & Found' }}</h3>
          <p>{{ language() === 'es' ? '¿Olvidaste una pertenencia o documento en nuestros buses? Notifícanos con fecha aproximada, hora y paradero para coordinar su búsqueda.' : 'Did you leave a belonging on board? Notify us with the date, time, and stop so our control team can track it down.' }}</p>
          <span class="help-card-action">{{ language() === 'es' ? 'Reportar objeto' : 'Report item' }} <b>↓</b></span>
        </article>

        <article class="help-card" (click)="seleccionarMotivo('Alquiler de Buses y Servicios Especiales')" role="button" tabindex="0">
          <span class="help-card-tag">{{ language() === 'es' ? '03 / SERVICIOS ESPECIALES' : '03 / SPECIAL SERVICES' }}</span>
          <h3>{{ language() === 'es' ? 'Alquiler y Corporativo' : 'Charter & Corporate' }}</h3>
          <p>{{ language() === 'es' ? 'Traslado de personal de empresas, viajes de instituciones, colegios y eventos privados con choferes calificados y SOAT al día.' : 'Corporate staff shuttles, educational tours, and private events with modern fleet, insurance, and professional drivers.' }}</p>
          <span class="help-card-action">{{ language() === 'es' ? 'Solicitar cotización' : 'Request quote' }} <b>↓</b></span>
        </article>
      </div>
    </div>
  </section>

  <!-- Canales Directos y Formulario Unificado -->
  <section id="formulario-contacto" class="contact-section contact-page section-space" style="padding-top: 40px;">
    <div class="container contact-grid">
      <div class="contact-channels-column">
        <p class="eyebrow light">{{ language() === 'es' ? 'Canales directos' : 'Direct channels' }}</p>
        <h2>{{ language() === 'es' ? 'Comunícate' : 'Get in touch' }}<br /><em>{{ language() === 'es' ? 'con nosotros.' : 'with our team.' }}</em></h2>
        <p>{{ language() === 'es' ? 'Estamos disponibles de lunes a domingo. Elige tu canal preferido para una atención rápida y personalizada.' : 'We are available Monday through Sunday. Choose your preferred channel for prompt and personalized assistance.' }}</p>

        <!-- WhatsApp Card -->
        <div class="whatsapp-card">
          <div class="whatsapp-card-main">
            <span class="whatsapp-icon" aria-hidden="true">
              <svg viewBox="0 0 24 24" role="img"><path d="M20.5 3.5A11.8 11.8 0 0 0 12.1 0C5.6 0 .3 5.3.3 11.8c0 2.1.6 4.2 1.7 6L.2 24l6.4-1.7a11.8 11.8 0 0 0 5.5 1.4h.1c6.5 0 11.8-5.3 11.8-11.8 0-3.2-1.3-6.2-3.5-8.4ZM12.2 21.6h-.1a9.8 9.8 0 0 1-5-1.4l-.4-.2-3.8 1 1-3.7-.2-.4a9.8 9.8 0 0 1-1.5-5.2C2.2 6.4 6.7 2 12.1 2c2.6 0 5.1 1 6.9 2.9a9.8 9.8 0 0 1 2.9 7c0 5.4-4.4 9.7-9.7 9.7Zm5.3-7.3c-.3-.2-1.7-.8-2-1-.3-.1-.5-.2-.7.2-.2.3-.8 1-.9 1.2-.2.2-.3.2-.6.1-1.5-.7-2.5-1.3-3.5-2.9-.3-.5.3-.4.8-1.3.1-.2.1-.4 0-.6l-.9-2.1c-.2-.5-.5-.4-.7-.4h-.6c-.2 0-.6.1-.9.4-.3.3-1.1 1.1-1.1 2.6s1.1 3 1.3 3.2c.2.2 2.1 3.2 5.1 4.5 1.9.8 2.6.9 3.5.8.6-.1 1.7-.7 1.9-1.4.2-.7.2-1.3.1-1.4-.2-.1-.4-.2-.8-.4Z" /></svg>
            </span>
            <div>
              <span class="whatsapp-label">{{ language() === 'es' ? 'Atención Inmediata' : 'Immediate Support' }}</span>
              <strong>{{ language() === 'es' ? 'WhatsApp Oficial' : 'Official WhatsApp' }}</strong>
              <small>+51 995479948</small>
            </div>
          </div>
          <a class="whatsapp-button"
            [href]="language() === 'es' ? 'https://wa.me/51995479948?text=Hola%2C%20deseo%20comunicarme%20con%20atenci%C3%B3n%20al%20pasajero%20de%20Transportes%2041.' : 'https://wa.me/51995479948?text=Hello%2C%20I%20would%20like%20to%20contact%20Transportes%2041%20support.'"
            target="_blank" rel="noopener">
            {{ language() === 'es' ? 'Escribir ahora' : 'Chat now' }} <span>↗</span>
          </a>
        </div>
      </div>

      <!-- Formulario Unificado -->
      <div class="contact-form-column">
        <form class="contact-form unified-contact-form" (ngSubmit)="enviarContacto()">
          <div class="form-intro">
            <h3>{{ language() === 'es' ? 'Formulario de Atención y Consulta' : 'Inquiry & Support Form' }}</h3>
            <p>{{ language() === 'es' ? 'Completa tus datos y te responderemos a la brevedad por correo o llamada.' : 'Fill in your details and we will reply promptly via email or phone.' }}</p>
          </div>

          <label>
            {{ language() === 'es' ? 'Motivo de consulta' : 'Reason for inquiry' }}
            <select name="motivo" [(ngModel)]="motivo" required class="contact-select">
              <option value="Consulta sobre Servicio y Horarios">{{ language() === 'es' ? 'Consulta sobre Servicio y Horarios' : 'Service and Schedule Inquiry' }}</option>
              <option value="Reporte de Objetos Perdidos">{{ language() === 'es' ? 'Reporte de Objetos Perdidos en Ruta' : 'Lost Property on Route' }}</option>
              <option value="Alquiler de Buses y Servicios Especiales">{{ language() === 'es' ? 'Alquiler de Buses / Transporte Corporativo' : 'Bus Rental / Corporate Transport' }}</option>
              <option value="Sugerencia o Felicitación">{{ language() === 'es' ? 'Sugerencia o Felicitación' : 'Suggestion or Compliment' }}</option>
              <option value="Consulta General">{{ language() === 'es' ? 'Otra consulta general' : 'Other General Inquiry' }}</option>
            </select>
          </label>

          <label>
            {{ language() === 'es' ? 'Nombre completo' : 'Full name' }}
            <input type="text" name="nombre" [(ngModel)]="nombre" required placeholder="{{ language() === 'es' ? 'Escribe tu nombre completo' : 'Enter your full name' }}" />
          </label>

          <div class="form-row">
            <label>
              {{ language() === 'es' ? 'Correo electrónico' : 'Email address' }}
              <input type="email" name="email" [(ngModel)]="email" required placeholder="tu@correo.com" />
            </label>
            <label>
              {{ language() === 'es' ? 'Teléfono / WhatsApp' : 'Phone / WhatsApp' }}
              <input type="tel" name="telefono" [(ngModel)]="telefono" required placeholder="{{ language() === 'es' ? 'Ej. 987654321' : 'E.g. 987654321' }}" />
            </label>
          </div>

          <label>
            {{ language() === 'es' ? 'Asunto' : 'Subject' }}
            <input type="text" name="asunto" [(ngModel)]="asunto" required placeholder="{{ language() === 'es' ? 'Motivo específico de tu mensaje' : 'Specific subject of your message' }}" />
          </label>

          <label>
            {{ language() === 'es' ? 'Mensaje detallado' : 'Detailed message' }}
            <textarea name="mensaje" [(ngModel)]="mensaje" rows="4" required placeholder="{{ language() === 'es' ? 'Cuéntanos en detalle en qué podemos ayudarte...' : 'Tell us how we can help you in detail...' }}"></textarea>
          </label>

          <button class="button button-primary" type="submit" [disabled]="isSendingContact">
            {{ isSendingContact ? (language() === 'es' ? 'Enviando...' : 'Sending...') : (language() === 'es' ? 'Enviar mensaje' : 'Send message') }} <span>↗</span>
          </button>
        </form>
      </div>
    </div>
  </section>
` })
export class ContactPage {
  protected readonly language = inject(LanguageService).language;
  private readonly emailJsServiceCD = 'service_ge1gxt8';
  private readonly templateContactoID = 'template_yp6vfyl';
  private readonly emailJsPublicKeyCD = 'LstO0DA7TXhuH1Va6';

  motivo = 'Consulta sobre Servicio y Horarios';
  nombre = '';
  email = '';
  telefono = '';
  asunto = '';
  mensaje = '';
  isSendingContact = false;

  seleccionarMotivo(motivo: string): void {
    this.motivo = motivo;
    const formEl = document.getElementById('formulario-contacto');
    if (formEl) {
      formEl.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }

  enviarContacto(): void {
    if (this.isSendingContact) return;

    if (!this.nombre.trim() || !this.email.trim() || !this.mensaje.trim()) {
      window.alert(this.language() === 'es'
        ? 'Por favor, completa los campos requeridos (nombre, correo y mensaje).'
        : 'Please complete all required fields (name, email, and message).');
      return;
    }

    this.isSendingContact = true;
    const asuntoFinal = this.motivo ? `[${this.motivo}] ${this.asunto}` : this.asunto;
    const datosContacto = {
      nombre: this.nombre,
      email: this.email,
      telefono: this.telefono,
      asunto: asuntoFinal,
      mensaje: this.mensaje,
    };

    emailjs.send(this.emailJsServiceCD, this.templateContactoID, datosContacto, this.emailJsPublicKeyCD)
      .then(() => {
        window.alert(this.language() === 'es'
          ? 'Su mensaje ha sido enviado con éxito. Nos comunicaremos con usted a la brevedad.'
          : 'Your message has been sent successfully. We will get back to you shortly.');
        this.limpiarFormularioContacto();
      })
      .catch(() => {
        window.alert(this.language() === 'es'
          ? 'Hubo un error al enviar el mensaje. Intente de nuevo o comuníquese por WhatsApp.'
          : 'There was an error sending your message. Please try again or contact us via WhatsApp.');
      })
      .finally(() => {
        this.isSendingContact = false;
      });
  }

  private limpiarFormularioContacto(): void {
    this.motivo = 'Consulta sobre Servicio y Horarios';
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