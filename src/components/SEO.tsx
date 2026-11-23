import React, { useEffect } from 'react';
import { useRouter } from '../context/RouterContext';

export const SEO: React.FC = () => {
  const { currentPath, routeInfo } = useRouter();

  useEffect(() => {
    let title = 'Fentoph - Kelajak Texnologiyalari va Intellektual Ekotizimi';
    let description = "Fentoph - Moliya, elektron tijorat, kiberxavfsizlik va sun'iy intellekt texnologiyalarining yagona raqamli makoni.";

    if (currentPath === '/') {
      title = 'Fentoph - Kelajak Texnologiyalari va Raqamli Ekotizimi';
    } else if (currentPath === '/founder' || currentPath === '/asoschi') {
      title = 'Asoschi - Aslbek Qo\'ziboyev | Fentoph Group';
      description = "Fentoph asoschisi va bosh tizim arxitektori Aslbek Qo'ziboyev haqida. Falsafa, muhandislik qarashlari, Xiva R&D markazi va loyihalar.";
    } else if (currentPath === '/portfolio') {
      title = 'Portfolio - Fentoph Texnologik Loyihalari va Mahsulotlari';
      description = "Fentoph tomonidan ishlab chiqilgan Finilya, EskiBozor, Fsent, Phentist AI va Fentoph ID loyihalari arxitekturasi va portfoliyasi.";
    } else if (currentPath.startsWith('/products')) {
      if (routeInfo.params.id) {
        title = `${routeInfo.params.id.toUpperCase()} - Fentoph Mahsuloti`;
      } else {
        title = 'Fentoph Mahsulotlari - Finilya, EskiBozor, Fsent, Phentist';
      }
    } else if (currentPath.startsWith('/solutions')) {
      if (routeInfo.params.id) {
        title = 'Biznes Yechim - Fentoph Enterprise Solutions';
      } else {
        title = 'Fentoph Yechimlari - Raqamli Moliya, Savdo va AI';
      }
    } else if (currentPath.startsWith('/blog')) {
      if (routeInfo.params.slug) {
        title = 'Maqola - Fentoph Rasmiy Blogi';
      } else {
        title = 'Fentoph Blog & Engineering - Tahliliy Maqolalar';
      }
    } else if (currentPath === '/about') {
      title = 'Kompaniya Haqida - Fentoph Tarixi, Missiyasi va Jamoasi';
    } else if (currentPath === '/careers') {
      title = 'Karyera Markazi - Fentoph Jamoasiga Qo\'shiling';
    } else if (currentPath === '/contact') {
      title = 'Aloqa va Qo\'llab-quvvatlash - Fentoph Ofisi';
    } else if (currentPath === '/security') {
      title = 'Xavfsizlik Markazi - Fentoph Trust & Zero-Knowledge';
    } else if (currentPath.startsWith('/docs')) {
      title = 'Dasturchilar Hujjatlari - Fentoph Developer Docs & API';
    } else if (currentPath === '/login') {
      title = 'Kirish - Fentoph ID Yagona Autentifikatsiya';
    } else if (currentPath === '/register') {
      title = 'Hisob Ochish - Fentoph ID';
    } else if (currentPath === '/verify-email') {
      title = 'Pochtani Tasdiqlash - Fentoph ID';
    } else if (currentPath === '/forgot-password') {
      title = 'Parolni Tiklash - Fentoph ID';
    } else if (currentPath === '/dashboard') {
      title = 'Boshqaruv Paneli (Dashboard) - Fentoph Shaxsiy Kabinet';
    } else if (currentPath === '/admin') {
      title = 'Admin Panel - Fentoph Management Center';
    } else if (currentPath === '/privacy') {
      title = 'Maxfiylik Siyosati - Fentoph Group';
    } else if (currentPath === '/terms') {
      title = 'Foydalanish Shartlari - Fentoph Group';
    } else if (currentPath === '/cookies') {
      title = 'Cookie Siyosati - Fentoph Group';
    }

    document.title = title;

    // Update meta description
    const metaDesc = document.querySelector('meta[name="description"]');
    if (metaDesc) {
      metaDesc.setAttribute('content', description);
    }

    // Update Open Graph tags dynamically
    const ogTitle = document.querySelector('meta[property="og:title"]');
    if (ogTitle) ogTitle.setAttribute('content', title);

    const ogUrl = document.querySelector('meta[property="og:url"]');
    if (ogUrl) ogUrl.setAttribute('content', window.location.href);

    // Update Canonical URL dynamically
    let canonical = document.querySelector('link[rel="canonical"]');
    if (canonical) {
      canonical.setAttribute('href', window.location.origin + currentPath);
    }
  }, [currentPath, routeInfo]);

  return null;
};
