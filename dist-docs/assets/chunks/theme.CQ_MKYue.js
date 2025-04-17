import {
  d as m,
  c as u,
  r as c,
  n as N,
  o as a,
  a as z,
  t as M,
  b as k,
  w as f,
  T as ce,
  e as h,
  _ as b,
  u as Ae,
  i as Be,
  f as Ce,
  g as ue,
  h as $,
  j as v,
  k as r,
  l as W,
  m as ae,
  p as T,
  q as D,
  s as Q,
  v as j,
  x as de,
  y as ve,
  z as Ee,
  A as Fe,
  F as w,
  B,
  C as q,
  D as ge,
  E as X,
  G as _,
  H as E,
  I as $e,
  J as Z,
  K as U,
  L as x,
  M as De,
  N as ye,
  O as Oe,
  P as Pe,
  Q as Le,
  R as ee,
  S as Ge,
  U as Ve,
  V as Se,
  W as Ue,
  X as je,
  Y as ze,
  Z as We,
  $ as qe,
} from './framework.vCSBSCtM.js';
const Ke = m({
    __name: 'VPBadge',
    props: { text: {}, type: { default: 'tip' } },
    setup(s) {
      return (e, t) => (
        a(),
        u(
          'span',
          { class: N(['VPBadge', e.type]) },
          [c(e.$slots, 'default', {}, () => [z(M(e.text), 1)])],
          2
        )
      );
    },
  }),
  Re = { key: 0, class: 'VPBackdrop' },
  Je = m({
    __name: 'VPBackdrop',
    props: { show: { type: Boolean } },
    setup(s) {
      return (e, t) => (
        a(),
        k(
          ce,
          { name: 'fade' },
          { default: f(() => [e.show ? (a(), u('div', Re)) : h('', !0)]), _: 1 }
        )
      );
    },
  }),
  Ye = b(Je, [['__scopeId', 'data-v-c79a1216']]),
  P = Ae;
function Qe(s, e) {
  let t,
    o = !1;
  return () => {
    t && clearTimeout(t),
      o
        ? (t = setTimeout(s, e))
        : (s(), (o = !0) && setTimeout(() => (o = !1), e));
  };
}
function re(s) {
  return s.startsWith('/') ? s : `/${s}`;
}
function pe(s) {
  const {
    pathname: e,
    search: t,
    hash: o,
    protocol: n,
  } = new URL(s, 'http://a.com');
  if (Be(s) || s.startsWith('#') || !n.startsWith('http') || !Ce(e)) return s;
  const { site: i } = P(),
    l =
      e.endsWith('/') || e.endsWith('.html')
        ? s
        : s.replace(
            /(?:(^\.+)\/)?.*$/,
            `$1${e.replace(/(\.md)?$/, i.value.cleanUrls ? '' : '.html')}${t}${o}`
          );
  return ue(l);
}
function R({ correspondingLink: s = !1 } = {}) {
  const { site: e, localeIndex: t, page: o, theme: n, hash: i } = P(),
    l = $(() => {
      var d, y;
      return {
        label: (d = e.value.locales[t.value]) == null ? void 0 : d.label,
        link:
          ((y = e.value.locales[t.value]) == null ? void 0 : y.link) ||
          (t.value === 'root' ? '/' : `/${t.value}/`),
      };
    });
  return {
    localeLinks: $(() =>
      Object.entries(e.value.locales).flatMap(([d, y]) =>
        l.value.label === y.label
          ? []
          : {
              text: y.label,
              link:
                Xe(
                  y.link || (d === 'root' ? '/' : `/${d}/`),
                  n.value.i18nRouting !== !1 && s,
                  o.value.relativePath.slice(l.value.link.length - 1),
                  !e.value.cleanUrls
                ) + i.value,
            }
      )
    ),
    currentLang: l,
  };
}
function Xe(s, e, t, o) {
  return e
    ? s.replace(/\/$/, '') +
        re(
          t.replace(/(^|\/)index\.md$/, '$1').replace(/\.md$/, o ? '.html' : '')
        )
    : s;
}
const Ze = { class: 'NotFound' },
  xe = { class: 'code' },
  et = { class: 'title' },
  tt = { class: 'quote' },
  nt = { class: 'action' },
  ot = ['href', 'aria-label'],
  st = m({
    __name: 'NotFound',
    setup(s) {
      const { theme: e } = P(),
        { currentLang: t } = R();
      return (o, n) => {
        var i, l, p, d, y;
        return (
          a(),
          u('div', Ze, [
            v(
              'p',
              xe,
              M(((i = r(e).notFound) == null ? void 0 : i.code) ?? '404'),
              1
            ),
            v(
              'h1',
              et,
              M(
                ((l = r(e).notFound) == null ? void 0 : l.title) ??
                  'PAGE NOT FOUND'
              ),
              1
            ),
            n[0] || (n[0] = v('div', { class: 'divider' }, null, -1)),
            v(
              'blockquote',
              tt,
              M(
                ((p = r(e).notFound) == null ? void 0 : p.quote) ??
                  "But if you don't change your direction, and if you keep looking, you may end up where you are heading."
              ),
              1
            ),
            v('div', nt, [
              v(
                'a',
                {
                  class: 'link',
                  href: r(ue)(r(t).link),
                  'aria-label':
                    ((d = r(e).notFound) == null ? void 0 : d.linkLabel) ??
                    'go to home',
                },
                M(
                  ((y = r(e).notFound) == null ? void 0 : y.linkText) ??
                    'Take me home'
                ),
                9,
                ot
              ),
            ]),
          ])
        );
      };
    },
  }),
  at = b(st, [['__scopeId', 'data-v-d6be1790']]);
function Te(s, e) {
  if (Array.isArray(s)) return J(s);
  if (s == null) return [];
  e = re(e);
  const t = Object.keys(s)
      .sort((n, i) => i.split('/').length - n.split('/').length)
      .find((n) => e.startsWith(re(n))),
    o = t ? s[t] : [];
  return Array.isArray(o) ? J(o) : J(o.items, o.base);
}
function rt(s) {
  const e = [];
  let t = 0;
  for (const o in s) {
    const n = s[o];
    if (n.items) {
      t = e.push(n);
      continue;
    }
    e[t] || e.push({ items: [] }), e[t].items.push(n);
  }
  return e;
}
function it(s) {
  const e = [];
  function t(o) {
    for (const n of o)
      n.text &&
        n.link &&
        e.push({ text: n.text, link: n.link, docFooterText: n.docFooterText }),
        n.items && t(n.items);
  }
  return t(s), e;
}
function ie(s, e) {
  return Array.isArray(e)
    ? e.some((t) => ie(s, t))
    : W(s, e.link)
      ? !0
      : e.items
        ? ie(s, e.items)
        : !1;
}
function J(s, e) {
  return [...s].map((t) => {
    const o = { ...t },
      n = o.base || e;
    return (
      n && o.link && (o.link = n + o.link),
      o.items && (o.items = J(o.items, n)),
      o
    );
  });
}
function O() {
  const { frontmatter: s, page: e, theme: t } = P(),
    o = ae('(min-width: 960px)'),
    n = T(!1),
    i = $(() => {
      const A = t.value.sidebar,
        S = e.value.relativePath;
      return A ? Te(A, S) : [];
    }),
    l = T(i.value);
  D(i, (A, S) => {
    JSON.stringify(A) !== JSON.stringify(S) && (l.value = i.value);
  });
  const p = $(
      () =>
        s.value.sidebar !== !1 &&
        l.value.length > 0 &&
        s.value.layout !== 'home'
    ),
    d = $(() =>
      y
        ? s.value.aside == null
          ? t.value.aside === 'left'
          : s.value.aside === 'left'
        : !1
    ),
    y = $(() =>
      s.value.layout === 'home'
        ? !1
        : s.value.aside != null
          ? !!s.value.aside
          : t.value.aside !== !1
    ),
    L = $(() => p.value && o.value),
    g = $(() => (p.value ? rt(l.value) : []));
  function V() {
    n.value = !0;
  }
  function I() {
    n.value = !1;
  }
  function H() {
    n.value ? I() : V();
  }
  return {
    isOpen: n,
    sidebar: l,
    sidebarGroups: g,
    hasSidebar: p,
    hasAside: y,
    leftAside: d,
    isSidebarEnabled: L,
    open: V,
    close: I,
    toggle: H,
  };
}
function lt(s, e) {
  let t;
  Q(() => {
    t = s.value ? document.activeElement : void 0;
  }),
    j(() => {
      window.addEventListener('keyup', o);
    }),
    de(() => {
      window.removeEventListener('keyup', o);
    });
  function o(n) {
    n.key === 'Escape' && s.value && (e(), t == null || t.focus());
  }
}
function ct(s) {
  const { page: e, hash: t } = P(),
    o = T(!1),
    n = $(() => s.value.collapsed != null),
    i = $(() => !!s.value.link),
    l = T(!1),
    p = () => {
      l.value = W(e.value.relativePath, s.value.link);
    };
  D([e, s, t], p), j(p);
  const d = $(() =>
      l.value
        ? !0
        : s.value.items
          ? ie(e.value.relativePath, s.value.items)
          : !1
    ),
    y = $(() => !!(s.value.items && s.value.items.length));
  Q(() => {
    o.value = !!(n.value && s.value.collapsed);
  }),
    ve(() => {
      (l.value || d.value) && (o.value = !1);
    });
  function L() {
    n.value && (o.value = !o.value);
  }
  return {
    collapsed: o,
    collapsible: n,
    isLink: i,
    isActiveLink: l,
    hasActiveLink: d,
    hasChildren: y,
    toggle: L,
  };
}
function ut() {
  const { hasSidebar: s } = O(),
    e = ae('(min-width: 960px)'),
    t = ae('(min-width: 1280px)');
  return {
    isAsideEnabled: $(() =>
      !t.value && !e.value ? !1 : s.value ? t.value : e.value
    ),
  };
}
const dt = /\b(?:VPBadge|header-anchor|footnote-ref|ignore-header)\b/,
  le = [];
function Ne(s) {
  return (
    (typeof s.outline == 'object' &&
      !Array.isArray(s.outline) &&
      s.outline.label) ||
    s.outlineTitle ||
    'On this page'
  );
}
function fe(s) {
  const e = [...document.querySelectorAll('.VPDoc :where(h1,h2,h3,h4,h5,h6)')]
    .filter((t) => t.id && t.hasChildNodes())
    .map((t) => {
      const o = Number(t.tagName[1]);
      return { element: t, title: vt(t), link: '#' + t.id, level: o };
    });
  return pt(e, s);
}
function vt(s) {
  let e = '';
  for (const t of s.childNodes)
    if (t.nodeType === 1) {
      if (dt.test(t.className)) continue;
      e += t.textContent;
    } else t.nodeType === 3 && (e += t.textContent);
  return e.trim();
}
function pt(s, e) {
  if (e === !1) return [];
  const t = (typeof e == 'object' && !Array.isArray(e) ? e.level : e) || 2,
    [o, n] = typeof t == 'number' ? [t, t] : t === 'deep' ? [2, 6] : t;
  return mt(s, o, n);
}
function ft(s, e) {
  const { isAsideEnabled: t } = ut(),
    o = Qe(i, 100);
  let n = null;
  j(() => {
    requestAnimationFrame(i), window.addEventListener('scroll', o);
  }),
    Ee(() => {
      l(location.hash);
    }),
    de(() => {
      window.removeEventListener('scroll', o);
    });
  function i() {
    if (!t.value) return;
    const p = window.scrollY,
      d = window.innerHeight,
      y = document.body.offsetHeight,
      L = Math.abs(p + d - y) < 1,
      g = le
        .map(({ element: I, link: H }) => ({ link: H, top: ht(I) }))
        .filter(({ top: I }) => !Number.isNaN(I))
        .sort((I, H) => I.top - H.top);
    if (!g.length) {
      l(null);
      return;
    }
    if (p < 1) {
      l(null);
      return;
    }
    if (L) {
      l(g[g.length - 1].link);
      return;
    }
    let V = null;
    for (const { link: I, top: H } of g) {
      if (H > p + Fe() + 4) break;
      V = I;
    }
    l(V);
  }
  function l(p) {
    n && n.classList.remove('active'),
      p == null
        ? (n = null)
        : (n = s.value.querySelector(`a[href="${decodeURIComponent(p)}"]`));
    const d = n;
    d
      ? (d.classList.add('active'),
        (e.value.style.top = d.offsetTop + 39 + 'px'),
        (e.value.style.opacity = '1'))
      : ((e.value.style.top = '33px'), (e.value.style.opacity = '0'));
  }
}
function ht(s) {
  let e = 0;
  for (; s !== document.body; ) {
    if (s === null) return NaN;
    (e += s.offsetTop), (s = s.offsetParent);
  }
  return e;
}
function mt(s, e, t) {
  le.length = 0;
  const o = [],
    n = [];
  return (
    s.forEach((i) => {
      const l = { ...i, children: [] };
      let p = n[n.length - 1];
      for (; p && p.level >= l.level; ) n.pop(), (p = n[n.length - 1]);
      if (
        l.element.classList.contains('ignore-header') ||
        (p && 'shouldIgnore' in p)
      ) {
        n.push({ level: l.level, shouldIgnore: !0 });
        return;
      }
      l.level > t ||
        l.level < e ||
        (le.push({ element: l.element, link: l.link }),
        p ? p.children.push(l) : o.push(l),
        n.push(l));
    }),
    o
  );
}
const _t = ['href', 'title'],
  kt = m({
    __name: 'VPDocOutlineItem',
    props: { headers: {}, root: { type: Boolean } },
    setup(s) {
      function e({ target: t }) {
        const o = t.href.split('#')[1],
          n = document.getElementById(decodeURIComponent(o));
        n == null || n.focus({ preventScroll: !0 });
      }
      return (t, o) => {
        const n = q('VPDocOutlineItem', !0);
        return (
          a(),
          u(
            'ul',
            { class: N(['VPDocOutlineItem', t.root ? 'root' : 'nested']) },
            [
              (a(!0),
              u(
                w,
                null,
                B(
                  t.headers,
                  ({ children: i, link: l, title: p }) => (
                    a(),
                    u('li', null, [
                      v(
                        'a',
                        {
                          class: 'outline-link',
                          href: l,
                          onClick: e,
                          title: p,
                        },
                        M(p),
                        9,
                        _t
                      ),
                      i != null && i.length
                        ? (a(),
                          k(n, { key: 0, headers: i }, null, 8, ['headers']))
                        : h('', !0),
                    ])
                  )
                ),
                256
              )),
            ],
            2
          )
        );
      };
    },
  }),
  Me = b(kt, [['__scopeId', 'data-v-b933a997']]),
  bt = { class: 'content' },
  gt = {
    'aria-level': '2',
    class: 'outline-title',
    id: 'doc-outline-aria-label',
    role: 'heading',
  },
  $t = m({
    __name: 'VPDocAsideOutline',
    setup(s) {
      const { frontmatter: e, theme: t } = P(),
        o = ge([]);
      X(() => {
        o.value = fe(e.value.outline ?? t.value.outline);
      });
      const n = T(),
        i = T();
      return (
        ft(n, i),
        (l, p) => (
          a(),
          u(
            'nav',
            {
              'aria-labelledby': 'doc-outline-aria-label',
              class: N([
                'VPDocAsideOutline',
                { 'has-outline': o.value.length > 0 },
              ]),
              ref_key: 'container',
              ref: n,
            },
            [
              v('div', bt, [
                v(
                  'div',
                  { class: 'outline-marker', ref_key: 'marker', ref: i },
                  null,
                  512
                ),
                v('div', gt, M(r(Ne)(r(t))), 1),
                _(Me, { headers: o.value, root: !0 }, null, 8, ['headers']),
              ]),
            ],
            2
          )
        )
      );
    },
  }),
  yt = b($t, [['__scopeId', 'data-v-a5bbad30']]),
  Pt = { class: 'VPDocAsideCarbonAds' },
  Lt = m({
    __name: 'VPDocAsideCarbonAds',
    props: { carbonAds: {} },
    setup(s) {
      const e = () => null;
      return (t, o) => (
        a(),
        u('div', Pt, [
          _(r(e), { 'carbon-ads': t.carbonAds }, null, 8, ['carbon-ads']),
        ])
      );
    },
  }),
  Vt = { class: 'VPDocAside' },
  St = m({
    __name: 'VPDocAside',
    setup(s) {
      const { theme: e } = P();
      return (t, o) => (
        a(),
        u('div', Vt, [
          c(t.$slots, 'aside-top', {}, void 0, !0),
          c(t.$slots, 'aside-outline-before', {}, void 0, !0),
          _(yt),
          c(t.$slots, 'aside-outline-after', {}, void 0, !0),
          o[0] || (o[0] = v('div', { class: 'spacer' }, null, -1)),
          c(t.$slots, 'aside-ads-before', {}, void 0, !0),
          r(e).carbonAds
            ? (a(),
              k(Lt, { key: 0, 'carbon-ads': r(e).carbonAds }, null, 8, [
                'carbon-ads',
              ]))
            : h('', !0),
          c(t.$slots, 'aside-ads-after', {}, void 0, !0),
          c(t.$slots, 'aside-bottom', {}, void 0, !0),
        ])
      );
    },
  }),
  Tt = b(St, [['__scopeId', 'data-v-3f215769']]);
function Nt() {
  const { theme: s, page: e } = P();
  return $(() => {
    const { text: t = 'Edit this page', pattern: o = '' } =
      s.value.editLink || {};
    let n;
    return (
      typeof o == 'function'
        ? (n = o(e.value))
        : (n = o.replace(/:path/g, e.value.filePath)),
      { url: n, text: t }
    );
  });
}
function Mt() {
  const { page: s, theme: e, frontmatter: t } = P();
  return $(() => {
    var y, L, g, V, I, H, A, S;
    const o = Te(e.value.sidebar, s.value.relativePath),
      n = it(o),
      i = It(n, (C) => C.link.replace(/[?#].*$/, '')),
      l = i.findIndex((C) => W(s.value.relativePath, C.link)),
      p =
        (((y = e.value.docFooter) == null ? void 0 : y.prev) === !1 &&
          !t.value.prev) ||
        t.value.prev === !1,
      d =
        (((L = e.value.docFooter) == null ? void 0 : L.next) === !1 &&
          !t.value.next) ||
        t.value.next === !1;
    return {
      prev: p
        ? void 0
        : {
            text:
              (typeof t.value.prev == 'string'
                ? t.value.prev
                : typeof t.value.prev == 'object'
                  ? t.value.prev.text
                  : void 0) ??
              ((g = i[l - 1]) == null ? void 0 : g.docFooterText) ??
              ((V = i[l - 1]) == null ? void 0 : V.text),
            link:
              (typeof t.value.prev == 'object' ? t.value.prev.link : void 0) ??
              ((I = i[l - 1]) == null ? void 0 : I.link),
          },
      next: d
        ? void 0
        : {
            text:
              (typeof t.value.next == 'string'
                ? t.value.next
                : typeof t.value.next == 'object'
                  ? t.value.next.text
                  : void 0) ??
              ((H = i[l + 1]) == null ? void 0 : H.docFooterText) ??
              ((A = i[l + 1]) == null ? void 0 : A.text),
            link:
              (typeof t.value.next == 'object' ? t.value.next.link : void 0) ??
              ((S = i[l + 1]) == null ? void 0 : S.link),
          },
    };
  });
}
function It(s, e) {
  const t = new Set();
  return s.filter((o) => {
    const n = e(o);
    return t.has(n) ? !1 : t.add(n);
  });
}
const F = m({
    __name: 'VPLink',
    props: {
      tag: {},
      href: {},
      noIcon: { type: Boolean },
      target: {},
      rel: {},
    },
    setup(s) {
      const e = s,
        t = $(() => e.tag ?? (e.href ? 'a' : 'span')),
        o = $(() => (e.href && $e.test(e.href)) || e.target === '_blank');
      return (n, i) => (
        a(),
        k(
          E(t.value),
          {
            class: N([
              'VPLink',
              {
                link: n.href,
                'vp-external-link-icon': o.value,
                'no-icon': n.noIcon,
              },
            ]),
            href: n.href ? r(pe)(n.href) : void 0,
            target: n.target ?? (o.value ? '_blank' : void 0),
            rel: n.rel ?? (o.value ? 'noreferrer' : void 0),
          },
          { default: f(() => [c(n.$slots, 'default')]), _: 3 },
          8,
          ['class', 'href', 'target', 'rel']
        )
      );
    },
  }),
  wt = { class: 'VPLastUpdated' },
  Ht = ['datetime'],
  At = m({
    __name: 'VPDocFooterLastUpdated',
    setup(s) {
      const { theme: e, page: t, lang: o } = P(),
        n = $(() => new Date(t.value.lastUpdated)),
        i = $(() => n.value.toISOString()),
        l = T('');
      return (
        j(() => {
          Q(() => {
            var p, d, y;
            l.value = new Intl.DateTimeFormat(
              (d =
                (p = e.value.lastUpdated) == null ? void 0 : p.formatOptions) !=
                null && d.forceLocale
                ? o.value
                : void 0,
              ((y = e.value.lastUpdated) == null
                ? void 0
                : y.formatOptions) ?? { dateStyle: 'short', timeStyle: 'short' }
            ).format(n.value);
          });
        }),
        (p, d) => {
          var y;
          return (
            a(),
            u('p', wt, [
              z(
                M(
                  ((y = r(e).lastUpdated) == null ? void 0 : y.text) ||
                    r(e).lastUpdatedText ||
                    'Last updated'
                ) + ': ',
                1
              ),
              v('time', { datetime: i.value }, M(l.value), 9, Ht),
            ])
          );
        }
      );
    },
  }),
  Bt = b(At, [['__scopeId', 'data-v-e98dd255']]),
  Ct = { key: 0, class: 'VPDocFooter' },
  Et = { key: 0, class: 'edit-info' },
  Ft = { key: 0, class: 'edit-link' },
  Dt = { key: 1, class: 'last-updated' },
  Ot = {
    key: 1,
    class: 'prev-next',
    'aria-labelledby': 'doc-footer-aria-label',
  },
  Gt = { class: 'pager' },
  Ut = ['innerHTML'],
  jt = ['innerHTML'],
  zt = { class: 'pager' },
  Wt = ['innerHTML'],
  qt = ['innerHTML'],
  Kt = m({
    __name: 'VPDocFooter',
    setup(s) {
      const { theme: e, page: t, frontmatter: o } = P(),
        n = Nt(),
        i = Mt(),
        l = $(() => e.value.editLink && o.value.editLink !== !1),
        p = $(() => t.value.lastUpdated),
        d = $(() => l.value || p.value || i.value.prev || i.value.next);
      return (y, L) => {
        var g, V, I, H;
        return d.value
          ? (a(),
            u('footer', Ct, [
              c(y.$slots, 'doc-footer-before', {}, void 0, !0),
              l.value || p.value
                ? (a(),
                  u('div', Et, [
                    l.value
                      ? (a(),
                        u('div', Ft, [
                          _(
                            F,
                            {
                              class: 'edit-link-button',
                              href: r(n).url,
                              'no-icon': !0,
                            },
                            {
                              default: f(() => [
                                L[0] ||
                                  (L[0] = v(
                                    'span',
                                    { class: 'vpi-square-pen edit-link-icon' },
                                    null,
                                    -1
                                  )),
                                z(' ' + M(r(n).text), 1),
                              ]),
                              _: 1,
                            },
                            8,
                            ['href']
                          ),
                        ]))
                      : h('', !0),
                    p.value ? (a(), u('div', Dt, [_(Bt)])) : h('', !0),
                  ]))
                : h('', !0),
              ((g = r(i).prev) != null && g.link) ||
              ((V = r(i).next) != null && V.link)
                ? (a(),
                  u('nav', Ot, [
                    L[1] ||
                      (L[1] = v(
                        'span',
                        {
                          class: 'visually-hidden',
                          id: 'doc-footer-aria-label',
                        },
                        'Pager',
                        -1
                      )),
                    v('div', Gt, [
                      (I = r(i).prev) != null && I.link
                        ? (a(),
                          k(
                            F,
                            {
                              key: 0,
                              class: 'pager-link prev',
                              href: r(i).prev.link,
                            },
                            {
                              default: f(() => {
                                var A;
                                return [
                                  v(
                                    'span',
                                    {
                                      class: 'desc',
                                      innerHTML:
                                        ((A = r(e).docFooter) == null
                                          ? void 0
                                          : A.prev) || 'Previous page',
                                    },
                                    null,
                                    8,
                                    Ut
                                  ),
                                  v(
                                    'span',
                                    {
                                      class: 'title',
                                      innerHTML: r(i).prev.text,
                                    },
                                    null,
                                    8,
                                    jt
                                  ),
                                ];
                              }),
                              _: 1,
                            },
                            8,
                            ['href']
                          ))
                        : h('', !0),
                    ]),
                    v('div', zt, [
                      (H = r(i).next) != null && H.link
                        ? (a(),
                          k(
                            F,
                            {
                              key: 0,
                              class: 'pager-link next',
                              href: r(i).next.link,
                            },
                            {
                              default: f(() => {
                                var A;
                                return [
                                  v(
                                    'span',
                                    {
                                      class: 'desc',
                                      innerHTML:
                                        ((A = r(e).docFooter) == null
                                          ? void 0
                                          : A.next) || 'Next page',
                                    },
                                    null,
                                    8,
                                    Wt
                                  ),
                                  v(
                                    'span',
                                    {
                                      class: 'title',
                                      innerHTML: r(i).next.text,
                                    },
                                    null,
                                    8,
                                    qt
                                  ),
                                ];
                              }),
                              _: 1,
                            },
                            8,
                            ['href']
                          ))
                        : h('', !0),
                    ]),
                  ]))
                : h('', !0),
            ]))
          : h('', !0);
      };
    },
  }),
  Rt = b(Kt, [['__scopeId', 'data-v-e257564d']]),
  Jt = { class: 'container' },
  Yt = { class: 'aside-container' },
  Qt = { class: 'aside-content' },
  Xt = { class: 'content' },
  Zt = { class: 'content-container' },
  xt = { class: 'main' },
  en = m({
    __name: 'VPDoc',
    setup(s) {
      const { theme: e } = P(),
        t = Z(),
        { hasSidebar: o, hasAside: n, leftAside: i } = O(),
        l = $(() => t.path.replace(/[./]+/g, '_').replace(/_html$/, ''));
      return (p, d) => {
        const y = q('Content');
        return (
          a(),
          u(
            'div',
            { class: N(['VPDoc', { 'has-sidebar': r(o), 'has-aside': r(n) }]) },
            [
              c(p.$slots, 'doc-top', {}, void 0, !0),
              v('div', Jt, [
                r(n)
                  ? (a(),
                    u(
                      'div',
                      { key: 0, class: N(['aside', { 'left-aside': r(i) }]) },
                      [
                        d[0] ||
                          (d[0] = v(
                            'div',
                            { class: 'aside-curtain' },
                            null,
                            -1
                          )),
                        v('div', Yt, [
                          v('div', Qt, [
                            _(Tt, null, {
                              'aside-top': f(() => [
                                c(p.$slots, 'aside-top', {}, void 0, !0),
                              ]),
                              'aside-bottom': f(() => [
                                c(p.$slots, 'aside-bottom', {}, void 0, !0),
                              ]),
                              'aside-outline-before': f(() => [
                                c(
                                  p.$slots,
                                  'aside-outline-before',
                                  {},
                                  void 0,
                                  !0
                                ),
                              ]),
                              'aside-outline-after': f(() => [
                                c(
                                  p.$slots,
                                  'aside-outline-after',
                                  {},
                                  void 0,
                                  !0
                                ),
                              ]),
                              'aside-ads-before': f(() => [
                                c(p.$slots, 'aside-ads-before', {}, void 0, !0),
                              ]),
                              'aside-ads-after': f(() => [
                                c(p.$slots, 'aside-ads-after', {}, void 0, !0),
                              ]),
                              _: 3,
                            }),
                          ]),
                        ]),
                      ],
                      2
                    ))
                  : h('', !0),
                v('div', Xt, [
                  v('div', Zt, [
                    c(p.$slots, 'doc-before', {}, void 0, !0),
                    v('main', xt, [
                      _(
                        y,
                        {
                          class: N([
                            'vp-doc',
                            [
                              l.value,
                              r(e).externalLinkIcon &&
                                'external-link-icon-enabled',
                            ],
                          ]),
                        },
                        null,
                        8,
                        ['class']
                      ),
                    ]),
                    _(Rt, null, {
                      'doc-footer-before': f(() => [
                        c(p.$slots, 'doc-footer-before', {}, void 0, !0),
                      ]),
                      _: 3,
                    }),
                    c(p.$slots, 'doc-after', {}, void 0, !0),
                  ]),
                ]),
              ]),
              c(p.$slots, 'doc-bottom', {}, void 0, !0),
            ],
            2
          )
        );
      };
    },
  }),
  tn = b(en, [['__scopeId', 'data-v-39a288b8']]),
  nn = m({
    __name: 'VPButton',
    props: {
      tag: {},
      size: { default: 'medium' },
      theme: { default: 'brand' },
      text: {},
      href: {},
      target: {},
      rel: {},
    },
    setup(s) {
      const e = s,
        t = $(() => e.href && $e.test(e.href)),
        o = $(() => e.tag || (e.href ? 'a' : 'button'));
      return (n, i) => (
        a(),
        k(
          E(o.value),
          {
            class: N(['VPButton', [n.size, n.theme]]),
            href: n.href ? r(pe)(n.href) : void 0,
            target: e.target ?? (t.value ? '_blank' : void 0),
            rel: e.rel ?? (t.value ? 'noreferrer' : void 0),
          },
          { default: f(() => [z(M(n.text), 1)]), _: 1 },
          8,
          ['class', 'href', 'target', 'rel']
        )
      );
    },
  }),
  on = b(nn, [['__scopeId', 'data-v-fa7799d5']]),
  sn = ['src', 'alt'],
  an = m({
    inheritAttrs: !1,
    __name: 'VPImage',
    props: { image: {}, alt: {} },
    setup(s) {
      return (e, t) => {
        const o = q('VPImage', !0);
        return e.image
          ? (a(),
            u(
              w,
              { key: 0 },
              [
                typeof e.image == 'string' || 'src' in e.image
                  ? (a(),
                    u(
                      'img',
                      U(
                        { key: 0, class: 'VPImage' },
                        typeof e.image == 'string'
                          ? e.$attrs
                          : { ...e.image, ...e.$attrs },
                        {
                          src: r(ue)(
                            typeof e.image == 'string' ? e.image : e.image.src
                          ),
                          alt:
                            e.alt ??
                            (typeof e.image == 'string'
                              ? ''
                              : e.image.alt || ''),
                        }
                      ),
                      null,
                      16,
                      sn
                    ))
                  : (a(),
                    u(
                      w,
                      { key: 1 },
                      [
                        _(
                          o,
                          U(
                            {
                              class: 'dark',
                              image: e.image.dark,
                              alt: e.image.alt,
                            },
                            e.$attrs
                          ),
                          null,
                          16,
                          ['image', 'alt']
                        ),
                        _(
                          o,
                          U(
                            {
                              class: 'light',
                              image: e.image.light,
                              alt: e.image.alt,
                            },
                            e.$attrs
                          ),
                          null,
                          16,
                          ['image', 'alt']
                        ),
                      ],
                      64
                    )),
              ],
              64
            ))
          : h('', !0);
      };
    },
  }),
  Y = b(an, [['__scopeId', 'data-v-8426fc1a']]),
  rn = { class: 'container' },
  ln = { class: 'main' },
  cn = { class: 'heading' },
  un = ['innerHTML'],
  dn = ['innerHTML'],
  vn = ['innerHTML'],
  pn = { key: 0, class: 'actions' },
  fn = { key: 0, class: 'image' },
  hn = { class: 'image-container' },
  mn = m({
    __name: 'VPHero',
    props: { name: {}, text: {}, tagline: {}, image: {}, actions: {} },
    setup(s) {
      const e = x('hero-image-slot-exists');
      return (t, o) => (
        a(),
        u(
          'div',
          { class: N(['VPHero', { 'has-image': t.image || r(e) }]) },
          [
            v('div', rn, [
              v('div', ln, [
                c(t.$slots, 'home-hero-info-before', {}, void 0, !0),
                c(
                  t.$slots,
                  'home-hero-info',
                  {},
                  () => [
                    v('h1', cn, [
                      t.name
                        ? (a(),
                          u(
                            'span',
                            { key: 0, innerHTML: t.name, class: 'name clip' },
                            null,
                            8,
                            un
                          ))
                        : h('', !0),
                      t.text
                        ? (a(),
                          u(
                            'span',
                            { key: 1, innerHTML: t.text, class: 'text' },
                            null,
                            8,
                            dn
                          ))
                        : h('', !0),
                    ]),
                    t.tagline
                      ? (a(),
                        u(
                          'p',
                          { key: 0, innerHTML: t.tagline, class: 'tagline' },
                          null,
                          8,
                          vn
                        ))
                      : h('', !0),
                  ],
                  !0
                ),
                c(t.$slots, 'home-hero-info-after', {}, void 0, !0),
                t.actions
                  ? (a(),
                    u('div', pn, [
                      (a(!0),
                      u(
                        w,
                        null,
                        B(
                          t.actions,
                          (n) => (
                            a(),
                            u('div', { key: n.link, class: 'action' }, [
                              _(
                                on,
                                {
                                  tag: 'a',
                                  size: 'medium',
                                  theme: n.theme,
                                  text: n.text,
                                  href: n.link,
                                  target: n.target,
                                  rel: n.rel,
                                },
                                null,
                                8,
                                ['theme', 'text', 'href', 'target', 'rel']
                              ),
                            ])
                          )
                        ),
                        128
                      )),
                    ]))
                  : h('', !0),
                c(t.$slots, 'home-hero-actions-after', {}, void 0, !0),
              ]),
              t.image || r(e)
                ? (a(),
                  u('div', fn, [
                    v('div', hn, [
                      o[0] ||
                        (o[0] = v('div', { class: 'image-bg' }, null, -1)),
                      c(
                        t.$slots,
                        'home-hero-image',
                        {},
                        () => [
                          t.image
                            ? (a(),
                              k(
                                Y,
                                { key: 0, class: 'image-src', image: t.image },
                                null,
                                8,
                                ['image']
                              ))
                            : h('', !0),
                        ],
                        !0
                      ),
                    ]),
                  ]))
                : h('', !0),
            ]),
          ],
          2
        )
      );
    },
  }),
  _n = b(mn, [['__scopeId', 'data-v-4f9c455b']]),
  kn = m({
    __name: 'VPHomeHero',
    setup(s) {
      const { frontmatter: e } = P();
      return (t, o) =>
        r(e).hero
          ? (a(),
            k(
              _n,
              {
                key: 0,
                class: 'VPHomeHero',
                name: r(e).hero.name,
                text: r(e).hero.text,
                tagline: r(e).hero.tagline,
                image: r(e).hero.image,
                actions: r(e).hero.actions,
              },
              {
                'home-hero-info-before': f(() => [
                  c(t.$slots, 'home-hero-info-before'),
                ]),
                'home-hero-info': f(() => [c(t.$slots, 'home-hero-info')]),
                'home-hero-info-after': f(() => [
                  c(t.$slots, 'home-hero-info-after'),
                ]),
                'home-hero-actions-after': f(() => [
                  c(t.$slots, 'home-hero-actions-after'),
                ]),
                'home-hero-image': f(() => [c(t.$slots, 'home-hero-image')]),
                _: 3,
              },
              8,
              ['name', 'text', 'tagline', 'image', 'actions']
            ))
          : h('', !0);
    },
  }),
  bn = { class: 'box' },
  gn = { key: 0, class: 'icon' },
  $n = ['innerHTML'],
  yn = ['innerHTML'],
  Pn = ['innerHTML'],
  Ln = { key: 4, class: 'link-text' },
  Vn = { class: 'link-text-value' },
  Sn = m({
    __name: 'VPFeature',
    props: {
      icon: {},
      title: {},
      details: {},
      link: {},
      linkText: {},
      rel: {},
      target: {},
    },
    setup(s) {
      return (e, t) => (
        a(),
        k(
          F,
          {
            class: 'VPFeature',
            href: e.link,
            rel: e.rel,
            target: e.target,
            'no-icon': !0,
            tag: e.link ? 'a' : 'div',
          },
          {
            default: f(() => [
              v('article', bn, [
                typeof e.icon == 'object' && e.icon.wrap
                  ? (a(),
                    u('div', gn, [
                      _(
                        Y,
                        {
                          image: e.icon,
                          alt: e.icon.alt,
                          height: e.icon.height || 48,
                          width: e.icon.width || 48,
                        },
                        null,
                        8,
                        ['image', 'alt', 'height', 'width']
                      ),
                    ]))
                  : typeof e.icon == 'object'
                    ? (a(),
                      k(
                        Y,
                        {
                          key: 1,
                          image: e.icon,
                          alt: e.icon.alt,
                          height: e.icon.height || 48,
                          width: e.icon.width || 48,
                        },
                        null,
                        8,
                        ['image', 'alt', 'height', 'width']
                      ))
                    : e.icon
                      ? (a(),
                        u(
                          'div',
                          { key: 2, class: 'icon', innerHTML: e.icon },
                          null,
                          8,
                          $n
                        ))
                      : h('', !0),
                v('h2', { class: 'title', innerHTML: e.title }, null, 8, yn),
                e.details
                  ? (a(),
                    u(
                      'p',
                      { key: 3, class: 'details', innerHTML: e.details },
                      null,
                      8,
                      Pn
                    ))
                  : h('', !0),
                e.linkText
                  ? (a(),
                    u('div', Ln, [
                      v('p', Vn, [
                        z(M(e.linkText) + ' ', 1),
                        t[0] ||
                          (t[0] = v(
                            'span',
                            { class: 'vpi-arrow-right link-text-icon' },
                            null,
                            -1
                          )),
                      ]),
                    ]))
                  : h('', !0),
              ]),
            ]),
            _: 1,
          },
          8,
          ['href', 'rel', 'target', 'tag']
        )
      );
    },
  }),
  Tn = b(Sn, [['__scopeId', 'data-v-a3976bdc']]),
  Nn = { key: 0, class: 'VPFeatures' },
  Mn = { class: 'container' },
  In = { class: 'items' },
  wn = m({
    __name: 'VPFeatures',
    props: { features: {} },
    setup(s) {
      const e = s,
        t = $(() => {
          const o = e.features.length;
          if (o) {
            if (o === 2) return 'grid-2';
            if (o === 3) return 'grid-3';
            if (o % 3 === 0) return 'grid-6';
            if (o > 3) return 'grid-4';
          } else return;
        });
      return (o, n) =>
        o.features
          ? (a(),
            u('div', Nn, [
              v('div', Mn, [
                v('div', In, [
                  (a(!0),
                  u(
                    w,
                    null,
                    B(
                      o.features,
                      (i) => (
                        a(),
                        u(
                          'div',
                          { key: i.title, class: N(['item', [t.value]]) },
                          [
                            _(
                              Tn,
                              {
                                icon: i.icon,
                                title: i.title,
                                details: i.details,
                                link: i.link,
                                'link-text': i.linkText,
                                rel: i.rel,
                                target: i.target,
                              },
                              null,
                              8,
                              [
                                'icon',
                                'title',
                                'details',
                                'link',
                                'link-text',
                                'rel',
                                'target',
                              ]
                            ),
                          ],
                          2
                        )
                      )
                    ),
                    128
                  )),
                ]),
              ]),
            ]))
          : h('', !0);
    },
  }),
  Hn = b(wn, [['__scopeId', 'data-v-a6181336']]),
  An = m({
    __name: 'VPHomeFeatures',
    setup(s) {
      const { frontmatter: e } = P();
      return (t, o) =>
        r(e).features
          ? (a(),
            k(
              Hn,
              { key: 0, class: 'VPHomeFeatures', features: r(e).features },
              null,
              8,
              ['features']
            ))
          : h('', !0);
    },
  }),
  Bn = m({
    __name: 'VPHomeContent',
    setup(s) {
      const { width: e } = De({ initialWidth: 0, includeScrollbar: !1 });
      return (t, o) => (
        a(),
        u(
          'div',
          {
            class: 'vp-doc container',
            style: ye(
              r(e) ? { '--vp-offset': `calc(50% - ${r(e) / 2}px)` } : {}
            ),
          },
          [c(t.$slots, 'default', {}, void 0, !0)],
          4
        )
      );
    },
  }),
  Cn = b(Bn, [['__scopeId', 'data-v-8e2d4988']]),
  En = m({
    __name: 'VPHome',
    setup(s) {
      const { frontmatter: e, theme: t } = P();
      return (o, n) => {
        const i = q('Content');
        return (
          a(),
          u(
            'div',
            {
              class: N([
                'VPHome',
                { 'external-link-icon-enabled': r(t).externalLinkIcon },
              ]),
            },
            [
              c(o.$slots, 'home-hero-before', {}, void 0, !0),
              _(kn, null, {
                'home-hero-info-before': f(() => [
                  c(o.$slots, 'home-hero-info-before', {}, void 0, !0),
                ]),
                'home-hero-info': f(() => [
                  c(o.$slots, 'home-hero-info', {}, void 0, !0),
                ]),
                'home-hero-info-after': f(() => [
                  c(o.$slots, 'home-hero-info-after', {}, void 0, !0),
                ]),
                'home-hero-actions-after': f(() => [
                  c(o.$slots, 'home-hero-actions-after', {}, void 0, !0),
                ]),
                'home-hero-image': f(() => [
                  c(o.$slots, 'home-hero-image', {}, void 0, !0),
                ]),
                _: 3,
              }),
              c(o.$slots, 'home-hero-after', {}, void 0, !0),
              c(o.$slots, 'home-features-before', {}, void 0, !0),
              _(An),
              c(o.$slots, 'home-features-after', {}, void 0, !0),
              r(e).markdownStyles !== !1
                ? (a(), k(Cn, { key: 0 }, { default: f(() => [_(i)]), _: 1 }))
                : (a(), k(i, { key: 1 })),
            ],
            2
          )
        );
      };
    },
  }),
  Fn = b(En, [['__scopeId', 'data-v-8b561e3d']]),
  Dn = {},
  On = { class: 'VPPage' };
function Gn(s, e) {
  const t = q('Content');
  return (
    a(),
    u('div', On, [c(s.$slots, 'page-top'), _(t), c(s.$slots, 'page-bottom')])
  );
}
const Un = b(Dn, [['render', Gn]]),
  jn = m({
    __name: 'VPContent',
    setup(s) {
      const { page: e, frontmatter: t } = P(),
        { hasSidebar: o } = O();
      return (n, i) => (
        a(),
        u(
          'div',
          {
            class: N([
              'VPContent',
              { 'has-sidebar': r(o), 'is-home': r(t).layout === 'home' },
            ]),
            id: 'VPContent',
          },
          [
            r(e).isNotFound
              ? c(n.$slots, 'not-found', { key: 0 }, () => [_(at)], !0)
              : r(t).layout === 'page'
                ? (a(),
                  k(
                    Un,
                    { key: 1 },
                    {
                      'page-top': f(() => [
                        c(n.$slots, 'page-top', {}, void 0, !0),
                      ]),
                      'page-bottom': f(() => [
                        c(n.$slots, 'page-bottom', {}, void 0, !0),
                      ]),
                      _: 3,
                    }
                  ))
                : r(t).layout === 'home'
                  ? (a(),
                    k(
                      Fn,
                      { key: 2 },
                      {
                        'home-hero-before': f(() => [
                          c(n.$slots, 'home-hero-before', {}, void 0, !0),
                        ]),
                        'home-hero-info-before': f(() => [
                          c(n.$slots, 'home-hero-info-before', {}, void 0, !0),
                        ]),
                        'home-hero-info': f(() => [
                          c(n.$slots, 'home-hero-info', {}, void 0, !0),
                        ]),
                        'home-hero-info-after': f(() => [
                          c(n.$slots, 'home-hero-info-after', {}, void 0, !0),
                        ]),
                        'home-hero-actions-after': f(() => [
                          c(
                            n.$slots,
                            'home-hero-actions-after',
                            {},
                            void 0,
                            !0
                          ),
                        ]),
                        'home-hero-image': f(() => [
                          c(n.$slots, 'home-hero-image', {}, void 0, !0),
                        ]),
                        'home-hero-after': f(() => [
                          c(n.$slots, 'home-hero-after', {}, void 0, !0),
                        ]),
                        'home-features-before': f(() => [
                          c(n.$slots, 'home-features-before', {}, void 0, !0),
                        ]),
                        'home-features-after': f(() => [
                          c(n.$slots, 'home-features-after', {}, void 0, !0),
                        ]),
                        _: 3,
                      }
                    ))
                  : r(t).layout && r(t).layout !== 'doc'
                    ? (a(), k(E(r(t).layout), { key: 3 }))
                    : (a(),
                      k(
                        tn,
                        { key: 4 },
                        {
                          'doc-top': f(() => [
                            c(n.$slots, 'doc-top', {}, void 0, !0),
                          ]),
                          'doc-bottom': f(() => [
                            c(n.$slots, 'doc-bottom', {}, void 0, !0),
                          ]),
                          'doc-footer-before': f(() => [
                            c(n.$slots, 'doc-footer-before', {}, void 0, !0),
                          ]),
                          'doc-before': f(() => [
                            c(n.$slots, 'doc-before', {}, void 0, !0),
                          ]),
                          'doc-after': f(() => [
                            c(n.$slots, 'doc-after', {}, void 0, !0),
                          ]),
                          'aside-top': f(() => [
                            c(n.$slots, 'aside-top', {}, void 0, !0),
                          ]),
                          'aside-outline-before': f(() => [
                            c(n.$slots, 'aside-outline-before', {}, void 0, !0),
                          ]),
                          'aside-outline-after': f(() => [
                            c(n.$slots, 'aside-outline-after', {}, void 0, !0),
                          ]),
                          'aside-ads-before': f(() => [
                            c(n.$slots, 'aside-ads-before', {}, void 0, !0),
                          ]),
                          'aside-ads-after': f(() => [
                            c(n.$slots, 'aside-ads-after', {}, void 0, !0),
                          ]),
                          'aside-bottom': f(() => [
                            c(n.$slots, 'aside-bottom', {}, void 0, !0),
                          ]),
                          _: 3,
                        }
                      )),
          ],
          2
        )
      );
    },
  }),
  zn = b(jn, [['__scopeId', 'data-v-1428d186']]),
  Wn = { class: 'container' },
  qn = ['innerHTML'],
  Kn = ['innerHTML'],
  Rn = m({
    __name: 'VPFooter',
    setup(s) {
      const { theme: e, frontmatter: t } = P(),
        { hasSidebar: o } = O();
      return (n, i) =>
        r(e).footer && r(t).footer !== !1
          ? (a(),
            u(
              'footer',
              { key: 0, class: N(['VPFooter', { 'has-sidebar': r(o) }]) },
              [
                v('div', Wn, [
                  r(e).footer.message
                    ? (a(),
                      u(
                        'p',
                        {
                          key: 0,
                          class: 'message',
                          innerHTML: r(e).footer.message,
                        },
                        null,
                        8,
                        qn
                      ))
                    : h('', !0),
                  r(e).footer.copyright
                    ? (a(),
                      u(
                        'p',
                        {
                          key: 1,
                          class: 'copyright',
                          innerHTML: r(e).footer.copyright,
                        },
                        null,
                        8,
                        Kn
                      ))
                    : h('', !0),
                ]),
              ],
              2
            ))
          : h('', !0);
    },
  }),
  Jn = b(Rn, [['__scopeId', 'data-v-e315a0ad']]);
function Yn() {
  const { theme: s, frontmatter: e } = P(),
    t = ge([]),
    o = $(() => t.value.length > 0);
  return (
    X(() => {
      t.value = fe(e.value.outline ?? s.value.outline);
    }),
    { headers: t, hasLocalNav: o }
  );
}
const Qn = { class: 'menu-text' },
  Xn = { class: 'header' },
  Zn = { class: 'outline' },
  xn = m({
    __name: 'VPLocalNavOutlineDropdown',
    props: { headers: {}, navHeight: {} },
    setup(s) {
      const e = s,
        { theme: t } = P(),
        o = T(!1),
        n = T(0),
        i = T(),
        l = T();
      function p(g) {
        var V;
        ((V = i.value) != null && V.contains(g.target)) || (o.value = !1);
      }
      D(o, (g) => {
        if (g) {
          document.addEventListener('click', p);
          return;
        }
        document.removeEventListener('click', p);
      }),
        Oe('Escape', () => {
          o.value = !1;
        }),
        X(() => {
          o.value = !1;
        });
      function d() {
        (o.value = !o.value),
          (n.value =
            window.innerHeight + Math.min(window.scrollY - e.navHeight, 0));
      }
      function y(g) {
        g.target.classList.contains('outline-link') &&
          (l.value && (l.value.style.transition = 'none'),
          Pe(() => {
            o.value = !1;
          }));
      }
      function L() {
        (o.value = !1),
          window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
      }
      return (g, V) => (
        a(),
        u(
          'div',
          {
            class: 'VPLocalNavOutlineDropdown',
            style: ye({ '--vp-vh': n.value + 'px' }),
            ref_key: 'main',
            ref: i,
          },
          [
            g.headers.length > 0
              ? (a(),
                u(
                  'button',
                  { key: 0, onClick: d, class: N({ open: o.value }) },
                  [
                    v('span', Qn, M(r(Ne)(r(t))), 1),
                    V[0] ||
                      (V[0] = v(
                        'span',
                        { class: 'vpi-chevron-right icon' },
                        null,
                        -1
                      )),
                  ],
                  2
                ))
              : (a(),
                u(
                  'button',
                  { key: 1, onClick: L },
                  M(r(t).returnToTopLabel || 'Return to top'),
                  1
                )),
            _(
              ce,
              { name: 'flyout' },
              {
                default: f(() => [
                  o.value
                    ? (a(),
                      u(
                        'div',
                        {
                          key: 0,
                          ref_key: 'items',
                          ref: l,
                          class: 'items',
                          onClick: y,
                        },
                        [
                          v('div', Xn, [
                            v(
                              'a',
                              { class: 'top-link', href: '#', onClick: L },
                              M(r(t).returnToTopLabel || 'Return to top'),
                              1
                            ),
                          ]),
                          v('div', Zn, [
                            _(Me, { headers: g.headers }, null, 8, ['headers']),
                          ]),
                        ],
                        512
                      ))
                    : h('', !0),
                ]),
                _: 1,
              }
            ),
          ],
          4
        )
      );
    },
  }),
  eo = b(xn, [['__scopeId', 'data-v-8a42e2b4']]),
  to = { class: 'container' },
  no = ['aria-expanded'],
  oo = { class: 'menu-text' },
  so = m({
    __name: 'VPLocalNav',
    props: { open: { type: Boolean } },
    emits: ['open-menu'],
    setup(s) {
      const { theme: e, frontmatter: t } = P(),
        { hasSidebar: o } = O(),
        { headers: n } = Yn(),
        { y: i } = Le(),
        l = T(0);
      j(() => {
        l.value = parseInt(
          getComputedStyle(document.documentElement).getPropertyValue(
            '--vp-nav-height'
          )
        );
      }),
        X(() => {
          n.value = fe(t.value.outline ?? e.value.outline);
        });
      const p = $(() => n.value.length === 0),
        d = $(() => p.value && !o.value),
        y = $(() => ({
          VPLocalNav: !0,
          'has-sidebar': o.value,
          empty: p.value,
          fixed: d.value,
        }));
      return (L, g) =>
        r(t).layout !== 'home' && (!d.value || r(i) >= l.value)
          ? (a(),
            u(
              'div',
              { key: 0, class: N(y.value) },
              [
                v('div', to, [
                  r(o)
                    ? (a(),
                      u(
                        'button',
                        {
                          key: 0,
                          class: 'menu',
                          'aria-expanded': L.open,
                          'aria-controls': 'VPSidebarNav',
                          onClick: g[0] || (g[0] = (V) => L.$emit('open-menu')),
                        },
                        [
                          g[1] ||
                            (g[1] = v(
                              'span',
                              { class: 'vpi-align-left menu-icon' },
                              null,
                              -1
                            )),
                          v('span', oo, M(r(e).sidebarMenuLabel || 'Menu'), 1),
                        ],
                        8,
                        no
                      ))
                    : h('', !0),
                  _(eo, { headers: r(n), navHeight: l.value }, null, 8, [
                    'headers',
                    'navHeight',
                  ]),
                ]),
              ],
              2
            ))
          : h('', !0);
    },
  }),
  ao = b(so, [['__scopeId', 'data-v-a6f0e41e']]);
function ro() {
  const s = T(!1);
  function e() {
    (s.value = !0), window.addEventListener('resize', n);
  }
  function t() {
    (s.value = !1), window.removeEventListener('resize', n);
  }
  function o() {
    s.value ? t() : e();
  }
  function n() {
    window.outerWidth >= 768 && t();
  }
  const i = Z();
  return (
    D(() => i.path, t),
    { isScreenOpen: s, openScreen: e, closeScreen: t, toggleScreen: o }
  );
}
const io = {},
  lo = { class: 'VPSwitch', type: 'button', role: 'switch' },
  co = { class: 'check' },
  uo = { key: 0, class: 'icon' };
function vo(s, e) {
  return (
    a(),
    u('button', lo, [
      v('span', co, [
        s.$slots.default
          ? (a(), u('span', uo, [c(s.$slots, 'default', {}, void 0, !0)]))
          : h('', !0),
      ]),
    ])
  );
}
const po = b(io, [
    ['render', vo],
    ['__scopeId', 'data-v-1d5665e3'],
  ]),
  fo = m({
    __name: 'VPSwitchAppearance',
    setup(s) {
      const { isDark: e, theme: t } = P(),
        o = x('toggle-appearance', () => {
          e.value = !e.value;
        }),
        n = T('');
      return (
        ve(() => {
          n.value = e.value
            ? t.value.lightModeSwitchTitle || 'Switch to light theme'
            : t.value.darkModeSwitchTitle || 'Switch to dark theme';
        }),
        (i, l) => (
          a(),
          k(
            po,
            {
              title: n.value,
              class: 'VPSwitchAppearance',
              'aria-checked': r(e),
              onClick: r(o),
            },
            {
              default: f(
                () =>
                  l[0] ||
                  (l[0] = [
                    v('span', { class: 'vpi-sun sun' }, null, -1),
                    v('span', { class: 'vpi-moon moon' }, null, -1),
                  ])
              ),
              _: 1,
            },
            8,
            ['title', 'aria-checked', 'onClick']
          )
        )
      );
    },
  }),
  he = b(fo, [['__scopeId', 'data-v-5337faa4']]),
  ho = { key: 0, class: 'VPNavBarAppearance' },
  mo = m({
    __name: 'VPNavBarAppearance',
    setup(s) {
      const { site: e } = P();
      return (t, o) =>
        r(e).appearance &&
        r(e).appearance !== 'force-dark' &&
        r(e).appearance !== 'force-auto'
          ? (a(), u('div', ho, [_(he)]))
          : h('', !0);
    },
  }),
  _o = b(mo, [['__scopeId', 'data-v-6c893767']]),
  me = T();
let Ie = !1,
  se = 0;
function ko(s) {
  const e = T(!1);
  if (ee) {
    !Ie && bo(), se++;
    const t = D(me, (o) => {
      var n, i, l;
      o === s.el.value || ((n = s.el.value) != null && n.contains(o))
        ? ((e.value = !0), (i = s.onFocus) == null || i.call(s))
        : ((e.value = !1), (l = s.onBlur) == null || l.call(s));
    });
    de(() => {
      t(), se--, se || go();
    });
  }
  return Ge(e);
}
function bo() {
  document.addEventListener('focusin', we),
    (Ie = !0),
    (me.value = document.activeElement);
}
function go() {
  document.removeEventListener('focusin', we);
}
function we() {
  me.value = document.activeElement;
}
const $o = { class: 'VPMenuLink' },
  yo = ['innerHTML'],
  Po = m({
    __name: 'VPMenuLink',
    props: { item: {} },
    setup(s) {
      const { page: e } = P();
      return (t, o) => (
        a(),
        u('div', $o, [
          _(
            F,
            {
              class: N({
                active: r(W)(
                  r(e).relativePath,
                  t.item.activeMatch || t.item.link,
                  !!t.item.activeMatch
                ),
              }),
              href: t.item.link,
              target: t.item.target,
              rel: t.item.rel,
              'no-icon': t.item.noIcon,
            },
            {
              default: f(() => [
                v('span', { innerHTML: t.item.text }, null, 8, yo),
              ]),
              _: 1,
            },
            8,
            ['class', 'href', 'target', 'rel', 'no-icon']
          ),
        ])
      );
    },
  }),
  te = b(Po, [['__scopeId', 'data-v-35975db6']]),
  Lo = { class: 'VPMenuGroup' },
  Vo = { key: 0, class: 'title' },
  So = m({
    __name: 'VPMenuGroup',
    props: { text: {}, items: {} },
    setup(s) {
      return (e, t) => (
        a(),
        u('div', Lo, [
          e.text ? (a(), u('p', Vo, M(e.text), 1)) : h('', !0),
          (a(!0),
          u(
            w,
            null,
            B(
              e.items,
              (o) => (
                a(),
                u(
                  w,
                  null,
                  [
                    'link' in o
                      ? (a(), k(te, { key: 0, item: o }, null, 8, ['item']))
                      : h('', !0),
                  ],
                  64
                )
              )
            ),
            256
          )),
        ])
      );
    },
  }),
  To = b(So, [['__scopeId', 'data-v-69e747b5']]),
  No = { class: 'VPMenu' },
  Mo = { key: 0, class: 'items' },
  Io = m({
    __name: 'VPMenu',
    props: { items: {} },
    setup(s) {
      return (e, t) => (
        a(),
        u('div', No, [
          e.items
            ? (a(),
              u('div', Mo, [
                (a(!0),
                u(
                  w,
                  null,
                  B(
                    e.items,
                    (o) => (
                      a(),
                      u(
                        w,
                        { key: JSON.stringify(o) },
                        [
                          'link' in o
                            ? (a(),
                              k(te, { key: 0, item: o }, null, 8, ['item']))
                            : 'component' in o
                              ? (a(),
                                k(
                                  E(o.component),
                                  U({ key: 1, ref_for: !0 }, o.props),
                                  null,
                                  16
                                ))
                              : (a(),
                                k(
                                  To,
                                  { key: 2, text: o.text, items: o.items },
                                  null,
                                  8,
                                  ['text', 'items']
                                )),
                        ],
                        64
                      )
                    )
                  ),
                  128
                )),
              ]))
            : h('', !0),
          c(e.$slots, 'default', {}, void 0, !0),
        ])
      );
    },
  }),
  wo = b(Io, [['__scopeId', 'data-v-b98bc113']]),
  Ho = ['aria-expanded', 'aria-label'],
  Ao = { key: 0, class: 'text' },
  Bo = ['innerHTML'],
  Co = { key: 1, class: 'vpi-more-horizontal icon' },
  Eo = { class: 'menu' },
  Fo = m({
    __name: 'VPFlyout',
    props: { icon: {}, button: {}, label: {}, items: {} },
    setup(s) {
      const e = T(!1),
        t = T();
      ko({ el: t, onBlur: o });
      function o() {
        e.value = !1;
      }
      return (n, i) => (
        a(),
        u(
          'div',
          {
            class: 'VPFlyout',
            ref_key: 'el',
            ref: t,
            onMouseenter: i[1] || (i[1] = (l) => (e.value = !0)),
            onMouseleave: i[2] || (i[2] = (l) => (e.value = !1)),
          },
          [
            v(
              'button',
              {
                type: 'button',
                class: 'button',
                'aria-haspopup': 'true',
                'aria-expanded': e.value,
                'aria-label': n.label,
                onClick: i[0] || (i[0] = (l) => (e.value = !e.value)),
              },
              [
                n.button || n.icon
                  ? (a(),
                    u('span', Ao, [
                      n.icon
                        ? (a(),
                          u(
                            'span',
                            { key: 0, class: N([n.icon, 'option-icon']) },
                            null,
                            2
                          ))
                        : h('', !0),
                      n.button
                        ? (a(),
                          u(
                            'span',
                            { key: 1, innerHTML: n.button },
                            null,
                            8,
                            Bo
                          ))
                        : h('', !0),
                      i[3] ||
                        (i[3] = v(
                          'span',
                          { class: 'vpi-chevron-down text-icon' },
                          null,
                          -1
                        )),
                    ]))
                  : (a(), u('span', Co)),
              ],
              8,
              Ho
            ),
            v('div', Eo, [
              _(
                wo,
                { items: n.items },
                {
                  default: f(() => [c(n.$slots, 'default', {}, void 0, !0)]),
                  _: 3,
                },
                8,
                ['items']
              ),
            ]),
          ],
          544
        )
      );
    },
  }),
  _e = b(Fo, [['__scopeId', 'data-v-cf11d7a2']]),
  Do = ['href', 'aria-label', 'innerHTML'],
  Oo = m({
    __name: 'VPSocialLink',
    props: { icon: {}, link: {}, ariaLabel: {} },
    setup(s) {
      const e = s,
        t = T();
      j(async () => {
        var i;
        await Pe();
        const n = (i = t.value) == null ? void 0 : i.children[0];
        n instanceof HTMLElement &&
          n.className.startsWith('vpi-social-') &&
          (getComputedStyle(n).maskImage ||
            getComputedStyle(n).webkitMaskImage) === 'none' &&
          n.style.setProperty(
            '--icon',
            `url('https://api.iconify.design/simple-icons/${e.icon}.svg')`
          );
      });
      const o = $(() =>
        typeof e.icon == 'object'
          ? e.icon.svg
          : `<span class="vpi-social-${e.icon}"></span>`
      );
      return (n, i) => (
        a(),
        u(
          'a',
          {
            ref_key: 'el',
            ref: t,
            class: 'VPSocialLink no-icon',
            href: n.link,
            'aria-label':
              n.ariaLabel ?? (typeof n.icon == 'string' ? n.icon : ''),
            target: '_blank',
            rel: 'noopener',
            innerHTML: o.value,
          },
          null,
          8,
          Do
        )
      );
    },
  }),
  Go = b(Oo, [['__scopeId', 'data-v-bd121fe5']]),
  Uo = { class: 'VPSocialLinks' },
  jo = m({
    __name: 'VPSocialLinks',
    props: { links: {} },
    setup(s) {
      return (e, t) => (
        a(),
        u('div', Uo, [
          (a(!0),
          u(
            w,
            null,
            B(
              e.links,
              ({ link: o, icon: n, ariaLabel: i }) => (
                a(),
                k(Go, { key: o, icon: n, link: o, ariaLabel: i }, null, 8, [
                  'icon',
                  'link',
                  'ariaLabel',
                ])
              )
            ),
            128
          )),
        ])
      );
    },
  }),
  ke = b(jo, [['__scopeId', 'data-v-7bc22406']]),
  zo = { key: 0, class: 'group translations' },
  Wo = { class: 'trans-title' },
  qo = { key: 1, class: 'group' },
  Ko = { class: 'item appearance' },
  Ro = { class: 'label' },
  Jo = { class: 'appearance-action' },
  Yo = { key: 2, class: 'group' },
  Qo = { class: 'item social-links' },
  Xo = m({
    __name: 'VPNavBarExtra',
    setup(s) {
      const { site: e, theme: t } = P(),
        { localeLinks: o, currentLang: n } = R({ correspondingLink: !0 }),
        i = $(
          () =>
            (o.value.length && n.value.label) ||
            e.value.appearance ||
            t.value.socialLinks
        );
      return (l, p) =>
        i.value
          ? (a(),
            k(
              _e,
              { key: 0, class: 'VPNavBarExtra', label: 'extra navigation' },
              {
                default: f(() => [
                  r(o).length && r(n).label
                    ? (a(),
                      u('div', zo, [
                        v('p', Wo, M(r(n).label), 1),
                        (a(!0),
                        u(
                          w,
                          null,
                          B(
                            r(o),
                            (d) => (
                              a(),
                              k(te, { key: d.link, item: d }, null, 8, ['item'])
                            )
                          ),
                          128
                        )),
                      ]))
                    : h('', !0),
                  r(e).appearance &&
                  r(e).appearance !== 'force-dark' &&
                  r(e).appearance !== 'force-auto'
                    ? (a(),
                      u('div', qo, [
                        v('div', Ko, [
                          v(
                            'p',
                            Ro,
                            M(r(t).darkModeSwitchLabel || 'Appearance'),
                            1
                          ),
                          v('div', Jo, [_(he)]),
                        ]),
                      ]))
                    : h('', !0),
                  r(t).socialLinks
                    ? (a(),
                      u('div', Yo, [
                        v('div', Qo, [
                          _(
                            ke,
                            {
                              class: 'social-links-list',
                              links: r(t).socialLinks,
                            },
                            null,
                            8,
                            ['links']
                          ),
                        ]),
                      ]))
                    : h('', !0),
                ]),
                _: 1,
              }
            ))
          : h('', !0);
    },
  }),
  Zo = b(Xo, [['__scopeId', 'data-v-bb2aa2f0']]),
  xo = ['aria-expanded'],
  es = m({
    __name: 'VPNavBarHamburger',
    props: { active: { type: Boolean } },
    emits: ['click'],
    setup(s) {
      return (e, t) => (
        a(),
        u(
          'button',
          {
            type: 'button',
            class: N(['VPNavBarHamburger', { active: e.active }]),
            'aria-label': 'mobile navigation',
            'aria-expanded': e.active,
            'aria-controls': 'VPNavScreen',
            onClick: t[0] || (t[0] = (o) => e.$emit('click')),
          },
          t[1] ||
            (t[1] = [
              v(
                'span',
                { class: 'container' },
                [
                  v('span', { class: 'top' }),
                  v('span', { class: 'middle' }),
                  v('span', { class: 'bottom' }),
                ],
                -1
              ),
            ]),
          10,
          xo
        )
      );
    },
  }),
  ts = b(es, [['__scopeId', 'data-v-e5dd9c1c']]),
  ns = ['innerHTML'],
  os = m({
    __name: 'VPNavBarMenuLink',
    props: { item: {} },
    setup(s) {
      const { page: e } = P();
      return (t, o) => (
        a(),
        k(
          F,
          {
            class: N({
              VPNavBarMenuLink: !0,
              active: r(W)(
                r(e).relativePath,
                t.item.activeMatch || t.item.link,
                !!t.item.activeMatch
              ),
            }),
            href: t.item.link,
            target: t.item.target,
            rel: t.item.rel,
            'no-icon': t.item.noIcon,
            tabindex: '0',
          },
          {
            default: f(() => [
              v('span', { innerHTML: t.item.text }, null, 8, ns),
            ]),
            _: 1,
          },
          8,
          ['class', 'href', 'target', 'rel', 'no-icon']
        )
      );
    },
  }),
  ss = b(os, [['__scopeId', 'data-v-e56f3d57']]),
  as = m({
    __name: 'VPNavBarMenuGroup',
    props: { item: {} },
    setup(s) {
      const e = s,
        { page: t } = P(),
        o = (i) =>
          'component' in i
            ? !1
            : 'link' in i
              ? W(t.value.relativePath, i.link, !!e.item.activeMatch)
              : i.items.some(o),
        n = $(() => o(e.item));
      return (i, l) => (
        a(),
        k(
          _e,
          {
            class: N({
              VPNavBarMenuGroup: !0,
              active:
                r(W)(
                  r(t).relativePath,
                  i.item.activeMatch,
                  !!i.item.activeMatch
                ) || n.value,
            }),
            button: i.item.text,
            items: i.item.items,
          },
          null,
          8,
          ['class', 'button', 'items']
        )
      );
    },
  }),
  rs = {
    key: 0,
    'aria-labelledby': 'main-nav-aria-label',
    class: 'VPNavBarMenu',
  },
  is = m({
    __name: 'VPNavBarMenu',
    setup(s) {
      const { theme: e } = P();
      return (t, o) =>
        r(e).nav
          ? (a(),
            u('nav', rs, [
              o[0] ||
                (o[0] = v(
                  'span',
                  { id: 'main-nav-aria-label', class: 'visually-hidden' },
                  ' Main Navigation ',
                  -1
                )),
              (a(!0),
              u(
                w,
                null,
                B(
                  r(e).nav,
                  (n) => (
                    a(),
                    u(
                      w,
                      { key: JSON.stringify(n) },
                      [
                        'link' in n
                          ? (a(), k(ss, { key: 0, item: n }, null, 8, ['item']))
                          : 'component' in n
                            ? (a(),
                              k(
                                E(n.component),
                                U({ key: 1, ref_for: !0 }, n.props),
                                null,
                                16
                              ))
                            : (a(),
                              k(as, { key: 2, item: n }, null, 8, ['item'])),
                      ],
                      64
                    )
                  )
                ),
                128
              )),
            ]))
          : h('', !0);
    },
  }),
  ls = b(is, [['__scopeId', 'data-v-dc692963']]);
function cs(s) {
  const { localeIndex: e, theme: t } = P();
  function o(n) {
    var H, A, S;
    const i = n.split('.'),
      l = (H = t.value.search) == null ? void 0 : H.options,
      p = l && typeof l == 'object',
      d =
        (p &&
          ((S = (A = l.locales) == null ? void 0 : A[e.value]) == null
            ? void 0
            : S.translations)) ||
        null,
      y = (p && l.translations) || null;
    let L = d,
      g = y,
      V = s;
    const I = i.pop();
    for (const C of i) {
      let G = null;
      const K = V == null ? void 0 : V[C];
      K && (G = V = K);
      const ne = g == null ? void 0 : g[C];
      ne && (G = g = ne);
      const oe = L == null ? void 0 : L[C];
      oe && (G = L = oe), K || (V = G), ne || (g = G), oe || (L = G);
    }
    return (
      (L == null ? void 0 : L[I]) ??
      (g == null ? void 0 : g[I]) ??
      (V == null ? void 0 : V[I]) ??
      ''
    );
  }
  return o;
}
const us = ['aria-label'],
  ds = { class: 'DocSearch-Button-Container' },
  vs = { class: 'DocSearch-Button-Placeholder' },
  be = m({
    __name: 'VPNavBarSearchButton',
    setup(s) {
      const t = cs({
        button: { buttonText: 'Search', buttonAriaLabel: 'Search' },
      });
      return (o, n) => (
        a(),
        u(
          'button',
          {
            type: 'button',
            class: 'DocSearch DocSearch-Button',
            'aria-label': r(t)('button.buttonAriaLabel'),
          },
          [
            v('span', ds, [
              n[0] ||
                (n[0] = v(
                  'span',
                  { class: 'vp-icon DocSearch-Search-Icon' },
                  null,
                  -1
                )),
              v('span', vs, M(r(t)('button.buttonText')), 1),
            ]),
            n[1] ||
              (n[1] = v(
                'span',
                { class: 'DocSearch-Button-Keys' },
                [
                  v('kbd', { class: 'DocSearch-Button-Key' }),
                  v('kbd', { class: 'DocSearch-Button-Key' }, 'K'),
                ],
                -1
              )),
          ],
          8,
          us
        )
      );
    },
  }),
  ps = { class: 'VPNavBarSearch' },
  fs = { id: 'local-search' },
  hs = { key: 1, id: 'docsearch' },
  ms = m({
    __name: 'VPNavBarSearch',
    setup(s) {
      const e = () => null,
        t = () => null,
        { theme: o } = P(),
        n = T(!1),
        i = T(!1);
      j(() => {});
      function l() {
        n.value || ((n.value = !0), setTimeout(p, 16));
      }
      function p() {
        const L = new Event('keydown');
        (L.key = 'k'),
          (L.metaKey = !0),
          window.dispatchEvent(L),
          setTimeout(() => {
            document.querySelector('.DocSearch-Modal') || p();
          }, 16);
      }
      const d = T(!1),
        y = '';
      return (L, g) => {
        var V;
        return (
          a(),
          u('div', ps, [
            r(y) === 'local'
              ? (a(),
                u(
                  w,
                  { key: 0 },
                  [
                    d.value
                      ? (a(),
                        k(r(e), {
                          key: 0,
                          onClose: g[0] || (g[0] = (I) => (d.value = !1)),
                        }))
                      : h('', !0),
                    v('div', fs, [
                      _(be, {
                        onClick: g[1] || (g[1] = (I) => (d.value = !0)),
                      }),
                    ]),
                  ],
                  64
                ))
              : r(y) === 'algolia'
                ? (a(),
                  u(
                    w,
                    { key: 1 },
                    [
                      n.value
                        ? (a(),
                          k(
                            r(t),
                            {
                              key: 0,
                              algolia:
                                ((V = r(o).search) == null
                                  ? void 0
                                  : V.options) ?? r(o).algolia,
                              onVnodeBeforeMount:
                                g[2] || (g[2] = (I) => (i.value = !0)),
                            },
                            null,
                            8,
                            ['algolia']
                          ))
                        : h('', !0),
                      i.value
                        ? h('', !0)
                        : (a(), u('div', hs, [_(be, { onClick: l })])),
                    ],
                    64
                  ))
                : h('', !0),
          ])
        );
      };
    },
  }),
  _s = m({
    __name: 'VPNavBarSocialLinks',
    setup(s) {
      const { theme: e } = P();
      return (t, o) =>
        r(e).socialLinks
          ? (a(),
            k(
              ke,
              { key: 0, class: 'VPNavBarSocialLinks', links: r(e).socialLinks },
              null,
              8,
              ['links']
            ))
          : h('', !0);
    },
  }),
  ks = b(_s, [['__scopeId', 'data-v-0394ad82']]),
  bs = ['href', 'rel', 'target'],
  gs = ['innerHTML'],
  $s = { key: 2 },
  ys = m({
    __name: 'VPNavBarTitle',
    setup(s) {
      const { site: e, theme: t } = P(),
        { hasSidebar: o } = O(),
        { currentLang: n } = R(),
        i = $(() => {
          var d;
          return typeof t.value.logoLink == 'string'
            ? t.value.logoLink
            : (d = t.value.logoLink) == null
              ? void 0
              : d.link;
        }),
        l = $(() => {
          var d;
          return typeof t.value.logoLink == 'string' ||
            (d = t.value.logoLink) == null
            ? void 0
            : d.rel;
        }),
        p = $(() => {
          var d;
          return typeof t.value.logoLink == 'string' ||
            (d = t.value.logoLink) == null
            ? void 0
            : d.target;
        });
      return (d, y) => (
        a(),
        u(
          'div',
          { class: N(['VPNavBarTitle', { 'has-sidebar': r(o) }]) },
          [
            v(
              'a',
              {
                class: 'title',
                href: i.value ?? r(pe)(r(n).link),
                rel: l.value,
                target: p.value,
              },
              [
                c(d.$slots, 'nav-bar-title-before', {}, void 0, !0),
                r(t).logo
                  ? (a(),
                    k(Y, { key: 0, class: 'logo', image: r(t).logo }, null, 8, [
                      'image',
                    ]))
                  : h('', !0),
                r(t).siteTitle
                  ? (a(),
                    u(
                      'span',
                      { key: 1, innerHTML: r(t).siteTitle },
                      null,
                      8,
                      gs
                    ))
                  : r(t).siteTitle === void 0
                    ? (a(), u('span', $s, M(r(e).title), 1))
                    : h('', !0),
                c(d.$slots, 'nav-bar-title-after', {}, void 0, !0),
              ],
              8,
              bs
            ),
          ],
          2
        )
      );
    },
  }),
  Ps = b(ys, [['__scopeId', 'data-v-1168a8e4']]),
  Ls = { class: 'items' },
  Vs = { class: 'title' },
  Ss = m({
    __name: 'VPNavBarTranslations',
    setup(s) {
      const { theme: e } = P(),
        { localeLinks: t, currentLang: o } = R({ correspondingLink: !0 });
      return (n, i) =>
        r(t).length && r(o).label
          ? (a(),
            k(
              _e,
              {
                key: 0,
                class: 'VPNavBarTranslations',
                icon: 'vpi-languages',
                label: r(e).langMenuLabel || 'Change language',
              },
              {
                default: f(() => [
                  v('div', Ls, [
                    v('p', Vs, M(r(o).label), 1),
                    (a(!0),
                    u(
                      w,
                      null,
                      B(
                        r(t),
                        (l) => (
                          a(),
                          k(te, { key: l.link, item: l }, null, 8, ['item'])
                        )
                      ),
                      128
                    )),
                  ]),
                ]),
                _: 1,
              },
              8,
              ['label']
            ))
          : h('', !0);
    },
  }),
  Ts = b(Ss, [['__scopeId', 'data-v-88af2de4']]),
  Ns = { class: 'wrapper' },
  Ms = { class: 'container' },
  Is = { class: 'title' },
  ws = { class: 'content' },
  Hs = { class: 'content-body' },
  As = m({
    __name: 'VPNavBar',
    props: { isScreenOpen: { type: Boolean } },
    emits: ['toggle-screen'],
    setup(s) {
      const e = s,
        { y: t } = Le(),
        { hasSidebar: o } = O(),
        { frontmatter: n } = P(),
        i = T({});
      return (
        ve(() => {
          i.value = {
            'has-sidebar': o.value,
            home: n.value.layout === 'home',
            top: t.value === 0,
            'screen-open': e.isScreenOpen,
          };
        }),
        (l, p) => (
          a(),
          u(
            'div',
            { class: N(['VPNavBar', i.value]) },
            [
              v('div', Ns, [
                v('div', Ms, [
                  v('div', Is, [
                    _(Ps, null, {
                      'nav-bar-title-before': f(() => [
                        c(l.$slots, 'nav-bar-title-before', {}, void 0, !0),
                      ]),
                      'nav-bar-title-after': f(() => [
                        c(l.$slots, 'nav-bar-title-after', {}, void 0, !0),
                      ]),
                      _: 3,
                    }),
                  ]),
                  v('div', ws, [
                    v('div', Hs, [
                      c(l.$slots, 'nav-bar-content-before', {}, void 0, !0),
                      _(ms, { class: 'search' }),
                      _(ls, { class: 'menu' }),
                      _(Ts, { class: 'translations' }),
                      _(_o, { class: 'appearance' }),
                      _(ks, { class: 'social-links' }),
                      _(Zo, { class: 'extra' }),
                      c(l.$slots, 'nav-bar-content-after', {}, void 0, !0),
                      _(
                        ts,
                        {
                          class: 'hamburger',
                          active: l.isScreenOpen,
                          onClick:
                            p[0] || (p[0] = (d) => l.$emit('toggle-screen')),
                        },
                        null,
                        8,
                        ['active']
                      ),
                    ]),
                  ]),
                ]),
              ]),
              p[1] ||
                (p[1] = v(
                  'div',
                  { class: 'divider' },
                  [v('div', { class: 'divider-line' })],
                  -1
                )),
            ],
            2
          )
        )
      );
    },
  }),
  Bs = b(As, [['__scopeId', 'data-v-6aa21345']]),
  Cs = { key: 0, class: 'VPNavScreenAppearance' },
  Es = { class: 'text' },
  Fs = m({
    __name: 'VPNavScreenAppearance',
    setup(s) {
      const { site: e, theme: t } = P();
      return (o, n) =>
        r(e).appearance &&
        r(e).appearance !== 'force-dark' &&
        r(e).appearance !== 'force-auto'
          ? (a(),
            u('div', Cs, [
              v('p', Es, M(r(t).darkModeSwitchLabel || 'Appearance'), 1),
              _(he),
            ]))
          : h('', !0);
    },
  }),
  Ds = b(Fs, [['__scopeId', 'data-v-b44890b2']]),
  Os = ['innerHTML'],
  Gs = m({
    __name: 'VPNavScreenMenuLink',
    props: { item: {} },
    setup(s) {
      const e = x('close-screen');
      return (t, o) => (
        a(),
        k(
          F,
          {
            class: 'VPNavScreenMenuLink',
            href: t.item.link,
            target: t.item.target,
            rel: t.item.rel,
            'no-icon': t.item.noIcon,
            onClick: r(e),
          },
          {
            default: f(() => [
              v('span', { innerHTML: t.item.text }, null, 8, Os),
            ]),
            _: 1,
          },
          8,
          ['href', 'target', 'rel', 'no-icon', 'onClick']
        )
      );
    },
  }),
  Us = b(Gs, [['__scopeId', 'data-v-df37e6dd']]),
  js = ['innerHTML'],
  zs = m({
    __name: 'VPNavScreenMenuGroupLink',
    props: { item: {} },
    setup(s) {
      const e = x('close-screen');
      return (t, o) => (
        a(),
        k(
          F,
          {
            class: 'VPNavScreenMenuGroupLink',
            href: t.item.link,
            target: t.item.target,
            rel: t.item.rel,
            'no-icon': t.item.noIcon,
            onClick: r(e),
          },
          {
            default: f(() => [
              v('span', { innerHTML: t.item.text }, null, 8, js),
            ]),
            _: 1,
          },
          8,
          ['href', 'target', 'rel', 'no-icon', 'onClick']
        )
      );
    },
  }),
  He = b(zs, [['__scopeId', 'data-v-3e9c20e4']]),
  Ws = { class: 'VPNavScreenMenuGroupSection' },
  qs = { key: 0, class: 'title' },
  Ks = m({
    __name: 'VPNavScreenMenuGroupSection',
    props: { text: {}, items: {} },
    setup(s) {
      return (e, t) => (
        a(),
        u('div', Ws, [
          e.text ? (a(), u('p', qs, M(e.text), 1)) : h('', !0),
          (a(!0),
          u(
            w,
            null,
            B(
              e.items,
              (o) => (a(), k(He, { key: o.text, item: o }, null, 8, ['item']))
            ),
            128
          )),
        ])
      );
    },
  }),
  Rs = b(Ks, [['__scopeId', 'data-v-8133b170']]),
  Js = ['aria-controls', 'aria-expanded'],
  Ys = ['innerHTML'],
  Qs = ['id'],
  Xs = { key: 0, class: 'item' },
  Zs = { key: 1, class: 'item' },
  xs = { key: 2, class: 'group' },
  ea = m({
    __name: 'VPNavScreenMenuGroup',
    props: { text: {}, items: {} },
    setup(s) {
      const e = s,
        t = T(!1),
        o = $(() => `NavScreenGroup-${e.text.replace(' ', '-').toLowerCase()}`);
      function n() {
        t.value = !t.value;
      }
      return (i, l) => (
        a(),
        u(
          'div',
          { class: N(['VPNavScreenMenuGroup', { open: t.value }]) },
          [
            v(
              'button',
              {
                class: 'button',
                'aria-controls': o.value,
                'aria-expanded': t.value,
                onClick: n,
              },
              [
                v(
                  'span',
                  { class: 'button-text', innerHTML: i.text },
                  null,
                  8,
                  Ys
                ),
                l[0] ||
                  (l[0] = v(
                    'span',
                    { class: 'vpi-plus button-icon' },
                    null,
                    -1
                  )),
              ],
              8,
              Js
            ),
            v(
              'div',
              { id: o.value, class: 'items' },
              [
                (a(!0),
                u(
                  w,
                  null,
                  B(
                    i.items,
                    (p) => (
                      a(),
                      u(
                        w,
                        { key: JSON.stringify(p) },
                        [
                          'link' in p
                            ? (a(),
                              u('div', Xs, [
                                _(He, { item: p }, null, 8, ['item']),
                              ]))
                            : 'component' in p
                              ? (a(),
                                u('div', Zs, [
                                  (a(),
                                  k(
                                    E(p.component),
                                    U({ ref_for: !0 }, p.props, {
                                      'screen-menu': '',
                                    }),
                                    null,
                                    16
                                  )),
                                ]))
                              : (a(),
                                u('div', xs, [
                                  _(
                                    Rs,
                                    { text: p.text, items: p.items },
                                    null,
                                    8,
                                    ['text', 'items']
                                  ),
                                ])),
                        ],
                        64
                      )
                    )
                  ),
                  128
                )),
              ],
              8,
              Qs
            ),
          ],
          2
        )
      );
    },
  }),
  ta = b(ea, [['__scopeId', 'data-v-b9ab8c58']]),
  na = { key: 0, class: 'VPNavScreenMenu' },
  oa = m({
    __name: 'VPNavScreenMenu',
    setup(s) {
      const { theme: e } = P();
      return (t, o) =>
        r(e).nav
          ? (a(),
            u('nav', na, [
              (a(!0),
              u(
                w,
                null,
                B(
                  r(e).nav,
                  (n) => (
                    a(),
                    u(
                      w,
                      { key: JSON.stringify(n) },
                      [
                        'link' in n
                          ? (a(), k(Us, { key: 0, item: n }, null, 8, ['item']))
                          : 'component' in n
                            ? (a(),
                              k(
                                E(n.component),
                                U({ key: 1, ref_for: !0 }, n.props, {
                                  'screen-menu': '',
                                }),
                                null,
                                16
                              ))
                            : (a(),
                              k(
                                ta,
                                { key: 2, text: n.text || '', items: n.items },
                                null,
                                8,
                                ['text', 'items']
                              )),
                      ],
                      64
                    )
                  )
                ),
                128
              )),
            ]))
          : h('', !0);
    },
  }),
  sa = m({
    __name: 'VPNavScreenSocialLinks',
    setup(s) {
      const { theme: e } = P();
      return (t, o) =>
        r(e).socialLinks
          ? (a(),
            k(
              ke,
              {
                key: 0,
                class: 'VPNavScreenSocialLinks',
                links: r(e).socialLinks,
              },
              null,
              8,
              ['links']
            ))
          : h('', !0);
    },
  }),
  aa = { class: 'list' },
  ra = m({
    __name: 'VPNavScreenTranslations',
    setup(s) {
      const { localeLinks: e, currentLang: t } = R({ correspondingLink: !0 }),
        o = T(!1);
      function n() {
        o.value = !o.value;
      }
      return (i, l) =>
        r(e).length && r(t).label
          ? (a(),
            u(
              'div',
              {
                key: 0,
                class: N(['VPNavScreenTranslations', { open: o.value }]),
              },
              [
                v('button', { class: 'title', onClick: n }, [
                  l[0] ||
                    (l[0] = v(
                      'span',
                      { class: 'vpi-languages icon lang' },
                      null,
                      -1
                    )),
                  z(' ' + M(r(t).label) + ' ', 1),
                  l[1] ||
                    (l[1] = v(
                      'span',
                      { class: 'vpi-chevron-down icon chevron' },
                      null,
                      -1
                    )),
                ]),
                v('ul', aa, [
                  (a(!0),
                  u(
                    w,
                    null,
                    B(
                      r(e),
                      (p) => (
                        a(),
                        u('li', { key: p.link, class: 'item' }, [
                          _(
                            F,
                            { class: 'link', href: p.link },
                            { default: f(() => [z(M(p.text), 1)]), _: 2 },
                            1032,
                            ['href']
                          ),
                        ])
                      )
                    ),
                    128
                  )),
                ]),
              ],
              2
            ))
          : h('', !0);
    },
  }),
  ia = b(ra, [['__scopeId', 'data-v-858fe1a4']]),
  la = { class: 'container' },
  ca = m({
    __name: 'VPNavScreen',
    props: { open: { type: Boolean } },
    setup(s) {
      const e = T(null),
        t = Ve(ee ? document.body : null);
      return (o, n) => (
        a(),
        k(
          ce,
          {
            name: 'fade',
            onEnter: n[0] || (n[0] = (i) => (t.value = !0)),
            onAfterLeave: n[1] || (n[1] = (i) => (t.value = !1)),
          },
          {
            default: f(() => [
              o.open
                ? (a(),
                  u(
                    'div',
                    {
                      key: 0,
                      class: 'VPNavScreen',
                      ref_key: 'screen',
                      ref: e,
                      id: 'VPNavScreen',
                    },
                    [
                      v('div', la, [
                        c(
                          o.$slots,
                          'nav-screen-content-before',
                          {},
                          void 0,
                          !0
                        ),
                        _(oa, { class: 'menu' }),
                        _(ia, { class: 'translations' }),
                        _(Ds, { class: 'appearance' }),
                        _(sa, { class: 'social-links' }),
                        c(o.$slots, 'nav-screen-content-after', {}, void 0, !0),
                      ]),
                    ],
                    512
                  ))
                : h('', !0),
            ]),
            _: 3,
          }
        )
      );
    },
  }),
  ua = b(ca, [['__scopeId', 'data-v-f2779853']]),
  da = { key: 0, class: 'VPNav' },
  va = m({
    __name: 'VPNav',
    setup(s) {
      const { isScreenOpen: e, closeScreen: t, toggleScreen: o } = ro(),
        { frontmatter: n } = P(),
        i = $(() => n.value.navbar !== !1);
      return (
        Se('close-screen', t),
        Q(() => {
          ee && document.documentElement.classList.toggle('hide-nav', !i.value);
        }),
        (l, p) =>
          i.value
            ? (a(),
              u('header', da, [
                _(
                  Bs,
                  { 'is-screen-open': r(e), onToggleScreen: r(o) },
                  {
                    'nav-bar-title-before': f(() => [
                      c(l.$slots, 'nav-bar-title-before', {}, void 0, !0),
                    ]),
                    'nav-bar-title-after': f(() => [
                      c(l.$slots, 'nav-bar-title-after', {}, void 0, !0),
                    ]),
                    'nav-bar-content-before': f(() => [
                      c(l.$slots, 'nav-bar-content-before', {}, void 0, !0),
                    ]),
                    'nav-bar-content-after': f(() => [
                      c(l.$slots, 'nav-bar-content-after', {}, void 0, !0),
                    ]),
                    _: 3,
                  },
                  8,
                  ['is-screen-open', 'onToggleScreen']
                ),
                _(
                  ua,
                  { open: r(e) },
                  {
                    'nav-screen-content-before': f(() => [
                      c(l.$slots, 'nav-screen-content-before', {}, void 0, !0),
                    ]),
                    'nav-screen-content-after': f(() => [
                      c(l.$slots, 'nav-screen-content-after', {}, void 0, !0),
                    ]),
                    _: 3,
                  },
                  8,
                  ['open']
                ),
              ]))
            : h('', !0)
      );
    },
  }),
  pa = b(va, [['__scopeId', 'data-v-ae24b3ad']]),
  fa = ['role', 'tabindex'],
  ha = { key: 1, class: 'items' },
  ma = m({
    __name: 'VPSidebarItem',
    props: { item: {}, depth: {} },
    setup(s) {
      const e = s,
        {
          collapsed: t,
          collapsible: o,
          isLink: n,
          isActiveLink: i,
          hasActiveLink: l,
          hasChildren: p,
          toggle: d,
        } = ct($(() => e.item)),
        y = $(() => (p.value ? 'section' : 'div')),
        L = $(() => (n.value ? 'a' : 'div')),
        g = $(() =>
          p.value ? (e.depth + 2 === 7 ? 'p' : `h${e.depth + 2}`) : 'p'
        ),
        V = $(() => (n.value ? void 0 : 'button')),
        I = $(() => [
          [`level-${e.depth}`],
          { collapsible: o.value },
          { collapsed: t.value },
          { 'is-link': n.value },
          { 'is-active': i.value },
          { 'has-active': l.value },
        ]);
      function H(S) {
        ('key' in S && S.key !== 'Enter') || (!e.item.link && d());
      }
      function A() {
        e.item.link && d();
      }
      return (S, C) => {
        const G = q('VPSidebarItem', !0);
        return (
          a(),
          k(
            E(y.value),
            { class: N(['VPSidebarItem', I.value]) },
            {
              default: f(() => [
                S.item.text
                  ? (a(),
                    u(
                      'div',
                      U(
                        { key: 0, class: 'item', role: V.value },
                        Ue(S.item.items ? { click: H, keydown: H } : {}, !0),
                        { tabindex: S.item.items && 0 }
                      ),
                      [
                        C[1] ||
                          (C[1] = v('div', { class: 'indicator' }, null, -1)),
                        S.item.link
                          ? (a(),
                            k(
                              F,
                              {
                                key: 0,
                                tag: L.value,
                                class: 'link',
                                href: S.item.link,
                                rel: S.item.rel,
                                target: S.item.target,
                              },
                              {
                                default: f(() => [
                                  (a(),
                                  k(
                                    E(g.value),
                                    { class: 'text', innerHTML: S.item.text },
                                    null,
                                    8,
                                    ['innerHTML']
                                  )),
                                ]),
                                _: 1,
                              },
                              8,
                              ['tag', 'href', 'rel', 'target']
                            ))
                          : (a(),
                            k(
                              E(g.value),
                              { key: 1, class: 'text', innerHTML: S.item.text },
                              null,
                              8,
                              ['innerHTML']
                            )),
                        S.item.collapsed != null &&
                        S.item.items &&
                        S.item.items.length
                          ? (a(),
                            u(
                              'div',
                              {
                                key: 2,
                                class: 'caret',
                                role: 'button',
                                'aria-label': 'toggle section',
                                onClick: A,
                                onKeydown: je(A, ['enter']),
                                tabindex: '0',
                              },
                              C[0] ||
                                (C[0] = [
                                  v(
                                    'span',
                                    { class: 'vpi-chevron-right caret-icon' },
                                    null,
                                    -1
                                  ),
                                ]),
                              32
                            ))
                          : h('', !0),
                      ],
                      16,
                      fa
                    ))
                  : h('', !0),
                S.item.items && S.item.items.length
                  ? (a(),
                    u('div', ha, [
                      S.depth < 5
                        ? (a(!0),
                          u(
                            w,
                            { key: 0 },
                            B(
                              S.item.items,
                              (K) => (
                                a(),
                                k(
                                  G,
                                  { key: K.text, item: K, depth: S.depth + 1 },
                                  null,
                                  8,
                                  ['item', 'depth']
                                )
                              )
                            ),
                            128
                          ))
                        : h('', !0),
                    ]))
                  : h('', !0),
              ]),
              _: 1,
            },
            8,
            ['class']
          )
        );
      };
    },
  }),
  _a = b(ma, [['__scopeId', 'data-v-b3fd67f8']]),
  ka = m({
    __name: 'VPSidebarGroup',
    props: { items: {} },
    setup(s) {
      const e = T(!0);
      let t = null;
      return (
        j(() => {
          t = setTimeout(() => {
            (t = null), (e.value = !1);
          }, 300);
        }),
        ze(() => {
          t != null && (clearTimeout(t), (t = null));
        }),
        (o, n) => (
          a(!0),
          u(
            w,
            null,
            B(
              o.items,
              (i) => (
                a(),
                u(
                  'div',
                  {
                    key: i.text,
                    class: N(['group', { 'no-transition': e.value }]),
                  },
                  [_(_a, { item: i, depth: 0 }, null, 8, ['item'])],
                  2
                )
              )
            ),
            128
          )
        )
      );
    },
  }),
  ba = b(ka, [['__scopeId', 'data-v-c40bc020']]),
  ga = {
    class: 'nav',
    id: 'VPSidebarNav',
    'aria-labelledby': 'sidebar-aria-label',
    tabindex: '-1',
  },
  $a = m({
    __name: 'VPSidebar',
    props: { open: { type: Boolean } },
    setup(s) {
      const { sidebarGroups: e, hasSidebar: t } = O(),
        o = s,
        n = T(null),
        i = Ve(ee ? document.body : null);
      D(
        [o, n],
        () => {
          var p;
          o.open
            ? ((i.value = !0), (p = n.value) == null || p.focus())
            : (i.value = !1);
        },
        { immediate: !0, flush: 'post' }
      );
      const l = T(0);
      return (
        D(
          e,
          () => {
            l.value += 1;
          },
          { deep: !0 }
        ),
        (p, d) =>
          r(t)
            ? (a(),
              u(
                'aside',
                {
                  key: 0,
                  class: N(['VPSidebar', { open: p.open }]),
                  ref_key: 'navEl',
                  ref: n,
                  onClick: d[0] || (d[0] = We(() => {}, ['stop'])),
                },
                [
                  d[2] || (d[2] = v('div', { class: 'curtain' }, null, -1)),
                  v('nav', ga, [
                    d[1] ||
                      (d[1] = v(
                        'span',
                        { class: 'visually-hidden', id: 'sidebar-aria-label' },
                        ' Sidebar Navigation ',
                        -1
                      )),
                    c(p.$slots, 'sidebar-nav-before', {}, void 0, !0),
                    (a(),
                    k(ba, { items: r(e), key: l.value }, null, 8, ['items'])),
                    c(p.$slots, 'sidebar-nav-after', {}, void 0, !0),
                  ]),
                ],
                2
              ))
            : h('', !0)
      );
    },
  }),
  ya = b($a, [['__scopeId', 'data-v-319d5ca6']]),
  Pa = m({
    __name: 'VPSkipLink',
    setup(s) {
      const { theme: e } = P(),
        t = Z(),
        o = T();
      D(
        () => t.path,
        () => o.value.focus()
      );
      function n({ target: i }) {
        const l = document.getElementById(decodeURIComponent(i.hash).slice(1));
        if (l) {
          const p = () => {
            l.removeAttribute('tabindex'), l.removeEventListener('blur', p);
          };
          l.setAttribute('tabindex', '-1'),
            l.addEventListener('blur', p),
            l.focus(),
            window.scrollTo(0, 0);
        }
      }
      return (i, l) => (
        a(),
        u(
          w,
          null,
          [
            v(
              'span',
              { ref_key: 'backToTop', ref: o, tabindex: '-1' },
              null,
              512
            ),
            v(
              'a',
              {
                href: '#VPContent',
                class: 'VPSkipLink visually-hidden',
                onClick: n,
              },
              M(r(e).skipToContentLabel || 'Skip to content'),
              1
            ),
          ],
          64
        )
      );
    },
  }),
  La = b(Pa, [['__scopeId', 'data-v-0b0ada53']]),
  Va = m({
    __name: 'Layout',
    setup(s) {
      const { isOpen: e, open: t, close: o } = O(),
        n = Z();
      D(() => n.path, o), lt(e, o);
      const { frontmatter: i } = P(),
        l = qe(),
        p = $(() => !!l['home-hero-image']);
      return (
        Se('hero-image-slot-exists', p),
        (d, y) => {
          const L = q('Content');
          return r(i).layout !== !1
            ? (a(),
              u(
                'div',
                { key: 0, class: N(['Layout', r(i).pageClass]) },
                [
                  c(d.$slots, 'layout-top', {}, void 0, !0),
                  _(La),
                  _(
                    Ye,
                    { class: 'backdrop', show: r(e), onClick: r(o) },
                    null,
                    8,
                    ['show', 'onClick']
                  ),
                  _(pa, null, {
                    'nav-bar-title-before': f(() => [
                      c(d.$slots, 'nav-bar-title-before', {}, void 0, !0),
                    ]),
                    'nav-bar-title-after': f(() => [
                      c(d.$slots, 'nav-bar-title-after', {}, void 0, !0),
                    ]),
                    'nav-bar-content-before': f(() => [
                      c(d.$slots, 'nav-bar-content-before', {}, void 0, !0),
                    ]),
                    'nav-bar-content-after': f(() => [
                      c(d.$slots, 'nav-bar-content-after', {}, void 0, !0),
                    ]),
                    'nav-screen-content-before': f(() => [
                      c(d.$slots, 'nav-screen-content-before', {}, void 0, !0),
                    ]),
                    'nav-screen-content-after': f(() => [
                      c(d.$slots, 'nav-screen-content-after', {}, void 0, !0),
                    ]),
                    _: 3,
                  }),
                  _(ao, { open: r(e), onOpenMenu: r(t) }, null, 8, [
                    'open',
                    'onOpenMenu',
                  ]),
                  _(
                    ya,
                    { open: r(e) },
                    {
                      'sidebar-nav-before': f(() => [
                        c(d.$slots, 'sidebar-nav-before', {}, void 0, !0),
                      ]),
                      'sidebar-nav-after': f(() => [
                        c(d.$slots, 'sidebar-nav-after', {}, void 0, !0),
                      ]),
                      _: 3,
                    },
                    8,
                    ['open']
                  ),
                  _(zn, null, {
                    'page-top': f(() => [
                      c(d.$slots, 'page-top', {}, void 0, !0),
                    ]),
                    'page-bottom': f(() => [
                      c(d.$slots, 'page-bottom', {}, void 0, !0),
                    ]),
                    'not-found': f(() => [
                      c(d.$slots, 'not-found', {}, void 0, !0),
                    ]),
                    'home-hero-before': f(() => [
                      c(d.$slots, 'home-hero-before', {}, void 0, !0),
                    ]),
                    'home-hero-info-before': f(() => [
                      c(d.$slots, 'home-hero-info-before', {}, void 0, !0),
                    ]),
                    'home-hero-info': f(() => [
                      c(d.$slots, 'home-hero-info', {}, void 0, !0),
                    ]),
                    'home-hero-info-after': f(() => [
                      c(d.$slots, 'home-hero-info-after', {}, void 0, !0),
                    ]),
                    'home-hero-actions-after': f(() => [
                      c(d.$slots, 'home-hero-actions-after', {}, void 0, !0),
                    ]),
                    'home-hero-image': f(() => [
                      c(d.$slots, 'home-hero-image', {}, void 0, !0),
                    ]),
                    'home-hero-after': f(() => [
                      c(d.$slots, 'home-hero-after', {}, void 0, !0),
                    ]),
                    'home-features-before': f(() => [
                      c(d.$slots, 'home-features-before', {}, void 0, !0),
                    ]),
                    'home-features-after': f(() => [
                      c(d.$slots, 'home-features-after', {}, void 0, !0),
                    ]),
                    'doc-footer-before': f(() => [
                      c(d.$slots, 'doc-footer-before', {}, void 0, !0),
                    ]),
                    'doc-before': f(() => [
                      c(d.$slots, 'doc-before', {}, void 0, !0),
                    ]),
                    'doc-after': f(() => [
                      c(d.$slots, 'doc-after', {}, void 0, !0),
                    ]),
                    'doc-top': f(() => [
                      c(d.$slots, 'doc-top', {}, void 0, !0),
                    ]),
                    'doc-bottom': f(() => [
                      c(d.$slots, 'doc-bottom', {}, void 0, !0),
                    ]),
                    'aside-top': f(() => [
                      c(d.$slots, 'aside-top', {}, void 0, !0),
                    ]),
                    'aside-bottom': f(() => [
                      c(d.$slots, 'aside-bottom', {}, void 0, !0),
                    ]),
                    'aside-outline-before': f(() => [
                      c(d.$slots, 'aside-outline-before', {}, void 0, !0),
                    ]),
                    'aside-outline-after': f(() => [
                      c(d.$slots, 'aside-outline-after', {}, void 0, !0),
                    ]),
                    'aside-ads-before': f(() => [
                      c(d.$slots, 'aside-ads-before', {}, void 0, !0),
                    ]),
                    'aside-ads-after': f(() => [
                      c(d.$slots, 'aside-ads-after', {}, void 0, !0),
                    ]),
                    _: 3,
                  }),
                  _(Jn),
                  c(d.$slots, 'layout-bottom', {}, void 0, !0),
                ],
                2
              ))
            : (a(), k(L, { key: 1 }));
        }
      );
    },
  }),
  Sa = b(Va, [['__scopeId', 'data-v-5d98c3a5']]),
  Na = {
    Layout: Sa,
    enhanceApp: ({ app: s }) => {
      s.component('Badge', Ke);
    },
  };
export { Na as t };
