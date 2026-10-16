// Filtering for the picture book browser. The page works without this script (all books are visible);
// the script adds the shelves, tag filters, search, and "Read more" toggles.
(function () {
  var grid = document.getElementById("grid");
  if (!grid) return;

  var books = Array.prototype.slice.call(grid.querySelectorAll(".book"));
  var shelfBtns = Array.prototype.slice.call(document.querySelectorAll(".shelf-btn"));
  var chips = Array.prototype.slice.call(document.querySelectorAll(".chip"));
  var clearBtn = document.querySelector(".clear");
  var resetBtn = document.getElementById("reset");
  var empty = document.getElementById("empty");
  var status = document.getElementById("status");
  var input = document.getElementById("q");
  var total = books.length;

  var shelfNames = {};
  shelfBtns.forEach(function (b) { shelfNames[b.dataset.shelf] = b.textContent.replace(/\s*\d+\s*$/, "").trim(); });

  var state = { shelf: "start", tags: [], q: "" };

  function matches(book) {
    var s = state.shelf;
    if (!state.q) {
      if (s === "start" && book.dataset.featured !== "1") return false;
      if (s !== "start" && s !== "all" && book.dataset.shelf !== s) return false;
    } else if (s !== "start" && s !== "all" && book.dataset.shelf !== s) {
      return false;
    }
    if (state.tags.length) {
      var have = book.dataset.tags.split("|");
      for (var i = 0; i < state.tags.length; i++) if (have.indexOf(state.tags[i]) === -1) return false;
    }
    if (state.q) {
      var words = state.q.toLowerCase().replace(/[\u2018\u2019]/g, "'").replace(/[\u201c\u201d]/g, '"').split(/\s+/).filter(Boolean);
      for (var j = 0; j < words.length; j++) if (book.dataset.search.indexOf(words[j]) === -1) return false;
    }
    return true;
  }

  function render() {
    var shown = 0;
    books.forEach(function (b) {
      var ok = matches(b);
      b.hidden = !ok;
      if (ok) shown++;
    });
    shelfBtns.forEach(function (b) { b.setAttribute("aria-pressed", String(b.dataset.shelf === state.shelf)); });
    chips.forEach(function (c) { c.setAttribute("aria-pressed", String(state.tags.indexOf(c.dataset.tag) !== -1)); });
    clearBtn.hidden = !(state.tags.length || state.q);
    empty.hidden = shown !== 0;
    grid.hidden = shown === 0;

    var where = state.shelf === "start" ? "in Start here" : state.shelf === "all" ? "" : "on the " + shelfNames[state.shelf] + " shelf";
    var parts = [];
    if (state.q) parts.push("matching “" + state.q + "”");
    if (state.tags.length) parts.push("tagged " + state.tags.join(" and "));
    status.textContent = "Showing " + shown + " of " + total + " manuscripts" + (where ? " " + where : "") + (parts.length ? ", " + parts.join(", ") : "") + ".";
    updateClamps();
  }

  // "Read more" appears only when the text is actually cut off.
  function updateClamps() {
    books.forEach(function (b) {
      if (b.hidden) return;
      var p = b.querySelector(".blurb"), btn = b.querySelector(".more");
      if (b.classList.contains("open")) { btn.hidden = false; return; }
      btn.hidden = !(p.scrollHeight > p.clientHeight + 1);
    });
  }

  shelfBtns.forEach(function (b) {
    b.addEventListener("click", function () { state.shelf = b.dataset.shelf; render(); });
  });
  chips.forEach(function (c) {
    c.addEventListener("click", function () {
      var i = state.tags.indexOf(c.dataset.tag);
      if (i === -1) state.tags.push(c.dataset.tag); else state.tags.splice(i, 1);
      render();
    });
  });
  input.addEventListener("input", function () {
    state.q = input.value.trim();
    if (state.q && state.shelf === "start") state.shelf = "all";   // searching the 8 featured titles alone would hide matches
    render();
  });
  function resetAll() { state = { shelf: "all", tags: [], q: "" }; input.value = ""; render(); }
  clearBtn.addEventListener("click", function () { state.tags = []; state.q = ""; input.value = ""; render(); });
  resetBtn.addEventListener("click", resetAll);

  grid.addEventListener("click", function (e) {
    var btn = e.target.closest(".more");
    if (!btn) return;
    var book = btn.closest(".book");
    var open = book.classList.toggle("open");
    btn.setAttribute("aria-expanded", String(open));
    btn.textContent = open ? "Show less" : "Read more";
  });

  var t;
  window.addEventListener("resize", function () { clearTimeout(t); t = setTimeout(updateClamps, 150); });
  if (document.fonts && document.fonts.ready) document.fonts.ready.then(updateClamps);

  render();
})();
