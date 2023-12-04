import React, { useState } from 'react';

const Nav = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <div>
      <main >
        <div className="sidebar">
          <ul>
            <li><h1 style={{ textAlign: "justify", marginTop: "-40%" }}>Jahid</h1></li>
            <li><a href="/dashboard">Dashboard</a></li>
            <li><a href="/user">User</a></li>
            <li><a href="/employee">Employee</a></li>
            <li><a href="/product">Product</a></li>
          </ul>
        </div>
      </main>
    </div>
  );
};

export default Nav;
