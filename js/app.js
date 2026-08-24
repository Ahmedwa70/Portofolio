/*! ============================================================================
 *  app.js -- rendering engine and language runtime
 *  Copyright (c) 2026 Ahmed Sobhy. All Rights Reserved.
 *
 *  Original architecture, implementation and content. Proprietary — not open
 *  source. Reproduction, redistribution or derivative works are prohibited
 *  without prior written permission. See LICENSE.txt.
 *
 *  Integrity digests for every source file: meta/ownership.json
 *  Permission requests: Ahmedwa70@yahoo.com
 * ========================================================================== */
/**
 * app.js
 * -----------------------------------------------------------------------
 * Application logic only. No personal content and no UI text is ever
 * hardcoded here — personal/CV content comes from CV_DATA (data.js),
 * interface chrome comes from UI_TRANSLATIONS (translations.js).
 *
 * Every multilingual field, wherever it appears, is read through the
 * single helper getLocalizedValue() — no per-language branching
 * anywhere else in this file.
 * -----------------------------------------------------------------------
 */
(function () {
  "use strict";

  var STORAGE_LANG = "as_portfolio_lang";
  var STORAGE_THEME = "as_portfolio_theme";
  var DEFAULT_LANG = "en";
  var LANG_CODES = SUPPORTED_LANGUAGES.map(function (l) { return l.code; });

  // Open Graph expects language_TERRITORY, not a bare code.
  var OG_LOCALES = {
    en: "en_US", ar: "ar_AR", zh: "zh_CN", es: "es_ES", fr: "fr_FR",
    tr: "tr_TR", ko: "ko_KR", ja: "ja_JP", id: "id_ID"
  };

  var state = { lang: null, theme: null };

  // =========================================================================
  // Central localization helper — the ONLY place that resolves a
  // multilingual { en, ar, zh, ... } dictionary down to a display value.
  // =========================================================================

  /**
   * @param {*} value  A translation dictionary ({en:"...",...} or
   *                    {en:[...],...}), a plain string/array, or null.
   * @param {string} lang  Language code to resolve.
   * @returns {string|Array} The localized value, falling back to English,
   *                          then to an empty string/array. Never returns
   *                          undefined and never leaks an internal key.
   */
  function getLocalizedValue(value, lang) {
    lang = lang || state.lang || DEFAULT_LANG;
    if (value == null) return "";

    // Not a translation dictionary (plain string, number, array of
    // plain strings, etc.) — return as-is.
    if (typeof value !== "object" || Array.isArray(value)) return value;

    // A translation dictionary is an object whose keys are ALL language
    // codes. Testing "has at least one language code" would misfire on
    // any data object carrying an `id` field — "id" is both Indonesian
    // and the identifier convention used throughout data.js.
    if (!looksLikeTranslationDict(value)) return value;

    var resolved = value[lang];
    if (isNonEmpty(resolved)) return resolved;

    var fallback = value[DEFAULT_LANG];
    return isNonEmpty(fallback) ? fallback : (Array.isArray(fallback) ? [] : "");
  }

  function isNonEmpty(v) {
    if (v == null) return false;
    if (Array.isArray(v)) return v.length > 0;
    return String(v).trim().length > 0;
  }

  /**
   * True only for an object whose keys are ALL language codes. Shared by
   * getLocalizedValue() and the validator so both agree on what counts
   * as a translation dictionary.
   */
  function looksLikeTranslationDict(obj) {
    if (obj == null || typeof obj !== "object" || Array.isArray(obj)) return false;
    var keys = Object.keys(obj);
    if (keys.length === 0) return false;
    return keys.every(function (k) { return LANG_CODES.indexOf(k) !== -1; });
  }

  function ui(lang, path) {
    var dict = UI_TRANSLATIONS[lang] || UI_TRANSLATIONS[DEFAULT_LANG];
    var node = dict;
    var parts = path.split(".");
    for (var i = 0; i < parts.length; i++) {
      if (node == null) break;
      node = node[parts[i]];
    }
    if (node == null && lang !== DEFAULT_LANG) {
      // Fall back to English for a missing UI key.
      node = UI_TRANSLATIONS[DEFAULT_LANG];
      for (var j = 0; j < parts.length; j++) {
        if (node == null) break;
        node = node[parts[j]];
      }
    }
    return node == null ? "" : node;
  }

  /* ---------------------------------------------------------------------
   * Minimal line-icon set (stroke-based, matches the card-icon style)
   * ------------------------------------------------------------------- */
  var ICONS = {
    years: '<path d="M12 7v5l3.5 2"/><circle cx="12" cy="12" r="9"/>',
    globe: '<circle cx="12" cy="12" r="9"/><path d="M3 12h18M12 3c2.5 2.7 2.5 15.3 0 18M12 3c-2.5 2.7-2.5 15.3 0 18"/>',
    content: '<path d="M6 4h9l3 3v13H6z"/><path d="M9 12h6M9 16h6M9 8h3"/>',
    system: '<rect x="3" y="4" width="18" height="12" rx="1.5"/><path d="M8 20h8M12 16v4"/>',
    culture: '<path d="M12 3l8 4-8 4-8-4 8-4Z"/><path d="M4 11l8 4 8-4M4 15l8 4 8-4"/>',
    chat: '<path d="M4 5h16v11H8l-4 4V5Z"/>',
    student: '<path d="M12 4 2 9l10 5 10-5-10-5Z"/><path d="M6 12v5c0 1.5 3 3 6 3s6-1.5 6-3v-5"/>',
    activity: '<path d="M3 12h4l2-7 4 14 2-7h6"/>',
    mic: '<rect x="9" y="3" width="6" height="11" rx="3"/><path d="M5 11a7 7 0 0 0 14 0M12 18v3"/>',
    tech: '<rect x="4" y="5" width="16" height="11" rx="1.5"/><path d="M9 20h6M12 16v4"/>',
    certificate: '<circle cx="12" cy="9" r="5.5"/><path d="M8.5 13.5 7 21l5-2.5L17 21l-1.5-7.5"/>',
    language: '<path d="M4 5h16v11H8l-4 4V5Z"/><path d="M8 9h5M8 12h8"/>',
    book: '<path d="M4 5.5A2.5 2.5 0 0 1 6.5 3H20v15H6.5A2.5 2.5 0 0 0 4 20.5V5.5Z"/><path d="M4 18.5A2.5 2.5 0 0 1 6.5 16H20"/>',
    computer: '<rect x="4" y="5" width="16" height="11" rx="1.5"/><path d="M9 20h6M12 16v4"/>',
    design: '<path d="M3 21l3.6-1 10.9-10.9a1.5 1.5 0 0 0 0-2.1l-1.5-1.5a1.5 1.5 0 0 0-2.1 0L3.4 17.4 3 21Z"/><path d="M13.5 6.5l4 4"/>',
    // Social marks are drawn in the same stroke style as the icons above
    // and inherit currentColor — never the platform's own brand colour,
    // which would break the palette.
    linkedin: '<rect x="3" y="3" width="18" height="18" rx="2.5"/><path d="M7.5 10.5v6"/><path d="M7.5 7.4v.2"/><path d="M11.5 16.5v-6"/><path d="M11.5 13.2a2.4 2.4 0 0 1 4.8 0v3.3"/>',
    whatsapp: '<path d="M20.5 11.8a8.5 8.5 0 0 1-12.7 7.4L3.5 20.5l1.4-4.2A8.5 8.5 0 1 1 20.5 11.8Z"/><path d="M9.3 9.2c-.2 1.9 1.5 4.3 3.4 5.1.7.3 1.4.1 1.8-.5l.3-.6-1.8-1-.5.6c-.8-.4-1.4-1.1-1.8-1.9l.7-.5-1-1.8-.6.3a.9.9 0 0 0-.5.3Z"/>',
    // WeChat's mark is two overlapping speech bubbles.
    wechat: '<path d="M9.4 4.2C5.9 4.2 3 6.5 3 9.4c0 1.6.9 3.1 2.3 4L4.7 15.6l2.4-1.1c.4.1.9.2 1.4.2"/><path d="M21 14.3c0-2.4-2.4-4.4-5.3-4.4s-5.3 2-5.3 4.4 2.4 4.4 5.3 4.4c.6 0 1.1-.1 1.6-.2l2.2 1-.5-1.7c1.2-.8 2-2 2-3.5Z"/>'
  };
  function iconSvg(name) {
    var paths = ICONS[name] || ICONS.content;
    return '<span class="card-icon"><svg viewBox="0 0 24 24">' + paths + '</svg></span>';
  }
  function escapeHtml(str) {
    if (str == null) return "";
    return String(str).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
  }

  /**
   * Wraps a value in <bdi> so it cannot reorder the text around it.
   * Needed wherever a line mixes scripts — an Arabic institution beside a
   * Latin one, a year beside Arabic text, and so on.
   *
   * Pass dir="ltr" for values made only of digits and punctuation: those
   * characters carry no direction of their own, so inside an RTL page a
   * range like "2016 — 2026" would otherwise render as "2026 — 2016".
   */
  function bdi(value, dir) {
    var text = escapeHtml(value);
    if (!text) return "";
    return "<bdi" + (dir ? ' dir="' + dir + '"' : "") + ">" + text + "</bdi>";
  }

  /**
   * True when a string carries no direction of its own — digits, signs and
   * punctuation only.
   *
   * Such a value inherits the paragraph direction, which is why "9+" renders
   * as "+9" on the Arabic page: "+" is a bidi European Number Terminator and
   * attaches to whichever side the base direction dictates. Values like this
   * are the ones that need an explicit dir="ltr".
   *
   * Deliberately a whitelist. Any letter, in any script, falls outside it and
   * keeps automatic direction, so "عالمي" and "ثلاث لغات" are never forced
   * into LTR.
   */
  function isDirectionNeutral(text) {
    return /^[\s\d+.,:;/()%~^×−–—-]*$/.test(String(text == null ? "" : text));
  }

  /**
   * Isolates a value and pins it to LTR only when it has no direction of its
   * own. Text values keep auto direction and behave exactly as before.
   */
  function bdiValue(value) {
    return bdi(value, isDirectionNeutral(value) ? "ltr" : null);
  }

  /* ---------------------------------------------------------------------
   * Static i18n strings (data-i18n="ui.path" in index.html)
   * ------------------------------------------------------------------- */
  function applyStaticStrings(lang) {
    document.querySelectorAll("[data-i18n]").forEach(function (el) {
      var value = ui(lang, el.getAttribute("data-i18n"));
      if (typeof value === "string" && value) el.textContent = value;
    });
    // Attribute-targeted UI strings, e.g.
    // data-i18n-attr="placeholder:form.namePlaceholder"
    // (comma-separate to set more than one attribute on the same element).
    document.querySelectorAll("[data-i18n-attr]").forEach(function (el) {
      el.getAttribute("data-i18n-attr").split(",").forEach(function (pair) {
        var sep = pair.indexOf(":");
        if (sep === -1) return;
        var attr = pair.slice(0, sep).trim();
        var value = ui(lang, pair.slice(sep + 1).trim());
        if (attr && typeof value === "string" && value) el.setAttribute(attr, value);
      });
    });
    updateThemeLabel(lang);
    document.querySelectorAll("[data-i18n-cv]").forEach(function (el) {
      var value = getByPath(CV_DATA, el.getAttribute("data-i18n-cv"));
      var resolved = getLocalizedValue(value, lang);
      if (typeof resolved === "string" && resolved) el.textContent = resolved;
    });
    var personalName = getLocalizedValue(CV_DATA.personal.name, lang);
    document.querySelectorAll("[data-i18n-name]").forEach(function (el) {
      el.textContent = personalName;
    });

    // hero.title1 / title2 are two independent job titles shown on separate
    // lines, so they need a separator here — joined by a bare space they
    // would run together into one ungrammatical string in <title>,
    // og:title and the JSON-LD jobTitle.
    var heroTitle = [
      getLocalizedValue(CV_DATA.hero.title1, lang),
      getLocalizedValue(CV_DATA.hero.title2, lang)
    ].filter(isNonEmpty).join(" · ");
    var metaDescription = getLocalizedValue(CV_DATA.hero.description, lang);

    // Page title carries the PRIMARY role only. Search results cut off around
    // 60 characters, and "Name | Role1 · Role2" was being truncated mid-role
    // in en/es/fr/id. Both roles are still published in full through the
    // JSON-LD jobTitle below, where no length limit applies.
    var primaryTitle = getLocalizedValue(CV_DATA.hero.title1, lang) || heroTitle;
    document.title = personalName + " | " + primaryTitle;
    setMeta("description", metaDescription);
    setMeta("og:title", document.title, true);
    setMeta("og:description", metaDescription, true);
    setMeta("og:locale", OG_LOCALES[lang] || OG_LOCALES[DEFAULT_LANG], true);
    setMeta("twitter:title", document.title);
    setMeta("twitter:description", metaDescription);

    // Open Graph and Twitter require ABSOLUTE urls — a relative path leaves
    // the preview image blank when the link is shared. Resolved against the
    // current location so it is correct on any domain without editing.
    var absoluteUrl = toAbsoluteUrl(lang);
    if (absoluteUrl) {
      setMeta("og:url", absoluteUrl, true);
      if (CV_DATA.personal.photo) {
        var absolutePhoto = toAbsoluteUrl(null, CV_DATA.personal.photo);
        setMeta("og:image", absolutePhoto, true);
        setMeta("twitter:image", absolutePhoto);
      }
    }
    updateHreflangLinks(lang);
    // og:image is set above as an absolute url; setting it again here from
    // the raw relative path would undo that.

    var ld = document.getElementById("ld-person");
    if (ld) {
      try {
        var jsonData = JSON.parse(ld.textContent);
        jsonData.name = personalName;
        jsonData.jobTitle = heroTitle;
        jsonData.description = metaDescription;
        jsonData.knowsLanguage = LANG_CODES;
        if (CV_DATA.personal.photo) jsonData.image = CV_DATA.personal.photo;
        ld.textContent = JSON.stringify(jsonData);
      } catch (e) { /* noop */ }
    }
  }

  /**
   * Keeps <link rel="alternate" hreflang> and <link rel="canonical"> in
   * sync with the ?lang= URLs the switcher produces, so each language
   * version is discoverable. Skipped on file:// where absolute URLs
   * carry no meaning.
   */
  /**
   * Absolute URL for a social/meta tag. Pass a lang to get this page's
   * canonical url for that language, or a path to resolve an asset.
   * Returns "" on file://, where an absolute url carries no meaning.
   */
  function toAbsoluteUrl(lang, path) {
    if (window.location.protocol === "file:") return "";
    try {
      if (path) return new URL(path, window.location.href).toString();
      var url = new URL(window.location.href);
      url.searchParams.set("lang", lang);
      url.hash = "";
      return url.toString();
    } catch (e) {
      return "";
    }
  }

  function updateHreflangLinks(lang) {
    if (window.location.protocol === "file:") return;
    var head = document.head;
    head.querySelectorAll('link[data-i18n-alt]').forEach(function (el) { el.remove(); });

    function langUrl(code) {
      var url = new URL(window.location.href);
      url.searchParams.set("lang", code);
      url.hash = "";
      return url.toString();
    }

    try {
      SUPPORTED_LANGUAGES.forEach(function (l) {
        if (!l.enabled) return;
        var link = document.createElement("link");
        link.setAttribute("rel", "alternate");
        link.setAttribute("hreflang", l.code);
        link.setAttribute("href", langUrl(l.code));
        link.setAttribute("data-i18n-alt", "");
        head.appendChild(link);
      });

      var xDefault = document.createElement("link");
      xDefault.setAttribute("rel", "alternate");
      xDefault.setAttribute("hreflang", "x-default");
      xDefault.setAttribute("href", langUrl(DEFAULT_LANG));
      xDefault.setAttribute("data-i18n-alt", "");
      head.appendChild(xDefault);

      var canonical = document.createElement("link");
      canonical.setAttribute("rel", "canonical");
      canonical.setAttribute("href", langUrl(lang));
      canonical.setAttribute("data-i18n-alt", "");
      head.appendChild(canonical);
    } catch (e) { /* ignore malformed URLs */ }
  }

  function setMeta(name, content, isProperty) {
    if (!content) return;
    var selector = isProperty ? 'meta[property="' + name + '"]' : 'meta[name="' + name + '"]';
    var el = document.querySelector(selector);
    if (el) el.setAttribute("content", content);
  }

  /* ---------------------------------------------------------------------
   * Section renderers — build DOM from CV_DATA using getLocalizedValue()
   * ------------------------------------------------------------------- */
  function renderAbout(lang) {
    var container = document.getElementById("about-paragraphs");
    var paragraphs = getLocalizedValue(CV_DATA.about.paragraphs, lang) || [];
    container.innerHTML = "";
    paragraphs.forEach(function (p) {
      var el = document.createElement("p");
      el.textContent = p;
      container.appendChild(el);
    });
  }

  /**
   * A highlight's displayed value.
   *
   * An entry carrying `valueSinceYear` is a running count, not a fixed
   * figure: the years elapsed since that year, computed at render time from
   * the visitor's own clock. It therefore stays correct without anyone
   * editing the file, and works offline — no network, no build step.
   *
   * Counted in whole calendar years, which is how "years of experience" is
   * normally stated; it ticks over on 1 January rather than on the exact
   * anniversary.
   *
   * Everything else falls back to the ordinary translated `value`.
   */
  function highlightValue(entry, lang) {
    if (entry && typeof entry.valueSinceYear === "number") {
      var years = new Date().getFullYear() - entry.valueSinceYear;
      return String(years > 0 ? years : 0);
    }
    return getLocalizedValue(entry.value, lang);
  }

  function renderHighlights(lang) {
    var container = document.getElementById("highlights-grid");
    if (!container) return;
    container.innerHTML = "";
    CV_DATA.highlights.forEach(function (entry) {
      var item = document.createElement("div");
      item.className = "highlight-item reveal";
      var value = highlightValue(entry, lang);
      item.innerHTML =
        // The value is the one field here that can be a bare number with a
        // sign ("9+"), so it is isolated; the label and description are
        // ordinary prose and are left exactly as they were.
        "<span class=\"highlight-value\">" + bdiValue(value) + "</span>" +
        "<span class=\"highlight-label\">" + escapeHtml(getLocalizedValue(entry.label, lang)) + "</span>" +
        "<span class=\"highlight-desc\">" + escapeHtml(getLocalizedValue(entry.description, lang)) + "</span>";
      container.appendChild(item);
    });
    observeReveal(container.querySelectorAll(".reveal"));
  }

  function renderAchievements(lang) {
    var container = document.getElementById("achievements-grid");
    container.innerHTML = "";
    CV_DATA.achievements.forEach(function (entry) {
      var card = document.createElement("div");
      card.className = "card reveal";
      card.innerHTML = iconSvg(entry.icon) +
        "<h3>" + escapeHtml(getLocalizedValue(entry.title, lang)) + "</h3>" +
        "<p>" + escapeHtml(getLocalizedValue(entry.description, lang)) + "</p>";
      container.appendChild(card);
    });
    observeReveal(container.querySelectorAll(".reveal"));
  }

  function renderExperience(lang) {
    var container = document.getElementById("experience-timeline");
    container.innerHTML = "";
    CV_DATA.experience.forEach(function (entry) {
      var responsibilities = getLocalizedValue(entry.responsibilities, lang) || [];
      var achievementsList = getLocalizedValue(entry.achievements, lang) || [];
      var skillsList = getLocalizedValue(entry.skills, lang) || [];
      var org = getLocalizedValue(entry.organization, lang);
      var loc = getLocalizedValue(entry.location, lang);
      // Organization holds the official institution name, location the place.
      // Some roles have no institution (private tutoring) and some legacy
      // entries repeat the place in both fields — show one line either way,
      // never a dangling separator.
      var orgLine = (org && loc && loc !== org) ? (org + " · " + loc) : (org || loc);

      var wrap = document.createElement("div");
      wrap.className = "timeline-item reveal";

      var respHtml = responsibilities.length
        ? '<div class="timeline-block"><p class="timeline-block-label">' + escapeHtml(ui(lang, "sections.experience.responsibilities")) + '</p><ul class="timeline-list">' +
          responsibilities.map(function (b) { return "<li>" + escapeHtml(b) + "</li>"; }).join("") + "</ul></div>"
        : "";
      var achHtml = achievementsList.length
        ? '<div class="timeline-block"><p class="timeline-block-label">' + escapeHtml(ui(lang, "sections.experience.achievements")) + '</p><ul class="timeline-achievements">' +
          achievementsList.map(function (a) { return "<li>" + escapeHtml(a) + "</li>"; }).join("") + "</ul></div>"
        : "";
      var skillsHtml = skillsList.length
        ? '<div class="timeline-block"><p class="timeline-block-label">' + escapeHtml(ui(lang, "sections.experience.skills")) + '</p><div class="timeline-skills">' +
          skillsList.map(function (s) { return '<span class="skill-tag">' + escapeHtml(s) + "</span>"; }).join("") + "</div></div>"
        : "";

      wrap.innerHTML =
        '<span class="timeline-dot"></span>' +
        '<div class="timeline-card">' +
          '<div class="timeline-card-head">' +
            iconSvg(entry.icon) +
            "<div>" +
              '<p class="timeline-period-badge">' + bdi(entry.period, "ltr") + "</p>" +
              "<h3>" + escapeHtml(getLocalizedValue(entry.position, lang)) + "</h3>" +
              '<p class="timeline-org">' + bdi(orgLine) + "</p>" +
            "</div>" +
          "</div>" +
          '<p class="timeline-summary">' + escapeHtml(getLocalizedValue(entry.summary, lang)) + "</p>" +
          respHtml + achHtml + skillsHtml +
        "</div>";
      container.appendChild(wrap);
    });
    observeReveal(container.querySelectorAll(".reveal"));
  }

  function renderMethodology(lang) {
    document.getElementById("philosophy-quote").textContent = getLocalizedValue(CV_DATA.methodology.philosophy, lang);
    var container = document.getElementById("methodology-grid");
    container.innerHTML = "";
    CV_DATA.methodology.items.forEach(function (entry) {
      var card = document.createElement("div");
      card.className = "card reveal";
      card.innerHTML = iconSvg(entry.icon) +
        "<h3>" + escapeHtml(getLocalizedValue(entry.name, lang)) + "</h3>" +
        "<p>" + escapeHtml(getLocalizedValue(entry.description, lang)) + "</p>";
      container.appendChild(card);
    });
    observeReveal(container.querySelectorAll(".reveal"));
  }

  // innovation.description / project.name / project.description /
  // contact.description carry data-i18n-cv in index.html and are already
  // filled by applyStaticStrings() — not repeated here.
  function renderInnovation(lang) {
    var container = document.getElementById("innovation-areas");
    container.innerHTML = "";
    CV_DATA.innovation.areas.forEach(function (entry) {
      var el = document.createElement("div");
      el.className = "innovation-area reveal";
      el.textContent = getLocalizedValue(entry.name, lang);
      container.appendChild(el);
    });
    observeReveal(container.querySelectorAll(".reveal"));
  }

  function renderProject(lang) {
    var statusEl = document.getElementById("project-status");
    if (statusEl) statusEl.textContent = getLocalizedValue(CV_DATA.project.status, lang);

    var featuresContainer = document.getElementById("project-features");
    if (featuresContainer) {
      var features = getLocalizedValue(CV_DATA.project.features, lang) || [];
      featuresContainer.innerHTML = features.map(function (f) { return "<li>" + escapeHtml(f) + "</li>"; }).join("");
    }

    var tagsContainer = document.getElementById("project-tags");
    if (tagsContainer) {
      var techs = getLocalizedValue(CV_DATA.project.technologies, lang) || [];
      tagsContainer.innerHTML = "";
      techs.forEach(function (tag) {
        var span = document.createElement("span");
        span.textContent = tag;
        tagsContainer.appendChild(span);
      });
    }
  }

  function renderSkills(lang) {
    var container = document.getElementById("skills-grid");
    container.innerHTML = "";
    CV_DATA.skills.forEach(function (entry) {
      var chip = document.createElement("div");
      chip.className = "skill-chip reveal";
      chip.innerHTML = '<span class="dot"></span><span>' + escapeHtml(getLocalizedValue(entry.name, lang)) + "</span>";
      container.appendChild(chip);
    });
    observeReveal(container.querySelectorAll(".reveal"));
  }

  function renderEducation(lang) {
    var container = document.getElementById("education-list");
    container.innerHTML = "";
    CV_DATA.education.forEach(function (entry) {
      var description = getLocalizedValue(entry.description, lang);
      var location = getLocalizedValue(entry.location, lang);
      var row = document.createElement("div");
      row.className = "education-item reveal";
      row.innerHTML =
        '<div class="education-year">' + bdi(entry.year, "ltr") + "</div>" +
        "<div><h3>" + escapeHtml(getLocalizedValue(entry.degree, lang)) + "</h3>" +
        '<p class="education-meta">' + bdi(getLocalizedValue(entry.institution, lang)) +
          (location ? " — " + bdi(location) : "") + "</p>" +
        (description ? '<p class="education-desc">' + escapeHtml(description) + "</p>" : "") +
        "</div>";
      container.appendChild(row);
    });
    observeReveal(container.querySelectorAll(".reveal"));
  }

  function renderCertifications(lang) {
    var container = document.getElementById("certifications-list");
    container.innerHTML = "";
    CV_DATA.certifications.forEach(function (entry) {
      var description = getLocalizedValue(entry.description, lang);
      var institution = getLocalizedValue(entry.institution, lang);
      var location = getLocalizedValue(entry.location, lang);
      var metaHtml = bdi(institution);
      if (location && location !== institution) metaHtml += " — " + bdi(location);
      metaHtml += " · " + bdi(entry.year, "ltr");

      var coursesList = getLocalizedValue(entry.courses, lang) || [];
      var coursesHtml = coursesList.length
        ? '<ul class="cert-courses">' + coursesList.map(function (c) { return "<li>" + escapeHtml(c) + "</li>"; }).join("") + "</ul>"
        : "";

      var el = document.createElement("div");
      el.className = "cert-item reveal";
      el.innerHTML = iconSvg("certificate") +
        '<div class="cert-body"><span class="cert-name">' + escapeHtml(getLocalizedValue(entry.name, lang)) + "</span>" +
        '<span class="cert-meta">' + metaHtml + "</span>" +
        (description ? '<span class="cert-desc">' + escapeHtml(description) + "</span>" : "") +
        coursesHtml +
        "</div>";
      container.appendChild(el);
    });
    observeReveal(container.querySelectorAll(".reveal"));
  }

  function renderContact(lang) {
    var emailEl = document.getElementById("contact-email");
    emailEl.textContent = CV_DATA.personal.email;
    emailEl.href = "mailto:" + CV_DATA.personal.email;
    document.getElementById("contact-location").textContent = getLocalizedValue(CV_DATA.personal.location, lang);

    var statusText = document.getElementById("contact-status-text");
    if (statusText) statusText.textContent = ui(lang, "status." + (CV_DATA.contact.availability || "open"));

    renderSocialProfiles();
    renderWeChat(lang);
  }

  /**
   * WeChat as its own contact block rather than one more icon in the row.
   *
   * It is not a profile you click through to — it is a code you scan, and it
   * matters specifically for reaching people inside China, where WeChat is
   * the default professional channel. Treating it as a social icon would
   * misrepresent how it is actually used.
   *
   * Hidden unless the entry is enabled AND a QR image path is set, so a
   * half-filled entry never leaves an empty frame or a broken image.
   */
  function renderWeChat(lang) {
    var wrap = document.getElementById("contact-wechat");
    if (!wrap) return;

    var entry = (CV_DATA.personal.social || {}).wechat;
    var available = !!entry && entry.enabled === true && isNonEmpty(entry.qr);
    wrap.hidden = !available;
    if (!available) return;

    var label = wrap.querySelector(".contact-label");
    // Through the resolver, so a label may be either a plain brand string or
    // a translation dictionary — WeChat is the one that carries local names.
    if (label) label.textContent = getLocalizedValue(entry.label, lang) || "WeChat";

    var image = document.getElementById("wechat-qr-image");
    var link = document.getElementById("wechat-qr-link");
    if (image) {
      image.setAttribute("src", entry.qr);
      // Describes what the image IS and what it does, for anyone who cannot
      // see it — not just the word "QR".
      image.setAttribute("alt", ui(lang, "contactMeta.wechatAlt"));
    }
    if (link) {
      // Opens the image at full size; on a phone this is how you enlarge it
      // to scan from another device. No modal, no new UI machinery.
      link.setAttribute("href", entry.qr);
      link.setAttribute("aria-label", ui(lang, "contactMeta.wechatAlt"));
    }
  }

  /**
   * Professional profiles block. Walks whatever keys exist under
   * CV_DATA.personal.social — adding a platform needs a data entry and an
   * icon path, no change here. An entry qualifies only when
   * enabled === true AND url is non-empty; if none qualify the whole
   * block is hidden so it leaves no empty space.
   *
   * Takes no `lang`: the section heading is a data-i18n element handled
   * by applyStaticStrings, and the platform names are brand names that
   * are identical in every language.
   */
  function renderSocialProfiles() {
    var wrap = document.getElementById("contact-profiles");
    var list = document.getElementById("profile-links");
    if (!wrap || !list) return;

    // Only url-bearing entries belong in this row. A channel that carries a
    // `qr` instead (WeChat) is deliberately excluded here and rendered as its
    // own block by renderWeChat().
    var social = CV_DATA.personal.social || {};
    var active = Object.keys(social).filter(function (key) {
      var profile = social[key];
      return profile && profile.enabled === true && isNonEmpty(profile.url);
    });

    list.innerHTML = "";
    wrap.hidden = active.length === 0;
    if (!active.length) return;

    active.forEach(function (key) {
      var profile = social[key];
      var link = document.createElement("a");
      link.href = profile.url;
      link.target = "_blank";
      link.rel = "noopener noreferrer";
      link.innerHTML =
        '<svg class="profile-icon" viewBox="0 0 24 24" aria-hidden="true">' +
        (ICONS[key] || ICONS.globe) + "</svg>" +
        // Resolved too, so a link profile can carry a localised name later
        // without touching this code. Plain brand strings pass through
        // unchanged, which is what LinkedIn and WhatsApp use.
        "<span>" + escapeHtml(getLocalizedValue(profile.label) || key) + "</span>";
      list.appendChild(link);
    });
  }

  function renderHeroActions(lang) {
    var downloadBtn = document.getElementById("hero-cta-download");
    var cvFiles = CV_DATA.personal.cvFiles || {};
    var file = cvFiles[lang] || cvFiles[DEFAULT_LANG] || "";
    if (file) {
      downloadBtn.setAttribute("href", file);
      downloadBtn.setAttribute("download", "");
      downloadBtn.style.display = "";
    } else {
      downloadBtn.style.display = "none";
    }
    var img = document.getElementById("profile-image");
    if (CV_DATA.personal.photo) img.setAttribute("src", CV_DATA.personal.photo);
    var photoAlt = getLocalizedValue(CV_DATA.personal.photoAlt, lang);
    img.setAttribute("alt", photoAlt || getLocalizedValue(CV_DATA.personal.name, lang));
  }

  function renderAll(lang) {
    applyStaticStrings(lang);
    renderHighlights(lang);
    renderAbout(lang);
    renderAchievements(lang);
    renderExperience(lang);
    renderMethodology(lang);
    renderInnovation(lang);
    renderProject(lang);
    renderSkills(lang);
    renderEducation(lang);
    renderCertifications(lang);
    renderContact(lang);
    renderHeroActions(lang);
  }

  /* ---------------------------------------------------------------------
   * Language switching, URL param + localStorage persistence
   * ------------------------------------------------------------------- */
  function langMeta(code) {
    return SUPPORTED_LANGUAGES.find(function (l) { return l.code === code; });
  }

  function setLanguage(lang, updateUrl) {
    var meta = langMeta(lang);
    if (!meta || !meta.enabled) { lang = DEFAULT_LANG; meta = langMeta(DEFAULT_LANG); }

    state.lang = lang;
    document.documentElement.setAttribute("lang", lang);
    document.documentElement.setAttribute("dir", meta.dir);
    document.getElementById("lang-current-code").textContent = lang.toUpperCase();
    document.getElementById("lang-current-label").textContent = meta.label;

    try { localStorage.setItem(STORAGE_LANG, lang); } catch (e) { /* ignore */ }
    if (updateUrl !== false) updateUrlLang(lang);

    renderAll(lang);
    updateLangMenuActive(lang);
  }

  function updateUrlLang(lang) {
    if (!window.history || !window.history.replaceState) return;
    try {
      var url = new URL(window.location.href);
      url.searchParams.set("lang", lang);
      window.history.replaceState({}, "", url);
    } catch (e) { /* ignore (e.g. file:// with restrictive URL parsing) */ }
  }

  function buildLangMenu() {
    var menu = document.getElementById("lang-menu");
    menu.innerHTML = "";
    SUPPORTED_LANGUAGES.forEach(function (l) {
      var li = document.createElement("li");
      // The <li> is a presentational wrapper so the listbox's accessible
      // children are the options themselves, not the list items.
      li.setAttribute("role", "presentation");
      var btn = document.createElement("button");
      btn.type = "button";
      btn.setAttribute("role", "option");
      btn.setAttribute("aria-selected", "false");
      btn.setAttribute("lang", l.code);
      btn.dataset.lang = l.code;
      // The endonym alone identifies the language — an ISO code badge beside
      // it adds nothing a reader of that language needs. The code survives
      // only on the toggle, where it is the sole content below 640px.
      var name = document.createElement("span");
      name.className = "lang-name";
      name.textContent = l.label;
      btn.appendChild(name);
      btn.addEventListener("click", function () {
        setLanguage(l.code);
        closeLangMenu(true);
      });
      li.appendChild(btn);
      menu.appendChild(li);
    });
  }

  function updateLangMenuActive(lang) {
    document.querySelectorAll("#lang-menu button").forEach(function (btn) {
      var isActive = btn.dataset.lang === lang;
      btn.classList.toggle("active", isActive);
      btn.setAttribute("aria-selected", String(isActive));
    });
  }

  function toggleLangMenu() {
    var el = document.getElementById("lang-switcher");
    var isOpen = el.classList.toggle("open");
    document.getElementById("lang-toggle").setAttribute("aria-expanded", String(isOpen));
    if (isOpen) {
      // The menu transitions from visibility:hidden — focus() is ignored
      // until the browser has applied the .open styles, so wait a frame.
      requestAnimationFrame(function () {
        var active = document.querySelector("#lang-menu button.active") ||
                     document.querySelector("#lang-menu button");
        if (active) active.focus();
      });
    }
  }
  function closeLangMenu(returnFocus) {
    document.getElementById("lang-switcher").classList.remove("open");
    document.getElementById("lang-toggle").setAttribute("aria-expanded", "false");
    if (returnFocus) document.getElementById("lang-toggle").focus();
  }

  /* Keyboard support for the language listbox: Esc closes, Up/Down and
   * Home/End move between options. Enter/Space are handled natively by
   * the <button> options. */
  function initLangMenuKeys() {
    var switcher = document.getElementById("lang-switcher");
    switcher.addEventListener("keydown", function (e) {
      if (e.key === "Escape") {
        if (switcher.classList.contains("open")) { e.preventDefault(); closeLangMenu(true); }
        return;
      }
      var options = Array.prototype.slice.call(document.querySelectorAll("#lang-menu button"));
      if (!options.length) return;

      if ((e.key === "ArrowDown" || e.key === "ArrowUp") && !switcher.classList.contains("open")) {
        e.preventDefault();
        toggleLangMenu();
        return;
      }
      if (!switcher.classList.contains("open")) return;

      var current = options.indexOf(document.activeElement);
      var next = null;
      if (e.key === "ArrowDown") next = current < 0 ? 0 : (current + 1) % options.length;
      else if (e.key === "ArrowUp") next = current < 0 ? options.length - 1 : (current - 1 + options.length) % options.length;
      else if (e.key === "Home") next = 0;
      else if (e.key === "End") next = options.length - 1;
      if (next !== null) { e.preventDefault(); options[next].focus(); }
    });
  }

  /* ---------------------------------------------------------------------
   * Theme
   * ------------------------------------------------------------------- */
  function setTheme(theme) {
    state.theme = theme;
    document.documentElement.setAttribute("data-theme", theme);
    try { localStorage.setItem(STORAGE_THEME, theme); } catch (e) { /* ignore */ }
    updateThemeLabel(state.lang);
  }

  // The toggle is labelled with the mode it switches TO, in the current
  // language. Called on both theme change and language change.
  function updateThemeLabel(lang) {
    var btn = document.getElementById("theme-toggle");
    if (!btn) return;
    var label = ui(lang || DEFAULT_LANG, state.theme === "light" ? "theme.dark" : "theme.light");
    if (label) btn.setAttribute("aria-label", label);
  }
  function toggleTheme() { setTheme(state.theme === "light" ? "dark" : "light"); }

  /* ---------------------------------------------------------------------
   * Scroll reveal
   * ------------------------------------------------------------------- */
  var revealObserver = null;
  function getRevealObserver() {
    if (!revealObserver) {
      revealObserver = new IntersectionObserver(function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible");
            entry.target.classList.add("in-view");
          }
        });
      }, { threshold: 0.15, rootMargin: "0px 0px -60px 0px" });
    }
    return revealObserver;
  }
  function observeReveal(nodeList) {
    var obs = getRevealObserver();
    nodeList.forEach(function (node) { obs.observe(node); });
  }

  /* ---------------------------------------------------------------------
   * Header, mobile nav, contact form
   * ------------------------------------------------------------------- */
  function initHeaderScroll() {
    var header = document.getElementById("site-header");
    window.addEventListener("scroll", function () {
      header.style.borderBottomColor = window.scrollY > 12 ? "var(--border-strong)" : "var(--border)";
    }, { passive: true });
  }

  function initMobileNav() {
    var toggle = document.getElementById("nav-toggle");
    var nav = document.getElementById("main-nav");
    toggle.addEventListener("click", function () {
      var isOpen = nav.classList.toggle("open");
      toggle.setAttribute("aria-expanded", String(isOpen));
    });
    nav.querySelectorAll("a").forEach(function (a) {
      a.addEventListener("click", function () {
        nav.classList.remove("open");
        toggle.setAttribute("aria-expanded", "false");
      });
    });
  }

  function initContactForm() {
    var form = document.getElementById("contact-form");
    form.addEventListener("submit", function (e) {
      e.preventDefault();
      var name = document.getElementById("cf-name").value;
      var email = document.getElementById("cf-email").value;
      var message = document.getElementById("cf-message").value;
      var subject = encodeURIComponent("Website contact — " + name);
      var body = encodeURIComponent(message + "\n\n— " + name + " (" + email + ")");

      var statusEl = document.getElementById("form-status");
      if (statusEl) statusEl.textContent = ui(state.lang, "form.success");

      window.location.href = "mailto:" + CV_DATA.personal.email + "?subject=" + subject + "&body=" + body;
    });
  }

  /**
   * Appends a source line to substantial copied excerpts.
   *
   * Copying is NOT blocked and selection is NOT disabled — that would break
   * screen readers, translation tools and ordinary readers, for protection
   * that a single "view source" defeats anyway. What this does is make an
   * unattributed paste take deliberate effort rather than none.
   *
   * Short selections (an email address, a year, an institution name) are
   * left completely alone so routine use is unaffected.
   */
  var COPY_ATTRIBUTION_MIN_WEIGHT = 220;

  /**
   * Length of an excerpt, weighted so the threshold means the same thing in
   * every script. One CJK ideograph or Hangul syllable carries about as much
   * text as a short Latin word, so a raw character count let a whole Chinese
   * section (207 chars) be copied unattributed while the same content in
   * Turkish (684 chars) triggered the notice.
   */
  function excerptWeight(text) {
    var dense = text.match(/[぀-ヿ㐀-鿿가-힯]/g);
    return text.length + (dense ? dense.length * 3 : 0);
  }

  function initCopyAttribution() {
    document.addEventListener("copy", function (e) {
      try {
        var selection = window.getSelection();
        if (!selection || selection.isCollapsed) return;
        var text = String(selection);
        if (excerptWeight(text.trim()) < COPY_ATTRIBUTION_MIN_WEIGHT) return;
        if (!e.clipboardData) return;

        var source = toAbsoluteUrl(state.lang) || window.location.href;
        var notice = "\n\n— " + getLocalizedValue(CV_DATA.personal.name, state.lang) +
                     "\n" + source +
                     "\n© " + new Date().getFullYear() + " " +
                     ui(state.lang, "footer.rights");

        e.clipboardData.setData("text/plain", text + notice);
        e.preventDefault();
      } catch (err) {
        // Any failure leaves the browser's own copy behaviour in place.
      }
    });
  }

  function initFooterYear() {
    document.getElementById("footer-year").textContent = new Date().getFullYear();
  }

  function initOutsideClicks() {
    document.addEventListener("click", function (e) {
      var switcher = document.getElementById("lang-switcher");
      if (!switcher.contains(e.target)) closeLangMenu();
    });
  }

  /* ---------------------------------------------------------------------
   * Initial language / theme resolution
   * Priority: ?lang= URL param > localStorage > English default.
   * ------------------------------------------------------------------- */
  function detectInitialLang() {
    try {
      var urlLang = new URLSearchParams(window.location.search).get("lang");
      if (urlLang && langMeta(urlLang) && langMeta(urlLang).enabled) return urlLang;
    } catch (e) { /* ignore */ }
    try {
      var saved = localStorage.getItem(STORAGE_LANG);
      if (saved && langMeta(saved) && langMeta(saved).enabled) return saved;
    } catch (e) { /* ignore */ }
    return DEFAULT_LANG;
  }

  function detectInitialTheme() {
    try {
      var saved = localStorage.getItem(STORAGE_THEME);
      if (saved) return saved;
    } catch (e) { /* ignore */ }
    return "dark";
  }

  // =========================================================================
  // TRANSLATION VALIDATION SYSTEM (development mode only)
  // -------------------------------------------------------------------------
  // Recursively scans CV_DATA and UI_TRANSLATIONS for incomplete
  // translations and prints console warnings. Never throws, never blocks
  // rendering, never shows anything to the end user.
  // =========================================================================
  function isDevMode() {
    try {
      var params = new URLSearchParams(window.location.search);
      if (params.has("debug")) return true;
      return (
        window.location.protocol === "file:" ||
        window.location.hostname === "localhost" ||
        window.location.hostname === "127.0.0.1"
      );
    } catch (e) {
      return false;
    }
  }

  // Paths whose keys happen to equal language codes but are NOT
  // translatable text (e.g. one file path per language) — skipped to
  // keep validator output meaningful rather than noisy.
  var VALIDATION_SKIP_PATHS = ["personal.cvFiles"];

  function warnMissing(path, lang, reason) {
    // eslint-disable-next-line no-console
    console.warn("[Translation Warning]\nMissing translation:\n" + path + "\nLanguage: " + lang + (reason ? " (" + reason + ")" : ""));
  }

  function validateNode(value, path, issues) {
    if (VALIDATION_SKIP_PATHS.indexOf(path) !== -1) return;

    if (looksLikeTranslationDict(value)) {
      var refValue = value[DEFAULT_LANG];
      var refIsArray = Array.isArray(refValue);
      LANG_CODES.forEach(function (code) {
        var v = value[code];
        if (!isNonEmpty(v)) {
          issues.push({ path: path, lang: code });
          return;
        }
        if (refIsArray && Array.isArray(v) && Array.isArray(refValue) && v.length !== refValue.length) {
          issues.push({ path: path, lang: code, reason: "array length " + v.length + " \u2260 " + refValue.length + " (en)" });
        }
      });
      return;
    }

    if (Array.isArray(value)) {
      value.forEach(function (item, idx) {
        var itemLabel = item && item.id ? item.id : String(idx);
        validateNode(item, path + "[" + itemLabel + "]", issues);
      });
      return;
    }

    if (value != null && typeof value === "object") {
      Object.keys(value).forEach(function (key) {
        validateNode(value[key], path ? path + "." + key : key, issues);
      });
    }
  }

  function validateCVData() {
    var issues = [];
    validateNode(CV_DATA, "CV_DATA", issues);
    return issues;
  }

  function validateUITranslations() {
    var issues = [];
    var reference = UI_TRANSLATIONS[DEFAULT_LANG];
    var refKeys = collectLeafPaths(reference, "");
    LANG_CODES.forEach(function (code) {
      if (code === DEFAULT_LANG) return;
      var dict = UI_TRANSLATIONS[code];
      if (!dict) {
        issues.push({ path: "UI_TRANSLATIONS", lang: code, reason: "entire language block missing" });
        return;
      }
      refKeys.forEach(function (keyPath) {
        var val = getByPath(dict, keyPath);
        if (!isNonEmpty(val)) issues.push({ path: "ui." + keyPath, lang: code });
      });
    });
    return issues;
  }

  function collectLeafPaths(obj, prefix) {
    var paths = [];
    Object.keys(obj || {}).forEach(function (key) {
      var value = obj[key];
      var full = prefix ? prefix + "." + key : key;
      if (value != null && typeof value === "object" && !Array.isArray(value)) {
        paths = paths.concat(collectLeafPaths(value, full));
      } else {
        paths.push(full);
      }
    });
    return paths;
  }

  function getByPath(obj, path) {
    var node = obj;
    var parts = path.split(".");
    for (var i = 0; i < parts.length; i++) {
      if (node == null) return undefined;
      node = node[parts[i]];
    }
    return node;
  }

  function runTranslationValidation() {
    if (!isDevMode()) return;
    try {
      var cvIssues = validateCVData();
      var uiIssues = validateUITranslations();
      var all = cvIssues.concat(uiIssues);
      if (all.length === 0) {
        console.info("[Translation Check] All " + LANG_CODES.length + " languages complete across CV_DATA and UI_TRANSLATIONS.");
        return;
      }
      console.groupCollapsed("[Translation Check] " + all.length + " issue(s) found across " + LANG_CODES.length + " languages (dev mode only)");
      all.forEach(function (issue) { warnMissing(issue.path, issue.lang, issue.reason); });
      console.groupEnd();
    } catch (e) {
      // Validation must never break the page.
      console.warn("[Translation Check] validator error:", e);
    }
  }

  /* ---------------------------------------------------------------------
   * Init
   * ------------------------------------------------------------------- */
  document.addEventListener("DOMContentLoaded", function () {
    setTheme(detectInitialTheme());
    buildLangMenu();
    setLanguage(detectInitialLang(), false);

    document.getElementById("lang-toggle").addEventListener("click", toggleLangMenu);
    document.getElementById("theme-toggle").addEventListener("click", toggleTheme);
    initOutsideClicks();
    initLangMenuKeys();
    initHeaderScroll();
    initMobileNav();
    initContactForm();
    initCopyAttribution();
    initFooterYear();
    observeReveal(document.querySelectorAll(".reveal"));
    runTranslationValidation();

    window.addEventListener("load", function () {
      setTimeout(function () { document.getElementById("loading-screen").classList.add("hidden"); }, 250);
    });
    if (document.readyState === "complete") {
      document.getElementById("loading-screen").classList.add("hidden");
    }
  });
})();
