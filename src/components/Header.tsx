import { useState, useRef, useEffect } from 'react';
import { useAppStore } from '../store/appStore';
import { Moon, Sun, HelpCircle, FileJson, LayoutGrid, Sparkles, FileText, PenTool, BookOpen, Menu, X, Info } from 'lucide-react';

interface HeaderProps {
  onAboutClick: () => void;
  onHelpClick: () => void;
  onImportExportClick: () => void;
  onGalleryClick: () => void;
  onDesignerClick: () => void;
  onLearnClick: () => void;
  onNLBuilderClick?: () => void;
  onSummaryClick: () => void;
}

export function Header({ onAboutClick, onHelpClick, onImportExportClick, onGalleryClick, onDesignerClick, onLearnClick, onNLBuilderClick, onSummaryClick }: HeaderProps) {
  const { darkMode, toggleDarkMode, currentOntology } = useAppStore();
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  const ontologyDisplayName = currentOntology.name || 'Untitled Ontology';

  // Close menu when clicking outside
  useEffect(() => {
    if (!menuOpen) return;
    const handleClick = (e: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setMenuOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClick);
    return () => document.removeEventListener('mousedown', handleClick);
  }, [menuOpen]);

  const menuAction = (fn: () => void) => () => { setMenuOpen(false); fn(); };

  return (
    <header className="header">
      <div className="header-logo">
        <svg viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
          <rect width="32" height="32" rx="4" fill="#0078D4"/>
          <path d="M8 8H15V15H8V8Z" fill="white"/>
          <path d="M17 8H24V15H17V8Z" fill="white" opacity="0.7"/>
          <path d="M8 17H15V24H8V17Z" fill="white" opacity="0.7"/>
          <path d="M17 17H24V24H17V17Z" fill="white" opacity="0.5"/>
        </svg>
        <div>
          <span className="header-title">
            Ontology Playground <span className="header-title-preview">(Preview)</span>
          </span>
          <span className="header-context">{ontologyDisplayName}</span>
        </div>
      </div>

      <div className="header-actions">
        <button className="header-text-btn" onClick={onSummaryClick} title="View Ontology Summary">
          <FileText size={16} />
          <span>Summary</span>
        </button>
        {onNLBuilderClick && (
          <button className="icon-btn" onClick={onNLBuilderClick} data-tooltip="AI Builder" aria-label="AI Builder">
            <Sparkles size={20} />
          </button>
        )}
        <button className="icon-btn" onClick={onGalleryClick} data-tooltip="Catalogue" aria-label="Catalogue">
          <LayoutGrid size={20} />
        </button>
        <button className="icon-btn" onClick={onDesignerClick} data-tooltip="Designer" aria-label="Designer">
          <PenTool size={20} />
        </button>
        <button className="icon-btn" onClick={onLearnClick} data-tooltip="Ontology School" aria-label="Ontology School">
          <BookOpen size={20} />
        </button>
        <button className="icon-btn" onClick={onImportExportClick} data-tooltip="Import / Export" aria-label="Import / Export">
          <FileJson size={20} />
        </button>
        <button className="icon-btn" onClick={onHelpClick} data-tooltip="Help" aria-label="Help">
          <HelpCircle size={20} />
        </button>
        <button className="icon-btn" onClick={onAboutClick} data-tooltip="About" aria-label="About">
          <Info size={20} />
        </button>
        <button className="icon-btn" onClick={toggleDarkMode} data-tooltip={darkMode ? 'Light Mode' : 'Dark Mode'} aria-label={darkMode ? 'Light Mode' : 'Dark Mode'}>
          {darkMode ? <Sun size={20} /> : <Moon size={20} />}
        </button>
      </div>

      {/* Mobile hamburger menu */}
      <div className="header-mobile-menu" ref={menuRef}>
        <button className="icon-btn header-hamburger" onClick={() => setMenuOpen(!menuOpen)} aria-label="Menu">
          {menuOpen ? <X size={22} /> : <Menu size={22} />}
        </button>
        {menuOpen && (
          <div className="mobile-menu-dropdown">
            <button className="mobile-menu-item" onClick={menuAction(onSummaryClick)}>
              <FileText size={18} /> Summary
            </button>
            {onNLBuilderClick && (
              <button className="mobile-menu-item" onClick={menuAction(onNLBuilderClick)}>
                <Sparkles size={18} /> AI Builder
              </button>
            )}
            <button className="mobile-menu-item" onClick={menuAction(onGalleryClick)}>
              <LayoutGrid size={18} /> Catalogue
            </button>
            <button className="mobile-menu-item" onClick={menuAction(onDesignerClick)}>
              <PenTool size={18} /> Designer
            </button>
            <button className="mobile-menu-item" onClick={menuAction(onLearnClick)}>
              <BookOpen size={18} /> Ontology School
            </button>
            <button className="mobile-menu-item" onClick={menuAction(onImportExportClick)}>
              <FileJson size={18} /> Import / Export
            </button>
            <button className="mobile-menu-item" onClick={menuAction(onHelpClick)}>
              <HelpCircle size={18} /> Help
            </button>
            <button className="mobile-menu-item" onClick={menuAction(onAboutClick)}>
              <Info size={18} /> About
            </button>
            <button className="mobile-menu-item" onClick={menuAction(toggleDarkMode)}>
              {darkMode ? <Sun size={18} /> : <Moon size={18} />}
              {darkMode ? 'Light Mode' : 'Dark Mode'}
            </button>
          </div>
        )}
      </div>
    </header>
  );
}
