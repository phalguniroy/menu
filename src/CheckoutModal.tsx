import React, { useState } from 'react';
import { MenuItem } from './MenuList';

type CartItem = MenuItem & { count: number };

interface CheckoutModalProps {
  open: boolean;
  items: CartItem[];
  onClose: () => void;
}

const CheckoutModal: React.FC<CheckoutModalProps> = ({ open, items, onClose }) => {
  const [isSending, setIsSending] = useState(false);
  const [contact, setContact] = useState('');
  const [sendWhatsapp, setSendWhatsapp] = useState(false);

  if (!open) return null;
  const total = items.reduce((sum, item) => sum + item.price * item.count, 0);

  // Format message for WhatsApp
  const getWhatsappMessage = () => {
    let msg = `Order from Charuban:%0A`;
    items.forEach(item => {
      msg += `${item.title} x${item.count} - ₹${item.price * item.count}%0A`;
    });
    msg += `Total: ₹${total}`;
    return msg;
  };

  const whatsappUrl = contact
    ? `https://wa.me/${contact.replace(/\D/g, '')}?text=${getWhatsappMessage()}`
    : '#';

  const handleSendToWhatsApp = () => {
    setIsSending(true);
    // Add logic to send the details to WhatsApp
  };

  return (
    <div className="modal-backdrop">
      <div className="modal">
        <h2>🧾 Checkout</h2>
        {items.length === 0 ? (
          <p>Your cart is empty.</p>
        ) : (
          <ul className="checkout-list">
            {items.map((item, idx) => (
              <li key={idx}>
                <span className="checkout-item-name">{item.title}</span>
                <span className="checkout-item-count">{item.count}</span>
                <span className="checkout-item-price">₹{item.price * item.count}</span>
              </li>
            ))}
          </ul>
        )}
        <div className="checkout-total">Total: ₹{total}</div>
        <button className="close-btn" onClick={onClose}>Close</button>
        {/* WhatsApp send option with checkbox */}
        <div style={{ margin: '12px 0' }}>
          <label style={{ display: 'flex', alignItems: 'center', gap: 8, cursor: 'pointer' }}>
            <input
              type="checkbox"
              checked={sendWhatsapp}
              onChange={e => setSendWhatsapp(e.target.checked)}
              style={{ marginRight: 6 }}
            />
            <span role="img" aria-label="WhatsApp">🟢</span> Send to WhatsApp
          </label>
          {sendWhatsapp && (
            <div style={{ marginTop: 8, display: 'flex', alignItems: 'center', gap: 8 }}>
              <input
                type="tel"
                placeholder="Contact number"
                value={contact}
                onChange={e => setContact(e.target.value)}
                style={{ padding: 6, borderRadius: 6, border: '1px solid #ccc', minWidth: 140 }}
              />
              <a
                href={contact && contact.length >= 10 ? whatsappUrl : undefined}
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  pointerEvents: contact && contact.length >= 10 ? 'auto' : 'none',
                  opacity: contact && contact.length >= 10 ? 1 : 0.5,
                  background: '#25D366', color: 'white', border: 'none', borderRadius: 6, padding: '6px 12px', textDecoration: 'none', display: 'flex', alignItems: 'center', gap: 4
                }}
              >
                <span role="img" aria-label="Send">📤</span> Send
              </a>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CheckoutModal;
