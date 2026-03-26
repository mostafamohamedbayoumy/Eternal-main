// Local flower data with images, descriptions, colors, and pricing
// This serves as the single source of truth for the Single Flowers page,
// working independently of the backend API.

import dahliaImg from '../assets/flowers/dahlia.jpeg';
import valentineRoseImg from '../assets/flowers/valentinerose.jpeg';
import hibiscusImg from '../assets/flowers/hibiscus.jpeg';
import lotusImg from '../assets/flowers/lotus.jpeg';
import swirlRoseImg from '../assets/flowers/swirlrose.jpeg';
import tulipImg from '../assets/flowers/tulip.jpeg';
import calaLiliesImg from '../assets/flowers/colalilies.jpeg';
import largeCalaLilyImg from '../assets/flowers/largecolalilies.jpeg';
import hybridRoseImg from '../assets/flowers/hybridrose.jpeg';
import roseImg from '../assets/flowers/rose.jpeg';
import babyFlowersImg from '../assets/flowers/babyflowers.jpeg';
import peonyImg from '../assets/flowers/peoney.jpeg';
import orchidImg from '../assets/flowers/orchid.jpeg';
import daffodilImg from '../assets/flowers/Daffodil.jpeg';
import trumpetLilyImg from '../assets/flowers/trumpetlilies.jpeg';
import hydrangeasImg from '../assets/flowers/hydrangeas.jpeg';

const flowerData = [
  {
    id: 'dahlia',
    name: 'Eternal Dahlia',
    description:
      'Stunning handmade eternal dahlia in rich purple velvet. A bold and elegant statement flower that lasts forever. Each petal is meticulously crafted to capture the full, lush beauty of a real dahlia bloom.',
    image: dahliaImg,
    price: 50,
    greeneryPrice: 10,
    hasGreeneryOption: true,
    colors: [
      { name: 'Purple', hex: '#6B2D8B' },
      { name: 'Blush Pink', hex: '#E8B4C8' },
      { name: 'Burgundy', hex: '#722F37' },
      { name: 'White', hex: '#F5F5F0' },
      { name: 'Coral', hex: '#E87461' },
    ],
  },
  {
    id: 'valentine-rose',
    name: 'Eternal Valentine Rose',
    description:
      'Romantic handmade eternal rose in deep burgundy velvet with rosebud detail. The perfect symbol of love. Featuring a full bloom head with delicate layered petals and lush green leaves along the stem.',
    image: valentineRoseImg,
    price: 55,
    greeneryPrice: 10,
    hasGreeneryOption: true,
    colors: [
      { name: 'Burgundy', hex: '#722F37' },
      { name: 'Classic Red', hex: '#C41E3A' },
      { name: 'Dusty Rose', hex: '#C4A4A7' },
      { name: 'Deep Pink', hex: '#C2185B' },
      { name: 'Black', hex: '#2C2C2C' },
    ],
  },
  {
    id: 'hibiscus',
    name: 'Eternal Hibiscus',
    description:
      'Vibrant handmade eternal hibiscus in sunny yellow. A tropical beauty that brings warmth to any space. The wide open petals and distinctive stamen are hand-shaped to mirror the exotic charm of a real hibiscus.',
    image: hibiscusImg,
    price: 48,
    greeneryPrice: 10,
    hasGreeneryOption: true,
    colors: [
      { name: 'Sunny Yellow', hex: '#F4D03F' },
      { name: 'Coral Orange', hex: '#E8734A' },
      { name: 'Hot Pink', hex: '#E91E90' },
      { name: 'Red', hex: '#D32F2F' },
      { name: 'Peach', hex: '#FADADD' },
    ],
  },
  {
    id: 'lotus',
    name: 'Eternal Lotus',
    description:
      'Exquisite handmade eternal lotus in deep magenta with soft pink center and green leaves. A symbol of purity and grace. This striking piece features layered petals radiating around a delicate stamen center.',
    image: lotusImg,
    price: 60,
    greeneryPrice: 10,
    hasGreeneryOption: true,
    colors: [
      { name: 'Magenta', hex: '#9B1B5E' },
      { name: 'Soft Pink', hex: '#F8C8DC' },
      { name: 'White', hex: '#F5F5F0' },
      { name: 'Lavender', hex: '#B39DDB' },
      { name: 'Blush', hex: '#F4C2C2' },
    ],
  },
  {
    id: 'swirl-rose',
    name: 'Eternal Swirl Rose',
    description:
      'Charming handmade eternal swirl rose in bright red-orange with delicate leaf detail. Petite and perfect. A miniature bloom with tightly spiraled petals that add a pop of color to any arrangement.',
    image: swirlRoseImg,
    price: 40,
    greeneryPrice: 10,
    hasGreeneryOption: true,
    colors: [
      { name: 'Red Orange', hex: '#E44D2E' },
      { name: 'Soft Pink', hex: '#F8C8DC' },
      { name: 'Yellow', hex: '#F7DC6F' },
      { name: 'Peach', hex: '#FADADD' },
      { name: 'Lavender', hex: '#B39DDB' },
    ],
  },
  {
    id: 'tulip',
    name: 'Eternal Tulip',
    description:
      'Elegant handmade eternal tulip in soft pink velvet. A timeless classic with graceful form. The smooth, cupped petals sit atop a sturdy stem with rich green sepals, capturing the simplicity and beauty of spring.',
    image: tulipImg,
    price: 42,
    greeneryPrice: 10,
    hasGreeneryOption: true,
    colors: [
      { name: 'Soft Pink', hex: '#F0B5C4' },
      { name: 'Red', hex: '#D32F2F' },
      { name: 'Yellow', hex: '#F7DC6F' },
      { name: 'White', hex: '#F5F5F0' },
      { name: 'Purple', hex: '#7B1FA2' },
      { name: 'Orange', hex: '#F4811F' },
    ],
  },
  {
    id: 'cala-lilies',
    name: 'Eternal Cala Lilies',
    description:
      'Delicate handmade eternal cala lilies in white with yellow centers. A pair of graceful blooms on a single stem. These elegant trumpet-shaped flowers embody sophistication and are a timeless symbol of beauty.',
    image: calaLiliesImg,
    price: 52,
    greeneryPrice: 10,
    hasGreeneryOption: true,
    colors: [
      { name: 'White', hex: '#F5F5F0' },
      { name: 'Blush Pink', hex: '#F4C2C2' },
      { name: 'Deep Purple', hex: '#4A148C' },
      { name: 'Yellow', hex: '#F7DC6F' },
      { name: 'Burgundy', hex: '#722F37' },
    ],
  },
  {
    id: 'large-cala-lily',
    name: 'Eternal Large Cala Lily',
    description:
      'Dramatic handmade eternal cala lily in deep crimson red with elegant leaf detail. A bold and stunning statement piece. The large, sculptural petal wraps gracefully, making this a truly eye-catching flower.',
    image: largeCalaLilyImg,
    price: 58,
    greeneryPrice: 10,
    hasGreeneryOption: true,
    colors: [
      { name: 'Crimson Red', hex: '#8B0000' },
      { name: 'White', hex: '#F5F5F0' },
      { name: 'Black', hex: '#2C2C2C' },
      { name: 'Plum', hex: '#6A1B5E' },
      { name: 'Burnt Orange', hex: '#CC5500' },
    ],
  },
  {
    id: 'hybrid-rose',
    name: 'Eternal Hybrid Rose',
    description:
      'Beautiful handmade eternal hybrid rose in soft pink with delicate stamen details. A unique and romantic bloom. Its open-faced petals and visible center give it a wild, garden-fresh appearance.',
    image: hybridRoseImg,
    price: 50,
    greeneryPrice: 10,
    hasGreeneryOption: true,
    colors: [
      { name: 'Soft Pink', hex: '#F48FB1' },
      { name: 'Peach', hex: '#FFCCBC' },
      { name: 'Lavender', hex: '#CE93D8' },
      { name: 'White', hex: '#F5F5F0' },
      { name: 'Coral', hex: '#E87461' },
    ],
  },
  {
    id: 'rose',
    name: 'Eternal Rose',
    description:
      'Classic handmade eternal rose in deep burgundy velvet with lush leaves. A timeless symbol of beauty and love. The rich, full bloom and dark green foliage make this our most beloved and iconic flower.',
    image: roseImg,
    price: 45,
    greeneryPrice: 10,
    hasGreeneryOption: true,
    colors: [
      { name: 'Burgundy', hex: '#722F37' },
      { name: 'Classic Red', hex: '#C41E3A' },
      { name: 'Soft Pink', hex: '#F8C8DC' },
      { name: 'White', hex: '#F5F5F0' },
      { name: 'Peach', hex: '#FADADD' },
      { name: 'Yellow', hex: '#F7DC6F' },
    ],
  },
  {
    id: 'baby-flowers',
    name: 'Eternal Baby Flowers',
    description:
      'Dainty handmade eternal baby flowers in white with tiny buds on a single stem. Perfect as an accent or filler. These delicate blossoms add a gentle, airy quality to any bouquet or standalone arrangement.',
    image: babyFlowersImg,
    price: 35,
    greeneryPrice: 10,
    hasGreeneryOption: true,
    colors: [
      { name: 'White', hex: '#F5F5F0' },
      { name: 'Blush Pink', hex: '#F4C2C2' },
      { name: 'Lavender', hex: '#D1C4E9' },
      { name: 'Baby Blue', hex: '#B3E5FC' },
      { name: 'Butter Yellow', hex: '#FFF9C4' },
    ],
  },
  {
    id: 'peony',
    name: 'Eternal Peony',
    description:
      'Luxurious handmade eternal peony in rich crimson red with creamy stamen center. Full, romantic, and breathtaking. The dense, ruffled petals create a voluptuous bloom that commands attention in any setting.',
    image: peonyImg,
    price: 55,
    greeneryPrice: 10,
    hasGreeneryOption: true,
    colors: [
      { name: 'Crimson Red', hex: '#8B0000' },
      { name: 'Blush Pink', hex: '#F8C8DC' },
      { name: 'White', hex: '#F5F5F0' },
      { name: 'Coral', hex: '#E87461' },
      { name: 'Mauve', hex: '#B784A7' },
    ],
  },
  {
    id: 'orchid',
    name: 'Eternal Orchid',
    description:
      'Exotic handmade eternal orchid in deep red with a cream and burgundy center. Sophisticated and striking. The broad petals and intricate labellum showcase the orchid\'s iconic shape with handcrafted precision.',
    image: orchidImg,
    price: 52,
    greeneryPrice: 10,
    hasGreeneryOption: true,
    colors: [
      { name: 'Deep Red', hex: '#9B1B30' },
      { name: 'White', hex: '#F5F5F0' },
      { name: 'Purple', hex: '#7B1FA2' },
      { name: 'Blush Pink', hex: '#F4C2C2' },
      { name: 'Yellow', hex: '#F7DC6F' },
    ],
  },
  {
    id: 'daffodil',
    name: 'Eternal Daffodil',
    description:
      'Cheerful handmade eternal daffodil in white and yellow. A bright herald of spring that never fades. The white outer petals frame a vibrant yellow cup, bringing optimism and sunshine to every display.',
    image: daffodilImg,
    price: 44,
    greeneryPrice: 10,
    hasGreeneryOption: true,
    colors: [
      { name: 'White & Yellow', hex: '#F7DC6F' },
      { name: 'All Yellow', hex: '#F4D03F' },
      { name: 'Orange & Yellow', hex: '#FFA726' },
      { name: 'White & Peach', hex: '#FFDAB9' },
    ],
  },
  {
    id: 'trumpet-lily',
    name: 'Eternal Trumpet Lily',
    description:
      'Graceful handmade eternal trumpet lily in pure white with dark burgundy stamens and green leaves. Majestic and serene. The wide, star-shaped petals open elegantly, creating a bloom of quiet grandeur.',
    image: trumpetLilyImg,
    price: 50,
    greeneryPrice: 10,
    hasGreeneryOption: true,
    colors: [
      { name: 'White', hex: '#F5F5F0' },
      { name: 'Soft Pink', hex: '#F8C8DC' },
      { name: 'Yellow', hex: '#F7DC6F' },
      { name: 'Orange', hex: '#FF8A65' },
      { name: 'Stargazer Pink', hex: '#C2185B' },
    ],
  },
  {
    id: 'hydrangeas',
    name: 'Eternal Hydrangeas',
    description:
      'Lush handmade eternal hydrangea cluster in vibrant yellow-green with pearl-like centers. Full and gorgeous. This abundant cluster of tiny blooms creates a show-stopping, rounded bouquet head.',
    image: hydrangeasImg,
    price: 65,
    greeneryPrice: 10,
    hasGreeneryOption: true,
    colors: [
      { name: 'Yellow Green', hex: '#C0CA33' },
      { name: 'Periwinkle Blue', hex: '#7986CB' },
      { name: 'Soft Pink', hex: '#F48FB1' },
      { name: 'White', hex: '#F5F5F0' },
      { name: 'Lavender', hex: '#B39DDB' },
    ],
  },
];

export default flowerData;

export const getFlowerById = (id) => {
  return flowerData.find((flower) => flower.id === id) || null;
};
