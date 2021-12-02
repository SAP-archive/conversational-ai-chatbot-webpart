import { IPropertyPaneAccessor } from '@microsoft/sp-webpart-base';

/**
 * Storage of all web part's properties.
 *
 * @interface ChatbotPropsStorage
 * @property channel - Selected connection channel for a CAI chatbot ("Webchat" or "SAP CAI Web Client").
 * @property channelId - Chatbot's channel ID.
 * @property token - Chatbot's authentication token.
 * @property expanderPreferences - Chatbot's expander preferences token (available only for the "SAP CAI Web Client" channel option.
 * @property propPaneHandle - Interface for the pane's configuration. Provides the "open()" and "refresh()" methods.
 */
export interface ChatbotPropsStorage {
  channel: string;
  channelId: string;
  token: string;
  expanderPreferences: string;
  propPaneHandle: IPropertyPaneAccessor;
}
