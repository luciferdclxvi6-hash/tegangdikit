const PASSWORD = "12345";

// ================= DATABASE =================
let savedData = localStorage.getItem("videos");

let database = savedData ? JSON.parse(savedData) : {
  artis: [],
  tiktok: [],
  mahasiswa: [],
  pacar: [],
  tante: []
};

// pastikan semua kategori ada
["artis","tiktok","mahasiswa","pacar","tante"].forEach(k => {
  if (!database[k]) database[k] = [];
});

// ================= ADMIN LOGIN =================
function loginAdmin() {
  const pass = document.getElementById("adminPass").value;

  if (pass === PASSWORD) {
    document.getElementById("adminPanel").style.display = "block";
    document.getElementById("loginBox").style.display = "none";
  } else {
    alert("Password salah!");
  }
}

// ================= UPLOAD =================
function uploadVideo() {
  const src = document.getElementById("videoSrc").value;
  const kategori = document.getElementById("videoKategori").value;

  if (!src) {
    alert("Masukkan link video!");
    return;
  }

  database[kategori].push({
    title: "Video Baru",
    src: src
  });

  localStorage.setItem("videos", JSON.stringify(database));

  tampilkanVideo(getSemuaVideo());

  document.getElementById("videoSrc").value = "";
}

// ================= GET SEMUA =================
function getSemuaVideo() {
  let semua = [];

  for (let kategori in database) {
    database[kategori].forEach(video => {
      semua.push({
        kategori: kategori,
        title: video.title,
        src: video.src
      });
    });
  }

  return semua;
}

// ================= TAMPIL =================
function tampilkanVideo(data) {
  const container = document.getElementById("videoList");
  container.innerHTML = "";

  data.forEach((video, index) => {
    container.innerHTML += `
      <div class="card" onclick="playVideo('${video.src}')">
        <video>
          <source src="${video.src}" type="video/mp4">
        </video>
        <p>${index + 1}. ${video.title}</p>
        <small>${video.kategori}</small>
      </div>
    `;
  });
}

// ================= PLAYER =================
function playVideo(src) {
  const player = document.getElementById("player");
  const mainVideo = document.getElementById("mainVideo");

  player.style.display = "block";
  mainVideo.src = src;
  mainVideo.play();

  window.scrollTo({ top: 0, behavior: "smooth" });
}

function tutupPlayer() {
  document.getElementById("player").style.display = "none";
}

// ================= FILTER =================
function filterVideo(kategori) {
  if (kategori === "all") {
    tampilkanVideo(getSemuaVideo());
  } else {
    const hasil = database[kategori].map(v => ({
      kategori: kategori,
      title: v.title,
      src: v.src
    }));

    tampilkanVideo(hasil);
  }
}

// ================= LOAD =================
tampilkanVideo(getSemuaVideo());