(function () {
  "use strict";

  var SUBJECT_OPTIONS = [
    "IT Infrastructure",
    "Cybersecurity",
    "Software Development",
    "General Inquiry",
  ];

  function getPlaceholder(form, select) {
    if (select) {
      var emptyOption = select.querySelector('option[value=""]');
      if (emptyOption && emptyOption.textContent) {
        return emptyOption.textContent.trim();
      }
    }
    if (form.classList.contains("style-bg-dark-2")) {
      return "How can we help you?";
    }
    if (form.classList.contains("sidebar-form")) {
      return "Subject";
    }
    return "Choose Services";
  }

  function syncSubjectSelect(select, placeholder) {
    if (!select) return;

    var current = select.value;
    select.innerHTML = "";

    var empty = document.createElement("option");
    empty.value = "";
    empty.textContent = placeholder;
    empty.disabled = true;
    empty.selected = true;
    select.appendChild(empty);

    SUBJECT_OPTIONS.forEach(function (value) {
      var opt = document.createElement("option");
      opt.value = value;
      opt.textContent = value;
      select.appendChild(opt);
    });

    if (SUBJECT_OPTIONS.indexOf(current) !== -1) {
      select.value = current;
    }
  }

  function createSubjectSelect(placeholder) {
    var select = document.createElement("select");
    select.name = "subject";
    select.className = "select_js wide";
    select.required = true;
    syncSubjectSelect(select, placeholder);
    return select;
  }

  function ensureSubjectSelect(form) {
    var select = form.querySelector("select[name='subject']");
    if (select) {
      syncSubjectSelect(select, getPlaceholder(form, select));
      return select;
    }

    var legacy = form.querySelector(".nice-select:not(select)");
    if (!legacy) return null;

    select = createSubjectSelect(getPlaceholder(form));
    legacy.replaceWith(select);
    return select;
  }

  function initSubjectSelect(select, form) {
    if (!select || !window.jQuery || !jQuery.fn.niceSelect) return;

    var $el = jQuery(select);
    if (!$el.hasClass("select_js")) {
      $el.addClass("select_js wide");
    }

    if ($el.next(".nice-select").length) {
      $el.niceSelect("destroy");
    }

    if (form) {
      form.querySelectorAll(".nice-select:not(select)").forEach(function (node) {
        node.remove();
      });
    }

    $el.niceSelect();
  }

  function boot() {
    document
      .querySelectorAll("form.form-contact-us, #contactform")
      .forEach(function (form) {
        var selects = form.querySelectorAll("select[name='subject']");
        for (var i = 1; i < selects.length; i++) {
          selects[i].remove();
        }

        var select = ensureSubjectSelect(form);
        if (select) {
          initSubjectSelect(select, form);
        }
      });
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", boot);
  } else {
    boot();
  }
})();
