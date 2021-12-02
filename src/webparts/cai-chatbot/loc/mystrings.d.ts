/**
 * Storage of the web part's localized strings.
 *
 * @interface ChatbotStringsStorage
 * @property description - Web part's description displayed on the placeholder.
 * @property buttonConfigure - The placeholder's configuration button's text.
 * @property propertyPaneDescription - Web part's description displayed on the configuration panel.
 * @property propertyPaneSelect - Channel selection option label's text.
 * @property propertyPaneChannelId - ChannelID option label's text.
 * @property propertyPaneToken - Token option label's text.
 * @property propertyPaneEP - Expander Preferences option label's text.
 */
declare interface ChatbotStringsStorage {
  description: string;
  buttonConfigure: string;
  propertyPaneDescription: string;
  propertyPaneSelect: string;
  propertyPaneChannelId: string;
  propertyPaneToken: string;
  propertyPaneEP: string;
}

declare module 'ChatbotStrings' {
  const strings: ChatbotStringsStorage;
  export = strings;
}
