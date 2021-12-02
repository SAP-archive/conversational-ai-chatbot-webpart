import * as React from 'react';
import * as ReactDom from 'react-dom';
import { DisplayMode } from '@microsoft/sp-core-library';
import { BaseClientSideWebPart } from '@microsoft/sp-webpart-base';
import {
  IPropertyPaneConfiguration,
  PropertyPaneTextField,
  PropertyPaneDropdown,
  IPropertyPaneDropdownOption,
  IPropertyPaneField,
} from '@microsoft/sp-property-pane';

import { ChatbotWebPartOptions } from './chatbotWebpartProps';
import { ChatbotPropertyPane } from './chatbotPropertyPane';
import { ChatbotPropsStorage } from './components/chatbotProps';
import { constants } from './const';
import * as strings from 'ChatbotStrings';

export default class ChatbotWebPart extends BaseClientSideWebPart<ChatbotWebPartOptions> {
  private _uniqueId: string;
  private channels: IPropertyPaneDropdownOption[];

  /**
   * Create an instance of the web part.
   */
  constructor() {
    super();
  }

  /**
   * Render the web part on a page:
   *     try to embed a CAI chatbot while in normal mode,
   *     render the configuration panel while in edit mode.
   */
  public render(): void {
    this._uniqueId = this.context.instanceId;

    if (this.displayMode == DisplayMode.Read) {
      ReactDom.unmountComponentAtNode(this.domElement);
      this.embedChatbot();
    } else {
      this.showPanel();
    }
  }

  /**
   * Add the chatbot itself on a page via a <script> tag.
   * Use different attributes based on the selected channel.
   */
  private embedChatbot(): void {
    const scriptTag = document.createElement('script');
    scriptTag.type = constants.sTagType;

    if (this.properties.channel === 'webClient') {
      // If the 'SAP CAI Web Client' channel is chosen
      scriptTag.src = constants.sTagWebClientSrc;
      scriptTag.id = constants.sTagWebClientId;
      scriptTag.setAttribute(constants.sTagWebclientAttrChannelId, this.properties.channelId);
      scriptTag.setAttribute(constants.sTagWebclientAttrToken, this.properties.token);
      scriptTag.setAttribute(constants.sTagWebclientAttrEP, this.properties.expanderPreferences);
      scriptTag.setAttribute(constants.sTagWebclientAttrET, constants.sTagWebClientET);
    } else {
      // If the 'Webchat' channel is chosen
      scriptTag.src = constants.sTagWebchatSrc;
      scriptTag.id = constants.sTagWebchatId;
      scriptTag.setAttribute(constants.sTagWebchatAttrChannelId, this.properties.channelId);
      scriptTag.setAttribute(constants.sTagWebchatAttrToken, this.properties.token);
    }

    document.body.appendChild(scriptTag);
  }

  /**
   * Populate the channel drop-down menu with available channel options.
   * @returns A Promise for the completion of parsing the options.
   */
  private loadChannelOptions(): Promise<IPropertyPaneDropdownOption[]> {
    return new Promise<IPropertyPaneDropdownOption[]>((resolve: (options: IPropertyPaneDropdownOption[]) => void) => {
      resolve([
        {
          key: 'webchat',
          text: constants.channelOptionsWebchat,
        },
        {
          key: 'webClient',
          text: constants.channelOptionsWebClient,
        },
      ]);
    });
  }

  /**
   * Run on the initial startup of the web parts configuration panel.
   * Load channel options for the drop-down menu.
   */
  protected async onPropertyPaneConfigurationStart(): Promise<void> {
    this.context.statusRenderer.displayLoadingIndicator(this.domElement, 'channels');

    const channelOptions = await this.loadChannelOptions();
    this.channels = channelOptions;
    // Refresh the drop-down control by repainting the property pane
    this.context.propertyPane.refresh();
    // Remove the loading indicator on the web part's placeholder
    this.context.statusRenderer.clearLoadingIndicator(this.domElement);
    // Re-render the web part to update the fields
    this.render();
  }

  /**
   * Render the config panel as well as the web part's placeholder.
   */
  private async showPanel(): Promise<void> {
    const configPanel = await import('./components/chatbot');

    const element: React.ReactElement<ChatbotPropsStorage> = React.createElement(configPanel.default, {
      channel: this.properties.channel,
      channelId: this.properties.channelId,
      token: this.properties.token,
      expanderPreferences: this.properties.expanderPreferences,
      propPaneHandle: this.context.propertyPane,
      key: 'pnp' + new Date().getTime(),
    });
    ReactDom.render(element, this.domElement);
  }

  /**
   * Generate the configuration panel's layout.
   * @returns A configuration object interface
   *     (see reference: https://docs.microsoft.com/en-us/javascript/api/sp-property-pane/ipropertypaneconfiguration).
   */
  protected getPropertyPaneConfiguration(): IPropertyPaneConfiguration {
    const options: IPropertyPaneField<object>[] = [
      PropertyPaneDropdown('channel', {
        label: strings.propertyPaneSelect,
        options: this.channels,
        selectedKey: 'webchat',
      }),
      PropertyPaneTextField('channelId', {
        label: strings.propertyPaneChannelId,
        value: this.properties.channelId,
      }),
      PropertyPaneTextField('token', {
        label: strings.propertyPaneToken,
        value: this.properties.token,
      }),
    ];

    // Add an extra option for the 'expanderPreferences' attribute
    if (this.properties.channel === 'webClient') {
      const epOption = PropertyPaneTextField('expanderPreferences', {
        label: strings.propertyPaneEP,
        value: this.properties.expanderPreferences,
      });
      options.push(epOption);
    }

    // Append the footer
    options.push(new ChatbotPropertyPane());

    return {
      pages: [
        {
          header: {
            description: strings.propertyPaneDescription,
          },
          groups: [
            {
              groupFields: options,
            },
          ],
        },
      ],
    };
  }
}
