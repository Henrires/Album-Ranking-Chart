let curTheme = "dark-theme" 

function tier(v){
  if(v === null || v === undefined) return "empty";
  if(v >= 9.7) return "cinema";
  if(v >= 9.0) return "awesome";
  if(v >= 8.0) return "great";
  if(v >= 7.0) return "good";
  if(v >= 5.0) return "regular";
  if(v >= 3.0) return "bad";
  return "garbage";
}

function renderAlbum(album){
  document.getElementById("empty-state").style.display = "none";
  document.querySelector(".poster").classList.remove("hidden");

  // meta
  document.getElementById("cover-img").src =
    album.coverArt || `https://placehold.co/500x500/1a1c1e/f2f0ea?text=${encodeURIComponent(album.title || "Album")}`;
  document.getElementById("album-title").textContent = album.title || "Untitled Album";
  document.getElementById("album-artist").textContent = album.artist || "";
  document.getElementById("album-year").textContent = album.year || "";

  // overall score — computed from track ratings, never stored
  const rated = (album.tracks || []).filter(t => t.rating !== null && t.rating !== undefined);
  const overall = rated.length
    ? rated.reduce((sum, t) => sum + t.rating, 0) / rated.length
    : null;
  document.getElementById("overall-score").textContent = overall !== null ? overall.toFixed(2) : "–";

  // tracklist
  const list = document.getElementById("tracklist");
  list.innerHTML = "";
  (album.tracks || []).forEach(t => {
    const row = document.createElement("div");
    row.className = "track";

    const num = document.createElement("div");
    num.className = "num";
    num.textContent = t.position;

    const trackName = document.createElement("div");
    trackName.className = "name";
    trackName.textContent = t.name;

    const ratingBox = document.createElement("div");
    ratingBox.className = `rating ${tier(t.rating)}`;
    if(t.rating !== null && t.rating !== undefined) ratingBox.textContent = t.rating.toFixed(1);

    row.appendChild(num);
    row.appendChild(trackName);
    row.appendChild(ratingBox);
    list.appendChild(row);
  });

  // notes
  const notesList = document.getElementById("notes-list");
  notesList.innerHTML = "";
  if(album.notes && album.notes.length){
    document.querySelector(".notes").style.display = "";
    album.notes.forEach(n => {
      const li = document.createElement("li");
      li.textContent = n;
      notesList.appendChild(li);
    });
  } else {
    document.querySelector(".notes").style.display = "none";
  }
}

// ---------- drag & drop / file picker wiring ----------
const fileInput = document.getElementById("file-input");
const loadBtn = document.getElementById("load-btn");

function loadJsonFile(file){
  if(!file){ return; }
  const reader = new FileReader();
  reader.onload = e => {
    try{
      const data = JSON.parse(e.target.result);
      renderAlbum(data);
    }catch(err){
      alert("Couldn't read that file — make sure it's valid JSON matching the album schema.");
      console.error(err);
    }
  };
  reader.readAsText(file);
}

loadBtn.addEventListener("click", () => fileInput.click());
fileInput.addEventListener("change", () => loadJsonFile(fileInput.files[0]));

// to change between light or dark
// :root is CSS's name for documentElement (<html>), but we don't use it anymore 
// we now target documentElement directly from JS instead (DOM)
// changing className replaces the whole class attribute
// elements find var(--x) by walking up the DOM until they find where it's defined;
// since none of them define these variables locally, they all walk up to <html>
// and use whatever class is currently active there
document.getElementById('dark-or-light-btn').addEventListener('click', () => {
  console.log('clicked!');
  if (curTheme === "dark-theme") {
   curTheme = "light-theme";
  } else if (curTheme === "light-theme") {
    curTheme = "dark-theme";
  }
 document.documentElement.className = curTheme;
});

// set first
document.documentElement.className = curTheme;