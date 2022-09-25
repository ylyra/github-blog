import logoSvg from "../assets/logo.svg";

export function Header() {
  return (
    <header className="flex justify-center bg-blue-800 bg-header bg-cover bg-no-repeat">
      <img
        src={logoSvg}
        alt="Logo"
        className="mt-16 mb-[134px] max-w-[148px] h-24"
      />
    </header>
  );
}
