import React, { useState } from 'react';
import { 
  Save, 
  Eye, 
  Download, 
  Upload, 
  Type, 
  Image, 
  Table, 
  List,
  Bold,
  Italic,
  Underline,
  AlignLeft,
  AlignCenter,
  AlignRight
} from 'lucide-react';
import Card from '../../UI/Card';
import Button from '../../UI/Button';
import Modal from '../../UI/Modal';

interface TemplateEditorProps {
  template?: any;
  onClose: () => void;
  onSave: (template: any) => void;
}

const TemplateEditor: React.FC<TemplateEditorProps> = ({
  template,
  onClose,
  onSave
}) => {
  const [content, setContent] = useState(template?.content || '');
  const [variables, setVariables] = useState(template?.variables || []);
  const [showPreview, setShowPreview] = useState(false);

  const toolbarButtons = [
    { icon: Bold, action: 'bold', title: 'Gras' },
    { icon: Italic, action: 'italic', title: 'Italique' },
    { icon: Underline, action: 'underline', title: 'Souligné' },
    { icon: AlignLeft, action: 'justifyLeft', title: 'Aligner à gauche' },
    { icon: AlignCenter, action: 'justifyCenter', title: 'Centrer' },
    { icon: AlignRight, action: 'justifyRight', title: 'Aligner à droite' },
    { icon: List, action: 'insertUnorderedList', title: 'Liste à puces' },
    { icon: Table, action: 'insertTable', title: 'Insérer tableau' },
  ];

  const predefinedVariables = [
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

  const handleToolbarAction = (action: string) => {
    document.execCommand(action, false);
  };

  const insertVariable = (variable: string) => {
    const selection = window.getSelection();
    if (selection && selection.rangeCount > 0) {
      const range = selection.getRangeAt(0);
      const variableNode = document.createTextNode(`{{${variable}}}`);
      range.insertNode(variableNode);
      range.collapse(false);
      selection.removeAllRanges();
      selection.addRange(range);
    }
  };

  const handleSave = () => {
    const templateData = {
      ...template,
      content,
      variables,
      updatedAt: new Date()
    };
    onSave(templateData);
    onClose();
  };

  return (
    <Modal isOpen={true} onClose={onClose} title="Éditeur de Template" size="xl">
      <div className="space-y-6">
        {/* Toolbar */}
        <Card className="p-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              {toolbarButtons.map((button) => {
                const Icon = button.icon;
                return (
                  <button
                    key={button.action}
                    onClick={() => handleToolbarAction(button.action)}
                    title={button.title}
                    className="p-2 hover:bg-gray-100 rounded border border-gray-300"
                  >
                    <Icon className="w-4 h-4" />
                  </button>
                );
              })}
            </div>
            <div className="flex items-center space-x-2">
              <Button
                variant="secondary"
                size="sm"
                onClick={() => setShowPreview(!showPreview)}
              >
                <Eye className="w-4 h-4 mr-2" />
                {showPreview ? 'Édition' : 'Aperçu'}
              </Button>
              <Button variant="secondary" size="sm">
                <Upload className="w-4 h-4 mr-2" />
                Importer
              </Button>
            </div>
          </div>
        </Card>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Variables Panel */}
          <Card className="p-4">
            <h3 className="text-sm font-semibold text-gray-900 mb-3">Variables</h3>
            <div className="space-y-2">
              {predefinedVariables.map((variable) => (
                <button
                  key={variable.key}
                  onClick={() => insertVariable(variable.key)}
                  className="w-full text-left p-2 text-xs bg-gray-100 hover:bg-gray-200 rounded border"
                >
                  <div className="font-medium">{variable.label}</div>
                  <div className="text-gray-500">{{'{'}}{variable.key}{'}'}}</div>
                </button>
              ))}
            </div>
          </Card>

          {/* Editor */}
          <div className="lg:col-span-3">
            <Card className="p-4">
              {showPreview ? (
                <div className="min-h-[400px] p-4 border border-gray-300 rounded-lg bg-white">
                  <div 
                    className="prose max-w-none"
                    dangerouslySetInnerHTML={{ __html: content }}
                  />
                </div>
              ) : (
                <div
                  contentEditable
                  className="min-h-[400px] p-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                  onInput={(e) => setContent(e.currentTarget.innerHTML)}
                  dangerouslySetInnerHTML={{ __html: content }}
                  style={{ minHeight: '400px' }}
                />
              )}
            </Card>
          </div>
        </div>

        {/* Actions */}
        <div className="flex justify-between">
          <div className="flex space-x-2">
            <Button variant="secondary">
              <Download className="w-4 h-4 mr-2" />
              Exporter PDF
            </Button>
            <Button variant="secondary">
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