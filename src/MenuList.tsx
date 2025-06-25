import React from 'react';

export type MenuItem = {
  id?: number;
  title: string;
  price: number;
  subtext?: string;
  veg?: boolean;
  tags?: string[];
};


type CartItem = MenuItem & { count: number };

interface MenuListProps {
  items: MenuItem[];
  cart: CartItem[];
  onAdd: (item: MenuItem) => void;
  onRemove: (item: MenuItem) => void;
}

const MenuList: React.FC<MenuListProps> = ({ items, cart, onAdd, onRemove }) => (
  <div>
    <ul>
      {items.map((item, idx) => {
        const cartItem = cart.find(i => i.title === item.title);
        return (
          <li key={item.title}>
            <div style={{ display: 'flex', flexDirection: 'column', flex: 1 }}>
            <span className="menu-item-name">
              {item.title}
              {typeof item.veg === 'boolean' && (
                item.veg ? (
                  <span style={{ color: '#22c55e', fontWeight: 700, marginLeft: 8 }} title="Veg">●</span>
                ) : (
                  <span style={{ color: '#ef4444', fontWeight: 700, marginLeft: 8 }} title="Non-Veg">●</span>
                )
              )}
            </span>

              {item.subtext && (
                <span className="menu-item-subtext">{item.subtext}</span>
              )}
            </div>
            <div className="menu-item-action">
              <span className="menu-item-price">₹{item.price}</span>
              {cartItem ? (
                <div className="count-btn-group">
                  <button className="count-btn" onClick={() => onRemove(item)}>-</button>
                  <span className="item-count">{cartItem.count}</span>
                  <button className="count-btn" onClick={() => onAdd(item)}>+</button>
                </div>
              ) : (
                <button className="add-btn" onClick={() => onAdd(item)}>Add</button>
              )}
            </div>
          </li>
        );
      })}
    </ul>
  </div>
);

export default MenuList;
