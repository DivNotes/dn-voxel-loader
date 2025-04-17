/**
 * @vue/shared v3.5.13
 * (c) 2018-present Yuxi (Evan) You and Vue contributors
 * @license MIT
 **/ /*! #__NO_SIDE_EFFECTS__ */ function Os(e) {
  const t = Object.create(null);
  for (const n of e.split(',')) t[n] = 1;
  return (n) => n in t;
}
const ne = {},
  At = [],
  ke = () => {},
  Ao = () => !1,
  Qt = (e) =>
    e.charCodeAt(0) === 111 &&
    e.charCodeAt(1) === 110 &&
    (e.charCodeAt(2) > 122 || e.charCodeAt(2) < 97),
  Ms = (e) => e.startsWith('onUpdate:'),
  ue = Object.assign,
  Is = (e, t) => {
    const n = e.indexOf(t);
    n > -1 && e.splice(n, 1);
  },
  Ro = Object.prototype.hasOwnProperty,
  Q = (e, t) => Ro.call(e, t),
  B = Array.isArray,
  Rt = (e) => Rn(e) === '[object Map]',
  Br = (e) => Rn(e) === '[object Set]',
  G = (e) => typeof e == 'function',
  oe = (e) => typeof e == 'string',
  Ye = (e) => typeof e == 'symbol',
  se = (e) => e !== null && typeof e == 'object',
  Kr = (e) => (se(e) || G(e)) && G(e.then) && G(e.catch),
  qr = Object.prototype.toString,
  Rn = (e) => qr.call(e),
  Oo = (e) => Rn(e).slice(8, -1),
  Gr = (e) => Rn(e) === '[object Object]',
  Ps = (e) =>
    oe(e) && e !== 'NaN' && e[0] !== '-' && '' + parseInt(e, 10) === e,
  Ot = Os(
    ',key,ref,ref_for,ref_key,onVnodeBeforeMount,onVnodeMounted,onVnodeBeforeUpdate,onVnodeUpdated,onVnodeBeforeUnmount,onVnodeUnmounted'
  ),
  On = (e) => {
    const t = Object.create(null);
    return (n) => t[n] || (t[n] = e(n));
  },
  Mo = /-(\w)/g,
  Ne = On((e) => e.replace(Mo, (t, n) => (n ? n.toUpperCase() : ''))),
  Io = /\B([A-Z])/g,
  rt = On((e) => e.replace(Io, '-$1').toLowerCase()),
  Mn = On((e) => e.charAt(0).toUpperCase() + e.slice(1)),
  mn = On((e) => (e ? `on${Mn(e)}` : '')),
  nt = (e, t) => !Object.is(e, t),
  qn = (e, ...t) => {
    for (let n = 0; n < e.length; n++) e[n](...t);
  },
  Xr = (e, t, n, s = !1) => {
    Object.defineProperty(e, t, {
      configurable: !0,
      enumerable: !1,
      writable: s,
      value: n,
    });
  },
  Po = (e) => {
    const t = parseFloat(e);
    return isNaN(t) ? e : t;
  },
  Lo = (e) => {
    const t = oe(e) ? Number(e) : NaN;
    return isNaN(t) ? e : t;
  };
let Zs;
const In = () =>
  Zs ||
  (Zs =
    typeof globalThis < 'u'
      ? globalThis
      : typeof self < 'u'
        ? self
        : typeof window < 'u'
          ? window
          : typeof global < 'u'
            ? global
            : {});
function Ls(e) {
  if (B(e)) {
    const t = {};
    for (let n = 0; n < e.length; n++) {
      const s = e[n],
        r = oe(s) ? Do(s) : Ls(s);
      if (r) for (const i in r) t[i] = r[i];
    }
    return t;
  } else if (oe(e) || se(e)) return e;
}
const No = /;(?![^(]*\))/g,
  Fo = /:([^]+)/,
  Ho = /\/\*[^]*?\*\//g;
function Do(e) {
  const t = {};
  return (
    e
      .replace(Ho, '')
      .split(No)
      .forEach((n) => {
        if (n) {
          const s = n.split(Fo);
          s.length > 1 && (t[s[0].trim()] = s[1].trim());
        }
      }),
    t
  );
}
function Ns(e) {
  let t = '';
  if (oe(e)) t = e;
  else if (B(e))
    for (let n = 0; n < e.length; n++) {
      const s = Ns(e[n]);
      s && (t += s + ' ');
    }
  else if (se(e)) for (const n in e) e[n] && (t += n + ' ');
  return t.trim();
}
const $o =
    'itemscope,allowfullscreen,formnovalidate,ismap,nomodule,novalidate,readonly',
  jo = Os($o);
function Yr(e) {
  return !!e || e === '';
}
const zr = (e) => !!(e && e.__v_isRef === !0),
  Vo = (e) =>
    oe(e)
      ? e
      : e == null
        ? ''
        : B(e) || (se(e) && (e.toString === qr || !G(e.toString)))
          ? zr(e)
            ? Vo(e.value)
            : JSON.stringify(e, Jr, 2)
          : String(e),
  Jr = (e, t) =>
    zr(t)
      ? Jr(e, t.value)
      : Rt(t)
        ? {
            [`Map(${t.size})`]: [...t.entries()].reduce(
              (n, [s, r], i) => ((n[Gn(s, i) + ' =>'] = r), n),
              {}
            ),
          }
        : Br(t)
          ? { [`Set(${t.size})`]: [...t.values()].map((n) => Gn(n)) }
          : Ye(t)
            ? Gn(t)
            : se(t) && !B(t) && !Gr(t)
              ? String(t)
              : t,
  Gn = (e, t = '') => {
    var n;
    return Ye(e) ? `Symbol(${(n = e.description) != null ? n : t})` : e;
  };
/**
 * @vue/reactivity v3.5.13
 * (c) 2018-present Yuxi (Evan) You and Vue contributors
 * @license MIT
 **/ let _e;
class Wo {
  constructor(t = !1) {
    (this.detached = t),
      (this._active = !0),
      (this.effects = []),
      (this.cleanups = []),
      (this._isPaused = !1),
      (this.parent = _e),
      !t && _e && (this.index = (_e.scopes || (_e.scopes = [])).push(this) - 1);
  }
  get active() {
    return this._active;
  }
  pause() {
    if (this._active) {
      this._isPaused = !0;
      let t, n;
      if (this.scopes)
        for (t = 0, n = this.scopes.length; t < n; t++) this.scopes[t].pause();
      for (t = 0, n = this.effects.length; t < n; t++) this.effects[t].pause();
    }
  }
  resume() {
    if (this._active && this._isPaused) {
      this._isPaused = !1;
      let t, n;
      if (this.scopes)
        for (t = 0, n = this.scopes.length; t < n; t++) this.scopes[t].resume();
      for (t = 0, n = this.effects.length; t < n; t++) this.effects[t].resume();
    }
  }
  run(t) {
    if (this._active) {
      const n = _e;
      try {
        return (_e = this), t();
      } finally {
        _e = n;
      }
    }
  }
  on() {
    _e = this;
  }
  off() {
    _e = this.parent;
  }
  stop(t) {
    if (this._active) {
      this._active = !1;
      let n, s;
      for (n = 0, s = this.effects.length; n < s; n++) this.effects[n].stop();
      for (this.effects.length = 0, n = 0, s = this.cleanups.length; n < s; n++)
        this.cleanups[n]();
      if (((this.cleanups.length = 0), this.scopes)) {
        for (n = 0, s = this.scopes.length; n < s; n++) this.scopes[n].stop(!0);
        this.scopes.length = 0;
      }
      if (!this.detached && this.parent && !t) {
        const r = this.parent.scopes.pop();
        r &&
          r !== this &&
          ((this.parent.scopes[this.index] = r), (r.index = this.index));
      }
      this.parent = void 0;
    }
  }
}
function Qr() {
  return _e;
}
function ko(e, t = !1) {
  _e && _e.cleanups.push(e);
}
let te;
const Xn = new WeakSet();
class Zr {
  constructor(t) {
    (this.fn = t),
      (this.deps = void 0),
      (this.depsTail = void 0),
      (this.flags = 5),
      (this.next = void 0),
      (this.cleanup = void 0),
      (this.scheduler = void 0),
      _e && _e.active && _e.effects.push(this);
  }
  pause() {
    this.flags |= 64;
  }
  resume() {
    this.flags & 64 &&
      ((this.flags &= -65), Xn.has(this) && (Xn.delete(this), this.trigger()));
  }
  notify() {
    (this.flags & 2 && !(this.flags & 32)) || this.flags & 8 || ti(this);
  }
  run() {
    if (!(this.flags & 1)) return this.fn();
    (this.flags |= 2), er(this), ni(this);
    const t = te,
      n = He;
    (te = this), (He = !0);
    try {
      return this.fn();
    } finally {
      si(this), (te = t), (He = n), (this.flags &= -3);
    }
  }
  stop() {
    if (this.flags & 1) {
      for (let t = this.deps; t; t = t.nextDep) Ds(t);
      (this.deps = this.depsTail = void 0),
        er(this),
        this.onStop && this.onStop(),
        (this.flags &= -2);
    }
  }
  trigger() {
    this.flags & 64
      ? Xn.add(this)
      : this.scheduler
        ? this.scheduler()
        : this.runIfDirty();
  }
  runIfDirty() {
    gs(this) && this.run();
  }
  get dirty() {
    return gs(this);
  }
}
let ei = 0,
  $t,
  jt;
function ti(e, t = !1) {
  if (((e.flags |= 8), t)) {
    (e.next = jt), (jt = e);
    return;
  }
  (e.next = $t), ($t = e);
}
function Fs() {
  ei++;
}
function Hs() {
  if (--ei > 0) return;
  if (jt) {
    let t = jt;
    for (jt = void 0; t; ) {
      const n = t.next;
      (t.next = void 0), (t.flags &= -9), (t = n);
    }
  }
  let e;
  for (; $t; ) {
    let t = $t;
    for ($t = void 0; t; ) {
      const n = t.next;
      if (((t.next = void 0), (t.flags &= -9), t.flags & 1))
        try {
          t.trigger();
        } catch (s) {
          e || (e = s);
        }
      t = n;
    }
  }
  if (e) throw e;
}
function ni(e) {
  for (let t = e.deps; t; t = t.nextDep)
    (t.version = -1),
      (t.prevActiveLink = t.dep.activeLink),
      (t.dep.activeLink = t);
}
function si(e) {
  let t,
    n = e.depsTail,
    s = n;
  for (; s; ) {
    const r = s.prevDep;
    s.version === -1 ? (s === n && (n = r), Ds(s), Uo(s)) : (t = s),
      (s.dep.activeLink = s.prevActiveLink),
      (s.prevActiveLink = void 0),
      (s = r);
  }
  (e.deps = t), (e.depsTail = n);
}
function gs(e) {
  for (let t = e.deps; t; t = t.nextDep)
    if (
      t.dep.version !== t.version ||
      (t.dep.computed && (ri(t.dep.computed) || t.dep.version !== t.version))
    )
      return !0;
  return !!e._dirty;
}
function ri(e) {
  if (
    (e.flags & 4 && !(e.flags & 16)) ||
    ((e.flags &= -17), e.globalVersion === Ut)
  )
    return;
  e.globalVersion = Ut;
  const t = e.dep;
  if (((e.flags |= 2), t.version > 0 && !e.isSSR && e.deps && !gs(e))) {
    e.flags &= -3;
    return;
  }
  const n = te,
    s = He;
  (te = e), (He = !0);
  try {
    ni(e);
    const r = e.fn(e._value);
    (t.version === 0 || nt(r, e._value)) && ((e._value = r), t.version++);
  } catch (r) {
    throw (t.version++, r);
  } finally {
    (te = n), (He = s), si(e), (e.flags &= -3);
  }
}
function Ds(e, t = !1) {
  const { dep: n, prevSub: s, nextSub: r } = e;
  if (
    (s && ((s.nextSub = r), (e.prevSub = void 0)),
    r && ((r.prevSub = s), (e.nextSub = void 0)),
    n.subs === e && ((n.subs = s), !s && n.computed))
  ) {
    n.computed.flags &= -5;
    for (let i = n.computed.deps; i; i = i.nextDep) Ds(i, !0);
  }
  !t && !--n.sc && n.map && n.map.delete(n.key);
}
function Uo(e) {
  const { prevDep: t, nextDep: n } = e;
  t && ((t.nextDep = n), (e.prevDep = void 0)),
    n && ((n.prevDep = t), (e.nextDep = void 0));
}
let He = !0;
const ii = [];
function it() {
  ii.push(He), (He = !1);
}
function ot() {
  const e = ii.pop();
  He = e === void 0 ? !0 : e;
}
function er(e) {
  const { cleanup: t } = e;
  if (((e.cleanup = void 0), t)) {
    const n = te;
    te = void 0;
    try {
      t();
    } finally {
      te = n;
    }
  }
}
let Ut = 0;
class Bo {
  constructor(t, n) {
    (this.sub = t),
      (this.dep = n),
      (this.version = n.version),
      (this.nextDep =
        this.prevDep =
        this.nextSub =
        this.prevSub =
        this.prevActiveLink =
          void 0);
  }
}
class Pn {
  constructor(t) {
    (this.computed = t),
      (this.version = 0),
      (this.activeLink = void 0),
      (this.subs = void 0),
      (this.map = void 0),
      (this.key = void 0),
      (this.sc = 0);
  }
  track(t) {
    if (!te || !He || te === this.computed) return;
    let n = this.activeLink;
    if (n === void 0 || n.sub !== te)
      (n = this.activeLink = new Bo(te, this)),
        te.deps
          ? ((n.prevDep = te.depsTail),
            (te.depsTail.nextDep = n),
            (te.depsTail = n))
          : (te.deps = te.depsTail = n),
        oi(n);
    else if (n.version === -1 && ((n.version = this.version), n.nextDep)) {
      const s = n.nextDep;
      (s.prevDep = n.prevDep),
        n.prevDep && (n.prevDep.nextDep = s),
        (n.prevDep = te.depsTail),
        (n.nextDep = void 0),
        (te.depsTail.nextDep = n),
        (te.depsTail = n),
        te.deps === n && (te.deps = s);
    }
    return n;
  }
  trigger(t) {
    this.version++, Ut++, this.notify(t);
  }
  notify(t) {
    Fs();
    try {
      for (let n = this.subs; n; n = n.prevSub)
        n.sub.notify() && n.sub.dep.notify();
    } finally {
      Hs();
    }
  }
}
function oi(e) {
  if ((e.dep.sc++, e.sub.flags & 4)) {
    const t = e.dep.computed;
    if (t && !e.dep.subs) {
      t.flags |= 20;
      for (let s = t.deps; s; s = s.nextDep) oi(s);
    }
    const n = e.dep.subs;
    n !== e && ((e.prevSub = n), n && (n.nextSub = e)), (e.dep.subs = e);
  }
}
const wn = new WeakMap(),
  ht = Symbol(''),
  ms = Symbol(''),
  Bt = Symbol('');
function me(e, t, n) {
  if (He && te) {
    let s = wn.get(e);
    s || wn.set(e, (s = new Map()));
    let r = s.get(n);
    r || (s.set(n, (r = new Pn())), (r.map = s), (r.key = n)), r.track();
  }
}
function qe(e, t, n, s, r, i) {
  const o = wn.get(e);
  if (!o) {
    Ut++;
    return;
  }
  const l = (c) => {
    c && c.trigger();
  };
  if ((Fs(), t === 'clear')) o.forEach(l);
  else {
    const c = B(e),
      f = c && Ps(n);
    if (c && n === 'length') {
      const a = Number(s);
      o.forEach((h, v) => {
        (v === 'length' || v === Bt || (!Ye(v) && v >= a)) && l(h);
      });
    } else
      switch (
        ((n !== void 0 || o.has(void 0)) && l(o.get(n)), f && l(o.get(Bt)), t)
      ) {
        case 'add':
          c ? f && l(o.get('length')) : (l(o.get(ht)), Rt(e) && l(o.get(ms)));
          break;
        case 'delete':
          c || (l(o.get(ht)), Rt(e) && l(o.get(ms)));
          break;
        case 'set':
          Rt(e) && l(o.get(ht));
          break;
      }
  }
  Hs();
}
function Ko(e, t) {
  const n = wn.get(e);
  return n && n.get(t);
}
function Tt(e) {
  const t = J(e);
  return t === e ? t : (me(t, 'iterate', Bt), Ie(e) ? t : t.map(ve));
}
function Ln(e) {
  return me((e = J(e)), 'iterate', Bt), e;
}
const qo = {
  __proto__: null,
  [Symbol.iterator]() {
    return Yn(this, Symbol.iterator, ve);
  },
  concat(...e) {
    return Tt(this).concat(...e.map((t) => (B(t) ? Tt(t) : t)));
  },
  entries() {
    return Yn(this, 'entries', (e) => ((e[1] = ve(e[1])), e));
  },
  every(e, t) {
    return Ue(this, 'every', e, t, void 0, arguments);
  },
  filter(e, t) {
    return Ue(this, 'filter', e, t, (n) => n.map(ve), arguments);
  },
  find(e, t) {
    return Ue(this, 'find', e, t, ve, arguments);
  },
  findIndex(e, t) {
    return Ue(this, 'findIndex', e, t, void 0, arguments);
  },
  findLast(e, t) {
    return Ue(this, 'findLast', e, t, ve, arguments);
  },
  findLastIndex(e, t) {
    return Ue(this, 'findLastIndex', e, t, void 0, arguments);
  },
  forEach(e, t) {
    return Ue(this, 'forEach', e, t, void 0, arguments);
  },
  includes(...e) {
    return zn(this, 'includes', e);
  },
  indexOf(...e) {
    return zn(this, 'indexOf', e);
  },
  join(e) {
    return Tt(this).join(e);
  },
  lastIndexOf(...e) {
    return zn(this, 'lastIndexOf', e);
  },
  map(e, t) {
    return Ue(this, 'map', e, t, void 0, arguments);
  },
  pop() {
    return Ft(this, 'pop');
  },
  push(...e) {
    return Ft(this, 'push', e);
  },
  reduce(e, ...t) {
    return tr(this, 'reduce', e, t);
  },
  reduceRight(e, ...t) {
    return tr(this, 'reduceRight', e, t);
  },
  shift() {
    return Ft(this, 'shift');
  },
  some(e, t) {
    return Ue(this, 'some', e, t, void 0, arguments);
  },
  splice(...e) {
    return Ft(this, 'splice', e);
  },
  toReversed() {
    return Tt(this).toReversed();
  },
  toSorted(e) {
    return Tt(this).toSorted(e);
  },
  toSpliced(...e) {
    return Tt(this).toSpliced(...e);
  },
  unshift(...e) {
    return Ft(this, 'unshift', e);
  },
  values() {
    return Yn(this, 'values', ve);
  },
};
function Yn(e, t, n) {
  const s = Ln(e),
    r = s[t]();
  return (
    s !== e &&
      !Ie(e) &&
      ((r._next = r.next),
      (r.next = () => {
        const i = r._next();
        return i.value && (i.value = n(i.value)), i;
      })),
    r
  );
}
const Go = Array.prototype;
function Ue(e, t, n, s, r, i) {
  const o = Ln(e),
    l = o !== e && !Ie(e),
    c = o[t];
  if (c !== Go[t]) {
    const h = c.apply(e, i);
    return l ? ve(h) : h;
  }
  let f = n;
  o !== e &&
    (l
      ? (f = function (h, v) {
          return n.call(this, ve(h), v, e);
        })
      : n.length > 2 &&
        (f = function (h, v) {
          return n.call(this, h, v, e);
        }));
  const a = c.call(o, f, s);
  return l && r ? r(a) : a;
}
function tr(e, t, n, s) {
  const r = Ln(e);
  let i = n;
  return (
    r !== e &&
      (Ie(e)
        ? n.length > 3 &&
          (i = function (o, l, c) {
            return n.call(this, o, l, c, e);
          })
        : (i = function (o, l, c) {
            return n.call(this, o, ve(l), c, e);
          })),
    r[t](i, ...s)
  );
}
function zn(e, t, n) {
  const s = J(e);
  me(s, 'iterate', Bt);
  const r = s[t](...n);
  return (r === -1 || r === !1) && Vs(n[0])
    ? ((n[0] = J(n[0])), s[t](...n))
    : r;
}
function Ft(e, t, n = []) {
  it(), Fs();
  const s = J(e)[t].apply(e, n);
  return Hs(), ot(), s;
}
const Xo = Os('__proto__,__v_isRef,__isVue'),
  li = new Set(
    Object.getOwnPropertyNames(Symbol)
      .filter((e) => e !== 'arguments' && e !== 'caller')
      .map((e) => Symbol[e])
      .filter(Ye)
  );
function Yo(e) {
  Ye(e) || (e = String(e));
  const t = J(this);
  return me(t, 'has', e), t.hasOwnProperty(e);
}
class ci {
  constructor(t = !1, n = !1) {
    (this._isReadonly = t), (this._isShallow = n);
  }
  get(t, n, s) {
    if (n === '__v_skip') return t.__v_skip;
    const r = this._isReadonly,
      i = this._isShallow;
    if (n === '__v_isReactive') return !r;
    if (n === '__v_isReadonly') return r;
    if (n === '__v_isShallow') return i;
    if (n === '__v_raw')
      return s === (r ? (i ? il : di) : i ? ui : fi).get(t) ||
        Object.getPrototypeOf(t) === Object.getPrototypeOf(s)
        ? t
        : void 0;
    const o = B(t);
    if (!r) {
      let c;
      if (o && (c = qo[n])) return c;
      if (n === 'hasOwnProperty') return Yo;
    }
    const l = Reflect.get(t, n, ae(t) ? t : s);
    return (Ye(n) ? li.has(n) : Xo(n)) || (r || me(t, 'get', n), i)
      ? l
      : ae(l)
        ? o && Ps(n)
          ? l
          : l.value
        : se(l)
          ? r
            ? Nn(l)
            : It(l)
          : l;
  }
}
class ai extends ci {
  constructor(t = !1) {
    super(!1, t);
  }
  set(t, n, s, r) {
    let i = t[n];
    if (!this._isShallow) {
      const c = wt(i);
      if (
        (!Ie(s) && !wt(s) && ((i = J(i)), (s = J(s))), !B(t) && ae(i) && !ae(s))
      )
        return c ? !1 : ((i.value = s), !0);
    }
    const o = B(t) && Ps(n) ? Number(n) < t.length : Q(t, n),
      l = Reflect.set(t, n, s, ae(t) ? t : r);
    return (
      t === J(r) && (o ? nt(s, i) && qe(t, 'set', n, s) : qe(t, 'add', n, s)), l
    );
  }
  deleteProperty(t, n) {
    const s = Q(t, n);
    t[n];
    const r = Reflect.deleteProperty(t, n);
    return r && s && qe(t, 'delete', n, void 0), r;
  }
  has(t, n) {
    const s = Reflect.has(t, n);
    return (!Ye(n) || !li.has(n)) && me(t, 'has', n), s;
  }
  ownKeys(t) {
    return me(t, 'iterate', B(t) ? 'length' : ht), Reflect.ownKeys(t);
  }
}
class zo extends ci {
  constructor(t = !1) {
    super(!0, t);
  }
  set(t, n) {
    return !0;
  }
  deleteProperty(t, n) {
    return !0;
  }
}
const Jo = new ai(),
  Qo = new zo(),
  Zo = new ai(!0);
const vs = (e) => e,
  rn = (e) => Reflect.getPrototypeOf(e);
function el(e, t, n) {
  return function (...s) {
    const r = this.__v_raw,
      i = J(r),
      o = Rt(i),
      l = e === 'entries' || (e === Symbol.iterator && o),
      c = e === 'keys' && o,
      f = r[e](...s),
      a = n ? vs : t ? ys : ve;
    return (
      !t && me(i, 'iterate', c ? ms : ht),
      {
        next() {
          const { value: h, done: v } = f.next();
          return v
            ? { value: h, done: v }
            : { value: l ? [a(h[0]), a(h[1])] : a(h), done: v };
        },
        [Symbol.iterator]() {
          return this;
        },
      }
    );
  };
}
function on(e) {
  return function (...t) {
    return e === 'delete' ? !1 : e === 'clear' ? void 0 : this;
  };
}
function tl(e, t) {
  const n = {
    get(r) {
      const i = this.__v_raw,
        o = J(i),
        l = J(r);
      e || (nt(r, l) && me(o, 'get', r), me(o, 'get', l));
      const { has: c } = rn(o),
        f = t ? vs : e ? ys : ve;
      if (c.call(o, r)) return f(i.get(r));
      if (c.call(o, l)) return f(i.get(l));
      i !== o && i.get(r);
    },
    get size() {
      const r = this.__v_raw;
      return !e && me(J(r), 'iterate', ht), Reflect.get(r, 'size', r);
    },
    has(r) {
      const i = this.__v_raw,
        o = J(i),
        l = J(r);
      return (
        e || (nt(r, l) && me(o, 'has', r), me(o, 'has', l)),
        r === l ? i.has(r) : i.has(r) || i.has(l)
      );
    },
    forEach(r, i) {
      const o = this,
        l = o.__v_raw,
        c = J(l),
        f = t ? vs : e ? ys : ve;
      return (
        !e && me(c, 'iterate', ht),
        l.forEach((a, h) => r.call(i, f(a), f(h), o))
      );
    },
  };
  return (
    ue(
      n,
      e
        ? {
            add: on('add'),
            set: on('set'),
            delete: on('delete'),
            clear: on('clear'),
          }
        : {
            add(r) {
              !t && !Ie(r) && !wt(r) && (r = J(r));
              const i = J(this);
              return (
                rn(i).has.call(i, r) || (i.add(r), qe(i, 'add', r, r)), this
              );
            },
            set(r, i) {
              !t && !Ie(i) && !wt(i) && (i = J(i));
              const o = J(this),
                { has: l, get: c } = rn(o);
              let f = l.call(o, r);
              f || ((r = J(r)), (f = l.call(o, r)));
              const a = c.call(o, r);
              return (
                o.set(r, i),
                f ? nt(i, a) && qe(o, 'set', r, i) : qe(o, 'add', r, i),
                this
              );
            },
            delete(r) {
              const i = J(this),
                { has: o, get: l } = rn(i);
              let c = o.call(i, r);
              c || ((r = J(r)), (c = o.call(i, r))), l && l.call(i, r);
              const f = i.delete(r);
              return c && qe(i, 'delete', r, void 0), f;
            },
            clear() {
              const r = J(this),
                i = r.size !== 0,
                o = r.clear();
              return i && qe(r, 'clear', void 0, void 0), o;
            },
          }
    ),
    ['keys', 'values', 'entries', Symbol.iterator].forEach((r) => {
      n[r] = el(r, e, t);
    }),
    n
  );
}
function $s(e, t) {
  const n = tl(e, t);
  return (s, r, i) =>
    r === '__v_isReactive'
      ? !e
      : r === '__v_isReadonly'
        ? e
        : r === '__v_raw'
          ? s
          : Reflect.get(Q(n, r) && r in s ? n : s, r, i);
}
const nl = { get: $s(!1, !1) },
  sl = { get: $s(!1, !0) },
  rl = { get: $s(!0, !1) };
const fi = new WeakMap(),
  ui = new WeakMap(),
  di = new WeakMap(),
  il = new WeakMap();
function ol(e) {
  switch (e) {
    case 'Object':
    case 'Array':
      return 1;
    case 'Map':
    case 'Set':
    case 'WeakMap':
    case 'WeakSet':
      return 2;
    default:
      return 0;
  }
}
function ll(e) {
  return e.__v_skip || !Object.isExtensible(e) ? 0 : ol(Oo(e));
}
function It(e) {
  return wt(e) ? e : js(e, !1, Jo, nl, fi);
}
function cl(e) {
  return js(e, !1, Zo, sl, ui);
}
function Nn(e) {
  return js(e, !0, Qo, rl, di);
}
function js(e, t, n, s, r) {
  if (!se(e) || (e.__v_raw && !(t && e.__v_isReactive))) return e;
  const i = r.get(e);
  if (i) return i;
  const o = ll(e);
  if (o === 0) return e;
  const l = new Proxy(e, o === 2 ? s : n);
  return r.set(e, l), l;
}
function pt(e) {
  return wt(e) ? pt(e.__v_raw) : !!(e && e.__v_isReactive);
}
function wt(e) {
  return !!(e && e.__v_isReadonly);
}
function Ie(e) {
  return !!(e && e.__v_isShallow);
}
function Vs(e) {
  return e ? !!e.__v_raw : !1;
}
function J(e) {
  const t = e && e.__v_raw;
  return t ? J(t) : e;
}
function vn(e) {
  return (
    !Q(e, '__v_skip') && Object.isExtensible(e) && Xr(e, '__v_skip', !0), e
  );
}
const ve = (e) => (se(e) ? It(e) : e),
  ys = (e) => (se(e) ? Nn(e) : e);
function ae(e) {
  return e ? e.__v_isRef === !0 : !1;
}
function gt(e) {
  return hi(e, !1);
}
function Pe(e) {
  return hi(e, !0);
}
function hi(e, t) {
  return ae(e) ? e : new al(e, t);
}
class al {
  constructor(t, n) {
    (this.dep = new Pn()),
      (this.__v_isRef = !0),
      (this.__v_isShallow = !1),
      (this._rawValue = n ? t : J(t)),
      (this._value = n ? t : ve(t)),
      (this.__v_isShallow = n);
  }
  get value() {
    return this.dep.track(), this._value;
  }
  set value(t) {
    const n = this._rawValue,
      s = this.__v_isShallow || Ie(t) || wt(t);
    (t = s ? t : J(t)),
      nt(t, n) &&
        ((this._rawValue = t),
        (this._value = s ? t : ve(t)),
        this.dep.trigger());
  }
}
function Ws(e) {
  return ae(e) ? e.value : e;
}
function le(e) {
  return G(e) ? e() : Ws(e);
}
const fl = {
  get: (e, t, n) => (t === '__v_raw' ? e : Ws(Reflect.get(e, t, n))),
  set: (e, t, n, s) => {
    const r = e[t];
    return ae(r) && !ae(n) ? ((r.value = n), !0) : Reflect.set(e, t, n, s);
  },
};
function pi(e) {
  return pt(e) ? e : new Proxy(e, fl);
}
class ul {
  constructor(t) {
    (this.__v_isRef = !0), (this._value = void 0);
    const n = (this.dep = new Pn()),
      { get: s, set: r } = t(n.track.bind(n), n.trigger.bind(n));
    (this._get = s), (this._set = r);
  }
  get value() {
    return (this._value = this._get());
  }
  set value(t) {
    this._set(t);
  }
}
function dl(e) {
  return new ul(e);
}
class hl {
  constructor(t, n, s) {
    (this._object = t),
      (this._key = n),
      (this._defaultValue = s),
      (this.__v_isRef = !0),
      (this._value = void 0);
  }
  get value() {
    const t = this._object[this._key];
    return (this._value = t === void 0 ? this._defaultValue : t);
  }
  set value(t) {
    this._object[this._key] = t;
  }
  get dep() {
    return Ko(J(this._object), this._key);
  }
}
class pl {
  constructor(t) {
    (this._getter = t),
      (this.__v_isRef = !0),
      (this.__v_isReadonly = !0),
      (this._value = void 0);
  }
  get value() {
    return (this._value = this._getter());
  }
}
function gl(e, t, n) {
  return ae(e)
    ? e
    : G(e)
      ? new pl(e)
      : se(e) && arguments.length > 1
        ? ml(e, t, n)
        : gt(e);
}
function ml(e, t, n) {
  const s = e[t];
  return ae(s) ? s : new hl(e, t, n);
}
class vl {
  constructor(t, n, s) {
    (this.fn = t),
      (this.setter = n),
      (this._value = void 0),
      (this.dep = new Pn(this)),
      (this.__v_isRef = !0),
      (this.deps = void 0),
      (this.depsTail = void 0),
      (this.flags = 16),
      (this.globalVersion = Ut - 1),
      (this.next = void 0),
      (this.effect = this),
      (this.__v_isReadonly = !n),
      (this.isSSR = s);
  }
  notify() {
    if (((this.flags |= 16), !(this.flags & 8) && te !== this))
      return ti(this, !0), !0;
  }
  get value() {
    const t = this.dep.track();
    return ri(this), t && (t.version = this.dep.version), this._value;
  }
  set value(t) {
    this.setter && this.setter(t);
  }
}
function yl(e, t, n = !1) {
  let s, r;
  return G(e) ? (s = e) : ((s = e.get), (r = e.set)), new vl(s, r, n);
}
const ln = {},
  Sn = new WeakMap();
let ut;
function bl(e, t = !1, n = ut) {
  if (n) {
    let s = Sn.get(n);
    s || Sn.set(n, (s = [])), s.push(e);
  }
}
function _l(e, t, n = ne) {
  const {
      immediate: s,
      deep: r,
      once: i,
      scheduler: o,
      augmentJob: l,
      call: c,
    } = n,
    f = (g) => (r ? g : Ie(g) || r === !1 || r === 0 ? tt(g, 1) : tt(g));
  let a,
    h,
    v,
    y,
    A = !1,
    P = !1;
  if (
    (ae(e)
      ? ((h = () => e.value), (A = Ie(e)))
      : pt(e)
        ? ((h = () => f(e)), (A = !0))
        : B(e)
          ? ((P = !0),
            (A = e.some((g) => pt(g) || Ie(g))),
            (h = () =>
              e.map((g) => {
                if (ae(g)) return g.value;
                if (pt(g)) return f(g);
                if (G(g)) return c ? c(g, 2) : g();
              })))
          : G(e)
            ? t
              ? (h = c ? () => c(e, 2) : e)
              : (h = () => {
                  if (v) {
                    it();
                    try {
                      v();
                    } finally {
                      ot();
                    }
                  }
                  const g = ut;
                  ut = a;
                  try {
                    return c ? c(e, 3, [y]) : e(y);
                  } finally {
                    ut = g;
                  }
                })
            : (h = ke),
    t && r)
  ) {
    const g = h,
      M = r === !0 ? 1 / 0 : r;
    h = () => tt(g(), M);
  }
  const K = Qr(),
    H = () => {
      a.stop(), K && K.active && Is(K.effects, a);
    };
  if (i && t) {
    const g = t;
    t = (...M) => {
      g(...M), H();
    };
  }
  let W = P ? new Array(e.length).fill(ln) : ln;
  const p = (g) => {
    if (!(!(a.flags & 1) || (!a.dirty && !g)))
      if (t) {
        const M = a.run();
        if (r || A || (P ? M.some((V, R) => nt(V, W[R])) : nt(M, W))) {
          v && v();
          const V = ut;
          ut = a;
          try {
            const R = [M, W === ln ? void 0 : P && W[0] === ln ? [] : W, y];
            c ? c(t, 3, R) : t(...R), (W = M);
          } finally {
            ut = V;
          }
        }
      } else a.run();
  };
  return (
    l && l(p),
    (a = new Zr(h)),
    (a.scheduler = o ? () => o(p, !1) : p),
    (y = (g) => bl(g, !1, a)),
    (v = a.onStop =
      () => {
        const g = Sn.get(a);
        if (g) {
          if (c) c(g, 4);
          else for (const M of g) M();
          Sn.delete(a);
        }
      }),
    t ? (s ? p(!0) : (W = a.run())) : o ? o(p.bind(null, !0), !0) : a.run(),
    (H.pause = a.pause.bind(a)),
    (H.resume = a.resume.bind(a)),
    (H.stop = H),
    H
  );
}
function tt(e, t = 1 / 0, n) {
  if (t <= 0 || !se(e) || e.__v_skip || ((n = n || new Set()), n.has(e)))
    return e;
  if ((n.add(e), t--, ae(e))) tt(e.value, t, n);
  else if (B(e)) for (let s = 0; s < e.length; s++) tt(e[s], t, n);
  else if (Br(e) || Rt(e))
    e.forEach((s) => {
      tt(s, t, n);
    });
  else if (Gr(e)) {
    for (const s in e) tt(e[s], t, n);
    for (const s of Object.getOwnPropertySymbols(e))
      Object.prototype.propertyIsEnumerable.call(e, s) && tt(e[s], t, n);
  }
  return e;
}
/**
 * @vue/runtime-core v3.5.13
 * (c) 2018-present Yuxi (Evan) You and Vue contributors
 * @license MIT
 **/ function Zt(e, t, n, s) {
  try {
    return s ? e(...s) : e();
  } catch (r) {
    Fn(r, t, n);
  }
}
function De(e, t, n, s) {
  if (G(e)) {
    const r = Zt(e, t, n, s);
    return (
      r &&
        Kr(r) &&
        r.catch((i) => {
          Fn(i, t, n);
        }),
      r
    );
  }
  if (B(e)) {
    const r = [];
    for (let i = 0; i < e.length; i++) r.push(De(e[i], t, n, s));
    return r;
  }
}
function Fn(e, t, n, s = !0) {
  const r = t ? t.vnode : null,
    { errorHandler: i, throwUnhandledErrorInProduction: o } =
      (t && t.appContext.config) || ne;
  if (t) {
    let l = t.parent;
    const c = t.proxy,
      f = `https://vuejs.org/error-reference/#runtime-${n}`;
    for (; l; ) {
      const a = l.ec;
      if (a) {
        for (let h = 0; h < a.length; h++) if (a[h](e, c, f) === !1) return;
      }
      l = l.parent;
    }
    if (i) {
      it(), Zt(i, null, 10, [e, c, f]), ot();
      return;
    }
  }
  wl(e, n, r, s, o);
}
function wl(e, t, n, s = !0, r = !1) {
  if (r) throw e;
  console.error(e);
}
const we = [];
let Ve = -1;
const Mt = [];
let Qe = null,
  Ct = 0;
const gi = Promise.resolve();
let xn = null;
function Hn(e) {
  const t = xn || gi;
  return e ? t.then(this ? e.bind(this) : e) : t;
}
function Sl(e) {
  let t = Ve + 1,
    n = we.length;
  for (; t < n; ) {
    const s = (t + n) >>> 1,
      r = we[s],
      i = Kt(r);
    i < e || (i === e && r.flags & 2) ? (t = s + 1) : (n = s);
  }
  return t;
}
function ks(e) {
  if (!(e.flags & 1)) {
    const t = Kt(e),
      n = we[we.length - 1];
    !n || (!(e.flags & 2) && t >= Kt(n)) ? we.push(e) : we.splice(Sl(t), 0, e),
      (e.flags |= 1),
      mi();
  }
}
function mi() {
  xn || (xn = gi.then(vi));
}
function xl(e) {
  B(e)
    ? Mt.push(...e)
    : Qe && e.id === -1
      ? Qe.splice(Ct + 1, 0, e)
      : e.flags & 1 || (Mt.push(e), (e.flags |= 1)),
    mi();
}
function nr(e, t, n = Ve + 1) {
  for (; n < we.length; n++) {
    const s = we[n];
    if (s && s.flags & 2) {
      if (e && s.id !== e.uid) continue;
      we.splice(n, 1),
        n--,
        s.flags & 4 && (s.flags &= -2),
        s(),
        s.flags & 4 || (s.flags &= -2);
    }
  }
}
function Tn(e) {
  if (Mt.length) {
    const t = [...new Set(Mt)].sort((n, s) => Kt(n) - Kt(s));
    if (((Mt.length = 0), Qe)) {
      Qe.push(...t);
      return;
    }
    for (Qe = t, Ct = 0; Ct < Qe.length; Ct++) {
      const n = Qe[Ct];
      n.flags & 4 && (n.flags &= -2), n.flags & 8 || n(), (n.flags &= -2);
    }
    (Qe = null), (Ct = 0);
  }
}
const Kt = (e) => (e.id == null ? (e.flags & 2 ? -1 : 1 / 0) : e.id);
function vi(e) {
  try {
    for (Ve = 0; Ve < we.length; Ve++) {
      const t = we[Ve];
      t &&
        !(t.flags & 8) &&
        (t.flags & 4 && (t.flags &= -2),
        Zt(t, t.i, t.i ? 15 : 14),
        t.flags & 4 || (t.flags &= -2));
    }
  } finally {
    for (; Ve < we.length; Ve++) {
      const t = we[Ve];
      t && (t.flags &= -2);
    }
    (Ve = -1),
      (we.length = 0),
      Tn(),
      (xn = null),
      (we.length || Mt.length) && vi();
  }
}
let de = null,
  yi = null;
function En(e) {
  const t = de;
  return (de = e), (yi = (e && e.type.__scopeId) || null), t;
}
function Tl(e, t = de, n) {
  if (!t || e._n) return e;
  const s = (...r) => {
    s._d && pr(-1);
    const i = En(t);
    let o;
    try {
      o = e(...r);
    } finally {
      En(i), s._d && pr(1);
    }
    return o;
  };
  return (s._n = !0), (s._c = !0), (s._d = !0), s;
}
function We(e, t, n, s) {
  const r = e.dirs,
    i = t && t.dirs;
  for (let o = 0; o < r.length; o++) {
    const l = r[o];
    i && (l.oldValue = i[o].value);
    let c = l.dir[s];
    c && (it(), De(c, n, 8, [e.el, l, e, t]), ot());
  }
}
const El = Symbol('_vte'),
  bi = (e) => e.__isTeleport,
  Ze = Symbol('_leaveCb'),
  cn = Symbol('_enterCb');
function Cl() {
  const e = {
    isMounted: !1,
    isLeaving: !1,
    isUnmounting: !1,
    leavingVNodes: new Map(),
  };
  return (
    Pt(() => {
      e.isMounted = !0;
    }),
    Ri(() => {
      e.isUnmounting = !0;
    }),
    e
  );
}
const Re = [Function, Array],
  _i = {
    mode: String,
    appear: Boolean,
    persisted: Boolean,
    onBeforeEnter: Re,
    onEnter: Re,
    onAfterEnter: Re,
    onEnterCancelled: Re,
    onBeforeLeave: Re,
    onLeave: Re,
    onAfterLeave: Re,
    onLeaveCancelled: Re,
    onBeforeAppear: Re,
    onAppear: Re,
    onAfterAppear: Re,
    onAppearCancelled: Re,
  },
  wi = (e) => {
    const t = e.subTree;
    return t.component ? wi(t.component) : t;
  },
  Al = {
    name: 'BaseTransition',
    props: _i,
    setup(e, { slots: t }) {
      const n = en(),
        s = Cl();
      return () => {
        const r = t.default && Ti(t.default(), !0);
        if (!r || !r.length) return;
        const i = Si(r),
          o = J(e),
          { mode: l } = o;
        if (s.isLeaving) return Jn(i);
        const c = sr(i);
        if (!c) return Jn(i);
        let f = bs(c, o, s, n, (h) => (f = h));
        c.type !== ye && qt(c, f);
        let a = n.subTree && sr(n.subTree);
        if (a && a.type !== ye && !dt(c, a) && wi(n).type !== ye) {
          let h = bs(a, o, s, n);
          if ((qt(a, h), l === 'out-in' && c.type !== ye))
            return (
              (s.isLeaving = !0),
              (h.afterLeave = () => {
                (s.isLeaving = !1),
                  n.job.flags & 8 || n.update(),
                  delete h.afterLeave,
                  (a = void 0);
              }),
              Jn(i)
            );
          l === 'in-out' && c.type !== ye
            ? (h.delayLeave = (v, y, A) => {
                const P = xi(s, a);
                (P[String(a.key)] = a),
                  (v[Ze] = () => {
                    y(), (v[Ze] = void 0), delete f.delayedLeave, (a = void 0);
                  }),
                  (f.delayedLeave = () => {
                    A(), delete f.delayedLeave, (a = void 0);
                  });
              })
            : (a = void 0);
        } else a && (a = void 0);
        return i;
      };
    },
  };
function Si(e) {
  let t = e[0];
  if (e.length > 1) {
    for (const n of e)
      if (n.type !== ye) {
        t = n;
        break;
      }
  }
  return t;
}
const Rl = Al;
function xi(e, t) {
  const { leavingVNodes: n } = e;
  let s = n.get(t.type);
  return s || ((s = Object.create(null)), n.set(t.type, s)), s;
}
function bs(e, t, n, s, r) {
  const {
      appear: i,
      mode: o,
      persisted: l = !1,
      onBeforeEnter: c,
      onEnter: f,
      onAfterEnter: a,
      onEnterCancelled: h,
      onBeforeLeave: v,
      onLeave: y,
      onAfterLeave: A,
      onLeaveCancelled: P,
      onBeforeAppear: K,
      onAppear: H,
      onAfterAppear: W,
      onAppearCancelled: p,
    } = t,
    g = String(e.key),
    M = xi(n, e),
    V = (T, I) => {
      T && De(T, s, 9, I);
    },
    R = (T, I) => {
      const E = I[1];
      V(T, I),
        B(T) ? T.every((b) => b.length <= 1) && E() : T.length <= 1 && E();
    },
    k = {
      mode: o,
      persisted: l,
      beforeEnter(T) {
        let I = c;
        if (!n.isMounted)
          if (i) I = K || c;
          else return;
        T[Ze] && T[Ze](!0);
        const E = M[g];
        E && dt(e, E) && E.el[Ze] && E.el[Ze](), V(I, [T]);
      },
      enter(T) {
        let I = f,
          E = a,
          b = h;
        if (!n.isMounted)
          if (i) (I = H || f), (E = W || a), (b = p || h);
          else return;
        let N = !1;
        const Y = (T[cn] = (re) => {
          N ||
            ((N = !0),
            re ? V(b, [T]) : V(E, [T]),
            k.delayedLeave && k.delayedLeave(),
            (T[cn] = void 0));
        });
        I ? R(I, [T, Y]) : Y();
      },
      leave(T, I) {
        const E = String(e.key);
        if ((T[cn] && T[cn](!0), n.isUnmounting)) return I();
        V(v, [T]);
        let b = !1;
        const N = (T[Ze] = (Y) => {
          b ||
            ((b = !0),
            I(),
            Y ? V(P, [T]) : V(A, [T]),
            (T[Ze] = void 0),
            M[E] === e && delete M[E]);
        });
        (M[E] = e), y ? R(y, [T, N]) : N();
      },
      clone(T) {
        const I = bs(T, t, n, s, r);
        return r && r(I), I;
      },
    };
  return k;
}
function Jn(e) {
  if (Dn(e)) return (e = st(e)), (e.children = null), e;
}
function sr(e) {
  if (!Dn(e)) return bi(e.type) && e.children ? Si(e.children) : e;
  const { shapeFlag: t, children: n } = e;
  if (n) {
    if (t & 16) return n[0];
    if (t & 32 && G(n.default)) return n.default();
  }
}
function qt(e, t) {
  e.shapeFlag & 6 && e.component
    ? ((e.transition = t), qt(e.component.subTree, t))
    : e.shapeFlag & 128
      ? ((e.ssContent.transition = t.clone(e.ssContent)),
        (e.ssFallback.transition = t.clone(e.ssFallback)))
      : (e.transition = t);
}
function Ti(e, t = !1, n) {
  let s = [],
    r = 0;
  for (let i = 0; i < e.length; i++) {
    let o = e[i];
    const l = n == null ? o.key : String(n) + String(o.key != null ? o.key : i);
    o.type === Se
      ? (o.patchFlag & 128 && r++, (s = s.concat(Ti(o.children, t, l))))
      : (t || o.type !== ye) && s.push(l != null ? st(o, { key: l }) : o);
  }
  if (r > 1) for (let i = 0; i < s.length; i++) s[i].patchFlag = -2;
  return s;
}
/*! #__NO_SIDE_EFFECTS__ */ function Ei(e, t) {
  return G(e) ? ue({ name: e.name }, t, { setup: e }) : e;
}
function Ci(e) {
  e.ids = [e.ids[0] + e.ids[2]++ + '-', 0, 0];
}
function Gt(e, t, n, s, r = !1) {
  if (B(e)) {
    e.forEach((A, P) => Gt(A, t && (B(t) ? t[P] : t), n, s, r));
    return;
  }
  if (mt(s) && !r) {
    s.shapeFlag & 512 &&
      s.type.__asyncResolved &&
      s.component.subTree.component &&
      Gt(e, t, n, s.component.subTree);
    return;
  }
  const i = s.shapeFlag & 4 ? Ks(s.component) : s.el,
    o = r ? null : i,
    { i: l, r: c } = e,
    f = t && t.r,
    a = l.refs === ne ? (l.refs = {}) : l.refs,
    h = l.setupState,
    v = J(h),
    y = h === ne ? () => !1 : (A) => Q(v, A);
  if (
    (f != null &&
      f !== c &&
      (oe(f)
        ? ((a[f] = null), y(f) && (h[f] = null))
        : ae(f) && (f.value = null)),
    G(c))
  )
    Zt(c, l, 12, [o, a]);
  else {
    const A = oe(c),
      P = ae(c);
    if (A || P) {
      const K = () => {
        if (e.f) {
          const H = A ? (y(c) ? h[c] : a[c]) : c.value;
          r
            ? B(H) && Is(H, i)
            : B(H)
              ? H.includes(i) || H.push(i)
              : A
                ? ((a[c] = [i]), y(c) && (h[c] = a[c]))
                : ((c.value = [i]), e.k && (a[e.k] = c.value));
        } else
          A
            ? ((a[c] = o), y(c) && (h[c] = o))
            : P && ((c.value = o), e.k && (a[e.k] = o));
      };
      o ? ((K.id = -1), Ce(K, n)) : K();
    }
  }
}
let rr = !1;
const Et = () => {
    rr ||
      (console.error('Hydration completed but contains mismatches.'),
      (rr = !0));
  },
  Ol = (e) => e.namespaceURI.includes('svg') && e.tagName !== 'foreignObject',
  Ml = (e) => e.namespaceURI.includes('MathML'),
  an = (e) => {
    if (e.nodeType === 1) {
      if (Ol(e)) return 'svg';
      if (Ml(e)) return 'mathml';
    }
  },
  fn = (e) => e.nodeType === 8;
function Il(e) {
  const {
      mt: t,
      p: n,
      o: {
        patchProp: s,
        createText: r,
        nextSibling: i,
        parentNode: o,
        remove: l,
        insert: c,
        createComment: f,
      },
    } = e,
    a = (p, g) => {
      if (!g.hasChildNodes()) {
        n(null, p, g), Tn(), (g._vnode = p);
        return;
      }
      h(g.firstChild, p, null, null, null), Tn(), (g._vnode = p);
    },
    h = (p, g, M, V, R, k = !1) => {
      k = k || !!g.dynamicChildren;
      const T = fn(p) && p.data === '[',
        I = () => P(p, g, M, V, R, T),
        { type: E, ref: b, shapeFlag: N, patchFlag: Y } = g;
      let re = p.nodeType;
      (g.el = p), Y === -2 && ((k = !1), (g.dynamicChildren = null));
      let $ = null;
      switch (E) {
        case bt:
          re !== 3
            ? g.children === ''
              ? (c((g.el = r('')), o(p), p), ($ = p))
              : ($ = I())
            : (p.data !== g.children && (Et(), (p.data = g.children)),
              ($ = i(p)));
          break;
        case ye:
          W(p)
            ? (($ = i(p)), H((g.el = p.content.firstChild), p, M))
            : re !== 8 || T
              ? ($ = I())
              : ($ = i(p));
          break;
        case Wt:
          if ((T && ((p = i(p)), (re = p.nodeType)), re === 1 || re === 3)) {
            $ = p;
            const X = !g.children.length;
            for (let D = 0; D < g.staticCount; D++)
              X && (g.children += $.nodeType === 1 ? $.outerHTML : $.data),
                D === g.staticCount - 1 && (g.anchor = $),
                ($ = i($));
            return T ? i($) : $;
          } else I();
          break;
        case Se:
          T ? ($ = A(p, g, M, V, R, k)) : ($ = I());
          break;
        default:
          if (N & 1)
            (re !== 1 || g.type.toLowerCase() !== p.tagName.toLowerCase()) &&
            !W(p)
              ? ($ = I())
              : ($ = v(p, g, M, V, R, k));
          else if (N & 6) {
            g.slotScopeIds = R;
            const X = o(p);
            if (
              (T
                ? ($ = K(p))
                : fn(p) && p.data === 'teleport start'
                  ? ($ = K(p, p.data, 'teleport end'))
                  : ($ = i(p)),
              t(g, X, null, M, V, an(X), k),
              mt(g) && !g.type.__asyncResolved)
            ) {
              let D;
              T
                ? ((D = he(Se)),
                  (D.anchor = $ ? $.previousSibling : X.lastChild))
                : (D = p.nodeType === 3 ? ro('') : he('div')),
                (D.el = p),
                (g.component.subTree = D);
            }
          } else
            N & 64
              ? re !== 8
                ? ($ = I())
                : ($ = g.type.hydrate(p, g, M, V, R, k, e, y))
              : N & 128 &&
                ($ = g.type.hydrate(p, g, M, V, an(o(p)), R, k, e, h));
      }
      return b != null && Gt(b, null, V, g), $;
    },
    v = (p, g, M, V, R, k) => {
      k = k || !!g.dynamicChildren;
      const {
          type: T,
          props: I,
          patchFlag: E,
          shapeFlag: b,
          dirs: N,
          transition: Y,
        } = g,
        re = T === 'input' || T === 'option';
      if (re || E !== -1) {
        N && We(g, null, M, 'created');
        let $ = !1;
        if (W(p)) {
          $ = qi(null, Y) && M && M.vnode.props && M.vnode.props.appear;
          const D = p.content.firstChild;
          $ && Y.beforeEnter(D), H(D, p, M), (g.el = p = D);
        }
        if (b & 16 && !(I && (I.innerHTML || I.textContent))) {
          let D = y(p.firstChild, g, p, M, V, R, k);
          for (; D; ) {
            un(p, 1) || Et();
            const ce = D;
            (D = D.nextSibling), l(ce);
          }
        } else if (b & 8) {
          let D = g.children;
          D[0] ===
            `
` &&
            (p.tagName === 'PRE' || p.tagName === 'TEXTAREA') &&
            (D = D.slice(1)),
            p.textContent !== D &&
              (un(p, 0) || Et(), (p.textContent = g.children));
        }
        if (I) {
          if (re || !k || E & 48) {
            const D = p.tagName.includes('-');
            for (const ce in I)
              ((re && (ce.endsWith('value') || ce === 'indeterminate')) ||
                (Qt(ce) && !Ot(ce)) ||
                ce[0] === '.' ||
                D) &&
                s(p, ce, null, I[ce], void 0, M);
          } else if (I.onClick) s(p, 'onClick', null, I.onClick, void 0, M);
          else if (E & 4 && pt(I.style)) for (const D in I.style) I.style[D];
        }
        let X;
        (X = I && I.onVnodeBeforeMount) && Oe(X, M, g),
          N && We(g, null, M, 'beforeMount'),
          ((X = I && I.onVnodeMounted) || N || $) &&
            eo(() => {
              X && Oe(X, M, g), $ && Y.enter(p), N && We(g, null, M, 'mounted');
            }, V);
      }
      return p.nextSibling;
    },
    y = (p, g, M, V, R, k, T) => {
      T = T || !!g.dynamicChildren;
      const I = g.children,
        E = I.length;
      for (let b = 0; b < E; b++) {
        const N = T ? I[b] : (I[b] = Me(I[b])),
          Y = N.type === bt;
        p
          ? (Y &&
              !T &&
              b + 1 < E &&
              Me(I[b + 1]).type === bt &&
              (c(r(p.data.slice(N.children.length)), M, i(p)),
              (p.data = N.children)),
            (p = h(p, N, V, R, k, T)))
          : Y && !N.children
            ? c((N.el = r('')), M)
            : (un(M, 1) || Et(), n(null, N, M, null, V, R, an(M), k));
      }
      return p;
    },
    A = (p, g, M, V, R, k) => {
      const { slotScopeIds: T } = g;
      T && (R = R ? R.concat(T) : T);
      const I = o(p),
        E = y(i(p), g, I, M, V, R, k);
      return E && fn(E) && E.data === ']'
        ? i((g.anchor = E))
        : (Et(), c((g.anchor = f(']')), I, E), E);
    },
    P = (p, g, M, V, R, k) => {
      if ((un(p.parentElement, 1) || Et(), (g.el = null), k)) {
        const E = K(p);
        for (;;) {
          const b = i(p);
          if (b && b !== E) l(b);
          else break;
        }
      }
      const T = i(p),
        I = o(p);
      return (
        l(p),
        n(null, g, I, T, M, V, an(I), R),
        M && ((M.vnode.el = g.el), Qi(M, g.el)),
        T
      );
    },
    K = (p, g = '[', M = ']') => {
      let V = 0;
      for (; p; )
        if (((p = i(p)), p && fn(p) && (p.data === g && V++, p.data === M))) {
          if (V === 0) return i(p);
          V--;
        }
      return p;
    },
    H = (p, g, M) => {
      const V = g.parentNode;
      V && V.replaceChild(p, g);
      let R = M;
      for (; R; )
        R.vnode.el === g && (R.vnode.el = R.subTree.el = p), (R = R.parent);
    },
    W = (p) => p.nodeType === 1 && p.tagName === 'TEMPLATE';
  return [a, h];
}
const ir = 'data-allow-mismatch',
  Pl = { 0: 'text', 1: 'children', 2: 'class', 3: 'style', 4: 'attribute' };
function un(e, t) {
  if (t === 0 || t === 1)
    for (; e && !e.hasAttribute(ir); ) e = e.parentElement;
  const n = e && e.getAttribute(ir);
  if (n == null) return !1;
  if (n === '') return !0;
  {
    const s = n.split(',');
    return t === 0 && s.includes('children')
      ? !0
      : n.split(',').includes(Pl[t]);
  }
}
In().requestIdleCallback;
In().cancelIdleCallback;
const mt = (e) => !!e.type.__asyncLoader,
  Dn = (e) => e.type.__isKeepAlive;
function Ll(e, t) {
  Ai(e, 'a', t);
}
function Nl(e, t) {
  Ai(e, 'da', t);
}
function Ai(e, t, n = fe) {
  const s =
    e.__wdc ||
    (e.__wdc = () => {
      let r = n;
      for (; r; ) {
        if (r.isDeactivated) return;
        r = r.parent;
      }
      return e();
    });
  if (($n(t, s, n), n)) {
    let r = n.parent;
    for (; r && r.parent; )
      Dn(r.parent.vnode) && Fl(s, t, n, r), (r = r.parent);
  }
}
function Fl(e, t, n, s) {
  const r = $n(t, e, s, !0);
  jn(() => {
    Is(s[t], r);
  }, n);
}
function $n(e, t, n = fe, s = !1) {
  if (n) {
    const r = n[e] || (n[e] = []),
      i =
        t.__weh ||
        (t.__weh = (...o) => {
          it();
          const l = tn(n),
            c = De(t, n, e, o);
          return l(), ot(), c;
        });
    return s ? r.unshift(i) : r.push(i), i;
  }
}
const ze =
    (e) =>
    (t, n = fe) => {
      (!zt || e === 'sp') && $n(e, (...s) => t(...s), n);
    },
  Hl = ze('bm'),
  Pt = ze('m'),
  Dl = ze('bu'),
  $l = ze('u'),
  Ri = ze('bum'),
  jn = ze('um'),
  jl = ze('sp'),
  Vl = ze('rtg'),
  Wl = ze('rtc');
function kl(e, t = fe) {
  $n('ec', e, t);
}
const Oi = 'components';
function ff(e, t) {
  return Ii(Oi, e, !0, t) || e;
}
const Mi = Symbol.for('v-ndc');
function uf(e) {
  return oe(e) ? Ii(Oi, e, !1) || e : e || Mi;
}
function Ii(e, t, n = !0, s = !1) {
  const r = de || fe;
  if (r) {
    const i = r.type;
    {
      const l = Cc(i, !1);
      if (l && (l === t || l === Ne(t) || l === Mn(Ne(t)))) return i;
    }
    const o = or(r[e] || i[e], t) || or(r.appContext[e], t);
    return !o && s ? i : o;
  }
}
function or(e, t) {
  return e && (e[t] || e[Ne(t)] || e[Mn(Ne(t))]);
}
function df(e, t, n, s) {
  let r;
  const i = n,
    o = B(e);
  if (o || oe(e)) {
    const l = o && pt(e);
    let c = !1;
    l && ((c = !Ie(e)), (e = Ln(e))), (r = new Array(e.length));
    for (let f = 0, a = e.length; f < a; f++)
      r[f] = t(c ? ve(e[f]) : e[f], f, void 0, i);
  } else if (typeof e == 'number') {
    r = new Array(e);
    for (let l = 0; l < e; l++) r[l] = t(l + 1, l, void 0, i);
  } else if (se(e))
    if (e[Symbol.iterator]) r = Array.from(e, (l, c) => t(l, c, void 0, i));
    else {
      const l = Object.keys(e);
      r = new Array(l.length);
      for (let c = 0, f = l.length; c < f; c++) {
        const a = l[c];
        r[c] = t(e[a], a, c, i);
      }
    }
  else r = [];
  return r;
}
function hf(e, t, n = {}, s, r) {
  if (de.ce || (de.parent && mt(de.parent) && de.parent.ce))
    return (
      t !== 'default' && (n.name = t),
      Ts(),
      Es(Se, null, [he('slot', n, s && s())], 64)
    );
  let i = e[t];
  i && i._c && (i._d = !1), Ts();
  const o = i && Pi(i(n)),
    l = n.key || (o && o.key),
    c = Es(
      Se,
      { key: (l && !Ye(l) ? l : `_${t}`) + (!o && s ? '_fb' : '') },
      o || (s ? s() : []),
      o && e._ === 1 ? 64 : -2
    );
  return (
    !r && c.scopeId && (c.slotScopeIds = [c.scopeId + '-s']),
    i && i._c && (i._d = !0),
    c
  );
}
function Pi(e) {
  return e.some((t) =>
    Yt(t) ? !(t.type === ye || (t.type === Se && !Pi(t.children))) : !0
  )
    ? e
    : null;
}
function pf(e, t) {
  const n = {};
  for (const s in e) n[/[A-Z]/.test(s) ? `on:${s}` : mn(s)] = e[s];
  return n;
}
const _s = (e) => (e ? (io(e) ? Ks(e) : _s(e.parent)) : null),
  Vt = ue(Object.create(null), {
    $: (e) => e,
    $el: (e) => e.vnode.el,
    $data: (e) => e.data,
    $props: (e) => e.props,
    $attrs: (e) => e.attrs,
    $slots: (e) => e.slots,
    $refs: (e) => e.refs,
    $parent: (e) => _s(e.parent),
    $root: (e) => _s(e.root),
    $host: (e) => e.ce,
    $emit: (e) => e.emit,
    $options: (e) => Ni(e),
    $forceUpdate: (e) =>
      e.f ||
      (e.f = () => {
        ks(e.update);
      }),
    $nextTick: (e) => e.n || (e.n = Hn.bind(e.proxy)),
    $watch: (e) => fc.bind(e),
  }),
  Qn = (e, t) => e !== ne && !e.__isScriptSetup && Q(e, t),
  Ul = {
    get({ _: e }, t) {
      if (t === '__v_skip') return !0;
      const {
        ctx: n,
        setupState: s,
        data: r,
        props: i,
        accessCache: o,
        type: l,
        appContext: c,
      } = e;
      let f;
      if (t[0] !== '$') {
        const y = o[t];
        if (y !== void 0)
          switch (y) {
            case 1:
              return s[t];
            case 2:
              return r[t];
            case 4:
              return n[t];
            case 3:
              return i[t];
          }
        else {
          if (Qn(s, t)) return (o[t] = 1), s[t];
          if (r !== ne && Q(r, t)) return (o[t] = 2), r[t];
          if ((f = e.propsOptions[0]) && Q(f, t)) return (o[t] = 3), i[t];
          if (n !== ne && Q(n, t)) return (o[t] = 4), n[t];
          ws && (o[t] = 0);
        }
      }
      const a = Vt[t];
      let h, v;
      if (a) return t === '$attrs' && me(e.attrs, 'get', ''), a(e);
      if ((h = l.__cssModules) && (h = h[t])) return h;
      if (n !== ne && Q(n, t)) return (o[t] = 4), n[t];
      if (((v = c.config.globalProperties), Q(v, t))) return v[t];
    },
    set({ _: e }, t, n) {
      const { data: s, setupState: r, ctx: i } = e;
      return Qn(r, t)
        ? ((r[t] = n), !0)
        : s !== ne && Q(s, t)
          ? ((s[t] = n), !0)
          : Q(e.props, t) || (t[0] === '$' && t.slice(1) in e)
            ? !1
            : ((i[t] = n), !0);
    },
    has(
      {
        _: {
          data: e,
          setupState: t,
          accessCache: n,
          ctx: s,
          appContext: r,
          propsOptions: i,
        },
      },
      o
    ) {
      let l;
      return (
        !!n[o] ||
        (e !== ne && Q(e, o)) ||
        Qn(t, o) ||
        ((l = i[0]) && Q(l, o)) ||
        Q(s, o) ||
        Q(Vt, o) ||
        Q(r.config.globalProperties, o)
      );
    },
    defineProperty(e, t, n) {
      return (
        n.get != null
          ? (e._.accessCache[t] = 0)
          : Q(n, 'value') && this.set(e, t, n.value, null),
        Reflect.defineProperty(e, t, n)
      );
    },
  };
function gf() {
  return Bl().slots;
}
function Bl() {
  const e = en();
  return e.setupContext || (e.setupContext = lo(e));
}
function lr(e) {
  return B(e) ? e.reduce((t, n) => ((t[n] = null), t), {}) : e;
}
let ws = !0;
function Kl(e) {
  const t = Ni(e),
    n = e.proxy,
    s = e.ctx;
  (ws = !1), t.beforeCreate && cr(t.beforeCreate, e, 'bc');
  const {
    data: r,
    computed: i,
    methods: o,
    watch: l,
    provide: c,
    inject: f,
    created: a,
    beforeMount: h,
    mounted: v,
    beforeUpdate: y,
    updated: A,
    activated: P,
    deactivated: K,
    beforeDestroy: H,
    beforeUnmount: W,
    destroyed: p,
    unmounted: g,
    render: M,
    renderTracked: V,
    renderTriggered: R,
    errorCaptured: k,
    serverPrefetch: T,
    expose: I,
    inheritAttrs: E,
    components: b,
    directives: N,
    filters: Y,
  } = t;
  if ((f && ql(f, s, null), o))
    for (const X in o) {
      const D = o[X];
      G(D) && (s[X] = D.bind(n));
    }
  if (r) {
    const X = r.call(n, n);
    se(X) && (e.data = It(X));
  }
  if (((ws = !0), i))
    for (const X in i) {
      const D = i[X],
        ce = G(D) ? D.bind(n, n) : G(D.get) ? D.get.bind(n, n) : ke,
        nn = !G(D) && G(D.set) ? D.set.bind(n) : ke,
        lt = ie({ get: ce, set: nn });
      Object.defineProperty(s, X, {
        enumerable: !0,
        configurable: !0,
        get: () => lt.value,
        set: ($e) => (lt.value = $e),
      });
    }
  if (l) for (const X in l) Li(l[X], s, n, X);
  if (c) {
    const X = G(c) ? c.call(n) : c;
    Reflect.ownKeys(X).forEach((D) => {
      Ql(D, X[D]);
    });
  }
  a && cr(a, e, 'c');
  function $(X, D) {
    B(D) ? D.forEach((ce) => X(ce.bind(n))) : D && X(D.bind(n));
  }
  if (
    ($(Hl, h),
    $(Pt, v),
    $(Dl, y),
    $($l, A),
    $(Ll, P),
    $(Nl, K),
    $(kl, k),
    $(Wl, V),
    $(Vl, R),
    $(Ri, W),
    $(jn, g),
    $(jl, T),
    B(I))
  )
    if (I.length) {
      const X = e.exposed || (e.exposed = {});
      I.forEach((D) => {
        Object.defineProperty(X, D, {
          get: () => n[D],
          set: (ce) => (n[D] = ce),
        });
      });
    } else e.exposed || (e.exposed = {});
  M && e.render === ke && (e.render = M),
    E != null && (e.inheritAttrs = E),
    b && (e.components = b),
    N && (e.directives = N),
    T && Ci(e);
}
function ql(e, t, n = ke) {
  B(e) && (e = Ss(e));
  for (const s in e) {
    const r = e[s];
    let i;
    se(r)
      ? 'default' in r
        ? (i = yt(r.from || s, r.default, !0))
        : (i = yt(r.from || s))
      : (i = yt(r)),
      ae(i)
        ? Object.defineProperty(t, s, {
            enumerable: !0,
            configurable: !0,
            get: () => i.value,
            set: (o) => (i.value = o),
          })
        : (t[s] = i);
  }
}
function cr(e, t, n) {
  De(B(e) ? e.map((s) => s.bind(t.proxy)) : e.bind(t.proxy), t, n);
}
function Li(e, t, n, s) {
  let r = s.includes('.') ? zi(n, s) : () => n[s];
  if (oe(e)) {
    const i = t[e];
    G(i) && Le(r, i);
  } else if (G(e)) Le(r, e.bind(n));
  else if (se(e))
    if (B(e)) e.forEach((i) => Li(i, t, n, s));
    else {
      const i = G(e.handler) ? e.handler.bind(n) : t[e.handler];
      G(i) && Le(r, i, e);
    }
}
function Ni(e) {
  const t = e.type,
    { mixins: n, extends: s } = t,
    {
      mixins: r,
      optionsCache: i,
      config: { optionMergeStrategies: o },
    } = e.appContext,
    l = i.get(t);
  let c;
  return (
    l
      ? (c = l)
      : !r.length && !n && !s
        ? (c = t)
        : ((c = {}),
          r.length && r.forEach((f) => Cn(c, f, o, !0)),
          Cn(c, t, o)),
    se(t) && i.set(t, c),
    c
  );
}
function Cn(e, t, n, s = !1) {
  const { mixins: r, extends: i } = t;
  i && Cn(e, i, n, !0), r && r.forEach((o) => Cn(e, o, n, !0));
  for (const o in t)
    if (!(s && o === 'expose')) {
      const l = Gl[o] || (n && n[o]);
      e[o] = l ? l(e[o], t[o]) : t[o];
    }
  return e;
}
const Gl = {
  data: ar,
  props: fr,
  emits: fr,
  methods: Dt,
  computed: Dt,
  beforeCreate: be,
  created: be,
  beforeMount: be,
  mounted: be,
  beforeUpdate: be,
  updated: be,
  beforeDestroy: be,
  beforeUnmount: be,
  destroyed: be,
  unmounted: be,
  activated: be,
  deactivated: be,
  errorCaptured: be,
  serverPrefetch: be,
  components: Dt,
  directives: Dt,
  watch: Yl,
  provide: ar,
  inject: Xl,
};
function ar(e, t) {
  return t
    ? e
      ? function () {
          return ue(
            G(e) ? e.call(this, this) : e,
            G(t) ? t.call(this, this) : t
          );
        }
      : t
    : e;
}
function Xl(e, t) {
  return Dt(Ss(e), Ss(t));
}
function Ss(e) {
  if (B(e)) {
    const t = {};
    for (let n = 0; n < e.length; n++) t[e[n]] = e[n];
    return t;
  }
  return e;
}
function be(e, t) {
  return e ? [...new Set([].concat(e, t))] : t;
}
function Dt(e, t) {
  return e ? ue(Object.create(null), e, t) : t;
}
function fr(e, t) {
  return e
    ? B(e) && B(t)
      ? [...new Set([...e, ...t])]
      : ue(Object.create(null), lr(e), lr(t ?? {}))
    : t;
}
function Yl(e, t) {
  if (!e) return t;
  if (!t) return e;
  const n = ue(Object.create(null), e);
  for (const s in t) n[s] = be(e[s], t[s]);
  return n;
}
function Fi() {
  return {
    app: null,
    config: {
      isNativeTag: Ao,
      performance: !1,
      globalProperties: {},
      optionMergeStrategies: {},
      errorHandler: void 0,
      warnHandler: void 0,
      compilerOptions: {},
    },
    mixins: [],
    components: {},
    directives: {},
    provides: Object.create(null),
    optionsCache: new WeakMap(),
    propsCache: new WeakMap(),
    emitsCache: new WeakMap(),
  };
}
let zl = 0;
function Jl(e, t) {
  return function (s, r = null) {
    G(s) || (s = ue({}, s)), r != null && !se(r) && (r = null);
    const i = Fi(),
      o = new WeakSet(),
      l = [];
    let c = !1;
    const f = (i.app = {
      _uid: zl++,
      _component: s,
      _props: r,
      _container: null,
      _context: i,
      _instance: null,
      version: Rc,
      get config() {
        return i.config;
      },
      set config(a) {},
      use(a, ...h) {
        return (
          o.has(a) ||
            (a && G(a.install)
              ? (o.add(a), a.install(f, ...h))
              : G(a) && (o.add(a), a(f, ...h))),
          f
        );
      },
      mixin(a) {
        return i.mixins.includes(a) || i.mixins.push(a), f;
      },
      component(a, h) {
        return h ? ((i.components[a] = h), f) : i.components[a];
      },
      directive(a, h) {
        return h ? ((i.directives[a] = h), f) : i.directives[a];
      },
      mount(a, h, v) {
        if (!c) {
          const y = f._ceVNode || he(s, r);
          return (
            (y.appContext = i),
            v === !0 ? (v = 'svg') : v === !1 && (v = void 0),
            h && t ? t(y, a) : e(y, a, v),
            (c = !0),
            (f._container = a),
            (a.__vue_app__ = f),
            Ks(y.component)
          );
        }
      },
      onUnmount(a) {
        l.push(a);
      },
      unmount() {
        c &&
          (De(l, f._instance, 16),
          e(null, f._container),
          delete f._container.__vue_app__);
      },
      provide(a, h) {
        return (i.provides[a] = h), f;
      },
      runWithContext(a) {
        const h = vt;
        vt = f;
        try {
          return a();
        } finally {
          vt = h;
        }
      },
    });
    return f;
  };
}
let vt = null;
function Ql(e, t) {
  if (fe) {
    let n = fe.provides;
    const s = fe.parent && fe.parent.provides;
    s === n && (n = fe.provides = Object.create(s)), (n[e] = t);
  }
}
function yt(e, t, n = !1) {
  const s = fe || de;
  if (s || vt) {
    const r = vt
      ? vt._context.provides
      : s
        ? s.parent == null
          ? s.vnode.appContext && s.vnode.appContext.provides
          : s.parent.provides
        : void 0;
    if (r && e in r) return r[e];
    if (arguments.length > 1) return n && G(t) ? t.call(s && s.proxy) : t;
  }
}
function Hi() {
  return !!(fe || de || vt);
}
const Di = {},
  $i = () => Object.create(Di),
  ji = (e) => Object.getPrototypeOf(e) === Di;
function Zl(e, t, n, s = !1) {
  const r = {},
    i = $i();
  (e.propsDefaults = Object.create(null)), Vi(e, t, r, i);
  for (const o in e.propsOptions[0]) o in r || (r[o] = void 0);
  n ? (e.props = s ? r : cl(r)) : e.type.props ? (e.props = r) : (e.props = i),
    (e.attrs = i);
}
function ec(e, t, n, s) {
  const {
      props: r,
      attrs: i,
      vnode: { patchFlag: o },
    } = e,
    l = J(r),
    [c] = e.propsOptions;
  let f = !1;
  if ((s || o > 0) && !(o & 16)) {
    if (o & 8) {
      const a = e.vnode.dynamicProps;
      for (let h = 0; h < a.length; h++) {
        let v = a[h];
        if (Wn(e.emitsOptions, v)) continue;
        const y = t[v];
        if (c)
          if (Q(i, v)) y !== i[v] && ((i[v] = y), (f = !0));
          else {
            const A = Ne(v);
            r[A] = xs(c, l, A, y, e, !1);
          }
        else y !== i[v] && ((i[v] = y), (f = !0));
      }
    }
  } else {
    Vi(e, t, r, i) && (f = !0);
    let a;
    for (const h in l)
      (!t || (!Q(t, h) && ((a = rt(h)) === h || !Q(t, a)))) &&
        (c
          ? n &&
            (n[h] !== void 0 || n[a] !== void 0) &&
            (r[h] = xs(c, l, h, void 0, e, !0))
          : delete r[h]);
    if (i !== l) for (const h in i) (!t || !Q(t, h)) && (delete i[h], (f = !0));
  }
  f && qe(e.attrs, 'set', '');
}
function Vi(e, t, n, s) {
  const [r, i] = e.propsOptions;
  let o = !1,
    l;
  if (t)
    for (let c in t) {
      if (Ot(c)) continue;
      const f = t[c];
      let a;
      r && Q(r, (a = Ne(c)))
        ? !i || !i.includes(a)
          ? (n[a] = f)
          : ((l || (l = {}))[a] = f)
        : Wn(e.emitsOptions, c) ||
          ((!(c in s) || f !== s[c]) && ((s[c] = f), (o = !0)));
    }
  if (i) {
    const c = J(n),
      f = l || ne;
    for (let a = 0; a < i.length; a++) {
      const h = i[a];
      n[h] = xs(r, c, h, f[h], e, !Q(f, h));
    }
  }
  return o;
}
function xs(e, t, n, s, r, i) {
  const o = e[n];
  if (o != null) {
    const l = Q(o, 'default');
    if (l && s === void 0) {
      const c = o.default;
      if (o.type !== Function && !o.skipFactory && G(c)) {
        const { propsDefaults: f } = r;
        if (n in f) s = f[n];
        else {
          const a = tn(r);
          (s = f[n] = c.call(null, t)), a();
        }
      } else s = c;
      r.ce && r.ce._setProp(n, s);
    }
    o[0] &&
      (i && !l ? (s = !1) : o[1] && (s === '' || s === rt(n)) && (s = !0));
  }
  return s;
}
const tc = new WeakMap();
function Wi(e, t, n = !1) {
  const s = n ? tc : t.propsCache,
    r = s.get(e);
  if (r) return r;
  const i = e.props,
    o = {},
    l = [];
  let c = !1;
  if (!G(e)) {
    const a = (h) => {
      c = !0;
      const [v, y] = Wi(h, t, !0);
      ue(o, v), y && l.push(...y);
    };
    !n && t.mixins.length && t.mixins.forEach(a),
      e.extends && a(e.extends),
      e.mixins && e.mixins.forEach(a);
  }
  if (!i && !c) return se(e) && s.set(e, At), At;
  if (B(i))
    for (let a = 0; a < i.length; a++) {
      const h = Ne(i[a]);
      ur(h) && (o[h] = ne);
    }
  else if (i)
    for (const a in i) {
      const h = Ne(a);
      if (ur(h)) {
        const v = i[a],
          y = (o[h] = B(v) || G(v) ? { type: v } : ue({}, v)),
          A = y.type;
        let P = !1,
          K = !0;
        if (B(A))
          for (let H = 0; H < A.length; ++H) {
            const W = A[H],
              p = G(W) && W.name;
            if (p === 'Boolean') {
              P = !0;
              break;
            } else p === 'String' && (K = !1);
          }
        else P = G(A) && A.name === 'Boolean';
        (y[0] = P), (y[1] = K), (P || Q(y, 'default')) && l.push(h);
      }
    }
  const f = [o, l];
  return se(e) && s.set(e, f), f;
}
function ur(e) {
  return e[0] !== '$' && !Ot(e);
}
const ki = (e) => e[0] === '_' || e === '$stable',
  Us = (e) => (B(e) ? e.map(Me) : [Me(e)]),
  nc = (e, t, n) => {
    if (t._n) return t;
    const s = Tl((...r) => Us(t(...r)), n);
    return (s._c = !1), s;
  },
  Ui = (e, t, n) => {
    const s = e._ctx;
    for (const r in e) {
      if (ki(r)) continue;
      const i = e[r];
      if (G(i)) t[r] = nc(r, i, s);
      else if (i != null) {
        const o = Us(i);
        t[r] = () => o;
      }
    }
  },
  Bi = (e, t) => {
    const n = Us(t);
    e.slots.default = () => n;
  },
  Ki = (e, t, n) => {
    for (const s in t) (n || s !== '_') && (e[s] = t[s]);
  },
  sc = (e, t, n) => {
    const s = (e.slots = $i());
    if (e.vnode.shapeFlag & 32) {
      const r = t._;
      r ? (Ki(s, t, n), n && Xr(s, '_', r, !0)) : Ui(t, s);
    } else t && Bi(e, t);
  },
  rc = (e, t, n) => {
    const { vnode: s, slots: r } = e;
    let i = !0,
      o = ne;
    if (s.shapeFlag & 32) {
      const l = t._;
      l
        ? n && l === 1
          ? (i = !1)
          : Ki(r, t, n)
        : ((i = !t.$stable), Ui(t, r)),
        (o = t);
    } else t && (Bi(e, t), (o = { default: 1 }));
    if (i) for (const l in r) !ki(l) && o[l] == null && delete r[l];
  },
  Ce = eo;
function ic(e) {
  return oc(e, Il);
}
function oc(e, t) {
  const n = In();
  n.__VUE__ = !0;
  const {
      insert: s,
      remove: r,
      patchProp: i,
      createElement: o,
      createText: l,
      createComment: c,
      setText: f,
      setElementText: a,
      parentNode: h,
      nextSibling: v,
      setScopeId: y = ke,
      insertStaticContent: A,
    } = e,
    P = (
      u,
      d,
      m,
      S = null,
      _ = null,
      w = null,
      L = void 0,
      O = null,
      C = !!d.dynamicChildren
    ) => {
      if (u === d) return;
      u && !dt(u, d) && ((S = sn(u)), $e(u, _, w, !0), (u = null)),
        d.patchFlag === -2 && ((C = !1), (d.dynamicChildren = null));
      const { type: x, ref: U, shapeFlag: F } = d;
      switch (x) {
        case bt:
          K(u, d, m, S);
          break;
        case ye:
          H(u, d, m, S);
          break;
        case Wt:
          u == null && W(d, m, S, L);
          break;
        case Se:
          b(u, d, m, S, _, w, L, O, C);
          break;
        default:
          F & 1
            ? M(u, d, m, S, _, w, L, O, C)
            : F & 6
              ? N(u, d, m, S, _, w, L, O, C)
              : (F & 64 || F & 128) && x.process(u, d, m, S, _, w, L, O, C, xt);
      }
      U != null && _ && Gt(U, u && u.ref, w, d || u, !d);
    },
    K = (u, d, m, S) => {
      if (u == null) s((d.el = l(d.children)), m, S);
      else {
        const _ = (d.el = u.el);
        d.children !== u.children && f(_, d.children);
      }
    },
    H = (u, d, m, S) => {
      u == null ? s((d.el = c(d.children || '')), m, S) : (d.el = u.el);
    },
    W = (u, d, m, S) => {
      [u.el, u.anchor] = A(u.children, d, m, S, u.el, u.anchor);
    },
    p = ({ el: u, anchor: d }, m, S) => {
      let _;
      for (; u && u !== d; ) (_ = v(u)), s(u, m, S), (u = _);
      s(d, m, S);
    },
    g = ({ el: u, anchor: d }) => {
      let m;
      for (; u && u !== d; ) (m = v(u)), r(u), (u = m);
      r(d);
    },
    M = (u, d, m, S, _, w, L, O, C) => {
      d.type === 'svg' ? (L = 'svg') : d.type === 'math' && (L = 'mathml'),
        u == null ? V(d, m, S, _, w, L, O, C) : T(u, d, _, w, L, O, C);
    },
    V = (u, d, m, S, _, w, L, O) => {
      let C, x;
      const { props: U, shapeFlag: F, transition: j, dirs: q } = u;
      if (
        ((C = u.el = o(u.type, w, U && U.is, U)),
        F & 8
          ? a(C, u.children)
          : F & 16 && k(u.children, C, null, S, _, Zn(u, w), L, O),
        q && We(u, null, S, 'created'),
        R(C, u, u.scopeId, L, S),
        U)
      ) {
        for (const ee in U)
          ee !== 'value' && !Ot(ee) && i(C, ee, null, U[ee], w, S);
        'value' in U && i(C, 'value', null, U.value, w),
          (x = U.onVnodeBeforeMount) && Oe(x, S, u);
      }
      q && We(u, null, S, 'beforeMount');
      const z = qi(_, j);
      z && j.beforeEnter(C),
        s(C, d, m),
        ((x = U && U.onVnodeMounted) || z || q) &&
          Ce(() => {
            x && Oe(x, S, u), z && j.enter(C), q && We(u, null, S, 'mounted');
          }, _);
    },
    R = (u, d, m, S, _) => {
      if ((m && y(u, m), S)) for (let w = 0; w < S.length; w++) y(u, S[w]);
      if (_) {
        let w = _.subTree;
        if (
          d === w ||
          (Zi(w.type) && (w.ssContent === d || w.ssFallback === d))
        ) {
          const L = _.vnode;
          R(u, L, L.scopeId, L.slotScopeIds, _.parent);
        }
      }
    },
    k = (u, d, m, S, _, w, L, O, C = 0) => {
      for (let x = C; x < u.length; x++) {
        const U = (u[x] = O ? et(u[x]) : Me(u[x]));
        P(null, U, d, m, S, _, w, L, O);
      }
    },
    T = (u, d, m, S, _, w, L) => {
      const O = (d.el = u.el);
      let { patchFlag: C, dynamicChildren: x, dirs: U } = d;
      C |= u.patchFlag & 16;
      const F = u.props || ne,
        j = d.props || ne;
      let q;
      if (
        (m && ct(m, !1),
        (q = j.onVnodeBeforeUpdate) && Oe(q, m, d, u),
        U && We(d, u, m, 'beforeUpdate'),
        m && ct(m, !0),
        ((F.innerHTML && j.innerHTML == null) ||
          (F.textContent && j.textContent == null)) &&
          a(O, ''),
        x
          ? I(u.dynamicChildren, x, O, m, S, Zn(d, _), w)
          : L || D(u, d, O, null, m, S, Zn(d, _), w, !1),
        C > 0)
      ) {
        if (C & 16) E(O, F, j, m, _);
        else if (
          (C & 2 && F.class !== j.class && i(O, 'class', null, j.class, _),
          C & 4 && i(O, 'style', F.style, j.style, _),
          C & 8)
        ) {
          const z = d.dynamicProps;
          for (let ee = 0; ee < z.length; ee++) {
            const Z = z[ee],
              xe = F[Z],
              pe = j[Z];
            (pe !== xe || Z === 'value') && i(O, Z, xe, pe, _, m);
          }
        }
        C & 1 && u.children !== d.children && a(O, d.children);
      } else !L && x == null && E(O, F, j, m, _);
      ((q = j.onVnodeUpdated) || U) &&
        Ce(() => {
          q && Oe(q, m, d, u), U && We(d, u, m, 'updated');
        }, S);
    },
    I = (u, d, m, S, _, w, L) => {
      for (let O = 0; O < d.length; O++) {
        const C = u[O],
          x = d[O],
          U =
            C.el && (C.type === Se || !dt(C, x) || C.shapeFlag & 70)
              ? h(C.el)
              : m;
        P(C, x, U, null, S, _, w, L, !0);
      }
    },
    E = (u, d, m, S, _) => {
      if (d !== m) {
        if (d !== ne)
          for (const w in d) !Ot(w) && !(w in m) && i(u, w, d[w], null, _, S);
        for (const w in m) {
          if (Ot(w)) continue;
          const L = m[w],
            O = d[w];
          L !== O && w !== 'value' && i(u, w, O, L, _, S);
        }
        'value' in m && i(u, 'value', d.value, m.value, _);
      }
    },
    b = (u, d, m, S, _, w, L, O, C) => {
      const x = (d.el = u ? u.el : l('')),
        U = (d.anchor = u ? u.anchor : l(''));
      let { patchFlag: F, dynamicChildren: j, slotScopeIds: q } = d;
      q && (O = O ? O.concat(q) : q),
        u == null
          ? (s(x, m, S), s(U, m, S), k(d.children || [], m, U, _, w, L, O, C))
          : F > 0 && F & 64 && j && u.dynamicChildren
            ? (I(u.dynamicChildren, j, m, _, w, L, O),
              (d.key != null || (_ && d === _.subTree)) && Gi(u, d, !0))
            : D(u, d, m, U, _, w, L, O, C);
    },
    N = (u, d, m, S, _, w, L, O, C) => {
      (d.slotScopeIds = O),
        u == null
          ? d.shapeFlag & 512
            ? _.ctx.activate(d, m, S, L, C)
            : Y(d, m, S, _, w, L, C)
          : re(u, d, C);
    },
    Y = (u, d, m, S, _, w, L) => {
      const O = (u.component = Sc(u, S, _));
      if ((Dn(u) && (O.ctx.renderer = xt), xc(O, !1, L), O.asyncDep)) {
        if ((_ && _.registerDep(O, $, L), !u.el)) {
          const C = (O.subTree = he(ye));
          H(null, C, d, m);
        }
      } else $(O, u, d, m, _, w, L);
    },
    re = (u, d, m) => {
      const S = (d.component = u.component);
      if (gc(u, d, m))
        if (S.asyncDep && !S.asyncResolved) {
          X(S, d, m);
          return;
        } else (S.next = d), S.update();
      else (d.el = u.el), (S.vnode = d);
    },
    $ = (u, d, m, S, _, w, L) => {
      const O = () => {
        if (u.isMounted) {
          let { next: F, bu: j, u: q, parent: z, vnode: ee } = u;
          {
            const Te = Xi(u);
            if (Te) {
              F && ((F.el = ee.el), X(u, F, L)),
                Te.asyncDep.then(() => {
                  u.isUnmounted || O();
                });
              return;
            }
          }
          let Z = F,
            xe;
          ct(u, !1),
            F ? ((F.el = ee.el), X(u, F, L)) : (F = ee),
            j && qn(j),
            (xe = F.props && F.props.onVnodeBeforeUpdate) && Oe(xe, z, F, ee),
            ct(u, !0);
          const pe = es(u),
            Fe = u.subTree;
          (u.subTree = pe),
            P(Fe, pe, h(Fe.el), sn(Fe), u, _, w),
            (F.el = pe.el),
            Z === null && Qi(u, pe.el),
            q && Ce(q, _),
            (xe = F.props && F.props.onVnodeUpdated) &&
              Ce(() => Oe(xe, z, F, ee), _);
        } else {
          let F;
          const { el: j, props: q } = d,
            { bm: z, m: ee, parent: Z, root: xe, type: pe } = u,
            Fe = mt(d);
          if (
            (ct(u, !1),
            z && qn(z),
            !Fe && (F = q && q.onVnodeBeforeMount) && Oe(F, Z, d),
            ct(u, !0),
            j && Kn)
          ) {
            const Te = () => {
              (u.subTree = es(u)), Kn(j, u.subTree, u, _, null);
            };
            Fe && pe.__asyncHydrate ? pe.__asyncHydrate(j, u, Te) : Te();
          } else {
            xe.ce && xe.ce._injectChildStyle(pe);
            const Te = (u.subTree = es(u));
            P(null, Te, m, S, u, _, w), (d.el = Te.el);
          }
          if ((ee && Ce(ee, _), !Fe && (F = q && q.onVnodeMounted))) {
            const Te = d;
            Ce(() => Oe(F, Z, Te), _);
          }
          (d.shapeFlag & 256 ||
            (Z && mt(Z.vnode) && Z.vnode.shapeFlag & 256)) &&
            u.a &&
            Ce(u.a, _),
            (u.isMounted = !0),
            (d = m = S = null);
        }
      };
      u.scope.on();
      const C = (u.effect = new Zr(O));
      u.scope.off();
      const x = (u.update = C.run.bind(C)),
        U = (u.job = C.runIfDirty.bind(C));
      (U.i = u), (U.id = u.uid), (C.scheduler = () => ks(U)), ct(u, !0), x();
    },
    X = (u, d, m) => {
      d.component = u;
      const S = u.vnode.props;
      (u.vnode = d),
        (u.next = null),
        ec(u, d.props, S, m),
        rc(u, d.children, m),
        it(),
        nr(u),
        ot();
    },
    D = (u, d, m, S, _, w, L, O, C = !1) => {
      const x = u && u.children,
        U = u ? u.shapeFlag : 0,
        F = d.children,
        { patchFlag: j, shapeFlag: q } = d;
      if (j > 0) {
        if (j & 128) {
          nn(x, F, m, S, _, w, L, O, C);
          return;
        } else if (j & 256) {
          ce(x, F, m, S, _, w, L, O, C);
          return;
        }
      }
      q & 8
        ? (U & 16 && Lt(x, _, w), F !== x && a(m, F))
        : U & 16
          ? q & 16
            ? nn(x, F, m, S, _, w, L, O, C)
            : Lt(x, _, w, !0)
          : (U & 8 && a(m, ''), q & 16 && k(F, m, S, _, w, L, O, C));
    },
    ce = (u, d, m, S, _, w, L, O, C) => {
      (u = u || At), (d = d || At);
      const x = u.length,
        U = d.length,
        F = Math.min(x, U);
      let j;
      for (j = 0; j < F; j++) {
        const q = (d[j] = C ? et(d[j]) : Me(d[j]));
        P(u[j], q, m, null, _, w, L, O, C);
      }
      x > U ? Lt(u, _, w, !0, !1, F) : k(d, m, S, _, w, L, O, C, F);
    },
    nn = (u, d, m, S, _, w, L, O, C) => {
      let x = 0;
      const U = d.length;
      let F = u.length - 1,
        j = U - 1;
      for (; x <= F && x <= j; ) {
        const q = u[x],
          z = (d[x] = C ? et(d[x]) : Me(d[x]));
        if (dt(q, z)) P(q, z, m, null, _, w, L, O, C);
        else break;
        x++;
      }
      for (; x <= F && x <= j; ) {
        const q = u[F],
          z = (d[j] = C ? et(d[j]) : Me(d[j]));
        if (dt(q, z)) P(q, z, m, null, _, w, L, O, C);
        else break;
        F--, j--;
      }
      if (x > F) {
        if (x <= j) {
          const q = j + 1,
            z = q < U ? d[q].el : S;
          for (; x <= j; )
            P(null, (d[x] = C ? et(d[x]) : Me(d[x])), m, z, _, w, L, O, C), x++;
        }
      } else if (x > j) for (; x <= F; ) $e(u[x], _, w, !0), x++;
      else {
        const q = x,
          z = x,
          ee = new Map();
        for (x = z; x <= j; x++) {
          const Ee = (d[x] = C ? et(d[x]) : Me(d[x]));
          Ee.key != null && ee.set(Ee.key, x);
        }
        let Z,
          xe = 0;
        const pe = j - z + 1;
        let Fe = !1,
          Te = 0;
        const Nt = new Array(pe);
        for (x = 0; x < pe; x++) Nt[x] = 0;
        for (x = q; x <= F; x++) {
          const Ee = u[x];
          if (xe >= pe) {
            $e(Ee, _, w, !0);
            continue;
          }
          let je;
          if (Ee.key != null) je = ee.get(Ee.key);
          else
            for (Z = z; Z <= j; Z++)
              if (Nt[Z - z] === 0 && dt(Ee, d[Z])) {
                je = Z;
                break;
              }
          je === void 0
            ? $e(Ee, _, w, !0)
            : ((Nt[je - z] = x + 1),
              je >= Te ? (Te = je) : (Fe = !0),
              P(Ee, d[je], m, null, _, w, L, O, C),
              xe++);
        }
        const Js = Fe ? lc(Nt) : At;
        for (Z = Js.length - 1, x = pe - 1; x >= 0; x--) {
          const Ee = z + x,
            je = d[Ee],
            Qs = Ee + 1 < U ? d[Ee + 1].el : S;
          Nt[x] === 0
            ? P(null, je, m, Qs, _, w, L, O, C)
            : Fe && (Z < 0 || x !== Js[Z] ? lt(je, m, Qs, 2) : Z--);
        }
      }
    },
    lt = (u, d, m, S, _ = null) => {
      const { el: w, type: L, transition: O, children: C, shapeFlag: x } = u;
      if (x & 6) {
        lt(u.component.subTree, d, m, S);
        return;
      }
      if (x & 128) {
        u.suspense.move(d, m, S);
        return;
      }
      if (x & 64) {
        L.move(u, d, m, xt);
        return;
      }
      if (L === Se) {
        s(w, d, m);
        for (let F = 0; F < C.length; F++) lt(C[F], d, m, S);
        s(u.anchor, d, m);
        return;
      }
      if (L === Wt) {
        p(u, d, m);
        return;
      }
      if (S !== 2 && x & 1 && O)
        if (S === 0) O.beforeEnter(w), s(w, d, m), Ce(() => O.enter(w), _);
        else {
          const { leave: F, delayLeave: j, afterLeave: q } = O,
            z = () => s(w, d, m),
            ee = () => {
              F(w, () => {
                z(), q && q();
              });
            };
          j ? j(w, z, ee) : ee();
        }
      else s(w, d, m);
    },
    $e = (u, d, m, S = !1, _ = !1) => {
      const {
        type: w,
        props: L,
        ref: O,
        children: C,
        dynamicChildren: x,
        shapeFlag: U,
        patchFlag: F,
        dirs: j,
        cacheIndex: q,
      } = u;
      if (
        (F === -2 && (_ = !1),
        O != null && Gt(O, null, m, u, !0),
        q != null && (d.renderCache[q] = void 0),
        U & 256)
      ) {
        d.ctx.deactivate(u);
        return;
      }
      const z = U & 1 && j,
        ee = !mt(u);
      let Z;
      if ((ee && (Z = L && L.onVnodeBeforeUnmount) && Oe(Z, d, u), U & 6))
        Co(u.component, m, S);
      else {
        if (U & 128) {
          u.suspense.unmount(m, S);
          return;
        }
        z && We(u, null, d, 'beforeUnmount'),
          U & 64
            ? u.type.remove(u, d, m, xt, S)
            : x && !x.hasOnce && (w !== Se || (F > 0 && F & 64))
              ? Lt(x, d, m, !1, !0)
              : ((w === Se && F & 384) || (!_ && U & 16)) && Lt(C, d, m),
          S && Ys(u);
      }
      ((ee && (Z = L && L.onVnodeUnmounted)) || z) &&
        Ce(() => {
          Z && Oe(Z, d, u), z && We(u, null, d, 'unmounted');
        }, m);
    },
    Ys = (u) => {
      const { type: d, el: m, anchor: S, transition: _ } = u;
      if (d === Se) {
        Eo(m, S);
        return;
      }
      if (d === Wt) {
        g(u);
        return;
      }
      const w = () => {
        r(m), _ && !_.persisted && _.afterLeave && _.afterLeave();
      };
      if (u.shapeFlag & 1 && _ && !_.persisted) {
        const { leave: L, delayLeave: O } = _,
          C = () => L(m, w);
        O ? O(u.el, w, C) : C();
      } else w();
    },
    Eo = (u, d) => {
      let m;
      for (; u !== d; ) (m = v(u)), r(u), (u = m);
      r(d);
    },
    Co = (u, d, m) => {
      const { bum: S, scope: _, job: w, subTree: L, um: O, m: C, a: x } = u;
      dr(C),
        dr(x),
        S && qn(S),
        _.stop(),
        w && ((w.flags |= 8), $e(L, u, d, m)),
        O && Ce(O, d),
        Ce(() => {
          u.isUnmounted = !0;
        }, d),
        d &&
          d.pendingBranch &&
          !d.isUnmounted &&
          u.asyncDep &&
          !u.asyncResolved &&
          u.suspenseId === d.pendingId &&
          (d.deps--, d.deps === 0 && d.resolve());
    },
    Lt = (u, d, m, S = !1, _ = !1, w = 0) => {
      for (let L = w; L < u.length; L++) $e(u[L], d, m, S, _);
    },
    sn = (u) => {
      if (u.shapeFlag & 6) return sn(u.component.subTree);
      if (u.shapeFlag & 128) return u.suspense.next();
      const d = v(u.anchor || u.el),
        m = d && d[El];
      return m ? v(m) : d;
    };
  let Un = !1;
  const zs = (u, d, m) => {
      u == null
        ? d._vnode && $e(d._vnode, null, null, !0)
        : P(d._vnode || null, u, d, null, null, null, m),
        (d._vnode = u),
        Un || ((Un = !0), nr(), Tn(), (Un = !1));
    },
    xt = {
      p: P,
      um: $e,
      m: lt,
      r: Ys,
      mt: Y,
      mc: k,
      pc: D,
      pbc: I,
      n: sn,
      o: e,
    };
  let Bn, Kn;
  return (
    t && ([Bn, Kn] = t(xt)), { render: zs, hydrate: Bn, createApp: Jl(zs, Bn) }
  );
}
function Zn({ type: e, props: t }, n) {
  return (n === 'svg' && e === 'foreignObject') ||
    (n === 'mathml' &&
      e === 'annotation-xml' &&
      t &&
      t.encoding &&
      t.encoding.includes('html'))
    ? void 0
    : n;
}
function ct({ effect: e, job: t }, n) {
  n ? ((e.flags |= 32), (t.flags |= 4)) : ((e.flags &= -33), (t.flags &= -5));
}
function qi(e, t) {
  return (!e || (e && !e.pendingBranch)) && t && !t.persisted;
}
function Gi(e, t, n = !1) {
  const s = e.children,
    r = t.children;
  if (B(s) && B(r))
    for (let i = 0; i < s.length; i++) {
      const o = s[i];
      let l = r[i];
      l.shapeFlag & 1 &&
        !l.dynamicChildren &&
        ((l.patchFlag <= 0 || l.patchFlag === 32) &&
          ((l = r[i] = et(r[i])), (l.el = o.el)),
        !n && l.patchFlag !== -2 && Gi(o, l)),
        l.type === bt && (l.el = o.el);
    }
}
function lc(e) {
  const t = e.slice(),
    n = [0];
  let s, r, i, o, l;
  const c = e.length;
  for (s = 0; s < c; s++) {
    const f = e[s];
    if (f !== 0) {
      if (((r = n[n.length - 1]), e[r] < f)) {
        (t[s] = r), n.push(s);
        continue;
      }
      for (i = 0, o = n.length - 1; i < o; )
        (l = (i + o) >> 1), e[n[l]] < f ? (i = l + 1) : (o = l);
      f < e[n[i]] && (i > 0 && (t[s] = n[i - 1]), (n[i] = s));
    }
  }
  for (i = n.length, o = n[i - 1]; i-- > 0; ) (n[i] = o), (o = t[o]);
  return n;
}
function Xi(e) {
  const t = e.subTree.component;
  if (t) return t.asyncDep && !t.asyncResolved ? t : Xi(t);
}
function dr(e) {
  if (e) for (let t = 0; t < e.length; t++) e[t].flags |= 8;
}
const cc = Symbol.for('v-scx'),
  ac = () => yt(cc);
function Yi(e, t) {
  return Vn(e, null, t);
}
function mf(e, t) {
  return Vn(e, null, { flush: 'post' });
}
function Le(e, t, n) {
  return Vn(e, t, n);
}
function Vn(e, t, n = ne) {
  const { immediate: s, deep: r, flush: i, once: o } = n,
    l = ue({}, n),
    c = (t && s) || (!t && i !== 'post');
  let f;
  if (zt) {
    if (i === 'sync') {
      const y = ac();
      f = y.__watcherHandles || (y.__watcherHandles = []);
    } else if (!c) {
      const y = () => {};
      return (y.stop = ke), (y.resume = ke), (y.pause = ke), y;
    }
  }
  const a = fe;
  l.call = (y, A, P) => De(y, a, A, P);
  let h = !1;
  i === 'post'
    ? (l.scheduler = (y) => {
        Ce(y, a && a.suspense);
      })
    : i !== 'sync' &&
      ((h = !0),
      (l.scheduler = (y, A) => {
        A ? y() : ks(y);
      })),
    (l.augmentJob = (y) => {
      t && (y.flags |= 4),
        h && ((y.flags |= 2), a && ((y.id = a.uid), (y.i = a)));
    });
  const v = _l(e, t, l);
  return zt && (f ? f.push(v) : c && v()), v;
}
function fc(e, t, n) {
  const s = this.proxy,
    r = oe(e) ? (e.includes('.') ? zi(s, e) : () => s[e]) : e.bind(s, s);
  let i;
  G(t) ? (i = t) : ((i = t.handler), (n = t));
  const o = tn(this),
    l = Vn(r, i.bind(s), n);
  return o(), l;
}
function zi(e, t) {
  const n = t.split('.');
  return () => {
    let s = e;
    for (let r = 0; r < n.length && s; r++) s = s[n[r]];
    return s;
  };
}
const uc = (e, t) =>
  t === 'modelValue' || t === 'model-value'
    ? e.modelModifiers
    : e[`${t}Modifiers`] || e[`${Ne(t)}Modifiers`] || e[`${rt(t)}Modifiers`];
function dc(e, t, ...n) {
  if (e.isUnmounted) return;
  const s = e.vnode.props || ne;
  let r = n;
  const i = t.startsWith('update:'),
    o = i && uc(s, t.slice(7));
  o &&
    (o.trim && (r = n.map((a) => (oe(a) ? a.trim() : a))),
    o.number && (r = n.map(Po)));
  let l,
    c = s[(l = mn(t))] || s[(l = mn(Ne(t)))];
  !c && i && (c = s[(l = mn(rt(t)))]), c && De(c, e, 6, r);
  const f = s[l + 'Once'];
  if (f) {
    if (!e.emitted) e.emitted = {};
    else if (e.emitted[l]) return;
    (e.emitted[l] = !0), De(f, e, 6, r);
  }
}
function Ji(e, t, n = !1) {
  const s = t.emitsCache,
    r = s.get(e);
  if (r !== void 0) return r;
  const i = e.emits;
  let o = {},
    l = !1;
  if (!G(e)) {
    const c = (f) => {
      const a = Ji(f, t, !0);
      a && ((l = !0), ue(o, a));
    };
    !n && t.mixins.length && t.mixins.forEach(c),
      e.extends && c(e.extends),
      e.mixins && e.mixins.forEach(c);
  }
  return !i && !l
    ? (se(e) && s.set(e, null), null)
    : (B(i) ? i.forEach((c) => (o[c] = null)) : ue(o, i),
      se(e) && s.set(e, o),
      o);
}
function Wn(e, t) {
  return !e || !Qt(t)
    ? !1
    : ((t = t.slice(2).replace(/Once$/, '')),
      Q(e, t[0].toLowerCase() + t.slice(1)) || Q(e, rt(t)) || Q(e, t));
}
function es(e) {
  const {
      type: t,
      vnode: n,
      proxy: s,
      withProxy: r,
      propsOptions: [i],
      slots: o,
      attrs: l,
      emit: c,
      render: f,
      renderCache: a,
      props: h,
      data: v,
      setupState: y,
      ctx: A,
      inheritAttrs: P,
    } = e,
    K = En(e);
  let H, W;
  try {
    if (n.shapeFlag & 4) {
      const g = r || s,
        M = g;
      (H = Me(f.call(M, g, a, h, y, v, A))), (W = l);
    } else {
      const g = t;
      (H = Me(
        g.length > 1 ? g(h, { attrs: l, slots: o, emit: c }) : g(h, null)
      )),
        (W = t.props ? l : hc(l));
    }
  } catch (g) {
    (kt.length = 0), Fn(g, e, 1), (H = he(ye));
  }
  let p = H;
  if (W && P !== !1) {
    const g = Object.keys(W),
      { shapeFlag: M } = p;
    g.length &&
      M & 7 &&
      (i && g.some(Ms) && (W = pc(W, i)), (p = st(p, W, !1, !0)));
  }
  return (
    n.dirs &&
      ((p = st(p, null, !1, !0)),
      (p.dirs = p.dirs ? p.dirs.concat(n.dirs) : n.dirs)),
    n.transition && qt(p, n.transition),
    (H = p),
    En(K),
    H
  );
}
const hc = (e) => {
    let t;
    for (const n in e)
      (n === 'class' || n === 'style' || Qt(n)) && ((t || (t = {}))[n] = e[n]);
    return t;
  },
  pc = (e, t) => {
    const n = {};
    for (const s in e) (!Ms(s) || !(s.slice(9) in t)) && (n[s] = e[s]);
    return n;
  };
function gc(e, t, n) {
  const { props: s, children: r, component: i } = e,
    { props: o, children: l, patchFlag: c } = t,
    f = i.emitsOptions;
  if (t.dirs || t.transition) return !0;
  if (n && c >= 0) {
    if (c & 1024) return !0;
    if (c & 16) return s ? hr(s, o, f) : !!o;
    if (c & 8) {
      const a = t.dynamicProps;
      for (let h = 0; h < a.length; h++) {
        const v = a[h];
        if (o[v] !== s[v] && !Wn(f, v)) return !0;
      }
    }
  } else
    return (r || l) && (!l || !l.$stable)
      ? !0
      : s === o
        ? !1
        : s
          ? o
            ? hr(s, o, f)
            : !0
          : !!o;
  return !1;
}
function hr(e, t, n) {
  const s = Object.keys(t);
  if (s.length !== Object.keys(e).length) return !0;
  for (let r = 0; r < s.length; r++) {
    const i = s[r];
    if (t[i] !== e[i] && !Wn(n, i)) return !0;
  }
  return !1;
}
function Qi({ vnode: e, parent: t }, n) {
  for (; t; ) {
    const s = t.subTree;
    if ((s.suspense && s.suspense.activeBranch === e && (s.el = e.el), s === e))
      ((e = t.vnode).el = n), (t = t.parent);
    else break;
  }
}
const Zi = (e) => e.__isSuspense;
function eo(e, t) {
  t && t.pendingBranch
    ? B(e)
      ? t.effects.push(...e)
      : t.effects.push(e)
    : xl(e);
}
const Se = Symbol.for('v-fgt'),
  bt = Symbol.for('v-txt'),
  ye = Symbol.for('v-cmt'),
  Wt = Symbol.for('v-stc'),
  kt = [];
let Ae = null;
function Ts(e = !1) {
  kt.push((Ae = e ? null : []));
}
function mc() {
  kt.pop(), (Ae = kt[kt.length - 1] || null);
}
let Xt = 1;
function pr(e, t = !1) {
  (Xt += e), e < 0 && Ae && t && (Ae.hasOnce = !0);
}
function to(e) {
  return (
    (e.dynamicChildren = Xt > 0 ? Ae || At : null),
    mc(),
    Xt > 0 && Ae && Ae.push(e),
    e
  );
}
function vf(e, t, n, s, r, i) {
  return to(so(e, t, n, s, r, i, !0));
}
function Es(e, t, n, s, r) {
  return to(he(e, t, n, s, r, !0));
}
function Yt(e) {
  return e ? e.__v_isVNode === !0 : !1;
}
function dt(e, t) {
  return e.type === t.type && e.key === t.key;
}
const no = ({ key: e }) => e ?? null,
  yn = ({ ref: e, ref_key: t, ref_for: n }) => (
    typeof e == 'number' && (e = '' + e),
    e != null
      ? oe(e) || ae(e) || G(e)
        ? { i: de, r: e, k: t, f: !!n }
        : e
      : null
  );
function so(
  e,
  t = null,
  n = null,
  s = 0,
  r = null,
  i = e === Se ? 0 : 1,
  o = !1,
  l = !1
) {
  const c = {
    __v_isVNode: !0,
    __v_skip: !0,
    type: e,
    props: t,
    key: t && no(t),
    ref: t && yn(t),
    scopeId: yi,
    slotScopeIds: null,
    children: n,
    component: null,
    suspense: null,
    ssContent: null,
    ssFallback: null,
    dirs: null,
    transition: null,
    el: null,
    anchor: null,
    target: null,
    targetStart: null,
    targetAnchor: null,
    staticCount: 0,
    shapeFlag: i,
    patchFlag: s,
    dynamicProps: r,
    dynamicChildren: null,
    appContext: null,
    ctx: de,
  };
  return (
    l
      ? (Bs(c, n), i & 128 && e.normalize(c))
      : n && (c.shapeFlag |= oe(n) ? 8 : 16),
    Xt > 0 &&
      !o &&
      Ae &&
      (c.patchFlag > 0 || i & 6) &&
      c.patchFlag !== 32 &&
      Ae.push(c),
    c
  );
}
const he = vc;
function vc(e, t = null, n = null, s = 0, r = null, i = !1) {
  if (((!e || e === Mi) && (e = ye), Yt(e))) {
    const l = st(e, t, !0);
    return (
      n && Bs(l, n),
      Xt > 0 &&
        !i &&
        Ae &&
        (l.shapeFlag & 6 ? (Ae[Ae.indexOf(e)] = l) : Ae.push(l)),
      (l.patchFlag = -2),
      l
    );
  }
  if ((Ac(e) && (e = e.__vccOpts), t)) {
    t = yc(t);
    let { class: l, style: c } = t;
    l && !oe(l) && (t.class = Ns(l)),
      se(c) && (Vs(c) && !B(c) && (c = ue({}, c)), (t.style = Ls(c)));
  }
  const o = oe(e) ? 1 : Zi(e) ? 128 : bi(e) ? 64 : se(e) ? 4 : G(e) ? 2 : 0;
  return so(e, t, n, s, r, o, i, !0);
}
function yc(e) {
  return e ? (Vs(e) || ji(e) ? ue({}, e) : e) : null;
}
function st(e, t, n = !1, s = !1) {
  const { props: r, ref: i, patchFlag: o, children: l, transition: c } = e,
    f = t ? bc(r || {}, t) : r,
    a = {
      __v_isVNode: !0,
      __v_skip: !0,
      type: e.type,
      props: f,
      key: f && no(f),
      ref:
        t && t.ref
          ? n && i
            ? B(i)
              ? i.concat(yn(t))
              : [i, yn(t)]
            : yn(t)
          : i,
      scopeId: e.scopeId,
      slotScopeIds: e.slotScopeIds,
      children: l,
      target: e.target,
      targetStart: e.targetStart,
      targetAnchor: e.targetAnchor,
      staticCount: e.staticCount,
      shapeFlag: e.shapeFlag,
      patchFlag: t && e.type !== Se ? (o === -1 ? 16 : o | 16) : o,
      dynamicProps: e.dynamicProps,
      dynamicChildren: e.dynamicChildren,
      appContext: e.appContext,
      dirs: e.dirs,
      transition: c,
      component: e.component,
      suspense: e.suspense,
      ssContent: e.ssContent && st(e.ssContent),
      ssFallback: e.ssFallback && st(e.ssFallback),
      el: e.el,
      anchor: e.anchor,
      ctx: e.ctx,
      ce: e.ce,
    };
  return c && s && qt(a, c.clone(a)), a;
}
function ro(e = ' ', t = 0) {
  return he(bt, null, e, t);
}
function yf(e, t) {
  const n = he(Wt, null, e);
  return (n.staticCount = t), n;
}
function bf(e = '', t = !1) {
  return t ? (Ts(), Es(ye, null, e)) : he(ye, null, e);
}
function Me(e) {
  return e == null || typeof e == 'boolean'
    ? he(ye)
    : B(e)
      ? he(Se, null, e.slice())
      : Yt(e)
        ? et(e)
        : he(bt, null, String(e));
}
function et(e) {
  return (e.el === null && e.patchFlag !== -1) || e.memo ? e : st(e);
}
function Bs(e, t) {
  let n = 0;
  const { shapeFlag: s } = e;
  if (t == null) t = null;
  else if (B(t)) n = 16;
  else if (typeof t == 'object')
    if (s & 65) {
      const r = t.default;
      r && (r._c && (r._d = !1), Bs(e, r()), r._c && (r._d = !0));
      return;
    } else {
      n = 32;
      const r = t._;
      !r && !ji(t)
        ? (t._ctx = de)
        : r === 3 &&
          de &&
          (de.slots._ === 1 ? (t._ = 1) : ((t._ = 2), (e.patchFlag |= 1024)));
    }
  else
    G(t)
      ? ((t = { default: t, _ctx: de }), (n = 32))
      : ((t = String(t)), s & 64 ? ((n = 16), (t = [ro(t)])) : (n = 8));
  (e.children = t), (e.shapeFlag |= n);
}
function bc(...e) {
  const t = {};
  for (let n = 0; n < e.length; n++) {
    const s = e[n];
    for (const r in s)
      if (r === 'class')
        t.class !== s.class && (t.class = Ns([t.class, s.class]));
      else if (r === 'style') t.style = Ls([t.style, s.style]);
      else if (Qt(r)) {
        const i = t[r],
          o = s[r];
        o &&
          i !== o &&
          !(B(i) && i.includes(o)) &&
          (t[r] = i ? [].concat(i, o) : o);
      } else r !== '' && (t[r] = s[r]);
  }
  return t;
}
function Oe(e, t, n, s = null) {
  De(e, t, 7, [n, s]);
}
const _c = Fi();
let wc = 0;
function Sc(e, t, n) {
  const s = e.type,
    r = (t ? t.appContext : e.appContext) || _c,
    i = {
      uid: wc++,
      vnode: e,
      type: s,
      parent: t,
      appContext: r,
      root: null,
      next: null,
      subTree: null,
      effect: null,
      update: null,
      job: null,
      scope: new Wo(!0),
      render: null,
      proxy: null,
      exposed: null,
      exposeProxy: null,
      withProxy: null,
      provides: t ? t.provides : Object.create(r.provides),
      ids: t ? t.ids : ['', 0, 0],
      accessCache: null,
      renderCache: [],
      components: null,
      directives: null,
      propsOptions: Wi(s, r),
      emitsOptions: Ji(s, r),
      emit: null,
      emitted: null,
      propsDefaults: ne,
      inheritAttrs: s.inheritAttrs,
      ctx: ne,
      data: ne,
      props: ne,
      attrs: ne,
      slots: ne,
      refs: ne,
      setupState: ne,
      setupContext: null,
      suspense: n,
      suspenseId: n ? n.pendingId : 0,
      asyncDep: null,
      asyncResolved: !1,
      isMounted: !1,
      isUnmounted: !1,
      isDeactivated: !1,
      bc: null,
      c: null,
      bm: null,
      m: null,
      bu: null,
      u: null,
      um: null,
      bum: null,
      da: null,
      a: null,
      rtg: null,
      rtc: null,
      ec: null,
      sp: null,
    };
  return (
    (i.ctx = { _: i }),
    (i.root = t ? t.root : i),
    (i.emit = dc.bind(null, i)),
    e.ce && e.ce(i),
    i
  );
}
let fe = null;
const en = () => fe || de;
let An, Cs;
{
  const e = In(),
    t = (n, s) => {
      let r;
      return (
        (r = e[n]) || (r = e[n] = []),
        r.push(s),
        (i) => {
          r.length > 1 ? r.forEach((o) => o(i)) : r[0](i);
        }
      );
    };
  (An = t('__VUE_INSTANCE_SETTERS__', (n) => (fe = n))),
    (Cs = t('__VUE_SSR_SETTERS__', (n) => (zt = n)));
}
const tn = (e) => {
    const t = fe;
    return (
      An(e),
      e.scope.on(),
      () => {
        e.scope.off(), An(t);
      }
    );
  },
  gr = () => {
    fe && fe.scope.off(), An(null);
  };
function io(e) {
  return e.vnode.shapeFlag & 4;
}
let zt = !1;
function xc(e, t = !1, n = !1) {
  t && Cs(t);
  const { props: s, children: r } = e.vnode,
    i = io(e);
  Zl(e, s, i, t), sc(e, r, n);
  const o = i ? Tc(e, t) : void 0;
  return t && Cs(!1), o;
}
function Tc(e, t) {
  const n = e.type;
  (e.accessCache = Object.create(null)), (e.proxy = new Proxy(e.ctx, Ul));
  const { setup: s } = n;
  if (s) {
    it();
    const r = (e.setupContext = s.length > 1 ? lo(e) : null),
      i = tn(e),
      o = Zt(s, e, 0, [e.props, r]),
      l = Kr(o);
    if ((ot(), i(), (l || e.sp) && !mt(e) && Ci(e), l)) {
      if ((o.then(gr, gr), t))
        return o
          .then((c) => {
            mr(e, c);
          })
          .catch((c) => {
            Fn(c, e, 0);
          });
      e.asyncDep = o;
    } else mr(e, o);
  } else oo(e);
}
function mr(e, t, n) {
  G(t)
    ? e.type.__ssrInlineRender
      ? (e.ssrRender = t)
      : (e.render = t)
    : se(t) && (e.setupState = pi(t)),
    oo(e);
}
function oo(e, t, n) {
  const s = e.type;
  e.render || (e.render = s.render || ke);
  {
    const r = tn(e);
    it();
    try {
      Kl(e);
    } finally {
      ot(), r();
    }
  }
}
const Ec = {
  get(e, t) {
    return me(e, 'get', ''), e[t];
  },
};
function lo(e) {
  const t = (n) => {
    e.exposed = n || {};
  };
  return {
    attrs: new Proxy(e.attrs, Ec),
    slots: e.slots,
    emit: e.emit,
    expose: t,
  };
}
function Ks(e) {
  return e.exposed
    ? e.exposeProxy ||
        (e.exposeProxy = new Proxy(pi(vn(e.exposed)), {
          get(t, n) {
            if (n in t) return t[n];
            if (n in Vt) return Vt[n](e);
          },
          has(t, n) {
            return n in t || n in Vt;
          },
        }))
    : e.proxy;
}
function Cc(e, t = !0) {
  return G(e) ? e.displayName || e.name : e.name || (t && e.__name);
}
function Ac(e) {
  return G(e) && '__vccOpts' in e;
}
const ie = (e, t) => yl(e, t, zt);
function As(e, t, n) {
  const s = arguments.length;
  return s === 2
    ? se(t) && !B(t)
      ? Yt(t)
        ? he(e, null, [t])
        : he(e, t)
      : he(e, null, t)
    : (s > 3
        ? (n = Array.prototype.slice.call(arguments, 2))
        : s === 3 && Yt(n) && (n = [n]),
      he(e, t, n));
}
const Rc = '3.5.13';
/**
 * @vue/runtime-dom v3.5.13
 * (c) 2018-present Yuxi (Evan) You and Vue contributors
 * @license MIT
 **/ let Rs;
const vr = typeof window < 'u' && window.trustedTypes;
if (vr)
  try {
    Rs = vr.createPolicy('vue', { createHTML: (e) => e });
  } catch {}
const co = Rs ? (e) => Rs.createHTML(e) : (e) => e,
  Oc = 'http://www.w3.org/2000/svg',
  Mc = 'http://www.w3.org/1998/Math/MathML',
  Ke = typeof document < 'u' ? document : null,
  yr = Ke && Ke.createElement('template'),
  Ic = {
    insert: (e, t, n) => {
      t.insertBefore(e, n || null);
    },
    remove: (e) => {
      const t = e.parentNode;
      t && t.removeChild(e);
    },
    createElement: (e, t, n, s) => {
      const r =
        t === 'svg'
          ? Ke.createElementNS(Oc, e)
          : t === 'mathml'
            ? Ke.createElementNS(Mc, e)
            : n
              ? Ke.createElement(e, { is: n })
              : Ke.createElement(e);
      return (
        e === 'select' &&
          s &&
          s.multiple != null &&
          r.setAttribute('multiple', s.multiple),
        r
      );
    },
    createText: (e) => Ke.createTextNode(e),
    createComment: (e) => Ke.createComment(e),
    setText: (e, t) => {
      e.nodeValue = t;
    },
    setElementText: (e, t) => {
      e.textContent = t;
    },
    parentNode: (e) => e.parentNode,
    nextSibling: (e) => e.nextSibling,
    querySelector: (e) => Ke.querySelector(e),
    setScopeId(e, t) {
      e.setAttribute(t, '');
    },
    insertStaticContent(e, t, n, s, r, i) {
      const o = n ? n.previousSibling : t.lastChild;
      if (r && (r === i || r.nextSibling))
        for (
          ;
          t.insertBefore(r.cloneNode(!0), n),
            !(r === i || !(r = r.nextSibling));

        );
      else {
        yr.innerHTML = co(
          s === 'svg'
            ? `<svg>${e}</svg>`
            : s === 'mathml'
              ? `<math>${e}</math>`
              : e
        );
        const l = yr.content;
        if (s === 'svg' || s === 'mathml') {
          const c = l.firstChild;
          for (; c.firstChild; ) l.appendChild(c.firstChild);
          l.removeChild(c);
        }
        t.insertBefore(l, n);
      }
      return [
        o ? o.nextSibling : t.firstChild,
        n ? n.previousSibling : t.lastChild,
      ];
    },
  },
  Je = 'transition',
  Ht = 'animation',
  Jt = Symbol('_vtc'),
  ao = {
    name: String,
    type: String,
    css: { type: Boolean, default: !0 },
    duration: [String, Number, Object],
    enterFromClass: String,
    enterActiveClass: String,
    enterToClass: String,
    appearFromClass: String,
    appearActiveClass: String,
    appearToClass: String,
    leaveFromClass: String,
    leaveActiveClass: String,
    leaveToClass: String,
  },
  Pc = ue({}, _i, ao),
  Lc = (e) => ((e.displayName = 'Transition'), (e.props = Pc), e),
  _f = Lc((e, { slots: t }) => As(Rl, Nc(e), t)),
  at = (e, t = []) => {
    B(e) ? e.forEach((n) => n(...t)) : e && e(...t);
  },
  br = (e) => (e ? (B(e) ? e.some((t) => t.length > 1) : e.length > 1) : !1);
function Nc(e) {
  const t = {};
  for (const b in e) b in ao || (t[b] = e[b]);
  if (e.css === !1) return t;
  const {
      name: n = 'v',
      type: s,
      duration: r,
      enterFromClass: i = `${n}-enter-from`,
      enterActiveClass: o = `${n}-enter-active`,
      enterToClass: l = `${n}-enter-to`,
      appearFromClass: c = i,
      appearActiveClass: f = o,
      appearToClass: a = l,
      leaveFromClass: h = `${n}-leave-from`,
      leaveActiveClass: v = `${n}-leave-active`,
      leaveToClass: y = `${n}-leave-to`,
    } = e,
    A = Fc(r),
    P = A && A[0],
    K = A && A[1],
    {
      onBeforeEnter: H,
      onEnter: W,
      onEnterCancelled: p,
      onLeave: g,
      onLeaveCancelled: M,
      onBeforeAppear: V = H,
      onAppear: R = W,
      onAppearCancelled: k = p,
    } = t,
    T = (b, N, Y, re) => {
      (b._enterCancelled = re), ft(b, N ? a : l), ft(b, N ? f : o), Y && Y();
    },
    I = (b, N) => {
      (b._isLeaving = !1), ft(b, h), ft(b, y), ft(b, v), N && N();
    },
    E = (b) => (N, Y) => {
      const re = b ? R : W,
        $ = () => T(N, b, Y);
      at(re, [N, $]),
        _r(() => {
          ft(N, b ? c : i), Be(N, b ? a : l), br(re) || wr(N, s, P, $);
        });
    };
  return ue(t, {
    onBeforeEnter(b) {
      at(H, [b]), Be(b, i), Be(b, o);
    },
    onBeforeAppear(b) {
      at(V, [b]), Be(b, c), Be(b, f);
    },
    onEnter: E(!1),
    onAppear: E(!0),
    onLeave(b, N) {
      b._isLeaving = !0;
      const Y = () => I(b, N);
      Be(b, h),
        b._enterCancelled ? (Be(b, v), Tr()) : (Tr(), Be(b, v)),
        _r(() => {
          b._isLeaving && (ft(b, h), Be(b, y), br(g) || wr(b, s, K, Y));
        }),
        at(g, [b, Y]);
    },
    onEnterCancelled(b) {
      T(b, !1, void 0, !0), at(p, [b]);
    },
    onAppearCancelled(b) {
      T(b, !0, void 0, !0), at(k, [b]);
    },
    onLeaveCancelled(b) {
      I(b), at(M, [b]);
    },
  });
}
function Fc(e) {
  if (e == null) return null;
  if (se(e)) return [ts(e.enter), ts(e.leave)];
  {
    const t = ts(e);
    return [t, t];
  }
}
function ts(e) {
  return Lo(e);
}
function Be(e, t) {
  t.split(/\s+/).forEach((n) => n && e.classList.add(n)),
    (e[Jt] || (e[Jt] = new Set())).add(t);
}
function ft(e, t) {
  t.split(/\s+/).forEach((s) => s && e.classList.remove(s));
  const n = e[Jt];
  n && (n.delete(t), n.size || (e[Jt] = void 0));
}
function _r(e) {
  requestAnimationFrame(() => {
    requestAnimationFrame(e);
  });
}
let Hc = 0;
function wr(e, t, n, s) {
  const r = (e._endId = ++Hc),
    i = () => {
      r === e._endId && s();
    };
  if (n != null) return setTimeout(i, n);
  const { type: o, timeout: l, propCount: c } = Dc(e, t);
  if (!o) return s();
  const f = o + 'end';
  let a = 0;
  const h = () => {
      e.removeEventListener(f, v), i();
    },
    v = (y) => {
      y.target === e && ++a >= c && h();
    };
  setTimeout(() => {
    a < c && h();
  }, l + 1),
    e.addEventListener(f, v);
}
function Dc(e, t) {
  const n = window.getComputedStyle(e),
    s = (A) => (n[A] || '').split(', '),
    r = s(`${Je}Delay`),
    i = s(`${Je}Duration`),
    o = Sr(r, i),
    l = s(`${Ht}Delay`),
    c = s(`${Ht}Duration`),
    f = Sr(l, c);
  let a = null,
    h = 0,
    v = 0;
  t === Je
    ? o > 0 && ((a = Je), (h = o), (v = i.length))
    : t === Ht
      ? f > 0 && ((a = Ht), (h = f), (v = c.length))
      : ((h = Math.max(o, f)),
        (a = h > 0 ? (o > f ? Je : Ht) : null),
        (v = a ? (a === Je ? i.length : c.length) : 0));
  const y =
    a === Je && /\b(transform|all)(,|$)/.test(s(`${Je}Property`).toString());
  return { type: a, timeout: h, propCount: v, hasTransform: y };
}
function Sr(e, t) {
  for (; e.length < t.length; ) e = e.concat(e);
  return Math.max(...t.map((n, s) => xr(n) + xr(e[s])));
}
function xr(e) {
  return e === 'auto' ? 0 : Number(e.slice(0, -1).replace(',', '.')) * 1e3;
}
function Tr() {
  return document.body.offsetHeight;
}
function $c(e, t, n) {
  const s = e[Jt];
  s && (t = (t ? [t, ...s] : [...s]).join(' ')),
    t == null
      ? e.removeAttribute('class')
      : n
        ? e.setAttribute('class', t)
        : (e.className = t);
}
const Er = Symbol('_vod'),
  jc = Symbol('_vsh'),
  Vc = Symbol(''),
  Wc = /(^|;)\s*display\s*:/;
function kc(e, t, n) {
  const s = e.style,
    r = oe(n);
  let i = !1;
  if (n && !r) {
    if (t)
      if (oe(t))
        for (const o of t.split(';')) {
          const l = o.slice(0, o.indexOf(':')).trim();
          n[l] == null && bn(s, l, '');
        }
      else for (const o in t) n[o] == null && bn(s, o, '');
    for (const o in n) o === 'display' && (i = !0), bn(s, o, n[o]);
  } else if (r) {
    if (t !== n) {
      const o = s[Vc];
      o && (n += ';' + o), (s.cssText = n), (i = Wc.test(n));
    }
  } else t && e.removeAttribute('style');
  Er in e && ((e[Er] = i ? s.display : ''), e[jc] && (s.display = 'none'));
}
const Cr = /\s*!important$/;
function bn(e, t, n) {
  if (B(n)) n.forEach((s) => bn(e, t, s));
  else if ((n == null && (n = ''), t.startsWith('--'))) e.setProperty(t, n);
  else {
    const s = Uc(e, t);
    Cr.test(n)
      ? e.setProperty(rt(s), n.replace(Cr, ''), 'important')
      : (e[s] = n);
  }
}
const Ar = ['Webkit', 'Moz', 'ms'],
  ns = {};
function Uc(e, t) {
  const n = ns[t];
  if (n) return n;
  let s = Ne(t);
  if (s !== 'filter' && s in e) return (ns[t] = s);
  s = Mn(s);
  for (let r = 0; r < Ar.length; r++) {
    const i = Ar[r] + s;
    if (i in e) return (ns[t] = i);
  }
  return t;
}
const Rr = 'http://www.w3.org/1999/xlink';
function Or(e, t, n, s, r, i = jo(t)) {
  s && t.startsWith('xlink:')
    ? n == null
      ? e.removeAttributeNS(Rr, t.slice(6, t.length))
      : e.setAttributeNS(Rr, t, n)
    : n == null || (i && !Yr(n))
      ? e.removeAttribute(t)
      : e.setAttribute(t, i ? '' : Ye(n) ? String(n) : n);
}
function Mr(e, t, n, s, r) {
  if (t === 'innerHTML' || t === 'textContent') {
    n != null && (e[t] = t === 'innerHTML' ? co(n) : n);
    return;
  }
  const i = e.tagName;
  if (t === 'value' && i !== 'PROGRESS' && !i.includes('-')) {
    const l = i === 'OPTION' ? e.getAttribute('value') || '' : e.value,
      c = n == null ? (e.type === 'checkbox' ? 'on' : '') : String(n);
    (l !== c || !('_value' in e)) && (e.value = c),
      n == null && e.removeAttribute(t),
      (e._value = n);
    return;
  }
  let o = !1;
  if (n === '' || n == null) {
    const l = typeof e[t];
    l === 'boolean'
      ? (n = Yr(n))
      : n == null && l === 'string'
        ? ((n = ''), (o = !0))
        : l === 'number' && ((n = 0), (o = !0));
  }
  try {
    e[t] = n;
  } catch {}
  o && e.removeAttribute(r || t);
}
function Bc(e, t, n, s) {
  e.addEventListener(t, n, s);
}
function Kc(e, t, n, s) {
  e.removeEventListener(t, n, s);
}
const Ir = Symbol('_vei');
function qc(e, t, n, s, r = null) {
  const i = e[Ir] || (e[Ir] = {}),
    o = i[t];
  if (s && o) o.value = s;
  else {
    const [l, c] = Gc(t);
    if (s) {
      const f = (i[t] = zc(s, r));
      Bc(e, l, f, c);
    } else o && (Kc(e, l, o, c), (i[t] = void 0));
  }
}
const Pr = /(?:Once|Passive|Capture)$/;
function Gc(e) {
  let t;
  if (Pr.test(e)) {
    t = {};
    let s;
    for (; (s = e.match(Pr)); )
      (e = e.slice(0, e.length - s[0].length)), (t[s[0].toLowerCase()] = !0);
  }
  return [e[2] === ':' ? e.slice(3) : rt(e.slice(2)), t];
}
let ss = 0;
const Xc = Promise.resolve(),
  Yc = () => ss || (Xc.then(() => (ss = 0)), (ss = Date.now()));
function zc(e, t) {
  const n = (s) => {
    if (!s._vts) s._vts = Date.now();
    else if (s._vts <= n.attached) return;
    De(Jc(s, n.value), t, 5, [s]);
  };
  return (n.value = e), (n.attached = Yc()), n;
}
function Jc(e, t) {
  if (B(t)) {
    const n = e.stopImmediatePropagation;
    return (
      (e.stopImmediatePropagation = () => {
        n.call(e), (e._stopped = !0);
      }),
      t.map((s) => (r) => !r._stopped && s && s(r))
    );
  } else return t;
}
const Lr = (e) =>
    e.charCodeAt(0) === 111 &&
    e.charCodeAt(1) === 110 &&
    e.charCodeAt(2) > 96 &&
    e.charCodeAt(2) < 123,
  Qc = (e, t, n, s, r, i) => {
    const o = r === 'svg';
    t === 'class'
      ? $c(e, s, o)
      : t === 'style'
        ? kc(e, n, s)
        : Qt(t)
          ? Ms(t) || qc(e, t, n, s, i)
          : (
                t[0] === '.'
                  ? ((t = t.slice(1)), !0)
                  : t[0] === '^'
                    ? ((t = t.slice(1)), !1)
                    : Zc(e, t, s, o)
              )
            ? (Mr(e, t, s),
              !e.tagName.includes('-') &&
                (t === 'value' || t === 'checked' || t === 'selected') &&
                Or(e, t, s, o, i, t !== 'value'))
            : e._isVueCE && (/[A-Z]/.test(t) || !oe(s))
              ? Mr(e, Ne(t), s, i, t)
              : (t === 'true-value'
                  ? (e._trueValue = s)
                  : t === 'false-value' && (e._falseValue = s),
                Or(e, t, s, o));
  };
function Zc(e, t, n, s) {
  if (s)
    return !!(
      t === 'innerHTML' ||
      t === 'textContent' ||
      (t in e && Lr(t) && G(n))
    );
  if (
    t === 'spellcheck' ||
    t === 'draggable' ||
    t === 'translate' ||
    t === 'form' ||
    (t === 'list' && e.tagName === 'INPUT') ||
    (t === 'type' && e.tagName === 'TEXTAREA')
  )
    return !1;
  if (t === 'width' || t === 'height') {
    const r = e.tagName;
    if (r === 'IMG' || r === 'VIDEO' || r === 'CANVAS' || r === 'SOURCE')
      return !1;
  }
  return Lr(t) && oe(n) ? !1 : t in e;
}
const ea = ['ctrl', 'shift', 'alt', 'meta'],
  ta = {
    stop: (e) => e.stopPropagation(),
    prevent: (e) => e.preventDefault(),
    self: (e) => e.target !== e.currentTarget,
    ctrl: (e) => !e.ctrlKey,
    shift: (e) => !e.shiftKey,
    alt: (e) => !e.altKey,
    meta: (e) => !e.metaKey,
    left: (e) => 'button' in e && e.button !== 0,
    middle: (e) => 'button' in e && e.button !== 1,
    right: (e) => 'button' in e && e.button !== 2,
    exact: (e, t) => ea.some((n) => e[`${n}Key`] && !t.includes(n)),
  },
  wf = (e, t) => {
    const n = e._withMods || (e._withMods = {}),
      s = t.join('.');
    return (
      n[s] ||
      (n[s] = (r, ...i) => {
        for (let o = 0; o < t.length; o++) {
          const l = ta[t[o]];
          if (l && l(r, t)) return;
        }
        return e(r, ...i);
      })
    );
  },
  na = {
    esc: 'escape',
    space: ' ',
    up: 'arrow-up',
    left: 'arrow-left',
    right: 'arrow-right',
    down: 'arrow-down',
    delete: 'backspace',
  },
  Sf = (e, t) => {
    const n = e._withKeys || (e._withKeys = {}),
      s = t.join('.');
    return (
      n[s] ||
      (n[s] = (r) => {
        if (!('key' in r)) return;
        const i = rt(r.key);
        if (t.some((o) => o === i || na[o] === i)) return e(r);
      })
    );
  },
  sa = ue({ patchProp: Qc }, Ic);
let rs,
  Nr = !1;
function ra() {
  return (rs = Nr ? rs : ic(sa)), (Nr = !0), rs;
}
const xf = (...e) => {
  const t = ra().createApp(...e),
    { mount: n } = t;
  return (
    (t.mount = (s) => {
      const r = oa(s);
      if (r) return n(r, !0, ia(r));
    }),
    t
  );
};
function ia(e) {
  if (e instanceof SVGElement) return 'svg';
  if (typeof MathMLElement == 'function' && e instanceof MathMLElement)
    return 'mathml';
}
function oa(e) {
  return oe(e) ? document.querySelector(e) : e;
}
const la = window.__VP_SITE_DATA__;
function fo(e) {
  return Qr() ? (ko(e), !0) : !1;
}
const is = new WeakMap(),
  ca = (...e) => {
    var t;
    const n = e[0],
      s = (t = en()) == null ? void 0 : t.proxy;
    if (s == null && !Hi())
      throw new Error('injectLocal must be called in setup');
    return s && is.has(s) && n in is.get(s) ? is.get(s)[n] : yt(...e);
  },
  uo = typeof window < 'u' && typeof document < 'u';
typeof WorkerGlobalScope < 'u' && globalThis instanceof WorkerGlobalScope;
const aa = Object.prototype.toString,
  fa = (e) => aa.call(e) === '[object Object]',
  St = () => {},
  Fr = ua();
function ua() {
  var e, t;
  return (
    uo &&
    ((e = window == null ? void 0 : window.navigator) == null
      ? void 0
      : e.userAgent) &&
    (/iP(?:ad|hone|od)/.test(window.navigator.userAgent) ||
      (((t = window == null ? void 0 : window.navigator) == null
        ? void 0
        : t.maxTouchPoints) > 2 &&
        /iPad|Macintosh/.test(
          window == null ? void 0 : window.navigator.userAgent
        )))
  );
}
function qs(e, t) {
  function n(...s) {
    return new Promise((r, i) => {
      Promise.resolve(
        e(() => t.apply(this, s), { fn: t, thisArg: this, args: s })
      )
        .then(r)
        .catch(i);
    });
  }
  return n;
}
const ho = (e) => e();
function da(e, t = {}) {
  let n,
    s,
    r = St;
  const i = (c) => {
    clearTimeout(c), r(), (r = St);
  };
  let o;
  return (c) => {
    const f = le(e),
      a = le(t.maxWait);
    return (
      n && i(n),
      f <= 0 || (a !== void 0 && a <= 0)
        ? (s && (i(s), (s = null)), Promise.resolve(c()))
        : new Promise((h, v) => {
            (r = t.rejectOnCancel ? v : h),
              (o = c),
              a &&
                !s &&
                (s = setTimeout(() => {
                  n && i(n), (s = null), h(o());
                }, a)),
              (n = setTimeout(() => {
                s && i(s), (s = null), h(c());
              }, f));
          })
    );
  };
}
function ha(...e) {
  let t = 0,
    n,
    s = !0,
    r = St,
    i,
    o,
    l,
    c,
    f;
  !ae(e[0]) && typeof e[0] == 'object'
    ? ({
        delay: o,
        trailing: l = !0,
        leading: c = !0,
        rejectOnCancel: f = !1,
      } = e[0])
    : ([o, l = !0, c = !0, f = !1] = e);
  const a = () => {
    n && (clearTimeout(n), (n = void 0), r(), (r = St));
  };
  return (v) => {
    const y = le(o),
      A = Date.now() - t,
      P = () => (i = v());
    return (
      a(),
      y <= 0
        ? ((t = Date.now()), P())
        : (A > y && (c || !s)
            ? ((t = Date.now()), P())
            : l &&
              (i = new Promise((K, H) => {
                (r = f ? H : K),
                  (n = setTimeout(
                    () => {
                      (t = Date.now()), (s = !0), K(P()), a();
                    },
                    Math.max(0, y - A)
                  ));
              })),
          !c && !n && (n = setTimeout(() => (s = !0), y)),
          (s = !1),
          i)
    );
  };
}
function pa(e = ho, t = {}) {
  const { initialState: n = 'active' } = t,
    s = Gs(n === 'active');
  function r() {
    s.value = !1;
  }
  function i() {
    s.value = !0;
  }
  const o = (...l) => {
    s.value && e(...l);
  };
  return { isActive: Nn(s), pause: r, resume: i, eventFilter: o };
}
function Hr(e) {
  return e.endsWith('rem') ? Number.parseFloat(e) * 16 : Number.parseFloat(e);
}
function ga(e) {
  return en();
}
function os(e) {
  return Array.isArray(e) ? e : [e];
}
function Gs(...e) {
  if (e.length !== 1) return gl(...e);
  const t = e[0];
  return typeof t == 'function' ? Nn(dl(() => ({ get: t, set: St }))) : gt(t);
}
function ma(e, t = 200, n = {}) {
  return qs(da(t, n), e);
}
function va(e, t = 200, n = !1, s = !0, r = !1) {
  return qs(ha(t, n, s, r), e);
}
function ya(e, t, n = {}) {
  const { eventFilter: s = ho, ...r } = n;
  return Le(e, qs(s, t), r);
}
function ba(e, t, n = {}) {
  const { eventFilter: s, initialState: r = 'active', ...i } = n,
    {
      eventFilter: o,
      pause: l,
      resume: c,
      isActive: f,
    } = pa(s, { initialState: r });
  return {
    stop: ya(e, t, { ...i, eventFilter: o }),
    pause: l,
    resume: c,
    isActive: f,
  };
}
function kn(e, t = !0, n) {
  ga() ? Pt(e, n) : t ? e() : Hn(e);
}
function _a(e, t, n) {
  return Le(e, t, { ...n, immediate: !0 });
}
const Ge = uo ? window : void 0;
function Xs(e) {
  var t;
  const n = le(e);
  return (t = n == null ? void 0 : n.$el) != null ? t : n;
}
function Xe(...e) {
  const t = [],
    n = () => {
      t.forEach((l) => l()), (t.length = 0);
    },
    s = (l, c, f, a) => (
      l.addEventListener(c, f, a), () => l.removeEventListener(c, f, a)
    ),
    r = ie(() => {
      const l = os(le(e[0])).filter((c) => c != null);
      return l.every((c) => typeof c != 'string') ? l : void 0;
    }),
    i = _a(
      () => {
        var l, c;
        return [
          (c = (l = r.value) == null ? void 0 : l.map((f) => Xs(f))) != null
            ? c
            : [Ge].filter((f) => f != null),
          os(le(r.value ? e[1] : e[0])),
          os(Ws(r.value ? e[2] : e[1])),
          le(r.value ? e[3] : e[2]),
        ];
      },
      ([l, c, f, a]) => {
        if (
          (n(),
          !(l != null && l.length) ||
            !(c != null && c.length) ||
            !(f != null && f.length))
        )
          return;
        const h = fa(a) ? { ...a } : a;
        t.push(
          ...l.flatMap((v) => c.flatMap((y) => f.map((A) => s(v, y, A, h))))
        );
      },
      { flush: 'post' }
    ),
    o = () => {
      i(), n();
    };
  return fo(n), o;
}
function wa() {
  const e = Pe(!1),
    t = en();
  return (
    t &&
      Pt(() => {
        e.value = !0;
      }, t),
    e
  );
}
function Sa(e) {
  const t = wa();
  return ie(() => (t.value, !!e()));
}
function xa(e) {
  return typeof e == 'function'
    ? e
    : typeof e == 'string'
      ? (t) => t.key === e
      : Array.isArray(e)
        ? (t) => e.includes(t.key)
        : () => !0;
}
function Tf(...e) {
  let t,
    n,
    s = {};
  e.length === 3
    ? ((t = e[0]), (n = e[1]), (s = e[2]))
    : e.length === 2
      ? typeof e[1] == 'object'
        ? ((t = !0), (n = e[0]), (s = e[1]))
        : ((t = e[0]), (n = e[1]))
      : ((t = !0), (n = e[0]));
  const {
      target: r = Ge,
      eventName: i = 'keydown',
      passive: o = !1,
      dedupe: l = !1,
    } = s,
    c = xa(t);
  return Xe(
    r,
    i,
    (a) => {
      (a.repeat && le(l)) || (c(a) && n(a));
    },
    o
  );
}
const Ta = Symbol('vueuse-ssr-width');
function Ea() {
  const e = Hi() ? ca(Ta, null) : null;
  return typeof e == 'number' ? e : void 0;
}
function po(e, t = {}) {
  const { window: n = Ge, ssrWidth: s = Ea() } = t,
    r = Sa(() => n && 'matchMedia' in n && typeof n.matchMedia == 'function'),
    i = Pe(typeof s == 'number'),
    o = Pe(),
    l = Pe(!1),
    c = (f) => {
      l.value = f.matches;
    };
  return (
    Yi(() => {
      if (i.value) {
        i.value = !r.value;
        const f = le(e).split(',');
        l.value = f.some((a) => {
          const h = a.includes('not all'),
            v = a.match(/\(\s*min-width:\s*(-?\d+(?:\.\d*)?[a-z]+\s*)\)/),
            y = a.match(/\(\s*max-width:\s*(-?\d+(?:\.\d*)?[a-z]+\s*)\)/);
          let A = !!(v || y);
          return (
            v && A && (A = s >= Hr(v[1])),
            y && A && (A = s <= Hr(y[1])),
            h ? !A : A
          );
        });
        return;
      }
      r.value && ((o.value = n.matchMedia(le(e))), (l.value = o.value.matches));
    }),
    Xe(o, 'change', c, { passive: !0 }),
    ie(() => l.value)
  );
}
const dn =
    typeof globalThis < 'u'
      ? globalThis
      : typeof window < 'u'
        ? window
        : typeof global < 'u'
          ? global
          : typeof self < 'u'
            ? self
            : {},
  hn = '__vueuse_ssr_handlers__',
  Ca = Aa();
function Aa() {
  return hn in dn || (dn[hn] = dn[hn] || {}), dn[hn];
}
function go(e, t) {
  return Ca[e] || t;
}
function mo(e) {
  return po('(prefers-color-scheme: dark)', e);
}
function Ra(e) {
  return e == null
    ? 'any'
    : e instanceof Set
      ? 'set'
      : e instanceof Map
        ? 'map'
        : e instanceof Date
          ? 'date'
          : typeof e == 'boolean'
            ? 'boolean'
            : typeof e == 'string'
              ? 'string'
              : typeof e == 'object'
                ? 'object'
                : Number.isNaN(e)
                  ? 'any'
                  : 'number';
}
const Oa = {
    boolean: { read: (e) => e === 'true', write: (e) => String(e) },
    object: { read: (e) => JSON.parse(e), write: (e) => JSON.stringify(e) },
    number: { read: (e) => Number.parseFloat(e), write: (e) => String(e) },
    any: { read: (e) => e, write: (e) => String(e) },
    string: { read: (e) => e, write: (e) => String(e) },
    map: {
      read: (e) => new Map(JSON.parse(e)),
      write: (e) => JSON.stringify(Array.from(e.entries())),
    },
    set: {
      read: (e) => new Set(JSON.parse(e)),
      write: (e) => JSON.stringify(Array.from(e)),
    },
    date: { read: (e) => new Date(e), write: (e) => e.toISOString() },
  },
  Dr = 'vueuse-storage';
function Ma(e, t, n, s = {}) {
  var r;
  const {
      flush: i = 'pre',
      deep: o = !0,
      listenToStorageChanges: l = !0,
      writeDefaults: c = !0,
      mergeDefaults: f = !1,
      shallow: a,
      window: h = Ge,
      eventFilter: v,
      onError: y = (E) => {
        console.error(E);
      },
      initOnMounted: A,
    } = s,
    P = (a ? Pe : gt)(typeof t == 'function' ? t() : t),
    K = ie(() => le(e));
  if (!n)
    try {
      n = go('getDefaultStorage', () => {
        var E;
        return (E = Ge) == null ? void 0 : E.localStorage;
      })();
    } catch (E) {
      y(E);
    }
  if (!n) return P;
  const H = le(t),
    W = Ra(H),
    p = (r = s.serializer) != null ? r : Oa[W],
    { pause: g, resume: M } = ba(P, () => R(P.value), {
      flush: i,
      deep: o,
      eventFilter: v,
    });
  Le(K, () => T(), { flush: i }),
    h &&
      l &&
      kn(() => {
        n instanceof Storage
          ? Xe(h, 'storage', T, { passive: !0 })
          : Xe(h, Dr, I),
          A && T();
      }),
    A || T();
  function V(E, b) {
    if (h) {
      const N = { key: K.value, oldValue: E, newValue: b, storageArea: n };
      h.dispatchEvent(
        n instanceof Storage
          ? new StorageEvent('storage', N)
          : new CustomEvent(Dr, { detail: N })
      );
    }
  }
  function R(E) {
    try {
      const b = n.getItem(K.value);
      if (E == null) V(b, null), n.removeItem(K.value);
      else {
        const N = p.write(E);
        b !== N && (n.setItem(K.value, N), V(b, N));
      }
    } catch (b) {
      y(b);
    }
  }
  function k(E) {
    const b = E ? E.newValue : n.getItem(K.value);
    if (b == null) return c && H != null && n.setItem(K.value, p.write(H)), H;
    if (!E && f) {
      const N = p.read(b);
      return typeof f == 'function'
        ? f(N, H)
        : W === 'object' && !Array.isArray(N)
          ? { ...H, ...N }
          : N;
    } else return typeof b != 'string' ? b : p.read(b);
  }
  function T(E) {
    if (!(E && E.storageArea !== n)) {
      if (E && E.key == null) {
        P.value = H;
        return;
      }
      if (!(E && E.key !== K.value)) {
        g();
        try {
          (E == null ? void 0 : E.newValue) !== p.write(P.value) &&
            (P.value = k(E));
        } catch (b) {
          y(b);
        } finally {
          E ? Hn(M) : M();
        }
      }
    }
  }
  function I(E) {
    T(E.detail);
  }
  return P;
}
const Ia =
  '*,*::before,*::after{-webkit-transition:none!important;-moz-transition:none!important;-o-transition:none!important;-ms-transition:none!important;transition:none!important}';
function Pa(e = {}) {
  const {
      selector: t = 'html',
      attribute: n = 'class',
      initialValue: s = 'auto',
      window: r = Ge,
      storage: i,
      storageKey: o = 'vueuse-color-scheme',
      listenToStorageChanges: l = !0,
      storageRef: c,
      emitAuto: f,
      disableTransition: a = !0,
    } = e,
    h = { auto: '', light: 'light', dark: 'dark', ...(e.modes || {}) },
    v = mo({ window: r }),
    y = ie(() => (v.value ? 'dark' : 'light')),
    A =
      c ||
      (o == null
        ? Gs(s)
        : Ma(o, s, i, { window: r, listenToStorageChanges: l })),
    P = ie(() => (A.value === 'auto' ? y.value : A.value)),
    K = go('updateHTMLAttrs', (g, M, V) => {
      const R =
        typeof g == 'string'
          ? r == null
            ? void 0
            : r.document.querySelector(g)
          : Xs(g);
      if (!R) return;
      const k = new Set(),
        T = new Set();
      let I = null;
      if (M === 'class') {
        const b = V.split(/\s/g);
        Object.values(h)
          .flatMap((N) => (N || '').split(/\s/g))
          .filter(Boolean)
          .forEach((N) => {
            b.includes(N) ? k.add(N) : T.add(N);
          });
      } else I = { key: M, value: V };
      if (k.size === 0 && T.size === 0 && I === null) return;
      let E;
      a &&
        ((E = r.document.createElement('style')),
        E.appendChild(document.createTextNode(Ia)),
        r.document.head.appendChild(E));
      for (const b of k) R.classList.add(b);
      for (const b of T) R.classList.remove(b);
      I && R.setAttribute(I.key, I.value),
        a && (r.getComputedStyle(E).opacity, document.head.removeChild(E));
    });
  function H(g) {
    var M;
    K(t, n, (M = h[g]) != null ? M : g);
  }
  function W(g) {
    e.onChanged ? e.onChanged(g, H) : H(g);
  }
  Le(P, W, { flush: 'post', immediate: !0 }), kn(() => W(P.value));
  const p = ie({
    get() {
      return f ? A.value : P.value;
    },
    set(g) {
      A.value = g;
    },
  });
  return Object.assign(p, { store: A, system: y, state: P });
}
function La(e = {}) {
  const { valueDark: t = 'dark', valueLight: n = '' } = e,
    s = Pa({
      ...e,
      onChanged: (o, l) => {
        var c;
        e.onChanged
          ? (c = e.onChanged) == null || c.call(e, o === 'dark', l, o)
          : l(o);
      },
      modes: { dark: t, light: n },
    }),
    r = ie(() => s.system.value);
  return ie({
    get() {
      return s.value === 'dark';
    },
    set(o) {
      const l = o ? 'dark' : 'light';
      r.value === l ? (s.value = 'auto') : (s.value = l);
    },
  });
}
function ls(e) {
  return typeof Window < 'u' && e instanceof Window
    ? e.document.documentElement
    : typeof Document < 'u' && e instanceof Document
      ? e.documentElement
      : e;
}
const $r = 1;
function Na(e, t = {}) {
  const {
      throttle: n = 0,
      idle: s = 200,
      onStop: r = St,
      onScroll: i = St,
      offset: o = { left: 0, right: 0, top: 0, bottom: 0 },
      eventListenerOptions: l = { capture: !1, passive: !0 },
      behavior: c = 'auto',
      window: f = Ge,
      onError: a = (R) => {
        console.error(R);
      },
    } = t,
    h = Pe(0),
    v = Pe(0),
    y = ie({
      get() {
        return h.value;
      },
      set(R) {
        P(R, void 0);
      },
    }),
    A = ie({
      get() {
        return v.value;
      },
      set(R) {
        P(void 0, R);
      },
    });
  function P(R, k) {
    var T, I, E, b;
    if (!f) return;
    const N = le(e);
    if (!N) return;
    (E = N instanceof Document ? f.document.body : N) == null ||
      E.scrollTo({
        top: (T = le(k)) != null ? T : A.value,
        left: (I = le(R)) != null ? I : y.value,
        behavior: le(c),
      });
    const Y =
      ((b = N == null ? void 0 : N.document) == null
        ? void 0
        : b.documentElement) ||
      (N == null ? void 0 : N.documentElement) ||
      N;
    y != null && (h.value = Y.scrollLeft), A != null && (v.value = Y.scrollTop);
  }
  const K = Pe(!1),
    H = It({ left: !0, right: !1, top: !0, bottom: !1 }),
    W = It({ left: !1, right: !1, top: !1, bottom: !1 }),
    p = (R) => {
      K.value &&
        ((K.value = !1),
        (W.left = !1),
        (W.right = !1),
        (W.top = !1),
        (W.bottom = !1),
        r(R));
    },
    g = ma(p, n + s),
    M = (R) => {
      var k;
      if (!f) return;
      const T =
          ((k = R == null ? void 0 : R.document) == null
            ? void 0
            : k.documentElement) ||
          (R == null ? void 0 : R.documentElement) ||
          Xs(R),
        { display: I, flexDirection: E, direction: b } = getComputedStyle(T),
        N = b === 'rtl' ? -1 : 1,
        Y = T.scrollLeft;
      (W.left = Y < h.value), (W.right = Y > h.value);
      const re = Math.abs(Y * N) <= (o.left || 0),
        $ =
          Math.abs(Y * N) + T.clientWidth >=
          T.scrollWidth - (o.right || 0) - $r;
      I === 'flex' && E === 'row-reverse'
        ? ((H.left = $), (H.right = re))
        : ((H.left = re), (H.right = $)),
        (h.value = Y);
      let X = T.scrollTop;
      R === f.document && !X && (X = f.document.body.scrollTop),
        (W.top = X < v.value),
        (W.bottom = X > v.value);
      const D = Math.abs(X) <= (o.top || 0),
        ce =
          Math.abs(X) + T.clientHeight >= T.scrollHeight - (o.bottom || 0) - $r;
      I === 'flex' && E === 'column-reverse'
        ? ((H.top = ce), (H.bottom = D))
        : ((H.top = D), (H.bottom = ce)),
        (v.value = X);
    },
    V = (R) => {
      var k;
      if (!f) return;
      const T = (k = R.target.documentElement) != null ? k : R.target;
      M(T), (K.value = !0), g(R), i(R);
    };
  return (
    Xe(e, 'scroll', n ? va(V, n, !0, !1) : V, l),
    kn(() => {
      try {
        const R = le(e);
        if (!R) return;
        M(R);
      } catch (R) {
        a(R);
      }
    }),
    Xe(e, 'scrollend', p, l),
    {
      x: y,
      y: A,
      isScrolling: K,
      arrivedState: H,
      directions: W,
      measure() {
        const R = le(e);
        f && R && M(R);
      },
    }
  );
}
function vo(e) {
  const t = window.getComputedStyle(e);
  if (
    t.overflowX === 'scroll' ||
    t.overflowY === 'scroll' ||
    (t.overflowX === 'auto' && e.clientWidth < e.scrollWidth) ||
    (t.overflowY === 'auto' && e.clientHeight < e.scrollHeight)
  )
    return !0;
  {
    const n = e.parentNode;
    return !n || n.tagName === 'BODY' ? !1 : vo(n);
  }
}
function Fa(e) {
  const t = e || window.event,
    n = t.target;
  return vo(n)
    ? !1
    : t.touches.length > 1
      ? !0
      : (t.preventDefault && t.preventDefault(), !1);
}
const cs = new WeakMap();
function Ef(e, t = !1) {
  const n = Pe(t);
  let s = null,
    r = '';
  Le(
    Gs(e),
    (l) => {
      const c = ls(le(l));
      if (c) {
        const f = c;
        if (
          (cs.get(f) || cs.set(f, f.style.overflow),
          f.style.overflow !== 'hidden' && (r = f.style.overflow),
          f.style.overflow === 'hidden')
        )
          return (n.value = !0);
        if (n.value) return (f.style.overflow = 'hidden');
      }
    },
    { immediate: !0 }
  );
  const i = () => {
      const l = ls(le(e));
      !l ||
        n.value ||
        (Fr &&
          (s = Xe(
            l,
            'touchmove',
            (c) => {
              Fa(c);
            },
            { passive: !1 }
          )),
        (l.style.overflow = 'hidden'),
        (n.value = !0));
    },
    o = () => {
      const l = ls(le(e));
      !l ||
        !n.value ||
        (Fr && (s == null || s()),
        (l.style.overflow = r),
        cs.delete(l),
        (n.value = !1));
    };
  return (
    fo(o),
    ie({
      get() {
        return n.value;
      },
      set(l) {
        l ? i() : o();
      },
    })
  );
}
function Cf(e = {}) {
  const { window: t = Ge, ...n } = e;
  return Na(t, n);
}
function Af(e = {}) {
  const {
      window: t = Ge,
      initialWidth: n = Number.POSITIVE_INFINITY,
      initialHeight: s = Number.POSITIVE_INFINITY,
      listenOrientation: r = !0,
      includeScrollbar: i = !0,
      type: o = 'inner',
    } = e,
    l = Pe(n),
    c = Pe(s),
    f = () => {
      if (t)
        if (o === 'outer') (l.value = t.outerWidth), (c.value = t.outerHeight);
        else if (o === 'visual' && t.visualViewport) {
          const { width: h, height: v, scale: y } = t.visualViewport;
          (l.value = Math.round(h * y)), (c.value = Math.round(v * y));
        } else
          i
            ? ((l.value = t.innerWidth), (c.value = t.innerHeight))
            : ((l.value = t.document.documentElement.clientWidth),
              (c.value = t.document.documentElement.clientHeight));
    };
  f(), kn(f);
  const a = { passive: !0 };
  if (
    (Xe('resize', f, a),
    t &&
      o === 'visual' &&
      t.visualViewport &&
      Xe(t.visualViewport, 'resize', f, a),
    r)
  ) {
    const h = po('(orientation: portrait)');
    Le(h, () => f());
  }
  return { width: l, height: c };
}
const as = {};
var fs = {};
const yo = /^(?:[a-z]+:|\/\/)/i,
  Ha = 'vitepress-theme-appearance',
  Da = /#.*$/,
  $a = /[?#].*$/,
  ja = /(?:(^|\/)index)?\.(?:md|html)$/,
  ge = typeof document < 'u',
  bo = {
    relativePath: '404.md',
    filePath: '',
    title: '404',
    description: 'Not Found',
    headers: [],
    frontmatter: { sidebar: !1, layout: 'page' },
    lastUpdated: 0,
    isNotFound: !0,
  };
function Va(e, t, n = !1) {
  if (t === void 0) return !1;
  if (((e = jr(`/${e}`)), n)) return new RegExp(t).test(e);
  if (jr(t) !== e) return !1;
  const s = t.match(Da);
  return s ? (ge ? location.hash : '') === s[0] : !0;
}
function jr(e) {
  return decodeURI(e).replace($a, '').replace(ja, '$1');
}
function Wa(e) {
  return yo.test(e);
}
function ka(e, t) {
  return (
    Object.keys((e == null ? void 0 : e.locales) || {}).find(
      (n) => n !== 'root' && !Wa(n) && Va(t, `/${n}/`, !0)
    ) || 'root'
  );
}
function Ua(e, t) {
  var s, r, i, o, l, c, f;
  const n = ka(e, t);
  return Object.assign({}, e, {
    localeIndex: n,
    lang: ((s = e.locales[n]) == null ? void 0 : s.lang) ?? e.lang,
    dir: ((r = e.locales[n]) == null ? void 0 : r.dir) ?? e.dir,
    title: ((i = e.locales[n]) == null ? void 0 : i.title) ?? e.title,
    titleTemplate:
      ((o = e.locales[n]) == null ? void 0 : o.titleTemplate) ??
      e.titleTemplate,
    description:
      ((l = e.locales[n]) == null ? void 0 : l.description) ?? e.description,
    head: wo(e.head, ((c = e.locales[n]) == null ? void 0 : c.head) ?? []),
    themeConfig: {
      ...e.themeConfig,
      ...((f = e.locales[n]) == null ? void 0 : f.themeConfig),
    },
  });
}
function _o(e, t) {
  const n = t.title || e.title,
    s = t.titleTemplate ?? e.titleTemplate;
  if (typeof s == 'string' && s.includes(':title'))
    return s.replace(/:title/g, n);
  const r = Ba(e.title, s);
  return n === r.slice(3) ? n : `${n}${r}`;
}
function Ba(e, t) {
  return t === !1
    ? ''
    : t === !0 || t === void 0
      ? ` | ${e}`
      : e === t
        ? ''
        : ` | ${t}`;
}
function Ka(e, t) {
  const [n, s] = t;
  if (n !== 'meta') return !1;
  const r = Object.entries(s)[0];
  return r == null ? !1 : e.some(([i, o]) => i === n && o[r[0]] === r[1]);
}
function wo(e, t) {
  return [...e.filter((n) => !Ka(t, n)), ...t];
}
const qa = /[\u0000-\u001F"#$&*+,:;<=>?[\]^`{|}\u007F]/g,
  Ga = /^[a-z]:/i;
function Vr(e) {
  const t = Ga.exec(e),
    n = t ? t[0] : '';
  return (
    n +
    e
      .slice(n.length)
      .replace(qa, '_')
      .replace(/(^|\/)_+(?=[^/]*$)/, '$1')
  );
}
const us = new Set();
function Xa(e) {
  if (us.size === 0) {
    const n =
      (typeof process == 'object' &&
        (fs == null ? void 0 : fs.VITE_EXTRA_EXTENSIONS)) ||
      (as == null ? void 0 : as.VITE_EXTRA_EXTENSIONS) ||
      '';
    (
      '3g2,3gp,aac,ai,apng,au,avif,bin,bmp,cer,class,conf,crl,css,csv,dll,doc,eps,epub,exe,gif,gz,ics,ief,jar,jpe,jpeg,jpg,js,json,jsonld,m4a,man,mid,midi,mjs,mov,mp2,mp3,mp4,mpe,mpeg,mpg,mpp,oga,ogg,ogv,ogx,opus,otf,p10,p7c,p7m,p7s,pdf,png,ps,qt,roff,rtf,rtx,ser,svg,t,tif,tiff,tr,ts,tsv,ttf,txt,vtt,wav,weba,webm,webp,woff,woff2,xhtml,xml,yaml,yml,zip' +
      (n && typeof n == 'string' ? ',' + n : '')
    )
      .split(',')
      .forEach((s) => us.add(s));
  }
  const t = e.split('.').pop();
  return t == null || !us.has(t.toLowerCase());
}
const Ya = Symbol(),
  _t = Pe(la);
function Rf(e) {
  const t = ie(() => Ua(_t.value, e.data.relativePath)),
    n = t.value.appearance,
    s =
      n === 'force-dark'
        ? gt(!0)
        : n === 'force-auto'
          ? mo()
          : n
            ? La({
                storageKey: Ha,
                initialValue: () => (n === 'dark' ? 'dark' : 'auto'),
                ...(typeof n == 'object' ? n : {}),
              })
            : gt(!1),
    r = gt(ge ? location.hash : '');
  return (
    ge &&
      window.addEventListener('hashchange', () => {
        r.value = location.hash;
      }),
    Le(
      () => e.data,
      () => {
        r.value = ge ? location.hash : '';
      }
    ),
    {
      site: t,
      theme: ie(() => t.value.themeConfig),
      page: ie(() => e.data),
      frontmatter: ie(() => e.data.frontmatter),
      params: ie(() => e.data.params),
      lang: ie(() => t.value.lang),
      dir: ie(() => e.data.frontmatter.dir || t.value.dir),
      localeIndex: ie(() => t.value.localeIndex || 'root'),
      title: ie(() => _o(t.value, e.data)),
      description: ie(() => e.data.description || t.value.description),
      isDark: s,
      hash: ie(() => r.value),
    }
  );
}
function za() {
  const e = yt(Ya);
  if (!e) throw new Error('vitepress data not properly injected in app');
  return e;
}
function Ja(e, t) {
  return `${e}${t}`.replace(/\/+/g, '/');
}
function Wr(e) {
  return yo.test(e) || !e.startsWith('/') ? e : Ja(_t.value.base, e);
}
function Qa(e) {
  let t = e.replace(/\.html$/, '');
  if (((t = decodeURIComponent(t)), (t = t.replace(/\/$/, '/index')), ge)) {
    const n = '/dn-voxel-loader/';
    t = Vr(t.slice(n.length).replace(/\//g, '_') || 'index') + '.md';
    let s = __VP_HASH_MAP__[t.toLowerCase()];
    if (
      (s ||
        ((t = t.endsWith('_index.md')
          ? t.slice(0, -9) + '.md'
          : t.slice(0, -3) + '_index.md'),
        (s = __VP_HASH_MAP__[t.toLowerCase()])),
      !s)
    )
      return null;
    t = `${n}assets/${t}.${s}.js`;
  } else t = `./${Vr(t.slice(1).replace(/\//g, '_'))}.md.js`;
  return t;
}
let _n = [];
function Of(e) {
  _n.push(e),
    jn(() => {
      _n = _n.filter((t) => t !== e);
    });
}
function Za() {
  let e = _t.value.scrollOffset,
    t = 0,
    n = 24;
  if (
    (typeof e == 'object' &&
      'padding' in e &&
      ((n = e.padding), (e = e.selector)),
    typeof e == 'number')
  )
    t = e;
  else if (typeof e == 'string') t = kr(e, n);
  else if (Array.isArray(e))
    for (const s of e) {
      const r = kr(s, n);
      if (r) {
        t = r;
        break;
      }
    }
  return t;
}
function kr(e, t) {
  const n = document.querySelector(e);
  if (!n) return 0;
  const s = n.getBoundingClientRect().bottom;
  return s < 0 ? 0 : s + t;
}
const ef = Symbol(),
  So = 'http://a.com',
  tf = () => ({ path: '/', component: null, data: bo });
function Mf(e, t) {
  const n = It(tf()),
    s = { route: n, go: r };
  async function r(l = ge ? location.href : '/') {
    var c, f;
    (l = ds(l)),
      (await ((c = s.onBeforeRouteChange) == null ? void 0 : c.call(s, l))) !==
        !1 &&
        (ge &&
          l !== ds(location.href) &&
          (history.replaceState({ scrollPosition: window.scrollY }, ''),
          history.pushState({}, '', l)),
        await o(l),
        await ((f = s.onAfterRouteChange ?? s.onAfterRouteChanged) == null
          ? void 0
          : f(l)));
  }
  let i = null;
  async function o(l, c = 0, f = !1) {
    var v, y;
    if (
      (await ((v = s.onBeforePageLoad) == null ? void 0 : v.call(s, l))) === !1
    )
      return;
    const a = new URL(l, So),
      h = (i = a.pathname);
    try {
      let A = await e(h);
      if (!A) throw new Error(`Page not found: ${h}`);
      if (i === h) {
        i = null;
        const { default: P, __pageData: K } = A;
        if (!P) throw new Error(`Invalid route component: ${P}`);
        await ((y = s.onAfterPageLoad) == null ? void 0 : y.call(s, l)),
          (n.path = ge ? h : Wr(h)),
          (n.component = vn(P)),
          (n.data = vn(K)),
          ge &&
            Hn(() => {
              let H =
                _t.value.base +
                K.relativePath.replace(/(?:(^|\/)index)?\.md$/, '$1');
              if (
                (!_t.value.cleanUrls && !H.endsWith('/') && (H += '.html'),
                H !== a.pathname &&
                  ((a.pathname = H),
                  (l = H + a.search + a.hash),
                  history.replaceState({}, '', l)),
                a.hash && !c)
              ) {
                let W = null;
                try {
                  W = document.getElementById(
                    decodeURIComponent(a.hash).slice(1)
                  );
                } catch (p) {
                  console.warn(p);
                }
                if (W) {
                  Ur(W, a.hash);
                  return;
                }
              }
              window.scrollTo(0, c);
            });
      }
    } catch (A) {
      if (
        (!/fetch|Page not found/.test(A.message) &&
          !/^\/404(\.html|\/)?$/.test(l) &&
          console.error(A),
        !f)
      )
        try {
          const P = await fetch(_t.value.base + 'hashmap.json');
          (window.__VP_HASH_MAP__ = await P.json()), await o(l, c, !0);
          return;
        } catch {}
      if (i === h) {
        (i = null), (n.path = ge ? h : Wr(h)), (n.component = t ? vn(t) : null);
        const P = ge
          ? h
              .replace(/(^|\/)$/, '$1index')
              .replace(/(\.html)?$/, '.md')
              .replace(/^\//, '')
          : '404.md';
        n.data = { ...bo, relativePath: P };
      }
    }
  }
  return (
    ge &&
      (history.state === null && history.replaceState({}, ''),
      window.addEventListener(
        'click',
        (l) => {
          if (
            l.defaultPrevented ||
            !(l.target instanceof Element) ||
            l.target.closest('button') ||
            l.button !== 0 ||
            l.ctrlKey ||
            l.shiftKey ||
            l.altKey ||
            l.metaKey
          )
            return;
          const c = l.target.closest('a');
          if (
            !c ||
            c.closest('.vp-raw') ||
            c.hasAttribute('download') ||
            c.hasAttribute('target')
          )
            return;
          const f =
            c.getAttribute('href') ??
            (c instanceof SVGAElement ? c.getAttribute('xlink:href') : null);
          if (f == null) return;
          const {
              href: a,
              origin: h,
              pathname: v,
              hash: y,
              search: A,
            } = new URL(f, c.baseURI),
            P = new URL(location.href);
          h === P.origin &&
            Xa(v) &&
            (l.preventDefault(),
            v === P.pathname && A === P.search
              ? (y !== P.hash &&
                  (history.pushState({}, '', a),
                  window.dispatchEvent(
                    new HashChangeEvent('hashchange', {
                      oldURL: P.href,
                      newURL: a,
                    })
                  )),
                y
                  ? Ur(c, y, c.classList.contains('header-anchor'))
                  : window.scrollTo(0, 0))
              : r(a));
        },
        { capture: !0 }
      ),
      window.addEventListener('popstate', async (l) => {
        var f;
        if (l.state === null) return;
        const c = ds(location.href);
        await o(c, (l.state && l.state.scrollPosition) || 0),
          await ((f = s.onAfterRouteChange ?? s.onAfterRouteChanged) == null
            ? void 0
            : f(c));
      }),
      window.addEventListener('hashchange', (l) => {
        l.preventDefault();
      })),
    s
  );
}
function nf() {
  const e = yt(ef);
  if (!e) throw new Error('useRouter() is called without provider.');
  return e;
}
function xo() {
  return nf().route;
}
function Ur(e, t, n = !1) {
  let s = null;
  try {
    s = e.classList.contains('header-anchor')
      ? e
      : document.getElementById(decodeURIComponent(t).slice(1));
  } catch (r) {
    console.warn(r);
  }
  if (s) {
    let r = function () {
      !n || Math.abs(o - window.scrollY) > window.innerHeight
        ? window.scrollTo(0, o)
        : window.scrollTo({ left: 0, top: o, behavior: 'smooth' });
    };
    const i = parseInt(window.getComputedStyle(s).paddingTop, 10),
      o = window.scrollY + s.getBoundingClientRect().top - Za() + i;
    requestAnimationFrame(r);
  }
}
function ds(e) {
  const t = new URL(e, So);
  return (
    (t.pathname = t.pathname.replace(/(^|\/)index(\.html)?$/, '$1')),
    _t.value.cleanUrls
      ? (t.pathname = t.pathname.replace(/\.html$/, ''))
      : !t.pathname.endsWith('/') &&
        !t.pathname.endsWith('.html') &&
        (t.pathname += '.html'),
    t.pathname + t.search + t.hash
  );
}
const pn = () => _n.forEach((e) => e()),
  If = Ei({
    name: 'VitePressContent',
    props: { as: { type: [Object, String], default: 'div' } },
    setup(e) {
      const t = xo(),
        { frontmatter: n, site: s } = za();
      return (
        Le(n, pn, { deep: !0, flush: 'post' }),
        () =>
          As(
            e.as,
            s.value.contentProps ?? { style: { position: 'relative' } },
            [
              t.component
                ? As(t.component, {
                    onVnodeMounted: pn,
                    onVnodeUpdated: pn,
                    onVnodeUnmounted: pn,
                  })
                : '404 Page Not Found',
            ]
          )
      );
    },
  }),
  Pf = (e, t) => {
    const n = e.__vccOpts || e;
    for (const [s, r] of t) n[s] = r;
    return n;
  },
  Lf = Ei({
    setup(e, { slots: t }) {
      const n = gt(!1);
      return (
        Pt(() => {
          n.value = !0;
        }),
        () => (n.value && t.default ? t.default() : null)
      );
    },
  });
function Nf() {
  ge &&
    window.addEventListener('click', (e) => {
      var n;
      const t = e.target;
      if (t.matches('.vp-code-group input')) {
        const s = (n = t.parentElement) == null ? void 0 : n.parentElement;
        if (!s) return;
        const r = Array.from(s.querySelectorAll('input')).indexOf(t);
        if (r < 0) return;
        const i = s.querySelector('.blocks');
        if (!i) return;
        const o = Array.from(i.children).find((f) =>
          f.classList.contains('active')
        );
        if (!o) return;
        const l = i.children[r];
        if (!l || o === l) return;
        o.classList.remove('active'), l.classList.add('active');
        const c = s == null ? void 0 : s.querySelector(`label[for="${t.id}"]`);
        c == null || c.scrollIntoView({ block: 'nearest' });
      }
    });
}
function Ff() {
  if (ge) {
    const e = new WeakMap();
    window.addEventListener('click', (t) => {
      var s;
      const n = t.target;
      if (n.matches('div[class*="language-"] > button.copy')) {
        const r = n.parentElement,
          i =
            (s = n.nextElementSibling) == null ? void 0 : s.nextElementSibling;
        if (!r || !i) return;
        const o = /language-(shellscript|shell|bash|sh|zsh)/.test(r.className),
          l = ['.vp-copy-ignore', '.diff.remove'],
          c = i.cloneNode(!0);
        c.querySelectorAll(l.join(',')).forEach((a) => a.remove());
        let f = c.textContent || '';
        o && (f = f.replace(/^ *(\$|>) /gm, '').trim()),
          sf(f).then(() => {
            n.classList.add('copied'), clearTimeout(e.get(n));
            const a = setTimeout(() => {
              n.classList.remove('copied'), n.blur(), e.delete(n);
            }, 2e3);
            e.set(n, a);
          });
      }
    });
  }
}
async function sf(e) {
  try {
    return navigator.clipboard.writeText(e);
  } catch {
    const t = document.createElement('textarea'),
      n = document.activeElement;
    (t.value = e),
      t.setAttribute('readonly', ''),
      (t.style.contain = 'strict'),
      (t.style.position = 'absolute'),
      (t.style.left = '-9999px'),
      (t.style.fontSize = '12pt');
    const s = document.getSelection(),
      r = s ? s.rangeCount > 0 && s.getRangeAt(0) : null;
    document.body.appendChild(t),
      t.select(),
      (t.selectionStart = 0),
      (t.selectionEnd = e.length),
      document.execCommand('copy'),
      document.body.removeChild(t),
      r && (s.removeAllRanges(), s.addRange(r)),
      n && n.focus();
  }
}
function Hf(e, t) {
  let n = !0,
    s = [];
  const r = (i) => {
    if (n) {
      (n = !1),
        i.forEach((l) => {
          const c = hs(l);
          for (const f of document.head.children)
            if (f.isEqualNode(c)) {
              s.push(f);
              return;
            }
        });
      return;
    }
    const o = i.map(hs);
    s.forEach((l, c) => {
      const f = o.findIndex((a) =>
        a == null ? void 0 : a.isEqualNode(l ?? null)
      );
      f !== -1 ? delete o[f] : (l == null || l.remove(), delete s[c]);
    }),
      o.forEach((l) => l && document.head.appendChild(l)),
      (s = [...s, ...o].filter(Boolean));
  };
  Yi(() => {
    const i = e.data,
      o = t.value,
      l = i && i.description,
      c = (i && i.frontmatter.head) || [],
      f = _o(o, i);
    f !== document.title && (document.title = f);
    const a = l || o.description;
    let h = document.querySelector('meta[name=description]');
    h
      ? h.getAttribute('content') !== a && h.setAttribute('content', a)
      : hs(['meta', { name: 'description', content: a }]),
      r(wo(o.head, of(c)));
  });
}
function hs([e, t, n]) {
  const s = document.createElement(e);
  for (const r in t) s.setAttribute(r, t[r]);
  return (
    n && (s.innerHTML = n),
    e === 'script' && t.async == null && (s.async = !1),
    s
  );
}
function rf(e) {
  return e[0] === 'meta' && e[1] && e[1].name === 'description';
}
function of(e) {
  return e.filter((t) => !rf(t));
}
const ps = new Set(),
  To = () => document.createElement('link'),
  lf = (e) => {
    const t = To();
    (t.rel = 'prefetch'), (t.href = e), document.head.appendChild(t);
  },
  cf = (e) => {
    const t = new XMLHttpRequest();
    t.open('GET', e, (t.withCredentials = !0)), t.send();
  };
let gn;
const af =
  ge &&
  (gn = To()) &&
  gn.relList &&
  gn.relList.supports &&
  gn.relList.supports('prefetch')
    ? lf
    : cf;
function Df() {
  if (!ge || !window.IntersectionObserver) return;
  let e;
  if ((e = navigator.connection) && (e.saveData || /2g/.test(e.effectiveType)))
    return;
  const t = window.requestIdleCallback || setTimeout;
  let n = null;
  const s = () => {
    n && n.disconnect(),
      (n = new IntersectionObserver((i) => {
        i.forEach((o) => {
          if (o.isIntersecting) {
            const l = o.target;
            n.unobserve(l);
            const { pathname: c } = l;
            if (!ps.has(c)) {
              ps.add(c);
              const f = Qa(c);
              f && af(f);
            }
          }
        });
      })),
      t(() => {
        document.querySelectorAll('#app a').forEach((i) => {
          const { hostname: o, pathname: l } = new URL(
              i.href instanceof SVGAnimatedString ? i.href.animVal : i.href,
              i.baseURI
            ),
            c = l.match(/\.\w+$/);
          (c && c[0] !== '.html') ||
            (i.target !== '_blank' &&
              o === location.hostname &&
              (l !== location.pathname ? n.observe(i) : ps.add(l)));
        });
      });
  };
  Pt(s);
  const r = xo();
  Le(() => r.path, s),
    jn(() => {
      n && n.disconnect();
    });
}
export {
  gf as $,
  Za as A,
  df as B,
  ff as C,
  Pe as D,
  Of as E,
  Se as F,
  he as G,
  uf as H,
  yo as I,
  xo as J,
  bc as K,
  yt as L,
  Af as M,
  Ls as N,
  Tf as O,
  Hn as P,
  Cf as Q,
  ge as R,
  Nn as S,
  _f as T,
  Ef as U,
  Ql as V,
  pf as W,
  Sf as X,
  Ri as Y,
  wf as Z,
  Pf as _,
  ro as a,
  Hf as a0,
  ef as a1,
  Rf as a2,
  Ya as a3,
  If as a4,
  Lf as a5,
  _t as a6,
  Mf as a7,
  Qa as a8,
  xf as a9,
  Df as aa,
  Ff as ab,
  Nf as ac,
  As as ad,
  yf as ae,
  Es as b,
  vf as c,
  Ei as d,
  bf as e,
  Xa as f,
  Wr as g,
  ie as h,
  Wa as i,
  so as j,
  Ws as k,
  Va as l,
  po as m,
  Ns as n,
  Ts as o,
  gt as p,
  Le as q,
  hf as r,
  Yi as s,
  Vo as t,
  za as u,
  Pt as v,
  Tl as w,
  jn as x,
  mf as y,
  $l as z,
};
