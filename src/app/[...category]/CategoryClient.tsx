"use client";

import { useState, useMemo, use } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  ChevronRight, 
  SlidersHorizontal, 
  X, 
  Grid3X3,
  Heart
} from 'lucide-react';
import PromoBar from '@/components/PromoBar';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

// Dynamic Catch-all params using Promise style
interface CatchAllProps {
  params: Promise<{ category: string[] }>;
}

// Catalog Product Interface
interface CatalogProduct {
  id: string;
  title: string;
  price: number;
  oldPrice?: number;
  isSale?: boolean;
  isNew?: boolean;
  gender: 'men' | 'women' | 'unisex';
  type: 'clothing' | 'shoes' | 'accessories';
  subType: 't-shirts' | 'tights' | 'shorts' | 'bags' | 'socks' | 'outerwear';
  image: string;
  slug: string;
  sizes: string[];
  colors: { name: string; hex: string }[];
}

// Comprehensive Product Database for Listings
const catalogProducts: CatalogProduct[] = [
  {'id': 'real-prod-1', 'title': 'NEBULA WAFFLE TECH SHORTS, GUNMETAL', 'price': 45.0, 'oldPrice': 56.25, 'isSale': true, 'isNew': true, 'gender': 'men', 'type': 'clothing', 'subType': 'shorts', 'image': '/assets/images/products/real_prod_1.jpg', 'slug': 'nebula-waffle-tech-shorts-gunmetal', 'sizes': ['XS', 'S', 'M', 'L', 'XL'], 'colors': [{'name': 'Gunmetal', 'hex': '#111111'}]},
  {'id': 'real-prod-2', 'title': 'NEBULA DHOBI BOXY HOODIE, ASTRAL AURA', 'price': 48.95, 'oldPrice': undefined, 'isSale': false, 'isNew': false, 'gender': 'men', 'type': 'clothing', 'subType': 'outerwear', 'image': '/assets/images/products/real_prod_2.jpg', 'slug': 'nebula-dhobi-boxy-hoodie-astral-aura', 'sizes': ['XS', 'S', 'M', 'L', 'XL'], 'colors': [{'name': 'Black', 'hex': '#111111'}]},
  {'id': 'real-prod-3', 'title': 'NEBULA LIGHTWEIGHT TRAIL SNEAKER 2.0, LUNAR ROCK', 'price': 52.9, 'oldPrice': undefined, 'isSale': false, 'isNew': false, 'gender': 'men', 'type': 'shoes', 'subType': 't-shirts', 'image': '/assets/images/products/real_prod_3.jpg', 'slug': 'nebula-lightweight-trail-sneaker-2.0-lunar-rock', 'sizes': ['38', '39', '40', '41', '42', '43', '44', '45'], 'colors': [{'name': 'Black', 'hex': '#111111'}]},
  {'id': 'real-prod-4', 'title': 'NEBULA AIR SHORTS, MERMAID', 'price': 56.85, 'oldPrice': 71.06, 'isSale': true, 'isNew': false, 'gender': 'men', 'type': 'clothing', 'subType': 'shorts', 'image': '/assets/images/products/real_prod_4.jpg', 'slug': 'nebula-air-shorts-mermaid', 'sizes': ['XS', 'S', 'M', 'L', 'XL'], 'colors': [{'name': 'Mermaid', 'hex': '#111111'}]},
  {'id': 'real-prod-5', 'title': 'NEBULA DHOBI BOXY T-SHIRT, GUNMETAL', 'price': 60.8, 'oldPrice': undefined, 'isSale': false, 'isNew': false, 'gender': 'men', 'type': 'clothing', 'subType': 't-shirts', 'image': '/assets/images/products/real_prod_5.jpg', 'slug': 'nebula-dhobi-boxy-t-shirt-gunmetal', 'sizes': ['XS', 'S', 'M', 'L', 'XL'], 'colors': [{'name': 'Gunmetal', 'hex': '#111111'}]},
  {'id': 'real-prod-6', 'title': 'NEBULA LOGO FULL ZIP HOODIE, BLACK', 'price': 64.75, 'oldPrice': undefined, 'isSale': false, 'isNew': false, 'gender': 'men', 'type': 'clothing', 'subType': 'outerwear', 'image': '/assets/images/products/real_prod_6.jpg', 'slug': 'nebula-logo-full-zip-hoodie-black', 'sizes': ['XS', 'S', 'M', 'L', 'XL'], 'colors': [{'name': 'Black', 'hex': '#111111'}]},
  {'id': 'real-prod-7', 'title': 'NEBULA RAIN JACKET, GUNMETAL', 'price': 68.7, 'oldPrice': 85.88, 'isSale': true, 'isNew': true, 'gender': 'men', 'type': 'clothing', 'subType': 'outerwear', 'image': '/assets/images/products/real_prod_7.jpg', 'slug': 'nebula-rain-jacket-gunmetal', 'sizes': ['XS', 'S', 'M', 'L', 'XL'], 'colors': [{'name': 'Gunmetal', 'hex': '#111111'}]},
  {'id': 'real-prod-8', 'title': 'NEBULA AIR HALF ZIP SHIRT, MERMAID', 'price': 72.65, 'oldPrice': undefined, 'isSale': false, 'isNew': false, 'gender': 'men', 'type': 'clothing', 'subType': 't-shirts', 'image': '/assets/images/products/real_prod_8.jpg', 'slug': 'nebula-air-half-zip-shirt-mermaid', 'sizes': ['XS', 'S', 'M', 'L', 'XL'], 'colors': [{'name': 'Mermaid', 'hex': '#111111'}]},
  {'id': 'real-prod-9', 'title': 'NEBULA SHORTS, OLIVE DRAB', 'price': 76.6, 'oldPrice': undefined, 'isSale': false, 'isNew': false, 'gender': 'men', 'type': 'clothing', 'subType': 'shorts', 'image': '/assets/images/products/real_prod_9.jpg', 'slug': 'nebula-shorts-olive-drab', 'sizes': ['XS', 'S', 'M', 'L', 'XL'], 'colors': [{'name': 'Black', 'hex': '#111111'}]},
  {'id': 'real-prod-10', 'title': 'NEBULA RAIN JACKET, BLACK', 'price': 80.55, 'oldPrice': 100.69, 'isSale': true, 'isNew': false, 'gender': 'men', 'type': 'clothing', 'subType': 'outerwear', 'image': '/assets/images/products/real_prod_10.jpg', 'slug': 'nebula-rain-jacket-black', 'sizes': ['XS', 'S', 'M', 'L', 'XL'], 'colors': [{'name': 'Black', 'hex': '#111111'}]},
  {'id': 'real-prod-11', 'title': 'NEBULA RAINCOVER, BLACK', 'price': 84.5, 'oldPrice': undefined, 'isSale': false, 'isNew': false, 'gender': 'men', 'type': 'clothing', 'subType': 't-shirts', 'image': '/assets/images/products/real_prod_11.jpg', 'slug': 'nebula-raincover-black', 'sizes': ['XS', 'S', 'M', 'L', 'XL'], 'colors': [{'name': 'Black', 'hex': '#111111'}]},
  {'id': 'real-prod-12', 'title': 'NEBULA SHORTS, MERMAID', 'price': 88.45, 'oldPrice': undefined, 'isSale': false, 'isNew': false, 'gender': 'men', 'type': 'clothing', 'subType': 'shorts', 'image': '/assets/images/products/real_prod_12.jpg', 'slug': 'nebula-shorts-mermaid', 'sizes': ['XS', 'S', 'M', 'L', 'XL'], 'colors': [{'name': 'Mermaid', 'hex': '#111111'}]},
  {'id': 'real-prod-13', 'title': 'NEBULA MOVE POLARTEC FLEECE JACKET, TURTLEDOVE', 'price': 92.4, 'oldPrice': 115.5, 'isSale': true, 'isNew': true, 'gender': 'men', 'type': 'clothing', 'subType': 'outerwear', 'image': '/assets/images/products/real_prod_13.jpg', 'slug': 'nebula-move-polartec-fleece-jacket-turtledove', 'sizes': ['XS', 'S', 'M', 'L', 'XL'], 'colors': [{'name': 'Turtledove', 'hex': '#111111'}]},
  {'id': 'real-prod-14', 'title': 'NEBULA GRAPHIC BOXY T-SHIRT, MARSHMALLOW/ASTRAL AURA/ASTRAL', 'price': 96.35, 'oldPrice': undefined, 'isSale': false, 'isNew': false, 'gender': 'men', 'type': 'clothing', 'subType': 't-shirts', 'image': '/assets/images/products/real_prod_14.jpg', 'slug': 'nebula-graphic-boxy-t-shirt-marshmallow-astral-aura-astral', 'sizes': ['XS', 'S', 'M', 'L', 'XL'], 'colors': [{'name': 'Black', 'hex': '#111111'}]},
  {'id': 'real-prod-15', 'title': 'NEBULA AIR PANTS, RAVEN', 'price': 100.3, 'oldPrice': undefined, 'isSale': false, 'isNew': false, 'gender': 'men', 'type': 'clothing', 'subType': 'tights', 'image': '/assets/images/products/real_prod_15.jpg', 'slug': 'nebula-air-pants-raven', 'sizes': ['XS', 'S', 'M', 'L', 'XL'], 'colors': [{'name': 'Raven', 'hex': '#111111'}]},
  {'id': 'real-prod-16', 'title': 'NEBULA SHORTS, ASTRAL AURA', 'price': 104.25, 'oldPrice': 130.31, 'isSale': true, 'isNew': false, 'gender': 'men', 'type': 'clothing', 'subType': 'shorts', 'image': '/assets/images/products/real_prod_16.jpg', 'slug': 'nebula-shorts-astral-aura', 'sizes': ['XS', 'S', 'M', 'L', 'XL'], 'colors': [{'name': 'Black', 'hex': '#111111'}]},
  {'id': 'real-prod-17', 'title': 'NEBULA ESSENTIAL CREW, BLACK', 'price': 108.2, 'oldPrice': undefined, 'isSale': false, 'isNew': false, 'gender': 'men', 'type': 'clothing', 'subType': 'outerwear', 'image': '/assets/images/products/real_prod_17.jpg', 'slug': 'nebula-essential-crew-black', 'sizes': ['XS', 'S', 'M', 'L', 'XL'], 'colors': [{'name': 'Black', 'hex': '#111111'}]},
  {'id': 'real-prod-18', 'title': 'NEBULA MOVE PANT, BLACK', 'price': 112.15, 'oldPrice': undefined, 'isSale': false, 'isNew': false, 'gender': 'men', 'type': 'clothing', 'subType': 'tights', 'image': '/assets/images/products/real_prod_18.jpg', 'slug': 'nebula-move-pant-black', 'sizes': ['XS', 'S', 'M', 'L', 'XL'], 'colors': [{'name': 'Black', 'hex': '#111111'}]},
  {'id': 'real-prod-19', 'title': 'NEBULA UNIFORM BOXY CREW, LIGHT GREY MELANGE', 'price': 116.1, 'oldPrice': 145.12, 'isSale': true, 'isNew': true, 'gender': 'men', 'type': 'clothing', 'subType': 'outerwear', 'image': '/assets/images/products/real_prod_19.jpg', 'slug': 'nebula-uniform-boxy-crew-light-grey-melange', 'sizes': ['XS', 'S', 'M', 'L', 'XL'], 'colors': [{'name': 'Black', 'hex': '#111111'}]},
  {'id': 'real-prod-20', 'title': 'NEBULA NOVA SHORTS, RAVEN', 'price': 120.05, 'oldPrice': undefined, 'isSale': false, 'isNew': false, 'gender': 'men', 'type': 'clothing', 'subType': 'shorts', 'image': '/assets/images/products/real_prod_20.jpg', 'slug': 'nebula-nova-shorts-raven', 'sizes': ['XS', 'S', 'M', 'L', 'XL'], 'colors': [{'name': 'Raven', 'hex': '#111111'}]},
  {'id': 'real-prod-21', 'title': 'NEBULA GRAPHIC T-SHIRT, BLACK', 'price': 124.0, 'oldPrice': undefined, 'isSale': false, 'isNew': false, 'gender': 'men', 'type': 'clothing', 'subType': 't-shirts', 'image': '/assets/images/products/real_prod_21.jpg', 'slug': 'nebula-graphic-t-shirt-black', 'sizes': ['XS', 'S', 'M', 'L', 'XL'], 'colors': [{'name': 'Black', 'hex': '#111111'}]},
  {'id': 'real-prod-22', 'title': 'NEBULA GRAPHIC T-SHIRT, LIGHT GREY MELANGE', 'price': 127.95, 'oldPrice': 159.94, 'isSale': true, 'isNew': false, 'gender': 'men', 'type': 'clothing', 'subType': 't-shirts', 'image': '/assets/images/products/real_prod_22.jpg', 'slug': 'nebula-graphic-t-shirt-light-grey-melange', 'sizes': ['XS', 'S', 'M', 'L', 'XL'], 'colors': [{'name': 'Black', 'hex': '#111111'}]},
  {'id': 'real-prod-23', 'title': 'NEBULA MOVE SHORTS, BLACK', 'price': 131.9, 'oldPrice': undefined, 'isSale': false, 'isNew': false, 'gender': 'men', 'type': 'clothing', 'subType': 'shorts', 'image': '/assets/images/products/real_prod_23.jpg', 'slug': 'nebula-move-shorts-black', 'sizes': ['XS', 'S', 'M', 'L', 'XL'], 'colors': [{'name': 'Black', 'hex': '#111111'}]},
  {'id': 'real-prod-24', 'title': 'NEBULA AIR PANTS, MERMAID', 'price': 135.85, 'oldPrice': undefined, 'isSale': false, 'isNew': false, 'gender': 'men', 'type': 'clothing', 'subType': 'tights', 'image': '/assets/images/products/real_prod_24.jpg', 'slug': 'nebula-air-pants-mermaid', 'sizes': ['XS', 'S', 'M', 'L', 'XL'], 'colors': [{'name': 'Mermaid', 'hex': '#111111'}]},
  {'id': 'real-prod-25', 'title': 'NEBULA GRAPHIC T-SHIRT, BLACK/GUNMETAL', 'price': 139.8, 'oldPrice': 174.75, 'isSale': true, 'isNew': true, 'gender': 'men', 'type': 'clothing', 'subType': 't-shirts', 'image': '/assets/images/products/real_prod_25.jpg', 'slug': 'nebula-graphic-t-shirt-black-gunmetal', 'sizes': ['XS', 'S', 'M', 'L', 'XL'], 'colors': [{'name': 'Gunmetal', 'hex': '#111111'}]},
  {'id': 'real-prod-26', 'title': 'NEBULA ESSENTIAL CREW, GREY MELANGE/GREY MELANGE', 'price': 143.75, 'oldPrice': undefined, 'isSale': false, 'isNew': false, 'gender': 'men', 'type': 'clothing', 'subType': 'outerwear', 'image': '/assets/images/products/real_prod_26.jpg', 'slug': 'nebula-essential-crew-grey-melange-grey-melange', 'sizes': ['XS', 'S', 'M', 'L', 'XL'], 'colors': [{'name': 'Black', 'hex': '#111111'}]},
  {'id': 'real-prod-27', 'title': 'NEBULA SORONA T-SHIRT, TURTLEDOVE', 'price': 147.7, 'oldPrice': undefined, 'isSale': false, 'isNew': false, 'gender': 'men', 'type': 'clothing', 'subType': 't-shirts', 'image': '/assets/images/products/real_prod_27.jpg', 'slug': 'nebula-sorona-t-shirt-turtledove', 'sizes': ['XS', 'S', 'M', 'L', 'XL'], 'colors': [{'name': 'Turtledove', 'hex': '#111111'}]},
  {'id': 'real-prod-28', 'title': 'NEBULA MOVE POLARTEC FLEECE JACKET, BLACK', 'price': 151.65, 'oldPrice': 189.56, 'isSale': true, 'isNew': false, 'gender': 'men', 'type': 'clothing', 'subType': 'outerwear', 'image': '/assets/images/products/real_prod_28.jpg', 'slug': 'nebula-move-polartec-fleece-jacket-black', 'sizes': ['XS', 'S', 'M', 'L', 'XL'], 'colors': [{'name': 'Black', 'hex': '#111111'}]},
  {'id': 'real-prod-29', 'title': 'NEBULA GRAPHIC BOXY T-SHIRT, MARSHMALLOW/SILVER/ASTRAL AURA', 'price': 155.6, 'oldPrice': undefined, 'isSale': false, 'isNew': false, 'gender': 'men', 'type': 'clothing', 'subType': 't-shirts', 'image': '/assets/images/products/real_prod_29.jpg', 'slug': 'nebula-graphic-boxy-t-shirt-marshmallow-silver-astral-aura', 'sizes': ['XS', 'S', 'M', 'L', 'XL'], 'colors': [{'name': 'Black', 'hex': '#111111'}]},
  {'id': 'real-prod-30', 'title': 'NEBULA SORONA LS, TURTLEDOVE', 'price': 159.55, 'oldPrice': undefined, 'isSale': false, 'isNew': false, 'gender': 'men', 'type': 'clothing', 'subType': 't-shirts', 'image': '/assets/images/products/real_prod_30.jpg', 'slug': 'nebula-sorona-ls-turtledove', 'sizes': ['XS', 'S', 'M', 'L', 'XL'], 'colors': [{'name': 'Turtledove', 'hex': '#111111'}]},
  {'id': 'real-prod-31', 'title': 'NEBULA AIR HALF ZIP SHIRT, RAVEN', 'price': 163.5, 'oldPrice': 204.38, 'isSale': true, 'isNew': true, 'gender': 'men', 'type': 'clothing', 'subType': 't-shirts', 'image': '/assets/images/products/real_prod_31.jpg', 'slug': 'nebula-air-half-zip-shirt-raven', 'sizes': ['XS', 'S', 'M', 'L', 'XL'], 'colors': [{'name': 'Raven', 'hex': '#111111'}]},
  {'id': 'real-prod-32', 'title': 'NEBULA COTTON LOGO SOCKS, BLACK', 'price': 47.45, 'oldPrice': undefined, 'isSale': false, 'isNew': false, 'gender': 'men', 'type': 'clothing', 'subType': 't-shirts', 'image': '/assets/images/products/real_prod_32.jpg', 'slug': 'nebula-cotton-logo-socks-black', 'sizes': ['XS', 'S', 'M', 'L', 'XL'], 'colors': [{'name': 'Black', 'hex': '#111111'}]},
  {'id': 'real-prod-33', 'title': 'NEBULA 2 in 1 RUNNING SHORT, STORM GRAY', 'price': 51.4, 'oldPrice': undefined, 'isSale': false, 'isNew': false, 'gender': 'women', 'type': 'clothing', 'subType': 'shorts', 'image': '/assets/images/products/real_prod_33.jpg', 'slug': 'nebula-2-in-1-running-short-storm-gray', 'sizes': ['XS', 'S', 'M', 'L', 'XL'], 'colors': [{'name': 'Storm Gray', 'hex': '#111111'}]},
  {'id': 'real-prod-34', 'title': 'NEBULA SABER JACKET 2.0, WILD DOVE', 'price': 55.35, 'oldPrice': 69.19, 'isSale': true, 'isNew': false, 'gender': 'women', 'type': 'clothing', 'subType': 'outerwear', 'image': '/assets/images/products/real_prod_34.jpg', 'slug': 'nebula-saber-jacket-2.0-wild-dove', 'sizes': ['XS', 'S', 'M', 'L', 'XL'], 'colors': [{'name': 'Black', 'hex': '#111111'}]},
  {'id': 'real-prod-35', 'title': 'NEBULA WOMEN TRAINING TOP, SPARROW', 'price': 59.3, 'oldPrice': undefined, 'isSale': false, 'isNew': false, 'gender': 'women', 'type': 'clothing', 'subType': 't-shirts', 'image': '/assets/images/products/real_prod_35.jpg', 'slug': 'nebula-women-training-top-sparrow', 'sizes': ['XS', 'S', 'M', 'L', 'XL'], 'colors': [{'name': 'Sparrow', 'hex': '#111111'}]},
  {'id': 'real-prod-36', 'title': 'NEBULA WOMEN TRAINING BRA, AFTER DARK', 'price': 63.25, 'oldPrice': undefined, 'isSale': false, 'isNew': false, 'gender': 'women', 'type': 'clothing', 'subType': 't-shirts', 'image': '/assets/images/products/real_prod_36.jpg', 'slug': 'nebula-women-training-bra-after-dark', 'sizes': ['XS', 'S', 'M', 'L', 'XL'], 'colors': [{'name': 'Black', 'hex': '#111111'}]},
  {'id': 'real-prod-37', 'title': 'NEBULA WOMEN TRAINING BRA, SWEET GRAPE', 'price': 67.2, 'oldPrice': 84.0, 'isSale': true, 'isNew': true, 'gender': 'women', 'type': 'clothing', 'subType': 't-shirts', 'image': '/assets/images/products/real_prod_37.jpg', 'slug': 'nebula-women-training-bra-sweet-grape', 'sizes': ['XS', 'S', 'M', 'L', 'XL'], 'colors': [{'name': 'Black', 'hex': '#111111'}]},
  {'id': 'real-prod-38', 'title': 'NEBULA WOMEN TRAINING SPRINTERS, RAVEN/REFLECTIVE', 'price': 71.15, 'oldPrice': undefined, 'isSale': false, 'isNew': false, 'gender': 'women', 'type': 'clothing', 'subType': 't-shirts', 'image': '/assets/images/products/real_prod_38.jpg', 'slug': 'nebula-women-training-sprinters-raven-reflective', 'sizes': ['XS', 'S', 'M', 'L', 'XL'], 'colors': [{'name': 'Raven', 'hex': '#111111'}]},
  {'id': 'real-prod-39', 'title': 'NEBULA WOMEN LOGO T-SHIRT, GRISAILLE', 'price': 75.1, 'oldPrice': undefined, 'isSale': false, 'isNew': false, 'gender': 'women', 'type': 'clothing', 'subType': 't-shirts', 'image': '/assets/images/products/real_prod_39.jpg', 'slug': 'nebula-women-logo-t-shirt-grisaille', 'sizes': ['XS', 'S', 'M', 'L', 'XL'], 'colors': [{'name': 'Black', 'hex': '#111111'}]},
  {'id': 'real-prod-40', 'title': 'NEBULA WOMEN LOGO T-SHIRT, CAPERS', 'price': 79.05, 'oldPrice': 98.81, 'isSale': true, 'isNew': false, 'gender': 'women', 'type': 'clothing', 'subType': 't-shirts', 'image': '/assets/images/products/real_prod_40.jpg', 'slug': 'nebula-women-logo-t-shirt-capers', 'sizes': ['XS', 'S', 'M', 'L', 'XL'], 'colors': [{'name': 'Black', 'hex': '#111111'}]},
  {'id': 'real-prod-41', 'title': 'NEBULA MOVE POLARTEC FLEECE VEST, TURTLEDOVE', 'price': 83.0, 'oldPrice': undefined, 'isSale': false, 'isNew': false, 'gender': 'women', 'type': 'clothing', 'subType': 'outerwear', 'image': '/assets/images/products/real_prod_41.jpg', 'slug': 'nebula-move-polartec-fleece-vest-turtledove', 'sizes': ['XS', 'S', 'M', 'L', 'XL'], 'colors': [{'name': 'Turtledove', 'hex': '#111111'}]},
  {'id': 'real-prod-42', 'title': 'NEBULA  WOOL RIB BEANIE, BRACKEN', 'price': 86.95, 'oldPrice': undefined, 'isSale': false, 'isNew': false, 'gender': 'unisex', 'type': 'accessories', 'subType': 'socks', 'image': '/assets/images/products/real_prod_42.jpg', 'slug': 'nebula--wool-rib-beanie-bracken', 'sizes': ['XS', 'S', 'M', 'L', 'XL'], 'colors': [{'name': 'Black', 'hex': '#111111'}]},
  {'id': 'real-prod-43', 'title': 'NEBULA TRAVEL BAG, BLACK', 'price': 90.9, 'oldPrice': 113.62, 'isSale': true, 'isNew': true, 'gender': 'unisex', 'type': 'accessories', 'subType': 'bags', 'image': '/assets/images/products/real_prod_43.jpg', 'slug': 'nebula-travel-bag-black', 'sizes': ['ONE SIZE'], 'colors': [{'name': 'Black', 'hex': '#111111'}]},
  {'id': 'real-prod-44', 'title': 'NEBULA LOGO BEANIE, BLACK', 'price': 94.85, 'oldPrice': undefined, 'isSale': false, 'isNew': false, 'gender': 'unisex', 'type': 'accessories', 'subType': 'socks', 'image': '/assets/images/products/real_prod_44.jpg', 'slug': 'nebula-logo-beanie-black', 'sizes': ['XS', 'S', 'M', 'L', 'XL'], 'colors': [{'name': 'Black', 'hex': '#111111'}]},
  {'id': 'real-prod-45', 'title': 'NEBULA UTILITY CROSSBODY BAG, BLACK', 'price': 98.8, 'oldPrice': undefined, 'isSale': false, 'isNew': false, 'gender': 'unisex', 'type': 'accessories', 'subType': 'bags', 'image': '/assets/images/products/real_prod_45.jpg', 'slug': 'nebula-utility-crossbody-bag-black', 'sizes': ['ONE SIZE'], 'colors': [{'name': 'Black', 'hex': '#111111'}]},
  {'id': 'real-prod-46', 'title': 'NEBULA UTILITY BACKPACK, BLACK', 'price': 102.75, 'oldPrice': 128.44, 'isSale': true, 'isNew': false, 'gender': 'unisex', 'type': 'accessories', 'subType': 't-shirts', 'image': '/assets/images/products/real_prod_46.jpg', 'slug': 'nebula-utility-backpack-black', 'sizes': ['XS', 'S', 'M', 'L', 'XL'], 'colors': [{'name': 'Black', 'hex': '#111111'}]},
  {'id': 'real-prod-47', 'title': 'NEBULA DURA WAISTBAG, BLACK', 'price': 106.7, 'oldPrice': undefined, 'isSale': false, 'isNew': false, 'gender': 'unisex', 'type': 'accessories', 'subType': 'bags', 'image': '/assets/images/products/real_prod_47.jpg', 'slug': 'nebula-dura-waistbag-black', 'sizes': ['ONE SIZE'], 'colors': [{'name': 'Black', 'hex': '#111111'}]},
  {'id': 'real-prod-48', 'title': 'NEBULA TRAIL SNEAKER, SHARKSKIN/BLACK', 'price': 110.65, 'oldPrice': undefined, 'isSale': false, 'isNew': false, 'gender': 'unisex', 'type': 'shoes', 'subType': 't-shirts', 'image': '/assets/images/products/real_prod_48.jpg', 'slug': 'nebula-trail-sneaker-sharkskin-black', 'sizes': ['38', '39', '40', '41', '42', '43', '44', '45'], 'colors': [{'name': 'Black', 'hex': '#111111'}]},
  {'id': 'real-prod-49', 'title': 'NEBULA UTILITY BUMBAG, ASPHALT', 'price': 114.6, 'oldPrice': 143.25, 'isSale': true, 'isNew': true, 'gender': 'unisex', 'type': 'accessories', 'subType': 'bags', 'image': '/assets/images/products/real_prod_49.jpg', 'slug': 'nebula-utility-bumbag-asphalt', 'sizes': ['ONE SIZE'], 'colors': [{'name': 'Asphalt', 'hex': '#111111'}]},
  {'id': 'real-prod-50', 'title': 'NEBULA NYLON LIGHTWEIGHT CAP, BLACK/BLACK', 'price': 118.55, 'oldPrice': undefined, 'isSale': false, 'isNew': false, 'gender': 'unisex', 'type': 'accessories', 'subType': 'socks', 'image': '/assets/images/products/real_prod_50.jpg', 'slug': 'nebula-nylon-lightweight-cap-black-black', 'sizes': ['XS', 'S', 'M', 'L', 'XL'], 'colors': [{'name': 'Black', 'hex': '#111111'}]},
  {'id': 'real-prod-51', 'title': 'NEBULA LIGHTWEIGHT TRAIL SNEAKER 2.0, ANTHRACITE', 'price': 122.5, 'oldPrice': undefined, 'isSale': false, 'isNew': false, 'gender': 'unisex', 'type': 'shoes', 'subType': 't-shirts', 'image': '/assets/images/products/real_prod_51.jpg', 'slug': 'nebula-lightweight-trail-sneaker-2.0-anthracite', 'sizes': ['38', '39', '40', '41', '42', '43', '44', '45'], 'colors': [{'name': 'Black', 'hex': '#111111'}]},
  {'id': 'real-prod-52', 'title': 'NEBULA NYLON BUCKET HAT, CEDAR', 'price': 126.45, 'oldPrice': 158.06, 'isSale': true, 'isNew': false, 'gender': 'unisex', 'type': 'accessories', 'subType': 'socks', 'image': '/assets/images/products/real_prod_52.jpg', 'slug': 'nebula-nylon-bucket-hat-cedar', 'sizes': ['XS', 'S', 'M', 'L', 'XL'], 'colors': [{'name': 'Cedar', 'hex': '#111111'}]},
  {'id': 'real-prod-53', 'title': 'NEBULA TRAIL SNEAKER, FALLEN ROCK/KANGAROO/CAVIAR', 'price': 130.4, 'oldPrice': undefined, 'isSale': false, 'isNew': false, 'gender': 'unisex', 'type': 'shoes', 'subType': 't-shirts', 'image': '/assets/images/products/real_prod_53.jpg', 'slug': 'nebula-trail-sneaker-fallen-rock-kangaroo-caviar', 'sizes': ['38', '39', '40', '41', '42', '43', '44', '45'], 'colors': [{'name': 'Black', 'hex': '#111111'}]},
  {'id': 'real-prod-54', 'title': 'NEBULA UTILITY BUMBAG, BLACK', 'price': 134.35, 'oldPrice': undefined, 'isSale': false, 'isNew': false, 'gender': 'unisex', 'type': 'accessories', 'subType': 'bags', 'image': '/assets/images/products/real_prod_54.jpg', 'slug': 'nebula-utility-bumbag-black', 'sizes': ['ONE SIZE'], 'colors': [{'name': 'Black', 'hex': '#111111'}]},
  {'id': 'real-prod-55', 'title': 'NEBULA WASHED CANVAS CAP, RAVEN', 'price': 138.3, 'oldPrice': 172.88, 'isSale': true, 'isNew': true, 'gender': 'unisex', 'type': 'accessories', 'subType': 'socks', 'image': '/assets/images/products/real_prod_55.jpg', 'slug': 'nebula-washed-canvas-cap-raven', 'sizes': ['XS', 'S', 'M', 'L', 'XL'], 'colors': [{'name': 'Raven', 'hex': '#111111'}]},
  {'id': 'real-prod-56', 'title': 'NEBULA FALCON CAP, MERMAID', 'price': 142.25, 'oldPrice': undefined, 'isSale': false, 'isNew': false, 'gender': 'unisex', 'type': 'accessories', 'subType': 'socks', 'image': '/assets/images/products/real_prod_56.jpg', 'slug': 'nebula-falcon-cap-mermaid', 'sizes': ['XS', 'S', 'M', 'L', 'XL'], 'colors': [{'name': 'Mermaid', 'hex': '#111111'}]},
  {'id': 'real-prod-57', 'title': 'NEBULA AVIATION BAG, BLACK', 'price': 146.2, 'oldPrice': undefined, 'isSale': false, 'isNew': false, 'gender': 'unisex', 'type': 'accessories', 'subType': 'bags', 'image': '/assets/images/products/real_prod_57.jpg', 'slug': 'nebula-aviation-bag-black', 'sizes': ['ONE SIZE'], 'colors': [{'name': 'Black', 'hex': '#111111'}]},
  {'id': 'real-prod-58', 'title': 'NEBULA LIGHTWEIGHT TRAIL SNEAKER 2.0, SEA MOSS', 'price': 150.15, 'oldPrice': 187.69, 'isSale': true, 'isNew': false, 'gender': 'unisex', 'type': 'shoes', 'subType': 't-shirts', 'image': '/assets/images/products/real_prod_58.jpg', 'slug': 'nebula-lightweight-trail-sneaker-2.0-sea-moss', 'sizes': ['38', '39', '40', '41', '42', '43', '44', '45'], 'colors': [{'name': 'Black', 'hex': '#111111'}]},
  {'id': 'real-prod-59', 'title': 'NEBULA  WOOL RIB BEANIE, ASPHALT', 'price': 154.1, 'oldPrice': undefined, 'isSale': false, 'isNew': false, 'gender': 'unisex', 'type': 'accessories', 'subType': 'socks', 'image': '/assets/images/products/real_prod_59.jpg', 'slug': 'nebula--wool-rib-beanie-asphalt', 'sizes': ['XS', 'S', 'M', 'L', 'XL'], 'colors': [{'name': 'Asphalt', 'hex': '#111111'}]},
  {'id': 'real-prod-60', 'title': 'NEBULA FALCON CAP, RAVEN', 'price': 158.05, 'oldPrice': undefined, 'isSale': false, 'isNew': false, 'gender': 'unisex', 'type': 'accessories', 'subType': 'socks', 'image': '/assets/images/products/real_prod_60.jpg', 'slug': 'nebula-falcon-cap-raven', 'sizes': ['XS', 'S', 'M', 'L', 'XL'], 'colors': [{'name': 'Raven', 'hex': '#111111'}]},
  {'id': 'real-prod-61', 'title': 'NEBULA WATER BOTTLE, ASPHALT', 'price': 162.0, 'oldPrice': 202.5, 'isSale': true, 'isNew': true, 'gender': 'unisex', 'type': 'accessories', 'subType': 't-shirts', 'image': '/assets/images/products/real_prod_61.jpg', 'slug': 'nebula-water-bottle-asphalt', 'sizes': ['XS', 'S', 'M', 'L', 'XL'], 'colors': [{'name': 'Asphalt', 'hex': '#111111'}]},
  {'id': 'real-prod-62', 'title': 'NEBULA NYLON LIGHTWEIGHT CAP, GUNMETAL', 'price': 45.95, 'oldPrice': undefined, 'isSale': false, 'isNew': false, 'gender': 'unisex', 'type': 'accessories', 'subType': 'socks', 'image': '/assets/images/products/real_prod_62.jpg', 'slug': 'nebula-nylon-lightweight-cap-gunmetal', 'sizes': ['XS', 'S', 'M', 'L', 'XL'], 'colors': [{'name': 'Gunmetal', 'hex': '#111111'}]},
  {'id': 'real-prod-63', 'title': 'NEBULA ESSENTIAL COTTON SOCKS, MARSHMALLOW', 'price': 49.9, 'oldPrice': undefined, 'isSale': false, 'isNew': false, 'gender': 'unisex', 'type': 'accessories', 'subType': 't-shirts', 'image': '/assets/images/products/real_prod_63.jpg', 'slug': 'nebula-essential-cotton-socks-marshmallow', 'sizes': ['XS', 'S', 'M', 'L', 'XL'], 'colors': [{'name': 'Black', 'hex': '#111111'}]},
  {'id': 'real-prod-64', 'title': 'NEBULA UTILITY GLOVE, BLACK', 'price': 53.85, 'oldPrice': 67.31, 'isSale': true, 'isNew': false, 'gender': 'unisex', 'type': 'accessories', 'subType': 'socks', 'image': '/assets/images/products/real_prod_64.jpg', 'slug': 'nebula-utility-glove-black', 'sizes': ['XS', 'S', 'M', 'L', 'XL'], 'colors': [{'name': 'Black', 'hex': '#111111'}]},
  {'id': 'real-prod-65', 'title': 'NEBULA WOOL LOGO CAP, BLACK', 'price': 57.8, 'oldPrice': undefined, 'isSale': false, 'isNew': false, 'gender': 'unisex', 'type': 'accessories', 'subType': 'socks', 'image': '/assets/images/products/real_prod_65.jpg', 'slug': 'nebula-wool-logo-cap-black', 'sizes': ['XS', 'S', 'M', 'L', 'XL'], 'colors': [{'name': 'Black', 'hex': '#111111'}]},
  {'id': 'real-prod-66', 'title': 'NEBULA WOOL LOGO CAP, AFTER DARK', 'price': 61.75, 'oldPrice': undefined, 'isSale': false, 'isNew': false, 'gender': 'unisex', 'type': 'accessories', 'subType': 'socks', 'image': '/assets/images/products/real_prod_66.jpg', 'slug': 'nebula-wool-logo-cap-after-dark', 'sizes': ['XS', 'S', 'M', 'L', 'XL'], 'colors': [{'name': 'Black', 'hex': '#111111'}]},
  {'id': 'real-prod-67', 'title': 'NEBULA COTTON CAP, OYSTER GRAY/OYSTER GRAY', 'price': 65.7, 'oldPrice': 82.12, 'isSale': true, 'isNew': true, 'gender': 'unisex', 'type': 'accessories', 'subType': 'socks', 'image': '/assets/images/products/real_prod_67.jpg', 'slug': 'nebula-cotton-cap-oyster-gray-oyster-gray', 'sizes': ['XS', 'S', 'M', 'L', 'XL'], 'colors': [{'name': 'Black', 'hex': '#111111'}]},
  {'id': 'real-prod-68', 'title': 'NEBULA COTTON CAP, BLACK', 'price': 69.65, 'oldPrice': undefined, 'isSale': false, 'isNew': false, 'gender': 'unisex', 'type': 'accessories', 'subType': 'socks', 'image': '/assets/images/products/real_prod_68.jpg', 'slug': 'nebula-cotton-cap-black', 'sizes': ['XS', 'S', 'M', 'L', 'XL'], 'colors': [{'name': 'Black', 'hex': '#111111'}]},
  {'id': 'real-prod-69', 'title': 'NEBULA CROSSBODY BAG, BLUE NIGHTS', 'price': 73.6, 'oldPrice': undefined, 'isSale': false, 'isNew': false, 'gender': 'unisex', 'type': 'accessories', 'subType': 'bags', 'image': '/assets/images/products/real_prod_69.jpg', 'slug': 'nebula-crossbody-bag-blue-nights', 'sizes': ['ONE SIZE'], 'colors': [{'name': 'Black', 'hex': '#111111'}]},
  {'id': 'real-prod-70', 'title': 'NEBULA NYLON CAP, RAVEN/REFLECTIVE', 'price': 77.55, 'oldPrice': 96.94, 'isSale': true, 'isNew': false, 'gender': 'unisex', 'type': 'accessories', 'subType': 'socks', 'image': '/assets/images/products/real_prod_70.jpg', 'slug': 'nebula-nylon-cap-raven-reflective', 'sizes': ['XS', 'S', 'M', 'L', 'XL'], 'colors': [{'name': 'Raven', 'hex': '#111111'}]},
  {'id': 'real-prod-71', 'title': 'NEBULA AVIATION BAG, DARK SLATE', 'price': 81.5, 'oldPrice': undefined, 'isSale': false, 'isNew': false, 'gender': 'unisex', 'type': 'accessories', 'subType': 'bags', 'image': '/assets/images/products/real_prod_71.jpg', 'slug': 'nebula-aviation-bag-dark-slate', 'sizes': ['ONE SIZE'], 'colors': [{'name': 'Black', 'hex': '#111111'}]},
  {'id': 'real-prod-72', 'title': 'NEBULA WAFFLE TECH SHORTS, GUNMETAL V2', 'price': 85.45, 'oldPrice': undefined, 'isSale': false, 'isNew': false, 'gender': 'men', 'type': 'clothing', 'subType': 'shorts', 'image': '/assets/images/products/real_prod_1.jpg', 'slug': 'nebula-waffle-tech-shorts-gunmetal-v2', 'sizes': ['XS', 'S', 'M', 'L', 'XL'], 'colors': [{'name': 'Gunmetal', 'hex': '#111111'}]},
  {'id': 'real-prod-73', 'title': 'NEBULA DHOBI BOXY HOODIE, BLACK', 'price': 89.4, 'oldPrice': 111.75, 'isSale': true, 'isNew': true, 'gender': 'men', 'type': 'clothing', 'subType': 'outerwear', 'image': '/assets/images/products/real_prod_2.jpg', 'slug': 'nebula-dhobi-boxy-hoodie-black', 'sizes': ['XS', 'S', 'M', 'L', 'XL'], 'colors': [{'name': 'Black', 'hex': '#111111'}]},
  {'id': 'real-prod-74', 'title': 'NEBULA LIGHTWEIGHT TRAIL SNEAKER 2.0, STORM GRAY', 'price': 93.35, 'oldPrice': undefined, 'isSale': false, 'isNew': false, 'gender': 'men', 'type': 'shoes', 'subType': 't-shirts', 'image': '/assets/images/products/real_prod_3.jpg', 'slug': 'nebula-lightweight-trail-sneaker-2.0-storm-gray', 'sizes': ['38', '39', '40', '41', '42', '43', '44', '45'], 'colors': [{'name': 'Storm Gray', 'hex': '#111111'}]},
  {'id': 'real-prod-75', 'title': 'NEBULA AIR SHORTS, CEDAR', 'price': 97.3, 'oldPrice': undefined, 'isSale': false, 'isNew': false, 'gender': 'men', 'type': 'clothing', 'subType': 'shorts', 'image': '/assets/images/products/real_prod_4.jpg', 'slug': 'nebula-air-shorts-cedar', 'sizes': ['XS', 'S', 'M', 'L', 'XL'], 'colors': [{'name': 'Cedar', 'hex': '#111111'}]},
  {'id': 'real-prod-76', 'title': 'NEBULA DHOBI BOXY T-SHIRT, MERMAID', 'price': 101.25, 'oldPrice': 126.56, 'isSale': true, 'isNew': false, 'gender': 'men', 'type': 'clothing', 'subType': 't-shirts', 'image': '/assets/images/products/real_prod_5.jpg', 'slug': 'nebula-dhobi-boxy-t-shirt-mermaid', 'sizes': ['XS', 'S', 'M', 'L', 'XL'], 'colors': [{'name': 'Mermaid', 'hex': '#111111'}]},
  {'id': 'real-prod-77', 'title': 'NEBULA LOGO FULL ZIP HOODIE, RAVEN', 'price': 105.2, 'oldPrice': undefined, 'isSale': false, 'isNew': false, 'gender': 'men', 'type': 'clothing', 'subType': 'outerwear', 'image': '/assets/images/products/real_prod_6.jpg', 'slug': 'nebula-logo-full-zip-hoodie-raven', 'sizes': ['XS', 'S', 'M', 'L', 'XL'], 'colors': [{'name': 'Raven', 'hex': '#111111'}]},
  {'id': 'real-prod-78', 'title': 'NEBULA RAIN JACKET, TURTLEDOVE', 'price': 109.15, 'oldPrice': undefined, 'isSale': false, 'isNew': false, 'gender': 'men', 'type': 'clothing', 'subType': 'outerwear', 'image': '/assets/images/products/real_prod_7.jpg', 'slug': 'nebula-rain-jacket-turtledove', 'sizes': ['XS', 'S', 'M', 'L', 'XL'], 'colors': [{'name': 'Turtledove', 'hex': '#111111'}]},
  {'id': 'real-prod-79', 'title': 'NEBULA AIR HALF ZIP SHIRT, SPARROW', 'price': 113.1, 'oldPrice': 141.38, 'isSale': true, 'isNew': true, 'gender': 'men', 'type': 'clothing', 'subType': 't-shirts', 'image': '/assets/images/products/real_prod_8.jpg', 'slug': 'nebula-air-half-zip-shirt-sparrow', 'sizes': ['XS', 'S', 'M', 'L', 'XL'], 'colors': [{'name': 'Sparrow', 'hex': '#111111'}]},
  {'id': 'real-prod-80', 'title': 'NEBULA SHORTS, ASPHALT', 'price': 117.05, 'oldPrice': undefined, 'isSale': false, 'isNew': false, 'gender': 'men', 'type': 'clothing', 'subType': 'shorts', 'image': '/assets/images/products/real_prod_9.jpg', 'slug': 'nebula-shorts-asphalt', 'sizes': ['XS', 'S', 'M', 'L', 'XL'], 'colors': [{'name': 'Asphalt', 'hex': '#111111'}]},
  {'id': 'real-prod-81', 'title': 'NEBULA RAIN JACKET, MERMAID BLUE', 'price': 121.0, 'oldPrice': undefined, 'isSale': false, 'isNew': false, 'gender': 'men', 'type': 'clothing', 'subType': 'outerwear', 'image': '/assets/images/products/real_prod_10.jpg', 'slug': 'nebula-rain-jacket-mermaid-blue', 'sizes': ['XS', 'S', 'M', 'L', 'XL'], 'colors': [{'name': 'Mermaid', 'hex': '#111111'}]},
  {'id': 'real-prod-82', 'title': 'NEBULA RAINCOVER, GUNMETAL', 'price': 124.95, 'oldPrice': 156.19, 'isSale': true, 'isNew': false, 'gender': 'men', 'type': 'clothing', 'subType': 't-shirts', 'image': '/assets/images/products/real_prod_11.jpg', 'slug': 'nebula-raincover-gunmetal', 'sizes': ['XS', 'S', 'M', 'L', 'XL'], 'colors': [{'name': 'Gunmetal', 'hex': '#111111'}]},
  {'id': 'real-prod-83', 'title': 'NEBULA SHORTS, BLACK', 'price': 128.9, 'oldPrice': undefined, 'isSale': false, 'isNew': false, 'gender': 'men', 'type': 'clothing', 'subType': 'shorts', 'image': '/assets/images/products/real_prod_12.jpg', 'slug': 'nebula-shorts-black', 'sizes': ['XS', 'S', 'M', 'L', 'XL'], 'colors': [{'name': 'Black', 'hex': '#111111'}]},
  {'id': 'real-prod-84', 'title': 'NEBULA MOVE POLARTEC FLEECE JACKET, STORM GRAY', 'price': 132.85, 'oldPrice': undefined, 'isSale': false, 'isNew': false, 'gender': 'men', 'type': 'clothing', 'subType': 'outerwear', 'image': '/assets/images/products/real_prod_13.jpg', 'slug': 'nebula-move-polartec-fleece-jacket-storm-gray', 'sizes': ['XS', 'S', 'M', 'L', 'XL'], 'colors': [{'name': 'Storm Gray', 'hex': '#111111'}]},
  {'id': 'real-prod-85', 'title': 'NEBULA GRAPHIC BOXY T-SHIRT, CEDAR', 'price': 136.8, 'oldPrice': 171.0, 'isSale': true, 'isNew': true, 'gender': 'men', 'type': 'clothing', 'subType': 't-shirts', 'image': '/assets/images/products/real_prod_14.jpg', 'slug': 'nebula-graphic-boxy-t-shirt-cedar', 'sizes': ['XS', 'S', 'M', 'L', 'XL'], 'colors': [{'name': 'Cedar', 'hex': '#111111'}]},
  {'id': 'real-prod-86', 'title': 'NEBULA AIR PANTS, MERMAID V2', 'price': 140.75, 'oldPrice': undefined, 'isSale': false, 'isNew': false, 'gender': 'men', 'type': 'clothing', 'subType': 'tights', 'image': '/assets/images/products/real_prod_15.jpg', 'slug': 'nebula-air-pants-mermaid-v2', 'sizes': ['XS', 'S', 'M', 'L', 'XL'], 'colors': [{'name': 'Mermaid', 'hex': '#111111'}]},
  {'id': 'real-prod-87', 'title': 'NEBULA SHORTS, RAVEN', 'price': 144.7, 'oldPrice': undefined, 'isSale': false, 'isNew': false, 'gender': 'men', 'type': 'clothing', 'subType': 'shorts', 'image': '/assets/images/products/real_prod_16.jpg', 'slug': 'nebula-shorts-raven', 'sizes': ['XS', 'S', 'M', 'L', 'XL'], 'colors': [{'name': 'Raven', 'hex': '#111111'}]},
  {'id': 'real-prod-88', 'title': 'NEBULA ESSENTIAL CREW, TURTLEDOVE', 'price': 148.65, 'oldPrice': 185.81, 'isSale': true, 'isNew': false, 'gender': 'men', 'type': 'clothing', 'subType': 'outerwear', 'image': '/assets/images/products/real_prod_17.jpg', 'slug': 'nebula-essential-crew-turtledove', 'sizes': ['XS', 'S', 'M', 'L', 'XL'], 'colors': [{'name': 'Turtledove', 'hex': '#111111'}]},
  {'id': 'real-prod-89', 'title': 'NEBULA MOVE PANT, SPARROW', 'price': 152.6, 'oldPrice': undefined, 'isSale': false, 'isNew': false, 'gender': 'men', 'type': 'clothing', 'subType': 'tights', 'image': '/assets/images/products/real_prod_18.jpg', 'slug': 'nebula-move-pant-sparrow', 'sizes': ['XS', 'S', 'M', 'L', 'XL'], 'colors': [{'name': 'Sparrow', 'hex': '#111111'}]},
  {'id': 'real-prod-90', 'title': 'NEBULA UNIFORM BOXY CREW, ASPHALT', 'price': 156.55, 'oldPrice': undefined, 'isSale': false, 'isNew': false, 'gender': 'men', 'type': 'clothing', 'subType': 'outerwear', 'image': '/assets/images/products/real_prod_19.jpg', 'slug': 'nebula-uniform-boxy-crew-asphalt', 'sizes': ['XS', 'S', 'M', 'L', 'XL'], 'colors': [{'name': 'Asphalt', 'hex': '#111111'}]},
  {'id': 'real-prod-91', 'title': 'NEBULA NOVA SHORTS, MERMAID BLUE', 'price': 160.5, 'oldPrice': 200.62, 'isSale': true, 'isNew': true, 'gender': 'men', 'type': 'clothing', 'subType': 'shorts', 'image': '/assets/images/products/real_prod_20.jpg', 'slug': 'nebula-nova-shorts-mermaid-blue', 'sizes': ['XS', 'S', 'M', 'L', 'XL'], 'colors': [{'name': 'Mermaid', 'hex': '#111111'}]},
  {'id': 'real-prod-92', 'title': 'NEBULA GRAPHIC T-SHIRT, GUNMETAL', 'price': 164.45, 'oldPrice': undefined, 'isSale': false, 'isNew': false, 'gender': 'men', 'type': 'clothing', 'subType': 't-shirts', 'image': '/assets/images/products/real_prod_21.jpg', 'slug': 'nebula-graphic-t-shirt-gunmetal', 'sizes': ['XS', 'S', 'M', 'L', 'XL'], 'colors': [{'name': 'Gunmetal', 'hex': '#111111'}]},
  {'id': 'real-prod-93', 'title': 'NEBULA GRAPHIC T-SHIRT, BLACK V2', 'price': 48.4, 'oldPrice': undefined, 'isSale': false, 'isNew': false, 'gender': 'men', 'type': 'clothing', 'subType': 't-shirts', 'image': '/assets/images/products/real_prod_22.jpg', 'slug': 'nebula-graphic-t-shirt-black-v2', 'sizes': ['XS', 'S', 'M', 'L', 'XL'], 'colors': [{'name': 'Black', 'hex': '#111111'}]},
  {'id': 'real-prod-94', 'title': 'NEBULA MOVE SHORTS, STORM GRAY', 'price': 52.35, 'oldPrice': 65.44, 'isSale': true, 'isNew': false, 'gender': 'men', 'type': 'clothing', 'subType': 'shorts', 'image': '/assets/images/products/real_prod_23.jpg', 'slug': 'nebula-move-shorts-storm-gray', 'sizes': ['XS', 'S', 'M', 'L', 'XL'], 'colors': [{'name': 'Storm Gray', 'hex': '#111111'}]},
  {'id': 'real-prod-95', 'title': 'NEBULA AIR PANTS, CEDAR', 'price': 56.3, 'oldPrice': undefined, 'isSale': false, 'isNew': false, 'gender': 'men', 'type': 'clothing', 'subType': 'tights', 'image': '/assets/images/products/real_prod_24.jpg', 'slug': 'nebula-air-pants-cedar', 'sizes': ['XS', 'S', 'M', 'L', 'XL'], 'colors': [{'name': 'Cedar', 'hex': '#111111'}]},
  {'id': 'real-prod-96', 'title': 'NEBULA GRAPHIC T-SHIRT, MERMAID', 'price': 60.25, 'oldPrice': undefined, 'isSale': false, 'isNew': false, 'gender': 'men', 'type': 'clothing', 'subType': 't-shirts', 'image': '/assets/images/products/real_prod_25.jpg', 'slug': 'nebula-graphic-t-shirt-mermaid', 'sizes': ['XS', 'S', 'M', 'L', 'XL'], 'colors': [{'name': 'Mermaid', 'hex': '#111111'}]},
  {'id': 'real-prod-97', 'title': 'NEBULA ESSENTIAL CREW, RAVEN', 'price': 64.2, 'oldPrice': 80.25, 'isSale': true, 'isNew': true, 'gender': 'men', 'type': 'clothing', 'subType': 'outerwear', 'image': '/assets/images/products/real_prod_26.jpg', 'slug': 'nebula-essential-crew-raven', 'sizes': ['XS', 'S', 'M', 'L', 'XL'], 'colors': [{'name': 'Raven', 'hex': '#111111'}]},
  {'id': 'real-prod-98', 'title': 'NEBULA SORONA T-SHIRT, TURTLEDOVE V2', 'price': 68.15, 'oldPrice': undefined, 'isSale': false, 'isNew': false, 'gender': 'men', 'type': 'clothing', 'subType': 't-shirts', 'image': '/assets/images/products/real_prod_27.jpg', 'slug': 'nebula-sorona-t-shirt-turtledove-v2', 'sizes': ['XS', 'S', 'M', 'L', 'XL'], 'colors': [{'name': 'Turtledove', 'hex': '#111111'}]},
  {'id': 'real-prod-99', 'title': 'NEBULA MOVE POLARTEC FLEECE JACKET, SPARROW', 'price': 72.1, 'oldPrice': undefined, 'isSale': false, 'isNew': false, 'gender': 'men', 'type': 'clothing', 'subType': 'outerwear', 'image': '/assets/images/products/real_prod_28.jpg', 'slug': 'nebula-move-polartec-fleece-jacket-sparrow', 'sizes': ['XS', 'S', 'M', 'L', 'XL'], 'colors': [{'name': 'Sparrow', 'hex': '#111111'}]},
  {'id': 'real-prod-100', 'title': 'NEBULA GRAPHIC BOXY T-SHIRT, ASPHALT', 'price': 76.05, 'oldPrice': 95.06, 'isSale': true, 'isNew': false, 'gender': 'men', 'type': 'clothing', 'subType': 't-shirts', 'image': '/assets/images/products/real_prod_29.jpg', 'slug': 'nebula-graphic-boxy-t-shirt-asphalt', 'sizes': ['XS', 'S', 'M', 'L', 'XL'], 'colors': [{'name': 'Asphalt', 'hex': '#111111'}]},
  {'id': 'real-prod-101', 'title': 'NEBULA SORONA LS, MERMAID BLUE', 'price': 80.0, 'oldPrice': undefined, 'isSale': false, 'isNew': false, 'gender': 'men', 'type': 'clothing', 'subType': 't-shirts', 'image': '/assets/images/products/real_prod_30.jpg', 'slug': 'nebula-sorona-ls-mermaid-blue', 'sizes': ['XS', 'S', 'M', 'L', 'XL'], 'colors': [{'name': 'Mermaid', 'hex': '#111111'}]},
  {'id': 'real-prod-102', 'title': 'NEBULA AIR HALF ZIP SHIRT, GUNMETAL', 'price': 83.95, 'oldPrice': undefined, 'isSale': false, 'isNew': false, 'gender': 'men', 'type': 'clothing', 'subType': 't-shirts', 'image': '/assets/images/products/real_prod_31.jpg', 'slug': 'nebula-air-half-zip-shirt-gunmetal', 'sizes': ['XS', 'S', 'M', 'L', 'XL'], 'colors': [{'name': 'Gunmetal', 'hex': '#111111'}]},
  {'id': 'real-prod-103', 'title': 'NEBULA COTTON LOGO SOCKS, BLACK V2', 'price': 87.9, 'oldPrice': 109.88, 'isSale': true, 'isNew': true, 'gender': 'men', 'type': 'clothing', 'subType': 't-shirts', 'image': '/assets/images/products/real_prod_32.jpg', 'slug': 'nebula-cotton-logo-socks-black-v2', 'sizes': ['XS', 'S', 'M', 'L', 'XL'], 'colors': [{'name': 'Black', 'hex': '#111111'}]},
  {'id': 'real-prod-104', 'title': 'NEBULA 2 in 1 RUNNING SHORT, STORM GRAY V2', 'price': 91.85, 'oldPrice': undefined, 'isSale': false, 'isNew': false, 'gender': 'women', 'type': 'clothing', 'subType': 'shorts', 'image': '/assets/images/products/real_prod_33.jpg', 'slug': 'nebula-2-in-1-running-short-storm-gray-v2', 'sizes': ['XS', 'S', 'M', 'L', 'XL'], 'colors': [{'name': 'Storm Gray', 'hex': '#111111'}]},
  {'id': 'real-prod-105', 'title': 'NEBULA SABER JACKET 2.0, CEDAR', 'price': 95.8, 'oldPrice': undefined, 'isSale': false, 'isNew': false, 'gender': 'women', 'type': 'clothing', 'subType': 'outerwear', 'image': '/assets/images/products/real_prod_34.jpg', 'slug': 'nebula-saber-jacket-2.0-cedar', 'sizes': ['XS', 'S', 'M', 'L', 'XL'], 'colors': [{'name': 'Cedar', 'hex': '#111111'}]},
];

export default function CategoryClient({ params }: CatchAllProps) {
  const resolvedParams = use(params);
  const pathArray = resolvedParams.category || [];

  // Standard Product Listing States
  const [selectedSizes, setSelectedSizes] = useState<string[]>([]);
  const [selectedColors, setSelectedColors] = useState<string[]>([]);
  const [sortOption, setSortOption] = useState<'featured' | 'low-to-high' | 'high-to-low'>('featured');
  const [showFiltersMobile, setShowFiltersMobile] = useState(false);

  // Category filters logic
  const isSaleCategory = pathArray.some(p => p.toLowerCase() === 'sale');
  const isMenCategory = pathArray.some(p => p.toLowerCase() === 'men');
  const isWomenCategory = pathArray.some(p => p.toLowerCase() === 'women');
  const isAccessoriesCategory = pathArray.some(p => p.toLowerCase() === 'accessories');
  
  const isTshirts = pathArray.some(p => p.toLowerCase().includes('t-shirt'));
  const isTights = pathArray.some(p => p.toLowerCase().includes('tight'));
  const isShorts = pathArray.some(p => p.toLowerCase().includes('short'));
  const isBags = pathArray.some(p => p.toLowerCase().includes('bag'));
  const isShoes = pathArray.some(p => p.toLowerCase().includes('shoe') || p.toLowerCase().includes('footwear') || p.toLowerCase().includes('sneaker'));

  // Header Title details
  const headerInfo = useMemo(() => {
    let title = "NEBULA COLLECTION";
    let desc = "Explore premium sportswear, athletic footwear, and functional gear designed for everyday missions.";

    if (isSaleCategory) {
      title = "FINAL SALE";
      desc = "Take extra discounts on select technical apparel, trail sneakers, and activewear.";
    } else if (isMenCategory) {
      title = "MEN'S COLLECTION";
      if (isShoes) title = "MEN'S TRAIL SHOES";
      else if (isShorts) title = "MEN'S RUNNING SHORTS";
      else if (isTshirts) title = "MEN'S T-SHIRTS & TOPS";
    } else if (isWomenCategory) {
      title = "WOMEN'S COLLECTION";
      if (isTights) title = "WOMEN'S ATHLETIC TIGHTS";
      else if (isTshirts) title = "WOMEN'S T-SHIRTS & TOPS";
    } else if (isAccessoriesCategory) {
      title = "ACCESSORIES & GEAR";
    }

    return { title, desc };
  }, [isSaleCategory, isMenCategory, isWomenCategory, isAccessoriesCategory, isShoes, isShorts, isTshirts, isTights]);

  // Product Grid calculations
  const filteredProducts = useMemo(() => {
    let result = [...catalogProducts];

    if (isSaleCategory) result = result.filter(p => p.isSale);
    if (isMenCategory) result = result.filter(p => p.gender === 'men' || p.gender === 'unisex');
    if (isWomenCategory) result = result.filter(p => p.gender === 'women' || p.gender === 'unisex');
    if (isAccessoriesCategory) result = result.filter(p => p.type === 'accessories');

    if (isTshirts) result = result.filter(p => p.subType === 't-shirts');
    if (isTights) result = result.filter(p => p.subType === 'tights');
    if (isShorts) result = result.filter(p => p.subType === 'shorts');
    if (isBags) result = result.filter(p => p.subType === 'bags');
    if (isShoes) result = result.filter(p => p.type === 'shoes');

    if (selectedSizes.length > 0) {
      result = result.filter(p => p.sizes.some(s => selectedSizes.includes(s)));
    }
    if (selectedColors.length > 0) {
      result = result.filter(p => p.colors.some(c => selectedColors.includes(c.name)));
    }

    if (sortOption === 'low-to-high') {
      result.sort((a, b) => a.price - b.price);
    } else if (sortOption === 'high-to-low') {
      result.sort((a, b) => b.price - a.price);
    }

    return result;
  }, [isSaleCategory, isMenCategory, isWomenCategory, isAccessoriesCategory, isTshirts, isTights, isShorts, isBags, isShoes, selectedSizes, selectedColors, sortOption]);

  const filterSizes = ["2XS", "XS", "S", "M", "L", "XL", "2XL", "36", "38", "40", "42", "44", "46"];
  const filterColors = [
    { name: "Black", hex: "#111111" },
    { name: "Grey", hex: "#5C5E62" },
    { name: "Green", hex: "#3B4033" },
    { name: "White", hex: "#FDFDFD" }
  ];

  const handleSizeToggle = (size: string) => {
    setSelectedSizes(prev => prev.includes(size) ? prev.filter(s => s !== size) : [...prev, size]);
  };

  const handleColorToggle = (colorName: string) => {
    setSelectedColors(prev => prev.includes(colorName) ? prev.filter(c => c !== colorName) : [...prev, colorName]);
  };

  const handleResetFilters = () => {
    setSelectedSizes([]);
    setSelectedColors([]);
    setSortOption('featured');
  };

  return (
    <div className="flex flex-col min-h-screen bg-[#EBE9E3] dark:bg-[#1a1a19] text-black dark:text-white font-sans selection:bg-brand-orange selection:text-white font-sans">
      <PromoBar />
      <Header />

      <main className="flex-grow w-full max-w-[1600px] mx-auto px-4 md:px-8 pt-36 pb-20 md:pt-44 md:pb-24">
        
        {/* Breadcrumbs */}
        <nav className="flex items-center space-x-1 text-[10px] font-black uppercase tracking-widest text-foreground/50 mb-6 select-none">
          <Link href="/" className="hover:text-foreground">Home</Link>
          <ChevronRight className="w-3 h-3" />
          {pathArray.map((path, idx) => (
            <span key={idx} className="flex items-center space-x-1">
              <span className={idx === pathArray.length - 1 ? "text-foreground font-black" : "hover:text-foreground"}>
                {path}
              </span>
              {idx < pathArray.length - 1 && <ChevronRight className="w-3 h-3" />}
            </span>
          ))}
        </nav>

        {/* Category Header */}
        <header className="border-b border-black/10 dark:border-white/10 pb-6 mb-8 md:mb-12 text-left">
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-black tracking-tighter uppercase mb-4 text-foreground">
            {headerInfo.title}
          </h1>
          <p className="text-xs md:text-sm font-semibold tracking-wide text-foreground/60 max-w-2xl leading-relaxed">
            {headerInfo.desc}
          </p>
        </header>

        {/* Toolbar Section (Filters & Sort Summary) */}
        <div className="flex justify-between items-center mb-6 pb-4 border-b border-black/5 dark:border-white/5">
          {/* Mobile Filter Trigger */}
          <button 
            onClick={() => setShowFiltersMobile(true)}
            className="flex items-center space-x-2 text-xs font-black tracking-widest uppercase md:hidden"
          >
            <SlidersHorizontal className="w-4 h-4" />
            <span>FILTERS ({selectedSizes.length + selectedColors.length})</span>
          </button>

          {/* Product count (desktop) */}
          <div className="hidden md:block text-xs font-black tracking-widest uppercase text-foreground/60">
            {filteredProducts.length} PRODUCTS FOUND
          </div>

          {/* Sorting Dropdown */}
          <div className="flex items-center space-x-3 text-xs font-bold uppercase tracking-wider">
            <span className="text-foreground/50 hidden sm:inline">SORT BY:</span>
            <select
              value={sortOption}
              onChange={(e) => setSortOption(e.target.value as any)}
              className="bg-white/40 dark:bg-white/5 border border-black/10 dark:border-white/10 py-1.5 px-3 rounded-none text-xs text-foreground font-bold focus:outline-none focus:border-brand-orange uppercase cursor-pointer"
            >
              <option value="featured">Featured</option>
              <option value="low-to-high">Price: Low to High</option>
              <option value="high-to-low">Price: High to Low</option>
            </select>
          </div>
        </div>

        {/* Trending Filter Pills */}
        <div className="flex flex-wrap gap-2 mb-8 items-center text-left">
          <span className="text-[10px] font-black tracking-widest text-foreground/45 uppercase mr-2 select-none">TRENDING:</span>
          {["Waterproof", "Military Spec", "OrthoLite Soles", "Recycled", "Vibram Grip", "Breathable"].map((tag) => (
            <button
              key={tag}
              type="button"
              className="py-1.5 px-3.5 bg-white/40 dark:bg-white/5 border border-black/10 dark:border-white/10 hover:border-brand-orange text-[10px] font-black tracking-wider uppercase rounded-full transition-all text-foreground select-none cursor-pointer"
            >
              #{tag}
            </button>
          ))}
        </div>

        {/* Main Grid: Filters Sidebar + Listings */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          
          {/* DESKTOP FILTER SIDEBAR (Col Span 1) */}
          <aside className="hidden md:flex flex-col text-left space-y-8 border-r border-black/10 dark:border-white/10 pr-6">
            
            {/* Header reset button */}
            <div className="flex justify-between items-center">
              <span className="text-xs font-black tracking-widest uppercase text-foreground">FILTERS</span>
              {(selectedSizes.length > 0 || selectedColors.length > 0) && (
                <button 
                  onClick={handleResetFilters}
                  className="text-[10px] text-brand-orange font-black uppercase hover:underline tracking-widest"
                >
                  RESET ALL
                </button>
              )}
            </div>

            {/* Sizes filter */}
            <div className="flex flex-col space-y-3">
              <h3 className="text-[10px] font-black tracking-widest uppercase text-foreground/50 border-b border-black/5 dark:border-white/5 pb-1">
                Filter by Size
              </h3>
              <div className="grid grid-cols-4 gap-1.5">
                {filterSizes.map((size) => (
                  <button
                    key={size}
                    onClick={() => handleSizeToggle(size)}
                    className={`py-1.5 text-center text-[10px] font-black rounded-sm border transition-all ${selectedSizes.includes(size) ? 'border-brand-orange bg-brand-orange/5 text-brand-orange' : 'border-black/10 dark:border-white/10 bg-white/20 dark:bg-white/5 hover:border-foreground text-foreground'}`}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>

            {/* Colors filter */}
            <div className="flex flex-col space-y-3">
              <h3 className="text-[10px] font-black tracking-widest uppercase text-foreground/50 border-b border-black/5 dark:border-white/5 pb-1">
                Filter by Color
              </h3>
              <div className="flex flex-wrap gap-2">
                {filterColors.map((color) => (
                  <button
                    key={color.name}
                    onClick={() => handleColorToggle(color.name)}
                    style={{ backgroundColor: color.hex }}
                    className={`w-6 h-6 rounded-full border transition-all ${selectedColors.includes(color.name) ? 'scale-110 border-brand-orange outline outline-2 outline-offset-1 outline-brand-orange' : 'border-black/20 dark:border-white/20'}`}
                    aria-label={`Filter ${color.name}`}
                  />
                ))}
              </div>
            </div>

          </aside>

          {/* PRODUCT CARDS LISTING GRID (Col Span 3) */}
          <div className="md:col-span-3">
            {filteredProducts.length === 0 ? (
              <div className="py-20 text-center flex flex-col justify-center items-center">
                <SlidersHorizontal className="w-12 h-12 text-foreground/20 mb-4" />
                <h3 className="text-sm font-black tracking-widest uppercase text-foreground mb-2">No products match filters</h3>
                <p className="text-xs text-foreground/60 max-w-[280px] leading-relaxed mb-6 font-medium">Try clearing your filters or choosing another category.</p>
                <button 
                  onClick={handleResetFilters}
                  className="py-3 px-8 bg-black dark:bg-white text-white dark:text-black hover:opacity-90 text-xs font-black tracking-widest uppercase rounded-sm shadow-md transition-all"
                >
                  CLEAR ALL FILTERS
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-2 lg:grid-cols-3 gap-x-4 gap-y-8 md:gap-y-12">
                {filteredProducts.map((product) => (
                  <motion.div
                    key={product.id}
                    className="group flex flex-col space-y-3 text-left relative"
                    whileHover={{ y: -4 }}
                    transition={{ duration: 0.2 }}
                  >
                    <Link href={`/products/${product.slug}`} className="block w-full h-full">
                      {/* Product Image Wrapper */}
                      <div className="relative aspect-square w-full overflow-hidden bg-white/20 dark:bg-white/5 border border-black/5 dark:border-white/5 rounded-sm">
                        <Image
                          src={product.image}
                          alt={product.title}
                          fill
                          className="object-cover transition-transform duration-[1200ms] group-hover:scale-103"
                          sizes="(min-width: 1024px) 30vw, 50vw"
                          loading="lazy"
                        />
                        <div className="absolute inset-0 bg-black/5 dark:bg-black/10 transition-opacity opacity-0 group-hover:opacity-100" />
                        
                        {/* Dynamic category badge */}
                        {(product.isSale || product.isNew) && (
                          <span className={`absolute top-2 left-2 text-[8px] font-black uppercase tracking-wider px-2 py-0.5 rounded-sm text-white ${product.isSale ? 'bg-[#FF6600]' : 'bg-brand-green'}`}>
                            {product.isSale ? 'SALE' : 'NEW'}
                          </span>
                        )}
                      </div>

                      {/* Detail Text Box */}
                      <div className="mt-3 flex flex-col">
                        <h3 className="text-xs font-black tracking-tight uppercase line-clamp-1 group-hover:text-brand-orange transition-colors">
                          {product.title}
                        </h3>
                        <div className="flex items-center space-x-2 mt-1 text-[10px] font-extrabold tracking-wider">
                          <span className="text-foreground">{product.price.toFixed(2)} EUR</span>
                          {product.oldPrice && (
                            <span className="text-foreground/40 line-through">
                              {product.oldPrice.toFixed(2)} EUR
                            </span>
                          )}
                        </div>
                        <span className="text-[9px] text-foreground/45 mt-1 font-bold uppercase tracking-widest">
                          {product.colors.length} {product.colors.length === 1 ? 'Color' : 'Colors'}
                        </span>
                      </div>
                    </Link>
                  </motion.div>
                ))}
              </div>
            )}
          </div>

        </div>

        {/* Bottom Editorial Info Section */}
        <div className="mt-20 md:mt-28 border-t border-black/10 dark:border-white/10 pt-16 grid grid-cols-1 md:grid-cols-2 gap-8 text-left">
          <div className="space-y-4">
            <h3 className="text-xs font-black tracking-widest uppercase text-[#FF8500]">
              DANISH DESIGN &amp; MILITARY SPECIFICATION
            </h3>
            <p className="text-xs font-semibold text-foreground/70 leading-relaxed tracking-wide">
              NEBULA collections are developed and refined in Aarhus, Denmark. Our technical running apparel and trail footwear are engineered to meet military specifications, ensuring maximum protection, breathability, and comfort in any environment.
            </p>
          </div>
          <div className="space-y-4">
            <h3 className="text-xs font-black tracking-widest uppercase text-foreground/50">
              ORIGINS IN AARHUS TRAINING CAMPS
            </h3>
            <p className="text-xs font-semibold text-foreground/70 leading-relaxed tracking-wide">
              Drawing direct inspiration from Danish special forces tactical training routines, our garments prioritize ventilation, storage utility, and visibility. Every cut line is designed to support high-intensity movements, balancing athletic requirements with modern street style.
            </p>
          </div>
        </div>

      </main>

      {/* MOBILE FILTER SIDE-DRAWER */}
      <AnimatePresence>
        {showFiltersMobile && (
          <>
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowFiltersMobile(false)}
              className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 md:hidden"
            />
            <motion.div
              initial={{ x: '-100%' }}
              animate={{ x: 0 }}
              exit={{ x: '-100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="fixed top-0 left-0 h-full w-full max-w-[320px] bg-[#ebe9e3] dark:bg-[#181817] shadow-2xl z-50 flex flex-col md:hidden text-left"
            >
              {/* Mobile Drawer Header */}
              <div className="p-6 border-b border-black/10 dark:border-white/5 flex items-center justify-between">
                <span className="text-sm font-black tracking-widest uppercase">FILTERS</span>
                <button 
                  onClick={() => setShowFiltersMobile(false)}
                  className="p-2 rounded-full text-foreground/80 hover:bg-black/5 dark:hover:bg-white/5 transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Mobile Drawer Content */}
              <div className="flex-1 overflow-y-auto p-6 space-y-6">
                
                {/* Sizes filter */}
                <div className="flex flex-col space-y-3">
                  <h3 className="text-[10px] font-black tracking-widest uppercase text-foreground/50 border-b border-black/5 dark:border-white/5 pb-1">
                    Filter by Size
                  </h3>
                  <div className="grid grid-cols-4 gap-1.5">
                    {filterSizes.map((size) => (
                      <button
                        key={size}
                        onClick={() => handleSizeToggle(size)}
                        className={`py-1.5 text-center text-[10px] font-black rounded-sm border transition-all ${selectedSizes.includes(size) ? 'border-brand-orange bg-brand-orange/5 text-brand-orange' : 'border-black/10 dark:border-white/10 bg-white/20 dark:bg-white/5 hover:border-foreground text-foreground'}`}
                      >
                        {size}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Colors filter */}
                <div className="flex flex-col space-y-3">
                  <h3 className="text-[10px] font-black tracking-widest uppercase text-foreground/50 border-b border-black/5 dark:border-white/5 pb-1">
                    Filter by Color
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {filterColors.map((color) => (
                      <button
                        key={color.name}
                        onClick={() => handleColorToggle(color.name)}
                        style={{ backgroundColor: color.hex }}
                        className={`w-6 h-6 rounded-full border transition-all ${selectedColors.includes(color.name) ? 'scale-110 border-brand-orange outline outline-2 outline-offset-1 outline-brand-orange' : 'border-black/20 dark:border-white/20'}`}
                        aria-label={`Filter ${color.name}`}
                      />
                    ))}
                  </div>
                </div>

              </div>

              {/* Mobile Drawer Footer */}
              <div className="p-6 border-t border-black/10 dark:border-white/5 bg-white/20 dark:bg-black/20 flex space-x-3">
                <button 
                  onClick={() => setShowFiltersMobile(false)}
                  className="flex-1 py-3 bg-black dark:bg-white text-white dark:text-black hover:opacity-90 text-[10px] font-black tracking-widest uppercase rounded-sm shadow-md transition-all text-center flex items-center justify-center"
                >
                  VIEW PRODUCTS
                </button>
                <button 
                  onClick={handleResetFilters}
                  className="py-3 px-4 bg-transparent border border-black/10 dark:border-white/10 text-foreground text-[10px] font-black tracking-widest uppercase rounded-sm transition-all"
                >
                  RESET
                </button>
              </div>

            </motion.div>
          </>
        )}
      </AnimatePresence>

      <Footer />
    </div>
  );
}
