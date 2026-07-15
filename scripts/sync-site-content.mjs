import {
  cpSync,
  mkdirSync,
  readFileSync,
  rmSync,
  writeFileSync,
} from 'node:fs';
import { dirname, join, relative, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const contentRoot = join(root, 'src', 'content', 'docs');
const publicBrand = join(root, 'public', 'assets', 'brand');
const siteBase = process.env.SITE_BASE || '/bridge-design-methodology';
const basePrefix = siteBase === '/' ? '' : siteBase.replace(/\/$/u, '');

const entries = [
  ['start/designer-quick-start', 'docs/00-designer-quick-start.md', 'docs/ru/00-bystryj-start-dlya-dizajnera.md'],
  ['guides/design-rules', 'docs/01-design-rules.md', 'docs/ru/01-pravila-dizajna.md'],
  ['guides/layer-naming-and-identity', 'docs/02-layer-naming-and-identity.md', 'docs/ru/02-imena-sloev-i-identichnost.md'],
  ['guides/responsive-breakpoints', 'docs/03-responsive-breakpoints.md', 'docs/ru/03-adaptivy-i-breakpointy.md'],
  ['reference/transfer-contract', 'docs/04-transfer-contract.md', 'docs/ru/04-kontrakt-perenosa.md'],
  ['guides/interactions-and-targets', 'docs/05-interactions-and-targets.md', 'docs/ru/05-interaktivnost-i-celi.md'],
  ['guides/wrapper-policy', 'docs/06-wrapper-policy.md', 'docs/ru/06-politika-obertok.md'],
  ['guides/height-and-overflow', 'docs/07-height-and-overflow.md', 'docs/ru/07-vysoty-i-overflow.md'],
  ['check/full-review', 'docs/08-preflight-checklist.md', 'docs/ru/08-preflight-checklist.md'],
  ['quality/common-designer-mistakes', 'docs/09-common-designer-mistakes.md', 'docs/ru/09-tipichnye-oshibki-dizajnerov.md'],
  ['quality/hard-cases-and-edge-cases', 'docs/10-hard-cases-and-edge-cases.md', 'docs/ru/10-slozhnye-kejsy-i-edge-cases.md'],
  ['reference/validation-and-autochecks', 'docs/11-validation-and-autochecks.md', 'docs/ru/11-validaciya-i-avtoproverki.md'],
  ['project/roadmap', 'docs/12-project-roadmap.md', 'docs/ru/12-roadmap-proekta.md'],
  ['reference/tag-grammar', 'docs/13-tag-grammar.md', 'docs/ru/13-grammatika-tegov.md'],
  ['guides/components-and-ui-kit', 'docs/14-components-and-ui-kit.md', 'docs/ru/14-komponenty-i-ui-kit.md'],
  ['guides/page-routing-and-views', 'docs/15-page-routing-and-views.md', 'docs/ru/15-marshruty-stranic-i-sostoyaniya.md'],
  ['reference/variation-axes', 'docs/16-variation-axes.md', 'docs/ru/16-osi-variativnosti.md'],
  ['check/designer-checklist', 'docs/17-designer-checklist.md', 'docs/ru/17-cheklist-dlya-dizaynerov.md'],
  ['reference/terminology', 'docs/18-terminology.md', 'docs/ru/18-terminologiya.md'],
  ['project/brand-system', 'docs/brand-system.md', 'docs/ru/brend-sistema.md'],
  ['examples', 'examples/README.md', 'examples/README.ru.md'],
].map(([route, en, ru], order) => ({ route, en, ru, order: order + 1 }));

const descriptions = {
  ru: {
    examples: 'Короткие решения BRIDGE в формате «неудачно → правильно».',
    'check/designer-checklist': 'Короткий чеклист перед передачей макета.',
    'check/full-review': 'Строгая проверка макета и основа для автоматического валидатора.',
    'reference/terminology': 'Единый язык русской документации BRIDGE.',
  },
  en: {
    examples: 'Short BRIDGE recipes in a problem-to-solution format.',
    'check/designer-checklist': 'A concise checklist to use before design handoff.',
    'check/full-review': 'A strict preflight review and foundation for automated validation.',
    'reference/terminology': 'Canonical BRIDGE terminology and precise definitions.',
  },
};

const sourceMap = new Map();
for (const entry of entries) {
  sourceMap.set(resolve(root, entry.en), { locale: 'en', route: entry.route });
  sourceMap.set(resolve(root, entry.ru), { locale: 'ru', route: entry.route });
}

for (const locale of ['en', 'ru']) {
  for (const directory of ['start', 'guides', 'quality', 'reference', 'project']) {
    rmSync(join(contentRoot, locale, directory), { recursive: true, force: true });
  }
  for (const file of [
    join(contentRoot, locale, 'examples.md'),
    join(contentRoot, locale, 'check', 'full-review.md'),
    join(contentRoot, locale, 'check', 'designer-checklist.md'),
  ]) {
    rmSync(file, { force: true });
  }
}

function pageUrl(locale, route, anchor = '') {
  const normalizedRoute = route ? `${route.replace(/^\//u, '').replace(/\/$/u, '')}/` : '';
  return `${basePrefix}/${locale}/${normalizedRoute}${anchor}`;
}

function rewriteLinks(markdown, sourceFile, locale) {
  let rewritten = markdown.replace(
    /(!?\[[^\]]*\])\(([^)]+)\)/gu,
    (match, label, destination) => {
      if (
        destination.startsWith('#') ||
        destination.startsWith('http://') ||
        destination.startsWith('https://') ||
        destination.startsWith('mailto:') ||
        destination.startsWith('tel:')
      ) {
        return match;
      }

      const [pathPart, anchorPart] = destination.split('#', 2);
      const resolvedTarget = resolve(dirname(sourceFile), pathPart);
      const mapped = sourceMap.get(resolvedTarget);

      if (mapped) {
        const anchor = anchorPart ? `#${anchorPart}` : '';
        return `${label}(${pageUrl(locale, mapped.route, anchor)})`;
      }

      if (resolvedTarget === resolve(root, 'validator', 'rules.json')) {
        return `${label}(${pageUrl(locale, 'rules')})`;
      }

      return match;
    },
  );

  const brandBase = `${basePrefix}/assets/brand/`;
  rewritten = rewritten.replace(/(?:\.\.\/){1,2}assets\/brand\//gu, brandBase);
  rewritten = rewritten.replace(
    `](${brandBase})`,
    '](https://github.com/Poliklot/bridge-design-methodology/tree/main/assets/brand)',
  );

  return rewritten;
}

function extractTitle(markdown, source) {
  const match = markdown.match(/^#\s+(.+)$/mu);
  if (!match) throw new Error(`No H1 title found in ${relative(root, source)}`);
  return match[1].replaceAll('`', '');
}

function extractDescription(markdown, locale, route) {
  const explicit = descriptions[locale]?.[route];
  if (explicit) return explicit;

  const body = markdown
    .replace(/^#\s+.+$/mu, '')
    .replace(/<picture>[\s\S]*?<\/picture>/u, '')
    .replace(/```[\s\S]*?```/gu, '')
    .replace(/^#{2,}\s+.+$/gmu, '')
    .split('\n')
    .map((line) => line.trim())
    .find((line) => line && !line.startsWith('|') && !line.startsWith('-'));

  return (body || (locale === 'ru' ? 'Документация BRIDGE.' : 'BRIDGE documentation.'))
    .replace(/\[([^\]]+)\]\([^)]+\)/gu, '$1')
    .replace(/[*_`>]/gu, '')
    .slice(0, 220);
}

for (const entry of entries) {
  for (const locale of ['en', 'ru']) {
    const source = resolve(root, entry[locale]);
    const raw = readFileSync(source, 'utf8');
    const title = extractTitle(raw, source);
    const description = extractDescription(raw, locale, entry.route);
    const body = rewriteLinks(raw.replace(/^#\s+.+\n+/u, ''), source, locale);
    const output = join(contentRoot, locale, `${entry.route}.md`);

    mkdirSync(dirname(output), { recursive: true });
    writeFileSync(
      output,
      `---\ntitle: ${JSON.stringify(title)}\ndescription: ${JSON.stringify(description)}\neditUrl: false\nsidebar:\n  order: ${entry.order}\n---\n\n<!-- Generated from ${relative(root, source)}. Do not edit this file directly. -->\n\n${body}`,
    );
  }
}

rmSync(publicBrand, { recursive: true, force: true });
mkdirSync(dirname(publicBrand), { recursive: true });
cpSync(join(root, 'assets', 'brand'), publicBrand, { recursive: true });

console.log(`Prepared ${entries.length * 2} localized documentation pages.`);
