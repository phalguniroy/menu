import { MenuItem } from './MenuList';
import { menuArray } from './menuArray';

export const menuItems: MenuItem[] = menuArray.map(item => ({
    title: item.title,
    subtext: item.subtext,
    price: item.price,
    veg: item.veg,
    tags: item.tags
}));
