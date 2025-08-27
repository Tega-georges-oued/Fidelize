// src/components/TemplateEditor/TemplateEditor.tsx
import { FC, useState, useRef, useEffect } from 'react';
import {
  Save,
  Eye,
  Download,
  Upload,
  List,
  Bold,
  Italic,
  Underline,
  AlignLeft,
  AlignCenter,
  AlignRight,
} from 'lucide-react';
import Card from '../../UI/Card';
import Button from '../../UI/Button';
import Modal from '../../UI/Modal';
import DOMPurify from 'dompurify'; // Pour sanitiser le HTML
import '../../styles/TemplateEditor.css'; // Importe les styles

// Interface pour le modèle de template
interface Template {
  id?: string;
  content: string;
  variables: string[];
  updatedAt?: Date;
}

// Interface pour les props du composant
interface TemplateEditorProps {
  template?: Template;
  onClose: () => void;
  onSave: (template: Template) => void;
}

// Interface pour les boutons de la barre d'outils
interface ToolbarButton {
  icon: React.ComponentType<{ className?: string }>;
  action: string;
  title: string;
}

// Interface pour les variables prédéfinies
interface Variable {
  key: string;
  label: string;
}

// Déclare le composant TemplateEditor comme un composant fonctionnel TypeScript
const TemplateEditor: FC<TemplateEditorProps> = ({ template, onClose, onSave }) => {
  // État pour le contenu de l'éditeur
  const [content, setContent] = useState<string>(template?.content || '');
  // État pour les variables du template
  const [variables, setVariables] = useState<string[]>(template?.variables || []);
  // État pour basculer entre édition et aperçu
  const [showPreview, setShowPreview] = useState<boolean>(false);
  // Référence à l'élément contentEditable
  const editorRef = useRef<HTMLDivElement>(null);

  // Liste des boutons de la barre d'outils
  const toolbarButtons: ToolbarButton[] = [
    { icon: Bold, action: 'bold', title: 'Gras' },
    { icon: Italic, action: 'italic', title: 'Italique' },
    { icon: Underline, action: 'underline', title: 'Souligné' },
    { icon: AlignLeft, action: 'justifyLeft', title: 'Aligner à gauche' },
    { icon: AlignCenter, action: 'justifyCenter', title: 'Centrer' },
    { icon: AlignRight, action: 'justifyRight', title: 'Aligner à droite' },
    { icon: List, action: 'insertUnorderedList', title: 'Liste à puces' },
  ];

  // Liste des variables prédéfinies
  const predefinedVariables: Variable[] = [
    { key: 'client_name', label: 'Nom du client' },
    { key: 'client_address', label: 'Adresse du client' },
    { key: 'contact_name', label: 'Nom du contact' },
    { key: 'contact_email', label: 'Email du contact' },
    { key: 'mission_title', label: 'Titre de la mission' },
    { key: 'mission_budget', label: 'Budget de la mission' },
    { key: 'current_date', label: 'Date actuelle' },
    { key: 'company_name', label: 'Nom de l\'entreprise' },
    { key: 'company_address', label: 'Adresse de l\'entreprise' },
  ];

  // Synchronise le contenu initial avec l'éditeur
  useEffect(() => {
    if (editorRef.current && content) {
      editorRef.current.innerHTML = DOMPurify.sanitize(content);
    }
  }, [content]);

  // Applique une action de formatage (simulation, car execCommand est obsolète)
  const handleToolbarAction = (action: string) => {
    document.execCommand(action, false, undefined);
    if (editorRef.current) {
      setContent(DOMPurify.sanitize(editorRef.current.innerHTML));
    }
  };

  // Insère une variable dans l'éditeur
  const insertVariable = (variable: string) => {
    if (editorRef.current) {
      const selection = window.getSelection();
      if (selection && selection.rangeCount > 0) {
        const range = selection.getRangeAt(0);
        range.deleteContents();
        const variableNode = document.createTextNode(`{{${variable}}}`);
        range.insertNode(variableNode);
        range.setStartAfter(variableNode);
        range.collapse(true);
        selection.removeAllRanges();
        selection.addRange(range);
        setContent(DOMPurify.sanitize(editorRef.current.innerHTML));
        setVariables(prev => [...new Set([...prev, variable])]);
      }
    }
  };

  // Gère la mise à jour du contenu lors de la saisie
  const handleInput = () => {
    if (editorRef.current) {
      setContent(DOMPurify.sanitize(editorRef.current.innerHTML));
    }
  };

  // Gère l'importation d'un fichier (exemple simplifié)
  const handleImport = () => {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = '.html,.txt';
    input.onchange = (e: Event) => {
      const file = (e.target as HTMLInputElement).files?.[0];
      if (file) {
        const reader = new FileReader();
        reader.onload = () => {
          setContent(DOMPurify.sanitize(reader.result as string));
        };
        reader.readAsText(file);
      }
    };
    input.click();
  };

  // Gère l'exportation en PDF (exemple simplifié)
  const handleExportPDF = () => {
    window.print(); // Simulation d'exportation PDF
  };

  // Gère l'exportation en DOCX (exemple simplifié)
  const handleExportDOCX = () => {
    const blob = new Blob([content], { type: 'application/msword' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'template.docx';
    a.click();
    URL.revokeObjectURL(url);
  };

  // Gère la sauvegarde du template
  const handleSave = () => {
    const templateData: Template = {
      ...template,
      content,
      variables,
      updatedAt: new Date(),
    };
    onSave(templateData);
    onClose();
  };

  // Rendu de l'éditeur de template dans une modale
  return (
    <Modal isOpen={true} onClose={onClose} title="Éditeur de Template" size="xl">
      <div className="template-editor">
        {/* Barre d'outils */}
        <Card className="template-editor-toolbar">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              {toolbarButtons.map(button => (
                <button
                  key={button.action}
                  onClick={() => handleToolbarAction(button.action)}
                  title={button.title}
                  aria-label={button.title}
                  className="p-2 hover:bg-gray-100 rounded border border-gray-300"
                >
                  <button.icon className="w-4 h-4" />
                </button>
              ))}
            </div>
            <div className="flex items-center space-x-2">
              <Button
                variant="secondary"
                size="sm"
                onClick={() => setShowPreview(!showPreview)}
                aria-label={showPreview ? 'Passer en mode édition' : 'Passer en mode aperçu'}
              >
                <Eye className="w-4 h-4 mr-2" />
                {showPreview ? 'Édition' : 'Aperçu'}
              </Button>
              <Button variant="secondary" size="sm" onClick={handleImport}>
                <Upload className="w-4 h-4 mr-2" />
                Importer
              </Button>
            </div>
          </div>
        </Card>

        {/* Panneau principal */}
        <div className="template-editor-content">
          {/* Variables */}
          <Card className="template-editor-variables">
            <h3 className="text-sm font-semibold text-gray-900 mb-3">Variables</h3>
            <div className="space-y-2">
              {predefinedVariables.map(variable => (
                <button
                  key={variable.key}
                  onClick={() => insertVariable(variable.key)}
                  className="w-full text-left p-2 text-xs bg-gray-100 hover:bg-gray-200 rounded border"
                  aria-label={`Insérer la variable ${variable.label}`}
                >
                  <div className="font-medium">{variable.label}</div>
                  <div className="text-gray-500">{{'{'}}{variable.key}{'}'}</div>
                </button>
              ))}
            </div>
          </Card>

          {/* Éditeur/Aperçu */}
          <div className="template-editor-main">
            <Card className="p-4">
              {showPreview ? (
                <div
                  className="min-h-[400px] p-4 border border-gray-300 rounded-lg bg-white"
                  dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(content) }}
                />
              ) : (
                <div
                  ref={editorRef}
                  contentEditable
                  className="min-h-[400px] p-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                  onInput={handleInput}
                  dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(content) }}
                />
              )}
            </Card>
          </div>
        </div>

        {/* Actions */}
        <div className="template-editor-actions">
          <div className="flex space-x-2">
            <Button variant="secondary" onClick={handleExportPDF}>
              <Download className="w-4 h-4 mr-2" />
              Exporter PDF
            </Button>
            <Button variant="secondary" onClick={handleExportDOCX}>
              <Download className="w-4 h-4 mr-2" />
              Exporter DOCX
            </Button>
          </div>
          <div className="flex space-x-3">
            <Button variant="secondary" onClick={onClose}>
              Annuler
            </Button>
            <Button onClick={handleSave}>
              <Save className="w-4 h-4 mr-2" />
              Enregistrer
            </Button>
          </div>
        </div>
      </div>
    </Modal>
  );
};

export default TemplateEditor;