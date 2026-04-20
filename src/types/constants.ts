// delete this file after uploading the project to GitHub,
// it's just for storing constant values that are used in 
// multiple places in the codebase, to avoid hardcoding them 
// in multiple files and to make it easier to update them in one place if needed.
import {
    GiNoodles, GiPizzaSlice, GiHamburger, GiSushis, GiStairsCake,
    GiEgyptianSphinx, GiGreekTemple, GiSteak, GiFishing, GiTacos,
    GiCroissant, GiKebabSpit, GiFriedEggs, GiBread, GiRiceCooker, 
    GiLindenLeaf
} from 'react-icons/gi';
import {
    MdOutlineFastfood, MdOutlineHealthAndSafety, MdOutlineCoffee
} from 'react-icons/md';
import { LuSandwich } from 'react-icons/lu';

export const Days = [
    'sunday', 'monday', 'tuesday', 'wednesday', 'thursday',
    'friday', 'saturday'
] as const;

export const CuisineTypes = [
    { id: 1, name: "Egyptian", icon: GiEgyptianSphinx, color: "#C1272D" },
    { id: 2, name: "Lebanese", icon: GiRiceCooker, color: "#00A651" },
    { id: 3, name: "Syrian", icon: GiKebabSpit, color: "#3D9140" },
    { id: 4, name: "Moroccan", icon: GiBread, color: "#C19A6B" },
    { id: 5, name: "Khaleeji", icon: GiRiceCooker, color: "#D4AF37" },
    { id: 6, name: "Italian", icon: GiPizzaSlice, color: "#008C45" },
    { id: 7, name: "Chinese", icon: GiNoodles, color: "#FF0000" },
    { id: 8, name: "Japanese", icon: GiSushis, color: "#BC002D" },
    { id: 9, name: "Indian", icon: GiBread, color: "#FF9933" },
    { id: 10, name: "Mexican", icon: GiTacos, color: "#128141" },
    { id: 11, name: "American", icon: GiHamburger, color: "#3C3B6E" },
    { id: 12, name: "French", icon: GiCroissant, color: "#0055A4" },
    { id: 13, name: "Turkish", icon: GiKebabSpit, color: "#E30A17" },
    { id: 14, name: "Greek", icon: GiGreekTemple, color: "#0D5EAF" },
    { id: 15, name: "FastFood", icon: MdOutlineFastfood, color: "#FFB81C" },
    { id: 16, name: "Seafood", icon: GiFishing, color: "#0077BE" },
    { id: 17, name: "Grills", icon: GiSteak, color: "#8B4513" },
    { id: 18, name: "Pizza", icon: GiPizzaSlice, color: "#E31837" },
    { id: 19, name: "Burgers", icon: GiHamburger, color: "#FF8C00" },
    { id: 20, name: "Sushi", icon: GiSushis, color: "#EE4035" },
    { id: 21, name: "Sandwiches", icon: LuSandwich, color: "#F4A460" },
    { id: 22, name: "Desserts", icon: GiStairsCake, color: "#FF69B4" },
    { id: 23, name: "Healthy", icon: MdOutlineHealthAndSafety, color: "#2E8B57" },
    { id: 24, name: "Vegan", icon: GiLindenLeaf, color: "#32CD32" },
    { id: 25, name: "Breakfast", icon: GiFriedEggs, color: "#FDB813" },
    { id: 26, name: "Cafe", icon: MdOutlineCoffee, color: "#6F4E37" }
] as const;

export const MenuCategories = [
    'Appetizers',
    'Main Courses',
    'Desserts'
] as const;

export const PriceRanges = ["low", "medium", "high"] as const;

export const RestaurantStatuses = ["pending", "approved", "rejected"] as const;

export const LIMITS = {
    MENU_ITEMS: 10,
    GALLERY_PHOTOS: 40,
    Gallery_MIN: 4,
    BRANCHES: 5,
    CUISINE_TYPES: 5,
    NAME_MIN: 3,
    NAME_MAX: 50,
    DESCRIPTION_MIN: 10,
    DESCRIPTION_MAX: 500
};