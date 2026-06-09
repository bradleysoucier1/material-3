import './styles.css';

const materialWebUrl = 'https://cdn.jsdelivr.net/npm/@material/web@2.3.0/all.js/+esm';


function defineFallbackMaterialElements() {
  const componentNames = [
    'md-filled-button', 'md-filled-tonal-button', 'md-outlined-button', 'md-text-button',
    'md-elevated-button', 'md-filled-text-field', 'md-outlined-text-field', 'md-outlined-select',
    'md-select-option', 'md-checkbox', 'md-switch', 'md-radio', 'md-slider', 'md-filter-chip',
    'md-linear-progress', 'md-circular-progress', 'md-icon', 'md-dialog',
  ];

  const createFallbackElement = () => class extends HTMLElement {
    connectedCallback() {
      if (this.shadowRoot) return;

      const root = this.attachShadow({mode: 'open'});
      root.innerHTML = `
        <style>
          :host { display: inline-flex; vertical-align: middle; font: inherit; }
          .fallback {
            display: inline-flex; align-items: center; justify-content: center; gap: .5rem;
            min-height: 40px; border-radius: 999px; padding: 0 1rem; border: 1px solid var(--md-sys-color-outline, #79747e);
            color: var(--md-sys-color-primary, #6750a4); background: transparent; font: inherit; font-weight: 500; text-decoration: none;
          }
          :host([disabled]) .fallback { opacity: .4; pointer-events: none; }
          :host(md-filled-button) .fallback, :host(md-elevated-button) .fallback { color: var(--md-sys-color-on-primary, #fff); background: var(--md-sys-color-primary, #6750a4); border-color: transparent; }
          :host(md-filled-tonal-button) .fallback { color: var(--md-sys-color-on-secondary-container, #1d192b); background: var(--md-sys-color-secondary-container, #e8def8); border-color: transparent; }
          :host(md-text-button) .fallback { border-color: transparent; padding-inline: .75rem; }
          input, select { width: 100%; min-height: 56px; border: 1px solid var(--md-sys-color-outline, #79747e); border-radius: 12px; padding: 0 1rem; background: var(--md-sys-color-surface, #fffbfe); font: inherit; }
          progress { width: 100%; accent-color: var(--md-sys-color-primary, #6750a4); }
          dialog { max-width: 420px; border: 0; border-radius: 28px; padding: 24px; color: var(--md-sys-color-on-surface, #1c1b1f); background: var(--md-sys-color-surface, #fffbfe); box-shadow: 0 24px 80px rgba(0,0,0,.3); }
        </style>
        ${this.template()}
      `;
    }

    template() {
      const name = this.localName;
      if (name.includes('text-field')) return `<input aria-label="${this.getAttribute('label') || 'Text field'}" placeholder="${this.getAttribute('label') || ''}" value="${this.getAttribute('value') || ''}">`;
      if (name.includes('select')) return '<select><slot></slot></select>';
      if (name.includes('option')) return `<option value="${this.getAttribute('value') || ''}"><slot></slot></option>`;
      if (name === 'md-checkbox') return `<input type="checkbox" ${this.hasAttribute('checked') ? 'checked' : ''}>`;
      if (name === 'md-switch') return `<input type="checkbox" role="switch" ${this.hasAttribute('selected') ? 'checked' : ''}>`;
      if (name === 'md-radio') return `<input type="radio" name="${this.getAttribute('name') || ''}" ${this.hasAttribute('checked') ? 'checked' : ''}>`;
      if (name === 'md-slider') return `<input type="range" value="${this.getAttribute('value') || 50}">`;
      if (name === 'md-linear-progress') return `<progress max="1" value="${this.getAttribute('value') || 0}"></progress>`;
      if (name === 'md-circular-progress') return '<progress></progress>';
      if (name === 'md-dialog') return '<dialog><slot></slot></dialog>';
      if (name === 'md-icon') return '<slot></slot>';
      const href = this.getAttribute('href');
      const tag = href ? 'a' : 'button';
      const target = this.getAttribute('target') ? ` target="${this.getAttribute('target')}"` : '';
      const rel = this.getAttribute('rel') ? ` rel="${this.getAttribute('rel')}"` : '';
      return `<${tag} class="fallback" ${href ? `href="${href}"${target}${rel}` : ''}><slot></slot></${tag}>`;
    }

    show() {
      this.shadowRoot?.querySelector('dialog')?.showModal();
    }
  };

  for (const name of componentNames) {
    if (!customElements.get(name)) customElements.define(name, createFallbackElement());
  }
}

const seedOptions = [
  {name: 'Baseline purple', value: '#6750a4'},
  {name: 'Verdant green', value: '#386a20'},
  {name: 'Ocean blue', value: '#006a6a'},
  {name: 'Sunset orange', value: '#984711'},
];

const componentGroups = [
  {
    title: 'Buttons',
    description: 'Compare emphasis levels, icons, and disabled states.',
    content: `
      <div class="component-row">
        <md-filled-button><md-icon slot="icon">rocket_launch</md-icon>Launch</md-filled-button>
        <md-filled-tonal-button>Save draft</md-filled-tonal-button>
        <md-outlined-button>Review</md-outlined-button>
        <md-text-button>Learn more</md-text-button>
        <md-elevated-button disabled>Disabled</md-elevated-button>
      </div>
    `,
  },
  {
    title: 'Inputs',
    description: 'Filled and outlined text fields plus a searchable select menu.',
    content: `
      <div class="form-grid">
        <md-filled-text-field label="Project name" value="Material Lab"></md-filled-text-field>
        <md-outlined-text-field label="Owner" supporting-text="Try focus, hover, and error states"></md-outlined-text-field>
        <md-outlined-select label="Density">
          <md-select-option selected value="comfortable"><div slot="headline">Comfortable</div></md-select-option>
          <md-select-option value="compact"><div slot="headline">Compact</div></md-select-option>
          <md-select-option value="spacious"><div slot="headline">Spacious</div></md-select-option>
        </md-outlined-select>
      </div>
    `,
  },
  {
    title: 'Selection controls',
    description: 'Exercise checkboxes, switches, radios, sliders, and chips.',
    content: `
      <div class="selection-grid">
        <label class="control-line"><md-checkbox checked></md-checkbox><span>Enable dynamic color</span></label>
        <label class="control-line"><md-switch selected></md-switch><span>High contrast preview</span></label>
        <fieldset class="radio-card">
          <legend>Mode</legend>
          <label><md-radio name="mode" value="light" checked></md-radio> Light</label>
          <label><md-radio name="mode" value="dark"></md-radio> Dark</label>
        </fieldset>
        <label class="slider-block">
          <span>Corner radius</span>
          <md-slider value="72" ticks labeled></md-slider>
        </label>
        <div class="chip-set" aria-label="Filter chips">
          <md-filter-chip label="Buttons" selected></md-filter-chip>
          <md-filter-chip label="Forms"></md-filter-chip>
          <md-filter-chip label="Navigation"></md-filter-chip>
        </div>
      </div>
    `,
  },
  {
    title: 'Feedback',
    description: 'Progress indicators and dialogs for asynchronous flows.',
    content: `
      <div class="feedback-stack">
        <md-linear-progress value="0.68"></md-linear-progress>
        <div class="component-row">
          <md-circular-progress indeterminate></md-circular-progress>
          <md-filled-button id="open-dialog"><md-icon slot="icon">forum</md-icon>Open dialog</md-filled-button>
        </div>
      </div>
      <md-dialog id="demo-dialog">
        <div slot="headline">Material 3 dialog</div>
        <form slot="content" id="dialog-form" method="dialog">
          This modal verifies focus handling, elevation, typography, and action placement.
        </form>
        <div slot="actions">
          <md-text-button form="dialog-form" value="cancel">Cancel</md-text-button>
          <md-filled-button form="dialog-form" value="ok">Looks good</md-filled-button>
        </div>
      </md-dialog>
    `,
  },
];

function render() {
  const app = document.querySelector('#app');

  app.innerHTML = `
    <header class="hero surface-card">
      <nav class="top-bar" aria-label="Primary navigation">
        <a class="brand" href="#">
          <span class="brand-mark material-symbols-outlined" aria-hidden="true">design_services</span>
          <span>Material 3 Test Lab</span>
        </a>
        <div class="nav-actions">
          <md-text-button href="#components">Components</md-text-button>
          <md-text-button href="#tokens">Tokens</md-text-button>
          <md-filled-tonal-button href="https://m3.material.io/develop/web" target="_blank" rel="noreferrer">
            <md-icon slot="icon">open_in_new</md-icon>
            M3 Web docs
          </md-filled-tonal-button>
        </div>
      </nav>

      <section class="hero-grid">
        <div class="hero-copy">
          <p class="eyebrow">Material Web component playground</p>
          <h1 class="md-typescale-display-large">Test Material 3 on the web</h1>
          <p class="md-typescale-body-large">
            A focused sandbox for validating Material 3 tokens, controls, layout rhythm,
            elevation, shapes, and component states with the official Material Web custom elements.
          </p>
          <div class="hero-actions">
            <md-filled-button href="#components"><md-icon slot="icon">science</md-icon>Start testing</md-filled-button>
            <md-outlined-button href="#tokens">Tune tokens</md-outlined-button>
          </div>
        </div>
        <aside class="preview-panel" aria-label="Live Material 3 preview">
          <div class="phone-shell">
            <div class="phone-top"></div>
            <div class="mini-card primary-card">
              <span class="material-symbols-outlined">palette</span>
              <strong>Dynamic surface</strong>
              <small>Primary container</small>
            </div>
            <div class="mini-list">
              <span></span><span></span><span></span>
            </div>
            <md-filled-button class="wide-button">Apply theme</md-filled-button>
          </div>
        </aside>
      </section>
    </header>

    <main>
      <section id="tokens" class="section-grid">
        <div>
          <p class="eyebrow">Design tokens</p>
          <h2 class="md-typescale-headline-large">Theme controls</h2>
          <p class="muted">Swap seed colors and density notes while the page keeps Material 3 roles and surfaces visible.</p>
        </div>
        <div class="token-panel surface-card">
          <label for="seed-color" class="field-label">Seed color</label>
          <md-outlined-select id="seed-color" label="Seed color">
            ${seedOptions.map((option, index) => `
              <md-select-option ${index === 0 ? 'selected' : ''} value="${option.value}">
                <div slot="headline">${option.name}</div>
              </md-select-option>
            `).join('')}
          </md-outlined-select>
          <div class="swatches" aria-label="Color roles">
            <span class="swatch primary">Primary</span>
            <span class="swatch secondary">Secondary</span>
            <span class="swatch tertiary">Tertiary</span>
            <span class="swatch error">Error</span>
          </div>
        </div>
      </section>

      <section id="components" class="components-section">
        <div class="section-heading">
          <p class="eyebrow">Component matrix</p>
          <h2 class="md-typescale-headline-large">Interactive Material 3 components</h2>
        </div>
        <div class="component-grid">
          ${componentGroups.map((group) => `
            <article class="component-card surface-card">
              <h3 class="md-typescale-title-large">${group.title}</h3>
              <p class="muted">${group.description}</p>
              ${group.content}
            </article>
          `).join('')}
        </div>
      </section>
    </main>
  `;

  document.querySelector('#open-dialog')?.addEventListener('click', () => {
    document.querySelector('#demo-dialog')?.show();
  });

  document.querySelector('#seed-color')?.addEventListener('change', (event) => {
    document.documentElement.style.setProperty('--seed-color', event.target.value);
  });
}

await import(materialWebUrl).catch(() => defineFallbackMaterialElements());
render();
