import { AfterViewInit, Component, OnDestroy, signal, ViewEncapsulation } from '@angular/core';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';

@Component({
  imports: [RouterLink, RouterLinkActive, RouterOutlet],
  encapsulation: ViewEncapsulation.None,
  selector: 'app-root',
  styleUrl: './app.css',
  templateUrl: './app.html',
})
export class App implements AfterViewInit, OnDestroy {
  protected readonly menuOpen = signal(false);
  private revealObserver?: IntersectionObserver;
  private contentObserver?: MutationObserver;

  ngAfterViewInit(): void {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      return;
    }

    this.revealObserver = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add('is-visible');
        this.revealObserver?.unobserve(entry.target);
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -8% 0px' });

    const main = document.querySelector('main');
    if (!main) return;

    this.observeRevealElements();
    this.contentObserver = new MutationObserver(() => this.observeRevealElements());
    this.contentObserver.observe(main, { childList: true, subtree: true });
  }

  ngOnDestroy(): void {
    this.revealObserver?.disconnect();
    this.contentObserver?.disconnect();
  }

  private observeRevealElements(): void {
    const revealElements = document.querySelectorAll<HTMLElement>(
      'main h2, main h3, main .eyebrow, main p, main .text-link, main .card-number, main .fleet-list div, main .help-grid article, main .process-grid > div',
    );

    revealElements.forEach((element, index) => {
      if (element.classList.contains('reveal-on-scroll')) return;
      element.classList.add('reveal-on-scroll');
      element.style.setProperty('--reveal-delay', `${Math.min(index % 5, 4) * 55}ms`);
      this.revealObserver?.observe(element);
    });
  }

  protected toggleMenu(): void {
    this.menuOpen.update((isOpen) => !isOpen);
  }

  protected closeMenu(): void {
    this.menuOpen.set(false);
  }
}
