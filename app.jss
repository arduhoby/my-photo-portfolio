// Cloudinary ve Supabase ayarları (ücretsiz demo)
const CLOUD_NAME  = 'demo'; // kendi hesabınızı açın
const UPLOAD_PRESET = 'ml_default';

document.getElementById('uploadBtn').onclick = () =>
  document.getElementById('uploadForm').style.display = 'block';

document.getElementById('uploadForm').addEventListener('submit', async e => {
  e.preventDefault();
  const file   = document.getElementById('fileInput').files[0];
  const tags   = document.getElementById('tags').value;
  const date   = document.getElementById('shotDate').value || new Date().toISOString().slice(0,10);

  // 1) Cloudinary yükle (anonim demo)
  const fd = new FormData();
  fd.append('file', file);
  fd.append('upload_preset', UPLOAD_PRESET);
  const {secure_url} = await fetch(`https://api.cloudinary.com/v1_1/${CLOUD_NAME}/image/upload`,{method:'POST',body:fd}).then(r=>r.json());

  // 2) Galeriye ekle
  const img = document.createElement('div');
  img.className = 'card';
  img.innerHTML = `
    <img src="${secure_url}" alt="">
    <small>${tags} – ${date}</small>
  `;
  document.getElementById('gallery').appendChild(img);

  // Formu temizle
  e.target.reset();
  e.target.style.display = 'none';
});
