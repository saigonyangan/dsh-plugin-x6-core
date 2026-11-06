window.__ModuleLoader__.load({
	id: "@x6_ai/dsh-plugin-x6-core",
	factory: (require) => {
		var module = { exports: {} };
		var exports = module.exports;
		Object.defineProperty(exports, Symbol.toStringTag, { value: "Module" });
		let react_jsx_runtime = require("react/jsx-runtime");
		let react = require("react");
		let _deepseek_ai_dsh_client_ui_primitives = require("@deepseek-ai/dsh-client-ui-primitives");
		//#region lib/types/shared/settings-contract.js
		/** Settings namespace shared by Host registration and Client cards. */
		/**
		* Profile entry id from `cordis.patch.yml` (`x6-core`).
		* dsh ≥ 0.1.7 projects volatile Config fields under this id into `configForms`.
		*/
		const X6_SETTINGS_NS = "x6-core";
		/** Field that controls X6 brand chrome (sidebar + hero + tab). */
		const SHOW_BRAND_FIELD = "showBrand";
		/** Field that pins the platform region (`global` | `cn`). */
		const PINNED_LINE_FIELD = "pinnedLine";
		//#endregion
		//#region lib/types/client/settings/useShowWalletPref.js
		/** Subscribe to boolean preferences from the bound ConfigForm. */
		/** Effective showBrand (defaults to true while loading / missing). */
		function readShowBrand(scope) {
			return scope.getSnapshot().value?.showBrand ?? true;
		}
		/** Active line id for .ai / .io site pick (`pinnedLine` → `resolvedLine` → `global`). */
		function readActiveLineId(scope) {
			const value = scope.getSnapshot().value;
			const pinned = value?.pinnedLine?.trim();
			if (pinned !== void 0 && pinned.length > 0) return pinned;
			const resolved = value?.resolvedLine?.trim();
			if (resolved !== void 0 && resolved.length > 0) return resolved;
			return "global";
		}
		/** React mirror of {@link readShowBrand}. */
		function useShowBrandPref(scope) {
			const [showBrand, setShowBrand] = (0, react.useState)(() => readShowBrand(scope));
			(0, react.useEffect)(() => scope.subscribe(() => {
				setShowBrand(readShowBrand(scope));
			}), [scope]);
			return showBrand;
		}
		/** React mirror of {@link readActiveLineId}. */
		function useActiveLineId(scope) {
			const [lineId, setLineId] = (0, react.useState)(() => readActiveLineId(scope));
			(0, react.useEffect)(() => scope.subscribe(() => {
				setLineId(readActiveLineId(scope));
			}), [scope]);
			return lineId;
		}
		/** Whether the namespace is ready and accepts writes. */
		function useSettingsWritable(scope) {
			const [state, setState] = (0, react.useState)(() => {
				const snap = scope.getSnapshot();
				return {
					available: snap.status === "ready",
					writable: snap.writable
				};
			});
			(0, react.useEffect)(() => scope.subscribe(() => {
				const snap = scope.getSnapshot();
				setState({
					available: snap.status === "ready",
					writable: snap.writable
				});
			}), [scope]);
			return state;
		}
		//#endregion
		//#region \0dsh-css:/Users/hivanpan/Hivan/project/ykl/project/Whale/x6/x6-harness-free/plugins/packages/core/dsh-plugin-x6-core/src/client/brand/brand.module.css.mjs
		const css$5 = ".RdZIea_brandNameStack{flex-direction:row;justify-content:flex-start;align-items:center;width:100%;min-width:0;height:24px;display:inline-flex;overflow:hidden}.RdZIea_wordmark{letter-spacing:.02em;text-overflow:ellipsis;white-space:nowrap;color:#1212f9;min-width:0;max-width:100%;padding-bottom:2px;font-size:12px;font-weight:800;line-height:16px;display:block;position:relative;overflow:hidden}.RdZIea_wordmark:after{content:\"\";opacity:.45;background:linear-gradient(90deg,#1212f9 0%,#3b3bff 55%,#0000 100%);border-radius:999px;height:1.5px;position:absolute;bottom:0;left:0;right:0}";
		const tagId$5 = "@x6_ai/dsh-plugin-x6-core/brand.module.css";
		if (typeof document !== "undefined" && document.querySelector("style[data-plugin-css=" + JSON.stringify(tagId$5) + "]") === null) {
			const tag = document.createElement("style");
			tag.dataset.plugin = "@x6_ai/dsh-plugin-x6-core";
			tag.dataset.pluginCss = tagId$5;
			tag.textContent = css$5;
			document.head.appendChild(tag);
		}
		var brand_module_css_default = {
			"brandNameStack": "RdZIea_brandNameStack",
			"wordmark": "RdZIea_wordmark"
		};
		//#endregion
		//#region lib/types/client/brand/logo-data.js
		/** Inlined X6 logo variants (from x6/docs/logo/x6-logo.png). */
		const X6_LOGO_MARK_DATA_URL = "data:image/png;base64,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";
		const X6_LOGO_FAVICON_DATA_URL = "data:image/png;base64,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";
		//#endregion
		//#region lib/types/client/brand/Brand.js
		/**
		* Render the X6 mark with the presentation requested by its host surface.
		* @param props - Host-supplied mark presentation.
		* @returns the X6 logo mark.
		*/
		function X6BrandMark({ size, className }) {
			return (0, react_jsx_runtime.jsx)("img", {
				src: X6_LOGO_MARK_DATA_URL,
				width: size,
				height: size,
				className,
				alt: "",
				"aria-hidden": true,
				style: {
					display: "block",
					flexShrink: 0,
					objectFit: "contain"
				}
			});
		}
		/**
		* Render the X6 Harness wordmark without a subtitle row.
		* @returns the vertically centered brand name.
		*/
		function X6BrandName() {
			return (0, react_jsx_runtime.jsx)("div", {
				className: brand_module_css_default.brandNameStack,
				children: (0, react_jsx_runtime.jsx)("span", {
					className: brand_module_css_default.wordmark,
					"aria-label": "X6 Harness",
					children: "X6 Harness"
				})
			});
		}
		//#endregion
		//#region lib/types/client/brand/patchShellBranding.js
		/** Browser tab title + favicon overrides for X6. */
		const PRODUCT_TITLE = "X6 Harness";
		const TITLE_REPLACEMENTS = /* @__PURE__ */ new Map([["DSH 本地构建", PRODUCT_TITLE], ["DSH Local Build", PRODUCT_TITLE]]);
		/** X6 mark used as the browser tab favicon. */
		const FAVICON_HREF = X6_LOGO_FAVICON_DATA_URL;
		let capturedTitle;
		let capturedFaviconHref;
		/** Collapse accidental "X6 Harness Harness" from naive short-name substitution. */
		function normalizeProductTitle(title) {
			let next = title;
			while (next.includes(`${PRODUCT_TITLE} Harness`)) next = next.replaceAll(`${PRODUCT_TITLE} Harness`, PRODUCT_TITLE);
			while (next.includes("X6 Harness Harness")) next = next.replaceAll("X6 Harness Harness", PRODUCT_TITLE);
			if (next === "X6" || next === "X6 Harness Harness") return PRODUCT_TITLE;
			if (next.endsWith(" — X6")) return `${next.slice(0, -5)} — ${PRODUCT_TITLE}`;
			if (next.endsWith(" - X6")) return `${next.slice(0, -5)} - ${PRODUCT_TITLE}`;
			return next;
		}
		/** Keep the browser tab title on the X6 product name. */
		function patchDocumentProductTitle() {
			if (capturedTitle === void 0) capturedTitle = document.title;
			let next = document.title;
			for (const [from, to] of TITLE_REPLACEMENTS) if (next.includes(from)) next = next.replaceAll(from, to);
			next = normalizeProductTitle(next);
			if (next.length === 0) next = PRODUCT_TITLE;
			if (next !== document.title) document.title = next;
		}
		/** Replace the default DSH favicon with the X6 mark. */
		function patchFavicon() {
			const links = document.querySelectorAll("link[rel=\"icon\"], link[rel=\"shortcut icon\"]");
			if (links.length === 0) {
				if (capturedFaviconHref === void 0) capturedFaviconHref = "";
				const link = document.createElement("link");
				link.rel = "icon";
				link.type = "image/png";
				link.href = FAVICON_HREF;
				link.dataset.x6Favicon = "1";
				document.head.appendChild(link);
				return;
			}
			for (const link of links) {
				if (capturedFaviconHref === void 0 && link.href !== FAVICON_HREF) capturedFaviconHref = link.href;
				if (link.href !== FAVICON_HREF) {
					link.type = "image/png";
					link.href = FAVICON_HREF;
					link.dataset.x6Favicon = "1";
				}
			}
		}
		/** Apply browser-tab-only branding patches. */
		function patchTabBranding() {
			patchDocumentProductTitle();
			patchFavicon();
		}
		/** Restore pre-X6 tab title / favicon (DSH defaults). */
		function clearTabBranding() {
			if (capturedTitle !== void 0 && document.title !== capturedTitle) document.title = capturedTitle;
			const injected = document.querySelectorAll("link[data-x6-favicon=\"1\"]");
			for (const link of injected) if (capturedFaviconHref !== void 0 && capturedFaviconHref.length > 0) {
				link.href = capturedFaviconHref;
				delete link.dataset.x6Favicon;
			} else link.remove();
		}
		/** Keep the tab title and favicon in sync with framework updates. */
		function watchTabBrandingPatches() {
			const run = () => patchTabBranding();
			run();
			const observer = new MutationObserver(run);
			const title = document.querySelector("title");
			if (title !== null) observer.observe(title, {
				childList: true,
				characterData: true,
				subtree: true
			});
			if (document.head !== null) observer.observe(document.head, {
				childList: true,
				subtree: true
			});
			return () => observer.disconnect();
		}
		//#endregion
		//#region lib/types/client/brand/index.js
		/**
		* When `showBrand` is on: occupy brand slots (priority -1 shadows DSH official / shell).
		* When off: dispose occupants so `ui-brand-official` or sidebar fallbacks render again.
		*/
		function registerBrand(ctx, scope) {
			ctx.effect(() => {
				let disposeSlots;
				let stopPatches;
				const sync = () => {
					disposeSlots?.();
					disposeSlots = void 0;
					stopPatches?.();
					stopPatches = void 0;
					if (!readShowBrand(scope)) {
						clearTabBranding();
						return;
					}
					stopPatches = watchTabBrandingPatches();
					disposeSlots = ctx.slots.inject("sidebar.brand.mark", () => ctx.slots.inject("sidebar.brand.name", () => ctx.slots.inject("conversation.hero.brand.mark", function* () {
						yield ctx.slots.register({
							name: "sidebar.brand.mark",
							priority: -1,
							registrant: "@x6_ai/dsh-plugin-x6-core"
						}, X6BrandMark);
						yield ctx.slots.register({
							name: "sidebar.brand.name",
							priority: -1,
							registrant: "@x6_ai/dsh-plugin-x6-core"
						}, () => (0, react_jsx_runtime.jsx)(X6BrandName, {}));
						yield ctx.slots.register({
							name: "conversation.hero.brand.mark",
							priority: -1,
							registrant: "@x6_ai/dsh-plugin-x6-core"
						}, X6BrandMark);
					})));
				};
				sync();
				const unsub = scope.subscribe(sync);
				return () => {
					unsub();
					stopPatches?.();
					disposeSlots?.();
					clearTabBranding();
				};
			}, "x6-core: brand");
		}
		//#endregion
		//#region lib/types/client/hero/patchHeroHeadline.js
		/** Official → X6 hero headlines (also used to restore on clear). */
		const OFFICIAL_HEADLINE_REPLACEMENTS = /* @__PURE__ */ new Map([["探索未至之境", "为你打造专属插件生态应用"], ["Into the Unknown", "Building your exclusive plugin ecosystem application"]]);
		/** Extra one-way swaps (prior X6 wording → current); not reversed on clear. */
		const HEADLINE_MIGRATIONS = /* @__PURE__ */ new Map([["为你打造专属Agent生态应用", "为你打造专属插件生态应用"], ["Building your exclusive Agent ecosystem application", "Building your exclusive plugin ecosystem application"]]);
		const HEADLINE_REPLACEMENTS = new Map([...OFFICIAL_HEADLINE_REPLACEMENTS, ...HEADLINE_MIGRATIONS]);
		const HEADLINE_REVERSALS = new Map([...OFFICIAL_HEADLINE_REPLACEMENTS].map(([from, to]) => [to, from]));
		/** Hero preview badge copy shipped by ui-conversation. */
		const PREVIEW_BADGE_LABELS = /* @__PURE__ */ new Set(["预览版", "Preview"]);
		/**
		* Swap known official hero headline text nodes under `root`.
		* @param root - DOM subtree to scan.
		*/
		function patchHeroHeadlines(root) {
			const walker = document.createTreeWalker(root, NodeFilter.SHOW_TEXT);
			let node = walker.nextNode();
			while (node !== null) {
				const text = node.textContent;
				if (text !== null) {
					const next = HEADLINE_REPLACEMENTS.get(text);
					if (next !== void 0) node.textContent = next;
				}
				node = walker.nextNode();
			}
		}
		/** Restore official headlines previously rewritten by {@link patchHeroHeadlines}. */
		function restoreHeroHeadlines(root) {
			const walker = document.createTreeWalker(root, NodeFilter.SHOW_TEXT);
			let node = walker.nextNode();
			while (node !== null) {
				const text = node.textContent;
				if (text !== null) {
					const next = HEADLINE_REVERSALS.get(text);
					if (next !== void 0) node.textContent = next;
				}
				node = walker.nextNode();
			}
		}
		/**
		* Hide the official hero preview badge until a slot or locale override is available.
		* @param root - DOM subtree to scan.
		*/
		function hideHeroPreviewBadge(root) {
			const walker = document.createTreeWalker(root, NodeFilter.SHOW_TEXT);
			let node = walker.nextNode();
			while (node !== null) {
				const text = node.textContent?.trim();
				if (text !== void 0 && PREVIEW_BADGE_LABELS.has(text)) {
					const element = node.parentElement;
					if (element !== null && element.textContent?.trim() === text) {
						element.style.display = "none";
						element.setAttribute("aria-hidden", "true");
					}
				}
				node = walker.nextNode();
			}
		}
		/** Show previously hidden hero preview badges. */
		function showHeroPreviewBadge(root) {
			const walker = document.createTreeWalker(root, NodeFilter.SHOW_TEXT);
			let node = walker.nextNode();
			while (node !== null) {
				const text = node.textContent?.trim();
				if (text !== void 0 && PREVIEW_BADGE_LABELS.has(text)) {
					const element = node.parentElement;
					if (element !== null && element.getAttribute("aria-hidden") === "true") {
						element.style.display = "";
						element.removeAttribute("aria-hidden");
					}
				}
				node = walker.nextNode();
			}
		}
		/** Apply X6 hero chrome patches under `root`. */
		function patchHeroChrome(root) {
			patchHeroHeadlines(root);
			hideHeroPreviewBadge(root);
		}
		/** Undo X6 hero chrome patches under `root`. */
		function clearHeroChrome(root) {
			restoreHeroHeadlines(root);
			showHeroPreviewBadge(root);
		}
		/**
		* Keep hero chrome in sync while the conversation shell mounts or hot-reloads.
		* @returns disposer disconnecting the observer.
		*/
		function watchHeroChromePatches() {
			const run = () => patchHeroChrome(document.body);
			run();
			const observer = new MutationObserver(run);
			observer.observe(document.body, {
				childList: true,
				subtree: true,
				characterData: true
			});
			return () => observer.disconnect();
		}
		//#endregion
		//#region lib/types/client/hero/index.js
		/** Hero headline DOM patches until official slots ship. */
		/** Watch and patch hero chrome copy when brand styling is enabled. */
		function registerHero(ctx, scope) {
			ctx.effect(() => {
				let stopPatches;
				const sync = () => {
					stopPatches?.();
					stopPatches = void 0;
					if (readShowBrand(scope)) stopPatches = watchHeroChromePatches();
					else if (typeof document !== "undefined" && document.body !== null) clearHeroChrome(document.body);
				};
				sync();
				const unsub = scope.subscribe(sync);
				return () => {
					unsub();
					stopPatches?.();
				};
			}, "x6-core: hero-chrome");
		}
		//#endregion
		//#region lib/types/client/use-client-locale.js
		/** Subscribe to DSH active locale for reactive client copy. */
		function useClientLocale(ctx) {
			const [locale, setLocale] = (0, react.useState)(() => ctx.locale.getSnapshot().active);
			(0, react.useEffect)(() => ctx.locale.subscribe(() => {
				setLocale(ctx.locale.getSnapshot().active);
			}), [ctx]);
			return locale;
		}
		//#endregion
		//#region lib/types/client/settings/locales.js
		/** Locales for the X6 plugin settings card. */
		const ZH = {
			title: "X6",
			description: "平台连接与侧栏展示相关选项。",
			region: "访问区域",
			regionHint: "中国大陆访问更快。仅改变授权、控制台与余额线路；插件下载线路由「插件市场」单独设置。",
			regionGlobal: "全球",
			regionCn: "中国大陆",
			regionLocked: "管理员已锁定访问区域，无法在此切换。",
			regionLoading: "正在探测最快线路…",
			showWallet: "在侧栏显示余额",
			showWalletHint: "关闭后侧栏不再显示余额入口；仅在当前模型服务商为 X6 时才会出现该入口。",
			showBrand: "显示 X6 品牌样式",
			showBrandHint: "关闭后恢复 DSH 默认品牌（侧栏 Logo/名称、对话区标识与标题、浏览器标签页）。",
			readOnly: "当前连接为只读，无法保存更改。",
			expand: "展开",
			collapse: "收起"
		};
		const EN = {
			title: "X6",
			description: "Connection and sidebar display options.",
			region: "Access region",
			regionHint: "Mainland China may be faster. This only changes auth, console, and balance routes; plugin downloads are configured under Plugin Market.",
			regionGlobal: "Global",
			regionCn: "Mainland China",
			regionLocked: "Access region is locked by admin configuration.",
			regionLoading: "Detecting the fastest line…",
			showWallet: "Show balance in sidebar",
			showWalletHint: "When off, the sidebar balance entry is hidden. It only appears when the current model provider is X6.",
			showBrand: "Show X6 branding",
			showBrandHint: "When off, restores the default DSH brand (sidebar mark/name, conversation hero, and browser tab).",
			readOnly: "This connection is read-only; changes cannot be saved.",
			expand: "Expand",
			collapse: "Collapse"
		};
		const zh$1 = ZH;
		const en$1 = EN;
		function settingsCardT(locale) {
			const table = locale?.toLowerCase().startsWith("zh") ? ZH : EN;
			return (key) => table[key];
		}
		//#endregion
		//#region lib/types/shared/line-contract.js
		/** Line / region status API shared by Host routes and Client settings. */
		const LINE_STATUS_PATH = "/api/x6.line.status";
		//#endregion
		//#region lib/types/client/settings/line-wire.js
		/** Browser fetch for region / line status. */
		async function parseJson$3(response) {
			const body = await response.json();
			if (!response.ok || body.ok === false) {
				const message = typeof body.message === "string" && body.message.length > 0 ? body.message : `HTTP ${String(response.status)}`;
				throw new Error(message);
			}
			return body;
		}
		/** Resolve (and auto-pin on first call) the auth region line. */
		async function fetchLineStatus() {
			return parseJson$3(await fetch(new URL(LINE_STATUS_PATH, window.location.origin)));
		}
		//#endregion
		//#region \0dsh-css:/Users/hivanpan/Hivan/project/ykl/project/Whale/x6/x6-harness-free/plugins/packages/core/dsh-plugin-x6-core/src/client/settings/settings-card.module.css.mjs
		const css$4 = ".MC7b2a_card{border:1px solid var(--dsw-alias-border-l2);background:var(--dsw-alias-bg-layer-3);border-radius:12px;list-style:none;transition:border-color .16s,background .16s}.MC7b2a_card:hover{border-color:var(--dsw-alias-label-dimmed)}.MC7b2a_cardOpen{background:var(--dsw-alias-bg-layer-2);border-color:var(--dsw-alias-label-dimmed)}.MC7b2a_header{appearance:none;width:100%;font:inherit;color:inherit;text-align:left;cursor:pointer;background:0 0;border:0;border-radius:12px;align-items:center;gap:12px;padding:14px 16px;display:flex}.MC7b2a_header:focus-visible{outline:2px solid var(--dsw-alias-brand-primary);outline-offset:-2px}.MC7b2a_headText{flex-direction:column;flex:1;gap:4px;min-width:0;display:flex}.MC7b2a_name{color:var(--dsw-alias-label-primary);font-size:15px;font-weight:600;line-height:1.4}.MC7b2a_description{color:var(--dsw-alias-label-tertiary);font-size:13px;line-height:1.5}.MC7b2a_chevron{color:var(--dsw-alias-label-tertiary);flex:none;transition:transform .16s}.MC7b2a_chevronOpen{transform:rotate(180deg)}.MC7b2a_body{border-top:1px solid var(--dsw-alias-border-l2);margin:0 16px;padding-bottom:8px}.MC7b2a_readOnly{color:var(--dsw-alias-label-tertiary);margin:12px 0 0;font-size:12px;line-height:1.5}.MC7b2a_field{flex-direction:column;gap:6px;padding:12px 0;display:flex}.MC7b2a_field+.MC7b2a_field{border-top:1px solid var(--dsw-alias-border-l2)}.MC7b2a_row{cursor:pointer;color:var(--dsw-alias-label-primary);align-items:center;gap:8px;font-size:13px;font-weight:500;line-height:1.5;display:flex}.MC7b2a_rowDisabled{cursor:not-allowed;opacity:.55}.MC7b2a_checkbox{width:14px;height:14px;accent-color:var(--dsw-alias-brand-primary);flex:none;margin:0}.MC7b2a_hint{color:var(--dsw-alias-label-tertiary);margin:0;font-size:12px;line-height:1.5}.MC7b2a_segment{background:var(--dsw-alias-bg-layer-3);border:1px solid var(--dsw-alias-border-l2);border-radius:8px;align-items:stretch;gap:0;width:fit-content;max-width:100%;padding:2px;display:inline-flex}.MC7b2a_segmentBtn{appearance:none;font:inherit;cursor:pointer;color:var(--dsw-alias-label-secondary);background:0 0;border:0;border-radius:6px;padding:6px 14px;font-size:13px;font-weight:500;line-height:1.4;transition:background .12s,color .12s}.MC7b2a_segmentBtn:hover:not(:disabled){color:var(--dsw-alias-label-primary)}.MC7b2a_segmentBtn:focus-visible{outline:2px solid var(--dsw-alias-brand-primary);outline-offset:1px}.MC7b2a_segmentBtnActive{background:var(--dsw-alias-bg-layer-1);color:var(--dsw-alias-label-primary);border:1px solid var(--dsw-alias-border-l2)}.MC7b2a_segmentBtn:disabled{cursor:not-allowed;opacity:.55}";
		const tagId$4 = "@x6_ai/dsh-plugin-x6-core/settings-card.module.css";
		if (typeof document !== "undefined" && document.querySelector("style[data-plugin-css=" + JSON.stringify(tagId$4) + "]") === null) {
			const tag = document.createElement("style");
			tag.dataset.plugin = "@x6_ai/dsh-plugin-x6-core";
			tag.dataset.pluginCss = tagId$4;
			tag.textContent = css$4;
			document.head.appendChild(tag);
		}
		var settings_card_module_css_default = {
			"body": "MC7b2a_body",
			"card": "MC7b2a_card",
			"cardOpen": "MC7b2a_cardOpen",
			"checkbox": "MC7b2a_checkbox",
			"chevron": "MC7b2a_chevron",
			"chevronOpen": "MC7b2a_chevronOpen",
			"description": "MC7b2a_description",
			"field": "MC7b2a_field",
			"headText": "MC7b2a_headText",
			"header": "MC7b2a_header",
			"hint": "MC7b2a_hint",
			"name": "MC7b2a_name",
			"readOnly": "MC7b2a_readOnly",
			"row": "MC7b2a_row",
			"rowDisabled": "MC7b2a_rowDisabled",
			"segment": "MC7b2a_segment",
			"segmentBtn": "MC7b2a_segmentBtn",
			"segmentBtnActive": "MC7b2a_segmentBtnActive"
		};
		//#endregion
		//#region lib/types/client/settings/X6SettingsCard.js
		const FALLBACK_LINES = [{
			id: "global",
			label: "Global"
		}, {
			id: "cn",
			label: "中国大陆"
		}];
		/** Plugins page contribution: summary one-liner or full settings form. */
		function X6SettingsCard(props) {
			const { ctx, scope, view, t: slotT } = props;
			const t = settingsCardT(useClientLocale(ctx));
			const showBrand = useShowBrandPref(scope);
			const { available, writable } = useSettingsWritable(scope);
			const [saving, setSaving] = (0, react.useState)(false);
			const [regionLoading, setRegionLoading] = (0, react.useState)(false);
			const [regionLocked, setRegionLocked] = (0, react.useState)(false);
			const [regionLines, setRegionLines] = (0, react.useState)(FALLBACK_LINES);
			const [activeLineId, setActiveLineId] = (0, react.useState)(() => readActiveLineId(scope));
			(0, react.useEffect)(() => scope.subscribe(() => {
				setActiveLineId(readActiveLineId(scope));
			}), [scope]);
			(0, react.useEffect)(() => {
				if (view !== "page" || !available) return;
				let cancelled = false;
				setRegionLoading(true);
				fetchLineStatus().then((status) => {
					if (cancelled) return;
					setRegionLines(status.lines.length > 0 ? status.lines : FALLBACK_LINES);
					setActiveLineId(status.activeLineId);
					setRegionLocked(status.locked);
				}).catch(() => {}).finally(() => {
					if (!cancelled) setRegionLoading(false);
				});
				return () => {
					cancelled = true;
				};
			}, [available, view]);
			const onToggle = (0, react.useCallback)(async (field, checked) => {
				if (!writable || saving) return;
				setSaving(true);
				try {
					await scope.set(field, checked);
				} finally {
					setSaving(false);
				}
			}, [
				scope,
				saving,
				writable
			]);
			const onSelectRegion = (0, react.useCallback)(async (lineId) => {
				if (!writable || saving || regionLocked || lineId === activeLineId) return;
				setSaving(true);
				try {
					await scope.set(PINNED_LINE_FIELD, lineId);
					setActiveLineId(lineId);
				} finally {
					setSaving(false);
				}
			}, [
				activeLineId,
				regionLocked,
				saving,
				scope,
				writable
			]);
			if (view === "summary") return slotT("description");
			if (!available) return null;
			const regionDisabled = !writable || saving || regionLocked || regionLoading;
			return (0, react_jsx_runtime.jsxs)("div", {
				className: settings_card_module_css_default.body,
				children: [
					!writable ? (0, react_jsx_runtime.jsx)("p", {
						className: settings_card_module_css_default.readOnly,
						role: "status",
						children: t("readOnly")
					}) : null,
					(0, react_jsx_runtime.jsxs)("div", {
						className: settings_card_module_css_default.field,
						children: [
							(0, react_jsx_runtime.jsx)("span", {
								className: settings_card_module_css_default.row,
								style: { cursor: "default" },
								children: t("region")
							}),
							(0, react_jsx_runtime.jsx)("div", {
								className: settings_card_module_css_default.segment,
								role: "radiogroup",
								"aria-label": t("region"),
								"aria-busy": regionLoading,
								children: regionLines.map((line) => {
									const selected = line.id === activeLineId;
									const label = line.id === "cn" ? t("regionCn") : line.id === "global" ? t("regionGlobal") : line.label;
									return (0, react_jsx_runtime.jsx)("button", {
										type: "button",
										role: "radio",
										"aria-checked": selected,
										className: selected ? `${settings_card_module_css_default.segmentBtn} ${settings_card_module_css_default.segmentBtnActive}` : settings_card_module_css_default.segmentBtn,
										disabled: regionDisabled,
										onClick: () => {
											onSelectRegion(line.id);
										},
										children: label
									}, line.id);
								})
							}),
							(0, react_jsx_runtime.jsx)("p", {
								className: settings_card_module_css_default.hint,
								children: regionLocked ? t("regionLocked") : regionLoading ? t("regionLoading") : t("regionHint")
							})
						]
					}),
					(0, react_jsx_runtime.jsxs)("div", {
						className: settings_card_module_css_default.field,
						children: [(0, react_jsx_runtime.jsxs)("label", {
							className: writable ? settings_card_module_css_default.row : `${settings_card_module_css_default.row} ${settings_card_module_css_default.rowDisabled}`,
							children: [(0, react_jsx_runtime.jsx)("input", {
								className: settings_card_module_css_default.checkbox,
								type: "checkbox",
								checked: showBrand,
								disabled: !writable || saving,
								onChange: (event) => {
									onToggle(SHOW_BRAND_FIELD, event.target.checked);
								}
							}), (0, react_jsx_runtime.jsx)("span", { children: t("showBrand") })]
						}), (0, react_jsx_runtime.jsx)("p", {
							className: settings_card_module_css_default.hint,
							children: t("showBrandHint")
						})]
					})
				]
			});
		}
		//#endregion
		//#region lib/types/client/settings/index.js
		const LOCALE_NS = "x6.settings";
		/** Register `plugins.item` while Host serves the X6 volatile Config. */
		function registerPluginSettings(ctx, scope) {
			const t = ctx.locale.bind(LOCALE_NS);
			ctx.effect(() => ctx.locale.register(LOCALE_NS, {
				zh: zh$1,
				en: en$1
			}), "x6-core: settings dictionaries");
			ctx.effect(() => ctx.configForms.whileServed([X6_SETTINGS_NS], () => ctx.slots.inject("plugins.item", () => ctx.slots.register({
				name: "plugins.item",
				id: "x6",
				order: 5,
				label: () => t("title"),
				locale: LOCALE_NS
			}, (props) => (0, react_jsx_runtime.jsx)(X6SettingsCard, {
				ctx,
				scope,
				...props
			})))), "x6-core: plugins.item");
		}
		//#endregion
		//#region lib/types/shared/wallet-contract.js
		/** Host ↔ Client contract for X6 wallet / budget deep-link. */
		/** Lightweight connection probe for sidebar visibility. */
		const WALLET_STATUS_PATH = "/api/x6.wallet.status";
		/** Fetch organization balance (Host refreshes harness session first). */
		const WALLET_PATH = "/api/x6.wallet";
		/** Minimum Client poll interval for wallet (Harness rate-limit guidance). */
		const WALLET_POLL_MS = 6e4;
		/** Error codes returned on wallet failures (Client branching). */
		const WALLET_ERROR = {
			notConnected: "wallet.not_connected",
			sessionRevoked: "wallet.session_revoked",
			noDevice: "wallet.no_device",
			credentialMismatch: "wallet.credential_mismatch"
		};
		//#endregion
		//#region lib/types/client/wallet/wire.js
		/** Browser fetch wrappers for wallet Host API routes. */
		async function readResponseBody$2(response) {
			if ((response.headers.get("content-type") ?? "").includes("application/json")) return response.json();
			const text = await response.text();
			if (text.length === 0) return {};
			try {
				return JSON.parse(text);
			} catch {
				return { message: text };
			}
		}
		async function parseJson$2(response) {
			const body = await readResponseBody$2(response);
			if (!response.ok || body.ok === false) {
				if (response.status === 404) throw new Error(typeof body.message === "string" && body.message.length > 0 ? body.message : "HOST_API_NOT_FOUND");
				const message = typeof body.message === "string" && body.message.length > 0 ? body.message : `HTTP ${String(response.status)}`;
				const error = new Error(message);
				if (typeof body.code === "string") error.code = body.code;
				throw error;
			}
			return body;
		}
		function asString(value, fallback = "") {
			return typeof value === "string" ? value : fallback;
		}
		function asNumber(value, fallback = 0) {
			return typeof value === "number" && Number.isFinite(value) ? value : fallback;
		}
		/** Normalize Host wallet payloads so missing subscription fields never crash UI. */
		function normalizeWalletStatus(raw) {
			return {
				connected: Boolean(raw.connected),
				credentialAligned: raw.credentialAligned !== false,
				usagePoliciesUrl: asString(raw.usagePoliciesUrl),
				...typeof raw.keyPrefix === "string" && raw.keyPrefix.length > 0 ? { keyPrefix: raw.keyPrefix } : {}
			};
		}
		/** Normalize Host balance payloads for older Host builds without points fields. */
		function normalizeWalletBalance(raw) {
			return {
				connected: true,
				organizationId: asString(raw.organizationId),
				name: asString(raw.name),
				availableBalance: asString(raw.availableBalance),
				currency: asString(raw.currency, "USD"),
				subscriptionActive: Boolean(raw.subscriptionActive),
				pointsRemaining: asString(raw.pointsRemaining, "0"),
				pointsGranted: asString(raw.pointsGranted, "0"),
				planCode: asString(raw.planCode),
				planName: asString(raw.planName),
				subscriptionStatus: asString(raw.subscriptionStatus),
				nextPointsResetAtUnix: asNumber(raw.nextPointsResetAtUnix),
				periodEndUnix: asNumber(raw.periodEndUnix),
				usagePoliciesUrl: asString(raw.usagePoliciesUrl),
				...typeof raw.keyPrefix === "string" && raw.keyPrefix.length > 0 ? { keyPrefix: raw.keyPrefix } : {}
			};
		}
		/** Probe whether X6 credentials exist (sidebar visibility). */
		async function fetchWalletStatus() {
			const url = new URL(WALLET_STATUS_PATH, window.location.origin);
			return normalizeWalletStatus(await parseJson$2(await fetch(url)));
		}
		/** Fetch organization balance via Host (refresh + wallet). */
		async function fetchWalletBalance(locale) {
			const url = new URL(WALLET_PATH, window.location.origin);
			if (locale !== void 0 && locale.length > 0) url.searchParams.set("locale", locale);
			return normalizeWalletBalance(await parseJson$2(await fetch(url)));
		}
		//#endregion
		//#region lib/types/shared/auth-contract.js
		/** Connection fetch routes. */
		const AUTH_START_PATH = "/api/x6.auth.start";
		const AUTH_STATUS_PATH = "/api/x6.auth.status";
		//#endregion
		//#region lib/types/client/quick-setup/wire.js
		/** Browser fetch wrappers for X6 host API routes. */
		async function readResponseBody$1(response) {
			if ((response.headers.get("content-type") ?? "").includes("application/json")) return response.json();
			const text = await response.text();
			if (text.length === 0) return {};
			try {
				return JSON.parse(text);
			} catch {
				return { message: text };
			}
		}
		async function parseJson$1(response) {
			const body = await readResponseBody$1(response);
			if (!response.ok || body.ok === false) {
				if (response.status === 404) throw new Error(typeof body.message === "string" && body.message.length > 0 ? body.message : "HOST_API_NOT_FOUND");
				const message = typeof body.message === "string" && body.message.length > 0 ? body.message : `HTTP ${String(response.status)}`;
				throw new Error(message);
			}
			return body;
		}
		/** Start OAuth flow; host resolves the pinned / auto region line. */
		async function startAuth(locale) {
			const url = new URL(AUTH_START_PATH, window.location.origin);
			if (locale !== void 0 && locale.length > 0) url.searchParams.set("locale", locale);
			return parseJson$1(await fetch(url));
		}
		/** Poll auth flow status. */
		async function fetchAuthStatus(flowId) {
			const url = new URL(AUTH_STATUS_PATH, window.location.origin);
			url.searchParams.set("flowId", flowId);
			return parseJson$1(await fetch(url));
		}
		//#endregion
		//#region lib/types/shared/provider.js
		/** Provider write targets in engine-standard settings / credentials storage. */
		/** Settings namespace for pi-ai custom providers. */
		const PROVIDER_NS = "llm-pi-ai";
		/** Credential ref written by Host; referenced in provider profile. */
		const CREDENTIAL_REF = "X6_API_KEY";
		/** Wire protocol for the custom provider profile. */
		const PROVIDER_API = "openai-completions";
		//#endregion
		//#region lib/types/client/quick-setup/provider-write.js
		/** Write X6 provider profile into engine-standard llm-pi-ai settings. */
		async function revisionOf(settings) {
			const response = await settings.describe();
			if (!response.ok) throw new Error(response.error.message);
			return response.value.namespaces.find((ns) => ns.ns === PROVIDER_NS)?.revision;
		}
		/** Create or replace the x6 provider row (credentials already on Host). */
		async function writeX6Provider(settings, input) {
			const revision = await revisionOf(settings);
			const value = {
				displayName: "X6",
				apiKeyEnv: CREDENTIAL_REF,
				api: PROVIDER_API,
				baseURL: input.baseURL,
				compat: {
					supportsDeveloperRole: false,
					supportsStore: false
				},
				models: input.models.map((model) => ({
					id: model.id,
					...model.name === void 0 ? {} : { name: model.name },
					...model.contextWindow === void 0 ? {} : { contextWindow: model.contextWindow },
					...model.input === void 0 || model.input.length === 0 ? {} : { input: [...model.input] },
					...model.reasoningEfforts === void 0 ? {} : { reasoningEfforts: { ...model.reasoningEfforts } }
				}))
			};
			const response = await settings.mutate(PROVIDER_NS, [{
				op: "set",
				path: ["providers", "x6"],
				value
			}], revision);
			if (!response.ok) {
				if (response.error.code === "settings-conflict") {
					const retryRevision = await revisionOf(settings);
					const retry = await settings.mutate(PROVIDER_NS, [{
						op: "set",
						path: ["providers", "x6"],
						value
					}], retryRevision);
					if (!retry.ok) throw new Error(retry.error.message);
					return;
				}
				throw new Error(response.error.message);
			}
		}
		//#endregion
		//#region lib/types/client/quick-setup/locales.js
		/** Quick-setup copy keys. */
		const quickSetupMessages = {
			"zh-CN": {
				title: "X6 快速配置",
				description: "登录授权后自动添加 X6 模型提供方。",
				signInTitle: "开始使用",
				signInDescription: "登录 X6 账号进行授权，即可开始使用。你的项目和文件保存在本地。",
				later: "稍后",
				close: "关闭",
				cancel: "取消",
				quickSetup: "快速配置",
				signIn: "登录授权",
				reopenAuth: "重新打开授权页",
				copyLink: "复制 X6 登录链接",
				copiedLink: "链接已复制",
				awaiting: "请在浏览器中完成授权…",
				browserTitle: "等待登录",
				browserPrompt: "没有自动打开新页面？",
				browserDescription: "，手动打开 X6 登录页完成登录。",
				writing: "正在写入模型提供方…",
				done: "X6 已配置，可在上方列表中使用。",
				signInDone: "授权完成，正在进入…",
				waiting: "等待授权",
				retry: "重新登录",
				error: "配置失败",
				hostApiMissing: "Host 端接口未就绪。请在插件目录执行 pnpm build，然后完全重启 dsh web / Desktop（仅刷新浏览器不够）。",
				unauthorized: "会话未授权，请关闭页面后用终端里带 ?token= 的 dsh web 地址重新打开。"
			},
			"en-US": {
				title: "X6 Quick Setup",
				description: "Sign in to authorize and add the X6 provider automatically.",
				signInTitle: "Get started",
				signInDescription: "Sign in to your X6 account to authorize and get started. Your projects and files are stored locally.",
				later: "Later",
				close: "Close",
				cancel: "Cancel",
				quickSetup: "Quick setup",
				signIn: "Authorize",
				reopenAuth: "Reopen authorization",
				copyLink: "Copy X6 sign-in link",
				copiedLink: "Link copied",
				awaiting: "Complete authorization in your browser…",
				browserTitle: "Waiting for sign in",
				browserPrompt: "Page did not open automatically? ",
				browserDescription: ", then open the X6 sign-in page to finish.",
				writing: "Writing model provider…",
				done: "X6 is configured. Use it in the list above.",
				signInDone: "Authorized. Entering…",
				waiting: "Waiting",
				retry: "Sign in again",
				error: "Setup failed",
				hostApiMissing: "Host API is not ready. Run pnpm build in the plugin directory, then fully restart dsh web / Desktop (refreshing the browser is not enough).",
				unauthorized: "Session is not authorized. Close this tab and reopen using the dsh web URL with ?token= from your terminal."
			}
		};
		/** Resolve locale tag to a supported quick-setup dictionary. */
		function quickSetupT(locale) {
			const tag = locale?.startsWith("zh") ? "zh-CN" : "en-US";
			const dict = quickSetupMessages[tag];
			return (key) => dict[key];
		}
		//#endregion
		//#region lib/types/client/quick-setup/useQuickSetup.js
		function formatWireError(error, locale) {
			const t = quickSetupT(locale);
			if (error instanceof Error) {
				if (error.message === "HOST_API_NOT_FOUND" || error.message === "not found") return t("hostApiMissing");
				if (error.message === "unauthorized") return t("unauthorized");
				return error.message;
			}
			return t("error");
		}
		const POLL_MS = 1500;
		const MAX_POLL_MS = 6e5;
		/** Quick-setup state machine: authorize → poll → write provider (auth line resolved on host). */
		function useQuickSetup(options) {
			const { ctx, locale, onDone } = options;
			const [phase, setPhase] = (0, react.useState)("idle");
			const [flowId, setFlowId] = (0, react.useState)();
			const [authorizeUrl, setAuthorizeUrl] = (0, react.useState)();
			const [copyUrl, setCopyUrl] = (0, react.useState)();
			const [message, setMessage] = (0, react.useState)();
			const pollStartedAt = (0, react.useRef)();
			const pollTimer = (0, react.useRef)();
			const clearPoll = (0, react.useCallback)(() => {
				if (pollTimer.current !== void 0) {
					clearTimeout(pollTimer.current);
					pollTimer.current = void 0;
				}
			}, []);
			(0, react.useEffect)(() => () => clearPoll(), [clearPoll]);
			const handleDone = (0, react.useCallback)(async (status) => {
				if (status.baseURL === void 0 || status.models === void 0) throw new Error(quickSetupT(locale)("error"));
				setPhase("writing");
				await writeX6Provider(ctx.remote.settings, {
					baseURL: status.baseURL,
					models: status.models
				});
				setPhase("done");
				setMessage(quickSetupT(locale)("done"));
				onDone?.();
			}, [
				ctx.remote.settings,
				locale,
				onDone
			]);
			const schedulePoll = (0, react.useCallback)((id) => {
				clearPoll();
				if (pollStartedAt.current === void 0) pollStartedAt.current = Date.now();
				pollTimer.current = setTimeout(() => {
					(async () => {
						if (pollStartedAt.current !== void 0 && Date.now() - pollStartedAt.current > MAX_POLL_MS) {
							setPhase("error");
							setMessage(quickSetupT(locale)("error"));
							return;
						}
						try {
							const status = await fetchAuthStatus(id);
							if (status.phase === "done") {
								await handleDone(status);
								return;
							}
							if (status.phase === "error") {
								setPhase("error");
								setMessage(status.message ?? quickSetupT(locale)("error"));
								return;
							}
							schedulePoll(id);
						} catch (error) {
							setPhase("error");
							setMessage(formatWireError(error, locale));
						}
					})();
				}, POLL_MS);
			}, [
				clearPoll,
				handleDone,
				locale
			]);
			return {
				phase,
				flowId,
				authorizeUrl,
				copyUrl,
				message,
				start: (0, react.useCallback)(async () => {
					clearPoll();
					pollStartedAt.current = void 0;
					setMessage(void 0);
					setPhase("starting");
					try {
						const started = await startAuth(locale);
						setFlowId(started.flowId);
						setAuthorizeUrl(started.authorizeUrl);
						setCopyUrl(started.copyUrl ?? started.authorizeUrl);
						setPhase("awaiting-approval");
						window.open(started.authorizeUrl, "_blank", "noopener,noreferrer");
						schedulePoll(started.flowId);
					} catch (error) {
						setPhase("error");
						setMessage(formatWireError(error, locale));
					}
				}, [
					clearPoll,
					locale,
					schedulePoll
				]),
				reopenAuth: (0, react.useCallback)(() => {
					if (authorizeUrl !== void 0) window.open(authorizeUrl, "_blank", "noopener,noreferrer");
				}, [authorizeUrl])
			};
		}
		//#endregion
		//#region \0dsh-css:/Users/hivanpan/Hivan/project/ykl/project/Whale/x6/x6-harness-free/plugins/packages/core/dsh-plugin-x6-core/src/client/sign-in/sign-in.module.css.mjs
		const css$3 = ".xalQPa_dialog{user-select:none;box-sizing:border-box;border:.5px solid var(--dsw-alias-border-inverted)}.xalQPa_content{flex-direction:column;width:100%;display:flex}.xalQPa_header{justify-content:space-between;align-items:center;gap:8px;padding:22px 24px 12px;display:flex}.xalQPa_title{color:var(--dsw-alias-label-primary);margin:0;font-size:16px;font-weight:500;line-height:24px}.xalQPa_close{box-sizing:border-box;border-radius:var(--dsw-radius-sm);width:28px;height:28px;color:var(--dsw-alias-label-primary);cursor:pointer;background:0 0;border:0;flex:none;justify-content:center;align-items:center;padding:6px;display:inline-flex}.xalQPa_close:hover{background:var(--dsw-alias-interactive-bg-hover)}.xalQPa_actions{box-sizing:border-box;justify-content:flex-end;align-items:center;gap:8px;width:100%;padding:0 24px 22px;display:flex}.xalQPa_primaryButton,.xalQPa_secondaryButton{box-sizing:border-box;border-radius:var(--dsw-radius-md);min-width:72px;height:36px;font-size:14px;line-height:22px}.xalQPa_primaryButton{padding:0 16px;font-weight:500}.xalQPa_secondaryButton{border:.5px solid var(--dsw-alias-border-l2);padding:0 14px}.xalQPa_description{color:var(--dsw-alias-label-primary);margin:0;padding:0 24px;font-size:14px;line-height:22px}.xalQPa_link{color:inherit;font:inherit;cursor:pointer;background:0 0;border:0;padding:0;text-decoration:underline}.xalQPa_spinner{flex:none;animation:1s linear infinite xalQPa_spin}.xalQPa_primaryButton:has(.xalQPa_spinner){opacity:1}@keyframes xalQPa_spin{to{transform:rotate(360deg)}}@media (prefers-reduced-motion:reduce){.xalQPa_spinner{animation:none}}.xalQPa_apiKeyDialog{width:min(600px,100%);max-height:100%;padding:0}.xalQPa_apiKeyContent{box-sizing:border-box;flex-direction:column;min-height:0;padding:28px;display:flex;overflow-y:auto}.xalQPa_apiKeyTitle{color:var(--dsw-alias-label-primary);margin:0;font-size:20px;font-weight:500;line-height:28px}.xalQPa_apiKeyDescription{color:var(--dsw-alias-label-secondary);margin:20px 0 0;font-size:14px;line-height:24px}.xalQPa_apiKeyField{flex-direction:column;gap:8px;margin-top:24px;display:flex}.xalQPa_apiKeyLabel{color:var(--dsw-alias-label-primary);font-size:13px;font-weight:500;line-height:20px}.xalQPa_apiKeyInput{box-sizing:border-box;border:.5px solid var(--dsw-alias-border-l2);border-radius:var(--dsw-radius-md);background:var(--dsw-alias-bg-layer-1);width:100%;height:40px;color:var(--dsw-alias-label-primary);font:inherit;padding:0 12px;font-size:14px;line-height:22px}.xalQPa_apiKeyInput:focus{border-color:var(--dsw-alias-interactive-bg-accent,#1212f9);outline:none;box-shadow:0 0 0 2px #1212f938}.xalQPa_apiKeyError{color:#c41e3a;margin:10px 0 0;font-size:13px;line-height:20px}.xalQPa_apiKeyActions{justify-content:flex-end;align-items:center;gap:8px;margin-top:24px;display:flex}@media (width<=560px){.xalQPa_apiKeyContent{padding:24px}.xalQPa_apiKeyField{margin-top:20px}}";
		const tagId$3 = "@x6_ai/dsh-plugin-x6-core/sign-in.module.css";
		if (typeof document !== "undefined" && document.querySelector("style[data-plugin-css=" + JSON.stringify(tagId$3) + "]") === null) {
			const tag = document.createElement("style");
			tag.dataset.plugin = "@x6_ai/dsh-plugin-x6-core";
			tag.dataset.pluginCss = tagId$3;
			tag.textContent = css$3;
			document.head.appendChild(tag);
		}
		var sign_in_module_css_default = {
			"actions": "xalQPa_actions",
			"apiKeyActions": "xalQPa_apiKeyActions",
			"apiKeyContent": "xalQPa_apiKeyContent",
			"apiKeyDescription": "xalQPa_apiKeyDescription",
			"apiKeyDialog": "xalQPa_apiKeyDialog",
			"apiKeyError": "xalQPa_apiKeyError",
			"apiKeyField": "xalQPa_apiKeyField",
			"apiKeyInput": "xalQPa_apiKeyInput",
			"apiKeyLabel": "xalQPa_apiKeyLabel",
			"apiKeyTitle": "xalQPa_apiKeyTitle",
			"close": "xalQPa_close",
			"content": "xalQPa_content",
			"description": "xalQPa_description",
			"dialog": "xalQPa_dialog",
			"header": "xalQPa_header",
			"link": "xalQPa_link",
			"primaryButton": "xalQPa_primaryButton",
			"secondaryButton": "xalQPa_secondaryButton",
			"spin": "xalQPa_spin",
			"spinner": "xalQPa_spinner",
			"title": "xalQPa_title"
		};
		//#endregion
		//#region lib/types/client/sign-in/X6SignInDialog.js
		/** X6 authorize dialog: OAuth only (no manual API Key path). */
		/** Blocking X6 authorize modal occupying `settings.models.sign-in`. */
		function X6SignInDialog(props) {
			const { complete, ctx, locale, entry = "onboarding" } = props;
			const t = quickSetupT(locale);
			const completedRef = (0, react.useRef)(false);
			const autoStartedRef = (0, react.useRef)(false);
			const [gate, setGate] = (0, react.useState)("checking");
			const [copyHint, setCopyHint] = (0, react.useState)(false);
			const finish = () => {
				if (completedRef.current) return;
				completedRef.current = true;
				complete();
			};
			const state = useQuickSetup({
				ctx,
				locale,
				onDone: () => {
					window.setTimeout(finish, 600);
				}
			});
			const busy = state.phase === "starting" || state.phase === "writing";
			const waiting = state.phase === "awaiting-approval";
			const error = state.phase === "error";
			const done = state.phase === "done";
			const reauth = gate === "reauth";
			const reauthPending = reauth && (state.phase === "idle" || state.phase === "starting");
			(0, react.useEffect)(() => {
				let cancelled = false;
				(async () => {
					let configured = false;
					try {
						configured = (await fetchWalletStatus()).connected;
					} catch {
						configured = false;
					}
					if (cancelled) return;
					if (!configured) {
						setGate("guide");
						return;
					}
					if (entry === "onboarding") {
						setGate("dismissed");
						finish();
						return;
					}
					setGate("reauth");
				})();
				return () => {
					cancelled = true;
				};
			}, [entry]);
			(0, react.useEffect)(() => {
				const appRoot = document.getElementById("root");
				if (appRoot === null) return;
				const previous = appRoot.inert;
				appRoot.inert = gate !== "dismissed" && gate !== "checking";
				return () => {
					appRoot.inert = previous;
				};
			}, [gate]);
			(0, react.useEffect)(() => {
				if (gate !== "reauth" || autoStartedRef.current) return;
				autoStartedRef.current = true;
				state.start();
			}, [gate, state.start]);
			(0, react.useEffect)(() => {
				if (!copyHint) return;
				const timer = window.setTimeout(() => setCopyHint(false), 2e3);
				return () => window.clearTimeout(timer);
			}, [copyHint]);
			const copyLink = async () => {
				const url = state.copyUrl ?? state.authorizeUrl;
				if (url === void 0) return;
				try {
					await navigator.clipboard.writeText(url);
					setCopyHint(true);
				} catch {}
			};
			if (gate === "checking" || gate === "dismissed") return null;
			const title = error ? t("error") : waiting || busy || reauthPending ? t("browserTitle") : done ? t("signInDone") : t("signInTitle");
			const description = waiting ? (0, react_jsx_runtime.jsxs)(react_jsx_runtime.Fragment, { children: [
				t("browserPrompt"),
				(0, react_jsx_runtime.jsx)("button", {
					type: "button",
					className: sign_in_module_css_default.link,
					disabled: (state.copyUrl ?? state.authorizeUrl) === void 0,
					onClick: () => {
						copyLink();
					},
					children: copyHint ? t("copiedLink") : t("copyLink")
				}),
				t("browserDescription")
			] }) : error && state.message !== void 0 ? state.message : done ? t("signInDone") : reauthPending ? t("awaiting") : t("signInDescription");
			return (0, react_jsx_runtime.jsxs)(_deepseek_ai_dsh_client_ui_primitives.Modal, {
				open: true,
				headless: true,
				title,
				onClose: finish,
				className: sign_in_module_css_default.dialog,
				children: [(0, react_jsx_runtime.jsxs)("div", {
					className: sign_in_module_css_default.content,
					children: [(0, react_jsx_runtime.jsxs)("div", {
						className: sign_in_module_css_default.header,
						children: [(0, react_jsx_runtime.jsx)("h2", {
							className: sign_in_module_css_default.title,
							children: title
						}), (0, react_jsx_runtime.jsx)("button", {
							type: "button",
							className: sign_in_module_css_default.close,
							"aria-label": t("close"),
							onClick: finish,
							children: (0, react_jsx_runtime.jsx)(_deepseek_ai_dsh_client_ui_primitives.IconCloseOutlineRegular, { size: 14 })
						})]
					}), (0, react_jsx_runtime.jsx)("p", {
						className: sign_in_module_css_default.description,
						children: description
					})]
				}), (0, react_jsx_runtime.jsxs)("div", {
					className: sign_in_module_css_default.actions,
					children: [(0, react_jsx_runtime.jsx)(_deepseek_ai_dsh_client_ui_primitives.Button, {
						variant: "outline",
						className: sign_in_module_css_default.secondaryButton,
						disabled: done || busy && !waiting,
						onClick: finish,
						children: waiting || reauth || busy ? t("cancel") : t("later")
					}), (0, react_jsx_runtime.jsx)(_deepseek_ai_dsh_client_ui_primitives.Button, {
						variant: "primary",
						className: sign_in_module_css_default.primaryButton,
						disabled: busy || waiting || done || reauthPending,
						"aria-label": waiting || reauthPending ? t("waiting") : void 0,
						onClick: () => {
							state.start();
						},
						children: waiting || busy || reauthPending ? (0, react_jsx_runtime.jsx)(_deepseek_ai_dsh_client_ui_primitives.IconLoadingOutlineRegular, { className: sign_in_module_css_default.spinner }) : error ? t("retry") : t("signIn")
					})]
				})]
			});
		}
		//#endregion
		//#region \0dsh-css:/Users/hivanpan/Hivan/project/ykl/project/Whale/x6/x6-harness-free/plugins/packages/core/dsh-plugin-x6-core/src/client/sign-in/account-launcher.module.css.mjs
		const css$2 = "._yvIYa_root{flex:1;min-width:0}._yvIYa_anchor{width:100%}._yvIYa_trigger{user-select:none;border-radius:var(--dsw-radius-md);width:100%;height:32px;color:var(--dsw-alias-label-primary);font:inherit;cursor:pointer;background:0 0;border:0;align-items:center;gap:8px;padding:6px 2px 6px 6px;font-size:14px;line-height:20px;display:flex}._yvIYa_trigger[data-collapsed=true]{box-sizing:border-box;justify-content:center;gap:0;width:36px;height:36px;padding:0}._yvIYa_trigger:hover{background:var(--dsw-alias-interactive-bg-hover)}._yvIYa_label{text-overflow:ellipsis;white-space:nowrap;overflow:hidden}._yvIYa_signedOutMenu[role=menu]{min-width:124px;max-width:280px;padding:4px}._yvIYa_signedOutMenu [role=menuitem]{border-radius:var(--dsw-radius-md);gap:8px;min-height:40px;padding:8px 10px;font-size:14px;line-height:22px}._yvIYa_signedOutMenu [role=menuitem]>span:first-child:not(:last-child){width:16px;height:16px;color:var(--dsw-alias-menu-icon)}._yvIYa_signedOutMenu [role=menuitem]>span:first-child:not(:last-child) svg{width:16px;height:16px}";
		const tagId$2 = "@x6_ai/dsh-plugin-x6-core/account-launcher.module.css";
		if (typeof document !== "undefined" && document.querySelector("style[data-plugin-css=" + JSON.stringify(tagId$2) + "]") === null) {
			const tag = document.createElement("style");
			tag.dataset.plugin = "@x6_ai/dsh-plugin-x6-core";
			tag.dataset.pluginCss = tagId$2;
			tag.textContent = css$2;
			document.head.appendChild(tag);
		}
		var account_launcher_module_css_default = {
			"anchor": "_yvIYa_anchor",
			"label": "_yvIYa_label",
			"root": "_yvIYa_root",
			"signedOutMenu": "_yvIYa_signedOutMenu",
			"trigger": "_yvIYa_trigger"
		};
		//#endregion
		//#region lib/types/client/sign-in/X6AccountLauncher.js
		/** Sidebar account launcher: authorize / re-authorize opens X6 OAuth dialog. */
		const launcherCopy = {
			"zh-CN": {
				more: "更多",
				menu: "账号菜单",
				settings: "设置",
				signIn: "登录授权",
				reauth: "重新授权"
			},
			"en-US": {
				more: "More",
				menu: "Account menu",
				settings: "Settings",
				signIn: "Authorize",
				reauth: "Re-authorize"
			}
		};
		/**
		* Signed-out-style launcher. Menu authorize item mounts {@link X6SignInDialog}
		* (avoids explicit `openOnboarding('deepseek-official')`, which skips the sign-in
		* slot and jumps to the official DeepSeek API-key editor).
		* Label switches to「重新授权」when an X6 API Key is already configured.
		*/
		function X6AccountLauncher(props) {
			const { ctx, wide, openSettings, settingsShortcut } = props;
			const locale = useClientLocale(ctx);
			const copy = locale?.startsWith("zh") ? launcherCopy["zh-CN"] : launcherCopy["en-US"];
			const trigger = (0, react.useRef)(null);
			const [open, setOpen] = (0, react.useState)(false);
			const [loginOpen, setLoginOpen] = (0, react.useState)(false);
			const [hasApiKey, setHasApiKey] = (0, react.useState)(false);
			const refreshApiKeyState = (0, react.useCallback)(async () => {
				try {
					const status = await fetchWalletStatus();
					setHasApiKey(status.connected);
				} catch {
					setHasApiKey(false);
				}
			}, []);
			(0, react.useEffect)(() => {
				refreshApiKeyState();
			}, [refreshApiKeyState]);
			const closeLogin = (0, react.useCallback)(() => {
				setLoginOpen(false);
				refreshApiKeyState();
			}, [refreshApiKeyState]);
			return (0, react_jsx_runtime.jsxs)("div", {
				className: account_launcher_module_css_default.root,
				children: [(0, react_jsx_runtime.jsx)(_deepseek_ai_dsh_client_ui_primitives.Menu, {
					open,
					side: "top",
					portal: true,
					autoFocus: true,
					className: account_launcher_module_css_default.anchor,
					listClassName: account_launcher_module_css_default.signedOutMenu,
					anchor: (0, react_jsx_runtime.jsxs)("button", {
						ref: trigger,
						type: "button",
						className: account_launcher_module_css_default.trigger,
						"data-collapsed": !wide,
						"data-signed-out": "true",
						"aria-label": copy.menu,
						"aria-haspopup": "menu",
						"aria-expanded": open,
						onClick: () => {
							refreshApiKeyState();
							setOpen((value) => !value);
						},
						children: [(0, react_jsx_runtime.jsx)(_deepseek_ai_dsh_client_ui_primitives.IconEllipsisOutlineMedium, { size: 14 }), wide && (0, react_jsx_runtime.jsx)("span", {
							className: account_launcher_module_css_default.label,
							children: copy.more
						})]
					}),
					items: [{
						id: "settings",
						label: copy.settings,
						icon: (0, react_jsx_runtime.jsx)(_deepseek_ai_dsh_client_ui_primitives.IconSettingsOutlineMedium, { size: 16 }),
						...settingsShortcut === void 0 ? {} : { shortcut: settingsShortcut }
					}, {
						id: "signin",
						label: hasApiKey ? copy.reauth : copy.signIn,
						icon: (0, react_jsx_runtime.jsx)(_deepseek_ai_dsh_client_ui_primitives.IconUserOutlineMedium, { size: 16 })
					}],
					onClose: () => {
						setOpen(false);
					},
					onSelect: (id) => {
						setOpen(false);
						if (id === "settings") {
							trigger.current?.focus();
							openSettings();
							return;
						}
						if (id === "signin") setLoginOpen(true);
					}
				}), loginOpen && (0, react_jsx_runtime.jsx)(X6SignInDialog, {
					ctx,
					locale,
					complete: closeLogin,
					useApiKey: closeLogin,
					entry: "menu"
				})]
			});
		}
		//#endregion
		//#region lib/types/client/sign-in/index.js
		/** Onboarding step body: always X6 dialog (never official DeepSeek account / API-key editor). */
		function X6OnboardingStep(props) {
			const locale = useClientLocale(props.ctx);
			return (0, react_jsx_runtime.jsx)(X6SignInDialog, {
				ctx: props.ctx,
				locale,
				complete: props.complete,
				useApiKey: props.complete,
				entry: "onboarding"
			});
		}
		/** Register sign-in slot, onboarding step, and launcher so every「登录」opens X6. */
		function registerSignIn(ctx) {
			ctx.slots.inject("settings.models.sign-in", () => ctx.slots.register({
				name: "settings.models.sign-in",
				priority: -1,
				registrant: "@x6_ai/dsh-plugin-x6-core"
			}, (owner) => (0, react_jsx_runtime.jsx)(X6SignInDialog, {
				ctx,
				locale: ctx.locale.getSnapshot().active,
				complete: owner.complete,
				useApiKey: owner.useApiKey,
				entry: "onboarding"
			})));
			ctx.slots.inject("settings.onboarding", () => ctx.slots.register({
				name: "settings.onboarding",
				id: "deepseek-official",
				priority: -1,
				order: 0,
				registrant: "@x6_ai/dsh-plugin-x6-core"
			}, (owner) => (0, react_jsx_runtime.jsx)(X6OnboardingStep, {
				ctx,
				complete: owner.complete
			})));
			ctx.slots.inject("settings.launcher", () => ctx.slots.register({
				name: "settings.launcher",
				priority: -1,
				registrant: "@x6_ai/dsh-plugin-x6-core"
			}, (owner) => (0, react_jsx_runtime.jsx)(X6AccountLauncher, {
				ctx,
				...owner
			})));
		}
		//#endregion
		//#region lib/types/client/skill-market/panel-id.js
		const PANEL_ID = "x6-apps";
		//#endregion
		//#region lib/types/shared/official-site.js
		/** X6 official marketing site. */
		/** Production official site (x6 develop). */
		const OFFICIAL_SITE = "https://x6.ai";
		/**
		* Official site base. Dual-line .ai/.io selection removed for single-domain deploy.
		*/
		function resolveOfficialSiteBase(_options = {}) {
			return OFFICIAL_SITE;
		}
		/**
		* Official site URL with locale path (`/zh` or `/en`), matching official site routing.
		*/
		function buildOfficialSiteUrl(options = {}) {
			return `${resolveOfficialSiteBase(options)}/${options.locale?.toLowerCase().startsWith("zh") ? "zh" : "en"}`;
		}
		//#endregion
		//#region \0dsh-css:/Users/hivanpan/Hivan/project/ykl/project/Whale/x6/x6-harness-free/plugins/packages/core/dsh-plugin-x6-core/src/client/skill-market/skill-market.module.css.mjs
		const css$1 = ".npMSOa_page{box-sizing:border-box;background:var(--dsw-alias-bg-layer-2);flex-direction:column;width:100%;height:100%;min-height:0;display:flex;position:relative;overflow:hidden}.npMSOa_layer{flex:none;align-items:center;width:100%;display:flex;position:relative}.npMSOa_trigger{box-sizing:border-box;cursor:pointer;width:calc(100% + 4px);height:42px;color:var(--dsw-alias-label-primary);background:0 0;border:none;border-radius:12px;flex:none;align-items:center;gap:8px;margin:4px -2px;padding:0 10px 0 8px;font-family:inherit;font-size:14px;line-height:22px;display:flex;overflow:hidden}.npMSOa_trigger:hover{background:var(--dsw-alias-interactive-bg-hover)}.npMSOa_trigger.npMSOa_rail{border-radius:50%;justify-content:center;gap:0;width:36px;height:36px;margin:8px 0 10px;padding:0}.npMSOa_triggerLabel{white-space:nowrap;overflow:hidden}.npMSOa_overlay{z-index:1000;justify-content:center;align-items:center;display:flex;position:fixed;inset:0}.npMSOa_mask{background:var(--dsw-alias-bg-mask-1);backdrop-filter:var(--dsw-mask-blur);position:absolute;inset:0}.npMSOa_panel{z-index:1;background:var(--dsw-alias-bg-layer-2);width:min(1200px,100vw - 32px);height:min(880px,100vh - 32px);box-shadow:var(--dsw-shadow-lv3);border-radius:24px;flex-direction:column;display:flex;position:relative;overflow:hidden}.npMSOa_header{border-bottom:1px solid var(--dsw-alias-border-l2);justify-content:space-between;align-items:flex-start;gap:16px;padding:20px 24px 12px;display:flex}.npMSOa_titleBlock{min-width:0}.npMSOa_title{margin:0;font-size:20px;font-weight:500;line-height:28px}.npMSOa_subtitle{color:var(--dsw-alias-label-secondary);margin:4px 0 0;font-size:13px;line-height:20px}.npMSOa_headerActions{flex:none;align-items:center;gap:8px;display:flex}.npMSOa_headerLink{border:1px solid var(--dsw-alias-border-l2);height:32px;color:var(--dsw-alias-label-primary);white-space:nowrap;border-radius:8px;align-items:center;padding:0 10px;font-size:13px;font-weight:500;line-height:20px;text-decoration:none;display:inline-flex}.npMSOa_headerLink:hover{background:var(--dsw-alias-interactive-bg-hover)}.npMSOa_closeButton{width:32px;height:32px;color:var(--dsw-alias-label-secondary);cursor:pointer;background:0 0;border:none;border-radius:8px;flex:none;justify-content:center;align-items:center;display:inline-flex}.npMSOa_closeButton:hover{background:var(--dsw-alias-interactive-bg-hover);color:var(--dsw-alias-label-primary)}.npMSOa_tabBar{flex:none;align-items:center;padding:0 0 12px;display:flex}.npMSOa_segmentGroup{border:1px solid var(--dsw-alias-border-l2);background:var(--dsw-alias-bg-layer-1);border-radius:10px;align-items:center;gap:2px;padding:3px;display:inline-flex}.npMSOa_segmentGroupEnd{margin-left:auto}.npMSOa_segmentButton{background:var(--dsw-alias-interactive-bg-hover);min-width:72px;height:32px;color:var(--dsw-alias-label-secondary);font:inherit;cursor:pointer;border:none;border-radius:7px;padding:0 14px;font-size:13px;font-weight:400;line-height:20px;transition:background .15s,color .15s,box-shadow .15s}.npMSOa_segmentButton:hover{color:var(--dsw-alias-label-primary);background:var(--dsw-alias-interactive-bg-hover)}.npMSOa_segmentButtonActive{background:var(--dsw-alias-bg-layer-2);min-width:72px;height:32px;color:var(--dsw-alias-label-primary);font:inherit;cursor:pointer;border:none;border-radius:7px;padding:0 14px;font-size:13px;font-weight:500;line-height:20px;transition:background .15s,color .15s,box-shadow .15s;box-shadow:0 1px 2px #00000014}.npMSOa_segmentButtonCompact{min-width:52px}.npMSOa_segmentButtonIcon{justify-content:center;align-items:center;width:32px;min-width:32px;padding:0;display:inline-flex}.npMSOa_body{flex-direction:column;flex:1;min-height:0;padding:0;display:flex;overflow:hidden}.npMSOa_bodyLayout{border-top:1px solid var(--dsw-alias-border-l2);flex:1;min-height:0;display:flex;overflow:hidden}.npMSOa_categorySidebar{border-right:1px solid var(--dsw-alias-border-l2);background:var(--dsw-alias-bg-layer-1);flex-direction:column;flex:none;width:168px;min-height:0;transition:width .2s;display:flex}.npMSOa_categorySidebarCollapsed{width:40px}.npMSOa_categorySidebarHead{box-sizing:border-box;flex:none;justify-content:space-between;align-items:center;gap:6px;min-height:48px;padding:12px 12px 8px;display:flex}.npMSOa_categorySidebarCollapsed .npMSOa_categorySidebarHead{justify-content:center;padding:12px 6px 8px}.npMSOa_categorySidebarTitle{min-width:0;color:var(--dsw-alias-label-secondary);white-space:nowrap;text-overflow:ellipsis;flex:1;font-size:14px;font-weight:500;line-height:22px;overflow:hidden}.npMSOa_categoryNav{scrollbar-width:thin;flex-direction:column;flex:1;gap:4px;min-height:0;padding:0 10px 12px;display:flex;overflow:hidden auto}.npMSOa_categoryNavItem{width:100%;color:var(--dsw-alias-label-secondary);font:inherit;text-align:left;cursor:pointer;appearance:none;box-sizing:border-box;background:0 0;border:none;border-radius:10px;margin:0;padding:8px 12px;font-size:13px;font-weight:400;line-height:20px;transition:background .15s,color .15s;display:block;position:relative}.npMSOa_categoryNavItem:hover{background:var(--dsw-alias-interactive-bg-hover);color:var(--dsw-alias-label-primary)}.npMSOa_categoryNavItem:focus{outline:none}.npMSOa_categoryNavItem:focus-visible{box-shadow:0 0 0 2px #1212f938}.npMSOa_categoryNavItemActive{color:var(--dsw-alias-label-primary);background:#1212f914;font-weight:500}.npMSOa_categoryNavItemActive:before{content:\"\";background:var(--dsw-alias-interactive-bg-accent,#1212f9);border-radius:999px;width:3px;height:18px;position:absolute;top:50%;left:4px;transform:translateY(-50%)}.npMSOa_sidebarToggle{border:1px solid var(--dsw-alias-border-l2);background:var(--dsw-alias-bg-layer-2);width:28px;height:28px;color:var(--dsw-alias-label-secondary);font:inherit;cursor:pointer;appearance:none;border-radius:8px;flex:none;justify-content:center;align-items:center;margin:0;padding:0;font-size:16px;line-height:1;display:inline-flex}.npMSOa_sidebarToggle:focus{outline:none}.npMSOa_sidebarToggle:focus-visible{box-shadow:0 0 0 2px #1212f938}.npMSOa_sidebarToggle:hover{color:var(--dsw-alias-label-primary);background:var(--dsw-alias-interactive-bg-hover)}.npMSOa_mainContent{flex-direction:column;flex:1;gap:12px;min-width:0;min-height:0;padding:12px 20px 0;display:flex;overflow:hidden}.npMSOa_toolbar{border-top:none;flex-wrap:wrap;flex:none;align-items:center;gap:8px;padding-top:0;display:flex}.npMSOa_gridScroll{flex:1;min-height:0;padding-right:4px;overflow-y:auto}.npMSOa_grid{gap:14px;display:grid}.npMSOa_gridCols3{grid-template-columns:repeat(3,minmax(0,1fr));align-items:stretch}.npMSOa_cardGrid{height:100%}.npMSOa_gridCols1{grid-template-columns:minmax(0,1fr)}.npMSOa_card{border:1px solid var(--dsw-alias-border-l2);background:var(--dsw-alias-bg-layer-1);border-radius:14px;flex-direction:column;gap:0;min-width:0;display:flex;overflow:hidden}.npMSOa_cardBody{flex-direction:column;flex:auto;gap:8px;min-height:0;padding:14px 14px 10px;display:flex}.npMSOa_cardHead{align-items:flex-start;gap:8px;display:flex}.npMSOa_cardHeadText{flex:1;min-width:0}.npMSOa_cardIcon,.npMSOa_cardIconFallback{border-radius:10px;flex:none;width:36px;height:36px}.npMSOa_cardIcon{object-fit:cover}.npMSOa_cardIconFallback{background:var(--dsw-alias-interactive-bg-hover);color:var(--dsw-alias-label-secondary);justify-content:center;align-items:center;display:inline-flex}.npMSOa_cardFooter{border-top:1px solid var(--dsw-alias-border-l2);background:var(--dsw-alias-interactive-bg-hover);flex-wrap:wrap;align-items:center;gap:8px;margin-top:auto;padding:10px 14px;display:flex}.npMSOa_cardRow{flex-direction:row;align-items:stretch;gap:0;padding:14px}.npMSOa_cardList{flex-direction:column;gap:10px;padding:14px;display:flex}.npMSOa_cardListTop{justify-content:space-between;align-items:flex-start;gap:12px;display:flex}.npMSOa_cardListLead{flex:auto;align-items:flex-start;gap:10px;min-width:0;display:flex}.npMSOa_cardListText{flex-direction:column;flex:auto;align-items:flex-start;gap:6px;min-width:0;display:flex}.npMSOa_cardListText .npMSOa_cardTitleRow{justify-content:flex-start;width:100%}.npMSOa_cardListLead .npMSOa_cardTitle{text-overflow:ellipsis;white-space:nowrap;flex:0 auto;overflow:hidden}.npMSOa_cardCodeInline,.npMSOa_cardCodeList{color:var(--dsw-alias-label-tertiary);margin:0;font-size:12px;line-height:18px}.npMSOa_cardCodeInline{text-overflow:ellipsis;white-space:nowrap;flex:0 auto;overflow:hidden}.npMSOa_cardCodeList{overflow-wrap:anywhere;word-break:break-word;white-space:normal;max-width:100%}.npMSOa_cardListLead .npMSOa_cardMeta{flex-wrap:wrap;flex:0 auto}.npMSOa_cardListActions{background:0 0;border-top:none;flex-wrap:nowrap;flex:none;justify-content:flex-end;align-items:center;gap:8px;margin:0;padding:0;display:flex}.npMSOa_cardListMain{flex-direction:column;flex:1;gap:8px;min-width:0;padding-right:16px;display:flex}.npMSOa_cardListAside{flex:none;align-items:flex-end;margin-left:auto;padding-left:16px;display:flex}.npMSOa_cardListAside .npMSOa_cardFooter{background:0 0;border-top:none;justify-content:flex-end;margin-top:0;padding:0}.npMSOa_searchInput{border:1px solid var(--dsw-alias-border-l2);background:var(--dsw-alias-bg-layer-1);min-width:180px;height:36px;color:inherit;font:inherit;border-radius:10px;flex:1;padding:0 12px;font-size:13px;line-height:20px}.npMSOa_select{border:1px solid var(--dsw-alias-border-l2);background:var(--dsw-alias-bg-layer-1);height:36px;color:inherit;font:inherit;border-radius:10px;padding:0 10px;font-size:13px;line-height:20px}.npMSOa_button{background:var(--dsw-alias-interactive-bg-accent);height:36px;color:var(--dsw-alias-label-on-accent);font:inherit;cursor:pointer;border:none;border-radius:10px;padding:0 14px;font-size:13px;font-weight:500;line-height:20px}.npMSOa_buttonSecondary{border:1px solid var(--dsw-alias-border-l2);height:36px;color:inherit;font:inherit;cursor:pointer;background:0 0;border-radius:10px;padding:0 14px;font-size:13px;font-weight:500;line-height:20px}.npMSOa_buttonSecondary:hover{background:var(--dsw-alias-interactive-bg-hover)}.npMSOa_button:disabled,.npMSOa_buttonSecondary:disabled{opacity:.55;cursor:not-allowed}.npMSOa_alertError{color:#c41e3a;background:#c41e3a14;border-radius:10px;margin:0;padding:10px 12px;font-size:13px;line-height:20px}.npMSOa_alertSuccess{color:var(--dsw-alias-label-primary);background:#1212f914;border-radius:10px;margin:0;padding:10px 12px;font-size:13px;line-height:20px}.npMSOa_cardTitle{margin:0;font-size:14px;font-weight:500;line-height:20px}.npMSOa_cardTitleRow{justify-content:space-between;align-items:flex-start;gap:8px;min-width:0;display:flex}.npMSOa_cardTitleRow .npMSOa_cardTitle{flex:auto;min-width:0}.npMSOa_cardMeta{flex-wrap:wrap;gap:6px;display:flex}.npMSOa_badge{border:1px solid #0000;border-radius:999px;align-items:center;padding:2px 8px;font-size:12px;font-weight:500;line-height:18px;display:inline-flex}.npMSOa_badgeSourceX6{color:#1212f9;background:#1212f91a;border-color:#1212f92e}.npMSOa_badgeSourceCommunity{color:#6d28d9;background:#7c3aed1a;border-color:#7c3aed2e}.npMSOa_badgeLayerCore{color:#b45309;background:#d977061a;border-color:#d9770633}.npMSOa_badgeLayerFeature{color:#047857;background:#0596691a;border-color:#0596692e}.npMSOa_badgeUpgrade{color:#c2410c;background:#ea580c1f;border-color:#ea580c38}.npMSOa_badgeVersion{border-color:var(--dsw-alias-border-l2);background:var(--dsw-alias-interactive-bg-hover);color:var(--dsw-alias-label-secondary);flex:none;font-family:ui-monospace,SFMono-Regular,Menlo,Monaco,Consolas,monospace;font-size:11px;line-height:16px}.npMSOa_badgeDisabled{color:#64748b;background:#64748b1f;border-color:#64748b38}.npMSOa_cardDisabled{opacity:.72}.npMSOa_cardDisabled .npMSOa_cardTitle,.npMSOa_cardDisabled .npMSOa_cardDesc,.npMSOa_cardDisabled .npMSOa_cardDescList{color:var(--dsw-alias-label-tertiary)}.npMSOa_toggleRow{align-items:center;gap:8px;margin-right:4px;display:inline-flex}.npMSOa_toggleLabel{color:var(--dsw-alias-label-secondary);user-select:none;font-size:12px;line-height:18px}.npMSOa_toggleSwitch{flex:none;align-items:center;width:36px;height:20px;display:inline-flex;position:relative}.npMSOa_toggleSwitch input{opacity:0;cursor:pointer;width:100%;height:100%;margin:0;position:absolute;inset:0}.npMSOa_toggleSwitch input:disabled{cursor:not-allowed}.npMSOa_toggleTrack{background:var(--dsw-alias-border-l2);border-radius:999px;width:100%;height:100%;transition:background .15s;display:block}.npMSOa_toggleSwitch input:checked+.npMSOa_toggleTrack{background:#22c55e}.npMSOa_toggleRowEnabled .npMSOa_toggleLabel{color:#16a34a}.npMSOa_toggleThumb{pointer-events:none;background:#fff;border-radius:50%;width:16px;height:16px;transition:transform .15s;position:absolute;top:2px;left:2px;box-shadow:0 1px 2px #0000002e}.npMSOa_toggleSwitch input:checked~.npMSOa_toggleThumb{transform:translate(16px)}.npMSOa_toggleSwitch input:disabled~.npMSOa_toggleThumb{opacity:.7}.npMSOa_cardDesc{min-height:3rem;max-height:7.75rem;color:var(--dsw-alias-label-tertiary);white-space:pre-wrap;overflow-wrap:anywhere;scrollbar-width:thin;flex:auto;margin:0;font-size:13px;line-height:18px;overflow:hidden auto}.npMSOa_cardDescList{width:100%;max-height:6rem;color:var(--dsw-alias-label-tertiary);white-space:pre-wrap;overflow-wrap:anywhere;scrollbar-width:thin;margin:0;font-size:13px;line-height:18px;overflow:hidden auto}.npMSOa_cardCode{color:var(--dsw-alias-label-tertiary);text-overflow:ellipsis;white-space:nowrap;margin:4px 0 0;font-size:12px;line-height:18px;overflow:hidden}.npMSOa_cardFooter .npMSOa_buttonSm,.npMSOa_buttonSm{background:var(--dsw-alias-interactive-bg-accent);height:28px;color:var(--dsw-alias-label-on-accent);font:inherit;cursor:pointer;border:none;border-radius:8px;padding:0 10px;font-size:12px;font-weight:500;line-height:18px}.npMSOa_cardFooter .npMSOa_buttonSm:disabled,.npMSOa_buttonSm:disabled{opacity:.55;cursor:not-allowed}.npMSOa_buttonSmDanger{color:#c41e3a;height:28px;font:inherit;cursor:pointer;background:#c41e3a14;border:1px solid #c41e3a59;border-radius:8px;padding:0 10px;font-size:12px;font-weight:500;line-height:18px}.npMSOa_buttonSmDanger:disabled{opacity:.55;cursor:not-allowed}.npMSOa_buttonDanger{color:#c41e3a;height:36px;font:inherit;cursor:pointer;background:#c41e3a1a;border:1px solid #c41e3a59;border-radius:10px;padding:0 14px;font-size:13px;font-weight:500;line-height:20px}.npMSOa_buttonDanger:disabled{opacity:.55;cursor:not-allowed}.npMSOa_linkButtonOutline{border:1px solid var(--dsw-alias-border-l2);height:28px;color:inherit;white-space:nowrap;background:0 0;border-radius:8px;justify-content:center;align-items:center;padding:0 10px;font-size:12px;line-height:18px;text-decoration:none;display:inline-flex}.npMSOa_linkButtonOutline:hover{background:var(--dsw-alias-bg-layer-2)}.npMSOa_linkButtonGhost{height:28px;color:inherit;white-space:nowrap;background:0 0;border:none;border-radius:8px;justify-content:center;align-items:center;padding:0 10px;font-size:12px;line-height:18px;text-decoration:none;display:inline-flex}.npMSOa_linkButtonGhost:hover{background:var(--dsw-alias-bg-layer-2)}.npMSOa_empty,.npMSOa_loading{text-align:center;color:var(--dsw-alias-label-tertiary);margin:0;padding:24px 0;font-size:13px;line-height:20px}.npMSOa_footer{flex:none;justify-content:center;padding:4px 0 20px;display:flex}.npMSOa_installOverlay{z-index:1100;background:var(--dsw-alias-bg-mask-1);backdrop-filter:var(--dsw-mask-blur);justify-content:center;align-items:center;padding:16px;display:flex;position:fixed;inset:0}.npMSOa_installDialog{background:var(--dsw-alias-bg-layer-2);width:min(760px,100vw - 48px);max-height:min(85vh,720px);box-shadow:var(--dsw-shadow-lv3);border-radius:16px;flex-direction:column;gap:12px;padding:20px;display:flex}.npMSOa_installDialogTitle{margin:0;font-size:16px;font-weight:500;line-height:24px}.npMSOa_installSummary{background:var(--dsw-alias-bg-layer-1);border-radius:10px;gap:8px;margin:0;padding:10px 12px;font-size:13px;line-height:20px;display:grid}.npMSOa_installSummary>div{align-items:baseline;gap:8px;display:flex}.npMSOa_installSummary dt{min-width:3.5rem;color:var(--dsw-alias-label-secondary);margin:0;font-weight:500}.npMSOa_installSummary dd{overflow-wrap:anywhere;flex:1;margin:0}.npMSOa_installDialogStatus{color:var(--dsw-alias-label-secondary);margin:0;font-size:13px;line-height:20px}.npMSOa_installLogToggle{color:var(--dsw-alias-label-accent);font:inherit;cursor:pointer;text-underline-offset:2px;background:0 0;border:none;align-self:flex-start;padding:0;font-size:13px;text-decoration:underline}.npMSOa_installLog{color:#e8e8e8;white-space:pre-wrap;overflow-wrap:anywhere;scrollbar-width:thin;background:#1a1a1a;border-radius:10px;flex:auto;min-height:140px;max-height:360px;margin:0;padding:10px 12px;font-family:ui-monospace,SFMono-Regular,Menlo,Monaco,Consolas,monospace;font-size:11px;line-height:1.45;overflow:auto}.npMSOa_installDialogActions{flex-wrap:wrap;justify-content:flex-end;gap:8px;display:flex}.npMSOa_installDialogHint{color:var(--dsw-alias-label-tertiary);margin:0;font-size:12px;line-height:18px}.npMSOa_confirmOverlay{z-index:1201;background:var(--dsw-alias-bg-mask-1);backdrop-filter:var(--dsw-mask-blur);justify-content:center;align-items:center;padding:16px;display:flex;position:fixed;inset:0}.npMSOa_confirmDialog{background:var(--dsw-alias-bg-layer-2);width:min(420px,100vw - 48px);box-shadow:var(--dsw-shadow-lv3);border-radius:14px;flex-direction:column;gap:12px;padding:20px;display:flex}.npMSOa_confirmDialogTitle{margin:0;font-size:16px;font-weight:500;line-height:24px}.npMSOa_confirmDialogMessage{color:var(--dsw-alias-label-secondary);margin:0;font-size:13px;line-height:20px}.npMSOa_confirmDialogActions{flex-wrap:wrap;justify-content:flex-end;gap:8px;padding-top:4px;display:flex}";
		const tagId$1 = "@x6_ai/dsh-plugin-x6-core/skill-market.module.css";
		if (typeof document !== "undefined" && document.querySelector("style[data-plugin-css=" + JSON.stringify(tagId$1) + "]") === null) {
			const tag = document.createElement("style");
			tag.dataset.plugin = "@x6_ai/dsh-plugin-x6-core";
			tag.dataset.pluginCss = tagId$1;
			tag.textContent = css$1;
			document.head.appendChild(tag);
		}
		var skill_market_module_css_default = {
			"alertError": "npMSOa_alertError",
			"alertSuccess": "npMSOa_alertSuccess",
			"badge": "npMSOa_badge",
			"badgeDisabled": "npMSOa_badgeDisabled",
			"badgeLayerCore": "npMSOa_badgeLayerCore",
			"badgeLayerFeature": "npMSOa_badgeLayerFeature",
			"badgeSourceCommunity": "npMSOa_badgeSourceCommunity",
			"badgeSourceX6": "npMSOa_badgeSourceX6",
			"badgeUpgrade": "npMSOa_badgeUpgrade",
			"badgeVersion": "npMSOa_badgeVersion",
			"body": "npMSOa_body",
			"bodyLayout": "npMSOa_bodyLayout",
			"button": "npMSOa_button",
			"buttonDanger": "npMSOa_buttonDanger",
			"buttonSecondary": "npMSOa_buttonSecondary",
			"buttonSm": "npMSOa_buttonSm",
			"buttonSmDanger": "npMSOa_buttonSmDanger",
			"card": "npMSOa_card",
			"cardBody": "npMSOa_cardBody",
			"cardCode": "npMSOa_cardCode",
			"cardCodeInline": "npMSOa_cardCodeInline",
			"cardCodeList": "npMSOa_cardCodeList",
			"cardDesc": "npMSOa_cardDesc",
			"cardDescList": "npMSOa_cardDescList",
			"cardDisabled": "npMSOa_cardDisabled",
			"cardFooter": "npMSOa_cardFooter",
			"cardGrid": "npMSOa_cardGrid",
			"cardHead": "npMSOa_cardHead",
			"cardHeadText": "npMSOa_cardHeadText",
			"cardIcon": "npMSOa_cardIcon",
			"cardIconFallback": "npMSOa_cardIconFallback",
			"cardList": "npMSOa_cardList",
			"cardListActions": "npMSOa_cardListActions",
			"cardListAside": "npMSOa_cardListAside",
			"cardListLead": "npMSOa_cardListLead",
			"cardListMain": "npMSOa_cardListMain",
			"cardListText": "npMSOa_cardListText",
			"cardListTop": "npMSOa_cardListTop",
			"cardMeta": "npMSOa_cardMeta",
			"cardRow": "npMSOa_cardRow",
			"cardTitle": "npMSOa_cardTitle",
			"cardTitleRow": "npMSOa_cardTitleRow",
			"categoryNav": "npMSOa_categoryNav",
			"categoryNavItem": "npMSOa_categoryNavItem",
			"categoryNavItemActive": "npMSOa_categoryNavItemActive",
			"categorySidebar": "npMSOa_categorySidebar",
			"categorySidebarCollapsed": "npMSOa_categorySidebarCollapsed",
			"categorySidebarHead": "npMSOa_categorySidebarHead",
			"categorySidebarTitle": "npMSOa_categorySidebarTitle",
			"closeButton": "npMSOa_closeButton",
			"confirmDialog": "npMSOa_confirmDialog",
			"confirmDialogActions": "npMSOa_confirmDialogActions",
			"confirmDialogMessage": "npMSOa_confirmDialogMessage",
			"confirmDialogTitle": "npMSOa_confirmDialogTitle",
			"confirmOverlay": "npMSOa_confirmOverlay",
			"empty": "npMSOa_empty",
			"footer": "npMSOa_footer",
			"grid": "npMSOa_grid",
			"gridCols1": "npMSOa_gridCols1",
			"gridCols3": "npMSOa_gridCols3",
			"gridScroll": "npMSOa_gridScroll",
			"header": "npMSOa_header",
			"headerActions": "npMSOa_headerActions",
			"headerLink": "npMSOa_headerLink",
			"installDialog": "npMSOa_installDialog",
			"installDialogActions": "npMSOa_installDialogActions",
			"installDialogHint": "npMSOa_installDialogHint",
			"installDialogStatus": "npMSOa_installDialogStatus",
			"installDialogTitle": "npMSOa_installDialogTitle",
			"installLog": "npMSOa_installLog",
			"installLogToggle": "npMSOa_installLogToggle",
			"installOverlay": "npMSOa_installOverlay",
			"installSummary": "npMSOa_installSummary",
			"layer": "npMSOa_layer",
			"linkButtonGhost": "npMSOa_linkButtonGhost",
			"linkButtonOutline": "npMSOa_linkButtonOutline",
			"loading": "npMSOa_loading",
			"mainContent": "npMSOa_mainContent",
			"mask": "npMSOa_mask",
			"overlay": "npMSOa_overlay",
			"page": "npMSOa_page",
			"panel": "npMSOa_panel",
			"rail": "npMSOa_rail",
			"searchInput": "npMSOa_searchInput",
			"segmentButton": "npMSOa_segmentButton",
			"segmentButtonActive": "npMSOa_segmentButtonActive",
			"segmentButtonCompact": "npMSOa_segmentButtonCompact",
			"segmentButtonIcon": "npMSOa_segmentButtonIcon",
			"segmentGroup": "npMSOa_segmentGroup",
			"segmentGroupEnd": "npMSOa_segmentGroupEnd",
			"select": "npMSOa_select",
			"sidebarToggle": "npMSOa_sidebarToggle",
			"subtitle": "npMSOa_subtitle",
			"tabBar": "npMSOa_tabBar",
			"title": "npMSOa_title",
			"titleBlock": "npMSOa_titleBlock",
			"toggleLabel": "npMSOa_toggleLabel",
			"toggleRow": "npMSOa_toggleRow",
			"toggleRowEnabled": "npMSOa_toggleRowEnabled",
			"toggleSwitch": "npMSOa_toggleSwitch",
			"toggleThumb": "npMSOa_toggleThumb",
			"toggleTrack": "npMSOa_toggleTrack",
			"toolbar": "npMSOa_toolbar",
			"trigger": "npMSOa_trigger",
			"triggerLabel": "npMSOa_triggerLabel"
		};
		//#endregion
		//#region lib/types/client/skill-market/PluginListingIcon.js
		function PluginListingIcon({ url, name }) {
			const [failed, setFailed] = (0, react.useState)(false);
			const iconUrl = url?.trim();
			if (iconUrl === void 0 || iconUrl.length === 0 || failed) return (0, react_jsx_runtime.jsx)("span", {
				className: skill_market_module_css_default.cardIconFallback,
				"aria-hidden": true,
				children: (0, react_jsx_runtime.jsxs)("svg", {
					viewBox: "0 0 24 24",
					width: "16",
					height: "16",
					fill: "none",
					stroke: "currentColor",
					strokeWidth: "2",
					children: [
						(0, react_jsx_runtime.jsx)("path", { d: "M12 2 2 7l10 5 10-5-10-5Z" }),
						(0, react_jsx_runtime.jsx)("path", { d: "m2 17 10 5 10-5" }),
						(0, react_jsx_runtime.jsx)("path", { d: "m2 12 10 5 10-5" })
					]
				})
			});
			return (0, react_jsx_runtime.jsx)("img", {
				src: iconUrl,
				alt: name,
				className: skill_market_module_css_default.cardIcon,
				onError: () => {
					setFailed(true);
				}
			});
		}
		//#endregion
		//#region lib/types/client/skill-market/ListingCard.js
		function PluginToggleSwitch({ item, state }) {
			const { t, togglingPackage, isOperating, hasOperationModal, canToggle, getToggleStatus, onToggle } = state;
			const toggleStatus = getToggleStatus(item);
			if (!canToggle(item) || (toggleStatus?.row_ids?.length ?? 0) === 0) return null;
			const enabled = toggleStatus?.enabled !== false;
			const busy = togglingPackage === item.package_name || isOperating || hasOperationModal;
			return (0, react_jsx_runtime.jsxs)("label", {
				className: `${skill_market_module_css_default.toggleRow}${enabled ? ` ${skill_market_module_css_default.toggleRowEnabled}` : ""}`,
				title: enabled ? t("pluginEnabled") : t("pluginDisabled"),
				children: [(0, react_jsx_runtime.jsx)("span", {
					className: skill_market_module_css_default.toggleLabel,
					children: enabled ? t("pluginEnabled") : t("pluginDisabled")
				}), (0, react_jsx_runtime.jsxs)("span", {
					className: skill_market_module_css_default.toggleSwitch,
					children: [
						(0, react_jsx_runtime.jsx)("input", {
							type: "checkbox",
							checked: enabled,
							disabled: busy,
							"aria-label": enabled ? t("toggleDisable") : t("toggleEnable"),
							onChange: (event) => {
								onToggle(item, event.target.checked);
							}
						}),
						(0, react_jsx_runtime.jsx)("span", {
							className: skill_market_module_css_default.toggleTrack,
							"aria-hidden": "true"
						}),
						(0, react_jsx_runtime.jsx)("span", {
							className: skill_market_module_css_default.toggleThumb,
							"aria-hidden": "true"
						})
					]
				})]
			});
		}
		function CardActions({ item, state, docs, homepage, className }) {
			const { t, installingCode, uninstallingCode, isOperating, hasOperationModal, isInstalled, canUninstall, getUpgradeStatus, onInstall, onUpgrade, onUninstall } = state;
			const installed = isInstalled(item);
			const upgradeStatus = getUpgradeStatus(item);
			const upgradeable = installed && upgradeStatus?.upgradeable === true;
			const installBusy = installingCode === item.install_code;
			const uninstallBusy = uninstallingCode === item.install_code;
			const operationBusy = isOperating || hasOperationModal;
			const showUninstall = installed && canUninstall(item);
			return (0, react_jsx_runtime.jsxs)("div", {
				className: className ?? skill_market_module_css_default.cardFooter,
				children: [
					installed ? (0, react_jsx_runtime.jsx)(PluginToggleSwitch, {
						item,
						state
					}) : null,
					upgradeable ? (0, react_jsx_runtime.jsx)("button", {
						type: "button",
						className: skill_market_module_css_default.buttonSm,
						disabled: operationBusy,
						onClick: () => {
							onUpgrade(item);
						},
						children: installBusy ? t("upgrading") : upgradeStatus?.listing_version !== null && upgradeStatus?.listing_version !== void 0 ? t("upgradeTo").replace("{version}", upgradeStatus.listing_version) : item.version !== void 0 && item.version !== null && item.version.length > 0 ? t("upgradeTo").replace("{version}", item.version) : t("upgrade")
					}) : null,
					showUninstall ? (0, react_jsx_runtime.jsx)("button", {
						type: "button",
						className: skill_market_module_css_default.buttonSmDanger,
						disabled: operationBusy,
						onClick: () => {
							onUninstall(item);
						},
						children: uninstallBusy ? t("uninstalling") : t("uninstall")
					}) : !upgradeable ? (0, react_jsx_runtime.jsx)("button", {
						type: "button",
						className: skill_market_module_css_default.buttonSm,
						disabled: installed || operationBusy,
						onClick: () => {
							onInstall(item);
						},
						children: installBusy ? t("installing") : installed ? t("installed") : operationBusy ? t("installWait") : t("install")
					}) : null,
					docs !== void 0 && docs.length > 0 && (0, react_jsx_runtime.jsx)("a", {
						className: skill_market_module_css_default.linkButtonGhost,
						href: docs,
						target: "_blank",
						rel: "noreferrer",
						children: t("openDocs")
					}),
					homepage !== void 0 && homepage.length > 0 && homepage !== docs && (0, react_jsx_runtime.jsx)("a", {
						className: skill_market_module_css_default.linkButtonGhost,
						href: homepage,
						target: "_blank",
						rel: "noreferrer",
						children: t("openHomepage")
					})
				]
			});
		}
		function CardDescription({ text, className }) {
			const value = text.trim();
			return (0, react_jsx_runtime.jsx)("p", {
				className: className ?? "",
				title: value,
				children: value
			});
		}
		function CardTitleRow({ item, version }) {
			const label = version?.trim();
			return (0, react_jsx_runtime.jsxs)("div", {
				className: skill_market_module_css_default.cardTitleRow,
				children: [(0, react_jsx_runtime.jsx)("h3", {
					className: skill_market_module_css_default.cardTitle,
					children: item.name
				}), label !== void 0 && label.length > 0 ? (0, react_jsx_runtime.jsxs)("span", {
					className: `${skill_market_module_css_default.badge} ${skill_market_module_css_default.badgeVersion}`,
					children: ["v", label]
				}) : null]
			});
		}
		function resolveCardVersion(item, installed, installedVersion) {
			if (installed) return installedVersion?.trim() || null;
			return item.version?.trim() || null;
		}
		function CardMeta({ item, t, upgradeable, disabled }) {
			return (0, react_jsx_runtime.jsxs)("div", {
				className: skill_market_module_css_default.cardMeta,
				children: [
					disabled ? (0, react_jsx_runtime.jsx)("span", {
						className: `${skill_market_module_css_default.badge} ${skill_market_module_css_default.badgeDisabled}`,
						children: t("pluginDisabled")
					}) : null,
					upgradeable ? (0, react_jsx_runtime.jsx)("span", {
						className: `${skill_market_module_css_default.badge} ${skill_market_module_css_default.badgeUpgrade}`,
						children: t("upgradeAvailable")
					}) : null,
					(0, react_jsx_runtime.jsx)("span", {
						className: `${skill_market_module_css_default.badge} ${item.source === "supanexus" ? skill_market_module_css_default.badgeSourceX6 : skill_market_module_css_default.badgeSourceCommunity}`,
						children: item.source === "supanexus" ? t("sourceX6") : t("sourceCommunity")
					}),
					(0, react_jsx_runtime.jsx)("span", {
						className: `${skill_market_module_css_default.badge} ${item.layer === "core" ? skill_market_module_css_default.badgeLayerCore : skill_market_module_css_default.badgeLayerFeature}`,
						children: item.layer === "core" ? t("layerCore") : t("layerFeature")
					})
				]
			});
		}
		function CardBody({ item, t, upgradeable, disabled, version }) {
			return (0, react_jsx_runtime.jsxs)(react_jsx_runtime.Fragment, { children: [
				(0, react_jsx_runtime.jsxs)("div", {
					className: skill_market_module_css_default.cardHead,
					children: [(0, react_jsx_runtime.jsx)(PluginListingIcon, {
						url: item.icon_url,
						name: item.name
					}), (0, react_jsx_runtime.jsxs)("div", {
						className: skill_market_module_css_default.cardHeadText,
						children: [(0, react_jsx_runtime.jsx)(CardTitleRow, {
							item,
							version
						}), (0, react_jsx_runtime.jsx)("p", {
							className: skill_market_module_css_default.cardCode,
							title: item.package_name,
							children: item.package_name
						})]
					})]
				}),
				(0, react_jsx_runtime.jsx)(CardMeta, {
					item,
					t,
					upgradeable,
					disabled
				}),
				(0, react_jsx_runtime.jsx)(CardDescription, {
					text: item.description ?? "",
					className: skill_market_module_css_default.cardDesc
				})
			] });
		}
		function ListingCard({ item, state, layout }) {
			const { t, isInstalled, getUpgradeStatus, getToggleStatus } = state;
			const docs = item.docs_url?.trim();
			const homepage = item.homepage_url?.trim();
			const isList = layout === "cols1";
			const actionProps = {
				item,
				state,
				docs,
				homepage
			};
			const installed = isInstalled(item);
			const upgradeStatus = getUpgradeStatus(item);
			const upgradeable = installed && upgradeStatus?.upgradeable === true;
			const toggleStatus = getToggleStatus(item);
			const pluginDisabled = installed && toggleStatus?.enabled === false;
			const cardVersion = resolveCardVersion(item, installed, upgradeStatus?.installed_version);
			const cardClass = `${skill_market_module_css_default.card} ${isList ? skill_market_module_css_default.cardList : skill_market_module_css_default.cardGrid}${pluginDisabled ? ` ${skill_market_module_css_default.cardDisabled}` : ""}`;
			if (isList) return (0, react_jsx_runtime.jsxs)("article", {
				className: cardClass,
				children: [(0, react_jsx_runtime.jsxs)("div", {
					className: skill_market_module_css_default.cardListTop,
					children: [(0, react_jsx_runtime.jsxs)("div", {
						className: skill_market_module_css_default.cardListLead,
						children: [(0, react_jsx_runtime.jsx)(PluginListingIcon, {
							url: item.icon_url,
							name: item.name
						}), (0, react_jsx_runtime.jsxs)("div", {
							className: skill_market_module_css_default.cardListText,
							children: [
								(0, react_jsx_runtime.jsx)(CardTitleRow, {
									item,
									version: cardVersion
								}),
								(0, react_jsx_runtime.jsx)("p", {
									className: skill_market_module_css_default.cardCodeList,
									title: item.package_name,
									children: item.package_name
								}),
								(0, react_jsx_runtime.jsx)(CardMeta, {
									item,
									t,
									upgradeable,
									disabled: pluginDisabled
								})
							]
						})]
					}), (0, react_jsx_runtime.jsx)(CardActions, {
						...actionProps,
						className: skill_market_module_css_default.cardListActions
					})]
				}), (0, react_jsx_runtime.jsx)(CardDescription, {
					text: item.description ?? "",
					className: skill_market_module_css_default.cardDescList
				})]
			});
			return (0, react_jsx_runtime.jsxs)("article", {
				className: cardClass,
				children: [(0, react_jsx_runtime.jsx)("div", {
					className: skill_market_module_css_default.cardBody,
					children: (0, react_jsx_runtime.jsx)(CardBody, {
						item,
						t,
						upgradeable,
						disabled: pluginDisabled,
						version: cardVersion
					})
				}), (0, react_jsx_runtime.jsx)(CardActions, { ...actionProps })]
			});
		}
		//#endregion
		//#region lib/types/shared/plugin-market-contract.js
		/** Plugin plaza (skill market) shared contract — types, paths, install spec helpers. */
		const PLUGIN_LISTINGS_PATH = "/api/x6.plugin-listings";
		const PLUGIN_CATEGORIES_PATH = "/api/x6.plugin-categories";
		/** GET with `?installCode=` — connection.fetch only supports GET/HEAD. */
		const PLUGIN_INSTALL_PATH = "/api/x6.plugin-install";
		/** GET — loopback-only Host relaunch for web / local dsh web. */
		const RESTART_HOST_PATH = "/api/x6.restart-host";
		/** GET with `?packageName=` — remove an installed plugin from the profile. */
		const PLUGIN_UNINSTALL_PATH = "/api/x6.plugin-uninstall";
		/** GET with `?installCodes=` — batch upgrade hints for installed plugins. */
		const PLUGIN_UPGRADE_STATUS_PATH = "/api/x6.plugin-upgrade-status";
		/** GET with `?installCode=` — fetch remote package.json version at operational ref. */
		const PLUGIN_REMOTE_VERSION_PATH = "/api/x6.plugin-remote-version";
		/** GET with `?packageNames=` — batch enabled/disabled state from user patch layer. */
		const PLUGIN_TOGGLE_STATUS_PATH = "/api/x6.plugin-toggle-status";
		/** GET with `?packageName=&enabled=` — enable/disable via cordis.patch.yml. */
		const PLUGIN_TOGGLE_PATH = "/api/x6.plugin-toggle";
		function formatInstallAttemptsLog(attempts) {
			const blocks = [];
			for (const attempt of attempts) {
				const lines = [`[${attempt.provider}] ${attempt.cliCommand ?? attempt.spec}`];
				if (attempt.stdout !== void 0 && attempt.stdout.trim().length > 0) lines.push(attempt.stdout.trimEnd());
				if (attempt.stderr !== void 0 && attempt.stderr.trim().length > 0) lines.push(attempt.stderr.trimEnd());
				if (!attempt.ok && attempt.message !== void 0 && attempt.message.length > 0) lines.push(attempt.message);
				blocks.push(lines.join("\n"));
			}
			return blocks.join("\n\n");
		}
		/** Whether skill market may offer uninstall for this listing. */
		function canUninstallPlugin(item) {
			if (item.install_code === "x6-core") return false;
			if (item.package_name === "@x6_ai/dsh-plugin-x6-core") return false;
			return !item.package_name.endsWith("dsh-plugin-x6-core");
		}
		/** Whether skill market may offer enable/disable for this listing. */
		function canTogglePlugin(item) {
			return canUninstallPlugin(item);
		}
		//#endregion
		//#region lib/types/client/skill-market/install-error.js
		var InstallPluginError = class extends Error {
			attempts;
			log;
			constructor(message, options) {
				super(message);
				this.name = "InstallPluginError";
				if (options?.attempts !== void 0) this.attempts = options.attempts;
				if (options?.log !== void 0) this.log = options.log;
			}
		};
		//#endregion
		//#region lib/types/client/skill-market/wire.js
		/** Browser fetch wrappers for plugin market Host API routes. */
		async function readResponseBody(response) {
			if ((response.headers.get("content-type") ?? "").includes("application/json")) return response.json();
			const text = await response.text();
			if (text.length === 0) return {};
			try {
				return JSON.parse(text);
			} catch {
				return { message: text };
			}
		}
		async function parseJson(response) {
			const body = await readResponseBody(response);
			if (!response.ok || body.ok === false) {
				if (response.status === 404) throw new Error(typeof body.message === "string" && body.message.length > 0 ? body.message : "HOST_API_NOT_FOUND");
				const message = typeof body.message === "string" && body.message.length > 0 ? body.message : `HTTP ${String(response.status)}`;
				throw new Error(message);
			}
			return body;
		}
		/** List published plugins via Host proxy. */
		async function listPluginListings(params) {
			const url = new URL(PLUGIN_LISTINGS_PATH, window.location.origin);
			if (params?.locale !== void 0) url.searchParams.set("locale", params.locale);
			if (params?.source !== void 0 && params.source.length > 0) url.searchParams.set("source", params.source);
			if (params?.layer !== void 0 && params.layer.length > 0) url.searchParams.set("layer", params.layer);
			if (params?.category !== void 0 && params.category.length > 0) url.searchParams.set("category", params.category);
			if (params?.q !== void 0 && params.q.length > 0) url.searchParams.set("q", params.q);
			const page = params?.page != null && params.page > 0 ? Math.floor(params.page) : 1;
			const pageSize = params?.page_size != null && params.page_size > 0 ? Math.min(50, Math.floor(params.page_size)) : 12;
			url.searchParams.set("page", String(page));
			url.searchParams.set("page_size", String(pageSize));
			const body = await parseJson(await fetch(url));
			return {
				items: body.items ?? [],
				total_count: body.total_count ?? 0,
				page: body.page ?? page,
				page_size: body.page_size ?? pageSize,
				has_next_page: !!body.has_next_page
			};
		}
		/** List plugin categories via Host proxy. */
		async function listPluginCategories(params) {
			const url = new URL(PLUGIN_CATEGORIES_PATH, window.location.origin);
			if (params?.locale !== void 0) url.searchParams.set("locale", params.locale);
			return { items: (await parseJson(await fetch(url))).items ?? [] };
		}
		/** Install a plugin by install code via Host bridge (GET; connection.fetch is GET-only). */
		async function installPlugin(installCode, locale) {
			const url = new URL(PLUGIN_INSTALL_PATH, window.location.origin);
			url.searchParams.set("installCode", installCode);
			if (locale !== void 0 && locale.length > 0) url.searchParams.set("locale", locale);
			const response = await fetch(url);
			const body = await readResponseBody(response);
			const failureMessage = "message" in body && typeof body.message === "string" && body.message.length > 0 ? body.message : void 0;
			if (!response.ok || body.ok === false) {
				if (response.status === 404) throw new InstallPluginError(failureMessage ?? "HOST_API_NOT_FOUND");
				const message = failureMessage ?? `HTTP ${String(response.status)}`;
				const attempts = body.attempts;
				const log = typeof body.log === "string" && body.log.length > 0 ? body.log : attempts !== void 0 ? formatInstallAttemptsLog(attempts) : void 0;
				throw new InstallPluginError(message, {
					...attempts !== void 0 ? { attempts } : {},
					...log !== void 0 ? { log } : {}
				});
			}
			const log = body.attempts !== void 0 ? formatInstallAttemptsLog(body.attempts) : void 0;
			const success = body;
			return log !== void 0 ? {
				...success,
				log
			} : success;
		}
		/** Uninstall a plugin by package name via Host bridge. */
		async function uninstallPlugin(packageName, installCode) {
			const url = new URL(PLUGIN_UNINSTALL_PATH, window.location.origin);
			url.searchParams.set("packageName", packageName);
			if (installCode !== void 0 && installCode.length > 0) url.searchParams.set("installCode", installCode);
			const response = await fetch(url);
			const body = await readResponseBody(response);
			const failureMessage = "message" in body && typeof body.message === "string" && body.message.length > 0 ? body.message : void 0;
			if (!response.ok || body.ok === false) {
				if (response.status === 404) throw new InstallPluginError(failureMessage ?? "HOST_API_NOT_FOUND");
				const message = failureMessage ?? `HTTP ${String(response.status)}`;
				const log = typeof body.log === "string" && body.log.length > 0 ? body.log : void 0;
				throw new InstallPluginError(message, { ...log !== void 0 ? { log } : {} });
			}
			const log = typeof body.log === "string" && body.log.length > 0 ? body.log : void 0;
			const success = body;
			return log !== void 0 ? {
				...success,
				log
			} : success;
		}
		/** Batch upgrade hints for installed plugins via Host bridge. */
		async function fetchPluginUpgradeStatus(installCodes, locale) {
			const url = new URL(PLUGIN_UPGRADE_STATUS_PATH, window.location.origin);
			url.searchParams.set("installCodes", installCodes.join(","));
			if (locale !== void 0 && locale.length > 0) url.searchParams.set("locale", locale);
			return { items: (await parseJson(await fetch(url))).items ?? [] };
		}
		/** Fetch remote package.json version for upgrade confirm. */
		async function fetchPluginRemoteVersion(installCode, locale) {
			const url = new URL(PLUGIN_REMOTE_VERSION_PATH, window.location.origin);
			url.searchParams.set("installCode", installCode);
			if (locale !== void 0 && locale.length > 0) url.searchParams.set("locale", locale);
			const body = await parseJson(await fetch(url));
			return {
				version: body.version ?? null,
				provider: body.provider ?? null
			};
		}
		/** Batch enabled/disabled state for installed plugins. */
		async function fetchPluginToggleStatus(packageNames) {
			const url = new URL(PLUGIN_TOGGLE_STATUS_PATH, window.location.origin);
			url.searchParams.set("packageNames", packageNames.join(","));
			return { items: (await parseJson(await fetch(url))).items ?? [] };
		}
		/** Toggle one installed plugin via profile cordis.patch.yml. */
		async function setPluginEnabled(packageName, enabled) {
			const url = new URL(PLUGIN_TOGGLE_PATH, window.location.origin);
			url.searchParams.set("packageName", packageName);
			url.searchParams.set("enabled", enabled ? "true" : "false");
			const body = await parseJson(await fetch(url));
			return {
				package_name: body.package_name ?? packageName,
				enabled: body.enabled ?? enabled,
				row_ids: body.row_ids ?? [],
				needsRefresh: body.needsRefresh ?? true
			};
		}
		/** Restart dsh web Host via loopback API (web profile). */
		async function restartHostService() {
			const fallback = new URL(PLUGIN_INSTALL_PATH, window.location.origin);
			fallback.searchParams.set("action", "restart");
			const candidates = [new URL(RESTART_HOST_PATH, window.location.origin), fallback];
			let sawMissingApi = false;
			for (const url of candidates) {
				const response = await fetch(url);
				const body = await readResponseBody(response);
				if (response.ok && body.ok !== false) return;
				const message = typeof body.message === "string" && body.message.length > 0 ? body.message : `HTTP ${String(response.status)}`;
				if (response.status === 404 || message === "not found" || message === "HOST_API_NOT_FOUND") {
					sawMissingApi = true;
					continue;
				}
				throw new Error(message);
			}
			throw new Error(sawMissingApi ? "HOST_RESTART_API_MISSING" : "重启失败");
		}
		//#endregion
		//#region lib/types/client/skill-market/desktop-bridge.js
		/** Desktop shell bridge + web Host restart API. */
		/** Whether the Electron shell exposes restartHost. */
		function canRestartHost() {
			return typeof window.x6Desktop?.restartHost === "function";
		}
		/** Request host restart when running inside the Desktop shell. */
		async function requestHostRestart() {
			const restart = window.x6Desktop?.restartHost;
			if (typeof restart !== "function") return false;
			await restart();
			return true;
		}
		/** Desktop shell or loopback web Host restart is available. */
		function canRequestServiceRestart() {
			return canRestartHost() || isLoopbackBrowserOrigin();
		}
		function isLoopbackBrowserOrigin() {
			if (typeof window === "undefined") return false;
			const host = window.location.hostname.toLowerCase();
			return host === "127.0.0.1" || host === "localhost" || host === "::1";
		}
		/**
		* Restart Host: Desktop bridge first, otherwise loopback restart API.
		* The web API ends the current process after spawning a detached replacement.
		*/
		async function requestServiceRestart() {
			if (canRestartHost()) return requestHostRestart();
			await restartHostService();
			return true;
		}
		//#endregion
		//#region lib/types/client/skill-market/InstallProgressModal.js
		function InstallProgressModal({ progress, t, onClose, onStartInstall, onStartUpgrade, onStartUninstall, onToggleLog }) {
			const logRef = (0, react.useRef)(null);
			const [confirmRestart, setConfirmRestart] = (0, react.useState)(false);
			const [restarting, setRestarting] = (0, react.useState)(false);
			const [restartError, setRestartError] = (0, react.useState)();
			const { item, phase, log, showLog, operation, targetVersion, remoteVersion } = progress;
			const isUninstall = operation === "uninstall";
			const isUpgrade = operation === "upgrade";
			const confirming = phase === "confirm";
			const running = phase === "running";
			const checkingRemoteVersion = isUpgrade && running && log.length === 0;
			const success = phase === "success";
			const failed = phase === "error";
			const showRestart = success && canRequestServiceRestart() && !restarting;
			const modalTitle = restarting ? t("restartServiceWorking") : confirming ? isUninstall ? t("uninstallModalTitleConfirm") : isUpgrade ? t("upgradeModalTitleConfirm") : t("installModalTitleConfirm") : running ? isUninstall ? t("uninstallModalTitleRunning") : isUpgrade ? t("upgradeModalTitleRunning") : t("installModalTitleRunning") : success ? isUninstall ? t("uninstallModalTitleSuccess") : isUpgrade ? t("upgradeModalTitleSuccess") : t("installModalTitleSuccess") : isUninstall ? t("uninstallModalTitleFailed") : isUpgrade ? t("upgradeModalTitleFailed") : t("installModalTitleFailed");
			const upgradeConfirmHint = targetVersion !== void 0 && targetVersion.length > 0 ? t("upgradeModalConfirmHintVersion").replace("{version}", targetVersion) : t("upgradeModalConfirmHint");
			const modalStatus = restarting ? t("restartServiceWorkingHint") : checkingRemoteVersion ? t("checkingRemoteVersion") : confirming ? isUninstall ? t("uninstallModalConfirmHint") : isUpgrade ? upgradeConfirmHint : t("installModalConfirmHint") : running ? isUninstall ? t("uninstallModalRunning") : isUpgrade ? checkingRemoteVersion ? t("checkingRemoteVersion") : t("upgradeModalRunning") : t("installModalRunning") : success ? isUninstall ? t("uninstallOk") : isUpgrade ? targetVersion !== void 0 && targetVersion.length > 0 ? t("upgradeOkVersion").replace("{version}", targetVersion) : t("upgradeOk") : t("installOkVia").replace("{provider}", progress.provider ?? "") : progress.errorMessage ?? (isUninstall ? t("uninstallFailed") : isUpgrade ? t("upgradeFailed") : t("installFailed"));
			const runningLogPlaceholder = isUninstall ? t("uninstallModalRunning") : isUpgrade ? t("upgradeModalRunning") : t("installModalRunning");
			const onRestart = (0, react.useCallback)(async () => {
				setConfirmRestart(false);
				setRestarting(true);
				setRestartError(void 0);
				try {
					await requestServiceRestart();
					window.setTimeout(() => {
						window.location.reload();
					}, 4e3);
				} catch (error) {
					setRestarting(false);
					const raw = error instanceof Error ? error.message : t("restartServiceFailed");
					const message = raw === "HOST_RESTART_API_MISSING" ? t("restartApiMissing") : raw;
					setRestartError(message);
				}
			}, [t]);
			(0, react.useEffect)(() => {
				if (!showLog || logRef.current === null) return;
				logRef.current.scrollTop = logRef.current.scrollHeight;
			}, [
				log,
				showLog,
				phase
			]);
			(0, react.useEffect)(() => {
				if (!confirmRestart) return;
				const onKeyDown = (event) => {
					if (event.key === "Escape") setConfirmRestart(false);
				};
				document.addEventListener("keydown", onKeyDown);
				return () => {
					document.removeEventListener("keydown", onKeyDown);
				};
			}, [confirmRestart]);
			return (0, react_jsx_runtime.jsxs)(react_jsx_runtime.Fragment, { children: [(0, react_jsx_runtime.jsx)("div", {
				className: skill_market_module_css_default.installOverlay,
				role: "presentation",
				children: (0, react_jsx_runtime.jsxs)("div", {
					className: skill_market_module_css_default.installDialog,
					role: "dialog",
					"aria-modal": "true",
					"aria-labelledby": "skill-market-install-title",
					children: [
						(0, react_jsx_runtime.jsx)("h3", {
							className: skill_market_module_css_default.installDialogTitle,
							id: "skill-market-install-title",
							children: modalTitle
						}),
						(0, react_jsx_runtime.jsx)(PluginSummary, {
							item,
							t,
							...targetVersion !== void 0 && targetVersion.length > 0 ? { targetVersion } : {},
							...remoteVersion !== void 0 && remoteVersion.length > 0 ? { remoteVersion } : confirming && isUpgrade ? { remoteVersionUnknown: true } : {}
						}),
						(0, react_jsx_runtime.jsx)("p", {
							className: skill_market_module_css_default.installDialogStatus,
							children: modalStatus
						}),
						log.length > 0 || running && !checkingRemoteVersion ? (0, react_jsx_runtime.jsxs)(react_jsx_runtime.Fragment, { children: [!running && log.length > 0 ? (0, react_jsx_runtime.jsx)("button", {
							type: "button",
							className: skill_market_module_css_default.installLogToggle,
							onClick: onToggleLog,
							children: showLog ? t("installModalHideLog") : t("installModalShowLog")
						}) : null, showLog || running ? (0, react_jsx_runtime.jsx)("pre", {
							ref: logRef,
							className: skill_market_module_css_default.installLog,
							children: log.length > 0 ? log : runningLogPlaceholder
						}) : null] }) : null,
						restartError !== void 0 ? (0, react_jsx_runtime.jsx)("p", {
							className: skill_market_module_css_default.alertError,
							role: "alert",
							children: restartError
						}) : null,
						(0, react_jsx_runtime.jsxs)("div", {
							className: skill_market_module_css_default.installDialogActions,
							children: [
								confirming ? (0, react_jsx_runtime.jsxs)(react_jsx_runtime.Fragment, { children: [(0, react_jsx_runtime.jsx)("button", {
									type: "button",
									className: isUninstall ? skill_market_module_css_default.buttonDanger : skill_market_module_css_default.button,
									onClick: isUninstall ? onStartUninstall : isUpgrade ? onStartUpgrade : onStartInstall,
									children: isUninstall ? t("uninstallModalStart") : isUpgrade ? t("upgradeModalStart") : t("installModalStart")
								}), (0, react_jsx_runtime.jsx)("button", {
									type: "button",
									className: skill_market_module_css_default.buttonSecondary,
									onClick: onClose,
									children: t("installModalCancel")
								})] }) : null,
								!confirming && showRestart ? (0, react_jsx_runtime.jsx)("button", {
									type: "button",
									className: skill_market_module_css_default.button,
									disabled: confirmRestart,
									onClick: () => {
										setConfirmRestart(true);
									},
									children: t("restartService")
								}) : null,
								!confirming ? (0, react_jsx_runtime.jsx)("button", {
									type: "button",
									className: skill_market_module_css_default.buttonSecondary,
									disabled: running || restarting,
									onClick: onClose,
									children: restarting ? t("restartServiceWorkingButton") : running ? isUninstall ? t("uninstalling") : isUpgrade ? t("upgrading") : t("installModalWorking") : t("installModalClose")
								}) : null
							]
						}),
						success && showRestart && !confirmRestart && !restarting ? (0, react_jsx_runtime.jsx)("p", {
							className: skill_market_module_css_default.installDialogHint,
							children: t("restartServiceHint")
						}) : null,
						success && !canRequestServiceRestart() ? (0, react_jsx_runtime.jsx)("p", {
							className: skill_market_module_css_default.installDialogHint,
							children: t("restartHint")
						}) : null,
						failed ? (0, react_jsx_runtime.jsx)("p", {
							className: skill_market_module_css_default.installDialogHint,
							children: t("installModalFailedHint")
						}) : null
					]
				})
			}), confirmRestart && !restarting ? (0, react_jsx_runtime.jsx)(RestartConfirmDialog, {
				t,
				onConfirm: () => {
					onRestart();
				},
				onCancel: () => {
					setConfirmRestart(false);
				}
			}) : null] });
		}
		function RestartConfirmDialog({ t, onConfirm, onCancel }) {
			return (0, react_jsx_runtime.jsx)("div", {
				className: skill_market_module_css_default.confirmOverlay,
				role: "presentation",
				onClick: (event) => {
					if (event.target === event.currentTarget) onCancel();
				},
				children: (0, react_jsx_runtime.jsxs)("div", {
					className: skill_market_module_css_default.confirmDialog,
					role: "alertdialog",
					"aria-modal": "true",
					"aria-labelledby": "skill-market-restart-confirm-title",
					"aria-describedby": "skill-market-restart-confirm-message",
					children: [
						(0, react_jsx_runtime.jsx)("h4", {
							className: skill_market_module_css_default.confirmDialogTitle,
							id: "skill-market-restart-confirm-title",
							children: t("restartServiceConfirmTitle")
						}),
						(0, react_jsx_runtime.jsx)("p", {
							className: skill_market_module_css_default.confirmDialogMessage,
							id: "skill-market-restart-confirm-message",
							children: t("restartServiceConfirm")
						}),
						(0, react_jsx_runtime.jsxs)("div", {
							className: skill_market_module_css_default.confirmDialogActions,
							children: [(0, react_jsx_runtime.jsx)("button", {
								type: "button",
								className: skill_market_module_css_default.button,
								onClick: onConfirm,
								children: t("restartServiceConfirmAction")
							}), (0, react_jsx_runtime.jsx)("button", {
								type: "button",
								className: skill_market_module_css_default.buttonSecondary,
								onClick: onCancel,
								children: t("restartServiceCancel")
							})]
						})
					]
				})
			});
		}
		function PluginSummary({ item, t, targetVersion, remoteVersion, remoteVersionUnknown }) {
			return (0, react_jsx_runtime.jsxs)("dl", {
				className: skill_market_module_css_default.installSummary,
				children: [
					(0, react_jsx_runtime.jsxs)("div", { children: [(0, react_jsx_runtime.jsx)("dt", { children: t("installModalPlugin") }), (0, react_jsx_runtime.jsx)("dd", { children: item.name })] }),
					(0, react_jsx_runtime.jsxs)("div", { children: [(0, react_jsx_runtime.jsx)("dt", { children: t("installModalPackage") }), (0, react_jsx_runtime.jsx)("dd", { children: item.package_name })] }),
					targetVersion !== void 0 && targetVersion.length > 0 ? (0, react_jsx_runtime.jsxs)("div", { children: [(0, react_jsx_runtime.jsx)("dt", { children: t("upgradeModalTargetVersion") }), (0, react_jsx_runtime.jsx)("dd", { children: targetVersion })] }) : null,
					remoteVersion !== void 0 && remoteVersion.length > 0 ? (0, react_jsx_runtime.jsxs)("div", { children: [(0, react_jsx_runtime.jsx)("dt", { children: t("upgradeModalRemoteVersion") }), (0, react_jsx_runtime.jsx)("dd", { children: remoteVersion })] }) : remoteVersionUnknown === true ? (0, react_jsx_runtime.jsxs)("div", { children: [(0, react_jsx_runtime.jsx)("dt", { children: t("upgradeModalRemoteVersion") }), (0, react_jsx_runtime.jsx)("dd", { children: t("remoteVersionUnknown") })] }) : null
				]
			});
		}
		//#endregion
		//#region lib/types/client/skill-market/LayoutIcons.js
		function GridCols3Icon({ size = 16 }) {
			return (0, react_jsx_runtime.jsxs)("svg", {
				width: size,
				height: size,
				viewBox: "0 0 16 16",
				fill: "none",
				"aria-hidden": true,
				children: [
					(0, react_jsx_runtime.jsx)("rect", {
						x: "2",
						y: "3",
						width: "3",
						height: "10",
						rx: "0.8",
						fill: "currentColor"
					}),
					(0, react_jsx_runtime.jsx)("rect", {
						x: "6.5",
						y: "3",
						width: "3",
						height: "10",
						rx: "0.8",
						fill: "currentColor"
					}),
					(0, react_jsx_runtime.jsx)("rect", {
						x: "11",
						y: "3",
						width: "3",
						height: "10",
						rx: "0.8",
						fill: "currentColor"
					})
				]
			});
		}
		function ListCol1Icon({ size = 16 }) {
			return (0, react_jsx_runtime.jsxs)("svg", {
				width: size,
				height: size,
				viewBox: "0 0 16 16",
				fill: "none",
				"aria-hidden": true,
				children: [
					(0, react_jsx_runtime.jsx)("rect", {
						x: "2",
						y: "3",
						width: "12",
						height: "2.6",
						rx: "0.6",
						fill: "currentColor"
					}),
					(0, react_jsx_runtime.jsx)("rect", {
						x: "2",
						y: "6.7",
						width: "12",
						height: "2.6",
						rx: "0.6",
						fill: "currentColor"
					}),
					(0, react_jsx_runtime.jsx)("rect", {
						x: "2",
						y: "10.4",
						width: "12",
						height: "2.6",
						rx: "0.6",
						fill: "currentColor"
					})
				]
			});
		}
		//#endregion
		//#region lib/types/client/skill-market/SkillMarketPanel.js
		const DSH_PLUGIN_GITHUB_TOPIC_URL = "https://github.com/topics/dsh-plugin";
		function SkillMarketPanel({ state, onClose, officialSiteUrl, embedded = false }) {
			const { t, loading, items, hasNext, keyword, setKeyword, source, setSource, layer, setLayer, category, setCategory, categories, error, installProgress, closeInstallProgress, startInstall, startUpgrade, startUninstall, toggleInstallLog, onSearch, loadMore, isInstalled, installTab, setInstallTab } = state;
			const [layout, setLayout] = (0, react.useState)("cols3");
			const [categorySidebarOpen, setCategorySidebarOpen] = (0, react.useState)(true);
			const visibleItems = (0, react.useMemo)(() => items.filter((item) => installTab === "installed" ? isInstalled(item) : !isInstalled(item)), [
				items,
				installTab,
				isInstalled
			]);
			const emptyMessage = installTab === "installed" ? t("emptyInstalled") : t("emptyNotInstalled");
			return (0, react_jsx_runtime.jsxs)("div", {
				className: embedded ? skill_market_module_css_default.page : skill_market_module_css_default.panel,
				role: embedded ? "region" : "dialog",
				...embedded ? {} : { "aria-modal": true },
				"aria-labelledby": "skill-market-title",
				children: [
					(0, react_jsx_runtime.jsxs)("header", {
						className: skill_market_module_css_default.header,
						children: [(0, react_jsx_runtime.jsxs)("div", {
							className: skill_market_module_css_default.titleBlock,
							children: [(0, react_jsx_runtime.jsx)("h2", {
								className: skill_market_module_css_default.title,
								id: "skill-market-title",
								children: t("title")
							}), (0, react_jsx_runtime.jsx)("p", {
								className: skill_market_module_css_default.subtitle,
								children: t("subtitle")
							})]
						}), (0, react_jsx_runtime.jsxs)("div", {
							className: skill_market_module_css_default.headerActions,
							children: [
								(0, react_jsx_runtime.jsx)("a", {
									className: skill_market_module_css_default.headerLink,
									href: officialSiteUrl,
									target: "_blank",
									rel: "noreferrer",
									children: t("officialSite")
								}),
								(0, react_jsx_runtime.jsx)("a", {
									className: skill_market_module_css_default.headerLink,
									href: DSH_PLUGIN_GITHUB_TOPIC_URL,
									target: "_blank",
									rel: "noreferrer",
									children: t("githubPlugins")
								}),
								embedded ? null : (0, react_jsx_runtime.jsx)("button", {
									type: "button",
									className: skill_market_module_css_default.closeButton,
									"aria-label": t("close"),
									onClick: onClose,
									children: "×"
								})
							]
						})]
					}),
					(0, react_jsx_runtime.jsx)("div", {
						className: skill_market_module_css_default.body,
						children: (0, react_jsx_runtime.jsxs)("div", {
							className: skill_market_module_css_default.bodyLayout,
							children: [(0, react_jsx_runtime.jsxs)("aside", {
								className: `${skill_market_module_css_default.categorySidebar} ${categorySidebarOpen ? "" : skill_market_module_css_default.categorySidebarCollapsed}`,
								"aria-label": t("categoryNavTitle"),
								children: [(0, react_jsx_runtime.jsxs)("div", {
									className: skill_market_module_css_default.categorySidebarHead,
									children: [categorySidebarOpen ? (0, react_jsx_runtime.jsx)("span", {
										className: skill_market_module_css_default.categorySidebarTitle,
										children: t("categoryNavTitle")
									}) : null, (0, react_jsx_runtime.jsx)("button", {
										type: "button",
										className: skill_market_module_css_default.sidebarToggle,
										"aria-label": categorySidebarOpen ? t("collapseCategories") : t("expandCategories"),
										"aria-expanded": categorySidebarOpen,
										onClick: () => {
											setCategorySidebarOpen((open) => !open);
										},
										children: categorySidebarOpen ? "‹" : "›"
									})]
								}), categorySidebarOpen ? (0, react_jsx_runtime.jsxs)("nav", {
									className: skill_market_module_css_default.categoryNav,
									"aria-label": t("categoryNavTitle"),
									children: [(0, react_jsx_runtime.jsx)("button", {
										type: "button",
										className: `${skill_market_module_css_default.categoryNavItem} ${category === "all" ? skill_market_module_css_default.categoryNavItemActive : ""}`,
										"aria-current": category === "all" ? "true" : void 0,
										onClick: () => {
											setCategory("all");
										},
										children: t("categoryAll")
									}), categories.map((c) => (0, react_jsx_runtime.jsx)("button", {
										type: "button",
										className: `${skill_market_module_css_default.categoryNavItem} ${category === c.slug ? skill_market_module_css_default.categoryNavItemActive : ""}`,
										"aria-current": category === c.slug ? "true" : void 0,
										onClick: () => {
											setCategory(c.slug);
										},
										children: c.name || c.slug
									}, c.id))]
								}) : null]
							}), (0, react_jsx_runtime.jsxs)("div", {
								className: skill_market_module_css_default.mainContent,
								children: [
									(0, react_jsx_runtime.jsx)("div", {
										className: skill_market_module_css_default.tabBar,
										children: (0, react_jsx_runtime.jsxs)("div", {
											className: skill_market_module_css_default.segmentGroup,
											role: "tablist",
											"aria-label": t("title"),
											children: [(0, react_jsx_runtime.jsx)("button", {
												type: "button",
												role: "tab",
												"aria-selected": installTab === "not_installed",
												className: installTab === "not_installed" ? skill_market_module_css_default.segmentButtonActive : skill_market_module_css_default.segmentButton,
												onClick: () => {
													setInstallTab("not_installed");
												},
												children: t("tabNotInstalled")
											}), (0, react_jsx_runtime.jsx)("button", {
												type: "button",
												role: "tab",
												"aria-selected": installTab === "installed",
												className: installTab === "installed" ? skill_market_module_css_default.segmentButtonActive : skill_market_module_css_default.segmentButton,
												onClick: () => {
													setInstallTab("installed");
												},
												children: t("tabInstalled")
											})]
										})
									}),
									(0, react_jsx_runtime.jsxs)("div", {
										className: skill_market_module_css_default.toolbar,
										children: [
											(0, react_jsx_runtime.jsxs)("select", {
												className: skill_market_module_css_default.select,
												value: source,
												onChange: (e) => {
													setSource(e.target.value);
												},
												"aria-label": t("filterAll"),
												children: [
													(0, react_jsx_runtime.jsx)("option", {
														value: "all",
														children: t("filterAll")
													}),
													(0, react_jsx_runtime.jsx)("option", {
														value: "supanexus",
														children: t("sourceX6")
													}),
													(0, react_jsx_runtime.jsx)("option", {
														value: "dsh_community",
														children: t("sourceCommunity")
													})
												]
											}),
											(0, react_jsx_runtime.jsxs)("select", {
												className: skill_market_module_css_default.select,
												value: layer,
												onChange: (e) => {
													setLayer(e.target.value);
												},
												"aria-label": t("layerAll"),
												children: [
													(0, react_jsx_runtime.jsx)("option", {
														value: "all",
														children: t("layerAll")
													}),
													(0, react_jsx_runtime.jsx)("option", {
														value: "core",
														children: t("layerCore")
													}),
													(0, react_jsx_runtime.jsx)("option", {
														value: "feature",
														children: t("layerFeature")
													})
												]
											}),
											(0, react_jsx_runtime.jsx)("input", {
												className: skill_market_module_css_default.searchInput,
												value: keyword,
												placeholder: t("searchPlaceholder"),
												onChange: (e) => {
													setKeyword(e.target.value);
												},
												onKeyDown: (e) => {
													if (e.key === "Enter") onSearch();
												}
											}),
											(0, react_jsx_runtime.jsx)("button", {
												type: "button",
												className: skill_market_module_css_default.buttonSecondary,
												onClick: onSearch,
												children: t("searchPlaceholder").replace("…", "")
											}),
											(0, react_jsx_runtime.jsxs)("div", {
												className: `${skill_market_module_css_default.segmentGroup} ${skill_market_module_css_default.segmentGroupEnd}`,
												role: "group",
												"aria-label": t("layoutLabel"),
												children: [(0, react_jsx_runtime.jsx)("button", {
													type: "button",
													className: layout === "cols3" ? `${skill_market_module_css_default.segmentButtonActive} ${skill_market_module_css_default.segmentButtonIcon}` : `${skill_market_module_css_default.segmentButton} ${skill_market_module_css_default.segmentButtonIcon}`,
													"aria-pressed": layout === "cols3",
													"aria-label": t("layoutCols3"),
													title: t("layoutCols3"),
													onClick: () => {
														setLayout("cols3");
													},
													children: (0, react_jsx_runtime.jsx)(GridCols3Icon, {})
												}), (0, react_jsx_runtime.jsx)("button", {
													type: "button",
													className: layout === "cols1" ? `${skill_market_module_css_default.segmentButtonActive} ${skill_market_module_css_default.segmentButtonIcon}` : `${skill_market_module_css_default.segmentButton} ${skill_market_module_css_default.segmentButtonIcon}`,
													"aria-pressed": layout === "cols1",
													"aria-label": t("layoutCols1"),
													title: t("layoutCols1"),
													onClick: () => {
														setLayout("cols1");
													},
													children: (0, react_jsx_runtime.jsx)(ListCol1Icon, {})
												})]
											})
										]
									}),
									error !== void 0 && (0, react_jsx_runtime.jsx)("p", {
										className: skill_market_module_css_default.alertError,
										role: "alert",
										children: error
									}),
									(0, react_jsx_runtime.jsx)("div", {
										className: skill_market_module_css_default.gridScroll,
										children: loading && items.length === 0 ? (0, react_jsx_runtime.jsx)("p", {
											className: skill_market_module_css_default.loading,
											children: t("searchPlaceholder")
										}) : visibleItems.length === 0 ? (0, react_jsx_runtime.jsx)("p", {
											className: skill_market_module_css_default.empty,
											children: items.length === 0 ? t("empty") : emptyMessage
										}) : (0, react_jsx_runtime.jsx)("div", {
											className: `${skill_market_module_css_default.grid} ${layout === "cols3" ? skill_market_module_css_default.gridCols3 : skill_market_module_css_default.gridCols1}`,
											children: visibleItems.map((item) => (0, react_jsx_runtime.jsx)(ListingCard, {
												item,
												state,
												layout
											}, item.id))
										})
									}),
									hasNext && (0, react_jsx_runtime.jsx)("div", {
										className: skill_market_module_css_default.footer,
										children: (0, react_jsx_runtime.jsx)("button", {
											type: "button",
											className: skill_market_module_css_default.buttonSecondary,
											disabled: loading,
											onClick: loadMore,
											children: t("loadMore")
										})
									})
								]
							})]
						})
					}),
					installProgress !== void 0 ? (0, react_jsx_runtime.jsx)(InstallProgressModal, {
						progress: installProgress,
						t,
						onClose: closeInstallProgress,
						onStartInstall: startInstall,
						onStartUpgrade: startUpgrade,
						onStartUninstall: startUninstall,
						onToggleLog: toggleInstallLog
					}) : null
				]
			});
		}
		//#endregion
		//#region lib/types/client/skill-market/locales.js
		/** Skill market copy keys. */
		const skillMarketMessages = {
			"zh-CN": {
				nav: "应用",
				title: "应用",
				subtitle: "发现 DSH 插件：安装时按网络自动选择仓库。文档与主页见卡片底部。",
				searchPlaceholder: "搜索插件…",
				filterAll: "全部来源",
				sourceX6: "X6",
				sourceCommunity: "DSH 社区",
				layerAll: "全部层级",
				categoryAll: "全部分类",
				categoryNavTitle: "分类",
				collapseCategories: "收起分类",
				expandCategories: "展开分类",
				layerCore: "核心",
				layerFeature: "功能",
				loadFailed: "加载失败",
				empty: "暂无已发布插件",
				install: "安装",
				installing: "安装中…",
				installed: "已安装",
				uninstall: "卸载",
				uninstalling: "卸载中…",
				uninstallConfirm: "确定要卸载「{name}」吗？卸载后需重启服务生效。",
				uninstallFailed: "卸载失败",
				uninstallOk: "已卸载，请重启服务后生效。",
				uninstallModalTitleConfirm: "卸载插件",
				uninstallModalConfirmHint: "确认卸载该插件？将执行 dsh plugin remove，完成后需重启服务生效。",
				uninstallModalStart: "开始卸载",
				uninstallModalTitleRunning: "正在卸载插件",
				uninstallModalTitleSuccess: "卸载完成",
				uninstallModalTitleFailed: "卸载失败",
				uninstallModalRunning: "正在执行 dsh plugin remove，请勿关闭窗口…",
				installOk: "安装完成，请重启应用后生效。",
				installOkVia: "已通过 {provider} 安装，请重启服务后生效。",
				installFailed: "安装失败",
				installWait: "请等待…",
				installModalTitleConfirm: "安装插件",
				installModalConfirmHint: "确认安装该插件？将执行 dsh plugin add，完成后需重启服务生效。",
				installModalStart: "开始安装",
				installModalCancel: "取消",
				installModalTitleRunning: "正在安装插件",
				installModalTitleSuccess: "安装完成",
				installModalTitleFailed: "安装失败",
				installModalPlugin: "插件",
				installModalPackage: "包名",
				installModalRunning: "正在执行 dsh plugin add，请勿关闭窗口…",
				installModalShowLog: "查看安装日志",
				installModalHideLog: "收起安装日志",
				installModalClose: "关闭",
				installModalWorking: "安装中…",
				installModalFailedHint: "可展开日志查看各渠道命令与终端输出。",
				openRepo: "仓库",
				openDocs: "文档",
				openHomepage: "主页",
				officialSite: "X6 官方网站",
				githubPlugins: "GitHub 社区插件",
				loadMore: "加载更多",
				close: "关闭",
				restart: "重启应用",
				restartServiceConfirmTitle: "确认重启",
				restartService: "重启服务",
				restartServiceHint: "将重新启动 dsh web Host 进程，页面会短暂断开并自动恢复。",
				restartServiceConfirm: "确定要重启 dsh web 服务吗？当前页面会短暂断开。",
				restartServiceConfirmAction: "确认重启",
				restartServiceCancel: "取消",
				restartServiceWorking: "正在重启服务",
				restartServiceWorkingButton: "重启中…",
				restartServiceWorkingHint: "Host 正在重启，页面将在数秒后自动刷新…",
				restartServiceFailed: "重启失败，请查看终端日志或在终端手动重启 dsh web。",
				restartApiMissing: "Host 重启接口未加载。请在插件目录执行 pnpm build，然后完全重启 dsh web（仅刷新浏览器不够）。",
				restartHint: "请在运行 dsh web 的终端中停止后重新启动，或换用支持一键重启的环境。",
				hostApiMissing: "Host 端接口未就绪。请在插件目录执行 pnpm build，然后完全重启 dsh web / Desktop。",
				layoutCols3: "三列",
				layoutCols1: "单列",
				layoutLabel: "布局",
				tabInstalled: "已安装",
				tabNotInstalled: "未安装",
				emptyInstalled: "暂无已安装插件",
				emptyNotInstalled: "暂无未安装插件",
				upgradeAvailable: "可升级",
				upgrade: "升级",
				upgradeTo: "升级至 {version}",
				upgrading: "升级中…",
				upgradeFailed: "升级失败",
				upgradeOk: "升级完成，请重启服务后生效。",
				upgradeOkVersion: "已升级至 {version}，请重启服务后生效。",
				upgradeModalTitleConfirm: "升级插件",
				upgradeModalConfirmHint: "将按运营配置的仓库标签安装推荐版本，完成后需重启服务生效。",
				upgradeModalConfirmHintVersion: "将升级至运营目标版本 {version}，完成后需重启服务生效。",
				upgradeModalStart: "开始升级",
				upgradeModalTitleRunning: "正在升级插件",
				upgradeModalTitleSuccess: "升级完成",
				upgradeModalTitleFailed: "升级失败",
				upgradeModalRunning: "正在执行 dsh plugin add，请勿关闭窗口…",
				upgradeModalTargetVersion: "目标",
				upgradeModalRemoteVersion: "远端 package.json 版本",
				checkingRemoteVersion: "正在读取远端 package.json 版本…",
				remoteVersionUnknown: "未知",
				pluginEnabled: "已启用",
				pluginDisabled: "已禁用",
				toggleEnable: "启用",
				toggleDisable: "禁用",
				toggling: "切换中…",
				toggleFailed: "开关失败"
			},
			"en-US": {
				nav: "Apps",
				title: "Apps",
				subtitle: "Discover DSH plugins: install picks a repository by network. Docs and homepage are in each card footer.",
				searchPlaceholder: "Search plugins…",
				filterAll: "All sources",
				sourceX6: "X6",
				sourceCommunity: "DSH community",
				layerAll: "All layers",
				categoryAll: "All categories",
				categoryNavTitle: "Categories",
				collapseCategories: "Collapse categories",
				expandCategories: "Expand categories",
				layerCore: "Core",
				layerFeature: "Feature",
				loadFailed: "Failed to load",
				empty: "No published plugins yet",
				install: "Install",
				installing: "Installing…",
				installed: "Installed",
				uninstall: "Uninstall",
				uninstalling: "Uninstalling…",
				uninstallConfirm: "Uninstall \"{name}\"? Restart the service afterward to apply.",
				uninstallFailed: "Uninstall failed",
				uninstallOk: "Uninstalled. Restart the service to apply changes.",
				uninstallModalTitleConfirm: "Uninstall plugin",
				uninstallModalConfirmHint: "Start uninstallation? This runs dsh plugin remove. Restart the service when it finishes.",
				uninstallModalStart: "Start uninstall",
				uninstallModalTitleRunning: "Uninstalling plugin",
				uninstallModalTitleSuccess: "Uninstall complete",
				uninstallModalTitleFailed: "Uninstall failed",
				uninstallModalRunning: "Running dsh plugin remove — please keep this window open…",
				installOk: "Installed. Restart the app to activate the plugin.",
				installOkVia: "Installed via {provider}. Restart the service to activate the plugin.",
				installFailed: "Install failed",
				installWait: "Please wait…",
				installModalTitleConfirm: "Install plugin",
				installModalConfirmHint: "Start installation? This runs dsh plugin add. Restart the service when it finishes.",
				installModalStart: "Start install",
				installModalCancel: "Cancel",
				installModalTitleRunning: "Installing plugin",
				installModalTitleSuccess: "Install complete",
				installModalTitleFailed: "Install failed",
				installModalPlugin: "Plugin",
				installModalPackage: "Package",
				installModalRunning: "Running dsh plugin add — please keep this window open…",
				installModalShowLog: "Show install log",
				installModalHideLog: "Hide install log",
				installModalClose: "Close",
				installModalWorking: "Installing…",
				installModalFailedHint: "Expand the log to see commands and terminal output for each channel.",
				openRepo: "Repository",
				openDocs: "Docs",
				openHomepage: "Homepage",
				officialSite: "X6 official site",
				githubPlugins: "GitHub community",
				loadMore: "Load more",
				close: "Close",
				restart: "Restart app",
				restartServiceConfirmTitle: "Confirm restart",
				restartService: "Restart service",
				restartServiceHint: "This relaunches the dsh web Host process. The page will disconnect briefly.",
				restartServiceConfirm: "Restart the dsh web service now? The page will disconnect briefly.",
				restartServiceConfirmAction: "Confirm restart",
				restartServiceCancel: "Cancel",
				restartServiceWorking: "Restarting service",
				restartServiceWorkingButton: "Restarting…",
				restartServiceWorkingHint: "The Host is restarting. This page will reload in a few seconds…",
				restartServiceFailed: "Restart failed. Check the terminal or restart dsh web manually.",
				restartApiMissing: "Host restart API is not loaded. Run pnpm build in the plugin directory, then fully restart dsh web (refreshing the browser is not enough).",
				restartHint: "Stop and rerun dsh web in your terminal, or use an environment that supports one-click restart.",
				hostApiMissing: "Host API is not ready. Run pnpm build in the plugin directory, then fully restart dsh web / Desktop.",
				layoutCols3: "3 columns",
				layoutCols1: "1 column",
				layoutLabel: "Layout",
				tabInstalled: "Installed",
				tabNotInstalled: "Not installed",
				emptyInstalled: "No installed plugins",
				emptyNotInstalled: "No plugins to install",
				upgradeAvailable: "Update available",
				upgrade: "Upgrade",
				upgradeTo: "Upgrade to {version}",
				upgrading: "Upgrading…",
				upgradeFailed: "Upgrade failed",
				upgradeOk: "Upgraded. Restart the service to apply changes.",
				upgradeOkVersion: "Upgraded to {version}. Restart the service to apply changes.",
				upgradeModalTitleConfirm: "Upgrade plugin",
				upgradeModalConfirmHint: "Install the recommended release from the operational repository ref. Restart the service when it finishes.",
				upgradeModalConfirmHintVersion: "Upgrade to operational target version {version}. Restart the service when it finishes.",
				upgradeModalStart: "Start upgrade",
				upgradeModalTitleRunning: "Upgrading plugin",
				upgradeModalTitleSuccess: "Upgrade complete",
				upgradeModalTitleFailed: "Upgrade failed",
				upgradeModalRunning: "Running dsh plugin add — please keep this window open…",
				upgradeModalTargetVersion: "Target",
				upgradeModalRemoteVersion: "Remote package.json version",
				checkingRemoteVersion: "Reading remote package.json version…",
				remoteVersionUnknown: "Unknown",
				pluginEnabled: "Enabled",
				pluginDisabled: "Disabled",
				toggleEnable: "Enable",
				toggleDisable: "Disable",
				toggling: "Toggling…",
				toggleFailed: "Toggle failed"
			}
		};
		/** Resolve locale tag to skill-market dictionary accessor. */
		function skillMarketT(locale) {
			const tag = locale?.startsWith("zh") ? "zh-CN" : "en-US";
			const dict = skillMarketMessages[tag];
			return (key) => dict[key];
		}
		function skillMarketLocaleParam(locale) {
			return locale?.startsWith("zh") ? "zh-CN" : "en-US";
		}
		//#endregion
		//#region lib/types/client/skill-market/useSkillMarket.js
		const PAGE_SIZE = 12;
		async function loadInventory(ctx) {
			const result = await ctx.remote.pluginInventory.list();
			if (!result.ok) return /* @__PURE__ */ new Set();
			const names = /* @__PURE__ */ new Set();
			for (const entry of result.value.entries) {
				names.add(entry.moduleName);
				names.add(entry.moduleName.replace(/^@/, ""));
			}
			return names;
		}
		function isInstalled(item, installed) {
			if (installed.has(item.package_name)) return true;
			const short = item.package_name.includes("/") ? item.package_name.slice(item.package_name.indexOf("/") + 1) : item.package_name;
			return installed.has(short);
		}
		function useSkillMarket({ ctx, locale, open }) {
			const t = (0, react.useMemo)(() => skillMarketT(locale), [locale]);
			const apiLocale = (0, react.useMemo)(() => skillMarketLocaleParam(locale), [locale]);
			const [loading, setLoading] = (0, react.useState)(false);
			const [items, setItems] = (0, react.useState)([]);
			const [page, setPage] = (0, react.useState)(1);
			const [hasNext, setHasNext] = (0, react.useState)(false);
			const [keyword, setKeyword] = (0, react.useState)("");
			const [query, setQuery] = (0, react.useState)("");
			const [source, setSource] = (0, react.useState)("all");
			const [layer, setLayer] = (0, react.useState)("all");
			const [category, setCategory] = (0, react.useState)("all");
			const [categories, setCategories] = (0, react.useState)([]);
			const [error, setError] = (0, react.useState)();
			const [installedNames, setInstalledNames] = (0, react.useState)(/* @__PURE__ */ new Set());
			const [installingCode, setInstallingCode] = (0, react.useState)();
			const [uninstallingCode, setUninstallingCode] = (0, react.useState)();
			const [installProgress, setInstallProgress] = (0, react.useState)();
			const [installTab, setInstallTab] = (0, react.useState)("not_installed");
			const [upgradeByCode, setUpgradeByCode] = (0, react.useState)({});
			const [toggleByPackage, setToggleByPackage] = (0, react.useState)({});
			const [togglingPackage, setTogglingPackage] = (0, react.useState)();
			const operationLockRef = (0, react.useRef)(false);
			const isOperating = installProgress?.phase === "running" || togglingPackage !== void 0;
			const hasOperationModal = installProgress !== void 0;
			const refreshInventory = (0, react.useCallback)(async () => {
				try {
					setInstalledNames(await loadInventory(ctx));
				} catch {
					setInstalledNames(/* @__PURE__ */ new Set());
				}
			}, [ctx]);
			const load = (0, react.useCallback)(async (pageNum, append) => {
				setLoading(true);
				setError(void 0);
				try {
					const data = await listPluginListings({
						locale: apiLocale,
						page: pageNum,
						page_size: PAGE_SIZE,
						...query.length > 0 ? { q: query } : {},
						...source !== "all" ? { source } : {},
						...layer !== "all" ? { layer } : {},
						...category !== "all" ? { category } : {}
					});
					setItems((prev) => append ? [...prev, ...data.items ?? []] : data.items ?? []);
					setHasNext(!!data.has_next_page);
					setPage(data.page ?? pageNum);
				} catch (e) {
					const message = e instanceof Error ? e.message : t("loadFailed");
					setError(message === "HOST_API_NOT_FOUND" ? t("hostApiMissing") : message);
					if (!append) setItems([]);
				} finally {
					setLoading(false);
				}
			}, [
				apiLocale,
				query,
				source,
				layer,
				category,
				t
			]);
			(0, react.useEffect)(() => {
				if (!open) return;
				listPluginCategories({ locale: apiLocale }).then((data) => {
					setCategories(data.items ?? []);
				}).catch(() => {
					setCategories([]);
				});
			}, [open, apiLocale]);
			(0, react.useEffect)(() => {
				if (!open) return;
				refreshInventory();
			}, [open, refreshInventory]);
			(0, react.useEffect)(() => {
				if (!open) return;
				load(1, false);
			}, [
				open,
				query,
				source,
				layer,
				category,
				load
			]);
			const refreshUpgradeStatus = (0, react.useCallback)(async (codes) => {
				if (codes.length === 0) {
					setUpgradeByCode({});
					return;
				}
				try {
					const data = await fetchPluginUpgradeStatus(codes, apiLocale);
					const next = {};
					for (const entry of data.items ?? []) next[entry.install_code] = entry;
					setUpgradeByCode(next);
				} catch {
					setUpgradeByCode({});
				}
			}, [apiLocale]);
			(0, react.useEffect)(() => {
				if (!open || installTab !== "installed") return;
				const codes = items.filter((item) => isInstalled(item, installedNames)).map((item) => item.install_code);
				refreshUpgradeStatus(codes);
			}, [
				open,
				installTab,
				items,
				installedNames,
				refreshUpgradeStatus
			]);
			const refreshToggleStatus = (0, react.useCallback)(async (packageNames) => {
				if (packageNames.length === 0) {
					setToggleByPackage({});
					return;
				}
				try {
					const data = await fetchPluginToggleStatus(packageNames);
					const next = {};
					for (const entry of data.items ?? []) next[entry.package_name] = entry;
					setToggleByPackage(next);
				} catch {
					setToggleByPackage({});
				}
			}, []);
			(0, react.useEffect)(() => {
				if (!open || installTab !== "installed") return;
				const names = items.filter((item) => isInstalled(item, installedNames)).map((item) => item.package_name);
				refreshToggleStatus(names);
			}, [
				open,
				installTab,
				items,
				installedNames,
				refreshToggleStatus
			]);
			const onSearch = (0, react.useCallback)(() => {
				setQuery(keyword.trim());
			}, [keyword]);
			const closeInstallProgress = (0, react.useCallback)(() => {
				setInstallProgress(void 0);
				setInstallingCode(void 0);
				setUninstallingCode(void 0);
			}, []);
			const toggleInstallLog = (0, react.useCallback)(() => {
				setInstallProgress((prev) => prev === void 0 ? prev : {
					...prev,
					showLog: !prev.showLog
				});
			}, []);
			const runInstall = (0, react.useCallback)(async (item) => {
				if (operationLockRef.current) return;
				operationLockRef.current = true;
				setInstallingCode(item.install_code);
				setInstallProgress({
					operation: "install",
					item,
					phase: "running",
					log: "",
					showLog: true
				});
				setError(void 0);
				try {
					const result = await installPlugin(item.install_code, apiLocale);
					const log = result.log ?? (result.cliCommand.length > 0 ? `$ ${result.cliCommand}\n` : "");
					setInstallProgress({
						operation: "install",
						item,
						phase: "success",
						log,
						showLog: true,
						provider: result.provider
					});
					await refreshInventory();
					if (installTab === "installed") await refreshUpgradeStatus([item.install_code]);
				} catch (e) {
					const raw = e instanceof Error ? e.message : t("installFailed");
					const message = raw === "HOST_API_NOT_FOUND" ? t("hostApiMissing") : raw;
					const log = e instanceof InstallPluginError ? e.log ?? "" : "";
					setInstallProgress({
						operation: "install",
						item,
						phase: "error",
						log,
						showLog: true,
						errorMessage: message
					});
				} finally {
					setInstallingCode(void 0);
					operationLockRef.current = false;
				}
			}, [
				apiLocale,
				installTab,
				refreshInventory,
				refreshUpgradeStatus,
				t
			]);
			const onInstall = (0, react.useCallback)((item) => {
				if (operationLockRef.current || hasOperationModal) return;
				setInstallProgress({
					operation: "install",
					item,
					phase: "confirm",
					log: "",
					showLog: false
				});
			}, [hasOperationModal]);
			const startInstall = (0, react.useCallback)(() => {
				if (installProgress?.operation !== "install" || installProgress.phase !== "confirm") return;
				runInstall(installProgress.item);
			}, [installProgress, runInstall]);
			const runUpgrade = (0, react.useCallback)(async (item, targetVersion, remoteVersion) => {
				if (operationLockRef.current) return;
				operationLockRef.current = true;
				setInstallingCode(item.install_code);
				const versionFields = {
					...targetVersion !== void 0 && targetVersion.length > 0 ? { targetVersion } : {},
					...remoteVersion !== void 0 && remoteVersion.length > 0 ? { remoteVersion } : {}
				};
				setInstallProgress({
					operation: "upgrade",
					item,
					phase: "running",
					log: "",
					showLog: true,
					...versionFields
				});
				setError(void 0);
				try {
					const result = await installPlugin(item.install_code, apiLocale);
					const log = result.log ?? (result.cliCommand.length > 0 ? `$ ${result.cliCommand}\n` : "");
					setInstallProgress({
						operation: "upgrade",
						item,
						phase: "success",
						log,
						showLog: true,
						provider: result.provider,
						...versionFields
					});
					await refreshInventory();
					await refreshUpgradeStatus([item.install_code]);
				} catch (e) {
					const raw = e instanceof Error ? e.message : t("upgradeFailed");
					const message = raw === "HOST_API_NOT_FOUND" ? t("hostApiMissing") : raw;
					const log = e instanceof InstallPluginError ? e.log ?? "" : "";
					setInstallProgress({
						operation: "upgrade",
						item,
						phase: "error",
						log,
						showLog: true,
						errorMessage: message,
						...versionFields
					});
				} finally {
					setInstallingCode(void 0);
					operationLockRef.current = false;
				}
			}, [
				apiLocale,
				refreshInventory,
				refreshUpgradeStatus,
				t
			]);
			const onUpgrade = (0, react.useCallback)((item) => {
				if (operationLockRef.current || hasOperationModal) return;
				const status = upgradeByCode[item.install_code];
				if (status?.upgradeable !== true) return;
				const listingVersion = status.listing_version ?? item.version?.trim() ?? void 0;
				operationLockRef.current = true;
				setInstallProgress({
					operation: "upgrade",
					item,
					phase: "running",
					log: "",
					showLog: false,
					...listingVersion !== void 0 && listingVersion.length > 0 ? { targetVersion: listingVersion } : {}
				});
				(async () => {
					try {
						const remote = await fetchPluginRemoteVersion(item.install_code, apiLocale);
						setInstallProgress({
							operation: "upgrade",
							item,
							phase: "confirm",
							log: "",
							showLog: false,
							...listingVersion !== void 0 && listingVersion.length > 0 ? { targetVersion: listingVersion } : {},
							...remote.version !== null && remote.version.length > 0 ? { remoteVersion: remote.version } : {}
						});
					} catch {
						setInstallProgress({
							operation: "upgrade",
							item,
							phase: "confirm",
							log: "",
							showLog: false,
							...listingVersion !== void 0 && listingVersion.length > 0 ? { targetVersion: listingVersion } : {}
						});
					} finally {
						operationLockRef.current = false;
					}
				})();
			}, [
				apiLocale,
				hasOperationModal,
				upgradeByCode
			]);
			const startUpgrade = (0, react.useCallback)(() => {
				if (installProgress?.operation !== "upgrade" || installProgress.phase !== "confirm") return;
				runUpgrade(installProgress.item, installProgress.targetVersion, installProgress.remoteVersion);
			}, [installProgress, runUpgrade]);
			const runUninstall = (0, react.useCallback)(async (item) => {
				if (operationLockRef.current) return;
				operationLockRef.current = true;
				setUninstallingCode(item.install_code);
				setInstallProgress({
					operation: "uninstall",
					item,
					phase: "running",
					log: "",
					showLog: true
				});
				setError(void 0);
				try {
					const result = await uninstallPlugin(item.package_name, item.install_code);
					const log = result.log ?? (result.cliCommand.length > 0 ? `$ ${result.cliCommand}\n` : "");
					setInstallProgress({
						operation: "uninstall",
						item,
						phase: "success",
						log,
						showLog: true
					});
					await refreshInventory();
					if (installTab === "installed") await refreshUpgradeStatus([item.install_code]);
				} catch (e) {
					const raw = e instanceof Error ? e.message : t("uninstallFailed");
					const message = raw === "HOST_API_NOT_FOUND" ? t("hostApiMissing") : raw;
					const log = e instanceof InstallPluginError ? e.log ?? "" : "";
					setInstallProgress({
						operation: "uninstall",
						item,
						phase: "error",
						log,
						showLog: true,
						errorMessage: message
					});
				} finally {
					setUninstallingCode(void 0);
					operationLockRef.current = false;
				}
			}, [
				installTab,
				refreshInventory,
				refreshUpgradeStatus,
				t
			]);
			const onUninstall = (0, react.useCallback)((item) => {
				if (operationLockRef.current || hasOperationModal || !canUninstallPlugin(item)) return;
				setInstallProgress({
					operation: "uninstall",
					item,
					phase: "confirm",
					log: "",
					showLog: false
				});
			}, [hasOperationModal]);
			const startUninstall = (0, react.useCallback)(() => {
				if (installProgress?.operation !== "uninstall" || installProgress.phase !== "confirm") return;
				runUninstall(installProgress.item);
			}, [installProgress, runUninstall]);
			const checkInstalled = (0, react.useCallback)((item) => isInstalled(item, installedNames), [installedNames]);
			const checkCanUninstall = (0, react.useCallback)((item) => canUninstallPlugin(item), []);
			const getUpgradeStatus = (0, react.useCallback)((item) => upgradeByCode[item.install_code], [upgradeByCode]);
			return {
				t,
				loading,
				items,
				page,
				hasNext,
				keyword,
				setKeyword,
				source,
				setSource,
				layer,
				setLayer,
				category,
				setCategory,
				categories,
				error,
				installingCode,
				uninstallingCode,
				togglingPackage,
				isOperating,
				hasOperationModal,
				installProgress,
				installedNames,
				installTab,
				setInstallTab,
				upgradeByCode,
				toggleByPackage,
				onSearch,
				onInstall,
				startInstall,
				onUpgrade,
				startUpgrade,
				onUninstall,
				startUninstall,
				closeInstallProgress,
				toggleInstallLog,
				loadMore: () => {
					load(page + 1, true);
				},
				isInstalled: checkInstalled,
				canUninstall: checkCanUninstall,
				canToggle: (0, react.useCallback)((item) => canTogglePlugin(item), []),
				getToggleStatus: (0, react.useCallback)((item) => toggleByPackage[item.package_name], [toggleByPackage]),
				onToggle: (0, react.useCallback)((item, enabled) => {
					if (operationLockRef.current || hasOperationModal || !canTogglePlugin(item)) return;
					operationLockRef.current = true;
					setTogglingPackage(item.package_name);
					(async () => {
						try {
							const result = await setPluginEnabled(item.package_name, enabled);
							setToggleByPackage((prev) => ({
								...prev,
								[item.package_name]: {
									package_name: item.package_name,
									enabled: result.enabled,
									row_ids: result.row_ids,
									toggleable: true
								}
							}));
							if (result.needsRefresh) window.setTimeout(() => {
								window.location.reload();
							}, 1200);
						} catch (e) {
							const raw = e instanceof Error ? e.message : t("toggleFailed");
							setError(raw === "HOST_API_NOT_FOUND" ? t("hostApiMissing") : raw);
						} finally {
							setTogglingPackage(void 0);
							operationLockRef.current = false;
						}
					})();
				}, [hasOperationModal, t]),
				getUpgradeStatus
			};
		}
		//#endregion
		//#region lib/types/client/skill-market/SkillMarketPage.js
		/** Main-panel body for the X6 app marketplace. */
		/** Full-page skill market opened from the sidebar「应用」entry. */
		function SkillMarketPage({ ctx, settings }) {
			const locale = useClientLocale(ctx);
			const lineId = useActiveLineId(settings);
			const officialSiteUrl = (0, react.useMemo)(() => buildOfficialSiteUrl({
				lineId,
				locale: locale ?? null
			}), [lineId, locale]);
			return (0, react_jsx_runtime.jsx)(SkillMarketPanel, {
				state: useSkillMarket({
					ctx,
					locale,
					open: (0, react.useSyncExternalStore)((onStoreChange) => ctx.layout.panelInfo.subscribe(onStoreChange), () => ctx.layout.panelInfo.getSnapshot().activePanelId, () => null) === PANEL_ID
				}),
				officialSiteUrl,
				embedded: true,
				onClose: () => {
					ctx.layout.selectPanel(null);
				}
			});
		}
		function SkillMarketPanelIcon(props) {
			const { size } = props;
			return (0, react_jsx_runtime.jsxs)("svg", {
				width: size,
				height: size,
				viewBox: "0 0 16 16",
				fill: "none",
				"aria-hidden": true,
				children: [
					(0, react_jsx_runtime.jsx)("rect", {
						x: "2",
						y: "2",
						width: "5",
						height: "5",
						rx: "1.2",
						stroke: "currentColor",
						strokeWidth: "1.2"
					}),
					(0, react_jsx_runtime.jsx)("rect", {
						x: "9",
						y: "2",
						width: "5",
						height: "5",
						rx: "1.2",
						stroke: "currentColor",
						strokeWidth: "1.2"
					}),
					(0, react_jsx_runtime.jsx)("rect", {
						x: "2",
						y: "9",
						width: "5",
						height: "5",
						rx: "1.2",
						stroke: "currentColor",
						strokeWidth: "1.2"
					}),
					(0, react_jsx_runtime.jsx)("rect", {
						x: "9",
						y: "9",
						width: "5",
						height: "5",
						rx: "1.2",
						stroke: "currentColor",
						strokeWidth: "1.2"
					})
				]
			});
		}
		//#endregion
		//#region lib/types/client/skill-market/index.js
		/** Register「应用」panellist entry + main page (order above Plugins). */
		function registerSkillMarket(ctx, settings) {
			ctx.slots.inject("main", () => ctx.slots.register({
				name: "main",
				key: PANEL_ID
			}, () => (0, react_jsx_runtime.jsx)(SkillMarketPage, {
				ctx,
				settings
			})));
			ctx.slots.inject("sidebar.panellist", () => ctx.slots.register({
				name: "sidebar.panellist",
				id: PANEL_ID,
				order: -10,
				label: () => skillMarketT(ctx.locale.getSnapshot().active)("nav")
			}, (props) => (0, react_jsx_runtime.jsx)(SkillMarketPanelIcon, {
				size: props.size,
				active: props.active
			})));
		}
		//#endregion
		//#region lib/types/client/wallet/patchSettingsNavIcon.js
		/** Swap the settings-nav gear for a wallet glyph on the X6 balance section. */
		const NAV_LABELS = /* @__PURE__ */ new Set(["用户余额", "User balance"]);
		const WALLET_MARKUP = [
			"<rect x=\"1.5\" y=\"3.5\" width=\"13\" height=\"9\" rx=\"2\" stroke=\"currentColor\" stroke-width=\"1.3\" fill=\"none\"></rect>",
			"<path d=\"M1.5 6.5h13\" stroke=\"currentColor\" stroke-width=\"1.3\" fill=\"none\"></path>",
			"<circle cx=\"11.5\" cy=\"9.5\" r=\"1\" fill=\"currentColor\"></circle>"
		].join("");
		function isWalletNavButton(button) {
			const label = button.textContent?.replace(/\s+/g, " ").trim() ?? "";
			return [...NAV_LABELS].some((name) => label.includes(name));
		}
		/** Replace gear SVG inside the「用户余额」nav cell with a wallet outline. */
		function patchSettingsWalletNavIcon(root = document.body) {
			const buttons = root.querySelectorAll("button");
			for (const button of buttons) {
				if (!isWalletNavButton(button)) continue;
				const svg = button.querySelector("svg");
				if (svg === null) continue;
				if (svg.dataset["x6WalletIcon"] === "1") continue;
				svg.dataset["x6WalletIcon"] = "1";
				svg.setAttribute("viewBox", "0 0 16 16");
				svg.setAttribute("fill", "none");
				svg.setAttribute("aria-hidden", "true");
				svg.innerHTML = WALLET_MARKUP;
			}
		}
		/** Keep the wallet nav glyph in sync while Settings mounts. */
		function watchSettingsWalletNavIcon() {
			const run = () => {
				patchSettingsWalletNavIcon(document.body);
			};
			run();
			const observer = new MutationObserver(run);
			observer.observe(document.body, {
				childList: true,
				subtree: true,
				characterData: true
			});
			return () => observer.disconnect();
		}
		//#endregion
		//#region lib/types/client/wallet/cache.js
		/** In-memory wallet snapshot cache (1 minute). */
		let cache;
		function localeKey(locale) {
			return locale ?? "";
		}
		/** True when a fresh cache entry exists for this locale. */
		function hasFreshWalletCache(locale, now = Date.now()) {
			if (cache === void 0) return false;
			if (cache.localeKey !== localeKey(locale)) return false;
			return now - cache.fetchedAt < WALLET_POLL_MS;
		}
		/** Read cache without network (undefined when missing / stale / locale mismatch). */
		function peekWalletCache(locale) {
			if (!hasFreshWalletCache(locale)) return void 0;
			return cache?.snapshot;
		}
		/**
		* Load wallet status + balance, reusing a ≤1min cache unless `force`.
		* @param locale - UI locale forwarded to balance API.
		* @param force - bypass cache (manual「刷新」).
		*/
		async function loadWalletSnapshot(locale, force = false) {
			if (!force) {
				const hit = peekWalletCache(locale);
				if (hit !== void 0) return hit;
			}
			const status = await fetchWalletStatus();
			if (status.connected && status.credentialAligned === false) {
				const snapshot = {
					kind: "mismatch",
					status
				};
				cache = {
					localeKey: localeKey(locale),
					snapshot,
					fetchedAt: Date.now()
				};
				return snapshot;
			}
			const snapshot = {
				kind: "ok",
				status,
				balance: await fetchWalletBalance(locale)
			};
			cache = {
				localeKey: localeKey(locale),
				snapshot,
				fetchedAt: Date.now()
			};
			return snapshot;
		}
		//#endregion
		//#region lib/types/client/wallet/format.js
		/** Format wallet amount for sidebar / panel display. */
		function asTrimmed(value) {
			return typeof value === "string" ? value.trim() : "";
		}
		/** Compact currency label for the sidebar trigger. */
		function formatWalletAmount(balance, currency) {
			const amount = asTrimmed(balance);
			const code = asTrimmed(currency).toUpperCase();
			if (amount.length === 0) return "—";
			if (code === "USD") return `$${amount}`;
			if (code.length === 0) return amount;
			return `${amount} ${code}`;
		}
		/** Compact points label (zh: 积分 / en: pts). */
		function formatPointsRemaining(points, locale) {
			const amount = asTrimmed(points);
			if (amount.length === 0 || amount === "0") return "—";
			return `${amount} ${locale?.startsWith("zh") ? "积分" : "pts"}`;
		}
		/** Format unix seconds for panel secondary rows; empty when unset. */
		function formatWalletUnixDate(unixSeconds, locale) {
			if (unixSeconds === null || unixSeconds === void 0) return void 0;
			if (!Number.isFinite(unixSeconds) || unixSeconds <= 0) return void 0;
			try {
				return (/* @__PURE__ */ new Date(unixSeconds * 1e3)).toLocaleString(locale?.startsWith("zh") ? "zh-CN" : "en-US", {
					dateStyle: "medium",
					timeStyle: "short"
				});
			} catch {
				return;
			}
		}
		//#endregion
		//#region lib/types/client/wallet/locales.js
		/** Wallet sidebar locale dictionary. */
		const zh = {
			nav: "用户余额",
			title: "X6 余额",
			close: "关闭",
			tabAccount: "账户",
			tabSubscription: "订阅",
			balanceLabel: "账户余额",
			pointsLabel: "剩余积分",
			pointsGrantedLabel: "本周期额度",
			orgLabel: "组织",
			resetAtLabel: "下次积分重置",
			periodEndLabel: "周期结束",
			refresh: "刷新",
			loading: "正在加载余额…",
			configureBudget: "配置预算",
			budgetHint: "配额预算请登录到控制台中进行配置",
			reauthHint: "会话已失效。请打开设置 → 模型，重新执行 X6 快速配置。",
			keyMismatchHint: "API Key 已变更，请打开设置 → 模型，重新执行 X6 快速配置。",
			reconfigureNeeded: "需重新配置",
			hostApiMissing: "Host 余额接口未加载。请在插件目录执行 pnpm build 后完全重启 dsh web。",
			error: "无法获取余额。",
			notConnected: "尚未配置 X6。"
		};
		const en = {
			nav: "User balance",
			title: "X6 balance",
			close: "Close",
			tabAccount: "Account",
			tabSubscription: "Subscription",
			balanceLabel: "Account balance",
			pointsLabel: "Points remaining",
			pointsGrantedLabel: "Period grant",
			orgLabel: "Organization",
			resetAtLabel: "Next points reset",
			periodEndLabel: "Period ends",
			refresh: "Refresh",
			loading: "Loading balance…",
			configureBudget: "Configure budget",
			budgetHint: "Sign in to the console to configure quota budgets.",
			reauthHint: "Session expired. Open Settings → Models and run X6 Quick Setup again.",
			keyMismatchHint: "API key changed. Open Settings → Models and run X6 Quick Setup again.",
			reconfigureNeeded: "Reconfigure",
			hostApiMissing: "Host wallet API is missing. Run pnpm build in the plugin directory, then fully restart dsh web.",
			error: "Could not load balance.",
			notConnected: "X6 is not configured yet."
		};
		/** Resolve locale tag to wallet dictionary accessor. */
		function walletT(locale) {
			const dict = locale?.startsWith("zh") ? zh : en;
			return (key) => dict[key];
		}
		//#endregion
		//#region \0dsh-css:/Users/hivanpan/Hivan/project/ykl/project/Whale/x6/x6-harness-free/plugins/packages/core/dsh-plugin-x6-core/src/client/wallet/wallet.module.css.mjs
		const css = ".EPF9QW_page{box-sizing:border-box;width:100%;max-width:560px;padding:8px 4px 24px}.EPF9QW_pagePanel{box-sizing:border-box;flex-direction:column;gap:16px;width:100%;display:flex;position:relative}.EPF9QW_layer{flex:none;align-items:center;width:100%;display:flex;position:relative}.EPF9QW_trigger{box-sizing:border-box;cursor:pointer;width:calc(100% + 4px);height:42px;color:var(--dsw-alias-label-primary);background:0 0;border:none;border-radius:12px;flex:none;align-items:center;gap:8px;margin:4px -2px;padding:0 10px 0 8px;font-family:inherit;font-size:14px;line-height:22px;display:flex;overflow:hidden}.EPF9QW_trigger:hover{background:var(--dsw-alias-interactive-bg-hover)}.EPF9QW_trigger.EPF9QW_rail{border-radius:50%;justify-content:center;gap:0;width:36px;height:36px;margin:8px 0 10px;padding:0}.EPF9QW_triggerLabel{white-space:nowrap;text-overflow:ellipsis;overflow:hidden}.EPF9QW_amountLabel{font-variant-numeric:tabular-nums;letter-spacing:.01em;font-weight:600}.EPF9QW_triggerFade{animation:.35s EPF9QW_walletTriggerFade}@keyframes EPF9QW_walletTriggerFade{0%{opacity:.35}to{opacity:1}}.EPF9QW_overlay{z-index:1000;justify-content:center;align-items:center;display:flex;position:fixed;inset:0}.EPF9QW_mask{background:var(--dsw-alias-bg-mask-1);backdrop-filter:var(--dsw-mask-blur);position:absolute;inset:0}.EPF9QW_panel{z-index:1;box-sizing:border-box;background:var(--dsw-alias-bg-layer-2);width:min(420px,100vw - 32px);max-height:min(520px,100vh - 32px);box-shadow:var(--dsw-shadow-lv3);border-radius:20px;flex-direction:column;gap:16px;padding:20px 22px 22px;display:flex;position:relative;overflow:auto}.EPF9QW_header{justify-content:space-between;align-items:flex-start;gap:16px;display:flex}.EPF9QW_headerAside{flex:none;justify-content:flex-end;align-items:flex-start;gap:10px;min-width:0;display:flex}.EPF9QW_title{color:var(--dsw-alias-label-primary);margin:0;font-size:20px;font-weight:650;line-height:1.3}.EPF9QW_orgBlock{text-align:right;flex-direction:column;align-items:flex-end;gap:2px;min-width:0;display:flex}.EPF9QW_orgCaption{color:var(--dsw-alias-label-tertiary);margin:0;font-size:12px;line-height:1.4}.EPF9QW_orgName{color:var(--dsw-alias-label-primary);margin:0;font-size:15px;font-weight:600;line-height:1.35}.EPF9QW_closeBtn{width:32px;height:32px;color:var(--dsw-alias-label-secondary);cursor:pointer;background:0 0;border:none;border-radius:8px;flex:none;font-size:18px;line-height:1}.EPF9QW_closeBtn:hover{background:var(--dsw-alias-interactive-bg-hover)}.EPF9QW_metricGrid{grid-template-columns:repeat(2,minmax(0,1fr));gap:12px;display:grid}@media (width<=520px){.EPF9QW_metricGrid{grid-template-columns:1fr}}.EPF9QW_metricCard{border:1px solid var(--dsw-alias-border-l2);background:var(--dsw-alias-bg-layer-1);box-sizing:border-box;border-radius:14px;flex-direction:column;gap:8px;padding:16px;display:flex}.EPF9QW_metricCardBalance{border-color:color-mix(in srgb,#1a9f6e 28%,var(--dsw-alias-border-l2));background:linear-gradient(160deg,#1a9f6e1f,transparent 68%),var(--dsw-alias-bg-layer-1)}.EPF9QW_metricCardPoints{border-color:color-mix(in srgb,#e67a1f 28%,var(--dsw-alias-border-l2));background:linear-gradient(160deg,#e67a1f1f,transparent 68%),var(--dsw-alias-bg-layer-1)}.EPF9QW_metricLabel{color:var(--dsw-alias-label-tertiary);margin:0;font-size:12px;font-weight:500;line-height:1.4}.EPF9QW_metricValue{color:var(--dsw-alias-label-primary);font-variant-numeric:tabular-nums;margin:0;font-size:26px;font-weight:650;line-height:1.2}.EPF9QW_metricValueBalance{color:#178a5f}.EPF9QW_metricValuePoints{color:#e67a1f}[data-theme=dark] .EPF9QW_metricValueBalance,.dark .EPF9QW_metricValueBalance{color:#3dd68c}[data-theme=dark] .EPF9QW_metricValuePoints,.dark .EPF9QW_metricValuePoints{color:#ff9a3d}.EPF9QW_metaList{border-top:1px solid var(--dsw-alias-border-l2);flex-direction:column;gap:0;margin:0;padding:4px 2px 0;display:flex}.EPF9QW_metaRow{border-bottom:1px solid var(--dsw-alias-border-l2);justify-content:space-between;align-items:baseline;gap:16px;padding:10px 0;display:flex}.EPF9QW_metaRow:last-child{border-bottom:none}.EPF9QW_metaRow dt{color:var(--dsw-alias-label-secondary);margin:0;font-size:13px;line-height:1.4}.EPF9QW_metaRow dd{color:var(--dsw-alias-label-primary);font-variant-numeric:tabular-nums;text-align:right;margin:0;font-size:13px;font-weight:500;line-height:1.4}.EPF9QW_hint{color:var(--dsw-alias-label-tertiary);margin:0;font-size:12px;line-height:1.5}.EPF9QW_status{color:var(--dsw-alias-label-secondary);margin:0;font-size:13px;line-height:1.5}.EPF9QW_error{color:var(--dsw-alias-status-danger,#c62828);margin:0;font-size:13px;line-height:1.5}.EPF9QW_actions{flex-wrap:wrap;gap:8px;display:flex}.EPF9QW_button{background:var(--dsw-alias-interactive-bg-primary,#1212f9);color:#fff;cursor:pointer;border:none;border-radius:10px;justify-content:center;align-items:center;min-height:36px;padding:0 14px;font-family:inherit;font-size:13px;font-weight:500;display:inline-flex}.EPF9QW_button:disabled{opacity:.55;cursor:not-allowed}.EPF9QW_buttonSecondary{border:1px solid var(--dsw-alias-border-primary,#0000001f);min-height:36px;color:var(--dsw-alias-label-primary);cursor:pointer;background:0 0;border-radius:10px;justify-content:center;align-items:center;padding:0 14px;font-family:inherit;font-size:13px;font-weight:500;display:inline-flex}.EPF9QW_buttonSecondary:disabled{opacity:.55;cursor:not-allowed}";
		const tagId = "@x6_ai/dsh-plugin-x6-core/wallet.module.css";
		if (typeof document !== "undefined" && document.querySelector("style[data-plugin-css=" + JSON.stringify(tagId) + "]") === null) {
			const tag = document.createElement("style");
			tag.dataset.plugin = "@x6_ai/dsh-plugin-x6-core";
			tag.dataset.pluginCss = tagId;
			tag.textContent = css;
			document.head.appendChild(tag);
		}
		var wallet_module_css_default = {
			"actions": "EPF9QW_actions",
			"amountLabel": "EPF9QW_amountLabel",
			"button": "EPF9QW_button",
			"buttonSecondary": "EPF9QW_buttonSecondary",
			"closeBtn": "EPF9QW_closeBtn",
			"error": "EPF9QW_error",
			"header": "EPF9QW_header",
			"headerAside": "EPF9QW_headerAside",
			"hint": "EPF9QW_hint",
			"layer": "EPF9QW_layer",
			"mask": "EPF9QW_mask",
			"metaList": "EPF9QW_metaList",
			"metaRow": "EPF9QW_metaRow",
			"metricCard": "EPF9QW_metricCard",
			"metricCardBalance": "EPF9QW_metricCardBalance",
			"metricCardPoints": "EPF9QW_metricCardPoints",
			"metricGrid": "EPF9QW_metricGrid",
			"metricLabel": "EPF9QW_metricLabel",
			"metricValue": "EPF9QW_metricValue",
			"metricValueBalance": "EPF9QW_metricValueBalance",
			"metricValuePoints": "EPF9QW_metricValuePoints",
			"orgBlock": "EPF9QW_orgBlock",
			"orgCaption": "EPF9QW_orgCaption",
			"orgName": "EPF9QW_orgName",
			"overlay": "EPF9QW_overlay",
			"page": "EPF9QW_page",
			"pagePanel": "EPF9QW_pagePanel",
			"panel": "EPF9QW_panel",
			"rail": "EPF9QW_rail",
			"status": "EPF9QW_status",
			"title": "EPF9QW_title",
			"trigger": "EPF9QW_trigger",
			"triggerFade": "EPF9QW_triggerFade",
			"triggerLabel": "EPF9QW_triggerLabel",
			"walletTriggerFade": "EPF9QW_walletTriggerFade"
		};
		//#endregion
		//#region lib/types/client/wallet/WalletPanel.js
		function applySnapshot(snapshot, dict, setData, setUsagePoliciesUrl, setCredentialMismatch, setError, onBalanceChange) {
			setUsagePoliciesUrl(snapshot.status.usagePoliciesUrl);
			if (snapshot.kind === "mismatch") {
				setData(void 0);
				setCredentialMismatch(true);
				setError(dict("keyMismatchHint"));
				onBalanceChange?.(void 0);
				return;
			}
			setCredentialMismatch(false);
			setData(snapshot.balance);
			setUsagePoliciesUrl(snapshot.balance.usagePoliciesUrl);
			setError(void 0);
			onBalanceChange?.(snapshot.balance);
		}
		/** Org-first wallet layout: primary org, then balance / points cards. */
		function WalletPanel({ locale, onClose, onBalanceChange, embedded = false }) {
			const t = walletT(locale);
			const cached = peekWalletCache(locale);
			const [loading, setLoading] = (0, react.useState)(cached === void 0);
			const [data, setData] = (0, react.useState)(cached?.kind === "ok" ? cached.balance : void 0);
			const [error, setError] = (0, react.useState)(cached?.kind === "mismatch" ? t("keyMismatchHint") : void 0);
			const [sessionRevoked, setSessionRevoked] = (0, react.useState)(false);
			const [credentialMismatch, setCredentialMismatch] = (0, react.useState)(cached?.kind === "mismatch");
			const [usagePoliciesUrl, setUsagePoliciesUrl] = (0, react.useState)(cached?.status.usagePoliciesUrl ?? (cached?.kind === "ok" ? cached.balance.usagePoliciesUrl : void 0));
			const load = (0, react.useCallback)(async (force = false) => {
				const hit = !force ? peekWalletCache(locale) : void 0;
				if (hit !== void 0) {
					applySnapshot(hit, walletT(locale), setData, setUsagePoliciesUrl, setCredentialMismatch, setError, onBalanceChange);
					setSessionRevoked(false);
					setLoading(false);
					return;
				}
				setLoading(true);
				setError(void 0);
				setSessionRevoked(false);
				setCredentialMismatch(false);
				const dict = walletT(locale);
				try {
					applySnapshot(await loadWalletSnapshot(locale, force), dict, setData, setUsagePoliciesUrl, setCredentialMismatch, setError, onBalanceChange);
				} catch (cause) {
					setData(void 0);
					onBalanceChange?.(void 0);
					const err = cause;
					if (err.message === "HOST_API_NOT_FOUND" || err.message === "not found") setError(dict("hostApiMissing"));
					else if (err.code === WALLET_ERROR.sessionRevoked) {
						setSessionRevoked(true);
						setError(dict("reauthHint"));
					} else if (err.code === WALLET_ERROR.credentialMismatch) {
						setCredentialMismatch(true);
						setError(dict("keyMismatchHint"));
					} else setError(err.message.length > 0 ? err.message : dict("error"));
				} finally {
					setLoading(false);
				}
			}, [locale, onBalanceChange]);
			(0, react.useEffect)(() => {
				load(false);
			}, [load]);
			(0, react.useEffect)(() => {
				if (sessionRevoked || credentialMismatch) return;
				const timer = window.setInterval(() => {
					load(true);
				}, WALLET_POLL_MS);
				return () => {
					window.clearInterval(timer);
				};
			}, [
				credentialMismatch,
				load,
				sessionRevoked
			]);
			const openBudget = (0, react.useCallback)(() => {
				const url = usagePoliciesUrl ?? data?.usagePoliciesUrl;
				if (url === void 0 || url.length === 0) return;
				window.open(url, "_blank", "noopener,noreferrer");
			}, [data?.usagePoliciesUrl, usagePoliciesUrl]);
			const budgetUrl = usagePoliciesUrl ?? data?.usagePoliciesUrl;
			const resetAt = data === void 0 ? void 0 : formatWalletUnixDate(data.nextPointsResetAtUnix, locale);
			const periodEnd = data === void 0 ? void 0 : formatWalletUnixDate(data.periodEndUnix, locale);
			const softHint = sessionRevoked || credentialMismatch;
			const orgName = data !== void 0 && data.name.length > 0 ? data.name : void 0;
			return (0, react_jsx_runtime.jsxs)("div", {
				className: embedded ? wallet_module_css_default.pagePanel : wallet_module_css_default.panel,
				role: embedded ? "region" : "dialog",
				...embedded ? {} : { "aria-modal": true },
				"aria-labelledby": "x6-wallet-title",
				children: [
					(0, react_jsx_runtime.jsxs)("div", {
						className: wallet_module_css_default.header,
						children: [(0, react_jsx_runtime.jsx)("h2", {
							className: wallet_module_css_default.title,
							id: "x6-wallet-title",
							children: t("title")
						}), (0, react_jsx_runtime.jsxs)("div", {
							className: wallet_module_css_default.headerAside,
							children: [orgName !== void 0 ? (0, react_jsx_runtime.jsxs)("div", {
								className: wallet_module_css_default.orgBlock,
								children: [(0, react_jsx_runtime.jsx)("p", {
									className: wallet_module_css_default.orgCaption,
									children: t("orgLabel")
								}), (0, react_jsx_runtime.jsx)("p", {
									className: wallet_module_css_default.orgName,
									children: orgName
								})]
							}) : null, embedded ? null : (0, react_jsx_runtime.jsx)("button", {
								type: "button",
								className: wallet_module_css_default.closeBtn,
								"aria-label": t("close"),
								onClick: onClose,
								children: "×"
							})]
						})]
					}),
					loading && data === void 0 && !credentialMismatch ? (0, react_jsx_runtime.jsx)("p", {
						className: wallet_module_css_default.status,
						children: t("loading")
					}) : null,
					data !== void 0 ? (0, react_jsx_runtime.jsxs)(react_jsx_runtime.Fragment, { children: [(0, react_jsx_runtime.jsxs)("div", {
						className: wallet_module_css_default.metricGrid,
						children: [(0, react_jsx_runtime.jsxs)("section", {
							className: `${wallet_module_css_default.metricCard} ${wallet_module_css_default.metricCardBalance}`,
							"aria-label": t("balanceLabel"),
							children: [(0, react_jsx_runtime.jsx)("p", {
								className: wallet_module_css_default.metricLabel,
								children: t("balanceLabel")
							}), (0, react_jsx_runtime.jsx)("p", {
								className: `${wallet_module_css_default.metricValue} ${wallet_module_css_default.metricValueBalance}`,
								children: formatWalletAmount(data.availableBalance, data.currency)
							})]
						}), (0, react_jsx_runtime.jsxs)("section", {
							className: `${wallet_module_css_default.metricCard} ${wallet_module_css_default.metricCardPoints}`,
							"aria-label": t("pointsLabel"),
							children: [(0, react_jsx_runtime.jsx)("p", {
								className: wallet_module_css_default.metricLabel,
								children: t("pointsLabel")
							}), (0, react_jsx_runtime.jsx)("p", {
								className: `${wallet_module_css_default.metricValue} ${wallet_module_css_default.metricValuePoints}`,
								children: formatPointsRemaining(data.pointsRemaining, locale)
							})]
						})]
					}), (0, react_jsx_runtime.jsxs)("dl", {
						className: wallet_module_css_default.metaList,
						children: [
							data.pointsGranted.length > 0 && data.pointsGranted !== "0" ? (0, react_jsx_runtime.jsxs)("div", {
								className: wallet_module_css_default.metaRow,
								children: [(0, react_jsx_runtime.jsx)("dt", { children: t("pointsGrantedLabel") }), (0, react_jsx_runtime.jsx)("dd", { children: formatPointsRemaining(data.pointsGranted, locale) })]
							}) : null,
							resetAt !== void 0 ? (0, react_jsx_runtime.jsxs)("div", {
								className: wallet_module_css_default.metaRow,
								children: [(0, react_jsx_runtime.jsx)("dt", { children: t("resetAtLabel") }), (0, react_jsx_runtime.jsx)("dd", { children: resetAt })]
							}) : null,
							periodEnd !== void 0 ? (0, react_jsx_runtime.jsxs)("div", {
								className: wallet_module_css_default.metaRow,
								children: [(0, react_jsx_runtime.jsx)("dt", { children: t("periodEndLabel") }), (0, react_jsx_runtime.jsx)("dd", { children: periodEnd })]
							}) : null
						]
					})] }) : null,
					error !== void 0 ? (0, react_jsx_runtime.jsx)("p", {
						className: softHint ? wallet_module_css_default.hint : wallet_module_css_default.error,
						children: error
					}) : (0, react_jsx_runtime.jsx)("p", {
						className: wallet_module_css_default.hint,
						children: t("budgetHint")
					}),
					(0, react_jsx_runtime.jsxs)("div", {
						className: wallet_module_css_default.actions,
						children: [(0, react_jsx_runtime.jsx)("button", {
							type: "button",
							className: wallet_module_css_default.button,
							disabled: budgetUrl === void 0 || budgetUrl.length === 0 || credentialMismatch,
							onClick: openBudget,
							children: t("configureBudget")
						}), (0, react_jsx_runtime.jsx)("button", {
							type: "button",
							className: wallet_module_css_default.buttonSecondary,
							disabled: loading,
							onClick: () => {
								load(true);
							},
							children: t("refresh")
						})]
					})
				]
			});
		}
		//#endregion
		//#region lib/types/client/wallet/WalletSettingsSection.js
		/** Renders the existing wallet panel inside a settings section. */
		function WalletSettingsSection(props) {
			const locale = useClientLocale(props.ctx);
			return (0, react_jsx_runtime.jsx)("div", {
				className: wallet_module_css_default.page,
				children: (0, react_jsx_runtime.jsx)(WalletPanel, {
					locale,
					onClose: props.close,
					embedded: true
				})
			});
		}
		//#endregion
		//#region lib/types/client/wallet/index.js
		/** Register「用户余额」under Settings → sections. */
		function registerWallet(ctx) {
			ctx.slots.inject("settings.section", () => ctx.slots.register({
				name: "settings.section",
				id: "x6-wallet",
				order: -20,
				label: () => walletT(ctx.locale.getSnapshot().active)("nav")
			}, (owner) => (0, react_jsx_runtime.jsx)(WalletSettingsSection, {
				ctx,
				close: owner.close
			})));
			ctx.effect(() => watchSettingsWalletNavIcon(), "x6-core: wallet-nav-icon");
		}
		//#endregion
		//#region lib/types/client/index.js
		/** Required client services. */
		const inject = [
			"slots",
			"remote",
			"remote.settings",
			"remote.pluginInventory",
			"locale",
			"connection",
			"configForms",
			"layout"
		];
		/**
		* Register all X6 client features (orchestration only).
		* @param ctx - Client root context.
		*/
		function apply(ctx) {
			const settings = ctx.configForms.get(X6_SETTINGS_NS);
			registerBrand(ctx, settings);
			registerHero(ctx, settings);
			registerSignIn(ctx);
			registerWallet(ctx);
			registerSkillMarket(ctx, settings);
			registerPluginSettings(ctx, settings);
		}
		//#endregion
		exports.apply = apply;
		exports.inject = inject;
		return module.exports;
	}
});

//# sourceMappingURL=client.js.map