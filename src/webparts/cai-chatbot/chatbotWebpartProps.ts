/**
 * Web part's core options for the configuration's panel.
 * It needs to be populated by the credentials found under the appropriate channel from the chatbot repository's "Connect" tab.
 *
 * @interface ChatbotWebPartOptions
 * @property channel - Selected connection channel for a CAI chatbot ("Webchat" or "SAP CAI Web Client").
 * @property channelId - Chatbot's channel ID.
 * @property token - Chatbot's authentication token.
 * @property expanderPreferences - Chatbot's expander preferences token (available only for the "SAP CAI Web Client" channel option.
 */
export interface ChatbotWebPartOptions {
  channel: string;
  url: string;
  channelId: string;
  token: string;
  expanderPreferences: string;
}
