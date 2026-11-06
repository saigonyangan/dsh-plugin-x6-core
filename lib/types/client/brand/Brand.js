import { jsx as _jsx } from "react/jsx-runtime";
import css from './brand.module.css';
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
 * Render the X6 Harness wordmark without a subtitle row.
 * @returns the vertically centered brand name.
 */
export function X6BrandName() {
    return (_jsx("div", { className: css.brandNameStack, children: _jsx("span", { className: css.wordmark, "aria-label": "X6 Harness", children: "X6 Harness" }) }));
}
//# sourceMappingURL=Brand.js.map