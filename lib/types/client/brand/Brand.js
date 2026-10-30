import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useClientLocale } from "../use-client-locale.js";
import css from './brand.module.css';
import { brandT } from "./locales.js";
import { X6_LOGO_MARK_DATA_URL } from "./logo-data.js";
/**
 * Render the X6 mark with the presentation requested by its host surface.
 * @param props - Host-supplied mark presentation.
 * @returns the X6 logo mark.
 */
export function X6BrandMark({ size, className }) {
    return (_jsx("img", { src: X6_LOGO_MARK_DATA_URL, width: size, height: size, className: className, alt: "", "aria-hidden": true, style: { display: 'block', flexShrink: 0, objectFit: 'contain' } }));
}
/**
 * Render the X6 wordmark and console subtitle without its slotted mark.
 * @returns the X6 brand name stack.
 */
export function X6BrandName({ locale }) {
    const t = brandT(locale);
    return (_jsxs("div", { className: css.brandNameStack, children: [_jsx("span", { className: css.wordmark, "aria-label": "X6", children: "X6" }), _jsx("span", { className: css.subtitle, children: t('subtitle') })] }));
}
export function X6BrandNameSlot({ ctx }) {
    const locale = useClientLocale(ctx);
    return _jsx(X6BrandName, { locale: locale });
}
//# sourceMappingURL=Brand.js.map