"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import type { ChangeEvent, FormEvent } from "react";

import { cn } from "@/lib/utils";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

/**
 * Contact form fields shown to the user.
 */
type FormField = "fullName" | "email" | "phone" | "company" | "message";

const fieldOrder: FormField[] = ["fullName", "email", "phone", "company", "message"];

/**
 * Practical length caps (also enforced via maxLength on inputs).
 * NOTE: Enforce these again on the server. Client-side checks are bypassable.
 */
const LIMITS = {
  fullName: 200,
  email: 254,
  phone: 40,
  company: 200,
  message: 5000,
} as const;

/**
 * Honeypot: hidden field that bots often fill.
 * Do NOT block client-side based on this (autofill can false-positive).
 * Instead: POST it to the server and drop/flag there.
 */
const HONEYPOT_FIELD_NAME = "companyWebsite";

/**
 * API endpoint on Cloudflare Pages (Astro API route).
 */
const CONTACT_API_ENDPOINT = "/api/contact";

/**
 * Turnstile defaults:
 * - If you pass a site key, the widget is shown and the token is required client-side.
 * - Server must ALWAYS verify the token (client-side is not security).
 */
const TURNSTILE_SCRIPT_SRC = "https://challenges.cloudflare.com/turnstile/v0/api.js";

/**
 * Reject ASCII control characters (common hardening).
 * IMPORTANT FIX: allow newlines/tabs for the message textarea so multiline messages work.
 */
const hasDisallowedControlChars = (
  value: string,
  opts?: { allowNewlines?: boolean; allowTabs?: boolean },
) => {
  for (let i = 0; i < value.length; i += 1) {
    const code = value.charCodeAt(i);

    // Always allow normal characters >= 32 (space) except DEL (127).
    if (code >= 32 && code !== 127) continue;

    // Conditionally allow \n (10) and \r (13) for multiline text.
    if (opts?.allowNewlines && (code === 10 || code === 13)) continue;

    // Optionally allow \t (9) if you want to permit tab indentation.
    if (opts?.allowTabs && code === 9) continue;

    // Everything else in the ASCII control range is disallowed.
    return true;
  }
  return false;
};

/**
 * Normalization: trim, collapse whitespace (for name/company), lowercase email domain (not local-part).
 * Keep this lightweight and predictable.
 */
const normalizeValue = (
  raw: string,
  options?: { collapseWhitespace?: boolean; lowerCaseDomain?: boolean },
) => {
  let next = String(raw ?? "").trim();

  if (options?.collapseWhitespace) {
    // Collapse all whitespace (spaces, tabs, newlines) into a single space.
    next = next.replace(/\s+/g, " ");
  }

  if (options?.lowerCaseDomain) {
    const atIndex = next.indexOf("@");
    if (atIndex > -1) {
      const local = next.slice(0, atIndex);
      const domain = next.slice(atIndex + 1);
      if (domain) next = `${local}@${domain.toLowerCase()}`;
    }
  }

  return next;
};

const normalizeField = (field: FormField, raw: string) => {
  if (field === "fullName" || field === "company") {
    return normalizeValue(raw, { collapseWhitespace: true });
  }
  if (field === "email") {
    return normalizeValue(raw, { lowerCaseDomain: true });
  }
  // phone/message: just trim
  return normalizeValue(raw);
};

/**
 * Basic email check (intentionally not full RFC).
 * - Avoid complex regexes that reject legitimate addresses.
 * - Keep it UX-friendly; enforce stricter checks server-side if needed.
 */
const isLikelyValidEmail = (email: string) => {
  if (email.length > LIMITS.email) return false;
  if (/\s/.test(email)) return false;

  const at = email.indexOf("@");
  if (at <= 0) return false;
  if (at !== email.lastIndexOf("@")) return false;

  const local = email.slice(0, at);
  const domain = email.slice(at + 1);

  // Common practical constraints (helpful, but still “light”):
  if (!local || !domain) return false;
  if (local.length > 64) return false;
  if (domain.length > 255) return false;

  // Require a dot in the domain for “work email” (reasonable UX default).
  // If you need to support internal domains, remove this line.
  if (!domain.includes(".")) return false;

  // No leading/trailing dots in domain labels (basic sanity).
  if (domain.startsWith(".") || domain.endsWith(".")) return false;

  return true;
};

/**
 * Phone: allow formatting + optional extension text.
 * Validation uses 7–15 digit count (E.164 max is 15 digits; we validate digits only).
 */
const stripPhoneExtension = (value: string) => {
  // Remove common extension suffixes: "x123", "ext 123", "ext.123"
  return value.replace(/(?:ext\.?|x)\s*\d+\s*$/i, "").trim();
};

const validate = (values: Record<FormField, string>) => {
  const errors: Record<FormField, string> = {
    fullName: "",
    email: "",
    phone: "",
    company: "",
    message: "",
  };

  // Full name
  const rawFullName = String(values.fullName ?? "");
  const fullName = normalizeField("fullName", rawFullName);
  if (!fullName) {
    errors.fullName = "Enter your name.";
  } else if (fullName.length > LIMITS.fullName) {
    errors.fullName = "Name is too long.";
  } else if (hasDisallowedControlChars(rawFullName)) {
    errors.fullName = "Remove invalid characters.";
  }

  // Email
  const rawEmail = String(values.email ?? "");
  const email = normalizeField("email", rawEmail);
  if (!email) {
    errors.email = "Enter your work email.";
  } else if (email.length > LIMITS.email) {
    errors.email = "Email is too long.";
  } else if (hasDisallowedControlChars(rawEmail)) {
    errors.email = "Remove invalid characters.";
  } else if (!isLikelyValidEmail(email)) {
    errors.email = "Enter a valid email.";
  }

  // Phone (optional)
  const rawPhone = String(values.phone ?? "");
  const phone = normalizeField("phone", rawPhone);
  if (phone.length > LIMITS.phone) {
    errors.phone = "Phone number is too long.";
  } else if (hasDisallowedControlChars(rawPhone)) {
    errors.phone = "Remove invalid characters.";
  } else if (phone) {
    const withoutExt = stripPhoneExtension(phone);
    const digitsOnly = withoutExt.replace(/\D/g, "");
    if (digitsOnly.length < 7 || digitsOnly.length > 15) {
      errors.phone = "Enter a valid phone number.";
    }
  }

  // Company
  const rawCompany = String(values.company ?? "");
  const company = normalizeField("company", rawCompany);
  if (!company) {
    errors.company = "Enter your company name.";
  } else if (company.length > LIMITS.company) {
    errors.company = "Company name is too long.";
  } else if (hasDisallowedControlChars(rawCompany)) {
    errors.company = "Remove invalid characters.";
  }

  // Message
  const rawMessage = String(values.message ?? "");
  const message = normalizeField("message", rawMessage);
  if (!message) {
    errors.message = "Tell us a bit about your request.";
  } else if (message.length > LIMITS.message) {
    errors.message = "Message is too long.";
  } else if (
    hasDisallowedControlChars(rawMessage, {
      allowNewlines: true,
      allowTabs: true,
    })
  ) {
    // ✅ Allows multiline messages while still blocking other control chars.
    errors.message = "Remove invalid characters.";
  }

  return errors;
};

type ContactFormValues = Record<FormField, string> & {
  /**
   * Honeypot field value. Hidden from humans, but submitted to the server.
   * Server should drop/flag if this is non-empty.
   */
  [HONEYPOT_FIELD_NAME]: string;
};

export type Contact10Props = {
  /**
   * Cloudflare Turnstile site key (public).
   * If provided, the widget will render and a token will be required before submit.
   */
  turnstileSiteKey?: string;
};

const getTurnstileTokenFromForm = (form: HTMLFormElement): string => {
  // Turnstile injects a hidden input named "cf-turnstile-response"
  const fd = new FormData(form);
  const token = fd.get("cf-turnstile-response");
  return typeof token === "string" ? token.trim() : "";
};

const Contact10 = ({ turnstileSiteKey }: Contact10Props) => {
  const [values, setValues] = useState<ContactFormValues>({
    fullName: "",
    email: "",
    phone: "",
    company: "",
    message: "",
    [HONEYPOT_FIELD_NAME]: "",
  });

  const [touched, setTouched] = useState<Record<FormField, boolean>>({
    fullName: false,
    email: false,
    phone: false,
    company: false,
    message: false,
  });

  const [submitAttempted, setSubmitAttempted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // UX status messages
  const [submitStatus, setSubmitStatus] = useState<"idle" | "success" | "error">("idle");
  const [submitMessage, setSubmitMessage] = useState<string>("");

  // Captures when the form was first rendered. Send this to the server as a spam-signal.
  const formStartedAtRef = useRef(Date.now());

  // Turnstile client-side requirement (server must still verify)
  const [turnstileError, setTurnstileError] = useState<string>("");

  const errors = useMemo(() => validate(values), [values]);

  const refs = {
    fullName: useRef<HTMLInputElement>(null),
    email: useRef<HTMLInputElement>(null),
    phone: useRef<HTMLInputElement>(null),
    company: useRef<HTMLInputElement>(null),
    message: useRef<HTMLTextAreaElement>(null),
  };

  // Load Turnstile script once if a site key is provided.
  useEffect(() => {
    if (!turnstileSiteKey) return;

    const existing = document.querySelector<HTMLScriptElement>(
      `script[src="${TURNSTILE_SCRIPT_SRC}"]`,
    );
    if (existing) return;

    const script = document.createElement("script");
    script.src = TURNSTILE_SCRIPT_SRC;
    script.async = true;
    script.defer = true;
    document.head.appendChild(script);
  }, [turnstileSiteKey]);

  const handleChange =
    (field: FormField | typeof HONEYPOT_FIELD_NAME) =>
    (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      const { value } = event.target;
      setValues((prev) => ({ ...prev, [field]: value }));

      // Clear banners when user edits
      if (submitStatus !== "idle") {
        setSubmitStatus("idle");
        setSubmitMessage("");
      }
      if (turnstileError) setTurnstileError("");
    };

  const handleBlur = (field: FormField) => () => {
    setTouched((prev) => ({ ...prev, [field]: true }));
    setValues((prev) => {
      const normalized = normalizeField(field, prev[field]);
      return normalized === prev[field] ? prev : { ...prev, [field]: normalized };
    });
  };

  const focusFirstError = (nextErrors: Record<FormField, string>) => {
    const firstError = fieldOrder.find((field) => nextErrors[field]);
    if (firstError) refs[firstError].current?.focus();
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    // NOTE: We keep browser-native validation ON (no `noValidate` on the <form>),
    // but we still prevent default and submit via fetch so we can show UI feedback.
    event.preventDefault();

    if (isSubmitting) return;

    setSubmitAttempted(true);
    setSubmitStatus("idle");
    setSubmitMessage("");
    setTurnstileError("");

    // Normalize all fields right before submit.
    const normalized: ContactFormValues = {
      ...values,
      fullName: normalizeField("fullName", values.fullName),
      email: normalizeField("email", values.email),
      phone: normalizeField("phone", values.phone),
      company: normalizeField("company", values.company),
      message: normalizeField("message", values.message),
      [HONEYPOT_FIELD_NAME]: String(values[HONEYPOT_FIELD_NAME] ?? ""),
    };
    setValues(normalized);

    const nextErrors = validate(normalized);
    const hasErrors = Object.values(nextErrors).some(Boolean);

    if (hasErrors) {
      focusFirstError(nextErrors);
      return;
    }

    // If Turnstile is enabled, require a token client-side (server will still verify).
    const formEl = event.currentTarget;
    const turnstileToken = turnstileSiteKey ? getTurnstileTokenFromForm(formEl) : "";
    if (turnstileSiteKey && !turnstileToken) {
      setTurnstileError("Please complete the verification.");
      return;
    }

    setIsSubmitting(true);

    try {
      const res = await fetch(CONTACT_API_ENDPOINT, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "same-origin",
        body: JSON.stringify({
          ...normalized,
          formStartedAt: formStartedAtRef.current,
          formId: "contact10",
          turnstileToken,
        }),
      });

      const data = await res.json().catch(() => ({}) as any);

      if (!res.ok || (data && data.ok === false)) {
        setSubmitStatus("error");
        setSubmitMessage(
          (data && (data.error as string)) ||
            "Sorry — we couldn’t submit your message. Please try again.",
        );
        return;
      }

      setSubmitStatus("success");
      setSubmitMessage("Thanks — your message has been sent. We’ll follow up shortly.");

      // Reset form after success
      setValues({
        fullName: "",
        email: "",
        phone: "",
        company: "",
        message: "",
        [HONEYPOT_FIELD_NAME]: "",
      });
      setTouched({
        fullName: false,
        email: false,
        phone: false,
        company: false,
        message: false,
      });
      setSubmitAttempted(false);
      formStartedAtRef.current = Date.now();

      // Best-effort Turnstile reset (optional)
      const ts = typeof window !== "undefined" ? (window as any).turnstile : null;
      if (ts?.reset) {
        try {
          ts.reset();
        } catch {
          // ignore
        }
      }
    } catch {
      setSubmitStatus("error");
      setSubmitMessage("Network error. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const showError = (field: FormField) =>
    Boolean(errors[field] && (touched[field] || submitAttempted));

  return (
    <section className="bg-background pt-20 pb-0">
      <div className="container">
        <div className="mx-auto w-full max-w-3xl">
          <div className="mb-8 text-center">
            <h1 className="text-foreground mb-8 text-4xl font-normal tracking-tight text-balance md:text-5xl lg:text-6xl">
              Submit an inquiry
            </h1>
            <p className="text-muted-foreground mx-auto mb-8 max-w-2xl text-base leading-normal font-normal text-balance md:text-lg">
              Tell us what you're looking for - we'll route your message and follow up.
            </p>
          </div>

          <div className="flex flex-col gap-8 md:flex-row md:justify-between lg:gap-12">
            <div>
              <h2 className="text-muted-foreground text-base font-medium md:text-lg">
                Corporate office
              </h2>
              <p className="text-muted-foreground text-sm leading-relaxed md:text-base">
                WeWork Rajapushpa Summit
                <br />
                Financial District
                <br />
                Hyderabad 500032
                <br />
                Telangana, India
              </p>
            </div>

            <div>
              <h2 className="text-muted-foreground text-base font-medium md:text-lg">Email us</h2>
              <p className="text-muted-foreground text-sm leading-relaxed md:text-base">
                contact [at]
                <br />
                valuenode [dot] com
              </p>
            </div>

            <div>
              <h2 className="text-muted-foreground text-base font-medium md:text-lg">Call us</h2>
              <p className="text-muted-foreground text-sm leading-relaxed md:text-base">
                +91 7337223434
              </p>
            </div>
          </div>

          <DashedLine className="my-8" />

          <div className="mx-auto">
            <h2 className="text-muted-foreground text-base font-medium md:text-lg">Inquiries</h2>

            {/* Keep action/method as a no-JS fallback (server must support formData too). */}
            <form
              className="mt-8 space-y-5"
              onSubmit={handleSubmit}
              action={CONTACT_API_ENDPOINT}
              method="post"
              // ✅ IMPORTANT: no `noValidate` here, so browser-native validation can run if JS fails.
            >
              {/* Spam-signal fields: send to server; do NOT trust them for security */}
              <input type="hidden" name="formStartedAt" value={String(formStartedAtRef.current)} />
              <input type="hidden" name="formId" value="contact10" />

              {/* Honeypot */}
              <div
                aria-hidden="true"
                style={{
                  position: "absolute",
                  left: "-10000px",
                  top: "auto",
                  width: "1px",
                  height: "1px",
                  overflow: "hidden",
                }}
              >
                <Label className="text-muted-foreground" htmlFor="company-website">
                  Company website
                </Label>
                <Input
                  id="company-website"
                  name={HONEYPOT_FIELD_NAME}
                  autoComplete="off"
                  tabIndex={-1}
                  value={values[HONEYPOT_FIELD_NAME]}
                  onChange={handleChange(HONEYPOT_FIELD_NAME)}
                />
              </div>

              <div className="space-y-2">
                <Label className="text-muted-foreground" htmlFor="full-name">
                  Full name
                </Label>
                <Input
                  ref={refs.fullName}
                  id="full-name"
                  name="fullName"
                  autoComplete="name"
                  placeholder="First and last name"
                  value={values.fullName}
                  onChange={handleChange("fullName")}
                  onBlur={handleBlur("fullName")}
                  aria-invalid={showError("fullName")}
                  aria-describedby={showError("fullName") ? "full-name-error" : undefined}
                  className="border-border/60 focus-visible:border-foreground/50 shadow-none focus-visible:shadow-none focus-visible:ring-0 focus-visible:ring-offset-0"
                  maxLength={LIMITS.fullName}
                  required
                />
                {showError("fullName") && (
                  <p id="full-name-error" className="text-destructive text-xs" aria-live="polite">
                    {errors.fullName}
                  </p>
                )}
              </div>

              <div className="space-y-2">
                <Label className="text-muted-foreground" htmlFor="work-email">
                  Work email address
                </Label>
                <Input
                  ref={refs.email}
                  id="work-email"
                  name="email"
                  autoComplete="email"
                  inputMode="email"
                  placeholder="me@company.com"
                  type="email"
                  value={values.email}
                  onChange={handleChange("email")}
                  onBlur={handleBlur("email")}
                  aria-invalid={showError("email")}
                  aria-describedby={showError("email") ? "work-email-error" : undefined}
                  className="border-border/60 focus-visible:border-foreground/50 shadow-none focus-visible:shadow-none focus-visible:ring-0 focus-visible:ring-offset-0"
                  maxLength={LIMITS.email}
                  required
                />
                {showError("email") && (
                  <p id="work-email-error" className="text-destructive text-xs" aria-live="polite">
                    {errors.email}
                  </p>
                )}
              </div>

              <div className="space-y-2">
                <Label className="text-muted-foreground" htmlFor="phone-number">
                  Phone number
                </Label>
                <Input
                  ref={refs.phone}
                  id="phone-number"
                  name="phone"
                  autoComplete="tel"
                  inputMode="tel"
                  placeholder="+[Country code] [Phone number]"
                  type="tel"
                  value={values.phone}
                  onChange={handleChange("phone")}
                  onBlur={handleBlur("phone")}
                  aria-invalid={showError("phone")}
                  aria-describedby={showError("phone") ? "phone-number-error" : undefined}
                  className="border-border/60 focus-visible:border-foreground/50 shadow-none focus-visible:shadow-none focus-visible:ring-0 focus-visible:ring-offset-0"
                  maxLength={LIMITS.phone}
                />
                {showError("phone") && (
                  <p
                    id="phone-number-error"
                    className="text-destructive text-xs"
                    aria-live="polite"
                  >
                    {errors.phone}
                  </p>
                )}
              </div>

              <div className="space-y-2">
                <Label className="text-muted-foreground" htmlFor="company-name">
                  Company name
                </Label>
                <Input
                  ref={refs.company}
                  id="company-name"
                  name="company"
                  autoComplete="organization"
                  placeholder="Company name"
                  value={values.company}
                  onChange={handleChange("company")}
                  onBlur={handleBlur("company")}
                  aria-invalid={showError("company")}
                  aria-describedby={showError("company") ? "company-name-error" : undefined}
                  className="border-border/60 focus-visible:border-foreground/50 shadow-none focus-visible:shadow-none focus-visible:ring-0 focus-visible:ring-offset-0"
                  maxLength={LIMITS.company}
                  required
                />
                {showError("company") && (
                  <p
                    id="company-name-error"
                    className="text-destructive text-xs"
                    aria-live="polite"
                  >
                    {errors.company}
                  </p>
                )}
              </div>

              <div className="space-y-2">
                <Label className="text-muted-foreground" htmlFor="message">
                  Your message
                </Label>
                <Textarea
                  ref={refs.message}
                  id="message"
                  name="message"
                  autoComplete="off"
                  placeholder="Write your message"
                  value={values.message}
                  onChange={handleChange("message")}
                  onBlur={handleBlur("message")}
                  aria-invalid={showError("message")}
                  aria-describedby={showError("message") ? "message-error" : undefined}
                  className="border-border/60 focus-visible:border-foreground/50 min-h-[120px] resize-none shadow-none focus-visible:shadow-none focus-visible:ring-0 focus-visible:ring-offset-0"
                  maxLength={LIMITS.message}
                  required
                />
                {showError("message") && (
                  <p id="message-error" className="text-destructive text-xs" aria-live="polite">
                    {errors.message}
                  </p>
                )}
              </div>

              {/* Turnstile (optional but recommended) */}
              {turnstileSiteKey && (
                <div className="space-y-2">
                  <div className="cf-turnstile" data-sitekey={turnstileSiteKey} />
                  {turnstileError && (
                    <p className="text-destructive text-xs" aria-live="polite">
                      {turnstileError}
                    </p>
                  )}
                </div>
              )}

              {/* Submission banner */}
              {submitStatus !== "idle" && (
                <p
                  className={cn(
                    "text-sm",
                    submitStatus === "success" ? "text-muted-foreground" : "text-destructive",
                  )}
                  aria-live="polite"
                >
                  {submitMessage}
                </p>
              )}

              <div className="flex justify-end">
                <Button
                  size="lg"
                  type="submit"
                  disabled={isSubmitting}
                  className="group relative z-10 w-fit rounded-full! px-10 tracking-tighter shadow-none!"
                >
                  {isSubmitting ? "Submitting..." : "Submit"}
                </Button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

interface DashedLineProps {
  className?: string;
}

const DashedLine = ({ className }: DashedLineProps) => {
  return (
    <div className={cn("text-muted-foreground relative h-px w-full", className)}>
      <div
        className={cn(
          "h-px w-full",
          "bg-[repeating-linear-gradient(90deg,transparent,transparent_4px,currentColor_4px,currentColor_10px)]",
          "mask-[linear-gradient(90deg,transparent,black_25%,black_75%,transparent)]",
        )}
      />
    </div>
  );
};

export { Contact10 };
