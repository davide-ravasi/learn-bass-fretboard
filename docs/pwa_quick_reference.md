# 🚀 PWA Quick Reference Cheat Sheet

## 📱 Essential Commands

```bash
# Install PWA dependencies
npm install vite-plugin-pwa workbox-window

# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

## 🔧 Key Configuration Files

### **vite.config.ts**

```typescript
import { VitePWA } from "vite-plugin-pwa";

VitePWA({
  registerType: "autoUpdate",
  workbox: {
    globPatterns: ["**/*.{js,css,html,ico,png,svg}"],
  },
  manifest: {
    name: "Your App Name",
    short_name: "App",
    theme_color: "#4caf50",
    display: "standalone",
  },
});
```

### **index.html Meta Tags**

```html
<meta name="theme-color" content="#4caf50" />
<meta name="apple-mobile-web-app-capable" content="yes" />
<meta name="apple-mobile-web-app-title" content="AppName" />
<link rel="apple-touch-icon" href="/apple-touch-icon.png" />
<link rel="manifest" href="/manifest.json" />
```

## 🎯 PWA Manifest Properties

| Property           | Value        | Description                |
| ------------------ | ------------ | -------------------------- |
| `name`             | String       | Full app name              |
| `short_name`       | String       | Short name for home screen |
| `display`          | `standalone` | Hide browser UI            |
| `orientation`      | `portrait`   | Mobile orientation         |
| `theme_color`      | Hex          | Browser theme color        |
| `background_color` | Hex          | Splash screen color        |

## 🧪 Testing Checklist

- [ ] Install prompt appears
- [ ] Service worker registered
- [ ] Manifest loads correctly
- [ ] Icons display properly
- [ ] Works offline
- [ ] Mobile responsive

## 🔍 Debug Commands

```bash
# Check PWA status in Chrome DevTools
# Application > Manifest
# Application > Service Workers
# Lighthouse > PWA audit
```

## 📚 Essential Links

- [PWA Fundamentals](https://web.dev/pwa-fundamentals/)
- [Vite PWA Plugin](https://vite-pwa-org.netlify.app/)
- [MDN PWA Guide](https://developer.mozilla.org/en-US/docs/Web/Progressive_web_apps)
- [Lighthouse PWA](https://developers.google.com/web/tools/lighthouse)

## 🎨 Icon Requirements

- **192x192** px (Android)
- **512x512** px (Android)
- **180x180** px (iOS)
- **PNG format** recommended

## 🚀 Deployment Checklist

- [ ] HTTPS enabled
- [ ] Service worker working
- [ ] Manifest valid
- [ ] Icons uploaded
- [ ] PWA audit passed
- [ ] Mobile tested

