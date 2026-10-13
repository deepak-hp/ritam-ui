"use client";

// ../../../../AppData/Local/Packages/sandbox.{bdd27477-b7de-48cd-86f6-d2c824e3aa41}/AC/Temp/serein-stylex-tUU8Qa/components.js
import { useId } from "react";
import * as stylex from "@stylexjs/stylex";
import { Button as BaseButton } from "@base-ui/react/button";
import { Input } from "@base-ui/react/input";
import { Select as BaseSelect } from "@base-ui/react/select";
import { Dialog as BaseDialog } from "@base-ui/react/dialog";

// ../../../../AppData/Local/Packages/sandbox.{bdd27477-b7de-48cd-86f6-d2c824e3aa41}/AC/Temp/serein-stylex-tUU8Qa/StatusIcon.js
import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
function StatusIcon({
  state,
  kind = "send",
  size = 18,
  className,
  ...props4
}) {
  const classes = ["dp-status-icon", `dp-status-icon--${state}`, `dp-status-icon--${kind}`, className].filter(Boolean).join(" ");
  return /* @__PURE__ */ _jsxs("svg", {
    "aria-hidden": "true",
    className: classes,
    fill: "none",
    focusable: "false",
    height: size,
    stroke: "currentColor",
    strokeLinecap: "round",
    strokeLinejoin: "round",
    strokeWidth: "1.8",
    viewBox: "0 0 24 24",
    width: size,
    ...props4,
    children: [kind === "send" && /* @__PURE__ */ _jsx(SendGlyph, {
      state
    }), kind === "payment" && /* @__PURE__ */ _jsx(PaymentGlyph, {
      state
    }), kind === "loading" && /* @__PURE__ */ _jsx(LoadingGlyph, {
      state
    })]
  });
}
function SendGlyph({
  state
}) {
  if (state === "success") return /* @__PURE__ */ _jsx("path", {
    d: "m5 12 4.2 4.2L19 6.5"
  });
  if (state === "error") return /* @__PURE__ */ _jsx("path", {
    d: "M7 7l10 10M17 7 7 17"
  });
  return /* @__PURE__ */ _jsxs(_Fragment, {
    children: [/* @__PURE__ */ _jsx("path", {
      d: "m21 3-6.5 18-4-7.5L3 9.5 21 3Zm0 0L10.5 13.5"
    }), state === "pending" && /* @__PURE__ */ _jsx("path", {
      d: "M2.5 15.5h3M4 19h3"
    })]
  });
}
function PaymentGlyph({
  state
}) {
  if (state === "success") return /* @__PURE__ */ _jsx("path", {
    d: "m5 12 4.2 4.2L19 6.5"
  });
  if (state === "error") return /* @__PURE__ */ _jsx("path", {
    d: "M7 7l10 10M17 7 7 17"
  });
  return /* @__PURE__ */ _jsxs(_Fragment, {
    children: [/* @__PURE__ */ _jsx("rect", {
      x: "3.5",
      y: "6",
      width: "17",
      height: "12",
      rx: "2"
    }), /* @__PURE__ */ _jsx("path", {
      d: "M3.5 10h17M7 14h3"
    })]
  });
}
function LoadingGlyph({
  state
}) {
  if (state === "success") return /* @__PURE__ */ _jsx("path", {
    d: "m5 12 4.2 4.2L19 6.5"
  });
  if (state === "error") return /* @__PURE__ */ _jsx("path", {
    d: "M7 7l10 10M17 7 7 17"
  });
  return /* @__PURE__ */ _jsxs(_Fragment, {
    children: [/* @__PURE__ */ _jsx("circle", {
      cx: "12",
      cy: "12",
      r: "7.5",
      opacity: ".25"
    }), /* @__PURE__ */ _jsx("path", {
      d: "M12 4.5a7.5 7.5 0 0 1 7.5 7.5"
    })]
  });
}

// ../../../../AppData/Local/Packages/sandbox.{bdd27477-b7de-48cd-86f6-d2c824e3aa41}/AC/Temp/serein-stylex-tUU8Qa/components.js
import { jsx as _jsx2, jsxs as _jsxs2 } from "react/jsx-runtime";
var s = {
  button: {
    k1xSpc: "x3nfvp2",
    kGNEyG: "x6s0dn4",
    kjj79g: "xl56j7k",
    kOIVth: "x883omv",
    kAzted: "x1wxaq2x",
    kmVPX3: "x1jye8be",
    kaIpWk: "xtdikab",
    kMzoRj: "xmkeg23",
    ksu8eU: "x1y0btm7",
    kMv6JI: "xjb2p0i",
    kGuDYH: "xif65rj",
    k63SB2: "x1s688f",
    kLWn49: "x37zpob",
    kkrTdU: "x1ypdohk",
    kmkexE: "x1mn56bk",
    kybGjl: "x1hl2dhg",
    kOGhaW: "xymg228",
    $$css: true
  },
  primary: {
    kWkggS: "x1ir0wc1 x15uc0mm x1rrvxcp",
    kMwMTN: "x1n42gyp",
    kVAM5u: "xc537bo",
    kGVxlE: "x1daiojl x1fcuuh1",
    $$css: true
  },
  secondary: {
    kWkggS: "x16pp3ps xe6e02q xyor4f",
    kMwMTN: "x1m2o4zq",
    kVAM5u: "x1nx5sn",
    $$css: true
  },
  quiet: {
    kWkggS: "xjbqb8w xe6e02q xyor4f",
    kMwMTN: "x1m2o4zq",
    kVAM5u: "x9r1u3d",
    $$css: true
  },
  buttonDisabled: {
    kWkggS: "x16pp3ps x5p5y0 x11cf4x8",
    kMwMTN: "x1x2jehb",
    kVAM5u: "x1nx5sn",
    kGVxlE: "x1gnnqk1",
    kkrTdU: "x1h6gzvc",
    kOGhaW: "x1pdlv7q",
    $$css: true
  },
  controlDisabled: {
    kWkggS: "x1yq7fdl xqr84wl x11llqd5",
    kMwMTN: "x1x2jehb",
    kVAM5u: "x1t4gzue",
    kkrTdU: "x1h6gzvc",
    $$css: true
  },
  disabled: {
    kMwMTN: "x1x2jehb",
    kkrTdU: "x1h6gzvc",
    $$css: true
  },
  field: {
    k1xSpc: "x78zum5",
    kXwgrk: "xdt5ytf",
    kOIVth: "x167g77z",
    k7Eaqz: "xeuugli",
    $$css: true
  },
  label: {
    kGuDYH: "xif65rj",
    k63SB2: "x1s688f",
    kMwMTN: "x1m2o4zq",
    $$css: true
  },
  input: {
    kzqmXN: "xh8yej3",
    kAzted: "x1wxaq2x",
    kmVPX3: "xi0fwqg",
    kWkggS: "x1yq7fdl",
    kMwMTN: "x1m2o4zq",
    kMzoRj: "xmkeg23",
    ksu8eU: "x1y0btm7",
    kVAM5u: "x1t4gzue xa4nowq",
    kaIpWk: "xtdikab",
    kMv6JI: "xjb2p0i",
    kGuDYH: "x1j61zf2",
    kLWn49: "x1evy7pa",
    $$css: true
  },
  invalid: {
    kVAM5u: "xv53aiy xhqrmki",
    $$css: true
  },
  help: {
    kGuDYH: "x4z9k3i",
    kLWn49: "x1dbl2gt",
    kMwMTN: "x1x2jehb",
    kogj98: "x1ghz6dp",
    $$css: true
  },
  error: {
    kMwMTN: "x1yalgfx",
    $$css: true
  },
  trigger: {
    k1xSpc: "x78zum5",
    kGNEyG: "x6s0dn4",
    kjj79g: "x1qughib",
    kOIVth: "xou54vl",
    k9WMMc: "xdpxx8g",
    kkrTdU: "x1ypdohk",
    kGzVvX: "xe6e02q",
    kSReZ0: "xyor4f",
    $$css: true
  },
  selectValue: {
    k7Eaqz: "xeuugli",
    kHjlTd: "xj0a0fe",
    $$css: true
  },
  selectIcon: {
    k1xSpc: "x3nfvp2",
    kmuXW: "x2lah0s",
    $$css: true
  },
  placeholder: {
    kMwMTN: "x1x2jehb",
    $$css: true
  },
  indicator: {
    koQZXg: "x8x9d4c",
    kzqmXN: "x1kky2od",
    k7Eaqz: "x15kz4h8",
    k1xSpc: "x3nfvp2",
    kMwMTN: "xhh0039",
    $$css: true
  },
  indicatorHidden: {
    k33iCy: "xlshs6z",
    $$css: true
  },
  empty: {
    kmVPX3: "xc7ga6q",
    kMwMTN: "x1x2jehb",
    kGuDYH: "xif65rj",
    kLWn49: "x1evy7pa",
    $$css: true
  },
  positioner: {
    kY2c9j: "x13tdkmf",
    $$css: true
  },
  popup: {
    kzqmXN: "x1hhjr3y",
    ks0D6T: "x7k7lee",
    kskxy: "x1h9acoj",
    kORKVm: "x1odjw0f",
    kWkggS: "xlw8kj3",
    kMwMTN: "x1m2o4zq",
    kmVPX3: "x1ruevkc",
    kMzoRj: "xmkeg23",
    ksu8eU: "x1y0btm7",
    kVAM5u: "x1nx5sn",
    kaIpWk: "x16c8i04",
    kGVxlE: "xy15sr9",
    $$css: true
  },
  option: {
    kAzted: "x1gg8mnh",
    kmVPX3: "x6yrr3s",
    k1xSpc: "x78zum5",
    kGNEyG: "x6s0dn4",
    kOIVth: "x883omv",
    kGuDYH: "xif65rj",
    kLWn49: "x1evy7pa",
    kaIpWk: "x1o2kpkg",
    kkrTdU: "xt0e3qv",
    kI3sdo: "x1a2a7pz",
    kHjlTd: "xj0a0fe",
    k3Woio: "x1sl05ne",
    kiEn40: "xj3ae5l",
    $$css: true
  },
  highlighted: {
    kWkggS: "x1f82e63",
    $$css: true
  },
  selected: {
    kWkggS: "x1m7fmmm",
    k63SB2: "x1s688f",
    $$css: true
  },
  backdrop: {
    kVAEAm: "xixxii4",
    kpwlN0: "x10a8y8t",
    kWkggS: "x1u92v9d",
    kY2c9j: "x6y048q",
    $$css: true
  },
  dialog: {
    kVAEAm: "xixxii4",
    k87sOh: "xwa60dl",
    kbCHJM: "x1nrll8i",
    k3aq6I: "x11lhmoz",
    kzqmXN: "xsjcku0",
    kskxy: "x11p8ha2",
    kORKVm: "x1odjw0f",
    kmVPX3: "x10xs6qf",
    kWkggS: "xlw8kj3",
    kMwMTN: "x1m2o4zq",
    kMzoRj: "xmkeg23",
    ksu8eU: "x1y0btm7",
    kVAM5u: "x1nx5sn",
    kaIpWk: "x9vza20",
    kY2c9j: "xtea94d",
    kGVxlE: "xpd2g0m",
    $$css: true
  },
  title: {
    kogj98: "xkc5qi",
    kGuDYH: "x1pvqxga",
    kLWn49: "xwn7fz2",
    k63SB2: "x19s9jnd",
    kb6lSQ: "x1b4dsll",
    $$css: true
  },
  description: {
    kogj98: "xswdx4l",
    kMwMTN: "x1x2jehb",
    kGuDYH: "xif65rj",
    kLWn49: "xa7kkou",
    $$css: true
  },
  actions: {
    k1xSpc: "x78zum5",
    kwnvtZ: "x1a02dak",
    kjj79g: "x13a6bvl",
    kOIVth: "x883omv",
    keoZOQ: "xjv05ge",
    $$css: true
  }
};
function Button({
  variant = "primary",
  loading = false,
  disabled,
  children,
  className = "",
  ...props4
}) {
  const generated = stylex.props(s.button, s[variant], disabled && !loading && s.buttonDisabled);
  return /* @__PURE__ */ _jsxs2(BaseButton, {
    ...props4,
    ...generated,
    className: generated.className + " dp-control " + className,
    disabled: disabled || loading,
    "aria-busy": loading || void 0,
    children: [loading && /* @__PURE__ */ _jsx2(StatusIcon, {
      state: "pending",
      kind: "loading"
    }), " ", children]
  });
}
function TextField({
  label,
  description,
  error,
  id: givenId,
  ...props4
}) {
  const generatedId = useId();
  const id = givenId || generatedId;
  const descriptionId = description ? `${id}-description` : void 0;
  const errorId = error ? `${id}-error` : void 0;
  const generated = {
    0: {
      className: "xh8yej3 x1wxaq2x xi0fwqg x1yq7fdl x1m2o4zq xmkeg23 x1y0btm7 x1t4gzue xa4nowq xtdikab xjb2p0i x1j61zf2 x1evy7pa"
    },
    1: {
      className: "xh8yej3 x1wxaq2x xi0fwqg x1yq7fdl x1m2o4zq xmkeg23 x1y0btm7 xtdikab xjb2p0i x1j61zf2 x1evy7pa xv53aiy xhqrmki"
    }
  }[!!!!error << 0];
  return /* @__PURE__ */ _jsxs2("div", {
    ...{
      className: "x78zum5 xdt5ytf x167g77z xeuugli"
    },
    children: [/* @__PURE__ */ _jsx2("label", {
      htmlFor: id,
      ...{
        className: "xif65rj x1s688f x1m2o4zq"
      },
      children: label
    }), /* @__PURE__ */ _jsx2(Input, {
      ...props4,
      id,
      ...generated,
      className: [generated.className, props4.className].filter(Boolean).join(" "),
      "aria-invalid": error ? true : props4["aria-invalid"],
      "aria-describedby": [props4["aria-describedby"], descriptionId, errorId].filter(Boolean).join(" ") || void 0,
      "aria-errormessage": errorId || props4["aria-errormessage"]
    }), description && /* @__PURE__ */ _jsx2("p", {
      id: descriptionId,
      ...{
        className: "x4z9k3i x1dbl2gt x1x2jehb x1ghz6dp"
      },
      children: description
    }), error && /* @__PURE__ */ _jsx2("p", {
      id: errorId,
      role: "alert",
      ...{
        className: "x4z9k3i x1dbl2gt x1ghz6dp x1yalgfx"
      },
      children: error
    })]
  });
}
function Select({
  label,
  value,
  onValueChange,
  options,
  disabled,
  name,
  placeholder = "Choose an option",
  description,
  error
}) {
  const id = useId();
  const descriptionId = description ? `${id}-description` : void 0;
  const errorId = error ? `${id}-error` : void 0;
  return /* @__PURE__ */ _jsxs2("div", {
    ...{
      className: "x78zum5 xdt5ytf x167g77z xeuugli"
    },
    children: [/* @__PURE__ */ _jsxs2(BaseSelect.Root, {
      value,
      onValueChange: (v) => {
        if (v !== null) onValueChange(v);
      },
      items: options,
      disabled,
      name,
      children: [/* @__PURE__ */ _jsx2(BaseSelect.Label, {
        ...{
          className: "xif65rj x1s688f x1m2o4zq"
        },
        children: label
      }), /* @__PURE__ */ _jsxs2(BaseSelect.Trigger, {
        "aria-invalid": error ? true : void 0,
        "aria-describedby": [descriptionId, errorId].filter(Boolean).join(" ") || void 0,
        "aria-errormessage": errorId,
        ...{
          0: {
            className: "xh8yej3 x1wxaq2x xi0fwqg x1yq7fdl x1m2o4zq xmkeg23 x1y0btm7 x1t4gzue xa4nowq xtdikab xjb2p0i x1j61zf2 x1evy7pa x78zum5 x6s0dn4 x1qughib xou54vl xdpxx8g x1ypdohk xe6e02q xyor4f"
          },
          2: {
            className: "xh8yej3 x1wxaq2x xi0fwqg x1yq7fdl x1m2o4zq xmkeg23 x1y0btm7 xtdikab xjb2p0i x1j61zf2 x1evy7pa x78zum5 x6s0dn4 x1qughib xou54vl xdpxx8g x1ypdohk xe6e02q xyor4f xv53aiy xhqrmki"
          },
          1: {
            className: "xh8yej3 x1wxaq2x xi0fwqg xmkeg23 x1y0btm7 xtdikab xjb2p0i x1j61zf2 x1evy7pa x78zum5 x6s0dn4 x1qughib xou54vl xdpxx8g xe6e02q xyor4f x1yq7fdl xqr84wl x11llqd5 x1x2jehb x1t4gzue x1h6gzvc"
          },
          3: {
            className: "xh8yej3 x1wxaq2x xi0fwqg xmkeg23 x1y0btm7 xtdikab xjb2p0i x1j61zf2 x1evy7pa x78zum5 x6s0dn4 x1qughib xou54vl xdpxx8g xe6e02q xyor4f x1yq7fdl xqr84wl x11llqd5 x1x2jehb x1t4gzue x1h6gzvc"
          }
        }[!!!!error << 1 | !!disabled << 0],
        children: [/* @__PURE__ */ _jsx2(BaseSelect.Value, {
          placeholder,
          className: (state) => ({
            0: {
              className: "xeuugli xj0a0fe"
            },
            1: {
              className: "xeuugli xj0a0fe x1x2jehb"
            }
          })[!!state.placeholder << 0].className
        }), /* @__PURE__ */ _jsx2(BaseSelect.Icon, {
          ...{
            className: "x3nfvp2 x2lah0s"
          },
          children: /* @__PURE__ */ _jsx2("svg", {
            "aria-hidden": "true",
            width: "16",
            height: "16",
            viewBox: "0 0 24 24",
            fill: "none",
            stroke: "currentColor",
            strokeWidth: "1.8",
            strokeLinecap: "round",
            strokeLinejoin: "round",
            children: /* @__PURE__ */ _jsx2("path", {
              d: "m6 9 6 6 6-6"
            })
          })
        })]
      }), /* @__PURE__ */ _jsx2(BaseSelect.Portal, {
        children: /* @__PURE__ */ _jsx2(BaseSelect.Positioner, {
          sideOffset: 6,
          align: "start",
          alignItemWithTrigger: false,
          ...{
            className: "x13tdkmf"
          },
          children: /* @__PURE__ */ _jsx2(BaseSelect.Popup, {
            ...{
              className: "x1hhjr3y x7k7lee x1h9acoj x1odjw0f xlw8kj3 x1m2o4zq x1ruevkc xmkeg23 x1y0btm7 x1nx5sn x16c8i04 xy15sr9"
            },
            children: /* @__PURE__ */ _jsxs2(BaseSelect.List, {
              "aria-label": label,
              children: [options.map((o) => /* @__PURE__ */ _jsxs2(BaseSelect.Item, {
                value: o.value,
                disabled: o.disabled,
                className: (state) => ({
                  0: {
                    className: "x1gg8mnh x6yrr3s x78zum5 x6s0dn4 x883omv xif65rj x1evy7pa x1o2kpkg xt0e3qv x1a2a7pz xj0a0fe x1sl05ne xj3ae5l"
                  },
                  4: {
                    className: "x1gg8mnh x6yrr3s x78zum5 x6s0dn4 x883omv xif65rj x1evy7pa x1o2kpkg xt0e3qv x1a2a7pz xj0a0fe x1sl05ne xj3ae5l x1m7fmmm x1s688f"
                  },
                  2: {
                    className: "x1gg8mnh x6yrr3s x78zum5 x6s0dn4 x883omv xif65rj x1evy7pa x1o2kpkg xt0e3qv x1a2a7pz xj0a0fe x1sl05ne xj3ae5l x1f82e63"
                  },
                  6: {
                    className: "x1gg8mnh x6yrr3s x78zum5 x6s0dn4 x883omv xif65rj x1evy7pa x1o2kpkg xt0e3qv x1a2a7pz xj0a0fe x1sl05ne xj3ae5l x1s688f x1f82e63"
                  },
                  1: {
                    className: "x1gg8mnh x6yrr3s x78zum5 x6s0dn4 x883omv xif65rj x1evy7pa x1o2kpkg x1a2a7pz xj0a0fe x1sl05ne xj3ae5l x1x2jehb x1h6gzvc"
                  },
                  5: {
                    className: "x1gg8mnh x6yrr3s x78zum5 x6s0dn4 x883omv xif65rj x1evy7pa x1o2kpkg x1a2a7pz xj0a0fe x1sl05ne xj3ae5l x1m7fmmm x1s688f x1x2jehb x1h6gzvc"
                  },
                  3: {
                    className: "x1gg8mnh x6yrr3s x78zum5 x6s0dn4 x883omv xif65rj x1evy7pa x1o2kpkg x1a2a7pz xj0a0fe x1sl05ne xj3ae5l x1f82e63 x1x2jehb x1h6gzvc"
                  },
                  7: {
                    className: "x1gg8mnh x6yrr3s x78zum5 x6s0dn4 x883omv xif65rj x1evy7pa x1o2kpkg x1a2a7pz xj0a0fe x1sl05ne xj3ae5l x1s688f x1f82e63 x1x2jehb x1h6gzvc"
                  }
                })[!!state.selected << 2 | !!state.highlighted << 1 | !!state.disabled << 0].className,
                children: [/* @__PURE__ */ _jsx2(BaseSelect.ItemText, {
                  ...{
                    className: "xeuugli xj0a0fe"
                  },
                  children: o.label
                }), /* @__PURE__ */ _jsx2(BaseSelect.ItemIndicator, {
                  keepMounted: true,
                  className: (state) => ({
                    0: {
                      className: "x8x9d4c x1kky2od x15kz4h8 x3nfvp2 xhh0039"
                    },
                    1: {
                      className: "x8x9d4c x1kky2od x15kz4h8 x3nfvp2 xhh0039 xlshs6z"
                    }
                  })[!!!state.selected << 0].className,
                  children: /* @__PURE__ */ _jsx2("svg", {
                    "aria-hidden": "true",
                    width: "16",
                    height: "16",
                    viewBox: "0 0 24 24",
                    fill: "none",
                    stroke: "currentColor",
                    strokeWidth: "2",
                    strokeLinecap: "round",
                    strokeLinejoin: "round",
                    children: /* @__PURE__ */ _jsx2("path", {
                      d: "m5 12 4 4L19 6"
                    })
                  })
                })]
              }, o.value)), options.length === 0 && /* @__PURE__ */ _jsx2("div", {
                role: "status",
                ...{
                  className: "xc7ga6q x1x2jehb xif65rj x1evy7pa"
                },
                children: "No options available."
              })]
            })
          })
        })
      })]
    }), description && /* @__PURE__ */ _jsx2("p", {
      id: descriptionId,
      ...{
        className: "x4z9k3i x1dbl2gt x1x2jehb x1ghz6dp"
      },
      children: description
    }), error && /* @__PURE__ */ _jsx2("p", {
      id: errorId,
      role: "alert",
      ...{
        className: "x4z9k3i x1dbl2gt x1ghz6dp x1yalgfx"
      },
      children: error
    })]
  });
}
function Dialog({
  triggerLabel,
  title,
  description,
  children,
  confirmLabel = "Confirm",
  onConfirm,
  open,
  defaultOpen,
  onOpenChange
}) {
  return /* @__PURE__ */ _jsxs2(BaseDialog.Root, {
    open,
    defaultOpen,
    onOpenChange: (next) => onOpenChange?.(next),
    children: [/* @__PURE__ */ _jsx2(BaseDialog.Trigger, {
      render: /* @__PURE__ */ _jsx2(Button, {
        variant: "secondary"
      }),
      children: triggerLabel
    }), /* @__PURE__ */ _jsxs2(BaseDialog.Portal, {
      children: [/* @__PURE__ */ _jsx2(BaseDialog.Backdrop, {
        ...{
          className: "xixxii4 x10a8y8t x1u92v9d x6y048q"
        }
      }), /* @__PURE__ */ _jsxs2(BaseDialog.Popup, {
        ...{
          className: "xixxii4 xwa60dl x1nrll8i x11lhmoz xsjcku0 x11p8ha2 x1odjw0f x10xs6qf xlw8kj3 x1m2o4zq xmkeg23 x1y0btm7 x1nx5sn x9vza20 xtea94d xpd2g0m"
        },
        children: [/* @__PURE__ */ _jsx2(BaseDialog.Title, {
          ...{
            className: "xkc5qi x1pvqxga xwn7fz2 x19s9jnd x1b4dsll"
          },
          children: title
        }), /* @__PURE__ */ _jsx2(BaseDialog.Description, {
          ...{
            className: "xswdx4l x1x2jehb xif65rj xa7kkou"
          },
          children: description
        }), children, /* @__PURE__ */ _jsxs2("div", {
          ...{
            className: "x78zum5 x1a02dak x13a6bvl x883omv xjv05ge"
          },
          children: [/* @__PURE__ */ _jsx2(BaseDialog.Close, {
            render: /* @__PURE__ */ _jsx2(Button, {
              variant: "secondary"
            }),
            children: "Cancel"
          }), onConfirm && /* @__PURE__ */ _jsx2(BaseDialog.Close, {
            render: /* @__PURE__ */ _jsx2(Button, {}),
            onClick: onConfirm,
            children: confirmLabel
          })]
        })]
      })]
    })]
  });
}

// ../../../../AppData/Local/Packages/sandbox.{bdd27477-b7de-48cd-86f6-d2c824e3aa41}/AC/Temp/serein-stylex-tUU8Qa/useAsyncAction.js
import { useCallback, useEffect, useRef, useState } from "react";
function useAsyncAction(action) {
  const [state, setState] = useState("idle");
  const controllerRef = useRef(null);
  const requestRef = useRef(0);
  const mountedRef = useRef(false);
  useEffect(() => {
    mountedRef.current = true;
    return () => {
      mountedRef.current = false;
      requestRef.current += 1;
      controllerRef.current?.abort();
      controllerRef.current = null;
    };
  }, []);
  const cancel = useCallback(() => {
    if (!controllerRef.current) return;
    requestRef.current += 1;
    controllerRef.current.abort();
    controllerRef.current = null;
    if (mountedRef.current) setState("idle");
  }, []);
  const reset = useCallback(() => {
    cancel();
    if (mountedRef.current) setState("idle");
  }, [cancel]);
  const run = useCallback(() => {
    if (controllerRef.current) return;
    const controller = new AbortController();
    const request = requestRef.current + 1;
    requestRef.current = request;
    controllerRef.current = controller;
    setState("pending");
    const settle = (nextState) => {
      if (!mountedRef.current || requestRef.current !== request || controller.signal.aborted) return;
      controllerRef.current = null;
      setState(nextState);
    };
    try {
      void action(controller.signal).then(() => settle("success"), () => settle("error"));
    } catch {
      settle("error");
    }
  }, [action]);
  return {
    state,
    run,
    cancel,
    reset
  };
}

// ../../../../AppData/Local/Packages/sandbox.{bdd27477-b7de-48cd-86f6-d2c824e3aa41}/AC/Temp/serein-stylex-tUU8Qa/tabs.js
import * as stylex2 from "@stylexjs/stylex";
import { Tabs as BaseTabs } from "@base-ui/react/tabs";
import { jsx as _jsx3, jsxs as _jsxs3 } from "react/jsx-runtime";
function Tabs({
  label,
  value,
  onValueChange,
  items
}) {
  return /* @__PURE__ */ _jsxs3(BaseTabs.Root, {
    value,
    onValueChange: (next) => {
      if (typeof next === "string") onValueChange(next);
    },
    ...{
      className: "xeuugli"
    },
    children: [/* @__PURE__ */ _jsx3(BaseTabs.List, {
      "aria-label": label,
      activateOnFocus: true,
      ...{
        className: "x78zum5 x1a02dak x1jnr06f xfawy5m xso031l x1q0q8m5 x1p15aix"
      },
      children: items.map((item) => /* @__PURE__ */ _jsx3(BaseTabs.Tab, {
        value: item.value,
        disabled: item.disabled,
        className: (state) => ({
          0: {
            className: "x1wxaq2x xs0fqhl xjbqb8w x1x2jehb xc342km x1y0btm7 xlxy82 x9r1u3d xtdikab xjb2p0i xif65rj x1s688f x1ypdohk x5p5y0 x1sl05ne xj3ae5l"
          },
          2: {
            className: "x1wxaq2x xs0fqhl xc342km x1y0btm7 xlxy82 x9r1u3d xtdikab xjb2p0i xif65rj x1s688f x1ypdohk x5p5y0 x1sl05ne xj3ae5l x1m2o4zq x1m7fmmm xeq3vrg"
          },
          1: {
            className: "x1wxaq2x xs0fqhl xjbqb8w x1x2jehb xc342km x1y0btm7 xlxy82 x9r1u3d xtdikab xjb2p0i xif65rj x1s688f x5p5y0 x1sl05ne xj3ae5l xbyyjgo x1h6gzvc"
          },
          3: {
            className: "x1wxaq2x xs0fqhl xc342km x1y0btm7 xlxy82 x9r1u3d xtdikab xjb2p0i xif65rj x1s688f x5p5y0 x1sl05ne xj3ae5l x1m2o4zq x1m7fmmm xeq3vrg xbyyjgo x1h6gzvc"
          }
        })[!!state.active << 1 | !!state.disabled << 0].className,
        children: item.label
      }, item.value))
    }), items.map((item) => /* @__PURE__ */ _jsx3(BaseTabs.Panel, {
      value: item.value,
      keepMounted: true,
      ...{
        className: "x5qliba x1m2o4zq xif65rj xa7kkou"
      },
      children: item.content
    }, item.value))]
  });
}

// ../../../../AppData/Local/Packages/sandbox.{bdd27477-b7de-48cd-86f6-d2c824e3aa41}/AC/Temp/serein-stylex-tUU8Qa/selection.js
import { useId as useId2 } from "react";
import * as stylex3 from "@stylexjs/stylex";
import { Checkbox as BaseCheckbox } from "@base-ui/react/checkbox";
import { Switch as BaseSwitch } from "@base-ui/react/switch";
import { Radio as BaseRadio } from "@base-ui/react/radio";
import { RadioGroup as BaseRadioGroup } from "@base-ui/react/radio-group";
import { jsx as _jsx4, jsxs as _jsxs4 } from "react/jsx-runtime";
function Checkbox({
  label,
  description,
  checked,
  onCheckedChange,
  disabled,
  name,
  indeterminate = false
}) {
  const id = useId2();
  const descriptionId = description ? `${id}-description` : void 0;
  return /* @__PURE__ */ _jsxs4("div", {
    children: [/* @__PURE__ */ _jsxs4("label", {
      ...{
        0: {
          className: "x78zum5 x6s0dn4 x1v2ro7d x1wxaq2x x1m2o4zq x1ypdohk"
        },
        1: {
          className: "x78zum5 x6s0dn4 x1v2ro7d x1wxaq2x x1x2jehb x1h6gzvc xbyyjgo"
        }
      }[!!disabled << 0],
      children: [/* @__PURE__ */ _jsx4(BaseCheckbox.Root, {
        name,
        checked,
        indeterminate,
        disabled,
        onCheckedChange,
        "aria-describedby": descriptionId,
        className: (state) => ({
          0: {
            className: "x2lah0s xw4jnvo x1qx5ct2 xrvj5dj x1ku5rj1 xmkeg23 x1y0btm7 x1t4gzue x1o2kpkg x1yq7fdl x1n42gyp xmper1u x1mrb1ma x9kvfbb x1sl05ne xj3ae5l"
          },
          1: {
            className: "x2lah0s xw4jnvo x1qx5ct2 xrvj5dj x1ku5rj1 xmkeg23 x1y0btm7 x1o2kpkg x1n42gyp xmper1u x1mrb1ma x9kvfbb x1sl05ne xj3ae5l x1ir0wc1 xc537bo"
          }
        })[!!(state.checked || state.indeterminate) << 0].className,
        children: /* @__PURE__ */ _jsx4(BaseCheckbox.Indicator, {
          ...{
            className: "xrvj5dj x1ku5rj1"
          },
          children: /* @__PURE__ */ _jsx4("svg", {
            "aria-hidden": "true",
            width: "14",
            height: "14",
            viewBox: "0 0 24 24",
            fill: "none",
            stroke: "currentColor",
            strokeWidth: "2.5",
            strokeLinecap: "round",
            children: indeterminate ? /* @__PURE__ */ _jsx4("path", {
              d: "M5 12h14"
            }) : /* @__PURE__ */ _jsx4("path", {
              d: "m5 12 4 4L19 6"
            })
          })
        })
      }), /* @__PURE__ */ _jsx4("span", {
        ...{
          className: "xif65rj x1s688f x37zpob"
        },
        children: label
      })]
    }), description && /* @__PURE__ */ _jsx4("p", {
      id: descriptionId,
      ...{
        className: "x1ynuvgq x1x2jehb x4z9k3i x1evy7pa"
      },
      children: description
    })]
  });
}
function Switch({
  label,
  description,
  checked,
  onCheckedChange,
  disabled,
  name
}) {
  const id = useId2();
  const descriptionId = description ? `${id}-description` : void 0;
  return /* @__PURE__ */ _jsxs4("div", {
    children: [/* @__PURE__ */ _jsxs4("label", {
      ...{
        0: {
          className: "x78zum5 x6s0dn4 x1v2ro7d x1wxaq2x x1m2o4zq x1ypdohk"
        },
        1: {
          className: "x78zum5 x6s0dn4 x1v2ro7d x1wxaq2x x1x2jehb x1h6gzvc xbyyjgo"
        }
      }[!!disabled << 0],
      children: [/* @__PURE__ */ _jsx4(BaseSwitch.Root, {
        name,
        checked,
        disabled,
        onCheckedChange,
        "aria-describedby": descriptionId,
        className: (state) => ({
          0: {
            className: "x2lah0s x10h3iyq xxk0z11 x1i3ajwb x78zum5 x6s0dn4 xmkeg23 x1y0btm7 x1t4gzue x1e6avla x1yq7fdl xmper1u x1mrb1ma x9kvfbb x1sl05ne xj3ae5l"
          },
          1: {
            className: "x2lah0s x10h3iyq xxk0z11 x1i3ajwb x78zum5 x6s0dn4 xmkeg23 x1y0btm7 x1e6avla xmper1u x1mrb1ma x9kvfbb x1sl05ne xj3ae5l x1ir0wc1 xc537bo"
          }
        })[!!state.checked << 0].className,
        children: /* @__PURE__ */ _jsx4(BaseSwitch.Thumb, {
          className: (state) => ({
            0: {
              className: "x1xp8n7a xmix8c7 x1e6avla xwp6qgo xbryuvx x1vtrvmk x9kvfbb"
            },
            1: {
              className: "x1xp8n7a xmix8c7 x1e6avla x1vtrvmk x9kvfbb x1pwaqh xqyy0d1"
            }
          })[!!state.checked << 0].className
        })
      }), /* @__PURE__ */ _jsx4("span", {
        ...{
          className: "xif65rj x1s688f x37zpob"
        },
        children: label
      })]
    }), description && /* @__PURE__ */ _jsx4("p", {
      id: descriptionId,
      ...{
        className: "x1ynuvgq x1x2jehb x4z9k3i x1evy7pa x1ueu2oz"
      },
      children: description
    })]
  });
}
function RadioGroup({
  label,
  value,
  onValueChange,
  options,
  disabled,
  name
}) {
  const id = useId2();
  return /* @__PURE__ */ _jsxs4("div", {
    ...{
      className: "x78zum5 xdt5ytf x167g77z xeuugli"
    },
    children: [/* @__PURE__ */ _jsx4("span", {
      id: `${id}-label`,
      ...{
        className: "xif65rj x1s688f x1m2o4zq"
      },
      children: label
    }), /* @__PURE__ */ _jsx4(BaseRadioGroup, {
      value,
      onValueChange,
      disabled,
      name,
      "aria-labelledby": `${id}-label`,
      ...{
        className: "x78zum5 xdt5ytf x195vfkc"
      },
      children: options.map((option, index) => {
        const optionId = `${id}-option-${index}`;
        const descriptionId = option.description ? `${optionId}-description` : void 0;
        const optionDisabled = disabled || option.disabled;
        return /* @__PURE__ */ _jsxs4("div", {
          children: [/* @__PURE__ */ _jsxs4("label", {
            ...{
              0: {
                className: "x78zum5 x6s0dn4 x1v2ro7d x1wxaq2x x1m2o4zq x1ypdohk"
              },
              1: {
                className: "x78zum5 x6s0dn4 x1v2ro7d x1wxaq2x x1x2jehb x1h6gzvc xbyyjgo"
              }
            }[!!optionDisabled << 0],
            children: [/* @__PURE__ */ _jsx4(BaseRadio.Root, {
              value: option.value,
              disabled: optionDisabled,
              "aria-describedby": descriptionId,
              className: (state) => ({
                0: {
                  className: "x2lah0s xw4jnvo x1qx5ct2 xrvj5dj x1ku5rj1 xmkeg23 x1y0btm7 x1t4gzue x1e6avla x1yq7fdl xmper1u xwplk62 x9kvfbb x1sl05ne xj3ae5l"
                },
                1: {
                  className: "x2lah0s xw4jnvo x1qx5ct2 xrvj5dj x1ku5rj1 xmkeg23 x1y0btm7 x1e6avla xmper1u xwplk62 x9kvfbb x1sl05ne xj3ae5l xc537bo x1ir0wc1"
                }
              })[!!state.checked << 0].className,
              children: /* @__PURE__ */ _jsx4(BaseRadio.Indicator, {
                ...{
                  className: "x1xc55vz xdk7pt x1e6avla x1pwaqh"
                }
              })
            }), /* @__PURE__ */ _jsx4("span", {
              ...{
                className: "xif65rj x1s688f x37zpob"
              },
              children: option.label
            })]
          }), option.description && /* @__PURE__ */ _jsx4("p", {
            id: descriptionId,
            ...{
              className: "x1ynuvgq x1x2jehb x4z9k3i x1evy7pa"
            },
            children: option.description
          })]
        }, option.value);
      })
    })]
  });
}

// ../../../../AppData/Local/Packages/sandbox.{bdd27477-b7de-48cd-86f6-d2c824e3aa41}/AC/Temp/serein-stylex-tUU8Qa/forms.js
import { useCallback as useCallback2, useId as useId3, useMemo } from "react";
import * as stylex4 from "@stylexjs/stylex";
import { Combobox as BaseCombobox } from "@base-ui/react/combobox";
import { NumberField as BaseNumberField } from "@base-ui/react/number-field";
import { Slider as BaseSlider } from "@base-ui/react/slider";
import { Toggle } from "@base-ui/react/toggle";
import { ToggleGroup as BaseToggleGroup } from "@base-ui/react/toggle-group";
import { jsx as _jsx5, Fragment as _Fragment2, jsxs as _jsxs5 } from "react/jsx-runtime";
var s2 = {
  disabled: {
    kSiTet: "xbyyjgo",
    kkrTdU: "x1h6gzvc",
    $$css: true
  },
  toggle: {
    kAzted: "x1wxaq2x",
    kmVPX3: "x1a5nu0n",
    kWkggS: "x1yq7fdl",
    kMwMTN: "x1m2o4zq",
    kMzoRj: "xmkeg23",
    ksu8eU: "x1y0btm7",
    kVAM5u: "x1t4gzue",
    kMv6JI: "xjb2p0i",
    kGuDYH: "xif65rj",
    k63SB2: "x1s688f",
    kkrTdU: "x1ypdohk",
    $$css: true
  },
  firstToggle: {
    kIxVMA: "xe9jjfv",
    kqGeR4: "xoerh1t",
    $$css: true
  },
  joinedToggle: {
    kZ1KPB: "xyj58a3",
    $$css: true
  },
  lastToggle: {
    ksF3WI: "x1mb5f9v",
    kYm2EN: "xw97mcz",
    $$css: true
  },
  firstToggleVertical: {
    kIxVMA: "xe9jjfv",
    ksF3WI: "x1mb5f9v",
    $$css: true
  },
  joinedToggleVertical: {
    kEafiO: "x972fbf",
    $$css: true
  },
  lastToggleVertical: {
    kqGeR4: "xoerh1t",
    kYm2EN: "xw97mcz",
    $$css: true
  },
  pressed: {
    kWkggS: "x1ir0wc1",
    kMwMTN: "x1n42gyp",
    kVAM5u: "xc537bo",
    $$css: true
  }
};
function FieldMessages({
  description,
  error,
  descriptionId,
  errorId
}) {
  return /* @__PURE__ */ _jsxs5(_Fragment2, {
    children: [description && /* @__PURE__ */ _jsx5("p", {
      id: descriptionId,
      ...{
        className: "x1ghz6dp x4z9k3i x1dbl2gt x1x2jehb"
      },
      children: description
    }), error && /* @__PURE__ */ _jsx5("p", {
      id: errorId,
      role: "alert",
      ...{
        className: "x1ghz6dp x4z9k3i x1dbl2gt x1yalgfx"
      },
      children: error
    })]
  });
}
function describedBy(existing, descriptionId, errorId) {
  return [existing, descriptionId, errorId].filter(Boolean).join(" ") || void 0;
}
function Textarea({
  label,
  description,
  error,
  id: suppliedId,
  className,
  ...props4
}) {
  const generatedId = useId3();
  const id = suppliedId || generatedId;
  const descriptionId = description ? `${id}-description` : void 0;
  const errorId = error ? `${id}-error` : void 0;
  const generated = {
    0: {
      className: "xh8yej3 xi0fwqg x1yq7fdl x1m2o4zq xmkeg23 x1y0btm7 x1t4gzue xtdikab xjb2p0i x1j61zf2 x1evy7pa xi3av73 x288g5"
    },
    2: {
      className: "xh8yej3 xi0fwqg x1yq7fdl x1m2o4zq xmkeg23 x1y0btm7 xtdikab xjb2p0i x1j61zf2 x1evy7pa xi3av73 x288g5 xv53aiy"
    },
    1: {
      className: "xh8yej3 xi0fwqg x1yq7fdl x1m2o4zq xmkeg23 x1y0btm7 x1t4gzue xtdikab xjb2p0i x1j61zf2 x1evy7pa xi3av73 x288g5 xbyyjgo x1h6gzvc"
    },
    3: {
      className: "xh8yej3 xi0fwqg x1yq7fdl x1m2o4zq xmkeg23 x1y0btm7 xtdikab xjb2p0i x1j61zf2 x1evy7pa xi3av73 x288g5 xv53aiy xbyyjgo x1h6gzvc"
    }
  }[!!!!error << 1 | !!props4.disabled << 0];
  return /* @__PURE__ */ _jsxs5("div", {
    ...{
      className: "x78zum5 xdt5ytf x167g77z xeuugli"
    },
    children: [/* @__PURE__ */ _jsx5("label", {
      htmlFor: id,
      ...{
        className: "xif65rj x1s688f x1m2o4zq"
      },
      children: label
    }), /* @__PURE__ */ _jsx5("textarea", {
      ...props4,
      id,
      ...generated,
      className: [generated.className, className].filter(Boolean).join(" "),
      "aria-invalid": error ? true : props4["aria-invalid"],
      "aria-describedby": describedBy(props4["aria-describedby"], descriptionId, errorId),
      "aria-errormessage": errorId || props4["aria-errormessage"]
    }), /* @__PURE__ */ _jsx5(FieldMessages, {
      description,
      error,
      descriptionId,
      errorId
    })]
  });
}
function NumberField({
  label,
  value,
  onValueChange,
  description,
  error,
  id: suppliedId,
  disabled,
  ...props4
}) {
  const generatedId = useId3();
  const id = suppliedId || generatedId;
  const descriptionId = description ? `${id}-description` : void 0;
  const errorId = error ? `${id}-error` : void 0;
  return /* @__PURE__ */ _jsxs5("div", {
    ...{
      className: "x78zum5 xdt5ytf x167g77z xeuugli"
    },
    children: [/* @__PURE__ */ _jsx5("label", {
      htmlFor: id,
      ...{
        className: "xif65rj x1s688f x1m2o4zq"
      },
      children: label
    }), /* @__PURE__ */ _jsx5(BaseNumberField.Root, {
      ...props4,
      id,
      value,
      disabled,
      onValueChange: (next) => onValueChange(next),
      children: /* @__PURE__ */ _jsxs5(BaseNumberField.Group, {
        ...{
          className: "x78zum5 x1qjc9v5"
        },
        children: [/* @__PURE__ */ _jsx5(BaseNumberField.Input, {
          ...{
            0: {
              className: "xh8yej3 x1wxaq2x xi0fwqg x1yq7fdl x1m2o4zq xmkeg23 x1y0btm7 x1t4gzue xtdikab xjb2p0i x1j61zf2 x1evy7pa x1a2w583 xjppbhk"
            },
            2: {
              className: "xh8yej3 x1wxaq2x xi0fwqg x1yq7fdl x1m2o4zq xmkeg23 x1y0btm7 xtdikab xjb2p0i x1j61zf2 x1evy7pa x1a2w583 xjppbhk xv53aiy"
            },
            1: {
              className: "xh8yej3 x1wxaq2x xi0fwqg x1yq7fdl x1m2o4zq xmkeg23 x1y0btm7 x1t4gzue xtdikab xjb2p0i x1j61zf2 x1evy7pa x1a2w583 xjppbhk xbyyjgo x1h6gzvc"
            },
            3: {
              className: "xh8yej3 x1wxaq2x xi0fwqg x1yq7fdl x1m2o4zq xmkeg23 x1y0btm7 xtdikab xjb2p0i x1j61zf2 x1evy7pa x1a2w583 xjppbhk xv53aiy xbyyjgo x1h6gzvc"
            }
          }[!!!!error << 1 | !!disabled << 0],
          "aria-invalid": error ? true : void 0,
          "aria-describedby": describedBy(void 0, descriptionId, errorId),
          "aria-errormessage": errorId
        }), /* @__PURE__ */ _jsxs5("div", {
          ...{
            className: "x78zum5 xdt5ytf"
          },
          children: [/* @__PURE__ */ _jsx5(BaseNumberField.Increment, {
            "aria-label": `Increase ${label}`,
            ...{
              0: {
                className: "x1useyqa xjwf9q1 x98rzlu x1yq7fdl x1m2o4zq xmkeg23 xyj58a3 x1y0btm7 x1t4gzue xjb2p0i x1ypdohk x1mb5f9v x1qhh985"
              },
              1: {
                className: "x1useyqa xjwf9q1 x98rzlu x1yq7fdl x1m2o4zq xmkeg23 xyj58a3 x1y0btm7 x1t4gzue xjb2p0i x1mb5f9v x1qhh985 xbyyjgo x1h6gzvc"
              }
            }[!!disabled << 0],
            children: "+"
          }), /* @__PURE__ */ _jsx5(BaseNumberField.Decrement, {
            "aria-label": `Decrease ${label}`,
            ...{
              0: {
                className: "x1useyqa xjwf9q1 x98rzlu x1yq7fdl x1m2o4zq xmkeg23 xyj58a3 x1y0btm7 x1t4gzue xjb2p0i x1ypdohk xw97mcz"
              },
              1: {
                className: "x1useyqa xjwf9q1 x98rzlu x1yq7fdl x1m2o4zq xmkeg23 xyj58a3 x1y0btm7 x1t4gzue xjb2p0i xw97mcz xbyyjgo x1h6gzvc"
              }
            }[!!disabled << 0],
            children: "\u2212"
          })]
        })]
      })
    }), /* @__PURE__ */ _jsx5(FieldMessages, {
      description,
      error,
      descriptionId,
      errorId
    })]
  });
}
function Slider({
  label,
  value,
  onValueChange,
  description,
  error,
  disabled,
  ...props4
}) {
  const id = useId3();
  const descriptionId = description ? `${id}-description` : void 0;
  const errorId = error ? `${id}-error` : void 0;
  const setInputValidation = useCallback2((input) => {
    if (!input) return;
    if (error) {
      input.setAttribute("aria-invalid", "true");
      input.setAttribute("aria-errormessage", errorId);
    } else {
      input.removeAttribute("aria-invalid");
      input.removeAttribute("aria-errormessage");
    }
  }, [error, errorId]);
  return /* @__PURE__ */ _jsxs5("div", {
    ...{
      className: "x78zum5 xdt5ytf x167g77z xeuugli"
    },
    children: [/* @__PURE__ */ _jsxs5(BaseSlider.Root, {
      ...props4,
      value,
      disabled,
      onValueChange: (next) => onValueChange(next),
      children: [/* @__PURE__ */ _jsx5(BaseSlider.Label, {
        ...{
          className: "xif65rj x1s688f x1m2o4zq"
        },
        children: label
      }), /* @__PURE__ */ _jsxs5(BaseSlider.Control, {
        ...{
          0: {
            className: "x1n2onr6 x78zum5 x6s0dn4 x1wxaq2x x1ypdohk"
          },
          1: {
            className: "x1n2onr6 x78zum5 x6s0dn4 x1wxaq2x xbyyjgo x1h6gzvc"
          }
        }[!!disabled << 0],
        children: [/* @__PURE__ */ _jsx5(BaseSlider.Track, {
          ...{
            className: "xh8yej3 xols6we x16pp3ps x1e6avla xmkeg23 x1y0btm7 x1t4gzue"
          },
          children: /* @__PURE__ */ _jsx5(BaseSlider.Indicator, {
            ...{
              className: "x5yr21d x1ir0wc1 x1e6avla"
            }
          })
        }), /* @__PURE__ */ _jsx5(BaseSlider.Thumb, {
          ...{
            className: "xw4jnvo x1qx5ct2 x1e6avla x1ir0wc1 xdh2fpr x1y0btm7 xc537bo x1sl05ne xj3ae5l"
          },
          inputRef: setInputValidation,
          "aria-describedby": describedBy(void 0, descriptionId, errorId)
        })]
      })]
    }), /* @__PURE__ */ _jsx5(FieldMessages, {
      description,
      error,
      descriptionId,
      errorId
    })]
  });
}
function Combobox({
  label,
  value,
  onValueChange,
  options,
  description,
  error,
  disabled,
  id: suppliedId,
  placeholder,
  ...props4
}) {
  const generatedId = useId3();
  const id = suppliedId || generatedId;
  const descriptionId = description ? `${id}-description` : void 0;
  const errorId = error ? `${id}-error` : void 0;
  const items = useMemo(() => BaseCombobox.createItems(options, {
    getValue: (option) => option.value,
    getLabel: (option) => option.label
  }), [options]);
  return /* @__PURE__ */ _jsxs5("div", {
    ...{
      className: "x78zum5 xdt5ytf x167g77z xeuugli"
    },
    children: [/* @__PURE__ */ _jsxs5(BaseCombobox.Root, {
      ...props4,
      id,
      value,
      disabled,
      modal: false,
      items,
      onValueChange: (next) => onValueChange(next),
      children: [/* @__PURE__ */ _jsx5("label", {
        htmlFor: id,
        ...{
          className: "xif65rj x1s688f x1m2o4zq"
        },
        children: label
      }), /* @__PURE__ */ _jsx5(BaseCombobox.Input, {
        "aria-label": label,
        placeholder,
        ...{
          0: {
            className: "xh8yej3 x1wxaq2x xi0fwqg x1yq7fdl x1m2o4zq xmkeg23 x1y0btm7 x1t4gzue xtdikab xjb2p0i x1j61zf2 x1evy7pa"
          },
          2: {
            className: "xh8yej3 x1wxaq2x xi0fwqg x1yq7fdl x1m2o4zq xmkeg23 x1y0btm7 xtdikab xjb2p0i x1j61zf2 x1evy7pa xv53aiy"
          },
          1: {
            className: "xh8yej3 x1wxaq2x xi0fwqg x1yq7fdl x1m2o4zq xmkeg23 x1y0btm7 x1t4gzue xtdikab xjb2p0i x1j61zf2 x1evy7pa xbyyjgo x1h6gzvc"
          },
          3: {
            className: "xh8yej3 x1wxaq2x xi0fwqg x1yq7fdl x1m2o4zq xmkeg23 x1y0btm7 xtdikab xjb2p0i x1j61zf2 x1evy7pa xv53aiy xbyyjgo x1h6gzvc"
          }
        }[!!!!error << 1 | !!disabled << 0],
        "aria-invalid": error ? true : void 0,
        "aria-describedby": describedBy(void 0, descriptionId, errorId),
        "aria-errormessage": errorId
      }), /* @__PURE__ */ _jsx5(BaseCombobox.Portal, {
        children: /* @__PURE__ */ _jsx5(BaseCombobox.Positioner, {
          sideOffset: 6,
          ...{
            className: "x13tdkmf"
          },
          children: /* @__PURE__ */ _jsxs5(BaseCombobox.Popup, {
            ...{
              className: "x80t9vs x1h9acoj x1odjw0f x1ruevkc xlw8kj3 x1m2o4zq xmkeg23 x1y0btm7 x1nx5sn x16c8i04 xy15sr9 x13tdkmf"
            },
            children: [/* @__PURE__ */ _jsx5(BaseCombobox.List, {
              "aria-label": label,
              children: (option) => /* @__PURE__ */ _jsx5(BaseCombobox.Item, {
                value: option.value,
                disabled: option.disabled,
                className: (state) => ({
                  0: {
                    className: "x1gg8mnh x6yrr3s x78zum5 x6s0dn4 x1o2kpkg xif65rj xt0e3qv x1a2a7pz"
                  },
                  2: {
                    className: "x1gg8mnh x6yrr3s x78zum5 x6s0dn4 x1o2kpkg xif65rj xt0e3qv x1a2a7pz x1m7fmmm"
                  },
                  1: {
                    className: "x1gg8mnh x6yrr3s x78zum5 x6s0dn4 x1o2kpkg xif65rj xt0e3qv x1a2a7pz x19s9jnd"
                  },
                  3: {
                    className: "x1gg8mnh x6yrr3s x78zum5 x6s0dn4 x1o2kpkg xif65rj xt0e3qv x1a2a7pz x1m7fmmm x19s9jnd"
                  }
                })[!!state.highlighted << 1 | !!state.selected << 0].className,
                children: option.label
              }, option.value)
            }), /* @__PURE__ */ _jsx5(BaseCombobox.Empty, {
              ...{
                className: "xc7ga6q xif65rj x1x2jehb"
              },
              children: "No matching options."
            })]
          })
        })
      })]
    }), /* @__PURE__ */ _jsx5(FieldMessages, {
      description,
      error,
      descriptionId,
      errorId
    })]
  });
}
function ToggleGroup({
  label,
  value,
  onValueChange,
  options,
  description,
  error,
  disabled,
  multiple = false,
  orientation = "horizontal",
  id: suppliedId
}) {
  const generatedId = useId3();
  const id = suppliedId || generatedId;
  const descriptionId = description ? `${id}-description` : void 0;
  const errorId = error ? `${id}-error` : void 0;
  return /* @__PURE__ */ _jsxs5("div", {
    ...{
      className: "x78zum5 xdt5ytf x167g77z xeuugli"
    },
    children: [/* @__PURE__ */ _jsx5("span", {
      id: `${id}-label`,
      ...{
        className: "xif65rj x1s688f x1m2o4zq"
      },
      children: label
    }), /* @__PURE__ */ _jsx5(BaseToggleGroup, {
      value,
      onValueChange: (next) => onValueChange([...next]),
      disabled,
      multiple,
      orientation,
      "aria-labelledby": `${id}-label`,
      "aria-describedby": describedBy(void 0, descriptionId, errorId),
      "aria-invalid": error ? true : void 0,
      ...{
        0: {
          className: "x78zum5 x1a02dak x1qjc9v5 x1wxaq2x"
        },
        2: {
          className: "x78zum5 x1wxaq2x xdt5ytf xozqiw3 x1qjc9v5"
        },
        1: {
          className: "x78zum5 x1a02dak x1qjc9v5 x1wxaq2x xbyyjgo x1h6gzvc"
        },
        3: {
          className: "x78zum5 x1wxaq2x xdt5ytf xozqiw3 x1qjc9v5 xbyyjgo x1h6gzvc"
        }
      }[!!(orientation === "vertical") << 1 | !!disabled << 0],
      children: options.map((option, index) => /* @__PURE__ */ _jsx5(Toggle, {
        value: option.value,
        disabled: option.disabled,
        className: (state) => stylex4.props(s2.toggle, orientation === "horizontal" && index === 0 && s2.firstToggle, orientation === "horizontal" && index > 0 && s2.joinedToggle, orientation === "horizontal" && index === options.length - 1 && s2.lastToggle, orientation === "vertical" && index === 0 && s2.firstToggleVertical, orientation === "vertical" && index > 0 && s2.joinedToggleVertical, orientation === "vertical" && index === options.length - 1 && s2.lastToggleVertical, state.pressed && s2.pressed, option.disabled && s2.disabled).className,
        children: option.label
      }, option.value))
    }), /* @__PURE__ */ _jsx5(FieldMessages, {
      description,
      error,
      descriptionId,
      errorId
    })]
  });
}
function DateField({
  label,
  value,
  onValueChange,
  description,
  error,
  id: suppliedId,
  className,
  ...props4
}) {
  const generatedId = useId3();
  const id = suppliedId || generatedId;
  const descriptionId = description ? `${id}-description` : void 0;
  const errorId = error ? `${id}-error` : void 0;
  const onChange = (event) => onValueChange(event.target.value);
  const generated = {
    0: {
      className: "xh8yej3 x1wxaq2x xi0fwqg x1yq7fdl x1m2o4zq xmkeg23 x1y0btm7 x1t4gzue xtdikab xjb2p0i x1j61zf2 x1evy7pa"
    },
    2: {
      className: "xh8yej3 x1wxaq2x xi0fwqg x1yq7fdl x1m2o4zq xmkeg23 x1y0btm7 xtdikab xjb2p0i x1j61zf2 x1evy7pa xv53aiy"
    },
    1: {
      className: "xh8yej3 x1wxaq2x xi0fwqg x1yq7fdl x1m2o4zq xmkeg23 x1y0btm7 x1t4gzue xtdikab xjb2p0i x1j61zf2 x1evy7pa xbyyjgo x1h6gzvc"
    },
    3: {
      className: "xh8yej3 x1wxaq2x xi0fwqg x1yq7fdl x1m2o4zq xmkeg23 x1y0btm7 xtdikab xjb2p0i x1j61zf2 x1evy7pa xv53aiy xbyyjgo x1h6gzvc"
    }
  }[!!!!error << 1 | !!props4.disabled << 0];
  return /* @__PURE__ */ _jsxs5("div", {
    ...{
      className: "x78zum5 xdt5ytf x167g77z xeuugli"
    },
    children: [/* @__PURE__ */ _jsx5("label", {
      htmlFor: id,
      ...{
        className: "xif65rj x1s688f x1m2o4zq"
      },
      children: label
    }), /* @__PURE__ */ _jsx5("input", {
      ...props4,
      id,
      type: "date",
      value,
      onChange,
      ...generated,
      className: [generated.className, className].filter(Boolean).join(" "),
      "aria-invalid": error ? true : props4["aria-invalid"],
      "aria-describedby": describedBy(props4["aria-describedby"], descriptionId, errorId),
      "aria-errormessage": errorId || props4["aria-errormessage"]
    }), /* @__PURE__ */ _jsx5(FieldMessages, {
      description,
      error,
      descriptionId,
      errorId
    })]
  });
}
function FileUpload({
  label,
  onFilesChange,
  description,
  error,
  id: suppliedId,
  className,
  ...props4
}) {
  const generatedId = useId3();
  const id = suppliedId || generatedId;
  const descriptionId = description ? `${id}-description` : void 0;
  const errorId = error ? `${id}-error` : void 0;
  const onChange = (event) => onFilesChange?.(event.target.files);
  const generated = {
    0: {
      className: "xh8yej3 x1wxaq2x x1yq7fdl x1m2o4zq xmkeg23 x1y0btm7 x1t4gzue xtdikab xjb2p0i x1j61zf2 x1evy7pa x15x03d9"
    },
    2: {
      className: "xh8yej3 x1wxaq2x x1yq7fdl x1m2o4zq xmkeg23 x1y0btm7 xtdikab xjb2p0i x1j61zf2 x1evy7pa x15x03d9 xv53aiy"
    },
    1: {
      className: "xh8yej3 x1wxaq2x x1yq7fdl x1m2o4zq xmkeg23 x1y0btm7 x1t4gzue xtdikab xjb2p0i x1j61zf2 x1evy7pa x15x03d9 xbyyjgo x1h6gzvc"
    },
    3: {
      className: "xh8yej3 x1wxaq2x x1yq7fdl x1m2o4zq xmkeg23 x1y0btm7 xtdikab xjb2p0i x1j61zf2 x1evy7pa x15x03d9 xv53aiy xbyyjgo x1h6gzvc"
    }
  }[!!!!error << 1 | !!props4.disabled << 0];
  return /* @__PURE__ */ _jsxs5("div", {
    ...{
      className: "x78zum5 xdt5ytf x167g77z xeuugli"
    },
    children: [/* @__PURE__ */ _jsx5("label", {
      htmlFor: id,
      ...{
        className: "xif65rj x1s688f x1m2o4zq"
      },
      children: label
    }), /* @__PURE__ */ _jsx5("input", {
      ...props4,
      id,
      type: "file",
      onChange,
      ...generated,
      className: [generated.className, className].filter(Boolean).join(" "),
      "aria-invalid": error ? true : props4["aria-invalid"],
      "aria-describedby": describedBy(props4["aria-describedby"], descriptionId, errorId),
      "aria-errormessage": errorId || props4["aria-errormessage"]
    }), /* @__PURE__ */ _jsx5(FieldMessages, {
      description,
      error,
      descriptionId,
      errorId
    })]
  });
}

// ../../../../AppData/Local/Packages/sandbox.{bdd27477-b7de-48cd-86f6-d2c824e3aa41}/AC/Temp/serein-stylex-tUU8Qa/overlays.js
import { useRef as useRef2 } from "react";
import * as stylex5 from "@stylexjs/stylex";
import { Tooltip as BaseTooltip } from "@base-ui/react/tooltip";
import { Popover as BasePopover } from "@base-ui/react/popover";
import { Menu as BaseMenu } from "@base-ui/react/menu";
import { Dialog as BaseDialog2 } from "@base-ui/react/dialog";
import { AlertDialog as BaseAlertDialog } from "@base-ui/react/alert-dialog";
import { Accordion as BaseAccordion } from "@base-ui/react/accordion";
import { jsx as _jsx6, jsxs as _jsxs6 } from "react/jsx-runtime";
function Tooltip({
  content,
  children,
  disabled
}) {
  return /* @__PURE__ */ _jsxs6(BaseTooltip.Root, {
    disabled,
    children: [/* @__PURE__ */ _jsx6(BaseTooltip.Trigger, {
      render: children
    }), /* @__PURE__ */ _jsx6(BaseTooltip.Portal, {
      children: /* @__PURE__ */ _jsx6(BaseTooltip.Positioner, {
        sideOffset: 8,
        ...{
          className: "x13tdkmf"
        },
        children: /* @__PURE__ */ _jsx6(BaseTooltip.Popup, {
          role: "tooltip",
          ...{
            className: "x1jkqq1h x1160tuk x1kzqth x1otsjef x1o2kpkg x4z9k3i xfrs9s4 xy15sr9"
          },
          children: content
        })
      })
    })]
  });
}
function Popover({
  triggerLabel,
  title,
  children,
  open,
  defaultOpen,
  onOpenChange
}) {
  return /* @__PURE__ */ _jsxs6(BasePopover.Root, {
    open,
    defaultOpen,
    onOpenChange: (next) => onOpenChange?.(next),
    children: [/* @__PURE__ */ _jsx6(BasePopover.Trigger, {
      ...{
        className: "x1wxaq2x x1a5nu0n x16pp3ps xe6e02q xyor4f x1m2o4zq x178xt8z xs1s249 xso031l xe0pwq x1y0btm7 x1nx5sn xtdikab xjb2p0i xif65rj x1s688f x1ypdohk"
      },
      children: triggerLabel
    }), /* @__PURE__ */ _jsx6(BasePopover.Portal, {
      children: /* @__PURE__ */ _jsx6(BasePopover.Positioner, {
        sideOffset: 8,
        ...{
          className: "x13tdkmf"
        },
        children: /* @__PURE__ */ _jsxs6(BasePopover.Popup, {
          role: "dialog",
          "aria-label": title,
          ...{
            className: "xlm99nl x97h141 x1qhigcl xlw8kj3 x1m2o4zq x178xt8z xs1s249 xso031l xe0pwq x1y0btm7 x1nx5sn x16c8i04 xy15sr9"
          },
          children: [/* @__PURE__ */ _jsx6("h2", {
            ...{
              className: "x1q6ys4k x1m2o4zq xosj86m x19s9jnd x1xfvgam x72az59"
            },
            children: title
          }), children]
        })
      })
    })]
  });
}
function DropdownMenu({
  triggerLabel,
  items,
  open,
  defaultOpen,
  onOpenChange
}) {
  return /* @__PURE__ */ _jsxs6(BaseMenu.Root, {
    open,
    defaultOpen,
    onOpenChange: (next) => onOpenChange?.(next),
    children: [/* @__PURE__ */ _jsxs6(BaseMenu.Trigger, {
      type: "button",
      ...{
        className: "x1wxaq2x x1a5nu0n x16pp3ps xe6e02q xyor4f x1m2o4zq x178xt8z xs1s249 xso031l xe0pwq x1y0btm7 x1nx5sn xtdikab xjb2p0i xif65rj x1s688f x1ypdohk x3nfvp2 x6s0dn4 x1qughib x1v2ro7d x193iq5w xj0a0fe"
      },
      children: [triggerLabel, /* @__PURE__ */ _jsx6("svg", {
        "aria-hidden": "true",
        width: "16",
        height: "16",
        viewBox: "0 0 24 24",
        fill: "none",
        stroke: "currentColor",
        strokeWidth: "1.8",
        strokeLinecap: "round",
        strokeLinejoin: "round",
        ...{
          className: "x2lah0s"
        },
        children: /* @__PURE__ */ _jsx6("path", {
          d: "m6 9 6 6 6-6"
        })
      })]
    }), /* @__PURE__ */ _jsx6(BaseMenu.Portal, {
      children: /* @__PURE__ */ _jsx6(BaseMenu.Positioner, {
        sideOffset: 6,
        align: "start",
        ...{
          className: "x13tdkmf"
        },
        children: /* @__PURE__ */ _jsxs6(BaseMenu.Popup, {
          ...{
            className: "xlopysa x18eze43 x1h9acoj x1odjw0f x1ruevkc xlw8kj3 x1m2o4zq x178xt8z xs1s249 xso031l xe0pwq x1y0btm7 x1nx5sn x16c8i04 xy15sr9"
          },
          children: [items.map((item) => /* @__PURE__ */ _jsx6(BaseMenu.Item, {
            disabled: item.disabled,
            onClick: item.onSelect,
            className: (state) => ({
              0: {
                className: "xh8yej3 x1gg8mnh x6yrr3s x78zum5 x6s0dn4 xjbqb8w x1m2o4zq xc342km x1y0btm7 x1o2kpkg xjb2p0i xif65rj x1evy7pa xdpxx8g x1ypdohk xj0a0fe x1a2a7pz x1sl05ne xj3ae5l"
              },
              2: {
                className: "xh8yej3 x1gg8mnh x6yrr3s x78zum5 x6s0dn4 x1m2o4zq xc342km x1y0btm7 x1o2kpkg xjb2p0i xif65rj x1evy7pa xdpxx8g x1ypdohk xj0a0fe x1a2a7pz x1sl05ne xj3ae5l x1f82e63"
              },
              1: {
                className: "xh8yej3 x1gg8mnh x6yrr3s x78zum5 x6s0dn4 xjbqb8w xc342km x1y0btm7 x1o2kpkg xjb2p0i xif65rj x1evy7pa xdpxx8g xj0a0fe x1a2a7pz x1sl05ne xj3ae5l x1x2jehb x1h6gzvc"
              },
              3: {
                className: "xh8yej3 x1gg8mnh x6yrr3s x78zum5 x6s0dn4 xc342km x1y0btm7 x1o2kpkg xjb2p0i xif65rj x1evy7pa xdpxx8g xj0a0fe x1a2a7pz x1sl05ne xj3ae5l x1f82e63 x1x2jehb x1h6gzvc"
              }
            })[!!state.highlighted << 1 | !!state.disabled << 0].className,
            children: item.label
          }, item.label)), items.length === 0 && /* @__PURE__ */ _jsx6(BaseMenu.Item, {
            disabled: true,
            ...{
              className: "xh8yej3 x1gg8mnh x6yrr3s x78zum5 x6s0dn4 xjbqb8w xc342km x1y0btm7 x1o2kpkg xjb2p0i xif65rj x1evy7pa xdpxx8g xj0a0fe x1a2a7pz x1sl05ne xj3ae5l x1x2jehb x1h6gzvc"
            },
            children: "No actions available."
          })]
        })
      })
    })]
  });
}
function AlertDialog({
  triggerLabel,
  title,
  description,
  confirmLabel,
  cancelLabel = "Cancel",
  onConfirm,
  children,
  open,
  defaultOpen,
  onOpenChange
}) {
  const cancelRef = useRef2(null);
  return /* @__PURE__ */ _jsxs6(BaseAlertDialog.Root, {
    open,
    defaultOpen,
    onOpenChange: (next, details) => {
      if (!next && details.reason !== "escape-key" && details.reason !== "close-press") {
        details.cancel();
        return;
      }
      onOpenChange?.(next);
    },
    children: [/* @__PURE__ */ _jsx6(BaseAlertDialog.Trigger, {
      ...{
        className: "x1wxaq2x x1a5nu0n x16pp3ps xe6e02q xyor4f x1m2o4zq x178xt8z xs1s249 xso031l xe0pwq x1y0btm7 x1nx5sn xtdikab xjb2p0i xif65rj x1s688f x1ypdohk"
      },
      children: triggerLabel
    }), /* @__PURE__ */ _jsxs6(BaseAlertDialog.Portal, {
      children: [/* @__PURE__ */ _jsx6(BaseAlertDialog.Backdrop, {
        ...{
          className: "xixxii4 x10a8y8t x1u92v9d x6y048q"
        }
      }), /* @__PURE__ */ _jsxs6(BaseAlertDialog.Popup, {
        initialFocus: () => cancelRef.current,
        ...{
          className: "xixxii4 xwa60dl x1nrll8i x11lhmoz xsjcku0 xs8sm83 x1odjw0f x10xs6qf xlw8kj3 x1m2o4zq x178xt8z xs1s249 xso031l xe0pwq x1y0btm7 x1nx5sn x9vza20 xtea94d xpd2g0m"
        },
        children: [/* @__PURE__ */ _jsx6(BaseAlertDialog.Title, {
          ...{
            className: "x1q6ys4k x1m2o4zq xosj86m x19s9jnd x1xfvgam x72az59"
          },
          children: title
        }), /* @__PURE__ */ _jsx6(BaseAlertDialog.Description, {
          ...{
            className: "xkaeupc x1x2jehb xif65rj x1dbl2gt"
          },
          children: description
        }), children, /* @__PURE__ */ _jsxs6("div", {
          ...{
            className: "x78zum5 x1a02dak x13a6bvl x883omv xqui205"
          },
          children: [/* @__PURE__ */ _jsx6(BaseAlertDialog.Close, {
            ref: cancelRef,
            ...{
              className: "x1wxaq2x x1a5nu0n x16pp3ps xe6e02q xyor4f x1m2o4zq x178xt8z xs1s249 xso031l xe0pwq x1y0btm7 x1nx5sn xtdikab xjb2p0i xif65rj x1s688f x1ypdohk"
            },
            children: cancelLabel
          }), /* @__PURE__ */ _jsx6(BaseAlertDialog.Close, {
            onClick: onConfirm,
            ...{
              className: "x1wxaq2x x1a5nu0n x178xt8z xs1s249 xso031l xe0pwq x1y0btm7 xtdikab xjb2p0i xif65rj x1s688f x1ypdohk x2dcc83 x1g6n05u xxw2enj x1otsjef xv53aiy"
            },
            children: confirmLabel
          })]
        })]
      })]
    })]
  });
}
function Drawer({
  triggerLabel,
  title,
  description,
  children,
  side = "right",
  open,
  defaultOpen,
  onOpenChange
}) {
  return /* @__PURE__ */ _jsxs6(BaseDialog2.Root, {
    open,
    defaultOpen,
    onOpenChange: (next) => onOpenChange?.(next),
    children: [/* @__PURE__ */ _jsx6(BaseDialog2.Trigger, {
      ...{
        className: "x1wxaq2x x1a5nu0n x16pp3ps xe6e02q xyor4f x1m2o4zq x178xt8z xs1s249 xso031l xe0pwq x1y0btm7 x1nx5sn xtdikab xjb2p0i xif65rj x1s688f x1ypdohk"
      },
      children: triggerLabel
    }), /* @__PURE__ */ _jsxs6(BaseDialog2.Portal, {
      children: [/* @__PURE__ */ _jsx6(BaseDialog2.Backdrop, {
        ...{
          className: "xixxii4 x10a8y8t x1u92v9d x6y048q"
        }
      }), /* @__PURE__ */ _jsxs6(BaseDialog2.Popup, {
        ...{
          0: {
            className: "xixxii4 x13vifvy x1ey2m1c x1g7kauv x10xs6qf x1odjw0f xlw8kj3 x1m2o4zq x972fbf x1qhh985 x1y0btm7 x1nx5sn xtea94d xpd2g0m x3m8u43 xe0pwq xgfja2r"
          },
          1: {
            className: "xixxii4 x13vifvy x1ey2m1c x1g7kauv x10xs6qf x1odjw0f xlw8kj3 x1m2o4zq x972fbf x1qhh985 x1y0btm7 x1nx5sn xtea94d xpd2g0m xu96u03 xs1s249 xyj58a3"
          }
        }[!!(side === "left") << 0],
        children: [/* @__PURE__ */ _jsxs6("div", {
          ...{
            className: "x78zum5 x1cy8zhl x1qughib xou54vl xieb3on"
          },
          children: [/* @__PURE__ */ _jsxs6("div", {
            children: [/* @__PURE__ */ _jsx6(BaseDialog2.Title, {
              ...{
                className: "x1q6ys4k x1m2o4zq xosj86m x19s9jnd x1xfvgam x72az59"
              },
              children: title
            }), description && /* @__PURE__ */ _jsx6(BaseDialog2.Description, {
              ...{
                className: "xkaeupc x1x2jehb xif65rj x1dbl2gt"
              },
              children: description
            })]
          }), /* @__PURE__ */ _jsx6(BaseDialog2.Close, {
            "aria-label": `Close ${title}`,
            ...{
              className: "x16pp3ps xe6e02q xyor4f x1m2o4zq x178xt8z xs1s249 xso031l xe0pwq x1y0btm7 x1nx5sn xtdikab xjb2p0i xif65rj x1s688f x1ypdohk x1nb6za0 x1gg8mnh xe8ttls xwz0xwf x1ku5rj1"
            },
            children: /* @__PURE__ */ _jsx6("svg", {
              "aria-hidden": "true",
              width: "20",
              height: "20",
              viewBox: "0 0 24 24",
              fill: "none",
              stroke: "currentColor",
              strokeWidth: "2",
              children: /* @__PURE__ */ _jsx6("path", {
                d: "M6 6l12 12M18 6 6 18"
              })
            })
          })]
        }), children]
      })]
    })]
  });
}
function Accordion({
  label,
  items,
  value,
  defaultValue,
  onValueChange,
  multiple
}) {
  return /* @__PURE__ */ _jsx6(BaseAccordion.Root, {
    "aria-label": label,
    value,
    defaultValue,
    multiple,
    onValueChange: (next) => onValueChange?.(next),
    ...{
      className: "x178xt8z xs1s249 xso031l xe0pwq x1y0btm7 x1nx5sn x1l0h3lx xlw8kj3 x14e6ola"
    },
    children: items.map((item, index) => /* @__PURE__ */ _jsx6(AccordionRow, {
      item,
      first: index === 0,
      last: index === items.length - 1
    }, item.value))
  });
}
function AccordionRow({
  item,
  first,
  last
}) {
  return /* @__PURE__ */ _jsxs6(BaseAccordion.Item, {
    value: item.value,
    disabled: item.disabled,
    ...{
      0: {
        className: "xso031l x1q0q8m5 x1p15aix"
      },
      1: {
        className: "x1q0q8m5 x1p15aix x1qhh985"
      }
    }[!!last << 0],
    children: [/* @__PURE__ */ _jsx6(BaseAccordion.Header, {
      ...{
        className: "x1ghz6dp"
      },
      children: /* @__PURE__ */ _jsx6(BaseAccordion.Trigger, {
        render: (props4, state) => /* @__PURE__ */ _jsxs6("button", {
          ...props4,
          ...{
            0: {
              className: "xh8yej3 x1wiwyrm x1iwkndl x78zum5 x6s0dn4 x1qughib x1v2ro7d xjbqb8w xe6e02q xyor4f x1m2o4zq xc342km x1y0btm7 xjb2p0i xif65rj x1s688f xdpxx8g x1ypdohk"
            },
            2: {
              className: "xh8yej3 x1wiwyrm x1iwkndl x78zum5 x6s0dn4 x1qughib x1v2ro7d xjbqb8w xe6e02q xyor4f x1m2o4zq xc342km x1y0btm7 xjb2p0i xif65rj x1s688f xdpxx8g x1ypdohk xz589uc x1h647ni"
            },
            1: {
              className: "xh8yej3 x1wiwyrm x1iwkndl x78zum5 x6s0dn4 x1qughib x1v2ro7d xjbqb8w xe6e02q xyor4f x1m2o4zq xc342km x1y0btm7 xjb2p0i xif65rj x1s688f xdpxx8g x1ypdohk x2a9mq5 x1eq2av2"
            },
            3: {
              className: "xh8yej3 x1wiwyrm x1iwkndl x78zum5 x6s0dn4 x1qughib x1v2ro7d xjbqb8w xe6e02q xyor4f x1m2o4zq xc342km x1y0btm7 xjb2p0i xif65rj x1s688f xdpxx8g x1ypdohk xz589uc x1h647ni x2a9mq5 x1eq2av2"
            }
          }[!!first << 1 | !!(last && !state.open) << 0],
          children: [item.label, /* @__PURE__ */ _jsx6("svg", {
            "aria-hidden": "true",
            "data-expanded": state.open ? "true" : "false",
            width: "18",
            height: "18",
            viewBox: "0 0 24 24",
            fill: "none",
            stroke: "currentColor",
            strokeWidth: "2",
            strokeLinecap: "round",
            strokeLinejoin: "round",
            style: {
              transform: state.open ? "rotate(180deg)" : "rotate(0deg)"
            },
            children: /* @__PURE__ */ _jsx6("path", {
              d: "m6 9 6 6 6-6"
            })
          })]
        })
      })
    }), /* @__PURE__ */ _jsx6(BaseAccordion.Panel, {
      ...{
        className: "xbpthk9 x1x2jehb xif65rj x1dbl2gt"
      },
      children: item.content
    })]
  });
}

// ../../../../AppData/Local/Packages/sandbox.{bdd27477-b7de-48cd-86f6-d2c824e3aa41}/AC/Temp/serein-stylex-tUU8Qa/feedback.js
import { useEffect as useEffect2, useId as useId4, useState as useState2 } from "react";
import * as stylex6 from "@stylexjs/stylex";
import { Toast as BaseToast } from "@base-ui/react/toast";
import { jsx as _jsx7, jsxs as _jsxs7, Fragment as _Fragment3 } from "react/jsx-runtime";
var s3 = {
  badge: {
    khDVqt: "xuxw1ft",
    k1xSpc: "x3nfvp2",
    kGNEyG: "x6s0dn4",
    kOIVth: "x17d4w8g",
    kmVPX3: "x1asu97y",
    kMzoRj: "xc342km",
    ksu8eU: "x1y0btm7",
    kaIpWk: "x1o2kpkg",
    kGuDYH: "xfifm61",
    k63SB2: "x1s688f",
    kLWn49: "x1evy7pa",
    $$css: true
  },
  badgeNeutral: {
    kMwMTN: "x1m2o4zq",
    kWkggS: "x16pp3ps",
    $$css: true
  },
  badgeSuccess: {
    kMwMTN: "x1wipv5v",
    kWkggS: "xdx991l",
    $$css: true
  },
  badgeError: {
    kMwMTN: "x1yalgfx",
    kWkggS: "x9y95ew",
    $$css: true
  },
  badgeWarning: {
    kMwMTN: "xgvu0ag",
    kWkggS: "x1kxfsx",
    $$css: true
  },
  neutral: {
    kMwMTN: "x1m2o4zq",
    $$css: true
  },
  success: {
    kMwMTN: "x1wipv5v",
    $$css: true
  },
  error: {
    kMwMTN: "x1yalgfx",
    $$css: true
  },
  warning: {
    kMwMTN: "xgvu0ag",
    $$css: true
  },
  panel: {
    kmVPX3: "x1qhigcl",
    kMzoRj: "xmkeg23",
    ksu8eU: "x1y0btm7",
    kVAM5u: "x1nx5sn",
    kaIpWk: "x1l0h3lx",
    kMwMTN: "x1m2o4zq",
    kWkggS: "xlw8kj3",
    kGVxlE: "x14e6ola",
    k7Eaqz: "xeuugli",
    kHjlTd: "xj0a0fe",
    $$css: true
  },
  alert: {
    k1xSpc: "x78zum5",
    kOIVth: "x1v2ro7d",
    kGNEyG: "x1cy8zhl",
    kWkggS: "x16pp3ps",
    $$css: true
  },
  title: {
    kogj98: "xc86uaa",
    kGuDYH: "x1j61zf2",
    k63SB2: "x19s9jnd",
    kLWn49: "x37zpob",
    $$css: true
  },
  body: {
    kGuDYH: "xif65rj",
    kLWn49: "xa7kkou",
    kMwMTN: "x1x2jehb",
    kogj98: "x1ghz6dp",
    $$css: true
  },
  avatar: {
    kzqmXN: "x100vrsf",
    kZKoxP: "x1vqgdyp",
    kaIpWk: "x16rqkct",
    k1xSpc: "xwz0xwf",
    kgQiWS: "x1ku5rj1",
    kmuXW: "x2lah0s",
    kVQacm: "xb3r6kr",
    kWkggS: "x1m7fmmm",
    kMwMTN: "x1m2o4zq",
    kMzoRj: "xmkeg23",
    ksu8eU: "x1y0btm7",
    kVAM5u: "x1t4gzue",
    kGuDYH: "xif65rj",
    k63SB2: "x19s9jnd",
    $$css: true
  },
  image: {
    kzqmXN: "xh8yej3",
    kZKoxP: "x5yr21d",
    kVIFPx: "xl1xv1r",
    $$css: true
  },
  separator: {
    kogj98: "x18bl9w9",
    kMzoRj: "xc342km",
    kEafiO: "x178xt8z",
    kPef9Z: "x13fuv20",
    kLZC3w: "x1wfqkoo",
    $$css: true
  },
  skeleton: {
    k1xSpc: "x1lliihq",
    kaIpWk: "x1o2kpkg",
    kWkggS: "x7b4kkq",
    kZKoxP: "xlup9mm",
    kKVMdj: "xft93ff x1aquc0h",
    k44tkh: "x18hd8ej",
    ko0y90: "xa4qsjk",
    kyAemX: "x4hg4is",
    $$css: true
  },
  sr: {
    kVAEAm: "x10l6tqk",
    kzqmXN: "x1i1rx1s",
    kZKoxP: "xjm9jq1",
    kmVPX3: "x1717udv",
    kogj98: "xkdpibf",
    kVQacm: "xb3r6kr",
    kz4h6p: "x1hyvwdk",
    khDVqt: "xuxw1ft",
    kMzoRj: "xc342km",
    $$css: true
  },
  progressField: {
    k1xSpc: "xrvj5dj",
    kOIVth: "x167g77z",
    k7Eaqz: "xeuugli",
    $$css: true
  },
  progressLabels: {
    k1xSpc: "x78zum5",
    kjj79g: "x1qughib",
    kOIVth: "x1v2ro7d",
    kGuDYH: "xif65rj",
    kLWn49: "x1evy7pa",
    kMwMTN: "x1m2o4zq",
    $$css: true
  },
  progress: {
    kzqmXN: "xh8yej3",
    kZKoxP: "x1kpxq89",
    keaTxX: "x1k5x7j1",
    $$css: true
  },
  spinner: {
    kzqmXN: "xw4jnvo",
    kZKoxP: "x1qx5ct2",
    k1xSpc: "x1rg5ohu",
    kmuXW: "x2lah0s",
    kMwMTN: "xhh0039",
    kKVMdj: "x1aerksh x1aquc0h",
    k44tkh: "xegkacw",
    ko0y90: "xa4qsjk",
    kyAemX: "x1esw782",
    $$css: true
  },
  status: {
    k1xSpc: "x3nfvp2",
    kGNEyG: "x6s0dn4",
    kOIVth: "x883omv",
    kMwMTN: "x1m2o4zq",
    kGuDYH: "xif65rj",
    $$css: true
  },
  empty: {
    kmVPX3: "xi7o18q",
    k9WMMc: "x2b8uid",
    ks0D6T: "x27kpxv",
    kUOVxO: "xvueqy4",
    $$css: true
  },
  action: {
    keoZOQ: "x1sy10c2",
    $$css: true
  },
  viewport: {
    kVAEAm: "xixxii4",
    krVfgx: "xjnlgov",
    kCIrl2: "xk6ci0l",
    kzqmXN: "x12y2chx",
    kskxy: "x11p8ha2",
    kORKVm: "x1odjw0f",
    k1xSpc: "x78zum5",
    kXwgrk: "xdt5ytf",
    kOIVth: "x1v2ro7d",
    kY2c9j: "x1hi9sau",
    $$css: true
  },
  toast: {
    kVAEAm: "x1n2onr6",
    kmuXW: "x2lah0s",
    kGVxlE: "xy15sr9",
    $$css: true
  },
  toastHidden: {
    k1xSpc: "x1s85apg",
    $$css: true
  },
  toastActions: {
    k1xSpc: "x78zum5",
    kjj79g: "x13a6bvl",
    kOIVth: "x167g77z",
    keoZOQ: "x14vqqas",
    $$css: true
  }
};
var badgeTones = {
  neutral: s3.badgeNeutral,
  success: s3.badgeSuccess,
  error: s3.badgeError,
  warning: s3.badgeWarning
};
function Badge({
  children,
  tone = "neutral"
}) {
  return /* @__PURE__ */ _jsx7("span", {
    ...stylex6.props(s3.badge, badgeTones[tone]),
    children
  });
}
function Alert({
  title,
  children,
  tone = "neutral",
  live = "off"
}) {
  return /* @__PURE__ */ _jsxs7("div", {
    role: live === "assertive" ? "alert" : live === "polite" ? "status" : "note",
    ...{
      className: "x1qhigcl xmkeg23 x1y0btm7 x1nx5sn x1l0h3lx x1m2o4zq x14e6ola xeuugli xj0a0fe x78zum5 x1v2ro7d x1cy8zhl x16pp3ps"
    },
    children: [/* @__PURE__ */ _jsxs7("svg", {
      "aria-hidden": "true",
      width: "20",
      height: "20",
      viewBox: "0 0 24 24",
      fill: "none",
      stroke: "currentColor",
      strokeWidth: "1.8",
      style: {
        flexShrink: 0,
        marginTop: 2
      },
      ...stylex6.props(s3[tone]),
      children: [/* @__PURE__ */ _jsx7("circle", {
        cx: "12",
        cy: "12",
        r: "9"
      }), /* @__PURE__ */ _jsx7("path", {
        d: tone === "success" ? "m7 12 3 3 7-7" : "M12 7v6M12 16v1"
      })]
    }), /* @__PURE__ */ _jsxs7("div", {
      children: [/* @__PURE__ */ _jsx7("p", {
        ...{
          className: "xc86uaa x1j61zf2 x19s9jnd x37zpob"
        },
        children: title
      }), children && /* @__PURE__ */ _jsx7("div", {
        ...{
          className: "xif65rj xa7kkou x1x2jehb x1ghz6dp"
        },
        children
      })]
    })]
  });
}
function Avatar({
  name,
  src,
  size = 40
}) {
  const [failed, setFailed] = useState2(false);
  useEffect2(() => setFailed(false), [src]);
  const initials = name.trim().split(/\s+/).filter(Boolean).slice(0, 2).map((part) => [...part][0]).join("").toLocaleUpperCase();
  return /* @__PURE__ */ _jsx7("span", {
    ...{
      className: "x100vrsf x1vqgdyp x16rqkct xwz0xwf x1ku5rj1 x2lah0s xb3r6kr x1m7fmmm x1m2o4zq xmkeg23 x1y0btm7 x1t4gzue xif65rj x19s9jnd"
    },
    style: {
      width: size,
      height: size
    },
    role: !src || failed ? "img" : void 0,
    "aria-label": !src || failed ? name : void 0,
    children: src && !failed ? /* @__PURE__ */ _jsx7("img", {
      src,
      alt: name,
      onError: () => setFailed(true),
      ...{
        className: "xh8yej3 x5yr21d xl1xv1r"
      }
    }) : /* @__PURE__ */ _jsx7("span", {
      "aria-hidden": "true",
      children: initials
    })
  });
}
function Card({
  className = "",
  ...props4
}) {
  return /* @__PURE__ */ _jsx7("div", {
    ...props4,
    className: `${{
      className: "x1qhigcl xmkeg23 x1y0btm7 x1nx5sn x1l0h3lx x1m2o4zq xlw8kj3 x14e6ola xeuugli xj0a0fe"
    }.className} ${className}`
  });
}
function Separator({
  className = "",
  ...props4
}) {
  return /* @__PURE__ */ _jsx7("hr", {
    ...props4,
    className: `${{
      className: "x18bl9w9 xc342km x178xt8z x13fuv20 x1wfqkoo"
    }.className} ${className}`
  });
}
function Skeleton({
  width = "100%",
  height = 16,
  label
}) {
  return /* @__PURE__ */ _jsxs7(_Fragment3, {
    children: [/* @__PURE__ */ _jsx7("span", {
      "aria-hidden": "true",
      ...{
        className: "x1lliihq x1o2kpkg x7b4kkq xlup9mm xft93ff x1aquc0h x18hd8ej xa4qsjk x4hg4is"
      },
      style: {
        width,
        height
      }
    }), label && /* @__PURE__ */ _jsx7("span", {
      ...{
        className: "x10l6tqk x1i1rx1s xjm9jq1 x1717udv xkdpibf xb3r6kr x1hyvwdk xuxw1ft xc342km"
      },
      children: label
    })]
  });
}
function Progress({
  label,
  value,
  max = 100
}) {
  const id = useId4();
  const bound = Number.isFinite(max) && max > 0 ? max : 100;
  const bounded = value === void 0 || !Number.isFinite(value) ? void 0 : Math.min(bound, Math.max(0, value));
  return /* @__PURE__ */ _jsxs7("div", {
    ...{
      className: "xrvj5dj x167g77z xeuugli"
    },
    children: [/* @__PURE__ */ _jsxs7("div", {
      ...{
        className: "x78zum5 x1qughib x1v2ro7d xif65rj x1evy7pa x1m2o4zq"
      },
      children: [/* @__PURE__ */ _jsx7("label", {
        htmlFor: id,
        children: label
      }), /* @__PURE__ */ _jsx7("span", {
        "aria-hidden": "true",
        children: bounded === void 0 ? "In progress" : `${Math.round(bounded / bound * 100)}%`
      })]
    }), /* @__PURE__ */ _jsx7("progress", {
      id,
      max: bound,
      value: bounded,
      ...{
        className: "xh8yej3 x1kpxq89 x1k5x7j1"
      }
    })]
  });
}
function Spinner({
  label
}) {
  return /* @__PURE__ */ _jsxs7("span", {
    role: "status",
    ...{
      className: "x3nfvp2 x6s0dn4 x883omv x1m2o4zq xif65rj"
    },
    children: [/* @__PURE__ */ _jsx7("svg", {
      "aria-hidden": "true",
      viewBox: "0 0 24 24",
      fill: "none",
      stroke: "currentColor",
      strokeWidth: "2",
      ...{
        className: "xw4jnvo x1qx5ct2 x1rg5ohu x2lah0s xhh0039 x1aerksh x1aquc0h xegkacw xa4qsjk x1esw782"
      },
      children: /* @__PURE__ */ _jsx7("path", {
        d: "M12 3a9 9 0 1 1-9 9",
        strokeLinecap: "round"
      })
    }), /* @__PURE__ */ _jsx7("span", {
      children: label
    })]
  });
}
function EmptyState({
  title,
  description,
  action
}) {
  return /* @__PURE__ */ _jsxs7("div", {
    ...{
      className: "xi7o18q x2b8uid x27kpxv xvueqy4"
    },
    children: [/* @__PURE__ */ _jsx7("p", {
      ...{
        className: "xc86uaa x1j61zf2 x19s9jnd x37zpob"
      },
      children: title
    }), /* @__PURE__ */ _jsx7("p", {
      ...{
        className: "xif65rj xa7kkou x1x2jehb x1ghz6dp"
      },
      children: description
    }), action && /* @__PURE__ */ _jsx7("div", {
      ...{
        className: "x1sy10c2"
      },
      children: action
    })]
  });
}
function useToast() {
  const manager = BaseToast.useToastManager();
  return {
    add: ({
      tone,
      ...options
    }) => manager.add({
      ...options,
      type: tone
    }),
    dismiss: manager.close,
    update: (id, {
      tone,
      ...options
    }) => manager.update(id, {
      ...options,
      ...tone === void 0 ? {} : {
        type: tone
      }
    })
  };
}
function ToastViewport() {
  const {
    toasts
  } = BaseToast.useToastManager();
  return /* @__PURE__ */ _jsx7(BaseToast.Portal, {
    children: /* @__PURE__ */ _jsx7(BaseToast.Viewport, {
      "aria-label": "Notifications",
      ...{
        className: "xixxii4 xjnlgov xk6ci0l x12y2chx x11p8ha2 x1odjw0f x78zum5 xdt5ytf x1v2ro7d x1hi9sau"
      },
      children: toasts.map((toast) => /* @__PURE__ */ _jsx7(BaseToast.Root, {
        toast,
        className: (state) => ({
          0: {
            className: "x1qhigcl xmkeg23 x1y0btm7 x1nx5sn x1l0h3lx x1m2o4zq xlw8kj3 xeuugli xj0a0fe x1n2onr6 x2lah0s xy15sr9"
          },
          1: {
            className: "x1qhigcl xmkeg23 x1y0btm7 x1nx5sn x1l0h3lx x1m2o4zq xlw8kj3 xeuugli xj0a0fe x1n2onr6 x2lah0s xy15sr9 x1s85apg"
          }
        })[!!(state.limited || state.transitionStatus === "ending") << 0].className,
        children: /* @__PURE__ */ _jsxs7(BaseToast.Content, {
          children: [/* @__PURE__ */ _jsx7(BaseToast.Title, {
            ...stylex6.props(s3.title, s3[toast.type || "neutral"])
          }), toast.description && /* @__PURE__ */ _jsx7(BaseToast.Description, {
            ...{
              className: "xif65rj xa7kkou x1x2jehb x1ghz6dp"
            }
          }), /* @__PURE__ */ _jsx7("div", {
            ...{
              className: "x78zum5 x13a6bvl x167g77z x14vqqas"
            },
            children: /* @__PURE__ */ _jsx7(BaseToast.Close, {
              "aria-hidden": false,
              "aria-label": "Dismiss notification",
              render: /* @__PURE__ */ _jsx7(Button, {
                variant: "quiet"
              }),
              children: "Dismiss"
            })
          })]
        })
      }, toast.id))
    })
  });
}
function ToastProvider({
  children,
  timeout = 5e3,
  limit = 3
}) {
  return /* @__PURE__ */ _jsxs7(BaseToast.Provider, {
    timeout,
    limit,
    children: [children, /* @__PURE__ */ _jsx7(ToastViewport, {})]
  });
}

// ../../../../AppData/Local/Packages/sandbox.{bdd27477-b7de-48cd-86f6-d2c824e3aa41}/AC/Temp/serein-stylex-tUU8Qa/navigation.js
import * as stylex7 from "@stylexjs/stylex";
import { jsx as _jsx8, jsxs as _jsxs8 } from "react/jsx-runtime";
function Link({
  className = "",
  target,
  rel,
  ...props4
}) {
  return /* @__PURE__ */ _jsx8("a", {
    ...props4,
    target,
    rel: target === "_blank" ? `${rel ?? ""} noopener noreferrer`.trim() : rel,
    className: `${{
      className: "xhh0039 x1bvjpef xda060z x1dbl2gt x1itt8ug"
    }.className} ${className}`
  });
}
function IconButton({
  label,
  children,
  className = "",
  variant = "quiet",
  ...props4
}) {
  return /* @__PURE__ */ _jsx8(Button, {
    ...props4,
    variant,
    "aria-label": label,
    className: `${{
      className: "x1useyqa xsdox4t xc7ga6q x2lah0s"
    }.className} ${className}`,
    children: /* @__PURE__ */ _jsx8("span", {
      "aria-hidden": "true",
      ...{
        className: "x78zum5 x6s0dn4 xl56j7k"
      },
      children
    })
  });
}
function Breadcrumbs({
  label = "Breadcrumbs",
  items
}) {
  return /* @__PURE__ */ _jsx8("nav", {
    "aria-label": label,
    children: /* @__PURE__ */ _jsx8("ol", {
      ...{
        className: "xe8uvvx x1ghz6dp x1717udv x78zum5 x6s0dn4 x1a02dak x167g77z xif65rj"
      },
      children: items.map((item, index) => /* @__PURE__ */ _jsxs8("li", {
        ...{
          className: "x3nfvp2 x6s0dn4 x167g77z x21xpn4 xj0a0fe"
        },
        children: [index > 0 && /* @__PURE__ */ _jsx8("svg", {
          "aria-hidden": "true",
          width: "14",
          height: "14",
          viewBox: "0 0 24 24",
          fill: "none",
          stroke: "currentColor",
          strokeWidth: "1.8",
          ...{
            className: "x1x2jehb"
          },
          children: /* @__PURE__ */ _jsx8("path", {
            d: "m9 5 7 7-7 7"
          })
        }), index === items.length - 1 ? /* @__PURE__ */ _jsx8("span", {
          "aria-current": "page",
          ...{
            className: "x1m2o4zq x1s688f"
          },
          children: item.label
        }) : item.href ? /* @__PURE__ */ _jsx8(Link, {
          href: item.href,
          children: item.label
        }) : /* @__PURE__ */ _jsx8("span", {
          ...{
            className: "x1x2jehb"
          },
          children: item.label
        })]
      }, `${index}-${item.label}`))
    })
  });
}
function Pagination({
  page,
  pageCount,
  onPageChange,
  label = "Pagination",
  disabled = false
}) {
  const count = Number.isFinite(pageCount) ? Math.max(1, Math.trunc(pageCount)) : 1;
  const current = Number.isFinite(page) ? Math.min(count, Math.max(1, Math.trunc(page))) : 1;
  const pages = [...new Set([1, current - 1, current, current + 1, count].filter((value) => value >= 1 && value <= count))].sort((a, b) => a - b);
  return /* @__PURE__ */ _jsxs8("nav", {
    "aria-label": label,
    ...{
      className: "x78zum5 x6s0dn4 x1a02dak x17d4w8g"
    },
    children: [/* @__PURE__ */ _jsx8(Button, {
      variant: "secondary",
      disabled: disabled || current === 1,
      "aria-label": "Previous page",
      onClick: () => onPageChange(current - 1),
      children: "Previous"
    }), pages.map((number, index) => /* @__PURE__ */ _jsxs8("span", {
      ...{
        className: "x78zum5 x6s0dn4 x1a02dak x17d4w8g"
      },
      children: [index > 0 && number - pages[index - 1] > 1 && /* @__PURE__ */ _jsx8("span", {
        "aria-hidden": "true",
        ...{
          className: "x1x2jehb"
        },
        children: "\u2026"
      }), /* @__PURE__ */ _jsx8(Button, {
        variant: "quiet",
        disabled,
        "aria-label": `Page ${number}`,
        "aria-current": number === current ? "page" : void 0,
        className: {
          0: {
            className: "x7z7khe x1nb6za0 x1gg8mnh"
          },
          1: {
            className: "x7z7khe x1nb6za0 x1gg8mnh x1m7fmmm x1jcwxqw x1xlr1w8"
          }
        }[!!(number === current) << 0].className,
        onClick: () => {
          if (number !== current) onPageChange(number);
        },
        children: number
      })]
    }, number)), /* @__PURE__ */ _jsx8(Button, {
      variant: "secondary",
      disabled: disabled || current === count,
      "aria-label": "Next page",
      onClick: () => onPageChange(current + 1),
      children: "Next"
    })]
  });
}

// ../../../../AppData/Local/Packages/sandbox.{bdd27477-b7de-48cd-86f6-d2c824e3aa41}/AC/Temp/serein-stylex-tUU8Qa/data-table.js
import { useState as useState3 } from "react";
import * as stylex8 from "@stylexjs/stylex";
import { jsx as _jsx9, jsxs as _jsxs9 } from "react/jsx-runtime";
function DataTable({
  caption,
  rows,
  columns,
  rowKey,
  sort: controlledSort,
  onSortChange,
  loading = false,
  emptyMessage = "No results."
}) {
  const [localSort, setLocalSort] = useState3(null);
  const sort = controlledSort === void 0 ? localSort : controlledSort;
  const active = columns.find((column) => column.key === sort?.key);
  const displayed = active?.sortValue && sort ? [...rows].sort((a, b) => {
    const left = active.sortValue(a), right = active.sortValue(b);
    if (left == null) return right == null ? 0 : 1;
    if (right == null) return -1;
    const result = typeof left === "number" && typeof right === "number" ? left - right : String(left).localeCompare(String(right), void 0, {
      numeric: true
    });
    return sort.direction === "asc" ? result : -result;
  }) : rows;
  function changeSort(key) {
    const next = {
      key,
      direction: sort?.key === key && sort.direction === "asc" ? "desc" : "asc"
    };
    if (controlledSort === void 0) setLocalSort(next);
    onSortChange?.(next);
  }
  return /* @__PURE__ */ _jsx9("div", {
    role: "region",
    "aria-label": `${caption} table scroll area`,
    tabIndex: 0,
    ...{
      className: "xw2csxc x193iq5w xmkeg23 x1y0btm7 x1nx5sn x1l0h3lx xlw8kj3 x14e6ola x1sl05ne xj3ae5l"
    },
    children: /* @__PURE__ */ _jsxs9("table", {
      "aria-busy": loading || void 0,
      ...{
        className: "xh8yej3 x1mwwwfo x1m2o4zq xif65rj x1dbl2gt xdpxx8g xss6m8b"
      },
      children: [/* @__PURE__ */ _jsx9("caption", {
        ...{
          className: "xdpxx8g x1tamke2 x19s9jnd x1j61zf2"
        },
        children: caption
      }), /* @__PURE__ */ _jsx9("thead", {
        children: /* @__PURE__ */ _jsx9("tr", {
          children: columns.map((column) => /* @__PURE__ */ _jsx9("th", {
            scope: "col",
            "aria-sort": column.sortValue ? sort?.key === column.key ? sort.direction === "asc" ? "ascending" : "descending" : "none" : void 0,
            ...{
              className: "x16pp3ps x19s9jnd xs0fqhl xso031l x1q0q8m5 x1463i8p"
            },
            children: column.sortValue ? /* @__PURE__ */ _jsxs9("button", {
              type: "button",
              "aria-label": `Sort by ${column.header}, ${sort?.key === column.key && sort.direction === "asc" ? "descending" : "ascending"}`,
              onClick: () => changeSort(column.key),
              ...{
                className: "x3nfvp2 x6s0dn4 x167g77z xu0aao5 xztvwtv xc342km xjbqb8w x1heor9g xjb2p0i x1qlqyl8 x1pd3egz x1ypdohk xdpxx8g"
              },
              children: [column.header, /* @__PURE__ */ _jsx9("svg", {
                "aria-hidden": "true",
                width: "14",
                height: "14",
                viewBox: "0 0 24 24",
                fill: "none",
                stroke: "currentColor",
                strokeWidth: "1.8",
                children: /* @__PURE__ */ _jsx9("path", {
                  d: sort?.key === column.key ? sort.direction === "asc" ? "m5 15 7-7 7 7" : "m5 9 7 7 7-7" : "m8 9 4-4 4 4M8 15l4 4 4-4"
                })
              })]
            }) : column.header
          }, column.key))
        })
      }), /* @__PURE__ */ _jsx9("tbody", {
        children: loading || !displayed.length ? /* @__PURE__ */ _jsx9("tr", {
          children: /* @__PURE__ */ _jsx9("td", {
            colSpan: Math.max(columns.length, 1),
            ...{
              className: "x2b8uid x15fnm84 x1x2jehb"
            },
            children: loading ? "Loading results\u2026" : emptyMessage
          })
        }) : displayed.map((row, rowIndex) => /* @__PURE__ */ _jsx9("tr", {
          ...{
            className: "x5p5y0"
          },
          children: columns.map((column) => /* @__PURE__ */ _jsx9("td", {
            ...{
              0: {
                className: "x1j671cp xso031l x1q0q8m5 x1p15aix xj0a0fe"
              },
              1: {
                className: "x1j671cp x1q0q8m5 x1p15aix xj0a0fe x1qhh985"
              }
            }[!!(rowIndex === displayed.length - 1) << 0],
            children: column.cell(row)
          }, column.key))
        }, rowKey(row)))
      })]
    })
  });
}

// ../../../../AppData/Local/Packages/sandbox.{bdd27477-b7de-48cd-86f6-d2c824e3aa41}/AC/Temp/serein-stylex-tUU8Qa/command-palette.js
import { useCallback as useCallback3, useMemo as useMemo2, useRef as useRef3, useState as useState4 } from "react";
import * as stylex9 from "@stylexjs/stylex";
import { Combobox as BaseCombobox2 } from "@base-ui/react/combobox";
import { Dialog as BaseDialog3 } from "@base-ui/react/dialog";
import { jsx as _jsx10, jsxs as _jsxs10 } from "react/jsx-runtime";
function matchesCommand(item, query) {
  const needle = query.trim().toLocaleLowerCase();
  if (!needle) return true;
  return [item.label, item.description, ...item.keywords ?? []].some((value) => value?.toLocaleLowerCase().includes(needle));
}
function CommandPalette({
  triggerLabel = "Search commands",
  title = "Commands",
  description,
  items,
  open,
  defaultOpen = false,
  onOpenChange,
  placeholder = "Search commands",
  emptyMessage = "No commands found.",
  disabled = false
}) {
  const [uncontrolledOpen, setUncontrolledOpen] = useState4(defaultOpen);
  const dialogActionsRef = useRef3(null);
  const searchRef = useRef3(null);
  const isControlled = open !== void 0;
  const paletteOpen = open ?? uncontrolledOpen;
  const commandItems = useMemo2(() => BaseCombobox2.createItems(items, {
    getValue: (item) => item.id,
    getLabel: (item) => item.label
  }), [items]);
  const requestOpenChange = useCallback3((next) => {
    if (!isControlled) setUncontrolledOpen(next);
    onOpenChange?.(next);
  }, [isControlled, onOpenChange]);
  const selectCommand = useCallback3((id) => {
    if (id === null) return;
    const item = items.find((command) => command.id === id);
    if (!item || item.disabled) return;
    item.onSelect();
    dialogActionsRef.current?.close();
  }, [items]);
  return /* @__PURE__ */ _jsx10(BaseCombobox2.Root, {
    inline: true,
    open: paletteOpen,
    onOpenChange: (next) => requestOpenChange(next),
    items: commandItems,
    filter: matchesCommand,
    autoHighlight: true,
    onValueChange: selectCommand,
    children: /* @__PURE__ */ _jsxs10(BaseDialog3.Root, {
      open: paletteOpen,
      onOpenChange: (next) => requestOpenChange(next),
      actionsRef: dialogActionsRef,
      children: [/* @__PURE__ */ _jsx10(BaseDialog3.Trigger, {
        type: "button",
        disabled,
        ...{
          0: {
            className: "x1wxaq2x x1a5nu0n x1yq7fdl x1m2o4zq x178xt8z xs1s249 xso031l xe0pwq x1y0btm7 x1t4gzue xtdikab xjb2p0i xif65rj x19s9jnd x1ypdohk"
          },
          1: {
            className: "x1wxaq2x x1a5nu0n x1yq7fdl x1m2o4zq x178xt8z xs1s249 xso031l xe0pwq x1y0btm7 x1t4gzue xtdikab xjb2p0i xif65rj x19s9jnd xbyyjgo x1h6gzvc"
          }
        }[!!disabled << 0],
        children: triggerLabel
      }), /* @__PURE__ */ _jsxs10(BaseDialog3.Portal, {
        children: [/* @__PURE__ */ _jsx10(BaseDialog3.Backdrop, {
          ...{
            className: "xixxii4 x10a8y8t x1u92v9d x6y048q"
          }
        }), /* @__PURE__ */ _jsxs10(BaseDialog3.Popup, {
          initialFocus: searchRef,
          ...{
            className: "xixxii4 xwa60dl x1nrll8i x11lhmoz xcs98ov xs8sm83 x1odjw0f xggk2y7 xlw8kj3 x1m2o4zq x178xt8z xs1s249 xso031l xe0pwq x1y0btm7 x1nx5sn x9vza20 xtea94d xpd2g0m"
          },
          children: [/* @__PURE__ */ _jsxs10("div", {
            ...{
              className: "x78zum5 x1cy8zhl x1qughib xou54vl xieb3on"
            },
            children: [/* @__PURE__ */ _jsxs10("div", {
              children: [/* @__PURE__ */ _jsx10(BaseDialog3.Title, {
                ...{
                  className: "x1ghz6dp x1m2o4zq x1pvqxga x19s9jnd xwn7fz2 x1b4dsll xj0a0fe"
                },
                children: title
              }), description && /* @__PURE__ */ _jsx10(BaseDialog3.Description, {
                ...{
                  className: "xe6w4ck x1x2jehb xif65rj x1dbl2gt xj0a0fe"
                },
                children: description
              })]
            }), /* @__PURE__ */ _jsx10(BaseDialog3.Close, {
              type: "button",
              "aria-label": `Close ${title}`,
              ...{
                className: "x1useyqa x900493 x1wxaq2x xe8ttls xwz0xwf x1ku5rj1 xjbqb8w x1m2o4zq x178xt8z xs1s249 xso031l xe0pwq x1y0btm7 x1t4gzue xtdikab x1ypdohk"
              },
              children: /* @__PURE__ */ _jsx10("svg", {
                "aria-hidden": "true",
                width: "20",
                height: "20",
                viewBox: "0 0 24 24",
                fill: "none",
                stroke: "currentColor",
                strokeWidth: "2",
                children: /* @__PURE__ */ _jsx10("path", {
                  d: "M6 6l12 12M18 6 6 18"
                })
              })
            })]
          }), /* @__PURE__ */ _jsx10(BaseCombobox2.Input, {
            ref: searchRef,
            "aria-label": "Search commands",
            placeholder,
            ...{
              className: "xh8yej3 x1wxaq2x xi0fwqg x1yq7fdl x1m2o4zq x178xt8z xs1s249 xso031l xe0pwq x1y0btm7 x1t4gzue xtdikab xjb2p0i x1j61zf2 x1evy7pa"
            }
          }), /* @__PURE__ */ _jsx10(BaseCombobox2.List, {
            "aria-label": "Command results",
            ...{
              className: "x78zum5 xdt5ytf x1jnr06f x14vqqas x1vwr5sa x1odjw0f x1a2a7pz"
            },
            children: (item) => /* @__PURE__ */ _jsxs10(BaseCombobox2.Item, {
              value: item.id,
              disabled: item.disabled,
              className: (state) => ({
                0: {
                  className: "x1wxaq2x x6yrr3s x78zum5 xdt5ytf xl56j7k x195vfkc x1o2kpkg x1m2o4zq x1ypdohk x1a2a7pz"
                },
                2: {
                  className: "x1wxaq2x x6yrr3s x78zum5 xdt5ytf xl56j7k x195vfkc x1o2kpkg x1m2o4zq x1ypdohk x1a2a7pz x1m7fmmm"
                },
                1: {
                  className: "x1wxaq2x x6yrr3s x78zum5 xdt5ytf xl56j7k x195vfkc x1o2kpkg x1a2a7pz x1x2jehb x1h6gzvc xwq05k6"
                },
                3: {
                  className: "x1wxaq2x x6yrr3s x78zum5 xdt5ytf xl56j7k x195vfkc x1o2kpkg x1a2a7pz x1m7fmmm x1x2jehb x1h6gzvc xwq05k6"
                }
              })[!!state.highlighted << 1 | !!state.disabled << 0].className,
              children: [/* @__PURE__ */ _jsx10("span", {
                ...{
                  className: "xif65rj x19s9jnd x37zpob xj0a0fe"
                },
                children: item.label
              }), item.description && /* @__PURE__ */ _jsx10("span", {
                ...{
                  className: "x1x2jehb x4z9k3i xfrs9s4 xj0a0fe"
                },
                children: item.description
              })]
            }, item.id)
          }), /* @__PURE__ */ _jsx10(BaseCombobox2.Empty, {
            ...{
              className: "x1enw65i x1x2jehb xif65rj x1evy7pa"
            },
            children: emptyMessage
          })]
        })]
      })]
    })
  });
}

// ../../../../AppData/Local/Packages/sandbox.{bdd27477-b7de-48cd-86f6-d2c824e3aa41}/AC/Temp/serein-stylex-tUU8Qa/multi-select.js
import { useId as useId5, useMemo as useMemo3 } from "react";
import * as stylex10 from "@stylexjs/stylex";
import { Combobox as BaseCombobox3 } from "@base-ui/react/combobox";
import { jsx as _jsx11, jsxs as _jsxs11 } from "react/jsx-runtime";
function describedBy2(descriptionId, errorId) {
  return [descriptionId, errorId].filter(Boolean).join(" ") || void 0;
}
function MultiSelect({
  label,
  value,
  onValueChange,
  options,
  description,
  error,
  disabled,
  name,
  id: suppliedId,
  placeholder = "Search options",
  emptyMessage = "No matching options."
}) {
  const generatedId = useId5();
  const id = suppliedId || generatedId;
  const descriptionId = description ? `${id}-description` : void 0;
  const errorId = error ? `${id}-error` : void 0;
  const items = useMemo3(() => BaseCombobox3.createItems(options, {
    getValue: (option) => option.value,
    getLabel: (option) => option.label
  }), [options]);
  const labels = useMemo3(() => new Map(options.map((option) => [option.value, option.label])), [options]);
  return /* @__PURE__ */ _jsxs11("div", {
    ...{
      className: "x78zum5 xdt5ytf x167g77z xeuugli"
    },
    children: [/* @__PURE__ */ _jsx11("label", {
      htmlFor: id,
      ...{
        className: "xif65rj x1s688f x1m2o4zq"
      },
      children: label
    }), /* @__PURE__ */ _jsxs11(BaseCombobox3.Root, {
      id,
      name,
      value,
      multiple: true,
      disabled,
      modal: false,
      items,
      onValueChange: (next) => onValueChange([...next]),
      children: [/* @__PURE__ */ _jsx11(BaseCombobox3.InputGroup, {
        ...{
          0: {
            className: "xh8yej3 x1wxaq2x x78zum5 x1a02dak x6s0dn4 x17d4w8g xfawy5m x1yq7fdl x1m2o4zq xmkeg23 x1y0btm7 x1t4gzue xtdikab"
          },
          2: {
            className: "xh8yej3 x1wxaq2x x78zum5 x1a02dak x6s0dn4 x17d4w8g xfawy5m x1yq7fdl x1m2o4zq xmkeg23 x1y0btm7 xtdikab xv53aiy"
          },
          1: {
            className: "xh8yej3 x1wxaq2x x78zum5 x1a02dak x6s0dn4 x17d4w8g xfawy5m x1yq7fdl x1m2o4zq xmkeg23 x1y0btm7 x1t4gzue xtdikab xbyyjgo x1h6gzvc"
          },
          3: {
            className: "xh8yej3 x1wxaq2x x78zum5 x1a02dak x6s0dn4 x17d4w8g xfawy5m x1yq7fdl x1m2o4zq xmkeg23 x1y0btm7 xtdikab xv53aiy xbyyjgo x1h6gzvc"
          }
        }[!!!!error << 1 | !!disabled << 0],
        children: /* @__PURE__ */ _jsx11(BaseCombobox3.Value, {
          children: (selected) => /* @__PURE__ */ _jsxs11(BaseCombobox3.Chips, {
            "aria-label": selected.length ? `Selected ${label}` : void 0,
            ...{
              className: "xh8yej3 x78zum5 x1a02dak x6s0dn4 x17d4w8g xeuugli"
            },
            children: [selected.map((item) => /* @__PURE__ */ _jsxs11(BaseCombobox3.Chip, {
              "aria-label": labels.get(item) ?? item,
              "aria-description": "Press Backspace or Delete to remove",
              ...{
                className: "x1gg8mnh x193iq5w x78zum5 x6s0dn4 x1jnr06f x1lqa7cf x1m7fmmm x1m2o4zq xmkeg23 x1y0btm7 x1nx5sn x1o2kpkg xif65rj xb3r6kr"
              },
              children: [/* @__PURE__ */ _jsx11("span", {
                ...{
                  className: "xb3r6kr xlyipyv xuxw1ft"
                },
                children: labels.get(item) ?? item
              }), /* @__PURE__ */ _jsx11(BaseCombobox3.ChipRemove, {
                type: "button",
                disabled,
                "aria-label": `Remove ${labels.get(item) ?? item}`,
                ...{
                  0: {
                    className: "x187nhsf x1nb6za0 x1gg8mnh x1717udv xrvj5dj x1ku5rj1 x2lah0s xjbqb8w x1heor9g xc342km xjb2p0i x1ypdohk x1sl05ne xhfxdjs"
                  },
                  1: {
                    className: "x187nhsf x1nb6za0 x1gg8mnh x1717udv xrvj5dj x1ku5rj1 x2lah0s xjbqb8w x1heor9g xc342km xjb2p0i x1sl05ne xhfxdjs xbyyjgo x1h6gzvc"
                  }
                }[!!disabled << 0],
                children: /* @__PURE__ */ _jsx11("svg", {
                  "aria-hidden": "true",
                  width: "16",
                  height: "16",
                  viewBox: "0 0 24 24",
                  fill: "none",
                  stroke: "currentColor",
                  strokeWidth: "2",
                  children: /* @__PURE__ */ _jsx11("path", {
                    d: "m6 6 12 12M18 6 6 18"
                  })
                })
              })]
            }, item)), /* @__PURE__ */ _jsx11(BaseCombobox3.Input, {
              "aria-label": label,
              "aria-description": selected.length ? `${selected.length} selected. Use Left Arrow to reach selected items.` : void 0,
              placeholder,
              disabled,
              "aria-invalid": error ? true : void 0,
              "aria-describedby": describedBy2(descriptionId, errorId),
              "aria-errormessage": errorId,
              ...{
                className: "xeuugli x193iq5w x1iyjqo2 xxm9e6e x1ba4aug x18tqr4w xjbqb8w x1m2o4zq xc342km xjb2p0i x1j61zf2 x1evy7pa x1a2a7pz"
              }
            })]
          })
        })
      }), /* @__PURE__ */ _jsx11(BaseCombobox3.Portal, {
        children: /* @__PURE__ */ _jsx11(BaseCombobox3.Positioner, {
          sideOffset: 6,
          ...{
            className: "x13tdkmf"
          },
          children: /* @__PURE__ */ _jsxs11(BaseCombobox3.Popup, {
            ...{
              className: "x80t9vs x7k7lee x1h9acoj x1odjw0f x1ruevkc xlw8kj3 x1m2o4zq xmkeg23 x1y0btm7 x1nx5sn x16c8i04 xy15sr9 x13tdkmf"
            },
            children: [/* @__PURE__ */ _jsx11(BaseCombobox3.List, {
              "aria-label": label,
              children: (option) => /* @__PURE__ */ _jsxs11(BaseCombobox3.Item, {
                value: option.value,
                disabled: option.disabled,
                className: (state) => ({
                  0: {
                    className: "x1gg8mnh x6yrr3s x78zum5 x6s0dn4 x167g77z x1o2kpkg xif65rj xt0e3qv x1a2a7pz xj0a0fe"
                  },
                  4: {
                    className: "x1gg8mnh x6yrr3s x78zum5 x6s0dn4 x167g77z x1o2kpkg xif65rj xt0e3qv x1a2a7pz xj0a0fe x1m7fmmm"
                  },
                  2: {
                    className: "x1gg8mnh x6yrr3s x78zum5 x6s0dn4 x167g77z x1o2kpkg xif65rj xt0e3qv x1a2a7pz xj0a0fe x19s9jnd"
                  },
                  6: {
                    className: "x1gg8mnh x6yrr3s x78zum5 x6s0dn4 x167g77z x1o2kpkg xif65rj xt0e3qv x1a2a7pz xj0a0fe x1m7fmmm x19s9jnd"
                  },
                  1: {
                    className: "x1gg8mnh x6yrr3s x78zum5 x6s0dn4 x167g77z x1o2kpkg xif65rj x1a2a7pz xj0a0fe xbyyjgo x1h6gzvc"
                  },
                  5: {
                    className: "x1gg8mnh x6yrr3s x78zum5 x6s0dn4 x167g77z x1o2kpkg xif65rj x1a2a7pz xj0a0fe x1m7fmmm xbyyjgo x1h6gzvc"
                  },
                  3: {
                    className: "x1gg8mnh x6yrr3s x78zum5 x6s0dn4 x167g77z x1o2kpkg xif65rj x1a2a7pz xj0a0fe x19s9jnd xbyyjgo x1h6gzvc"
                  },
                  7: {
                    className: "x1gg8mnh x6yrr3s x78zum5 x6s0dn4 x167g77z x1o2kpkg xif65rj x1a2a7pz xj0a0fe x1m7fmmm x19s9jnd xbyyjgo x1h6gzvc"
                  }
                })[!!state.highlighted << 2 | !!state.selected << 1 | !!state.disabled << 0].className,
                children: [option.label, /* @__PURE__ */ _jsx11(BaseCombobox3.ItemIndicator, {
                  children: /* @__PURE__ */ _jsx11("svg", {
                    "aria-hidden": "true",
                    width: "16",
                    height: "16",
                    viewBox: "0 0 24 24",
                    fill: "none",
                    stroke: "currentColor",
                    strokeWidth: "2.5",
                    ...{
                      className: "x8x9d4c x2lah0s xhh0039"
                    },
                    children: /* @__PURE__ */ _jsx11("path", {
                      d: "m5 12 4 4L19 6"
                    })
                  })
                })]
              }, option.value)
            }), /* @__PURE__ */ _jsx11(BaseCombobox3.Empty, {
              ...{
                className: "xc7ga6q xif65rj x1x2jehb"
              },
              children: emptyMessage
            })]
          })
        })
      })]
    }), description && /* @__PURE__ */ _jsx11("p", {
      id: descriptionId,
      ...{
        className: "x1ghz6dp x4z9k3i x1dbl2gt x1x2jehb"
      },
      children: description
    }), error && /* @__PURE__ */ _jsx11("p", {
      id: errorId,
      role: "alert",
      ...{
        className: "x1ghz6dp x4z9k3i x1dbl2gt x1yalgfx"
      },
      children: error
    })]
  });
}

// ../../../../AppData/Local/Packages/sandbox.{bdd27477-b7de-48cd-86f6-d2c824e3aa41}/AC/Temp/serein-stylex-tUU8Qa/calendar.js
import { DayPicker, TZDate } from "@daypicker/react";
import * as stylex11 from "@stylexjs/stylex";
import { jsx as _jsx12, jsxs as _jsxs12 } from "react/jsx-runtime";
function parseISODate(value) {
  if (value === null || value === void 0) return void 0;
  if (!/^\d{4}-\d{2}-\d{2}$/.test(value)) throw new RangeError(`Invalid ISO date: ${value}`);
  const [year, month2, day] = value.split("-").map(Number);
  if (year < 1) throw new RangeError(`Invalid ISO date: ${value}`);
  const date = new TZDate(year, month2 - 1, day, "UTC");
  if (year < 100) date.setUTCFullYear(year);
  if (date.getUTCFullYear() !== year || date.getUTCMonth() !== month2 - 1 || date.getUTCDate() !== day) throw new RangeError(`Invalid ISO date: ${value}`);
  return date;
}
function formatISODate(date) {
  if (!date) return null;
  return `${date.getUTCFullYear().toString().padStart(4, "0")}-${(date.getUTCMonth() + 1).toString().padStart(2, "0")}-${date.getUTCDate().toString().padStart(2, "0")}`;
}
function bounds(props4) {
  const min = parseISODate(props4.min);
  const max = parseISODate(props4.max);
  if (min && max && min > max) throw new RangeError("min must not be later than max");
  return [...min ? [{
    before: min
  }] : [], ...max ? [{
    after: max
  }] : [], ...(props4.disabledDates ?? []).map(parseISODate).filter((date) => !!date)];
}
function month(props4) {
  return parseISODate(props4.value) ?? parseISODate(props4.defaultMonth) ?? parseISODate(props4.today) ?? new TZDate((/* @__PURE__ */ new Date()).getUTCFullYear(), (/* @__PURE__ */ new Date()).getUTCMonth(), 1, "UTC");
}
function validateRange(value) {
  const from = parseISODate(value.from);
  const to = parseISODate(value.to);
  if (to && !from) throw new RangeError("A range end requires a range start");
  if (from && to && from > to) throw new RangeError("A range end must not be before its start");
  return {
    from,
    to
  };
}
function Calendar({
  label,
  value,
  onValueChange,
  defaultMonth,
  min,
  max,
  disabledDates,
  disabled,
  today,
  autoFocus = false
}) {
  const selected = parseISODate(value);
  return /* @__PURE__ */ _jsxs12("div", {
    ...{
      className: "x78zum5 xdt5ytf x167g77z xeuugli"
    },
    children: [/* @__PURE__ */ _jsx12("span", {
      ...{
        className: "xif65rj x1s688f x1m2o4zq"
      },
      children: label
    }), /* @__PURE__ */ _jsx12(DayPicker, {
      mode: "single",
      selected,
      onSelect: (day) => onValueChange(formatISODate(day)),
      defaultMonth: month({
        value,
        defaultMonth,
        today
      }),
      startMonth: parseISODate(min),
      endMonth: parseISODate(max),
      disabled: disabled || bounds({
        min,
        max,
        disabledDates
      }),
      today: parseISODate(today),
      timeZone: "UTC",
      autoFocus,
      "aria-label": label,
      className: "dp-calendar"
    })]
  });
}
function CalendarRange({
  label,
  value,
  onValueChange,
  defaultMonth,
  min,
  max,
  disabledDates,
  disabled,
  today,
  autoFocus = false
}) {
  const validated = validateRange(value);
  const selected = validated.from ? {
    from: validated.from,
    to: validated.to
  } : void 0;
  return /* @__PURE__ */ _jsxs12("div", {
    ...{
      className: "x78zum5 xdt5ytf x167g77z xeuugli"
    },
    children: [/* @__PURE__ */ _jsx12("span", {
      ...{
        className: "xif65rj x1s688f x1m2o4zq"
      },
      children: label
    }), /* @__PURE__ */ _jsx12(DayPicker, {
      mode: "range",
      selected,
      onSelect: (range, triggerDate) => {
        const from = formatISODate(range?.from);
        const to = formatISODate(range?.to);
        if (!value.from || value.to) onValueChange({
          from: formatISODate(triggerDate),
          to: null
        });
        else onValueChange({
          from,
          to
        });
      },
      excludeDisabled: true,
      defaultMonth: validated.from ?? parseISODate(defaultMonth) ?? parseISODate(today) ?? new TZDate((/* @__PURE__ */ new Date()).getUTCFullYear(), (/* @__PURE__ */ new Date()).getUTCMonth(), 1, "UTC"),
      startMonth: parseISODate(min),
      endMonth: parseISODate(max),
      disabled: disabled || bounds({
        min,
        max,
        disabledDates
      }),
      today: parseISODate(today),
      timeZone: "UTC",
      autoFocus,
      "aria-label": label,
      className: "dp-calendar"
    })]
  });
}

// ../../../../AppData/Local/Packages/sandbox.{bdd27477-b7de-48cd-86f6-d2c824e3aa41}/AC/Temp/serein-stylex-tUU8Qa/date-pickers.js
import { useId as useId6, useRef as useRef4, useState as useState5 } from "react";
import * as stylex12 from "@stylexjs/stylex";
import { Popover as BasePopover2 } from "@base-ui/react/popover";
import { jsx as _jsx13, jsxs as _jsxs13 } from "react/jsx-runtime";
function display(value, placeholder) {
  return value === null ? placeholder : new Intl.DateTimeFormat("en-GB", {
    day: "numeric",
    month: "short",
    year: "numeric",
    timeZone: "UTC"
  }).format(parseISODate(value));
}
function rangeDisplay(value, placeholder) {
  parseISODate(value.from);
  parseISODate(value.to);
  if (!value.from) return placeholder;
  const from = display(value.from, placeholder);
  if (!value.to) return `${from} \u2014 choose an end date`;
  const to = display(value.to, placeholder);
  return value.from.slice(0, 7) === value.to.slice(0, 7) ? `${Number(value.from.slice(8))}\u2013${to}` : `${from} \u2013 ${to}`;
}
function useOpen(open, defaultOpen, onOpenChange) {
  const [internal, setInternal] = useState5(defaultOpen ?? false);
  const value = open ?? internal;
  return [value, (next) => {
    if (open === void 0) setInternal(next);
    onOpenChange?.(next);
  }];
}
function DatePicker({
  label,
  value,
  onValueChange,
  description,
  error,
  name,
  placeholder = "Choose a date",
  open,
  defaultOpen,
  onOpenChange,
  id: suppliedId,
  disabled,
  ...calendar
}) {
  const generatedId = useId6();
  const id = suppliedId ?? generatedId;
  const popupRef = useRef4(null);
  const [isOpen, setOpen] = useOpen(open, defaultOpen, onOpenChange);
  const descriptionId = description ? `${id}-description` : void 0;
  const errorId = error ? `${id}-error` : void 0;
  const describedBy3 = [descriptionId, errorId].filter(Boolean).join(" ") || void 0;
  const dateText = display(value, placeholder);
  return /* @__PURE__ */ _jsxs13("div", {
    ...{
      className: "x78zum5 xdt5ytf x167g77z xeuugli"
    },
    children: [/* @__PURE__ */ _jsx13("label", {
      id: `${id}-label`,
      htmlFor: id,
      ...{
        className: "xif65rj x1s688f x1m2o4zq"
      },
      children: label
    }), /* @__PURE__ */ _jsxs13(BasePopover2.Root, {
      open: isOpen,
      onOpenChange: setOpen,
      children: [/* @__PURE__ */ _jsxs13(BasePopover2.Trigger, {
        render: /* @__PURE__ */ _jsx13("button", {
          id,
          type: "button",
          disabled,
          ...{
            0: {
              className: "xh8yej3 x1wxaq2x xi0fwqg x78zum5 x6s0dn4 x1qughib x167g77z x1yq7fdl x1m2o4zq xmkeg23 x1y0btm7 x1t4gzue xtdikab xjb2p0i x1j61zf2 xdpxx8g x1ypdohk"
            },
            2: {
              className: "xh8yej3 x1wxaq2x xi0fwqg x78zum5 x6s0dn4 x1qughib x167g77z x1yq7fdl x1m2o4zq xmkeg23 x1y0btm7 xtdikab xjb2p0i x1j61zf2 xdpxx8g x1ypdohk xv53aiy"
            },
            1: {
              className: "xh8yej3 x1wxaq2x xi0fwqg x78zum5 x6s0dn4 x1qughib x167g77z x1yq7fdl x1m2o4zq xmkeg23 x1y0btm7 x1t4gzue xtdikab xjb2p0i x1j61zf2 xdpxx8g xbyyjgo x1h6gzvc"
            },
            3: {
              className: "xh8yej3 x1wxaq2x xi0fwqg x78zum5 x6s0dn4 x1qughib x167g77z x1yq7fdl x1m2o4zq xmkeg23 x1y0btm7 xtdikab xjb2p0i x1j61zf2 xdpxx8g xv53aiy xbyyjgo x1h6gzvc"
            }
          }[!!!!error << 1 | !!disabled << 0],
          "aria-labelledby": `${id}-label ${id}-value`,
          "aria-invalid": error ? true : void 0,
          "aria-describedby": describedBy3,
          "aria-errormessage": errorId
        }),
        children: [/* @__PURE__ */ _jsx13("span", {
          id: `${id}-value`,
          children: dateText
        }), /* @__PURE__ */ _jsx13(CalendarIcon, {})]
      }), /* @__PURE__ */ _jsx13(BasePopover2.Portal, {
        children: /* @__PURE__ */ _jsx13(BasePopover2.Positioner, {
          sideOffset: 6,
          align: "start",
          ...{
            className: "x13tdkmf"
          },
          children: /* @__PURE__ */ _jsxs13(BasePopover2.Popup, {
            ref: popupRef,
            initialFocus: () => popupRef.current?.querySelector('.rdp-day_button[tabindex="0"]') ?? true,
            role: "dialog",
            "aria-label": `${label} calendar`,
            ...{
              className: "x1374xjt x1odjw0f xm3hej9 x1tamke2 xlw8kj3 x1m2o4zq xmkeg23 x1y0btm7 x1nx5sn x16c8i04 xy15sr9 x13tdkmf"
            },
            children: [/* @__PURE__ */ _jsx13(Calendar, {
              ...calendar,
              label,
              value,
              disabled,
              onValueChange: (next) => {
                onValueChange(next);
                setOpen(false);
              }
            }), /* @__PURE__ */ _jsx13("button", {
              type: "button",
              disabled: disabled || !value,
              onClick: () => onValueChange(null),
              ...{
                0: {
                  className: "x14vqqas x1gg8mnh x153ncpu xjbqb8w x1m2o4zq xmkeg23 x1y0btm7 x1t4gzue xtdikab xjb2p0i x1ypdohk"
                },
                1: {
                  className: "x14vqqas x1gg8mnh x153ncpu xjbqb8w x1m2o4zq xmkeg23 x1y0btm7 x1t4gzue xtdikab xjb2p0i xbyyjgo x1h6gzvc"
                }
              }[!!disabled << 0],
              children: "Clear date"
            })]
          })
        })
      })]
    }), name && value && /* @__PURE__ */ _jsx13("input", {
      type: "hidden",
      name,
      value,
      disabled
    }), description && /* @__PURE__ */ _jsx13("p", {
      id: descriptionId,
      ...{
        className: "x1ghz6dp x4z9k3i x1dbl2gt x1x2jehb"
      },
      children: description
    }), error && /* @__PURE__ */ _jsx13("p", {
      id: errorId,
      role: "alert",
      ...{
        className: "x1ghz6dp x4z9k3i x1dbl2gt x1yalgfx"
      },
      children: error
    })]
  });
}
function DateRangePicker({
  label,
  value,
  onValueChange,
  description,
  error,
  startName,
  endName,
  placeholder = "Choose dates",
  open,
  defaultOpen,
  onOpenChange,
  id: suppliedId,
  disabled,
  ...calendar
}) {
  const generatedId = useId6();
  const id = suppliedId ?? generatedId;
  const popupRef = useRef4(null);
  const [isOpen, setOpen] = useOpen(open, defaultOpen, onOpenChange);
  const descriptionId = description ? `${id}-description` : void 0;
  const errorId = error ? `${id}-error` : void 0;
  const describedBy3 = [descriptionId, errorId].filter(Boolean).join(" ") || void 0;
  if (value.to && (!value.from || value.to < value.from)) throw new RangeError("A range end must follow its start");
  const dateText = rangeDisplay(value, placeholder);
  return /* @__PURE__ */ _jsxs13("div", {
    ...{
      className: "x78zum5 xdt5ytf x167g77z xeuugli"
    },
    children: [/* @__PURE__ */ _jsx13("label", {
      id: `${id}-label`,
      htmlFor: id,
      ...{
        className: "xif65rj x1s688f x1m2o4zq"
      },
      children: label
    }), /* @__PURE__ */ _jsxs13(BasePopover2.Root, {
      open: isOpen,
      onOpenChange: setOpen,
      children: [/* @__PURE__ */ _jsxs13(BasePopover2.Trigger, {
        render: /* @__PURE__ */ _jsx13("button", {
          id,
          type: "button",
          disabled,
          ...{
            0: {
              className: "xh8yej3 x1wxaq2x xi0fwqg x78zum5 x6s0dn4 x1qughib x167g77z x1yq7fdl x1m2o4zq xmkeg23 x1y0btm7 x1t4gzue xtdikab xjb2p0i x1j61zf2 xdpxx8g x1ypdohk"
            },
            2: {
              className: "xh8yej3 x1wxaq2x xi0fwqg x78zum5 x6s0dn4 x1qughib x167g77z x1yq7fdl x1m2o4zq xmkeg23 x1y0btm7 xtdikab xjb2p0i x1j61zf2 xdpxx8g x1ypdohk xv53aiy"
            },
            1: {
              className: "xh8yej3 x1wxaq2x xi0fwqg x78zum5 x6s0dn4 x1qughib x167g77z x1yq7fdl x1m2o4zq xmkeg23 x1y0btm7 x1t4gzue xtdikab xjb2p0i x1j61zf2 xdpxx8g xbyyjgo x1h6gzvc"
            },
            3: {
              className: "xh8yej3 x1wxaq2x xi0fwqg x78zum5 x6s0dn4 x1qughib x167g77z x1yq7fdl x1m2o4zq xmkeg23 x1y0btm7 xtdikab xjb2p0i x1j61zf2 xdpxx8g xv53aiy xbyyjgo x1h6gzvc"
            }
          }[!!!!error << 1 | !!disabled << 0],
          "aria-labelledby": `${id}-label ${id}-value`,
          "aria-invalid": error ? true : void 0,
          "aria-describedby": describedBy3,
          "aria-errormessage": errorId
        }),
        children: [/* @__PURE__ */ _jsx13("span", {
          id: `${id}-value`,
          children: dateText
        }), /* @__PURE__ */ _jsx13(CalendarIcon, {})]
      }), /* @__PURE__ */ _jsx13(BasePopover2.Portal, {
        children: /* @__PURE__ */ _jsx13(BasePopover2.Positioner, {
          sideOffset: 6,
          align: "start",
          ...{
            className: "x13tdkmf"
          },
          children: /* @__PURE__ */ _jsxs13(BasePopover2.Popup, {
            ref: popupRef,
            initialFocus: () => popupRef.current?.querySelector('.rdp-day_button[tabindex="0"]') ?? true,
            role: "dialog",
            "aria-label": `${label} calendar`,
            ...{
              className: "x1374xjt x1odjw0f xm3hej9 x1tamke2 xlw8kj3 x1m2o4zq xmkeg23 x1y0btm7 x1nx5sn x16c8i04 xy15sr9 x13tdkmf"
            },
            children: [/* @__PURE__ */ _jsx13(CalendarRange, {
              ...calendar,
              label,
              value,
              disabled,
              onValueChange: (next) => {
                onValueChange(next);
                if (next.from && next.to) setOpen(false);
              }
            }), /* @__PURE__ */ _jsx13("p", {
              role: "status",
              ...{
                className: "x1ghz6dp x4z9k3i x1dbl2gt x1x2jehb"
              },
              children: value.from && !value.to ? "Choose an end date to complete the range." : "Choose a start date, then an end date."
            }), /* @__PURE__ */ _jsx13("button", {
              type: "button",
              disabled: disabled || !value.from,
              onClick: () => onValueChange({
                from: null,
                to: null
              }),
              ...{
                0: {
                  className: "x14vqqas x1gg8mnh x153ncpu xjbqb8w x1m2o4zq xmkeg23 x1y0btm7 x1t4gzue xtdikab xjb2p0i x1ypdohk"
                },
                1: {
                  className: "x14vqqas x1gg8mnh x153ncpu xjbqb8w x1m2o4zq xmkeg23 x1y0btm7 x1t4gzue xtdikab xjb2p0i xbyyjgo x1h6gzvc"
                }
              }[!!disabled << 0],
              children: "Clear dates"
            })]
          })
        })
      })]
    }), startName && value.from && /* @__PURE__ */ _jsx13("input", {
      type: "hidden",
      name: startName,
      value: value.from,
      disabled
    }), endName && value.to && /* @__PURE__ */ _jsx13("input", {
      type: "hidden",
      name: endName,
      value: value.to,
      disabled
    }), description && /* @__PURE__ */ _jsx13("p", {
      id: descriptionId,
      ...{
        className: "x1ghz6dp x4z9k3i x1dbl2gt x1x2jehb"
      },
      children: description
    }), error && /* @__PURE__ */ _jsx13("p", {
      id: errorId,
      role: "alert",
      ...{
        className: "x1ghz6dp x4z9k3i x1dbl2gt x1yalgfx"
      },
      children: error
    })]
  });
}
function CalendarIcon() {
  return /* @__PURE__ */ _jsxs13("svg", {
    "aria-hidden": "true",
    width: "18",
    height: "18",
    style: {
      flexShrink: 0
    },
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: "1.8",
    children: [/* @__PURE__ */ _jsx13("rect", {
      x: "3",
      y: "5",
      width: "18",
      height: "16",
      rx: "2"
    }), /* @__PURE__ */ _jsx13("path", {
      d: "M16 3v4M8 3v4M3 11h18"
    })]
  });
}
export {
  Accordion,
  Alert,
  AlertDialog,
  Avatar,
  Badge,
  Breadcrumbs,
  Button,
  Calendar,
  Card,
  Checkbox,
  Combobox,
  CommandPalette,
  DataTable,
  DateField,
  DatePicker,
  DateRangePicker,
  Dialog,
  Drawer,
  DropdownMenu,
  EmptyState,
  FileUpload,
  IconButton,
  Link,
  MultiSelect,
  NumberField,
  Pagination,
  Popover,
  Progress,
  RadioGroup,
  Select,
  Separator,
  Skeleton,
  Slider,
  Spinner,
  StatusIcon,
  Switch,
  Tabs,
  TextField,
  Textarea,
  ToastProvider,
  ToggleGroup,
  Tooltip,
  useAsyncAction,
  useToast
};
