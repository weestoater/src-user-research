type HeaderProps = {
  onHomeClick: () => void;
};

export const Header = ({ onHomeClick }: HeaderProps) => {
  return (
    <header className="bg-primary text-white shadow-sm">
      <div className="container py-3">
        <div className="d-flex align-items-center">
          <button
            className="btn btn-link text-white text-decoration-none p-0"
            onClick={onHomeClick}
          >
            <h1 className="h4 mb-0">
              <i className="bi bi-house-door me-2"></i>
              User Research
            </h1>
          </button>
        </div>
      </div>
    </header>
  );
};
