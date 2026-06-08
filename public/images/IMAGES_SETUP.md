# Hero Images Setup

## Required Images

Please add the following images to this directory (`public/images/`):

1. **solar-panels.jpg** - The solar panel with white hard hat image
2. **electrician.jpg** - The electrician working on electrical panel image
3. **power-lines.jpg** - The lineman working on power lines image

## Image Specifications

- **Format**: JPG or PNG
- **Recommended Size**: 1200x800px or larger
- **Aspect Ratio**: 3:2 or 4:3
- **File Size**: Optimized for web (under 500KB per image)

## How to Add Images

1. Save the three images you provided to this folder
2. Rename them as:
   - `solar-panels.jpg`
   - `electrician.jpg`
   - `power-lines.jpg`
3. The website will automatically display them in the hero carousel

## Temporary Placeholder

Until you add the images, the hero section will show a gradient background with the text content.

## Adding More Images

To add more images to the carousel:
1. Add new images to this folder
2. Update `components/Hero.tsx` and add the filename to the `heroImages` array:

```typescript
const heroImages = [
  '/images/solar-panels.jpg',
  '/images/electrician.jpg',
  '/images/power-lines.jpg',
  '/images/your-new-image.jpg', // Add here
];
```
