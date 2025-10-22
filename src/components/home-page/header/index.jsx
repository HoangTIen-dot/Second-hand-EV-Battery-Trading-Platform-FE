import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { FiMenu, FiX, FiShoppingCart } from "react-icons/fi";
import { Button, Badge, Avatar, Dropdown } from "antd";
import { MenuOutlined, CloseOutlined, ShoppingCartOutlined, UserOutlined } from "@ant-design/icons";
import { useCart } from "../../../contexts/CartContext";
import "./index.css";

const Header = () => {
  const navigate = useNavigate();
  const { getCartCount } = useCart();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isAvatarOpen, setIsAvatarOpen] = useState(false);

  const cartCount = getCartCount();

  const navItems = [
    { id: 1, name: "Home", href: "#" },
    { id: 2, name: "Products", href: "#" },
    { id: 3, name: "Categories", href: "#" },
    { id: 4, name: "About", href: "#" },
    { id: 5, name: "Contact", href: "#" },
  ];

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
  const toggleCart = () => setIsCartOpen(!isCartOpen);
  const toggleAvatar = () => setIsAvatarOpen(!isAvatarOpen);
  const toggleDarkMode = () => setIsDarkMode(!isDarkMode);

  useEffect(() => {
    document.body.className = isDarkMode ? "dark" : "light";
  }, [isDarkMode]);

  // Avatar dropdown menu items
  const avatarMenuItems = [
    {
      key: '1',
      label: (
        <a href="#profile" style={{ textDecoration: 'none' }}>
          👤 Profile
        </a>
      ),
    },
    {
      key: '2',
      label: (
        <a href="#settings" style={{ textDecoration: 'none' }}>
          ⚙️ Settings
        </a>
      ),
    },
    {
      key: '3',
      label: '🚪 Logout',
      onClick: () => alert("Logged out!"),
    },
  ];

  return (
    <header 
      className="custom-header"
      style={{
        backgroundColor: isDarkMode ? '#141414' : '#fff',
        color: isDarkMode ? '#fff' : 'rgba(0, 0, 0, 0.88)',
      }}
    >
      <div className="header-content">
        {/* Logo */}
        <div className="logo-section">
          <img
            className="logo-image"
            src="/assets/logo.png"
            alt="Logo"
          />
          <span className="logo-text">E-Vehicle</span>
        </div>

        {/* Navigation links (hidden on mobile) */}
        <nav className="nav-links">
          {navItems.map((item) => (
            <a
              key={item.id}
              href={item.href}
              className="nav-link"
            >
              {item.name}
            </a>
          ))}
        </nav>

        {/* Actions section */}
        <div className="actions-section">
          {/* Dark mode toggle */}
          <Button
            type="text"
            shape="circle"
            onClick={toggleDarkMode}
            icon={isDarkMode ? "🌞" : "🌙"}
            aria-label="Toggle dark mode"
          />

          {/* Shopping cart */}
          <div style={{ position: 'relative' }}>
            <Badge count={cartCount} size="small" offset={[-5, 5]}>
              <Button
                type="text"
                shape="circle"
                icon={<ShoppingCartOutlined style={{ fontSize: '20px' }} />}
                onClick={() => navigate('/cart')}
                aria-label="Shopping cart"
              />
            </Badge>
          </div>

          {/* User avatar with dropdown */}
          <Dropdown
            menu={{ items: avatarMenuItems }}
            trigger={['click']}
            placement="bottomRight"
          >
            <Avatar
              src="https://i.pravatar.cc/40"
              alt="User avatar"
              style={{ cursor: 'pointer' }}
              icon={<UserOutlined />}
            />
          </Dropdown>

          {/* Mobile menu toggle */}
          <Button
            type="text"
            shape="circle"
            className="mobile-menu-toggle"
            onClick={toggleMenu}
            icon={isMenuOpen ? <CloseOutlined /> : <MenuOutlined />}
            aria-label="Toggle menu"
          />
        </div>
      </div>

      {/* Mobile menu */}
      {isMenuOpen && (
        <div className="mobile-menu" style={{
          backgroundColor: isDarkMode ? '#141414' : '#fff',
          borderTopColor: isDarkMode ? '#303030' : '#f0f0f0',
        }}>
          <div className="mobile-menu-content">
            {navItems.map((item) => (
              <a
                key={item.id}
                href={item.href}
                className="mobile-nav-link"
              >
                {item.name}
              </a>
            ))}
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;
