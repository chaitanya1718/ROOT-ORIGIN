import { Link } from "react-router-dom";
import "./AdminAuth.css";

const AdminAuthLayout = ({
  title,
  subtitle,
  children,
  footerLinks = [],
}) => {
  return (
    <div className="admin-auth-page">
      <section className="admin-auth-hero">
        <div className="admin-auth-copy">
          <div className="admin-auth-brand">
            <span className="admin-auth-brand-dot" />
            Root Origin Admin
          </div>
          <h1>Control the store without losing your place.</h1>
          <p>
            Secure access for catalog, orders, and analytics in one focused
            workspace built for administrators.
          </p>
          <div className="admin-auth-points">
            <div className="admin-auth-point">
              <strong>Protected access</strong>
              <span>
                Admin routes stay separate from customer login so operational
                work does not get mixed into the storefront flow.
              </span>
            </div>
            <div className="admin-auth-point">
              <strong>Fast recovery</strong>
              <span>
                Reset your admin password through email and get back to orders,
                products, and analytics quickly.
              </span>
            </div>
          </div>
        </div>
      </section>

      <section className="admin-auth-card-wrap">
        <div className="admin-auth-card">
          <h2>{title}</h2>
          <p className="admin-auth-subtitle">{subtitle}</p>
          {children}
          {footerLinks.length > 0 && (
            <div className="admin-auth-links">
              {footerLinks.map((link) => (
                <Link key={link.to} to={link.to}>
                  {link.label}
                </Link>
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  );
};

export default AdminAuthLayout;
