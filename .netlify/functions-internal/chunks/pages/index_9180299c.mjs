import { e as createAstro, f as createComponent, r as renderTemplate, h as addAttribute, i as renderHead, j as renderComponent$1 } from '../astro_24912e67.mjs';
import 'html-escaper';

// @builder.io/qwik/build
const isServer = true;
const isBrowser = false;

/**
 * @license
 * @builder.io/qwik 1.2.17
 * Copyright Builder.io, Inc. All Rights Reserved.
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/BuilderIO/qwik/blob/main/LICENSE
 */

const isNode$1 = value => value && "number" == typeof value.nodeType;

const isDocument = value => 9 === value.nodeType;

const isElement$1 = value => 1 === value.nodeType;

const isQwikElement = value => {
    const nodeType = value.nodeType;
    return 1 === nodeType || 111 === nodeType;
};

const isNodeElement = value => {
    const nodeType = value.nodeType;
    return 1 === nodeType || 111 === nodeType || 3 === nodeType;
};

const isVirtualElement = value => 111 === value.nodeType;

const isText = value => 3 === value.nodeType;

const isComment = value => 8 === value.nodeType;

const logError = (message, ...optionalParams) => createAndLogError(!0, message, ...optionalParams);

const logErrorAndStop = (message, ...optionalParams) => createAndLogError(!0, message, ...optionalParams);

const logWarn = () => {
};

const printParams = optionalParams => optionalParams;

const createAndLogError = (asyncThrow, message, ...optionalParams) => {
    const err = message instanceof Error ? message : new Error(message);
    return console.error("%cQWIK ERROR", "", err.stack || err.message, ...printParams(optionalParams)), 
    asyncThrow && setTimeout((() => {
        throw err;
    }), 0), err;
};

const qError = (code, ...parts) => {
    const text = codeToText(code);
    return logErrorAndStop(text, ...parts);
};

const codeToText = code => `Code(${code})`;

const createPlatform = () => ({
    isServer,
    importSymbol(containerEl, url, symbolName) {
        {
            const hash = getSymbolHash(symbolName);
            const regSym = globalThis.__qwik_reg_symbols?.get(hash);
            if (regSym) {
                return regSym;
            }
        }
        if (!url) {
            throw qError(31, symbolName);
        }
        if (!containerEl) {
            throw qError(30, url, symbolName);
        }
        const urlDoc = toUrl(containerEl.ownerDocument, containerEl, url).toString();
        const urlCopy = new URL(urlDoc);
        urlCopy.hash = "", urlCopy.search = "";
        return import(urlCopy.href).then((mod => mod[symbolName]));
    },
    raf: fn => new Promise((resolve => {
        requestAnimationFrame((() => {
            resolve(fn());
        }));
    })),
    nextTick: fn => new Promise((resolve => {
        setTimeout((() => {
            resolve(fn());
        }));
    })),
    chunkForSymbol: (symbolName, chunk) => [ symbolName, chunk ?? "_" ]
});

const toUrl = (doc, containerEl, url) => {
    const baseURI = doc.baseURI;
    const base = new URL(containerEl.getAttribute("q:base") ?? baseURI, baseURI);
    return new URL(url, base);
};

let _platform = /*#__PURE__ */ createPlatform();

const setPlatform = plt => _platform = plt;

const getPlatform = () => _platform;

const isServerPlatform = () => _platform.isServer;

function assertDefined() {
}

function assertEqual() {
}

function assertTrue() {
}

function assertString() {
}

function assertQwikElement() {
}

function assertElement() {
}

const isSerializableObject = v => {
    const proto = Object.getPrototypeOf(v);
    return proto === Object.prototype || null === proto;
};

const isObject = v => v && "object" == typeof v;

const isArray = v => Array.isArray(v);

const isString = v => "string" == typeof v;

const isFunction = v => "function" == typeof v;

const isPromise = value => value && "function" == typeof value.then;

const safeCall = (call, thenFn, rejectFn) => {
    try {
        const promise = call();
        return isPromise(promise) ? promise.then(thenFn, rejectFn) : thenFn(promise);
    } catch (e) {
        return rejectFn(e);
    }
};

const maybeThen = (promise, thenFn) => isPromise(promise) ? promise.then(thenFn) : thenFn(promise);

const promiseAll = promises => promises.some(isPromise) ? Promise.all(promises) : promises;

const promiseAllLazy = promises => promises.length > 0 ? Promise.all(promises) : promises;

const isNotNullable = v => null != v;

const delay = timeout => new Promise((resolve => {
    setTimeout(resolve, timeout);
}));

const EMPTY_ARRAY = [];

const EMPTY_OBJ = {};

const getDocument = node => {
    if ("undefined" != typeof document) {
        return document;
    }
    if (9 === node.nodeType) {
        return node;
    }
    const doc = node.ownerDocument;
    return doc;
};

const QSlot = "q:slot";

const QStyle = "q:style";

const QOjectTargetSymbol = Symbol("proxy target");

const QObjectFlagsSymbol = Symbol("proxy flags");

const QObjectManagerSymbol = Symbol("proxy manager");

const _IMMUTABLE = Symbol("IMMUTABLE");

const Q_CTX = "_qc_";

const directSetAttribute = (el, prop, value) => el.setAttribute(prop, value);

const directGetAttribute = (el, prop) => el.getAttribute(prop);

const fromCamelToKebabCase = text => text.replace(/([A-Z])/g, "-$1").toLowerCase();

const fromKebabToCamelCase = text => text.replace(/-./g, (x => x[1].toUpperCase()));

const ON_PROP_REGEX = /^(on|window:|document:)/;

const PREVENT_DEFAULT = "preventdefault:";

const isOnProp = prop => prop.endsWith("$") && ON_PROP_REGEX.test(prop);

const groupListeners = listeners => {
    if (0 === listeners.length) {
        return EMPTY_ARRAY;
    }
    if (1 === listeners.length) {
        const listener = listeners[0];
        return [ [ listener[0], [ listener[1] ] ] ];
    }
    const keys = [];
    for (let i = 0; i < listeners.length; i++) {
        const eventName = listeners[i][0];
        keys.includes(eventName) || keys.push(eventName);
    }
    return keys.map((eventName => [ eventName, listeners.filter((l => l[0] === eventName)).map((a => a[1])) ]));
};

const setEvent = (existingListeners, prop, input, containerEl) => {
    if (assertTrue(prop.endsWith("$")), 
    prop = normalizeOnProp(prop.slice(0, -1)), input) {
        if (isArray(input)) {
            const processed = input.flat(1 / 0).filter((q => null != q)).map((q => [ prop, ensureQrl(q, containerEl) ]));
            existingListeners.push(...processed);
        } else {
            existingListeners.push([ prop, ensureQrl(input, containerEl) ]);
        }
    }
    return prop;
};

const PREFIXES = [ "on", "window:on", "document:on" ];

const SCOPED = [ "on", "on-window", "on-document" ];

const normalizeOnProp = prop => {
    let scope = "on";
    for (let i = 0; i < PREFIXES.length; i++) {
        const prefix = PREFIXES[i];
        if (prop.startsWith(prefix)) {
            scope = SCOPED[i], prop = prop.slice(prefix.length);
            break;
        }
    }
    return scope + ":" + (prop = prop.startsWith("-") ? fromCamelToKebabCase(prop.slice(1)) : prop.toLowerCase());
};

const ensureQrl = (value, containerEl) => (value.$setContainer$(containerEl), 
value);

const getDomListeners = (elCtx, containerEl) => {
    const attributes = elCtx.$element$.attributes;
    const listeners = [];
    for (let i = 0; i < attributes.length; i++) {
        const {name, value} = attributes.item(i);
        if (name.startsWith("on:") || name.startsWith("on-window:") || name.startsWith("on-document:")) {
            const urls = value.split("\n");
            for (const url of urls) {
                const qrl = parseQRL(url, containerEl);
                qrl.$capture$ && inflateQrl(qrl, elCtx), listeners.push([ name, qrl ]);
            }
        }
    }
    return listeners;
};

const CONTAINER_STATE = Symbol("ContainerState");

const _getContainerState = containerEl => {
    let set = containerEl[CONTAINER_STATE];
    return set || (containerEl[CONTAINER_STATE] = set = createContainerState(containerEl, directGetAttribute(containerEl, "q:base") ?? "/")), 
    set;
};

const createContainerState = (containerEl, base) => {
    const containerState = {
        $containerEl$: containerEl,
        $elementIndex$: 0,
        $styleMoved$: !1,
        $proxyMap$: new WeakMap,
        $opsNext$: new Set,
        $taskNext$: new Set,
        $taskStaging$: new Set,
        $hostsNext$: new Set,
        $hostsStaging$: new Set,
        $styleIds$: new Set,
        $events$: new Set,
        $serverData$: {},
        $base$: base,
        $renderPromise$: void 0,
        $hostsRendering$: void 0,
        $pauseCtx$: void 0,
        $subsManager$: null
    };
    return containerState.$subsManager$ = createSubscriptionManager(containerState), 
    containerState;
};

const setRef = (value, elm) => {
    if (isFunction(value)) {
        return value(elm);
    }
    if (isObject(value) && "value" in value) {
        return value.value = elm;
    }
    throw qError(32, value);
};

const isContainer$1 = el => isElement$1(el) && el.hasAttribute("q:container");

const intToStr = nu => nu.toString(36);

const strToInt = nu => parseInt(nu, 36);

const getEventName = attribute => {
    const colonPos = attribute.indexOf(":");
    return attribute ? fromKebabToCamelCase(attribute.slice(colonPos + 1)) : attribute;
};

const emitEvent$1 = (el, eventName, detail, bubbles) => {
    ("function" == typeof CustomEvent) && el && el.dispatchEvent(new CustomEvent(eventName, {
        detail,
        bubbles,
        composed: bubbles
    }));
};

const _fnSignal = (fn, args, fnStr) => new SignalDerived(fn, args, fnStr);

const serializeDerivedSignalFunc = signal => {
    const fnBody = signal.$funcStr$;
    let args = "";
    for (let i = 0; i < signal.$args$.length; i++) {
        args += `p${i},`;
    }
    return `(${args})=>(${fnBody})`;
};

var _a$1;

const _createSignal = (value, containerState, flags, subscriptions) => {
    const manager = containerState.$subsManager$.$createManager$(subscriptions);
    return new SignalImpl(value, manager, flags);
};

const QObjectSignalFlags = Symbol("proxy manager");

const SignalUnassignedException = Symbol("unassigned signal");

class SignalBase {}

class SignalImpl extends SignalBase {
    constructor(v, manager, flags) {
        super(), this[_a$1] = 0, this.untrackedValue = v, this[QObjectManagerSymbol] = manager, 
        this[QObjectSignalFlags] = flags;
    }
    valueOf() {
    }
    toString() {
        return `[Signal ${String(this.value)}]`;
    }
    toJSON() {
        return {
            value: this.value
        };
    }
    get value() {
        if (2 & this[QObjectSignalFlags]) {
            throw SignalUnassignedException;
        }
        const sub = tryGetInvokeContext()?.$subscriber$;
        return sub && this[QObjectManagerSymbol].$addSub$(sub), this.untrackedValue;
    }
    set value(v) {
        const manager = this[QObjectManagerSymbol];
        manager && this.untrackedValue !== v && (this.untrackedValue = v, manager.$notifySubs$());
    }
}

_a$1 = QObjectSignalFlags;

class SignalDerived extends SignalBase {
    constructor($func$, $args$, $funcStr$) {
        super(), this.$func$ = $func$, this.$args$ = $args$, this.$funcStr$ = $funcStr$;
    }
    get value() {
        return this.$func$.apply(void 0, this.$args$);
    }
}

class SignalWrapper extends SignalBase {
    constructor(ref, prop) {
        super(), this.ref = ref, this.prop = prop;
    }
    get [QObjectManagerSymbol]() {
        return getSubscriptionManager(this.ref);
    }
    get value() {
        return this.ref[this.prop];
    }
    set value(value) {
        this.ref[this.prop] = value;
    }
}

const isSignal = obj => obj instanceof SignalBase;

const getOrCreateProxy = (target, containerState, flags = 0) => {
    const proxy = containerState.$proxyMap$.get(target);
    return proxy || (0 !== flags && setObjectFlags(target, flags), createProxy(target, containerState, void 0));
};

const createProxy = (target, containerState, subs) => {
    assertEqual(unwrapProxy(target)), 
    assertTrue(!containerState.$proxyMap$.has(target));
    const manager = containerState.$subsManager$.$createManager$(subs);
    const proxy = new Proxy(target, new ReadWriteProxyHandler(containerState, manager));
    return containerState.$proxyMap$.set(target, proxy), proxy;
};

const createPropsState = () => {
    const props = {};
    return setObjectFlags(props, 2), props;
};

const setObjectFlags = (obj, flags) => {
    Object.defineProperty(obj, QObjectFlagsSymbol, {
        value: flags,
        enumerable: !1
    });
};

class ReadWriteProxyHandler {
    constructor($containerState$, $manager$) {
        this.$containerState$ = $containerState$, this.$manager$ = $manager$;
    }
    deleteProperty(target, prop) {
        if (2 & target[QObjectFlagsSymbol]) {
            throw qError(17);
        }
        return "string" == typeof prop && delete target[prop] && (this.$manager$.$notifySubs$(isArray(target) ? void 0 : prop), 
        !0);
    }
    get(target, prop) {
        if ("symbol" == typeof prop) {
            return prop === QOjectTargetSymbol ? target : prop === QObjectManagerSymbol ? this.$manager$ : target[prop];
        }
        const flags = target[QObjectFlagsSymbol] ?? 0;
        const invokeCtx = tryGetInvokeContext();
        const recursive = 0 != (1 & flags);
        const hiddenSignal = target["$$" + prop];
        let subscriber;
        let value;
        if (invokeCtx && (subscriber = invokeCtx.$subscriber$), !(0 != (2 & flags)) || prop in target && !immutableValue(target[_IMMUTABLE]?.[prop]) || (subscriber = null), 
        hiddenSignal ? (value = hiddenSignal.value, subscriber = null) : value = target[prop], subscriber) {
            const isA = isArray(target);
            this.$manager$.$addSub$(subscriber, isA ? void 0 : prop);
        }
        return recursive ? wrap(value, this.$containerState$) : value;
    }
    set(target, prop, newValue) {
        if ("symbol" == typeof prop) {
            return target[prop] = newValue, !0;
        }
        const flags = target[QObjectFlagsSymbol] ?? 0;
        if (0 != (2 & flags)) {
            throw qError(17);
        }
        const unwrappedNewValue = 0 != (1 & flags) ? unwrapProxy(newValue) : newValue;
        if (isArray(target)) {
            return target[prop] = unwrappedNewValue, this.$manager$.$notifySubs$(), !0;
        }
        const oldValue = target[prop];
        return target[prop] = unwrappedNewValue, oldValue !== unwrappedNewValue && this.$manager$.$notifySubs$(prop), 
        !0;
    }
    has(target, property) {
        if (property === QOjectTargetSymbol) {
            return !0;
        }
        const hasOwnProperty = Object.prototype.hasOwnProperty;
        return !!hasOwnProperty.call(target, property) || !("string" != typeof property || !hasOwnProperty.call(target, "$$" + property));
    }
    ownKeys(target) {
        const flags = target[QObjectFlagsSymbol] ?? 0;
        if (!(0 != (2 & flags))) {
            let subscriber = null;
            const invokeCtx = tryGetInvokeContext();
            invokeCtx && (subscriber = invokeCtx.$subscriber$), subscriber && this.$manager$.$addSub$(subscriber);
        }
        return isArray(target) ? Reflect.ownKeys(target) : Reflect.ownKeys(target).map((a => "string" == typeof a && a.startsWith("$$") ? a.slice(2) : a));
    }
    getOwnPropertyDescriptor(target, prop) {
        return isArray(target) || "symbol" == typeof prop ? Object.getOwnPropertyDescriptor(target, prop) : {
            enumerable: !0,
            configurable: !0
        };
    }
}

const immutableValue = value => value === _IMMUTABLE || isSignal(value);

const wrap = (value, containerState) => {
    if (isObject(value)) {
        if (Object.isFrozen(value)) {
            return value;
        }
        const nakedValue = unwrapProxy(value);
        if (nakedValue !== value) {
            return value;
        }
        if (fastSkipSerialize(nakedValue)) {
            return value;
        }
        if (isSerializableObject(nakedValue) || isArray(nakedValue)) {
            const proxy = containerState.$proxyMap$.get(nakedValue);
            return proxy || getOrCreateProxy(nakedValue, containerState, 1);
        }
    }
    return value;
};

const SkipRender = Symbol("skip render");

const SSRRaw = () => null;

const InternalSSRStream = () => null;

const useSequentialScope = () => {
    const iCtx = useInvokeContext();
    const elCtx = getContext(iCtx.$hostElement$, iCtx.$renderCtx$.$static$.$containerState$);
    const seq = elCtx.$seq$ || (elCtx.$seq$ = []);
    const i = iCtx.$i$++;
    return {
        val: seq[i],
        set: value => seq[i] = value,
        i,
        iCtx,
        elCtx
    };
};

const createContextId = name => (/*#__PURE__*/ Object.freeze({
    id: fromCamelToKebabCase(name)
}));

const findParentCtx = (el, containerState) => {
    let node = el;
    let stack = 1;
    for (;node && !node.hasAttribute?.("q:container"); ) {
        for (;node = node.previousSibling; ) {
            if (isComment(node)) {
                const virtual = node.__virtual;
                if (virtual) {
                    const qtx = virtual[Q_CTX];
                    if (node === virtual.open) {
                        return qtx ?? getContext(virtual, containerState);
                    }
                    if (qtx?.$parentCtx$) {
                        return qtx.$parentCtx$;
                    }
                    node = virtual;
                    continue;
                }
                if ("/qv" === node.data) {
                    stack++;
                } else if (node.data.startsWith("qv ") && (stack--, 0 === stack)) {
                    return getContext(getVirtualElement(node), containerState);
                }
            }
        }
        node = el.parentElement, el = node;
    }
    return null;
};

const getParentProvider = (ctx, containerState) => (void 0 === ctx.$parentCtx$ && (ctx.$parentCtx$ = findParentCtx(ctx.$element$, containerState)), 
ctx.$parentCtx$);

const resolveContext = (context, hostCtx, containerState) => {
    const contextID = context.id;
    if (!hostCtx) {
        return;
    }
    let ctx = hostCtx;
    for (;ctx; ) {
        const found = ctx.$contexts$?.get(contextID);
        if (found) {
            return found;
        }
        ctx = getParentProvider(ctx, containerState);
    }
};

const ERROR_CONTEXT = /*#__PURE__*/ createContextId("qk-error");

const handleError = (err, hostElement, rCtx) => {
    const elCtx = tryGetContext(hostElement);
    if (isServerPlatform()) {
        throw err;
    }
    {
        const errorStore = resolveContext(ERROR_CONTEXT, elCtx, rCtx.$static$.$containerState$);
        if (void 0 === errorStore) {
            throw err;
        }
        errorStore.error = err;
    }
};

const executeComponent = (rCtx, elCtx) => {
    elCtx.$flags$ &= ~HOST_FLAG_DIRTY, elCtx.$flags$ |= HOST_FLAG_MOUNTED, elCtx.$slots$ = [], 
    elCtx.li.length = 0;
    const hostElement = elCtx.$element$;
    const componentQRL = elCtx.$componentQrl$;
    const props = elCtx.$props$;
    const iCtx = newInvokeContext(rCtx.$static$.$locale$, hostElement, void 0, "qRender");
    const waitOn = iCtx.$waitOn$ = [];
    const newCtx = pushRenderContext(rCtx);
    newCtx.$cmpCtx$ = elCtx, newCtx.$slotCtx$ = null, iCtx.$subscriber$ = [ 0, hostElement ], 
    iCtx.$renderCtx$ = rCtx, componentQRL.$setContainer$(rCtx.$static$.$containerState$.$containerEl$);
    const componentFn = componentQRL.getFn(iCtx);
    return safeCall((() => componentFn(props)), (jsxNode => maybeThen(promiseAllLazy(waitOn), (() => elCtx.$flags$ & HOST_FLAG_DIRTY ? executeComponent(rCtx, elCtx) : {
        node: jsxNode,
        rCtx: newCtx
    }))), (err => err === SignalUnassignedException ? maybeThen(promiseAllLazy(waitOn), (() => executeComponent(rCtx, elCtx))) : (handleError(err, hostElement, rCtx), 
    {
        node: SkipRender,
        rCtx: newCtx
    })));
};

const createRenderContext = (doc, containerState) => {
    const ctx = {
        $static$: {
            $doc$: doc,
            $locale$: containerState.$serverData$.locale,
            $containerState$: containerState,
            $hostElements$: new Set,
            $operations$: [],
            $postOperations$: [],
            $roots$: [],
            $addSlots$: [],
            $rmSlots$: [],
            $visited$: []
        },
        $cmpCtx$: null,
        $slotCtx$: null
    };
    return ctx;
};

const pushRenderContext = ctx => ({
    $static$: ctx.$static$,
    $cmpCtx$: ctx.$cmpCtx$,
    $slotCtx$: ctx.$slotCtx$
});

const serializeClassWithHost = (obj, hostCtx) => hostCtx && hostCtx.$scopeIds$ ? hostCtx.$scopeIds$.join(" ") + " " + serializeClass(obj) : serializeClass(obj);

const serializeClass = obj => {
    if (!obj) {
        return "";
    }
    if (isString(obj)) {
        return obj.trim();
    }
    const classes = [];
    if (isArray(obj)) {
        for (const o of obj) {
            const classList = serializeClass(o);
            classList && classes.push(classList);
        }
    } else {
        for (const [key, value] of Object.entries(obj)) {
            value && classes.push(key.trim());
        }
    }
    return classes.join(" ");
};

const stringifyStyle = obj => {
    if (null == obj) {
        return "";
    }
    if ("object" == typeof obj) {
        if (isArray(obj)) {
            throw qError(0, obj, "style");
        }
        {
            const chunks = [];
            for (const key in obj) {
                if (Object.prototype.hasOwnProperty.call(obj, key)) {
                    const value = obj[key];
                    if (null != value) {
                        const normalizedKey = key.startsWith("--") ? key : fromCamelToKebabCase(key);
                        chunks.push(normalizedKey + ":" + value);
                    }
                }
            }
            return chunks.join(";");
        }
    }
    return String(obj);
};

const getNextIndex = ctx => intToStr(ctx.$static$.$containerState$.$elementIndex$++);

const setQId = (rCtx, elCtx) => {
    const id = getNextIndex(rCtx);
    elCtx.$id$ = id;
};

const jsxToString = data => isSignal(data) ? jsxToString(data.value) : null == data || "boolean" == typeof data ? "" : String(data);

function isAriaAttribute(prop) {
    return prop.startsWith("aria-");
}

const shouldWrapFunctional = (res, node) => !!node.key && (!isJSXNode(res) || !isFunction(res.type) && res.key != node.key);

const dangerouslySetInnerHTML = "dangerouslySetInnerHTML";

const renderComponent = (rCtx, elCtx, flags) => {
    const justMounted = !(elCtx.$flags$ & HOST_FLAG_MOUNTED);
    const hostElement = elCtx.$element$;
    const containerState = rCtx.$static$.$containerState$;
    return containerState.$hostsStaging$.delete(elCtx), containerState.$subsManager$.$clearSub$(hostElement), 
    maybeThen(executeComponent(rCtx, elCtx), (res => {
        const staticCtx = rCtx.$static$;
        const newCtx = res.rCtx;
        const iCtx = newInvokeContext(rCtx.$static$.$locale$, hostElement);
        if (staticCtx.$hostElements$.add(hostElement), iCtx.$subscriber$ = [ 0, hostElement ], 
        iCtx.$renderCtx$ = newCtx, justMounted && elCtx.$appendStyles$) {
            for (const style of elCtx.$appendStyles$) {
                appendHeadStyle(staticCtx, style);
            }
        }
        const processedJSXNode = processData$1(res.node, iCtx);
        return maybeThen(processedJSXNode, (processedJSXNode => {
            const newVdom = wrapJSX(hostElement, processedJSXNode);
            const oldVdom = getVdom(elCtx);
            return maybeThen(smartUpdateChildren(newCtx, oldVdom, newVdom, flags), (() => {
                elCtx.$vdom$ = newVdom;
            }));
        }));
    }));
};

const getVdom = elCtx => (elCtx.$vdom$ || (elCtx.$vdom$ = domToVnode(elCtx.$element$)), 
elCtx.$vdom$);

class ProcessedJSXNodeImpl {
    constructor($type$, $props$, $immutableProps$, $children$, $flags$, $key$) {
        this.$type$ = $type$, this.$props$ = $props$, this.$immutableProps$ = $immutableProps$, 
        this.$children$ = $children$, this.$flags$ = $flags$, this.$key$ = $key$, this.$elm$ = null, 
        this.$text$ = "", this.$signal$ = null, this.$id$ = $type$ + ($key$ ? ":" + $key$ : "");
    }
}

const processNode = (node, invocationContext) => {
    const {key, type, props, children, flags, immutableProps} = node;
    let textType = "";
    if (isString(type)) {
        textType = type;
    } else {
        if (type !== Virtual) {
            if (isFunction(type)) {
                const res = invoke(invocationContext, type, props, key, flags, node.dev);
                return shouldWrapFunctional(res, node) ? processNode(_jsxC(Virtual, {
                    children: res
                }, 0, key), invocationContext) : processData$1(res, invocationContext);
            }
            throw qError(25, type);
        }
        textType = VIRTUAL;
    }
    let convertedChildren = EMPTY_ARRAY;
    if (null != children) {
        return maybeThen(processData$1(children, invocationContext), (result => {
            void 0 !== result && (convertedChildren = isArray(result) ? result : [ result ]);
            const vnode = new ProcessedJSXNodeImpl(textType, props, immutableProps, convertedChildren, flags, key);
            return vnode;
        }));
    }
    {
        const vnode = new ProcessedJSXNodeImpl(textType, props, immutableProps, convertedChildren, flags, key);
        return vnode;
    }
};

const wrapJSX = (element, input) => {
    const children = void 0 === input ? EMPTY_ARRAY : isArray(input) ? input : [ input ];
    const node = new ProcessedJSXNodeImpl(":virtual", {}, null, children, 0, null);
    return node.$elm$ = element, node;
};

const processData$1 = (node, invocationContext) => {
    if (null != node && "boolean" != typeof node) {
        if (isPrimitive(node)) {
            const newNode = new ProcessedJSXNodeImpl("#text", EMPTY_OBJ, null, EMPTY_ARRAY, 0, null);
            return newNode.$text$ = String(node), newNode;
        }
        if (isJSXNode(node)) {
            return processNode(node, invocationContext);
        }
        if (isSignal(node)) {
            const newNode = new ProcessedJSXNodeImpl("#text", EMPTY_OBJ, null, EMPTY_ARRAY, 0, null);
            return newNode.$signal$ = node, newNode;
        }
        if (isArray(node)) {
            const output = promiseAll(node.flatMap((n => processData$1(n, invocationContext))));
            return maybeThen(output, (array => array.flat(100).filter(isNotNullable)));
        }
        return isPromise(node) ? node.then((node => processData$1(node, invocationContext))) : node === SkipRender ? new ProcessedJSXNodeImpl(SKIP_RENDER_TYPE, EMPTY_OBJ, null, EMPTY_ARRAY, 0, null) : void logWarn();
    }
};

const isPrimitive = obj => isString(obj) || "number" == typeof obj;

const resumeIfNeeded = containerEl => {
    "paused" === directGetAttribute(containerEl, "q:container") && (resumeContainer(containerEl), 
    appendQwikDevTools(containerEl));
};

const getPauseState = containerEl => {
    const doc = getDocument(containerEl);
    const script = getQwikJSON(containerEl === doc.documentElement ? doc.body : containerEl, "type");
    if (script) {
        return JSON.parse(unescapeText(script.firstChild.data) || "{}");
    }
};

const resumeContainer = containerEl => {
    if (!isContainer$1(containerEl)) {
        return void logWarn();
    }
    const pauseState = containerEl._qwikjson_ ?? getPauseState(containerEl);
    if (containerEl._qwikjson_ = null, !pauseState) {
        return void logWarn();
    }
    const doc = getDocument(containerEl);
    const parentJSON = containerEl === doc.documentElement ? doc.body : containerEl;
    const inlinedFunctions = getQwikInlinedFuncs(parentJSON);
    const containerState = _getContainerState(containerEl);
    const elements = new Map;
    const text = new Map;
    let node = null;
    let container = 0;
    const elementWalker = doc.createTreeWalker(containerEl, 128);
    for (;node = elementWalker.nextNode(); ) {
        const data = node.data;
        if (0 === container) {
            if (data.startsWith("qv ")) {
                const id = getID(data);
                id >= 0 && elements.set(id, node);
            } else if (data.startsWith("t=")) {
                const id = data.slice(2);
                const index = strToInt(id);
                const textNode = getTextNode(node);
                elements.set(index, textNode), text.set(index, textNode.data);
            }
        }
        "cq" === data ? container++ : "/cq" === data && container--;
    }
    const slotPath = 0 !== containerEl.getElementsByClassName("qc📦").length;
    containerEl.querySelectorAll("[q\\:id]").forEach((el => {
        if (slotPath && el.closest("[q\\:container]") !== containerEl) {
            return;
        }
        const id = directGetAttribute(el, "q:id");
        const index = strToInt(id);
        elements.set(index, el);
    }));
    const parser = createParser(containerState, doc);
    const finalized = new Map;
    const revived = new Set;
    const getObject = id => (assertTrue("string" == typeof id && id.length > 0), 
    finalized.has(id) ? finalized.get(id) : computeObject(id));
    const computeObject = id => {
        if (id.startsWith("#")) {
            const elementId = id.slice(1);
            const index = strToInt(elementId);
            assertTrue(elements.has(index));
            const rawElement = elements.get(index);
            if (isComment(rawElement)) {
                if (!rawElement.isConnected) {
                    return void finalized.set(id, void 0);
                }
                const virtual = getVirtualElement(rawElement);
                return finalized.set(id, virtual), getContext(virtual, containerState), virtual;
            }
            return isElement$1(rawElement) ? (finalized.set(id, rawElement), getContext(rawElement, containerState), 
            rawElement) : (finalized.set(id, rawElement), rawElement);
        }
        if (id.startsWith("@")) {
            const funcId = id.slice(1);
            const index = strToInt(funcId);
            const func = inlinedFunctions[index];
            return func;
        }
        if (id.startsWith("*")) {
            const elementId = id.slice(1);
            const index = strToInt(elementId);
            assertTrue(elements.has(index));
            const str = text.get(index);
            return finalized.set(id, str), 
            str;
        }
        const index = strToInt(id);
        const objs = pauseState.objs;
        assertTrue(objs.length > index);
        let value = objs[index];
        isString(value) && (value = value === UNDEFINED_PREFIX ? void 0 : parser.prepare(value));
        let obj = value;
        for (let i = id.length - 1; i >= 0; i--) {
            const transform = OBJECT_TRANSFORMS[id[i]];
            if (!transform) {
                break;
            }
            obj = transform(obj, containerState);
        }
        return finalized.set(id, obj), isPrimitive(value) || revived.has(index) || (revived.add(index), 
        reviveSubscriptions(value, index, pauseState.subs, getObject, containerState, parser), 
        reviveNestedObjects(value, getObject, parser)), obj;
    };
    containerState.$elementIndex$ = 1e5, containerState.$pauseCtx$ = {
        getObject,
        meta: pauseState.ctx,
        refs: pauseState.refs
    }, directSetAttribute(containerEl, "q:container", "resumed"), emitEvent$1(containerEl, "qresume", void 0, !0);
};

const reviveSubscriptions = (value, i, objsSubs, getObject, containerState, parser) => {
    const subs = objsSubs[i];
    if (subs) {
        const converted = [];
        let flag = 0;
        for (const sub of subs) {
            if (sub.startsWith("_")) {
                flag = parseInt(sub.slice(1), 10);
            } else {
                const parsed = parseSubscription(sub, getObject);
                parsed && converted.push(parsed);
            }
        }
        if (flag > 0 && setObjectFlags(value, flag), !parser.subs(value, converted)) {
            const proxy = containerState.$proxyMap$.get(value);
            proxy ? getSubscriptionManager(proxy).$addSubs$(converted) : createProxy(value, containerState, converted);
        }
    }
};

const reviveNestedObjects = (obj, getObject, parser) => {
    if (!parser.fill(obj, getObject) && obj && "object" == typeof obj) {
        if (isArray(obj)) {
            for (let i = 0; i < obj.length; i++) {
                obj[i] = getObject(obj[i]);
            }
        } else if (isSerializableObject(obj)) {
            for (const key in obj) {
                obj[key] = getObject(obj[key]);
            }
        }
    }
};

const unescapeText = str => str.replace(/\\x3C(\/?script)/g, "<$1");

const getQwikInlinedFuncs = parentElm => {
    const elm = getQwikJSON(parentElm, "q:func");
    return elm?.qFuncs ?? EMPTY_ARRAY;
};

const getQwikJSON = (parentElm, attribute) => {
    let child = parentElm.lastElementChild;
    for (;child; ) {
        if ("SCRIPT" === child.tagName && "qwik/json" === directGetAttribute(child, attribute)) {
            return child;
        }
        child = child.previousElementSibling;
    }
};

const getTextNode = mark => {
    const nextNode = mark.nextSibling;
    if (isText(nextNode)) {
        return nextNode;
    }
    {
        const textNode = mark.ownerDocument.createTextNode("");
        return mark.parentElement.insertBefore(textNode, mark), textNode;
    }
};

const appendQwikDevTools = containerEl => {
    containerEl.qwik = {
        pause: () => pauseContainer(containerEl),
        state: _getContainerState(containerEl)
    };
};

const getID = stuff => {
    const index = stuff.indexOf("q:id=");
    return index > 0 ? strToInt(stuff.slice(index + 5)) : -1;
};

const executeSignalOperation = (staticCtx, operation) => {
    try {
        const type = operation[0];
        switch (type) {
          case 1:
          case 2:
            {
                let elm;
                let hostElm;
                1 === type ? (elm = operation[1], hostElm = operation[3]) : (elm = operation[3], 
                hostElm = operation[1]);
                const elCtx = tryGetContext(elm);
                if (null == elCtx) {
                    return;
                }
                const prop = operation[4];
                const isSVG = elm.namespaceURI === SVG_NS;
                staticCtx.$containerState$.$subsManager$.$clearSignal$(operation);
                let value = trackSignal(operation[2], operation.slice(0, -1));
                "class" === prop ? value = serializeClassWithHost(value, tryGetContext(hostElm)) : "style" === prop && (value = stringifyStyle(value));
                const vdom = getVdom(elCtx);
                if (prop in vdom.$props$ && vdom.$props$[prop] === value) {
                    return;
                }
                return vdom.$props$[prop] = value, smartSetProperty(staticCtx, elm, prop, value, isSVG);
            }

          case 3:
          case 4:
            {
                const elm = operation[3];
                if (!staticCtx.$visited$.includes(elm)) {
                    staticCtx.$containerState$.$subsManager$.$clearSignal$(operation);
                    const value = trackSignal(operation[2], operation.slice(0, -1));
                    return setProperty(staticCtx, elm, "data", jsxToString(value));
                }
            }
        }
    } catch (e) {}
};

const notifyChange = (subAction, containerState) => {
    if (0 === subAction[0]) {
        const host = subAction[1];
        isSubscriberDescriptor(host) ? notifyTask(host, containerState) : notifyRender(host, containerState);
    } else {
        notifySignalOperation(subAction, containerState);
    }
};

const notifyRender = (hostElement, containerState) => {
    const server = isServerPlatform();
    server || resumeIfNeeded(containerState.$containerEl$);
    const elCtx = getContext(hostElement, containerState);
    if (assertDefined(elCtx.$componentQrl$), 
    elCtx.$flags$ & HOST_FLAG_DIRTY) {
        return;
    }
    elCtx.$flags$ |= HOST_FLAG_DIRTY;
    if (void 0 !== containerState.$hostsRendering$) {
        containerState.$hostsStaging$.add(elCtx);
    } else {
        if (server) {
            return void logWarn();
        }
        containerState.$hostsNext$.add(elCtx), scheduleFrame(containerState);
    }
};

const notifySignalOperation = (op, containerState) => {
    const activeRendering = void 0 !== containerState.$hostsRendering$;
    containerState.$opsNext$.add(op), activeRendering || scheduleFrame(containerState);
};

const notifyTask = (task, containerState) => {
    if (task.$flags$ & TaskFlagsIsDirty) {
        return;
    }
    task.$flags$ |= TaskFlagsIsDirty;
    void 0 !== containerState.$hostsRendering$ ? containerState.$taskStaging$.add(task) : (containerState.$taskNext$.add(task), 
    scheduleFrame(containerState));
};

const scheduleFrame = containerState => (void 0 === containerState.$renderPromise$ && (containerState.$renderPromise$ = getPlatform().nextTick((() => renderMarked(containerState)))), 
containerState.$renderPromise$);

const renderMarked = async containerState => {
    const containerEl = containerState.$containerEl$;
    const doc = getDocument(containerEl);
    try {
        const rCtx = createRenderContext(doc, containerState);
        const staticCtx = rCtx.$static$;
        const hostsRendering = containerState.$hostsRendering$ = new Set(containerState.$hostsNext$);
        containerState.$hostsNext$.clear(), await executeTasksBefore(containerState, rCtx), 
        containerState.$hostsStaging$.forEach((host => {
            hostsRendering.add(host);
        })), containerState.$hostsStaging$.clear();
        const signalOperations = Array.from(containerState.$opsNext$);
        containerState.$opsNext$.clear();
        const renderingQueue = Array.from(hostsRendering);
        if (sortNodes(renderingQueue), !containerState.$styleMoved$ && renderingQueue.length > 0) {
            containerState.$styleMoved$ = !0;
            (containerEl === doc.documentElement ? doc.body : containerEl).querySelectorAll("style[q\\:style]").forEach((el => {
                containerState.$styleIds$.add(directGetAttribute(el, QStyle)), appendChild(staticCtx, doc.head, el);
            }));
        }
        for (const elCtx of renderingQueue) {
            const el = elCtx.$element$;
            if (!staticCtx.$hostElements$.has(el) && elCtx.$componentQrl$) {
                assertTrue(el.isConnected, "element must be connected to the dom"), staticCtx.$roots$.push(elCtx);
                try {
                    await renderComponent(rCtx, elCtx, getFlags(el.parentElement));
                } catch (err) {
                    logError(err);
                }
            }
        }
        return signalOperations.forEach((op => {
            executeSignalOperation(staticCtx, op);
        })), staticCtx.$operations$.push(...staticCtx.$postOperations$), 0 === staticCtx.$operations$.length ? (printRenderStats(staticCtx), 
        void await postRendering(containerState, rCtx)) : (await executeContextWithScrollAndTransition(staticCtx), 
        printRenderStats(staticCtx), postRendering(containerState, rCtx));
    } catch (err) {
        logError(err);
    }
};

const getFlags = el => {
    let flags = 0;
    return el && (el.namespaceURI === SVG_NS && (flags |= IS_SVG), "HEAD" === el.tagName && (flags |= IS_HEAD)), 
    flags;
};

const postRendering = async (containerState, rCtx) => {
    const hostElements = rCtx.$static$.$hostElements$;
    await executeTasksAfter(containerState, rCtx, ((task, stage) => 0 != (task.$flags$ & TaskFlagsIsVisibleTask) && (!stage || hostElements.has(task.$el$)))), 
    containerState.$hostsStaging$.forEach((el => {
        containerState.$hostsNext$.add(el);
    })), containerState.$hostsStaging$.clear(), containerState.$hostsRendering$ = void 0, 
    containerState.$renderPromise$ = void 0;
    containerState.$hostsNext$.size + containerState.$taskNext$.size + containerState.$opsNext$.size > 0 && (containerState.$renderPromise$ = renderMarked(containerState));
};

const executeTasksBefore = async (containerState, rCtx) => {
    const containerEl = containerState.$containerEl$;
    const resourcesPromises = [];
    const taskPromises = [];
    const isTask = task => 0 != (task.$flags$ & TaskFlagsIsTask);
    const isResourceTask = task => 0 != (task.$flags$ & TaskFlagsIsResource);
    containerState.$taskNext$.forEach((task => {
        isTask(task) && (taskPromises.push(maybeThen(task.$qrl$.$resolveLazy$(containerEl), (() => task))), 
        containerState.$taskNext$.delete(task)), isResourceTask(task) && (resourcesPromises.push(maybeThen(task.$qrl$.$resolveLazy$(containerEl), (() => task))), 
        containerState.$taskNext$.delete(task));
    }));
    do {
        if (containerState.$taskStaging$.forEach((task => {
            isTask(task) ? taskPromises.push(maybeThen(task.$qrl$.$resolveLazy$(containerEl), (() => task))) : isResourceTask(task) ? resourcesPromises.push(maybeThen(task.$qrl$.$resolveLazy$(containerEl), (() => task))) : containerState.$taskNext$.add(task);
        })), containerState.$taskStaging$.clear(), taskPromises.length > 0) {
            const tasks = await Promise.all(taskPromises);
            sortTasks(tasks), await Promise.all(tasks.map((task => runSubscriber(task, containerState, rCtx)))), 
            taskPromises.length = 0;
        }
    } while (containerState.$taskStaging$.size > 0);
    if (resourcesPromises.length > 0) {
        const resources = await Promise.all(resourcesPromises);
        sortTasks(resources), resources.forEach((task => runSubscriber(task, containerState, rCtx)));
    }
};

const executeTasksAfter = async (containerState, rCtx, taskPred) => {
    const taskPromises = [];
    const containerEl = containerState.$containerEl$;
    containerState.$taskNext$.forEach((task => {
        taskPred(task, !1) && (task.$el$.isConnected && taskPromises.push(maybeThen(task.$qrl$.$resolveLazy$(containerEl), (() => task))), 
        containerState.$taskNext$.delete(task));
    }));
    do {
        if (containerState.$taskStaging$.forEach((task => {
            task.$el$.isConnected && (taskPred(task, !0) ? taskPromises.push(maybeThen(task.$qrl$.$resolveLazy$(containerEl), (() => task))) : containerState.$taskNext$.add(task));
        })), containerState.$taskStaging$.clear(), taskPromises.length > 0) {
            const tasks = await Promise.all(taskPromises);
            sortTasks(tasks);
            for (const task of tasks) {
                runSubscriber(task, containerState, rCtx);
            }
            taskPromises.length = 0;
        }
    } while (containerState.$taskStaging$.size > 0);
};

const sortNodes = elements => {
    elements.sort(((a, b) => 2 & a.$element$.compareDocumentPosition(getRootNode(b.$element$)) ? 1 : -1));
};

const sortTasks = tasks => {
    tasks.sort(((a, b) => a.$el$ === b.$el$ ? a.$index$ < b.$index$ ? -1 : 1 : 0 != (2 & a.$el$.compareDocumentPosition(getRootNode(b.$el$))) ? 1 : -1));
};

const TaskFlagsIsVisibleTask = 1;

const TaskFlagsIsTask = 2;

const TaskFlagsIsResource = 4;

const TaskFlagsIsDirty = 16;

const isResourceTask = task => 0 != (task.$flags$ & TaskFlagsIsResource);

const isComputedTask = task => 0 != (8 & task.$flags$);

const runSubscriber = async (task, containerState, rCtx) => (assertEqual(!!(task.$flags$ & TaskFlagsIsDirty)), 
isResourceTask(task) ? runResource(task, containerState, rCtx) : isComputedTask(task) ? runComputed(task, containerState, rCtx) : runTask(task, containerState, rCtx));

const runResource = (task, containerState, rCtx, waitOn) => {
    task.$flags$ &= ~TaskFlagsIsDirty, cleanupTask(task);
    const iCtx = newInvokeContext(rCtx.$static$.$locale$, task.$el$, void 0, "TaskEvent");
    const {$subsManager$: subsManager} = containerState;
    iCtx.$renderCtx$ = rCtx;
    const taskFn = task.$qrl$.getFn(iCtx, (() => {
        subsManager.$clearSub$(task);
    }));
    const cleanups = [];
    const resource = task.$state$;
    const resourceTarget = unwrapProxy(resource);
    const opts = {
        track: (obj, prop) => {
            if (isFunction(obj)) {
                const ctx = newInvokeContext();
                return ctx.$renderCtx$ = rCtx, ctx.$subscriber$ = [ 0, task ], invoke(ctx, obj);
            }
            const manager = getSubscriptionManager(obj);
            return manager ? manager.$addSub$([ 0, task ], prop) : logErrorAndStop(codeToText(26), obj), 
            prop ? obj[prop] : isSignal(obj) ? obj.value : obj;
        },
        cleanup(callback) {
            cleanups.push(callback);
        },
        cache(policy) {
            let milliseconds = 0;
            milliseconds = "immutable" === policy ? 1 / 0 : policy, resource._cache = milliseconds;
        },
        previous: resourceTarget._resolved
    };
    let resolve;
    let reject;
    let done = !1;
    const setState = (resolved, value) => !done && (done = !0, resolved ? (done = !0, 
    resource.loading = !1, resource._state = "resolved", resource._resolved = value, 
    resource._error = void 0, resolve(value)) : (done = !0, resource.loading = !1, resource._state = "rejected", 
    resource._error = value, reject(value)), !0);
    invoke(iCtx, (() => {
        resource._state = "pending", resource.loading = !isServerPlatform(), resource.value = new Promise(((r, re) => {
            resolve = r, reject = re;
        }));
    })), task.$destroy$ = noSerialize((() => {
        done = !0, cleanups.forEach((fn => fn()));
    }));
    const promise = safeCall((() => maybeThen(waitOn, (() => taskFn(opts)))), (value => {
        setState(!0, value);
    }), (reason => {
        setState(!1, reason);
    }));
    const timeout = resourceTarget._timeout;
    return timeout > 0 ? Promise.race([ promise, delay(timeout).then((() => {
        setState(!1, new Error("timeout")) && cleanupTask(task);
    })) ]) : promise;
};

const runTask = (task, containerState, rCtx) => {
    task.$flags$ &= ~TaskFlagsIsDirty, cleanupTask(task);
    const hostElement = task.$el$;
    const iCtx = newInvokeContext(rCtx.$static$.$locale$, hostElement, void 0, "TaskEvent");
    iCtx.$renderCtx$ = rCtx;
    const {$subsManager$: subsManager} = containerState;
    const taskFn = task.$qrl$.getFn(iCtx, (() => {
        subsManager.$clearSub$(task);
    }));
    const cleanups = [];
    task.$destroy$ = noSerialize((() => {
        cleanups.forEach((fn => fn()));
    }));
    const opts = {
        track: (obj, prop) => {
            if (isFunction(obj)) {
                const ctx = newInvokeContext();
                return ctx.$subscriber$ = [ 0, task ], invoke(ctx, obj);
            }
            const manager = getSubscriptionManager(obj);
            return manager ? manager.$addSub$([ 0, task ], prop) : logErrorAndStop(codeToText(26), obj), 
            prop ? obj[prop] : obj;
        },
        cleanup(callback) {
            cleanups.push(callback);
        }
    };
    return safeCall((() => taskFn(opts)), (returnValue => {
        isFunction(returnValue) && cleanups.push(returnValue);
    }), (reason => {
        handleError(reason, hostElement, rCtx);
    }));
};

const runComputed = (task, containerState, rCtx) => {
    assertSignal(task.$state$), task.$flags$ &= ~TaskFlagsIsDirty, cleanupTask(task);
    const hostElement = task.$el$;
    const iCtx = newInvokeContext(rCtx.$static$.$locale$, hostElement, void 0, "ComputedEvent");
    iCtx.$subscriber$ = [ 0, task ], iCtx.$renderCtx$ = rCtx;
    const {$subsManager$: subsManager} = containerState;
    const taskFn = task.$qrl$.getFn(iCtx, (() => {
        subsManager.$clearSub$(task);
    }));
    return safeCall(taskFn, (returnValue => untrack((() => {
        const signal = task.$state$;
        signal[QObjectSignalFlags] &= -3, signal.untrackedValue = returnValue, signal[QObjectManagerSymbol].$notifySubs$();
    }))), (reason => {
        handleError(reason, hostElement, rCtx);
    }));
};

const cleanupTask = task => {
    const destroy = task.$destroy$;
    if (destroy) {
        task.$destroy$ = void 0;
        try {
            destroy();
        } catch (err) {
            logError(err);
        }
    }
};

const destroyTask = task => {
    if (32 & task.$flags$) {
        task.$flags$ &= -33;
        (0, task.$qrl$)();
    } else {
        cleanupTask(task);
    }
};

const isSubscriberDescriptor = obj => isObject(obj) && obj instanceof Task;

const serializeTask = (task, getObjId) => {
    let value = `${intToStr(task.$flags$)} ${intToStr(task.$index$)} ${getObjId(task.$qrl$)} ${getObjId(task.$el$)}`;
    return task.$state$ && (value += ` ${getObjId(task.$state$)}`), value;
};

const parseTask = data => {
    const [flags, index, qrl, el, resource] = data.split(" ");
    return new Task(strToInt(flags), strToInt(index), el, qrl, resource);
};

class Task {
    constructor($flags$, $index$, $el$, $qrl$, $state$) {
        this.$flags$ = $flags$, this.$index$ = $index$, this.$el$ = $el$, this.$qrl$ = $qrl$, 
        this.$state$ = $state$;
    }
}

function isElement(value) {
    return isNode(value) && 1 === value.nodeType;
}

function isNode(value) {
    return value && "number" == typeof value.nodeType;
}

const HOST_FLAG_DIRTY = 1;

const HOST_FLAG_NEED_ATTACH_LISTENER = 2;

const HOST_FLAG_MOUNTED = 4;

const tryGetContext = element => element[Q_CTX];

const getContext = (el, containerState) => {
    const ctx = tryGetContext(el);
    if (ctx) {
        return ctx;
    }
    const elCtx = createContext(el);
    const elementID = directGetAttribute(el, "q:id");
    if (elementID) {
        const pauseCtx = containerState.$pauseCtx$;
        if (elCtx.$id$ = elementID, pauseCtx) {
            const {getObject, meta, refs} = pauseCtx;
            if (isElement(el)) {
                const refMap = refs[elementID];
                refMap && (elCtx.$refMap$ = refMap.split(" ").map(getObject), elCtx.li = getDomListeners(elCtx, containerState.$containerEl$));
            } else {
                const styleIds = el.getAttribute("q:sstyle");
                elCtx.$scopeIds$ = styleIds ? styleIds.split("|") : null;
                const ctxMeta = meta[elementID];
                if (ctxMeta) {
                    const seq = ctxMeta.s;
                    const host = ctxMeta.h;
                    const contexts = ctxMeta.c;
                    const tasks = ctxMeta.w;
                    if (seq && (elCtx.$seq$ = seq.split(" ").map(getObject)), tasks && (elCtx.$tasks$ = tasks.split(" ").map(getObject)), 
                    contexts) {
                        elCtx.$contexts$ = new Map;
                        for (const part of contexts.split(" ")) {
                            const [key, value] = part.split("=");
                            elCtx.$contexts$.set(key, getObject(value));
                        }
                    }
                    if (host) {
                        const [renderQrl, props] = host.split(" ");
                        if (elCtx.$flags$ = HOST_FLAG_MOUNTED, renderQrl && (elCtx.$componentQrl$ = getObject(renderQrl)), 
                        props) {
                            const propsObj = getObject(props);
                            elCtx.$props$ = propsObj, setObjectFlags(propsObj, 2), propsObj[_IMMUTABLE] = getImmutableFromProps(propsObj);
                        } else {
                            elCtx.$props$ = createProxy(createPropsState(), containerState);
                        }
                    }
                }
            }
        }
    }
    return elCtx;
};

const getImmutableFromProps = props => {
    const immutable = {};
    const target = getProxyTarget(props);
    for (const key in target) {
        key.startsWith("$$") && (immutable[key.slice(2)] = target[key]);
    }
    return immutable;
};

const createContext = element => {
    const ctx = {
        $flags$: 0,
        $id$: "",
        $element$: element,
        $refMap$: [],
        li: [],
        $tasks$: null,
        $seq$: null,
        $slots$: null,
        $scopeIds$: null,
        $appendStyles$: null,
        $props$: null,
        $vdom$: null,
        $componentQrl$: null,
        $contexts$: null,
        $dynamicSlots$: null,
        $parentCtx$: void 0
    };
    return element[Q_CTX] = ctx, ctx;
};

const cleanupContext = (elCtx, subsManager) => {
    elCtx.$tasks$?.forEach((task => {
        subsManager.$clearSub$(task), destroyTask(task);
    })), elCtx.$componentQrl$ = null, elCtx.$seq$ = null, elCtx.$tasks$ = null;
};

let _context;

const tryGetInvokeContext = () => {
    if (!_context) {
        const context = "undefined" != typeof document && document && document.__q_context__;
        if (!context) {
            return;
        }
        return isArray(context) ? document.__q_context__ = newInvokeContextFromTuple(context) : context;
    }
    return _context;
};

const useInvokeContext = () => {
    const ctx = tryGetInvokeContext();
    if (!ctx || "qRender" !== ctx.$event$) {
        throw qError(20);
    }
    return assertDefined(ctx.$hostElement$), 
    assertDefined(ctx.$waitOn$), assertDefined(ctx.$renderCtx$), 
    assertDefined(ctx.$subscriber$), ctx;
};

function invoke(context, fn, ...args) {
    const previousContext = _context;
    let returnValue;
    try {
        _context = context, returnValue = fn.apply(this, args);
    } finally {
        _context = previousContext;
    }
    return returnValue;
}

const newInvokeContextFromTuple = context => {
    const element = context[0];
    const container = element.closest("[q\\:container]");
    const locale = container?.getAttribute("q:locale") || void 0;
    return newInvokeContext(locale, void 0, element, context[1], context[2]);
};

const newInvokeContext = (locale, hostElement, element, event, url) => {
    const ctx = {
        $url$: url,
        $i$: 0,
        $hostElement$: hostElement,
        $element$: element,
        $event$: event,
        $qrl$: void 0,
        $waitOn$: void 0,
        $subscriber$: void 0,
        $renderCtx$: void 0,
        $locale$: locale
    };
    return ctx;
};

const untrack = fn => invoke(void 0, fn);

const trackInvocation = /*#__PURE__*/ newInvokeContext(void 0, void 0, void 0, "qRender");

const trackSignal = (signal, sub) => (trackInvocation.$subscriber$ = sub, invoke(trackInvocation, (() => signal.value)));

const serializeSStyle = scopeIds => {
    const value = scopeIds.join("|");
    if (value.length > 0) {
        return value;
    }
};

var _a;

const FLUSH_COMMENT = "\x3c!--qkssr-f--\x3e";

class MockElement {
    constructor(nodeType) {
        this.nodeType = nodeType, this[_a] = null;
    }
}

_a = Q_CTX;

const createDocument = () => new MockElement(9);

const _renderSSR = async (node, opts) => {
    const root = opts.containerTagName;
    const containerEl = createMockQContext(1).$element$;
    const containerState = createContainerState(containerEl, opts.base ?? "/");
    containerState.$serverData$.locale = opts.serverData?.locale;
    const doc = createDocument();
    const rCtx = createRenderContext(doc, containerState);
    const headNodes = opts.beforeContent ?? [];
    const ssrCtx = {
        $static$: {
            $contexts$: [],
            $headNodes$: "html" === root ? headNodes : [],
            $locale$: opts.serverData?.locale,
            $textNodes$: new Map
        },
        $projectedChildren$: void 0,
        $projectedCtxs$: void 0,
        $invocationContext$: void 0
    };
    let qRender = "ssr";
    opts.containerAttributes["q:render"] && (qRender = `${opts.containerAttributes["q:render"]}-${qRender}`);
    const containerAttributes = {
        ...opts.containerAttributes,
        "q:container": "paused",
        "q:version": "1.2.17",
        "q:render": qRender,
        "q:base": opts.base,
        "q:locale": opts.serverData?.locale,
        "q:manifest-hash": opts.manifestHash
    };
    const children = "html" === root ? [ node ] : [ headNodes, node ];
    "html" !== root && (containerAttributes.class = "qc📦" + (containerAttributes.class ? " " + containerAttributes.class : "")), 
    opts.serverData && (containerState.$serverData$ = opts.serverData), node = _jsxQ(root, null, containerAttributes, children, HOST_FLAG_DIRTY | HOST_FLAG_NEED_ATTACH_LISTENER, null), 
    containerState.$hostsRendering$ = new Set, await Promise.resolve().then((() => renderRoot$1(node, rCtx, ssrCtx, opts.stream, containerState, opts)));
};

const renderRoot$1 = async (node, rCtx, ssrCtx, stream, containerState, opts) => {
    const beforeClose = opts.beforeClose;
    return await renderNode(node, rCtx, ssrCtx, stream, 0, beforeClose ? stream => {
        const result = beforeClose(ssrCtx.$static$.$contexts$, containerState, !1, ssrCtx.$static$.$textNodes$);
        return processData(result, rCtx, ssrCtx, stream, 0, void 0);
    } : void 0), rCtx;
};

const renderGenerator = async (node, rCtx, ssrCtx, stream, flags) => {
    stream.write(FLUSH_COMMENT);
    const generator = node.props.children;
    let value;
    if (isFunction(generator)) {
        const v = generator({
            write(chunk) {
                stream.write(chunk), stream.write(FLUSH_COMMENT);
            }
        });
        if (isPromise(v)) {
            return v;
        }
        value = v;
    } else {
        value = generator;
    }
    for await (const chunk of value) {
        await processData(chunk, rCtx, ssrCtx, stream, flags, void 0), stream.write(FLUSH_COMMENT);
    }
};

const renderNodeVirtual = (node, elCtx, extraNodes, rCtx, ssrCtx, stream, flags, beforeClose) => {
    const props = node.props;
    const renderQrl = props["q:renderFn"];
    if (renderQrl) {
        return elCtx.$componentQrl$ = renderQrl, renderSSRComponent(rCtx, ssrCtx, stream, elCtx, node, flags, beforeClose);
    }
    let virtualComment = "\x3c!--qv" + renderVirtualAttributes(props);
    const isSlot = "q:s" in props;
    const key = null != node.key ? String(node.key) : null;
    isSlot && (assertDefined(rCtx.$cmpCtx$?.$id$), 
    virtualComment += " q:sref=" + rCtx.$cmpCtx$.$id$), null != key && (virtualComment += " q:key=" + key), 
    virtualComment += "--\x3e", stream.write(virtualComment);
    const html = node.props[dangerouslySetInnerHTML];
    if (html) {
        return stream.write(html), void stream.write(CLOSE_VIRTUAL);
    }
    if (extraNodes) {
        for (const node of extraNodes) {
            renderNodeElementSync(node.type, node.props, stream);
        }
    }
    const promise = walkChildren(node.children, rCtx, ssrCtx, stream, flags);
    return maybeThen(promise, (() => {
        if (!isSlot && !beforeClose) {
            return void stream.write(CLOSE_VIRTUAL);
        }
        let promise;
        if (isSlot) {
            const content = ssrCtx.$projectedChildren$?.[key];
            if (content) {
                const [rCtx, sCtx] = ssrCtx.$projectedCtxs$;
                const newSlotRctx = pushRenderContext(rCtx);
                newSlotRctx.$slotCtx$ = elCtx, ssrCtx.$projectedChildren$[key] = void 0, promise = processData(content, newSlotRctx, sCtx, stream, flags);
            }
        }
        return beforeClose && (promise = maybeThen(promise, (() => beforeClose(stream)))), 
        maybeThen(promise, (() => {
            stream.write(CLOSE_VIRTUAL);
        }));
    }));
};

const CLOSE_VIRTUAL = "\x3c!--/qv--\x3e";

const renderAttributes = attributes => {
    let text = "";
    for (const prop in attributes) {
        if (prop === dangerouslySetInnerHTML) {
            continue;
        }
        const value = attributes[prop];
        null != value && (text += " " + ("" === value ? prop : prop + '="' + value + '"'));
    }
    return text;
};

const renderVirtualAttributes = attributes => {
    let text = "";
    for (const prop in attributes) {
        if ("children" === prop || prop === dangerouslySetInnerHTML) {
            continue;
        }
        const value = attributes[prop];
        null != value && (text += " " + ("" === value ? prop : prop + "=" + value));
    }
    return text;
};

const renderNodeElementSync = (tagName, attributes, stream) => {
    stream.write("<" + tagName + renderAttributes(attributes) + ">");
    if (!!emptyElements[tagName]) {
        return;
    }
    const innerHTML = attributes[dangerouslySetInnerHTML];
    null != innerHTML && stream.write(innerHTML), stream.write(`</${tagName}>`);
};

const renderSSRComponent = (rCtx, ssrCtx, stream, elCtx, node, flags, beforeClose) => (setComponentProps$1(rCtx, elCtx, node.props.props), 
maybeThen(executeComponent(rCtx, elCtx), (res => {
    const hostElement = elCtx.$element$;
    const newRCtx = res.rCtx;
    const iCtx = newInvokeContext(ssrCtx.$static$.$locale$, hostElement, void 0);
    iCtx.$subscriber$ = [ 0, hostElement ], iCtx.$renderCtx$ = newRCtx;
    const newSSrContext = {
        $static$: ssrCtx.$static$,
        $projectedChildren$: splitProjectedChildren(node.children, ssrCtx),
        $projectedCtxs$: [ rCtx, ssrCtx ],
        $invocationContext$: iCtx
    };
    const extraNodes = [];
    if (elCtx.$appendStyles$) {
        const array = !!(4 & flags) ? ssrCtx.$static$.$headNodes$ : extraNodes;
        for (const style of elCtx.$appendStyles$) {
            array.push(_jsxQ("style", {
                [QStyle]: style.styleId,
                [dangerouslySetInnerHTML]: style.content,
                hidden: ""
            }, null, null, 0, null));
        }
    }
    const newID = getNextIndex(rCtx);
    const scopeId = elCtx.$scopeIds$ ? serializeSStyle(elCtx.$scopeIds$) : void 0;
    const processedNode = _jsxC(node.type, {
        "q:sstyle": scopeId,
        "q:id": newID,
        children: res.node
    }, 0, node.key);
    return elCtx.$id$ = newID, ssrCtx.$static$.$contexts$.push(elCtx), renderNodeVirtual(processedNode, elCtx, extraNodes, newRCtx, newSSrContext, stream, flags, (stream => {
        if (elCtx.$flags$ & HOST_FLAG_NEED_ATTACH_LISTENER) {
            const placeholderCtx = createMockQContext(1);
            const listeners = placeholderCtx.li;
            listeners.push(...elCtx.li), elCtx.$flags$ &= ~HOST_FLAG_NEED_ATTACH_LISTENER, placeholderCtx.$id$ = getNextIndex(rCtx);
            const attributes = {
                type: "placeholder",
                hidden: "",
                "q:id": placeholderCtx.$id$
            };
            ssrCtx.$static$.$contexts$.push(placeholderCtx);
            const groups = groupListeners(listeners);
            for (const listener of groups) {
                const eventName = normalizeInvisibleEvents(listener[0]);
                attributes[eventName] = serializeQRLs(listener[1], placeholderCtx), registerQwikEvent$1(eventName, rCtx.$static$.$containerState$);
            }
            renderNodeElementSync("script", attributes, stream);
        }
        const projectedChildren = newSSrContext.$projectedChildren$;
        let missingSlotsDone;
        if (projectedChildren) {
            const nodes = Object.keys(projectedChildren).map((slotName => {
                const content = projectedChildren[slotName];
                if (content) {
                    return _jsxQ("q:template", {
                        [QSlot]: slotName,
                        hidden: "",
                        "aria-hidden": "true"
                    }, null, content, 0, null);
                }
            }));
            const [_rCtx, sCtx] = newSSrContext.$projectedCtxs$;
            const newSlotRctx = pushRenderContext(_rCtx);
            newSlotRctx.$slotCtx$ = elCtx, missingSlotsDone = processData(nodes, newSlotRctx, sCtx, stream, 0, void 0);
        }
        return beforeClose ? maybeThen(missingSlotsDone, (() => beforeClose(stream))) : missingSlotsDone;
    }));
})));

const splitProjectedChildren = (children, ssrCtx) => {
    const flatChildren = flatVirtualChildren(children, ssrCtx);
    if (null === flatChildren) {
        return;
    }
    const slotMap = {};
    for (const child of flatChildren) {
        let slotName = "";
        isJSXNode(child) && (slotName = child.props[QSlot] ?? ""), (slotMap[slotName] || (slotMap[slotName] = [])).push(child);
    }
    return slotMap;
};

const createMockQContext = nodeType => {
    const elm = new MockElement(nodeType);
    return createContext(elm);
};

const renderNode = (node, rCtx, ssrCtx, stream, flags, beforeClose) => {
    const tagName = node.type;
    const hostCtx = rCtx.$cmpCtx$;
    if ("string" == typeof tagName) {
        const key = node.key;
        const props = node.props;
        const immutable = node.immutableProps;
        const elCtx = createMockQContext(1);
        const elm = elCtx.$element$;
        const isHead = "head" === tagName;
        let openingElement = "<" + tagName;
        let useSignal = !1;
        let hasRef = !1;
        let classStr = "";
        let htmlStr = null;
        if (immutable) {
            for (const prop in immutable) {
                let value = immutable[prop];
                if (isOnProp(prop)) {
                    setEvent(elCtx.li, prop, value, void 0);
                    continue;
                }
                const attrName = processPropKey(prop);
                if (isSignal(value) && (value = trackSignal(value, [ 1, elm, value, hostCtx.$element$, attrName ]), useSignal = !0), 
                prop === dangerouslySetInnerHTML) {
                    htmlStr = value;
                    continue;
                }
                prop.startsWith(PREVENT_DEFAULT) && registerQwikEvent$1(prop.slice(15), rCtx.$static$.$containerState$);
                const attrValue = processPropValue(attrName, value);
                null != attrValue && ("class" === attrName ? classStr = attrValue : "value" === attrName && "textarea" === tagName ? htmlStr = escapeHtml(attrValue) : isSSRUnsafeAttr(attrName) || (openingElement += " " + ("" === value ? attrName : attrName + '="' + escapeAttr(attrValue) + '"')));
            }
        }
        for (const prop in props) {
            let value = props[prop];
            if ("ref" === prop) {
                void 0 !== value && (setRef(value, elm), hasRef = !0);
                continue;
            }
            if (isOnProp(prop)) {
                setEvent(elCtx.li, prop, value, void 0);
                continue;
            }
            const attrName = processPropKey(prop);
            if (isSignal(value) && (value = trackSignal(value, [ 2, hostCtx.$element$, value, elm, attrName ]), useSignal = !0), 
            prop === dangerouslySetInnerHTML) {
                htmlStr = value;
                continue;
            }
            prop.startsWith(PREVENT_DEFAULT) && registerQwikEvent$1(prop.slice(15), rCtx.$static$.$containerState$);
            const attrValue = processPropValue(attrName, value);
            null != attrValue && ("class" === attrName ? classStr = attrValue : "value" === attrName && "textarea" === tagName ? htmlStr = escapeHtml(attrValue) : isSSRUnsafeAttr(attrName) || (openingElement += " " + ("" === value ? attrName : attrName + '="' + escapeAttr(attrValue) + '"')));
        }
        const listeners = elCtx.li;
        if (hostCtx) {
            if (hostCtx.$scopeIds$?.length) {
                const extra = hostCtx.$scopeIds$.join(" ");
                classStr = classStr ? `${extra} ${classStr}` : extra;
            }
            hostCtx.$flags$ & HOST_FLAG_NEED_ATTACH_LISTENER && (listeners.push(...hostCtx.li), 
            hostCtx.$flags$ &= ~HOST_FLAG_NEED_ATTACH_LISTENER);
        }
        if (isHead && (flags |= 1), tagName in invisibleElements && (flags |= 16), tagName in textOnlyElements && (flags |= 8), 
        classStr && (openingElement += ' class="' + escapeAttr(classStr) + '"'), listeners.length > 0) {
            const groups = groupListeners(listeners);
            const isInvisible = 0 != (16 & flags);
            for (const listener of groups) {
                const eventName = isInvisible ? normalizeInvisibleEvents(listener[0]) : listener[0];
                openingElement += " " + eventName + '="' + serializeQRLs(listener[1], elCtx) + '"', 
                registerQwikEvent$1(eventName, rCtx.$static$.$containerState$);
            }
        }
        if (null != key && (openingElement += ' q:key="' + escapeAttr(key) + '"'), hasRef || useSignal || listeners.length > 0) {
            if (hasRef || useSignal || listenersNeedId(listeners)) {
                const newID = getNextIndex(rCtx);
                openingElement += ' q:id="' + newID + '"', elCtx.$id$ = newID;
            }
            ssrCtx.$static$.$contexts$.push(elCtx);
        }
        if (1 & flags && (openingElement += " q:head"), openingElement += ">", stream.write(openingElement), 
        tagName in emptyElements) {
            return;
        }
        if (null != htmlStr) {
            return stream.write(String(htmlStr)), void stream.write(`</${tagName}>`);
        }
        "html" === tagName ? flags |= 4 : flags &= -5, 2 & node.flags && (flags |= 1024);
        const promise = processData(node.children, rCtx, ssrCtx, stream, flags);
        return maybeThen(promise, (() => {
            if (isHead) {
                for (const node of ssrCtx.$static$.$headNodes$) {
                    renderNodeElementSync(node.type, node.props, stream);
                }
                ssrCtx.$static$.$headNodes$.length = 0;
            }
            if (beforeClose) {
                return maybeThen(beforeClose(stream), (() => {
                    stream.write(`</${tagName}>`);
                }));
            }
            stream.write(`</${tagName}>`);
        }));
    }
    if (tagName === Virtual) {
        const elCtx = createMockQContext(111);
        return elCtx.$parentCtx$ = rCtx.$slotCtx$ || rCtx.$cmpCtx$, hostCtx && 8 & hostCtx.$flags$ && addDynamicSlot(hostCtx, elCtx), 
        renderNodeVirtual(node, elCtx, void 0, rCtx, ssrCtx, stream, flags, beforeClose);
    }
    if (tagName === SSRRaw) {
        return void stream.write(node.props.data);
    }
    if (tagName === InternalSSRStream) {
        return renderGenerator(node, rCtx, ssrCtx, stream, flags);
    }
    const res = invoke(ssrCtx.$invocationContext$, tagName, node.props, node.key, node.flags, node.dev);
    return shouldWrapFunctional(res, node) ? renderNode(_jsxC(Virtual, {
        children: res
    }, 0, node.key), rCtx, ssrCtx, stream, flags, beforeClose) : processData(res, rCtx, ssrCtx, stream, flags, beforeClose);
};

const processData = (node, rCtx, ssrCtx, stream, flags, beforeClose) => {
    if (null != node && "boolean" != typeof node) {
        if (!isString(node) && "number" != typeof node) {
            if (isJSXNode(node)) {
                return renderNode(node, rCtx, ssrCtx, stream, flags, beforeClose);
            }
            if (isArray(node)) {
                return walkChildren(node, rCtx, ssrCtx, stream, flags);
            }
            if (isSignal(node)) {
                const insideText = 8 & flags;
                const hostEl = rCtx.$cmpCtx$?.$element$;
                let value;
                if (hostEl) {
                    if (!insideText) {
                        const id = getNextIndex(rCtx);
                        value = trackSignal(node, 1024 & flags ? [ 3, "#" + id, node, "#" + id ] : [ 4, hostEl, node, "#" + id ]);
                        const str = jsxToString(value);
                        return ssrCtx.$static$.$textNodes$.set(str, id), void stream.write(`\x3c!--t=${id}--\x3e${escapeHtml(str)}\x3c!----\x3e`);
                    }
                    value = invoke(ssrCtx.$invocationContext$, (() => node.value));
                }
                return void stream.write(escapeHtml(jsxToString(value)));
            }
            return isPromise(node) ? (stream.write(FLUSH_COMMENT), node.then((node => processData(node, rCtx, ssrCtx, stream, flags, beforeClose)))) : void logWarn();
        }
        stream.write(escapeHtml(String(node)));
    }
};

const walkChildren = (children, rCtx, ssrContext, stream, flags) => {
    if (null == children) {
        return;
    }
    if (!isArray(children)) {
        return processData(children, rCtx, ssrContext, stream, flags);
    }
    const len = children.length;
    if (1 === len) {
        return processData(children[0], rCtx, ssrContext, stream, flags);
    }
    if (0 === len) {
        return;
    }
    let currentIndex = 0;
    const buffers = [];
    return children.reduce(((prevPromise, child, index) => {
        const buffer = [];
        buffers.push(buffer);
        const rendered = processData(child, rCtx, ssrContext, prevPromise ? {
            write(chunk) {
                currentIndex === index ? stream.write(chunk) : buffer.push(chunk);
            }
        } : stream, flags);
        const next = () => {
            currentIndex++, buffers.length > currentIndex && buffers[currentIndex].forEach((chunk => stream.write(chunk)));
        };
        return isPromise(rendered) && prevPromise ? Promise.all([ rendered, prevPromise ]).then(next) : isPromise(rendered) ? rendered.then(next) : prevPromise ? prevPromise.then(next) : void currentIndex++;
    }), void 0);
};

const flatVirtualChildren = (children, ssrCtx) => {
    if (null == children) {
        return null;
    }
    const result = _flatVirtualChildren(children, ssrCtx);
    const nodes = isArray(result) ? result : [ result ];
    return 0 === nodes.length ? null : nodes;
};

const _flatVirtualChildren = (children, ssrCtx) => {
    if (null == children) {
        return null;
    }
    if (isArray(children)) {
        return children.flatMap((c => _flatVirtualChildren(c, ssrCtx)));
    }
    if (isJSXNode(children) && isFunction(children.type) && children.type !== SSRRaw && children.type !== InternalSSRStream && children.type !== Virtual) {
        const res = invoke(ssrCtx.$invocationContext$, children.type, children.props, children.key, children.flags);
        return flatVirtualChildren(res, ssrCtx);
    }
    return children;
};

const setComponentProps$1 = (rCtx, elCtx, expectProps) => {
    const keys = Object.keys(expectProps);
    const target = createPropsState();
    if (elCtx.$props$ = createProxy(target, rCtx.$static$.$containerState$), 0 === keys.length) {
        return;
    }
    const immutableMeta = target[_IMMUTABLE] = expectProps[_IMMUTABLE] ?? EMPTY_OBJ;
    for (const prop of keys) {
        "children" !== prop && prop !== QSlot && (isSignal(immutableMeta[prop]) ? target["$$" + prop] = immutableMeta[prop] : target[prop] = expectProps[prop]);
    }
};

const processPropKey = prop => "htmlFor" === prop ? "for" : prop;

const processPropValue = (prop, value) => "class" === prop ? serializeClass(value) : "style" === prop ? stringifyStyle(value) : isAriaAttribute(prop) || "draggable" === prop || "spellcheck" === prop ? null != value ? String(value) : value : !1 === value || null == value ? null : !0 === value ? "" : String(value);

const invisibleElements = {
    head: !0,
    style: !0,
    script: !0,
    link: !0,
    meta: !0
};

const textOnlyElements = {
    title: !0,
    style: !0,
    script: !0,
    noframes: !0,
    textarea: !0
};

const emptyElements = {
    area: !0,
    base: !0,
    basefont: !0,
    bgsound: !0,
    br: !0,
    col: !0,
    embed: !0,
    frame: !0,
    hr: !0,
    img: !0,
    input: !0,
    keygen: !0,
    link: !0,
    meta: !0,
    param: !0,
    source: !0,
    track: !0,
    wbr: !0
};

const ESCAPE_HTML = /[&<>]/g;

const ESCAPE_ATTRIBUTES = /[&"]/g;

const registerQwikEvent$1 = (prop, containerState) => {
    containerState.$events$.add(getEventName(prop));
};

const escapeHtml = s => s.replace(ESCAPE_HTML, (c => {
    switch (c) {
      case "&":
        return "&amp;";

      case "<":
        return "&lt;";

      case ">":
        return "&gt;";

      default:
        return "";
    }
}));

const escapeAttr = s => s.replace(ESCAPE_ATTRIBUTES, (c => {
    switch (c) {
      case "&":
        return "&amp;";

      case '"':
        return "&quot;";

      default:
        return "";
    }
}));

const unsafeAttrCharRE = /[>/="'\u0009\u000a\u000c\u0020]/;

const isSSRUnsafeAttr = name => unsafeAttrCharRE.test(name);

const listenersNeedId = listeners => listeners.some((l => l[1].$captureRef$ && l[1].$captureRef$.length > 0));

const addDynamicSlot = (hostCtx, elCtx) => {
    const dynamicSlots = hostCtx.$dynamicSlots$ || (hostCtx.$dynamicSlots$ = []);
    dynamicSlots.includes(elCtx) || dynamicSlots.push(elCtx);
};

const normalizeInvisibleEvents = eventName => "on:qvisible" === eventName ? "on-document:qinit" : eventName;

const _jsxQ = (type, mutableProps, immutableProps, children, flags, key) => {
    const processed = null == key ? null : String(key);
    const node = new JSXNodeImpl(type, mutableProps ?? EMPTY_OBJ, immutableProps, children, flags, processed);
    return node;
};

const _jsxC = (type, mutableProps, flags, key, dev) => {
    const processed = null == key ? null : String(key);
    const props = mutableProps ?? EMPTY_OBJ;
    if ("string" == typeof type && _IMMUTABLE in props) {
        const p = {};
        for (const [k, v] of Object.entries(props[_IMMUTABLE])) {
            p[k] = v === _IMMUTABLE ? props[k] : v;
        }
        return _jsxQ(type, null, p, props.children, flags, key);
    }
    const node = new JSXNodeImpl(type, props, null, props.children, flags, processed);
    return "string" == typeof type && mutableProps && delete mutableProps.children, 
    node;
};

const jsx = (type, props, key) => {
    const processed = null == key ? null : String(key);
    const children = untrack((() => {
        const c = props.children;
        return "string" == typeof type && delete props.children, c;
    }));
    isString(type) && "className" in props && (props.class = props.className, delete props.className);
    const node = new JSXNodeImpl(type, props, null, children, 0, processed);
    return node;
};

const SKIP_RENDER_TYPE = ":skipRender";

class JSXNodeImpl {
    constructor(type, props, immutableProps, children, flags, key = null) {
        this.type = type, this.props = props, this.immutableProps = immutableProps, this.children = children, 
        this.flags = flags, this.key = key;
    }
}

const Virtual = props => props.children;

const isJSXNode = n => n instanceof JSXNodeImpl;

const Fragment = props => props.children;

const SVG_NS = "http://www.w3.org/2000/svg";

const IS_SVG = 1;

const IS_HEAD = 2;

const CHILDREN_PLACEHOLDER = [];

const smartUpdateChildren = (ctx, oldVnode, newVnode, flags) => {
    assertQwikElement(oldVnode.$elm$);
    const ch = newVnode.$children$;
    if (1 === ch.length && ch[0].$type$ === SKIP_RENDER_TYPE) {
        return void (newVnode.$children$ = oldVnode.$children$);
    }
    const elm = oldVnode.$elm$;
    let filter = isChildComponent;
    if (oldVnode.$children$ === CHILDREN_PLACEHOLDER) {
        "HEAD" === elm.nodeName && (filter = isHeadChildren, flags |= IS_HEAD);
    }
    const oldCh = getVnodeChildren(oldVnode, filter);
    return oldCh.length > 0 && ch.length > 0 ? diffChildren(ctx, elm, oldCh, ch, flags) : oldCh.length > 0 && 0 === ch.length ? removeChildren(ctx.$static$, oldCh, 0, oldCh.length - 1) : ch.length > 0 ? addChildren(ctx, elm, null, ch, 0, ch.length - 1, flags) : void 0;
};

const getVnodeChildren = (oldVnode, filter) => {
    const oldCh = oldVnode.$children$;
    return oldCh === CHILDREN_PLACEHOLDER ? oldVnode.$children$ = getChildrenVnodes(oldVnode.$elm$, filter) : oldCh;
};

const diffChildren = (ctx, parentElm, oldCh, newCh, flags) => {
    let oldStartIdx = 0;
    let newStartIdx = 0;
    let oldEndIdx = oldCh.length - 1;
    let oldStartVnode = oldCh[0];
    let oldEndVnode = oldCh[oldEndIdx];
    let newEndIdx = newCh.length - 1;
    let newStartVnode = newCh[0];
    let newEndVnode = newCh[newEndIdx];
    let oldKeyToIdx;
    let idxInOld;
    let elmToMove;
    const results = [];
    const staticCtx = ctx.$static$;
    for (;oldStartIdx <= oldEndIdx && newStartIdx <= newEndIdx; ) {
        if (null == oldStartVnode) {
            oldStartVnode = oldCh[++oldStartIdx];
        } else if (null == oldEndVnode) {
            oldEndVnode = oldCh[--oldEndIdx];
        } else if (null == newStartVnode) {
            newStartVnode = newCh[++newStartIdx];
        } else if (null == newEndVnode) {
            newEndVnode = newCh[--newEndIdx];
        } else if (oldStartVnode.$id$ === newStartVnode.$id$) {
            results.push(diffVnode(ctx, oldStartVnode, newStartVnode, flags)), oldStartVnode = oldCh[++oldStartIdx], 
            newStartVnode = newCh[++newStartIdx];
        } else if (oldEndVnode.$id$ === newEndVnode.$id$) {
            results.push(diffVnode(ctx, oldEndVnode, newEndVnode, flags)), oldEndVnode = oldCh[--oldEndIdx], 
            newEndVnode = newCh[--newEndIdx];
        } else if (oldStartVnode.$key$ && oldStartVnode.$id$ === newEndVnode.$id$) {
            assertDefined(oldStartVnode.$elm$), assertDefined(oldEndVnode.$elm$), 
            results.push(diffVnode(ctx, oldStartVnode, newEndVnode, flags)), insertAfter(staticCtx, parentElm, oldStartVnode.$elm$, oldEndVnode.$elm$), 
            oldStartVnode = oldCh[++oldStartIdx], newEndVnode = newCh[--newEndIdx];
        } else if (oldEndVnode.$key$ && oldEndVnode.$id$ === newStartVnode.$id$) {
            assertDefined(oldStartVnode.$elm$), assertDefined(oldEndVnode.$elm$), 
            results.push(diffVnode(ctx, oldEndVnode, newStartVnode, flags)), insertBefore(staticCtx, parentElm, oldEndVnode.$elm$, oldStartVnode.$elm$), 
            oldEndVnode = oldCh[--oldEndIdx], newStartVnode = newCh[++newStartIdx];
        } else {
            if (void 0 === oldKeyToIdx && (oldKeyToIdx = createKeyToOldIdx(oldCh, oldStartIdx, oldEndIdx)), 
            idxInOld = oldKeyToIdx[newStartVnode.$key$], void 0 === idxInOld) {
                const newElm = createElm(ctx, newStartVnode, flags, results);
                insertBefore(staticCtx, parentElm, newElm, oldStartVnode?.$elm$);
            } else if (elmToMove = oldCh[idxInOld], elmToMove.$type$ !== newStartVnode.$type$) {
                const newElm = createElm(ctx, newStartVnode, flags, results);
                maybeThen(newElm, (newElm => {
                    insertBefore(staticCtx, parentElm, newElm, oldStartVnode?.$elm$);
                }));
            } else {
                results.push(diffVnode(ctx, elmToMove, newStartVnode, flags)), oldCh[idxInOld] = void 0, 
                assertDefined(elmToMove.$elm$), insertBefore(staticCtx, parentElm, elmToMove.$elm$, oldStartVnode.$elm$);
            }
            newStartVnode = newCh[++newStartIdx];
        }
    }
    if (newStartIdx <= newEndIdx) {
        results.push(addChildren(ctx, parentElm, null == newCh[newEndIdx + 1] ? null : newCh[newEndIdx + 1].$elm$, newCh, newStartIdx, newEndIdx, flags));
    }
    let wait = promiseAll(results);
    return oldStartIdx <= oldEndIdx && (wait = maybeThen(wait, (() => {
        removeChildren(staticCtx, oldCh, oldStartIdx, oldEndIdx);
    }))), wait;
};

const getChildren = (elm, filter) => {
    const end = isVirtualElement(elm) ? elm.close : null;
    const nodes = [];
    let node = elm.firstChild;
    for (;(node = processVirtualNodes(node)) && (filter(node) && nodes.push(node), node = node.nextSibling, 
    node !== end); ) {}
    return nodes;
};

const getChildrenVnodes = (elm, filter) => getChildren(elm, filter).map(getVnodeFromEl);

const getVnodeFromEl = el => isElement$1(el) ? tryGetContext(el)?.$vdom$ ?? domToVnode(el) : domToVnode(el);

const domToVnode = node => {
    if (isQwikElement(node)) {
        const t = new ProcessedJSXNodeImpl(node.localName, {}, null, CHILDREN_PLACEHOLDER, 0, getKey(node));
        return t.$elm$ = node, t;
    }
    if (isText(node)) {
        const t = new ProcessedJSXNodeImpl(node.nodeName, EMPTY_OBJ, null, CHILDREN_PLACEHOLDER, 0, null);
        return t.$text$ = node.data, t.$elm$ = node, t;
    }
};

const isHeadChildren = node => {
    const type = node.nodeType;
    return 1 === type ? node.hasAttribute("q:head") : 111 === type;
};

const isSlotTemplate = node => "Q:TEMPLATE" === node.nodeName;

const isChildComponent = node => {
    const type = node.nodeType;
    if (3 === type || 111 === type) {
        return !0;
    }
    if (1 !== type) {
        return !1;
    }
    const nodeName = node.nodeName;
    return "Q:TEMPLATE" !== nodeName && ("HEAD" === nodeName ? node.hasAttribute("q:head") : "STYLE" !== nodeName || !node.hasAttribute(QStyle));
};

const splitChildren = input => {
    const output = {};
    for (const item of input) {
        const key = getSlotName(item);
        (output[key] ?? (output[key] = new ProcessedJSXNodeImpl(VIRTUAL, {
            "q:s": ""
        }, null, [], 0, key))).$children$.push(item);
    }
    return output;
};

const diffVnode = (rCtx, oldVnode, newVnode, flags) => {
    assertEqual(oldVnode.$type$, newVnode.$type$), 
    assertEqual(oldVnode.$key$, newVnode.$key$), 
    assertEqual(oldVnode.$id$, newVnode.$id$);
    const elm = oldVnode.$elm$;
    const tag = newVnode.$type$;
    const staticCtx = rCtx.$static$;
    const containerState = staticCtx.$containerState$;
    const currentComponent = rCtx.$cmpCtx$;
    if (newVnode.$elm$ = elm, "#text" === tag) {
        staticCtx.$visited$.push(elm);
        const signal = newVnode.$signal$;
        return signal && (newVnode.$text$ = jsxToString(trackSignal(signal, [ 4, currentComponent.$element$, signal, elm ]))), 
        void setProperty(staticCtx, elm, "data", newVnode.$text$);
    }
    const props = newVnode.$props$;
    const vnodeFlags = newVnode.$flags$;
    const elCtx = getContext(elm, containerState);
    if (tag !== VIRTUAL) {
        let isSvg = 0 != (flags & IS_SVG);
        if (isSvg || "svg" !== tag || (flags |= IS_SVG, isSvg = !0), props !== EMPTY_OBJ) {
            0 == (1 & vnodeFlags) && (elCtx.li.length = 0);
            const values = oldVnode.$props$;
            newVnode.$props$ = values;
            for (const prop in props) {
                let newValue = props[prop];
                if ("ref" !== prop) {
                    if (isOnProp(prop)) {
                        const normalized = setEvent(elCtx.li, prop, newValue, containerState.$containerEl$);
                        addQwikEvent(staticCtx, elm, normalized);
                    } else {
                        isSignal(newValue) && (newValue = trackSignal(newValue, [ 1, currentComponent.$element$, newValue, elm, prop ])), 
                        "class" === prop ? newValue = serializeClassWithHost(newValue, currentComponent) : "style" === prop && (newValue = stringifyStyle(newValue)), 
                        values[prop] !== newValue && (values[prop] = newValue, smartSetProperty(staticCtx, elm, prop, newValue, isSvg));
                    }
                } else {
                    void 0 !== newValue && setRef(newValue, elm);
                }
            }
        }
        if (2 & vnodeFlags) {
            return;
        }
        isSvg && "foreignObject" === tag && (flags &= ~IS_SVG);
        if (void 0 !== props[dangerouslySetInnerHTML]) {
            return void 0;
        }
        if ("textarea" === tag) {
            return;
        }
        return smartUpdateChildren(rCtx, oldVnode, newVnode, flags);
    }
    if ("q:renderFn" in props) {
        const cmpProps = props.props;
        setComponentProps(containerState, elCtx, cmpProps);
        let needsRender = !!(elCtx.$flags$ & HOST_FLAG_DIRTY);
        return needsRender || elCtx.$componentQrl$ || elCtx.$element$.hasAttribute("q:id") || (setQId(rCtx, elCtx), 
        elCtx.$componentQrl$ = cmpProps["q:renderFn"], assertQrl(elCtx.$componentQrl$), 
        needsRender = !0), needsRender ? maybeThen(renderComponent(rCtx, elCtx, flags), (() => renderContentProjection(rCtx, elCtx, newVnode, flags))) : renderContentProjection(rCtx, elCtx, newVnode, flags);
    }
    if ("q:s" in props) {
        return assertDefined(currentComponent.$slots$), 
        void currentComponent.$slots$.push(newVnode);
    }
    if (dangerouslySetInnerHTML in props) {
        setProperty(staticCtx, elm, "innerHTML", props[dangerouslySetInnerHTML]);
    } else if (!(2 & vnodeFlags)) {
        return smartUpdateChildren(rCtx, oldVnode, newVnode, flags);
    }
};

const renderContentProjection = (rCtx, hostCtx, vnode, flags) => {
    if (2 & vnode.$flags$) {
        return;
    }
    const staticCtx = rCtx.$static$;
    const splittedNewChildren = splitChildren(vnode.$children$);
    const slotMaps = getSlotMap(hostCtx);
    for (const key in slotMaps.slots) {
        if (!splittedNewChildren[key]) {
            const slotEl = slotMaps.slots[key];
            const oldCh = getChildrenVnodes(slotEl, isChildComponent);
            if (oldCh.length > 0) {
                const slotCtx = tryGetContext(slotEl);
                slotCtx && slotCtx.$vdom$ && (slotCtx.$vdom$.$children$ = []), removeChildren(staticCtx, oldCh, 0, oldCh.length - 1);
            }
        }
    }
    for (const key in slotMaps.templates) {
        const templateEl = slotMaps.templates[key];
        templateEl && !splittedNewChildren[key] && (slotMaps.templates[key] = void 0, removeNode(staticCtx, templateEl));
    }
    return promiseAll(Object.keys(splittedNewChildren).map((slotName => {
        const newVdom = splittedNewChildren[slotName];
        const slotCtx = getSlotCtx(staticCtx, slotMaps, hostCtx, slotName, rCtx.$static$.$containerState$);
        const oldVdom = getVdom(slotCtx);
        const slotRctx = pushRenderContext(rCtx);
        const slotEl = slotCtx.$element$;
        slotRctx.$slotCtx$ = slotCtx, slotCtx.$vdom$ = newVdom, newVdom.$elm$ = slotEl;
        let newFlags = flags & ~IS_SVG;
        slotEl.isSvg && (newFlags |= IS_SVG);
        const index = staticCtx.$addSlots$.findIndex((slot => slot[0] === slotEl));
        return index >= 0 && staticCtx.$addSlots$.splice(index, 1), smartUpdateChildren(slotRctx, oldVdom, newVdom, newFlags);
    })));
};

const addChildren = (ctx, parentElm, before, vnodes, startIdx, endIdx, flags) => {
    const promises = [];
    for (;startIdx <= endIdx; ++startIdx) {
        const ch = vnodes[startIdx];
        const elm = createElm(ctx, ch, flags, promises);
        insertBefore(ctx.$static$, parentElm, elm, before);
    }
    return promiseAllLazy(promises);
};

const removeChildren = (staticCtx, nodes, startIdx, endIdx) => {
    for (;startIdx <= endIdx; ++startIdx) {
        const ch = nodes[startIdx];
        ch && (assertDefined(ch.$elm$), removeNode(staticCtx, ch.$elm$));
    }
};

const getSlotCtx = (staticCtx, slotMaps, hostCtx, slotName, containerState) => {
    const slotEl = slotMaps.slots[slotName];
    if (slotEl) {
        return getContext(slotEl, containerState);
    }
    const templateEl = slotMaps.templates[slotName];
    if (templateEl) {
        return getContext(templateEl, containerState);
    }
    const template = createTemplate(staticCtx.$doc$, slotName);
    const elCtx = createContext(template);
    return elCtx.$parentCtx$ = hostCtx, prepend(staticCtx, hostCtx.$element$, template), 
    slotMaps.templates[slotName] = template, elCtx;
};

const getSlotName = node => node.$props$[QSlot] ?? "";

const createElm = (rCtx, vnode, flags, promises) => {
    const tag = vnode.$type$;
    const doc = rCtx.$static$.$doc$;
    const currentComponent = rCtx.$cmpCtx$;
    if ("#text" === tag) {
        const signal = vnode.$signal$;
        const elm = doc.createTextNode(vnode.$text$);
        if (signal) {
            elm.data = vnode.$text$ = jsxToString(trackSignal(signal, 4 & flags ? [ 3, elm, signal, elm ] : [ 4, currentComponent.$element$, signal, elm ]));
        }
        return vnode.$elm$ = elm;
    }
    let elm;
    let isSvg = !!(flags & IS_SVG);
    isSvg || "svg" !== tag || (flags |= IS_SVG, isSvg = !0);
    const isVirtual = tag === VIRTUAL;
    const props = vnode.$props$;
    const staticCtx = rCtx.$static$;
    const containerState = staticCtx.$containerState$;
    isVirtual ? elm = newVirtualElement(doc, isSvg) : "head" === tag ? (elm = doc.head, 
    flags |= IS_HEAD) : (elm = createElement(doc, tag, isSvg), flags &= ~IS_HEAD), 2 & vnode.$flags$ && (flags |= 4), 
    vnode.$elm$ = elm;
    const elCtx = createContext(elm);
    if (elCtx.$parentCtx$ = rCtx.$slotCtx$ ?? rCtx.$cmpCtx$, isVirtual) {
        if ("q:renderFn" in props) {
            const renderQRL = props["q:renderFn"];
            const target = createPropsState();
            const manager = containerState.$subsManager$.$createManager$();
            const proxy = new Proxy(target, new ReadWriteProxyHandler(containerState, manager));
            const expectProps = props.props;
            if (containerState.$proxyMap$.set(target, proxy), elCtx.$props$ = proxy, expectProps !== EMPTY_OBJ) {
                const immutableMeta = target[_IMMUTABLE] = expectProps[_IMMUTABLE] ?? EMPTY_OBJ;
                for (const prop in expectProps) {
                    if ("children" !== prop && prop !== QSlot) {
                        const immutableValue = immutableMeta[prop];
                        isSignal(immutableValue) ? target["$$" + prop] = immutableValue : target[prop] = expectProps[prop];
                    }
                }
            }
            setQId(rCtx, elCtx), elCtx.$componentQrl$ = renderQRL;
            const wait = maybeThen(renderComponent(rCtx, elCtx, flags), (() => {
                let children = vnode.$children$;
                if (0 === children.length) {
                    return;
                }
                1 === children.length && children[0].$type$ === SKIP_RENDER_TYPE && (children = children[0].$children$);
                const slotMap = getSlotMap(elCtx);
                const p = [];
                const splittedNewChildren = splitChildren(children);
                for (const slotName in splittedNewChildren) {
                    const newVnode = splittedNewChildren[slotName];
                    const slotCtx = getSlotCtx(staticCtx, slotMap, elCtx, slotName, staticCtx.$containerState$);
                    const slotRctx = pushRenderContext(rCtx);
                    const slotEl = slotCtx.$element$;
                    slotRctx.$slotCtx$ = slotCtx, slotCtx.$vdom$ = newVnode, newVnode.$elm$ = slotEl;
                    let newFlags = flags & ~IS_SVG;
                    slotEl.isSvg && (newFlags |= IS_SVG);
                    for (const node of newVnode.$children$) {
                        const nodeElm = createElm(slotRctx, node, newFlags, p);
                        assertDefined(node.$elm$), assertEqual(nodeElm, node.$elm$), 
                        appendChild(staticCtx, slotEl, nodeElm);
                    }
                }
                return promiseAllLazy(p);
            }));
            return isPromise(wait) && promises.push(wait), elm;
        }
        if ("q:s" in props) {
            assertDefined(currentComponent.$slots$), 
            setKey(elm, vnode.$key$), directSetAttribute(elm, "q:sref", currentComponent.$id$), 
            directSetAttribute(elm, "q:s", ""), currentComponent.$slots$.push(vnode), staticCtx.$addSlots$.push([ elm, currentComponent.$element$ ]);
        } else if (dangerouslySetInnerHTML in props) {
            return setProperty(staticCtx, elm, "innerHTML", props[dangerouslySetInnerHTML]), 
            elm;
        }
    } else {
        if (vnode.$immutableProps$ && setProperties(staticCtx, elCtx, currentComponent, vnode.$immutableProps$, isSvg, !0), 
        props !== EMPTY_OBJ && (elCtx.$vdom$ = vnode, vnode.$props$ = setProperties(staticCtx, elCtx, currentComponent, props, isSvg, !1)), 
        isSvg && "foreignObject" === tag && (isSvg = !1, flags &= ~IS_SVG), currentComponent) {
            const scopedIds = currentComponent.$scopeIds$;
            scopedIds && scopedIds.forEach((styleId => {
                elm.classList.add(styleId);
            })), currentComponent.$flags$ & HOST_FLAG_NEED_ATTACH_LISTENER && (elCtx.li.push(...currentComponent.li), 
            currentComponent.$flags$ &= ~HOST_FLAG_NEED_ATTACH_LISTENER);
        }
        for (const listener of elCtx.li) {
            addQwikEvent(staticCtx, elm, listener[0]);
        }
        if (void 0 !== props[dangerouslySetInnerHTML]) {
            return elm;
        }
        isSvg && "foreignObject" === tag && (isSvg = !1, flags &= ~IS_SVG);
    }
    let children = vnode.$children$;
    if (0 === children.length) {
        return elm;
    }
    1 === children.length && children[0].$type$ === SKIP_RENDER_TYPE && (children = children[0].$children$);
    const nodes = children.map((ch => createElm(rCtx, ch, flags, promises)));
    for (const node of nodes) {
        directAppendChild(elm, node);
    }
    return elm;
};

const getSlots = elCtx => {
    const slots = elCtx.$slots$;
    if (!slots) {
        return assertDefined(elCtx.$element$.parentElement), 
        elCtx.$slots$ = readDOMSlots(elCtx);
    }
    return slots;
};

const getSlotMap = elCtx => {
    const slotsArray = getSlots(elCtx);
    const slots = {};
    const templates = {};
    const t = Array.from(elCtx.$element$.childNodes).filter(isSlotTemplate);
    for (const vnode of slotsArray) {
        assertQwikElement(vnode.$elm$), slots[vnode.$key$ ?? ""] = vnode.$elm$;
    }
    for (const elm of t) {
        templates[directGetAttribute(elm, QSlot) ?? ""] = elm;
    }
    return {
        slots,
        templates
    };
};

const readDOMSlots = elCtx => {
    const parent = elCtx.$element$.parentElement;
    return queryAllVirtualByAttribute(parent, "q:sref", elCtx.$id$).map(domToVnode);
};

const handleStyle = (ctx, elm, newValue) => (setProperty(ctx, elm.style, "cssText", newValue), 
!0);

const handleClass = (ctx, elm, newValue) => (elm.namespaceURI === SVG_NS ? setAttribute(ctx, elm, "class", newValue) : setProperty(ctx, elm, "className", newValue), 
!0);

const checkBeforeAssign = (ctx, elm, newValue, prop) => (prop in elm && elm[prop] !== newValue && ("SELECT" === elm.tagName ? setPropertyPost(ctx, elm, prop, newValue) : setProperty(ctx, elm, prop, newValue)), 
!0);

const forceAttribute = (ctx, elm, newValue, prop) => (setAttribute(ctx, elm, prop.toLowerCase(), newValue), 
!0);

const setInnerHTML = (ctx, elm, newValue) => (setProperty(ctx, elm, "innerHTML", newValue), 
!0);

const noop = () => !0;

const PROP_HANDLER_MAP = {
    style: handleStyle,
    class: handleClass,
    value: checkBeforeAssign,
    checked: checkBeforeAssign,
    href: forceAttribute,
    list: forceAttribute,
    form: forceAttribute,
    tabIndex: forceAttribute,
    download: forceAttribute,
    innerHTML: noop,
    [dangerouslySetInnerHTML]: setInnerHTML
};

const smartSetProperty = (staticCtx, elm, prop, newValue, isSvg) => {
    if (isAriaAttribute(prop)) {
        return void setAttribute(staticCtx, elm, prop, null != newValue ? String(newValue) : newValue);
    }
    const exception = PROP_HANDLER_MAP[prop];
    exception && exception(staticCtx, elm, newValue, prop) || (isSvg || !(prop in elm) ? (prop.startsWith(PREVENT_DEFAULT) && registerQwikEvent(prop.slice(15)), 
    setAttribute(staticCtx, elm, prop, newValue)) : setProperty(staticCtx, elm, prop, newValue));
};

const setProperties = (staticCtx, elCtx, hostCtx, newProps, isSvg, immutable) => {
    const values = {};
    const elm = elCtx.$element$;
    for (const prop in newProps) {
        let newValue = newProps[prop];
        if ("ref" !== prop) {
            if (isOnProp(prop)) {
                setEvent(elCtx.li, prop, newValue, staticCtx.$containerState$.$containerEl$);
            } else {
                if (isSignal(newValue) && (newValue = trackSignal(newValue, immutable ? [ 1, elm, newValue, hostCtx.$element$, prop ] : [ 2, hostCtx.$element$, newValue, elm, prop ])), 
                "class" === prop) {
                    if (newValue = serializeClassWithHost(newValue, hostCtx), !newValue) {
                        continue;
                    }
                } else {
                    "style" === prop && (newValue = stringifyStyle(newValue));
                }
                values[prop] = newValue, smartSetProperty(staticCtx, elm, prop, newValue, isSvg);
            }
        } else {
            void 0 !== newValue && setRef(newValue, elm);
        }
    }
    return values;
};

const setComponentProps = (containerState, elCtx, expectProps) => {
    let props = elCtx.$props$;
    if (props || (elCtx.$props$ = props = createProxy(createPropsState(), containerState)), 
    expectProps === EMPTY_OBJ) {
        return;
    }
    const manager = getSubscriptionManager(props);
    const target = getProxyTarget(props);
    const immutableMeta = target[_IMMUTABLE] = expectProps[_IMMUTABLE] ?? EMPTY_OBJ;
    for (const prop in expectProps) {
        if ("children" !== prop && prop !== QSlot && !immutableMeta[prop]) {
            const value = expectProps[prop];
            target[prop] !== value && (target[prop] = value, manager.$notifySubs$(prop));
        }
    }
};

const cleanupTree = (elm, staticCtx, subsManager, stopSlots) => {
    if (subsManager.$clearSub$(elm), isQwikElement(elm)) {
        if (stopSlots && elm.hasAttribute("q:s")) {
            return void staticCtx.$rmSlots$.push(elm);
        }
        const ctx = tryGetContext(elm);
        ctx && cleanupContext(ctx, subsManager);
        const end = isVirtualElement(elm) ? elm.close : null;
        let node = elm.firstChild;
        for (;(node = processVirtualNodes(node)) && (cleanupTree(node, staticCtx, subsManager, !0), 
        node = node.nextSibling, node !== end); ) {}
    }
};

const executeContextWithScrollAndTransition = async ctx => {
    (executeDOMRender(ctx), isBrowser );
};

const directAppendChild = (parent, child) => {
    isVirtualElement(child) ? child.appendTo(parent) : parent.appendChild(child);
};

const directRemoveChild = (parent, child) => {
    isVirtualElement(child) ? child.remove() : parent.removeChild(child);
};

const directInsertAfter = (parent, child, ref) => {
    isVirtualElement(child) ? child.insertBeforeTo(parent, ref?.nextSibling ?? null) : parent.insertBefore(child, ref?.nextSibling ?? null);
};

const directInsertBefore = (parent, child, ref) => {
    isVirtualElement(child) ? child.insertBeforeTo(parent, getRootNode(ref)) : parent.insertBefore(child, getRootNode(ref));
};

const createKeyToOldIdx = (children, beginIdx, endIdx) => {
    const map = {};
    for (let i = beginIdx; i <= endIdx; ++i) {
        const key = children[i].$key$;
        null != key && (map[key] = i);
    }
    return map;
};

const addQwikEvent = (staticCtx, elm, prop) => {
    prop.startsWith("on:") || setAttribute(staticCtx, elm, prop, ""), registerQwikEvent(prop);
};

const registerQwikEvent = prop => {
    var _a;
    {
        const eventName = getEventName(prop);
        try {
            ((_a = globalThis).qwikevents || (_a.qwikevents = [])).push(eventName);
        } catch (err) {
        }
    }
};

const setAttribute = (staticCtx, el, prop, value) => {
    staticCtx.$operations$.push({
        $operation$: _setAttribute,
        $args$: [ el, prop, value ]
    });
};

const _setAttribute = (el, prop, value) => {
    if (null == value || !1 === value) {
        el.removeAttribute(prop);
    } else {
        const str = !0 === value ? "" : String(value);
        directSetAttribute(el, prop, str);
    }
};

const setProperty = (staticCtx, node, key, value) => {
    staticCtx.$operations$.push({
        $operation$: _setProperty,
        $args$: [ node, key, value ]
    });
};

const setPropertyPost = (staticCtx, node, key, value) => {
    staticCtx.$postOperations$.push({
        $operation$: _setProperty,
        $args$: [ node, key, value ]
    });
};

const _setProperty = (node, key, value) => {
    try {
        node[key] = null == value ? "" : value, null == value && isNode$1(node) && isElement$1(node) && node.removeAttribute(key);
    } catch (err) {
        logError(codeToText(6), {
            node,
            key,
            value
        }, err);
    }
};

const createElement = (doc, expectTag, isSvg) => isSvg ? doc.createElementNS(SVG_NS, expectTag) : doc.createElement(expectTag);

const insertBefore = (staticCtx, parent, newChild, refChild) => (staticCtx.$operations$.push({
    $operation$: directInsertBefore,
    $args$: [ parent, newChild, refChild || null ]
}), newChild);

const insertAfter = (staticCtx, parent, newChild, refChild) => (staticCtx.$operations$.push({
    $operation$: directInsertAfter,
    $args$: [ parent, newChild, refChild || null ]
}), newChild);

const appendChild = (staticCtx, parent, newChild) => (staticCtx.$operations$.push({
    $operation$: directAppendChild,
    $args$: [ parent, newChild ]
}), newChild);

const appendHeadStyle = (staticCtx, styleTask) => {
    staticCtx.$containerState$.$styleIds$.add(styleTask.styleId), staticCtx.$postOperations$.push({
        $operation$: _appendHeadStyle,
        $args$: [ staticCtx.$containerState$, styleTask ]
    });
};

const _appendHeadStyle = (containerState, styleTask) => {
    const containerEl = containerState.$containerEl$;
    const doc = getDocument(containerEl);
    const isDoc = doc.documentElement === containerEl;
    const headEl = doc.head;
    const style = doc.createElement("style");
    directSetAttribute(style, QStyle, styleTask.styleId), 
    directSetAttribute(style, "hidden", ""), style.textContent = styleTask.content, 
    isDoc && headEl ? directAppendChild(headEl, style) : directInsertBefore(containerEl, style, containerEl.firstChild);
};

const prepend = (staticCtx, parent, newChild) => {
    staticCtx.$operations$.push({
        $operation$: directPrepend,
        $args$: [ parent, newChild ]
    });
};

const directPrepend = (parent, newChild) => {
    directInsertBefore(parent, newChild, parent.firstChild);
};

const removeNode = (staticCtx, el) => {
    if (isQwikElement(el)) {
        cleanupTree(el, staticCtx, staticCtx.$containerState$.$subsManager$, !0);
    }
    staticCtx.$operations$.push({
        $operation$: _removeNode,
        $args$: [ el, staticCtx ]
    });
};

const _removeNode = el => {
    const parent = el.parentElement;
    parent && directRemoveChild(parent, el);
};

const createTemplate = (doc, slotName) => {
    const template = createElement(doc, "q:template", !1);
    return directSetAttribute(template, QSlot, slotName), directSetAttribute(template, "hidden", ""), 
    directSetAttribute(template, "aria-hidden", "true"), template;
};

const executeDOMRender = staticCtx => {
    for (const op of staticCtx.$operations$) {
        op.$operation$.apply(void 0, op.$args$);
    }
    resolveSlotProjection(staticCtx);
};

const getKey = el => directGetAttribute(el, "q:key");

const setKey = (el, key) => {
    null !== key && directSetAttribute(el, "q:key", key);
};

const resolveSlotProjection = staticCtx => {
    const subsManager = staticCtx.$containerState$.$subsManager$;
    for (const slotEl of staticCtx.$rmSlots$) {
        const key = getKey(slotEl);
        const slotChildren = getChildren(slotEl, isChildComponent);
        if (slotChildren.length > 0) {
            const sref = slotEl.getAttribute("q:sref");
            const hostCtx = staticCtx.$roots$.find((r => r.$id$ === sref));
            if (hostCtx) {
                const hostElm = hostCtx.$element$;
                if (hostElm.isConnected) {
                    if (getChildren(hostElm, isSlotTemplate).some((node => directGetAttribute(node, QSlot) === key))) {
                        cleanupTree(slotEl, staticCtx, subsManager, !1);
                    } else {
                        const template = createTemplate(staticCtx.$doc$, key);
                        for (const child of slotChildren) {
                            directAppendChild(template, child);
                        }
                        directInsertBefore(hostElm, template, hostElm.firstChild);
                    }
                } else {
                    cleanupTree(slotEl, staticCtx, subsManager, !1);
                }
            } else {
                cleanupTree(slotEl, staticCtx, subsManager, !1);
            }
        }
    }
    for (const [slotEl, hostElm] of staticCtx.$addSlots$) {
        const key = getKey(slotEl);
        const template = getChildren(hostElm, isSlotTemplate).find((node => node.getAttribute(QSlot) === key));
        template && (getChildren(template, isChildComponent).forEach((child => {
            directAppendChild(slotEl, child);
        })), template.remove());
    }
};

const printRenderStats = () => {
};

const newVirtualElement = (doc, isSvg) => {
    const open = doc.createComment("qv ");
    const close = doc.createComment("/qv");
    return new VirtualElementImpl(open, close, isSvg);
};

const parseVirtualAttributes = str => {
    if (!str) {
        return {};
    }
    const attributes = str.split(" ");
    return Object.fromEntries(attributes.map((attr => {
        const index = attr.indexOf("=");
        return index >= 0 ? [ attr.slice(0, index), unescape(attr.slice(index + 1)) ] : [ attr, "" ];
    })));
};

const serializeVirtualAttributes = map => {
    const attributes = [];
    return Object.entries(map).forEach((([key, value]) => {
        attributes.push(value ? `${key}=${escape(value)}` : `${key}`);
    })), attributes.join(" ");
};

const walkerVirtualByAttribute = (el, prop, value) => el.ownerDocument.createTreeWalker(el, 128, {
    acceptNode(c) {
        const virtual = getVirtualElement(c);
        return virtual && directGetAttribute(virtual, prop) === value ? 1 : 2;
    }
});

const queryAllVirtualByAttribute = (el, prop, value) => {
    const walker = walkerVirtualByAttribute(el, prop, value);
    const pars = [];
    let currentNode = null;
    for (;currentNode = walker.nextNode(); ) {
        pars.push(getVirtualElement(currentNode));
    }
    return pars;
};

const escape = s => s.replace(/ /g, "+");

const unescape = s => s.replace(/\+/g, " ");

const VIRTUAL = ":virtual";

class VirtualElementImpl {
    constructor(open, close, isSvg) {
        this.open = open, this.close = close, this.isSvg = isSvg, this._qc_ = null, this.nodeType = 111, 
        this.localName = VIRTUAL, this.nodeName = VIRTUAL;
        const doc = this.ownerDocument = open.ownerDocument;
        this.$template$ = createElement(doc, "template", !1), this.$attributes$ = parseVirtualAttributes(open.data.slice(3)), 
        assertTrue(open.data.startsWith("qv ")), open.__virtual = this, 
        close.__virtual = this;
    }
    insertBefore(node, ref) {
        const parent = this.parentElement;
        if (parent) {
            parent.insertBefore(node, ref || this.close);
        } else {
            this.$template$.insertBefore(node, ref);
        }
        return node;
    }
    remove() {
        const parent = this.parentElement;
        if (parent) {
            const ch = this.childNodes;
            assertEqual(this.$template$.childElementCount), parent.removeChild(this.open);
            for (let i = 0; i < ch.length; i++) {
                this.$template$.appendChild(ch[i]);
            }
            parent.removeChild(this.close);
        }
    }
    appendChild(node) {
        return this.insertBefore(node, null);
    }
    insertBeforeTo(newParent, child) {
        const ch = this.childNodes;
        newParent.insertBefore(this.open, child);
        for (const c of ch) {
            newParent.insertBefore(c, child);
        }
        newParent.insertBefore(this.close, child), assertEqual(this.$template$.childElementCount);
    }
    appendTo(newParent) {
        this.insertBeforeTo(newParent, null);
    }
    get namespaceURI() {
        return this.parentElement?.namespaceURI ?? "";
    }
    removeChild(child) {
        this.parentElement ? this.parentElement.removeChild(child) : this.$template$.removeChild(child);
    }
    getAttribute(prop) {
        return this.$attributes$[prop] ?? null;
    }
    hasAttribute(prop) {
        return prop in this.$attributes$;
    }
    setAttribute(prop, value) {
        this.$attributes$[prop] = value, this.open.data = updateComment(this.$attributes$);
    }
    removeAttribute(prop) {
        delete this.$attributes$[prop], this.open.data = updateComment(this.$attributes$);
    }
    matches(_) {
        return !1;
    }
    compareDocumentPosition(other) {
        return this.open.compareDocumentPosition(other);
    }
    closest(query) {
        const parent = this.parentElement;
        return parent ? parent.closest(query) : null;
    }
    querySelectorAll(query) {
        const result = [];
        return getChildren(this, isNodeElement).forEach((el => {
            isQwikElement(el) && (el.matches(query) && result.push(el), result.concat(Array.from(el.querySelectorAll(query))));
        })), result;
    }
    querySelector(query) {
        for (const el of this.childNodes) {
            if (isElement$1(el)) {
                if (el.matches(query)) {
                    return el;
                }
                const v = el.querySelector(query);
                if (null !== v) {
                    return v;
                }
            }
        }
        return null;
    }
    get innerHTML() {
        return "";
    }
    set innerHTML(html) {
        const parent = this.parentElement;
        parent ? (this.childNodes.forEach((a => this.removeChild(a))), this.$template$.innerHTML = html, 
        parent.insertBefore(this.$template$.content, this.close)) : this.$template$.innerHTML = html;
    }
    get firstChild() {
        if (this.parentElement) {
            const first = this.open.nextSibling;
            return first === this.close ? null : first;
        }
        return this.$template$.firstChild;
    }
    get nextSibling() {
        return this.close.nextSibling;
    }
    get previousSibling() {
        return this.open.previousSibling;
    }
    get childNodes() {
        if (!this.parentElement) {
            return Array.from(this.$template$.childNodes);
        }
        const nodes = [];
        let node = this.open;
        for (;(node = node.nextSibling) && node !== this.close; ) {
            nodes.push(node);
        }
        return nodes;
    }
    get isConnected() {
        return this.open.isConnected;
    }
    get parentElement() {
        return this.open.parentElement;
    }
}

const updateComment = attributes => `qv ${serializeVirtualAttributes(attributes)}`;

const processVirtualNodes = node => {
    if (null == node) {
        return null;
    }
    if (isComment(node)) {
        const virtual = getVirtualElement(node);
        if (virtual) {
            return virtual;
        }
    }
    return node;
};

const findClose = open => {
    let node = open;
    let stack = 1;
    for (;node = node.nextSibling; ) {
        if (isComment(node)) {
            const virtual = node.__virtual;
            if (virtual) {
                node = virtual;
            } else if (node.data.startsWith("qv ")) {
                stack++;
            } else if ("/qv" === node.data && (stack--, 0 === stack)) {
                return node;
            }
        }
    }
};

const getVirtualElement = open => {
    const virtual = open.__virtual;
    if (virtual) {
        return virtual;
    }
    if (open.data.startsWith("qv ")) {
        const close = findClose(open);
        return new VirtualElementImpl(open, close, open.parentElement?.namespaceURI === SVG_NS);
    }
    return null;
};

const getRootNode = node => null == node ? null : isVirtualElement(node) ? node.open : node;

const pauseContainer = async (elmOrDoc, defaultParentJSON) => {
    const doc = getDocument(elmOrDoc);
    const documentElement = doc.documentElement;
    const containerEl = isDocument(elmOrDoc) ? documentElement : elmOrDoc;
    if ("paused" === directGetAttribute(containerEl, "q:container")) {
        throw qError(21);
    }
    const parentJSON = defaultParentJSON ?? (containerEl === doc.documentElement ? doc.body : containerEl);
    const containerState = _getContainerState(containerEl);
    const contexts = getNodesInScope(containerEl, hasContext);
    directSetAttribute(containerEl, "q:container", "paused");
    for (const elCtx of contexts) {
        const elm = elCtx.$element$;
        const listeners = elCtx.li;
        if (elCtx.$scopeIds$) {
            const value = serializeSStyle(elCtx.$scopeIds$);
            value && elm.setAttribute("q:sstyle", value);
        }
        if (elCtx.$id$ && elm.setAttribute("q:id", elCtx.$id$), isElement$1(elm) && listeners.length > 0) {
            const groups = groupListeners(listeners);
            for (const listener of groups) {
                elm.setAttribute(listener[0], serializeQRLs(listener[1], elCtx));
            }
        }
    }
    const data = await _pauseFromContexts(contexts, containerState, (el => isNode$1(el) && isText(el) ? getTextID(el, containerState) : null));
    const qwikJson = doc.createElement("script");
    directSetAttribute(qwikJson, "type", "qwik/json"), qwikJson.textContent = escapeText(JSON.stringify(data.state, void 0, void 0)), 
    parentJSON.appendChild(qwikJson);
    const extraListeners = Array.from(containerState.$events$, (s => JSON.stringify(s)));
    const eventsScript = doc.createElement("script");
    return eventsScript.textContent = `window.qwikevents||=[];window.qwikevents.push(${extraListeners.join(", ")})`, 
    parentJSON.appendChild(eventsScript), data;
};

const _pauseFromContexts = async (allContexts, containerState, fallbackGetObjId, textNodes) => {
    const collector = createCollector(containerState);
    textNodes?.forEach(((_, key) => {
        collector.$seen$.add(key);
    }));
    let hasListeners = !1;
    for (const ctx of allContexts) {
        if (ctx.$tasks$) {
            for (const task of ctx.$tasks$) {
                isResourceTask(task) && collector.$resources$.push(task.$state$), destroyTask(task);
            }
        }
    }
    for (const ctx of allContexts) {
        const el = ctx.$element$;
        const ctxListeners = ctx.li;
        for (const listener of ctxListeners) {
            if (isElement$1(el)) {
                const qrl = listener[1];
                const captured = qrl.$captureRef$;
                if (captured) {
                    for (const obj of captured) {
                        collectValue(obj, collector, !0);
                    }
                }
                collector.$qrls$.push(qrl), hasListeners = !0;
            }
        }
    }
    if (!hasListeners) {
        return {
            state: {
                refs: {},
                ctx: {},
                objs: [],
                subs: []
            },
            objs: [],
            funcs: [],
            qrls: [],
            resources: collector.$resources$,
            mode: "static"
        };
    }
    let promises;
    for (;(promises = collector.$promises$).length > 0; ) {
        collector.$promises$ = [], await Promise.all(promises);
    }
    const canRender = collector.$elements$.length > 0;
    if (canRender) {
        for (const elCtx of collector.$deferElements$) {
            collectElementData(elCtx, collector, elCtx.$element$);
        }
        for (const ctx of allContexts) {
            collectProps(ctx, collector);
        }
    }
    for (;(promises = collector.$promises$).length > 0; ) {
        collector.$promises$ = [], await Promise.all(promises);
    }
    const elementToIndex = new Map;
    const objs = Array.from(collector.$objSet$.keys());
    const objToId = new Map;
    const getObjId = obj => {
        let suffix = "";
        if (isPromise(obj)) {
            const promiseValue = getPromiseValue(obj);
            if (!promiseValue) {
                return null;
            }
            obj = promiseValue.value, suffix += promiseValue.resolved ? "~" : "_";
        }
        if (isObject(obj)) {
            const target = getProxyTarget(obj);
            if (target) {
                suffix += "!", obj = target;
            } else if (isQwikElement(obj)) {
                const elID = (el => {
                    let id = elementToIndex.get(el);
                    return void 0 === id && (id = getQId(el), id || console.warn("Missing ID", el), 
                    elementToIndex.set(el, id)), id;
                })(obj);
                return elID ? "#" + elID + suffix : null;
            }
        }
        const id = objToId.get(obj);
        if (id) {
            return id + suffix;
        }
        const textId = textNodes?.get(obj);
        return textId ? "*" + textId : fallbackGetObjId ? fallbackGetObjId(obj) : null;
    };
    const mustGetObjId = obj => {
        const key = getObjId(obj);
        if (null === key) {
            if (isQrl(obj)) {
                const id = intToStr(objToId.size);
                return objToId.set(obj, id), id;
            }
            throw qError(27, obj);
        }
        return key;
    };
    const subsMap = new Map;
    for (const obj of objs) {
        const subs = getManager(obj, containerState)?.$subs$;
        if (!subs) {
            continue;
        }
        const flags = getProxyFlags(obj) ?? 0;
        const converted = [];
        1 & flags && converted.push(flags);
        for (const sub of subs) {
            const host = sub[1];
            0 === sub[0] && isNode$1(host) && isVirtualElement(host) && !collector.$elements$.includes(tryGetContext(host)) || converted.push(sub);
        }
        converted.length > 0 && subsMap.set(obj, converted);
    }
    objs.sort(((a, b) => (subsMap.has(a) ? 0 : 1) - (subsMap.has(b) ? 0 : 1)));
    let count = 0;
    for (const obj of objs) {
        objToId.set(obj, intToStr(count)), count++;
    }
    if (collector.$noSerialize$.length > 0) {
        const undefinedID = objToId.get(void 0);
        for (const obj of collector.$noSerialize$) {
            objToId.set(obj, undefinedID);
        }
    }
    const subs = [];
    for (const obj of objs) {
        const value = subsMap.get(obj);
        if (null == value) {
            break;
        }
        subs.push(value.map((s => "number" == typeof s ? `_${s}` : serializeSubscription(s, getObjId))).filter(isNotNullable));
    }
    assertEqual(subs.length, subsMap.size);
    const convertedObjs = serializeObjects(objs, mustGetObjId, getObjId, collector, containerState);
    const meta = {};
    const refs = {};
    for (const ctx of allContexts) {
        const node = ctx.$element$;
        const elementID = ctx.$id$;
        const ref = ctx.$refMap$;
        const props = ctx.$props$;
        const contexts = ctx.$contexts$;
        const tasks = ctx.$tasks$;
        const renderQrl = ctx.$componentQrl$;
        const seq = ctx.$seq$;
        const metaValue = {};
        const elementCaptured = isVirtualElement(node) && collector.$elements$.includes(ctx);
        if (ref.length > 0) {
            const value = mapJoin(ref, mustGetObjId, " ");
            value && (refs[elementID] = value);
        } else if (canRender) {
            let add = !1;
            if (elementCaptured) {
                const propsId = getObjId(props);
                metaValue.h = mustGetObjId(renderQrl) + (propsId ? " " + propsId : ""), add = !0;
            } else {
                const propsId = getObjId(props);
                propsId && (metaValue.h = " " + propsId, add = !0);
            }
            if (tasks && tasks.length > 0) {
                const value = mapJoin(tasks, getObjId, " ");
                value && (metaValue.w = value, add = !0);
            }
            if (elementCaptured && seq && seq.length > 0) {
                const value = mapJoin(seq, mustGetObjId, " ");
                metaValue.s = value, add = !0;
            }
            if (contexts) {
                const serializedContexts = [];
                contexts.forEach(((value, key) => {
                    const id = getObjId(value);
                    id && serializedContexts.push(`${key}=${id}`);
                }));
                const value = serializedContexts.join(" ");
                value && (metaValue.c = value, add = !0);
            }
            add && (meta[elementID] = metaValue);
        }
    }
    return {
        state: {
            refs,
            ctx: meta,
            objs: convertedObjs,
            subs
        },
        objs,
        funcs: collector.$inlinedFunctions$,
        resources: collector.$resources$,
        qrls: collector.$qrls$,
        mode: canRender ? "render" : "listeners"
    };
};

const mapJoin = (objects, getObjectId, sep) => {
    let output = "";
    for (const obj of objects) {
        const id = getObjectId(obj);
        null !== id && ("" !== output && (output += sep), output += id);
    }
    return output;
};

const getNodesInScope = (parent, predicate) => {
    const results = [];
    const v = predicate(parent);
    void 0 !== v && results.push(v);
    const walker = parent.ownerDocument.createTreeWalker(parent, 129, {
        acceptNode(node) {
            if (isContainer(node)) {
                return 2;
            }
            const v = predicate(node);
            return void 0 !== v && results.push(v), 3;
        }
    });
    for (;walker.nextNode(); ) {}
    return results;
};

const collectProps = (elCtx, collector) => {
    const parentCtx = elCtx.$parentCtx$;
    const props = elCtx.$props$;
    if (parentCtx && props && !isEmptyObj(props) && collector.$elements$.includes(parentCtx)) {
        const subs = getSubscriptionManager(props)?.$subs$;
        const el = elCtx.$element$;
        if (subs) {
            for (const [type, host] of subs) {
                0 === type ? (host !== el && collectSubscriptions(getSubscriptionManager(props), collector, !1), 
                isNode$1(host) ? collectElement(host, collector) : collectValue(host, collector, !0)) : (collectValue(props, collector, !1), 
                collectSubscriptions(getSubscriptionManager(props), collector, !1));
            }
        }
    }
};

const createCollector = containerState => ({
    $containerState$: containerState,
    $seen$: new Set,
    $objSet$: new Set,
    $prefetch$: 0,
    $noSerialize$: [],
    $inlinedFunctions$: [],
    $resources$: [],
    $elements$: [],
    $qrls$: [],
    $deferElements$: [],
    $promises$: []
});

const collectDeferElement = (el, collector) => {
    const ctx = tryGetContext(el);
    collector.$elements$.includes(ctx) || (collector.$elements$.push(ctx), collector.$prefetch$++, 
    8 & ctx.$flags$ ? collectElementData(ctx, collector, !0) : collector.$deferElements$.push(ctx), 
    collector.$prefetch$--);
};

const collectElement = (el, collector) => {
    const ctx = tryGetContext(el);
    if (ctx) {
        if (collector.$elements$.includes(ctx)) {
            return;
        }
        collector.$elements$.push(ctx), collectElementData(ctx, collector, el);
    }
};

const collectElementData = (elCtx, collector, dynamicCtx) => {
    if (elCtx.$props$ && !isEmptyObj(elCtx.$props$) && (collectValue(elCtx.$props$, collector, dynamicCtx), 
    collectSubscriptions(getSubscriptionManager(elCtx.$props$), collector, dynamicCtx)), 
    elCtx.$componentQrl$ && collectValue(elCtx.$componentQrl$, collector, dynamicCtx), 
    elCtx.$seq$) {
        for (const obj of elCtx.$seq$) {
            collectValue(obj, collector, dynamicCtx);
        }
    }
    if (elCtx.$tasks$) {
        const map = collector.$containerState$.$subsManager$.$groupToManagers$;
        for (const obj of elCtx.$tasks$) {
            map.has(obj) && collectValue(obj, collector, dynamicCtx);
        }
    }
    if (!0 === dynamicCtx && (collectContext(elCtx, collector), elCtx.$dynamicSlots$)) {
        for (const slotCtx of elCtx.$dynamicSlots$) {
            collectContext(slotCtx, collector);
        }
    }
};

const collectContext = (elCtx, collector) => {
    for (;elCtx; ) {
        if (elCtx.$contexts$) {
            for (const obj of elCtx.$contexts$.values()) {
                collectValue(obj, collector, !0);
            }
        }
        elCtx = elCtx.$parentCtx$;
    }
};

const escapeText = str => str.replace(/<(\/?script)/g, "\\x3C$1");

const collectSubscriptions = (manager, collector, leaks) => {
    if (collector.$seen$.has(manager)) {
        return;
    }
    collector.$seen$.add(manager);
    const subs = manager.$subs$;
    for (const key of subs) {
        const type = key[0];
        if (type > 0 && collectValue(key[2], collector, leaks), !0 === leaks) {
            const host = key[1];
            isNode$1(host) && isVirtualElement(host) ? 0 === type && collectDeferElement(host, collector) : collectValue(host, collector, !0);
        }
    }
};

const PROMISE_VALUE = Symbol();

const resolvePromise = promise => promise.then((value => (promise[PROMISE_VALUE] = {
    resolved: !0,
    value
}, value)), (value => (promise[PROMISE_VALUE] = {
    resolved: !1,
    value
}, value)));

const getPromiseValue = promise => promise[PROMISE_VALUE];

const collectValue = (obj, collector, leaks) => {
    if (null !== obj) {
        const objType = typeof obj;
        switch (objType) {
          case "function":
          case "object":
            {
                const seen = collector.$seen$;
                if (seen.has(obj)) {
                    return;
                }
                if (seen.add(obj), fastSkipSerialize(obj)) {
                    return collector.$objSet$.add(void 0), void collector.$noSerialize$.push(obj);
                }
                const input = obj;
                const target = getProxyTarget(obj);
                if (target) {
                    const mutable = 0 == (2 & getProxyFlags(obj = target));
                    if (leaks && mutable && collectSubscriptions(getSubscriptionManager(input), collector, leaks), 
                    fastWeakSerialize(input)) {
                        return void collector.$objSet$.add(obj);
                    }
                }
                if (collectDeps(obj, collector, leaks)) {
                    return void collector.$objSet$.add(obj);
                }
                if (isPromise(obj)) {
                    return void collector.$promises$.push(resolvePromise(obj).then((value => {
                        collectValue(value, collector, leaks);
                    })));
                }
                if ("object" === objType) {
                    if (isNode$1(obj)) {
                        return;
                    }
                    if (isArray(obj)) {
                        for (let i = 0; i < obj.length; i++) {
                            collectValue(input[i], collector, leaks);
                        }
                    } else if (isSerializableObject(obj)) {
                        for (const key in obj) {
                            collectValue(input[key], collector, leaks);
                        }
                    }
                }
                break;
            }

          case "string":
            if (collector.$seen$.has(obj)) {
                return;
            }
        }
    }
    collector.$objSet$.add(obj);
};

const isContainer = el => isElement$1(el) && el.hasAttribute("q:container");

const hasContext = el => {
    const node = processVirtualNodes(el);
    if (isQwikElement(node)) {
        const ctx = tryGetContext(node);
        if (ctx && ctx.$id$) {
            return ctx;
        }
    }
};

const getManager = (obj, containerState) => {
    if (!isObject(obj)) {
        return;
    }
    if (obj instanceof SignalImpl) {
        return getSubscriptionManager(obj);
    }
    const proxy = containerState.$proxyMap$.get(obj);
    return proxy ? getSubscriptionManager(proxy) : void 0;
};

const getQId = el => {
    const ctx = tryGetContext(el);
    return ctx ? ctx.$id$ : null;
};

const getTextID = (node, containerState) => {
    const prev = node.previousSibling;
    if (prev && isComment(prev) && prev.data.startsWith("t=")) {
        return "#" + prev.data.slice(2);
    }
    const doc = node.ownerDocument;
    const id = intToStr(containerState.$elementIndex$++);
    const open = doc.createComment(`t=${id}`);
    const close = doc.createComment("");
    const parent = node.parentElement;
    return parent.insertBefore(open, node), parent.insertBefore(close, node.nextSibling), 
    "#" + id;
};

const isEmptyObj = obj => 0 === Object.keys(obj).length;

function serializeObjects(objs, mustGetObjId, getObjId, collector, containerState) {
    return objs.map((obj => {
        if (null === obj) {
            return null;
        }
        const typeObj = typeof obj;
        switch (typeObj) {
          case "undefined":
            return UNDEFINED_PREFIX;

          case "number":
            if (!Number.isFinite(obj)) {
                break;
            }
            return obj;

          case "string":
            if (obj.charCodeAt(0) < 32) {
                break;
            }
            return obj;

          case "boolean":
            return obj;
        }
        const value = serializeValue(obj, mustGetObjId, collector, containerState);
        if (void 0 !== value) {
            return value;
        }
        if ("object" === typeObj) {
            if (isArray(obj)) {
                return obj.map(mustGetObjId);
            }
            if (isSerializableObject(obj)) {
                const output = {};
                for (const key in obj) {
                    if (getObjId) {
                        const id = getObjId(obj[key]);
                        null !== id && (output[key] = id);
                    } else {
                        output[key] = mustGetObjId(obj[key]);
                    }
                }
                return output;
            }
        }
        throw qError(3, obj);
    }));
}

const inlinedQrl = (symbol, symbolName, lexicalScopeCapture = EMPTY_ARRAY) => createQRL(null, symbolName, symbol, null, null, lexicalScopeCapture, null);

const _noopQrl = (symbolName, lexicalScopeCapture = EMPTY_ARRAY) => createQRL(null, symbolName, null, null, null, lexicalScopeCapture, null);

const serializeQRL = (qrl, opts = {}) => {
    let symbol = qrl.$symbol$;
    let chunk = qrl.$chunk$;
    const refSymbol = qrl.$refSymbol$ ?? symbol;
    const platform = getPlatform();
    if (platform) {
        const result = platform.chunkForSymbol(refSymbol, chunk);
        result && (chunk = result[1], qrl.$refSymbol$ || (symbol = result[0]));
    }
    if (!chunk) {
        throw qError(31, qrl.$symbol$);
    }
    chunk.startsWith("./") && (chunk = chunk.slice(2));
    let output = `${chunk}#${symbol}`;
    const capture = qrl.$capture$;
    const captureRef = qrl.$captureRef$;
    return captureRef && captureRef.length ? opts.$getObjId$ ? output += `[${mapJoin(captureRef, opts.$getObjId$, " ")}]` : opts.$addRefMap$ && (output += `[${mapJoin(captureRef, opts.$addRefMap$, " ")}]`) : capture && capture.length > 0 && (output += `[${capture.join(" ")}]`), 
    output;
};

const serializeQRLs = (existingQRLs, elCtx) => {
    assertElement(elCtx.$element$);
    const opts = {
        $addRefMap$: obj => addToArray(elCtx.$refMap$, obj)
    };
    return mapJoin(existingQRLs, (qrl => serializeQRL(qrl, opts)), "\n");
};

const parseQRL = (qrl, containerEl) => {
    const endIdx = qrl.length;
    const hashIdx = indexOf(qrl, 0, "#");
    const captureIdx = indexOf(qrl, hashIdx, "[");
    const chunkEndIdx = Math.min(hashIdx, captureIdx);
    const chunk = qrl.substring(0, chunkEndIdx);
    const symbolStartIdx = hashIdx == endIdx ? hashIdx : hashIdx + 1;
    const symbol = symbolStartIdx == captureIdx ? "default" : qrl.substring(symbolStartIdx, captureIdx);
    const capture = captureIdx === endIdx ? EMPTY_ARRAY : qrl.substring(captureIdx + 1, endIdx - 1).split(" ");
    const iQrl = createQRL(chunk, symbol, null, null, capture, null, null);
    return containerEl && iQrl.$setContainer$(containerEl), iQrl;
};

const indexOf = (text, startIdx, char) => {
    const endIdx = text.length;
    const charIdx = text.indexOf(char, startIdx == endIdx ? 0 : startIdx);
    return -1 == charIdx ? endIdx : charIdx;
};

const addToArray = (array, obj) => {
    const index = array.indexOf(obj);
    return -1 === index ? (array.push(obj), String(array.length - 1)) : String(index);
};

const inflateQrl = (qrl, elCtx) => (assertDefined(qrl.$capture$), 
qrl.$captureRef$ = qrl.$capture$.map((idx => {
    const int = parseInt(idx, 10);
    const obj = elCtx.$refMap$[int];
    return assertTrue(elCtx.$refMap$.length > int), 
    obj;
})));

const _createResourceReturn = opts => ({
    __brand: "resource",
    value: void 0,
    loading: !isServerPlatform(),
    _resolved: void 0,
    _error: void 0,
    _state: "pending",
    _timeout: opts?.timeout ?? -1,
    _cache: 0
});

const isResourceReturn = obj => isObject(obj) && "resource" === obj.__brand;

const serializeResource = (resource, getObjId) => {
    const state = resource._state;
    return "resolved" === state ? `0 ${getObjId(resource._resolved)}` : "pending" === state ? "1" : `2 ${getObjId(resource._error)}`;
};

const parseResourceReturn = data => {
    const [first, id] = data.split(" ");
    const result = _createResourceReturn(void 0);
    return result.value = Promise.resolve(), "0" === first ? (result._state = "resolved", 
    result._resolved = id, result.loading = !1) : "1" === first ? (result._state = "pending", 
    result.value = new Promise((() => {})), result.loading = !0) : "2" === first && (result._state = "rejected", 
    result._error = id, result.loading = !1), result;
};

const Slot = props => _jsxC(Virtual, {
    "q:s": ""
}, 0, props.name ?? "");

const UNDEFINED_PREFIX = "";

function serializer(serializer) {
    return {
        $prefixCode$: serializer.$prefix$.charCodeAt(0),
        $prefixChar$: serializer.$prefix$,
        $test$: serializer.$test$,
        $serialize$: serializer.$serialize$,
        $prepare$: serializer.$prepare$,
        $fill$: serializer.$fill$,
        $collect$: serializer.$collect$,
        $subs$: serializer.$subs$
    };
}

const QRLSerializer = /*#__PURE__*/ serializer({
    $prefix$: "",
    $test$: v => isQrl(v),
    $collect$: (v, collector, leaks) => {
        if (v.$captureRef$) {
            for (const item of v.$captureRef$) {
                collectValue(item, collector, leaks);
            }
        }
        0 === collector.$prefetch$ && collector.$qrls$.push(v);
    },
    $serialize$: (obj, getObjId) => serializeQRL(obj, {
        $getObjId$: getObjId
    }),
    $prepare$: (data, containerState) => parseQRL(data, containerState.$containerEl$),
    $fill$: (qrl, getObject) => {
        qrl.$capture$ && qrl.$capture$.length > 0 && (qrl.$captureRef$ = qrl.$capture$.map(getObject), 
        qrl.$capture$ = null);
    }
});

const TaskSerializer = /*#__PURE__*/ serializer({
    $prefix$: "",
    $test$: v => isSubscriberDescriptor(v),
    $collect$: (v, collector, leaks) => {
        collectValue(v.$qrl$, collector, leaks), v.$state$ && (collectValue(v.$state$, collector, leaks), 
        !0 === leaks && v.$state$ instanceof SignalImpl && collectSubscriptions(v.$state$[QObjectManagerSymbol], collector, !0));
    },
    $serialize$: (obj, getObjId) => serializeTask(obj, getObjId),
    $prepare$: data => parseTask(data),
    $fill$: (task, getObject) => {
        task.$el$ = getObject(task.$el$), task.$qrl$ = getObject(task.$qrl$), task.$state$ && (task.$state$ = getObject(task.$state$));
    }
});

const ResourceSerializer = /*#__PURE__*/ serializer({
    $prefix$: "",
    $test$: v => isResourceReturn(v),
    $collect$: (obj, collector, leaks) => {
        collectValue(obj.value, collector, leaks), collectValue(obj._resolved, collector, leaks);
    },
    $serialize$: (obj, getObjId) => serializeResource(obj, getObjId),
    $prepare$: data => parseResourceReturn(data),
    $fill$: (resource, getObject) => {
        if ("resolved" === resource._state) {
            resource._resolved = getObject(resource._resolved), resource.value = Promise.resolve(resource._resolved);
        } else if ("rejected" === resource._state) {
            const p = Promise.reject(resource._error);
            p.catch((() => null)), resource._error = getObject(resource._error), resource.value = p;
        }
    }
});

const URLSerializer = /*#__PURE__*/ serializer({
    $prefix$: "",
    $test$: v => v instanceof URL,
    $serialize$: obj => obj.href,
    $prepare$: data => new URL(data),
    $fill$: void 0
});

const DateSerializer = /*#__PURE__*/ serializer({
    $prefix$: "",
    $test$: v => v instanceof Date,
    $serialize$: obj => obj.toISOString(),
    $prepare$: data => new Date(data),
    $fill$: void 0
});

const RegexSerializer = /*#__PURE__*/ serializer({
    $prefix$: "",
    $test$: v => v instanceof RegExp,
    $serialize$: obj => `${obj.flags} ${obj.source}`,
    $prepare$: data => {
        const space = data.indexOf(" ");
        const source = data.slice(space + 1);
        const flags = data.slice(0, space);
        return new RegExp(source, flags);
    },
    $fill$: void 0
});

const ErrorSerializer = /*#__PURE__*/ serializer({
    $prefix$: "",
    $test$: v => v instanceof Error,
    $serialize$: obj => obj.message,
    $prepare$: text => {
        const err = new Error(text);
        return err.stack = void 0, err;
    },
    $fill$: void 0
});

const DocumentSerializer = /*#__PURE__*/ serializer({
    $prefix$: "",
    $test$: v => isDocument(v),
    $serialize$: void 0,
    $prepare$: (_, _c, doc) => doc,
    $fill$: void 0
});

const SERIALIZABLE_STATE = Symbol("serializable-data");

const ComponentSerializer = /*#__PURE__*/ serializer({
    $prefix$: "",
    $test$: obj => isQwikComponent(obj),
    $serialize$: (obj, getObjId) => {
        const [qrl] = obj[SERIALIZABLE_STATE];
        return serializeQRL(qrl, {
            $getObjId$: getObjId
        });
    },
    $prepare$: (data, containerState) => {
        const qrl = parseQRL(data, containerState.$containerEl$);
        return componentQrl(qrl);
    },
    $fill$: (component, getObject) => {
        const [qrl] = component[SERIALIZABLE_STATE];
        qrl.$capture$ && qrl.$capture$.length > 0 && (qrl.$captureRef$ = qrl.$capture$.map(getObject), 
        qrl.$capture$ = null);
    }
});

const DerivedSignalSerializer = /*#__PURE__*/ serializer({
    $prefix$: "",
    $test$: obj => obj instanceof SignalDerived,
    $collect$: (obj, collector, leaks) => {
        if (obj.$args$) {
            for (const arg of obj.$args$) {
                collectValue(arg, collector, leaks);
            }
        }
    },
    $serialize$: (signal, getObjID, collector) => {
        const serialized = serializeDerivedSignalFunc(signal);
        let index = collector.$inlinedFunctions$.indexOf(serialized);
        return index < 0 && (collector.$inlinedFunctions$.push(serialized), index = collector.$inlinedFunctions$.length - 1), 
        mapJoin(signal.$args$, getObjID, " ") + " @" + intToStr(index);
    },
    $prepare$: data => {
        const ids = data.split(" ");
        const args = ids.slice(0, -1);
        const fn = ids[ids.length - 1];
        return new SignalDerived(fn, args, fn);
    },
    $fill$: (fn, getObject) => {
        assertString(fn.$func$), fn.$func$ = getObject(fn.$func$), 
        fn.$args$ = fn.$args$.map(getObject);
    }
});

const SignalSerializer = /*#__PURE__*/ serializer({
    $prefix$: "",
    $test$: v => v instanceof SignalImpl,
    $collect$: (obj, collector, leaks) => {
        collectValue(obj.untrackedValue, collector, leaks);
        return !0 === leaks && 0 == (1 & obj[QObjectSignalFlags]) && collectSubscriptions(obj[QObjectManagerSymbol], collector, !0), 
        obj;
    },
    $serialize$: (obj, getObjId) => getObjId(obj.untrackedValue),
    $prepare$: (data, containerState) => new SignalImpl(data, containerState?.$subsManager$?.$createManager$(), 0),
    $subs$: (signal, subs) => {
        signal[QObjectManagerSymbol].$addSubs$(subs);
    },
    $fill$: (signal, getObject) => {
        signal.untrackedValue = getObject(signal.untrackedValue);
    }
});

const SignalWrapperSerializer = /*#__PURE__*/ serializer({
    $prefix$: "",
    $test$: v => v instanceof SignalWrapper,
    $collect$(obj, collector, leaks) {
        if (collectValue(obj.ref, collector, leaks), fastWeakSerialize(obj.ref)) {
            const localManager = getSubscriptionManager(obj.ref);
            isTreeShakeable(collector.$containerState$.$subsManager$, localManager, leaks) && collectValue(obj.ref[obj.prop], collector, leaks);
        }
        return obj;
    },
    $serialize$: (obj, getObjId) => `${getObjId(obj.ref)} ${obj.prop}`,
    $prepare$: data => {
        const [id, prop] = data.split(" ");
        return new SignalWrapper(id, prop);
    },
    $fill$: (signal, getObject) => {
        signal.ref = getObject(signal.ref);
    }
});

const NoFiniteNumberSerializer = /*#__PURE__*/ serializer({
    $prefix$: "",
    $test$: v => "number" == typeof v,
    $serialize$: v => String(v),
    $prepare$: data => Number(data),
    $fill$: void 0
});

const URLSearchParamsSerializer = /*#__PURE__*/ serializer({
    $prefix$: "",
    $test$: v => v instanceof URLSearchParams,
    $serialize$: obj => obj.toString(),
    $prepare$: data => new URLSearchParams(data),
    $fill$: void 0
});

const FormDataSerializer = /*#__PURE__*/ serializer({
    $prefix$: "",
    $test$: v => "undefined" != typeof FormData && v instanceof globalThis.FormData,
    $serialize$: formData => {
        const array = [];
        return formData.forEach(((value, key) => {
            array.push("string" == typeof value ? [ key, value ] : [ key, value.name ]);
        })), JSON.stringify(array);
    },
    $prepare$: data => {
        const array = JSON.parse(data);
        const formData = new FormData;
        for (const [key, value] of array) {
            formData.append(key, value);
        }
        return formData;
    },
    $fill$: void 0
});

const JSXNodeSerializer = /*#__PURE__*/ serializer({
    $prefix$: "",
    $test$: v => isJSXNode(v),
    $collect$: (node, collector, leaks) => {
        collectValue(node.children, collector, leaks), collectValue(node.props, collector, leaks), 
        collectValue(node.immutableProps, collector, leaks);
        let type = node.type;
        type === Slot ? type = ":slot" : type === Fragment && (type = ":fragment"), collectValue(type, collector, leaks);
    },
    $serialize$: (node, getObjID) => {
        let type = node.type;
        return type === Slot ? type = ":slot" : type === Fragment && (type = ":fragment"), 
        `${getObjID(type)} ${getObjID(node.props)} ${getObjID(node.immutableProps)} ${getObjID(node.children)} ${node.flags}`;
    },
    $prepare$: data => {
        const [type, props, immutableProps, children, flags] = data.split(" ");
        return new JSXNodeImpl(type, props, immutableProps, children, parseInt(flags, 10));
    },
    $fill$: (node, getObject) => {
        node.type = getResolveJSXType(getObject(node.type)), node.props = getObject(node.props), 
        node.immutableProps = getObject(node.immutableProps), node.children = getObject(node.children);
    }
});

const BigIntSerializer = /*#__PURE__*/ serializer({
    $prefix$: "",
    $test$: v => "bigint" == typeof v,
    $serialize$: v => v.toString(),
    $prepare$: data => BigInt(data),
    $fill$: void 0
});

const DATA = Symbol();

const SetSerializer = /*#__PURE__*/ serializer({
    $prefix$: "",
    $test$: v => v instanceof Set,
    $collect$: (set, collector, leaks) => {
        set.forEach((value => collectValue(value, collector, leaks)));
    },
    $serialize$: (v, getObjID) => Array.from(v).map(getObjID).join(" "),
    $prepare$: data => {
        const set = new Set;
        return set[DATA] = data, set;
    },
    $fill$: (set, getObject) => {
        const data = set[DATA];
        set[DATA] = void 0;
        const items = 0 === data.length ? [] : data.split(" ");
        for (const id of items) {
            set.add(getObject(id));
        }
    }
});

const MapSerializer = /*#__PURE__*/ serializer({
    $prefix$: "",
    $test$: v => v instanceof Map,
    $collect$: (map, collector, leaks) => {
        map.forEach(((value, key) => {
            collectValue(value, collector, leaks), collectValue(key, collector, leaks);
        }));
    },
    $serialize$: (map, getObjID) => {
        const result = [];
        return map.forEach(((value, key) => {
            result.push(getObjID(key) + " " + getObjID(value));
        })), result.join(" ");
    },
    $prepare$: data => {
        const set = new Map;
        return set[DATA] = data, set;
    },
    $fill$: (set, getObject) => {
        const data = set[DATA];
        set[DATA] = void 0;
        const items = 0 === data.length ? [] : data.split(" ");
        assertTrue(items.length % 2 == 0);
        for (let i = 0; i < items.length; i += 2) {
            set.set(getObject(items[i]), getObject(items[i + 1]));
        }
    }
});

const StringSerializer = /*#__PURE__*/ serializer({
    $prefix$: "",
    $test$: v => !!getSerializer(v) || v === UNDEFINED_PREFIX,
    $serialize$: v => v,
    $prepare$: data => data,
    $fill$: void 0
});

const serializers = [ QRLSerializer, TaskSerializer, ResourceSerializer, URLSerializer, DateSerializer, RegexSerializer, ErrorSerializer, DocumentSerializer, ComponentSerializer, DerivedSignalSerializer, SignalSerializer, SignalWrapperSerializer, NoFiniteNumberSerializer, URLSearchParamsSerializer, FormDataSerializer, JSXNodeSerializer, BigIntSerializer, SetSerializer, MapSerializer, StringSerializer ];

const serializerByPrefix = /*#__PURE__*/ (() => {
    const serializerByPrefix = [];
    return serializers.forEach((s => {
        const prefix = s.$prefixCode$;
        for (;serializerByPrefix.length < prefix; ) {
            serializerByPrefix.push(void 0);
        }
        serializerByPrefix.push(s);
    })), serializerByPrefix;
})();

function getSerializer(obj) {
    if ("string" == typeof obj) {
        const prefix = obj.charCodeAt(0);
        if (prefix < serializerByPrefix.length) {
            return serializerByPrefix[prefix];
        }
    }
}

const collectorSerializers = /*#__PURE__*/ serializers.filter((a => a.$collect$));

const collectDeps = (obj, collector, leaks) => {
    for (const s of collectorSerializers) {
        if (s.$test$(obj)) {
            return s.$collect$(obj, collector, leaks), !0;
        }
    }
    return !1;
};

const serializeValue = (obj, getObjID, collector, containerState) => {
    for (const s of serializers) {
        if (s.$test$(obj)) {
            let value = s.$prefixChar$;
            return s.$serialize$ && (value += s.$serialize$(obj, getObjID, collector, containerState)), 
            value;
        }
    }
    if ("string" == typeof obj) {
        return obj;
    }
};

const createParser = (containerState, doc) => {
    const fillMap = new Map;
    const subsMap = new Map;
    return {
        prepare(data) {
            const serializer = getSerializer(data);
            if (serializer) {
                const value = serializer.$prepare$(data.slice(1), containerState, doc);
                return serializer.$fill$ && fillMap.set(value, serializer), serializer.$subs$ && subsMap.set(value, serializer), 
                value;
            }
            return data;
        },
        subs(obj, subs) {
            const serializer = subsMap.get(obj);
            return !!serializer && (serializer.$subs$(obj, subs, containerState), !0);
        },
        fill(obj, getObject) {
            const serializer = fillMap.get(obj);
            return !!serializer && (serializer.$fill$(obj, getObject, containerState), !0);
        }
    };
};

const OBJECT_TRANSFORMS = {
    "!": (obj, containerState) => containerState.$proxyMap$.get(obj) ?? getOrCreateProxy(obj, containerState),
    "~": obj => Promise.resolve(obj),
    _: obj => Promise.reject(obj)
};

const isTreeShakeable = (manager, target, leaks) => {
    if ("boolean" == typeof leaks) {
        return leaks;
    }
    const localManager = manager.$groupToManagers$.get(leaks);
    return !!(localManager && localManager.length > 0) && (1 !== localManager.length || localManager[0] !== target);
};

const getResolveJSXType = type => ":slot" === type ? Slot : ":fragment" === type ? Fragment : type;

const noSerializeSet = /*#__PURE__*/ new WeakSet;

const weakSerializeSet = /*#__PURE__*/ new WeakSet;

const fastSkipSerialize = obj => noSerializeSet.has(obj);

const fastWeakSerialize = obj => weakSerializeSet.has(obj);

const noSerialize = input => (null != input && noSerializeSet.add(input), input);

const unwrapProxy = proxy => isObject(proxy) ? getProxyTarget(proxy) ?? proxy : proxy;

const getProxyTarget = obj => obj[QOjectTargetSymbol];

const getSubscriptionManager = obj => obj[QObjectManagerSymbol];

const getProxyFlags = obj => obj[QObjectFlagsSymbol];

const serializeSubscription = (sub, getObjId) => {
    const type = sub[0];
    const host = "string" == typeof sub[1] ? sub[1] : getObjId(sub[1]);
    if (!host) {
        return;
    }
    let base = type + " " + host;
    let key;
    if (0 === type) {
        key = sub[2];
    } else {
        const signalID = getObjId(sub[2]);
        if (!signalID) {
            return;
        }
        if (type <= 2) {
            key = sub[5], base += ` ${signalID} ${must(getObjId(sub[3]))} ${sub[4]}`;
        } else if (type <= 4) {
            key = sub[4];
            base += ` ${signalID} ${"string" == typeof sub[3] ? sub[3] : must(getObjId(sub[3]))}`;
        } else ;
    }
    return key && (base += ` ${encodeURI(key)}`), base;
};

const parseSubscription = (sub, getObject) => {
    const parts = sub.split(" ");
    const type = parseInt(parts[0], 10);
    assertTrue(parts.length >= 2);
    const host = getObject(parts[1]);
    if (!host) {
        return;
    }
    if (isSubscriberDescriptor(host) && !host.$el$) {
        return;
    }
    const subscription = [ type, host ];
    return 0 === type ? (assertTrue(parts.length <= 3), subscription.push(safeDecode(parts[2]))) : type <= 2 ? (assertTrue(5 === parts.length || 6 === parts.length), 
    subscription.push(getObject(parts[2]), getObject(parts[3]), parts[4], safeDecode(parts[5]))) : type <= 4 && (assertTrue(4 === parts.length || 5 === parts.length), 
    subscription.push(getObject(parts[2]), getObject(parts[3]), safeDecode(parts[4]))), 
    subscription;
};

const safeDecode = str => {
    if (void 0 !== str) {
        return decodeURI(str);
    }
};

const createSubscriptionManager = containerState => {
    const groupToManagers = new Map;
    const manager = {
        $groupToManagers$: groupToManagers,
        $createManager$: initialMap => new LocalSubscriptionManager(groupToManagers, containerState, initialMap),
        $clearSub$: group => {
            const managers = groupToManagers.get(group);
            if (managers) {
                for (const manager of managers) {
                    manager.$unsubGroup$(group);
                }
                groupToManagers.delete(group), managers.length = 0;
            }
        },
        $clearSignal$: signal => {
            const managers = groupToManagers.get(signal[1]);
            if (managers) {
                for (const manager of managers) {
                    manager.$unsubEntry$(signal);
                }
            }
        }
    };
    return manager;
};

class LocalSubscriptionManager {
    constructor($groupToManagers$, $containerState$, initialMap) {
        this.$groupToManagers$ = $groupToManagers$, this.$containerState$ = $containerState$, 
        this.$subs$ = [], initialMap && this.$addSubs$(initialMap);
    }
    $addSubs$(subs) {
        this.$subs$.push(...subs);
        for (const sub of this.$subs$) {
            this.$addToGroup$(sub[1], this);
        }
    }
    $addToGroup$(group, manager) {
        let managers = this.$groupToManagers$.get(group);
        managers || this.$groupToManagers$.set(group, managers = []), managers.includes(manager) || managers.push(manager);
    }
    $unsubGroup$(group) {
        const subs = this.$subs$;
        for (let i = 0; i < subs.length; i++) {
            subs[i][1] === group && (subs.splice(i, 1), i--);
        }
    }
    $unsubEntry$(entry) {
        const [type, group, signal, elm] = entry;
        const subs = this.$subs$;
        if (1 === type || 2 === type) {
            const prop = entry[4];
            for (let i = 0; i < subs.length; i++) {
                const sub = subs[i];
                sub[0] === type && sub[1] === group && sub[2] === signal && sub[3] === elm && sub[4] === prop && (subs.splice(i, 1), 
                i--);
            }
        } else if (3 === type || 4 === type) {
            for (let i = 0; i < subs.length; i++) {
                const sub = subs[i];
                sub[0] === type && sub[1] === group && sub[2] === signal && sub[3] === elm && (subs.splice(i, 1), 
                i--);
            }
        }
    }
    $addSub$(sub, key) {
        const subs = this.$subs$;
        const group = sub[1];
        0 === sub[0] && subs.some((([_type, _group, _key]) => 0 === _type && _group === group && _key === key)) || (subs.push([ ...sub, key ]), 
        this.$addToGroup$(group, this));
    }
    $notifySubs$(key) {
        const subs = this.$subs$;
        for (const sub of subs) {
            const compare = sub[sub.length - 1];
            key && compare && compare !== key || notifyChange(sub, this.$containerState$);
        }
    }
}

const must = a => {
    if (null == a) {
        throw logError("must be non null", a);
    }
    return a;
};

const isQrl = value => "function" == typeof value && "function" == typeof value.getSymbol;

const createQRL = (chunk, symbol, symbolRef, symbolFn, capture, captureRef, refSymbol) => {
    let _containerEl;
    const qrl = async function(...args) {
        const fn = invokeFn.call(this, tryGetInvokeContext());
        return await fn(...args);
    };
    const setContainer = el => (_containerEl || (_containerEl = el), _containerEl);
    const resolve = async containerEl => {
        if (containerEl && setContainer(containerEl), null !== symbolRef) {
            return symbolRef;
        }
        if (null !== symbolFn) {
            return symbolRef = symbolFn().then((module => qrl.resolved = symbolRef = module[symbol]));
        }
        {
            const symbol2 = getPlatform().importSymbol(_containerEl, chunk, symbol);
            return symbolRef = maybeThen(symbol2, (ref => qrl.resolved = symbolRef = ref));
        }
    };
    const resolveLazy = containerEl => null !== symbolRef ? symbolRef : resolve(containerEl);
    function invokeFn(currentCtx, beforeFn) {
        return (...args) => {
            const start = now();
            const fn = resolveLazy();
            return maybeThen(fn, (fn => {
                if (isFunction(fn)) {
                    if (beforeFn && !1 === beforeFn()) {
                        return;
                    }
                    const context = {
                        ...createOrReuseInvocationContext(currentCtx),
                        $qrl$: qrl
                    };
                    return void 0 === context.$event$ && (context.$event$ = this), emitUsedSymbol(symbol, context.$element$, start), 
                    invoke.call(this, context, fn, ...args);
                }
                throw qError(10);
            }));
        };
    }
    const createOrReuseInvocationContext = invoke => null == invoke ? newInvokeContext() : isArray(invoke) ? newInvokeContextFromTuple(invoke) : invoke;
    const resolvedSymbol = refSymbol ?? symbol;
    const hash = getSymbolHash(resolvedSymbol);
    return Object.assign(qrl, {
        getSymbol: () => resolvedSymbol,
        getHash: () => hash,
        getCaptured: () => captureRef,
        resolve,
        $resolveLazy$: resolveLazy,
        $setContainer$: setContainer,
        $chunk$: chunk,
        $symbol$: symbol,
        $refSymbol$: refSymbol,
        $hash$: hash,
        getFn: invokeFn,
        $capture$: capture,
        $captureRef$: captureRef,
        dev: null,
        resolved: void 0
    }), qrl;
};

const getSymbolHash = symbolName => {
    const index = symbolName.lastIndexOf("_");
    return index > -1 ? symbolName.slice(index + 1) : symbolName;
};

function assertQrl() {
}

function assertSignal() {
}

const EMITTED = /*#__PURE__*/ new Set;

const emitUsedSymbol = (symbol, element, reqTime) => {
    EMITTED.has(symbol) || (EMITTED.add(symbol), emitEvent("qsymbol", {
        symbol,
        element,
        reqTime
    }));
};

const emitEvent = (eventName, detail) => {
    isServerPlatform() || "object" != typeof document || document.dispatchEvent(new CustomEvent(eventName, {
        bubbles: !1,
        detail
    }));
};

const now = () => isServerPlatform() ? 0 : "object" == typeof performance ? performance.now() : 0;

const componentQrl = componentQrl => {
    function QwikComponent(props, key, flags) {
        const hash = componentQrl.$hash$.slice(0, 4);
        return _jsxC(Virtual, {
            "q:renderFn": componentQrl,
            [QSlot]: props[QSlot],
            [_IMMUTABLE]: props[_IMMUTABLE],
            children: props.children,
            props
        }, flags, hash + ":" + (key || ""));
    }
    return QwikComponent[SERIALIZABLE_STATE] = [ componentQrl ], QwikComponent;
};

const isQwikComponent = component => "function" == typeof component && void 0 !== component[SERIALIZABLE_STATE];

const useSignal = initialState => {
    const {val, set, iCtx} = useSequentialScope();
    if (null != val) {
        return val;
    }
    const containerState = iCtx.$renderCtx$.$static$.$containerState$;
    const value = isFunction(initialState) && !isQwikComponent(initialState) ? invoke(void 0, initialState) : initialState;
    return set(_createSignal(value, containerState, 0, void 0));
};

const s_8DD0Xs2joDE = () => {
  const counter = useSignal(0);
  return /* @__PURE__ */ _jsxQ("button", null, {
    onClick$: /* @__PURE__ */ _noopQrl("s_0IqAdNrCF0o", [
      counter
    ])
  }, _fnSignal((p0) => p0.value, [
    counter
  ], "p0.value"), 3, "Cx_0");
};
const Counter = /* @__PURE__ */ componentQrl(/* @__PURE__ */ inlinedQrl(s_8DD0Xs2joDE, "s_8DD0Xs2joDE"));

const $$Astro = createAstro();
const $$Index = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$Index;
  return renderTemplate`<html lang="en"><head><meta charset="utf-8"><link rel="icon" type="image/svg+xml" href="/favicon.svg"><meta name="viewport" content="width=device-width"><meta name="generator"${addAttribute(Astro2.generator, "content")}><title>Astro</title>${renderHead()}</head><body><h1>Astro</h1>${renderComponent$1($$result, "Counter", Counter, {})}</body></html>`;
}, "/home/jackshelton/dev/open-source/astro/netlify-qwikdev-astro/src/pages/index.astro", void 0);

const $$file = "/home/jackshelton/dev/open-source/astro/netlify-qwikdev-astro/src/pages/index.astro";
const $$url = "";

const index = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
    __proto__: null,
    default: $$Index,
    file: $$file,
    url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

export { Fragment as F, _renderSSR as _, _pauseFromContexts as a, _jsxC as b, index as i, jsx as j, setPlatform as s };
