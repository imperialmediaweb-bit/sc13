// Optimizare imagini Cloudinary: cere de la CDN o variantă redimensionată și
// comprimată (f_auto = format modern, q_auto = compresie automată), în loc de
// originalul de mai mulți MB. Pentru alte URL-uri, întoarce neschimbat.
export function cldOpt(url: string, width = 800): string {
  if (!url.includes("res.cloudinary.com") || !url.includes("/upload/")) return url;
  // nu adăuga de două ori
  if (/\/upload\/[^/]*\b(f_auto|q_auto|w_\d+)/.test(url)) return url;
  return url.replace("/upload/", `/upload/f_auto,q_auto,w_${width}/`);
}

// Poster (primul cadru) pentru un video Cloudinary — jpg mic, ca să nu se
// descarce videoclipul până nu apasă cineva Play.
export function cldPoster(url: string, width = 800): string {
  if (!url.includes("res.cloudinary.com") || !url.includes("/upload/")) return "";
  return url
    .replace("/upload/", `/upload/so_0,f_jpg,q_auto,w_${width}/`)
    .replace(/\.(mp4|webm|mov|m4v|ogg)$/i, ".jpg");
}
