'use client';
import { useEffect, useState } from 'react';
import {
  Menu,
  X,
  Mail,
  Linkedin,
  Github,
  ArrowUpRight,
  MapPin,
  Phone,
  Pencil,
  Play,
  Pause,
  ChevronLeft,
  ChevronRight,
} from 'lucide-react';
import { useReveal, useActiveSection } from '@/hooks';

type Project = {
  slug: string;
  title: string;
  location: string;
  summary: string;
  image: string;
  gallery?: { src: string; caption: string }[];
  externalUrl?: string;
};

const KIRKLAND_LUXURY_GALLERY = [
  { src: '/images/past_projects/kirkland_luxury_home/Long_shot_front_entry.png', caption: 'Front Entry — Long Shot' },
  { src: '/images/past_projects/kirkland_luxury_home/Closer_shot_front_entry.png', caption: 'Front Entry — Close Up' },
  { src: '/images/past_projects/kirkland_luxury_home/Staircase_to_the_upper_level.png', caption: 'Staircase to Upper Level' },
  { src: '/images/past_projects/kirkland_luxury_home/Lower_level_office_room.png', caption: 'Lower Level Office' },
  { src: '/images/past_projects/kirkland_luxury_home/Office_bathroom.png', caption: 'Office Bathroom' },
  { src: '/images/past_projects/kirkland_luxury_home/additional/06_Staircase_to_Upper_Level.webp', caption: "Staircase to Main Living Level" },
  { src: '/images/new_photos/Main_level_patio.png', caption: 'Main Level Patio' },
  { src: '/images/new_photos/Living_space_fireplace_side.png', caption: 'Living Space — Fireplace Side' },
  { src: '/images/new_photos/Living_space_refrigerator_side.png', caption: 'Living Space — Kitchen Side' },
  { src: '/images/new_photos/Kitchen.png', caption: 'Main Kitchen — Long Shot' },
  { src: '/images/new_photos/Kitchen_from_fridge_side_view.png', caption: 'Main Kitchen — Close Up' },
  { src: '/images/past_projects/kirkland_luxury_home/additional/12_Main_Kitchen_Range_View.webp', caption: "Main Kitchen \u2014 Range View" },
  { src: '/images/new_photos/Spice_Kitchen.png', caption: 'Spice Kitchen' },
  { src: '/images/past_projects/kirkland_luxury_home/additional/14_Main_Level_Guest_Bedroom.webp', caption: "Main Level Guest Bedroom" },
  { src: '/images/past_projects/kirkland_luxury_home/additional/15_Upper_Level_Stair_Landing.webp', caption: "Upper Level Stair Landing" },
  { src: '/images/past_projects/kirkland_luxury_home/additional/16_Upper_Level_Hallway.webp', caption: "Upper Level Hallway" },
  { src: '/images/past_projects/kirkland_luxury_home/additional/17_Laundry_Room.webp', caption: "Laundry Room" },
  { src: '/images/upper_floor/master_suite/bedroom/Master_Bedroom.png', caption: 'Master Bedroom' },
  { src: '/images/upper_floor/children_bedrooms/bedroom_1/Children\'s_Bedroom_1.png', caption: "Primary Bedroom \u2014 Closet View" },
  { src: '/images/upper_floor/master_suite/bathroom/Master_Bathroom.png', caption: 'Master Bathroom' },
  { src: '/images/upper_floor/master_suite/closet/Master_Closet.png', caption: 'Master Closet' },
  { src: '/images/past_projects/kirkland_luxury_home/additional/22_Childrens_Bedroom_Corner_View.webp', caption: "Children\u2019s Bedroom \u2014 Corner View" },
  { src: '/images/past_projects/kirkland_luxury_home/additional/23_Childrens_Bedroom_Window_and_Closet.webp', caption: "Children\u2019s Bedroom \u2014 Window and Closet" },
  { src: '/images/past_projects/kirkland_luxury_home/additional/24_Childrens_Bathroom_Shower_and_Vanity.webp', caption: "Children\u2019s Bathroom \u2014 Shower and Vanity" },
  { src: '/images/main_level/guest_bedroom/Main_Level_Guest_Bedroom.png', caption: "Upper Level Bedroom" },
  { src: '/images/past_projects/kirkland_luxury_home/additional/26_Powder_Room.webp', caption: "Powder Room" },
  { src: '/images/past_projects/kirkland_luxury_home/additional/27_Guest_Bedroom.webp', caption: "Guest Bedroom" },
  { src: '/images/past_projects/kirkland_luxury_home/additional/28_Guest_Bathroom.webp', caption: "Guest Bathroom" },
  { src: '/images/past_projects/kirkland_luxury_home/additional/29_Bedroom_and_Ensuite_Entrance.webp', caption: "Bedroom and Ensuite Entrance" },
  { src: '/images/past_projects/kirkland_luxury_home/Garage.png', caption: 'Garage' },
  { src: '/images/past_projects/kirkland_luxury_home/schedule-a-tour.webp', caption: 'Interested? Schedule a tour' },
  { src: '/images/past_projects/kirkland_luxury_home/permit-cover-sheet.webp', caption: 'City of Kirkland Building Permit Cover Sheet — Secured by Key Concepts Construction' },
];

const ADU_9016_GALLERY = [
  { src: '/images/past_projects/9016_123rd_lane_adu/UNADJUSTEDNONRAW_thumb_2839.jpg', caption: 'Front entry' },
  { src: '/images/past_projects/9016_123rd_lane_adu/UNADJUSTEDNONRAW_thumb_283a.jpg', caption: 'Living area and entry' },
  { src: '/images/past_projects/9016_123rd_lane_adu/UNADJUSTEDNONRAW_thumb_2838.jpg', caption: 'Living area' },
  { src: '/images/past_projects/9016_123rd_lane_adu/UNADJUSTEDNONRAW_thumb_2837.jpg', caption: 'Kitchen' },
  { src: '/images/past_projects/9016_123rd_lane_adu/UNADJUSTEDNONRAW_thumb_2834.jpg', caption: 'Kitchen view' },
  { src: '/images/past_projects/9016_123rd_lane_adu/UNADJUSTEDNONRAW_thumb_283e.jpg', caption: 'Kitchen appliances' },
  { src: '/images/past_projects/9016_123rd_lane_adu/UNADJUSTEDNONRAW_thumb_283f.jpg', caption: 'Laundry' },
  { src: '/images/past_projects/9016_123rd_lane_adu/UNADJUSTEDNONRAW_thumb_2842.jpg', caption: 'Room with patio doors' },
  { src: '/images/past_projects/9016_123rd_lane_adu/UNADJUSTEDNONRAW_thumb_283b.jpg', caption: 'Patio doors' },
  { src: '/images/past_projects/9016_123rd_lane_adu/UNADJUSTEDNONRAW_thumb_283c.jpg', caption: 'Room view' },
  { src: '/images/past_projects/9016_123rd_lane_adu/UNADJUSTEDNONRAW_thumb_2832.jpg', caption: 'Room and closet doors' },
  { src: '/images/past_projects/9016_123rd_lane_adu/UNADJUSTEDNONRAW_thumb_2833.jpg', caption: 'Closet' },
  { src: '/images/past_projects/9016_123rd_lane_adu/UNADJUSTEDNONRAW_thumb_283d.jpg', caption: 'Closet view' },
  { src: '/images/past_projects/9016_123rd_lane_adu/UNADJUSTEDNONRAW_thumb_2841.jpg', caption: 'Bathroom with tub' },
  { src: '/images/past_projects/9016_123rd_lane_adu/UNADJUSTEDNONRAW_thumb_2840.jpg', caption: 'Bathroom vanity' },
  { src: '/images/past_projects/9016_123rd_lane_adu/UNADJUSTEDNONRAW_thumb_2836.jpg', caption: 'Bathroom sink' },
  { src: '/images/past_projects/9016_123rd_lane_adu/UNADJUSTEDNONRAW_thumb_2831.jpg', caption: 'Walk-in shower' },
  { src: '/images/past_projects/9016_123rd_lane_adu/UNADJUSTEDNONRAW_thumb_2835.jpg', caption: 'Shower detail' },
];

const MAIN_9016_GALLERY = [
  { src: "/images/past_projects/9016_main_home/front-with-planters.png", caption: "Front View" },
  { src: "/images/past_projects/9016_main_home/photo-02.webp", caption: "Another side view" },
  { src: "/images/past_projects/9016_main_home/photo-03.webp", caption: "Front/Side view" },
  { src: "/images/past_projects/9016_main_home/photo-04.webp", caption: "Another Front view, Garage" },
  { src: "/images/past_projects/9016_main_home/photo-05.webp", caption: "Front view" },
  { src: "/images/past_projects/9016_main_home/photo-06.webp", caption: "Back side of the yard" },
  { src: "/images/past_projects/9016_main_home/photo-07.webp", caption: "Kitchen, breakfast area" },
  { src: "/images/past_projects/9016_main_home/photo-08.webp", caption: "Kitchen area & Break fast bar" },
  { src: "/images/past_projects/9016_main_home/photo-09.webp", caption: "Kitchen area" },
  { src: "/images/past_projects/9016_main_home/photo-10.webp", caption: "Living room space" },
  { src: "/images/past_projects/9016_main_home/photo-11.webp", caption: "Dining area" },
  { src: "/images/past_projects/9016_main_home/photo-12.webp", caption: "Coffee machine and Sink on the other side of kitchen" },
  { src: "/images/past_projects/9016_main_home/photo-13.webp", caption: "Dining area" },
  { src: "/images/past_projects/9016_main_home/photo-14.webp", caption: "Living room space, Fireplace." },
  { src: "/images/past_projects/9016_main_home/photo-15.webp", caption: "Living and Dining space from different angle" },
  { src: "/images/past_projects/9016_main_home/photo-16.webp", caption: "2nd Kitchen" },
  { src: "/images/past_projects/9016_main_home/photo-17.webp", caption: "Master bed entrance area" },
  { src: "/images/past_projects/9016_main_home/photo-18.webp", caption: "Master Bedroom" },
  { src: "/images/past_projects/9016_main_home/photo-19.webp", caption: "Master bedroom" },
  { src: "/images/past_projects/9016_main_home/photo-20.webp", caption: "Master bedroom closet" },
  { src: "/images/past_projects/9016_main_home/photo-21.webp", caption: "Master bedroom's bathroom" },
  { src: "/images/past_projects/9016_main_home/photo-22.webp", caption: "Bathroom in the main floor" },
  { src: "/images/past_projects/9016_main_home/photo-23.webp", caption: "Main floor bedroom/media room" },
  { src: "/images/past_projects/9016_main_home/photo-24.webp", caption: "Main floor bedroom/media room" },
  { src: "/images/past_projects/9016_main_home/photo-25.webp", caption: "Bed room on the third floor" },
  { src: "/images/past_projects/9016_main_home/photo-26.webp", caption: "Bedroom on third floor" },
  { src: "/images/past_projects/9016_main_home/photo-27.webp", caption: "Children's bathroom on third floor" },
  { src: "/images/past_projects/9016_main_home/photo-28.webp", caption: "Master Bedroom closet" },
  { src: "/images/past_projects/9016_main_home/photo-29.webp", caption: "Laundry room" },
  { src: "/images/past_projects/9016_main_home/photo-30.webp", caption: "Master bedroom's attached bathroom" },
  { src: "/images/past_projects/9016_main_home/photo-31.webp", caption: "Master bedroom's bathroom" },
  { src: "/images/past_projects/9016_main_home/photo-32.webp", caption: "Master bedroom's bathroom sink & Shower." },
];

const REMODEL_9232_GALLERY = [
  { src: '/images/past_projects/9232_remodel/photo-01.webp', caption: 'Remodel photo 1' },
  { src: '/images/past_projects/9232_remodel/photo-02.webp', caption: 'Remodel photo 2' },
  { src: '/images/past_projects/9232_remodel/photo-03.webp', caption: 'Remodel photo 3' },
  { src: '/images/past_projects/9232_remodel/photo-04.webp', caption: 'Remodel photo 4' },
  { src: '/images/past_projects/9232_remodel/photo-05.webp', caption: 'Remodel photo 5' },
  { src: '/images/past_projects/9232_remodel/photo-06.webp', caption: 'Remodel photo 6' },
  { src: '/images/past_projects/9232_remodel/photo-07.webp', caption: 'Remodel photo 7' },
  { src: '/images/past_projects/9232_remodel/photo-08.webp', caption: 'Remodel photo 8' },
  { src: '/images/past_projects/9232_remodel/photo-09.webp', caption: 'Remodel photo 9' },
  { src: '/images/past_projects/9232_remodel/photo-10.webp', caption: 'Remodel photo 10' },
  { src: '/images/past_projects/9232_remodel/photo-11.webp', caption: 'Remodel photo 11' },
  { src: '/images/past_projects/9232_remodel/photo-12.webp', caption: 'Remodel photo 12' },
  { src: '/images/past_projects/9232_remodel/photo-13.webp', caption: 'Remodel photo 13' },
  { src: '/images/past_projects/9232_remodel/photo-14.webp', caption: 'Remodel photo 14' },
  { src: '/images/past_projects/9232_remodel/photo-15.webp', caption: 'Remodel photo 15' },
  { src: '/images/past_projects/9232_remodel/photo-16.webp', caption: 'Remodel photo 16' },
  { src: '/images/past_projects/9232_remodel/photo-17.webp', caption: 'Remodel photo 17' },
  { src: '/images/past_projects/9232_remodel/photo-18.webp', caption: 'Remodel photo 18' },
  { src: '/images/past_projects/9232_remodel/photo-19.webp', caption: 'Remodel photo 19' },
  { src: '/images/past_projects/9232_remodel/photo-20.webp', caption: 'Remodel photo 20' },
  { src: '/images/past_projects/9232_remodel/photo-21.webp', caption: 'Remodel photo 21' },
  { src: '/images/past_projects/9232_remodel/photo-22.webp', caption: 'Remodel photo 22' },
  { src: '/images/past_projects/9232_remodel/photo-23.webp', caption: 'Remodel photo 23' },
  { src: '/images/past_projects/9232_remodel/photo-24.webp', caption: 'Remodel photo 24' },
  { src: '/images/past_projects/9232_remodel/photo-25.webp', caption: 'Remodel photo 25' },
  { src: '/images/past_projects/9232_remodel/photo-26.webp', caption: 'Remodel photo 26' },
  { src: '/images/past_projects/9232_remodel/photo-27.webp', caption: 'Remodel photo 27' },
  { src: '/images/past_projects/9232_remodel/photo-28.webp', caption: 'Remodel photo 28' },
  { src: '/images/past_projects/9232_remodel/photo-29.webp', caption: 'Remodel photo 29' },
  { src: '/images/past_projects/9232_remodel/photo-30.webp', caption: 'Remodel photo 30' },
  { src: '/images/past_projects/9232_remodel/photo-31.webp', caption: 'Remodel photo 31' },
  { src: '/images/past_projects/9232_remodel/photo-32.webp', caption: 'Remodel photo 32' },
  { src: '/images/past_projects/9232_remodel/photo-33.webp', caption: 'Remodel photo 33' },
  { src: '/images/past_projects/9232_remodel/photo-34.webp', caption: 'Remodel photo 34' },
  { src: '/images/past_projects/9232_remodel/photo-35.webp', caption: 'Remodel photo 35' },
  { src: '/images/past_projects/9232_remodel/photo-36.webp', caption: 'Remodel photo 36' },
  { src: '/images/past_projects/9232_remodel/photo-37.webp', caption: 'Remodel photo 37' },

];

const NAV = [
  { id: 'about', label: 'About', href: '/#about' },
  { id: 'experience', label: 'Experience', href: '/#experience' },
  { id: 'skills', label: 'Skills', href: '/#skills' },
  { id: 'past-projects', label: 'Past Projects', href: '/past-projects' },
  { id: 'active-projects', label: 'Active Projects', href: '/active-projects' },
  { id: 'testimonials', label: 'Client Reviews', href: '/reviews' },
];

const EXPERIENCE = [
  {
    role: 'Founder, Builder & Architect',
    company: 'Key Concepts Construction LLC',
    location: 'Kirkland, WA',
    dates: '2006 — 2026 · 20 years of experience',
    bullets: [
      'Founded and grew a design-build firm delivering whole-home remodels and custom new construction across the Greater Eastside.',
      'Led a multidisciplinary team of designers, trades, and project managers to take builds from concept to keys with a single point of accountability.',
      'Residential construction: Custom homes, accessory dwelling units, and residential renovations.',
      'Commercial construction: Building and improving spaces for businesses, including restaurant projects.',
    ],
  },
];

const SKILL_GROUPS = [
  {
    category: 'Construction & Field',
    skills: ['Design-Build Delivery', 'Custom Framing', 'Finish Carpentry', 'Project Scheduling', 'Quality Control'],
  },
  {
    category: 'Design & Pre-Construction',
    skills: ['Architectural Drawings', 'Material Specification', 'Cost Estimating', 'Value Engineering', '3D Concepting'],
  },
  {
    category: 'Management & Client',
    skills: ['Subcontractor Management', 'Budget & Bidding', 'Client Communication', 'Permitting', 'Vendor Negotiation'],
  },
];

const PAST_PROJECTS: Project[] = [
  {
    slug: 'kirkland-luxury-home',
    title: '9437 Slater Avenue Northeast, Kirkland, Washington — New Construction',
    location: 'Kirkland, WA',
    summary:
      'September 2026 · A ground-up custom build featuring a primary suite with spa-inspired bath and walk-in closet, a dedicated children’s wing, and a welcoming main-level guest bedroom — every space finished with quiet, intentional craft. Completed build ready to lease or lease to buy.',
    image: '/images/past_projects/kirkland_luxury_home/Long_shot_front_entry.png',
    gallery: KIRKLAND_LUXURY_GALLERY,
  },
  {
    slug: 'sukoon-residence-redmond',
    title: 'Sukoon Residence Redmond — New Construction',
    location: 'Redmond, WA',
    summary: 'September 6, 2025 · Thoughtfully designed for modern living, Sukoon Residence blends warm wood finishes, expansive windows, and striking stone fireplace surrounds. The custom kitchen features richly grained cabinetry, a generous island, and seamless connections to inviting dining and living spaces. A serene primary suite with its own fireplace, beautifully detailed bathrooms, a wood-lined sauna, and a dedicated home theater bring comfort and character throughout. Outside, a landscaped courtyard with sculptural water features, a covered deck, and a backyard basketball court create welcoming spaces to relax and gather.',
    image: '/images/past_projects/sukoon_redmond/front.png',
    gallery: [
      {
            "src": "/images/past_projects/sukoon_redmond/front.png",
            "caption": "Front of the home"
      },
      {
            "src": "/images/past_projects/sukoon_redmond/clean-19.webp",
            "caption": "Front entrance and landscaped courtyard"
      },
      {
            "src": "/images/past_projects/sukoon_redmond/clean-18.webp",
            "caption": "Front courtyard looking toward the street"
      },
      {
            "src": "/images/past_projects/sukoon_redmond/clean-17.webp",
            "caption": "Formal living room"
      },
      {
            "src": "/images/past_projects/sukoon_redmond/clean-16.webp",
            "caption": "Statement fireplace and chandelier"
      },
      {
            "src": "/images/past_projects/sukoon_redmond/clean-15.webp",
            "caption": "Dining and formal living spaces"
      },
      {
            "src": "/images/past_projects/sukoon_redmond/clean-12.webp",
            "caption": "Dining room"
      },
      {
            "src": "/images/past_projects/sukoon_redmond/clean-08.webp",
            "caption": "Staircase and open living area"
      },
      {
            "src": "/images/past_projects/sukoon_redmond/clean-02.webp",
            "caption": "Family room and fireplace"
      },
      {
            "src": "/images/past_projects/sukoon_redmond/clean-09.webp",
            "caption": "Kitchen and island"
      },
      {
            "src": "/images/past_projects/sukoon_redmond/clean-13.webp",
            "caption": "Kitchen appliances and cabinetry"
      },
      {
            "src": "/images/past_projects/sukoon_redmond/clean-14.webp",
            "caption": "Kitchen island and family room"
      },
      {
            "src": "/images/past_projects/sukoon_redmond/clean-03.webp",
            "caption": "Primary bedroom and fireplace"
      },
      {
            "src": "/images/past_projects/sukoon_redmond/clean-07.webp",
            "caption": "Double vanity and glass shower"
      },
      {
            "src": "/images/past_projects/sukoon_redmond/clean-11.webp",
            "caption": "Powder room"
      },
      {
            "src": "/images/past_projects/sukoon_redmond/clean-10.webp",
            "caption": "Wood-lined sauna"
      },
      {
            "src": "/images/past_projects/sukoon_redmond/clean-01.webp",
            "caption": "Home theater"
      },
      {
            "src": "/images/past_projects/sukoon_redmond/clean-04.webp",
            "caption": "Rear exterior and covered deck"
      },
      {
            "src": "/images/past_projects/sukoon_redmond/clean-05.webp",
            "caption": "Covered deck and outdoor living"
      },
      {
            "src": "/images/past_projects/sukoon_redmond/clean-06.webp",
            "caption": "Backyard basketball court"
      }
],
  },
  {
    slug: '9232-128th-avenue-ne-remodel',
    title: '9232 128th Avenue Northeast, Kirkland, Washington 98033 — Remodel',
    location: 'Kirkland, WA',
    summary: 'May 2022 · A beautifully refreshed home with a bright, cohesive interior and a clean contemporary finish. The remodeled kitchen pairs gray cabinetry and light countertops with stainless-steel appliances, while pale flooring and recessed lighting create a welcoming flow through the living spaces. Updated bathrooms feature glass-enclosed showers, tiled finishes, and modern vanities, with built-in storage and a dedicated laundry area adding everyday convenience.',
    image: '/images/past_projects/9232_remodel/photo-01.webp',
    gallery: REMODEL_9232_GALLERY,
  },
  {
    slug: '9016-123rd-lane-ne-main-home',
    title: '9016 123rd Lane Northeast, Kirkland, Washington 98033 — Main Home — New Construction',
    location: 'Kirkland, WA',
    summary: 'September 2020 · This custom-built, five-bedroom, 5.5-bath luxury home in Kirkland brings contemporary design and thoughtful details together. The welcoming great room features a fireplace, while a gourmet kitchen and second kitchen offer space for cooking and entertaining. A spacious primary suite, smart-home controls, and a two-car garage with electric vehicle charging add comfort and convenience. A striking modern exterior and carefully finished interiors complete the home.',
    image: '/images/past_projects/9016_main_home/front-with-planters.png',
    gallery: MAIN_9016_GALLERY,
  },
  {
    slug: '9016-123rd-lane-northeast-kirkland',
    title: '9016 123rd Lane Northeast, Kirkland, Washington 98033 — ADU — New Construction',
    location: 'Kirkland, WA',
    summary: 'September 2020 · A custom-built, two-bedroom, two-bathroom ADU attached to the main home. Thoughtfully designed with a welcoming living area, a modern kitchen, and comfortable spaces for everyday living.',
    image: '/images/past_projects/9016_123rd_lane_adu/UNADJUSTEDNONRAW_thumb_2839.jpg',
    gallery: ADU_9016_GALLERY,
  },
  {
    "slug": "8738-126th-avenue-ne-kirkland",
    "title": "8738 126th Avenue Northeast, Kirkland, Washington \u2014 New Construction",
    "location": "Kirkland, WA",
    "summary": "July 2018 \u00b7 A contemporary Kirkland residence with warm wood siding, stone accents, and a distinctive blue front door. Expansive windows brighten the open living spaces, while a dramatic two-story fireplace and sleek stair railings define the entry. The custom kitchen pairs white cabinetry with a generous island and stainless steel appliances. Inviting family spaces, a dedicated home office, and dining with deck access complete the home.",
    "image": "/images/past_projects/8738_126th/photo-01.webp",
    "gallery": [
        {
            "src": "/images/past_projects/8738_126th/photo-01.webp",
            "caption": "Front exterior and landscaping"
        },
        {
            "src": "/images/past_projects/8738_126th/photo-02.webp",
            "caption": "Front entrance and garage"
        },
        {
            "src": "/images/past_projects/8738_126th/photo-03.webp",
            "caption": "Angled front exterior"
        },
        {
            "src": "/images/past_projects/8738_126th/photo-04.webp",
            "caption": "Blue front door and covered entry"
        },
        {
            "src": "/images/past_projects/8738_126th/photo-06.webp",
            "caption": "Foyer looking toward the front door"
        },
        {
            "src": "/images/past_projects/8738_126th/photo-05.webp",
            "caption": "Entry hallway"
        },
        {
            "src": "/images/past_projects/8738_126th/photo-14.webp",
            "caption": "Foyer, staircase, and sitting area"
        },
        {
            "src": "/images/past_projects/8738_126th/photo-07.webp",
            "caption": "Double-height sitting area and staircase"
        },
        {
            "src": "/images/past_projects/8738_126th/photo-08.webp",
            "caption": "Open living, dining, and kitchen"
        },
        {
            "src": "/images/past_projects/8738_126th/photo-15.webp",
            "caption": "Family room with backyard views"
        },
        {
            "src": "/images/past_projects/8738_126th/photo-16.webp",
            "caption": "Family room fireplace and built-ins"
        },
        {
            "src": "/images/past_projects/8738_126th/photo-17.webp",
            "caption": "Family room and kitchen"
        },
        {
            "src": "/images/past_projects/8738_126th/photo-09.webp",
            "caption": "Kitchen island and breakfast seating"
        },
        {
            "src": "/images/past_projects/8738_126th/photo-10.webp",
            "caption": "Kitchen cabinetry and island"
        },
        {
            "src": "/images/past_projects/8738_126th/photo-11.webp",
            "caption": "Kitchen and dining area"
        },
        {
            "src": "/images/past_projects/8738_126th/photo-12.webp",
            "caption": "Range and kitchen workspaces"
        },
        {
            "src": "/images/past_projects/8738_126th/photo-13.webp",
            "caption": "Dining area and deck access"
        },
        {
            "src": "/images/past_projects/8738_126th/photo-18.webp",
            "caption": "Home office"
        },
        {
            "src": "/images/past_projects/8738_126th/photo-19.webp",
            "caption": "Upper landing overlooking the double-height fireplace"
        },
        {
            "src": "/images/past_projects/8738_126th/photo-20.webp",
            "caption": "Double-height fireplace and stair railing"
        }
    ]
},
  {
    "slug": "7811-126th-avenue-ne-kirkland",
    "title": "7811 126th Avenue Northeast, Kirkland, Washington",
    "location": "Kirkland, WA",
    "summary": "May 2018 \u00b7 A welcoming Kirkland residence with a grand double-height entry, graceful curved staircase, and detailed millwork. Generous windows brighten the living spaces, while warm wood kitchen cabinetry, stone countertops, and inviting fireplaces create a timeless setting. Spacious bedrooms, a primary bathroom with a soaking tub, and flexible rooms for work and recreation complete the home. Select listing photos feature virtual staging.",
    "image": "/images/past_projects/7811_126th/photo-02.webp",
    "gallery": [
        {
            "src": "/images/past_projects/7811_126th/photo-02.webp",
            "caption": "Front exterior and entrance"
        },
        {
            "src": "/images/past_projects/7811_126th/photo-01.webp",
            "caption": "Front exterior and landscaping"
        },
        {
            "src": "/images/past_projects/7811_126th/photo-03.webp",
            "caption": "Double-height entry foyer"
        },
        {
            "src": "/images/past_projects/7811_126th/photo-04.webp",
            "caption": "Foyer and curved staircase"
        },
        {
            "src": "/images/past_projects/7811_126th/photo-05.webp",
            "caption": "Formal living room \u2014 virtually staged"
        },
        {
            "src": "/images/past_projects/7811_126th/photo-06.webp",
            "caption": "Formal dining room \u2014 virtually staged"
        },
        {
            "src": "/images/past_projects/7811_126th/photo-07.webp",
            "caption": "Home office \u2014 virtually staged"
        },
        {
            "src": "/images/past_projects/7811_126th/photo-08.webp",
            "caption": "Family room and kitchen \u2014 virtually staged"
        },
        {
            "src": "/images/past_projects/7811_126th/photo-09.webp",
            "caption": "Kitchen and breakfast area \u2014 virtually staged"
        },
        {
            "src": "/images/past_projects/7811_126th/photo-10.webp",
            "caption": "Kitchen cooktop and countertops"
        },
        {
            "src": "/images/past_projects/7811_126th/photo-11.webp",
            "caption": "Kitchen cabinetry and island"
        },
        {
            "src": "/images/past_projects/7811_126th/photo-12.webp",
            "caption": "Bathroom with vessel sink"
        },
        {
            "src": "/images/past_projects/7811_126th/photo-13.webp",
            "caption": "Media room \u2014 virtually staged"
        },
        {
            "src": "/images/past_projects/7811_126th/photo-14.webp",
            "caption": "Staircase and hallway"
        },
        {
            "src": "/images/past_projects/7811_126th/photo-15.webp",
            "caption": "Primary bedroom \u2014 virtually staged"
        },
        {
            "src": "/images/past_projects/7811_126th/photo-16.webp",
            "caption": "Primary bathroom and soaking tub"
        },
        {
            "src": "/images/past_projects/7811_126th/photo-17.webp",
            "caption": "Primary bathroom vanity"
        },
        {
            "src": "/images/past_projects/7811_126th/photo-18.webp",
            "caption": "Bedroom"
        },
        {
            "src": "/images/past_projects/7811_126th/photo-19.webp",
            "caption": "Bathroom with tub and shower"
        },
        {
            "src": "/images/past_projects/7811_126th/photo-20.webp",
            "caption": "Bonus room \u2014 virtually staged"
        },
        {"src": "/images/past_projects/7811_126th/photo-21.webp", "caption": "Bathroom with double vanity"},
        {"src": "/images/past_projects/7811_126th/photo-22.webp", "caption": "Covered deck and outdoor fireplace — virtually staged"},
        {"src": "/images/past_projects/7811_126th/photo-23.webp", "caption": "Backyard lawn and patio"}
    ]
},
  {
      "slug": "14620-ne-31st-street-h207-bellevue",
      "title": "14620 Northeast 31st Street, Apt H207, Bellevue, Washington 98007 — Remodel",
      "location": "Bellevue, WA",
      "summary": "May 2016 \u00b7 An inviting two-bedroom, one-bathroom condo with an open living and dining area. Warm wood kitchen cabinetry, contrasting countertops, a patterned backsplash, and generous pantry and closet storage create a comfortable, practical home.",
      "image": "/images/past_projects/14620_h207/bright-02.webp",
      "gallery": [
          {
              "src": "/images/past_projects/14620_h207/bright-02.webp",
              "caption": "Living room"
          },
          {
              "src": "/images/past_projects/14620_h207/bright-01.webp",
              "caption": "Dining area"
          },
          {
              "src": "/images/past_projects/14620_h207/bright-03.webp",
              "caption": "Kitchen and dining area"
          },
          {
              "src": "/images/past_projects/14620_h207/bright-05.webp",
              "caption": "Kitchen appliances"
          },
          {
              "src": "/images/past_projects/14620_h207/bright-06.webp",
              "caption": "Kitchen pass-through"
          },
          {
              "src": "/images/past_projects/14620_h207/bright-08.webp",
              "caption": "Kitchen sink and countertops"
          },
          {
              "src": "/images/past_projects/14620_h207/bright-04.webp",
              "caption": "Pantry and kitchen"
          },
          {
              "src": "/images/past_projects/14620_h207/bright-07.webp",
              "caption": "Pantry storage"
          },
          {
              "src": "/images/past_projects/14620_h207/bright-11.webp",
              "caption": "Bedroom two"
          },
          {
              "src": "/images/past_projects/14620_h207/bright-13.webp",
              "caption": "Bedroom"
          },
          {
              "src": "/images/past_projects/14620_h207/bright-10.webp",
              "caption": "Bedroom closet"
          },
          {
              "src": "/images/past_projects/14620_h207/bright-12.webp",
              "caption": "Second closet"
          },
          {
              "src": "/images/past_projects/14620_h207/bright-09.webp",
              "caption": "Bathroom"
          }
      ]
  },
  {
    "slug": "12408-ne-90th-street-kirkland",
    "title": "12408 Northeast 90th Street, Kirkland, Washington \u2014 New Construction",
    "location": "Kirkland, WA",
    "summary": "August 2015 \u00b7 A thoughtfully detailed Kirkland residence with coffered ceilings, generous windows, and inviting living spaces. Dark kitchen cabinetry, a spacious island, and a fireplace anchor the open main level. A formal dining room, home office, recreation room, and serene primary suite offer space for everyday living, while a covered deck opens to the landscaped backyard.",
    "image": "/images/past_projects/12408_ne_90th/photo-24.webp",
    "gallery": [
        {
            "src": "/images/past_projects/12408_ne_90th/photo-24.webp",
            "caption": "Front exterior and landscaped entrance"
        },
        {
            "src": "/images/past_projects/12408_ne_90th/photo-23.webp",
            "caption": "Front exterior, garage, and entry"
        },
        {
            "src": "/images/past_projects/12408_ne_90th/photo-25.webp",
            "caption": "Living room looking toward the kitchen"
        },
        {
            "src": "/images/past_projects/12408_ne_90th/photo-01.webp",
            "caption": "Living room with coffered ceiling and fireplace"
        },
        {
            "src": "/images/past_projects/12408_ne_90th/photo-02.webp",
            "caption": "Open living room and kitchen"
        },
        {
            "src": "/images/past_projects/12408_ne_90th/photo-03.webp",
            "caption": "Kitchen island and dark cabinetry"
        },
        {
            "src": "/images/past_projects/12408_ne_90th/photo-04.webp",
            "caption": "Dining room with chandelier and wall paneling"
        },
        {
            "src": "/images/past_projects/12408_ne_90th/photo-05.webp",
            "caption": "Dining room and staircase"
        },
        {
            "src": "/images/past_projects/12408_ne_90th/photo-06.webp",
            "caption": "Dining room looking toward the entry"
        },
        {
            "src": "/images/past_projects/12408_ne_90th/photo-08.webp",
            "caption": "Home office"
        },
        {
            "src": "/images/past_projects/12408_ne_90th/photo-09.webp",
            "caption": "Recreation room with pool table"
        },
        {
            "src": "/images/past_projects/12408_ne_90th/photo-12.webp",
            "caption": "Primary bedroom with tall windows and fireplace"
        },
        {
            "src": "/images/past_projects/12408_ne_90th/photo-07.webp",
            "caption": "Primary bathroom vanity and soaking tub"
        },
        {
            "src": "/images/past_projects/12408_ne_90th/photo-18.webp",
            "caption": "Primary bathroom with soaking tub and glass shower"
        },
        {
            "src": "/images/past_projects/12408_ne_90th/photo-19.webp",
            "caption": "Walk-in closet"
        },
        {
            "src": "/images/past_projects/12408_ne_90th/photo-10.webp",
            "caption": "Guest bedroom"
        },
        {
            "src": "/images/past_projects/12408_ne_90th/photo-14.webp",
            "caption": "Guest bedroom and dresser"
        },
        {
            "src": "/images/past_projects/12408_ne_90th/photo-11.webp",
            "caption": "Bedroom with floral bedding"
        },
        {
            "src": "/images/past_projects/12408_ne_90th/photo-13.webp",
            "caption": "Bedroom with backyard views"
        },
        {
            "src": "/images/past_projects/12408_ne_90th/photo-15.webp",
            "caption": "Bathroom vanity"
        },
        {
            "src": "/images/past_projects/12408_ne_90th/photo-16.webp",
            "caption": "Bathroom with tub and shower"
        },
        {
            "src": "/images/past_projects/12408_ne_90th/photo-17.webp",
            "caption": "Bathroom vanity and doorway"
        },
        {
            "src": "/images/past_projects/12408_ne_90th/photo-20.webp",
            "caption": "Covered deck and outdoor seating"
        },
        {
            "src": "/images/past_projects/12408_ne_90th/photo-21.webp",
            "caption": "Rear exterior and landscaped backyard"
        },
        {
            "src": "/images/past_projects/12408_ne_90th/photo-22.webp",
            "caption": "Rear exterior and lawn"
        }
    ]
},
  {
    slug: '9230-128th-avenue-ne-daylight-basement-guest-suite',
    title: '9230 128th Avenue Northeast, Kirkland, Washington 98033 — Daylight Basement Guest Suite — New Construction',
    location: 'Kirkland, WA',
    summary: 'January 2010 · A daylight basement guest suite featuring an open living and sleeping area, a kitchen with breakfast bar, and a full bathroom.',
    image: '/images/past_projects/9230_guest_suite/home-exterior-closer.webp',
    gallery: [
      {
            "src": "/images/past_projects/9230_guest_suite/driveway-closer.webp",
            "caption": "Long driveway approach to the home"
      },
      {
            "src": "/images/past_projects/9230_guest_suite/roadside-view-closer.webp",
            "caption": "Roadside view of the home and driveway"
      },
      {
            "src": "/images/past_projects/9230_guest_suite/home-exterior-closer.webp",
            "caption": "Home exterior from the driveway"
      },
      {
            "src": "/images/past_projects/9230_guest_suite/garage-entry-no-cars.webp",
            "caption": "Garage and entrance steps"
      },
      {
            "src": "/images/past_projects/9230_guest_suite/photo-04.webp",
            "caption": "Suite overview and staircase"
      },
      {
            "src": "/images/past_projects/9230_guest_suite/photo-01.webp",
            "caption": "Living area and kitchen"
      },
      {
            "src": "/images/past_projects/9230_guest_suite/photo-02.webp",
            "caption": "Living area with daylight window"
      },
      {
            "src": "/images/past_projects/9230_guest_suite/photo-05.webp",
            "caption": "Living and dining area"
      },
      {
            "src": "/images/past_projects/9230_guest_suite/photo-06.webp",
            "caption": "Living and sleeping area"
      },
      {
            "src": "/images/past_projects/9230_guest_suite/photo-07.webp",
            "caption": "Dining and living area"
      },
      {
            "src": "/images/past_projects/9230_guest_suite/photo-08.webp",
            "caption": "Dining area toward kitchen"
      },
      {
            "src": "/images/past_projects/9230_guest_suite/photo-09.webp",
            "caption": "Kitchen and breakfast bar"
      },
      {
            "src": "/images/past_projects/9230_guest_suite/photo-10.webp",
            "caption": "Breakfast bar and kitchen"
      },
      {
            "src": "/images/past_projects/9230_guest_suite/photo-11.webp",
            "caption": "Kitchen view"
      },
      {
            "src": "/images/past_projects/9230_guest_suite/photo-03.webp",
            "caption": "Kitchen appliances and cabinetry"
      },
      {
            "src": "/images/past_projects/9230_guest_suite/photo-12.webp",
            "caption": "Kitchen sink and appliances"
      },
      {
            "src": "/images/past_projects/9230_guest_suite/photo-13.webp",
            "caption": "Kitchen toward living area"
      },
      {
            "src": "/images/past_projects/9230_guest_suite/photo-14.webp",
            "caption": "Countertop and cabinetry"
      },
      {
            "src": "/images/past_projects/9230_guest_suite/photo-15.webp",
            "caption": "Sleeping area"
      },
      {
            "src": "/images/past_projects/9230_guest_suite/photo-16.webp",
            "caption": "Suite overview from sleeping area"
      },
      {
            "src": "/images/past_projects/9230_guest_suite/photo-17.webp",
            "caption": "Sleeping area toward kitchen"
      },
      {
            "src": "/images/past_projects/9230_guest_suite/photo-18.webp",
            "caption": "Bathroom vanity and tub"
      },
      {
            "src": "/images/past_projects/9230_guest_suite/photo-19.webp",
            "caption": "Tub and shower detail"
      },
      {
            "src": "/images/past_projects/9230_guest_suite/photo-20.webp",
            "caption": "Bathroom and storage area"
      },
      {
            "src": "/images/past_projects/9230_guest_suite/laundry.webp",
            "caption": "Laundry and storage area"
      }
],
  },
  {
    "slug": "9228-128th-avenue-ne-adu2",
    "title": "9228 128th Avenue Northeast, Kirkland, Washington 98033 \u2014 ADU2 \u2014 New Construction",
    "location": "Kirkland, WA",
    "summary": "January 2010 \u00b7 A one-bedroom, one-bathroom ADU with a full kitchen, granite countertops, in-unit laundry, and practical closet storage. Thoughtfully arranged living spaces offer comfort and convenience in Kirkland.",
    "image": "/images/past_projects/9228_adu2/photo-01.webp",
    "gallery": [
        {
            "src": "/images/past_projects/9228_adu2/photo-01.webp",
            "caption": "Living room"
        },
        {
            "src": "/images/past_projects/9228_adu2/photo-02.webp",
            "caption": "Kitchen"
        },
        {
            "src": "/images/past_projects/9228_adu2/photo-03.webp",
            "caption": "Bedroom"
        },
        {
            "src": "/images/past_projects/9228_adu2/photo-04.webp",
            "caption": "Closet"
        },
        {
            "src": "/images/past_projects/9228_adu2/photo-05.webp",
            "caption": "Bathroom"
        },
        {
            "src": "/images/past_projects/9228_adu2/photo-06.webp",
            "caption": "Laundry"
        }
    ]
},
  {
    "slug": "mishma-residence",
    "title": "Mishma Residence",
    "location": "",
    "summary": "A contemporary residence with expansive glazing, warm wood accents, and a striking entrance. This gallery pairs the architectural vision with construction progress, including steelwork, concrete detailing, and exterior finishes.",
    "image": "/images/past_projects/mishma_residence/photo-01.webp",
    "gallery": [
        {
            "src": "/images/past_projects/mishma_residence/photo-01.webp",
            "caption": "Architectural rendering \u2014 front exterior"
        },
        {
            "src": "/images/past_projects/mishma_residence/photo-02.webp",
            "caption": "Construction progress \u2014 exterior overview"
        },
        {
            "src": "/images/past_projects/mishma_residence/photo-03.webp",
            "caption": "Front entrance and canopy construction"
        },
        {
            "src": "/images/past_projects/mishma_residence/photo-04.webp",
            "caption": "Entry stairs and facade progress"
        },
        {
            "src": "/images/past_projects/mishma_residence/photo-05.webp",
            "caption": "Steel canopy installation"
        },
        {
            "src": "/images/past_projects/mishma_residence/photo-06.webp",
            "caption": "Steel frame and garage construction"
        },
        {
            "src": "/images/past_projects/mishma_residence/photo-07.webp",
            "caption": "Steel frame viewed from the entrance"
        },
        {
            "src": "/images/past_projects/mishma_residence/photo-08.webp",
            "caption": "Front facade during construction"
        },
        {
            "src": "/images/past_projects/mishma_residence/photo-09.webp",
            "caption": "Window and exterior finish details"
        },
        {
            "src": "/images/past_projects/mishma_residence/photo-10.webp",
            "caption": "Concrete formwork and facade construction"
        },
        {
            "src": "/images/past_projects/mishma_residence/photo-11.webp",
            "caption": "Reinforcement and concrete construction details"
        }
    ]
},
  {
    slug: 'lakeside-whole-home-remodel',
    title: 'Lakeside Whole-Home Remodel',
    location: 'Kirkland, WA',
    summary:
      'A full-gut remodel of a 1970s rambler reimagined as a warm, light-filled family home with vaulted ceilings and a new great-room layout.',
    image:
      'https://images.pexels.com/photos/8143944/pexels-photo-8143944.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
  },
  {
    slug: 'craftsman-residence',
    title: 'Custom New Build — Craftsman Residence',
    location: 'Sammamish, WA',
    summary:
      'Ground-up construction of a 3,800 sq ft Pacific Northwest craftsman, from foundation and framing through custom millwork and finish.',
    image:
      'https://images.pexels.com/photos/15369767/pexels-photo-15369767.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
  },
  {
    slug: 'designer-kitchen-great-room',
    title: 'Designer Kitchen & Great Room',
    location: 'Bellevue, WA',
    summary:
      'Reconfigured a dated kitchen into an open great room with custom oak cabinetry, a marble island, and integrated appliances.',
    image:
      'https://images.pexels.com/photos/35021550/pexels-photo-35021550.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
  },
  {
    slug: 'kanishka-indian-cuisine-redmond',
    title: '16651 Redmond Way, Suite 180, Redmond, Washington (Kanishka Indian Cuisine)',
    location: 'Redmond, WA',
    summary: 'Commercial project. Photos coming soon.',
    image: '',
    gallery: [],
  },
];

const ACTIVE_PROJECTS: Project[] = [
  {
    slug: 'kanishka-indian-cuisine-bellevue',
    title: 'Kanishka Indian Cuisine — Downtown Bellevue',
    location: 'Downtown Bellevue, WA',
    summary: 'Active commercial project. Photos coming soon.',
    image: '',
    gallery: [],
  },
  {
    "slug": "tacoma-lakeside-new-construction",
    "title": "5109 North Court Street, Ruston, Washington — New Construction",
    "location": "Ruston, WA",
    "summary": "Target completion: March 2027 \u00b7 A contemporary rental residence under construction at 5109 North Court Street, Ruston, Washington, featuring a crisp modern exterior, expansive windows with water views, and a dramatic double-height living area. Custom kitchen cabinetry, a fireplace, skylights, and deck connections are taking shape as interior finishes progress. The gallery includes construction progress, kitchen sketches, finish samples, and design reference images. Design references illustrate ideas and are not photographs of completed work at this property.",
    "image": "/images/active_projects/tacoma_lakeside/photo-02.webp",
    "gallery": [
        {
            "src": "/images/active_projects/tacoma_lakeside/photo-02.webp",
            "caption": "Front exterior and garage \u2014 construction progress"
        },
        {
            "src": "/images/active_projects/tacoma_lakeside/photo-01.webp",
            "caption": "Front exterior and construction site"
        },
        {
            "src": "/images/active_projects/tacoma_lakeside/photo-03.webp",
            "caption": "Entry hallway toward the double-height living area"
        },
        {
            "src": "/images/active_projects/tacoma_lakeside/photo-06.webp",
            "caption": "Double-height living area and upper landing"
        },
        {
            "src": "/images/active_projects/tacoma_lakeside/photo-10.webp",
            "caption": "Open living area and entry hallway"
        },
        {
            "src": "/images/active_projects/tacoma_lakeside/photo-09.webp",
            "caption": "Living room fireplace and tall windows"
        },
        {
            "src": "/images/active_projects/tacoma_lakeside/photo-04.webp",
            "caption": "Deck access and water views"
        },
        {
            "src": "/images/active_projects/tacoma_lakeside/photo-05.webp",
            "caption": "Main kitchen cabinetry and appliance installation"
        },
        {
            "src": "/images/active_projects/tacoma_lakeside/photo-07.webp",
            "caption": "Kitchen and dining area toward the deck"
        },
        {
            "src": "/images/active_projects/tacoma_lakeside/photo-08.webp",
            "caption": "Secondary kitchen cabinetry and tile backsplash"
        },
        {
            "src": "/images/active_projects/tacoma_lakeside/photo-11.webp",
            "caption": "Custom green built-in cabinetry"
        },
        {
            "src": "/images/active_projects/tacoma_lakeside/photo-12.webp",
            "caption": "Interior doorway and finish work"
        },
        {
            "src": "/images/active_projects/tacoma_lakeside/photo-14.webp",
            "caption": "Staircase and upper landing"
        },
        {
            "src": "/images/active_projects/tacoma_lakeside/photo-13.webp",
            "caption": "Upper level overlooking the living area"
        },
        {
            "src": "/images/active_projects/tacoma_lakeside/photo-15.webp",
            "caption": "Upper level windows and water views"
        },
        {
            "src": "/images/active_projects/tacoma_lakeside/photo-18.webp",
            "caption": "Water-view room with deck access"
        },
        {
            "src": "/images/active_projects/tacoma_lakeside/photo-19.webp",
            "caption": "Corner windows and deck doorway"
        },
        {
            "src": "/images/active_projects/tacoma_lakeside/photo-20.webp",
            "caption": "Interior glazing and hallway"
        },
        {
            "src": "/images/active_projects/tacoma_lakeside/photo-16.webp",
            "caption": "Bathroom shower enclosure and green tile"
        },
        {
            "src": "/images/active_projects/tacoma_lakeside/photo-17.webp",
            "caption": "Bathroom and walk-in closet cabinetry"
        },
        {
            "src": "/images/active_projects/tacoma_lakeside/photo-25.webp",
            "caption": "Wet bar cabinetry and sink"
        },
        {
            "src": "/images/active_projects/tacoma_lakeside/photo-27.webp",
            "caption": "Kitchen design sketch \u2014 option 1"
        },
        {
            "src": "/images/active_projects/tacoma_lakeside/photo-28.webp",
            "caption": "Kitchen design sketch \u2014 option 2"
        },
        {
            "src": "/images/active_projects/tacoma_lakeside/photo-29.webp",
            "caption": "Kitchen cabinetry layout plan"
        },
        {
            "src": "/images/active_projects/tacoma_lakeside/photo-32.webp",
            "caption": "Finish samples \u2014 wood and dark stone"
        },
        {
            "src": "/images/active_projects/tacoma_lakeside/photo-33.webp",
            "caption": "Finish sample \u2014 wood grain"
        },
        {
            "src": "/images/active_projects/tacoma_lakeside/photo-34.webp",
            "caption": "Design reference \u2014 kitchen and dining area"
        },
        {
            "src": "/images/active_projects/tacoma_lakeside/photo-21.webp",
            "caption": "Design reference \u2014 illuminated floating double vanity"
        },
        {
            "src": "/images/active_projects/tacoma_lakeside/photo-22.webp",
            "caption": "Design reference \u2014 round mirror and floating vanity"
        },
        {
            "src": "/images/active_projects/tacoma_lakeside/photo-23.webp",
            "caption": "Design reference \u2014 shower fixtures and stone tile"
        },
        {
            "src": "/images/active_projects/tacoma_lakeside/photo-24.webp",
            "caption": "Design reference \u2014 dark powder room vanity"
        },
        {
            "src": "/images/active_projects/tacoma_lakeside/photo-26.webp",
            "caption": "Design reference \u2014 stone sink and herringbone backsplash"
        },
        {
            "src": "/images/active_projects/tacoma_lakeside/photo-30.webp",
            "caption": "Design reference \u2014 freestanding bathtub and glass shower"
        },
        {
            "src": "/images/active_projects/tacoma_lakeside/photo-31.webp",
            "caption": "Design reference \u2014 vessel sink and illuminated mirror"
        }
    ]
},
  {
    slug: 'sammamish-washington-remodel',
    title: 'Sammamish, Washington — Remodel',
    location: 'Sammamish, WA',
    summary: 'Active residential remodel. Photos coming soon.',
    image: '',
    gallery: [],
  },
];

function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const active = useActiveSection(NAV.map((n) => n.id).filter((id) => id !== 'past-projects' && id !== 'active-projects'));

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 inset-x-0 z-50 transition-all duration-500 ${
        scrolled
          ? 'bg-sand-50/90 backdrop-blur-md border-b border-sand-200/70 shadow-sm'
          : 'bg-transparent'
      }`}
    >
      <nav className="mx-auto max-w-6xl px-6 lg:px-8">
        <div className="flex h-[88px] items-center justify-start gap-4">
          <a href="/#top" className="group relative block h-[88px] w-48 shrink-0 overflow-hidden rounded-md ring-1 ring-sand-200/80 transition-transform hover:-translate-y-0.5">
            <img
              src="/Key_concepts_logo copy.jpg"
              alt="Key Concepts Construction, LLC"
              className="h-full w-full object-cover object-center"
            />
          </a>

          <ul className="hidden md:flex items-center gap-1 whitespace-nowrap">
            {NAV.map((item) => (
              <li key={item.id}>
                <a
                  href={item.href}
                  className={`px-2 lg:px-3 py-2 text-sm lg:text-[15px] font-medium rounded-md transition-colors ${
                    active === item.id
                      ? 'text-slate-900'
                      : 'text-slate-500 hover:text-slate-900'
                  }`}
                >
                  {item.label}
                </a>
              </li>
            ))}
            <li>
              <a
                href="/contact"
                className="ml-2 inline-flex items-center rounded-md bg-slate-900 px-4 py-2 text-sm font-semibold text-sand-100 transition-all hover:bg-slate-800 hover:shadow-md"
              >
                Get in touch
              </a>
            </li>
          </ul>

          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            className="ml-auto md:hidden grid h-10 w-10 place-items-center rounded-md text-slate-700 hover:bg-sand-100"
            aria-label="Toggle menu"
            aria-expanded={open}
          >
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>

        <div
          className={`md:hidden overflow-hidden transition-all duration-300 ${
            open ? 'max-h-96 pb-4' : 'max-h-0'
          }`}
        >
          <ul className="flex flex-col gap-1 pt-2">
            {NAV.map((item) => (
              <li key={item.id}>
                <a
                  href={item.href}
                  onClick={() => setOpen(false)}
                  className="block px-3 py-2.5 rounded-md text-sm font-medium text-slate-700 hover:bg-sand-100"
                >
                  {item.label}
                </a>
              </li>
            ))}
            <li>
              <a
                href="/contact"
                onClick={() => setOpen(false)}
                className="mt-1 block rounded-md bg-slate-900 px-3 py-2.5 text-center text-sm font-semibold text-sand-100"
              >
                Get in touch
              </a>
            </li>
          </ul>
        </div>
      </nav>
    </header>
  );
}

function Hero() {
  return (
    <section id="top" className="relative hero-grain pt-[112px] pb-20">
      <div className="mx-auto max-w-6xl px-6 lg:px-8">
        <p className="mb-5 text-center font-serif text-xl font-semibold leading-tight text-slate-900 sm:mb-6 sm:text-3xl lg:text-4xl">You Dream It. We Design It. Together, We Bring It to Life.</p>
        <div className="overflow-hidden rounded-2xl shadow-lg">
          <img src="/home-feature.png" alt="Contemporary home exterior" className="block w-full h-auto" />
        </div>
      </div>
      <div className="mx-auto max-w-6xl px-6 lg:px-8 w-full grid lg:grid-cols-2 gap-12 items-center mt-12">
        <div className="animate-fade-up">
          <span className="inline-flex items-center gap-2 rounded-full border border-sand-300 bg-sand-50/60 px-3 py-1 text-xs font-medium tracking-wide text-sand-700">
            <MapPin className="h-3.5 w-3.5" /> Kirkland, Washington
          </span>
          <h1 className="mt-5 font-serif text-5xl sm:text-6xl lg:text-7xl font-semibold leading-[1.05] tracking-tight text-slate-900">
            Key Concepts
            <span className="block text-sand-600">Construction LLC</span>
          </h1>
          <p className="mt-5 text-lg sm:text-xl font-medium text-slate-700">
            General Contractor &amp; Design-Build
          </p>
          <p className="mt-3 max-w-md text-base leading-relaxed text-slate-500">
            We take homes from first sketch to final key — designing and building
            thoughtful, durable spaces across the Greater Eastside.
          </p>
          <div className="mt-8 flex flex-wrap items-center gap-3">
            <a
              href="/past-projects"
              className="inline-flex items-center gap-2 rounded-md bg-slate-900 px-5 py-3 text-sm font-semibold text-sand-100 transition-all hover:bg-slate-800 hover:shadow-lg hover:-translate-y-0.5"
            >
              View our work <ArrowUpRight className="h-4 w-4" />
            </a>
            <a
              href="/contact"
              className="inline-flex items-center gap-2 rounded-md border border-sand-300 px-5 py-3 text-sm font-semibold text-slate-700 transition-all hover:border-sand-400 hover:bg-sand-100"
            >
              Start a project
            </a>
          </div>
        </div>

        <div className="relative animate-scale-in hidden lg:block">
          <div className="overflow-hidden rounded-2xl shadow-2xl ring-1 ring-sand-200">
            <img
              src="https://images.pexels.com/photos/39151698/pexels-photo-39151698.jpeg?auto=compress&cs=tinysrgb&h=650&w=940"
              alt="Wooden house frame under construction against a clear sky"
              className="h-[460px] w-full object-cover"
              loading="eager"
            />
          </div>
          <div className="absolute -bottom-5 -left-5 rounded-xl bg-sand-50/95 backdrop-blur border border-sand-200 px-5 py-4 shadow-xl">
            <p className="font-serif text-2xl font-semibold text-slate-900">20+ yrs</p>
            <p className="text-xs font-medium text-slate-500">building in the PNW</p>
          </div>
        </div>
      </div>
    </section>
  );
}

function SectionHeading({
  eyebrow,
  title,
  blurb,
}: {
  eyebrow: string;
  title: string;
  blurb?: string;
}) {
  const ref = useReveal<HTMLDivElement>();
  return (
    <div ref={ref} className="reveal max-w-2xl">
      <p className="text-xs font-semibold uppercase tracking-[0.2em] text-sand-600">
        {eyebrow}
      </p>
      <h2 className="mt-3 font-serif text-3xl sm:text-4xl font-semibold tracking-tight text-slate-900">
        {title}
      </h2>
      {blurb && <p className="mt-4 text-base leading-relaxed text-slate-500">{blurb}</p>}
    </div>
  );
}

function About() {
  const ref = useReveal<HTMLDivElement>();
  return (
    <section id="about" className="pt-24 pb-8 sm:pt-32 sm:pb-10 bg-sand-50">
      <div className="mx-auto max-w-6xl px-6 lg:px-8">
        <SectionHeading
          eyebrow="About"
          title="Building with intention, from concept to keys."
        />
        <div ref={ref} className="reveal mt-10 grid lg:grid-cols-5 gap-10 items-start">
          <div className="lg:col-span-3 space-y-5 text-lg leading-relaxed text-slate-600">
            <p>
              Key Concepts Construction is a general contractor and design-build firm
              based in Kirkland, Washington, serving homeowners across the Greater
              Eastside. We believe great buildings start with clear thinking —
              listening closely, drawing carefully, and executing with craft.
            </p>
            <p>
              As a design-build company we hold both the drawing board and the
              hammer, which means one accountable team carries your project from
              first sketch to final walkthrough. The result is fewer handoffs,
              tighter budgets, and homes that feel considered down to the last detail.
            </p>
            <p>
              Founder Giri Devaraju holds a bachelor's degree in civil engineering
              and a master's degree in structural engineering. His passion for designing
              and building homes, and for turning clients' dreams into reality, drew him
              to construction.
            </p>
            <p>
              We now offer property management services, extending our care for
              properties beyond design and construction. Contact us to discuss
              your property management needs and how we can support you.
            </p>
          </div>

          <aside className="lg:col-span-2 rounded-2xl border border-sand-200 bg-white p-6 shadow-sm">
            <dl className="space-y-5">
              <div>
                <dt className="text-xs font-semibold uppercase tracking-wide text-sand-600">Founder</dt>
                <dd className="mt-1 text-slate-700">Giri Devaraju</dd>
              </div>
              <div>
                <dt className="text-xs font-semibold uppercase tracking-wide text-sand-600">Founded</dt>
                <dd className="mt-1 text-slate-700">2010</dd>
              </div>
              <div>
                <dt className="text-xs font-semibold uppercase tracking-wide text-sand-600">
                  Based in
                </dt>
                <dd className="mt-1 flex items-center gap-2 text-slate-700">
                  <MapPin className="h-4 w-4 text-sand-500" /> Kirkland, Washington
                </dd>
              </div>
              <div>
                <dt className="text-xs font-semibold uppercase tracking-wide text-sand-600">
                  Specialty
                </dt>
                <dd className="mt-1 text-slate-700">Design-Build, New Residential Construction, New Commercial Construction &amp; Whole-Home Remodels. Expertise in building codes, zoning, project costs, timelines, permits, planning, and return on investment (ROI).</dd>
              </div>
              <div>
                <dt className="text-xs font-semibold uppercase tracking-wide text-sand-600">
                  Service area
                </dt>
                <dd className="mt-1 text-slate-700">
                  Kirkland, Bellevue, Sammamish, Redmond &amp; the Greater Eastside
                </dd>
              </div>
            </dl>
          </aside>
        </div>
      </div>
    </section>
  );
}

function Experience() {
  return (
    <section id="experience" className="py-8 sm:py-10 bg-white border-y border-sand-200">
      <div className="mx-auto max-w-6xl px-6 lg:px-8">
        <SectionHeading
          eyebrow="Experience"
          title="A path built on the tools."
          blurb="From design to construction, the details are the project."
        />
        <ol className="mt-8 relative border-l border-sand-200 ml-3">
          {EXPERIENCE.map((job, i) => (
            <TimelineItem key={i} job={job} />
          ))}
        </ol>
      </div>
    </section>
  );
}

function TimelineItem({
  job,
}: {
  job: (typeof EXPERIENCE)[number];
}) {
  const ref = useReveal<HTMLLIElement>();
  return (
    <li ref={ref} className="reveal relative pl-8 pb-12 last:pb-0">
      <span className="absolute -left-[9px] top-1.5 grid h-4 w-4 place-items-center rounded-full bg-sand-600 ring-4 ring-sand-100" />
      <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
        <h3 className="font-serif text-xl font-semibold text-slate-900">{job.role}</h3>
        <span className="text-sm font-medium text-sand-600">{job.dates}</span>
      </div>
      <p className="mt-1 text-sm font-medium text-slate-500">
        {job.company} · {job.location}
      </p>
      <ul className="mt-4 space-y-2">
        {job.bullets.map((b, j) => (
          <li key={j} className="flex items-start gap-2.5 text-slate-600">
            <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-sand-400" />
            <span className="leading-relaxed">{b}</span>
          </li>
        ))}
      </ul>
    </li>
  );
}

function Skills() {
  return (
    <section id="skills" className="py-8 sm:py-10 bg-sand-50">
      <div className="mx-auto max-w-6xl px-6 lg:px-8">
        <SectionHeading
          eyebrow="Skills"
          title="From sketchpad to jobsite."
          blurb="A design-build firm has to wear a lot of hats. Here's what we bring under one roof."
        />
        <div className="mt-8 grid gap-6 md:grid-cols-3">
          {SKILL_GROUPS.map((group, i) => (
            <SkillCard key={group.category} group={group} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}

function SkillCard({
  group,
  index,
}: {
  group: (typeof SKILL_GROUPS)[number];
  index: number;
}) {
  const ref = useReveal<HTMLDivElement>();
  return (
    <div
      ref={ref}
      className="reveal rounded-2xl border border-sand-200 bg-white p-6 shadow-sm transition-all duration-300 hover:shadow-md hover:-translate-y-1"
      style={{ transitionDelay: `${index * 80}ms` }}
    >
      <h3 className="font-serif text-lg font-semibold text-slate-900">{group.category}</h3>
      <ul className="mt-4 flex flex-wrap gap-2">
        {group.skills.map((skill) => (
          <li
            key={skill}
            className="rounded-full bg-sand-100 px-3 py-1.5 text-sm font-medium text-slate-700 transition-colors hover:bg-sand-200"
          >
            {skill}
          </li>
        ))}
      </ul>
    </div>
  );
}

function Projects() {
  const ref = useReveal<HTMLDivElement>();
  return (
    <section id="projects" className="py-8 sm:py-10 bg-white border-y border-sand-200">
      <div className="mx-auto max-w-6xl px-6 lg:px-8">
        <SectionHeading
          eyebrow="Projects & Highlights"
          title="A portfolio with momentum."
          blurb="Explore completed work and the projects currently taking shape across the Greater Eastside."
        />
        <div ref={ref} className="reveal mt-8 grid gap-6 md:grid-cols-2">
          <ProjectIndexCard
            href="/past-projects"
            eyebrow="Past Projects"
            title="Finished with care."
            description="Explore completed remodels and new builds, from the first drawing to the final walkthrough."
            image={PAST_PROJECTS[0].image}
          />
          <ProjectIndexCard
            href="/active-projects"
            eyebrow="Active Projects"
            title="Currently taking shape."
            description="See what's in design, construction, or the early stages of becoming a place to call home."
            image={ACTIVE_PROJECTS[0].image}
          />
        </div>
      </div>
    </section>
  );
}

function ProjectIndexCard({
  href,
  eyebrow,
  title,
  description,
  image,
}: {
  href: string;
  eyebrow: string;
  title: string;
  description: string;
  image: string;
}) {
  return (
    <a
      href={href}
      className="group relative min-h-72 overflow-hidden rounded-2xl border border-sand-200 bg-slate-900 shadow-sm transition-all duration-500 hover:-translate-y-1 hover:shadow-xl"
    >
      <img
        src={image}
        alt=""
        className="absolute inset-0 h-full w-full object-cover opacity-55 transition-transform duration-700 group-hover:scale-105"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-slate-950/95 via-slate-900/35 to-transparent" />
      <div className="relative flex min-h-72 flex-col justify-end p-7">
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-sand-300">{eyebrow}</p>
        <h3 className="mt-2 font-serif text-3xl font-semibold text-white">{title}</h3>
        <p className="mt-2 max-w-md text-sm leading-relaxed text-sand-100/80">{description}</p>
        <span className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-sand-200">
          View projects <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
        </span>
      </div>
    </a>
  );
}

function ProjectsPage({
  type,
}: {
  type: 'past' | 'active';
}) {
  const isPast = type === 'past';
  const projects = isPast ? PAST_PROJECTS : ACTIVE_PROJECTS;
  const ref = useReveal<HTMLDivElement>();

  return (
    <div className="min-h-screen bg-sand-50">
      <Nav />
      <main className="pt-[88px]">
        <section className={`border-b border-sand-200 bg-white ${isPast ? 'pt-8 pb-5 sm:pt-10 sm:pb-6' : 'pt-6 pb-5 sm:pt-8 sm:pb-6'}`}>
          <div className="mx-auto max-w-6xl px-6 lg:px-8">
            <a href="/#projects" className="text-sm font-semibold text-sand-700 transition-colors hover:text-slate-900">
              ← Back to projects
            </a>
            <p className="mt-5 text-xs font-semibold uppercase tracking-[0.2em] text-sand-600">
              {isPast ? 'Portfolio archive' : 'In the works'}
            </p>
            <h1 className="mt-3 max-w-3xl font-serif text-5xl font-semibold tracking-tight text-slate-900 sm:text-6xl">
              {isPast ? 'Past Projects' : 'Active Projects'}
            </h1>
            <p className="mt-5 max-w-2xl text-lg leading-relaxed text-slate-500">
              {isPast
                ? 'A selection of homes and spaces completed with thoughtful planning, honest communication, and a close eye for the details.'
                : 'A look at the residential and commercial projects currently in design or construction.'}
            </p>
          </div>
        </section>
        <section className="pt-6 pb-16 sm:pt-8 sm:pb-20">
          <div ref={ref} className="reveal mx-auto grid max-w-6xl gap-8 px-6 md:grid-cols-2 lg:grid-cols-3 lg:px-8">
            {projects.map((project, index) => (
              <ProjectCard key={project.title} project={project} index={index} />
            ))}
          </div>
          {!isPast && (
            <p className="mx-auto mt-10 flex max-w-6xl items-start gap-2 px-6 text-sm text-slate-500 lg:px-8">
              <Pencil className="mt-0.5 h-4 w-4 shrink-0 text-sand-600" />
              <span><span className="font-medium text-slate-600">Placeholder:</span> Replace the active project cards with your current builds and update their status as work progresses.</span>
            </p>
          )}
        </section>
      </main>
      <Footer />
    </div>
  );
}

function ProjectCard({
  project,
  index,
}: {
  project: Project;
  index: number;
}) {
  const ref = useReveal<HTMLDivElement>();
  const photoCount = (project.gallery ?? []).length;
  return (
    <a
      ref={ref}
      href={project.externalUrl ?? `/projects/${project.slug}`}
      target={project.externalUrl ? "_blank" : undefined}
      rel={project.externalUrl ? "noopener noreferrer" : undefined}
      style={{ transitionDelay: `${index * 100}ms` }}
      className="reveal group flex flex-col overflow-hidden rounded-2xl border border-sand-200 bg-white shadow-sm transition-all duration-500 hover:shadow-xl hover:-translate-y-1.5"
    >
      <div className="relative overflow-hidden">
        {project.image ? <img
          src={project.image}
          alt={project.title}
          loading="lazy"
          className={`aspect-[1541/1020] w-full ${project.slug === '8738-126th-avenue-ne-kirkland' ? 'object-contain bg-sand-200' : 'object-cover'} transition-transform duration-700 ${project.slug === '9016-123rd-lane-ne-main-home' ? '' : 'group-hover:scale-105'}`}
        /> : <div className="flex aspect-[1541/1020] w-full items-center justify-center bg-sand-200 text-sm font-medium text-slate-600">{project.externalUrl ? "Photos available on Facebook" : "Photos coming soon"}</div>}
        {project.location && <span className="absolute top-3 left-3 inline-flex items-center gap-1 rounded-full bg-sand-50/90 px-2.5 py-1 text-xs font-medium text-slate-700 backdrop-blur">
          <MapPin className="h-3 w-3" /> {project.location}
        </span>}
        {photoCount > 0 && (
          <span className="absolute top-3 right-3 inline-flex items-center gap-1 rounded-full bg-slate-900/80 px-2.5 py-1 text-xs font-semibold text-sand-100 backdrop-blur">
            {photoCount} photos
          </span>
        )}
      </div>
      <div className="flex flex-1 flex-col p-6">
        <h3 className="font-serif text-lg font-semibold text-slate-900">{project.title}</h3>
        <p className="mt-2 flex-1 text-sm leading-relaxed text-slate-500">{project.summary}</p>
        <span className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-sand-700">
          {project.externalUrl ? "View on Facebook" : "View project"} <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
        </span>
      </div>
    </a>
  );
}

function ProjectDetail({
  project,
}: {
  project: Project;
}) {
  const gallery = project.gallery ?? [];
  const [index, setIndex] = useState(0);
  const [playing, setPlaying] = useState(true);
  const ref = useReveal<HTMLDivElement>();

  // ~1 minute tour: 11 photos x about 5.5s each
  const SLIDE_MS = 5450;
  const total = gallery.length;
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    if (!playing || total <= 1) return;
    const t = setTimeout(() => {
      setIndex((i) => (i + 1) % total);
    }, SLIDE_MS);
    return () => clearTimeout(t);
  }, [index, playing, total]);

  useEffect(() => {
    if (!playing || total <= 1) return;
    const start = Date.now();
    const tick = setInterval(() => {
      const elapsed = Date.now() - start;
      setProgress(Math.min((elapsed / SLIDE_MS) * 100, 100));
    }, 100);
    return () => clearInterval(tick);
  }, [index, playing, total]);

  const go = (dir: number) => {
    setPlaying(false);
    setIndex((i) => (i + dir + total) % total);
  };

  return (
    <div className="min-h-screen bg-sand-50">
      <Nav />
      <main className="pt-[88px]">
        <section className={`border-b border-sand-200 bg-white ${ACTIVE_PROJECTS.some((activeProject) => activeProject.slug === project.slug) ? 'pt-6 pb-8 sm:pt-8 sm:pb-10' : 'py-16 sm:py-20'}`}>
          <div className="mx-auto max-w-6xl px-6 lg:px-8">
            <a href={ACTIVE_PROJECTS.some((activeProject) => activeProject.slug === project.slug) ? '/active-projects' : '/past-projects'} className="text-sm font-semibold text-sand-700 transition-colors hover:text-slate-900">
              {ACTIVE_PROJECTS.some((activeProject) => activeProject.slug === project.slug) ? '← Back to active projects' : '← Back to past projects'}
            </a>
            <h1 className="mt-8 max-w-3xl font-serif text-4xl font-semibold tracking-tight text-slate-900 sm:text-5xl">
              {project.title}
            </h1>
            {project.slug === 'kirkland-luxury-home' && (
              <div className="mt-5 flex flex-col gap-2 text-sm text-slate-600 sm:flex-row sm:items-center sm:gap-5">
                <span className="font-semibold text-sand-700">Completed build · Ready to lease or lease to buy</span>
                <span>Contact Giri Devaraju at 425-736-2810 or Sunee Pubbaraju at 425-518-6655.</span>
              </div>
            )}
            {project.location && <p className="mt-3 inline-flex items-center gap-1.5 text-sm font-medium text-slate-500">
              <MapPin className="h-4 w-4 text-sand-500" /> {project.location}
            </p>}
            <p className="mt-5 max-w-2xl text-lg leading-relaxed text-slate-500">
              {project.summary}
            </p>
          </div>
        </section>

        {total > 0 ? (
          <section className="py-12 sm:py-16 bg-slate-950">
            <div className="mx-auto max-w-5xl px-4 sm:px-6">
              <div ref={ref} className="reveal relative overflow-hidden rounded-2xl shadow-2xl ring-1 ring-white/10">
                {/* Slides */}
                <div className="relative w-full" style={{ aspectRatio: project.slug === '9016-123rd-lane-ne-main-home' ? '1541 / 1020' : '16 / 10' }}>
                  {gallery.map((photo, i) => (
                    <div
                      key={photo.src}
                      className={`absolute inset-0 transition-opacity duration-1000 ${
                        i === index ? 'opacity-100' : 'opacity-0'
                      }`}
                    >
                      <img
                        src={photo.src}
                        alt={photo.caption}
                        className={`h-full w-full ${(project.slug === 'tacoma-lakeside-new-construction' || photo.src.endsWith('permit-cover-sheet.webp') || photo.src.endsWith('schedule-a-tour.webp') || (project.slug === '9016-123rd-lane-ne-main-home' && i === 0)) ? 'object-contain' : 'object-cover'}`}
                        loading={i === 0 ? 'eager' : 'lazy'}
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent" />
                    </div>
                  ))}
                </div>

                {/* Caption */}
                <div className="absolute bottom-0 left-0 right-0 p-6 sm:p-8">
                  <div className="flex items-end justify-between gap-4">
                    <div>
                      <p className="text-xs font-semibold uppercase tracking-[0.2em] text-sand-300">
                        Slide {index + 1} / {total}
                      </p>
                      <h2 className="mt-1.5 font-serif text-2xl sm:text-3xl font-semibold text-white">
                        {gallery[index].caption}
                      </h2>
                    </div>
                    <div className="flex items-center gap-2">
                      <button
                        type="button"
                        onClick={() => go(-1)}
                        className="grid h-11 w-11 place-items-center rounded-full bg-white/10 text-white backdrop-blur transition-all hover:bg-white/20"
                        aria-label="Previous photo"
                      >
                        <ChevronLeft className="h-5 w-5" />
                      </button>
                      <button
                        type="button"
                        onClick={() => setPlaying((p) => !p)}
                        className="grid h-11 w-11 place-items-center rounded-full bg-white/10 text-white backdrop-blur transition-all hover:bg-white/20"
                        aria-label={playing ? 'Pause tour' : 'Play tour'}
                      >
                        {playing ? <Pause className="h-5 w-5" /> : <Play className="h-5 w-5" />}
                      </button>
                      <button
                        type="button"
                        onClick={() => go(1)}
                        className="grid h-11 w-11 place-items-center rounded-full bg-white/10 text-white backdrop-blur transition-all hover:bg-white/20"
                        aria-label="Next photo"
                      >
                        <ChevronRight className="h-5 w-5" />
                      </button>
                    </div>
                  </div>
                  {/* Progress bar */}
                  <div className="mt-4 h-1 w-full overflow-hidden rounded-full bg-white/15">
                    <div
                      className="h-full rounded-full bg-sand-400 transition-[width] duration-100 ease-linear"
                      style={{ width: `${playing ? progress : 0}%` }}
                    />
                  </div>
                </div>
              </div>

              <p className="mt-4 text-center text-sm text-sand-300/70">
                {playing
                  ? 'Auto-playing photo tour · ~1 min'
                  : 'Paused — use the controls to explore'}
              </p>
            </div>
          </section>
        ) : null}

        {/* Thumbnail grid */}
        {total > 0 && (
          <section className="py-16 sm:py-20 bg-sand-50">
            <div className="mx-auto max-w-6xl px-6 lg:px-8">
              <SectionHeading
                eyebrow="Photo gallery"
                title="Every room, considered."
                blurb="Browse the spaces that make up this home."
              />
              <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {gallery.map((photo, i) => (
                  <button
                    key={photo.src}
                    type="button"
                    onClick={() => {
                      setPlaying(false);
                      setIndex(i);
                      window.scrollTo({ top: 0, behavior: 'smooth' });
                    }}
                    className={`group relative overflow-hidden rounded-xl border shadow-sm transition-all hover:-translate-y-1 hover:shadow-lg ${
                      i === index ? 'border-sand-500 ring-2 ring-sand-300' : 'border-sand-200'
                    }`}
                  >
                    <img
                      src={photo.src}
                      alt={photo.caption}
                      loading="lazy"
                      className={`h-48 w-full ${photo.src.endsWith("schedule-a-tour.webp") ? "object-contain bg-slate-950" : "object-cover transition-transform duration-500 group-hover:scale-105"}`}
                    />
                    <div className={`${photo.src.endsWith("schedule-a-tour.webp") ? "hidden" : "absolute inset-x-0 bottom-0 bg-gradient-to-t from-slate-950/80 to-transparent p-3"}`}>
                      <p className="text-sm font-medium text-white">{photo.caption}</p>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          </section>
        )}
      </main>
      <Footer />
    </div>
  );
}

function Contact() {
  const ref = useReveal<HTMLDivElement>();
  const [status, setStatus] = useState<'idle' | 'saving' | 'success' | 'error'>('idle');
  const [error, setError] = useState('');
  const [isOwner, setIsOwner] = useState(false);
  const [submissionId, setSubmissionId] = useState('');
  useEffect(() => {
    fetch('/api/owner', { cache: 'no-store' }).then(r => r.ok ? r.json() : {isOwner:false}).then(data => setIsOwner(data.isOwner === true)).catch(() => setIsOwner(false));
  }, []);
  async function submitInquiry(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (status === 'saving') return;
    const form = event.currentTarget;
    const data = Object.fromEntries(new FormData(form));
    const id = submissionId || crypto.randomUUID();
    setSubmissionId(id);
    setStatus('saving'); setError('');
    try {
      const response = await fetch('/api/inquiries', { method: 'POST', headers: {'Content-Type':'application/json'}, body: JSON.stringify({...data,id}) });
      const result = await response.json();
      if (!response.ok || !result.ok) throw new Error(result.error || 'We could not save your query. Please try again.');
      form.reset(); setSubmissionId(''); setStatus('success');
    } catch (e) {
      setError(e instanceof Error ? e.message : 'We could not save your query. Please try again.');
      setStatus('error');
    }
  }
  const field = 'mt-2 w-full rounded-lg border border-white/20 bg-white/10 px-4 py-3 text-white placeholder:text-sand-300/50 focus:outline-none focus:ring-2 focus:ring-sand-300';
  return (
    <section id="contact" className="scroll-mt-[88px] bg-slate-950 py-10 text-sand-100 sm:py-12">
      <div className="mx-auto max-w-6xl px-6 lg:px-8">
        <div className="grid items-start gap-8 lg:grid-cols-2 lg:gap-12">
        <div>
        <div ref={ref} className="reveal max-w-2xl">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-sand-400">Contact</p>
          <h2 className="mt-3 font-serif text-3xl sm:text-4xl font-semibold tracking-tight text-sand-50">Let's build something worth keeping.</h2>
          <p className="mt-4 text-base leading-relaxed text-sand-200/80">Tell us about your project or ask us a question.</p>
        </div>
        <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-1">
          <a href="mailto:GK152@yahoo.com" className="rounded-xl border border-white/10 bg-white/5 p-5 hover:bg-white/10"><Mail className="h-5 w-5 text-sand-300" /><p className="mt-3 text-xs font-semibold uppercase tracking-wide text-sand-400">Contact Giri Devaraju</p><p className="mt-1 text-sm font-medium">GK152@yahoo.com</p></a>
          <a href="tel:+14257362810" className="rounded-xl border border-white/10 bg-white/5 p-5 hover:bg-white/10"><Phone className="h-5 w-5 text-sand-300" /><p className="mt-3 text-xs font-semibold uppercase tracking-wide text-sand-400">Phone</p><p className="mt-1 text-sm font-medium">(425) 736-2810</p></a>
        </div>
        </div>
        <form onSubmit={submitInquiry} onChange={() => { if (status !== 'saving') { setSubmissionId(''); if (status === 'success') setStatus('idle'); } }} className="rounded-2xl border border-white/10 bg-white/5 p-5 sm:p-7">
          <h3 className="font-serif text-2xl font-semibold">Send us a question</h3>
          <p className="mt-2 text-sm text-sand-200/80">Complete the form below and we’ll get back to you in 24 to 48 hours.</p>
          <div className="mt-6 grid gap-5 sm:grid-cols-2">
            <label className="text-sm font-medium">First name<input className={field} name="firstName" maxLength={100} autoComplete="given-name" required /></label>
            <label className="text-sm font-medium">Last name<input className={field} name="lastName" maxLength={100} autoComplete="family-name" required /></label>
            <label className="text-sm font-medium">From (email address)<input className={field} name="email" maxLength={254} type="email" autoComplete="email" required /></label>
            <label className="text-sm font-medium">Phone number<input className={field} name="phone" maxLength={40} type="tel" autoComplete="tel" required /></label>
            <label className="text-sm font-medium sm:col-span-2">Type of question<select className={field + ' text-slate-900'} name="type" required defaultValue=""><option value="" disabled>Select a topic</option><option>New construction</option><option>Remodeling or renovation</option><option>Property Management</option><option>Existing project</option><option>Other question</option></select></label>
            <label className="text-sm font-medium sm:col-span-2">Your question<textarea className={field} name="question" rows={7} maxLength={2500} required placeholder="Tell us how we can help (up to 2,500 characters)" /><span className="mt-1 block text-xs text-sand-300/80">Maximum 2,500 characters</span></label>
          </div>
          <button type="submit" disabled={status === 'saving'} className="mt-6 rounded-lg bg-sand-200 px-6 py-3 font-semibold text-slate-950 hover:bg-white disabled:opacity-60 disabled:cursor-wait">{status === 'saving' ? 'Submitting…' : 'Submit'}</button>
          {status === 'success' && <p role="status" aria-live="polite" className="mt-5 rounded-lg border border-green-300/30 bg-green-950/40 p-4 text-green-100">Thanks for submitting your query. We'll get back to you in 24 to 48 hours.</p>}
          {status === 'error' && <p role="alert" className="mt-4 text-red-200">{error}</p>}
          {isOwner && <div className="mt-6 border-t border-white/20 pt-5"><p className="text-sm font-semibold">Owner tools</p><a href="/api/inquiries/export" download="Key_Concepts_Queries.xlsx" className="mt-3 inline-flex rounded-lg border border-sand-300 px-4 py-2 text-sm font-semibold hover:bg-white/10">Download queries — Excel (.xlsx)</a><p className="mt-2 text-xs text-sand-300/80">Downloads all saved queries using your current signed-in session.</p></div>}
        </form>
        </div>
      </div>
    </section>
  );
}

function ContactPage() {
  return (
    <div className="min-h-screen bg-slate-950 flex flex-col">
      <Nav />
      <main className="flex-1 pt-[88px]">
        <Contact />
      </main>
      <Footer />
    </div>
  );
}

function TestimonialsPage() {
  return (
    <div className="min-h-screen bg-sand-50 flex flex-col">
      <Nav />
      <main className="flex-1 pt-[88px]">
        <section className="border-b border-sand-200 bg-white py-20 sm:py-28">
          <div className="mx-auto max-w-6xl px-6 lg:px-8">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-sand-600">Client Reviews</p>
            <h1 className="mt-3 max-w-3xl font-serif text-5xl font-semibold tracking-tight text-slate-900 sm:text-6xl">Words from our clients.</h1>
            <p className="mt-5 max-w-2xl text-lg leading-relaxed text-slate-500">We're grateful for the trust our clients place in us. Their stories and experiences will be shared here.</p>
          </div>
        </section>
        <section className="mx-auto max-w-6xl px-6 py-16 lg:px-8">
          <div className="rounded-2xl border border-sand-200 bg-white p-8 text-slate-600 shadow-sm">
            <h2 className="font-serif text-2xl font-semibold text-slate-900">Client reviews coming soon</h2>
            <p className="mt-3">Please check back for client reviews.</p>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}

function Footer() {
  return (
    <footer className="bg-slate-950 border-t border-white/10 py-8 text-center">
      <p className="text-sm text-sand-300/70">
        © {new Date().getFullYear()} Key Concepts Construction · Kirkland, Washington
      </p>
      <p className="mt-1 text-xs text-sand-400/50">General Contractor &amp; Design-Build</p>
    </footer>
  );
}

export default function App() {
  const path = window.location.pathname;

  if (path === '/past-projects') return <ProjectsPage type="past" />;
  if (path === '/active-projects') return <ProjectsPage type="active" />;
  if (path === '/contact') return <ContactPage />;
  if (path === '/reviews' || path === '/testimonials') return <TestimonialsPage />;

  const projectMatch = path.match(/^\/projects\/([\w-]+)$/);
  if (projectMatch) {
    const slug = projectMatch[1];
    const project = [...PAST_PROJECTS, ...ACTIVE_PROJECTS].find((p) => p.slug === slug);
    if (project) return <ProjectDetail project={project} />;
  }

  return (
    <div className="min-h-screen bg-sand-50">
      <Nav />
      <main>
        <Hero />
        <About />
        <Experience />
        <Skills />
        <Projects />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}
