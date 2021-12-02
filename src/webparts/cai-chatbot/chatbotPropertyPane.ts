import { IPropertyPaneField, PropertyPaneFieldType, IPropertyPaneCustomFieldProps } from '@microsoft/sp-property-pane';

export class ChatbotPropertyPane implements IPropertyPaneField<IPropertyPaneCustomFieldProps> {
  public type: PropertyPaneFieldType = PropertyPaneFieldType.Custom;
  public targetProperty: string;
  public properties: IPropertyPaneCustomFieldProps;

  /**
   * Create an instance of the property pane.
   */
  constructor() {
    this.properties = {
      key: 'Logo',
      onRender: this.onRender.bind(this),
    };
  }

  /**
   * Render the configuration panel's footer (with developer's credits).
   * @param element The element to attach the footer to.
   */
  private onRender(element: HTMLElement): void {
    element.innerHTML = `
      <div style="position:fixed; left:-20px; bottom:4px; width:100%; text-align:right">
        <div style="white-space:pre-line">\
          Developed by <a href="https://github.com/gevartrix" target="_blank">Artemy Gevorkov</a>
          View source code on <a href="https://github.com/gevartrix/cai-chatbot-webpart" target="_blank"">Github</a>
        </div>
      </div>
    `;
  }
}

export default ChatbotPropertyPane;
