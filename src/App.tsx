import React, { useState } from 'react';
import MenuList, { MenuItem } from './MenuList';
import { menuItems } from './menuItems';
import CheckoutModal from './CheckoutModal';
import { restaurant } from './restaurantInfo';

type CartItem = MenuItem & { count: number };

const App: React.FC = () => {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [showCheckout, setShowCheckout] = useState(false);

  const handleAdd = (item: MenuItem) => {
    setCart(prev => {
      const found = prev.find(i => i.title === item.title);
      if (found) {
        return prev.map(i => i.title === item.title ? { ...i, count: i.count + 1 } : i);
      }
      return [...prev, { ...item, count: 1 }];
    });
  };

  const handleRemove = (item: MenuItem) => {
    setCart(prev => {
      const found = prev.find(i => i.title === item.title);
      if (!found) return prev;
      if (found.count === 1) {
        return prev.filter(i => i.title !== item.title);
      }
      return prev.map(i => i.title === item.title ? { ...i, count: i.count - 1 } : i);
    });
  };

  const handleCheckout = () => setShowCheckout(true);
  const handleClose = () => setShowCheckout(false);

  const [search, setSearch] = useState("");
  const [vegFilter, setVegFilter] = useState<'all' | 'veg' | 'nonveg'>('all');
  const [tagFilter, setTagFilter] = useState<string>('all');
  const [priceSort, setPriceSort] = useState<'none' | 'asc' | 'desc'>('none');

  const allTags = Array.from(new Set(menuItems.flatMap(item => item.tags || []))).filter((tag): tag is string => !!tag);

  let filteredItems = menuItems.filter(item => {
    const matchesSearch = item.title.toLowerCase().includes(search.toLowerCase());
    const matchesVeg = vegFilter === 'all' || (vegFilter === 'veg' ? item.veg : !item.veg);
    const matchesTag = tagFilter === 'all' || (item.tags && item.tags.includes(tagFilter));
    return matchesSearch && matchesVeg && matchesTag;
  });

  if (priceSort === 'asc') {
    filteredItems = [...filteredItems].sort((a, b) => a.price - b.price);
  } else if (priceSort === 'desc') {
    filteredItems = [...filteredItems].sort((a, b) => b.price - a.price);
  }

  const handleReset = () => setCart([]);

  return (
    <div className="menu-container">
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginBottom: 8 }}>
        <span style={{ fontSize: '2.5rem', marginBottom: 2 }}>🍽️</span>
        <h1 style={{ margin: 0, fontSize: '2rem', letterSpacing: 1 }}>{restaurant.name} Menu</h1>
      </div>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, marginBottom: 12 }}>
        <input
          className="search-input"
          type="text"
          placeholder="Search menu..."
          value={search}
          onChange={e => setSearch(e.target.value)}
          style={{ flex: 2, minWidth: 120 }}
        />
        <select value={vegFilter} onChange={e => setVegFilter(e.target.value as any)} style={{ flex: 1, minWidth: 90, borderRadius: 8, border: '1px solid #e0e7ff', padding: '8px 6px' }}>
          <option value="all">All</option>
          <option value="veg">Veg</option>
          <option value="nonveg">Non-Veg</option>
        </select>
        <select value={tagFilter} onChange={e => setTagFilter(e.target.value)} style={{ flex: 1, minWidth: 110, borderRadius: 8, border: '1px solid #e0e7ff', padding: '8px 6px' }}>
          <option value="all">All Types</option>
          {allTags.map(tag => (
            <option key={tag} value={tag}>{tag.charAt(0).toUpperCase() + tag.slice(1)}</option>
          ))}
        </select>
        <select value={priceSort} onChange={e => setPriceSort(e.target.value as any)} style={{ flex: 1, minWidth: 120, borderRadius: 8, border: '1px solid #e0e7ff', padding: '8px 6px' }}>
          <option value="none">Sort by Price</option>
          <option value="asc">Price: Low to High</option>
          <option value="desc">Price: High to Low</option>
        </select>
      </div>
      <div className="menu-scroll-area">
        <MenuList
          items={filteredItems}
          cart={cart}
          onAdd={handleAdd}
          onRemove={handleRemove}
        />
      </div>
      <div style={{ display: 'flex', gap: 12, marginTop: 8 }}>
        <button className="checkout-btn checkout-btn-fixed" onClick={handleCheckout} disabled={cart.length === 0}>
          Checkout ({cart.reduce((sum, i) => sum + i.count, 0)})
        </button>
        <button className="reset-btn checkout-btn-fixed" onClick={handleReset} disabled={cart.length === 0}>
          Reset
        </button>
      </div>
      <CheckoutModal open={showCheckout} items={cart} onClose={handleClose} />
    </div>
  );
};

export default App;
