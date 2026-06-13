(function () {
  "use strict";

  var SUBJECT_OPTIONS = [
    { group: "IT Services", value: "Network & Connectivity Support" },
    { group: "IT Services", value: "Emergency Onsite Dispatch" },
    { group: "IT Services", value: "Cat5/Cat6 Cabling" },
    { group: "IT Services", value: "Desktop & Server Support" },
    { group: "IT Services", value: "VOIP Phone Support" },
    { group: "IT Services", value: "Networking Issues" },
    { group: "Software Services", value: "Custom Software Development" },
    { group: "Software Services", value: "Application Support" },
    { group: "Software Services", value: "UI/UX Design" },
    { group: "Software Services", value: "Cloud & DevOps" },
    { group: "Software Services", value: "AI & Machine Learning" },
    { group: "Software Services", value: "Web Security" },
    { value: "General Inquiry" },
  ];

  function buildSubjectSelect(placeholder) {
    var select = document.createElement("select");
    select.name = "subject";
    select.className = "select_js wide";
    select.required = true;

    var empty = document.createElement("option");
    empty.value = "";
    empty.textContent = placeholder;
    select.appendChild(empty);

    var groups = {};
    SUBJECT_OPTIONS.forEach(function (item) {
      if (item.group) {
        if (!groups[item.group]) {
          groups[item.group] = document.createElement("optgroup");
          groups[item.group].label = item.group;
          select.appendChild(groups[item.group]);
        }
        var opt = document.createElement("option");
        opt.value = item.value;
        opt.textContent = item.value;
        groups[item.group].appendChild(opt);
      } else {
        var single = document.createElement("option");
        single.value = item.value;
        single.textContent = item.value;
        select.appendChild(single);
      }
    });

    return select;
  }

  function replaceLegacyNiceSelect(container, placeholder) {
    if (!container) return;
    if (container.querySelector("select[name='subject']")) {
      return;
    }
    var legacy = container.querySelector(".nice-select:not(select)");
    if (!legacy) return;
    var select = buildSubjectSelect(placeholder);
    legacy.replaceWith(select);
  }

  function cleanupSubjectFields(form) {
    if (!form) return;
    var selects = form.querySelectorAll("select[name='subject']");
    for (var i = 1; i < selects.length; i++) {
      selects[i].remove();
    }
    var keep = form.querySelector("select[name='subject']");
    if (keep && window.jQuery && jQuery.fn.niceSelect) {
      jQuery(keep).niceSelect("destroy");
    }
    form.querySelectorAll(".nice-select:not(select)").forEach(function (node) {
      node.remove();
    });
  }

  function initNiceSelects() {
    if (window.jQuery && jQuery.fn.niceSelect) {
      jQuery("select.select_js").each(function () {
        var $el = jQuery(this);
        if ($el.next(".nice-select").length) {
          return;
        }
        $el.niceSelect();
      });
    }
  }

  function boot() {
    document.querySelectorAll("form.form-contact-us, #contactform").forEach(function (form) {
      cleanupSubjectFields(form);
    });    replaceLegacyNiceSelect(
      document.querySelector("#contactform.style-bg-dark-2"),
      "How can we help you?"
    );
    replaceLegacyNiceSelect(
      document.querySelector(
        "#contactform.form-contact-us:not(.sidebar-form):not(.style-bg-dark-2)"
      ),
      "Choose Services"
    );
    document.querySelectorAll("form.form-contact-us.sidebar-form").forEach(function (form) {
      replaceLegacyNiceSelect(form, "Subject");
    });
    initNiceSelects();
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", boot);
  } else {
    boot();
  }
})();
